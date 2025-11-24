import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mediaComponentModel = {
    videoPosterSrc: null,
    videoSrc: null,
  };

  // Extract data from the block based on the model
  const rows = [...block.children];
  if (rows.length > 0) {
    const firstRowCells = [...rows[0].children];
    if (firstRowCells.length > 0) {
      const videoPosterSrcElement = firstRowCells[0];
      if (videoPosterSrcElement) {
        mediaComponentModel.videoPosterSrc = videoPosterSrcElement.textContent.trim();
      }
    }
    if (firstRowCells.length > 1) {
      const videoSrcElement = firstRowCells[1];
      if (videoSrcElement) {
        mediaComponentModel.videoSrc = videoSrcElement.textContent.trim();
      }
    }
  }

  // Reconstruct the DOM
  const mediaComponentDiv = document.createElement('div');
  mediaComponentDiv.className = 'media-component';
  moveInstrumentation(block, mediaComponentDiv);

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

  const videoPosterDiv = document.createElement('div');
  videoPosterDiv.className = 'media-component-video-poster';
  videoWrapperDiv.append(videoPosterDiv);

  const playButton = document.createElement('button');
  playButton.className = 'media-component-video-poster__play-button';
  videoPosterDiv.append(playButton);

  const playIconSpan = document.createElement('span');
  playIconSpan.className = 'media-component-video-poster__play-button__icon qd-icon qd-icon--play';
  playButton.append(playIconSpan);

  const playTextSpan = document.createElement('span');
  playTextSpan.className = 'media-component-video-poster__play-button__text';
  playTextSpan.setAttribute('visually-hidden', '');
  playTextSpan.textContent = ' Watch Video ';
  playButton.append(playTextSpan);

  const posterVideo = document.createElement('video');
  posterVideo.className = 'media-component-video-poster__video';
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('muted', 'true');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('autoplay', '');
  if (mediaComponentModel.videoPosterSrc) {
    const posterSource = document.createElement('source');
    posterSource.src = mediaComponentModel.videoPosterSrc;
    posterSource.type = 'video/mp4';
    posterVideo.append(posterSource);
  }
  videoPosterDiv.append(posterVideo);

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

  const playIconControlsSpan = document.createElement('span');
  playIconControlsSpan.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButtonControls.append(playIconControlsSpan);

  const muteButtonControls = document.createElement('button');
  muteButtonControls.className = 'media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button';
  buttonsDiv.append(muteButtonControls);

  const muteIconControlsSpan = document.createElement('span');
  muteIconControlsSpan.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButtonControls.append(muteIconControlsSpan);

  const fullscreenButtonControls = document.createElement('button');
  fullscreenButtonControls.className = 'media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button';
  buttonsDiv.append(fullscreenButtonControls);

  const fullscreenIconControlsSpan = document.createElement('span');
  fullscreenIconControlsSpan.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButtonControls.append(fullscreenIconControlsSpan);

  const mainVideo = document.createElement('video');
  mainVideo.className = 'media-component-video-container__video';
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('muted', 'true');
  mainVideo.setAttribute('loop', '');
  mainVideo.setAttribute('autoplay', '');
  mainVideo.setAttribute('x-webkit-airplay', 'allow');
  if (mediaComponentModel.videoSrc) {
    const mainSource = document.createElement('source');
    mainSource.src = mediaComponentModel.videoSrc;
    mainSource.type = 'video/mp4';
    mainVideo.append(mainSource);
  }
  videoContainerDiv.append(mainVideo);

  block.textContent = '';
  block.append(mediaComponentDiv);
}
