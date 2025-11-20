import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('herofullwidth-wrapper', 'parallax-child-2', 'herofullwidth-in-view');
  wrapper.setAttribute('data-media-type', 'videoTypeSelected');

  const cover = document.createElement('div');
  cover.classList.add('herofullwidth-cover');
  wrapper.append(cover);

  const background = document.createElement('div');
  background.classList.add('herofullwidth-background');
  wrapper.append(background);

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.classList.add('herofullwidth-background-wrapper', 'zoom-out');
  background.append(backgroundWrapper);

  const content = document.createElement('div');
  content.classList.add('herofullwidth-content');
  wrapper.append(content);

  const dialog = document.createElement('dialog');
  dialog.classList.add('herofullwidth-content-modal');
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  content.append(dialog);

  const dialogForm = document.createElement('form');
  dialogForm.setAttribute('method', 'dialog');
  dialog.append(dialogForm);

  const closeButton = document.createElement('button');
  closeButton.classList.add('herofullwidth-content-modal-close-button');
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  dialogForm.append(closeButton);

  const dialogVideoContainer = document.createElement('div');
  dialogVideoContainer.classList.add('herofullwidth-video', 'herofullwidth-content-modal-video');
  dialog.append(dialogVideoContainer);

  const videoControlsContainer = document.createElement('div');
  videoControlsContainer.classList.add('herofullwidth-video-container', 'herofullwidth-show-controls');
  dialogVideoContainer.append(videoControlsContainer);

  const controls = document.createElement('div');
  controls.classList.add('herofullwidth-video-container-controls');
  videoControlsContainer.append(controls);

  const timer = document.createElement('div');
  timer.classList.add('herofullwidth-video-container-controls-timer');
  controls.append(timer);

  const progressArea = document.createElement('div');
  progressArea.classList.add('herofullwidth-video-container-controls-timer-progress-area');
  timer.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.classList.add('herofullwidth-video-container-controls-timer-progress-area-progress-bar');
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.classList.add('herofullwidth-video-container-controls-timer-progress-area-pointer');
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.classList.add('herofullwidth-video-container-controls-timer-progress-area-progress-pending');
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.classList.add('herofullwidth-video-container-controls-timer-current-time');
  currentTime.textContent = '00:00';
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.classList.add('herofullwidth-video-container-controls-timer-duration');
  duration.textContent = '00:00';
  timer.append(duration);

  const controlButtons = document.createElement('div');
  controlButtons.classList.add('herofullwidth-video-container-controls-buttons');
  controls.append(controlButtons);

  const playButton = document.createElement('button');
  playButton.classList.add('herofullwidth-video-container-controls-buttons-play-button', 'herofullwidth-video-container-controls-buttons--button');
  controlButtons.append(playButton);

  const playIcon = document.createElement('span');
  playIcon.classList.add('herofullwidth-video-container-controls-buttons-icon', 'qd-icon', 'qd-icon--play');
  playButton.append(playIcon);

  const muteButton = document.createElement('button');
  muteButton.classList.add('herofullwidth-video-container-controls-buttons-mute-button', 'herofullwidth-video-container-controls-buttons--button');
  controlButtons.append(muteButton);

  const muteIcon = document.createElement('span');
  muteIcon.classList.add('herofullwidth-video-container-controls-buttons-icon', 'qd-icon', 'qd-icon--volume');
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('herofullwidth-video-container-controls-buttons-fullscreen-button', 'herofullwidth-video-container-controls-buttons--button');
  controlButtons.append(fullscreenButton);

  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.classList.add('herofullwidth-video-container-controls-buttons-icon', 'qd-icon', 'qd-icon--fullscreen');
  fullscreenButton.append(fullscreenIcon);

  let backgroundVideoSrc = '';
  let backgroundPosterAlt = '';
  let titleHtml = '';
  let descriptionHtml = '';
  let primaryCtaLabel = '';
  let primaryCtaHref = '';
  let secondaryCtaLabel = '';
  let secondaryCtaHref = '';

  // Extract content from the block's children (rows)
  [...block.children].forEach((row, index) => {
    moveInstrumentation(row, wrapper); // Transfer instrumentation to the main wrapper
    const cells = [...row.children];

    if (index === 0) {
      // First row: Background Video, Background Poster Alt, Title, Description
      backgroundVideoSrc = cells[0]?.textContent.trim() || '';
      backgroundPosterAlt = cells[1]?.textContent.trim() || '';
      titleHtml = cells[2]?.innerHTML.trim() || '';
      descriptionHtml = cells[3]?.innerHTML.trim() || '';
    } else if (index === 1) {
      // Second row: CTAs
      primaryCtaLabel = cells[0]?.textContent.trim() || '';
      primaryCtaHref = cells[1]?.textContent.trim() || '';
      secondaryCtaLabel = cells[2]?.textContent.trim() || '';
      secondaryCtaHref = cells[3]?.textContent.trim() || '';
    }
  });

  // Build the background video and poster
  const backgroundVideo = document.createElement('video');
  backgroundVideo.classList.add('herofullwidth-background-video');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('autoplay', '');
  if (titleHtml) {
    backgroundVideo.setAttribute('aria-label', titleHtml);
  }
  backgroundVideo.setAttribute('aria-hidden', 'true');
  const source = document.createElement('source');
  source.src = backgroundVideoSrc;
  source.type = 'video/mp4';
  backgroundVideo.append(source);
  backgroundWrapper.append(backgroundVideo);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.alt = backgroundPosterAlt;
  backgroundPoster.setAttribute('loading', 'lazy');
  backgroundPoster.classList.add('herofullwidth-background-poster');
  backgroundPoster.style.display = 'none';
  backgroundPoster.setAttribute('aria-hidden', 'true');
  backgroundWrapper.append(backgroundPoster);

  // Build the main content slide-up for title and description
  const slideWrap1 = document.createElement('div');
  slideWrap1.classList.add('herofullwidth-slide-wrap');
  content.append(slideWrap1);

  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.classList.add('herofullwidth-slide-up');
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('herofullwidth-content-title');
  titleDiv.setAttribute('tabindex', '0');
  titleDiv.innerHTML = titleHtml;
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('herofullwidth-content-description');
  descriptionDiv.setAttribute('tabindex', '0');
  descriptionDiv.innerHTML = descriptionHtml;
  slideUp1.append(descriptionDiv);

  // Build the CTAs slide-up
  const slideWrap2 = document.createElement('div');
  slideWrap2.classList.add('herofullwidth-slide-wrap');
  content.append(slideWrap2);

  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.classList.add('herofullwidth-slide-up');
  slideWrap2.append(slideUp2);

  const ctasDiv = document.createElement('div');
  ctasDiv.classList.add('herofullwidth-content-ctas');
  slideUp2.append(ctasDiv);

  if (primaryCtaHref && primaryCtaLabel) {
    const primaryCta = document.createElement('a');
    primaryCta.href = primaryCtaHref;
    primaryCta.classList.add('herofullwidth-cta', 'herofullwidth-cta-secondary', 'herofullwidth-primaryCta');
    primaryCta.setAttribute('target', '_self');
    primaryCta.setAttribute('aria-label', primaryCtaLabel);
    primaryCta.setAttribute('data-palette', 'palette-light');
    const primaryCtaSpan = document.createElement('span');
    primaryCtaSpan.classList.add('herofullwidth-cta-label');
    primaryCtaSpan.textContent = primaryCtaLabel;
    primaryCta.append(primaryCtaSpan);
    ctasDiv.append(primaryCta);
  }

  if (secondaryCtaHref && secondaryCtaLabel) {
    const chevronWrapper = document.createElement('div');
    chevronWrapper.classList.add('herofullwidth-chevron-wrapper');
    ctasDiv.append(chevronWrapper);

    const chevronButton = document.createElement('button');
    chevronButton.setAttribute('type', 'button');
    chevronButton.classList.add('herofullwidth-chevron-icon');
    chevronButton.setAttribute('aria-label', 'Open video modal');
    chevronWrapper.append(chevronButton);

    const secondaryCta = document.createElement('a');
    secondaryCta.href = secondaryCtaHref;
    secondaryCta.classList.add('herofullwidth-cta', 'herofullwidth-cta-link', 'herofullwidth-secondaryCta');
    secondaryCta.setAttribute('target', '_self');
    secondaryCta.setAttribute('aria-label', secondaryCtaLabel);
    secondaryCta.setAttribute('data-palette', 'palette-light');
    const secondaryCtaIcon = document.createElement('span');
    secondaryCtaIcon.classList.add('herofullwidth-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
    secondaryCtaIcon.setAttribute('aria-hidden', 'true');
    secondaryCta.append(secondaryCtaIcon);
    const secondaryCtaSpan = document.createElement('span');
    secondaryCtaSpan.classList.add('herofullwidth-cta-label');
    secondaryCtaSpan.textContent = secondaryCtaLabel;
    secondaryCta.append(secondaryCtaSpan);
    chevronWrapper.append(secondaryCta);
  }

  // Build the modal video
  const modalVideo = document.createElement('video');
  modalVideo.classList.add('herofullwidth-video-container-video');
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('muted', 'true');
  modalVideo.setAttribute('autoplay', '');
  const modalSource = document.createElement('source');
  modalSource.src = backgroundVideoSrc; // Assuming modal video is the same as background for now
  modalSource.type = 'video/mp4';
  modalVideo.append(modalSource);
  // The HTML also has 'webkit-playsinline' and 'x-webkit-airplay="allow"' as text nodes after the source tag.
  // These are attributes that should be on the video tag, not text nodes. Re-adding them as attributes.
  modalVideo.setAttribute('x-webkit-airplay', 'allow');
  videoControlsContainer.append(modalVideo);

  block.textContent = '';
  block.append(wrapper);
}