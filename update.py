from pathlib import Path
ROOT = Path(__file__).resolve().parent
p=ROOT / 'index.html'
s=p.read_text()
# Add socials and calibration section before contact
insert='''\n<section class="section calibration" id="calibration">\n  <div class="section-head">\n    <span>04 / CALIBRATION</span>\n    <span>LANGUAGE / DAILY PRACTICE</span>\n  </div>\n  <div class="calibration-layout">\n    <div>\n      <p class="micro">THE SERENE CALIBRATION</p>\n      <h2>Words are<br><em>instruments.</em></h2>\n      <p class="body-copy">A daily practice of learning a new word, using it deliberately, and turning language into small pieces of thought.</p>\n    </div>\n    <article class="calibration-card">\n      <div class="calibration-meta"><span>ENTRY 001</span><span>WORD / SHENANIGANS</span></div>\n      <p>Let the noisy world play out its desperate shenanigans below,<br>\n      Where chaotic currents flicker in a temporary show.<br>\n      Unmoved by fleeting theater, we maintain our quiet steady line,<br>\n      Crafting pristine architecture that outlasts the march of time.</p>\n      <div class="calibration-foot"><span>LANGUAGE PRACTICE</span><span>01 / 01</span></div>\n    </article>\n  </div>\n  <div class="social-row">\n    <span>FOLLOW THE PRACTICE</span>\n    <a href="https://www.instagram.com/takesbyserene/" target="_blank" rel="noopener">INSTAGRAM ↗</a>\n    <a href="https://www.tiktok.com/@takes.by.serene" target="_blank" rel="noopener">TIKTOK ↗</a>\n  </div>\n</section>\n'''
calibration_marker='<section class="section calibration" id="calibration">'
if calibration_marker not in s:
    s=s.replace('<section class="section contact" id="contact">', insert+'\n<section class="section contact" id="contact">')
# Renumber contact to 05 and nav caption 00—05 + calibration nav item
s=s.replace('NAVIGATION / 00—04','NAVIGATION / 00—05')
s=s.replace('<button data-go="lab"><span>03</span> THE LAB</button>\n  <button data-go="contact"><span>04</span> CONTACT</button>', '<button data-go="lab"><span>03</span> THE LAB</button>\n  <button data-go="calibration"><span>04</span> CALIBRATION</button>\n  <button data-go="contact"><span>05</span> CONTACT</button>')
s=s.replace('<span>04 / CONTACT</span>', '<span>05 / CONTACT</span>')
p.write_text(s)

p=ROOT / 'style.css'
s=p.read_text()
# Replace nav styles
s=s.replace('.nav-orb{position:fixed;z-index:18;right:24px;bottom:24px;width:64px;height:64px;', '.nav-orb{position:fixed;z-index:18;right:22px;bottom:22px;width:62px;height:62px;')
s=s.replace('.floating-nav{position:fixed;z-index:17;right:24px;bottom:98px;width:min(290px,calc(100vw - 32px));padding:16px;', '.floating-nav{position:fixed;z-index:17;right:22px;bottom:94px;width:min(238px,calc(100vw - 42px));padding:10px;')
s=s.replace('.nav-caption{font-size:9px;letter-spacing:.18em;color:#696674;padding:5px 8px 12px;', '.nav-caption{font-size:8px;letter-spacing:.18em;color:#696674;padding:4px 7px 9px;')
s=s.replace('.floating-nav button{display:flex;gap:14px;width:100%;padding:13px 8px;text-align:left;font-size:11px;', '.floating-nav button{display:flex;gap:11px;width:100%;padding:11px 7px;text-align:left;font-size:10px;')
# Add calibration styles before contact
marker='.contact{min-height:80svh;display:flex;flex-direction:column}'
cal='''.calibration-layout{display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;align-items:start}.calibration h2{font-size:clamp(48px,6.5vw,94px);line-height:.9;letter-spacing:-.06em;margin:0 0 30px}.calibration h2 em{font-family:"Playfair Display",serif;color:#9b6bff;font-style:italic;font-weight:500}.calibration-card{border:1px solid rgba(155,107,255,.28);background:radial-gradient(circle at 80% 10%,rgba(131,73,255,.12),transparent 18rem),rgba(10,8,20,.55);padding:24px;min-height:290px;display:flex;flex-direction:column;justify-content:space-between}.calibration-meta,.calibration-foot{display:flex;justify-content:space-between;gap:20px;color:#777381;font-size:8px;letter-spacing:.17em}.calibration-card p{font-family:"Playfair Display",serif;font-size:clamp(17px,2vw,24px);line-height:1.55;color:#e7e2ef;font-style:italic}.calibration-foot{padding-top:18px;border-top:1px solid var(--line)}.social-row{display:flex;gap:28px;align-items:center;margin-top:34px;padding-top:18px;border-top:1px solid var(--line);font-size:9px;letter-spacing:.15em;color:#777381}.social-row a{color:#b08cff}.social-row a:hover{color:#fff}.contact{min-height:80svh;display:flex;flex-direction:column}'''
calibration_css_marker='.calibration-layout{display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;align-items:start}'
if calibration_css_marker not in s:
    s=s.replace(marker,cal)
# mobile nav and calibration
s=s.replace('.nav-orb{right:18px;bottom:18px;width:58px;height:58px}.floating-nav{right:18px;bottom:88px;width:min(285px,calc(100vw - 36px))', '.nav-orb{right:16px;bottom:16px;width:56px;height:56px}.floating-nav{right:16px;bottom:82px;width:min(224px,calc(100vw - 32px));padding:8px}')
mobile_calibration_marker='.calibration-layout{grid-template-columns:1fr;gap:32px}'
if mobile_calibration_marker not in s:
    s=s.replace('.contact{min-height:80svh}footer{gap:20px;flex-direction:column;margin-top:70px}', '.calibration-layout{grid-template-columns:1fr;gap:32px}.calibration h2{font-size:17vw}.calibration-card{padding:18px;min-height:270px}.calibration-card p{font-size:17px}.social-row{gap:14px;flex-wrap:wrap}.contact{min-height:80svh}footer{gap:20px;flex-direction:column;margin-top:70px}')
p.write_text(s)

# README
(ROOT / 'README.md').write_text('''# SERENE Portfolio — V3\n\nMobile-first interactive portfolio.\n\n## V3 changes\n- Slimmer, smaller floating navigation panel with a premium compact footprint.\n- Navigation now includes CALIBRATION.\n- Menu closes on navigation, outside tap and scroll.\n- Added THE SERENE CALIBRATION as a lightweight recurring-content identity.\n- Added direct Instagram and TikTok links.\n- Facebook and X are intentionally not included until those profiles are ready.\n\n## Deploy\nReplace the files in the existing portfolio repository, then push to GitHub. Vercel should redeploy automatically.\n\n## Social bios\nInstagram: Product thinker / builder / creative.\nBuilding products, systems & experiments.\nThe Lab → portfolio link\n\nTikTok: I build what’s next.\nProducts • systems • experiments • words\nSERENE / THE LAB\n''')
