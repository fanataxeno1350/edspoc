import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('spiti-section');
  moveInstrumentation(block, section);

  const backgroundImage = block.querySelector('[data-aue-prop="backgroundImage"]');
  if (backgroundImage) {
    const pic = createOptimizedPicture(backgroundImage.src, backgroundImage.alt);
    pic.classList.add('spiti-img', 'spiti-img-1');
    moveInstrumentation(backgroundImage, pic.querySelector('img'));
    section.append(pic);
  }

  const middleImage = block.querySelector('[data-aue-prop="middleImage"]');
  if (middleImage) {
    const pic = createOptimizedPicture(middleImage.src, middleImage.alt);
    pic.classList.add('spiti-img', 'spiti-img-2');
    moveInstrumentation(middleImage, pic.querySelector('img'));
    section.append(pic);
  }

  const foregroundImageDesktop = block.querySelector('[data-aue-prop="foregroundImageDesktop"]');
  if (foregroundImageDesktop) {
    const pic = createOptimizedPicture(foregroundImageDesktop.src, foregroundImageDesktop.alt);
    pic.classList.add('spiti-img', 'spiti-img-3', 'spiti-for-desk-leo');
    moveInstrumentation(foregroundImageDesktop, pic.querySelector('img'));
    section.append(pic);
  }

  const foregroundImageMobile = block.querySelector('[data-aue-prop="foregroundImageMobile"]');
  if (foregroundImageMobile) {
    const pic = createOptimizedPicture(foregroundImageMobile.src, foregroundImageMobile.alt);
    pic.classList.add('spiti-img', 'spiti-img-3', 'spiti-for-mob-leo');
    moveInstrumentation(foregroundImageMobile, pic.querySelector('img'));
    section.append(pic);
  }

  const spitiTextDiv = document.createElement('div');
  spitiTextDiv.classList.add('spiti-text');

  const spitiTextDiv1 = document.createElement('div');
  spitiTextDiv1.classList.add('spiti-text-div');

  const heading1 = block.querySelector('[data-aue-prop="heading1"]');
  if (heading1) {
    const h2 = document.createElement('h2');
    h2.append(...heading1.childNodes);
    moveInstrumentation(heading1, h2);
    spitiTextDiv1.append(h2);
  }

  const date = block.querySelector('[data-aue-prop="date"]');
  if (date) {
    const div = document.createElement('div');
    div.append(...date.childNodes);
    moveInstrumentation(date, div);
    spitiTextDiv1.append(div);
  }
  spitiTextDiv.append(spitiTextDiv1);

  const spitiTextDiv2 = document.createElement('div');
  spitiTextDiv2.classList.add('spiti-text-div');

  const heading2 = block.querySelector('[data-aue-prop="heading2"]');
  if (heading2) {
    const h2 = document.createElement('h2');
    h2.append(...heading2.childNodes);
    moveInstrumentation(heading2, h2);
    spitiTextDiv2.append(h2);
  }

  const location = block.querySelector('[data-aue-prop="location"]');
  if (location) {
    const div = document.createElement('div');
    div.append(...location.childNodes);
    moveInstrumentation(location, div);
    spitiTextDiv2.append(div);
  }
  spitiTextDiv.append(spitiTextDiv2);
  section.append(spitiTextDiv);

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const a = document.createElement('a');
    a.classList.add('spiti-cta', 'spiti-weekend-register-btn');
    if (ctaLink.tagName === 'A') {
      a.href = ctaLink.href;
      moveInstrumentation(ctaLink, a);
    } else {
      // If ctaLink is not an anchor itself, but contains one
      const anchor = ctaLink.querySelector('a');
      if (anchor) {
        a.href = anchor.href;
        moveInstrumentation(anchor, a);
      }
    }

    const ctaText = block.querySelector('[data-aue-prop="ctaText"]');
    if (ctaText) {
      const p = document.createElement('p');
      p.append(...ctaText.childNodes);
      moveInstrumentation(ctaText, p);
      a.append(p);
    }

    const ctaIcon = block.querySelector('[data-aue-prop="ctaIcon"]');
    if (ctaIcon) {
      const pic = createOptimizedPicture(ctaIcon.src, ctaIcon.alt);
      moveInstrumentation(ctaIcon, pic.querySelector('img'));
      a.append(pic);
    }
    section.append(a);
  }

  const spitiAfterLayerBottom = document.createElement('div');
  spitiAfterLayerBottom.classList.add('spiti-after-layer-bottom');

  const bottomLayerImage = block.querySelector('[data-aue-prop="bottomLayerImage"]');
  if (bottomLayerImage) {
    const pic = createOptimizedPicture(bottomLayerImage.src, bottomLayerImage.alt);
    pic.querySelector('img').style.height = '70px';
    pic.querySelector('img').style.top = '-35px';
    moveInstrumentation(bottomLayerImage, pic.querySelector('img'));
    spitiAfterLayerBottom.append(pic);
  }
  section.append(spitiAfterLayerBottom);

  block.replaceWith(section);
}
