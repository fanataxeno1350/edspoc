import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'hero-full-width parallax-child-2 hero-in-view';
  mainDiv.setAttribute('data-media-type', 'videoTypeSelected');
  mainDiv.setAttribute('aria-hidden', 'true');

  const coverDiv = document.createElement('div');
  coverDiv.className = 'hero-full-width__cover';
  mainDiv.append(coverDiv);

  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'hero-full-width__background';
  const backgroundWrapperDiv = document.createElement('div');
  backgroundWrapperDiv.className = 'hero-full-width__background-wrapper zoom-out';
  backgroundDiv.append(backgroundWrapperDiv);
  mainDiv.append(backgroundDiv);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-full-width__content';
  mainDiv.append(contentDiv);

  let videoSrc = '';
  let titleHtml = '';
  let descriptionHtml = '';
  let primaryCtaLabel = '';
  let primaryCtaLink = '';
  let secondaryCtaLabel = '';
  let secondaryCtaLink = '';

  // Extract content from the block's children (authored rows)
  [...block.children].forEach((row, index) => {
    // Assuming the first row contains video source, title, description
    // and the second row contains CTAs
    if (index === 0) {
      const cells = [...row.children];
      if (cells[0]) {
        const videoLink = cells[0].querySelector('a');
        if (videoLink) {
          videoSrc = videoLink.href;
        } else {
          // Fallback if it's just text
          videoSrc = cells[0].textContent.trim();
        }
      }
      if (cells[1]) {
        titleHtml = cells[1].innerHTML;
      }
      if (cells[2]) {
        descriptionHtml = cells[2].innerHTML;
      }
    } else if (index === 1) {
      const cells = [...row.children];
      if (cells[0]) {
        const primaryLink = cells[0].querySelector('a');
        if (primaryLink) {
          primaryCtaLabel = primaryLink.textContent.trim();
          primaryCtaLink = primaryLink.href;
        } else {
          const parts = cells[0].textContent.split(/\s*\|\s*/); // Split by | for label|link
          if (parts.length === 2) {
            primaryCtaLabel = parts[0].trim();
            primaryCtaLink = parts[1].trim();
          } else {
            primaryCtaLabel = cells[0].textContent.trim();
          }
        }
      }
      if (cells[1]) {
        const secondaryLink = cells[1].querySelector('a');
        if (secondaryLink) {
          secondaryCtaLabel = secondaryLink.textContent.trim();
          secondaryCtaLink = secondaryLink.href;
        } else {
          const parts = cells[1].textContent.split(/\s*\|\s*/); // Split by | for label|link
          if (parts.length === 2) {
            secondaryCtaLabel = parts[0].trim();
            secondaryCtaLink = parts[1].trim();
          } else {
            secondaryCtaLabel = cells[1].textContent.trim();
          }
        }
      }
    }
    moveInstrumentation(row, mainDiv);
  });

  // Set aria-label for the main div
  mainDiv.setAttribute('aria-label', titleHtml);

  // Build the background video structure
  const backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'hero-full-width__background-video';
  backgroundVideo.setAttribute('aria-label', titleHtml);
  backgroundVideo.setAttribute('aria-hidden', 'true');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('autoplay', '');
  const source = document.createElement('source');
  source.src = videoSrc;
  source.type = 'video/mp4';
  backgroundVideo.append(source);
  backgroundWrapperDiv.append(backgroundVideo);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.alt = 'Background poster image';
  backgroundPoster.loading = 'lazy';
  backgroundPoster.className = 'hero-full-width__background-poster';
  backgroundPoster.style.display = 'none';
  backgroundPoster.setAttribute('aria-hidden', 'true');
  backgroundWrapperDiv.append(backgroundPoster);

  // Build the content structure
  const slideWrap1 = document.createElement('div');
  slideWrap1.className = 'slide-wrap';
  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.className = 'slide-up';
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement('div');
  titleDiv.className = 'hero-full-width__content__title';
  titleDiv.setAttribute('tabindex', '0');
  titleDiv.innerHTML = titleHtml;
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'hero-full-width__content__description';
  descriptionDiv.setAttribute('tabindex', '0');
  descriptionDiv.innerHTML = descriptionHtml;
  slideUp1.append(descriptionDiv);
  contentDiv.append(slideWrap1);

  const slideWrap2 = document.createElement('div');
  slideWrap2.className = 'slide-wrap';
  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.className = 'slide-up';
  slideWrap2.append(slideUp2);

  const ctasDiv = document.createElement('div');
  ctasDiv.className = 'hero-full-width__content--ctas';

  if (primaryCtaLink && primaryCtaLabel) {
    const primaryCta = document.createElement('a');
    primaryCta.href = primaryCtaLink;
    primaryCta.className = 'cta cta__secondary primaryCta ';
    primaryCta.target = '_self';
    primaryCta.setAttribute('aria-label', primaryCtaLabel);
    primaryCta.setAttribute('data-palette', 'palette-light');
    const primaryCtaLabelSpan = document.createElement('span');
    primaryCtaLabelSpan.className = 'cta__label';
    primaryCtaLabelSpan.textContent = primaryCtaLabel;
    primaryCta.append(primaryCtaLabelSpan);
    ctasDiv.append(primaryCta);
  }

  if (secondaryCtaLink && secondaryCtaLabel) {
    const chevronWrapper = document.createElement('div');
    chevronWrapper.className = 'chevron-wrapper';

    const chevronButton = document.createElement('button');
    chevronButton.type = 'button';
    chevronButton.className = 'chevron-icon';
    chevronButton.setAttribute('aria-label', 'Open video modal');
    chevronWrapper.append(chevronButton);

    const secondaryCta = document.createElement('a');
    secondaryCta.href = secondaryCtaLink;
    secondaryCta.className = 'cta cta__link secondaryCta ';
    secondaryCta.target = '_self';
    secondaryCta.setAttribute('aria-label', secondaryCtaLabel);
    secondaryCta.setAttribute('data-palette', 'palette-light');
    const secondaryCtaIcon = document.createElement('span');
    secondaryCtaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    secondaryCtaIcon.setAttribute('aria-hidden', 'true');
    secondaryCta.append(secondaryCtaIcon);
    const secondaryCtaLabelSpan = document.createElement('span');
    secondaryCtaLabelSpan.className = 'cta__label';
    secondaryCtaLabelSpan.textContent = secondaryCtaLabel;
    secondaryCta.append(secondaryCtaLabelSpan);
    chevronWrapper.append(secondaryCta);
    ctasDiv.append(chevronWrapper);
  }
  slideUp2.append(ctasDiv);
  contentDiv.append(slideWrap2);

  // Build the dialog structure
  const dialog = document.createElement('dialog');
  dialog.className = 'hero-full-width__content--modal';
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');

  const form = document.createElement('form');
  form.method = 'dialog';
  const closeButton = document.createElement('button');
  closeButton.className = 'hero-full-width__content--modal__close-button';
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  form.append(closeButton);
  dialog.append(form);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.className = 'video hero-full-width__content--modal__video';
  const videoContainer = document.createElement('div');
  videoContainer.className = 'video-container show-controls ';

  const videoControls = document.createElement('div');
  videoControls.className = 'video-container__controls';

  const timerDiv = document.createElement('div');
  timerDiv.className = 'video-container__controls__timer';
  const progressArea = document.createElement('div');
  progressArea.className = 'video-container__controls__timer__progress-area';
  progressArea.innerHTML = '<span class="video-container__controls__timer__progress-area__progress-bar"></span><span class="video-container__controls__timer__progress-area__pointer"></span><span class="video-container__controls__timer__progress-area__progress-pending"></span>';
  timerDiv.append(progressArea);
  const currentTime = document.createElement('p');
  currentTime.className = 'video-container__controls__timer__current-time';
  currentTime.textContent = '00:00';
  timerDiv.append(currentTime);
  const duration = document.createElement('p');
  duration.className = 'video-container__controls__timer__duration';
  duration.textContent = '00:00';
  timerDiv.append(duration);
  videoControls.append(timerDiv);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'video-container__controls__buttons';

  const playButton = document.createElement('button');
  playButton.className = 'video-container__controls__buttons__play-button video-container__controls__buttons--button';
  playButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span>';
  buttonsDiv.append(playButton);

  const muteButton = document.createElement('button');
  muteButton.className = 'video-container__controls__buttons__mute-button video-container__controls__buttons--button';
  muteButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>';
  buttonsDiv.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.className = 'video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button';
  fullscreenButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>';
  buttonsDiv.append(fullscreenButton);

  videoControls.append(buttonsDiv);
  videoContainer.append(videoControls);

  const modalVideo = document.createElement('video');
  modalVideo.className = 'video-container__video';
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('muted', 'true');
  modalVideo.setAttribute('autoplay', '');
  const modalSource = document.createElement('source');
  modalSource.src = videoSrc;
  modalSource.type = 'video/mp4';
  modalVideo.append(modalSource);
  videoContainer.append(modalVideo);

  videoModalDiv.append(videoContainer);
  dialog.append(videoModalDiv);
  contentDiv.append(dialog);

  block.textContent = '';
  block.append(mainDiv);
}
