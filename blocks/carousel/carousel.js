import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  // Iterate over carousel items using data-aue-model
  const carouselItems = block.querySelectorAll('[data-aue-model="carouselItem"]');
  carouselItems.forEach((item) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const mediaWrapper = document.createElement('div');
    mediaWrapper.classList.add('carousel-media-wrapper');

    // Check for video first
    let videoElement = item.querySelector('[data-aue-prop="video"]');
    if (videoElement) {
      const videoContainer = document.createElement('div');
      videoContainer.classList.add('carousel-video-container');

      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');

      // If videoElement is an <a> tag, extract href for source
      if (videoElement.tagName === 'A') {
        const videoSrc = videoElement.getAttribute('href');
        if (videoSrc) {
          const sourceMp4 = document.createElement('source');
          sourceMp4.src = videoSrc;
          sourceMp4.type = 'video/mp4';
          video.append(sourceMp4);

          // Add webm source if available (assuming same base name, different extension)
          const webmSrc = videoSrc.replace(/\.(mp4|mov)$/, '.webm');
          const sourceWebm = document.createElement('source');
          sourceWebm.src = webmSrc;
          sourceWebm.type = 'video/webm';
          video.append(sourceWebm);
        }
      } else if (videoElement.tagName === 'VIDEO') {
        // If it's already a video element, move its sources
        videoElement.querySelectorAll('source').forEach((source) => {
          video.append(source);
        });
      }
      videoContainer.append(video);
      mediaWrapper.append(videoContainer);
      moveInstrumentation(videoElement, video);
    } else {
      // If no video, check for image
      let imageElement = item.querySelector('[data-aue-prop="image"]');
      if (imageElement) {
        const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
        mediaWrapper.append(picture);
        moveInstrumentation(imageElement, picture.querySelector('img'));
      }
    }

    // Add CTA link if present
    const ctaLink = item.querySelector('[data-aue-prop="ctaLink"]');
    if (ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      ctaWrapper.append(ctaLink);
      moveInstrumentation(ctaLink, ctaWrapper);
      mediaWrapper.append(ctaWrapper);
    }

    slide.append(mediaWrapper);
    swiperWrapper.append(slide);
    moveInstrumentation(item, slide);
  });

  carouselWrapper.append(swiperWrapper);

  // Clear the original block content and append the new structure
  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
