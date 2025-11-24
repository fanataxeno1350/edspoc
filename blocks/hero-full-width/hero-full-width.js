import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoSrcEl = block.querySelector(':scope > div:first-child > div:first-child');
  const titleEl = block.querySelector(':scope > div:nth-child(2) > div:first-child');
  const descriptionEl = block.querySelector(':scope > div:nth-child(3) > div:first-child');
  const ctasEl = block.querySelector(':scope > div:nth-child(4) > div:first-child');

  const videoSrc = videoSrcEl ? videoSrcEl.textContent.trim() : '';
  const title = titleEl ? titleEl.innerHTML : '';
  const description = descriptionEl ? descriptionEl.innerHTML : '';

  const primaryCtaLabel = ctasEl ? ctasEl.querySelector('div:first-child')?.textContent.trim() : '';
  const primaryCtaHref = ctasEl ? ctasEl.querySelector('div:nth-child(2)')?.textContent.trim() : '';
  const secondaryCtaLabel = ctasEl ? ctasEl.querySelector('div:nth-child(3)')?.textContent.trim() : '';
  const secondaryCtaHref = ctasEl ? ctasEl.querySelector('div:nth-child(4)')?.textContent.trim() : '';

  block.textContent = '';
  block.classList.add('parallax-child-2', 'hero-in-view');
  block.dataset.mediaType = 'videoTypeSelected';
  block.setAttribute('aria-label', title);
  block.setAttribute('aria-hidden', 'true');

  const heroCover = document.createElement('div');
  heroCover.classList.add('hero-full-width__cover');
  moveInstrumentation(block.querySelector('.hero-full-width__cover'), heroCover);

  const heroBackground = document.createElement('div');
  heroBackground.classList.add('hero-full-width__background');
  moveInstrumentation(block.querySelector('.hero-full-width__background'), heroBackground);

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.classList.add('hero-full-width__background-wrapper', 'zoom-out');
  moveInstrumentation(block.querySelector('.hero-full-width__background-wrapper'), backgroundWrapper);

  const backgroundVideo = document.createElement('video');
  backgroundVideo.classList.add('hero-full-width__background-video');
  backgroundVideo.setAttribute('aria-label', title);
  backgroundVideo.setAttribute('aria-hidden', 'true');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('autoplay', '');
  moveInstrumentation(block.querySelector('.hero-full-width__background-video'), backgroundVideo);

  const videoSource = document.createElement('source');
  videoSource.setAttribute('src', videoSrc);
  videoSource.setAttribute('type', 'video/mp4');
  backgroundVideo.append(videoSource);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.setAttribute('alt', 'Background poster image');
  backgroundPoster.setAttribute('loading', 'lazy');
  backgroundPoster.classList.add('hero-full-width__background-poster');
  backgroundPoster.style.display = 'none';
  backgroundPoster.setAttribute('aria-hidden', 'true');
  moveInstrumentation(block.querySelector('.hero-full-width__background-poster'), backgroundPoster);

  backgroundWrapper.append(backgroundVideo, backgroundPoster);
  heroBackground.append(backgroundWrapper);

  const heroContent = document.createElement('div');
  heroContent.classList.add('hero-full-width__content');
  moveInstrumentation(block.querySelector('.hero-full-width__content'), heroContent);

  const slideWrap1 = document.createElement('div');
  slideWrap1.classList.add('slide-wrap');
  moveInstrumentation(block.querySelector('.hero-full-width__content > .slide-wrap:first-child'), slideWrap1);

  const slideUp1 = document.createElement('div');
  slideUp1.classList.add('slide-up');
  slideUp1.dataset.slideType = 'slide-up';
  moveInstrumentation(block.querySelector('.hero-full-width__content > .slide-wrap:first-child > .slide-up'), slideUp1);

  const contentTitle = document.createElement('div');
  contentTitle.classList.add('hero-full-width__content__title');
  contentTitle.setAttribute('tabindex', '0');
  contentTitle.innerHTML = title;
  moveInstrumentation(block.querySelector('.hero-full-width__content__title'), contentTitle);

  const contentDescription = document.createElement('div');
  contentDescription.classList.add('hero-full-width__content__description');
  contentDescription.setAttribute('tabindex', '0');
  contentDescription.innerHTML = description;
  moveInstrumentation(block.querySelector('.hero-full-width__content__description'), contentDescription);

  slideUp1.append(contentTitle, contentDescription);
  slideWrap1.append(slideUp1);

  const slideWrap2 = document.createElement('div');
  slideWrap2.classList.add('slide-wrap');
  moveInstrumentation(block.querySelector('.hero-full-width__content > .slide-wrap:nth-child(2)'), slideWrap2);

  const slideUp2 = document.createElement('div');
  slideUp2.classList.add('slide-up');
  slideUp2.dataset.slideType = 'slide-up';
  moveInstrumentation(block.querySelector('.hero-full-width__content > .slide-wrap:nth-child(2) > .slide-up'), slideUp2);

  const contentCtas = document.createElement('div');
  contentCtas.classList.add('hero-full-width__content--ctas');
  moveInstrumentation(block.querySelector('.hero-full-width__content--ctas'), contentCtas);

  if (primaryCtaHref && primaryCtaLabel) {
    const primaryCta = document.createElement('a');
    primaryCta.setAttribute('href', primaryCtaHref);
    primaryCta.classList.add('cta', 'cta__secondary', 'primaryCta');
    primaryCta.setAttribute('target', '_self');
    primaryCta.setAttribute('aria-label', primaryCtaLabel);
    primaryCta.dataset.palette = 'palette-light';
    const primaryCtaLabelSpan = document.createElement('span');
    primaryCtaLabelSpan.classList.add('cta__label');
    primaryCtaLabelSpan.textContent = primaryCtaLabel;
    primaryCta.append(primaryCtaLabelSpan);
    contentCtas.append(primaryCta);
  }

  if (secondaryCtaHref && secondaryCtaLabel) {
    const chevronWrapper = document.createElement('div');
    chevronWrapper.classList.add('chevron-wrapper');

    const chevronButton = document.createElement('button');
    chevronButton.setAttribute('type', 'button');
    chevronButton.classList.add('chevron-icon');
    chevronButton.setAttribute('aria-label', 'Open video modal');
    chevronWrapper.append(chevronButton);

    const secondaryCta = document.createElement('a');
    secondaryCta.setAttribute('href', secondaryCtaHref);
    secondaryCta.classList.add('cta', 'cta__link', 'secondaryCta');
    secondaryCta.setAttribute('target', '_self');
    secondaryCta.setAttribute('aria-label', secondaryCtaLabel);
    secondaryCta.dataset.palette = 'palette-light';

    const secondaryCtaIcon = document.createElement('span');
    secondaryCtaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    secondaryCtaIcon.setAttribute('aria-hidden', 'true');
    const secondaryCtaLabelSpan = document.createElement('span');
    secondaryCtaLabelSpan.classList.add('cta__label');
    secondaryCtaLabelSpan.textContent = secondaryCtaLabel;
    secondaryCta.append(secondaryCtaIcon, secondaryCtaLabelSpan);
    chevronWrapper.append(secondaryCta);
    contentCtas.append(chevronWrapper);
  }

  slideUp2.append(contentCtas);
  slideWrap2.append(slideUp2);

  const dialog = document.createElement('dialog');
  dialog.classList.add('hero-full-width__content--modal');
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  moveInstrumentation(block.querySelector('.hero-full-width__content--modal'), dialog);

  const dialogForm = document.createElement('form');
  dialogForm.setAttribute('method', 'dialog');

  const closeButton = document.createElement('button');
  closeButton.classList.add('hero-full-width__content--modal__close-button');
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  dialogForm.append(closeButton);

  const dialogVideoContainer = document.createElement('div');
  dialogVideoContainer.classList.add('video', 'hero-full-width__content--modal__video');

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls');

  const videoControls = document.createElement('div');
  videoControls.classList.add('video-container__controls');

  const timer = document.createElement('div');
  timer.classList.add('video-container__controls__timer');

  const progressArea = document.createElement('div');
  progressArea.classList.add('video-container__controls__timer__progress-area');
  progressArea.innerHTML = `
    <span class="video-container__controls__timer__progress-area__progress-bar"></span>
    <span class="video-container__controls__timer__progress-area__pointer"></span>
    <span class="video-container__controls__timer__progress-area__progress-pending"></span>
  `;

  const currentTime = document.createElement('p');
  currentTime.classList.add('video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';

  const duration = document.createElement('p');
  duration.classList.add('video-container__controls__timer__duration');
  duration.textContent = '00:00';

  timer.append(progressArea, currentTime, duration);

  const controlButtons = document.createElement('div');
  controlButtons.classList.add('video-container__controls__buttons');
  controlButtons.innerHTML = `
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

  videoControls.append(timer, controlButtons);

  const modalVideo = document.createElement('video');
  modalVideo.classList.add('video-container__video');
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('muted', 'true');
  modalVideo.setAttribute('autoplay', '');
  const modalVideoSource = document.createElement('source');
  modalVideoSource.setAttribute('src', videoSrc);
  modalVideoSource.setAttribute('type', 'video/mp4');
  modalVideo.append(modalVideoSource);

  videoContainer.append(videoControls, modalVideo);
  dialogVideoContainer.append(videoContainer);
  dialog.append(dialogForm, dialogVideoContainer);

  heroContent.append(slideWrap1, slideWrap2, dialog);

  block.append(heroCover, heroBackground, heroContent);

  // Clean up the original content divs
  videoSrcEl?.remove();
  titleEl?.remove();
  descriptionEl?.remove();
  ctasEl?.remove();
}
