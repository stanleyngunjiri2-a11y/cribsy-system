# RentConnect QA checklist - Owner: Member 6 (Lynn)

## Navigation and routes
- [ ] Logo returns to homepage.
- [ ] All public navigation links work.
- [ ] Unknown routes show the not-found page.
- [ ] Protected route placeholder redirects while unauthenticated (not a security test).

## Responsive layout
- [ ] Check 320px, 375px, 768px and desktop widths.
- [ ] No horizontal overflow.
- [ ] Navigation works on mobile.
- [ ] Forms and tables remain usable on small screens.

## Forms and accessibility
- [ ] Every input has a visible label.
- [ ] Required fields and basic browser validation work.
- [ ] Keyboard focus is visible.
- [ ] Buttons have clear labels.
- [ ] Images have useful alt text.
- [ ] Empty states are clear and not misleading.

## Feature checks
- [ ] Property location, rent and bedroom filters work on sample data.
- [ ] Property details show the selected record.
- [ ] Landlord property form validates required fields.
- [ ] Tenant profile and maintenance forms are usable.
- [ ] Demo messages clearly state that data is not saved or sent.
- [ ] Admin pages do not imply that frontend role checks are secure.

## Build checks
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Capture screenshots of desktop and mobile layouts.
- [ ] Record defects and assign owners in Trello.
