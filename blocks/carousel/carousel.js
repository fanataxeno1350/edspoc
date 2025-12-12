import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = Array.from(block.children);
  const newBlock = document.createElement('div');
  newBlock.classList.add('carousel-container');

  const swiperDiv = document.createElement('div');
  swiperDiv.classList.add('swiper', 'carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperDiv.setAttribute('role', 'group');
  swiperDiv.setAttribute('aria-live', 'polite');
  swiperDiv.setAttribute('aria-roledescription', 'carousel');
  swiperDiv.setAttribute('data-is-autoplay', 'true');
  swiperDiv.setAttribute('data-delay', '5000');
  swiperDiv.setAttribute('data-autopause-disabled', 'true');
  swiperDiv.setAttribute('data-is-loop', 'false');
  swiperDiv.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  carouselItems.forEach((itemNode, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    if (index === 0) {
      swiperSlide.classList.add('carousel-cmp-carousel__item--active', 'carousel-swiper-slide-prev');
      swiperSlide.setAttribute('data-active', '1');
    } else if (index === 1) {
      swiperSlide.classList.add('carousel-swiper-slide-active');
    }

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('carousel-banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoElement = itemNode.querySelector('[data-aue-prop="video"]');
    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    const ctaLinkElement = itemNode.querySelector('[data-aue-prop="ctaLink"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('data-is-autoplay', 'true');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.setAttribute('src', videoElement.textContent.trim());
      source.setAttribute('type', 'video/mp4');
      video.append(source);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      playPauseOverlay.append(playButton, pauseButton);

      const muteOverlay = document.createElement('div');
      muteOverlay.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      muteOverlay.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(video, playPauseOverlay, muteOverlay);
      bannerWrapper.append(videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.querySelector('img').src, imageElement.querySelector('img').alt, true, [{ width: '2000' }]);
      picture.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      bannerWrapper.append(picture);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    if (ctaLinkElement) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const ctaLink = document.createElement('a');
      ctaLink.setAttribute('id', `cta-${Math.random().toString(36).substring(2, 11)}`);
      ctaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.setAttribute('href', ctaLinkElement.querySelector('a').href);
      ctaLink.setAttribute('target', '_blank');

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaLinkElement.querySelector('a').textContent.trim();
      ctaLink.append(ctaSpan);

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('carousel-pop-up', 'carousel-d-none');

      const popupMessage = document.createElement('input');
      popupMessage.setAttribute('type', 'hidden');
      popupMessage.classList.add('carousel-popup-message');

      const proceedButton = document.createElement('input');
      proceedButton.setAttribute('type', 'hidden');
      proceedButton.classList.add('carousel-proceed-button-label');

      const cancelButton = document.createElement('input');
      cancelButton.setAttribute('type', 'hidden');
      cancelButton.classList.add('carousel-cancel-button-label');

      const backgroundColor = document.createElement('input');
      backgroundColor.setAttribute('type', 'hidden');
      backgroundColor.classList.add('carousel-background-color');

      popUpDiv.append(popupMessage, proceedButton, cancelButton, backgroundColor);
      textCenterDiv.append(ctaLink, popUpDiv);
      bannerCta.append(textCenterDiv);
    }

    ctaWrapper.append(bannerCta);
    bannerWrapper.append(ctaWrapper);
    bannerSection.append(bannerWrapper);
    carouselBanner.append(bannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(itemNode, swiperSlide);
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Next</span>';

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--pause');
  pauseButton.setAttribute('type', 'button');
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Pause</span>';

  const playButton = document.createElement('button');
  playButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--play', 'carousel-cmp-carousel__action--disabled');
  playButton.setAttribute('type', 'button');
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text">Play</span>';

  actionsDiv.append(prevButton, nextButton, pauseButton, playButton);
  swiperWrapper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('carousel-swiper-container');

  const nextButtonWrapper = document.createElement('div');
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click', 'carousel-disabled');
  nextBtn.setAttribute('disabled', '');
  nextButtonWrapper.append(nextBtn);

  const prevButtonWrapper = document.createElement('div');
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevButtonWrapper.append(prevBtn);

  swiperContainer.append(nextButtonWrapper, prevButtonWrapper);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');

  for (let i = 0; i < carouselItems.length; i += 1) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 1) {
      bullet.classList.add('carousel-swiper-pagination-bullet-active');
    }
    paginationDiv.append(bullet);
  }

  swiperDiv.append(swiperWrapper, swiperContainer, paginationDiv);
  newBlock.append(swiperDiv);

  block.textContent = '';
  block.append(newBlock);
  block.className = `carousel block`;
  block.dataset.blockStatus = 'loaded';
}
