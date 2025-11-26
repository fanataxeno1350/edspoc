import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const backgroundVideo = block.querySelector('[data-aue-prop="backgroundVideo"]');
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const ctasContainer = block.querySelector('[data-aue-model="ctas"]');

  const primaryCtaLabel = ctasContainer?.querySelector('[data-aue-prop="primaryCtaLabel"]');
  const primaryCtaUrl = ctasContainer?.querySelector('[data-aue-prop="primaryCtaUrl"]');
  const secondaryCtaLabel = ctasContainer?.querySelector('[data-aue-prop="secondaryCtaLabel"]');
  const secondaryCtaUrl = ctasContainer?.querySelector('[data-aue-prop="secondaryCtaUrl"]');

  const rootDiv = document.createElement('div');
  rootDiv.className = 'hero-full-width parallax-child-2 hero-in-view';
  rootDiv.setAttribute('data-media-type', 'videoTypeSelected');

  // Set aria-label from title content, handling potential null
  if (title) {
    rootDiv.setAttribute('aria-label', title.innerHTML);
  }
  rootDiv.setAttribute('aria-hidden', 'true');

  const coverDiv = document.createElement('div');
  coverDiv.className = 'hero-full-width__cover';
  rootDiv.append(coverDiv);

  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'hero-full-width__background';
  rootDiv.append(backgroundDiv);

  const backgroundWrapperDiv = document.createElement('div');
  backgroundWrapperDiv.className = 'hero-full-width__background-wrapper zoom-out';
  backgroundDiv.append(backgroundWrapperDiv);

  if (backgroundVideo) {
    const videoElement = document.createElement('video');
    videoElement.className = 'hero-full-width__background-video';
    if (title) {
      videoElement.setAttribute('aria-label', title.innerHTML);
    }
    videoElement.setAttribute('aria-hidden', 'true');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('muted', '');
    videoElement.setAttribute('loop', '');
    videoElement.setAttribute('autoplay', '');

    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', backgroundVideo.textContent.trim());
    sourceElement.setAttribute('type', 'video/mp4');
    videoElement.append(sourceElement);
    backgroundWrapperDiv.append(videoElement);
    moveInstrumentation(backgroundVideo, videoElement);
  }

  const posterImg = document.createElement('img');
  posterImg.setAttribute('alt', 'Background poster image');
  posterImg.setAttribute('loading', 'lazy');
  posterImg.className = 'hero-full-width__background-poster';
  posterImg.style.display = 'none';
  posterImg.setAttribute('aria-hidden', 'true');
  backgroundWrapperDiv.append(posterImg);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-full-width__content';
  rootDiv.append(contentDiv);

  if (title || description) {
    const slideWrap1 = document.createElement('div');
    slideWrap1.className = 'slide-wrap';
    contentDiv.append(slideWrap1);

    const slideUp1 = document.createElement('div');
    slideUp1.setAttribute('data-slide-type', 'slide-up');
    slideUp1.className = 'slide-up';
    slideWrap1.append(slideUp1);

    if (title) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'hero-full-width__content__title';
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.append(...title.childNodes);
      slideUp1.append(titleDiv);
      moveInstrumentation(title, titleDiv);
    }

    if (description) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'hero-full-width__content__description';
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.append(...description.childNodes);
      slideUp1.append(descriptionDiv);
      moveInstrumentation(description, descriptionDiv);
    }
  }

  if (primaryCtaLabel || secondaryCtaLabel) {
    const slideWrap2 = document.createElement('div');
    slideWrap2.className = 'slide-wrap';
    contentDiv.append(slideWrap2);

    const slideUp2 = document.createElement('div');
    slideUp2.setAttribute('data-slide-type', 'slide-up');
    slideUp2.className = 'slide-up';
    slideWrap2.append(slideUp2);

    const ctasDiv = document.createElement('div');
    ctasDiv.className = 'hero-full-width__content--ctas';
    slideUp2.append(ctasDiv);

    if (primaryCtaLabel && primaryCtaUrl) {
      const primaryLink = document.createElement('a');
      primaryLink.setAttribute('href', primaryCtaUrl.textContent.trim());
      primaryLink.className = 'cta cta__secondary primaryCta ';
      primaryLink.setAttribute('target', '_self');
      primaryLink.setAttribute('aria-label', primaryCtaLabel.textContent.trim());
      primaryLink.setAttribute('data-palette', 'palette-light');

      const primarySpan = document.createElement('span');
      primarySpan.className = 'cta__label';
      primarySpan.textContent = primaryCtaLabel.textContent.trim();
      primaryLink.append(primarySpan);
      ctasDiv.append(primaryLink);
      moveInstrumentation(primaryCtaLabel, primarySpan);
      moveInstrumentation(primaryCtaUrl, primaryLink);
    }

    if (secondaryCtaLabel && secondaryCtaUrl) {
      const chevronWrapper = document.createElement('div');
      chevronWrapper.className = 'chevron-wrapper';
      ctasDiv.append(chevronWrapper);

      const chevronButton = document.createElement('button');
      chevronButton.setAttribute('type', 'button');
      chevronButton.className = 'chevron-icon';
      chevronButton.setAttribute('aria-label', 'Open video modal');
      chevronWrapper.append(chevronButton);

      const secondaryLink = document.createElement('a');
      secondaryLink.setAttribute('href', secondaryCtaUrl.textContent.trim());
      secondaryLink.className = 'cta cta__link secondaryCta ';
      secondaryLink.setAttribute('target', '_self');
      secondaryLink.setAttribute('aria-label', secondaryCtaLabel.textContent.trim());
      secondaryLink.setAttribute('data-palette', 'palette-light');

      const iconSpan = document.createElement('span');
      iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
      iconSpan.setAttribute('aria-hidden', 'true');
      secondaryLink.append(iconSpan);

      const secondarySpan = document.createElement('span');
      secondarySpan.className = 'cta__label';
      secondarySpan.textContent = secondaryCtaLabel.textContent.trim();
      secondaryLink.append(secondarySpan);
      chevronWrapper.append(secondaryLink);
      moveInstrumentation(secondaryCtaLabel, secondarySpan);
      moveInstrumentation(secondaryCtaUrl, secondaryLink);
    }
  }

  // Dialog (Modal) Structure
  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width__content--modal';
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  contentDiv.append(dialog);

  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');
  dialog.append(form);

  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  form.append(closeButton);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.className = 'video hero-full-width__content--modal__video';
  dialog.append(videoModalDiv);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container show-controls ';
  videoModalDiv.append(videoContainer);

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'video-container__controls';
  videoContainer.append(controlsDiv);

  const timerDiv = document.createElement('div');
  timerDiv.className = 'video-container__controls__timer';
  controlsDiv.append(timerDiv);

  const progressArea = document.createElement('div');
  progressArea.className = 'video-container__controls__timer__progress-area';
  timerDiv.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.className = 'video-container__controls__timer__progress-area__progress-bar';
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.className = 'video-container__controls__timer__progress-area__pointer';
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.className = 'video-container__controls__timer__progress-area__progress-pending';
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.className = 'video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  timerDiv.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timerDiv.append(duration);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'video-container__controls__buttons';
  controlsDiv.append(buttonsDiv);

  const playButton = document.createElement('button');
  playButton.className = 'video-container__controls__buttons__play-button video-container__controls__buttons--button';
  const playIcon = document.createElement('span');
  playIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButton.append(playIcon);
  buttonsDiv.append(playButton);

  const muteButton = document.createElement('button');
  muteButton.className = 'video-container__controls__buttons__mute-button video-container__controls__buttons--button';
  const muteIcon = document.createElement('span');
  muteIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);
  buttonsDiv.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button';
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);
  buttonsDiv.append(fullscreenButton);

  // Modal Video element
  if (backgroundVideo) {
    const modalVideo = document.createElement('video');
    modalVideo.className = 'video-container__video';
    modalVideo.setAttribute('playsinline', '');
    modalVideo.setAttribute('webkit-playsinline', '');
    modalVideo.setAttribute('muted', 'true');
    modalVideo.setAttribute('autoplay', '');

    const modalSource = document.createElement('source');
    modalSource.setAttribute('src', backgroundVideo.textContent.trim());
    modalSource.setAttribute('type', 'video/mp4');
    modalVideo.append(modalSource);
    videoContainer.append(modalVideo);
  }

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
