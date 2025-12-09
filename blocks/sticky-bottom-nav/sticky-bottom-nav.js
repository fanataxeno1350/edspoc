import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUp = document.createElement('div');
  popUp.id = 'stickyNavigation-pop-up';
  moveInstrumentation(block.children[0], popUp);

  const transPopUp = document.createElement('div');
  transPopUp.classList.add('stickyNavigation-trans-pop-up');
  moveInstrumentation(block.children[1], transPopUp);

  const section = document.createElement('section');
  section.classList.add(
    'stickyNavigation-sticky-bottom-nav',
    'stickyNavigation-position-fixed',
    'stickyNavigation-bottom-0',
    'stickyNavigation-p-3',
    'stickyNavigation-d-flex',
    'stickyNavigation-align-items-center',
    'stickyNavigation-boing-container',
    'stickyNavigation-bg-boing-primary',
  );
  moveInstrumentation(block.children[2], section);

  const ul = document.createElement('ul');
  ul.classList.add(
    'stickyNavigation-sticky-bottom-nav__list',
    'stickyNavigation-d-flex',
    'stickyNavigation-justify-content-around',
    'stickyNavigation-align-items-center',
    'stickyNavigation-flex-grow-1',
  );
  section.append(ul);

  // Iterate over authored items
  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((navItem) => {
    const li = document.createElement('li');
    li.classList.add('stickyNavigation-sticky-bottom-nav__item', 'stickyNavigation-position-relative');
    moveInstrumentation(navItem, li);

    const linkElement = navItem.querySelector('[data-aue-prop="link"]');
    const href = linkElement ? linkElement.querySelector('a')?.href || '' : '';
    const dataLink = linkElement ? linkElement.querySelector('a')?.dataset.aueResource : '';

    const consentElement = navItem.querySelector('[data-aue-prop="consent"]');
    const dataConsent = consentElement ? consentElement.textContent.trim() : 'false';

    const a = document.createElement('a');
    a.href = href;
    a.classList.add(
      'stickyNavigation-sticky-bottom-nav__link',
      'stickyNavigation-d-flex',
      'stickyNavigation-flex-column',
      'stickyNavigation-align-items-center',
      'stickyNavigation-gap-1',
      'stickyNavigation-analytics_cta_click',
    );
    a.setAttribute('data-consent', dataConsent);
    a.setAttribute('data-link', dataLink);
    moveInstrumentation(linkElement, a);

    const iconElement = navItem.querySelector('[data-aue-prop="icon"]');
    if (iconElement) {
      let img = iconElement.querySelector('img');
      if (!img) {
        const anchor = iconElement.querySelector('a');
        if (anchor && anchor.href) {
          img = document.createElement('img');
          img.src = anchor.href;
          img.alt = anchor.title || '';
        }
      }
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('stickyNavigation-sticky-bottom-nav__icon');
        moveInstrumentation(img, pic.querySelector('img'));
        a.append(pic);
      }
    }

    const labelElement = navItem.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.classList.add('stickyNavigation-sticky-bottom-nav__label');
      span.textContent = labelElement.textContent.trim();
      moveInstrumentation(labelElement, span);
      a.append(span);
    }

    li.append(a);
    ul.append(li);
  });

  block.textContent = '';
  block.append(popUp, transPopUp, section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
