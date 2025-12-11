import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';
  section.append(ul);

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');

  navItems.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';
    moveInstrumentation(row, li);

    const linkEl = row.querySelector('[data-aue-prop="link"]');
    const labelEl = row.querySelector('[data-aue-prop="label"]');
    const iconEl = row.querySelector('[data-aue-prop="icon"]');
    const consentEl = row.querySelector('[data-aue-prop="consent"]');

    const a = document.createElement('a');
    a.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';

    if (linkEl) {
      const anchor = linkEl.querySelector('a');
      if (anchor) {
        a.href = anchor.href;
        a.setAttribute('data-link', anchor.href);
        moveInstrumentation(anchor, a);
      }
    }

    if (consentEl) {
      a.setAttribute('data-consent', consentEl.textContent.trim().toLowerCase());
      moveInstrumentation(consentEl, a);
    }

    if (iconEl) {
      const img = iconEl.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        pic.querySelector('img').className = 'sticky-navigation-bottom-nav__icon';
        a.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      }
    }

    if (labelEl) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-bottom-nav__label';
      span.append(...labelEl.childNodes);
      moveInstrumentation(labelEl, span);
      a.append(span);
    }

    li.append(a);
    ul.append(li);
  });

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
