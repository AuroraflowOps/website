---
name: bio-update
description: >-
  Update an existing team member's bio or add a new team member bio on the
  Auroraflow website. Use whenever the user wants to change, replace, or add
  someone's bio / staff profile. Builds on the website-update skill for shipping,
  and adds bio-specific guardrails: confirm the right person, preserve the
  provided text verbatim, enforce third person, classify them as a service
  provider vs. administrative/support staff (which controls whether a booking
  button appears), handle headshot/lifestyle photo cropping, and only publish
  live after the user has reviewed the preview.
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
- `auroraflow-website/team.html` lists everyone in two grouped grids: **Service
  Providers** and **Support Staff**. Every bio page and its team-listing card must
  agree on which group the person belongs to.

## 1. Verify the right person (updates only)

- If this is an **update** to an existing bio, **first confirm you are editing the
  correct person.** Match the name to the exact file in `auroraflow-website/team/`
  and state which file/person you're about to edit. If the name is ambiguous or
  there's no matching file, ask the user before proceeding — do not guess.
- If this is a **new** bio, confirm the person isn't already on the team.

## 2. Classify: Service Provider vs. Administrative/Support Staff

**This determines whether a booking button appears — get it right before building
the page.** Booking CTAs and the services grid are reserved for people who
actually take bookings (massage therapists, estheticians, and similar roles).
Front desk staff, managers, co-founders, and other non-bookable roles are
**administrative** and must not have a "Book Now" / "Ready to book with X" CTA
or a services section, even if the site's shared CSS still defines those classes.

- **Service Provider** — titles like Massage Therapist, Esthetician, Director
  (if they also see clients), "CEO & Massage Therapist." Use the full template:
  headshot + lifestyle photos, bio body, a populated `.bio-services-section`
  linking to their actual bookable services, and a personalized `.bio-cta`
  ("Ready to book with `<Name>`?").
- **Administrative / Support Staff** — titles like Front Desk, Front Desk
  Manager, Front Desk Receptionist, Co-founder (non-clinical), Aspiring
  Esthetician (not yet bookable). Use the same template **minus** the
  `.bio-services-section` block and **minus** the `.bio-cta` block entirely
  (don't just hide it — remove the HTML). The page ends right after `.bio-body`,
  straight to `</main>` and the footer.
- If the role is ambiguous (e.g. a title you haven't seen before, or someone who
  splits time between the desk and providing services), **ask the user** which
  bucket applies rather than guessing.
- Match the corresponding card in `team.html`: put it in the **Service
  Providers** grid or the **Support Staff** grid to match, with the same title
  and pronoun pill.
- Use an existing bio page as your template for the category: e.g.
  `team/jaylon-martin.html` for a clean administrative example (no services, no
  CTA), or `team/lydia-atkins.html` for a full service-provider example.

## 3. Preserve the provided bio text

- The new bio text the user gives you **must be maintained** — use it **verbatim.**
  Do not paraphrase, reword, condense, "improve," or restructure it. Copy it in as
  written.
- Beyond swapping in the new text, **keep all of the current text/markup** on the
  page as-is (headings, badges, layout). Only the bio copy (and the CTA/services
  section per the classification above) changes unless the user says otherwise.

## 4. Enforce third person

- Bios must always be written in the **third person** (e.g. "Lydia is…", "She
  believes…"), not first person ("I am…", "my…").
- **Check the provided text.** If it is **not** in third person, **do not silently
  rewrite it.** Tell the user it isn't in third person and **ask whether they want
  it changed** to third person. Only convert it if they say yes; otherwise use their
  text as given.

## 5. Photos: getting the files, then cropping them

### Getting the raw files from the user

Images pasted or attached directly into the chat are **not accessible as files** —
they can only be viewed (vision), not read as bytes, so they can't be cropped or
committed from a chat paste alone. Ask the person adding the bio to get the raw
photos into the repo instead:

- Easiest path: on GitHub, browse to `auroraflow-website/assets/` in the
  `AuroraflowOps/website` repo and use **Add file → Upload files** to drag the
  photos in directly, then click **Commit changes**. (URL pattern:
  `https://github.com/AuroraflowOps/website/upload/main/auroraflow-website/assets`.)
- Once they say it's uploaded, `git fetch origin main` and check for a new
  commit — don't assume it landed just because they said so. Look at the diff to
  confirm which files arrived.
- If a file is explicitly named "headshot" by the person who uploaded it, trust
  that naming over whatever order the photos were originally shown in chat —
  it's the clearest signal of intent.
- After cropping the final square versions into `assets/img/`, delete the raw
  uploaded originals from `assets/` (`git rm`) so they don't clutter the repo.

### Cropping rules

- Every photo (headshot and every lifestyle photo) must end up **square (1:1)**.
- **Never crop the person out of frame.** Pick the crop axis and offset so their
  full head (and as much of their body as fits) stays in the frame — when the
  photo is portrait, crop from the top down (keep hair/head, trim below the
  torso); when it's landscape, crop horizontally centered on the person, not the
  geometric center of the photo.
- Apply EXIF-orientation correction before cropping — phone photos often carry
  rotation metadata that raw pixel reads ignore, producing a sideways preview.
  In Python: `PIL.ImageOps.exif_transpose(image)` before cropping. Always look
  at the corrected crop before committing to it.
- Resize final crops to 1200×1200 and save as `.webp` (quality ~88), named
  `assets/img/<first>-<last>-headshot.webp`, `-lifestyle-1.webp`,
  `-lifestyle-2.webp`, etc.
- Use the same headshot image for both the bio page's main photo and the
  `team.html` card thumbnail.

### The lifestyle photo grid must always fill the width

The `.bio-lifestyle` grid must use `grid-template-columns: repeat(auto-fit,
minmax(110px, 1fr))` — **not** `auto-fill`. With `auto-fill`, 1–2 photos in a
~400px-wide column leave an empty reserved track and look like something's
missing; `auto-fit` collapses empty tracks so however many photos exist (0, 1,
2, or more) stretch evenly to match the full width of the headshot above them.
This applies regardless of how many lifestyle photos the person has.

## 6. Ship it (via website-update)

- Follow the `website-update` skill to finish: commit with a clear message, push
  the branch to get the **non-live Netlify preview**.
- **Always recommend** the user review the change on the preview before it goes
  live — state this explicitly, don't skip it.
- **Do not merge to `main` / publish to production until the user explicitly
  confirms** they're happy with the preview. "Looks good" or "go ahead and
  publish" counts as confirmation; silence or "let me look" does not.
- When confirmed, open a PR (if not already open) and merge it — that's what
  triggers the Netlify production deploy.

## Summary of the flow

1. Confirm it's the right person (or a genuinely new bio) → 2. Classify Service
Provider vs. Administrative (decides CTA/services) → 3. Bring in the bio text
**verbatim** → 4. Verify third person, ask before changing → 5. Get real photo
files from the user (never fabricate/guess), crop to square keeping the person
in frame, use `auto-fit` for the lifestyle grid → 6. Push, share the preview
link, and publish only after the user confirms.
