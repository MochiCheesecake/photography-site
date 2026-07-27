// ---------------------------------------------------------------
// PHOTO DATA  —  this is the only part you need to edit.
//
// Your 9 real photos are wired in below. I guessed at the species;
// anything in [square brackets] is a guess or a blank I couldn't
// fill in, so search for "[" and replace those with the real thing.
//
// To add a photo: resize it to ~2000px wide, drop it in the images
// folder, and copy one of the lines below.
// Set  wide: true  to make a photo span two columns in the grid.
// ---------------------------------------------------------------

const PHOTOS = {
  animals: [
    { src: "images/03-white-tiger.jpg",        subject: "White Bengal Tiger", wide: true },
    { src: "images/06-arctic-wolf-pups.jpg",   subject: "Arctic Wolf Pups" },
    { src: "images/04-serval.jpg",             subject: "Serval"},
    { src: "images/02-white-rhinos.jpg",       subject: "White Rhinoceros", wide: true },
    { src: "images/08-humboldt-penguin.jpg",   subject: "Humboldt Penguin"},
    { src: "images/01-sulcata-tortoise.jpg",   subject: "Sulcata Tortoise" },
    { src: "images/07-tiger-in-foliage.jpg",   subject: "Tiger, through leaves" },
    { src: "images/05-pygmy-goats.jpg",        subject: "Pygmy Goats"},
    { src: "images/09-humpback-whale.jpg",     subject: "Humpback Whale", wide: true },
  ],

  // Nothing here yet. Add photos to these lists and then un-hide the
  // matching sections in index.html (search for "HIDDEN SECTION").
  concerts: [],
  events: [],
};

function buildGallery(container, items, prefix) {
  container.innerHTML = items
    .map((item, i) => {
      const index = String(i + 1).padStart(2, "0");
      const parts = [item.subject, item.place, item.date].filter(Boolean);
      const caption = `${prefix}${index} — ${parts.join(" — ")}`;
      return `
        <button class="frame ${item.wide ? "wide" : ""}" data-src="${item.src}"
          data-caption="${caption}">
          <span class="frame-img-wrap">
            <img src="${item.src}" alt="${item.subject}" loading="lazy" decoding="async">
          </span>
          <span class="frame-caption">
            <span class="index">N° ${index}</span>
            <span>${[item.subject, item.place].filter(Boolean).join(" — ")}</span>
            <span>${item.date || ""}</span>
          </span>
        </button>
      `;
    })
    .join("");
}

document.querySelectorAll(".gallery-grid").forEach((grid) => {
  const key = grid.dataset.gallery;
  const prefixMap = { animals: "A-", concerts: "C-", events: "E-" };
  buildGallery(grid, PHOTOS[key] || [], prefixMap[key] || "");
});

// A photo listed above but missing from the images folder would show a
// broken icon. Hide it instead, so the page never looks broken.
document.querySelectorAll(".frame img").forEach((img) => {
  img.addEventListener("error", () => img.closest(".frame").remove());
});

// ---------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

let frames = [];
let current = 0;

function showFrame(n) {
  if (!frames.length) return;
  current = (n + frames.length) % frames.length;
  const frame = frames[current];
  lightboxImg.src = frame.dataset.src;
  lightboxImg.alt = frame.dataset.caption;
  lightboxCaption.textContent = frame.dataset.caption;
}

document.addEventListener("click", (e) => {
  const frame = e.target.closest(".frame");
  if (!frame) return;
  // Only step through the gallery the clicked photo belongs to.
  frames = Array.from(frame.closest(".gallery-grid").querySelectorAll(".frame"));
  showFrame(frames.indexOf(frame));
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showFrame(current - 1);
  if (e.key === "ArrowRight") showFrame(current + 1);
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
