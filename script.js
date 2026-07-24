// ---------------------------------------------------------------
// PHOTO DATA
// Replace the `src` values with paths to your own photos (e.g. "images/fox-01.jpg")
// and edit the caption fields to match. Placeholder images are pulled
// from picsum.photos (a free placeholder image service) so the site
// has something to show until you swap in your own work.
// ---------------------------------------------------------------

const PHOTOS = {
  animals: [
    { seed: "fox-01", subject: "Red Fox", place: "Acadia NP, ME", date: "Nov 2025", tall: true },
    { seed: "owl-01", subject: "Barred Owl", place: "Adirondacks, NY", date: "Jan 2026" },
    { seed: "deer-01", subject: "White-tailed Deer", place: "Shenandoah NP, VA", date: "Oct 2025" },
    { seed: "heron-01", subject: "Great Blue Heron", place: "Everglades, FL", date: "Feb 2026" },
    { seed: "elk-01", subject: "Bull Elk", place: "Rocky Mountain NP, CO", date: "Sep 2025", tall: true },
    { seed: "hare-01", subject: "Snowshoe Hare", place: "White Mountains, NH", date: "Dec 2025" },
  ],
  concerts: [
    { seed: "concert-01", subject: "Indie set, main stage", place: "Brooklyn Steel", date: "Mar 2026", tall: true },
    { seed: "concert-02", subject: "Acoustic opener", place: "Music Hall of Williamsburg", date: "Apr 2026" },
    { seed: "concert-03", subject: "Crowd, encore", place: "Kings Theatre", date: "May 2026" },
    { seed: "concert-04", subject: "Backline, soundcheck", place: "Elsewhere", date: "Jun 2026" },
  ],
  events: [
    { seed: "event-01", subject: "Reception, first dance", place: "Hudson Valley, NY", date: "Jun 2025", tall: true },
    { seed: "event-02", subject: "Corporate gala", place: "Manhattan, NY", date: "Nov 2025" },
    { seed: "event-03", subject: "Backyard engagement party", place: "Westchester, NY", date: "Aug 2025" },
  ],
};

function buildGallery(container, items, prefix) {
  container.innerHTML = items
    .map((item, i) => {
      const index = String(i + 1).padStart(2, "0");
      const src = `https://picsum.photos/seed/${item.seed}/900/1100`;
      return `
        <button class="frame ${item.tall ? "tall" : ""}" data-src="${src}"
          data-caption="${prefix}${index} — ${item.subject} — ${item.place} — ${item.date}">
          <span class="frame-img-wrap">
            <img src="${src}" alt="${item.subject}, ${item.place}" loading="lazy">
          </span>
          <span class="frame-caption">
            <span class="index">N° ${index}</span>
            <span>${item.subject} — ${item.place}</span>
            <span>${item.date}</span>
          </span>
        </button>
      `;
    })
    .join("");
}

document.querySelectorAll(".gallery-grid").forEach((grid) => {
  const key = grid.dataset.gallery;
  const prefixMap = { animals: "A-", concerts: "C-", events: "E-" };
  buildGallery(grid, PHOTOS[key], prefixMap[key] || "");
});

// ---------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

document.addEventListener("click", (e) => {
  const frame = e.target.closest(".frame");
  if (frame) {
    lightboxImg.src = frame.dataset.src.replace("900/1100", "1600/2000");
    lightboxImg.alt = frame.dataset.caption;
    lightboxCaption.textContent = frame.dataset.caption;
    lightbox.classList.add("open");
  }
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ---------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------
const navToggle = document.getElementById("navToggle");
const header = document.querySelector(".site-header");

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});
