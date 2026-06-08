from pydantic import BaseModel, Field
from typing import List, Optional

# --- Feature A: Resume Optimizer & Chat Schemas ---

class ResumeRecommendation(BaseModel):
    recommendation_id: str = Field(description="Unique ID for this recommendation, e.g., rec-1")
    section: str = Field(description="The section of the resume, e.g., Experience, Summary, Projects")
    original_text: str = Field(description="The text as it originally appeared in the resume")
    suggested_text: str = Field(description="The optimized/improved version of the text")
    rationale: str = Field(description="Why this change is suggested, linking back to professional PM/civilian tech terminology or impact metrics")

class ResumeAnalysisResponse(BaseModel):
    resume_id: str = Field(description="UUID of the resume stored in the database")
    original_text: str = Field(description="Full extracted text of the resume")
    score: int = Field(description="Overall career readiness/completeness score of the resume (1-100)")
    points_to_keep: List[str] = Field(description="Highlights/strengths of the current resume")
    points_to_improve: List[str] = Field(description="Identified gaps or areas of improvement")
    dynamic_recommendations: List[ResumeRecommendation] = Field(description="Granular text optimizations")
    optimized_resume_text: str = Field(description="Draft of the fully reconstructed and optimized resume text")

# Schema passed to LangChain (we exclude database fields like resume_id to let LLM focus on the analytical task)
class ResumeLLMAnalysis(BaseModel):
    score: int = Field(description="Overall career readiness/completeness score of the resume (1-100)", ge=1, le=100)
    points_to_keep: List[str] = Field(description="Highlights/strengths of the current resume")
    points_to_improve: List[str] = Field(description="Identified gaps or areas of improvement")
    dynamic_recommendations: List[ResumeRecommendation] = Field(description="Granular text optimizations")
    optimized_resume_text: str = Field(description="Draft of the fully reconstructed and optimized resume text")


class ResumeChatRequest(BaseModel):
    session_id: str = Field(description="Session identifier for tracking chat history context")
    resume_id: str = Field(description="The ID of the resume this chat is referencing")
    user_message: str = Field(max_length=1500, description="The student's request/question for resume changes")

class ResumeChatResponse(BaseModel):
    response: str = Field(description="AI response to the chat message")
    updated_resume_text: Optional[str] = Field(default=None, description="Updated resume text if modifications were recommended/applied")


# --- Feature B: Interview Simulator Schemas ---

class GenerateQuestionsRequest(BaseModel):
    job_description: str = Field(description="The target job description text to tailor questions around")
    num_questions: int = Field(default=3, description="Number of interview questions to synthesize (3-5)", ge=3, le=5)

class QuestionItem(BaseModel):
    question_id: str = Field(description="Unique question identifier, e.g., q-1")
    question_text: str = Field(description="The synthesized interview question")
    category: str = Field(description="Category of the question (e.g., Technical, Behavioral)")

class GenerateQuestionsResponse(BaseModel):
    interview_id: str = Field(description="UUID of the created interview simulation session")
    questions: List[QuestionItem] = Field(description="List of tailored questions generated")


class AnswerItem(BaseModel):
    question_id: str = Field(description="ID of the question being answered")
    answer_text: str = Field(description="The candidate's submitted answer text")

class EvaluateInterviewRequest(BaseModel):
    interview_id: str = Field(description="UUID of the interview simulation session")
    job_description: str = Field(description="The target job description context")
    answers: List[AnswerItem] = Field(description="The candidate's answers to the generated questions")


class QuestionEvaluationItem(BaseModel):
    question_id: str = Field(description="ID of the evaluated question")
    score: int = Field(description="Score for this specific answer (0-100)", ge=0, le=100)
    rationale: str = Field(description="Constructive critique detailing what was good and what was missing")
    model_answer: str = Field(description="An exemplar response representing a perfect answer for this question")
    improved_phrasing: str = Field(description="The candidate's answer re-phrased to sound highly professional and impactful")

class EvaluateInterviewResponse(BaseModel):
    overall_score: int = Field(description="Average score across all questions (1-100)")
    general_feedback: str = Field(description="High-level evaluation of candidate's strength and overall performance")
    evaluations: List[QuestionEvaluationItem] = Field(description="Detailed grading matrix for each answer")
