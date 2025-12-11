import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bottomNav = document.createElement('section');
  bottomNav.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const navList = document.createElement('ul');
  navList.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((navItem) => {
    const listItem = document.createElement('li');
    listItem.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkWrapper = navItem.querySelector('[data-aue-prop="link"]');
    let linkElement = linkWrapper ? linkWrapper.querySelector('a') : null;

    if (!linkElement) {
      // Fallback for aem-content field if it's just an anchor
      linkElement = navItem.querySelector('a');
    }

    if (linkElement) {
      const newLink = document.createElement('a');
      newLink.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
      newLink.href = linkElement.href;
      newLink.setAttribute('data-link', linkElement.href);

      const consentRequired = navItem.querySelector('[data-aue-prop="consentRequired"]');
      if (consentRequired && consentRequired.textContent.trim().toLowerCase() === 'true') {
        newLink.setAttribute('data-consent', 'true');
      } else {
        newLink.setAttribute('data-consent', 'false');
      }

      const iconWrapper = navItem.querySelector('[data-aue-prop="icon"]');
      let iconImg = iconWrapper ? iconWrapper.querySelector('img') : null;

      if (!iconImg) {
        // Fallback for reference field if it's just an image
        iconImg = navItem.querySelector('img');
      }

      if (iconImg) {
        const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
        const pictureImg = picture.querySelector('img');
        pictureImg.className = 'sticky-navigation-bottom-nav__icon';
        newLink.append(picture);
        moveInstrumentation(iconImg, pictureImg);
      }

      const labelSpan = document.createElement('span');
      labelSpan.className = 'sticky-navigation-bottom-nav__label';
      const labelElement = navItem.querySelector('[data-aue-prop="label"]');
      if (labelElement) {
        labelSpan.textContent = labelElement.textContent;
        moveInstrumentation(labelElement, labelSpan);
      }
      newLink.append(labelSpan);

      listItem.append(newLink);
      moveInstrumentation(linkElement, newLink);
    }
    navList.append(listItem);
    moveInstrumentation(navItem, listItem);
  });

  bottomNav.append(navList);

  block.textContent = '';
  block.append(bottomNav);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}