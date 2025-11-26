import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const backgroundVideo = block.querySelector('[data-aue-prop="backgroundVideo"]');
  const backgroundPosterImage = block.querySelector('[data-aue-prop="backgroundPosterImage"] img');
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const primaryCtaLabel = block.querySelector('[data-aue-prop="primaryCtaLabel"]');
  const primaryCtaUrl = block.querySelector('[data-aue-prop="primaryCtaUrl"]');
  const secondaryCtaLabel = block.querySelector('[data-aue-prop="secondaryCtaLabel"]');
  const secondaryCtaUrl = block.querySelector('[data-aue-prop="secondaryCtaUrl"]');

  const rootDiv = document.createElement('div');
  rootDiv.className = 'hero-full-width parallax-child-2 hero-in-view';
  rootDiv.setAttribute('data-media-type', 'videoTypeSelected');
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

  const videoElement = document.createElement('video');
  videoElement.className = 'hero-full-width__background-video';
  videoElement.setAttribute('aria-hidden', 'true');
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('muted', '');
  videoElement.setAttribute('loop', '');
  videoElement.setAttribute('autoplay', '');
  backgroundWrapperDiv.append(videoElement);

  if (backgroundVideo) {
    const sourceElement = document.createElement('source');
    sourceElement.src = backgroundVideo.textContent.trim();
    sourceElement.type = 'video/mp4';
    videoElement.append(sourceElement);
    moveInstrumentation(backgroundVideo, sourceElement);
  }

  const posterImg = document.createElement('img');
  posterImg.alt = 'Background poster image';
  posterImg.loading = 'lazy';
  posterImg.className = 'hero-full-width__background-poster';
  posterImg.style.display = 'none';
  posterImg.setAttribute('aria-hidden', 'true');
  backgroundWrapperDiv.append(posterImg);
  if (backgroundPosterImage) {
    const pic = createOptimizedPicture(backgroundPosterImage.src, backgroundPosterImage.alt);
    posterImg.replaceWith(pic);
    pic.querySelector('img').className = 'hero-full-width__background-poster';
    pic.querySelector('img').style.display = 'none';
    pic.querySelector('img').setAttribute('aria-hidden', 'true');
    moveInstrumentation(backgroundPosterImage, pic.querySelector('img'));
  }

  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-full-width__content';
  rootDiv.append(contentDiv);

  // Title and Description
  const slideWrap1 = document.createElement('div');
  slideWrap1.className = 'slide-wrap';
  contentDiv.append(slideWrap1);

  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.className = 'slide-up';
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement('div');
  titleDiv.className = 'hero-full-width__content__title';
  titleDiv.tabIndex = 0;
  if (title) {
    titleDiv.append(...title.childNodes);
    moveInstrumentation(title, titleDiv);
  }
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'hero-full-width__content__description';
  descriptionDiv.tabIndex = 0;
  if (description) {
    descriptionDiv.append(...description.childNodes);
    moveInstrumentation(description, descriptionDiv);
  }
  slideUp1.append(descriptionDiv);

  // CTAs
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

  const primaryCtaLink = document.createElement('a');
  primaryCtaLink.className = 'cta cta__secondary primaryCta ';
  primaryCtaLink.target = '_self';
  primaryCtaLink.setAttribute('data-palette', 'palette-light');
  if (primaryCtaUrl) {
    primaryCtaLink.href = primaryCtaUrl.textContent.trim();
    moveInstrumentation(primaryCtaUrl, primaryCtaLink);
  }
  if (primaryCtaLabel) {
    primaryCtaLink.setAttribute('aria-label', primaryCtaLabel.textContent.trim());
    const span = document.createElement('span');
    span.className = 'cta__label';
    span.append(...primaryCtaLabel.childNodes);
    primaryCtaLink.append(span);
    moveInstrumentation(primaryCtaLabel, span);
  }
  ctasDiv.append(primaryCtaLink);

  const chevronWrapper = document.createElement('div');
  chevronWrapper.className = 'chevron-wrapper';
  ctasDiv.append(chevronWrapper);

  const chevronButton = document.createElement('button');
  chevronButton.type = 'button';
  chevronButton.className = 'chevron-icon';
  chevronButton.setAttribute('aria-label', 'Open video modal');
  chevronWrapper.append(chevronButton);

  const secondaryCtaLink = document.createElement('a');
  secondaryCtaLink.className = 'cta cta__link secondaryCta ';
  secondaryCtaLink.target = '_self';
  secondaryCtaLink.setAttribute('data-palette', 'palette-light');
  if (secondaryCtaUrl) {
    secondaryCtaLink.href = secondaryCtaUrl.textContent.trim();
    moveInstrumentation(secondaryCtaUrl, secondaryCtaLink);
  }
  const secondaryCtaIcon = document.createElement('span');
  secondaryCtaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
  secondaryCtaIcon.setAttribute('aria-hidden', 'true');
  secondaryCtaLink.append(secondaryCtaIcon);
  if (secondaryCtaLabel) {
    secondaryCtaLink.setAttribute('aria-label', secondaryCtaLabel.textContent.trim());
    const span = document.createElement('span');
    span.className = 'cta__label';
    span.append(...secondaryCtaLabel.childNodes);
    secondaryCtaLink.append(span);
    moveInstrumentation(secondaryCtaLabel, span);
  }
  chevronWrapper.append(secondaryCtaLink);

  // Dialog (Video Modal)
  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width__content--modal';
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  contentDiv.append(dialog);

  const form = document.createElement('form');
  form.method = 'dialog';
  dialog.append(form);

  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.tabIndex = 0;
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
  buttonsDiv.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButton.append(playIcon);

  const muteButton = document.createElement('button');
  muteButton.className = 'video-container__controls__buttons__mute-button video-container__controls__buttons--button';
  buttonsDiv.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button';
  buttonsDiv.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);

  const modalVideoElement = document.createElement('video');
  modalVideoElement.className = 'video-container__video';
  modalVideoElement.setAttribute('playsinline', '');
  modalVideoElement.setAttribute('webkit-playsinline', '');
  modalVideoElement.setAttribute('muted', 'true');
  modalVideoElement.setAttribute('autoplay', '');
  videoContainer.append(modalVideoElement);

  if (backgroundVideo) {
    const modalSourceElement = document.createElement('source');
    modalSourceElement.src = backgroundVideo.textContent.trim();
    modalSourceElement.type = 'video/mp4';
    modalVideoElement.append(modalSourceElement);
    // No need to move instrumentation again for the same source
  }

  // Update aria-label for rootDiv and videoElement if title exists
  if (title) {
    const titleContent = title.innerHTML.trim();
    rootDiv.setAttribute('aria-label', titleContent);
    videoElement.setAttribute('aria-label', titleContent);
  }

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
