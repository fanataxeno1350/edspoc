import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUp = document.createElement('div');
  popUp.id = 'pop-up';
  popUp.classList.add('sticky-navigation-pop-up');

  const transPopUp = document.createElement('div');
  transPopUp.classList.add('sticky-navigation-trans-pop-up');

  const section = document.createElement('section');
  section.classList.add(
    'sticky-navigation-sticky-bottom-nav',
    'sticky-navigation-position-fixed',
    'sticky-navigation-bottom-0',
    'sticky-navigation-p-3',
    'sticky-navigation-d-flex',
    'sticky-navigation-align-items-center',
    'sticky-navigation-boing-container',
    'sticky-navigation-bg-boing-primary',
  );

  const ul = document.createElement('ul');
  ul.classList.add(
    'sticky-navigation-sticky-bottom-nav__list',
    'sticky-navigation-d-flex',
    'sticky-navigation-justify-content-around',
    'sticky-navigation-align-items-center',
    'sticky-navigation-flex-grow-1',
  );

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((navItem) => {
    const li = document.createElement('li');
    li.classList.add('sticky-navigation-sticky-bottom-nav__item', 'sticky-navigation-position-relative');

    const linkElement = navItem.querySelector('[data-aue-prop="link"]');
    const linkHref = linkElement ? linkElement.href : '#';
    const linkDataLink = linkElement ? linkElement.getAttribute('data-aue-prop') : '';

    const a = document.createElement('a');
    a.href = linkHref;
    a.classList.add(
      'sticky-navigation-sticky-bottom-nav__link',
      'sticky-navigation-d-flex',
      'sticky-navigation-flex-column',
      'sticky-navigation-align-items-center',
      'sticky-navigation-gap-1',
      'sticky-navigation-analytics_cta_click',
    );
    if (linkDataLink) {
      a.setAttribute('data-link', linkDataLink);
      moveInstrumentation(linkElement, a);
    }

    let iconElement = navItem.querySelector('[data-aue-prop="icon"]');
    if (!iconElement) {
      iconElement = navItem.querySelector('a[href$=".webp"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
    }

    if (iconElement) {
      const imgSrc = iconElement.href || iconElement.src;
      const imgAlt = iconElement.alt || '';
      const pic = createOptimizedPicture(imgSrc, imgAlt);
      pic.classList.add('sticky-navigation-sticky-bottom-nav__icon');
      a.append(pic);
      moveInstrumentation(iconElement, pic.querySelector('img'));
    }

    const labelElement = navItem.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const span = document.createElement('span');
      span.classList.add('sticky-navigation-sticky-bottom-nav__label');
      span.append(...labelElement.childNodes);
      a.append(span);
      moveInstrumentation(labelElement, span);
    }

    li.append(a);
    ul.append(li);
  });

  section.append(ul);

  block.innerHTML = '';
  block.append(popUp, transPopUp, section);
}