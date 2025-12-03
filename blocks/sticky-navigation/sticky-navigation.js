import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyNavigationContainer = document.createElement('div');
  stickyNavigationContainer.id = 'sticky-navigation';
  stickyNavigationContainer.classList.add(
    'sticky-navigation-section',
    'sticky-navigation-position-fixed',
    'sticky-navigation-bottom-0',
    'sticky-navigation-p-3',
    'sticky-navigation-d-flex',
    'sticky-navigation-align-items-center',
    'sticky-navigation-container',
    'sticky-navigation-bg-boing-primary',
  );

  const stickyNavigationList = document.createElement('ul');
  stickyNavigationList.classList.add(
    'sticky-navigation-list',
    'sticky-navigation-d-flex',
    'sticky-navigation-justify-content-around',
    'sticky-navigation-align-items-center',
    'sticky-navigation-flex-grow-1',
  );

  const navigationItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navigationItems.forEach((item) => {
    const stickyNavigationItem = document.createElement('li');
    stickyNavigationItem.classList.add(
      "sticky-navigation-sticky-bottom-nav__item",
      'sticky-navigation-position-relative',
    );
    moveInstrumentation(item, stickyNavigationItem);

    const linkWrapper = item.querySelector('[data-aue-prop="link"]');
    let linkElement = linkWrapper ? linkWrapper.querySelector('a') : null;

    if (!linkElement) {
      // Fallback for aem-content field that might not wrap in a div with data-aue-prop
      linkElement = item.querySelector('a');
    }

    const stickyNavigationLink = document.createElement('a');
    stickyNavigationLink.classList.add(
      "sticky-navigation-sticky-bottom-nav__link",
      'sticky-navigation-link',
      'sticky-navigation-d-flex',
      'sticky-navigation-flex-column',
      'sticky-navigation-align-items-center',
      'sticky-navigation-gap-1',
      "sticky-navigation-analytics_cta_click"
    );

    if (linkElement) {
      stickyNavigationLink.href = linkElement.href;
      stickyNavigationLink.dataset.link = linkElement.href;
      moveInstrumentation(linkElement, stickyNavigationLink);
    }

    const iconWrapper = item.querySelector('[data-aue-prop="icon"]');
    let imgElement = iconWrapper ? iconWrapper.querySelector('img') : null;

    if (!imgElement) {
      // Fallback for reference field that might not wrap in a div with data-aue-prop
      imgElement = item.querySelector('picture img, img');
    }

    if (imgElement) {
      const pic = createOptimizedPicture(imgElement.src, imgElement.alt || '');
      pic.querySelector('img').classList.add('sticky-navigation-icon');
      stickyNavigationLink.append(pic);
      moveInstrumentation(imgElement, pic.querySelector('img'));
    }

    const labelWrapper = item.querySelector('[data-aue-prop="label"]');
    const labelText = labelWrapper ? labelWrapper.textContent.trim() : '';

    const stickyNavigationLabel = document.createElement('span');
    stickyNavigationLabel.classList.add('sticky-navigation-label');
    if (labelWrapper) {
      stickyNavigationLabel.append(...labelWrapper.childNodes);
      moveInstrumentation(labelWrapper, stickyNavigationLabel);
    } else if (labelText) {
      stickyNavigationLabel.textContent = labelText;
    }

    stickyNavigationLink.append(stickyNavigationLabel);
    stickyNavigationItem.append(stickyNavigationLink);
    stickyNavigationList.append(stickyNavigationItem);
  });

  stickyNavigationContainer.append(stickyNavigationList);
  block.innerHTML = '';
  block.append(stickyNavigationContainer);
}
