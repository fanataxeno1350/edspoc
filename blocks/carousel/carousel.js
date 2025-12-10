import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  const swiper = document.createElement('div');
  swiper.className = 'swiper carousel-primary-swiper';
  // Transfer attributes from the first row's potential swiper element if available
  // For simplicity, we'll hardcode some for now or derive from block properties if they existed
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

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.className = 'swiper-slide carousel-primary-swiper-slide';
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');

    const carouselBanner = document.createElement('div');
    carouselBanner.className = 'carousel-banner';

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.className = 'carousel-banner-section';

    const carouselBannerSectionWrapper = document.createElement('div');
    carouselBannerSectionWrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper ';

    const cells = [...row.children];

    // Assuming order: Video, Image, CTA
    const videoCell = cells[0];
    const imageCell = cells[1];
    const ctaCell = cells[2];

    // Handle Video
    const video = videoCell?.querySelector('a') || videoCell?.querySelector('video');
    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';

      const videoElement = document.createElement('video');
      videoElement.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.setAttribute('src', video.href || video.src);
      source.setAttribute('type', 'video/mp4');
      videoElement.append(source);
      moveInstrumentation(video, videoElement);

      // Add play/pause buttons (simplified, actual SVG content would be more complex)
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';
      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.className = 'carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      // For now, content is placeholder, in a real scenario, you'd fetch the SVG
      playButton.textContent = 'Play Icon'; 
      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.className = 'carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      pauseButton.textContent = 'Pause Icon';
      playPauseWrapper.append(playButton, pauseButton);

      // Add mute/unmute buttons (simplified)
      const muteWrapper = document.createElement('div');
      muteWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon ';
      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.className = 'carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      muteButton.textContent = 'Mute Icon';
      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.className = 'carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
      unmuteButton.textContent = 'Unmute Icon';
      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.className = 'carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
      noAudioButton.textContent = 'No Audio Icon';
      muteWrapper.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(videoElement, playPauseWrapper, muteWrapper);
      carouselBannerSectionWrapper.append(videoWrapper);
    }

    // Handle Image
    const image = imageCell?.querySelector('img');
    if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      carouselBannerSectionWrapper.append(optimizedPic);
    }

    // Handle CTA
    const ctaLink = ctaCell?.querySelector('a');
    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

      const bannerCta = document.createElement('div');
      bannerCta.className = 'carousel-banner-cta';

      const textCenter = document.createElement('div');
      textCenter.className = 'carousel-text-center ';

      const newCtaLink = document.createElement('a');
      newCtaLink.id = ctaLink.id || 'cta-generated';
      newCtaLink.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
      newCtaLink.setAttribute('data-link-region', 'CTA');
      newCtaLink.setAttribute('data-is-internal', 'true');
      newCtaLink.setAttribute('data-enable-gating', 'false');
      newCtaLink.href = ctaLink.href;
      newCtaLink.target = ctaLink.target || '_self';

      const span = document.createElement('span');
      span.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
      span.textContent = ctaLink.textContent.trim();
      newCtaLink.append(span);
      moveInstrumentation(ctaLink, newCtaLink);

      const popUp = document.createElement('div');
      popUp.className = 'carousel-pop-up carousel-d-none';
      popUp.innerHTML = '<input type="hidden" class="carousel-popup-message">' +
                        '<input type="hidden" class="carousel-proceed-button-label">' +
                        '<input type="hidden" class="carousel-cancel-button-label">' +
                        '<input type="hidden" class="carousel-background-color">';

      textCenter.append(newCtaLink, popUp);
      bannerCta.append(textCenter);
      ctaWrapper.append(bannerCta);
      carouselBannerSectionWrapper.append(ctaWrapper);
    }

    carouselBannerSection.append(carouselBannerSectionWrapper);
    carouselBanner.append(carouselBannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add navigation and pagination elements (simplified, these would typically be handled by a Swiper JS initialization)
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

  const swiperContainerNav = document.createElement('div');
  swiperContainerNav.className = 'carousel-swiper-container';
  swiperContainerNav.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
        Next Icon
      </button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
        Prev Icon
      </button>
    </div>
  `;
  swiper.append(swiperContainerNav);

  const swiperPagination = document.createElement('div');
  swiperPagination.className = 'swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  swiperPagination.innerHTML = '<span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';
  swiper.append(swiperPagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
}
