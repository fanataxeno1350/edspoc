import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mediaComponentDiv = document.createElement('div');
  mediaComponentDiv.classList.add('media-component');
  moveInstrumentation(block, mediaComponentDiv);

  const mediaBackgroundDiv = document.createElement('div');
  mediaBackgroundDiv.classList.add('media-background');
  mediaComponentDiv.append(mediaBackgroundDiv);

  const mediaWrapperDiv = document.createElement('div');
  mediaWrapperDiv.classList.add('media-wrapper', 'media-wrapper--no-title');
  mediaComponentDiv.append(mediaWrapperDiv);

  const mediaHeaderDiv = document.createElement('div');
  mediaHeaderDiv.classList.add('media-header');
  mediaWrapperDiv.append(mediaHeaderDiv);

  const mediaHeadingDiv = document.createElement('div');
  mediaHeadingDiv.classList.add('media-heading');
  mediaHeaderDiv.append(mediaHeadingDiv);

  const mediaTitleDiv = document.createElement('div');
  mediaTitleDiv.classList.add('media-title');
  mediaHeadingDiv.append(mediaTitleDiv);

  const mediaVideoDiv = document.createElement('div');
  mediaVideoDiv.classList.add('media-video');
  mediaWrapperDiv.append(mediaVideoDiv);

  const mediaVideoPosterDiv = document.createElement('div');
  mediaVideoPosterDiv.classList.add('media-video-poster');
  mediaVideoDiv.append(mediaVideoPosterDiv);

  const playButton = document.createElement('button');
  playButton.classList.add('media-video-poster__play-button');
  mediaVideoPosterDiv.append(playButton);

  const playIconSpan = document.createElement('span');
  playIconSpan.classList.add('qd-icon', 'qd-icon--play', 'media-video-poster__play-button__icon');
  playButton.append(playIconSpan);

  const playTextSpan = document.createElement('span');
  playTextSpan.classList.add('media-video-poster__play-button__text');
  playTextSpan.setAttribute('visually-hidden', '');
  playTextSpan.textContent = ' Watch Video ';
  playButton.append(playTextSpan);

  const posterVideoElement = document.createElement('video');
  posterVideoElement.classList.add('media-video-poster__video');
  posterVideoElement.setAttribute('playsinline', '');
  posterVideoElement.setAttribute('webkit-playsinline', '');
  posterVideoElement.setAttribute('x-webkit-airplay', 'allow');
  posterVideoElement.setAttribute('muted', 'true');
  posterVideoElement.setAttribute('loop', '');
  posterVideoElement.setAttribute('autoplay', '');
  mediaVideoPosterDiv.append(posterVideoElement);

  const mediaVideoContainerDiv = document.createElement('div');
  mediaVideoContainerDiv.classList.add('media-video-container', 'show-controls', 'media-video-hide');
  mediaVideoDiv.append(mediaVideoContainerDiv);

  const mediaVideoControlsDiv = document.createElement('div');
  mediaVideoControlsDiv.classList.add('media-video-container__controls');
  mediaVideoContainerDiv.append(mediaVideoControlsDiv);

  const timerDiv = document.createElement('div');
  timerDiv.classList.add('media-video-container__controls__timer');
  mediaVideoControlsDiv.append(timerDiv);

  const progressAreaDiv = document.createElement('div');
  progressAreaDiv.classList.add('media-video-container__controls__timer__progress-area');
  timerDiv.append(progressAreaDiv);

  const progressBarSpan = document.createElement('span');
  progressBarSpan.classList.add('media-video-container__controls__timer__progress-area__progress-bar');
  progressAreaDiv.append(progressBarSpan);

  const pointerSpan = document.createElement('span');
  pointerSpan.classList.add('media-video-container__controls__timer__progress-area__pointer');
  progressAreaDiv.append(pointerSpan);

  const progressPendingSpan = document.createElement('span');
  progressPendingSpan.classList.add('media-video-container__controls__timer__progress-area__progress-pending');
  progressAreaDiv.append(progressPendingSpan);

  const currentTimeP = document.createElement('p');
  currentTimeP.classList.add('media-video-container__controls__timer__current-time');
  currentTimeP.textContent = '00:00';
  timerDiv.append(currentTimeP);

  const durationP = document.createElement('p');
  durationP.classList.add('media-video-container__controls__timer__duration');
  durationP.textContent = '00:00';
  timerDiv.append(durationP);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('media-video-container__controls__buttons');
  mediaVideoControlsDiv.append(buttonsDiv);

  const playButtonControls = document.createElement('button');
  playButtonControls.classList.add('media-video-container__controls__buttons__play-button', 'media-video-container__controls__buttons--button');
  buttonsDiv.append(playButtonControls);

  const playIconControlsSpan = document.createElement('span');
  playIconControlsSpan.classList.add('media-video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--play');
  playButtonControls.append(playIconControlsSpan);

  const muteButton = document.createElement('button');
  muteButton.classList.add('media-video-container__controls__buttons__mute-button', 'media-video-container__controls__buttons--button');
  buttonsDiv.append(muteButton);

  const muteIconSpan = document.createElement('span');
  muteIconSpan.classList.add('media-video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--volume');
  muteButton.append(muteIconSpan);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('media-video-container__controls__buttons__fullscreen-button', 'media-video-container__controls__buttons--button');
  buttonsDiv.append(fullscreenButton);

  const fullscreenIconSpan = document.createElement('span');
  fullscreenIconSpan.classList.add('media-video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--fullscreen');
  fullscreenButton.append(fullscreenIconSpan);

  const mainVideoElement = document.createElement('video');
  mainVideoElement.classList.add('media-video-container__video');
  mainVideoElement.setAttribute('playsinline', '');
  mainVideoElement.setAttribute('webkit-playsinline', '');
  mainVideoElement.setAttribute('muted', 'true');
  mainVideoElement.setAttribute('loop', '');
  mainVideoElement.setAttribute('autoplay', '');
  mediaVideoContainerDiv.append(mainVideoElement);

  // Extract content from block children
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length > 0) {
      const posterVideoCell = cells[0];
      const mainVideoCell = cells[1];

      const posterVideoSource = posterVideoCell.textContent.trim();
      if (posterVideoSource) {
        const sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', posterVideoSource);
        sourceElement.setAttribute('type', 'video/mp4');
        posterVideoElement.append(sourceElement);
      }

      const mainVideoSource = mainVideoCell.textContent.trim();
      if (mainVideoSource) {
        const sourceElement = document.createElement('source');
        sourceElement.setAttribute('src', mainVideoSource);
        sourceElement.setAttribute('type', 'video/mp4');
        mainVideoElement.append(sourceElement);
      }
    }
  });

  block.textContent = '';
  block.append(mediaComponentDiv);
}
