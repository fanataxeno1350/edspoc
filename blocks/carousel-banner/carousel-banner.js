import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination');

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next');

  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev');

  const slides = [...block.querySelectorAll('[data-aue-model="carouselItem"]')];

  slides.forEach((slide) => {
    const slideEl = document.createElement('div');
    slideEl.classList.add('swiper-slide');

    const videoEl = slide.querySelector('[data-aue-prop="video"]');
    const imageEl = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkEl = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextEl = slide.querySelector('[data-aue-prop="ctaText"]');

    if (videoEl) {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.classList.add('w-100', 'object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');

      const source = document.createElement('source');
      source.src = videoEl.href || videoEl.textContent.trim();
      source.type = `video/${source.src.split('.').pop()}`;
      video.append(source);
      moveInstrumentation(videoEl, video);
      videoContainer.append(video);

      slideEl.append(videoContainer);
    } else if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt);
      picture.classList.add('w-100', 'h-100', 'object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      moveInstrumentation(imageEl, picture.querySelector('img'));
      slideEl.append(picture);
    }

    if (ctaLinkEl && ctaTextEl) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-banner-cta');

      const ctaLink = document.createElement('a');
      ctaLink.href = ctaLinkEl.href || ctaLinkEl.textContent.trim();
      ctaLink.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'carousel-cta-layout');

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('cmp-button__text', 'carousel-primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaTextEl.textContent.trim();
      moveInstrumentation(ctaTextEl, ctaSpan);

      ctaLink.append(ctaSpan);
      moveInstrumentation(ctaLinkEl, ctaLink);
      ctaWrapper.append(ctaLink);
      slideEl.append(ctaWrapper);
    }

    swiperWrapper.append(slideEl);
    moveInstrumentation(slide, slideEl);
  });

  carouselWrapper.append(swiperWrapper, pagination, nextButton, prevButton);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
