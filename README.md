# Serene Portfolio, V5

Mobile-first portfolio rebuilt to be easier for recruiters and clients to scan.

## What changed from V4
- New hero says what you do, who it's for, and has two clear buttons (See my work / Get in touch), plus an "Open to work" line.
- New **Selected work** section with two real case studies: Prex Surprise Calls and Epiphany Hub (brief, what was built, stack, live link).
- Concept projects (Serenex, Volta Pay, Zora Axis, Vybe by Synq) moved into a short "Also in the workshop" list. No more dead "case study is being prepared" buttons.
- About now lists concrete skills. The build loop is one compact row.
- The Lab and Serene Calibration sit together under **Beyond the work**, below the proof.
- Contact has a header "Hire me" button, an email button and a copy-email button.
- Bigger, higher-contrast text (nothing under 13px). Focus outlines and reduced-motion support added.
- Fixed: the old CSS had a stray `}` that pushed mobile rules onto desktop.
- Fixed: "Copy link" now links to the entry being viewed (`#calibration-001`).
- Removed `update.py` (an old patch script that is no longer needed).

## Things to check before deploying
- Phone mockups are CSS illustrations. Swap in real screenshots when ready: replace the `.phone` block with
  `<img class="shot" src="prex.png" alt="...">` (comments in `index.html` show where).
- Read every line in the two project cards and delete anything that isn't true yet.
- Change the "Open to work and freelance projects" line if it doesn't match your situation.

## Add a Calibration entry
Add a new object at the TOP of `window.CALIBRATIONS` in `calibrations.js`. The featured card, counter and archive update automatically.

## Deploy
Replace the files in your portfolio repository and push to GitHub.
