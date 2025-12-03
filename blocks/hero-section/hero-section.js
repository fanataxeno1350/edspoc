import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const heroSectionWrapper = document.createElement('section');
  heroSectionWrapper.classList.add('hero-section-wrapper', 'homeSlot');
  moveInstrumentation(block, heroSectionWrapper);

  const heroSectionVideoSlider = document.createElement('div');
  heroSectionVideoSlider.classList.add('hero-section-video-slider');

  const heroSectionSlides = document.createElement('div');
  heroSectionSlides.classList.add('hero-section-slides');

  const heroSectionSlide = document.createElement('div');
  heroSectionSlide.classList.add('hero-section-slide');

  let videoElement = block.querySelector('[data-aue-prop="video"]');
  if (!videoElement) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      videoElement = document.createElement('video');
      videoElement.setAttribute('autoplay', '');
      videoElement.setAttribute('muted', '');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('loop', '');
      const source = document.createElement('source');
      source.setAttribute('src', anchor.href);
      source.setAttribute('type', 'video/mp4');
      videoElement.append(source);
      moveInstrumentation(anchor, videoElement);
    }
  }

  if (videoElement) {
    heroSectionSlide.append(videoElement);
  }

  heroSectionSlides.append(heroSectionSlide);
  heroSectionVideoSlider.append(heroSectionSlides);
  heroSectionWrapper.append(heroSectionVideoSlider);

  const heroSectionOverlay = document.createElement('div');
  heroSectionOverlay.classList.add('hero-section-overlay');

  const heroSectionUpcomingEvent = document.createElement('div');
  heroSectionUpcomingEvent.classList.add('hero-section-upcoming-event');

  let logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    pic.classList.add('hero-section-rock-img');
    moveInstrumentation(logoImage, pic.querySelector('img'));
    heroSectionUpcomingEvent.append(pic);
  }

  const heroSectionAdvText = document.createElement('div');
  heroSectionAdvText.classList.add('hero-section-adv-text');

  const adventureText = block.querySelector('[data-aue-prop="adventureText"]');
  if (adventureText) {
    heroSectionAdvText.append(...adventureText.childNodes);
    moveInstrumentation(adventureText, heroSectionAdvText);
  }

  const heroSectionSuvBack = document.createElement('span');
  heroSectionSuvBack.classList.add('hero-section-suv-back');

  let inlineImage = block.querySelector('[data-aue-prop="inlineImage"]');
  if (inlineImage) {
    const pic = createOptimizedPicture(inlineImage.src, inlineImage.alt);
    moveInstrumentation(inlineImage, pic.querySelector('img'));
    heroSectionSuvBack.append(pic);
  }

  if (heroSectionSuvBack.hasChildNodes()) {
    heroSectionAdvText.append(heroSectionSuvBack);
  }

  heroSectionUpcomingEvent.append(heroSectionAdvText);
  heroSectionOverlay.append(heroSectionUpcomingEvent);
  heroSectionWrapper.append(heroSectionOverlay);

  const heroSectionAfterLayerBottom = document.createElement('div');
  heroSectionAfterLayerBottom.classList.add('hero-section-after-layer-bottom', 'hero-section-first-after-layer-bottom');

  let bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    // Assuming style attributes need to be preserved or re-applied if they are part of the desired output
    // For this example, we'll just append the image without specific style handling from the authored block.
    // If styles like 'height: 70px; bottom: -35px;' are authored, they should be extracted from the source node.
    // Here, we just move the instrumentation and append the picture.
    moveInstrumentation(bottomImage, pic.querySelector('img'));
    heroSectionAfterLayerBottom.append(pic);
  }

  heroSectionWrapper.append(heroSectionAfterLayerBottom);

  block.innerHTML = '';
  block.append(heroSectionWrapper);
}
