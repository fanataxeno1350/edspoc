import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.id = 'weekend_spiti';
  section.classList.add('weekendtrail-section');

  const image1 = block.querySelector('[data-aue-prop="image1"]');
  if (image1) {
    const pic = createOptimizedPicture(image1.src, image1.alt);
    pic.classList.add('weekendtrail-img', 'weekendtrail-img-1');
    moveInstrumentation(image1, pic.querySelector('img'));
    section.append(pic);
  }

  const image2 = block.querySelector('[data-aue-prop="image2"]');
  if (image2) {
    const pic = createOptimizedPicture(image2.src, image2.alt);
    pic.classList.add('weekendtrail-img', 'weekendtrail-img-2');
    moveInstrumentation(image2, pic.querySelector('img'));
    section.append(pic);
  }

  const image3Desktop = block.querySelector('[data-aue-prop="image3Desktop"]');
  if (image3Desktop) {
    const pic = createOptimizedPicture(image3Desktop.src, image3Desktop.alt);
    pic.classList.add('weekendtrail-img', 'weekendtrail-img-3', 'weekendtrail-for-desk-leo');
    moveInstrumentation(image3Desktop, pic.querySelector('img'));
    section.append(pic);
  }

  const image3Mobile = block.querySelector('[data-aue-prop="image3Mobile"]');
  if (image3Mobile) {
    const pic = createOptimizedPicture(image3Mobile.src, image3Mobile.alt);
    pic.classList.add('weekendtrail-img', 'weekendtrail-img-3', 'weekendtrail-for-mob-leo');
    moveInstrumentation(image3Mobile, pic.querySelector('img'));
    section.append(pic);
  }

  const weekendtrailText = document.createElement('div');
  weekendtrailText.classList.add('weekendtrail-text');

  const weekendtrailTextDiv1 = document.createElement('div');
  weekendtrailTextDiv1.classList.add('weekendtrail-text-div');

  const heading1 = block.querySelector('[data-aue-prop="heading1"]');
  if (heading1) {
    const h2 = document.createElement('h2');
    h2.append(...heading1.childNodes);
    moveInstrumentation(heading1, h2);
    weekendtrailTextDiv1.append(h2);
  }

  const date = block.querySelector('[data-aue-prop="date"]');
  if (date) {
    const div = document.createElement('div');
    div.append(...date.childNodes);
    moveInstrumentation(date, div);
    weekendtrailTextDiv1.append(div);
  }
  weekendtrailText.append(weekendtrailTextDiv1);

  const weekendtrailTextDiv2 = document.createElement('div');
  weekendtrailTextDiv2.classList.add('weekendtrail-text-div');

  const heading2 = block.querySelector('[data-aue-prop="heading2"]');
  if (heading2) {
    const h2 = document.createElement('h2');
    h2.append(...heading2.childNodes);
    moveInstrumentation(heading2, h2);
    weekendtrailTextDiv2.append(h2);
  }

  const location = block.querySelector('[data-aue-prop="location"]');
  if (location) {
    const div = document.createElement('div');
    div.append(...location.childNodes);
    moveInstrumentation(location, div);
    weekendtrailTextDiv2.append(div);
  }
  weekendtrailText.append(weekendtrailTextDiv2);
  section.append(weekendtrailText);

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.classList.add('weekendtrail-cta', 'weekendtrail-register-btn');
    ctaAnchor.href = ctaLink.href || '#';
    moveInstrumentation(ctaLink, ctaAnchor);

    const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');
    if (ctaLabel) {
      const p = document.createElement('p');
      p.append(...ctaLabel.childNodes);
      moveInstrumentation(ctaLabel, p);
      ctaAnchor.append(p);
    }

    const ctaIcon = block.querySelector('[data-aue-prop="ctaIcon"]');
    if (ctaIcon) {
      const pic = createOptimizedPicture(ctaIcon.src, ctaIcon.alt);
      moveInstrumentation(ctaIcon, pic.querySelector('img'));
      ctaAnchor.append(pic);
    }
    section.append(ctaAnchor);
  }

  const weekendtrailAfterLayerBottom = document.createElement('div');
  weekendtrailAfterLayerBottom.classList.add('weekendtrail-after-layer-bottom');

  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    pic.querySelector('img').style.height = '70px';
    pic.querySelector('img').style.top = '-35px';
    moveInstrumentation(bottomImage, pic.querySelector('img'));
    weekendtrailAfterLayerBottom.append(pic);
  }
  section.append(weekendtrailAfterLayerBottom);

  block.innerHTML = '';
  block.append(section);
}
