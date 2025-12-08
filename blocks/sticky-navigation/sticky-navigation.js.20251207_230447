import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUp = document.createElement('div');
  popUp.id = 'sticky-navigation-pop-up';

  const transPopUp = document.createElement('div');
  transPopUp.className = 'sticky-navigation-trans-pop-up';

  const section = document.createElement('section');
  section.className = 'sticky-navigation-sticky-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const list = document.createElement('ul');
  list.className = 'sticky-navigation-sticky-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navigationItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navigationItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-navigation-sticky-bottom-nav__item sticky-navigation-position-relative';

    const linkWrapper = document.createElement('a');
    linkWrapper.className = 'sticky-navigation-sticky-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';
    moveInstrumentation(item, linkWrapper);

    const linkElement = item.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      linkWrapper.href = linkElement.href || '#';
      linkWrapper.setAttribute('data-link', linkElement.href || '');
      // Check for data-consent attribute on the original link element
      const dataConsent = linkElement.getAttribute('data-consent');
      if (dataConsent !== null) {
        linkWrapper.setAttribute('data-consent', dataConsent);
      }
    }

    const iconElement = item.querySelector('[data-aue-prop="icon"]');
    if (iconElement) {
      let img = iconElement.querySelector('img');
      if (!img) {
        const anchor = iconElement.querySelector('a');
        if (anchor && (anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif') || anchor.href.endsWith('.webp')))
        {
          img = document.createElement('img');
          img.src = anchor.href;
          img.alt = anchor.title || '';
        }
      }
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('sticky-navigation-sticky-bottom-nav__icon');
        moveInstrumentation(img, pic.querySelector('img'));
        linkWrapper.append(pic);
      }
    }

    const labelElement = item.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.classList.add('sticky-navigation-sticky-bottom-nav__label');
      span.append(...labelElement.childNodes);
      moveInstrumentation(labelElement, span);
      linkWrapper.append(span);
    }

    listItem.append(linkWrapper);
    list.append(listItem);
  });

  section.append(list);

  block.textContent = '';
  block.append(popUp, transPopUp, section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
