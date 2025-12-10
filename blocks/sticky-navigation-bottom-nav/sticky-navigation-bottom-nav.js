import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bottomNavSection = document.createElement('section');
  bottomNavSection.classList.add(
    'sticky-navigation-bottom-nav',
    'sticky-navigation-position-fixed',
    'sticky-navigation-bottom-0',
    'sticky-navigation-p-3',
    'sticky-navigation-d-flex',
    'sticky-navigation-align-items-center',
    'sticky-navigation-boing-container',
    'sticky-navigation-bg-boing-primary',
  );

  const bottomNavList = document.createElement('ul');
  bottomNavList.classList.add(
    'sticky-navigation-bottom-nav__list',
    'sticky-navigation-d-flex',
    'sticky-navigation-justify-content-around',
    'sticky-navigation-align-items-center',
    'sticky-navigation-flex-grow-1',
  );

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((row) => {
    const navItem = document.createElement('li');
    navItem.classList.add('sticky-navigation-bottom-nav__item', 'sticky-navigation-position-relative');
    moveInstrumentation(row, navItem);

    const linkWrapper = row.querySelector('[data-aue-prop="link"]');
    const link = linkWrapper ? linkWrapper.querySelector('a') : null;

    const iconWrapper = row.querySelector('[data-aue-prop="icon"]');
    let icon = iconWrapper ? iconWrapper.querySelector('img') : null;

    const labelWrapper = row.querySelector('[data-aue-prop="label"]');
    const label = labelWrapper ? labelWrapper.querySelector('p') : null;

    const consentWrapper = row.querySelector('[data-aue-prop="consent"]');
    const consent = consentWrapper ? consentWrapper.textContent.trim() : 'false';

    const navLink = document.createElement('a');
    navLink.classList.add(
      'sticky-navigation-bottom-nav__link',
      'sticky-navigation-d-flex',
      'sticky-navigation-flex-column',
      'sticky-navigation-align-items-center',
      'sticky-navigation-gap-1',
      'analytics_cta_click',
    );
    navLink.setAttribute('data-consent', consent);

    if (link) {
      navLink.href = link.href;
      navLink.setAttribute('data-link', link.getAttribute('href'));
      moveInstrumentation(link, navLink);
    }

    if (icon) {
      const picture = createOptimizedPicture(icon.src, icon.alt || '');
      picture.classList.add('sticky-navigation-bottom-nav__icon');
      navLink.append(picture);
      moveInstrumentation(icon, picture.querySelector('img'));
    } else if (iconWrapper) {
      // If img is not directly in iconWrapper, check for an anchor wrapping it
      const anchor = iconWrapper.querySelector('a');
      if (anchor && (anchor.href.endsWith('.webp') || anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif')) ) {
        const imgElement = document.createElement('img');
        imgElement.src = anchor.href;
        imgElement.alt = anchor.title || '';
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
        picture.classList.add('sticky-navigation-bottom-nav__icon');
        navLink.append(picture);
        moveInstrumentation(anchor, picture.querySelector('img'));
      }
    }

    const navLabel = document.createElement('span');
    navLabel.classList.add('sticky-navigation-bottom-nav__label');
    if (label) {
      navLabel.textContent = label.textContent;
      moveInstrumentation(label, navLabel);
    }

    navLink.append(navLabel);
    navItem.append(navLink);
    bottomNavList.append(navItem);
  });

  bottomNavSection.append(bottomNavList);

  block.textContent = '';
  block.append(bottomNavSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
