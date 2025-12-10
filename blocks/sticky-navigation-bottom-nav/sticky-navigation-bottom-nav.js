import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');

  navItems.forEach((navItem) => {
    const li = document.createElement('li');
    li.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkElement = navItem.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkDataConsent = linkElement ? linkElement.dataset.consent : '';
    const linkDataLink = linkElement ? linkElement.dataset.link : '';

    const a = document.createElement('a');
    a.href = linkHref;
    a.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
    if (linkDataConsent) {
      a.dataset.consent = linkDataConsent;
    }
    if (linkDataLink) {
      a.dataset.link = linkDataLink;
    }
    moveInstrumentation(linkElement, a);

    const iconElement = navItem.querySelector('[data-aue-prop="icon"]');
    if (iconElement) {
      let img = iconElement.querySelector('img');
      if (!img && iconElement.tagName === 'A') {
        const imgHref = iconElement.href;
        const imgAlt = iconElement.textContent.trim();
        if (imgHref && (imgHref.endsWith('.webp') || imgHref.endsWith('.png') || imgHref.endsWith('.jpg') || imgHref.endsWith('.jpeg') || imgHref.endsWith('.gif')))
        {
          img = document.createElement('img');
          img.src = imgHref;
          img.alt = imgAlt;
        }
      }

      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        const pictureImg = picture.querySelector('img');
        pictureImg.className = 'sticky-navigation-bottom-nav__icon';
        a.append(picture);
        moveInstrumentation(img, pictureImg);
      }
    }

    const labelElement = navItem.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.className = 'sticky-navigation-bottom-nav__label';
      span.textContent = labelElement.textContent;
      a.append(span);
      moveInstrumentation(labelElement, span);
    }

    li.append(a);
    ul.append(li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
