# Keeping the countdown safe from changes

## Important: where is the site hosted?
Your share links point to **GitHub Pages**. GitHub Pages **ignores `.htaccess`**.
The `.htaccess` file only protects the site if you host it on an Apache server
(typical shared/cPanel hosting). On GitHub Pages, the real protection is
*who can edit the repository* — do these:

1. **Turn on 2-factor authentication** on your GitHub account
   (Settings > Password and authentication). This is the #1 protection.
2. **Use a strong, unique password** and a passkey if possible.
3. **Make sure nobody else has write access**:
   repo > Settings > Collaborators — remove anyone you don't recognise.
4. **Protect the main branch**: repo > Settings > Branches > Add rule for `main`:
   require a pull request, and block force pushes and deletions.
5. **Check Settings > Security**: enable Dependabot alerts and secret scanning.
6. **Enable "Enforce HTTPS"** in Settings > Pages.
7. Review **Settings > Applications / SSH keys / Deploy keys** and revoke anything unknown.
8. Keep a **local backup** of the project folder.

## What is included in the code
- `index.html` has a Content-Security-Policy (blocks injected scripts, outside
  connections, forms and plugins). It works on GitHub Pages too.
- `.htaccess` (Apache hosting only): HTTPS redirect, no directory listing, GET/HEAD
  only, hidden/backup files blocked, security headers, caching.

## Honest limits
No file in a website can stop someone who has your GitHub/hosting login from
changing it. Account security (steps 1-4) is what really prevents tampering.
If the site ever looks changed, check the repo's commit history, revert it,
and change your password.
