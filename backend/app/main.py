from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import resume
from app.config import settings

# Create SQLite database tables if they do not exist
Base.metadata.create_all(bind=engine)

# Initialize FastAPI App
app = FastAPI(
    title="CyberProAI Career Readiness Hub API",
    description="Decoupled backend API for Resume Optimization & RAG-based Interview Simulation",
    version="1.0.0"
)

# Configure CORS Middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(resume.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to CyberProAI Career Hub API. The services are running.",
        "provider": settings.MODEL_PROVIDER,
        "model": settings.LLM_MODEL
    }
