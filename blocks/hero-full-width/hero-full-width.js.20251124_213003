import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const backgroundVideo = block.querySelector('div:nth-child(1) > div');
  const title = block.querySelector('div:nth-child(2) > div');
  const description = block.querySelector('div:nth-child(3) > div');
  const ctas = block.querySelector('div:nth-child(4) > div');

  const primaryCtaLabel = ctas.querySelector('div:nth-child(1)');
  const primaryCtaUrl = ctas.querySelector('div:nth-child(2)');
  const secondaryCtaLabel = ctas.querySelector('div:nth-child(3)');
  const secondaryCtaUrl = ctas.querySelector('div:nth-child(4)');

  const videoSrc = backgroundVideo?.textContent?.trim();
  const primaryCtaHref = primaryCtaUrl?.textContent?.trim();
  const secondaryCtaHref = secondaryCtaUrl?.textContent?.trim();

  block.textContent = '';
  block.classList.add('parallax-child-2');
  block.setAttribute('data-media-type', 'videoTypeSelected');

  const heroCover = document.createElement('div');
  heroCover.classList.add('hero-full-width__cover');

  const heroBackground = document.createElement('div');
  heroBackground.classList.add('hero-full-width__background');

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.classList.add('hero-full-width__background-wrapper', 'zoom-out');

  if (videoSrc) {
    const videoElement = document.createElement('video');
    videoElement.classList.add('hero-full-width__background-video');
    videoElement.setAttribute('aria-hidden', 'true');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('muted', '');
    videoElement.setAttribute('loop', '');
    videoElement.setAttribute('autoplay', '');

    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', videoSrc);
    sourceElement.setAttribute('type', 'video/mp4');
    videoElement.append(sourceElement);
    backgroundWrapper.append(videoElement);
  }

  const backgroundPoster = createOptimizedPicture('', 'Background poster image');
  const posterImg = backgroundPoster.querySelector('img');
  posterImg.classList.add('hero-full-width__background-poster');
  posterImg.setAttribute('loading', 'lazy');
  posterImg.style.display = 'none';
  posterImg.setAttribute('aria-hidden', 'true');
  backgroundWrapper.append(backgroundPoster);

  heroBackground.append(backgroundWrapper);

  const heroContent = document.createElement('div');
  heroContent.classList.add('hero-full-width__content');

  if (title) {
    const titleSlideWrap = document.createElement('div');
    titleSlideWrap.classList.add('slide-wrap');
    const titleSlideUp = document.createElement('div');
    titleSlideUp.setAttribute('data-slide-type', 'slide-up');
    titleSlideUp.classList.add('slide-up');
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('hero-full-width__content__title');
    titleDiv.setAttribute('tabindex', '0');
    moveInstrumentation(title, titleDiv);
    titleDiv.innerHTML = title.innerHTML;
    titleSlideUp.append(titleDiv);
    titleSlideWrap.append(titleSlideUp);
    heroContent.append(titleSlideWrap);
  }

  if (description) {
    const descriptionSlideWrap = document.createElement('div');
    descriptionSlideWrap.classList.add('slide-wrap');
    const descriptionSlideUp = document.createElement('div');
    descriptionSlideUp.setAttribute('data-slide-type', 'slide-up');
    descriptionSlideUp.classList.add('slide-up');
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('hero-full-width__content__description');
    descriptionDiv.setAttribute('tabindex', '0');
    moveInstrumentation(description, descriptionDiv);
    descriptionDiv.innerHTML = description.innerHTML;
    descriptionSlideUp.append(descriptionDiv);
    descriptionSlideWrap.append(descriptionSlideUp);
    heroContent.append(descriptionSlideWrap);
  }

  const ctaSlideWrap = document.createElement('div');
  ctaSlideWrap.classList.add('slide-wrap');
  const ctaSlideUp = document.createElement('div');
  ctaSlideUp.setAttribute('data-slide-type', 'slide-up');
  ctaSlideUp.classList.add('slide-up');
  const ctasDiv = document.createElement('div');
  ctasDiv.classList.add('hero-full-width__content--ctas');

  if (primaryCtaLabel && primaryCtaHref) {
    const primaryCtaLink = document.createElement('a');
    primaryCtaLink.classList.add('cta', 'cta__secondary', 'primaryCta');
    primaryCtaLink.setAttribute('href', primaryCtaHref);
    primaryCtaLink.setAttribute('target', '_self');
    primaryCtaLink.setAttribute('aria-label', primaryCtaLabel.textContent.trim());
    primaryCtaLink.setAttribute('data-palette', 'palette-light');
    const primaryCtaSpan = document.createElement('span');
    primaryCtaSpan.classList.add('cta__label');
    primaryCtaSpan.textContent = primaryCtaLabel.textContent.trim();
    primaryCtaLink.append(primaryCtaSpan);
    ctasDiv.append(primaryCtaLink);
  }

  const chevronWrapper = document.createElement('div');
  chevronWrapper.classList.add('chevron-wrapper');

  const chevronButton = document.createElement('button');
  chevronButton.setAttribute('type', 'button');
  chevronButton.classList.add('chevron-icon');
  chevronButton.setAttribute('aria-label', 'Open video modal');
  chevronWrapper.append(chevronButton);

  if (secondaryCtaLabel && secondaryCtaHref) {
    const secondaryCtaLink = document.createElement('a');
    secondaryCtaLink.classList.add('cta', 'cta__link', 'secondaryCta');
    secondaryCtaLink.setAttribute('href', secondaryCtaHref);
    secondaryCtaLink.setAttribute('target', '_self');
    secondaryCtaLink.setAttribute('aria-label', secondaryCtaLabel.textContent.trim());
    secondaryCtaLink.setAttribute('data-palette', 'palette-light');

    const secondaryCtaIcon = document.createElement('span');
    secondaryCtaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    secondaryCtaIcon.setAttribute('aria-hidden', 'true');
    secondaryCtaLink.append(secondaryCtaIcon);

    const secondaryCtaSpan = document.createElement('span');
    secondaryCtaSpan.classList.add('cta__label');
    secondaryCtaSpan.textContent = secondaryCtaLabel.textContent.trim();
    secondaryCtaLink.append(secondaryCtaSpan);
    chevronWrapper.append(secondaryCtaLink);
  }
  ctasDiv.append(chevronWrapper);

  ctaSlideUp.append(ctasDiv);
  ctaSlideWrap.append(ctaSlideUp);
  heroContent.append(ctaSlideWrap);

  const dialog = document.createElement('dialog');
  dialog.classList.add('hero-full-width__content--modal');
  dialog.setAttribute('id', 'home-page-video-dialog');
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');

  const dialogForm = document.createElement('form');
  dialogForm.setAttribute('method', 'dialog');

  const closeButton = document.createElement('button');
  closeButton.classList.add('hero-full-width__content--modal__close-button');
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  dialogForm.append(closeButton);
  dialog.append(dialogForm);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.classList.add('video', 'hero-full-width__content--modal__video');

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls');

  const videoControls = document.createElement('div');
  videoControls.classList.add('video-container__controls');

  const timerDiv = document.createElement('div');
  timerDiv.classList.add('video-container__controls__timer');

  const progressArea = document.createElement('div');
  progressArea.classList.add('video-container__controls__timer__progress-area');
  progressArea.innerHTML = `
    <span class="video-container__controls__timer__progress-area__progress-bar"></span>
    <span class="video-container__controls__timer__progress-area__pointer"></span>
    <span class="video-container__controls__timer__progress-area__progress-pending"></span>
  `;
  timerDiv.append(progressArea);

  const currentTime = document.createElement('p');
  currentTime.classList.add('video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  timerDiv.append(currentTime);

  const duration = document.createElement('p');
  duration.classList.add('video-container__controls__timer__duration');
  duration.textContent = '00:00';
  timerDiv.append(duration);
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

  if (videoSrc) {
    const modalVideoElement = document.createElement('video');
    modalVideoElement.classList.add('video-container__video');
    modalVideoElement.setAttribute('playsinline', '');
    modalVideoElement.setAttribute('webkit-playsinline', '');
    modalVideoElement.setAttribute('muted', 'true');
    modalVideoElement.setAttribute('autoplay', '');

    const modalSourceElement = document.createElement('source');
    modalSourceElement.setAttribute('src', videoSrc);
    modalSourceElement.setAttribute('type', 'video/mp4');
    modalVideoElement.append(modalSourceElement);
    modalVideoElement.append('webkit-playsinline');
    modalVideoElement.append('x-webkit-airplay="allow"');
    videoContainer.append(modalVideoElement);
  }

  videoModalDiv.append(videoContainer);
  dialog.append(videoModalDiv);
  heroContent.append(dialog);

  block.append(heroCover, heroBackground, heroContent);
}
