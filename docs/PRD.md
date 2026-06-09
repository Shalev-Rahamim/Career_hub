# Product Requirement Document (PRD)

## 1. Project Overview

*   **Project Name:** Career Readiness Hub
*   **Core Value Proposition:** A career preparation platform designed to help junior developers and job seekers get ready for technical recruitment processes. The platform solves two main challenges: tailoring resumes to meet tech industry expectations, and simulating realistic technical defense interviews for home assignments.
*   **Target Audience:** Job seekers, computer science graduates, and developers preparing for technical interviews, design reviews, or home assignment presentations.

---

## 2. Product Architecture & Service Structure

To allow independent development, fast iterations, and stable releases, the application is divided into two separate, decoupled features:

```
                           ┌────────────────────────┐
                           │    Next.js Frontend    │
                           └───────────┬────────────┘
                                       │
                       ┌───────────────┴───────────────┐
                       ▼                               ▼
            /api/resume/* Endpoints        /api/interview/* Endpoints
                       │                               │
             ┌─────────▼─────────┐           ┌─────────▼─────────┐
             │   Resume Service  │           │ Defense Service   │
             └─────────┬─────────┘           └─────────┬─────────┘
                       │                               │
             ┌─────────▼─────────┐           ┌─────────▼─────────┐
             │ LangChain Prompt  │           │ Vector Store RAG  │
             │ (Structured JSON) │           │ (Architecture DB) │
             └───────────────────┘           └───────────────────┘
```

---

## 3. Core Feature Requirements

### Feature A: AI Resume Builder & Optimizer

*   **Goal:** Help candidates identify weak points in their resumes and rewrite them using professional software terminology and concrete impact metrics.
*   **User Flow:**
    1. The user uploads their resume as a PDF file or pastes it as raw text.
    2. The backend extracts the text, reviews it, and returns structured feedback.
    3. The Next.js frontend displays the original document on one side, and the optimization dashboard on the other.
    4. The dashboard shows a completeness score, a list of strengths to keep, and specific sections to improve (showing original text, suggested change, and the explanation).
    5. The user can open an interactive chat to discuss revisions or ask for alternative phrasings.

*   **Technical Integration:**
    *   API Endpoints: `POST /api/resume/analyze` (extraction and evaluation) and `POST /api/resume/chat` (contextual revision chat).
    *   AI Implementation: LangChain parser with Pydantic schemas to ensure clean JSON responses.

### Feature B: AI Technical Home Assignment Defense Simulator

*   **Goal:** Prepare candidates for the "home assignment defense" stage of interviews, where they must explain their code, architectural decisions, security choices, and system scaling.
*   **User Flow:**
    1. The user uploads the home assignment instructions (guidelines) along with their completed project code or architecture documentation.
    2. The backend queries a vector database (Chroma DB) containing standard senior-level system design and coding questions.
    3. The system blends these base questions with the candidate's actual files to generate 3 to 5 custom interview questions.
    4. The candidate goes through a wizard-style interface to answer each question.
    5. Upon submission, the system evaluates the answers, grades them, and presents a comparison dashboard showing the candidate's answer, a senior-level model answer, and a suggested phrasing rewrite.

*   **Technical Integration:**
    *   API Endpoints: `POST /api/interview/generate-questions` and `POST /api/interview/evaluate`.
    *   Vector Storage: A local Chroma DB seeded with 16 fundamental architectural and design pattern questions.
    *   AI Implementation: Google GenAI SDK using Gemini 3.5 Flash for multimodal file reading and structured evaluation.

---

## 4. Technical Stack & Data Models

### System Stack

*   **Frontend:** Next.js, React, Tailwind CSS (Hebrew RTL responsive layout)
*   **Backend:** FastAPI (Python), Uvicorn, SQLite (Relational database)
*   **AI Layer:** LangChain (LCEL) & Google GenAI SDK (Gemini 3.5 Flash)
*   **Vector Database:** Chroma DB (locally indexed bank of architectural/design pattern evaluation questions)

### Core Schema Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Database Schema (MVP)                          │
├─────────────────────────────────────────────────────────────────────────┤
│  Users Table:                                                           │
│  - user_id (UUID, Primary Key)                                          │
│  - email (String, Nullable)                                             │
│  - created_at (DateTime)                                                │
│                                                                         │
│  Resumes Table (Feature A):                                             │
│  - resume_id (UUID, Primary Key)                                        │
│  - user_id (Foreign Key)                                                │
│  - original_text (TEXT)                                                 │
│  - optimized_text (TEXT)                                                │
│  - score (INTEGER)                                                      │
│  - points_to_keep (JSON)                                                │
│  - points_to_improve (JSON)                                             │
│  - dynamic_recommendations (JSON)                                       │
│  - created_at (DateTime)                                                │
│                                                                         │
│  ChatMessages Table (Feature A):                                        │
│  - message_id (UUID, Primary Key)                                       │
│  - session_id (String, Index)                                           │
│  - role (String)                                                        │
│  - content (TEXT)                                                       │
│  - created_at (DateTime)                                                │
│                                                                         │
│  Interviews Table (Feature B):                                          │
│  - interview_id (UUID, Primary Key)                                     │
│  - user_id (Foreign Key)                                                │
│  - assignment_file_uri (String)                                         │
│  - solution_file_uri (String)                                           │
│  - difficulty_level (String)                                            │
│  - num_questions (Integer)                                              │
│  - language (String)                                                    │
│  - questions_json (JSON)                                                │
│  - created_at (DateTime)                                                │
│                                                                         │
│  InterviewEvaluations Table (Feature B):                                │
│  - evaluation_id (UUID, Primary Key)                                    │
│  - interview_id (Foreign Key)                                           │
│  - overall_score (INTEGER)                                              │
│  - general_feedback (TEXT)                                              │
│  - evaluations_json (JSON)                                              │
│  - created_at (DateTime)                                                │
└─────────────────────────────────────────────────────────────────────────┘
```
