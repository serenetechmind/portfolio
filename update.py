from pathlib import Path

ROOT = Path(__file__).resolve().parent
INDEX = ROOT / "index.html"
STYLE = ROOT / "style.css"
CALIBRATION_MARKER = '<section class="section calibration" id="calibration">'
PREVIEW_STYLE_MARKER = ".calibration-preview{"

# Preserve the original V4 migration behavior for older V3 copies,
# while making every managed insertion safe to repeat.
index = INDEX.read_text()
if CALIBRATION_MARKER not in index:
    calibration = "\n<section class=\"section calibration\" id=\"calibration\">\n  <div class=\"section-head\"><span>04 / CALIBRATION</span><span>LANGUAGE / DAILY PRACTICE</span></div>\n  <div class=\"calibration-preview\" id=\"calibrationPreview\"></div>\n</section>\n"
    index = index.replace('<section class="section contact" id="contact">', calibration + '\n<section class="section contact" id="contact">')
index = index.replace('NAVIGATION / 00—04', 'NAVIGATION / 00—05')
index = index.replace('<button data-go="lab"><span>03</span> THE LAB</button>\n  <button data-go="contact"><span>04</span> CONTACT</button>', '<button data-go="lab"><span>03</span> THE LAB</button>\n  <button data-go="calibration"><span>04</span> CALIBRATION</button>\n  <button data-go="contact"><span>05</span> CONTACT</button>')
index = index.replace('<span>04 / CONTACT</span>', '<span>05 / CONTACT</span>')
INDEX.write_text(index)

style = STYLE.read_text()
if PREVIEW_STYLE_MARKER not in style:
    style += "\n/* Calibration preview styles are maintained in the V4 stylesheet. */\n"
STYLE.write_text(style)
