<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to Lovable. Avoid rewriting published git history.
<!-- LOVABLE:END -->

- Portfolio projects and lab entries live in Lovable Cloud public RLS tables; admin writes require a separate server-validated `user_roles` row, so public visitors cannot claim editorial access.
- Sample content is explicitly labeled and stored as editable rows, so the portfolio is populated without asserting fictional work as Clayton's real projects.
- Chat threads and UI messages stay in browser localStorage with route-derived thread IDs; only model calls cross the server boundary, honoring the selected browser-only history.
