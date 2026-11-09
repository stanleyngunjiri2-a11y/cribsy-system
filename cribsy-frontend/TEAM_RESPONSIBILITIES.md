# RentConnect team responsibilities - Week 1 frontend

| Member | Name | Ownership | Main files |
|---|---|---|---|
| 1 | Stanley (Scrum Master) | Architecture, setup, shared components, auth interfaces, routing, integration | `src/app/`, `src/routes/`, `src/components/shared/`, `src/features/auth/`, `src/styles/`, project config |
| 2 | Alex | Public website and landing page | `src/features/home/` |
| 3 | Quincy | Property listings, search, filters and details | `src/features/properties/` |
| 4 | Nato | Landlord dashboard and property management | `src/features/landlord/` |
| 5 | Sam | Tenant dashboard, rent history and profile | `src/features/tenant/` |
| 6 | Lynn | Maintenance, admin interfaces and QA | `src/features/maintenance/`, `src/features/admin/`, `QA_CHECKLIST.md` |

Shared navigation/footer base components are owned by Stanley. Alex should coordinate shared navigation changes with Stanley rather than duplicating shared components. All team members should add their own UI and tests within their owned feature folders and raise a pull request into `develop`.

## Week 1 day plan
1. Day 1: project setup, design agreement, folder structure and GitHub workflow.
2. Day 2: homepage, authentication and dashboard layouts.
3. Day 3: property listings, landlord dashboard and tenant dashboard.
4. Day 4: property details, property forms and maintenance interfaces.
5. Day 5: search, filters, rent interfaces and admin interfaces.
6. Day 6: integrate all members' work.
7. Day 7: test, check responsiveness, fix issues and review.
