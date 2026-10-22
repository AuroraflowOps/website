# GTM + Reddit Pixel setup — status

Last updated: 2026-10-08
Branch: `claude/gtm-website-integration-10mbde` (NOT live yet)

## IDs
- GTM container: **GTM-WGB9SXR** (carries GA4 G-XSD2W9D1GB, FB and Google Ads tags)
- Reddit Pixel: **a2_jq9tr2wxpc4m**, installed DIRECTLY in `auroraflow-website/shared.js`, not via GTM

## Website (done, on preview branch)
- [x] GTM loads on every page (404 included); direct GA4 code removed
- [x] Reddit Pixel base code on every page: `rdt('init')` + `rdt('track','PageVisit')`
- [x] `rdt('track','Purchase')` fires on /booking-complete only
- [x] Verified in a headless browser: correct events per page, no JS errors

## To do
- [ ] GTM: delete the "Reddit Pixel" tag (and any Reddit – Purchase / Lead tags) so Reddit isn't double-counted
- [ ] Mangomint: confirm the post-booking redirect is https://www.auroraflow.com/booking-complete
- [ ] Review preview, then publish website live (merge to main)
- [ ] After live: Reddit Pixel Helper extension on www.auroraflow.com shows PageVisit; Events Manager shows pixel Active
- [ ] End-to-end: make a real test booking (then cancel), confirm Purchase appears in Reddit Events Manager
- [ ] Ads Manager: Columns → Customize → add Purchase (click-through + view-through)
- [ ] Later: check old FB / Google Ads booking tags in GTM still fire on the new site
