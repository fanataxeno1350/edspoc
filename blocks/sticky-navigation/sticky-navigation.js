import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'stickyNavigation-pop-up';

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.className = 'stickyNavigation-trans-pop-up';

  const section = document.createElement('section');
  section.className = 'stickyNavigation-sticky-bottom-nav stickyNavigation-position-fixed stickyNavigation-bottom-0 stickyNavigation-p-3 stickyNavigation-d-flex stickyNavigation-align-items-center stickyNavigation-boing-container stickyNavigation-bg-boing-primary';

  const ul = document.createElement('ul');
  ul.className = 'stickyNavigation-sticky-bottom-nav__list stickyNavigation-d-flex stickyNavigation-justify-content-around stickyNavigation-align-items-center stickyNavigation-flex-grow-1';

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'stickyNavigation-sticky-bottom-nav__item stickyNavigation-position-relative';

    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const altCell = row.children[2];
    const labelCell = row.children[3];
    const dataConsentCell = row.children[4];
    const dataLinkCell = row.children[5];

    const link = linkCell.querySelector('a') || document.createElement('a');
    const img = imageCell.querySelector('img');
    const altText = altCell.textContent.trim();
    const labelText = labelCell.textContent.trim();
    const dataConsent = dataConsentCell.textContent.trim();
    const dataLink = dataLinkCell.querySelector('a') ? dataLinkCell.querySelector('a').href : dataLinkCell.textContent.trim();

    const newLink = document.createElement('a');
    newLink.href = link.href;
    newLink.className = 'stickyNavigation-sticky-bottom-nav__link stickyNavigation-d-flex stickyNavigation-flex-column stickyNavigation-align-items-center stickyNavigation-gap-1 stickyNavigation-analytics_cta_click';
    newLink.setAttribute('data-consent', dataConsent);
    newLink.setAttribute('data-link', dataLink);

    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, altText);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'stickyNavigation-sticky-bottom-nav__icon';
      newLink.append(optimizedPic);
    }

    const span = document.createElement('span');
    span.className = 'stickyNavigation-sticky-bottom-nav__label';
    span.textContent = labelText;
    newLink.append(span);

    li.append(newLink);
    ul.append(li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUpDiv, transPopUpDiv, section);
}
