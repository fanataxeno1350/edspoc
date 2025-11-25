import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

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

  // Video Poster Section
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
  
  const authoredWatchVideoText = block.querySelector('[data-aue-prop="watchVideoText"]');
  if (authoredWatchVideoText) {
    playButtonText.textContent = authoredWatchVideoText.textContent;
    moveInstrumentation(authoredWatchVideoText, playButtonText);
  } else {
    playButtonText.textContent = 'Watch Video';
  }
  playButton.append(playButtonText);

  const posterVideo = document.createElement('video');
  posterVideo.className = 'media-component-video-poster__video';
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('muted', 'true');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('autoplay', '');
  videoPoster.append(posterVideo);

  const posterSource = document.createElement('source');
  posterSource.setAttribute('type', 'video/mp4');

  const authoredVideoPosterSrc = block.querySelector('[data-aue-prop="videoPosterSrc"]');
  if (authoredVideoPosterSrc) {
    posterSource.setAttribute('src', authoredVideoPosterSrc.textContent);
    moveInstrumentation(authoredVideoPosterSrc, posterSource);
  } // else: if no authored content, src will be empty, which is fine.
  posterVideo.append(posterSource);

  // Main Video Container Section
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

  const muteButtonControls = document.createElement('button');
  muteButtonControls.className = 'media-component-video-container__controls__buttons__mute-button media-component-video-container__controls__buttons--button';
  buttons.append(muteButtonControls);

  const muteIconControls = document.createElement('span');
  muteIconControls.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButtonControls.append(muteIconControls);

  const fullscreenButtonControls = document.createElement('button');
  fullscreenButtonControls.className = 'media-component-video-container__controls__buttons__fullscreen-button media-component-video-container__controls__buttons--button';
  buttons.append(fullscreenButtonControls);

  const fullscreenIconControls = document.createElement('span');
  fullscreenIconControls.className = 'media-component-video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButtonControls.append(fullscreenIconControls);

  const mainVideo = document.createElement('video');
  mainVideo.className = 'media-component-video-container__video';
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('muted', 'true');
  mainVideo.setAttribute('loop', '');
  mainVideo.setAttribute('autoplay', '');
  videoContainer.append(mainVideo);

  const mainSource = document.createElement('source');
  mainSource.setAttribute('type', 'video/mp4');

  const authoredMainVideoSrc = block.querySelector('[data-aue-prop="mainVideoSrc"]');
  if (authoredMainVideoSrc) {
    mainSource.setAttribute('src', authoredMainVideoSrc.textContent);
    moveInstrumentation(authoredMainVideoSrc, mainSource);
  } // else: if no authored content, src will be empty, which is fine.
  mainVideo.append(mainSource);

  block.textContent = '';
  block.append(mediaComponent);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
