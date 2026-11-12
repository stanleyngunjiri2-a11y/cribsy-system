"""OWNER: Member 1 (Stanley). Create every table directly, for quick local testing.

    python create_db.py     (delete rentconnect.db first if you want a clean start)

The shared team database uses migrations instead (see BACKEND_TEAM.md). If you used this script,
delete your local rentconnect.db before running `flask db upgrade`.
"""
from app import create_app
from app.extensions import db

app = create_app()

with app.app_context():
    db.create_all()
    print("Tables created.")
