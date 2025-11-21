import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.className = 'hero-full-width parallax-child-2 hero-in-view';
  mainDiv.setAttribute('data-media-type', 'videoTypeSelected');

  const backgroundVideoCell = block.children[0]?.children[1];
  const titleCell = block.children[1]?.children[1];
  const descriptionCell = block.children[2]?.children[1];
  const primaryCtaLabelCell = block.children[3]?.children[1];
  const primaryCtaUrlCell = block.children[4]?.children[1];
  const secondaryCtaLabelCell = block.children[5]?.children[1];
  const secondaryCtaUrlCell = block.children[6]?.children[1];

  let videoSrc = '';
  if (backgroundVideoCell) {
    const videoLink = backgroundVideoCell.querySelector('a');
    if (videoLink) {
      videoSrc = videoLink.href;
    }
  }

  let titleHTML = '';
  if (titleCell) {
    titleHTML = titleCell.innerHTML;
    mainDiv.setAttribute('aria-label', titleHTML);
  }

  // Hero Full Width Cover
  const coverDiv = document.createElement('div');
  coverDiv.className = 'hero-full-width__cover';
  mainDiv.append(coverDiv);

  // Hero Full Width Background
  const backgroundDiv = document.createElement('div');
  backgroundDiv.className = 'hero-full-width__background';

  const backgroundWrapperDiv = document.createElement('div');
  backgroundWrapperDiv.className = 'hero-full-width__background-wrapper zoom-out';

  const backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'hero-full-width__background-video';
  backgroundVideo.setAttribute('aria-label', titleHTML);
  backgroundVideo.setAttribute('aria-hidden', 'true');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('autoplay', '');
  const videoSource = document.createElement('source');
  videoSource.src = videoSrc;
  videoSource.type = 'video/mp4';
  backgroundVideo.append(videoSource);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.alt = 'Background poster image';
  backgroundPoster.loading = 'lazy';
  backgroundPoster.className = 'hero-full-width__background-poster';
  backgroundPoster.style.display = 'none';
  backgroundPoster.setAttribute('aria-hidden', 'true');

  backgroundWrapperDiv.append(backgroundVideo, backgroundPoster);
  backgroundDiv.append(backgroundWrapperDiv);
  mainDiv.append(backgroundDiv);

  // Hero Full Width Content
  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-full-width__content';

  // Title and Description
  const slideWrap1 = document.createElement('div');
  slideWrap1.className = 'slide-wrap';
  const slideUp1 = document.createElement('div');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideUp1.className = 'slide-up';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'hero-full-width__content__title';
  titleDiv.setAttribute('tabindex', '0');
  titleDiv.innerHTML = titleHTML;
  moveInstrumentation(titleCell, titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'hero-full-width__content__description';
  descriptionDiv.setAttribute('tabindex', '0');
  if (descriptionCell) {
    descriptionDiv.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionCell, descriptionDiv);
  }

  slideUp1.append(titleDiv, descriptionDiv);
  slideWrap1.append(slideUp1);
  contentDiv.append(slideWrap1);

  // CTAs
  const slideWrap2 = document.createElement('div');
  slideWrap2.className = 'slide-wrap';
  const slideUp2 = document.createElement('div');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideUp2.className = 'slide-up';

  const ctasDiv = document.createElement('div');
  ctasDiv.className = 'hero-full-width__content--ctas';

  // Primary CTA
  if (primaryCtaLabelCell && primaryCtaUrlCell) {
    const primaryCtaLink = document.createElement('a');
    primaryCtaLink.href = primaryCtaUrlCell.textContent.trim();
    primaryCtaLink.className = 'cta cta__secondary primaryCta ';
    primaryCtaLink.target = '_self';
    primaryCtaLink.setAttribute('aria-label', primaryCtaLabelCell.textContent.trim());
    primaryCtaLink.setAttribute('data-palette', 'palette-light');
    const primaryCtaLabelSpan = document.createElement('span');
    primaryCtaLabelSpan.className = 'cta__label';
    primaryCtaLabelSpan.textContent = primaryCtaLabelCell.textContent.trim();
    primaryCtaLink.append(primaryCtaLabelSpan);
    ctasDiv.append(primaryCtaLink);
    moveInstrumentation(primaryCtaLabelCell, primaryCtaLink);
    moveInstrumentation(primaryCtaUrlCell, primaryCtaLink);
  }

  // Secondary CTA (Watch Video)
  if (secondaryCtaLabelCell && secondaryCtaUrlCell) {
    const chevronWrapper = document.createElement('div');
    chevronWrapper.className = 'chevron-wrapper';

    const chevronButton = document.createElement('button');
    chevronButton.type = 'button';
    chevronButton.className = 'chevron-icon';
    chevronButton.setAttribute('aria-label', 'Open video modal');
    chevronWrapper.append(chevronButton);

    const secondaryCtaLink = document.createElement('a');
    secondaryCtaLink.href = secondaryCtaUrlCell.textContent.trim();
    secondaryCtaLink.className = 'cta cta__link secondaryCta ';
    secondaryCtaLink.target = '_self';
    secondaryCtaLink.setAttribute('aria-label', secondaryCtaLabelCell.textContent.trim());
    secondaryCtaLink.setAttribute('data-palette', 'palette-light');

    const secondaryCtaIcon = document.createElement('span');
    secondaryCtaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    secondaryCtaIcon.setAttribute('aria-hidden', 'true');
    const secondaryCtaLabelSpan = document.createElement('span');
    secondaryCtaLabelSpan.className = 'cta__label';
    secondaryCtaLabelSpan.textContent = secondaryCtaLabelCell.textContent.trim();
    secondaryCtaLink.append(secondaryCtaIcon, secondaryCtaLabelSpan);

    chevronWrapper.append(secondaryCtaLink);
    ctasDiv.append(chevronWrapper);
    moveInstrumentation(secondaryCtaLabelCell, secondaryCtaLink);
    moveInstrumentation(secondaryCtaUrlCell, secondaryCtaLink);

    // Video Modal
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

    const videoModalDiv = document.createElement('div');
    videoModalDiv.className = 'video hero-full-width__content--modal__video';

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container show-controls ';

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'video-container__controls';

    const timerDiv = document.createElement('div');
    timerDiv.className = 'video-container__controls__timer';
    timerDiv.innerHTML = `
      <div class="video-container__controls__timer__progress-area">
        <span class="video-container__controls__timer__progress-area__progress-bar"></span>
        <span class="video-container__controls__timer__progress-area__pointer"></span>
        <span class="video-container__controls__timer__progress-area__progress-pending"></span>
      </div>
      <p class="video-container__controls__timer__current-time">00:00</p>
      <p class="video-container__controls__timer__duration">00:00</p>
    `;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'video-container__controls__buttons';
    buttonsDiv.innerHTML = `
      <button class="video-container__controls__buttons__play-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span>
      </button>
      <button class="video-container__controls__buttons__mute-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>
      </button>
      <button class="video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button">
        <span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>
      </button>
    `;

    controlsDiv.append(timerDiv, buttonsDiv);

    const modalVideo = document.createElement('video');
    modalVideo.className = 'video-container__video';
    modalVideo.setAttribute('playsinline', '');
    modalVideo.setAttribute('webkit-playsinline', '');
    modalVideo.setAttribute('muted', 'true');
    modalVideo.setAttribute('autoplay', '');
    const modalVideoSource = document.createElement('source');
    modalVideoSource.src = videoSrc;
    modalVideoSource.type = 'video/mp4';
    modalVideo.append(modalVideoSource);

    videoContainer.append(controlsDiv, modalVideo);
    videoModalDiv.append(videoContainer);
    dialog.append(form, videoModalDiv);
    contentDiv.append(dialog);
  }

  slideUp2.append(ctasDiv);
  slideWrap2.append(slideUp2);
  contentDiv.append(slideWrap2);

  mainDiv.append(contentDiv);

  block.textContent = '';
  block.append(mainDiv);
}