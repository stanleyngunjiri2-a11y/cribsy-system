# Git workflow

Branches: `main` (stable), `develop` (integration), and one feature branch per member:
- `feature/member-1-stanley`
- `feature/member-2-alex`
- `feature/member-3-quincy`
- `feature/member-4-nato`
- `feature/member-5-sam`
- `feature/member-6-lynn`

Create member branches from `develop`. Commit only work related to your assigned feature. Open pull requests into `develop`, request review, resolve conflicts and wait for approval before merging. Do not push feature work directly to `main`.

Suggested commit format: `feat(properties): add property search filters`.
