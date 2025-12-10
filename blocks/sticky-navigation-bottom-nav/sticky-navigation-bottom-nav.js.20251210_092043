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

    // Extract icon
    let img = iconCell.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('sticky-navigation-bottom-nav__icon');
      moveInstrumentation(img, pic.querySelector('img'));
      anchor.append(pic);
    } else {
      const anchorWithImage = iconCell.querySelector('a');
      if (anchorWithImage && anchorWithImage.href) {
        const newImg = document.createElement('img');
        newImg.src = anchorWithImage.href;
        newImg.alt = anchorWithImage.title || '';
        newImg.classList.add('sticky-navigation-bottom-nav__icon');
        moveInstrumentation(anchorWithImage, newImg);
        anchor.append(newImg);
      }
    }

    // Extract link
    const link = linkCell.querySelector('a');
    if (link) {
      anchor.href = link.href;
      anchor.setAttribute('data-link', link.href);
      moveInstrumentation(link, anchor);
    } else {
      const linkText = linkCell.textContent.trim();
      if (linkText) {
        anchor.href = linkText;
        anchor.setAttribute('data-link', linkText);
        moveInstrumentation(linkCell, anchor);
      }
    }

    // Extract label
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('sticky-navigation-bottom-nav__label');
    const labelText = labelCell.textContent.trim();
    if (labelText) {
      labelSpan.textContent = labelText;
      moveInstrumentation(labelCell, labelSpan);
    }
    anchor.append(labelSpan);

    // Extract consent
    const consentValue = consentCell.textContent.trim().toLowerCase() === 'true';
    anchor.setAttribute('data-consent', consentValue);
    moveInstrumentation(consentCell, anchor);

    li.append(anchor);
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
