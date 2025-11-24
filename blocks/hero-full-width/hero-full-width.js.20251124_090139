import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const heroFullWidth = block.children[0];

  const backgroundVideoField = heroFullWidth.children[0];
  const backgroundVideoTypeField = heroFullWidth.children[1];
  const titleField = heroFullWidth.children[2];
  const descriptionField = heroFullWidth.children[3];
  const ctasField = heroFullWidth.children[4];

  const backgroundVideoSrc = backgroundVideoField.querySelector('a')?.href || '';
  const backgroundVideoType = backgroundVideoTypeField.textContent.trim();
  const titleContent = titleField.innerHTML;
  const descriptionContent = descriptionField.innerHTML;

  const ctaLabel1 = ctasField.children[0].textContent.trim();
  const ctaUrl1 = ctasField.children[1].querySelector('a')?.href || '';
  const ctaLabel2 = ctasField.children[2].textContent.trim();
  const ctaUrl2 = ctasField.children[3].querySelector('a')?.href || '';

  const blockWrapper = document.createElement('div');
  blockWrapper.className = 'hero-full-width parallax-child-2 hero-in-view';
  blockWrapper.setAttribute('data-media-type', backgroundVideoType);
  blockWrapper.setAttribute('aria-label', titleContent);
  blockWrapper.setAttribute('aria-hidden', 'true');
  moveInstrumentation(heroFullWidth, blockWrapper);

  const cover = document.createElement('div');
  cover.className = 'hero-full-width__cover';
  blockWrapper.append(cover);

  const background = document.createElement('div');
  background.className = 'hero-full-width__background';
  blockWrapper.append(background);

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.className = 'hero-full-width__background-wrapper zoom-out';
  background.append(backgroundWrapper);

  const videoBg = document.createElement('video');
  videoBg.className = 'hero-full-width__background-video';
  videoBg.setAttribute('aria-label', titleContent);
  videoBg.setAttribute('aria-hidden', 'true');
  videoBg.setAttribute('playsinline', '');
  videoBg.setAttribute('muted', '');
  videoBg.setAttribute('loop', '');
  videoBg.setAttribute('autoplay', '');
  const sourceBg = document.createElement('source');
  sourceBg.src = backgroundVideoSrc;
  sourceBg.type = 'video/mp4';
  videoBg.append(sourceBg);
  backgroundWrapper.append(videoBg);

  const imgBg = document.createElement('img');
  imgBg.alt = 'Background poster image';
  imgBg.loading = 'lazy';
  imgBg.className = 'hero-full-width__background-poster';
  imgBg.style.display = 'none';
  imgBg.setAttribute('aria-hidden', 'true');
  backgroundWrapper.append(imgBg);

  const content = document.createElement('div');
  content.className = 'hero-full-width__content';
  blockWrapper.append(content);

  const slideWrap1 = document.createElement('div');
  slideWrap1.className = 'slide-wrap';
  content.append(slideWrap1);

  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.className = 'slide-up';
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement('div');
  titleDiv.className = 'hero-full-width__content__title';
  titleDiv.setAttribute('tabindex', '0');
  titleDiv.innerHTML = titleContent;
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'hero-full-width__content__description';
  descriptionDiv.setAttribute('tabindex', '0');
  descriptionDiv.innerHTML = descriptionContent;
  slideUp1.append(descriptionDiv);

  const slideWrap2 = document.createElement('div');
  slideWrap2.className = 'slide-wrap';
  content.append(slideWrap2);

  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.className = 'slide-up';
  slideWrap2.append(slideUp2);

  const ctasDiv = document.createElement('div');
  ctasDiv.className = 'hero-full-width__content--ctas';
  slideUp2.append(ctasDiv);

  const cta1 = document.createElement('a');
  cta1.href = ctaUrl1;
  cta1.className = 'cta cta__secondary primaryCta ';
  cta1.target = '_self';
  cta1.setAttribute('aria-label', ctaLabel1);
  cta1.setAttribute('data-palette', 'palette-light');
  const cta1Span = document.createElement('span');
  cta1Span.className = 'cta__label';
  cta1Span.textContent = ctaLabel1;
  cta1.append(cta1Span);
  ctasDiv.append(cta1);

  const chevronWrapper = document.createElement('div');
  chevronWrapper.className = 'chevron-wrapper';
  ctasDiv.append(chevronWrapper);

  const chevronButton = document.createElement('button');
  chevronButton.type = 'button';
  chevronButton.className = 'chevron-icon';
  chevronButton.setAttribute('aria-label', 'Open video modal');
  chevronWrapper.append(chevronButton);

  const cta2 = document.createElement('a');
  cta2.href = ctaUrl2;
  cta2.className = 'cta cta__link secondaryCta ';
  cta2.target = '_self';
  cta2.setAttribute('aria-label', ctaLabel2);
  cta2.setAttribute('data-palette', 'palette-light');
  const cta2Icon = document.createElement('span');
  cta2Icon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
  cta2Icon.setAttribute('aria-hidden', 'true');
  const cta2Label = document.createElement('span');
  cta2Label.className = 'cta__label';
  cta2Label.textContent = ctaLabel2;
  cta2.append(cta2Icon, cta2Label);
  chevronWrapper.append(cta2);

  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width__content--modal';
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  content.append(dialog);

  const dialogForm = document.createElement('form');
  dialogForm.method = 'dialog';
  dialog.append(dialogForm);

  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  dialogForm.append(closeButton);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.className = 'video hero-full-width__content--modal__video';
  dialog.append(videoModalDiv);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container show-controls ';
  videoModalDiv.append(videoContainer);

  const videoControls = document.createElement('div');
  videoControls.className = 'video-container__controls';
  videoContainer.append(videoControls);

  const timer = document.createElement('div');
  timer.className = 'video-container__controls__timer';
  videoControls.append(timer);

  const progressArea = document.createElement('div');
  progressArea.className = 'video-container__controls__timer__progress-area';
  timer.append(progressArea);

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
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timer.append(duration);

  const controlButtons = document.createElement('div');
  controlButtons.className = 'video-container__controls__buttons';
  videoControls.append(controlButtons);

  const playButton = document.createElement('button');
  playButton.className = 'video-container__controls__buttons__play-button video-container__controls__buttons--button';
  const playIcon = document.createElement('span');
  playIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButton.append(playIcon);
  controlButtons.append(playButton);

  const muteButton = document.createElement('button');
  muteButton.className = 'video-container__controls__buttons__mute-button video-container__controls__buttons--button';
  const muteIcon = document.createElement('span');
  muteIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);
  controlButtons.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button';
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);
  controlButtons.append(fullscreenButton);

  const videoModal = document.createElement('video');
  videoModal.className = 'video-container__video';
  videoModal.setAttribute('playsinline', '');
  videoModal.setAttribute('webkit-playsinline', '');
  videoModal.setAttribute('muted', 'true');
  videoModal.setAttribute('autoplay', '');
  const sourceModal = document.createElement('source');
  sourceModal.src = backgroundVideoSrc;
  sourceModal.type = 'video/mp4';
  videoModal.append(sourceModal);
  videoContainer.append(videoModal);

  block.textContent = '';
  block.append(blockWrapper);
}