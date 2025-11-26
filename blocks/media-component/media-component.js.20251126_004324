import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const posterVideoSource = block.querySelector('[data-aue-prop="posterVideo"]');
  const mainVideoSource = block.querySelector('[data-aue-prop="mainVideo"]');
  const watchVideoLabel = block.querySelector('[data-aue-prop="watchVideoLabel"]');

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
  headingDiv.append(titleDiv);

  const videoWrapperDiv = document.createElement('div');
  videoWrapperDiv.className = 'media-component-video-wrapper';
  wrapperDiv.append(videoWrapperDiv);

  // Poster Video Section
  const posterDiv = document.createElement('div');
  posterDiv.className = 'media-component-video-poster';
  videoWrapperDiv.append(posterDiv);

  const playButton = document.createElement('button');
  playButton.className = 'media-component-video-poster__play-button';
  posterDiv.append(playButton);

  const playIconSpan = document.createElement('span');
  playIconSpan.className = 'media-component-video-poster__play-button__icon qd-icon qd-icon--play';
  playButton.append(playIconSpan);

  const playTextSpan = document.createElement('span');
  playTextSpan.className = 'media-component-video-poster__play-button__text';
  playTextSpan.setAttribute('visually-hidden', '');
  if (watchVideoLabel) {
    playTextSpan.append(...watchVideoLabel.childNodes);
    moveInstrumentation(watchVideoLabel, playTextSpan);
  } else {
    playTextSpan.textContent = ' Watch Video ';
  }
  playButton.append(playTextSpan);

  const posterVideoElement = document.createElement('video');
  posterVideoElement.className = 'media-component-video-poster__video';
  posterVideoElement.setAttribute('playsinline', '');
  posterVideoElement.setAttribute('webkit-playsinline', '');
  posterVideoElement.setAttribute('x-webkit-airplay', 'allow');
  posterVideoElement.setAttribute('muted', 'true');
  posterVideoElement.setAttribute('loop', '');
  posterVideoElement.setAttribute('autoplay', '');
  posterDiv.append(posterVideoElement);

  const posterSource = document.createElement('source');
  if (posterVideoSource) {
    posterSource.src = posterVideoSource.textContent.trim();
    moveInstrumentation(posterVideoSource, posterSource);
  } else {
    posterSource.src = '/content/dam/aemigrate/uploaded-folder/video/SetPlayFree_EN_POSTER_16x9_720p_nobars_weboptimised.mp4';
  }
  posterSource.type = 'video/mp4';
  posterVideoElement.append(posterSource);

  // Main Video Section
  const videoContainerDiv = document.createElement('div');
  videoContainerDiv.className = 'media-component-video-container show-controls media-component-video-hide';
  videoWrapperDiv.append(videoContainerDiv);

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'media-component-video-container__controls';
  videoContainerDiv.append(controlsDiv);

  const timerDiv = document.createElement('div');
  timerDiv.className = 'media-component-video-container__controls__timer';
  controlsDiv.append(timerDiv);

  const progressAreaDiv = document.createElement('div');
  progressAreaDiv.className = 'media-component-video-container__controls__timer__progress-area';
  timerDiv.append(progressAreaDiv);

  const progressBarSpan = document.createElement('span');
  progressBarSpan.className = 'media-component-video-container__controls__timer__progress-area__progress-bar';
  progressAreaDiv.append(progressBarSpan);

  const pointerSpan = document.createElement('span');
  pointerSpan.className = 'media-component-video-container__controls__timer__progress-area__pointer';
  progressAreaDiv.append(pointerSpan);

  const progressPendingSpan = document.createElement('span');
  progressPendingSpan.className = 'media-component-video-container__controls__timer__progress-area__progress-pending';
  progressAreaDiv.append(progressPendingSpan);

  const currentTimeP = document.createElement('p');
  currentTimeP.className = 'media-component-video-container__controls__timer__current-time';
  currentTimeP.textContent = '00:00';
  timerDiv.append(currentTimeP);

  const durationP = document.createElement('p');
  durationP.className = 'media-component-video-container__controls__timer__duration';
  durationP.textContent = '00:00';
  timerDiv.append(durationP);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'media-component-video-container__controls__buttons';
  controlsDiv.append(buttonsDiv);

  const playButtonControls = document.createElement('button');
  playButtonControls.className = 'media-component-video-container__controls__buttons__play-button media-component-video-container__controls__buttons--button';
  buttonsDiv.append(playButtonControls);

  const playIconControls = document.createElement('span');
  playIconControls.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButtonControls.append(playIconControls);

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
  mainVideoElement.setAttribute('x-webkit-airplay', 'allow'); // Added missing attribute
  videoContainerDiv.append(mainVideoElement);

  const mainSource = document.createElement('source');
  if (mainVideoSource) {
    mainSource.src = mainVideoSource.textContent.trim();
    moveInstrumentation(mainVideoSource, mainSource);
  } else {
    mainSource.src = '/content/dam/aemigrate/uploaded-folder/video/SetPlayFree_EN_16x9_1080p_90s_nobars.mp4';
  }
  mainSource.type = 'video/mp4';
  mainVideoElement.append(mainSource);

  block.textContent = '';
  block.append(mediaComponentDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
