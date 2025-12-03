import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const heroSectionWrapper = document.createElement('section');
  heroSectionWrapper.classList.add('hero-section-wrapper', 'homeSlot');
  moveInstrumentation(block, heroSectionWrapper);

  const videoSlider = document.createElement('div');
  videoSlider.classList.add('hero-section-video-slider');

  const slides = document.createElement('div');
  slides.classList.add('hero-section-slides');

  const slide = document.createElement('div');
  slide.classList.add('hero-section-slide');

  let videoSource = block.querySelector('[data-aue-prop="video"]');
  if (!videoSource) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      videoSource = anchor;
    }
  }

  if (videoSource) {
    const video = document.createElement('video');
    video.classList.add('hero-section-video');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('loop', '');
    const source = document.createElement('source');
    source.setAttribute('src', videoSource.href || videoSource.textContent.trim());
    source.setAttribute('type', 'video/mp4');
    video.append(source);
    slide.append(video);
    moveInstrumentation(videoSource, video);
  }

  slides.append(slide);
  videoSlider.append(slides);
  heroSectionWrapper.append(videoSlider);

  const overlay = document.createElement('div');
  overlay.classList.add('hero-section-overlay');

  const upcomingEvent = document.createElement('div');
  upcomingEvent.classList.add('hero-section-upcoming-event');

  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src || logoImage.textContent.trim(), logoImage.alt || '');
    pic.classList.add('hero-section-rock-img');
    upcomingEvent.append(pic);
    moveInstrumentation(logoImage, pic.querySelector('img'));
  }

  const advTextWrapper = document.createElement('div');
  advTextWrapper.classList.add('hero-section-adv-text');

  const advText = block.querySelector('[data-aue-prop="advText"]');
  if (advText) {
    advTextWrapper.append(...advText.childNodes);
    moveInstrumentation(advText, advTextWrapper);
  }

  const advTextImage = block.querySelector('[data-aue-prop="advTextImage"]');
  if (advTextImage) {
    const span = document.createElement('span');
    span.classList.add('hero-section-suv-back');
    const pic = createOptimizedPicture(advTextImage.src || advTextImage.textContent.trim(), advTextImage.alt || '');
    span.append(pic);
    advTextWrapper.append(span);
    moveInstrumentation(advTextImage, pic.querySelector('img'));
  }

  upcomingEvent.append(advTextWrapper);
  overlay.append(upcomingEvent);
  heroSectionWrapper.append(overlay);

  const bottomLayer = document.createElement('div');
  bottomLayer.classList.add('hero-section-after-layer-bottom', 'hero-section-first-after-layer-bottom');

  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src || bottomImage.textContent.trim(), bottomImage.alt || '');
    // Assuming style attributes are not authored and should be applied directly if needed
    // If style is authored, it would need to be extracted from a data-aue-prop or similar
    pic.querySelector('img').style.height = '70px';
    pic.querySelector('img').style.bottom = '-35px';
    bottomLayer.append(pic);
    moveInstrumentation(bottomImage, pic.querySelector('img'));
  }

  heroSectionWrapper.append(bottomLayer);

  block.innerHTML = '';
  block.append(heroSectionWrapper);
}
