import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mediaComponent = document.createElement('div');
  mediaComponent.classList.add('media-component');
  moveInstrumentation(block, mediaComponent);

  const background = document.createElement('div');
  background.classList.add('media-component__background');
  mediaComponent.append(background);

  const wrapper = document.createElement('div');
  wrapper.classList.add('media-component__wrapper', 'media-component__wrapper--no-title');
  mediaComponent.append(wrapper);

  const header = document.createElement('div');
  header.classList.add('media-component__header');
  wrapper.append(header);

  const heading = document.createElement('div');
  heading.classList.add('media-component__heading');
  header.append(heading);

  const title = document.createElement('div');
  title.classList.add('media-component__title');
  heading.append(title);

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('media-component-video-wrapper');
  wrapper.append(videoWrapper);

  const poster = document.createElement('div');
  poster.classList.add('media-component-video-poster');
  videoWrapper.append(poster);

  const playButton = document.createElement('button');
  playButton.classList.add('media-component-video-poster__play-button');
  poster.append(playButton);

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
  poster.append(posterVideo);

  const mainVideoContainer = document.createElement('div');
  mainVideoContainer.classList.add('media-component-video-container', 'show-controls', 'media-component-video-hide');
  videoWrapper.append(mainVideoContainer);

  const controls = document.createElement('div');
  controls.classList.add('media-component-video-container__controls');
  mainVideoContainer.append(controls);

  const timer = document.createElement('div');
  timer.classList.add('media-component-video-container__controls__timer');
  controls.append(timer);

  const progressBarArea = document.createElement('div');
  progressBarArea.classList.add('media-component-video-container__controls__timer__progress-area');
  timer.append(progressBarArea);

  const progressBar = document.createElement('span');
  progressBar.classList.add('media-component-video-container__controls__timer__progress-area__progress-bar');
  progressBarArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.classList.add('media-component-video-container__controls__timer__progress-area__pointer');
  progressBarArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.classList.add('media-component-video-container__controls__timer__progress-area__progress-pending');
  progressBarArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.classList.add('media-component-video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.classList.add('media-component-video-container__controls__timer__duration');
  duration.textContent = '00:00';
  timer.append(duration);

  const controlButtons = document.createElement('div');
  controlButtons.classList.add('media-component-video-container__controls__buttons');
  controls.append(controlButtons);

  const playControlButton = document.createElement('button');
  playControlButton.classList.add('media-component-video-container__controls__buttons__play-button', 'media-component-video-container__controls__buttons--button');
  controlButtons.append(playControlButton);

  const playControlIcon = document.createElement('span');
  playControlIcon.classList.add('media-component-video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--play');
  playControlButton.append(playControlIcon);

  const muteButton = document.createElement('button');
  muteButton.classList.add('media-component-video-container__controls__buttons__mute-button', 'media-component-video-container__controls__buttons--button');
  controlButtons.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.classList.add('media-component-video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--volume');
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('media-component-video-container__controls__buttons__fullscreen-button', 'media-component-video-container__controls__buttons--button');
  controlButtons.append(fullscreenButton);

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
  mainVideoContainer.append(mainVideo);

  // Process block children for video sources
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2) {
      const posterVideoCell = cells[0];
      const mainVideoCell = cells[1];

      const posterVideoSource = posterVideoCell.querySelector('a')?.href || posterVideoCell.textContent.trim();
      if (posterVideoSource) {
        const sourceElement = document.createElement('source');
        sourceElement.src = posterVideoSource;
        sourceElement.type = 'video/mp4';
        posterVideo.append(sourceElement);
      }

      const mainVideoSource = mainVideoCell.querySelector('a')?.href || mainVideoCell.textContent.trim();
      if (mainVideoSource) {
        const sourceElement = document.createElement('source');
        sourceElement.src = mainVideoSource;
        sourceElement.type = 'video/mp4';
        mainVideo.append(sourceElement);
      }
    }
  });

  block.textContent = '';
  block.append(mediaComponent);
}
