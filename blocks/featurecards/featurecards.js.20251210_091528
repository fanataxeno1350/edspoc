import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('featurecards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featurecards-text-wrapper');
  const titleElement = block.querySelector('h1');
  if (titleElement) {
    const newTitle = document.createElement('h1');
    newTitle.classList.add('featurecards-title');
    moveInstrumentation(titleElement, newTitle);
    newTitle.innerHTML = titleElement.innerHTML;
    titleWrapper.append(newTitle);
    mainWrapper.append(titleWrapper);
  }

  const featureCardSections = document.createElement('div');
  featureCardSections.classList.add('featurecards-sections');

  Array.from(block.children).forEach((row) => {
    if (row.children.length === 4) {
      const [imageCell, titleCell, descriptionCell, linkCell] = row.children;

      const section = document.createElement('section');
      section.classList.add('featurecards-section');

      const link = document.createElement('a');
      link.classList.add('featurecards-card-link', 'analytics_cta_click');
      const linkA = linkCell.querySelector('a');
      if (linkA) {
        link.href = linkA.href;
        link.title = linkA.title || '';
        link.setAttribute('data-cta-label', linkA.title || '');
        moveInstrumentation(linkA, link);
      }

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-card-image-wrapper');
      const img = imageCell.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        pic.classList.add('featurecards-card-image');
        moveInstrumentation(img, pic.querySelector('img'));
        imageWrapper.append(pic);
      } else {
        const anchor = imageCell.querySelector('a[href]');
        if (anchor) {
          const pic = createOptimizedPicture(anchor.href, anchor.title || '', false, [{ width: '750' }]);
          pic.classList.add('featurecards-card-image');
          imageWrapper.append(pic);
          moveInstrumentation(anchor, pic.querySelector('img'));
        }
      }
      link.append(imageWrapper);

      const cardContent = document.createElement('div');
      cardContent.classList.add('featurecards-card-content');

      const title = document.createElement('h2');
      title.classList.add('featurecards-card-title', 'boing--text__heading-1');
      const titleH = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (titleH) {
        title.innerHTML = titleH.innerHTML;
        moveInstrumentation(titleH, title);
      } else {
        title.textContent = titleCell.textContent.trim();
        moveInstrumentation(titleCell, title);
      }
      cardContent.append(title);

      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-card-description-wrapper');
      const description = document.createElement('p');
      description.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
      const descriptionP = descriptionCell.querySelector('p');
      if (descriptionP) {
        description.innerHTML = descriptionP.innerHTML;
        moveInstrumentation(descriptionP, description);
      } else {
        description.textContent = descriptionCell.textContent.trim();
        moveInstrumentation(descriptionCell, description);
      }
      descriptionWrapper.append(description);
      cardContent.append(descriptionWrapper);

      const redirectButtonWrapper = document.createElement('div');
      redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-button');
      redirectButtonWrapper.append(button);
      cardContent.append(redirectButtonWrapper);

      link.append(cardContent);
      section.append(link);
      featureCardSections.append(section);
    }
  });

  mainWrapper.append(featureCardSections);

  const bolteSitareCardSections = document.createElement('div');
  bolteSitareCardSections.classList.add('featurecards-bolte-sitare-card-sections');

  Array.from(block.children).forEach((row) => {
    if (row.children.length === 4) {
      const [imageCell, titleCell, descriptionCell, linkCell] = row.children;

      const link = document.createElement('a');
      link.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
      const linkA = linkCell.querySelector('a');
      if (linkA) {
        link.href = linkA.href;
        link.title = linkA.title || '';
        link.setAttribute('data-title', linkA.title || '');
        moveInstrumentation(linkA, link);
      }

      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper', 'd-flex');

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('featurecards-bolte-sitare-card-image');
      const img = imageCell.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        pic.classList.add('featurecards-card-image-item');
        moveInstrumentation(img, pic.querySelector('img'));
        imageDiv.append(pic);
      } else {
        const anchor = imageCell.querySelector('a[href]');
        if (anchor) {
          const pic = createOptimizedPicture(anchor.href, anchor.title || '', false, [{ width: '750' }]);
          pic.classList.add('featurecards-card-image-item');
          imageDiv.append(pic);
          moveInstrumentation(anchor, pic.querySelector('img'));
        }
      }
      cardWrapper.append(imageDiv);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

      const textDiv = document.createElement('div');
      const title = document.createElement('h2');
      title.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
      const titleH = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (titleH) {
        title.innerHTML = titleH.innerHTML;
        moveInstrumentation(titleH, title);
      } else {
        title.textContent = titleCell.textContent.trim();
        moveInstrumentation(titleCell, title);
      }
      textDiv.append(title);

      const description = document.createElement('p');
      description.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
      const descriptionP = descriptionCell.querySelector('p');
      if (descriptionP) {
        description.innerHTML = descriptionP.innerHTML;
        moveInstrumentation(descriptionP, description);
      } else {
        description.textContent = descriptionCell.textContent.trim();
        moveInstrumentation(descriptionCell, description);
      }
      textDiv.append(description);
      contentWrapper.append(textDiv);

      const buttonDiv = document.createElement('div');
      const button = document.createElement('button');
      button.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4', 'd-inline-block');
      button.textContent = 'Explore';
      buttonDiv.append(button);
      contentWrapper.append(buttonDiv);

      cardWrapper.append(contentWrapper);
      link.append(cardWrapper);
      bolteSitareCardSections.append(link);
    }
  });

  mainWrapper.append(bolteSitareCardSections);

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  mainWrapper.append(curveContainer);

  block.textContent = '';
  block.append(mainWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
