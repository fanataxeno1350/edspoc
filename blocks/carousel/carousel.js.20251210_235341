import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');
  carouselItems.forEach((item) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(item, swiperSlide);

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('carousel-banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoSource = item.querySelector('[data-aue-prop="video"]');
    const imageSource = item.querySelector('[data-aue-prop="image"]');
    const ctaLink = item.querySelector('[data-aue-prop="ctaLink"]');
    const ctaLabel = item.querySelector('[data-aue-prop="ctaLabel"]');

    if (videoSource) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('autoplay', 'true');
      videoElement.setAttribute('muted', 'true');

      const sourceElement = document.createElement('source');
      let videoSrc = videoSource.textContent.trim();
      if (!videoSrc) {
        const anchor = videoSource.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
        if (anchor) {
          videoSrc = anchor.href;
          moveInstrumentation(anchor, sourceElement);
        }
      }
      sourceElement.setAttribute('src', videoSrc);
      sourceElement.setAttribute('type', 'video/mp4');
      videoElement.append(sourceElement);
      moveInstrumentation(videoSource, videoElement);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      // Assuming the SVG content is directly in the authored HTML or needs to be fetched.
      // For now, just moving the text content if it's there.
      if (videoSource.nextElementSibling) {
        const playIcon = videoSource.nextElementSibling.cloneNode(true);
        playButton.append(playIcon);
        videoSource.nextElementSibling.remove();
      }

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      if (videoSource.nextElementSibling) {
        const pauseIcon = videoSource.nextElementSibling.cloneNode(true);
        pauseButton.append(pauseIcon);
        videoSource.nextElementSibling.remove();
      }

      playPauseOverlay.append(playButton, pauseButton);

      const muteOverlay = document.createElement('div');
      muteOverlay.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      if (videoSource.nextElementSibling) {
        const muteIcon = videoSource.nextElementSibling.cloneNode(true);
        muteButton.append(muteIcon);
        videoSource.nextElementSibling.remove();
      }

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      if (videoSource.nextElementSibling) {
        const unmuteIcon = videoSource.nextElementSibling.cloneNode(true);
        unmuteButton.append(unmuteIcon);
        videoSource.nextElementSibling.remove();
      }

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      if (videoSource.nextElementSibling) {
        const noAudioIcon = videoSource.nextElementSibling.cloneNode(true);
        noAudioButton.append(noAudioIcon);
        videoSource.nextElementSibling.remove();
      }

      muteOverlay.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(videoElement, playPauseOverlay, muteOverlay);
      bannerWrapper.append(videoWrapper);
    } else if (imageSource) {
      const img = imageSource.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        picture.querySelector('img').setAttribute('loading', 'eager');
        picture.querySelector('img').setAttribute('fetchpriority', 'high');
        picture.querySelector('img').setAttribute('decoding', 'async');
        moveInstrumentation(img, picture.querySelector('img'));
        bannerWrapper.append(picture);
      }
    }

    if (ctaLink || ctaLabel) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      if (ctaLink && ctaLabel) {
        const anchor = document.createElement('a');
        anchor.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
        anchor.setAttribute('data-link-region', 'CTA');
        anchor.setAttribute('data-is-internal', 'true');
        anchor.setAttribute('data-enable-gating', 'false');
        anchor.setAttribute('target', '_blank');
        anchor.href = ctaLink.textContent.trim();
        moveInstrumentation(ctaLink, anchor);

        const span = document.createElement('span');
        span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
        span.textContent = ctaLabel.textContent.trim();
        moveInstrumentation(ctaLabel, span);

        anchor.append(span);
        textCenterDiv.append(anchor);
      }

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popUpDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';
      textCenterDiv.append(popUpDiv);

      bannerCta.append(textCenterDiv);
      ctaWrapper.append(bannerCta);
      bannerWrapper.append(ctaWrapper);
    }

    bannerSection.append(bannerWrapper);
    carouselBanner.append(bannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add navigation buttons and pagination
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');
  actionsDiv.innerHTML = `
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Previous</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Next</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Pause</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Play</span>
    </button>
  `;
  swiperWrapper.append(actionsDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('carousel-swiper-container');
  swiperContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
        /content/dam/aemigrate/uploaded-folder/image/1765368595776.svg+xml
      </button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
        /content/dam/aemigrate/uploaded-folder/image/1765368595814.svg+xml
      </button>
    </div>
  `;
  swiper.append(swiperContainer);

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  pagination.innerHTML = '<span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';
  swiper.append(pagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.append(carouselContainer);
  block.dataset.blockStatus = 'loaded';
}