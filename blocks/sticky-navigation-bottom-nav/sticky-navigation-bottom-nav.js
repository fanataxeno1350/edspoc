import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bottomNavSection = document.createElement('section');
  bottomNavSection.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const bottomNavList = document.createElement('ul');
  bottomNavList.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkElement = itemNode.querySelector('a[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkDataLink = linkElement ? linkElement.dataset.aueResource : '';

    const consentElement = itemNode.querySelector('[data-aue-prop="consent"]');
    const consentValue = consentElement ? consentElement.textContent.trim().toLowerCase() === 'true' : false;

    const anchor = document.createElement('a');
    anchor.href = linkHref;
    anchor.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
    anchor.setAttribute('data-consent', consentValue);
    anchor.setAttribute('data-link', linkDataLink);

    const iconElement = itemNode.querySelector('img[data-aue-prop="icon"]');
    if (iconElement) {
      const picture = createOptimizedPicture(iconElement.src, iconElement.alt, false, [{ width: '40' }]);
      picture.querySelector('img').className = 'sticky-navigation-bottom-nav__icon';
      anchor.append(picture);
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-bottom-nav__label';
      span.textContent = labelElement.textContent.trim();
      anchor.append(span);
    }

    listItem.append(anchor);
    bottomNavList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  bottomNavSection.append(bottomNavList);

  block.textContent = '';
  block.append(bottomNavSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
