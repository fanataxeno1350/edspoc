import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoSource = block.children[0]?.children[1]?.textContent.trim();
  const title = block.children[1]?.children[1]?.textContent.trim();
  const description = block.children[2]?.children[1]?.innerHTML.trim();
  const primaryCtaLabel = block.children[3]?.children[1]?.textContent.trim();
  const primaryCtaHref = block.children[4]?.children[1]?.textContent.trim();
  const secondaryCtaLabel = block.children[5]?.children[1]?.textContent.trim();
  const secondaryCtaHref = block.children[6]?.children[1]?.textContent.trim();

  block.textContent = '';
  block.className = 'hero-full-width parallax-child-2 hero-in-view';
  block.setAttribute('data-media-type', 'videoTypeSelected');
  block.setAttribute('aria-label', title);
  block.setAttribute('aria-hidden', 'true');

  const coverDiv = document.createElement('div');
  coverDiv.className = 'hero-full-width__cover';
  block.append(coverDiv);

  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'hero-full-width__background';
  block.append(backgroundDiv);

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.className = 'hero-full-width__background-wrapper zoom-out';
  backgroundDiv.append(backgroundWrapper);

  const backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'hero-full-width__background-video';
  backgroundVideo.setAttribute('aria-label', title);
  backgroundVideo.setAttribute('aria-hidden', 'true');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('autoplay', '');
  backgroundWrapper.append(backgroundVideo);

  const videoSourceElement = document.createElement('source');
  videoSourceElement.src = videoSource;
  videoSourceElement.type = 'video/mp4';
  backgroundVideo.append(videoSourceElement);

  const posterImg = document.createElement('img');
  posterImg.alt = 'Background poster image';
  posterImg.loading = 'lazy';
  posterImg.className = 'hero-full-width__background-poster';
  posterImg.style.display = 'none';
  posterImg.setAttribute('aria-hidden', 'true');
  backgroundWrapper.append(posterImg);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-full-width__content';
  block.append(contentDiv);

  const slideWrap1 = document.createElement('div');
  slideWrap1.className = 'slide-wrap';
  contentDiv.append(slideWrap1);

  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.className = 'slide-up';
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement('div');
  titleDiv.className = 'hero-full-width__content__title';
  titleDiv.setAttribute('tabindex', '0');
  titleDiv.innerHTML = title;
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'hero-full-width__content__description';
  descriptionDiv.setAttribute('tabindex', '0');
  descriptionDiv.innerHTML = description;
  slideUp1.append(descriptionDiv);

  const slideWrap2 = document.createElement('div');
  slideWrap2.className = 'slide-wrap';
  contentDiv.append(slideWrap2);

  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.className = 'slide-up';
  slideWrap2.append(slideUp2);

  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'hero-full-width__content--ctas';
  slideUp2.append(ctaDiv);

  const primaryCta = document.createElement('a');
  primaryCta.href = primaryCtaHref;
  primaryCta.className = 'cta cta__secondary primaryCta ';
  primaryCta.target = '_self';
  primaryCta.setAttribute('aria-label', primaryCtaLabel);
  primaryCta.setAttribute('data-palette', 'palette-light');
  ctaDiv.append(primaryCta);

  const primaryCtaLabelSpan = document.createElement('span');
  primaryCtaLabelSpan.className = 'cta__label';
  primaryCtaLabelSpan.textContent = primaryCtaLabel;
  primaryCta.append(primaryCtaLabelSpan);

  const chevronWrapper = document.createElement('div');
  chevronWrapper.className = 'chevron-wrapper';
  ctaDiv.append(chevronWrapper);

  const chevronButton = document.createElement('button');
  chevronButton.type = 'button';
  chevronButton.className = 'chevron-icon';
  chevronButton.setAttribute('aria-label', 'Open video modal');
  chevronWrapper.append(chevronButton);

  const secondaryCta = document.createElement('a');
  secondaryCta.href = secondaryCtaHref;
  secondaryCta.className = 'cta cta__link secondaryCta ';
  secondaryCta.target = '_self';
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
  buttonsDiv.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButton.append(playIcon);

  const muteButton = document.createElement('button');
  muteButton.className = 'video-container__controls__buttons__mute-button video-container__controls__buttons--button';
  buttonsDiv.append(muteButton);

  const volumeIcon = document.createElement('span');
  volumeIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(volumeIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button';
  buttonsDiv.append(fullscreenButton);

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

  const modalVideoSource = document.createElement('source');
  modalVideoSource.src = videoSource;
  modalVideoSource.type = 'video/mp4';
  modalVideo.append(modalVideoSource);

  // Transfer instrumentation from the original block rows to the new elements
  moveInstrumentation(block.children[0], backgroundVideo);
  moveInstrumentation(block.children[1], titleDiv);
  moveInstrumentation(block.children[2], descriptionDiv);
  moveInstrumentation(block.children[3], primaryCta);
  moveInstrumentation(block.children[4], primaryCta);
  moveInstrumentation(block.children[5], secondaryCta);
  moveInstrumentation(block.children[6], secondaryCta);
}