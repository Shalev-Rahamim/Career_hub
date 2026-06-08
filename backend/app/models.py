import datetime
import uuid
from sqlalchemy import Column, String, Integer, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")
    interviews = relationship("Interview", back_populates="user", cascade="all, delete-orphan")


class Resume(Base):
    __tablename__ = "resumes"
    
    resume_id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    original_text = Column(Text, nullable=False)
    optimized_text = Column(Text, nullable=True)
    score = Column(Integer, nullable=True)
    
    # JSON columns for structured results
    points_to_keep = Column(JSON, nullable=True)        # List of strings
    points_to_improve = Column(JSON, nullable=True)     # List of strings
    dynamic_recommendations = Column(JSON, nullable=True) # List of dicts (recommendations)
    
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="resumes")


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    message_id = Column(String(36), primary_key=True, default=generate_uuid)
    session_id = Column(String(36), index=True, nullable=False)
    role = Column(String(50), nullable=False)  # "user" or "assistant"
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)


class Interview(Base):
    __tablename__ = "interviews"
    
    interview_id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    assignment_text = Column(Text, nullable=False)
    
    # JSON list of generated questions: [{"question_id": str, "question_text": str, "category": str}]
    questions_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="interviews")
    evaluation = relationship("InterviewEvaluation", uselist=False, back_populates="interview", cascade="all, delete-orphan")


class InterviewEvaluation(Base):
    __tablename__ = "interview_evaluations"
    
    evaluation_id = Column(String(36), primary_key=True, default=generate_uuid)
    interview_id = Column(String(36), ForeignKey("interviews.interview_id", ondelete="CASCADE"), nullable=False, unique=True)
    overall_score = Column(Integer, nullable=False)
    general_feedback = Column(Text, nullable=True)
    
    # JSON list of evaluations per question: [{"question_id": str, "score": int, "rationale": str, "model_answer": str, "improved_phrasing": str}]
    evaluations_json = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    interview = relationship("Interview", back_populates="evaluation")
