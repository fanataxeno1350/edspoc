import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoSource = block.querySelector('[data-aue-prop="videoSource"]');
  const backgroundPosterAlt = block.querySelector('[data-aue-prop="backgroundPosterAlt"]');
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const primaryCtaLabel = block.querySelector('[data-aue-prop="primaryCtaLabel"]');
  const primaryCtaHref = block.querySelector('[data-aue-prop="primaryCtaHref"]');
  const secondaryCtaLabel = block.querySelector('[data-aue-prop="secondaryCtaLabel"]');
  const secondaryCtaHref = block.querySelector('[data-aue-prop="secondaryCtaHref"]');

  const heroFullWidthDiv = document.createElement('div');
  heroFullWidthDiv.className = 'hero-full-width parallax-child-2 hero-in-view';
  heroFullWidthDiv.dataset.mediaType = 'videoTypeSelected';
  // aria-label and aria-hidden for the root div are dynamic based on title, will be set later if title exists

  const heroFullWidthCover = document.createElement('div');
  heroFullWidthCover.className = 'hero-full-width__cover';
  heroFullWidthDiv.append(heroFullWidthCover);

  const heroFullWidthBackground = document.createElement('div');
  heroFullWidthBackground.className = 'hero-full-width__background';
  heroFullWidthDiv.append(heroFullWidthBackground);

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.className = 'hero-full-width__background-wrapper zoom-out';
  heroFullWidthBackground.append(backgroundWrapper);

  const backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'hero-full-width__background-video';
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('autoplay', '');
  // aria-label and aria-hidden for background video are dynamic based on title, will be set later if title exists

  if (videoSource && videoSource.textContent) {
    const source = document.createElement('source');
    source.src = videoSource.textContent.trim();
    source.type = 'video/mp4';
    backgroundVideo.append(source);
    moveInstrumentation(videoSource, source);
  }
  backgroundWrapper.append(backgroundVideo);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.alt = backgroundPosterAlt ? backgroundPosterAlt.textContent.trim() : 'Background poster image';
  backgroundPoster.loading = 'lazy';
  backgroundPoster.className = 'hero-full-width__background-poster';
  backgroundPoster.style.display = 'none';
  backgroundPoster.setAttribute('aria-hidden', 'true');
  if (backgroundPosterAlt) moveInstrumentation(backgroundPosterAlt, backgroundPoster);
  backgroundWrapper.append(backgroundPoster);

  const heroFullWidthContent = document.createElement('div');
  heroFullWidthContent.className = 'hero-full-width__content';
  heroFullWidthDiv.append(heroFullWidthContent);

  // Title and Description
  if (title || description) {
    const slideWrap1 = document.createElement('div');
    slideWrap1.className = 'slide-wrap';
    heroFullWidthContent.append(slideWrap1);

    const slideUp1 = document.createElement('div');
    slideUp1.dataset.slideType = 'slide-up';
    slideUp1.className = 'slide-up';
    slideWrap1.append(slideUp1);

    if (title) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'hero-full-width__content__title';
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.append(title);
      slideUp1.append(titleDiv);

      // Set aria-label on root and video if title exists
      const titleHtml = title.innerHTML.trim();
      heroFullWidthDiv.setAttribute('aria-label', titleHtml);
      heroFullWidthDiv.setAttribute('aria-hidden', 'true');
      backgroundVideo.setAttribute('aria-label', titleHtml);
      backgroundVideo.setAttribute('aria-hidden', 'true');
    }

    if (description) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'hero-full-width__content__description';
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.append(description);
      slideUp1.append(descriptionDiv);
    }
  }

  // CTAs
  if (primaryCtaLabel || secondaryCtaLabel) {
    const slideWrap2 = document.createElement('div');
    slideWrap2.className = 'slide-wrap';
    heroFullWidthContent.append(slideWrap2);

    const slideUp2 = document.createElement('div');
    slideUp2.dataset.slideType = 'slide-up';
    slideUp2.className = 'slide-up';
    slideWrap2.append(slideUp2);

    const ctasDiv = document.createElement('div');
    ctasDiv.className = 'hero-full-width__content--ctas';
    slideUp2.append(ctasDiv);

    if (primaryCtaLabel && primaryCtaHref) {
      const primaryCta = document.createElement('a');
      primaryCta.href = primaryCtaHref.textContent.trim();
      primaryCta.className = 'cta cta__secondary primaryCta ';
      primaryCta.target = '_self';
      primaryCta.setAttribute('aria-label', primaryCtaLabel.textContent.trim());
      primaryCta.dataset.palette = 'palette-light';

      const primaryCtaSpan = document.createElement('span');
      primaryCtaSpan.className = 'cta__label';
      primaryCtaSpan.textContent = primaryCtaLabel.textContent.trim();
      primaryCta.append(primaryCtaSpan);
      moveInstrumentation(primaryCtaLabel, primaryCtaSpan);
      moveInstrumentation(primaryCtaHref, primaryCta);
      ctasDiv.append(primaryCta);
    }

    if (secondaryCtaLabel && secondaryCtaHref) {
      const chevronWrapper = document.createElement('div');
      chevronWrapper.className = 'chevron-wrapper';
      ctasDiv.append(chevronWrapper);

      const chevronButton = document.createElement('button');
      chevronButton.type = 'button';
      chevronButton.className = 'chevron-icon';
      chevronButton.setAttribute('aria-label', 'Open video modal');
      chevronWrapper.append(chevronButton);

      const secondaryCta = document.createElement('a');
      secondaryCta.href = secondaryCtaHref.textContent.trim();
      secondaryCta.className = 'cta cta__link secondaryCta ';
      secondaryCta.target = '_self';
      secondaryCta.setAttribute('aria-label', secondaryCtaLabel.textContent.trim());
      secondaryCta.dataset.palette = 'palette-light';

      const secondaryCtaIcon = document.createElement('span');
      secondaryCtaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
      secondaryCtaIcon.setAttribute('aria-hidden', 'true');
      secondaryCta.append(secondaryCtaIcon);

      const secondaryCtaSpan = document.createElement('span');
      secondaryCtaSpan.className = 'cta__label';
      secondaryCtaSpan.textContent = secondaryCtaLabel.textContent.trim();
      secondaryCta.append(secondaryCtaSpan);
      moveInstrumentation(secondaryCtaLabel, secondaryCtaSpan);
      moveInstrumentation(secondaryCtaHref, secondaryCta);
      chevronWrapper.append(secondaryCta);
    }
  }

  // Modal Dialog
  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width__content--modal';
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  heroFullWidthContent.append(dialog);

  const form = document.createElement('form');
  form.method = 'dialog';
  dialog.append(form);

  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  form.append(closeButton);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.className = 'video hero-full-width__content--modal__video';
  dialog.append(videoModalDiv);

  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container show-controls ';
  videoModalDiv.append(videoContainer);

  const videoControls = document.createElement('div');
  videoControls.className = 'video-container__controls';
  videoContainer.append(videoControls);

  const timer = document.createElement('div');
  timer.className = 'video-container__controls__timer';
  videoControls.append(timer);

  const progressArea = document.createElement('div');
  progressArea.className = 'video-container__controls__timer__progress-area';
  timer.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.className = 'video-container__controls__timer__progress-area__progress-bar';
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.className = 'video-container__controls__timer__progress-area__pointer';
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.className = 'video-container__controls__timer__progress-area__progress-pending';
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.className = 'video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.className = 'video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timer.append(duration);

  const buttons = document.createElement('div');
  buttons.className = 'video-container__controls__buttons';
  videoControls.append(buttons);

  const playButton = document.createElement('button');
  playButton.className = 'video-container__controls__buttons__play-button video-container__controls__buttons--button';
  const playIcon = document.createElement('span');
  playIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--play';
  playButton.append(playIcon);
  buttons.append(playButton);

  const muteButton = document.createElement('button');
  muteButton.className = 'video-container__controls__buttons__mute-button video-container__controls__buttons--button';
  const muteIcon = document.createElement('span');
  muteIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--volume';
  muteButton.append(muteIcon);
  buttons.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button';
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.className = 'video-container__controls__buttons__icon qd-icon qd-icon--fullscreen';
  fullscreenButton.append(fullscreenIcon);
  buttons.append(fullscreenButton);

  const modalVideo = document.createElement('video');
  modalVideo.className = 'video-container__video';
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('muted', 'true');
  modalVideo.setAttribute('autoplay', '');
  modalVideo.setAttribute('x-webkit-airplay', 'allow');

  if (videoSource && videoSource.textContent) {
    const modalSource = document.createElement('source');
    modalSource.src = videoSource.textContent.trim();
    modalSource.type = 'video/mp4';
    modalVideo.append(modalSource);
  }
  videoContainer.append(modalVideo);

  block.textContent = '';
  block.append(heroFullWidthDiv);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
