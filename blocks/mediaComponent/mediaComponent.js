import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
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

  const mainVideo = document.createElement('video');
  mainVideo.className = 'media-component-video-container__video';
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('muted', 'true');
  mainVideo.setAttribute('loop', '');
  mainVideo.setAttribute('autoplay', '');
  videoContainerDiv.append(mainVideo);

  // Extract content from block.children (the CMS rows)
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const videoPosterSrcCell = cells[0];
      const videoSrcCell = cells[1];

      const videoPosterLink = videoPosterSrcCell.querySelector('a');
      if (videoPosterLink && videoPosterLink.href) {
        const posterSource = document.createElement('source');
        posterSource.src = videoPosterLink.href;
        posterSource.type = 'video/mp4';
        posterVideo.append(posterSource);
        moveInstrumentation(videoPosterLink, posterSource);
      }

      const videoLink = videoSrcCell.querySelector('a');
      if (videoLink && videoLink.href) {
        const mainSource = document.createElement('source');
        mainSource.src = videoLink.href;
        mainSource.type = 'video/mp4';
        mainVideo.append(mainSource);
        moveInstrumentation(videoLink, mainSource);
      }
    }
  });

  block.textContent = '';
  block.append(mediaComponentDiv);
}
