import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUp = document.createElement('div');
  popUp.id = 'sticky-navigation-pop-up';

  const transPopUp = document.createElement('div');
  transPopUp.className = 'sticky-navigation-trans-pop-up';

  const section = document.createElement('section');
  section.className = 'sticky-navigation-sticky-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-sticky-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');

  navItems.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-sticky-bottom-nav__item sticky-navigation-position-relative';
    moveInstrumentation(row, li);

    const linkElement = row.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkDataLink = linkElement ? linkElement.getAttribute('data-link') : '';
    const linkDataConsent = linkElement ? linkElement.getAttribute('data-consent') : 'false';

    const a = document.createElement('a');
    a.href = linkHref;
    a.className = 'sticky-navigation-sticky-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';
    a.setAttribute('data-consent', linkDataConsent);
    a.setAttribute('data-link', linkDataLink);
    moveInstrumentation(linkElement, a);

    let iconImg = row.querySelector('[data-aue-prop="icon"] img');
    if (!iconImg) {
      const anchor = row.querySelector('a[data-aue-prop="icon"]');
      if (anchor) {
        iconImg = document.createElement('img');
        iconImg.src = anchor.href;
        iconImg.alt = anchor.title || 'icon';
        moveInstrumentation(anchor, iconImg);
      }
    }

    if (iconImg) {
      const pic = createOptimizedPicture(iconImg.src, iconImg.alt);
      pic.className = 'sticky-navigation-sticky-bottom-nav__icon';
      a.append(pic);
      moveInstrumentation(iconImg, pic.querySelector('img'));
    }

    const labelSpan = document.createElement('span');
    labelSpan.className = 'sticky-navigation-sticky-bottom-nav__label';
    const labelContent = row.querySelector('[data-aue-prop="label"]');
    if (labelContent) {
      labelSpan.append(...labelContent.childNodes);
      moveInstrumentation(labelContent, labelSpan);
    }
    a.append(labelSpan);

    li.append(a);
    ul.append(li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUp, transPopUp, section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
