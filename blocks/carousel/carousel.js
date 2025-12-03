import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides-container');

  // Iterate over each carousel slide item using data-aue-model
  block.querySelectorAll('[data-aue-model="carouselSlide"]').forEach((slide) => {
    const slideElement = document.createElement('div');
    slideElement.classList.add('carousel-slide');

    const videoLink = slide.querySelector('[data-aue-prop="video"]');
    const imageLink = slide.querySelector('[data-aue-prop="image"]');
    const ctaLink = slide.querySelector('[data-aue-prop="ctaLink"]');

    if (videoLink) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');

      const sourceMp4 = document.createElement('source');
      sourceMp4.setAttribute('src', videoLink.href || videoLink.textContent.trim());
      sourceMp4.setAttribute('type', 'video/mp4');
      video.append(sourceMp4);

      const sourceWebm = document.createElement('source');
      sourceWebm.setAttribute('src', videoLink.href || videoLink.textContent.trim());
      sourceWebm.setAttribute('type', 'video/webm');
      video.append(sourceWebm);

      moveInstrumentation(videoLink, video);
      videoWrapper.append(video);
      slideElement.append(videoWrapper);
    } else if (imageLink) {
      const picture = createOptimizedPicture(imageLink.href || imageLink.textContent.trim(), 'Carousel image');
      moveInstrumentation(imageLink, picture.querySelector('img'));
      slideElement.append(picture);
    }

    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      const link = document.createElement('a');
      link.href = ctaLink.href || ctaLink.textContent.trim();
      link.textContent = ctaLink.textContent.trim();
      moveInstrumentation(ctaLink, link);
      ctaWrapper.append(link);
      slideElement.append(ctaWrapper);
    }

    slidesContainer.append(slideElement);
  });

  carouselWrapper.append(slidesContainer);

  // Clear the block's original content and append the new structure
  block.innerHTML = '';
  block.append(carouselWrapper);
}