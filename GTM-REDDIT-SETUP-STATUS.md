# GTM + Reddit Pixel setup — status

Last updated: 2026-09-30
Branch: `claude/gtm-website-integration-10mbde` (NOT live yet)

## IDs
- GTM container: **GTM-WGB9SXR**
- GA4: **G-XSD2W9D1GB** (already a Google Tag in GTM, on All Pages; do NOT add another)
- Reddit Pixel: **a2_jq9tr2wxpc4m**

## Website (done, on preview branch only)
- [x] GTM loads on every page via `auroraflow-website/shared.js` (404 page included)
- [x] Direct GA4 code removed; GTM is the single tag source
- [x] Site pushes these events to GTM: `generate_lead` (Book button), `booking_complete`,
      `gift_card_click`, `begin_checkout` (membership), `phone_click`, `email_click`

## In GTM
- [x] Reddit Pixel template added
- [x] Trigger "Booking Complete" (Custom Event `booking_complete`)
- [x] Trigger "Book Button Click" (Custom Event `generate_lead`)
- [x] Tag "Reddit Pixel", PageVisit on All Pages (check the Event is set to PageVisit)
- [ ] **NEXT:** Tag "Reddit – Purchase" (Reddit Pixel, a2_jq9tr2wxpc4m, event Purchase, trigger Booking Complete)
- [ ] Tag "Reddit – Lead" (Reddit Pixel, a2_jq9tr2wxpc4m, event Lead, trigger Book Button Click)
- [ ] If a duplicate "GA4 – Google Tag" was created, delete it

## Test + launch
- [ ] GTM Preview on the Netlify preview:
      https://claude-gtm-website-integration-10mbde--stunning-lokum-aa2f57.netlify.app
      (if "Site not found", ask Claude to open a PR for a deploy-preview link)
- [ ] In Preview, click a Book button and open /booking-complete. Note which tags fire,
      especially the old FB / Google Ads / GA4 booking tags
- [ ] Repoint any old FB / Google Ads / GA4 tags whose old-site triggers no longer fire
- [ ] GTM: Submit → Publish
- [ ] Publish the website change live (merge to main), then check Reddit Events Manager
