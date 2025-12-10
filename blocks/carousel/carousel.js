import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  const swiper = document.createElement('div');
  swiper.className = 'swiper carousel-primary-swiper';
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', 'true');
  swiper.setAttribute('data-delay', '5000');
  swiper.setAttribute('data-autopause-disabled', 'true');
  swiper.setAttribute('data-is-loop', 'false');
  swiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  const slides = block.querySelectorAll('[data-aue-model="carouselSlide"]');
  slides.forEach((slide) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide carousel-primary-swiper-slide';
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(slide, swiperSlide);

    const carouselBanner = document.createElement('div');
    carouselBanner.className = 'carousel-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-section';

    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper ';

    const videoEl = slide.querySelector('[data-aue-prop="video"]');
    const imageEl = slide.querySelector('[data-aue-prop="image"]');
    const linkEl = slide.querySelector('[data-aue-prop="link"]');
    const linkLabelEl = slide.querySelector('[data-aue-prop="linkLabel"]');

    if (videoEl) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';

      const video = document.createElement('video');
      video.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
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
      source.setAttribute('src', videoEl.textContent.trim());
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      moveInstrumentation(videoEl, video);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.className = 'carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595463.svg+xml'; // Placeholder for SVG

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.className = 'carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595527.svg+xml'; // Placeholder for SVG

      playPauseOverlay.append(playButton, pauseButton);

      const muteOverlay = document.createElement('div');
      muteOverlay.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon ';

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.className = 'carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595561.svg+xml'; // Placeholder for SVG

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.className = 'carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595645.svg+xml'; // Placeholder for SVG

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.className = 'carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595712.svg+xml'; // Placeholder for SVG

      muteOverlay.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(video, playPauseOverlay, muteOverlay);
      wrapper.append(videoWrapper);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt);
      const img = picture.querySelector('img');
      img.className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('decoding', 'async');
      moveInstrumentation(imageEl, img);
      wrapper.append(picture);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

    if (linkEl && linkLabelEl) {
      const bannerCta = document.createElement('div');
      bannerCta.className = 'carousel-banner-cta';

      const textCenterDiv = document.createElement('div');
      textCenterDiv.className = 'carousel-text-center ';

      const link = document.createElement('a');
      link.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      link.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.href = linkEl.textContent.trim();
      link.target = '_blank';

      const span = document.createElement('span');
      span.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      span.textContent = linkLabelEl.textContent.trim();
      link.append(span);
      moveInstrumentation(linkEl, link);
      moveInstrumentation(linkLabelEl, span);

      const popupDiv = document.createElement('div');
      popupDiv.className = 'carousel-pop-up carousel-d-none';
      popupDiv.innerHTML = '<input type="hidden" class="carousel-popup-message"><input type="hidden" class="carousel-proceed-button-label"><input type="hidden" class="carousel-cancel-button-label"><input type="hidden" class="carousel-background-color">';

      textCenterDiv.append(link, popupDiv);
      bannerCta.append(textCenterDiv);
      ctaWrapper.append(bannerCta);
    } else if (!videoEl && !imageEl) {
      // If no media, but CTA is present, still create the CTA wrapper
      ctaWrapper.innerHTML = '<div class="carousel-banner-cta"></div>';
    }

    wrapper.append(ctaWrapper);
    section.append(wrapper);
    carouselBanner.append(section);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add carousel actions (prev/next/pause/play buttons)
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'carousel-cmp-carousel__actions';
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

  // Add swiper navigation buttons
  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.className = 'carousel-swiper-container';
  swiperNavContainer.innerHTML = `
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
  swiper.append(swiperNavContainer);

  // Add swiper pagination
  const swiperPagination = document.createElement('div');
  swiperPagination.className = 'swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  // Pagination bullets will be added by Swiper JS, just create the container
  swiper.append(swiperPagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
