import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoPosterSrcElement = block.querySelector(':scope > div:first-child > div');
  const mainVideoSrcElement = block.querySelector(':scope > div:nth-child(2) > div');

  const videoPosterSrc = videoPosterSrcElement ? videoPosterSrcElement.textContent.trim() : '';
  const mainVideoSrc = mainVideoSrcElement ? mainVideoSrcElement.textContent.trim() : '';

  const mediaComponent = document.createElement('div');
  mediaComponent.className = 'media-component';
  moveInstrumentation(block, mediaComponent);

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

  const videoPoster = document.createElement('div');
  videoPoster.className = 'media-component-video-poster';
  videoWrapper.append(videoPoster);

  const playButton = document.createElement('button');
  playButton.className = 'media-component-video-poster__play-button';
  videoPoster.append(playButton);

  const playButtonIcon = document.createElement('span');
  playButtonIcon.className = 'media-component-video-poster__play-button__icon qd-icon qd-icon--play';
  playButton.append(playButtonIcon);

  const playButtonText = document.createElement('span');
  playButtonText.className = 'media-component-video-poster__play-button__text';
  playButtonText.setAttribute('visually-hidden', '');
  playButtonText.textContent = ' Watch Video ';
  playButton.append(playButtonText);

  const posterVideo = document.createElement('video');
  posterVideo.className = 'media-component-video-poster__video';
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('muted', 'true');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('autoplay', '');
  const posterSource = document.createElement('source');
  posterSource.setAttribute('src', videoPosterSrc);
  posterSource.setAttribute('type', 'video/mp4');
  posterVideo.append(posterSource);
  videoPoster.append(posterVideo);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'media-component-video-container show-controls media-component-video-hide';
  videoWrapper.append(videoContainer);

  const controls = document.createElement('div');
  controls.className = 'media-component-video-container__controls';
  videoContainer.append(controls);

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

  const playButtonControlsIcon = document.createElement('span');
  playButtonControlsIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButtonControls.append(playButtonControlsIcon);

  const muteButton = document.createElement('button');
  muteButton.className = 'media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button';
  buttons.append(muteButton);

  const muteButtonIcon = document.createElement('span');
  muteButtonIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteButtonIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button';
  buttons.append(fullscreenButton);

  const fullscreenButtonIcon = document.createElement('span');
  fullscreenButtonIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenButtonIcon);

  const mainVideo = document.createElement('video');
  mainVideo.className = 'media-component-video-container__video';
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('muted', 'true');
  mainVideo.setAttribute('loop', '');
  mainVideo.setAttribute('autoplay', '');
  const mainSource = document.createElement('source');
  mainSource.setAttribute('src', mainVideoSrc);
  mainSource.setAttribute('type', 'video/mp4');
  mainVideo.append(mainSource);
  videoContainer.append(mainVideo);

  block.textContent = '';
  block.append(mediaComponent);

  // Remove the original content elements after extraction
  if (videoPosterSrcElement) videoPosterSrcElement.remove();
  if (mainVideoSrcElement) mainVideoSrcElement.remove();
}
