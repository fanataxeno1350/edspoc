import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUp = document.createElement('div');
  popUp.id = 'pop-up';
  popUp.classList.add('sticky-navigation-pop-up');

  const transPopUp = document.createElement('div');
  transPopUp.classList.add('sticky-navigation-trans-pop-up');

  const section = document.createElement('section');
  section.classList.add('sticky-navigation-sticky-bottom-nav', 'sticky-navigation-position-fixed', 'sticky-navigation-bottom-0', 'sticky-navigation-p-3', 'sticky-navigation-d-flex', 'sticky-navigation-align-items-center', 'sticky-navigation-boing-container', 'sticky-navigation-bg-boing-primary');

  const ul = document.createElement('ul');
  ul.classList.add('sticky-navigation-sticky-bottom-nav__list', 'sticky-navigation-d-flex', 'sticky-navigation-justify-content-around', 'sticky-navigation-align-items-center', 'sticky-navigation-flex-grow-1');

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((navItem) => {
    const li = document.createElement('li');
    li.classList.add('sticky-navigation-sticky-bottom-nav__item', 'sticky-navigation-position-relative');

    const linkWrapper = navItem.querySelector('[data-aue-prop="link"]');
    const link = document.createElement('a');
    if (linkWrapper) {
      link.href = linkWrapper.href || '#';
      link.classList.add('sticky-navigation-sticky-bottom-nav__link', 'sticky-navigation-d-flex', 'sticky-navigation-flex-column', 'sticky-navigation-align-items-center', 'sticky-navigation-gap-1', 'sticky-navigation-analytics_cta_click');
      link.setAttribute('data-link', linkWrapper.getAttribute('data-aue-src') || link.href);
      moveInstrumentation(linkWrapper, link);
    }

    const iconWrapper = navItem.querySelector('[data-aue-prop="icon"]');
    if (iconWrapper) {
      let img = iconWrapper.querySelector('img');
      if (!img) {
          img = item.querySelector('picture img, img');
          if (!img) {
            const anchor = iconWrapper.querySelector('a');
            if (anchor && (anchor.href.endsWith('.webp') || anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif')))
            {
              img = document.createElement('img');
              img.src = anchor.href;
              img.alt = anchor.title || '';
            }
          }
      }
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('sticky-navigation-sticky-bottom-nav__icon');
        link.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      }
    }

    const labelWrapper = navItem.querySelector('[data-aue-prop="label"]');
    if (labelWrapper) {
      const span = document.createElement('span');
      span.classList.add('sticky-navigation-sticky-bottom-nav__label');
      span.append(...labelWrapper.childNodes);
      link.append(span);
      moveInstrumentation(labelWrapper, span);
    }

    li.append(link);
    ul.append(li);
  });

  section.append(ul);

  block.innerHTML = '';
  block.append(popUp, transPopUp, section);
}