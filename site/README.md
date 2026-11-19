# Jr Concrete Services – Website

10 pages: index, about, services, gallery, process, service-areas, reviews, faq, quote (booking + calculator), contact.
Open `index.html` in a browser, or upload the whole folder to any host (cPanel, Netlify, GitHub Pages).

## 1. Booking emails (client copy + owner copy)
1. Create a free account at emailjs.com and connect your email service.
2. Create ONE template. Set "To email" = `{{to_email}}` and "Bcc" = `{{owner_email}}`.
   Body can use: `{{customer_name}} {{phone}} {{address}} {{service}} {{date}} {{time}} {{estimate}} {{breakdown}} {{notes}}`.
3. Put your Public Key, Service ID, Template ID and the owner's email in `js/config.js`.
Until this is done, the form shows a "send by email instead" fallback link.

## 2. Pricing
Edit rates per sq ft in `js/config.js`. The numbers there are placeholders; set your real prices.

## 3. Replace images
Swap files in `images/` keeping the same file names (logo.jpg = logo). Hero slides are set in `index.html` (`.slides`).
Gallery items and before/after pairs are in `gallery.html`.

## 4. Replace placeholders
Reviews, owner story, license/insurance details and the mileage zones on the quote page.
