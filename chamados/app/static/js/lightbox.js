(function () {
  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector(".lightbox-image");
  const caption = lightbox.querySelector(".lightbox-caption");

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || "";
    caption.textContent = alt || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    img.removeAttribute("src");
    caption.textContent = "";
    document.body.classList.remove("lightbox-open");
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox-src]");
    if (trigger) {
      event.preventDefault();
      openLightbox(trigger.dataset.lightboxSrc, trigger.dataset.lightboxAlt || "");
      return;
    }
    if (event.target.closest("[data-lightbox-close]")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
