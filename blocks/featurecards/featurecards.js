import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  // Process the title wrapper
  const titleWrapper = block.children[0];
  if (titleWrapper && titleWrapper.children[0] && titleWrapper.children[0].tagName === 'H1') {
    const newTitleWrapper = document.createElement('div');
    moveInstrumentation(titleWrapper, newTitleWrapper);
    newTitleWrapper.id = titleWrapper.id;
    newTitleWrapper.classList.add('featurecards-text-wrapper');

    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title');
    h1.innerHTML = titleWrapper.children[0].innerHTML;
    newTitleWrapper.append(h1);
    featureCardsContainer.append(newTitleWrapper);
  }

  // Process the feature cards (sections)
  [...block.children].slice(1).forEach((row) => {
    // Check if the row contains a link, which indicates a card
    const link = row.querySelector('a');
    if (link) {
      const section = document.createElement('section');
      moveInstrumentation(row, section);
      section.classList.add('featurecards-section');

      const newLink = document.createElement('a');
      newLink.classList.add('featurecards-card-link', 'analytics_cta_click');
      newLink.href = link.href;
      newLink.title = link.title;
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      moveInstrumentation(link, newLink);

      // Image wrapper
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('featurecards-card-image-wrapper');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-card-image');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imgWrapper.append(optimizedPic);
      }
      newLink.append(imgWrapper);

      // Content wrapper
      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-card-content');

      // Title
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
      h2.textContent = link.querySelector('h2').textContent;
      contentWrapper.append(h2);

      // Description
      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-card-description-wrapper');
      const p = document.createElement('p');
      p.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
      p.textContent = link.querySelector('p').textContent;
      descriptionWrapper.append(p);
      contentWrapper.append(descriptionWrapper);

      // Redirect button (if present)
      const redirectButtonWrapper = document.createElement('div');
      redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-button');
      // Assuming the button content is the SVG path, or it's empty
      const existingButton = link.querySelector('.featurecards-arrow-icon-button');
      if (existingButton) {
        button.innerHTML = existingButton.innerHTML;
      }
      redirectButtonWrapper.append(button);
      contentWrapper.append(redirectButtonWrapper);

      newLink.append(contentWrapper);
      section.append(newLink);
      featureCardsContainer.append(section);
    } else if (row.classList.contains('featurecards-bolte-sitare-card-section')) {
      // Handle the 'bolte-sitare' card sections
      const newLink = document.createElement('a');
      moveInstrumentation(row, newLink);
      newLink.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
      newLink.href = row.querySelector('a').href;
      newLink.title = row.querySelector('a').title;
      newLink.setAttribute('data-title', row.querySelector('a').getAttribute('data-title'));

      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper', 'd-flex');

      const cardImageDiv = document.createElement('div');
      cardImageDiv.classList.add('featurecards-bolte-sitare-card-image');
      const img = row.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-card-image-item');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageDiv.append(optimizedPic);
      }
      cardWrapper.append(cardImageDiv);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-content-wrapper', 'd-flex', 'flex-column', 'justify-content-between');

      const textDiv = document.createElement('div');
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-bolte-sitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
      h2.textContent = row.querySelector('h2').textContent;
      textDiv.append(h2);

      const p = document.createElement('p');
      p.classList.add('featurecards-bolte-sitare-card-text', 'boing--text__body-3', 'text-boing-dark');
      p.textContent = row.querySelector('p').textContent;
      textDiv.append(p);
      contentWrapper.append(textDiv);

      const buttonDiv = document.createElement('div');
      const button = document.createElement('button');
      button.classList.add('featurecards-bolte-sitare-card-button', 'text-white', 'boing--text__body-4', 'd-inline-block');
      button.textContent = 'Explore'; // Assuming 'Explore' is static for this button
      buttonDiv.append(button);
      contentWrapper.append(buttonDiv);

      cardWrapper.append(contentWrapper);
      newLink.append(cardWrapper);
      featureCardsContainer.append(newLink);
    } else if (row.classList.contains('featurecards-curve-container')) {
      // Handle the curve container
      const curveContainer = document.createElement('div');
      moveInstrumentation(row, curveContainer);
      curveContainer.classList.add('featurecards-curve-container', 'd-none');
      featureCardsContainer.append(curveContainer);
    }
  });

  block.textContent = '';
  block.append(featureCardsContainer);
}
