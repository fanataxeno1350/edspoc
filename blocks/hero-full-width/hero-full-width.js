import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const heroFullWidth = document.createElement('div');
  heroFullWidth.className = 'hero-full-width parallax-child-2 hero-in-view';
  heroFullWidth.setAttribute('data-media-type', 'videoTypeSelected');

  // Preserve aria-label from the original block for accessibility
  const originalAriaLabel = block.getAttribute('aria-label');
  if (originalAriaLabel) {
    heroFullWidth.setAttribute('aria-label', originalAriaLabel);
  }
  heroFullWidth.setAttribute('aria-hidden', 'true');

  const heroCover = document.createElement('div');
  heroCover.className = 'hero-full-width__cover';
  heroFullWidth.append(heroCover);

  const heroBackground = document.createElement('div');
  heroBackground.className = 'hero-full-width__background';
  const heroBackgroundWrapper = document.createElement('div');
  heroBackgroundWrapper.className = 'hero-full-width__background-wrapper zoom-out';

  // Video field
  const videoSourceEl = block.querySelector('.hero-full-width__background-video source');
  if (videoSourceEl) {
    const videoEl = document.createElement('video');
    videoEl.className = 'hero-full-width__background-video';
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('loop', '');
    videoEl.setAttribute('autoplay', '');
    if (originalAriaLabel) {
      videoEl.setAttribute('aria-label', originalAriaLabel);
    }
    videoEl.setAttribute('aria-hidden', 'true');

    const source = document.createElement('source');
    source.src = videoSourceEl.src;
    source.type = videoSourceEl.type;
    videoEl.append(source);
    heroBackgroundWrapper.append(videoEl);
  }

  // Poster image (always present but hidden in authored HTML)
  const posterImg = document.createElement('img');
  posterImg.alt = 'Background poster image';
  posterImg.loading = 'lazy';
  posterImg.className = 'hero-full-width__background-poster';
  posterImg.style.display = 'none';
  posterImg.setAttribute('aria-hidden', 'true');
  heroBackgroundWrapper.append(posterImg);

  heroBackground.append(heroBackgroundWrapper);
  heroFullWidth.append(heroBackground);

  const heroContent = document.createElement('div');
  heroContent.className = 'hero-full-width__content';

  // Title field
  const titleDiv = block.querySelector('.hero-full-width__content__title');
  if (titleDiv) {
    const slideWrapTitle = document.createElement('div');
    slideWrapTitle.className = 'slide-wrap';
    const slideUpTitle = document.createElement('div');
    slideUpTitle.setAttribute('data-slide-type', 'slide-up');
    slideUpTitle.className = 'slide-up';
    const newTitleDiv = document.createElement('div');
    newTitleDiv.className = 'hero-full-width__content__title';
    newTitleDiv.setAttribute('tabindex', '0');
    newTitleDiv.innerHTML = titleDiv.innerHTML;
    moveInstrumentation(titleDiv, newTitleDiv);
    slideUpTitle.append(newTitleDiv);
    slideWrapTitle.append(slideUpTitle);
    heroContent.append(slideWrapTitle);
  }

  // Description field
  const descriptionDiv = block.querySelector('.hero-full-width__content__description');
  if (descriptionDiv) {
    const slideWrapDescription = document.createElement('div');
    slideWrapDescription.className = 'slide-wrap';
    const slideUpDescription = document.createElement('div');
    slideUpDescription.setAttribute('data-slide-type', 'slide-up');
    slideUpDescription.className = 'slide-up';
    const newDescriptionDiv = document.createElement('div');
    newDescriptionDiv.className = 'hero-full-width__content__description';
    newDescriptionDiv.setAttribute('tabindex', '0');
    newDescriptionDiv.innerHTML = descriptionDiv.innerHTML;
    moveInstrumentation(descriptionDiv, newDescriptionDiv);
    slideUpDescription.append(newDescriptionDiv);
    slideWrapDescription.append(slideUpDescription);
    heroContent.append(slideWrapDescription);
  }

  // CTAs multifield
  const ctasDiv = block.querySelector('.hero-full-width__content--ctas');
  if (ctasDiv) {
    const slideWrapCtas = document.createElement('div');
    slideWrapCtas.className = 'slide-wrap';
    const slideUpCtas = document.createElement('div');
    slideUpCtas.setAttribute('data-slide-type', 'slide-up');
    slideUpCtas.className = 'slide-up';
    const newCtasDiv = document.createElement('div');
    newCtasDiv.className = 'hero-full-width__content--ctas';

    const primaryCta = ctasDiv.querySelector('a.primaryCta');
    if (primaryCta) {
      const newPrimaryCta = document.createElement('a');
      newPrimaryCta.href = primaryCta.href;
      newPrimaryCta.className = 'cta cta__secondary primaryCta ';
      newPrimaryCta.target = primaryCta.target;
      newPrimaryCta.setAttribute('aria-label', primaryCta.getAttribute('aria-label'));
      newPrimaryCta.setAttribute('data-palette', primaryCta.getAttribute('data-palette'));
      const span = document.createElement('span');
      span.className = 'cta__label';
      span.textContent = primaryCta.textContent.trim();
      newPrimaryCta.append(span);
      moveInstrumentation(primaryCta, newPrimaryCta);
      newCtasDiv.append(newPrimaryCta);
    }

    const chevronWrapper = ctasDiv.querySelector('.chevron-wrapper');
    if (chevronWrapper) {
      const newChevronWrapper = document.createElement('div');
      newChevronWrapper.className = 'chevron-wrapper';

      const chevronButton = chevronWrapper.querySelector('button.chevron-icon');
      if (chevronButton) {
        const newChevronButton = document.createElement('button');
        newChevronButton.type = 'button';
        newChevronButton.className = 'chevron-icon';
        newChevronButton.setAttribute('aria-label', chevronButton.getAttribute('aria-label'));
        moveInstrumentation(chevronButton, newChevronButton);
        newChevronWrapper.append(newChevronButton);
      }

      const secondaryCta = chevronWrapper.querySelector('a.secondaryCta');
      if (secondaryCta) {
        const newSecondaryCta = document.createElement('a');
        newSecondaryCta.href = secondaryCta.href;
        newSecondaryCta.className = 'cta cta__link secondaryCta ';
        newSecondaryCta.target = secondaryCta.target;
        newSecondaryCta.setAttribute('aria-label', secondaryCta.getAttribute('aria-label'));
        newSecondaryCta.setAttribute('data-palette', secondaryCta.getAttribute('data-palette'));

        const iconSpan = document.createElement('span');
        iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
        iconSpan.setAttribute('aria-hidden', 'true');
        newSecondaryCta.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'cta__label';
        labelSpan.textContent = secondaryCta.textContent.trim();
        newSecondaryCta.append(labelSpan);
        moveInstrumentation(secondaryCta, newSecondaryCta);
        newChevronWrapper.append(newSecondaryCta);
      }
      newCtasDiv.append(newChevronWrapper);
    }

    moveInstrumentation(ctasDiv, newCtasDiv);
    slideUpCtas.append(newCtasDiv);
    slideWrapCtas.append(slideUpCtas);
    heroContent.append(slideWrapCtas);
  }

  // Video Modal (dialog element)
  const videoModal = block.querySelector('dialog.hero-full-width__content--modal');
  if (videoModal) {
    const newVideoModal = videoModal.cloneNode(true); // Clone the entire dialog as is
    moveInstrumentation(videoModal, newVideoModal);
    heroContent.append(newVideoModal);
  }

  heroFullWidth.append(heroContent);

  block.textContent = '';
  block.append(heroFullWidth);
}
