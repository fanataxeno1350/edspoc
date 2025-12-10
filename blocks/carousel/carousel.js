import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
  // Transfer data attributes from the original swiper if present
  const originalSwiper = block.querySelector('.swiper.carousel-primary-swiper');
  if (originalSwiper) {
    Array.from(originalSwiper.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        swiper.setAttribute(attr.name, attr.value);
      }
    });
  }
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  const slides = block.querySelectorAll('[data-aue-model="carouselSlide"]');
  slides.forEach((slide, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    if (index === 0) {
      swiperSlide.classList.add('carousel-cmp-carousel__item--active');
      swiperSlide.setAttribute('data-active', '1');
    }

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    let mediaElement = null;
    const videoSource = slide.querySelector('[data-aue-prop="video"]');
    const imageSource = slide.querySelector('[data-aue-prop="image"]');
    const ctaLink = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaText = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoSource) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.setAttribute('src', videoSource.href || videoSource.textContent.trim());
      source.setAttribute('type', 'video/mp4'); // Assuming mp4 for now
      video.append(source);

      // Move instrumentation from original video/anchor to the new video element
      moveInstrumentation(videoSource, video);

      // Add play/pause buttons and mute/unmute buttons
      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      playPauseOverlay.innerHTML = `
        <button type="button" class="carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1765368595463.svg+xml
        </button>
        <button type="button" class="carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1765368595527.svg+xml
        </button>
      `;

      const muteOverlay = document.createElement('div');
      muteOverlay.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      muteOverlay.innerHTML = `
        <button type="button" class="carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
          /content/dam/aemigrate/uploaded-folder/image/1765368595561.svg+xml
        </button>
        <button type="button" class="carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
          /content/dam/aemigrate/uploaded-folder/image/1765368595645.svg+xml
        </button>
        <button type="button" class="carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1765368595712.svg+xml
        </button>
      `;

      videoWrapper.append(video, playPauseOverlay, muteOverlay);
      mediaElement = videoWrapper;
    } else if (imageSource) {
      const img = imageSource.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
        picture.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        // Transfer instrumentation from original img to the new picture's img
        moveInstrumentation(img, picture.querySelector('img'));
        mediaElement = picture;
      }
    }

    if (mediaElement) {
      wrapper.append(mediaElement);
    }

    if (ctaLink || ctaText) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');

      const link = document.createElement('a');
      link.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.setAttribute('target', '_blank');

      if (ctaLink) {
        link.href = ctaLink.href || ctaLink.textContent.trim();
        moveInstrumentation(ctaLink, link);
      }

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');

      if (ctaText) {
        span.textContent = ctaText.textContent.trim();
        moveInstrumentation(ctaText, span);
      }

      link.append(span);
      textCenter.append(link);
      bannerCta.append(textCenter);
      ctaWrapper.append(bannerCta);
      wrapper.append(ctaWrapper);
    }

    section.append(wrapper);
    carouselBanner.append(section);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add navigation buttons and pagination
  const swiperControlsContainer = document.createElement('div');
  swiperControlsContainer.classList.add('carousel-swiper-container');
  swiperControlsContainer.innerHTML = `
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
  swiper.append(swiperControlsContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiper.append(swiperPagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
