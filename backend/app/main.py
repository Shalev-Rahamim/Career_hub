from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import resume, interview
from app.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Seed Chroma DB with the default architectural question bank
    try:
        interview.seed_questions_into_chroma()
        print("Chroma DB initialization and seeding complete.")
    except Exception as e:
        print(f"Warning: Failed to seed Chroma DB during startup: {e}")
    yield
    # Shutdown logic (optional)
    pass

# Create SQLite database tables if they do not exist
Base.metadata.create_all(bind=engine)

# Initialize FastAPI App
app = FastAPI(
    title="CyberProAI Career Readiness Hub API",
    description="Decoupled backend API for Resume Optimization & AI Home Assignment Defense Simulator",
    version="1.0.0",
    lifespan=lifespan
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
app.include_router(interview.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to CyberProAI Career Hub API. The services are running.",
        "provider": settings.MODEL_PROVIDER,
        "model": settings.LLM_MODEL
    }
