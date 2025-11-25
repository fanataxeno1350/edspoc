import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const posterVideoRef = block.querySelector(':scope > div:first-child > div');
  const mainVideoRef = block.querySelector(':scope > div:nth-child(2) > div');

  const posterVideo = posterVideoRef ? posterVideoRef.textContent.trim() : '';
  const mainVideo = mainVideoRef ? mainVideoRef.textContent.trim() : '';

  const mediaComponentDiv = document.createElement('div');
  mediaComponentDiv.className = 'media-component';

  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'media-component__background';
  mediaComponentDiv.append(backgroundDiv);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'media-component__wrapper media-component__wrapper--no-title';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'media-component__header';

  const headingDiv = document.createElement('div');
  headingDiv.className = 'media-component__heading';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'media-component__title';
  headingDiv.append(titleDiv);
  headerDiv.append(headingDiv);
  wrapperDiv.append(headerDiv);

  const videoWrapperDiv = document.createElement('div');
  videoWrapperDiv.className = 'media-component-video-wrapper';

  const videoPosterDiv = document.createElement('div');
  videoPosterDiv.className = 'media-component-video-poster';

  const playButton = document.createElement('button');
  playButton.className = 'media-component-video-poster__play-button';

  const playIconSpan = document.createElement('span');
  playIconSpan.className = 'media-component-video-poster__play-button__icon qd-icon qd-icon--play';
  playButton.append(playIconSpan);

  const playTextSpan = document.createElement('span');
  playTextSpan.className = 'media-component-video-poster__play-button__text';
  playTextSpan.setAttribute('visually-hidden', '');
  playTextSpan.textContent = ' Watch Video ';
  playButton.append(playTextSpan);
  videoPosterDiv.append(playButton);

  const posterVideoElement = document.createElement('video');
  posterVideoElement.className = 'media-component-video-poster__video';
  posterVideoElement.setAttribute('playsinline', '');
  posterVideoElement.setAttribute('webkit-playsinline', '');
  posterVideoElement.setAttribute('x-webkit-airplay', 'allow');
  posterVideoElement.setAttribute('muted', 'true');
  posterVideoElement.setAttribute('loop', '');
  posterVideoElement.setAttribute('autoplay', '');

  const posterSource = document.createElement('source');
  posterSource.setAttribute('src', posterVideo);
  posterSource.setAttribute('type', 'video/mp4');
  posterVideoElement.append(posterSource);
  videoPosterDiv.append(posterVideoElement);
  videoWrapperDiv.append(videoPosterDiv);

  const videoContainerDiv = document.createElement('div');
  videoContainerDiv.className = 'media-component-video-container show-controls media-component-video-hide';

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'media-component-video-container__controls';

  const timerDiv = document.createElement('div');
  timerDiv.className = 'media-component-video-container__controls__timer';

  const progressAreaDiv = document.createElement('div');
  progressAreaDiv.className = 'media-component-video-container__controls__timer__progress-area';

  const progressBarSpan = document.createElement('span');
  progressBarSpan.className = 'media-component-video-container__controls__timer__progress-area__progress-bar';
  progressAreaDiv.append(progressBarSpan);

  const pointerSpan = document.createElement('span');
  pointerSpan.className = 'media-component-video-container__controls__timer__progress-area__pointer';
  progressAreaDiv.append(pointerSpan);

  const progressPendingSpan = document.createElement('span');
  progressPendingSpan.className = 'media-component-video-container__controls__timer__progress-area__progress-pending';
  progressAreaDiv.append(progressPendingSpan);
  timerDiv.append(progressAreaDiv);

  const currentTimeP = document.createElement('p');
  currentTimeP.className = 'media-component-video-container__controls__timer__current-time';
  currentTimeP.textContent = '00:00';
  timerDiv.append(currentTimeP);

  const durationP = document.createElement('p');
  durationP.className = 'media-component-video-container__controls__timer__duration';
  durationP.textContent = '00:00';
  timerDiv.append(durationP);
  controlsDiv.append(timerDiv);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'media-component-video-container__controls__buttons';

  const playButtonControls = document.createElement('button');
  playButtonControls.className = 'media-component-video-container__controls__buttons__play-button media-component-video-container__controls__buttons--button';
  const playIconControls = document.createElement('span');
  playIconControls.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButtonControls.append(playIconControls);
  buttonsDiv.append(playButtonControls);

  const muteButton = document.createElement('button');
  muteButton.className = 'media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button';
  const muteIcon = document.createElement('span');
  muteIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);
  buttonsDiv.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button';
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);
  buttonsDiv.append(fullscreenButton);
  controlsDiv.append(buttonsDiv);
  videoContainerDiv.append(controlsDiv);

  const mainVideoElement = document.createElement('video');
  mainVideoElement.className = 'media-component-video-container__video';
  mainVideoElement.setAttribute('playsinline', '');
  mainVideoElement.setAttribute('webkit-playsinline', '');
  mainVideoElement.setAttribute('muted', 'true');
  mainVideoElement.setAttribute('loop', '');
  mainVideoElement.setAttribute('autoplay', '');

  const mainSource = document.createElement('source');
  mainSource.setAttribute('src', mainVideo);
  mainSource.setAttribute('type', 'video/mp4');
  mainVideoElement.append(mainSource);
  videoContainerDiv.append(mainVideoElement);
  videoWrapperDiv.append(videoContainerDiv);
  wrapperDiv.append(videoWrapperDiv);
  mediaComponentDiv.append(wrapperDiv);

  moveInstrumentation(block.firstElementChild, mediaComponentDiv.querySelector('.media-component-video-poster video source'));
  moveInstrumentation(block.lastElementChild, mediaComponentDiv.querySelector('.media-component-video-container video source'));

  block.textContent = '';
  block.append(mediaComponentDiv);
}
