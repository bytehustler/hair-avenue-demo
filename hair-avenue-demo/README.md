# The Hair Avenue Unisex Salon — Website Concept Demo

An independent website concept for **The Hair Avenue Unisex Salon**, Dabholkar Corner, Kolhapur.
It was **not commissioned or approved by the business**. It is a live preview to share privately with the owner for feedback.

Static HTML/CSS/vanilla JS. No build step, no backend, no paid APIs. Works from a GitHub Pages project URL because every path is relative.

## Files

```
hair-avenue-demo/
├── index.html      Page markup, content, links, SEO metadata
├── style.css       All styles (charcoal / warm gold / ivory theme)
├── script.js       Navigation, scroll effects, lightbox, before/after slider, WhatsApp messages
├── README.md
└── assets/         favicon + fallback placeholder (put real photos here)
```

## Features

- Sticky header, mobile full-screen menu, active-section highlighting, smooth scrolling
- WhatsApp buttons with a prefilled enquiry (each service card sends its own service name)
- Click-to-call, Instagram, Google Maps embed + "Get Directions"
- Gallery with keyboard-accessible lightbox; draggable before/after slider
- Opening hours table that highlights today (India time), marked "Please confirm"
- Reduced-motion support, skip link, visible focus states, semantic HTML
- `noindex` meta tag so the demo is not indexed by search engines (remove it if the owner adopts the site)

## Colour themes

Each site ships with four themes: `ivory` (light, default) · `champagne` (warm beige + espresso) · `sage` (soft green) · `noir` (the original dark look).

- **Set the default:** in `index.html`, change `data-theme="ivory"` on the `<html>` tag (there's a comment right above it).
- **Edit colours:** each theme is a block of variables at the top of `style.css`.
- **Preview link for the owner:** add `?theme=NAME` to the URL, e.g. `https://USERNAME.github.io/hair-avenue-demo/?theme=noir`.
- **Theme button:** the round "Theme" button at the bottom left lets visitors switch themes, and the choice is remembered. It's meant for the demo. For the final site, delete the `<div class="theme-switcher">` block in `index.html` (marked with a comment).

## Images

The site uses **dummy photos from Unsplash** (free to use under the Unsplash License), loaded directly from `images.unsplash.com`. They are stand-ins only and do not show this business. Before going live, replace them with the owner's approved photos.

**How to replace a photo:** every image in `index.html` has a comment directly above it, like this:

```html
<!-- 🖼 IMAGE: HERO BACKGROUND — replace the src below with your own photo (e.g. assets/hero.jpg) -->
<img src="https://images.unsplash.com/photo-...">
```

1. Put your photo in `assets/` (e.g. `assets/hero.jpg`). Compress it first (squoosh.app); under 300 KB is ideal.
2. Change that `src` to `assets/hero.jpg`.
3. Update the `alt` text to describe the real photo.

Search `index.html` for `🖼 IMAGE` to find every slot. If any photo fails to load, the site automatically shows `assets/placeholder.svg` instead of a broken image.

**Logo:** the header uses a plain text wordmark. Use the business's real logo only if the owner provides it and permits its use.

## Editing content

- **Services:** in `index.html`, find `EDITABLE SERVICE CARDS`. Copy an `<article class="service-card">` block to add a service. Change `data-service` to set the WhatsApp message. Replace "Contact for pricing" only with prices the owner confirms.
- **Hours:** edit the `<table>` in the Contact section. Remove the "Please confirm" tag once verified.
- **Rating line:** in the hero and About badge. Update or remove if it changes.
- **WhatsApp number:** `WHATSAPP_NUMBER` at the top of `script.js`, plus the `wa.me` links in `index.html`.

## Deploy to GitHub Pages

1. Create a new GitHub repository, e.g. `hair-avenue-demo`.
2. Upload the **contents** of this folder (so `index.html` is at the repository root, next to `assets/`).
3. Open the repository **Settings**.
4. Open **Pages** in the left sidebar.
5. Under **Build and deployment → Source**, choose **Deploy from a branch**.
6. Select branch **main** and folder **/ (root)**.
7. Click **Save**.
8. After a minute or two the site is live at:
   `https://USERNAME.github.io/REPOSITORY-NAME/`
   e.g. `https://yourname.github.io/hair-avenue-demo/`

This README does not mean the site has been deployed. Check the Pages settings screen for the live URL once the build finishes.

## Owner verification checklist

- [ ] Which colour theme the owner prefers (then remove the theme switcher)

- [ ] Permission to show this concept / use the business name publicly
- [ ] Full service menu (replace the Haircut / Hair Styling / Hair Care placeholders)
- [ ] Prices, or confirmation to keep "Contact for pricing"
- [ ] Product brands used (none are named on the site)
- [ ] Owner-approved photos to replace every Unsplash dummy photo, plus a before/after pair with client consent
- [ ] Official logo file and permission to use it
- [ ] Opening hours for each day (Monday 9:00 AM, other days approx. 9:30 AM, to 9:30 PM)
- [ ] Phone/WhatsApp number +91 95950 73807 is correct and on WhatsApp
- [ ] Address and Google Maps pin are correct
- [ ] Instagram handle @the_hair_avenue_salon is current
- [ ] Current Google rating / review count (4.9, ~530 reviews at the time of writing)
- [ ] Email address, if they want one listed (none shown)
- [ ] Remove the `noindex` meta tag and the demo footer note only if the owner adopts the site
