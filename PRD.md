# Product Requirement Document (PRD)

## 1. Project Overview

*   **Project Name:** AI-Driven Career Readiness Hub (Project Defense Edition)
*   **Core Value Proposition:** An automated, high-efficiency platform designed to accelerate candidate job readiness through decoupled AI services: a structural resume enhancer/generator and a project-specific Home Assignment Defense Simulator.
*   **Target Audience:** Job seekers, college graduates, and professionals preparing for technical interviews, technical reviews, and home assignment defense presentations.

---

## 2. Product Architecture & Decoupling Strategy

To ensure independent development cycles and rapid deployment within 48 hours, the system architecture isolates the two primary features into autonomous modules.

```
                          ┌────────────────────────┐
                          │   Next.js Frontend     │
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

*   **User Flow:** User uploads/pastes resume → FastAPI processes and analyzes using LLM (Gemini 1.5 Flash) → Next.js renders:
    *   Left Panel (Top): Actual PDF in iframe viewport with custom zoom parameters.
    *   Right Panel (Top): Circular score badge and points to keep vs. improve.
    *   Left Panel (Bottom): Optimized text (RTL/LTR dynamic text alignment).
    *   Right Panel (Bottom): Inline contextual revision chat window.
*   **Technical Integration:**
    *   FastAPI Endpoints: `POST /api/resume/analyze` and `POST /api/resume/chat`.
    *   AI Layer: LangChain structured Pydantic schema validation.

### Feature B: AI Technical Home Assignment Defense Simulator

*   **User Flow:** User uploads or pastes their completed project code, architecture layout, or project documentation → FastAPI queries Chroma DB for conceptual technical questions (architecture, optimization, performance scaling, security, design patterns) -> Gemini 1.5 Flash synthesizes 3-5 tailored project defense questions -> Next.js displays simulation wizard -> User submits answers -> FastAPI grades answers using structured output -> Next.js displays score dashboard with model answer comparisons.
*   **Functional Requirements:**
    *   Home Assignment Input: Support direct code text pasting or project docs.
    *   Project Defense Wizard: Multi-step layout presenting synthesized questions with distinct answer blocks.
    *   Evaluation Matrix: Dynamic grading providing score per question, technical rationale, perfect model answers, and phrasing corrections.
*   **Technical Integration:**
    *   FastAPI Endpoints: `POST /api/interview/generate-questions` and `POST /api/interview/evaluate`.
    *   Vector Store: Chroma DB running locally/in-memory with `GoogleGenerativeAIEmbeddings` (text-embedding-004) loaded with 15+ standard senior design and technical evaluation questions.
    *   AI Layer: LangChain `ChatGoogleGenerativeAI` with Pydantic structured output mapping.

---

## 4. Technical Stack & Data Models

### System Stack

*   **Frontend:** Next.js, React, Tailwind CSS (Hebrew RTL Responsive Layout)
*   **Backend:** FastAPI (Python), Uvicorn, SQLite (Relational database)
*   **AI Layer:** LangChain (LCEL) with ChatGoogleGenerativeAI (Gemini 1.5/3.5 Flash)
*   **Vector Database:** Chroma DB (locally indexed bank of architectural/design pattern evaluation questions)

### Core Schema Design

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          Database Schema (MVP)                          │
├─────────────────────────────────────────────────────────────────────────┤
│  Users Table:                                                           │
│  - user_id (UUID, Primary Key)                                          │
│                                                                         │
│  Resumes Table (Feature A):                                             │
│  - resume_id (UUID, Primary Key)                                        │
│  - user_id (Foreign Key)                                                │
│  - original_text (TEXT)                                                 │
│  - optimized_text (TEXT)                                                │
│  - score (INTEGER)                                                      │
│  - points_to_keep (JSON)                                                │
│  - points_to_improve (JSON)                                             │
│                                                                         │
│  Interviews Table (Feature B):                                          │
│  - interview_id (UUID, Primary Key)                                     │
│  - user_id (Foreign Key)                                                │
│  - assignment_text (TEXT)                                               │
│  - questions_json (JSON)                                                │
│                                                                         │
│  InterviewEvaluations Table (Feature B):                                │
│  - evaluation_id (UUID, Primary Key)                                    │
│  - interview_id (Foreign Key)                                           │
│  - overall_score (INTEGER)                                              │
│  - general_feedback (TEXT)                                              │
│  - evaluations_json (JSON)                                              │
└─────────────────────────────────────────────────────────────────────────┘
```
