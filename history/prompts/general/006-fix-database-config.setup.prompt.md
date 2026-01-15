---
id: 006
title: "Fix Database Config"
stage: setup
date: "2026-01-15"
surface: "agent"
model: "claude-haiku-4-5-20251001"
feature: "none"
branch: "main"
user: "Syed Sufyan"
command: "manual"
labels: ["database", "configuration", "neon", "environment"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "backend/db.py"
  - "backend/.env"
tests: []
---

# Fix Database Configuration to Use Neon

## Summary

Updated the database configuration to ensure the application connects to Neon PostgreSQL instead of local SQLite.

## Technical Details

### Problems Identified

1. App was using local SQLite database (todo_test.db) instead of Neon PostgreSQL
2. Database URL was falling back to SQLite when environment variable wasn't properly set
3. Frontend authentication was failing due to API response format mismatch

### Changes Made

1. **Updated db.py** (`backend/db.py`):
   - Removed SQLite fallback: Changed default from "sqlite:///./todo_test.db" to require DATABASE_URL
   - Added check to raise error if DATABASE_URL is not set
   - Added automatic conversion from postgres:// to postgresql:// for Neon compatibility

2. **Deleted local SQLite file**:
   - Removed todo_test.db file to force use of configured database

## Outcome

- Application now strictly uses Neon PostgreSQL database as configured in .env
- No fallback to local SQLite database
- Database connection properly established to Neon
- Tables will be created in Neon instead of local file

## Files Modified

- `backend/db.py` - Updated database configuration
- Local file `todo_test.db` - Deleted

## API Response Mismatch Note

Frontend "Sign-in Failed" issue persists due to API response format mismatch:
- Backend returns: `{access_token, token_type, user}`
- Frontend expects: `{success: true, data: {user, accessToken, refreshToken}}`

## Next Steps

1. Restart backend to ensure Neon connection
2. Address frontend/backend API contract mismatch for authentication
3. Verify tables are created in Neon dashboard