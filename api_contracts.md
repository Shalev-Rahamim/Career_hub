# API Contracts Specification

This document defines the interface between the **Frontend** (Next.js) and the **Backend** (FastAPI). All endpoints must adhere strictly to these JSON structures.

---

## Headers (Global)
All requests must include a client-side generated user identifier in the headers to track sessions.
* **Header Key:** `X-User-ID`
* **Format:** `UUIDv4` (e.g., `123e4567-e89b-12d3-a456-426614174000`)

---

## Feature A: AI Resume Builder & Optimizer

### 1. Analyze Resume
Analyzes an uploaded resume PDF file and returns granular structural recommendations.

* **Endpoint:** `POST /api/resume/analyze`
* **Content-Type:** `multipart/form-data`
* **Request Payload:**
  * `file`: Binary (PDF file, maximum size 5MB)
* **Response Payload (`application/json`):**
```json
{
  "resume_id": "8a9c3d4e-1234-5678-abcd-ef0123456789",
  "original_text": "Full text extracted from the PDF...",
  "strengths": [
    "Strong technical stack listed in the skills section.",
    "Clear metrics shown in the latest software engineering role."
  ],
  "weaknesses": [
    "Summary section is too generic.",
    "Lack of measurable achievements in the project section."
  ],
  "recommendations": [
    {
      "recommendation_id": "rec-1",
      "section": "Professional Summary",
      "original_text": "Experienced software engineer looking for a challenging role...",
      "suggested_text": "Result-oriented Software Engineer with 3+ years of experience specializing in React and Python, seeking to leverage full-stack expertise to build high-performance systems...",
      "rationale": "Replaces generic passive phrasing with active, skill-focused impact words."
    },
    {
      "recommendation_id": "rec-2",
      "section": "Experience - CyberPro Tech",
      "original_text": "Responsible for maintaining backend systems and APIs.",
      "suggested_text": "Optimized and maintained 15+ backend FastAPI microservices, reducing server latency by 20% and improving overall test coverage to 90%.",
      "rationale": "Adds concrete metrics and specifies the technologies used."
    }
  ]
}
```

### 2. Generate Optimized Resume
Applies selected/edited recommendations to produce the final optimized raw text block.

* **Endpoint:** `POST /api/resume/generate`
* **Content-Type:** `application/json`
* **Request Payload:**
```json
{
  "resume_id": "8a9c3d4e-1234-5678-abcd-ef0123456789",
  "original_text": "Full text extracted from the PDF...",
  "applied_recommendations": [
    {
      "recommendation_id": "rec-1",
      "suggested_text": "Result-oriented Software Engineer with 3+ years of experience specializing in React and Python, seeking to leverage full-stack expertise to build high-performance systems..."
    },
    {
      "recommendation_id": "rec-2",
      "suggested_text": "Optimized and maintained 15+ backend FastAPI microservices, reducing server latency by 20% and improving overall test coverage to 90%."
    }
  ]
}
```
* **Response Payload (`application/json`):**
```json
{
  "optimized_text": "Result-oriented Software Engineer with 3+ years of experience... \n\nEXPERIENCE\nOptimized and maintained 15+ backend FastAPI microservices..."
}
```

---

## Feature B: AI Interview & Test Simulator

### 3. Generate Interview Questions
Queries the vector database using the target job description and generates tailored interview questions.

* **Endpoint:** `POST /api/interview/generate-questions`
* **Content-Type:** `application/json`
* **Request Payload:**
```json
{
  "job_description": "We are seeking a Backend Engineer with experience in Python, FastAPI, PostgreSQL, and vector databases. The role involves building scalable APIs and integrations...",
  "num_questions": 3
}
```
* **Response Payload (`application/json`):**
```json
{
  "interview_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "questions": [
    {
      "question_id": "q-1",
      "question_text": "Explain how you optimize query performance in PostgreSQL when dealing with large datasets.",
      "category": "Technical"
    },
    {
      "question_id": "q-2",
      "question_text": "Describe a scenario where you had to design a FastAPI endpoint supporting large file uploads. How did you structure it?",
      "category": "Technical"
    },
    {
      "question_id": "q-3",
      "question_text": "Tell me about a time you had a conflict with a team member regarding system architecture. How did you resolve it?",
      "category": "Behavioral"
    }
  ]
}
```

### 4. Evaluate Interview Answers
Evaluates the user's submitted answers against the job description and generates analytical feedback.

* **Endpoint:** `POST /api/interview/evaluate`
* **Content-Type:** `application/json`
* **Request Payload:**
```json
{
  "interview_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "job_description": "We are seeking a Backend Engineer with experience in Python, FastAPI, PostgreSQL, and vector databases...",
  "answers": [
    {
      "question_id": "q-1",
      "answer_text": "I would add indexes to the foreign keys and use EXPLAIN ANALYZE to find slow parts of the query."
    },
    {
      "question_id": "q-2",
      "answer_text": "I would use FastAPI's UploadFile parameter, which reads files in memory or chunks them to disk to avoid memory overflow."
    },
    {
      "question_id": "q-3",
      "answer_text": "We disagreed on using PostgreSQL vs MongoDB. I set up a quick benchmark to show postgres performance under our query load, and we agreed based on data."
    }
  ]
}
```
* **Response Payload (`application/json`):**
```json
{
  "overall_score": 85,
  "general_feedback": "Overall, the responses show solid practical knowledge of PostgreSQL indexing, FastAPI file streaming, and data-driven conflict resolution.",
  "evaluations": [
    {
      "question_id": "q-1",
      "score": 80,
      "rationale": "Correctly identified indexing and EXPLAIN ANALYZE. Could have mentioned database connection pooling or partition strategies for a senior role.",
      "model_answer": "Use connection pooling, define partial or composite indexes based on query filters, restructure joins, and inspect query plans using EXPLAIN ANALYZE.",
      "improved_phrasing": "To optimize performance, I analyze slow queries using EXPLAIN ANALYZE, apply indexes (B-Tree or composite) on filtered columns, and ensure efficient table joins."
    },
    {
      "question_id": "q-2",
      "score": 90,
      "rationale": "Excellent understanding of FastAPI's UploadFile chunking mechanics.",
      "model_answer": "Use FastAPI's UploadFile which utilizes temporary file storage, and stream chunks of data directly to disk or S3 to keep memory consumption low.",
      "improved_phrasing": "I use FastAPI's UploadFile to stream file chunks asynchronously, preventing memory bloating even with multi-gigabyte uploads."
    },
    {
      "question_id": "q-3",
      "score": 85,
      "rationale": "Good behavioral response emphasizing quantitative comparison rather than emotional arguing.",
      "model_answer": "Collaborative discussion using data benchmarks, proof-of-concept tests, and consensus building to resolve technical disagreements.",
      "improved_phrasing": "I resolved the debate by creating a reproducible benchmark comparing the two technologies, presenting data-driven tradeoffs to reach a team consensus."
    }
  ]
}
```

---

## HTTP Error Codes (Standardized)

| Code | Status | Meaning | Reason |
| :--- | :--- | :--- | :--- |
| `400` | Bad Request | Invalid Input | Missing required fields, unsupported file type (non-PDF) |
| `413` | Payload Too Large | File Too Big | Uploaded resume file exceeds 5MB size limit |
| `404` | Not Found | Entity Missing | Requesting generation or evaluation for a non-existent `resume_id` or `interview_id` |
| `500` | Internal Server Error | AI Gateway Failure | LangChain or Vector DB failed to respond correctly |
