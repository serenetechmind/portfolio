# SERENE Portfolio — V4

Mobile-first interactive portfolio with a living Calibration preview and publication archive.

## What is new
- Slimmer premium floating navigation.
- Navigation closes on scroll, outside tap, and selection.
- SERENE CALIBRATION now appears on the homepage as an editorial preview.
- `calibration.html` is the dedicated reading and archive experience.
- Both pages consume `window.CALIBRATIONS`; new entries can be added without rewriting HTML.
- Instagram and TikTok are connected; Facebook/X are intentionally omitted until ready.
- Reading progress signal and small interaction details add life without overwhelming the content.

## How to publish a new Calibration entry
Open `calibrations.js` and add the newest object at the TOP of `window.CALIBRATIONS`.

Example:

```js
{
  entry: "002",
  word: "ephemeral",
  className: "ADJECTIVE",
  date: "29 AUG 2026",
  text: [
    "Your first line...",
    "Your second line...",
    "Your third line...",
    "Your fourth line..."
  ],
  note: "Optional note about the exercise."
}
```

The homepage preview and `calibration.html` automatically update the featured entry, counter, navigation and archive.

## Social bios
Instagram: `Product thinker / builder / creative. Building products, systems & experiments. ↓ The Lab`

TikTok: `I build what's next. Products • systems • experiments • words. SERENE / THE LAB`

## Deploy
Replace the files in the existing portfolio repository and push to GitHub. Vercel can redeploy from the connected repository.
