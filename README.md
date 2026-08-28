# SERENE Portfolio — V4

Mobile-first interactive portfolio with a living Calibration archive.

## What is new
- Slimmer premium floating navigation.
- Navigation closes on scroll, outside tap, and selection.
- SERENE CALIBRATION now uses a content data file rather than hard-coded page copy.
- New entries can be added without rewriting the HTML.
- Archive lists newest entries first; the newest entry is automatically featured.
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

The site automatically updates the featured entry, counter and archive.

## Social bios
Instagram: `Product thinker / builder / creative. Building products, systems & experiments. ↓ The Lab`

TikTok: `I build what's next. Products • systems • experiments • words. SERENE / THE LAB`

## Deploy
Replace the files in the existing portfolio repository and push to GitHub. Vercel can redeploy from the connected repository.
