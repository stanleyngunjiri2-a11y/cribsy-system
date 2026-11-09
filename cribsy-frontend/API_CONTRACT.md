# API contract draft - Week 2 backend discussion

This is a planning document only. Endpoint names and payloads must be agreed with the backend team before implementation.

Potential resource areas:
- Authentication: register, login, logout, current session, password reset, verification.
- Properties: list/search, details, create, update, deactivate, image upload.
- Tenancies: tenant's current tenancy, landlord's tenants.
- Rent: rent ledger, payment submission/reference, verification status.
- Maintenance: create request, list requests, update status, attach images.
- Administration: user list, account status, property review/approval.

Every protected endpoint must authenticate the requester and enforce ownership/role authorization server-side. Validate all inputs on the server. Do not trust a role, owner ID, tenant ID, rent amount or property ID supplied by the browser. Use pagination and consistent error responses. Define upload limits and allowed image MIME types.
