import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const title = block.querySelector('div:nth-child(1) > div:nth-child(1)');
  const posterVideo = block.querySelector('div:nth-child(1) > div:nth-child(2)');
  const mainVideo = block.querySelector('div:nth-child(1) > div:nth-child(3)');

  const mediaComponentDiv = document.createElement('div');
  mediaComponentDiv.className = 'media-component';

  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'media-component__background';
  mediaComponentDiv.append(backgroundDiv);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'media-component__wrapper media-component__wrapper--no-title';
  mediaComponentDiv.append(wrapperDiv);

  const headerDiv = document.createElement('div');
  headerDiv.className = 'media-component__header';
  wrapperDiv.append(headerDiv);

  const headingDiv = document.createElement('div');
  headingDiv.className = 'media-component__heading';
  headerDiv.append(headingDiv);

  const titleDiv = document.createElement('div');
  titleDiv.className = 'media-component__title';
  if (title) {
    moveInstrumentation(title, titleDiv);
    titleDiv.innerHTML = title.innerHTML;
  }
  headingDiv.append(titleDiv);

  const videoWrapperDiv = document.createElement('div');
  videoWrapperDiv.className = 'media-component-video-wrapper';
  wrapperDiv.append(videoWrapperDiv);

  const posterDiv = document.createElement('div');
  posterDiv.className = 'media-component-video-poster';
  videoWrapperDiv.append(posterDiv);

  const playButton = document.createElement('button');
  playButton.className = 'media-component-video-poster__play-button';
  posterDiv.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.className = 'media-component-video-poster__play-button__icon qd-icon qd-icon--play';
  playButton.append(playIcon);

  const playText = document.createElement('span');
  playText.className = 'media-component-video-poster__play-button__text';
  playText.setAttribute('visually-hidden', '');
  playText.textContent = ' Watch Video ';
  playButton.append(playText);

  const posterVideoElement = document.createElement('video');
  posterVideoElement.className = 'media-component-video-poster__video';
  posterVideoElement.setAttribute('playsinline', '');
  posterVideoElement.setAttribute('webkit-playsinline', '');
  posterVideoElement.setAttribute('x-webkit-airplay', 'allow');
  posterVideoElement.setAttribute('muted', 'true');
  posterVideoElement.setAttribute('loop', '');
  posterVideoElement.setAttribute('autoplay', '');
  if (posterVideo) {
    moveInstrumentation(posterVideo, posterVideoElement);
    const source = document.createElement('source');
    source.src = posterVideo.textContent.trim();
    source.type = 'video/mp4';
    posterVideoElement.append(source);
  }
  posterDiv.append(posterVideoElement);

  const videoContainerDiv = document.createElement('div');
  videoContainerDiv.className = 'media-component-video-container show-controls media-component-video-hide';
  videoWrapperDiv.append(videoContainerDiv);

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'media-component-video-container__controls';
  videoContainerDiv.append(controlsDiv);

  const timerDiv = document.createElement('div');
  timerDiv.className = 'media-component-video-container__controls__timer';
  controlsDiv.append(timerDiv);

  const progressArea = document.createElement('div');
  progressArea.className = 'media-component-video-container__controls__timer__progress-area';
  timerDiv.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.className = 'media-component-video-container__controls__timer__progress-area__progress-bar';
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.className = 'media-component-video-container__controls__timer__progress-area__pointer';
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.className = 'media-component-video-container__controls__timer__progress-area__progress-pending';
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.className = 'media-component-video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  timerDiv.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'media-component-video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timerDiv.append(duration);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'media-component-video-container__controls__buttons';
  controlsDiv.append(buttonsDiv);

  const playButton2 = document.createElement('button');
  playButton2.className = 'media-component-video-container__controls__buttons__play-button media-component-video-container__controls__buttons--button';
  buttonsDiv.append(playButton2);

  const playIcon2 = document.createElement('span');
  playIcon2.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButton2.append(playIcon2);

  const muteButton = document.createElement('button');
  muteButton.className = 'media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button';
  buttonsDiv.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button';
  buttonsDiv.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);

  const mainVideoElement = document.createElement('video');
  mainVideoElement.className = 'media-component-video-container__video';
  mainVideoElement.setAttribute('playsinline', '');
  mainVideoElement.setAttribute('webkit-playsinline', '');
  mainVideoElement.setAttribute('muted', 'true');
  mainVideoElement.setAttribute('loop', '');
  mainVideoElement.setAttribute('autoplay', '');
  if (mainVideo) {
    moveInstrumentation(mainVideo, mainVideoElement);
    const source = document.createElement('source');
    source.src = mainVideo.textContent.trim();
    source.type = 'video/mp4';
    mainVideoElement.append(source);
  }
  videoContainerDiv.append(mainVideoElement);

  block.textContent = '';
  block.append(mediaComponentDiv);
}
