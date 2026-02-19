# HRMS Lite

HRMS Lite is a lightweight full-stack Human Resource Management System for a single admin user. It supports employee management and daily attendance tracking with a professional, responsive React UI and a Django REST backend.

## Features

### Employee Management
- Add employee with unique `employee_id`, `full_name`, `email`, and `department`
- View employee list with present-day totals
- Delete employee records

### Attendance Management
- Mark attendance (`Present` / `Absent`) by employee and date
- View attendance history per employee
- Optional date filter support for attendance records

### API + Validation
- RESTful endpoints with proper HTTP status codes
- Required-field and email validation via Django REST Framework
- Duplicate employee and duplicate attendance protection
- Meaningful error responses for invalid requests

## Tech Stack

### Frontend
- React 18 + Vite
- Axios for API integration
- Custom reusable components + CSS

### Backend
- Python Django 5
- Django REST Framework
- CORS headers for frontend/backend integration
- Gunicorn for production server

### Database
- PostgreSQL (production via environment variables)
- SQLite fallback for local development only

## Project Structure

```text
.
├── backend/
│   ├── hrms/               # App models, serializers, viewsets, routes
│   ├── hrms_backend/       # Django settings, project urls
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/components/     # Reusable UI components
│   ├── src/App.jsx
│   ├── src/api.js
│   └── package.json
└── README.md
```

## Local Setup

### 1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend starts at `http://localhost:8000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at `http://localhost:5173`.

Set backend URL (required for deployed frontend):

```bash
# frontend/.env
VITE_API_BASE_URL=https://<your-backend-domain>/api
```

## API Endpoints

- `GET /api/employees/`
- `POST /api/employees/`
- `DELETE /api/employees/:id/`
- `GET /api/attendance/employee/:employeeId/?date=YYYY-MM-DD`
- `POST /api/attendance/`

## Deployment (Vercel + Render)

### Backend on Render (Django)
1. Create a new Web Service from the `backend` folder.
2. Build command: `pip install -r requirements.txt && python manage.py migrate`
3. Start command: `gunicorn hrms_backend.wsgi:application`
4. Ensure service root points to repository root or `backend`, and use ASGI entrypoint `main:app` when a platform requires auto-discovery from repo root.
5. Add environment variables:
   - `DJANGO_DEBUG=False`
   - `DJANGO_SECRET_KEY=<secure-value>`
   - `DJANGO_ALLOWED_HOSTS=<render-domain>`
   - `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`
   - `CORS_ALLOWED_ORIGINS=https://<your-vercel-domain>`
   - `CORS_ALLOW_ALL_ORIGINS=False` (recommended in production)

### Frontend on Vercel (React)
1. Import repo and set root directory to `frontend`.
2. Framework preset: `Vite`.
3. Add env variable (mandatory):
   - `VITE_API_BASE_URL=https://<your-render-domain>/api`
4. Redeploy frontend after saving env var changes.

## Assumptions / Limitations

- No authentication (single-admin scenario).
- Employee email is unique for consistency.
- Attendance can be marked once per employee per date.
- No edit/update flow included (add/list/delete + attendance create/view only).


## Common Deployment Fixes

If frontend calls `localhost` after deployment, your frontend environment variable is missing.

- Set `VITE_API_BASE_URL` in the frontend hosting dashboard to your live backend URL (e.g. `https://api-name.onrender.com/api`). This is mandatory for deployment.
- Make sure backend CORS includes your frontend URL in `CORS_ALLOWED_ORIGINS`.
- Redeploy both services after env changes.
