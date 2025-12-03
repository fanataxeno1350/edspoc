import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('spiti-section');

  const image1 = block.querySelector('[data-aue-prop="image1"]');
  if (image1) {
    const pic1 = createOptimizedPicture(image1.src, image1.alt);
    pic1.classList.add('spiti-img', 'spiti-img-1');
    moveInstrumentation(image1, pic1.querySelector('img'));
    section.append(pic1);
  }

  const image2 = block.querySelector('[data-aue-prop="image2"]');
  if (image2) {
    const pic2 = createOptimizedPicture(image2.src, image2.alt);
    pic2.classList.add('spiti-img', 'spiti-img-2');
    moveInstrumentation(image2, pic2.querySelector('img'));
    section.append(pic2);
  }

  const image3Desk = block.querySelector('[data-aue-prop="image3Desk"]');
  if (image3Desk) {
    const pic3Desk = createOptimizedPicture(image3Desk.src, image3Desk.alt);
    pic3Desk.classList.add('spiti-img', 'spiti-img-3', 'spiti-for-desk-leo');
    moveInstrumentation(image3Desk, pic3Desk.querySelector('img'));
    section.append(pic3Desk);
  }

  const image3Mob = block.querySelector('[data-aue-prop="image3Mob"]');
  if (image3Mob) {
    const pic3Mob = createOptimizedPicture(image3Mob.src, image3Mob.alt);
    pic3Mob.classList.add('spiti-img', 'spiti-img-3', 'spiti-for-mob-leo');
    moveInstrumentation(image3Mob, pic3Mob.querySelector('img'));
    section.append(pic3Mob);
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
  const dateRange = block.querySelector('[data-aue-prop="dateRange"]');
  if (dateRange) {
    const div = document.createElement('div');
    div.append(...dateRange.childNodes);
    moveInstrumentation(dateRange, div);
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
    const anchor = document.createElement('a');
    anchor.classList.add('spiti-cta', 'spiti-weekend-register-btn');
    anchor.href = ctaLink.href || '#';
    moveInstrumentation(ctaLink, anchor);

    const ctaText = block.querySelector('[data-aue-prop="ctaText"]');
    if (ctaText) {
      const p = document.createElement('p');
      p.append(...ctaText.childNodes);
      moveInstrumentation(ctaText, p);
      anchor.append(p);
    }

    // Check for an image within the ctaLink's original content if it exists
    const ctaImage = ctaLink.querySelector('img');
    if (ctaImage) {
      const pic = createOptimizedPicture(ctaImage.src, ctaImage.alt);
      moveInstrumentation(ctaImage, pic.querySelector('img'));
      anchor.append(pic);
    }
    section.append(anchor);
  }

  const spitiAfterLayerBottom = document.createElement('div');
  spitiAfterLayerBottom.classList.add('spiti-after-layer-bottom');

  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    pic.querySelector('img').style.height = '70px';
    pic.querySelector('img').style.top = '-35px';
    moveInstrumentation(bottomImage, pic.querySelector('img'));
    spitiAfterLayerBottom.append(pic);
  }
  section.append(spitiAfterLayerBottom);

  block.innerHTML = '';
  block.append(section);
}
