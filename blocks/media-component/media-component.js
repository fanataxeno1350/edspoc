import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const posterVideoSrc = block.querySelector('div:nth-child(1) > div:nth-child(2)')?.textContent.trim();
  const mainVideoSrc = block.querySelector('div:nth-child(2) > div:nth-child(2)')?.textContent.trim();

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

  const posterDiv = document.createElement('div');
  posterDiv.className = 'media-component-video-poster';

  const playButton = document.createElement('button');
  playButton.className = 'media-component-video-poster__play-button';
  const playIcon = document.createElement('span');
  playIcon.className = 'media-component-video-poster__play-button__icon qd-icon qd-icon--play';
  const playText = document.createElement('span');
  playText.className = 'media-component-video-poster__play-button__text';
  playText.setAttribute('visually-hidden', '');
  playText.textContent = ' Watch Video ';
  playButton.append(playIcon, playText);
  posterDiv.append(playButton);

  const posterVideo = document.createElement('video');
  posterVideo.className = 'media-component-video-poster__video';
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('muted', 'true');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('autoplay', '');
  if (posterVideoSrc) {
    const posterSource = document.createElement('source');
    posterSource.setAttribute('src', posterVideoSrc);
    posterSource.setAttribute('type', 'video/mp4');
    posterVideo.append(posterSource);
  }
  posterDiv.append(posterVideo);
  videoWrapperDiv.append(posterDiv);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'media-component-video-container show-controls media-component-video-hide';

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'media-component-video-container__controls';

  const timerDiv = document.createElement('div');
  timerDiv.className = 'media-component-video-container__controls__timer';
  const progressArea = document.createElement('div');
  progressArea.className = 'media-component-video-container__controls__timer__progress-area';
  const progressBar = document.createElement('span');
  progressBar.className = 'media-component-video-container__controls__timer__progress-area__progress-bar';
  const pointer = document.createElement('span');
  pointer.className = 'media-component-video-container__controls__timer__progress-area__pointer';
  const progressPending = document.createElement('span');
  progressPending.className = 'media-component-video-container__controls__timer__progress-area__progress-pending';
  progressArea.append(progressBar, pointer, progressPending);
  const currentTime = document.createElement('p');
  currentTime.className = 'media-component-video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  const duration = document.createElement('p');
  duration.className = 'media-component-video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timerDiv.append(progressArea, currentTime, duration);
  controlsDiv.append(timerDiv);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'media-component-video-container__controls__buttons';

  const playButtonControls = document.createElement('button');
  playButtonControls.className = 'media-component-video-container__controls__buttons__play-button media-component-video-container__controls__buttons--button';
  const playIconControls = document.createElement('span');
  playIconControls.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButtonControls.append(playIconControls);

  const muteButton = document.createElement('button');
  muteButton.className = 'media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button';
  const muteIcon = document.createElement('span');
  muteIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button';
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);

  buttonsDiv.append(playButtonControls, muteButton, fullscreenButton);
  controlsDiv.append(buttonsDiv);
  videoContainer.append(controlsDiv);

  const mainVideo = document.createElement('video');
  mainVideo.className = 'media-component-video-container__video';
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('muted', 'true');
  mainVideo.setAttribute('loop', '');
  mainVideo.setAttribute('autoplay', '');
  if (mainVideoSrc) {
    const mainSource = document.createElement('source');
    mainSource.setAttribute('src', mainVideoSrc);
    mainSource.setAttribute('type', 'video/mp4');
    mainVideo.append(mainSource);
  }
  mainVideo.setAttribute('x-webkit-airplay', 'allow');
  videoContainer.append(mainVideo);
  videoWrapperDiv.append(videoContainer);

  wrapperDiv.append(videoWrapperDiv);
  mediaComponentDiv.append(wrapperDiv);

  block.textContent = '';
  block.append(mediaComponentDiv);
}
