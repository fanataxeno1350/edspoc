import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const backgroundDiv = document.createElement('div');
  backgroundDiv.classList.add('media-component__background');
  moveInstrumentation(block.children[0], backgroundDiv);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('media-component__wrapper', 'media-component__wrapper--no-title');
  moveInstrumentation(block.children[1], wrapperDiv);

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('media-component__header');
  const headingDiv = document.createElement('div');
  headingDiv.classList.add('media-component__heading');
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('media-component__title');
  headingDiv.append(titleDiv);
  headerDiv.append(headingDiv);
  wrapperDiv.append(headerDiv);

  const videoWrapperDiv = document.createElement('div');
  videoWrapperDiv.classList.add('media-component-video-wrapper');

  const posterDiv = document.createElement('div');
  posterDiv.classList.add('media-component-video-poster');

  const playButton = document.createElement('button');
  playButton.classList.add('media-component-video-poster__play-button');
  const playIcon = document.createElement('span');
  playIcon.classList.add('media-component-video-poster__play-button__icon', 'qd-icon', 'qd-icon--play');
  const playText = document.createElement('span');
  playText.classList.add('media-component-video-poster__play-button__text');
  playText.setAttribute('visually-hidden', '');
  playText.textContent = ' Watch Video ';
  playButton.append(playIcon, playText);
  posterDiv.append(playButton);

  const posterVideo = document.createElement('video');
  posterVideo.classList.add('media-component-video-poster__video');
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('muted', 'true');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('autoplay', '');

  const mainVideoContainer = document.createElement('div');
  mainVideoContainer.classList.add('media-component-video-container', 'show-controls', 'media-component-video-hide');

  const controlsDiv = document.createElement('div');
  controlsDiv.classList.add('media-component-video-container__controls');

  const timerDiv = document.createElement('div');
  timerDiv.classList.add('media-component-video-container__controls__timer');
  const progressArea = document.createElement('div');
  progressArea.classList.add('media-component-video-container__controls__timer__progress-area');
  const progressBar = document.createElement('span');
  progressBar.classList.add('media-component-video-container__controls__timer__progress-area__progress-bar');
  const pointer = document.createElement('span');
  pointer.classList.add('media-component-video-container__controls__timer__progress-area__pointer');
  const progressPending = document.createElement('span');
  progressPending.classList.add('media-component-video-container__controls__timer__progress-area__progress-pending');
  progressArea.append(progressBar, pointer, progressPending);
  const currentTime = document.createElement('p');
  currentTime.classList.add('media-component-video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  const duration = document.createElement('p');
  duration.classList.add('media-component-video-container__controls__timer__duration');
  duration.textContent = '00:00';
  timerDiv.append(progressArea, currentTime, duration);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('media-component-video-container__controls__buttons');

  const createControlButton = (iconClass) => {
    const button = document.createElement('button');
    button.classList.add(`media-component-video-container__controls__buttons__${iconClass.split('--')[1]}-button`, 'media-component-video-container__controls__buttons--button');
    const icon = document.createElement('span');
    icon.classList.add('media-component-video-container__controls__buttons__icon', 'qd-icon', iconClass);
    button.append(icon);
    return button;
  };

  const playControlButton = createControlButton('qd-icon--play');
  const muteControlButton = createControlButton('qd-icon--volume');
  const fullscreenControlButton = createControlButton('qd-icon--fullscreen');
  buttonsDiv.append(playControlButton, muteControlButton, fullscreenControlButton);

  controlsDiv.append(timerDiv, buttonsDiv);
  mainVideoContainer.append(controlsDiv);

  const mainVideo = document.createElement('video');
  mainVideo.classList.add('media-component-video-container__video');
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('muted', 'true');
  mainVideo.setAttribute('loop', '');
  mainVideo.setAttribute('autoplay', '');
  mainVideo.setAttribute('x-webkit-airplay', 'allow');

  // Iterate through the block children to extract video sources
  [...block.children].forEach((row, index) => {
    // Assuming first cell is posterVideo and second is mainVideo
    const cells = [...row.children];
    if (cells.length > 0) {
      const posterVideoLink = cells[0].querySelector('a');
      if (posterVideoLink && posterVideoLink.href) {
        const posterSource = document.createElement('source');
        posterSource.src = posterVideoLink.href;
        posterSource.type = 'video/mp4';
        posterVideo.append(posterSource);
        moveInstrumentation(cells[0], posterVideo);
      }
    }
    if (cells.length > 1) {
      const mainVideoLink = cells[1].querySelector('a');
      if (mainVideoLink && mainVideoLink.href) {
        const mainSource = document.createElement('source');
        mainSource.src = mainVideoLink.href;
        mainSource.type = 'video/mp4';
        mainVideo.append(mainSource);
        moveInstrumentation(cells[1], mainVideo);
      }
    }
  });

  posterDiv.append(posterVideo);
  mainVideoContainer.append(mainVideo);
  videoWrapperDiv.append(posterDiv, mainVideoContainer);
  wrapperDiv.append(videoWrapperDiv);

  block.textContent = '';
  block.append(backgroundDiv, wrapperDiv);
}
