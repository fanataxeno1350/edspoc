import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slides = [...block.children];
  block.textContent = '';

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiperDiv = document.createElement('div');
  swiperDiv.classList.add('swiper', 'carousel-primary-swiper');
  swiperDiv.setAttribute('data-swiper-id', '.carousel-primary-swiper');
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

  slides.forEach((slide, index) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    slideWrapper.setAttribute('role', 'tabpanel');
    slideWrapper.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const mediaElement = slide.querySelector('[data-aue-prop="media"]');
    if (mediaElement) {
      if (mediaElement.tagName === 'VIDEO' || (mediaElement.tagName === 'A' && mediaElement.href.match(/\.(mp4|webm|ogg)$/i))) {
        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('carousel-video-wrapper');

        const video = document.createElement('video');
        video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');
        video.setAttribute('fetchpriority', 'high');
        video.setAttribute('muted', 'true');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('loop', 'false');

        const source = document.createElement('source');
        source.setAttribute('src', mediaElement.tagName === 'VIDEO' ? mediaElement.src : mediaElement.href);
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

        const muteIconDiv = document.createElement('div');
        muteIconDiv.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

        const muteButton = document.createElement('button');
        muteButton.setAttribute('type', 'button');
        muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');

        const unmuteButton = document.createElement('button');
        unmuteButton.setAttribute('type', 'button');
        unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');

        const noAudioButton = document.createElement('button');
        noAudioButton.setAttribute('type', 'button');
        noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

        muteIconDiv.append(muteButton, unmuteButton, noAudioButton);

        videoWrapper.append(video, playPauseOverlay, muteIconDiv);
        wrapperDiv.append(videoWrapper);
      } else if (mediaElement.tagName === 'IMG' || (mediaElement.tagName === 'A' && mediaElement.href.match(/\.(jpeg|jpg|png|gif|webp)$/i))) {
        const img = mediaElement.tagName === 'IMG' ? mediaElement : document.createElement('img');
        if (mediaElement.tagName === 'A') {
          img.src = mediaElement.href;
          img.alt = mediaElement.textContent || '';
        }
        img.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        img.setAttribute('loading', 'eager');
        img.setAttribute('fetchpriority', 'high');
        img.setAttribute('decoding', 'async');
        wrapperDiv.append(createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '2000' }]));
      }
    }

    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCtaDiv = document.createElement('div');
    bannerCtaDiv.classList.add('carousel-banner-cta');

    const ctaContent = slide.querySelector('[data-aue-prop="cta"]');
    if (ctaContent) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const link = ctaContent.querySelector('a');
      if (link) {
        const ctaLink = document.createElement('a');
        ctaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`;
        ctaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
        ctaLink.setAttribute('data-link-region', 'CTA');
        ctaLink.setAttribute('data-is-internal', 'true');
        ctaLink.setAttribute('data-enable-gating', 'false');
        ctaLink.href = link.href;
        if (link.target) {
          ctaLink.target = link.target;
        }

        const span = document.createElement('span');
        span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'famlf-cta-btn');
        span.textContent = link.textContent.trim();
        ctaLink.append(span);
        textCenterDiv.append(ctaLink);
      }

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');

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

      popupDiv.append(popupMessage, proceedButton, cancelButton, backgroundColor);
      textCenterDiv.append(popupDiv);
      bannerCtaDiv.append(textCenterDiv);
    }

    ctaDiv.append(bannerCtaDiv);
    wrapperDiv.append(ctaDiv);

    section.append(wrapperDiv);
    bannerDiv.append(section);
    slideWrapper.append(bannerDiv);

    swiperWrapper.append(slideWrapper);
    moveInstrumentation(slide, slideWrapper);
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-label', 'Previous Slide');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text"></span>';

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-label', 'Next Slide');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text"></span>';

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--pause');
  pauseButton.setAttribute('type', 'button');
  pauseButton.setAttribute('aria-label', 'Pause Carousel');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text"></span>';

  const playButton = document.createElement('button');
  playButton.classList.add('carousel-cmp-carousel__action', 'carousel-cmp-carousel__action--play', 'carousel-cmp-carousel__action--disabled');
  playButton.setAttribute('type', 'button');
  playButton.setAttribute('aria-label', 'Play Carousel');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.innerHTML = '<span class="carousel-cmp-carousel__action-icon"></span><span class="carousel-cmp-carousel__action-text"></span>';

  actionsDiv.append(prevButton, nextButton, pauseButton, playButton);
  swiperWrapper.append(actionsDiv);

  swiperDiv.append(swiperWrapper);

  const swiperControlsContainer = document.createElement('div');
  swiperControlsContainer.classList.add('carousel-swiper-container');

  const nextButtonWrapper = document.createElement('div');
  const nextControlBtn = document.createElement('button');
  nextControlBtn.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click', 'carousel-disabled');
  nextControlBtn.setAttribute('disabled', '');
  nextButtonWrapper.append(nextControlBtn);

  const prevButtonWrapper = document.createElement('div');
  const prevControlBtn = document.createElement('button');
  prevControlBtn.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevButtonWrapper.append(prevControlBtn);

  swiperControlsContainer.append(nextButtonWrapper, prevButtonWrapper);
  swiperDiv.append(swiperControlsContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  for (let i = 0; i < slides.length; i += 1) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 0) {
      bullet.classList.add('carousel-swiper-pagination-bullet-active');
    }
    paginationDiv.append(bullet);
  }

  swiperDiv.append(paginationDiv);

  carouselContainer.append(swiperDiv);
  block.append(carouselContainer);

  block.className = `carousel block`;
  block.dataset.blockStatus = 'loaded';
}
