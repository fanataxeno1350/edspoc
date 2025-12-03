import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides');

  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    const videoLink = row.querySelector('[data-aue-prop="video"]');
    const imageLink = row.querySelector('[data-aue-prop="image"]');
    const ctaContent = row.querySelector('[data-aue-prop="cta"]');

    if (videoLink) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');
      const video = document.createElement('video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');

      const mp4Source = document.createElement('source');
      mp4Source.setAttribute('src', videoLink.href);
      mp4Source.setAttribute('type', 'video/mp4');
      video.append(mp4Source);

      const webmSource = document.createElement('source');
      webmSource.setAttribute('src', videoLink.href.replace('.mp4', '.webm')); // Assuming webm exists if mp4 does
      webmSource.setAttribute('type', 'video/webm');
      video.append(webmSource);

      moveInstrumentation(videoLink, video);
      videoWrapper.append(video);
      slide.append(videoWrapper);
    } else if (imageLink) {
      const picture = createOptimizedPicture(imageLink.href, imageLink.alt || '', true);
      moveInstrumentation(imageLink, picture.querySelector('img'));
      slide.append(picture);
    }

    if (ctaContent) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      ctaWrapper.append(...ctaContent.childNodes);
      moveInstrumentation(ctaContent, ctaWrapper);
      slide.append(ctaWrapper);
    }

    moveInstrumentation(row, slide);
    slidesContainer.append(slide);
  });

  block.innerHTML = '';
  block.append(slidesContainer);
}
