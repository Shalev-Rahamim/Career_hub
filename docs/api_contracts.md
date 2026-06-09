# API Contracts Specification

This document defines the interface between the **Frontend** (Next.js) and the **Backend** (FastAPI) for both decoupled modules.

---

## Headers (Global)
All requests must include a user identifier in the headers to track sessions.
*   **Header Key:** `X-User-ID`
*   **Format:** `UUIDv4`

---

## Feature A: AI Resume Builder & Optimizer

### 1. Analyze Resume
Analyzes an uploaded resume PDF file and returns structured recommendations.
*   **Endpoint:** `POST /api/resume/analyze`
*   **Content-Type:** `multipart/form-data`
*   **Request Payload:**
    *   `file`: Binary (PDF file, maximum size 5MB)
    *   `raw_text`: String (optional fallback)
    *   `language`: String ("hebrew" or "english")
*   **Response Payload (`application/json`):**
```json
{
  "resume_id": "8a9c3d4e-1234-5678-abcd-ef0123456789",
  "original_text": "Full text extracted from the PDF...",
  "score": 82,
  "points_to_keep": [
    "Strong technical stack in React & FastAPI.",
    "Measurable metrics shown in software engineering roles."
  ],
  "points_to_improve": [
    "Summary section contains generic descriptions.",
    "Needs more quantitative results in the projects section."
  ],
  "dynamic_recommendations": [
    {
      "recommendation_id": "rec-1",
      "section": "Professional Summary",
      "original_text": "Experienced software developer seeking a position...",
      "suggested_text": "Results-oriented Software Engineer with a track record of building performant APIs...",
      "rationale": "Replaces generic passive phrasing with active, skill-focused terms."
    }
  ],
  "optimized_resume_text": "Optimized resume text block..."
}
```

### 2. Live Resume Chat
Interactively chat with the AI about resume modifications.
*   **Endpoint:** `POST /api/resume/chat`
*   **Content-Type:** `application/json`
*   **Request Payload:**
```json
{
  "session_id": "session-12345",
  "resume_id": "8a9c3d4e-1234-5678-abcd-ef0123456789",
  "user_message": "Can you rewrite my project summary to sound more senior?"
}
```
*   **Response Payload (`application/json`):**
```json
{
  "response": "Here is an updated version for your project section...",
  "updated_resume_text": "Updated full resume text..."
}
```

---

## Feature B: AI Home Assignment Defense Simulator

### 3. Generate Assignment Defense Questions
Queries the vector database using the assignment code/architecture and generates project defense questions.
*   **Endpoint:** `POST /api/interview/generate-questions`
*   **Content-Type:** `application/json`
*   **Request Payload:**
```json
{
  "assignment_text": "class DatabaseConnector:\n    def __init__(self):\n        self.db = sqlite3.connect('test.db')...",
  "num_questions": 3
}
```
*   **Response Payload (`application/json`):**
```json
{
  "interview_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "questions": [
    {
      "question_id": "q-1",
      "question_text": "In your DatabaseConnector class, you are connecting directly on instantiation without connection pooling. How will this scale under high concurrent loads?",
      "category": "Architecture"
    },
    {
      "question_id": "q-2",
      "question_text": "How did you manage database connection closures in case of query exceptions?",
      "category": "Stability"
    },
    {
      "question_id": "q-3",
      "question_text": "Did you apply any database constraints or schema migrations for handling entity growth over time?",
      "category": "Database Design"
    }
  ]
}
```

### 4. Evaluate Assignment Defense Answers
Evaluates the candidate's answers against design patterns and provides structured grading feedback.
*   **Endpoint:** `POST /api/interview/evaluate`
*   **Content-Type:** `application/json`
*   **Request Payload:**
```json
{
  "interview_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "assignment_text": "class DatabaseConnector:\n    def __init__(self)...",
  "answers": [
    {
      "question_id": "q-1",
      "answer_text": "I would use a pool like SQLAlchemy SessionLocal to reuse connections."
    },
    {
      "question_id": "q-2",
      "answer_text": "I used a try/finally block to ensure close() is called."
    },
    {
      "question_id": "q-3",
      "answer_text": "I haven't thought about migrations, but I would probably use Alembic."
    }
  ]
}
```
*   **Response Payload (`application/json`):**
```json
{
  "overall_score": 88,
  "general_feedback": "The candidate shows strong awareness of stability practices but should study scaling strategies.",
  "evaluations": [
    {
      "question_id": "q-1",
      "score": 90,
      "rationale": "Correctly identified connection pooling using SQLAlchemy SessionLocal.",
      "model_answer": "To scale database connectivity under high load, implement connection pooling (e.g., SQLAlchemy QueuePool) to limit active open connections and reuse connections.",
      "improved_phrasing": "To handle high concurrent traffic, I would replace the single-connection instantiation with a connection pooling pool manager like SQLAlchemy QueuePool."
    },
    {
      "question_id": "q-2",
      "score": 95,
      "rationale": "Accurately used try/finally blocks to protect resource release.",
      "model_answer": "Ensure all database queries run inside try-except-finally blocks, explicitly calling conn.close() in the finally block.",
      "improved_phrasing": "I wrapped queries in try-finally blocks, guaranteeing that database connections close under any exception state."
    },
    {
      "question_id": "q-3",
      "score": 80,
      "rationale": "Correctly referenced Alembic. Could expand on schema versioning strategies.",
      "model_answer": "Use Alembic to define declarative structural migrations versioned in Git alongside database entity definitions.",
      "improved_phrasing": "For database migrations, I integrate Alembic to generate declarative, version-controlled schema upgrades."
    }
  ]
}
```
