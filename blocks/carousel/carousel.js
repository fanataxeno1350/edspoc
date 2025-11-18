import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'carousel-primary-swiper', 'carousel-primary-swiper-carousel-419d8524f7', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperContainer.setAttribute('data-swiper-id', '.carousel-primary-swiper-carousel-419d8524f7');
  swiperContainer.id = 'carousel-419d8524f7';
  swiperContainer.setAttribute('role', 'group');
  swiperContainer.setAttribute('aria-live', 'polite');
  swiperContainer.setAttribute('aria-roledescription', 'carousel');
  swiperContainer.setAttribute('data-is-autoplay', 'true');
  swiperContainer.setAttribute('data-delay', '5000');
  swiperContainer.setAttribute('data-autopause-disabled', 'true');
  swiperContainer.setAttribute('data-is-loop', 'false');
  swiperContainer.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.classList.add('carousel-banner-section');

    const bannerSectionWrapper = document.createElement('div');
    bannerSectionWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const cells = [...row.children];
    const imageOrVideoCell = cells[0];
    const altTextCell = cells[1];
    const videoTitleCell = cells[2];
    const ctaLabelCell = cells[3];
    const ctaHrefCell = cells[4];

    const mediaElement = imageOrVideoCell.querySelector('img, video');
    const altText = altTextCell?.textContent.trim();
    const videoTitle = videoTitleCell?.textContent.trim();
    const ctaLabel = ctaLabelCell?.textContent.trim();
    const ctaHref = ctaHrefCell?.textContent.trim();

    if (mediaElement) {
      if (mediaElement.tagName === 'IMG') {
        const img = mediaElement.cloneNode(true);
        const optimizedPic = createOptimizedPicture(img.src, altText || img.alt, true, [{ width: '2000' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        bannerSectionWrapper.append(optimizedPic);
      } else if (mediaElement.tagName === 'VIDEO') {
        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('carousel-video-wrapper');

        const video = mediaElement.cloneNode(true);
        video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
        video.setAttribute('data-is-autoplay', 'true');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');
        video.setAttribute('fetchpriority', 'high');
        video.setAttribute('loop', 'false');
        video.setAttribute('muted', 'true');
        video.setAttribute('autoplay', 'true');
        if (videoTitle) {
          video.setAttribute('title', videoTitle);
          video.setAttribute('aria-label', videoTitle);
        }
        videoWrapper.append(video);

        // Add play/pause and mute/unmute buttons (simplified, actual SVG content not added)
        const controlsOverlay = document.createElement('div');
        controlsOverlay.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
        const playButton = document.createElement('button');
        playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
        playButton.setAttribute('type', 'button');
        const pauseButton = document.createElement('button');
        pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
        pauseButton.setAttribute('type', 'button');
        controlsOverlay.append(playButton, pauseButton);

        const muteOverlay = document.createElement('div');
        muteOverlay.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
        const muteButton = document.createElement('button');
        muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
        muteButton.setAttribute('type', 'button');
        const unmuteButton = document.createElement('button');
        unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
        unmuteButton.setAttribute('type', 'button');
        const noAudioButton = document.createElement('button');
        noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
        noAudioButton.setAttribute('type', 'button');
        muteOverlay.append(muteButton, unmuteButton, noAudioButton);

        videoWrapper.append(controlsOverlay, muteOverlay);
        bannerSectionWrapper.append(videoWrapper);
      }
    }

    if (ctaLabel && ctaHref) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const ctaLink = document.createElement('a');
      ctaLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'false');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.href = ctaHref;
      ctaLink.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaLabel;

      ctaLink.append(ctaSpan);
      textCenterDiv.append(ctaLink);
      bannerCta.append(textCenterDiv);
      ctaWrapper.append(bannerCta);
      bannerSectionWrapper.append(ctaWrapper);
    }

    carouselBannerSection.append(bannerSectionWrapper);
    carouselBanner.append(carouselBannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiperContainer.append(swiperWrapper);

  // Add static navigation and pagination elements
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
  swiperContainer.append(actionsDiv);

  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('swiper-container');
  const nextNavDiv = document.createElement('div');
  const nextNavButton = document.createElement('button');
  nextNavButton.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  nextNavButton.setAttribute('disabled', '');
  nextNavDiv.append(nextNavButton);

  const prevNavDiv = document.createElement('div');
  const prevNavButton = document.createElement('button');
  prevNavButton.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevNavDiv.append(prevNavButton);
  swiperNavContainer.append(nextNavDiv, prevNavDiv);
  swiperContainer.append(swiperNavContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
  // Add bullets dynamically if needed, or based on the number of slides
  [...block.children].forEach(() => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    paginationDiv.append(bullet);
  });
  swiperContainer.append(paginationDiv);

  carouselWrapper.append(swiperContainer);
  block.textContent = '';
  block.append(carouselWrapper);
}