# Member 1 (Scrum Master): Project setup, configuration and docs

Owns the project skeleton, app factory, config, shared extensions, blueprint registration, README and integration of everyone's work.

## Your files
- `requirements.txt`
- `config.py`
- `.env.example`
- `.flaskenv`
- `.gitignore`
- `run.py`
- `app/extensions.py`
- `app/__init__.py`
- `app/routes/__init__.py`
- `README.md`

## Team split
- Member 1 (Scrum Master): Project setup, configuration and docs
- Member 2: Database models and seed data
- Member 3: Authentication and shared helpers
- Member 4: Landlord module
- Member 5: Public search, tenant portal and admin
- Member 6: Maintenance requests (tenant and landlord)

## Notes
- Every zip keeps the original folder layout (`rentconnect-backend/...`). Extracting all 6 zips into the same folder rebuilds the full project.
- The app only starts once all the blueprints exist (`app/routes/__init__.py` imports them all), so merge everyone's work before running `flask run`.
- Setup steps are in `README.md` (owned by the Scrum Master).
