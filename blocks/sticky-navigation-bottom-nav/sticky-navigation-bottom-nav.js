import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'sticky-navigation-bottom-nav sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-boing-container sticky-navigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-bottom-nav__list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'sticky-navigation-bottom-nav__item sticky-navigation-position-relative';

    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const altCell = row.children[2];
    const labelCell = row.children[3];

    const href = linkCell.textContent.trim();
    const imgSrc = imageCell.querySelector('img')?.src || '';
    const altText = altCell.textContent.trim();
    const labelText = labelCell.textContent.trim();

    const a = document.createElement('a');
    a.href = href;
    a.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
    a.setAttribute('data-consent', 'false'); // Assuming default false, adjust if needed from block
    a.setAttribute('data-link', href); // Assuming data-link is same as href

    if (imgSrc) {
      const optimizedPic = createOptimizedPicture(imgSrc, altText);
      const img = optimizedPic.querySelector('img');
      if (img) {
        img.className = 'sticky-navigation-bottom-nav__icon';
        moveInstrumentation(imageCell.querySelector('img'), img);
      }
      a.append(optimizedPic);
    }

    const span = document.createElement('span');
    span.className = 'sticky-navigation-bottom-nav__label';
    span.textContent = labelText;
    a.append(span);

    li.append(a);
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(section);
}
