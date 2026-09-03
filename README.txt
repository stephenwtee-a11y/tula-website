TULA WEBSITE — EARLY ACCESS VERSION

Website files:
- index.html
- styles.css
- early-access.js
- favicon.ico                         (existing file; unchanged)
- CNAME                              (existing file; unchanged)
- assets/tula-wordmark.png           (existing file; unchanged)
- assets/fonts/tula-display-regular.woff2  (existing file; unchanged)
- privacy/index.html
- company-information/index.html

IMPORTANT
---------
This remains a static website with no build step.

The early-access form DOES NOT write directly to Supabase from the browser.
It POSTs the email address, an optional stable intent value, and the honeypot value
to the dedicated Supabase Edge Function:

https://ekirxibafacfedgeimmr.supabase.co/functions/v1/early-access-signup

The Edge Function and database migration live in the MAIN tulā PRODUCT REPOSITORY,
not in this website repository, so there is only one Supabase migration history.

Deploy order:
1. Add/review the Supabase migration in the main product repo.
2. Push the migration to the linked Supabase project.
3. Set EARLY_ACCESS_RATE_LIMIT_SECRET as a Supabase Edge Function secret.
4. Deploy early-access-signup with JWT verification disabled because this is an
   intentionally public, tightly constrained endpoint.
5. Verify the endpoint from the production website origin.
6. Only then deploy these website files.

Consent wording version: 0.2
Privacy Notice version: 0.2

No analytics, pixels, tracking cookies, CRM or bulk email-delivery provider are
introduced by these files.
