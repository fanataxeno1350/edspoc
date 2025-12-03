import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mediaWrapper = document.createElement('div');
  mediaWrapper.classList.add('media-wrapper', 'media-wrapper--no-title');
  moveInstrumentation(block, mediaWrapper);

  const mediaHeader = document.createElement('div');
  mediaHeader.classList.add('media-header');
  const mediaHeading = document.createElement('div');
  mediaHeading.classList.add('media-heading');
  const mediaTitle = document.createElement('div');
  mediaTitle.classList.add('media-title');
  mediaHeading.append(mediaTitle);
  mediaHeader.append(mediaHeading);

  const videoComponent = document.createElement('div');
  videoComponent.classList.add('video-component');

  // Poster Video section
  const videoPoster = document.createElement('div');
  videoPoster.classList.add('video-poster');

  const playButtonPoster = document.createElement('button');
  playButtonPoster.classList.add('video-poster__play-button');
  playButtonPoster.innerHTML = `
    <span class="qd-icon qd-icon--play video-poster__play-button__icon"></span>
    <span class="video-poster__play-button__text" visually-hidden=""> Watch Video </span>
  `;
  videoPoster.append(playButtonPoster);

  const posterVideoElement = document.createElement('video');
  posterVideoElement.classList.add('video-poster__video');
  posterVideoElement.setAttribute('playsinline', '');
  posterVideoElement.setAttribute('webkit-playsinline', '');
  posterVideoElement.setAttribute('x-webkit-airplay', 'allow');
  posterVideoElement.setAttribute('muted', 'true');
  posterVideoElement.setAttribute('loop', '');
  posterVideoElement.setAttribute('autoplay', '');

  let posterVideoSource = block.querySelector('[data-aue-prop="posterVideo"]');
  if (!posterVideoSource) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      posterVideoSource = anchor;
    }
  }

  if (posterVideoSource) {
    const source = document.createElement('source');
    source.setAttribute('src', posterVideoSource.href || posterVideoSource.textContent.trim());
    source.setAttribute('type', 'video/mp4'); // Assuming MP4, adjust if other types are possible
    posterVideoElement.append(source);
    moveInstrumentation(posterVideoSource, source);
  }
  videoPoster.append(posterVideoElement);
  videoComponent.append(videoPoster);

  // Main Video section
  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls', 'video-hide');

  const videoControls = document.createElement('div');
  videoControls.classList.add('video-container__controls');
  videoControls.innerHTML = `
    <div class="video-container__controls__timer">
      <div class="video-container__controls__timer__progress-area">
        <span class="video-container__controls__timer__progress-area__progress-bar"></span>
        <span class="video-container__controls__timer__progress-area__pointer"></span>
        <span class="video-container__controls__timer__progress-area__progress-pending"></span>
      </div>
      <p class="video-container__controls__timer__current-time">00:00</p>
      <p class="video-container__controls__timer__duration">00:00</p>
    </div>
    <div class="video-container__controls__buttons">
      <button class="video-container__controls__buttons__play-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span>
      </button>
      <button class="video-container__controls__buttons__mute-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>
      </button>
      <button class="video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>
      </button>
    </div>
  `;
  videoContainer.append(videoControls);

  const mainVideoElement = document.createElement('video');
  mainVideoElement.classList.add('video-container__video');
  mainVideoElement.setAttribute('playsinline', '');
  mainVideoElement.setAttribute('webkit-playsinline', '');
  mainVideoElement.setAttribute('muted', 'true');
  mainVideoElement.setAttribute('loop', '');
  mainVideoElement.setAttribute('autoplay', '');
  mainVideoElement.setAttribute('x-webkit-airplay', 'allow');

  let mainVideoSource = block.querySelector('[data-aue-prop="mainVideo"]');
  if (!mainVideoSource) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      mainVideoSource = anchor;
    }
  }

  if (mainVideoSource) {
    const source = document.createElement('source');
    source.setAttribute('src', mainVideoSource.href || mainVideoSource.textContent.trim());
    source.setAttribute('type', 'video/mp4'); // Assuming MP4, adjust if other types are possible
    mainVideoElement.append(source);
    moveInstrumentation(mainVideoSource, source);
  }
  videoContainer.append(mainVideoElement);
  videoComponent.append(videoContainer);

  mediaWrapper.append(mediaHeader, videoComponent);
  block.replaceChildren(mediaWrapper);
}
