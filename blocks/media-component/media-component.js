import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const background = block.querySelector('[data-aue-prop="background"]');
  const posterVideo = block.querySelector('[data-aue-prop="posterVideo"]');
  const mainVideo = block.querySelector('[data-aue-prop="mainVideo"]');

  const mediaComponentDiv = document.createElement('div');
  mediaComponentDiv.className = 'media-component';

  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'media-component__background';
  if (background) {
    moveInstrumentation(background, backgroundDiv);
    backgroundDiv.append(...background.children);
  }
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

  // Poster Video Section
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

  const posterVideoElement = document.createElement('video');
  posterVideoElement.className = 'media-component-video-poster__video';
  posterVideoElement.setAttribute('playsinline', '');
  posterVideoElement.setAttribute('webkit-playsinline', '');
  posterVideoElement.setAttribute('x-webkit-airplay', 'allow');
  posterVideoElement.setAttribute('muted', 'true');
  posterVideoElement.setAttribute('loop', '');
  posterVideoElement.setAttribute('autoplay', '');
  if (posterVideo) {
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('type', 'video/mp4');
    sourceElement.setAttribute('src', posterVideo.textContent.trim());
    moveInstrumentation(posterVideo, sourceElement);
    posterVideoElement.append(sourceElement);
  }
  posterDiv.append(posterVideoElement);
  videoWrapperDiv.append(posterDiv);

  // Main Video Section
  const videoContainerDiv = document.createElement('div');
  videoContainerDiv.className = 'media-component-video-container show-controls media-component-video-hide';

  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'media-component-video-container__controls';

  const timerDiv = document.createElement('div');
  timerDiv.className = 'media-component-video-container__controls__timer';
  const progressArea = document.createElement('div');
  progressArea.className = 'media-component-video-container__controls__timer__progress-area';
  progressArea.innerHTML = `
    <span class="media-component-video-container__controls__timer__progress-area__progress-bar"></span>
    <span class="media-component-video-container__controls__timer__progress-area__pointer"></span>
    <span class="media-component-video-container__controls__timer__progress-area__progress-pending"></span>
  `;
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
  buttonsDiv.innerHTML = `
    <button class="media-component-video-container__controls__buttons__play-button media-component-video-container__controls__buttons--button">
      <span class="media-component-video-container__controls__buttons__icon qd-icon qd-icon--play"></span>
    </button>
    <button class="media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button">
      <span class="media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>
    </button>
    <button class="media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button">
      <span class="media-component-video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>
    </button>
  `;
  controlsDiv.append(buttonsDiv);
  videoContainerDiv.append(controlsDiv);

  const mainVideoElement = document.createElement('video');
  mainVideoElement.className = 'media-component-video-container__video';
  mainVideoElement.setAttribute('playsinline', '');
  mainVideoElement.setAttribute('webkit-playsinline', '');
  mainVideoElement.setAttribute('muted', 'true');
  mainVideoElement.setAttribute('loop', '');
  mainVideoElement.setAttribute('autoplay', '');
  mainVideoElement.setAttribute('x-webkit-airplay', 'allow'); // Added from expected HTML
  if (mainVideo) {
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('type', 'video/mp4');
    sourceElement.setAttribute('src', mainVideo.textContent.trim());
    moveInstrumentation(mainVideo, sourceElement);
    mainVideoElement.append(sourceElement);
  }
  videoContainerDiv.append(mainVideoElement);
  videoWrapperDiv.append(videoContainerDiv);

  wrapperDiv.append(videoWrapperDiv);
  mediaComponentDiv.append(wrapperDiv);

  block.textContent = '';
  block.append(mediaComponentDiv);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
