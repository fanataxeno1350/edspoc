import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUp = document.createElement('div');
  popUp.id = 'stickyNavigation-pop-up';
  popUp.className = 'stickyNavigation-pop-up';

  const transPopUp = document.createElement('div');
  transPopUp.className = 'stickyNavigation-trans-pop-up';

  const section = document.createElement('section');
  section.className = 'stickyNavigation-sticky-bottom-nav stickyNavigation-position-fixed stickyNavigation-bottom-0 stickyNavigation-p-3 stickyNavigation-d-flex stickyNavigation-align-items-center stickyNavigation-boing-container stickyNavigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'stickyNavigation-sticky-bottom-nav__list stickyNavigation-d-flex stickyNavigation-justify-content-around stickyNavigation-align-items-center stickyNavigation-flex-grow-1';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'stickyNavigation-sticky-bottom-nav__item stickyNavigation-position-relative';

    const anchor = document.createElement('a');
    anchor.className = 'stickyNavigation-sticky-bottom-nav__link stickyNavigation-d-flex stickyNavigation-flex-column stickyNavigation-align-items-center stickyNavigation-gap-1 stickyNavigation-analytics_cta_click';

    const cells = [...row.children];

    // Assuming the order of cells is: Link, Image, Alt Text, Label
    const href = cells[0].textContent.trim();
    const image = cells[1].querySelector('img');
    const alt = cells[2].textContent.trim();
    const label = cells[3].textContent.trim();

    if (href) {
      anchor.href = href;
      anchor.setAttribute('data-link', href);
    }

    if (image) {
      const optimizedPic = createOptimizedPicture(image.src, alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('stickyNavigation-sticky-bottom-nav__icon');
      anchor.append(optimizedPic);
    }

    if (label) {
      const span = document.createElement('span');
      span.className = 'stickyNavigation-sticky-bottom-nav__label';
      span.textContent = label;
      anchor.append(span);
    }

    li.append(anchor);
    ul.append(li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUp, transPopUp, section);
}
