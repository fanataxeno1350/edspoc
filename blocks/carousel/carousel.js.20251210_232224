import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  const slides = block.querySelectorAll('[data-aue-model="carouselSlide"]');
  slides.forEach((slide) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(slide, swiperSlide);

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');
    swiperSlide.append(carouselBanner);

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.classList.add('carousel-banner-section');
    carouselBanner.append(carouselBannerSection);

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');
    carouselBannerSection.append(bannerWrapper);

    let mediaElement;
    const videoSource = slide.querySelector('[data-aue-prop="video"]');
    const imageSource = slide.querySelector('[data-aue-prop="image"]');
    const ctaLink = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaText = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoSource) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      bannerWrapper.append(videoWrapper);

      mediaElement = document.createElement('video');
      mediaElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      mediaElement.setAttribute('title', 'Video');
      mediaElement.setAttribute('aria-label', 'Video');
      mediaElement.setAttribute('playsinline', '');
      mediaElement.setAttribute('preload', 'metadata');
      mediaElement.setAttribute('fetchpriority', 'high');
      mediaElement.setAttribute('muted', 'true');
      mediaElement.setAttribute('autoplay', 'true');

      let videoSrc = videoSource.textContent.trim();
      if (!videoSrc) {
        const anchor = videoSource.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
        if (anchor) {
          videoSrc = anchor.href;
        }
      }
      if (videoSrc) {
        const source = document.createElement('source');
        source.setAttribute('src', videoSrc);
        source.setAttribute('type', 'video/mp4');
        mediaElement.append(source);
      }
      moveInstrumentation(videoSource, mediaElement);
      videoWrapper.append(mediaElement);

      // Add video controls placeholder structure
      const controlsOverlay = document.createElement('div');
      controlsOverlay.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      controlsOverlay.innerHTML = `
        <button type="button" class="carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer"></button>
        <button type="button" class="carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer"></button>
      `;
      videoWrapper.append(controlsOverlay);

      const muteOverlay = document.createElement('div');
      muteOverlay.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      muteOverlay.innerHTML = `
        <button type="button" class="carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none"></button>
        <button type="button" class="carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none"></button>
        <button type="button" class="carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer"></button>
      `;
      videoWrapper.append(muteOverlay);

    } else if (imageSource) {
      let img = imageSource.querySelector('img');
      if (!img) {
        const anchor = imageSource.querySelector('a[href$=".webp"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
        if (anchor) {
          img = document.createElement('img');
          img.src = anchor.href;
          img.alt = anchor.title || '';
        }
      }

      if (img) {
        mediaElement = createOptimizedPicture(img.src, img.alt, true, [{ width: '2000' }]);
        const pictureImg = mediaElement.querySelector('img');
        pictureImg.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        pictureImg.setAttribute('loading', 'eager');
        pictureImg.setAttribute('fetchpriority', 'high');
        pictureImg.setAttribute('decoding', 'async');
        bannerWrapper.append(mediaElement);
        moveInstrumentation(imageSource, pictureImg);
      }
    }

    if (ctaLink || ctaText) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');
      bannerWrapper.append(ctaWrapper);

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');
      ctaWrapper.append(bannerCta);

      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');
      bannerCta.append(textCenter);

      if (ctaLink && ctaText) {
        const linkElement = ctaLink.querySelector('a');
        if (linkElement) {
          const anchor = document.createElement('a');
          anchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
          anchor.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
          anchor.setAttribute('data-link-region', 'CTA');
          anchor.setAttribute('data-is-internal', 'true');
          anchor.setAttribute('data-enable-gating', 'false');
          anchor.href = linkElement.href;
          anchor.target = linkElement.target || '_self';

          const span = document.createElement('span');
          span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
          span.textContent = ctaText.textContent.trim();
          anchor.append(span);
          textCenter.append(anchor);
          moveInstrumentation(ctaLink, anchor);
          moveInstrumentation(ctaText, span);
        }
      }

      // Add pop-up placeholder structure
      const popup = document.createElement('div');
      popup.classList.add('carousel-pop-up', 'carousel-d-none');
      popup.innerHTML = `
        <input type="hidden" class="carousel-popup-message">
        <input type="hidden" class="carousel-proceed-button-label">
        <input type="hidden" class="carousel-cancel-button-label">
        <input type="hidden" class="carousel-background-color">
      `;
      textCenter.append(popup);
    }

    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add carousel actions placeholder structure
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

  // Add swiper navigation buttons placeholder structure
  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('carousel-swiper-container');
  swiperNavContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled"></button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click"></button>
    </div>
  `;
  swiper.append(swiperNavContainer);

  // Add swiper pagination placeholder structure
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiper.append(swiperPagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}