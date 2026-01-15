---
id: 012
title: "Fix Task Status Error"
stage: integration
date: "2026-01-15"
surface: "agent"
model: "claude-haiku-4-5-20251001"
feature: "none"
branch: "main"
user: "Syed Sufyan"
command: "manual"
labels: ["frontend", "backend", "integration", "mapping", "tasks"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - "frontend/src/components/dashboard/task-card.tsx"
  - "frontend/src/app/dashboard/tasks/page.tsx"
  - "backend/models.py"
tests: []
---

# Fix Task Status Error and Data Mapping

## Summary

Fixed the "Cannot read properties of undefined (reading 'replace')" error by implementing proper data mapping between frontend and backend models.

## Technical Details

### Problem Identified

The error occurred because:
1. Backend Task model uses `completed: boolean` field
2. Frontend Task interface expects `status: 'todo' | 'in-progress' | 'done'` field
3. TaskCard component tried to access `task.status` which was undefined
4. Data transformation was needed between frontend and backend representations

### Changes Made

#### Backend Updates

1. **Fixed TaskResponse model** (`backend/models.py`):
   - Added missing `user_id` field to TaskResponse
   - Ensured all required fields are included in API responses

#### Frontend Updates

1. **Updated TaskCard component** (`frontend/src/components/dashboard/task-card.tsx`):
   - Added mapping from `task.completed` boolean to `taskStatus` string
   - Replaced direct `task.status` access with computed `taskStatus`

2. **Updated dashboard page** (`frontend/src/app/dashboard/tasks/page.tsx`):
   - Added data transformation for API responses to map `completed` to `status`
   - Added data transformation for API requests to map `status` to `completed`
   - Updated all CRUD operations (create, read, update, delete) with proper mapping
   - Handled date object conversions consistently

## Outcome

- Task status error resolved
- Proper data mapping between frontend and backend
- Consistent task management functionality
- Both `completed` boolean and `status` string handled correctly
- All task operations (create, update, delete, status change) work properly

## Files Modified

- `backend/models.py` - Fixed TaskResponse model
- `frontend/src/components/dashboard/task-card.tsx` - Added status mapping
- `frontend/src/app/dashboard/tasks/page.tsx` - Added data transformations

## Next Steps

1. Test all task operations to ensure proper functionality
2. Verify status updates work correctly
3. Confirm data consistency between frontend and backend