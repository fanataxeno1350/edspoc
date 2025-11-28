import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const mediaComponent = document.createElement('div');
  mediaComponent.className = 'media-component';

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

  // Video Poster
  const videoPoster = document.createElement('div');
  videoPoster.className = 'media-component-video-poster';
  videoWrapper.append(videoPoster);

  const playButton = document.createElement('button');
  playButton.className = 'media-component-video-poster__play-button';
  videoPoster.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.className = 'media-component-video-poster__play-button__icon qd-icon qd-icon--play';
  playButton.append(playIcon);

  const playText = document.createElement('span');
  playText.className = 'media-component-video-poster__play-button__text';
  playText.setAttribute('visually-hidden', '');
  playText.textContent = ' Watch Video ';
  playButton.append(playText);

  const videoPosterSrc = block.querySelector('[data-aue-prop="videoPosterSrc"]');
  if (videoPosterSrc) {
    const posterVideo = document.createElement('video');
    posterVideo.className = 'media-component-video-poster__video';
    posterVideo.setAttribute('playsinline', '');
    posterVideo.setAttribute('webkit-playsinline', '');
    posterVideo.setAttribute('x-webkit-airplay', 'allow');
    posterVideo.setAttribute('muted', 'true');
    posterVideo.setAttribute('loop', '');
    posterVideo.setAttribute('autoplay', '');

    const posterSource = document.createElement('source');
    posterSource.setAttribute('src', videoPosterSrc.textContent.trim());
    posterSource.setAttribute('type', 'video/mp4');
    posterVideo.append(posterSource);
    videoPoster.append(posterVideo);
    moveInstrumentation(videoPosterSrc, posterSource);
  }

  // Main Video Container
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

  const playIconControls = document.createElement('span');
  playIconControls.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButtonControls.append(playIconControls);

  const muteButton = document.createElement('button');
  muteButton.className = 'media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button';
  buttons.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button';
  buttons.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);

  const mainVideoSrc = block.querySelector('[data-aue-prop="mainVideoSrc"]');
  if (mainVideoSrc) {
    const mainVideo = document.createElement('video');
    mainVideo.className = 'media-component-video-container__video';
    mainVideo.setAttribute('playsinline', '');
    mainVideo.setAttribute('webkit-playsinline', '');
    mainVideo.setAttribute('muted', 'true');
    mainVideo.setAttribute('loop', '');
    mainVideo.setAttribute('autoplay', '');
    mainVideo.setAttribute('x-webkit-airplay', 'allow');

    const mainSource = document.createElement('source');
    mainSource.setAttribute('src', mainVideoSrc.textContent.trim());
    mainSource.setAttribute('type', 'video/mp4');
    mainVideo.append(mainSource);
    videoContainer.append(mainVideo);
    moveInstrumentation(mainVideoSrc, mainSource);
  }

  block.textContent = '';
  block.append(mediaComponent);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}

function moveInstrumentation(source, target) {
  if (source && target) {
    const dataAueProp = source.getAttribute('data-aue-prop');
    const dataAueModel = source.getAttribute('data-aue-model');
    const dataAueBehavior = source.getAttribute('data-aue-behavior');

    if (dataAueProp) {
      target.setAttribute('data-aue-prop', dataAueProp);
    }
    if (dataAueModel) {
      target.setAttribute('data-aue-model', dataAueModel);
    }
    if (dataAueBehavior) {
      target.setAttribute('data-aue-behavior', dataAueBehavior);
    }
  }
}
