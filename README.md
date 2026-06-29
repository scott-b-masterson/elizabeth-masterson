# Elizabeth Masterson — Interior Design Website

A single-page portfolio site for **Elizabeth Masterson / Masterson Design Style**.
Built as plain HTML, CSS, and JavaScript — no build tools, no frameworks, nothing to install.
It's designed to be hosted **free** on GitHub Pages.

---


```
elizabeth-masterson/
├── index.html          ← the whole website (all the text lives here)
├── css/styles.css      ← colors, fonts, spacing (the "look")
├── js/main.js          ← the interactive bits (loader, sliders, form)
├── assets/img/         ← all images (currently tasteful placeholders)
└── README.md           ← this guide
```



The whole palette is defined once at the top of **`css/styles.css`**:

```css
--ivory:   #F7F3EE;   /* warm background        */
--sage:    #A7B09A;   /* soft green accent      */
--charcoal:#2D2D2D;   /* main text / dark areas */
--brass:   #B08D57;   /* antique brass accent   */
```

Change a value here and it updates everywhere automatically.

---


## Notes

- **Fonts** (Cormorant Garamond + Jost) load from Google Fonts automatically — no setup.
- The brand wordmarks in the scrolling strip (Hooker, Bernhardt, Visual Comfort, Vanguard,
  Arteriors) and the featured designer names are shown as **text references**, not official
  logos. Swap in official logos only if you have permission to use them.
- The site is fully responsive (looks great on phones) and respects "reduce motion" settings.
- Testimonials are real client reviews, attributed ("Perigold Client," etc.).
  Add names anytime in `index.html` if clients are happy to be credited.

