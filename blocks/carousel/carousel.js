import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiperPrimary = document.createElement('div');
  swiperPrimary.classList.add('swiper', 'carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperPrimary.setAttribute('role', 'group');
  swiperPrimary.setAttribute('aria-live', 'polite');
  swiperPrimary.setAttribute('aria-roledescription', 'carousel');
  swiperPrimary.setAttribute('data-is-autoplay', 'true');
  swiperPrimary.setAttribute('data-delay', '5000');
  swiperPrimary.setAttribute('data-autopause-disabled', 'true');
  swiperPrimary.setAttribute('data-is-loop', 'false');
  swiperPrimary.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  Array.from(block.children).forEach((row) => {
    const carouselSlide = document.createElement('div');
    carouselSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    carouselSlide.setAttribute('role', 'tabpanel');
    carouselSlide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(row, carouselSlide);

    const banner = document.createElement('div');
    banner.classList.add('carousel-banner');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('carousel-banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoCell = row.children[0];
    const imageCell = row.children[1];
    const ctaLinkCell = row.children[2];
    const ctaTextCell = row.children[3];

    let mediaElement = null;
    let mediaWrapper = null;

    // Handle video
    let videoSource = videoCell.querySelector('[data-aue-prop="video"]');
    if (!videoSource) {
      const anchor = videoCell.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
      if (anchor) {
        videoSource = anchor;
      }
    }

    if (videoSource) {
      mediaWrapper = document.createElement('div');
      mediaWrapper.classList.add('carousel-video-wrapper');

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
      source.setAttribute('src', videoSource.getAttribute('href') || videoSource.src);
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      mediaWrapper.append(video);
      moveInstrumentation(videoSource, video);

      const controlsWrapper = document.createElement('div');
      controlsWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      // Assuming play icon content is static or handled by CSS background
      controlsWrapper.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      // Assuming pause icon content is static or handled by CSS background
      controlsWrapper.append(pauseButton);

      mediaWrapper.append(controlsWrapper);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteIconWrapper.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteIconWrapper.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      muteIconWrapper.append(noAudioButton);

      mediaWrapper.append(muteIconWrapper);

      mediaElement = mediaWrapper;
    } else {
      // Handle image
      const img = imageCell.querySelector('img[data-aue-prop="image"]');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        pic.querySelector('img').setAttribute('loading', 'eager');
        pic.querySelector('img').setAttribute('fetchpriority', 'high');
        pic.querySelector('img').setAttribute('decoding', 'async');
        mediaElement = pic;
        moveInstrumentation(img, pic.querySelector('img'));
      }
    }

    if (mediaElement) {
      bannerWrapper.append(mediaElement);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    const textCenter = document.createElement('div');
    textCenter.classList.add('carousel-text-center');

    const ctaLink = ctaLinkCell.querySelector('a[data-aue-prop="ctaLink"]');
    const ctaText = ctaTextCell.querySelector('[data-aue-prop="ctaText"]');

    if (ctaLink && ctaText) {
      const anchor = document.createElement('a');
      anchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      anchor.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      anchor.setAttribute('data-link-region', 'CTA');
      anchor.setAttribute('data-is-internal', 'true');
      anchor.setAttribute('data-enable-gating', 'false');
      anchor.setAttribute('href', ctaLink.getAttribute('href'));
      anchor.setAttribute('target', '_blank');

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = ctaText.textContent;
      moveInstrumentation(ctaText, span);
      anchor.append(span);
      moveInstrumentation(ctaLink, anchor);
      textCenter.append(anchor);
    }

    const popUp = document.createElement('div');
    popUp.classList.add('carousel-pop-up', 'carousel-d-none');
    popUp.innerHTML = `
      <input type="hidden" class="carousel-popup-message">
      <input type="hidden" class="carousel-proceed-button-label">
      <input type="hidden" class="carousel-cancel-button-label">
      <input type="hidden" class="carousel-background-color">
    `;
    textCenter.append(popUp);

    bannerCta.append(textCenter);
    ctaWrapper.append(bannerCta);
    bannerWrapper.append(ctaWrapper);

    bannerSection.append(bannerWrapper);
    banner.append(bannerSection);
    carouselSlide.append(banner);
    swiperWrapper.append(carouselSlide);
  });

  swiperPrimary.append(swiperWrapper);

  const carouselActions = document.createElement('div');
  carouselActions.classList.add('carousel-cmp-carousel__actions');
  carouselActions.innerHTML = `
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
  swiperPrimary.append(carouselActions);

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
  swiperPrimary.append(swiperContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  // Pagination bullets will be dynamically added by Swiper JS, so we just add the container.
  swiperPrimary.append(swiperPagination);

  carouselContainer.append(swiperPrimary);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
