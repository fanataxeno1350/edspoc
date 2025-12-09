import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperContainer.setAttribute('data-swiper-id', '.carousel-primary-swiper-carousel-419d8524f7');
  swiperContainer.id = `carousel-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
  swiperContainer.setAttribute('role', 'group');
  swiperContainer.setAttribute('aria-live', 'polite');
  swiperContainer.setAttribute('aria-roledescription', 'carousel');
  swiperContainer.setAttribute('data-is-autoplay', 'true');
  swiperContainer.setAttribute('data-delay', '5000');
  swiperContainer.setAttribute('data-autopause-disabled', 'true');
  swiperContainer.setAttribute('data-is-loop', 'false');
  swiperContainer.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');
  swiperContainer.append(swiperWrapper);

  [...block.children].forEach((row, index) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.id = `${swiperContainer.id}-item-${Math.random().toString(36).substring(2, 11)}-tabpanel`; // Generate unique ID
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-labelledby', `${swiperContainer.id}-item-${Math.random().toString(36).substring(2, 11)}-tab`); // Generate unique ID
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('cmp-carousel__item--active', 'swiper-slide-prev');
      swiperSlide.setAttribute('data-active', '1');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-active');
    }

    const bannerComponent = document.createElement('div');
    bannerComponent.classList.add('banner-component');
    swiperSlide.append(bannerComponent);

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');
    bannerComponent.append(bannerSection);

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'banner-section__wrapper');
    bannerSection.append(bannerWrapper);

    const cells = [...row.children];

    // Video
    const videoCell = cells[0];
    const video = videoCell.querySelector('a');
    if (video) {
      const bannerVideoWrapper = document.createElement('div');
      bannerVideoWrapper.classList.add('banner-video-wrapper');
      bannerWrapper.append(bannerVideoWrapper);

      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'banner-media', 'banner-video');
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      const sourceElement = document.createElement('source');
      sourceElement.src = video.href;
      sourceElement.type = 'video/mp4';
      videoElement.append(sourceElement);
      bannerVideoWrapper.append(videoElement);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      bannerVideoWrapper.append(playPauseOverlay);

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.classList.add('carousel-d-none', 'banner-video-icon', 'banner-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playPauseOverlay.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.classList.add('carousel-d-block', 'banner-video-icon', 'banner-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playPauseOverlay.append(pauseButton);

      const muteOverlay = document.createElement('div');
      muteOverlay.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'banner-mute-icon');
      bannerVideoWrapper.append(muteOverlay);

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteOverlay.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteOverlay.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      muteOverlay.append(noAudioButton);
    }

    // Image
    const imageCell = cells[1];
    const image = imageCell.querySelector('img');
    if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'banner-media', 'banner-image');
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      bannerWrapper.append(optimizedPic);
    }

    // CTA
    const ctaCell = cells[2];
    const ctaLink = ctaCell.querySelector('a');
    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');
      bannerWrapper.append(ctaWrapper);

      const bannerCtaComponent = document.createElement('div');
      bannerCtaComponent.classList.add('banner-cta-component');
      ctaWrapper.append(bannerCtaComponent);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');
      bannerCtaComponent.append(textCenterDiv);

      const newCtaLink = document.createElement('a');
      newCtaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate unique ID
      newCtaLink.classList.add('cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      newCtaLink.setAttribute('data-link-region', 'CTA');
      newCtaLink.setAttribute('data-is-internal', 'true');
      newCtaLink.setAttribute('data-enable-gating', 'false');
      newCtaLink.href = ctaLink.href;
      newCtaLink.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaLink.textContent.trim();
      newCtaLink.append(ctaSpan);
      textCenterDiv.append(newCtaLink);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      textCenterDiv.append(popupDiv);

      const popupMessageInput = document.createElement('input');
      popupMessageInput.type = 'hidden';
      popupMessageInput.classList.add('carousel-popup-message');
      popupDiv.append(popupMessageInput);

      const proceedButtonInput = document.createElement('input');
      proceedButtonInput.type = 'hidden';
      proceedButtonInput.classList.add('carousel-proceed-button-label');
      popupDiv.append(proceedButtonInput);

      const cancelButtonInput = document.createElement('input');
      cancelButtonInput.type = 'hidden';
      cancelButtonInput.classList.add('carousel-cancel-button-label');
      popupDiv.append(cancelButtonInput);

      const backgroundColorInput = document.createElement('input');
      backgroundColorInput.type = 'hidden';
      backgroundColorInput.classList.add('carousel-background-color');
      popupDiv.append(backgroundColorInput);
    }

    swiperWrapper.append(swiperSlide);
  });

  // Add navigation buttons (Previous/Next/Play/Pause)
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('cmp-carousel__actions');
  swiperWrapper.append(actionsDiv);

  const prevButton = document.createElement('button');
  prevButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--previous');
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';
  actionsDiv.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--next');
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';
  actionsDiv.append(nextButton);

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--pause');
  pauseButton.type = 'button';
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';
  actionsDiv.append(pauseButton);

  const playButton = document.createElement('button');
  playButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--play', 'cmp-carousel__action--disabled');
  playButton.type = 'button';
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';
  actionsDiv.append(playButton);

  // Add swiper navigation buttons
  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('swiper-container');
  swiperContainer.append(swiperNavContainer);

  const nextButtonWrapper = document.createElement('div');
  const nextSwiperButton = document.createElement('button');
  nextSwiperButton.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  nextSwiperButton.setAttribute('disabled', '');
  nextButtonWrapper.append(nextSwiperButton);
  swiperNavContainer.append(nextButtonWrapper);

  const prevButtonWrapper = document.createElement('div');
  const prevSwiperButton = document.createElement('button');
  prevSwiperButton.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevButtonWrapper.append(prevSwiperButton);
  swiperNavContainer.append(prevButtonWrapper);

  // Add pagination
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperContainer.append(swiperPagination);

  // Add pagination bullets (example for 2 slides)
  const bullet1 = document.createElement('span');
  bullet1.classList.add('swiper-pagination-bullet');
  swiperPagination.append(bullet1);

  const bullet2 = document.createElement('span');
  bullet2.classList.add('swiper-pagination-bullet', 'swiper-pagination-bullet-active');
  swiperPagination.append(bullet2);

  block.textContent = '';
  block.classList.add('carousel-container');
  block.append(swiperContainer);
}
