import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bottomNav = document.createElement('section');
  bottomNav.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const navList = document.createElement('ul');
  navList.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';
  bottomNav.append(navList);

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((item) => {
    const navItem = document.createElement('li');
    navItem.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkWrapper = item.querySelector('[data-aue-prop="link"]');
    const link = linkWrapper ? linkWrapper.querySelector('a') : null;

    if (link) {
      const navLink = document.createElement('a');
      navLink.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
      navLink.href = link.href;
      navLink.setAttribute('data-link', link.href);
      moveInstrumentation(link, navLink);

      const consent = item.querySelector('[data-aue-prop="consent"]');
      if (consent && consent.textContent.trim().toLowerCase() === 'true') {
        navLink.setAttribute('data-consent', 'true');
      } else {
        navLink.setAttribute('data-consent', 'false');
      }

      const iconWrapper = item.querySelector('[data-aue-prop="icon"]');
      let iconImg = iconWrapper ? iconWrapper.querySelector('img') : null;

      if (!iconImg) {
        const anchor = iconWrapper ? iconWrapper.querySelector('a[href$=".webp"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]') : null;
        if (anchor) {
          iconImg = document.createElement('img');
          iconImg.src = anchor.href;
          iconImg.alt = anchor.title || '';
        }
      }

      if (iconImg) {
        const picture = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '40' }]);
        const img = picture.querySelector('img');
        img.className = 'sticky-navigation-bottom-nav__icon';
        navLink.append(picture);
        moveInstrumentation(iconImg, img);
      }

      const label = item.querySelector('[data-aue-prop="label"]');
      if (label) {
        const navLabel = document.createElement('span');
        navLabel.className = 'sticky-navigation-bottom-nav__label';
        navLabel.textContent = label.textContent.trim();
        navLink.append(navLabel);
        moveInstrumentation(label, navLabel);
      }
      navItem.append(navLink);
    }
    navList.append(navItem);
  });

  block.textContent = '';
  block.append(bottomNav);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
