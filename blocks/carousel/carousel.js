import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
  // Transfer data attributes from the original swiper if they exist
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
  slides.forEach((slide) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    moveInstrumentation(slide, swiperSlide);

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoElement = slide.querySelector('[data-aue-prop="video"]');
    const imageElement = slide.querySelector('[data-aue-prop="image"]');
    const ctaElement = slide.querySelector('[data-aue-prop="cta"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      let videoSrc = videoElement.querySelector('source')?.src || videoElement.getAttribute('href');
      if (!videoSrc) {
        // Fallback for aem-content field generating an anchor
        const anchor = videoElement.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
        if (anchor) {
          videoSrc = anchor.href;
        }
      }

      if (videoSrc) {
        const video = document.createElement('video');
        video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
        video.setAttribute('title', 'Video');
        video.setAttribute('aria-label', 'Video');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');
        video.setAttribute('fetchpriority', 'high');
        video.setAttribute('muted', 'true');
        video.setAttribute('autoplay', 'true');

        // Check if data-is-autoplay is set to true on the swiper or slide
        const isAutoplay = swiper.dataset.isAutoplay === 'true' || slide.dataset.isAutoplay === 'true';
        if (isAutoplay) {
          video.setAttribute('autoplay', 'true');
        } else {
          video.removeAttribute('autoplay');
        }

        const source = document.createElement('source');
        source.setAttribute('src', videoSrc);
        source.setAttribute('type', 'video/mp4'); // Assuming mp4, might need more robust type detection
        video.append(source);
        videoWrapper.append(video);
        moveInstrumentation(videoElement, video);

        // Add play/pause and mute/unmute buttons (hardcoded from example HTML)
        const playPauseWrapper = document.createElement('div');
        playPauseWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

        const playButton = document.createElement('button');
        playButton.setAttribute('type', 'button');
        playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
        playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595463.svg+xml';

        const pauseButton = document.createElement('button');
        pauseButton.setAttribute('type', 'button');
        pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
        pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595527.svg+xml';

        playPauseWrapper.append(playButton, pauseButton);
        videoWrapper.append(playPauseWrapper);

        const muteWrapper = document.createElement('div');
        muteWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

        const muteButton = document.createElement('button');
        muteButton.setAttribute('type', 'button');
        muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
        muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595561.svg+xml';

        const unmuteButton = document.createElement('button');
        unmuteButton.setAttribute('type', 'button');
        unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
        unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595645.svg+xml';

        const noAudioButton = document.createElement('button');
        noAudioButton.setAttribute('type', 'button');
        noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
        noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595712.svg+xml';

        muteWrapper.append(muteButton, unmuteButton, noAudioButton);
        videoWrapper.append(muteWrapper);

        wrapper.append(videoWrapper);
      }
    } else if (imageElement) {
      let img = imageElement.querySelector('img');
      if (!img) {
        // Fallback for aem-content field generating an anchor
        const anchor = imageElement.querySelector('a[href$=".webp"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
        if (anchor) {
          img = document.createElement('img');
          img.src = anchor.href;
          img.alt = anchor.title || '';
        }
      }

      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        const pictureImg = picture.querySelector('img');
        pictureImg.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        pictureImg.setAttribute('loading', 'eager');
        pictureImg.setAttribute('fetchpriority', 'high');
        pictureImg.setAttribute('decoding', 'async');
        wrapper.append(picture);
        moveInstrumentation(imageElement, pictureImg);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    if (ctaElement) {
      const ctaContent = document.createElement('div');
      ctaContent.classList.add('carousel-text-center');
      // Move all children from ctaElement to ctaContent
      while (ctaElement.firstChild) {
        const child = ctaElement.firstChild;
        ctaContent.append(child);
      }
      bannerCta.append(ctaContent);
    }

    ctaWrapper.append(bannerCta);
    wrapper.append(ctaWrapper);
    section.append(wrapper);
    carouselBanner.append(section);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add navigation buttons and pagination (hardcoded from example HTML)
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
  swiperWrapper.append(actionsDiv);

  const swiperContainerNav = document.createElement('div');
  swiperContainerNav.classList.add('carousel-swiper-container');

  const div1 = document.createElement('div');
  const buttonNext = document.createElement('button');
  buttonNext.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click', 'carousel-disabled');
  buttonNext.setAttribute('disabled', '');
  buttonNext.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595776.svg+xml';
  div1.append(buttonNext);

  const div2 = document.createElement('div');
  const buttonPrev = document.createElement('button');
  buttonPrev.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  buttonPrev.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1765368595814.svg+xml';
  div2.append(buttonPrev);

  swiperContainerNav.append(div1, div2);
  swiper.append(swiperContainerNav);

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  // Add bullets based on the number of slides
  slides.forEach((_, index) => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (index === 0) { // Assuming first slide is active initially, adjust if needed
      bullet.classList.add('carousel-swiper-pagination-bullet-active');
    }
    pagination.append(bullet);
  });
  swiper.append(pagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
