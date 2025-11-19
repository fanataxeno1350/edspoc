import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'carousel-primary-swiper');
  // Transfer data attributes from the block to the new swiper container
  [...block.attributes].forEach((attr) => {
    if (attr.name.startsWith('data-')) {
      swiperContainer.setAttribute(attr.name, attr.value);
    }
  });
  swiperContainer.setAttribute('role', 'group');
  swiperContainer.setAttribute('aria-live', 'polite');
  swiperContainer.setAttribute('aria-roledescription', 'carousel');

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
    const carouselBannerSectionWrapper = document.createElement('div');
    carouselBannerSectionWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const cells = [...row.children];
    const videoCell = cells[0];
    const imageCell = cells[1];
    const imageAltCell = cells[2];
    const ctaLabelCell = cells[3];
    const ctaUrlCell = cells[4];

    const video = videoCell?.querySelector('a');
    const image = imageCell?.querySelector('img');
    const imageAlt = imageAltCell?.textContent.trim();
    const ctaLabel = ctaLabelCell?.textContent.trim();
    const ctaUrl = ctaUrlCell?.querySelector('a')?.href;

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      const sourceElement = document.createElement('source');
      sourceElement.src = video.href;
      sourceElement.type = 'video/mp4';
      videoElement.append(sourceElement);
      videoWrapper.append(videoElement);

      // Add play/pause buttons (simplified, as SVG content is not directly provided in block JSON)
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playPauseWrapper.append(playButton);
      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      playPauseWrapper.append(pauseButton);
      videoWrapper.append(playPauseWrapper);

      // Add mute/unmute buttons (simplified)
      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      muteIconWrapper.append(noAudioButton);
      videoWrapper.append(muteIconWrapper);

      carouselBannerSectionWrapper.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, imageAlt || image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      carouselBannerSectionWrapper.append(optimizedPic);
    }

    if (ctaLabel && ctaUrl) {
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
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.href = ctaUrl;
      ctaLink.setAttribute('target', '_blank');

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaLabel;
      ctaLink.append(ctaSpan);
      textCenterDiv.append(ctaLink);
      bannerCta.append(textCenterDiv);
      ctaWrapper.append(bannerCta);
      carouselBannerSectionWrapper.append(ctaWrapper);
    }

    carouselBannerSection.append(carouselBannerSectionWrapper);
    carouselBanner.append(carouselBannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiperContainer.append(swiperWrapper);

  // Add navigation buttons (simplified, as SVG content is not directly provided in block JSON)
  const navContainer = document.createElement('div');
  navContainer.classList.add('carousel-swiper-container');
  const nextButtonWrapper = document.createElement('div');
  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  nextButton.setAttribute('disabled', '');
  nextButtonWrapper.append(nextButton);
  navContainer.append(nextButtonWrapper);

  const prevButtonWrapper = document.createElement('div');
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevButtonWrapper.append(prevButton);
  navContainer.append(prevButtonWrapper);
  swiperContainer.append(navContainer);

  // Add pagination
  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperContainer.append(pagination);

  carouselWrapper.append(swiperContainer);

  block.textContent = '';
  block.append(carouselWrapper);
}
