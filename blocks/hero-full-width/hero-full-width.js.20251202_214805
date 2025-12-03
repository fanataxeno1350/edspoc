//Working Check
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('parallax-child-2', 'hero-in-view');
  block.setAttribute('data-media-type', 'videoTypeSelected');

  const heroCover = document.createElement('div');
  heroCover.classList.add('hero-full-width__cover');
  block.append(heroCover);

  const background = document.createElement('div');
  background.classList.add('hero-full-width__background');
  block.append(background);

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.classList.add('hero-full-width__background-wrapper', 'zoom-out');
  background.append(backgroundWrapper);

  const backgroundVideo = document.createElement('video');
  backgroundVideo.classList.add('hero-full-width__background-video');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('autoplay', '');
  backgroundVideo.setAttribute('aria-hidden', 'true');
  backgroundWrapper.append(backgroundVideo);

  let backgroundVideoSource = block.querySelector('[data-aue-prop="backgroundVideo"]');
  if (!backgroundVideoSource) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      backgroundVideoSource = anchor;
    }
  }

  if (backgroundVideoSource) {
    const source = document.createElement('source');
    source.setAttribute('src', backgroundVideoSource.href || backgroundVideoSource.textContent.trim());
    source.setAttribute('type', 'video/mp4');
    backgroundVideo.append(source);
    moveInstrumentation(backgroundVideoSource, source);
  }

  const backgroundPoster = document.createElement('img');
  backgroundPoster.classList.add('hero-full-width__background-poster');
  backgroundPoster.setAttribute('alt', 'Background poster image');
  backgroundPoster.setAttribute('loading', 'lazy');
  backgroundPoster.setAttribute('style', 'display:none;');
  backgroundPoster.setAttribute('aria-hidden', 'true');
  backgroundWrapper.append(backgroundPoster);

  const content = document.createElement('div');
  content.classList.add('hero-full-width__content');
  block.append(content);

  const slideWrap1 = document.createElement('div');
  slideWrap1.classList.add('slide-wrap');
  content.append(slideWrap1);

  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.classList.add('slide-up');
  slideWrap1.append(slideUp1);

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('hero-full-width__content__title');
  titleContainer.setAttribute('tabindex', '0');
  slideUp1.append(titleContainer);

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    titleContainer.append(...title.childNodes);
    moveInstrumentation(title, titleContainer);
  }

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('hero-full-width__content__description');
  descriptionContainer.setAttribute('tabindex', '0');
  slideUp1.append(descriptionContainer);

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    descriptionContainer.append(...description.childNodes);
    moveInstrumentation(description, descriptionContainer);
  }

  const slideWrap2 = document.createElement('div');
  slideWrap2.classList.add('slide-wrap');
  content.append(slideWrap2);

  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.classList.add('slide-up');
  slideWrap2.append(slideUp2);

  const ctasContainer = document.createElement('div');
  ctasContainer.classList.add('hero-full-width__content--ctas');
  slideUp2.append(ctasContainer);

  const primaryCta = block.querySelector('[data-aue-prop="primaryCta"]');
  if (primaryCta) {
    const primaryAnchor = primaryCta.querySelector('a');
    if (primaryAnchor) {
      primaryAnchor.classList.add('cta', 'cta__secondary', 'primaryCta');
      primaryAnchor.setAttribute('target', '_self');
      primaryAnchor.setAttribute('data-palette', 'palette-light');
      const span = document.createElement('span');
      span.classList.add('cta__label');
      span.append(...primaryAnchor.childNodes);
      primaryAnchor.append(span);
      ctasContainer.append(primaryAnchor);
      moveInstrumentation(primaryCta, primaryAnchor);
    }
  }

  const chevronWrapper = document.createElement('div');
  chevronWrapper.classList.add('chevron-wrapper');
  ctasContainer.append(chevronWrapper);

  const chevronButton = document.createElement('button');
  chevronButton.setAttribute('type', 'button');
  chevronButton.classList.add('chevron-icon');
  chevronButton.setAttribute('aria-label', 'Open video modal');
  chevronWrapper.append(chevronButton);

  const secondaryCta = block.querySelector('[data-aue-prop="secondaryCta"]');
  if (secondaryCta) {
    const secondaryAnchor = secondaryCta.querySelector('a');
    if (secondaryAnchor) {
      secondaryAnchor.classList.add('cta', 'cta__link', 'secondaryCta');
      secondaryAnchor.setAttribute('target', '_self');
      secondaryAnchor.setAttribute('data-palette', 'palette-light');

      const iconSpan = document.createElement('span');
      iconSpan.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      iconSpan.setAttribute('aria-hidden', 'true');
      secondaryAnchor.prepend(iconSpan);

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('cta__label');
      labelSpan.append(...secondaryAnchor.childNodes);
      secondaryAnchor.append(labelSpan);
      chevronWrapper.append(secondaryAnchor);
      moveInstrumentation(secondaryCta, secondaryAnchor);
    }
  }

  const dialog = document.createElement('dialog');
  dialog.classList.add('hero-full-width__content--modal');
  dialog.setAttribute('id', 'home-page-video-dialog');
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  content.append(dialog);

  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');
  dialog.append(form);

  const closeButton = document.createElement('button');
  closeButton.classList.add('hero-full-width__content--modal__close-button');
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  form.append(closeButton);

  const modalVideoContainer = document.createElement('div');
  modalVideoContainer.classList.add('video', 'hero-full-width__content--modal__video');
  dialog.append(modalVideoContainer);

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls');
  modalVideoContainer.append(videoContainer);

  const controls = document.createElement('div');
  controls.classList.add('video-container__controls');
  videoContainer.append(controls);

  const timer = document.createElement('div');
  timer.classList.add('video-container__controls__timer');
  controls.append(timer);

  const progressBarArea = document.createElement('div');
  progressBarArea.classList.add('video-container__controls__timer__progress-area');
  timer.append(progressBarArea);

  const progressBar = document.createElement('span');
  progressBar.classList.add('video-container__controls__timer__progress-area__progress-bar');
  progressBarArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.classList.add('video-container__controls__timer__progress-area__pointer');
  progressBarArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.classList.add('video-container__controls__timer__progress-area__progress-pending');
  progressBarArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.classList.add('video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.classList.add('video-container__controls__timer__duration');
  duration.textContent = '00:00';
  timer.append(duration);

  const controlButtons = document.createElement('div');
  controlButtons.classList.add('video-container__controls__buttons');
  controls.append(controlButtons);

  const playButton = document.createElement('button');
  playButton.classList.add('video-container__controls__buttons__play-button', 'video-container__controls__buttons--button');
  const playIcon = document.createElement('span');
  playIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--play');
  playButton.append(playIcon);
  controlButtons.append(playButton);

  const muteButton = document.createElement('button');
  muteButton.classList.add('video-container__controls__buttons__mute-button', 'video-container__controls__buttons--button');
  const muteIcon = document.createElement('span');
  muteIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--volume');
  muteButton.append(muteIcon);
  controlButtons.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('video-container__controls__buttons__fullscreen-button', 'video-container__controls__buttons--button');
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--fullscreen');
  fullscreenButton.append(fullscreenIcon);
  controlButtons.append(fullscreenButton);

  const modalVideoElement = document.createElement('video');
  modalVideoElement.classList.add('video-container__video');
  modalVideoElement.setAttribute('playsinline', '');
  modalVideoElement.setAttribute('webkit-playsinline', '');
  modalVideoElement.setAttribute('muted', 'true');
  modalVideoElement.setAttribute('autoplay', '');
  videoContainer.append(modalVideoElement);

  if (backgroundVideoSource) {
    const modalSource = document.createElement('source');
    modalSource.setAttribute('src', backgroundVideoSource.href || backgroundVideoSource.textContent.trim());
    modalSource.setAttribute('type', 'video/mp4');
    modalVideoElement.append(modalSource);
    // No need to move instrumentation again as it was moved to the backgroundVideo source
  }

  block.innerHTML = '';
  block.append(heroCover, background, content);
}
