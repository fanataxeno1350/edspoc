import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('hero-full-width', 'parallax-child-2', 'hero-in-view');
  mainDiv.setAttribute('data-media-type', 'videoTypeSelected');

  const coverDiv = document.createElement('div');
  coverDiv.classList.add('hero-full-width__cover');
  mainDiv.append(coverDiv);

  const backgroundDiv = document.createElement('div');
  backgroundDiv.classList.add('hero-full-width__background');
  const backgroundWrapperDiv = document.createElement('div');
  backgroundWrapperDiv.classList.add('hero-full-width__background-wrapper', 'zoom-out');

  const videoElement = document.createElement('video');
  videoElement.classList.add('hero-full-width__background-video');
  videoElement.setAttribute('playsinline', '');
  videoElement.setAttribute('muted', '');
  videoElement.setAttribute('loop', '');
  videoElement.setAttribute('autoplay', '');

  const sourceElement = document.createElement('source');
  sourceElement.setAttribute('type', 'video/mp4');
  videoElement.append(sourceElement);

  const imgElement = document.createElement('img');
  imgElement.classList.add('hero-full-width__background-poster');
  imgElement.setAttribute('loading', 'lazy');
  imgElement.setAttribute('style', 'display:none;');
  imgElement.setAttribute('aria-hidden', 'true');

  backgroundWrapperDiv.append(videoElement, imgElement);
  backgroundDiv.append(backgroundWrapperDiv);
  mainDiv.append(backgroundDiv);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('hero-full-width__content');

  const dialogElement = document.createElement('dialog');
  dialogElement.classList.add('hero-full-width__content--modal');
  dialogElement.setAttribute('id', 'home-page-video-dialog');
  dialogElement.setAttribute('closedby', 'any');
  dialogElement.setAttribute('aria-modal', 'true');
  dialogElement.setAttribute('aria-label', 'Video Modal');

  const dialogForm = document.createElement('form');
  dialogForm.setAttribute('method', 'dialog');
  const closeButton = document.createElement('button');
  closeButton.classList.add('hero-full-width__content--modal__close-button');
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  dialogForm.append(closeButton);
  dialogElement.append(dialogForm);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.classList.add('video', 'hero-full-width__content--modal__video');
  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls');

  const videoControls = document.createElement('div');
  videoControls.classList.add('video-container__controls');

  const timerDiv = document.createElement('div');
  timerDiv.classList.add('video-container__controls__timer');
  const progressBarArea = document.createElement('span');
  progressBarArea.classList.add('video-container__controls__timer__progress-area__progress-bar');
  const pointer = document.createElement('span');
  pointer.classList.add('video-container__controls__timer__progress-area__pointer');
  const progressPending = document.createElement('span');
  progressPending.classList.add('video-container__controls__timer__progress-area__progress-pending');
  const currentTime = document.createElement('p');
  currentTime.classList.add('video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  const duration = document.createElement('p');
  duration.classList.add('video-container__controls__timer__duration');
  duration.textContent = '00:00';
  timerDiv.append(progressBarArea, pointer, progressPending, currentTime, duration);

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

  const modalVideoElement = document.createElement('video');
  modalVideoElement.classList.add('video-container__video');
  modalVideoElement.setAttribute('playsinline', '');
  modalVideoElement.setAttribute('webkit-playsinline', '');
  modalVideoElement.setAttribute('muted', 'true');
  modalVideoElement.setAttribute('autoplay', '');
  const modalSourceElement = document.createElement('source');
  modalSourceElement.setAttribute('type', 'video/mp4');
  modalVideoElement.append(modalSourceElement);

  videoContainer.append(videoControls, modalVideoElement);
  videoModalDiv.append(videoContainer);
  dialogElement.append(videoModalDiv);
  contentDiv.append(dialogElement);
  mainDiv.append(contentDiv);

  [...block.children].forEach((row, rowIndex) => {
    const cells = [...row.children];
    if (rowIndex === 0) {
      // Background Video and Poster Alt
      const backgroundVideoCell = cells[0];
      const backgroundPosterAltCell = cells[1];

      const videoLink = backgroundVideoCell.querySelector('a');
      if (videoLink) {
        sourceElement.src = videoLink.href;
        modalSourceElement.src = videoLink.href;
        videoElement.setAttribute('aria-label', block.getAttribute('aria-label') || '');
        videoElement.setAttribute('aria-hidden', 'true');
        modalVideoElement.setAttribute('aria-label', block.getAttribute('aria-label') || '');
        modalVideoElement.setAttribute('aria-hidden', 'true');
        moveInstrumentation(videoLink, sourceElement);
        moveInstrumentation(videoLink, modalSourceElement);
      }

      const posterAltText = backgroundPosterAltCell.textContent.trim();
      if (posterAltText) {
        imgElement.alt = posterAltText;
        moveInstrumentation(backgroundPosterAltCell, imgElement);
      }
    } else if (rowIndex === 1) {
      // Title and Description
      const slideWrap = document.createElement('div');
      slideWrap.classList.add('slide-wrap');
      const slideUpDiv = document.createElement('div');
      slideUpDiv.setAttribute('data-slide-type', 'slide-up');
      slideUpDiv.classList.add('slide-up');
      moveInstrumentation(row, slideUpDiv);

      const titleCell = cells[0];
      const descriptionCell = cells[1];

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('hero-full-width__content__title');
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = titleCell.innerHTML;
      mainDiv.setAttribute('aria-label', titleCell.textContent.trim());
      mainDiv.setAttribute('aria-hidden', 'true');
      slideUpDiv.append(titleDiv);
      moveInstrumentation(titleCell, titleDiv);

      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('hero-full-width__content__description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      slideUpDiv.append(descriptionDiv);
      moveInstrumentation(descriptionCell, descriptionDiv);

      slideWrap.append(slideUpDiv);
      contentDiv.prepend(slideWrap);
    } else if (rowIndex === 2) {
      // CTAs
      const slideWrap = document.createElement('div');
      slideWrap.classList.add('slide-wrap');
      const slideUpDiv = document.createElement('div');
      slideUpDiv.setAttribute('data-slide-type', 'slide-up');
      slideUpDiv.classList.add('slide-up');
      moveInstrumentation(row, slideUpDiv);

      const primaryCtaCell = cells[0];
      const secondaryCtaCell = cells[1];

      const ctasDiv = document.createElement('div');
      ctasDiv.classList.add('hero-full-width__content--ctas');

      const primaryLink = primaryCtaCell.querySelector('a');
      if (primaryLink) {
        const newPrimaryCta = document.createElement('a');
        newPrimaryCta.href = primaryLink.href;
        newPrimaryCta.classList.add('cta', 'cta__secondary', 'primaryCta');
        newPrimaryCta.setAttribute('target', primaryLink.target);
        newPrimaryCta.setAttribute('aria-label', primaryLink.textContent.trim());
        newPrimaryCta.setAttribute('data-palette', 'palette-light');
        const primaryCtaLabel = document.createElement('span');
        primaryCtaLabel.classList.add('cta__label');
        primaryCtaLabel.textContent = primaryLink.textContent.trim();
        newPrimaryCta.append(primaryCtaLabel);
        ctasDiv.append(newPrimaryCta);
        moveInstrumentation(primaryLink, newPrimaryCta);
      }

      const chevronWrapper = document.createElement('div');
      chevronWrapper.classList.add('chevron-wrapper');
      const chevronButton = document.createElement('button');
      chevronButton.setAttribute('type', 'button');
      chevronButton.classList.add('chevron-icon');
      chevronButton.setAttribute('aria-label', 'Open video modal');
      chevronWrapper.append(chevronButton);

      const secondaryLink = secondaryCtaCell.querySelector('a');
      if (secondaryLink) {
        const newSecondaryCta = document.createElement('a');
        newSecondaryCta.href = secondaryLink.href;
        newSecondaryCta.classList.add('cta', 'cta__link', 'secondaryCta');
        newSecondaryCta.setAttribute('target', secondaryLink.target);
        newSecondaryCta.setAttribute('aria-label', secondaryLink.textContent.trim());
        newSecondaryCta.setAttribute('data-palette', 'palette-light');
        const secondaryCtaIcon = document.createElement('span');
        secondaryCtaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
        secondaryCtaIcon.setAttribute('aria-hidden', 'true');
        const secondaryCtaLabel = document.createElement('span');
        secondaryCtaLabel.classList.add('cta__label');
        secondaryCtaLabel.textContent = secondaryLink.textContent.trim();
        newSecondaryCta.append(secondaryCtaIcon, secondaryCtaLabel);
        chevronWrapper.append(newSecondaryCta);
        moveInstrumentation(secondaryLink, newSecondaryCta);
      }
      ctasDiv.append(chevronWrapper);
      slideUpDiv.append(ctasDiv);
      slideWrap.append(slideUpDiv);
      contentDiv.append(slideWrap);
    }
  });

  block.textContent = '';
  block.append(mainDiv);
}
