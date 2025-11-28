import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const videoContainer = document.createElement('div');
  videoContainer.classList.add('hero-video-slider');

  const videoSlides = document.createElement('div');
  videoSlides.classList.add('hero-slides');
  videoContainer.append(videoSlides);

  const videoSlide = document.createElement('div');
  videoSlide.classList.add('hero-slide');
  videoSlides.append(videoSlide);

  let videoElement = block.querySelector('[data-aue-prop="video"]');
  if (!videoElement) {
    const anchor = block.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
    if (anchor) {
      videoElement = document.createElement('video');
      videoElement.setAttribute('src', anchor.href);
      moveInstrumentation(anchor, videoElement);
    }
  }

  if (videoElement) {
    videoElement.classList.add('hero-slide-video');
    videoElement.setAttribute('autoplay', '');
    videoElement.setAttribute('muted', '');
    videoElement.setAttribute('playsinline', '');
    videoElement.setAttribute('loop', '');
    videoSlide.append(videoElement);
  }

  const overlayContainer = document.createElement('div');
  overlayContainer.classList.add('hero-overlay');

  const upcomingEvent = document.createElement('div');
  upcomingEvent.classList.add('hero-upcoming-event');
  overlayContainer.append(upcomingEvent);

  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    pic.classList.add('hero-rock-img');
    moveInstrumentation(logoImage, pic.querySelector('img'));
    upcomingEvent.append(pic);
  }

  const advTextContainer = document.createElement('div');
  advTextContainer.classList.add('hero-adv-text');
  upcomingEvent.append(advTextContainer);

  const adventureText = block.querySelector('[data-aue-prop="adventureText"]');
  if (adventureText) {
    advTextContainer.append(...adventureText.childNodes);
    moveInstrumentation(adventureText, advTextContainer);
  }

  const advTextImage = block.querySelector('[data-aue-prop="adventureTextImage"]');
  if (advTextImage) {
    const span = document.createElement('span');
    span.classList.add('hero-suv-back');
    const pic = createOptimizedPicture(advTextImage.src, advTextImage.alt);
    moveInstrumentation(advTextImage, pic.querySelector('img'));
    span.append(pic);
    advTextContainer.append(span);
  }

  const afterLayerBottom = document.createElement('div');
  afterLayerBottom.classList.add('hero-afterLayerBottom', 'hero-firstafterLayerBottom');

  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    pic.querySelector('img').style.height = '70px';
    pic.querySelector('img').style.bottom = '-35px';
    moveInstrumentation(bottomImage, pic.querySelector('img'));
    afterLayerBottom.append(pic);
  }

  block.innerHTML = '';
  block.classList.add('hero-section', 'hero-homeSlot');
  block.append(videoContainer, overlayContainer, afterLayerBottom);
}
