# Pre-Hospital Grand Rounds Ireland

GitHub Pages-compatible front-end prototype.

## Publish on GitHub Pages
1. Create a new GitHub repository.
2. Upload all files and folders from this package to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, choose `main` and `/root`, then save.

## Important production note
GitHub Pages hosts static files only. The member login, identity verification, forum, e-learning records, subscriptions and case-management workflows require a secure backend. A practical architecture is:

- GitHub Pages or Cloudflare Pages for the public site
- Supabase hosted in the EU for authentication, PostgreSQL data and role-based access
- Moodle or a purpose-built learning layer for assessments and certificates
- Discourse for the moderated professional forum, using single sign-on
- Stripe for paid subscriptions, if membership becomes chargeable
- Brevo or Mailchimp with EU configuration for launch mailing lists

Do not collect professional documents or sensitive membership evidence through a static form.
