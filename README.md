# AI-Driven Career Readiness Hub

An automated, high-efficiency platform designed to accelerate candidate job readiness through decoupled AI services: a structural resume enhancer/generator and a contextual job-description-to-interview-simulator.

---

## Repository Documentation
* **Project Handover Manual (מסמך העברת מקל):** [HANDOVER.md](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/HANDOVER.md)
* **Project Roadmap & Epics (ניהול ומשימות פרויקט):** [ROADMAP.md](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/ROADMAP.md)
* **Product Requirements:** [PRD.md](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/PRD.md)
* **API Specifications:** [api_contracts.md](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/api_contracts.md)

---

## Directory Structure
This project is structured as a **Monorepo**:
```
├── backend/            # FastAPI, Python, LangChain, Vector Database
├── frontend/           # Next.js, React, Tailwind CSS
├── .gitignore          # Global git ignore configurations
├── PRD.md              # Product Requirement Document
├── api_contracts.md    # API contracts for frontend-backend communication
└── README.md           # This file
```

---

## Getting Started

### Backend Setup (FastAPI)
1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```
2. **Create a Python virtual environment:**
   ```bash
   python -m venv .venv
   ```
3. **Activate the virtual environment:**
   * **Windows:**
     ```bash
     .venv\Scripts\activate
     ```
   * **macOS/Linux:**
     ```bash
     source .venv/bin/activate
     ```
4. **Install dependencies:**
   *(Ensure requirements.txt is created during backend setup)*
   ```bash
   pip install -r requirements.txt
   ```
5. **Run the server locally:**
   ```bash
   uvicorn main:app --reload
   ```

---

### Frontend Setup (Next.js)
1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## Git Collaboration Guidelines

To keep the repository clean and avoid merging conflicts, please follow these rules:

### 1. Branch Naming Conventions
* For new features: `feature/your-feature-name` (e.g., `feature/resume-upload`)
* For bug fixes: `bugfix/your-fix-name` (e.g., `bugfix/api-headers-fix`)
* For documentation updates: `docs/update-name` (e.g., `docs/readme-setup`)

### 2. Commit Message Guidelines
Use clear, imperative commit messages:
* `feat: add PDF parsing to resume upload endpoint`
* `fix: correct token calculation inside LLM chain`
* `docs: add local setup guide to README`

### 3. Pull Request Process
1. Always create a branch from `main`.
2. Do not merge directly to `main`. Open a Pull Request (PR).
3. Ensure the backend and frontend build successfully without errors before requesting a review.
4. Obtain at least one peer approval before merging.
