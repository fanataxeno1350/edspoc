import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create a container for the reconstructed block content
  const finalRootElement = document.createElement('div');
  finalRootElement.className = 'hero-full-width parallax-child-2 hero-in-view';

  // --- Background Video and Poster Image ---
  const backgroundVideoSrc = block.querySelector('.hero-full-width__background-video source')?.src;
  const backgroundPosterImageAlt = block.querySelector('.hero-full-width__background-poster')?.alt;

  const heroCover = document.createElement('div');
  heroCover.className = 'hero-full-width__cover';
  finalRootElement.append(heroCover);

  const heroBackground = document.createElement('div');
  heroBackground.className = 'hero-full-width__background';
  finalRootElement.append(heroBackground);

  const heroBackgroundWrapper = document.createElement('div');
  heroBackgroundWrapper.className = 'hero-full-width__background-wrapper zoom-out';
  heroBackground.append(heroBackgroundWrapper);

  if (backgroundVideoSrc) {
    const backgroundVideo = document.createElement('video');
    backgroundVideo.className = 'hero-full-width__background-video';
    backgroundVideo.setAttribute('playsinline', '');
    backgroundVideo.setAttribute('muted', '');
    backgroundVideo.setAttribute('loop', '');
    backgroundVideo.setAttribute('autoplay', '');
    // Transfer aria-label and aria-hidden from the authored block root if present
    const blockAriaLabel = block.getAttribute('aria-label');
    const blockAriaHidden = block.getAttribute('aria-hidden');
    if (blockAriaLabel) backgroundVideo.setAttribute('aria-label', blockAriaLabel);
    if (blockAriaHidden) backgroundVideo.setAttribute('aria-hidden', blockAriaHidden);

    const source = document.createElement('source');
    source.src = backgroundVideoSrc;
    source.type = 'video/mp4';
    backgroundVideo.append(source);
    heroBackgroundWrapper.append(backgroundVideo);
  }

  // Background Poster Image
  const backgroundPosterImg = document.createElement('img');
  backgroundPosterImg.className = 'hero-full-width__background-poster';
  backgroundPosterImg.setAttribute('loading', 'lazy');
  backgroundPosterImg.style.display = 'none';
  backgroundPosterImg.setAttribute('aria-hidden', 'true');
  if (backgroundPosterImageAlt) {
    backgroundPosterImg.alt = backgroundPosterImageAlt;
  } else {
    backgroundPosterImg.alt = 'Background poster image'; // Default from authored HTML
  }
  heroBackgroundWrapper.append(backgroundPosterImg);

  // --- Content Section ---
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-full-width__content';
  finalRootElement.append(heroContent);

  // Title
  const titleElement = block.querySelector('.hero-full-width__content__title');
  if (titleElement) {
    const slideWrap = document.createElement('div');
    slideWrap.className = 'slide-wrap';
    const slideUp = document.createElement('div');
    slideUp.className = 'slide-up';
    slideUp.setAttribute('data-slide-type', 'slide-up');
    const newTitle = document.createElement('div');
    newTitle.className = 'hero-full-width__content__title';
    newTitle.setAttribute('tabindex', '0');
    newTitle.innerHTML = titleElement.innerHTML;
    moveInstrumentation(titleElement, newTitle);
    slideUp.append(newTitle);
    slideWrap.append(slideUp);
    heroContent.append(slideWrap);
  }

  // Description
  const descriptionElement = block.querySelector('.hero-full-width__content__description');
  if (descriptionElement) {
    const slideWrap = document.createElement('div');
    slideWrap.className = 'slide-wrap';
    const slideUp = document.createElement('div');
    slideUp.className = 'slide-up';
    slideUp.setAttribute('data-slide-type', 'slide-up');
    const newDescription = document.createElement('div');
    newDescription.className = 'hero-full-width__content__description';
    newDescription.setAttribute('tabindex', '0');
    newDescription.innerHTML = descriptionElement.innerHTML;
    moveInstrumentation(descriptionElement, newDescription);
    slideUp.append(newDescription);
    slideWrap.append(slideUp);
    heroContent.append(slideWrap);
  }

  // CTAs
  const ctasContainer = block.querySelector('.hero-full-width__content--ctas');
  if (ctasContainer) {
    const slideWrap = document.createElement('div');
    slideWrap.className = 'slide-wrap';
    const slideUp = document.createElement('div');
    slideUp.className = 'slide-up';
    slideUp.setAttribute('data-slide-type', 'slide-up');
    const newCtasContainer = document.createElement('div');
    newCtasContainer.className = 'hero-full-width__content--ctas';

    // Primary CTA
    const primaryCta = ctasContainer.querySelector('a.primaryCta');
    if (primaryCta) {
      const newPrimaryCta = document.createElement('a');
      newPrimaryCta.href = primaryCta.href;
      newPrimaryCta.className = primaryCta.className;
      newPrimaryCta.target = primaryCta.target;
      newPrimaryCta.setAttribute('aria-label', primaryCta.getAttribute('aria-label') || '');
      newPrimaryCta.setAttribute('data-palette', primaryCta.getAttribute('data-palette') || '');
      const span = document.createElement('span');
      span.className = 'cta__label';
      span.textContent = primaryCta.querySelector('.cta__label')?.textContent || '';
      newPrimaryCta.append(span);
      moveInstrumentation(primaryCta, newPrimaryCta);
      newCtasContainer.append(newPrimaryCta);
    }

    // Secondary CTA (Watch Video)
    const secondaryCtaWrapper = ctasContainer.querySelector('.chevron-wrapper');
    if (secondaryCtaWrapper) {
      const newSecondaryCtaWrapper = document.createElement('div');
      newSecondaryCtaWrapper.className = 'chevron-wrapper';

      const chevronButton = secondaryCtaWrapper.querySelector('button.chevron-icon');
      if (chevronButton) {
        const newChevronButton = document.createElement('button');
        newChevronButton.type = 'button';
        newChevronButton.className = 'chevron-icon';
        newChevronButton.setAttribute('aria-label', chevronButton.getAttribute('aria-label') || 'Open video modal');
        moveInstrumentation(chevronButton, newChevronButton);
        newSecondaryCtaWrapper.append(newChevronButton);
      }

      const secondaryCtaLink = secondaryCtaWrapper.querySelector('a.secondaryCta');
      if (secondaryCtaLink) {
        const newSecondaryCtaLink = document.createElement('a');
        newSecondaryCtaLink.href = secondaryCtaLink.href;
        newSecondaryCtaLink.className = secondaryCtaLink.className;
        newSecondaryCtaLink.target = secondaryCtaLink.target;
        newSecondaryCtaLink.setAttribute('aria-label', secondaryCtaLink.getAttribute('aria-label') || '');
        newSecondaryCtaLink.setAttribute('data-palette', secondaryCtaLink.getAttribute('data-palette') || '');

        const iconSpan = document.createElement('span');
        iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
        iconSpan.setAttribute('aria-hidden', 'true');
        newSecondaryCtaLink.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'cta__label';
        labelSpan.textContent = secondaryCtaLink.querySelector('.cta__label')?.textContent || '';
        newSecondaryCtaLink.append(labelSpan);
        moveInstrumentation(secondaryCtaLink, newSecondaryCtaLink);
        newSecondaryCtaWrapper.append(newSecondaryCtaLink);
      }
      newCtasContainer.append(newSecondaryCtaWrapper);
    }

    slideUp.append(newCtasContainer);
    slideWrap.append(slideUp);
    heroContent.append(slideWrap);
  }

  // Video Modal
  const modalElement = block.querySelector('dialog.hero-full-width__content--modal');
  if (modalElement) {
    const newModal = modalElement.cloneNode(true); // Clone the entire dialog as-is
    moveInstrumentation(modalElement, newModal);
    heroContent.append(newModal);
  }

  // Replace the block content with the new structure
  block.textContent = '';
  block.append(finalRootElement);

  // Transfer data attributes from original block to finalRootElement
  Array.from(block.attributes).forEach(attr => {
    if (attr.name.startsWith('data-') || ['aria-label', 'aria-hidden'].includes(attr.name)) {
      finalRootElement.setAttribute(attr.name, attr.value);
    }
  });
}
