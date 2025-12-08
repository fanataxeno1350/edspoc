import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  const children = [...block.children];
  children.forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const videoContainer = row.querySelector('[data-aue-prop="video"]');
    const imageContainer = row.querySelector('[data-aue-prop="image"]');
    const ctaLinkContainer = row.querySelector('[data-aue-prop="ctaLink"]');

    if (videoContainer) {
      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'banner-media', 'banner-video');
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('loop', '');
      videoElement.setAttribute('muted', '');

      const sourceElement = document.createElement('source');
      let videoSrc = videoContainer.textContent.trim();
      if (videoSrc) {
        sourceElement.setAttribute('src', videoSrc);
        sourceElement.setAttribute('type', `video/${videoSrc.split('.').pop()}`);
        videoElement.append(sourceElement);
        slide.append(videoElement);
        moveInstrumentation(videoContainer, videoElement);
      } else {
        // Fallback for aem-content field that might generate an <a> tag
        const anchor = videoContainer.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
        if (anchor) {
          videoSrc = anchor.href;
          sourceElement.setAttribute('src', videoSrc);
          sourceElement.setAttribute('type', `video/${videoSrc.split('.').pop()}`);
          videoElement.append(sourceElement);
          slide.append(videoElement);
          moveInstrumentation(anchor, videoElement);
        }
      }
    } else if (imageContainer) {
      const img = imageContainer.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'banner-media', 'banner-image');
        slide.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      } else {
        // Fallback for aem-content field that might generate an <a> tag
        const anchor = imageContainer.querySelector('a[href]');
        if (anchor) {
          const imgSrc = anchor.href;
          const altText = anchor.title || '';
          const pic = createOptimizedPicture(imgSrc, altText);
          pic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'banner-media', 'banner-image');
          slide.append(pic);
          moveInstrumentation(anchor, pic.querySelector('img'));
        }
      }
    }

    if (ctaLinkContainer) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');
      const bannerCta = document.createElement('div');
      bannerCta.classList.add('banner-cta');
      bannerCta.append(...ctaLinkContainer.childNodes);
      moveInstrumentation(ctaLinkContainer, bannerCta);
      ctaWrapper.append(bannerCta);
      slide.append(ctaWrapper);
    }

    swiperWrapper.append(slide);
    moveInstrumentation(row, slide);
  });

  carouselWrapper.append(swiperWrapper);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
