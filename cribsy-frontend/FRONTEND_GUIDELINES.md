# Frontend guidelines

- Use TypeScript and functional React components.
- Keep feature code inside the folder assigned to its owner.
- Reuse shared components from `src/components/shared/`.
- Use semantic HTML, visible labels, keyboard focus styles and meaningful image alt text.
- Check narrow mobile widths as well as desktop.
- Do not add fake reviews, fake platform metrics or invented live records.
- Mark all demonstration content clearly.
- Avoid pill-shaped buttons, purple gradients, unnecessary scroll animations and emoji icons.
- Keep forms honest: a client-side success message must not imply a server write happened.
- Never store secrets in frontend environment variables.
- Frontend route guards do not provide security. Backend endpoints must enforce authentication and role permissions.
