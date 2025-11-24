import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  // Preserve authored DOM. Only enhance images by replacing them with optimized picture elements
  // and transfer instrumentation. Do not invent wrappers or attributes.

  // Find all img elements inside the block (including those inside <picture>)
  const imgs = [...block.querySelectorAll("img")];
  imgs.forEach((img) => {
    try {
      const src = img.getAttribute("src");
      const alt =
        img.getAttribute("alt") || img.getAttribute("aria-label") || "";
      if (!src) return;

      // Create optimized picture using authored src/alt
      const optimized = createOptimizedPicture(src, alt);
      const newImg = optimized.querySelector("img");

      // Transfer instrumentation from authored img to optimized img if possible
      try {
        if (newImg) moveInstrumentation(img, newImg);
      } catch (e) {
        // moveInstrumentation may throw if instrumentation not present; ignore but continue
      }

      // If authored img is inside a <picture>, replace the whole <picture> with optimized output
      const picture = img.closest("picture");
      if (picture) {
        picture.replaceWith(optimized);
        return;
      }

      // Otherwise, replace the img node itself with the optimized picture
      img.replaceWith(optimized);
    } catch (err) {
      // Fail-safe: do nothing on error to avoid removing authored content
      // eslint-disable-next-line no-console
      console.error("decorate:block image enhancement error", err);
    }
  });

  // No structural changes: authored markup, classes, attributes and order are preserved.
}
