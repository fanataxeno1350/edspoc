import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('carousel-slides-container');

  const children = [...block.children];

  children.forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');

    // Transfer instrumentation from the original row to the new slide container
    moveInstrumentation(row, slide);

    const videoCell = row.querySelector('[data-aue-prop="video"]');
    const imageCell = row.querySelector('[data-aue-prop="image"]');
    const ctaLinkCell = row.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextCell = row.querySelector('[data-aue-prop="ctaText"]');

    if (videoCell) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      let videoElement = videoCell.querySelector('video');
      if (!videoElement) {
        const anchor = videoCell.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
        if (anchor) {
          videoElement = document.createElement('video');
          videoElement.setAttribute('src', anchor.href);
          videoElement.setAttribute('autoplay', '');
          videoElement.setAttribute('loop', '');
          videoElement.setAttribute('muted', '');
          videoElement.setAttribute('playsinline', '');
          videoElement.setAttribute('preload', 'metadata');
          moveInstrumentation(anchor, videoElement);
        }
      }
      if (videoElement) {
        videoWrapper.append(videoElement);
        moveInstrumentation(videoCell, videoWrapper);
      }
      slide.append(videoWrapper);
    } else if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        slide.append(picture);
        moveInstrumentation(imageCell, picture);
      } else {
        const img = imageCell.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(img.src, img.alt);
          slide.append(optimizedPicture);
          moveInstrumentation(img, optimizedPicture.querySelector('img'));
        }
      }
    }

    if (ctaLinkCell || ctaTextCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');

      let ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
      let ctaText = ctaTextCell ? ctaTextCell.textContent.trim() : '';

      if (ctaLink) {
        if (!ctaText && ctaLink.textContent.trim()) {
          ctaText = ctaLink.textContent.trim();
        }
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.textContent = ctaText;
        newCtaLink.classList.add('button', 'primary');
        ctaWrapper.append(newCtaLink);
        moveInstrumentation(ctaLink, newCtaLink);
      } else if (ctaText) {
        const newCtaLink = document.createElement('a');
        newCtaLink.textContent = ctaText;
        newCtaLink.classList.add('button', 'primary');
        ctaWrapper.append(newCtaLink);
        if (ctaTextCell) {
          moveInstrumentation(ctaTextCell, newCtaLink);
        }
      }
      slide.append(ctaWrapper);
    }

    slidesContainer.append(slide);
  });

  carouselWrapper.append(slidesContainer);

  block.textContent = '';
  block.append(carouselWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
