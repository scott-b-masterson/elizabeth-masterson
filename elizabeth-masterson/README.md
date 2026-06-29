# Elizabeth Masterson — Interior Design Website

A single-page portfolio site for **Elizabeth Masterson / Masterson Design Style**.
Built as plain HTML, CSS, and JavaScript — no build tools, no frameworks, nothing to install.
It's designed to be hosted **free** on GitHub Pages.

> **You don't need to be technical to run this.** Follow the steps below in order.
> Anything in `THIS STYLE` is something you'll click or type.

---

## 1. What's in this folder

```
elizabeth-masterson/
├── index.html          ← the whole website (all the text lives here)
├── css/styles.css      ← colors, fonts, spacing (the "look")
├── js/main.js          ← the interactive bits (loader, sliders, form)
├── assets/img/         ← all images (currently tasteful placeholders)
└── README.md           ← this guide
```

The site has 9 sections, in this order: **Hero → Designer Statement → Brands & Designers →
Selected Work → Before & After → Process → Testimonials → About → Contact.**

---

## 2. Put it online with GitHub Pages (about 10 minutes)

1. Go to **https://github.com/scott-b-masterson/elizabeth-masterson**.
2. Click **Add file → Upload files**.
3. Drag in **everything inside this `elizabeth-masterson` folder** — the `index.html`
   file, the `css`, `js`, and `assets` folders. (Upload the *contents*, so that
   `index.html` sits at the top level of the repo.)
4. Scroll down, click **Commit changes**.
5. Click the **Settings** tab → **Pages** (left sidebar).
6. Under **Build and deployment → Source**, choose **Deploy from a branch**.
7. Set branch to **`main`** and folder to **`/ (root)`**, then **Save**.
8. Wait ~1 minute, then refresh. GitHub shows your live link, usually:
   **`https://scott-b-masterson.github.io/elizabeth-masterson/`**

That's it — the site is live. Every time you upload a changed file and commit, the site
updates within a minute.

---

## 3. Swap the placeholder images for real photos

Right now every image is a soft, on-brand **placeholder**. To use a real photo, replace the
matching file in `assets/img/` **with a file of the same name**. Easiest method on GitHub:
open `assets/img/`, click the placeholder, click the **pencil/Replace** option, and upload
your photo renamed to match.

> **Tip:** Real photos should be **`.jpg`**. If you upload `hero.jpg`, also open `index.html`
> and change `assets/img/hero.svg` to `assets/img/hero.jpg`. (Or just keep the `.svg` name on
> your JPG — both work, but matching names is cleanest.) I'm happy to do these swaps for you —
> just send me the photos.

### Image list & ideal sizes

| File | Where it appears | Shape | Good size |
|------|------------------|-------|-----------|
| `hero.svg` | Full-screen top image | Wide (landscape) | 1600×1000+ |
| `project-1.svg` … `project-6.svg` | Selected Work grid | Tall (4:5) | 800×1000 |
| `before-1.svg`, `after-1.svg` | First Before/After slider | Wide (3:2) | 1200×800 |
| `before-2.svg`, `after-2.svg` | Second Before/After slider | Wide (3:2) | 1200×800 |
| `designer-1.svg` … `designer-4.svg` | Featured Designers | Tall (4:5) | 800×1000 |
| `product-1.svg` … `product-4.svg` | Featured Pieces | Square | 900×900 |
| `about-portrait.svg` | About section portrait | Tall (4:5) | 800×1000 |
| `og-image.svg` | Preview when shared on social | Wide | 1200×630 |
| `favicon.svg` | Little browser-tab icon | Square | 64×64 |

**Before/After matters:** for the sliders to line up, `before-x` and `after-x` should be the
**same photo angle** of the same room — one untouched, one finished.

---

## 4. Turn on the contact form (5 minutes, free)

The form already looks and works perfectly — it just needs a free **Formspree** account to
deliver messages to an inbox. Until you set this up, the form gracefully falls back to opening
the visitor's email app.

1. Go to **https://formspree.io** and sign up (free plan is fine).
2. Create a new form; point it at Elizabeth's email address.
3. Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
4. Open `index.html`, find this line (around the Contact section):

   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
5. Replace **`YOUR_FORM_ID`** with your real ID (e.g. `abcdwxyz`). Commit. Done — messages now
   arrive by email.

While you're there, update the email address and social links in the Contact section
(`hello@mastersondesignstyle.com` and the Instagram / LinkedIn / Pinterest / Houzz links).

---

## 5. Edit the words

All visible text lives in **`index.html`**. Open it, use **Ctrl/Cmd + F** to find the text you
want to change, type your new text, and commit. The headline, statement, project names, process
steps, testimonials, and About bio are all plain text you can edit safely.

---

## 6. Change the colors (optional)

The whole palette is defined once at the top of **`css/styles.css`**:

```css
--ivory:   #F7F3EE;   /* warm background        */
--sage:    #A7B09A;   /* soft green accent      */
--charcoal:#2D2D2D;   /* main text / dark areas */
--brass:   #B08D57;   /* antique brass accent   */
```

Change a value here and it updates everywhere automatically.

---

## 7. Add a custom domain later (optional)

When you buy a domain (e.g. `mastersondesignstyle.com`):

1. In your domain registrar, point the domain to GitHub Pages (GitHub's Pages settings show the
   exact DNS records to add).
2. In the repo: **Settings → Pages → Custom domain**, enter the domain, **Save**.
3. Tick **Enforce HTTPS** once it's available.

---

## Notes

- **Fonts** (Cormorant Garamond + Jost) load from Google Fonts automatically — no setup.
- The brand wordmarks in the scrolling strip (Hooker, Bernhardt, Visual Comfort, Vanguard,
  Arteriors) and the featured designer names are shown as **text references**, not official
  logos. Swap in official logos only if you have permission to use them.
- The site is fully responsive (looks great on phones) and respects "reduce motion" settings.
- Testimonials are real client reviews, attributed generically ("Perigold Client," etc.).
  Add names anytime in `index.html` if clients are happy to be credited.

*Questions or changes? Hand this back to me (Scott) and I'll update it.*
