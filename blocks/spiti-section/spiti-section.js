import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.id = 'weekend_spiti';
  const section = document.createElement('section');
  section.className = 'spiti-section';
  moveInstrumentation(block, section);

  const image1 = block.querySelector('[data-aue-prop="image1"]');
  if (image1) {
    const pic1 = createOptimizedPicture(image1.src, image1.alt || 'Leopard back layer');
    pic1.classList.add('spiti-img', 'spiti-img-1');
    moveInstrumentation(image1, pic1.querySelector('img'));
    section.append(pic1);
  }

  const image2 = block.querySelector('[data-aue-prop="image2"]');
  if (image2) {
    const pic2 = createOptimizedPicture(image2.src, image2.alt || 'middle');
    pic2.classList.add('spiti-img', 'spiti-img-2');
    moveInstrumentation(image2, pic2.querySelector('img'));
    section.append(pic2);
  }

  const image3Desktop = block.querySelector('[data-aue-prop="image3Desktop"]');
  if (image3Desktop) {
    const pic3Desk = createOptimizedPicture(image3Desktop.src, image3Desktop.alt || 'front');
    pic3Desk.classList.add('spiti-img', 'spiti-img-3', 'spiti-for-desk-leo');
    moveInstrumentation(image3Desktop, pic3Desk.querySelector('img'));
    section.append(pic3Desk);
  }

  const image3Mobile = block.querySelector('[data-aue-prop="image3Mobile"]');
  if (image3Mobile) {
    const pic3Mob = createOptimizedPicture(image3Mobile.src, image3Mobile.alt || 'front');
    pic3Mob.classList.add('spiti-img', 'spiti-img-3', 'spiti-for-mob-leo');
    moveInstrumentation(image3Mobile, pic3Mob.querySelector('img'));
    section.append(pic3Mob);
  }

  const spitiText = document.createElement('div');
  spitiText.className = 'spiti-text';

  const spitiTextDiv1 = document.createElement('div');
  spitiTextDiv1.className = 'spiti-text-div';

  const title1 = block.querySelector('[data-aue-prop="title1"]');
  if (title1) {
    const h2_1 = document.createElement('h2');
    h2_1.append(...title1.childNodes);
    moveInstrumentation(title1, h2_1);
    spitiTextDiv1.append(h2_1);
  }

  const date = block.querySelector('[data-aue-prop="date"]');
  if (date) {
    const divDate = document.createElement('div');
    divDate.append(...date.childNodes);
    moveInstrumentation(date, divDate);
    spitiTextDiv1.append(divDate);
  }
  spitiText.append(spitiTextDiv1);

  const spitiTextDiv2 = document.createElement('div');
  spitiTextDiv2.className = 'spiti-text-div';

  const title2 = block.querySelector('[data-aue-prop="title2"]');
  if (title2) {
    const h2_2 = document.createElement('h2');
    h2_2.append(...title2.childNodes);
    moveInstrumentation(title2, h2_2);
    spitiTextDiv2.append(h2_2);
  }

  const location = block.querySelector('[data-aue-prop="location"]');
  if (location) {
    const divLocation = document.createElement('div');
    divLocation.append(...location.childNodes);
    moveInstrumentation(location, divLocation);
    spitiTextDiv2.append(divLocation);
  }
  spitiText.append(spitiTextDiv2);
  section.append(spitiText);

  const cta = block.querySelector('[data-aue-prop="cta"]');
  if (cta) {
    const ctaLink = document.createElement('a');
    ctaLink.className = 'spiti-cta spiti-weekend-register-btn';
    ctaLink.href = cta.href || '#';
    moveInstrumentation(cta, ctaLink);

    const ctaTextP = document.createElement('p');
    ctaTextP.append(...cta.childNodes);
    moveInstrumentation(cta, ctaTextP);
    ctaLink.append(ctaTextP);

    const ctaIcon = block.querySelector('[data-aue-prop="ctaIcon"]');
    if (ctaIcon) {
      const iconImg = document.createElement('img');
      iconImg.src = ctaIcon.src;
      iconImg.alt = ctaIcon.alt || '';
      moveInstrumentation(ctaIcon, iconImg);
      ctaLink.append(iconImg);
    }
    section.append(ctaLink);
  }

  const spitiAfterLayerBottom = document.createElement('div');
  spitiAfterLayerBottom.className = 'spiti-after-layer-bottom';

  const bottomLayerImage = block.querySelector('[data-aue-prop="bottomLayerImage"]');
  if (bottomLayerImage) {
    const bottomImg = document.createElement('img');
    bottomImg.src = bottomLayerImage.src;
    bottomImg.alt = bottomLayerImage.alt || '';
    bottomImg.style.height = '70px';
    bottomImg.style.top = '-35px';
    moveInstrumentation(bottomLayerImage, bottomImg);
    spitiAfterLayerBottom.append(bottomImg);
  }
  section.append(spitiAfterLayerBottom);

  block.replaceWith(section);
}
