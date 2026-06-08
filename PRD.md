# Product Requirement Document (PRD)

## 1. Project Overview

* **Project Name:** AI-Driven Career Readiness Hub
* **Core Value Proposition:** An automated, high-efficiency platform designed to accelerate candidate job readiness through decoupled AI services: a structural resume enhancer/generator and a contextual job-description-to-interview-simulator.
* **Target Audience:** Job seekers, college graduates, and professionals transitioning between technical or managerial roles.

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
            │   Resume Service  │           │ Interview Service │
            └─────────┬─────────┘           └─────────┬─────────┘
                      │                               │
            ┌─────────▼─────────┐           ┌─────────▼─────────┐
            │ LangChain Prompt  │           │ Vector Store RAG  │
            │ (Structured JSON) │           │  & Evaluation LLM │
            └───────────────────┘           └───────────────────┘
```

---

## 3. Core Feature Requirements

### Feature A: AI Resume Builder & Optimizer

* **User Flow:** User uploads a resume text/file → FastAPI processes and sends structured input to LLM → Next.js displays a side-by-side comparative analysis and a polished raw text layout.
* **Functional Requirements:**
  * Single-field input supporting direct raw text pasting or PDF extraction.
  * Comparative UI: Side-by-side view highlighting original text vs. AI recommendations.
  * Output Engine: Generates an optimized, ready-to-copy text block structured for professional submission.
* **Technical Integration:**
  * FastAPI Endpoints: `POST /api/resume/analyze` and `POST /api/resume/generate`.
  * AI Layer: LangChain `PromptTemplate` utilizing Pydantic structured output formatting to guarantee frontend parsing integrity.

### Feature B: AI Interview & Test Simulator

* **User Flow:** User pastes a target Job Description (JD) → FastAPI queries vector database for contextual technical questions → System serves a dynamic quiz → User submits answers → System computes granular score and analytical feedback.
* **Functional Requirements:**
  * Contextual Querying: Custom text area for target job description inputs.
  * Simulation Interface: Dynamic rendering of 3 to 5 tailored technical/behavioral questions with distinct response blocks.
  * Analytical Feedback Loop: Granular grading matrix providing specific rationale, model answers, and phrasing corrections.
* **Technical Integration:**
  * FastAPI Endpoints: `POST /api/interview/generate-questions` and `POST /api/interview/evaluate`.
  * AI Layer: Vector Search (Chroma/Pinecone) storing an indexed bank of standard technical questions. The top matches are fed into the LLM context to synthesize job-specific questions.

---

## 4. Technical Stack & Data Models

### System Stack

* **Frontend:** Next.js, React, Tailwind CSS (Responsive Layout)
* **Backend:** FastAPI (Python), Uvicorn
* **Database & Vector Store:** SQLite / PostgreSQL (Relational Data), Chroma DB (Vector Indexing)

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
│  - review_json (JSONB)                                                  │
│                                                                         │
│  Interviews Table (Feature B):                                          │
│  - interview_id (UUID, Primary Key)                                     │
│  - user_id (Foreign Key)                                                │
│  - job_description (TEXT)                                               │
│  - qa_pairs_json (JSONB)                                                │
│  - score (INTEGER)                                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Deployment & MVP Roadmap

* **Phase 1: Environment Setup & API Contracts (Hours 1–4):** Monorepo initialization (`/frontend`, `/backend`). Define explicit JSON request/response bodies for all endpoints to allow parallel frontend and backend development.
* **Phase 2: Core Architecture Development (Hours 4–32):** Feature A engineer implements prompt chaining and comparative UI; Feature B engineer builds the vector retrieval pipeline and quiz sequence.
* **Phase 3: Integration & Testing (Hours 32–44):** Cross-feature connection, manual testing of full user flows, error state handling, and verification of structured AI responses.
* **Phase 4: Deployment & Documentation (Hours 44–48):** Deploying frontend via Vercel and backend via Render. Finalizing `.env.example` configurations and launching the presentation deck.
