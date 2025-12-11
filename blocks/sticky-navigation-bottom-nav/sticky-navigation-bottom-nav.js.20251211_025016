import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('sticky-navigation-bottom-nav', 'sticky-navigation-position-fixed', 'sticky-navigation-bottom-0', 'sticky-navigation-p-3', 'sticky-navigation-d-flex', 'sticky-navigation-align-items-center', 'sticky-navigation-boing-container', 'sticky-navigation-bg-boing-primary');

  const ul = document.createElement('ul');
  ul.classList.add('sticky-navigation-bottom-nav__list', 'sticky-navigation-d-flex', 'sticky-navigation-justify-content-around', 'sticky-navigation-align-items-center', 'sticky-navigation-flex-grow-1');

  Array.from(block.children).forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('sticky-navigation-bottom-nav__item', 'sticky-navigation-position-relative');
    moveInstrumentation(row, li);

    const anchor = document.createElement('a');
    anchor.classList.add('sticky-navigation-bottom-nav__link', 'sticky-navigation-d-flex', 'sticky-navigation-flex-column', 'sticky-navigation-align-items-center', 'sticky-navigation-gap-1', 'analytics_cta_click');

    const iconCell = row.children[0];
    const linkCell = row.children[1];
    const labelCell = row.children[2];
    const consentCell = row.children[3];

    let link = linkCell.querySelector('a');
    if (!link) {
      link = document.createElement('a');
      link.href = linkCell.textContent.trim();
    }
    anchor.href = link.href;
    moveInstrumentation(link, anchor);

    const consent = consentCell.querySelector('input[type="checkbox"]');
    if (consent) {
      anchor.setAttribute('data-consent', consent.checked ? 'true' : 'false');
      moveInstrumentation(consent, anchor);
    }

    const linkData = linkCell.querySelector('[data-aue-prop="link"]');
    if (linkData) {
      anchor.setAttribute('data-link', linkData.textContent.trim());
      moveInstrumentation(linkData, anchor);
    }

    const img = iconCell.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
      pic.classList.add('sticky-navigation-bottom-nav__icon');
      anchor.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    } else {
      const anchorWithImage = iconCell.querySelector('a img');
      if (anchorWithImage) {
        const pic = createOptimizedPicture(anchorWithImage.src, anchorWithImage.alt, false, [{ width: '40' }]);
        pic.classList.add('sticky-navigation-bottom-nav__icon');
        anchor.append(pic);
        moveInstrumentation(anchorWithImage, pic.querySelector('img'));
      }
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('sticky-navigation-bottom-nav__label');
    const labelText = labelCell.querySelector('[data-aue-prop="label"]');
    if (labelText) {
      labelSpan.textContent = labelText.textContent.trim();
      moveInstrumentation(labelText, labelSpan);
    } else {
      labelSpan.textContent = labelCell.textContent.trim();
    }
    anchor.append(labelSpan);

    li.append(anchor);
    ul.append(li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
