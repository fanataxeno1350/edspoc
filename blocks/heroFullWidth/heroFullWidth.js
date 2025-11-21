import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  moveInstrumentation(block, mainDiv);
  mainDiv.classList.add('hero-full-width', 'parallax-child-2', 'hero-in-view');
  mainDiv.setAttribute('data-media-type', 'videoTypeSelected');

  const coverDiv = document.createElement('div');
  coverDiv.classList.add('hero-full-width__cover');
  mainDiv.append(coverDiv);

  const backgroundDiv = document.createElement('div');
  backgroundDiv.classList.add('hero-full-width__background');
  mainDiv.append(backgroundDiv);

  const backgroundWrapperDiv = document.createElement('div');
  backgroundWrapperDiv.classList.add('hero-full-width__background-wrapper', 'zoom-out');
  backgroundDiv.append(backgroundWrapperDiv);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('hero-full-width__content');
  mainDiv.append(contentDiv);

  const dialog = document.createElement('dialog');
  dialog.classList.add('hero-full-width__content--modal');
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  contentDiv.append(dialog);

  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');
  dialog.append(form);

  const closeButton = document.createElement('button');
  closeButton.classList.add('hero-full-width__content--modal__close-button');
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  form.append(closeButton);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.classList.add('video', 'hero-full-width__content--modal__video');
  dialog.append(videoModalDiv);

  const videoContainerDiv = document.createElement('div');
  videoContainerDiv.classList.add('video-container', 'show-controls');
  videoModalDiv.append(videoContainerDiv);

  const videoControlsDiv = document.createElement('div');
  videoControlsDiv.classList.add('video-container__controls');
  videoContainerDiv.append(videoControlsDiv);

  const videoControlsTimerDiv = document.createElement('div');
  videoControlsTimerDiv.classList.add('video-container__controls__timer');
  videoControlsDiv.append(videoControlsTimerDiv);

  const progressBarArea = document.createElement('div');
  progressBarArea.classList.add('video-container__controls__timer__progress-area');
  progressBarArea.innerHTML = '<span class="video-container__controls__timer__progress-area__progress-bar"></span><span class="video-container__controls__timer__progress-area__pointer"></span><span class="video-container__controls__timer__progress-area__progress-pending"></span>';
  videoControlsTimerDiv.append(progressBarArea);

  const currentTimeP = document.createElement('p');
  currentTimeP.classList.add('video-container__controls__timer__current-time');
  currentTimeP.textContent = '00:00';
  videoControlsTimerDiv.append(currentTimeP);

  const durationP = document.createElement('p');
  durationP.classList.add('video-container__controls__timer__duration');
  durationP.textContent = '00:00';
  videoControlsTimerDiv.append(durationP);

  const videoControlsButtonsDiv = document.createElement('div');
  videoControlsButtonsDiv.classList.add('video-container__controls__buttons');
  videoControlsDiv.append(videoControlsButtonsDiv);

  const playButton = document.createElement('button');
  playButton.classList.add('video-container__controls__buttons__play-button', 'video-container__controls__buttons--button');
  playButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span>';
  videoControlsButtonsDiv.append(playButton);

  const muteButton = document.createElement('button');
  muteButton.classList.add('video-container__controls__buttons__mute-button', 'video-container__controls__buttons--button');
  muteButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>';
  videoControlsButtonsDiv.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('video-container__controls__buttons__fullscreen-button', 'video-container__controls__buttons--button');
  fullscreenButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>';
  videoControlsButtonsDiv.append(fullscreenButton);

  const modalVideo = document.createElement('video');
  modalVideo.classList.add('video-container__video');
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('muted', 'true');
  modalVideo.setAttribute('autoplay', '');
  videoContainerDiv.append(modalVideo);

  const modalVideoSource = document.createElement('source');
  modalVideoSource.setAttribute('type', 'video/mp4');
  modalVideo.append(modalVideoSource);

  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) { // First row for video and title/description
      const videoSrcCell = row.children[0];
      const titleCell = row.children[1];
      const descriptionCell = row.children[2];

      const videoElement = document.createElement('video');
      videoElement.classList.add('hero-full-width__background-video');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('muted', '');
      videoElement.setAttribute('loop', '');
      videoElement.setAttribute('autoplay', '');

      const sourceElement = document.createElement('source');
      sourceElement.src = videoSrcCell.textContent.trim();
      sourceElement.setAttribute('type', 'video/mp4');
      videoElement.append(sourceElement);
      backgroundWrapperDiv.append(videoElement);

      const posterImg = document.createElement('img');
      posterImg.setAttribute('alt', 'Background poster image');
      posterImg.setAttribute('loading', 'lazy');
      posterImg.classList.add('hero-full-width__background-poster');
      posterImg.style.display = 'none';
      posterImg.setAttribute('aria-hidden', 'true');
      backgroundWrapperDiv.append(posterImg);

      // Set video source for modal
      modalVideoSource.src = videoSrcCell.textContent.trim();

      const slideWrap1 = document.createElement('div');
      slideWrap1.classList.add('slide-wrap');
      const slideUp1 = document.createElement('div');
      slideUp1.setAttribute('data-slide-type', 'slide-up');
      slideUp1.classList.add('slide-up');
      slideWrap1.append(slideUp1);

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('hero-full-width__content__title');
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = titleCell.innerHTML;
      slideUp1.append(titleDiv);

      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('hero-full-width__content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      slideUp1.append(descriptionDiv);

      contentDiv.append(slideWrap1);

      // Transfer instrumentation for video, title, description
      moveInstrumentation(videoSrcCell, sourceElement);
      moveInstrumentation(titleCell, titleDiv);
      moveInstrumentation(descriptionCell, descriptionDiv);

    } else if (rowIndex === 1) { // Second row for CTAs
      const primaryCtaLabelCell = row.children[0];
      const primaryCtaLinkCell = row.children[1];
      const secondaryCtaLabelCell = row.children[2];
      const secondaryCtaLinkCell = row.children[3];

      const slideWrap2 = document.createElement('div');
      slideWrap2.classList.add('slide-wrap');
      const slideUp2 = document.createElement('div');
      slideUp2.setAttribute('data-slide-type', 'slide-up');
      slideUp2.classList.add('slide-up');
      slideWrap2.append(slideUp2);

      const ctasDiv = document.createElement('div');
      ctasDiv.classList.add('hero-full-width__content--ctas');
      slideUp2.append(ctasDiv);

      const primaryCta = document.createElement('a');
      primaryCta.href = primaryCtaLinkCell.textContent.trim();
      primaryCta.classList.add('cta', 'cta__secondary', 'primaryCta');
      primaryCta.setAttribute('target', '_self');
      primaryCta.setAttribute('aria-label', primaryCtaLabelCell.textContent.trim());
      primaryCta.setAttribute('data-palette', 'palette-light');
      const primaryCtaSpan = document.createElement('span');
      primaryCtaSpan.classList.add('cta__label');
      primaryCtaSpan.textContent = primaryCtaLabelCell.textContent.trim();
      primaryCta.append(primaryCtaSpan);
      ctasDiv.append(primaryCta);

      const chevronWrapper = document.createElement('div');
      chevronWrapper.classList.add('chevron-wrapper');
      ctasDiv.append(chevronWrapper);

      const chevronButton = document.createElement('button');
      chevronButton.setAttribute('type', 'button');
      chevronButton.classList.add('chevron-icon');
      chevronButton.setAttribute('aria-label', 'Open video modal');
      chevronWrapper.append(chevronButton);

      const secondaryCta = document.createElement('a');
      secondaryCta.href = secondaryCtaLinkCell.textContent.trim();
      secondaryCta.classList.add('cta', 'cta__link', 'secondaryCta');
      secondaryCta.setAttribute('target', '_self');
      secondaryCta.setAttribute('aria-label', secondaryCtaLabelCell.textContent.trim());
      secondaryCta.setAttribute('data-palette', 'palette-light');
      const secondaryCtaIcon = document.createElement('span');
      secondaryCtaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      secondaryCtaIcon.setAttribute('aria-hidden', 'true');
      const secondaryCtaSpan = document.createElement('span');
      secondaryCtaSpan.classList.add('cta__label');
      secondaryCtaSpan.textContent = secondaryCtaLabelCell.textContent.trim();
      secondaryCta.append(secondaryCtaIcon, secondaryCtaSpan);
      chevronWrapper.append(secondaryCta);

      contentDiv.append(slideWrap2);

      // Transfer instrumentation for CTAs
      moveInstrumentation(primaryCtaLabelCell, primaryCtaSpan);
      moveInstrumentation(primaryCtaLinkCell, primaryCta);
      moveInstrumentation(secondaryCtaLabelCell, secondaryCtaSpan);
      moveInstrumentation(secondaryCtaLinkCell, secondaryCta);
    }
  });

  block.textContent = '';
  block.append(mainDiv);
}