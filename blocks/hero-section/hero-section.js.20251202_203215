import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main wrapper for the hero section
  const heroSectionWrapper = document.createElement('section');
  heroSectionWrapper.classList.add('hero-section-wrapper', 'homeSlot');
  moveInstrumentation(block, heroSectionWrapper);

  // Hero Section Video Slider
  const heroSectionVideoSlider = document.createElement('div');
  heroSectionVideoSlider.classList.add('hero-section-video-slider');
  const heroSectionSlides = document.createElement('div');
  heroSectionSlides.classList.add('hero-section-slides');
  const heroSectionSlide = document.createElement('div');
  heroSectionSlide.classList.add('hero-section-slide');

  const videoContainer = document.createElement('video');
  videoContainer.classList.add('hero-section-video');
  videoContainer.setAttribute('autoplay', '');
  videoContainer.setAttribute('muted', '');
  videoContainer.setAttribute('playsinline', '');
  videoContainer.setAttribute('loop', '');

  let videoSource = block.querySelector('[data-aue-prop="video"]');
  if (!videoSource) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      videoSource = anchor;
    }
  }

  if (videoSource) {
    const sourceElement = document.createElement('source');
    sourceElement.setAttribute('src', videoSource.href || videoSource.textContent.trim());
    sourceElement.setAttribute('type', 'video/mp4');
    videoContainer.append(sourceElement);
    moveInstrumentation(videoSource, sourceElement);
  }

  heroSectionSlide.append(videoContainer);
  heroSectionSlides.append(heroSectionSlide);
  heroSectionVideoSlider.append(heroSectionSlides);
  heroSectionWrapper.append(heroSectionVideoSlider);

  // Hero Section Overlay
  const heroSectionOverlay = document.createElement('div');
  heroSectionOverlay.classList.add('hero-section-overlay');
  const heroSectionUpcomingEvent = document.createElement('div');
  heroSectionUpcomingEvent.classList.add('hero-section-upcoming-event');

  // Rock Image
  const rockImage = block.querySelector('[data-aue-prop="rockImage"]');
  if (rockImage) {
    const rockImgElement = document.createElement('img');
    rockImgElement.classList.add('hero-section-rock-img');
    rockImgElement.setAttribute('src', rockImage.src || rockImage.href);
    rockImgElement.setAttribute('alt', rockImage.alt || '');
    heroSectionUpcomingEvent.append(rockImgElement);
    moveInstrumentation(rockImage, rockImgElement);
  }

  // Adventure Text
  const advTextWrapper = document.createElement('div');
  advTextWrapper.classList.add('hero-section-adv-text');
  const advText = block.querySelector('[data-aue-prop="advText"]');
  if (advText) {
    advTextWrapper.append(...advText.childNodes);
    moveInstrumentation(advText, advTextWrapper);
  }

  // SUV Back Image
  const suvBackImage = block.querySelector('[data-aue-prop="suvBackImage"]');
  if (suvBackImage) {
    const suvBackSpan = document.createElement('span');
    suvBackSpan.classList.add('hero-section-suv-back');
    const suvBackImgElement = document.createElement('img');
    suvBackImgElement.setAttribute('src', suvBackImage.src || suvBackImage.href);
    suvBackImgElement.setAttribute('alt', suvBackImage.alt || '');
    suvBackSpan.append(suvBackImgElement);
    advTextWrapper.append(suvBackSpan);
    moveInstrumentation(suvBackImage, suvBackImgElement);
  }

  heroSectionUpcomingEvent.append(advTextWrapper);
  heroSectionOverlay.append(heroSectionUpcomingEvent);
  heroSectionWrapper.append(heroSectionOverlay);

  // Hero Section After Layer Bottom
  const heroSectionAfterLayerBottom = document.createElement('div');
  heroSectionAfterLayerBottom.classList.add('hero-section-after-layer-bottom', 'hero-section-first-after-layer-bottom');

  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const bottomImgElement = document.createElement('img');
    bottomImgElement.setAttribute('src', bottomImage.src || bottomImage.href);
    bottomImgElement.setAttribute('alt', bottomImage.alt || '');
    // Assuming inline styles are not authored directly, but if they were, they'd be handled by the editor
    // For now, hardcoding as per desired output. Best practice is to use CSS classes.
    bottomImgElement.style.height = '70px';
    bottomImgElement.style.bottom = '-35px';
    heroSectionAfterLayerBottom.append(bottomImgElement);
    moveInstrumentation(bottomImage, bottomImgElement);
  }

  heroSectionWrapper.append(heroSectionAfterLayerBottom);

  block.innerHTML = '';
  block.append(heroSectionWrapper);
}
