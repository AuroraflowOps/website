---
name: bio-update
description: >-
  Update an existing team member's bio or add a new team member bio on the
  Auroraflow website. Use whenever the user wants to change, replace, or add
  someone's bio / staff profile. Builds on the website-update skill for shipping,
  and adds bio-specific guardrails: confirm the right person, preserve the
  provided text verbatim, and enforce third person.
---

# Auroraflow Bio Update

This skill is for **updating an existing bio or adding a new bio** for a team
member. It sits **on top of the `website-update` skill** — do everything in that
skill for finding the repo and shipping (preview first, recommend review, ask
before publishing live). This file adds the bio-specific rules that come **before**
the shipping steps.

## Where bios live

- Team bios are individual pages in **`auroraflow-website/team/<name>.html`**
  (e.g. `team/lydia-atkins.html`). The bio copy is inside the `.bio-body` block as
  one or more `<p>` paragraphs.

## 1. Verify the right person (updates only)

- If this is an **update** to an existing bio, **first confirm you are editing the
  correct person.** Match the name to the exact file in `auroraflow-website/team/`
  and state which file/person you're about to edit. If the name is ambiguous or
  there's no matching file, ask the user before proceeding — do not guess.
- If this is a **new** bio, confirm the person isn't already on the team, then
  create a new `team/<name>.html` page following the structure of an existing bio
  page.

## 2. Preserve the provided bio text

- The new bio text the user gives you **must be maintained** — use it **verbatim.**
  Do not paraphrase, reword, condense, "improve," or restructure it. Copy it in as
  written.
- Beyond swapping in the new text, **keep all of the current text/markup** on the
  page as-is (headings, badges, services, layout). Only the bio copy changes unless
  the user says otherwise.

## 3. Enforce third person

- Bios must always be written in the **third person** (e.g. "Lydia is…", "She
  believes…"), not first person ("I am…", "my…").
- **Check the provided text.** If it is **not** in third person, **do not silently
  rewrite it.** Tell the user it isn't in third person and **ask whether they want
  it changed** to third person. Only convert it if they say yes; otherwise use their
  text as given.

## 4. Ship it (via website-update)

- Once the bio content is settled, follow the `website-update` skill to finish:
  commit, push the branch to the **non-live Netlify preview**, **recommend** the
  user review it on the preview, and **ask before publishing live** to `main`.

## Summary of the flow

1. Confirm it's the right person (or a genuinely new bio) → 2. Bring in the new
text **verbatim**, keep everything else → 3. Verify it's third person; if not, ask
before changing → 4. Hand off to `website-update` to preview, recommend review, and
publish only on confirmation.
