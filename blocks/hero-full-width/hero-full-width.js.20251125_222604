import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main outer wrappers
  const heroFullWidthCover = document.createElement('div');
  heroFullWidthCover.classList.add('hero-full-width__cover');

  const heroFullWidthBackground = document.createElement('div');
  heroFullWidthBackground.classList.add('hero-full-width__background');

  const heroFullWidthBackgroundWrapper = document.createElement('div');
  heroFullWidthBackgroundWrapper.classList.add('hero-full-width__background-wrapper', 'zoom-out');

  const heroFullWidthContent = document.createElement('div');
  heroFullWidthContent.classList.add('hero-full-width__content');

  // Initialize variables to store extracted content
  let videoSrc = '';
  let videoTypeSelected = '';
  let titleHTML = '';
  let descriptionHTML = '';
  let primaryCtaLabel = '';
  let primaryCtaUrl = '';
  let secondaryCtaLabel = '';
  let secondaryCtaUrl = '';

  // Iterate over block children to extract content
  [...block.children].forEach((row) => {
    // Each row corresponds to a field in the blockJson
    const cells = [...row.children];
    if (cells.length > 1) {
      const fieldName = cells[0].textContent.trim();
      const fieldValue = cells[1];

      if (fieldName === 'Video') {
        const videoLink = fieldValue.querySelector('a');
        if (videoLink) {
          videoSrc = videoLink.href;
        }
      } else if (fieldName === 'Video Type') {
        videoTypeSelected = fieldValue.textContent.trim();
      } else if (fieldName === 'Title') {
        titleHTML = fieldValue.innerHTML.trim();
      } else if (fieldName === 'Description') {
        descriptionHTML = fieldValue.innerHTML.trim();
      } else if (fieldName === 'Primary CTA Label') {
        primaryCtaLabel = fieldValue.textContent.trim();
      } else if (fieldName === 'Primary CTA URL') {
        const link = fieldValue.querySelector('a');
        if (link) {
          primaryCtaUrl = link.href;
        }
      } else if (fieldName === 'Secondary CTA Label') {
        secondaryCtaLabel = fieldValue.textContent.trim();
      } else if (fieldName === 'Secondary CTA URL') {
        const link = fieldValue.querySelector('a');
        if (link) {
          secondaryCtaUrl = link.href;
        }
      }
    }
  });

  // Set data attributes on the main block
  block.setAttribute('data-media-type', videoTypeSelected);
  block.classList.add('parallax-child-2', 'hero-in-view');

  // Build the video background structure
  if (videoSrc) {
    const videoElement = document.createElement('video');
    videoElement.classList.add('hero-full-width__background-video');
    videoElement.setAttribute('aria-hidden', 'true');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('muted', '');
    videoElement.setAttribute('loop', '');
    videoElement.setAttribute('autoplay', '');

    const sourceElement = document.createElement('source');
    sourceElement.src = videoSrc;
    sourceElement.type = 'video/mp4';
    videoElement.append(sourceElement);
    heroFullWidthBackgroundWrapper.append(videoElement);

    const posterImg = document.createElement('img');
    posterImg.alt = 'Background poster image';
    posterImg.loading = 'lazy';
    posterImg.classList.add('hero-full-width__background-poster');
    posterImg.style.display = 'none';
    posterImg.setAttribute('aria-hidden', 'true');
    heroFullWidthBackgroundWrapper.append(posterImg);
  }

  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);

  // Build the content area
  // Title and Description
  const slideWrap1 = document.createElement('div');
  slideWrap1.classList.add('slide-wrap');
  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.classList.add('slide-up');

  if (titleHTML) {
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('hero-full-width__content__title');
    titleDiv.setAttribute('tabindex', '0');
    titleDiv.innerHTML = titleHTML;
    slideUp1.append(titleDiv);
    // Transfer instrumentation for the title if needed
    // Assuming title is in the second cell of the 'Title' row
    const titleRow = [...block.children].find(row => row.children[0].textContent.trim() === 'Title');
    if (titleRow && titleRow.children[1]) {
      moveInstrumentation(titleRow.children[1], titleDiv);
    }
  }

  if (descriptionHTML) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('hero-full-width__content__description');
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.innerHTML = descriptionHTML;
    slideUp1.append(descriptionDiv);
    // Transfer instrumentation for the description if needed
    const descriptionRow = [...block.children].find(row => row.children[0].textContent.trim() === 'Description');
    if (descriptionRow && descriptionRow.children[1]) {
      moveInstrumentation(descriptionRow.children[1], descriptionDiv);
    }
  }
  slideWrap1.append(slideUp1);
  heroFullWidthContent.append(slideWrap1);

  // CTAs
  if (primaryCtaLabel || secondaryCtaLabel) {
    const slideWrap2 = document.createElement('div');
    slideWrap2.classList.add('slide-wrap');
    const slideUp2 = document.createElement('div');
    slideUp2.setAttribute('data-slide-type', 'slide-up');
    slideUp2.classList.add('slide-up');

    const ctasDiv = document.createElement('div');
    ctasDiv.classList.add('hero-full-width__content--ctas');

    if (primaryCtaLabel && primaryCtaUrl) {
      const primaryCta = document.createElement('a');
      primaryCta.href = primaryCtaUrl;
      primaryCta.classList.add('cta', 'cta__secondary', 'primaryCta');
      primaryCta.target = '_self';
      primaryCta.setAttribute('aria-label', primaryCtaLabel);
      primaryCta.setAttribute('data-palette', 'palette-light');
      const span = document.createElement('span');
      span.classList.add('cta__label');
      span.textContent = primaryCtaLabel;
      primaryCta.append(span);
      ctasDiv.append(primaryCta);
      // Transfer instrumentation for primary CTA
      const primaryCtaUrlRow = [...block.children].find(row => row.children[0].textContent.trim() === 'Primary CTA URL');
      if (primaryCtaUrlRow && primaryCtaUrlRow.children[1]) {
        moveInstrumentation(primaryCtaUrlRow.children[1], primaryCta);
      }
    }

    if (secondaryCtaLabel && secondaryCtaUrl) {
      const chevronWrapper = document.createElement('div');
      chevronWrapper.classList.add('chevron-wrapper');

      const chevronButton = document.createElement('button');
      chevronButton.type = 'button';
      chevronButton.classList.add('chevron-icon');
      chevronButton.setAttribute('aria-label', 'Open video modal');
      chevronWrapper.append(chevronButton);

      const secondaryCta = document.createElement('a');
      secondaryCta.href = secondaryCtaUrl;
      secondaryCta.classList.add('cta', 'cta__link', 'secondaryCta');
      secondaryCta.target = '_self';
      secondaryCta.setAttribute('aria-label', secondaryCtaLabel);
      secondaryCta.setAttribute('data-palette', 'palette-light');

      const iconSpan = document.createElement('span');
      iconSpan.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      iconSpan.setAttribute('aria-hidden', 'true');
      secondaryCta.append(iconSpan);

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('cta__label');
      labelSpan.textContent = secondaryCtaLabel;
      secondaryCta.append(labelSpan);
      chevronWrapper.append(secondaryCta);
      ctasDiv.append(chevronWrapper);
      // Transfer instrumentation for secondary CTA
      const secondaryCtaUrlRow = [...block.children].find(row => row.children[0].textContent.trim() === 'Secondary CTA URL');
      if (secondaryCtaUrlRow && secondaryCtaUrlRow.children[1]) {
        moveInstrumentation(secondaryCtaUrlRow.children[1], secondaryCta);
      }
    }
    slideUp2.append(ctasDiv);
    slideWrap2.append(slideUp2);
    heroFullWidthContent.append(slideWrap2);
  }

  // Video Modal (always present based on HTML, but content depends on videoSrc)
  const dialog = document.createElement('dialog');
  dialog.classList.add('hero-full-width__content--modal');
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');

  const form = document.createElement('form');
  form.method = 'dialog';
  const closeButton = document.createElement('button');
  closeButton.classList.add('hero-full-width__content--modal__close-button');
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  form.append(closeButton);
  dialog.append(form);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.classList.add('video', 'hero-full-width__content--modal__video');

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls');

  const videoControls = document.createElement('div');
  videoControls.classList.add('video-container__controls');

  const timerDiv = document.createElement('div');
  timerDiv.classList.add('video-container__controls__timer');
  timerDiv.innerHTML = `
    <div class="video-container__controls__timer__progress-area">
        <span class="video-container__controls__timer__progress-area__progress-bar"></span>
        <span class="video-container__controls__timer__progress-area__pointer"></span>
        <span class="video-container__controls__timer__progress-area__progress-pending"></span>
    </div>
    <p class="video-container__controls__timer__current-time">00:00</p>
    <p class="video-container__controls__timer__duration">00:00</p>
  `;
  videoControls.append(timerDiv);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('video-container__controls__buttons');
  buttonsDiv.innerHTML = `
    <button class="video-container__controls__buttons__play-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span>
    </button>
    <button class="video-container__controls__buttons__mute-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>
    </button>
    <button class="video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>
    </button>
  `;
  videoControls.append(buttonsDiv);
  videoContainer.append(videoControls);

  const modalVideoElement = document.createElement('video');
  modalVideoElement.classList.add('video-container__video');
  modalVideoElement.setAttribute('playsinline', '');
  modalVideoElement.setAttribute('webkit-playsinline', '');
  modalVideoElement.setAttribute('muted', 'true');
  modalVideoElement.setAttribute('autoplay', '');

  if (videoSrc) {
    const modalSourceElement = document.createElement('source');
    modalSourceElement.src = videoSrc;
    modalSourceElement.type = 'video/mp4';
    modalVideoElement.append(modalSourceElement);
  }
  modalVideoElement.append(document.createTextNode('webkit-playsinline')); // As per original HTML
  modalVideoElement.append(document.createTextNode('x-webkit-airplay="allow"')); // As per original HTML

  videoContainer.append(modalVideoElement);
  videoModalDiv.append(videoContainer);
  dialog.append(videoModalDiv);
  heroFullWidthContent.append(dialog);

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(heroFullWidthCover, heroFullWidthBackground, heroFullWidthContent);
}
