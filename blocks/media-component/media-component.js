import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('media-component');

  const backgroundDiv = document.createElement('div');
  backgroundDiv.classList.add('media-component__background');
  block.append(backgroundDiv);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('media-component__wrapper', 'media-component__wrapper--no-title');
  block.append(wrapperDiv);

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('media-component__header');
  wrapperDiv.append(headerDiv);

  const headingDiv = document.createElement('div');
  headingDiv.classList.add('media-component__heading');
  headerDiv.append(headingDiv);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('media-component__title');
  headingDiv.append(titleDiv);

  const videoWrapperDiv = document.createElement('div');
  videoWrapperDiv.classList.add('media-component-video-wrapper');
  wrapperDiv.append(videoWrapperDiv);

  // Poster Video Section
  const posterVideoDiv = document.createElement('div');
  posterVideoDiv.classList.add('media-component-video-poster');
  videoWrapperDiv.append(posterVideoDiv);

  const playButton = document.createElement('button');
  playButton.classList.add('media-component-video-poster__play-button');
  posterVideoDiv.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.classList.add('media-component-video-poster__play-button__icon', 'qd-icon', 'qd-icon--play');
  playButton.append(playIcon);

  const playText = document.createElement('span');
  playText.classList.add('media-component-video-poster__play-button__text');
  playText.setAttribute('visually-hidden', '');
  playText.textContent = ' Watch Video ';
  playButton.append(playText);

  const posterVideoElement = document.createElement('video');
  posterVideoElement.classList.add('media-component-video-poster__video');
  posterVideoElement.setAttribute('playsinline', '');
  posterVideoElement.setAttribute('webkit-playsinline', '');
  posterVideoElement.setAttribute('x-webkit-airplay', 'allow');
  posterVideoElement.setAttribute('muted', 'true');
  posterVideoElement.setAttribute('loop', '');
  posterVideoElement.setAttribute('autoplay', '');
  posterVideoDiv.append(posterVideoElement);

  let posterVideoSource = block.querySelector('[data-aue-prop="posterVideo"]');
  if (!posterVideoSource) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      posterVideoSource = anchor;
    }
  }
  if (posterVideoSource) {
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', posterVideoSource.href || posterVideoSource.textContent.trim());
    sourceElement.setAttribute('type', 'video/mp4');
    posterVideoElement.append(sourceElement);
    moveInstrumentation(posterVideoSource, sourceElement);
  }

  // Main Video Section
  const mainVideoContainer = document.createElement('div');
  mainVideoContainer.classList.add('media-component-video-container', 'show-controls', 'media-component-video-hide');
  videoWrapperDiv.append(mainVideoContainer);

  const controlsDiv = document.createElement('div');
  controlsDiv.classList.add('media-component-video-container__controls');
  mainVideoContainer.append(controlsDiv);

  const timerDiv = document.createElement('div');
  timerDiv.classList.add('media-component-video-container__controls__timer');
  controlsDiv.append(timerDiv);

  const progressArea = document.createElement('div');
  progressArea.classList.add('media-component-video-container__controls__timer__progress-area');
  timerDiv.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.classList.add('media-component-video-container__controls__timer__progress-area__progress-bar');
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.classList.add('media-component-video-container__controls__timer__progress-area__pointer');
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.classList.add('media-component-video-container__controls__timer__progress-area__progress-pending');
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.classList.add('media-component-video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  timerDiv.append(currentTime);

  const duration = document.createElement('p');
  duration.classList.add('media-component-video-container__controls__timer__duration');
  duration.textContent = '00:00';
  timerDiv.append(duration);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('media-component-video-container__controls__buttons');
  controlsDiv.append(buttonsDiv);

  const playButtonControls = document.createElement('button');
  playButtonControls.classList.add('media-component-video-container__controls__buttons__play-button', 'media-component-video-container__controls__buttons--button');
  buttonsDiv.append(playButtonControls);

  const playIconControls = document.createElement('span');
  playIconControls.classList.add('media-component-video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--play');
  playButtonControls.append(playIconControls);

  const muteButton = document.createElement('button');
  muteButton.classList.add('media-component-video-container__controls__buttons__mute-button', 'media-component-video-container__controls__buttons--button');
  buttonsDiv.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.classList.add('media-component-video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--volume');
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('media-component-video-container__controls__buttons__fullscreen-button', 'media-component-video-container__controls__buttons--button');
  buttonsDiv.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.classList.add('media-component-video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--fullscreen');
  fullscreenButton.append(fullscreenIcon);

  const mainVideoElement = document.createElement('video');
  mainVideoElement.classList.add('media-component-video-container__video');
  mainVideoElement.setAttribute('playsinline', '');
  mainVideoElement.setAttribute('webkit-playsinline', '');
  mainVideoElement.setAttribute('muted', 'true');
  mainVideoElement.setAttribute('loop', '');
  mainVideoElement.setAttribute('autoplay', '');
  mainVideoContainer.append(mainVideoElement);

  let mainVideoSource = block.querySelector('[data-aue-prop="mainVideo"]');
  if (!mainVideoSource) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      mainVideoSource = anchor;
    }
  }
  if (mainVideoSource) {
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', mainVideoSource.href || mainVideoSource.textContent.trim());
    sourceElement.setAttribute('type', 'video/mp4');
    mainVideoElement.append(sourceElement);
    moveInstrumentation(mainVideoSource, sourceElement);
  }

  // Clear the original block content
  block.innerHTML = '';
  block.append(backgroundDiv, wrapperDiv);
}