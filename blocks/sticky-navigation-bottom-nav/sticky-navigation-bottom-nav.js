import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bottomNavSection = document.createElement('section');
  bottomNavSection.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const bottomNavList = document.createElement('ul');
  bottomNavList.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkElement = item.querySelector('[data-aue-prop="link"]');
    const labelElement = item.querySelector('[data-aue-prop="label"]');
    const iconElement = item.querySelector('[data-aue-prop="icon"]');

    const anchor = document.createElement('a');
    anchor.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';

    let href = '';
    let dataLink = '';
    if (linkElement) {
      const linkAnchor = linkElement.querySelector('a');
      if (linkAnchor) {
        href = linkAnchor.href;
        dataLink = linkAnchor.getAttribute('data-link') || '';
        moveInstrumentation(linkAnchor, anchor);
      } else {
        // Fallback for direct text content if no anchor is present
        href = linkElement.textContent.trim();
      }
    }
    anchor.href = href;
    if (dataLink) {
      anchor.setAttribute('data-link', dataLink);
    }
    // Default consent to false if not explicitly set by AUE
    anchor.setAttribute('data-consent', linkElement?.getAttribute('data-consent') || 'false');

    if (iconElement) {
      const img = iconElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
        picture.querySelector('img').className = 'sticky-navigation-bottom-nav__icon';
        anchor.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'sticky-navigation-bottom-nav__label';
    if (labelElement) {
      labelSpan.textContent = labelElement.textContent.trim();
      moveInstrumentation(labelElement, labelSpan);
    }
    anchor.append(labelSpan);

    listItem.append(anchor);
    bottomNavList.append(listItem);

    moveInstrumentation(item, listItem);
  });

  bottomNavSection.append(bottomNavList);

  block.textContent = '';
  block.append(bottomNavSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}