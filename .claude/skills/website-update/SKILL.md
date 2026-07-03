---
name: website-update
description: >-
  Make any change to the Auroraflow website (auroraflow.com) and ship it safely.
  Use whenever the user asks to update, edit, add, or fix anything on the
  Auroraflow site — pages, copy, images, styling, services, team, etc. Handles
  locating the repo, editing the static site, pushing to a non-live Netlify
  preview for review, and publishing live only after the user confirms.
---

# Auroraflow Website Update

This skill defines exactly how to make and ship a change to the Auroraflow
website. Follow the steps in order. Do not publish anything live without
explicit user confirmation.

## 1. Find the right repo

- The site lives in the **`AuroraflowOps/website`** GitHub repo. In a web/remote
  session it is cloned to the working directory (e.g. `/home/user/website`).
- Confirm you are in the right place before editing:
  - `git remote -v` must point at `AuroraflowOps/website`.
  - The actual website files are in the **`auroraflow-website/`** subfolder.
- The site is **plain static HTML/CSS/JS — no build step.** Shared styling is in
  `auroraflow-website/shared.css`; section-specific CSS lives alongside (e.g.
  `services.css`). Netlify publishes the `auroraflow-website/` folder as configured
  in `netlify.toml`.
- Work on the user's designated working branch. Never commit directly to `main`.

## 2. Make the change

- Edit only what the user asked for. Match the existing markup, class names, and
  style conventions on the page you are touching.
- Keep changes minimal and consistent with the rest of the site.

## 3. Push to the non-live Netlify preview FIRST

- Commit with a clear, descriptive message.
- Push the working branch to GitHub:
  `git push -u origin <working-branch>`
- Pushing the branch triggers Netlify to build a **preview deploy** (a branch
  deploy / deploy preview) — this is the **non-live** copy of the site, separate
  from production (`www.auroraflow.com`).
- **Surface the preview URL to the user** so they can review the change before it
  goes live. Get the real URL from the Netlify deploy (the Netlify check/comment
  on the PR, or the Netlify dashboard) — do **not** invent one. Branch-deploy URLs
  follow the pattern `https://<branch>--<site-name>.netlify.app`; if you can't
  retrieve the exact URL, tell the user where to find it rather than guessing.

## 4. Recommend a preview review (built-in step)

- **Always recommend** the user review the change on the non-live Netlify preview
  site before publishing. This step is not optional to mention — state it every
  time, e.g. "I recommend reviewing this on the Netlify preview before we publish
  it live."

## 5. Ask before publishing live

- **Ask the user whether they want to publish the changes live.** Never publish to
  production on your own.
- Only when the user confirms, publish live by merging the working branch into
  **`main`** (the production branch), which triggers Netlify to deploy to
  `www.auroraflow.com`.
- If the user is not ready, leave the change on the preview and stop — the branch
  and preview remain available for whenever they decide.

## Summary of the flow

1. Confirm repo → 2. Edit in `auroraflow-website/` → 3. Commit + push branch
(non-live preview) → 4. Recommend previewing on Netlify → 5. Ask, then publish
live to `main` only on confirmation.
