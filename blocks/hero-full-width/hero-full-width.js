import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const backgroundVideoCell = block.querySelector(':scope > div:nth-child(1) > div');
  const backgroundPosterImageAltCell = block.querySelector(':scope > div:nth-child(2) > div');
  const titleCell = block.querySelector(':scope > div:nth-child(3) > div');
  const descriptionCell = block.querySelector(':scope > div:nth-child(4) > div');
  const ctasPrimaryCtaLabelCell = block.querySelector(':scope > div:nth-child(5) > div:nth-child(1)');
  const ctasPrimaryCtaHrefCell = block.querySelector(':scope > div:nth-child(5) > div:nth-child(2)');
  const ctasSecondaryCtaLabelCell = block.querySelector(':scope > div:nth-child(5) > div:nth-child(3)');
  const ctasSecondaryCtaHrefCell = block.querySelector(':scope > div:nth-child(5) > div:nth-child(4)');
  const modalVideoCell = block.querySelector(':scope > div:nth-child(6) > div');

  const backgroundVideo = backgroundVideoCell?.textContent?.trim();
  const backgroundPosterImageAlt = backgroundPosterImageAltCell?.textContent?.trim();
  const title = titleCell?.innerHTML?.trim();
  const description = descriptionCell?.innerHTML?.trim();
  const primaryCtaLabel = ctasPrimaryCtaLabelCell?.textContent?.trim();
  const primaryCtaHref = ctasPrimaryCtaHrefCell?.textContent?.trim();
  const secondaryCtaLabel = ctasSecondaryCtaLabelCell?.textContent?.trim();
  const secondaryCtaHref = ctasSecondaryCtaHrefCell?.textContent?.trim();
  const modalVideo = modalVideoCell?.textContent?.trim();

  block.textContent = '';

  const heroFullWidth = document.createElement('div');
  heroFullWidth.className = 'hero-full-width parallax-child-2';
  heroFullWidth.dataset.mediaType = 'videoTypeSelected';
  heroFullWidth.setAttribute('aria-label', title);
  heroFullWidth.setAttribute('aria-hidden', 'true');
  moveInstrumentation(block, heroFullWidth);

  const heroFullWidthCover = document.createElement('div');
  heroFullWidthCover.className = 'hero-full-width__cover';
  heroFullWidth.append(heroFullWidthCover);

  const heroFullWidthBackground = document.createElement('div');
  heroFullWidthBackground.className = 'hero-full-width__background';

  const heroFullWidthBackgroundWrapper = document.createElement('div');
  heroFullWidthBackgroundWrapper.className = 'hero-full-width__background-wrapper zoom-out';

  const heroFullWidthBackgroundVideo = document.createElement('video');
  heroFullWidthBackgroundVideo.className = 'hero-full-width__background-video';
  heroFullWidthBackgroundVideo.setAttribute('aria-label', title);
  heroFullWidthBackgroundVideo.setAttribute('aria-hidden', 'true');
  heroFullWidthBackgroundVideo.setAttribute('playsinline', '');
  heroFullWidthBackgroundVideo.setAttribute('muted', '');
  heroFullWidthBackgroundVideo.setAttribute('loop', '');
  heroFullWidthBackgroundVideo.setAttribute('autoplay', '');

  const videoSource = document.createElement('source');
  videoSource.src = backgroundVideo;
  videoSource.type = 'video/mp4';
  heroFullWidthBackgroundVideo.append(videoSource);
  heroFullWidthBackgroundWrapper.append(heroFullWidthBackgroundVideo);

  const backgroundPosterImg = document.createElement('img');
  backgroundPosterImg.alt = backgroundPosterImageAlt;
  backgroundPosterImg.loading = 'lazy';
  backgroundPosterImg.className = 'hero-full-width__background-poster';
  backgroundPosterImg.style.display = 'none';
  backgroundPosterImg.setAttribute('aria-hidden', 'true');
  heroFullWidthBackgroundWrapper.append(backgroundPosterImg);

  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);
  heroFullWidth.append(heroFullWidthBackground);

  const heroFullWidthContent = document.createElement('div');
  heroFullWidthContent.className = 'hero-full-width__content';

  if (title) {
    const slideWrapTitle = document.createElement('div');
    slideWrapTitle.className = 'slide-wrap';
    const slideUpTitle = document.createElement('div');
    slideUpTitle.dataset.slideType = 'slide-up';
    slideUpTitle.className = 'slide-up';
    const heroFullWidthContentTitle = document.createElement('div');
    heroFullWidthContentTitle.className = 'hero-full-width__content__title';
    heroFullWidthContentTitle.setAttribute('tabindex', '0');
    heroFullWidthContentTitle.innerHTML = title;
    slideUpTitle.append(heroFullWidthContentTitle);
    slideWrapTitle.append(slideUpTitle);
    heroFullWidthContent.append(slideWrapTitle);
  }

  if (description) {
    const slideWrapDescription = document.createElement('div');
    slideWrapDescription.className = 'slide-wrap';
    const slideUpDescription = document.createElement('div');
    slideUpDescription.dataset.slideType = 'slide-up';
    slideUpDescription.className = 'slide-up';
    const heroFullWidthContentDescription = document.createElement('div');
    heroFullWidthContentDescription.className = 'hero-full-width__content__description';
    heroFullWidthContentDescription.setAttribute('tabindex', '0');
    heroFullWidthContentDescription.innerHTML = description;
    slideUpDescription.append(heroFullWidthContentDescription);
    slideWrapDescription.append(slideUpDescription);
    heroFullWidthContent.append(slideWrapDescription);
  }

  if (primaryCtaLabel || secondaryCtaLabel) {
    const slideWrapCtas = document.createElement('div');
    slideWrapCtas.className = 'slide-wrap';
    const slideUpCtas = document.createElement('div');
    slideUpCtas.dataset.slideType = 'slide-up';
    slideUpCtas.className = 'slide-up';
    const heroFullWidthContentCtas = document.createElement('div');
    heroFullWidthContentCtas.className = 'hero-full-width__content--ctas';

    if (primaryCtaLabel && primaryCtaHref) {
      const primaryCta = document.createElement('a');
      primaryCta.href = primaryCtaHref;
      primaryCta.className = 'cta cta__secondary primaryCta ';
      primaryCta.target = '_self';
      primaryCta.setAttribute('aria-label', primaryCtaLabel);
      primaryCta.dataset.palette = 'palette-light';
      const primaryCtaLabelSpan = document.createElement('span');
      primaryCtaLabelSpan.className = 'cta__label';
      primaryCtaLabelSpan.textContent = primaryCtaLabel;
      primaryCta.append(primaryCtaLabelSpan);
      heroFullWidthContentCtas.append(primaryCta);
    }

    if (secondaryCtaLabel && secondaryCtaHref) {
      const chevronWrapper = document.createElement('div');
      chevronWrapper.className = 'chevron-wrapper';

      const chevronButton = document.createElement('button');
      chevronButton.type = 'button';
      chevronButton.className = 'chevron-icon';
      chevronButton.setAttribute('aria-label', 'Open video modal');
      chevronWrapper.append(chevronButton);

      const secondaryCta = document.createElement('a');
      secondaryCta.href = secondaryCtaHref;
      secondaryCta.className = 'cta cta__link secondaryCta ';
      secondaryCta.target = '_self';
      secondaryCta.setAttribute('aria-label', secondaryCtaLabel);
      secondaryCta.dataset.palette = 'palette-light';

      const secondaryCtaIcon = document.createElement('span');
      secondaryCtaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
      secondaryCtaIcon.setAttribute('aria-hidden', 'true');
      secondaryCta.append(secondaryCtaIcon);

      const secondaryCtaLabelSpan = document.createElement('span');
      secondaryCtaLabelSpan.className = 'cta__label';
      secondaryCtaLabelSpan.textContent = secondaryCtaLabel;
      secondaryCta.append(secondaryCtaLabelSpan);
      chevronWrapper.append(secondaryCta);
      heroFullWidthContentCtas.append(chevronWrapper);
    }
    slideUpCtas.append(heroFullWidthContentCtas);
    slideWrapCtas.append(slideUpCtas);
    heroFullWidthContent.append(slideWrapCtas);
  }

  if (modalVideo) {
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

    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video hero-full-width__content--modal__video';

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container show-controls ';

    const videoContainerControls = document.createElement('div');
    videoContainerControls.className = 'video-container__controls';

    const timer = document.createElement('div');
    timer.className = 'video-container__controls__timer';

    const progressArea = document.createElement('div');
    progressArea.className = 'video-container__controls__timer__progress-area';
    progressArea.innerHTML = `
      <span class="video-container__controls__timer__progress-area__progress-bar"></span>
      <span class="video-container__controls__timer__progress-area__pointer"></span>
      <span class="video-container__controls__timer__progress-area__progress-pending"></span>
    `;
    timer.append(progressArea);

    const currentTime = document.createElement('p');
    currentTime.className = 'video-container__controls__timer__current-time';
    currentTime.textContent = '00:00';
    timer.append(currentTime);

    const duration = document.createElement('p');
    duration.className = 'video-container__controls__timer__duration';
    duration.textContent = '00:00';
    timer.append(duration);
    videoContainerControls.append(timer);

    const buttons = document.createElement('div');
    buttons.className = 'video-container__controls__buttons';

    const playButton = document.createElement('button');
    playButton.className = 'video-container__controls__buttons__play-button video-container__controls__buttons--button';
    playButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span>';
    buttons.append(playButton);

    const muteButton = document.createElement('button');
    muteButton.className = 'video-container__controls__buttons__mute-button video-container__controls__buttons--button';
    muteButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>';
    buttons.append(muteButton);

    const fullscreenButton = document.createElement('button');
    fullscreenButton.className = 'video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button';
    fullscreenButton.innerHTML = '<span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>';
    buttons.append(fullscreenButton);
    videoContainerControls.append(buttons);
    videoContainer.append(videoContainerControls);

    const modalVideoElement = document.createElement('video');
    modalVideoElement.className = 'video-container__video';
    modalVideoElement.setAttribute('playsinline', '');
    modalVideoElement.setAttribute('webkit-playsinline', '');
    modalVideoElement.setAttribute('muted', 'true');
    modalVideoElement.setAttribute('autoplay', '');

    const modalVideoSource = document.createElement('source');
    modalVideoSource.src = modalVideo;
    modalVideoSource.type = 'video/mp4';
    modalVideoElement.append(modalVideoSource);
    videoContainer.append(modalVideoElement);

    videoWrapper.append(videoContainer);
    dialog.append(videoWrapper);
    heroFullWidthContent.append(dialog);
  }

  heroFullWidth.append(heroFullWidthContent);
  block.append(heroFullWidth);
}
