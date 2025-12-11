import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('section');
  mainContainer.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkEl = item.querySelector('[data-aue-prop="link"]');
    const href = linkEl ? linkEl.querySelector('a')?.href || linkEl.textContent.trim() : '#';
    const dataLink = linkEl ? linkEl.querySelector('a')?.dataset.link || '' : '';

    const consentEl = item.querySelector('[data-aue-prop="consent"]');
    const dataConsent = consentEl ? consentEl.textContent.trim().toLowerCase() : 'false';

    const a = document.createElement('a');
    a.href = href;
    a.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
    a.setAttribute('data-consent', dataConsent);
    if (dataLink) {
      a.setAttribute('data-link', dataLink);
    }
    moveInstrumentation(linkEl, a);

    const iconEl = item.querySelector('[data-aue-prop="icon"]');
    if (iconEl) {
      const img = iconEl.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').className = 'sticky-navigation-bottom-nav__icon';
        a.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }

    const labelEl = item.querySelector('[data-aue-prop="label"]');
    if (labelEl) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-bottom-nav__label';
      span.textContent = labelEl.textContent.trim();
      a.append(span);
      moveInstrumentation(labelEl, span);
    }

    li.append(a);
    ul.append(li);
  });

  mainContainer.append(ul);

  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.append(mainContainer);
  block.dataset.blockStatus = 'loaded';
}
