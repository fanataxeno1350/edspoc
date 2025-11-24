import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mediaComponentWrapper = document.createElement('div');
  mediaComponentWrapper.className = 'media-component__wrapper media-component__wrapper--no-title';

  const mediaComponentHeader = document.createElement('div');
  mediaComponentHeader.className = 'media-component__header';
  const mediaComponentHeading = document.createElement('div');
  mediaComponentHeading.className = 'media-component__heading';
  const mediaComponentTitle = document.createElement('div');
  mediaComponentTitle.className = 'media-component__title';
  mediaComponentHeading.append(mediaComponentTitle);
  mediaComponentHeader.append(mediaComponentHeading);

  const mediaComponentVideoWrapper = document.createElement('div');
  mediaComponentVideoWrapper.className = 'media-component-video-wrapper';

  // Video Poster
  const videoPosterDiv = document.createElement('div');
  videoPosterDiv.className = 'media-component-video-poster';

  const playButton = document.createElement('button');
  playButton.className = 'media-component-video-poster__play-button';
  const playIcon = document.createElement('span');
  playIcon.className = 'media-component-video-poster__play-button__icon qd-icon qd-icon--play';
  const playText = document.createElement('span');
  playText.className = 'media-component-video-poster__play-button__text';
  playText.setAttribute('visually-hidden', '');
  playText.textContent = ' Watch Video ';
  playButton.append(playIcon, playText);

  const videoPosterElement = document.createElement('video');
  videoPosterElement.className = 'media-component-video-poster__video';
  videoPosterElement.setAttribute('playsinline', '');
  videoPosterElement.setAttribute('webkit-playsinline', '');
  videoPosterElement.setAttribute('x-webkit-airplay', 'allow');
  videoPosterElement.setAttribute('muted', 'true');
  videoPosterElement.setAttribute('loop', '');
  videoPosterElement.setAttribute('autoplay', '');

  const videoPosterSource = block.querySelector('source[src*="SetPlayFree_EN_POSTER"]');
  if (videoPosterSource) {
    const newSource = document.createElement('source');
    newSource.src = videoPosterSource.src;
    newSource.type = videoPosterSource.type;
    videoPosterElement.append(newSource);
    moveInstrumentation(videoPosterSource, newSource);
  }

  videoPosterDiv.append(playButton, videoPosterElement);

  // Video Main Container
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
  controlsDiv.append(timerDiv, buttonsDiv);

  const videoMainElement = document.createElement('video');
  videoMainElement.className = 'media-component-video-container__video';
  videoMainElement.setAttribute('playsinline', '');
  videoMainElement.setAttribute('webkit-playsinline', '');
  videoMainElement.setAttribute('muted', 'true');
  videoMainElement.setAttribute('loop', '');
  videoMainElement.setAttribute('autoplay', '');

  const videoMainSource = block.querySelector('source[src*="SetPlayFree_EN_16x9"]');
  if (videoMainSource) {
    const newSource = document.createElement('source');
    newSource.src = videoMainSource.src;
    newSource.type = videoMainSource.type;
    videoMainElement.append(newSource);
    moveInstrumentation(videoMainSource, newSource);
  }

  videoContainerDiv.append(controlsDiv, videoMainElement);

  mediaComponentVideoWrapper.append(videoPosterDiv, videoContainerDiv);
  mediaComponentWrapper.append(mediaComponentHeader, mediaComponentVideoWrapper);

  // Create the final root element
  const finalRootElement = document.createElement('div');
  finalRootElement.className = 'media-component';

  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'media-component__background';

  finalRootElement.append(backgroundDiv, mediaComponentWrapper);

  // Replace the block content
  block.textContent = '';
  block.append(finalRootElement);
}
