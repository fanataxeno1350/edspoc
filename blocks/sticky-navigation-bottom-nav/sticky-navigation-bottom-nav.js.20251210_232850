import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bottomNav = document.createElement('section');
  bottomNav.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const navList = document.createElement('ul');
  navList.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="stickyNavigationNavItem"]');
  navItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkEl = item.querySelector('[data-aue-prop="link"]');
    const labelEl = item.querySelector('[data-aue-prop="label"]');
    const iconEl = item.querySelector('[data-aue-prop="icon"]');
    const consentEl = item.querySelector('[data-aue-prop="consent"]');

    const anchor = document.createElement('a');
    anchor.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';

    if (linkEl) {
      const link = linkEl.querySelector('a');
      if (link) {
        anchor.href = link.href;
        anchor.dataset.link = link.dataset.link || link.href;
        moveInstrumentation(link, anchor);
      }
    }

    if (consentEl) {
      anchor.dataset.consent = consentEl.textContent.trim().toLowerCase();
      moveInstrumentation(consentEl, anchor);
    }

    if (iconEl) {
      const img = iconEl.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        picture.querySelector('img').className = 'sticky-navigation-bottom-nav__icon';
        anchor.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }

    if (labelEl) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-bottom-nav__label';
      span.textContent = labelEl.textContent.trim();
      anchor.append(span);
      moveInstrumentation(labelEl, span);
    }

    listItem.append(anchor);
    navList.append(listItem);
    moveInstrumentation(item, listItem);
  });

  bottomNav.append(navList);

  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.append(bottomNav);
  block.dataset.blockStatus = 'loaded';
}
