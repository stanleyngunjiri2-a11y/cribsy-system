# Cribsy Backend

Cribsy is a property rental management system. Its backend is built using Python Flask.

## Technology Stack

- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- Flask-CORS
- SQLite for local development

## Requirements

- Python 3.10+
- pip

## Installation

Create and activate a virtual environment:

    python3 -m venv .venv
    source .venv/bin/activate

Install dependencies:

    pip install --upgrade pip
    pip install -r requirements.txt

## Environment Configuration

Create your environment file:

    cp .env.example .env

Configure the following variables:

- SECRET_KEY
- JWT_SECRET_KEY
- DATABASE_URL
- CORS_ORIGINS
- FRONTEND_URL
- SHOW_DEV_CODES

Never commit your .env file or expose application secrets.

## Running the Backend

After all required team modules have been integrated:

    flask run

The backend runs at http://127.0.0.1:5000.

## Health Check

    GET /api/health

Expected response:

    {"status": "ok"}

## Database Migrations

After the database models have been integrated:

    flask db init
    flask db migrate -m "Initial database schema"
    flask db upgrade

Only initialize migrations once. Other team members should use flask db upgrade.

## Frontend Connection

The React frontend runs separately, normally at:

    http://localhost:5173

Configure CORS_ORIGINS to permit the frontend origin.

## Team Responsibilities

| Member | Responsibility |
|---|---|
| Member 1 - Stanley | Project setup, configuration and documentation |
| Member 2 | Database models and seed data |
| Member 3 | Authentication and shared helpers |
| Member 4 | Landlord module |
| Member 5 | Public search, tenant portal and admin |
| Member 6 | Maintenance requests |

## Development Notes

- Keep secrets in environment variables.
- Do not commit virtual environments or database files.
- Keep database migrations under version control.
- Disable development verification codes before deployment.
- Test API endpoints before frontend integration.
