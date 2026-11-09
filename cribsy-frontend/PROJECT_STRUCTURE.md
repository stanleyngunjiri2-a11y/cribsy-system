# Project structure and ownership

```text
src/
  app/                         Member 1 - app shell
  routes/                      Member 1 - route registration and guard scaffold
  components/shared/            Member 1 - reusable shared UI
  features/
    auth/                       Member 1 - authentication interfaces
    home/                       Member 2 - public landing page
    properties/                 Member 3 - listings, filters, details
    landlord/                   Member 4 - landlord workspace
    tenant/                     Member 5 - tenant workspace
    maintenance/                Member 6 - maintenance interfaces
    admin/                      Member 6 - admin interfaces
  styles/                       Member 1 - global design system
```

Feature owners should keep implementation in their assigned folder. Shared components are coordinated through Member 1.
