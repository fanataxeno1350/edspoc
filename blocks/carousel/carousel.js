import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiperCarousel = document.createElement('div');
  swiperCarousel.classList.add('swiper', 'carousel-primary-swiper');
  swiperCarousel.setAttribute('role', 'group');
  swiperCarousel.setAttribute('aria-live', 'polite');
  swiperCarousel.setAttribute('aria-roledescription', 'carousel');
  // Default values, will be overridden by actual attributes if present
  swiperCarousel.setAttribute('data-is-autoplay', 'true');
  swiperCarousel.setAttribute('data-delay', '5000');
  swiperCarousel.setAttribute('data-autopause-disabled', 'true');
  swiperCarousel.setAttribute('data-is-loop', 'false');
  swiperCarousel.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  const slides = [...block.children];
  slides.forEach((row, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(row, swiperSlide);

    const bannerComponent = document.createElement('div');
    bannerComponent.classList.add('banner-component');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'banner-section__wrapper');

    const cells = [...row.children];
    let mediaElement = null;
    let ctaLinkElement = null;

    // Extract Video
    let videoSource = cells[0].querySelector('[data-aue-prop="video"]');
    if (!videoSource) {
      const anchor = cells[0].querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
      if (anchor) {
        videoSource = anchor;
      }
    }

    // Extract Image
    let imageSource = cells[1].querySelector('[data-aue-prop="image"]');
    if (!imageSource) {
      const anchor = cells[1].querySelector('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"], a[href$=".webp"]');
      if (anchor) {
        imageSource = anchor;
      }
    }

    // Extract CTA Link
    let ctaLink = cells[2].querySelector('[data-aue-prop="ctaLink"]');
    if (!ctaLink) {
      ctaLink = cells[2].querySelector('a');
    }

    if (videoSource) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('banner-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'banner-media', 'banner-video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.setAttribute('src', videoSource.getAttribute('href') || videoSource.src);
      source.setAttribute('type', 'video/mp4'); // Assuming mp4 for now based on example
      video.append(source);
      moveInstrumentation(videoSource, video);
      mediaElement = videoWrapper;
      videoWrapper.append(video);

      // Add play/pause controls
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'banner-video-icon', 'banner-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'banner-video-icon', 'banner-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playPauseWrapper.append(playButton, pauseButton);
      videoWrapper.append(playPauseWrapper);

      // Add mute/unmute controls
      const muteWrapper = document.createElement('div');
      muteWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'banner-mute-icon');
      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('banner-video-icon-volume', 'banner-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('banner-video-icon-volume', 'banner-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('banner-video-icon-volume', 'banner-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      muteWrapper.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteWrapper);

    } else if (imageSource) {
      const img = imageSource.querySelector('img') || imageSource;
      const pic = createOptimizedPicture(img.src || img.getAttribute('href'), img.alt || '', true, [{ width: '2000' }]);
      pic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'banner-media', 'banner-image');
      moveInstrumentation(img, pic.querySelector('img'));
      mediaElement = pic;
    }

    if (mediaElement) {
      bannerWrapper.append(mediaElement);
    }

    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCtaComponent = document.createElement('div');
      bannerCtaComponent.classList.add('banner-cta-component');

      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');

      const ctaAnchor = document.createElement('a');
      ctaAnchor.classList.add('cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaAnchor.setAttribute('data-link-region', 'CTA');
      ctaAnchor.setAttribute('data-is-internal', 'true');
      ctaAnchor.setAttribute('data-enable-gating', 'false');
      ctaAnchor.setAttribute('href', ctaLink.getAttribute('href'));
      if (ctaLink.getAttribute('target')) {
        ctaAnchor.setAttribute('target', ctaLink.getAttribute('target'));
      }
      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaLink.textContent.trim();
      moveInstrumentation(ctaLink, ctaSpan);
      ctaAnchor.append(ctaSpan);
      textCenter.append(ctaAnchor);

      // Add popup elements if they exist in the original CTA cell (from aem-content)
      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      const popupMessage = ctaLink.parentElement.querySelector('.carousel-popup-message');
      if (popupMessage) popupDiv.append(popupMessage);
      const proceedButton = ctaLink.parentElement.querySelector('.carousel-proceed-button-label');
      if (proceedButton) popupDiv.append(proceedButton);
      const cancelButton = ctaLink.parentElement.querySelector('.carousel-cancel-button-label');
      if (cancelButton) popupDiv.append(cancelButton);
      const backgroundColor = ctaLink.parentElement.querySelector('.carousel-background-color');
      if (backgroundColor) popupDiv.append(backgroundColor);
      textCenter.append(popupDiv);

      bannerCtaComponent.append(textCenter);
      ctaWrapper.append(bannerCtaComponent);
      bannerWrapper.append(ctaWrapper);
    }

    bannerSection.append(bannerWrapper);
    bannerComponent.append(bannerSection);
    swiperSlide.append(bannerComponent);
    swiperWrapper.append(swiperSlide);
  });

  swiperCarousel.append(swiperWrapper);

  // Add navigation buttons and pagination (static structure based on example)
  const navActions = document.createElement('div');
  navActions.classList.add('cmp-carousel__actions');
  navActions.innerHTML = `
    <button class="cmp-carousel__action cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
      <span class="cmp-carousel__action-icon"></span>
      <span class="cmp-carousel__action-text">Previous</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
      <span class="cmp-carousel__action-icon"></span>
      <span class="cmp-carousel__action-text">Next</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
      <span class="cmp-carousel__action-icon"></span>
      <span class="cmp-carousel__action-text">Pause</span>
    </button>
    <button class="cmp-carousel__action cmp-carousel__action--play cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play">
      <span class="cmp-carousel__action-icon"></span>
      <span class="cmp-carousel__action-text">Play</span>
    </button>
  `;
  swiperWrapper.append(navActions);

  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('swiper-container');
  swiperNavContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click" disabled=""></button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click"></button>
    </div>
  `;
  swiperCarousel.append(swiperNavContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute');
  swiperCarousel.append(swiperPagination);

  carouselContainer.append(swiperCarousel);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
