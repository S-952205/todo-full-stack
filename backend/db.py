from sqlmodel import create_engine, Session
from typing import Generator
import os
from dotenv import load_dotenv
from sqlalchemy.pool import QueuePool

# Load environment variables from .env file
load_dotenv()

# Get database URL from environment - require it to be set in .env
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is required")

# Convert postgres:// to postgresql:// if needed (common fix for Neon/Heroku)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Add connection parameters for Neon PostgreSQL
# Set connection pool settings and handle disconnections
engine = create_engine(
    DATABASE_URL,
    echo=False,
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,  # Verify connections before use
    pool_recycle=300,    # Recycle connections after 5 minutes
    connect_args={
        "keepalives_idle": 300,
        "keepalives_interval": 30,
        "keepalives_count": 5,
        # Add SSL parameters for Neon
        "sslmode": "require",
    }
)


def get_session() -> Generator[Session, None, None]:
    """Dependency to get a database session with proper error handling."""
    session = Session(engine)
    try:
        yield session
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()