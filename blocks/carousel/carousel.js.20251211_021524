import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
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

  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');
  carouselItems.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');
    if (index === 0) {
      slide.setAttribute('data-active', '1');
    }

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.classList.add('carousel-banner-section');

    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoSource = item.querySelector('[data-aue-prop="video"]');
    const imageSource = item.querySelector('[data-aue-prop="image"]');

    if (videoSource) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      let videoAnchor = videoSource.querySelector('a');
      if (!videoAnchor) {
        videoAnchor = item.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
      }

      if (videoAnchor) {
        const source = document.createElement('source');
        source.setAttribute('src', videoAnchor.href);
        source.setAttribute('type', 'video/mp4');
        videoElement.append(source);
        moveInstrumentation(videoSource, videoElement);
      }

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      // Assuming play button content is an SVG path or text, adjust as needed
      playButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595463.svg+xml';

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      pauseButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595527.svg+xml';

      playPauseOverlay.append(playButton, pauseButton);

      const muteIconContainer = document.createElement('div');
      muteIconContainer.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

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

      muteIconContainer.append(muteButton, unmuteButton, noAudioButton);

      videoWrapper.append(videoElement, playPauseOverlay, muteIconContainer);
      wrapper.append(videoWrapper);
    } else if (imageSource) {
      const img = imageSource.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
        picture.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        picture.querySelector('img').setAttribute('loading', 'eager');
        picture.querySelector('img').setAttribute('fetchpriority', 'high');
        picture.querySelector('img').setAttribute('decoding', 'async');
        moveInstrumentation(imageSource, picture.querySelector('img'));
        wrapper.append(picture);
      }
    }

    const ctaContainer = document.createElement('div');
    ctaContainer.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    const linkProp = item.querySelector('[data-aue-prop="link"]');
    const linkLabelProp = item.querySelector('[data-aue-prop="linkLabel"]');

    if (linkProp && linkLabelProp) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const anchor = document.createElement('a');
      anchor.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      anchor.setAttribute('data-link-region', 'CTA');
      anchor.setAttribute('data-is-internal', 'true');
      anchor.setAttribute('data-enable-gating', 'false');
      anchor.setAttribute('target', '_blank');

      const link = linkProp.querySelector('a');
      if (link) { // Use the href from the authored link
        anchor.href = link.href;
        moveInstrumentation(linkProp, anchor);
      } else { // Fallback if no <a> is directly in linkProp
        anchor.href = '#'; // Or some default
      }

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = linkLabelProp.textContent.trim();
      moveInstrumentation(linkLabelProp, span);

      anchor.append(span);
      textCenterDiv.append(anchor);
      bannerCta.append(textCenterDiv);
    }

    ctaContainer.append(bannerCta);
    wrapper.append(ctaContainer);

    carouselBannerSection.append(wrapper);
    carouselBanner.append(carouselBannerSection);
    slide.append(carouselBanner);
    swiperWrapper.append(slide);
    moveInstrumentation(item, slide);
  });

  swiper.append(swiperWrapper);

  // Add navigation buttons (prev/next) and pagination
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('carousel-swiper-container');

  const nextButtonWrapper = document.createElement('div');
  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click', 'carousel-disabled');
  nextButton.setAttribute('disabled', '');
  nextButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595776.svg+xml'; // Placeholder for SVG
  nextButtonWrapper.append(nextButton);

  const prevButtonWrapper = document.createElement('div');
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  prevButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595814.svg+xml'; // Placeholder for SVG
  prevButtonWrapper.append(prevButton);

  swiperContainer.append(nextButtonWrapper, prevButtonWrapper);

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  // Add bullets dynamically if needed, or rely on Swiper initialization
  for (let i = 0; i < carouselItems.length; i += 1) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 1) { // Assuming second item is active in sample HTML
      bullet.classList.add('carousel-swiper-pagination-bullet-active');
    }
    pagination.append(bullet);
  }

  swiper.append(swiperContainer, pagination);
  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}