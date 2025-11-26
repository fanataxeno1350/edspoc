import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  const posterVideoSource = block.querySelector('[data-aue-prop="posterVideo"]');
  const mainVideoSource = block.querySelector('[data-aue-prop="mainVideo"]');

  const mediaComponent = document.createElement('div');
  mediaComponent.className = 'media-component';

  const background = document.createElement('div');
  background.className = 'media-component__background';
  mediaComponent.append(background);

  const wrapper = document.createElement('div');
  wrapper.className = 'media-component__wrapper media-component__wrapper--no-title';
  mediaComponent.append(wrapper);

  const header = document.createElement('div');
  header.className = 'media-component__header';
  wrapper.append(header);

  const heading = document.createElement('div');
  heading.className = 'media-component__heading';
  header.append(heading);

  const title = document.createElement('div');
  title.className = 'media-component__title';
  heading.append(title);

  const videoWrapper = document.createElement('div');
  videoWrapper.className = 'media-component-video-wrapper';
  wrapper.append(videoWrapper);

  // Poster Video
  const posterDiv = document.createElement('div');
  posterDiv.className = 'media-component-video-poster';
  videoWrapper.append(posterDiv);

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
  posterDiv.append(posterVideoElement);

  if (posterVideoSource) {
    const posterSource = document.createElement('source');
    posterSource.src = posterVideoSource.textContent.trim();
    posterSource.type = 'video/mp4';
    posterVideoElement.append(posterSource);
    moveInstrumentation(posterVideoSource, posterSource);
  }

  // Main Video Container
  const mainVideoContainer = document.createElement('div');
  mainVideoContainer.className = 'media-component-video-container show-controls media-component-video-hide';
  videoWrapper.append(mainVideoContainer);

  const controls = document.createElement('div');
  controls.className = 'media-component-video-container__controls';
  mainVideoContainer.append(controls);

  const timer = document.createElement('div');
  timer.className = 'media-component-video-container__controls__timer';
  controls.append(timer);

  const progressArea = document.createElement('div');
  progressArea.className = 'media-component-video-container__controls__timer__progress-area';
  timer.append(progressArea);

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
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'media-component-video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timer.append(duration);

  const buttons = document.createElement('div');
  buttons.className = 'media-component-video-container__controls__buttons';
  controls.append(buttons);

  const playButtonControls = document.createElement('button');
  playButtonControls.className = 'media-component-video-container__controls__buttons__play-button media-component-video-container__controls__buttons--button';
  buttons.append(playButtonControls);

  const playIconControls = document.createElement('span');
  playIconControls.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButtonControls.append(playIconControls);

  const muteButton = document.createElement('button');
  muteButton.className = 'media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button';
  buttons.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button';
  buttons.append(fullscreenButton);

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
  mainVideoContainer.append(mainVideoElement);

  if (mainVideoSource) {
    const mainSource = document.createElement('source');
    mainSource.src = mainVideoSource.textContent.trim();
    mainSource.type = 'video/mp4';
    mainVideoElement.append(mainSource);
    moveInstrumentation(mainVideoSource, mainSource);
  }

  block.textContent = '';
  block.append(mediaComponent);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
