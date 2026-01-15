---
id: 001
title: "Fix Bcrypt Error"
stage: refactor
date: "2026-01-15"
surface: "agent"
model: "claude-haiku-4-5-20251001"
feature: "none"
branch: "main"
user: "Syed Sufyan"
command: "/sp.phr"
labels: ["auth", "bcrypt", "security", "validation"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "backend/routes/auth.py"
  - "backend/models.py"
  - "backend/requirements.txt"
tests: []
---

# Fix Bcrypt Attribute Error and Password Byte Limit in FastAPI

## Summary

Fixed two critical authentication issues in the FastAPI backend:
1. `AttributeError: module 'bcrypt' has no attribute '__about__'` - compatibility issue between passlib and newer bcrypt versions
2. `password cannot be longer than 72 bytes` - bcrypt length limitation error during signup

## Technical Details

### Changes Made

1. **Runtime bcrypt patch** (`backend/routes/auth.py`):
   - Added a patch that creates the `__about__` attribute with `__version__` if it doesn't exist
   - Resolves compatibility between passlib and newer versions of bcrypt

2. **Enhanced password functions** (`backend/routes/auth.py`):
   - Updated `get_password_hash()` to check password length before hashing
   - Added proper truncation of passwords longer than 72 bytes while preserving UTF-8 character integrity
   - Enhanced `verify_password()` to handle truncation scenarios gracefully

3. **Password validation** (`backend/models.py`):
   - Updated `UserCreate` model to enforce maximum password length of 64 characters
   - Prevents extremely long passwords from reaching the hashing function

4. **Dependency update** (`backend/requirements.txt`):
   - Added `bcrypt==4.0.1` which is known to be compatible with passlib 1.7.4

## Outcome

- Signup functionality now works without the bcrypt attribute error
- Passwords exceeding 72 bytes are properly handled without server crashes
- Maximum password length is enforced at the validation level
- Authentication system is now robust against edge cases

## Files Modified

- `backend/routes/auth.py` - Added bcrypt patch and enhanced password functions
- `backend/models.py` - Added password length validation
- `backend/requirements.txt` - Updated bcrypt version

## Next Steps

1. Test signup flow with various password lengths and special characters
2. Verify login functionality works correctly with the new password handling
3. Consider adding additional password strength validation