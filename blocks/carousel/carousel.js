import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.classList.add('carousel-position-relative');

  const primarySwiper = document.createElement('div');
  primarySwiper.classList.add('carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  primarySwiper.setAttribute('role', 'group');
  primarySwiper.setAttribute('aria-live', 'polite');
  primarySwiper.setAttribute('aria-roledescription', 'carousel');
  primarySwiper.setAttribute('data-is-autoplay', 'true');
  primarySwiper.setAttribute('data-delay', '5000');
  primarySwiper.setAttribute('data-autopause-disabled', 'true');
  primarySwiper.setAttribute('data-is-loop', 'false');
  primarySwiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  const slides = block.querySelectorAll('[data-aue-model="carouselSlide"]');
  slides.forEach((slide, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    if (index === 0) {
      swiperSlide.classList.add('carousel-cmp-carousel__item--active', 'swiper-slide-prev');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-active');
    }

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const sectionWrapper = document.createElement('div');
    sectionWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoField = slide.querySelector('[data-aue-prop="video"]');
    const imageField = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkField = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaLabelField = slide.querySelector('[data-aue-prop="ctaLabel"]');

    if (videoField) {
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
      source.setAttribute('src', videoField.textContent.trim());
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      moveInstrumentation(videoField, video);

      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765875730626.svg+xml'; // Placeholder

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      pauseButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765875730696.svg+xml'; // Placeholder

      playPauseWrapper.append(playButton, pauseButton);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765875730778.svg+xml'; // Placeholder

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      unmuteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765875730847.svg+xml'; // Placeholder

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      noAudioButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765875730937.svg+xml'; // Placeholder

      muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(video, playPauseWrapper, muteIconWrapper);
      sectionWrapper.append(videoWrapper);
    } else if (imageField) {
      const img = imageField.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        picture.querySelector('img').setAttribute('loading', 'eager');
        picture.querySelector('img').setAttribute('fetchpriority', 'high');
        picture.querySelector('img').setAttribute('decoding', 'async');
        sectionWrapper.append(picture);
        moveInstrumentation(imageField, picture);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    if (ctaLinkField && ctaLabelField) {
      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');

      const ctaLink = document.createElement('a');
      ctaLink.setAttribute('id', `cta-${Math.random().toString(36).substring(2, 11)}`);
      ctaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.setAttribute('href', ctaLinkField.textContent.trim());
      ctaLink.setAttribute('target', '_blank');

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaLabelField.textContent.trim();
      moveInstrumentation(ctaLabelField, ctaSpan);

      ctaLink.append(ctaSpan);
      moveInstrumentation(ctaLinkField, ctaLink);

      const popup = document.createElement('div');
      popup.classList.add('carousel-pop-up', 'carousel-d-none');
      popup.innerHTML = `
        <input type="hidden" class="carousel-popup-message">
        <input type="hidden" class="carousel-proceed-button-label">
        <input type="hidden" class="carousel-cancel-button-label">
        <input type="hidden" class="carousel-background-color">
      `;

      textCenter.append(ctaLink, popup);
      bannerCta.append(textCenter);
    }

    ctaWrapper.append(bannerCta);
    sectionWrapper.append(ctaWrapper);
    section.append(sectionWrapper);
    carouselBanner.append(section);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(slide, swiperSlide);
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
  swiperContainer.classList.add('swiper-container');

  const nextButtonWrapper = document.createElement('div');
  const nextSwiperButton = document.createElement('button');
  nextSwiperButton.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  nextSwiperButton.setAttribute('disabled', '');
  nextSwiperButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765875731026.svg+xml'; // Placeholder
  nextButtonWrapper.append(nextSwiperButton);

  const prevButtonWrapper = document.createElement('div');
  const prevSwiperButton = document.createElement('button');
  prevSwiperButton.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevSwiperButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765875731114.svg+xml'; // Placeholder
  prevButtonWrapper.append(prevSwiperButton);

  swiperContainer.append(nextButtonWrapper, prevButtonWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperPagination.innerHTML = '<span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>';

  primarySwiper.append(swiperWrapper, swiperContainer, swiperPagination);
  carouselPositionRelative.append(primarySwiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
  block.className = `carousel block`;
  block.dataset.blockStatus = 'loaded';
}
