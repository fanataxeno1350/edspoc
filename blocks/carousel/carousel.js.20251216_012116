import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = [...block.children];

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', 'true');
  swiper.setAttribute('data-delay', '5000');
  swiper.setAttribute('data-autopause-disabled', 'true');
  swiper.setAttribute('data-is-loop', 'false');
  swiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  carouselItems.forEach((itemNode, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');

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

      const controlsWrapper = document.createElement('div');
      controlsWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      controlsWrapper.append(playButton, pauseButton);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(video, controlsWrapper, muteIconWrapper);
      bannerWrapper.append(videoWrapper);
    } else if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      picture.querySelector('img').setAttribute('loading', 'eager');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('decoding', 'async');
      bannerWrapper.append(picture);
    }

    if (ctaLinkElement) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');

      const ctaLink = document.createElement('a');
      ctaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.setAttribute('href', ctaLinkElement.href);
      ctaLink.setAttribute('target', '_blank');

      const ctaTextSpan = document.createElement('span');
      ctaTextSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaTextSpan.textContent = ctaLinkElement.textContent.trim();
      ctaLink.append(ctaTextSpan);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popupDiv.innerHTML = `
        <input type="hidden" class="carousel-popup-message">
        <input type="hidden" class="carousel-proceed-button-label">
        <input type="hidden" class="carousel-cancel-button-label">
        <input type="hidden" class="carousel-background-color">
      `;

      textCenter.append(ctaLink, popupDiv);
      bannerCta.append(textCenter);
      ctaWrapper.append(bannerCta);
      bannerWrapper.append(ctaWrapper);
    }

    bannerSection.append(bannerWrapper);
    carouselBanner.append(bannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(itemNode, swiperSlide);
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');
  actionsDiv.innerHTML = `
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text"></span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text"></span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text"></span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text"></span>
    </button>
  `;
  swiperWrapper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('carousel-swiper-container');
  swiperContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled=""></button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click"></button>
    </div>
  `;

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  swiper.append(swiperWrapper, swiperContainer, swiperPagination);
  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
  block.classList.add('carousel');
  block.dataset.blockStatus = 'loaded';
}
