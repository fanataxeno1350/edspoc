import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('carousel-container');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper', 'carousel-primary-swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperWrapper.setAttribute('role', 'group');
  swiperWrapper.setAttribute('aria-live', 'polite');
  swiperWrapper.setAttribute('aria-roledescription', 'carousel');
  swiperWrapper.setAttribute('data-is-autoplay', 'true');
  swiperWrapper.setAttribute('data-delay', '5000');
  swiperWrapper.setAttribute('data-autopause-disabled', 'true');
  swiperWrapper.setAttribute('data-is-loop', 'false');
  swiperWrapper.setAttribute('data-placeholder-text', 'false');

  const slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  const paginationWrapper = document.createElement('div');
  paginationWrapper.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');

  Array.from(block.children).forEach((row, index) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    slideWrapper.setAttribute('role', 'tabpanel');
    slideWrapper.setAttribute('aria-roledescription', 'slide');
    if (index === 0) {
      slideWrapper.classList.add('carousel-cmp-carousel__item--active', 'carousel-swiper-slide-prev');
      slideWrapper.setAttribute('data-active', '1');
    }

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const cells = Array.from(row.children);

    const videoCell = cells[0];
    const imageCell = cells[1];
    const ctaLinkCell = cells[2];
    const ctaLabelCell = cells[3];

    let mediaElement = null;
    let mediaContainer = null;

    // Handle Video
    let videoSource = videoCell.querySelector('[data-aue-prop="video"]');
    if (!videoSource) {
      const anchor = videoCell.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
      if (anchor) {
        videoSource = anchor;
      }
    }

    if (videoSource) {
      mediaContainer = document.createElement('div');
      mediaContainer.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
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
      source.setAttribute('src', videoSource.href || videoSource.textContent.trim());
      source.setAttribute('type', 'video/mp4'); // Assuming mp4 for now, could be dynamic
      video.append(source);
      moveInstrumentation(videoSource, video);
      mediaContainer.append(video);

      // Add video controls (play/pause, mute/unmute) - placeholder structure
      const videoControls = document.createElement('div');
      videoControls.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      videoControls.innerHTML = `
        <button type="button" class="carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer"></button>
        <button type="button" class="carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer"></button>
      `;
      mediaContainer.append(videoControls);

      const volumeControls = document.createElement('div');
      volumeControls.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      volumeControls.innerHTML = `
        <button type="button" class="carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none"></button>
        <button type="button" class="carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none"></button>
        <button type="button" class="carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer"></button>
      `;
      mediaContainer.append(volumeControls);

      mediaElement = mediaContainer;
    } else {
      // Handle Image
      const img = imageCell.querySelector('img[data-aue-prop="image"]');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        pic.querySelector('img').setAttribute('loading', 'eager');
        pic.querySelector('img').setAttribute('fetchpriority', 'high');
        pic.querySelector('img').setAttribute('decoding', 'async');
        moveInstrumentation(img, pic.querySelector('img'));
        mediaElement = pic;
      } else {
        // Fallback for image if <img> not found, but <a> is present
        const anchor = imageCell.querySelector('a[href$=".webp"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]');
        if (anchor) {
          const pic = createOptimizedPicture(anchor.href, anchor.title || '');
          pic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
          pic.querySelector('img').setAttribute('loading', 'eager');
          pic.querySelector('img').setAttribute('fetchpriority', 'high');
          pic.querySelector('img').setAttribute('decoding', 'async');
          moveInstrumentation(anchor, pic.querySelector('img'));
          mediaElement = pic;
        }
      }
    }

    if (mediaElement) {
      contentWrapper.append(mediaElement);
    }

    // Handle CTA
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    const ctaLink = ctaLinkCell.querySelector('[data-aue-prop="ctaLink"]');
    const ctaLabel = ctaLabelCell.querySelector('[data-aue-prop="ctaLabel"]');

    if (ctaLink && ctaLabel) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const linkElement = document.createElement('a');
      linkElement.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      linkElement.setAttribute('data-link-region', 'CTA');
      linkElement.setAttribute('data-is-internal', 'true');
      linkElement.setAttribute('data-enable-gating', 'false');
      linkElement.setAttribute('href', ctaLink.href || ctaLink.textContent.trim());
      linkElement.setAttribute('target', '_blank');

      const spanElement = document.createElement('span');
      spanElement.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      spanElement.textContent = ctaLabel.textContent.trim();
      moveInstrumentation(ctaLabel, spanElement);

      linkElement.append(spanElement);
      moveInstrumentation(ctaLink, linkElement);
      textCenterDiv.append(linkElement);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('carousel-pop-up', 'carousel-d-none');
      popupDiv.innerHTML = `
        <input type="hidden" class="carousel-popup-message">
        <input type="hidden" class="carousel-proceed-button-label">
        <input type="hidden" class="carousel-cancel-button-label">
        <input type="hidden" class="carousel-background-color">
      `;
      textCenterDiv.append(popupDiv);
      bannerCta.append(textCenterDiv);
    } else if (ctaLink) { // If only link is present, ensure it's still moved/wrapped
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const linkElement = document.createElement('a');
      linkElement.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      linkElement.setAttribute('data-link-region', 'CTA');
      linkElement.setAttribute('data-is-internal', 'true');
      linkElement.setAttribute('data-enable-gating', 'false');
      linkElement.setAttribute('href', ctaLink.href || ctaLink.textContent.trim());
      linkElement.setAttribute('target', '_blank');
      linkElement.textContent = ctaLink.textContent.trim(); // Use link text as label if no explicit label
      moveInstrumentation(ctaLink, linkElement);
      textCenterDiv.append(linkElement);
      bannerCta.append(textCenterDiv);
    }

    ctaWrapper.append(bannerCta);
    contentWrapper.append(ctaWrapper);

    section.append(contentWrapper);
    bannerDiv.append(section);
    slideWrapper.append(bannerDiv);
    moveInstrumentation(row, slideWrapper); // Move instrumentation from row to slideWrapper
    slidesWrapper.append(slideWrapper);

    // Add pagination bullet
    const paginationBullet = document.createElement('span');
    paginationBullet.classList.add('swiper-pagination-bullet');
    if (index === 0) {
      paginationBullet.classList.add('carousel-swiper-pagination-bullet-active');
    }
    paginationWrapper.append(paginationBullet);
  });

  swiperWrapper.append(slidesWrapper);

  // Add navigation buttons (prev/next)
  const navContainer = document.createElement('div');
  navContainer.classList.add('carousel-swiper-container');

  const nextButtonDiv = document.createElement('div');
  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click', 'carousel-disabled');
  nextButton.setAttribute('disabled', '');
  // Assuming SVG content for buttons is not authored directly but part of component styling/assets
  nextButtonDiv.append(nextButton);

  const prevButtonDiv = document.createElement('div');
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
  // Assuming SVG content for buttons is not authored directly but part of component styling/assets
  prevButtonDiv.append(prevButton);

  navContainer.append(nextButtonDiv, prevButtonDiv);
  swiperWrapper.append(navContainer);
  swiperWrapper.append(paginationWrapper);

  mainWrapper.append(swiperWrapper);

  block.textContent = '';
  block.append(mainWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
