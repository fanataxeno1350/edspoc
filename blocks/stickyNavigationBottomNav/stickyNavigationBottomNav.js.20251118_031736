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
    const iconCell = row.children[1];
    const altTextCell = row.children[2];
    const labelCell = row.children[3];

    const link = linkCell.querySelector('a');
    const img = iconCell.querySelector('img');
    const altText = altTextCell.textContent.trim();
    const label = labelCell.textContent.trim();

    if (link && img && label) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'sticky-navigation-bottom-nav__link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 sticky-navigation-analytics_cta_click';
      if (link.dataset.link) {
        newLink.setAttribute('data-link', link.dataset.link);
      }

      const optimizedPic = createOptimizedPicture(img.src, altText || img.alt);
      optimizedPic.querySelector('img').className = 'sticky-navigation-bottom-nav__icon';
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);

      const span = document.createElement('span');
      span.className = 'sticky-navigation-bottom-nav__label';
      span.textContent = label;
      newLink.append(span);

      li.append(newLink);
    }
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(section);
}
