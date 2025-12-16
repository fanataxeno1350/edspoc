import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bottomNav = document.createElement('section');
  bottomNav.className = 'sticky-navigation-bottom-nav position-fixed bottom-0 p-3 d-flex align-items-center sticky-navigation-boing-container bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-bottom-nav__list d-flex justify-content-around align-items-center flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-bottom-nav__item position-relative';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.textContent.trim() : '#';
    const linkText = linkElement ? linkElement.textContent.trim() : '';

    const a = document.createElement('a');
    a.href = linkHref;
    a.className = 'sticky-navigation-bottom-nav__link d-flex flex-column align-items-center gap-1 analytics_cta_click';
    a.setAttribute('data-consent', 'false'); // Default, adjust if needed
    a.setAttribute('data-link', linkHref); // Assuming data-link is same as href

    const iconElement = itemNode.querySelector('[data-aue-prop="icon"]');
    if (iconElement) {
      const img = iconElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        picture.querySelector('img').className = 'sticky-navigation-bottom-nav__icon';
        a.append(picture);
        moveInstrumentation(iconElement, picture);
      }
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-bottom-nav__label';
      span.textContent = labelElement.textContent.trim();
      a.append(span);
      moveInstrumentation(labelElement, span);
    }

    li.append(a);
    moveInstrumentation(itemNode, li);
    ul.append(li);
  });

  bottomNav.append(ul);

  block.textContent = '';
  block.append(bottomNav);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
