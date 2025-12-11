import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides-container');

  const rows = [...block.children];

  rows.forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    moveInstrumentation(row, slide);

    let mediaElement = null;
    let ctaLink = null;
    let ctaLabel = null;

    // Check for video first
    let videoSource = row.querySelector('[data-aue-prop="video"]');
    if (!videoSource) {
      const anchor = row.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
      if (anchor) {
        videoSource = anchor;
      }
    }

    if (videoSource) {
      mediaElement = document.createElement('video');
      mediaElement.setAttribute('autoplay', '');
      mediaElement.setAttribute('loop', '');
      mediaElement.setAttribute('muted', '');
      mediaElement.setAttribute('playsinline', '');
      mediaElement.setAttribute('preload', 'metadata');
      const source = document.createElement('source');
      source.src = videoSource.href || videoSource.textContent.trim();
      source.type = `video/${source.src.split('.').pop()}`;
      mediaElement.append(source);
      moveInstrumentation(videoSource, mediaElement);
    } else {
      // If no video, check for image
      const img = row.querySelector('picture img[data-aue-prop="image"]');
      if (img) {
        mediaElement = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, mediaElement.querySelector('img'));
      }
    }

    if (mediaElement) {
      slide.append(mediaElement);
    }

    // Extract CTA Link and Label
    const ctaLinkElement = row.querySelector('[data-aue-prop="ctaLink"]');
    if (ctaLinkElement) {
      ctaLink = ctaLinkElement.href || ctaLinkElement.textContent.trim();
      moveInstrumentation(ctaLinkElement, slide);
    }

    const ctaLabelElement = row.querySelector('[data-aue-prop="ctaLabel"]');
    if (ctaLabelElement) {
      ctaLabel = ctaLabelElement.textContent.trim();
      moveInstrumentation(ctaLabelElement, slide);
    }

    if (ctaLink && ctaLabel) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-cta-wrapper');
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('button', 'primary');
      ctaButton.href = ctaLink;
      ctaButton.textContent = ctaLabel;
      ctaWrapper.append(ctaButton);
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
