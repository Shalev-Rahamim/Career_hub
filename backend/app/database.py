from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Determine if using SQLite to add thread connection arguments
connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

# Create SQLAlchemy engine
engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args
)

# Session local factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative base class for models
Base = declarative_base()

# Dependency for routes to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
