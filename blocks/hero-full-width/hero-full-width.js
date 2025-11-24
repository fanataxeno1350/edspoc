import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const backgroundVideoElement = block.querySelector(':scope > div:first-child > div:first-child');
  const titleElement = block.querySelector(':scope > div:nth-child(2) > div:first-child');
  const descriptionElement = block.querySelector(':scope > div:nth-child(3) > div:first-child');
  const primaryCtaLabelElement = block.querySelector(':scope > div:nth-child(4) > div:first-child');
  const primaryCtaHrefElement = block.querySelector(':scope > div:nth-child(5) > div:first-child');
  const secondaryCtaLabelElement = block.querySelector(':scope > div:nth-child(6) > div:first-child');
  const secondaryCtaHrefElement = block.querySelector(':scope > div:nth-child(7) > div:first-child');

  const backgroundVideo = backgroundVideoElement?.textContent?.trim();
  const title = titleElement?.innerHTML?.trim();
  const description = descriptionElement?.innerHTML?.trim();
  const primaryCtaLabel = primaryCtaLabelElement?.textContent?.trim();
  const primaryCtaHref = primaryCtaHrefElement?.textContent?.trim();
  const secondaryCtaLabel = secondaryCtaLabelElement?.textContent?.trim();
  const secondaryCtaHref = secondaryCtaHrefElement?.textContent?.trim();

  block.textContent = '';
  block.classList.add('parallax-child-2', 'hero-in-view');
  block.setAttribute('data-media-type', 'videoTypeSelected');
  block.setAttribute('aria-label', title || '');
  block.setAttribute('aria-hidden', 'true');

  const heroCover = document.createElement('div');
  heroCover.classList.add('hero-full-width__cover');
  block.append(heroCover);

  const heroBackground = document.createElement('div');
  heroBackground.classList.add('hero-full-width__background');

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.classList.add('hero-full-width__background-wrapper', 'zoom-out');

  const backgroundVideoEl = document.createElement('video');
  backgroundVideoEl.classList.add('hero-full-width__background-video');
  backgroundVideoEl.setAttribute('aria-label', title || '');
  backgroundVideoEl.setAttribute('aria-hidden', 'true');
  backgroundVideoEl.setAttribute('playsinline', '');
  backgroundVideoEl.setAttribute('muted', '');
  backgroundVideoEl.setAttribute('loop', '');
  backgroundVideoEl.setAttribute('autoplay', '');

  const videoSource = document.createElement('source');
  videoSource.setAttribute('src', backgroundVideo || '');
  videoSource.setAttribute('type', 'video/mp4');
  backgroundVideoEl.append(videoSource);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.setAttribute('alt', 'Background poster image');
  backgroundPoster.setAttribute('loading', 'lazy');
  backgroundPoster.classList.add('hero-full-width__background-poster');
  backgroundPoster.style.display = 'none';
  backgroundPoster.setAttribute('aria-hidden', 'true');

  backgroundWrapper.append(backgroundVideoEl, backgroundPoster);
  heroBackground.append(backgroundWrapper);
  block.append(heroBackground);

  const heroContent = document.createElement('div');
  heroContent.classList.add('hero-full-width__content');

  const slideWrap1 = document.createElement('div');
  slideWrap1.classList.add('slide-wrap');
  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.classList.add('slide-up');

  const contentTitle = document.createElement('div');
  contentTitle.classList.add('hero-full-width__content__title');
  contentTitle.setAttribute('tabindex', '0');
  if (title) {
    contentTitle.innerHTML = title;
  }
  moveInstrumentation(titleElement, contentTitle);

  const contentDescription = document.createElement('div');
  contentDescription.classList.add('hero-full-width__content__description');
  contentDescription.setAttribute('tabindex', '0');
  if (description) {
    contentDescription.innerHTML = description;
  }
  moveInstrumentation(descriptionElement, contentDescription);

  slideUp1.append(contentTitle, contentDescription);
  slideWrap1.append(slideUp1);
  heroContent.append(slideWrap1);

  const slideWrap2 = document.createElement('div');
  slideWrap2.classList.add('slide-wrap');
  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.classList.add('slide-up');

  const contentCtas = document.createElement('div');
  contentCtas.classList.add('hero-full-width__content--ctas');

  if (primaryCtaLabel && primaryCtaHref) {
    const primaryCta = document.createElement('a');
    primaryCta.setAttribute('href', primaryCtaHref);
    primaryCta.classList.add('cta', 'cta__secondary', 'primaryCta');
    primaryCta.setAttribute('target', '_self');
    primaryCta.setAttribute('aria-label', primaryCtaLabel);
    primaryCta.setAttribute('data-palette', 'palette-light');
    const primaryCtaLabelSpan = document.createElement('span');
    primaryCtaLabelSpan.classList.add('cta__label');
    primaryCtaLabelSpan.textContent = primaryCtaLabel;
    primaryCta.append(primaryCtaLabelSpan);
    contentCtas.append(primaryCta);
    moveInstrumentation(primaryCtaLabelElement, primaryCtaLabelSpan);
    moveInstrumentation(primaryCtaHrefElement, primaryCta);
  }

  const chevronWrapper = document.createElement('div');
  chevronWrapper.classList.add('chevron-wrapper');

  const chevronButton = document.createElement('button');
  chevronButton.setAttribute('type', 'button');
  chevronButton.classList.add('chevron-icon');
  chevronButton.setAttribute('aria-label', 'Open video modal');

  if (secondaryCtaLabel && secondaryCtaHref) {
    const secondaryCta = document.createElement('a');
    secondaryCta.setAttribute('href', secondaryCtaHref);
    secondaryCta.classList.add('cta', 'cta__link', 'secondaryCta');
    secondaryCta.setAttribute('target', '_self');
    secondaryCta.setAttribute('aria-label', secondaryCtaLabel);
    secondaryCta.setAttribute('data-palette', 'palette-light');
    const secondaryCtaIcon = document.createElement('span');
    secondaryCtaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    secondaryCtaIcon.setAttribute('aria-hidden', 'true');
    const secondaryCtaLabelSpan = document.createElement('span');
    secondaryCtaLabelSpan.classList.add('cta__label');
    secondaryCtaLabelSpan.textContent = secondaryCtaLabel;
    secondaryCta.append(secondaryCtaIcon, secondaryCtaLabelSpan);
    chevronWrapper.append(chevronButton, secondaryCta);
    contentCtas.append(chevronWrapper);
    moveInstrumentation(secondaryCtaLabelElement, secondaryCtaLabelSpan);
    moveInstrumentation(secondaryCtaHrefElement, secondaryCta);
  }

  slideUp2.append(contentCtas);
  slideWrap2.append(slideUp2);
  heroContent.append(slideWrap2);

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

  const videoDiv = document.createElement('div');
  videoDiv.classList.add('video', 'hero-full-width__content--modal__video');

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls');

  const videoControls = document.createElement('div');
  videoControls.classList.add('video-container__controls');

  const timerDiv = document.createElement('div');
  timerDiv.classList.add('video-container__controls__timer');

  const progressArea = document.createElement('div');
  progressArea.classList.add('video-container__controls__timer__progress-area');
  const progressBar = document.createElement('span');
  progressBar.classList.add('video-container__controls__timer__progress-area__progress-bar');
  const pointer = document.createElement('span');
  pointer.classList.add('video-container__controls__timer__progress-area__pointer');
  const progressPending = document.createElement('span');
  progressPending.classList.add('video-container__controls__timer__progress-area__progress-pending');
  progressArea.append(progressBar, pointer, progressPending);

  const currentTime = document.createElement('p');
  currentTime.classList.add('video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  const duration = document.createElement('p');
  duration.classList.add('video-container__controls__timer__duration');
  duration.textContent = '00:00';

  timerDiv.append(progressArea, currentTime, duration);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('video-container__controls__buttons');

  const playButton = document.createElement('button');
  playButton.classList.add('video-container__controls__buttons__play-button', 'video-container__controls__buttons--button');
  const playIcon = document.createElement('span');
  playIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--play');
  playButton.append(playIcon);

  const muteButton = document.createElement('button');
  muteButton.classList.add('video-container__controls__buttons__mute-button', 'video-container__controls__buttons--button');
  const muteIcon = document.createElement('span');
  muteIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--volume');
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('video-container__controls__buttons__fullscreen-button', 'video-container__controls__buttons--button');
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--fullscreen');
  fullscreenButton.append(fullscreenIcon);

  buttonsDiv.append(playButton, muteButton, fullscreenButton);
  videoControls.append(timerDiv, buttonsDiv);

  const modalVideo = document.createElement('video');
  modalVideo.classList.add('video-container__video');
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('muted', 'true');
  modalVideo.setAttribute('autoplay', '');

  const modalVideoSource = document.createElement('source');
  modalVideoSource.setAttribute('src', backgroundVideo || '');
  modalVideoSource.setAttribute('type', 'video/mp4');
  modalVideo.append(modalVideoSource);

  videoContainer.append(videoControls, modalVideo);
  videoDiv.append(videoContainer);
  dialog.append(dialogForm, videoDiv);
  heroContent.append(dialog);

  block.append(heroContent);

  // Clean up the original authored content
  backgroundVideoElement?.remove();
  titleElement?.remove();
  descriptionElement?.remove();
  primaryCtaLabelElement?.remove();
  primaryCtaHrefElement?.remove();
  secondaryCtaLabelElement?.remove();
  secondaryCtaHrefElement?.remove();
}
