import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = block.querySelectorAll('[data-aue-label="Carousel Item"]');
  const newCarousel = document.createElement('div');
  newCarousel.classList.add('carousel-wrapper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  carouselItems.forEach((item) => {
    const newItemContainer = document.createElement('div');
    newItemContainer.classList.add('swiper-slide');
    moveInstrumentation(item, newItemContainer);

    let videoElement = item.querySelector('[data-aue-prop="video"]');
    if (!videoElement) {
      const videoAnchor = item.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
      if (videoAnchor) {
        videoElement = document.createElement('video');
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('loop', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('preload', 'metadata');
        videoElement.setAttribute('title', 'Video');
        videoElement.setAttribute('aria-label', 'Video');

        const mp4Source = document.createElement('source');
        mp4Source.setAttribute('src', videoAnchor.href);
        mp4Source.setAttribute('type', 'video/mp4');
        videoElement.append(mp4Source);

        const webmSource = document.createElement('source');
        webmSource.setAttribute('src', videoAnchor.href.replace(/\.mp4$/, '.webm'));
        webmSource.setAttribute('type', 'video/webm');
        videoElement.append(webmSource);

        moveInstrumentation(videoAnchor, videoElement);
      }
    }

    let imageElement = item.querySelector('[data-aue-prop="image"]');
    if (!imageElement) {
      const imageAnchor = item.querySelector('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"]');
      if (imageAnchor) {
        const img = document.createElement('img');
        img.src = imageAnchor.href;
        img.alt = imageAnchor.title || '';
        imageElement = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(imageAnchor, imageElement.querySelector('img'));
      }
    }

    const ctaLink = item.querySelector('[data-aue-prop="ctaLink"]');

    if (videoElement) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      videoWrapper.append(videoElement);
      newItemContainer.append(videoWrapper);
    } else if (imageElement) {
      newItemContainer.append(imageElement);
    }

    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-boing__banner--cta');
      ctaWrapper.append(ctaLink);
      newItemContainer.append(ctaWrapper);
    }

    swiperWrapper.append(newItemContainer);
  });

  newCarousel.append(swiperWrapper);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination');
  newCarousel.append(paginationDiv);

  const buttonPrev = document.createElement('div');
  buttonPrev.classList.add('swiper-button-prev');
  newCarousel.append(buttonPrev);

  const buttonNext = document.createElement('div');
  buttonNext.classList.add('swiper-button-next');
  newCarousel.append(buttonNext);

  block.innerHTML = '';
  block.append(newCarousel);

  // Add Swiper initialization script (assuming Swiper is loaded globally or imported)
  const script = document.createElement('script');
  script.type = 'module';
  script.innerHTML = `
    import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
    const swiper = new Swiper(block.querySelector('.carousel-wrapper'), {
      loop: true,
      pagination: {
        el: block.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: block.querySelector('.swiper-button-next'),
        prevEl: block.querySelector('.swiper-button-prev'),
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  `;
  block.append(script);
}
