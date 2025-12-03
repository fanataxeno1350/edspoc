import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides-container');

  Array.from(block.children).forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoLink = row.querySelector('[data-aue-prop="video"]');
    const imageLink = row.querySelector('[data-aue-prop="image"]');
    const link = row.querySelector('[data-aue-prop="link"]');

    if (videoLink) {
      const videoElement = document.createElement('video');
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('loop', '');
      videoElement.setAttribute('muted', '');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'auto');
      videoElement.classList.add('carousel-video');

      const mp4Source = document.createElement('source');
      mp4Source.setAttribute('src', videoLink.href || videoLink.textContent.trim());
      mp4Source.setAttribute('type', 'video/mp4');
      videoElement.append(mp4Source);

      const webmSource = document.createElement('source');
      webmSource.setAttribute('src', videoLink.href || videoLink.textContent.trim());
      webmSource.setAttribute('type', 'video/webm');
      videoElement.append(webmSource);

      slide.append(videoElement);
      moveInstrumentation(videoLink, videoElement);
    } else if (imageLink) {
      const img = imageLink.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        slide.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      } else {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', imageLink.href || imageLink.textContent.trim());
        imgElement.setAttribute('alt', '');
        slide.append(imgElement);
        moveInstrumentation(imageLink, imgElement);
      }
    }

    if (link) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      ctaWrapper.append(link);
      slide.append(ctaWrapper);
      moveInstrumentation(link, ctaWrapper.querySelector('a'));
    }

    slidesContainer.append(slide);
    moveInstrumentation(row, slide);
  });

  block.innerHTML = '';
  block.append(slidesContainer);
}
