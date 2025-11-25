import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const backgroundVideo = block.querySelector('div:nth-child(1) > div');
  const title = block.querySelector('div:nth-child(2) > div');
  const description = block.querySelector('div:nth-child(3) > div');
  const primaryCtaLink = block.querySelector('div:nth-child(4) > div');
  const primaryCtaLabel = block.querySelector('div:nth-child(5) > div');
  const secondaryCtaLink = block.querySelector('div:nth-child(6) > div');
  const secondaryCtaLabel = block.querySelector('div:nth-child(7) > div');
  const modalVideoSrc = block.querySelector('div:nth-child(8) > div');

  block.setAttribute('data-media-type', 'videoTypeSelected');
  block.setAttribute('aria-label', title.innerHTML.trim());
  block.setAttribute('aria-hidden', 'true');

  const heroFullWidthCover = document.createElement('div');
  heroFullWidthCover.className = 'hero-full-width__cover';

  const heroFullWidthBackground = document.createElement('div');
  heroFullWidthBackground.className = 'hero-full-width__background';

  const heroFullWidthBackgroundWrapper = document.createElement('div');
  heroFullWidthBackgroundWrapper.className = 'hero-full-width__background-wrapper zoom-out';

  const backgroundVideoElement = document.createElement('video');
  backgroundVideoElement.className = 'hero-full-width__background-video';
  backgroundVideoElement.setAttribute('aria-label', title.innerHTML.trim());
  backgroundVideoElement.setAttribute('aria-hidden', 'true');
  backgroundVideoElement.setAttribute('playsinline', '');
  backgroundVideoElement.setAttribute('muted', '');
  backgroundVideoElement.setAttribute('loop', '');
  backgroundVideoElement.setAttribute('autoplay', '');
  const backgroundVideoSource = document.createElement('source');
  backgroundVideoSource.setAttribute('src', backgroundVideo.textContent.trim());
  backgroundVideoSource.setAttribute('type', 'video/mp4');
  backgroundVideoElement.append(backgroundVideoSource);
  moveInstrumentation(backgroundVideo, backgroundVideoElement.querySelector('source'));

  const backgroundPosterImg = document.createElement('img');
  backgroundPosterImg.setAttribute('alt', 'Background poster image');
  backgroundPosterImg.setAttribute('loading', 'lazy');
  backgroundPosterImg.className = 'hero-full-width__background-poster';
  backgroundPosterImg.style.display = 'none';
  backgroundPosterImg.setAttribute('aria-hidden', 'true');

  heroFullWidthBackgroundWrapper.append(backgroundVideoElement, backgroundPosterImg);
  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);

  const heroFullWidthContent = document.createElement('div');
  heroFullWidthContent.className = 'hero-full-width__content';

  const slideWrap1 = document.createElement('div');
  slideWrap1.className = 'slide-wrap';
  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.className = 'slide-up';

  const heroFullWidthContentTitle = document.createElement('div');
  heroFullWidthContentTitle.className = 'hero-full-width__content__title';
  heroFullWidthContentTitle.setAttribute('tabindex', '0');
  heroFullWidthContentTitle.innerHTML = title.innerHTML;
  moveInstrumentation(title, heroFullWidthContentTitle);

  const heroFullWidthContentDescription = document.createElement('div');
  heroFullWidthContentDescription.className = 'hero-full-width__content__description';
  heroFullWidthContentDescription.setAttribute('tabindex', '0');
  heroFullWidthContentDescription.innerHTML = description.innerHTML;
  moveInstrumentation(description, heroFullWidthContentDescription);

  slideUp1.append(heroFullWidthContentTitle, heroFullWidthContentDescription);
  slideWrap1.append(slideUp1);

  const slideWrap2 = document.createElement('div');
  slideWrap2.className = 'slide-wrap';
  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.className = 'slide-up';

  const heroFullWidthContentCtas = document.createElement('div');
  heroFullWidthContentCtas.className = 'hero-full-width__content--ctas';

  const primaryCtaAnchor = document.createElement('a');
  primaryCtaAnchor.setAttribute('href', primaryCtaLink.textContent.trim());
  primaryCtaAnchor.className = 'cta cta__secondary primaryCta ';
  primaryCtaAnchor.setAttribute('target', '_self');
  primaryCtaAnchor.setAttribute('aria-label', primaryCtaLabel.textContent.trim());
  primaryCtaAnchor.setAttribute('data-palette', 'palette-light');
  const primaryCtaSpan = document.createElement('span');
  primaryCtaSpan.className = 'cta__label';
  primaryCtaSpan.textContent = primaryCtaLabel.textContent.trim();
  primaryCtaAnchor.append(primaryCtaSpan);
  moveInstrumentation(primaryCtaLink, primaryCtaAnchor);
  moveInstrumentation(primaryCtaLabel, primaryCtaSpan);

  const chevronWrapper = document.createElement('div');
  chevronWrapper.className = 'chevron-wrapper';

  const chevronButton = document.createElement('button');
  chevronButton.setAttribute('type', 'button');
  chevronButton.className = 'chevron-icon';
  chevronButton.setAttribute('aria-label', 'Open video modal');

  const secondaryCtaAnchor = document.createElement('a');
  secondaryCtaAnchor.setAttribute('href', secondaryCtaLink.textContent.trim());
  secondaryCtaAnchor.className = 'cta cta__link secondaryCta ';
  secondaryCtaAnchor.setAttribute('target', '_self');
  secondaryCtaAnchor.setAttribute('aria-label', secondaryCtaLabel.textContent.trim());
  secondaryCtaAnchor.setAttribute('data-palette', 'palette-light');
  const secondaryCtaIcon = document.createElement('span');
  secondaryCtaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
  secondaryCtaIcon.setAttribute('aria-hidden', 'true');
  const secondaryCtaSpan = document.createElement('span');
  secondaryCtaSpan.className = 'cta__label';
  secondaryCtaSpan.textContent = secondaryCtaLabel.textContent.trim();
  secondaryCtaAnchor.append(secondaryCtaIcon, secondaryCtaSpan);
  moveInstrumentation(secondaryCtaLink, secondaryCtaAnchor);
  moveInstrumentation(secondaryCtaLabel, secondaryCtaSpan);

  chevronWrapper.append(chevronButton, secondaryCtaAnchor);
  heroFullWidthContentCtas.append(primaryCtaAnchor, chevronWrapper);

  slideUp2.append(heroFullWidthContentCtas);
  slideWrap2.append(slideUp2);

  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width__content--modal';
  dialog.setAttribute('id', 'home-page-video-dialog');
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');

  const dialogForm = document.createElement('form');
  dialogForm.setAttribute('method', 'dialog');
  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  dialogForm.append(closeButton);

  const videoDiv = document.createElement('div');
  videoDiv.className = 'video hero-full-width__content--modal__video';

  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container show-controls ';

  const videoContainerControls = document.createElement('div');
  videoContainerControls.className = 'video-container__controls';

  const timerDiv = document.createElement('div');
  timerDiv.className = 'video-container__controls__timer';
  const progressArea = document.createElement('div');
  progressArea.className = 'video-container__controls__timer__progress-area';
  progressArea.innerHTML = '<span class="video-container__controls__timer__progress-area__progress-bar"></span><span class="video-container__controls__timer__progress-area__pointer"></span><span class="video-container__controls__timer__progress-area__progress-pending"></span>';
  const currentTime = document.createElement('p');
  currentTime.className = 'video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  const duration = document.createElement('p');
  duration.className = 'video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timerDiv.append(progressArea, currentTime, duration);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'video-container__controls__buttons';
  buttonsDiv.innerHTML = '<button class="video-container__controls__buttons__play-button video-container__controls__buttons--button"><span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span></button><button class="video-container__controls__buttons__mute-button video-container__controls__buttons--button"><span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span></button><button class="video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button"><span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span></button>';

  videoContainerControls.append(timerDiv, buttonsDiv);

  const modalVideoElement = document.createElement('video');
  modalVideoElement.className = 'video-container__video';
  modalVideoElement.setAttribute('playsinline', '');
  modalVideoElement.setAttribute('webkit-playsinline', '');
  modalVideoElement.setAttribute('muted', 'true');
  modalVideoElement.setAttribute('autoplay', '');
  const modalVideoSource = document.createElement('source');
  modalVideoSource.setAttribute('src', modalVideoSrc.textContent.trim());
  modalVideoSource.setAttribute('type', 'video/mp4');
  modalVideoElement.append(modalVideoSource);
  modalVideoElement.append('webkit-playsinline', 'x-webkit-airplay="allow"');
  moveInstrumentation(modalVideoSrc, modalVideoElement.querySelector('source'));

  videoContainer.append(videoContainerControls, modalVideoElement);
  videoDiv.append(videoContainer);
  dialog.append(dialogForm, videoDiv);

  heroFullWidthContent.append(slideWrap1, slideWrap2, dialog);

  block.textContent = '';
  block.append(heroFullWidthCover, heroFullWidthBackground, heroFullWidthContent);

  // Remove the original content cells
  backgroundVideo.remove();
  title.remove();
  description.remove();
  primaryCtaLink.remove();
  primaryCtaLabel.remove();
  secondaryCtaLink.remove();
  secondaryCtaLabel.remove();
  modalVideoSrc.remove();
}
