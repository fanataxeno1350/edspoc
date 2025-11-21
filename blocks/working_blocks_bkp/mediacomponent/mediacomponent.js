import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const videoPosterSrc = block.children[0]?.children[1]?.textContent.trim();
  const mainVideoSrc = block.children[1]?.children[1]?.textContent.trim();

  block.textContent = '';

  const mediaComponentDiv = document.createElement('div');
  mediaComponentDiv.classList.add('media-component');
  moveInstrumentation(block, mediaComponentDiv);

  const backgroundDiv = document.createElement('div');
  backgroundDiv.classList.add('media-component__background');
  mediaComponentDiv.append(backgroundDiv);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('media-component__wrapper', 'media-component__wrapper--no-title');
  mediaComponentDiv.append(wrapperDiv);

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
  const posterDiv = document.createElement('div');
  posterDiv.classList.add('media-component-video-poster');
  videoWrapperDiv.append(posterDiv);

  const playButton = document.createElement('button');
  playButton.classList.add('media-component-video-poster__play-button');
  posterDiv.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.classList.add('media-component-video-poster__play-button__icon', 'qd-icon', 'qd-icon--play');
  playButton.append(playIcon);

  const playText = document.createElement('span');
  playText.classList.add('media-component-video-poster__play-button__text');
  playText.setAttribute('visually-hidden', '');
  playText.textContent = ' Watch Video ';
  playButton.append(playText);

  const posterVideo = document.createElement('video');
  posterVideo.classList.add('media-component-video-poster__video');
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('muted', 'true');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('autoplay', '');
  posterDiv.append(posterVideo);

  const posterSource = document.createElement('source');
  posterSource.setAttribute('src', videoPosterSrc);
  posterSource.setAttribute('type', 'video/mp4');
  posterVideo.append(posterSource);

  // Main Video Section
  const videoContainer = document.createElement('div');
  videoContainer.classList.add('media-component-video-container', 'show-controls', 'media-component-video-hide');
  videoWrapperDiv.append(videoContainer);

  const controlsDiv = document.createElement('div');
  controlsDiv.classList.add('media-component-video-container__controls');
  videoContainer.append(controlsDiv);

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

  const mainVideo = document.createElement('video');
  mainVideo.classList.add('media-component-video-container__video');
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('muted', 'true');
  mainVideo.setAttribute('loop', '');
  mainVideo.setAttribute('autoplay', '');
  videoContainer.append(mainVideo);

  const mainSource = document.createElement('source');
  mainSource.setAttribute('src', mainVideoSrc);
  mainSource.setAttribute('type', 'video/mp4');
  mainVideo.append(mainSource);

  block.append(mediaComponentDiv);
}
