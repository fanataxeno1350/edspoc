import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
  // Add dynamic classes based on authored block's original classes if needed, for now just base
  const swiperId = `carousel-${Math.random().toString(36).substring(2, 11)}`;
  swiper.id = swiperId;
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

  const slides = block.querySelectorAll('[data-aue-model="slide"]');
  slides.forEach((slide, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.id = `${swiperId}-item-${Math.random().toString(36).substring(2, 11)}-tabpanel`;
    swiperSlide.setAttribute('aria-labelledby', `${swiperSlide.id.replace('-tabpanel', '')}-tab`);

    if (index === 0) {
      swiperSlide.classList.add('carousel-cmp-carousel__item--active', 'carousel-swiper-slide-prev');
      swiperSlide.setAttribute('data-active', '1');
    } else if (index === 1) {
      swiperSlide.classList.add('carousel-swiper-slide-active');
    }

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoSource = slide.querySelector('[data-aue-prop="video"]');
    const imageSource = slide.querySelector('[data-aue-prop="image"]');
    const linkSource = slide.querySelector('[data-aue-prop="link"]');
    const buttonLabelSource = slide.querySelector('[data-aue-prop="buttonLabel"]');

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
      video.setAttribute('loop', 'false');
      video.setAttribute('data-is-autoplay', 'true');

      let videoSrc = videoSource.textContent.trim();
      if (videoSrc.startsWith('<a')) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(videoSrc, 'text/html');
        const anchor = doc.querySelector('a');
        if (anchor) {
          videoSrc = anchor.href;
        }
      }
      const source = document.createElement('source');
      source.setAttribute('src', videoSrc);
      source.setAttribute('type', 'video/mp4'); // Assuming mp4 for now, could be dynamic
      video.append(source);
      moveInstrumentation(videoSource, video);

      videoWrapper.append(video);

      // Play/Pause buttons
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      // Assuming SVG content is directly in the authored HTML or needs to be fetched
      // For now, just placeholder text, in a real scenario, this would be an SVG element
      playButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595463.svg+xml';

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      pauseButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595527.svg+xml';

      playPauseWrapper.append(playButton, pauseButton);
      videoWrapper.append(playPauseWrapper);

      // Mute/Unmute buttons
      const muteWrapper = document.createElement('div');
      muteWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595561.svg+xml';

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      unmuteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595645.svg+xml';

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      noAudioButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595712.svg+xml';

      muteWrapper.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteWrapper);

      wrapperDiv.append(videoWrapper);
    } else if (imageSource) {
      const img = imageSource.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '2000' }]);
        picture.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        picture.querySelector('img').setAttribute('loading', 'eager');
        picture.querySelector('img').setAttribute('fetchpriority', 'high');
        picture.querySelector('img').setAttribute('decoding', 'async');
        wrapperDiv.append(picture);
        moveInstrumentation(imageSource, picture);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    if (linkSource || buttonLabelSource) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const anchor = document.createElement('a');
      anchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`;
      anchor.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      anchor.setAttribute('data-link-region', 'CTA');
      anchor.setAttribute('data-is-internal', 'true');
      anchor.setAttribute('data-enable-gating', 'false');

      let href = '#';
      if (linkSource) { // Prioritize data-aue-prop for link
        const authoredLink = linkSource.querySelector('a');
        if (authoredLink) {
          href = authoredLink.href;
          if (authoredLink.target) anchor.setAttribute('target', authoredLink.target);
        } else { // Fallback for plain text links
          const text = linkSource.textContent.trim();
          if (text.startsWith('/') || text.startsWith('http')) {
            href = text;
          }
        }
        moveInstrumentation(linkSource, anchor);
      }
      anchor.setAttribute('href', href);

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      if (buttonLabelSource) {
        span.textContent = buttonLabelSource.textContent.trim();
        moveInstrumentation(buttonLabelSource, span);
      } else if (linkSource && linkSource.textContent.trim()) {
        span.textContent = linkSource.textContent.trim();
      } else {
        span.textContent = 'Learn More'; // Default button label
      }
      anchor.append(span);
      textCenterDiv.append(anchor);

      const popUpDiv = document.createElement('div');
      popUpDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popUpDiv.innerHTML = `
        <input type="hidden" class="carousel-popup-message">
        <input type="hidden" class="carousel-proceed-button-label">
        <input type="hidden" class="carousel-cancel-button-label">
        <input type="hidden" class="carousel-background-color">
      `;
      textCenterDiv.append(popUpDiv);
      bannerCta.append(textCenterDiv);
    }

    ctaWrapper.append(bannerCta);
    wrapperDiv.append(ctaWrapper);

    section.append(wrapperDiv);
    carouselBanner.append(section);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);

    moveInstrumentation(slide, swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add carousel actions (prev/next/pause/play buttons)
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

  // Swiper navigation buttons (arrows)
  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('carousel-swiper-container');

  const nextBtnWrapper = document.createElement('div');
  const nextSwiperButton = document.createElement('button');
  nextSwiperButton.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click', 'carousel-disabled');
  nextSwiperButton.setAttribute('disabled', '');
  nextSwiperButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595776.svg+xml';
  nextBtnWrapper.append(nextSwiperButton);

  const prevBtnWrapper = document.createElement('div');
  const prevSwiperButton = document.createElement('button');
  prevSwiperButton.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevSwiperButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595814.svg+xml';
  prevBtnWrapper.append(prevSwiperButton);

  swiperNavContainer.append(nextBtnWrapper, prevBtnWrapper);
  swiper.append(swiperNavContainer);

  // Swiper pagination
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  // Add bullets dynamically based on number of slides
  slides.forEach((_, i) => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 1) { // Assuming the second slide is active by default based on example HTML
      bullet.classList.add('carousel-swiper-pagination-bullet-active');
    }
    swiperPagination.append(bullet);
  });
  swiper.append(swiperPagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
