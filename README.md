# AI-Driven Career Readiness Hub

An automated, high-efficiency platform designed to accelerate candidate job readiness through decoupled AI services: a structural resume enhancer/generator and a contextual home assignment technical defense simulator.

---

## 📁 Repository Documentation
All project planning, requirements, and design documentations are located in the `docs/` directory:
* **Product Requirements Document:** [docs/PRD.md](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/docs/PRD.md)
* **Software Requirements Specification (אפיון מערכת):** [docs/SRS.docx](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/docs/SRS.docx)
* **API Specifications:** [docs/api_contracts.md](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/docs/api_contracts.md)
* **Project Work Journal (יומן עבודה):** [docs/JOURNAL.docx](file:///c:/Users/Shalev/Coding/CyberProAi/Career_Hub/docs/JOURNAL.docx)

---

## 🏗️ Directory Structure
This project is structured as a **Monorepo**:
```
├── backend/            # FastAPI (Python), SQLAlchemy, Chroma DB, sqlite
├── frontend/           # Next.js (React), Tailwind CSS
├── docs/               # Project documents, PRD, SRS, API contracts, journal
├── .gitignore          # Global git ignore configurations
└── README.md           # This file
```

---

## 🚀 Getting Started

### 🐍 Backend Setup (FastAPI)
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
   ```bash
   pip install -r requirements.txt
   ```
5. **Run the server locally:**
   ```bash
   uvicorn app.main:app --reload
   ```

---

### ⚛️ Frontend Setup (Next.js)
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

## 🤝 Git Collaboration Guidelines

To keep the repository clean and avoid merge conflicts, please follow these rules:

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
3. Ensure both backend and frontend build successfully without errors before requesting a review.
4. Obtain at least one peer approval before merging.
