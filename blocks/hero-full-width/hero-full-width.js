import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const backgroundVideo = block.querySelector(':scope div:nth-child(1) > div').textContent;
  const title = block.querySelector(':scope div:nth-child(2) > div').innerHTML;
  const description = block.querySelector(':scope div:nth-child(3) > div').innerHTML;
  const primaryCtaLabel = block.querySelector(':scope div:nth-child(4) > div').textContent;
  const primaryCtaLink = block.querySelector(':scope div:nth-child(5) > div').textContent;
  const secondaryCtaLabel = block.querySelector(':scope div:nth-child(6) > div').textContent;
  const secondaryCtaLink = block.querySelector(':scope div:nth-child(7) > div').textContent;

  const heroFullWidth = document.createElement('div');
  heroFullWidth.className = 'hero-full-width parallax-child-2 hero-in-view';
  heroFullWidth.setAttribute('data-media-type', 'videoTypeSelected');
  heroFullWidth.setAttribute('aria-label', title);
  heroFullWidth.setAttribute('aria-hidden', 'true');

  const heroFullWidthCover = document.createElement('div');
  heroFullWidthCover.className = 'hero-full-width__cover';
  heroFullWidth.append(heroFullWidthCover);

  const heroFullWidthBackground = document.createElement('div');
  heroFullWidthBackground.className = 'hero-full-width__background';
  heroFullWidth.append(heroFullWidthBackground);

  const heroFullWidthBackgroundWrapper = document.createElement('div');
  heroFullWidthBackgroundWrapper.className = 'hero-full-width__background-wrapper zoom-out';
  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);

  const heroFullWidthBackgroundVideo = document.createElement('video');
  heroFullWidthBackgroundVideo.className = 'hero-full-width__background-video';
  heroFullWidthBackgroundVideo.setAttribute('aria-label', title);
  heroFullWidthBackgroundVideo.setAttribute('aria-hidden', 'true');
  heroFullWidthBackgroundVideo.setAttribute('playsinline', '');
  heroFullWidthBackgroundVideo.setAttribute('muted', '');
  heroFullWidthBackgroundVideo.setAttribute('loop', '');
  heroFullWidthBackgroundVideo.setAttribute('autoplay', '');
  heroFullWidthBackgroundWrapper.append(heroFullWidthBackgroundVideo);

  const sourceBgVideo = document.createElement('source');
  sourceBgVideo.setAttribute('src', backgroundVideo);
  sourceBgVideo.setAttribute('type', 'video/mp4');
  heroFullWidthBackgroundVideo.append(sourceBgVideo);

  const heroFullWidthBackgroundPoster = document.createElement('img');
  heroFullWidthBackgroundPoster.setAttribute('alt', 'Background poster image');
  heroFullWidthBackgroundPoster.setAttribute('loading', 'lazy');
  heroFullWidthBackgroundPoster.className = 'hero-full-width__background-poster';
  heroFullWidthBackgroundPoster.style.display = 'none';
  heroFullWidthBackgroundPoster.setAttribute('aria-hidden', 'true');
  heroFullWidthBackgroundWrapper.append(heroFullWidthBackgroundPoster);

  const heroFullWidthContent = document.createElement('div');
  heroFullWidthContent.className = 'hero-full-width__content';
  heroFullWidth.append(heroFullWidthContent);

  const slideWrap1 = document.createElement('div');
  slideWrap1.className = 'slide-wrap';
  heroFullWidthContent.append(slideWrap1);

  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.className = 'slide-up';
  slideWrap1.append(slideUp1);

  const heroFullWidthContentTitle = document.createElement('div');
  heroFullWidthContentTitle.className = 'hero-full-width__content__title';
  heroFullWidthContentTitle.setAttribute('tabindex', '0');
  heroFullWidthContentTitle.innerHTML = title;
  slideUp1.append(heroFullWidthContentTitle);

  const heroFullWidthContentDescription = document.createElement('div');
  heroFullWidthContentDescription.className = 'hero-full-width__content__description';
  heroFullWidthContentDescription.setAttribute('tabindex', '0');
  heroFullWidthContentDescription.innerHTML = description;
  slideUp1.append(heroFullWidthContentDescription);

  const slideWrap2 = document.createElement('div');
  slideWrap2.className = 'slide-wrap';
  heroFullWidthContent.append(slideWrap2);

  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.className = 'slide-up';
  slideWrap2.append(slideUp2);

  const heroFullWidthContentCtas = document.createElement('div');
  heroFullWidthContentCtas.className = 'hero-full-width__content--ctas';
  slideUp2.append(heroFullWidthContentCtas);

  const primaryCta = document.createElement('a');
  primaryCta.setAttribute('href', primaryCtaLink);
  primaryCta.className = 'cta cta__secondary primaryCta ';
  primaryCta.setAttribute('target', '_self');
  primaryCta.setAttribute('aria-label', primaryCtaLabel);
  primaryCta.setAttribute('data-palette', 'palette-light');
  heroFullWidthContentCtas.append(primaryCta);

  const primaryCtaLabelSpan = document.createElement('span');
  primaryCtaLabelSpan.className = 'cta__label';
  primaryCtaLabelSpan.textContent = primaryCtaLabel;
  primaryCta.append(primaryCtaLabelSpan);

  const chevronWrapper = document.createElement('div');
  chevronWrapper.className = 'chevron-wrapper';
  heroFullWidthContentCtas.append(chevronWrapper);

  const chevronButton = document.createElement('button');
  chevronButton.setAttribute('type', 'button');
  chevronButton.className = 'chevron-icon';
  chevronButton.setAttribute('aria-label', 'Open video modal');
  chevronWrapper.append(chevronButton);

  const secondaryCta = document.createElement('a');
  secondaryCta.setAttribute('href', secondaryCtaLink);
  secondaryCta.className = 'cta cta__link secondaryCta ';
  secondaryCta.setAttribute('target', '_self');
  secondaryCta.setAttribute('aria-label', secondaryCtaLabel);
  secondaryCta.setAttribute('data-palette', 'palette-light');
  chevronWrapper.append(secondaryCta);

  const secondaryCtaIcon = document.createElement('span');
  secondaryCtaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
  secondaryCtaIcon.setAttribute('aria-hidden', 'true');
  secondaryCta.append(secondaryCtaIcon);

  const secondaryCtaLabelSpan = document.createElement('span');
  secondaryCtaLabelSpan.className = 'cta__label';
  secondaryCtaLabelSpan.textContent = secondaryCtaLabel;
  secondaryCta.append(secondaryCtaLabelSpan);

  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width__content--modal';
  dialog.setAttribute('id', 'home-page-video-dialog');
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  heroFullWidthContent.append(dialog);

  const dialogForm = document.createElement('form');
  dialogForm.setAttribute('method', 'dialog');
  dialog.append(dialogForm);

  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  dialogForm.append(closeButton);

  const videoDiv = document.createElement('div');
  videoDiv.className = 'video hero-full-width__content--modal__video';
  dialog.append(videoDiv);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container show-controls ';
  videoDiv.append(videoContainer);

  const videoContainerControls = document.createElement('div');
  videoContainerControls.className = 'video-container__controls';
  videoContainer.append(videoContainerControls);

  const videoContainerControlsTimer = document.createElement('div');
  videoContainerControlsTimer.className = 'video-container__controls__timer';
  videoContainerControls.append(videoContainerControlsTimer);

  const progressArea = document.createElement('div');
  progressArea.className = 'video-container__controls__timer__progress-area';
  videoContainerControlsTimer.append(progressArea);

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
  videoContainerControlsTimer.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'video-container__controls__timer__duration';
  duration.textContent = '00:00';
  videoContainerControlsTimer.append(duration);

  const videoContainerControlsButtons = document.createElement('div');
  videoContainerControlsButtons.className = 'video-container__controls__buttons';
  videoContainerControls.append(videoContainerControlsButtons);

  const playButton = document.createElement('button');
  playButton.className = 'video-container__controls__buttons__play-button video-container__controls__buttons--button';
  videoContainerControlsButtons.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButton.append(playIcon);

  const muteButton = document.createElement('button');
  muteButton.className = 'video-container__controls__buttons__mute-button video-container__controls__buttons--button';
  videoContainerControlsButtons.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button';
  videoContainerControlsButtons.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);

  const modalVideo = document.createElement('video');
  modalVideo.className = 'video-container__video';
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('muted', 'true');
  modalVideo.setAttribute('autoplay', '');
  videoContainer.append(modalVideo);

  const sourceModalVideo = document.createElement('source');
  sourceModalVideo.setAttribute('src', backgroundVideo);
  sourceModalVideo.setAttribute('type', 'video/mp4');
  modalVideo.append(sourceModalVideo);

  modalVideo.append(document.createTextNode('webkit-playsinline'));
  modalVideo.append(document.createTextNode('x-webkit-airplay="allow"'));

  block.textContent = '';
  block.append(heroFullWidth);
}