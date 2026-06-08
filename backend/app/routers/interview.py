import uuid
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List, Optional
import chromadb

# LangChain imports
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from pydantic import BaseModel, Field

from app.database import get_db
from app.models import Interview, InterviewEvaluation, User
from app.schemas import (
    GenerateQuestionsRequest,
    GenerateQuestionsResponse,
    QuestionItem,
    EvaluateInterviewRequest,
    EvaluateInterviewResponse,
    QuestionEvaluationItem
)
from app.config import settings
from app.services.llm_factory import get_llm

router = APIRouter(prefix="/api/interview", tags=["Interview Simulator"])

# --- Pydantic Schemas for LLM Structured Output ---
class LLMQuestionItem(BaseModel):
    question_text: str = Field(description="The tailored technical project defense question")
    category: str = Field(description="Category of the question (e.g., Architecture, Security, Scaling)")

class LLMQuestionsList(BaseModel):
    questions: List[LLMQuestionItem] = Field(description="List of 3 to 5 synthesized questions")

class LLMAnswerEvaluation(BaseModel):
    question_id: str = Field(description="ID of the question")
    score: int = Field(description="Score for this specific answer (0-100)", ge=0, le=100)
    rationale: str = Field(description="Constructive critique in Hebrew detailing what was good and what was missing")
    model_answer: str = Field(description="An exemplar response in English representing a perfect answer for this question")
    improved_phrasing: str = Field(description="The candidate's answer re-phrased in English to sound highly professional and technical")

class LLMEvaluationResult(BaseModel):
    overall_score: int = Field(description="Average score across all questions (1-100)")
    general_feedback: str = Field(description="High-level feedback of candidate's strength and overall performance in Hebrew")
    evaluations: List[LLMAnswerEvaluation] = Field(description="Detailed grading matrix for each answer")


# Initialize local Chroma client
def get_chroma_collection():
    try:
        client = chromadb.PersistentClient(path=settings.CHROMA_DB_DIR)
        collection = client.get_or_create_collection(
            name="system_evaluation_questions"
        )
        return collection
    except Exception as e:
        # Fallback to in-memory/dummy client if persistent client fails
        client = chromadb.EphemeralClient()
        collection = client.get_or_create_collection(
            name="system_evaluation_questions"
        )
        return collection

# Seeding list (Default Bank of 16 Technical/Architectural Defense Questions)
DEFAULT_QUESTION_BANK = [
    {
        "text": "In a stateful client-side application, race conditions can occur if multiple concurrent actions update state. How does your code handle state locking or transitions?",
        "category": "State Management"
    },
    {
        "text": "Your local SQLite database is a single point of failure (SPOF). How would you transition this system to support multi-region replication and failover?",
        "category": "Database Scaling"
    },
    {
        "text": "The codebase connects to external AI APIs synchronously or blockingly. How does your backend handle asynchronous connection limits and request timeouts?",
        "category": "Asynchronous Design"
    },
    {
        "text": "If the vector database is temporarily unavailable during question generation, how does the system degrade gracefully?",
        "category": "Error Fallbacks"
    },
    {
        "text": "If a component crashes during a database transaction, how do you prevent data inconsistency and ensure ACID compliance?",
        "category": "Data Consistency"
    },
    {
        "text": "How do you protect the backend from memory leaks during large file parses or high-throughput JSON processing?",
        "category": "Resource Management"
    },
    {
        "text": "How does your architecture prevent SQL injection and dynamic query vulnerability in search features?",
        "category": "Security"
    },
    {
        "text": "How does the system defend against Prompt Injection or jailbreaks targeting LLM endpoints?",
        "category": "AI Security"
    },
    {
        "text": "How do you handle API key rotation and credential containment in distributed microservices?",
        "category": "Infrastructure Security"
    },
    {
        "text": "Under 10000 concurrent requests, how do you prevent database thread starvation and connection pool depletion?",
        "category": "High Concurrency"
    },
    {
        "text": "Explain your strategy for caching frequently-queried vectors to reduce database load and query latency.",
        "category": "Optimization"
    },
    {
        "text": "What design patterns did you employ to decouple core features and enable independent deployment cycles?",
        "category": "Architectural Patterns"
    },
    {
        "text": "If a user cancels a long-running request mid-process, how do you ensure server resources are immediately released?",
        "category": "Resource Lifecycle"
    },
    {
        "text": "How do you track and audit user actions and system logs in compliance with data privacy regulations?",
        "category": "Logging & Auditing"
    },
    {
        "text": "In case of total model api failure, how does the system fallback to local mock generators or cached responses?",
        "category": "Resilience"
    },
    {
        "text": "Explain the strategy used to version-control database schema updates alongside code modifications without downtime.",
        "category": "Database Migrations"
    }
]

# Helper to populate Chroma DB
def seed_questions_into_chroma():
    collection = get_chroma_collection()
    # Check if empty
    if collection.count() == 0:
        # Use embeddings model to vectorize
        try:
            embeddings = GoogleGenerativeAIEmbeddings(
                model="models/text-embedding-004",
                google_api_key=settings.GOOGLE_API_KEY
            )
            
            ids = [f"bank-{i}" for i in range(len(DEFAULT_QUESTION_BANK))]
            documents = [q["text"] for q in DEFAULT_QUESTION_BANK]
            metadatas = [{"category": q["category"]} for q in DEFAULT_QUESTION_BANK]
            
            # Embed documents
            embedded_docs = embeddings.embed_documents(documents)
            
            # Add to Chroma collection
            collection.add(
                ids=ids,
                embeddings=embedded_docs,
                documents=documents,
                metadatas=metadatas
            )
        except Exception as e:
            # Fallback mock setup if Embeddings fail (API key issues)
            ids = [f"bank-{i}" for i in range(len(DEFAULT_QUESTION_BANK))]
            documents = [q["text"] for q in DEFAULT_QUESTION_BANK]
            metadatas = [{"category": q["category"]} for q in DEFAULT_QUESTION_BANK]
            collection.add(
                ids=ids,
                documents=documents,
                metadatas=metadatas
            )


@router.post("/generate-questions", response_model=GenerateQuestionsResponse)
async def generate_defense_questions(
    payload: GenerateQuestionsRequest,
    x_user_id: Optional[str] = Header(None, alias="X-User-ID"),
    db: Session = Depends(get_db)
):
    # Ensure user exists
    user_uuid = x_user_id or str(uuid.uuid4())
    user = db.query(User).filter(User.user_id == user_uuid).first()
    if not user:
        user = User(user_id=user_uuid)
        db.add(user)
        db.commit()
        db.refresh(user)

    # Perform vector similarity search
    retrieved_questions = []
    try:
        collection = get_chroma_collection()
        
        # If API key is available, use Google Embeddings to search
        has_key = (settings.MODEL_PROVIDER == "google" and settings.GOOGLE_API_KEY) or \
                  (settings.MODEL_PROVIDER == "openai" and settings.OPENAI_API_KEY)
                  
        if has_key:
            embeddings = GoogleGenerativeAIEmbeddings(
                model="models/text-embedding-004",
                google_api_key=settings.GOOGLE_API_KEY
            )
            query_vector = embeddings.embed_query(payload.assignment_text[:2000])
            results = collection.query(
                query_embeddings=[query_vector],
                n_results=5
            )
        else:
            results = collection.query(
                query_texts=[payload.assignment_text[:1000]],
                n_results=5
            )

        if results and "documents" in results and results["documents"]:
            docs = results["documents"][0]
            metas = results["metadatas"][0] if "metadatas" in results else []
            for i in range(len(docs)):
                category = metas[i]["category"] if i < len(metas) else "General"
                retrieved_questions.append({
                    "question_text": docs[i],
                    "category": category
                })
    except Exception as e:
        # Fallback to random default questions if search fails
        for q in DEFAULT_QUESTION_BANK[:5]:
            retrieved_questions.append({
                "question_text": q["text"],
                "category": q["category"]
            })

    # Fallback check
    if not retrieved_questions:
        for q in DEFAULT_QUESTION_BANK[:5]:
            retrieved_questions.append({
                "question_text": q["text"],
                "category": q["category"]
            })

    # Call Gemini to synthesize questions specific to user's code
    try:
        has_key = (settings.MODEL_PROVIDER == "google" and settings.GOOGLE_API_KEY) or \
                  (settings.MODEL_PROVIDER == "openai" and settings.OPENAI_API_KEY)
        
        if not has_key:
            # Mock questions fallback
            synthesized = [
                {"question_text": f"Evaluate scaling for: {retrieved_questions[0]['question_text']}", "category": retrieved_questions[0]["category"]},
                {"question_text": f"Evaluate architecture for: {retrieved_questions[1]['question_text']}", "category": retrieved_questions[1]["category"]},
                {"question_text": f"Evaluate fallbacks for: {retrieved_questions[2]['question_text']}", "category": retrieved_questions[2]["category"]}
            ]
        else:
            llm = get_llm(temperature=0.4)
            
            system_prompt = f"You are a senior tech lead reviewing a candidate's technical home assignment.\nYou are given the candidate's code submission and a list of structural/conceptual design questions.\nSynthesize exactly {payload.num_questions} customized project defense questions.\nFor each question:\n- Blend the retrieved conceptual query with the candidate's actual submitted code/documentation.\n- Focus on practical trade-offs, scalability bottlenecks, database transactions, concurrency, or security flaws apparent in their code.\n- Write the questions clearly in English."
            
            user_prompt = f"Candidate's Code/Project Submission:\n---\n{payload.assignment_text}\n---\n\nRetrieved Base System Questions:\n{str(retrieved_questions)}\n\nSynthesize exactly {payload.num_questions} questions."
            
            prompt = ChatPromptTemplate.from_messages([
                ("system", "{system_text}"),
                ("user", "{user_text}")
            ])
            
            structured_llm = llm.with_structured_output(LLMQuestionsList)
            chain = prompt | structured_llm
            llm_result = chain.invoke({"system_text": system_prompt, "user_text": user_prompt})
            
            synthesized = [
                {"question_text": q.question_text, "category": q.category}
                for q in llm_result.questions
            ]

        # Map to Response Question Item
        questions_list = []
        for idx, q in enumerate(synthesized):
            questions_list.append(QuestionItem(
                question_id=f"q-{idx + 1}",
                question_text=q["question_text"],
                category=q["category"]
            ))

        # Save Interview row to database
        db_interview = Interview(
            user_id=user.user_id,
            assignment_text=payload.assignment_text,
            questions_json=[q.model_dump() for q in questions_list]
        )
        db.add(db_interview)
        db.commit()
        db.refresh(db_interview)

        return GenerateQuestionsResponse(
            interview_id=db_interview.interview_id,
            questions=questions_list
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to generate defense questions: {str(e)}")


@router.post("/evaluate", response_model=EvaluateInterviewResponse)
async def evaluate_defense_answers(
    payload: EvaluateInterviewRequest,
    db: Session = Depends(get_db)
):
    # Fetch interview row from DB
    interview = db.query(Interview).filter(Interview.interview_id == payload.interview_id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview session not found")

    # Map question answers to context
    answers_mapping = {ans.question_id: ans.answer_text for ans in payload.answers}
    questions_list = interview.questions_json or []

    # Format questions and answers for prompt
    conversation_str = ""
    for q in questions_list:
        q_id = q.get("question_id")
        q_text = q.get("question_text")
        ans_text = answers_mapping.get(q_id, "No answer provided.")
        conversation_str += f"Question ID: {q_id}\nQuestion: {q_text}\nCandidate's Answer: {ans_text}\n\n"

    try:
        has_key = (settings.MODEL_PROVIDER == "google" and settings.GOOGLE_API_KEY) or \
                  (settings.MODEL_PROVIDER == "openai" and settings.OPENAI_API_KEY)

        if not has_key:
            # Fallback mock evaluation
            evals = []
            for q in questions_list:
                evals.append(LLMAnswerEvaluation(
                    question_id=q.get("question_id"),
                    score=85,
                    rationale="תשובה טובה המציגה הבנה בסיסית של הנושא.",
                    model_answer="Implement a pooling utility...",
                    improved_phrasing="To handle loads, I implement connection pooling."
                ))
            llm_result = LLMEvaluationResult(
                overall_score=85,
                general_feedback="הפגנת הבנה טובה של עקרונות המערכת. מומלץ להעמיק בניהול זיכרון וביצועים.",
                evaluations=evals
            )
        else:
            llm = get_llm(temperature=0.3)
            
            system_prompt = "You are a senior tech lead evaluating a candidate's technical defense of their home assignment.\nCompare the candidate's answers against the context of their submitted code.\nFor each answer:\n- Score it between 0 and 100.\n- Provide a detailed rationale/feedback strictly in Hebrew.\n- Provide an ideal model answer in English.\n- Provide an improved, highly technical phrasing in English that the candidate could use to sound more senior.\n\nAlso provide an overall score (1-100) and general high-level feedback strictly in Hebrew."
            
            user_prompt = f"Candidate's Original Assignment Submission:\n---\n{payload.assignment_text}\n---\n\nCandidate's Answers:\n{conversation_str}"
            
            prompt = ChatPromptTemplate.from_messages([
                ("system", "{system_text}"),
                ("user", "{user_text}")
            ])
            
            structured_llm = llm.with_structured_output(LLMEvaluationResult)
            chain = prompt | structured_llm
            llm_result = chain.invoke({"system_text": system_prompt, "user_text": user_prompt})

        # Save to database
        db_eval = InterviewEvaluation(
            interview_id=interview.interview_id,
            overall_score=llm_result.overall_score,
            general_feedback=llm_result.general_feedback,
            evaluations_json=[e.model_dump() for e in llm_result.evaluations]
        )
        db.add(db_eval)
        db.commit()
        db.refresh(db_eval)

        # Map to response schema
        response_evals = []
        for e in llm_result.evaluations:
            response_evals.append(QuestionEvaluationItem(
                question_id=e.question_id,
                score=e.score,
                rationale=e.rationale,
                model_answer=e.model_answer,
                improved_phrasing=e.improved_phrasing
            ))

        return EvaluateInterviewResponse(
            overall_score=db_eval.overall_score,
            general_feedback=db_eval.general_feedback,
            evaluations=response_evals
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to evaluate defense answers: {str(e)}")
