def register_blueprints(app):
    from .admin import admin_bp
    from .auth import auth_bp
    from .landlord import landlord_bp
    from .maintenance import maintenance_bp
    from .public import public_bp
    from .tenant import tenant_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(public_bp, url_prefix="/api")
    app.register_blueprint(landlord_bp, url_prefix="/api/landlord")
    app.register_blueprint(tenant_bp, url_prefix="/api/tenant")
    app.register_blueprint(maintenance_bp, url_prefix="/api")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
