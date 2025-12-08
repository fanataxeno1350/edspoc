import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  // Process the first row for the title
  const firstRow = block.children[0];
  if (firstRow) {
    const textCell = firstRow.children[0];
    if (textCell) {
      const featurecardsText = document.createElement('div');
      moveInstrumentation(textCell, featurecardsText);
      featurecardsText.id = 'text-68763da680'; // Static ID from HTML
      featurecardsText.classList.add('featurecards-text');

      const h1 = document.createElement('h1');
      h1.classList.add('featurecards-title');
      h1.innerHTML = textCell.textContent; // Assuming the entire title HTML is in the cell
      featurecardsText.append(h1);
      featureCardsContainer.append(featurecardsText);
    }
  }

  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('featurecards-card-wrapper');

  // Loop through the remaining rows for cards
  [...block.children].slice(1).forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 4) { // This corresponds to 'featureCard' model
      const [imageCell, titleCell, descriptionCell, linkCell] = cells;

      const section = document.createElement('section');
      moveInstrumentation(row, section);
      section.classList.add('featurecards-section', 'featurecards-card-wrapper');

      const link = document.createElement('a');
      link.classList.add('featurecards-link', 'analytics_cta_click');
      const href = linkCell.querySelector('a')?.href || linkCell.textContent.trim();
      link.href = href;
      link.title = titleCell.textContent.trim(); // Using title for link title
      link.setAttribute('data-cta-label', 'Explore'); // Static attribute

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image-wrapper');
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featurecards-image');
        imageWrapper.append(optimizedPic);
      }
      link.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-content-wrapper');

      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
      h2.textContent = titleCell.textContent.trim();
      contentWrapper.append(h2);

      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-description-wrapper');
      const p = document.createElement('p');
      p.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
      p.innerHTML = descriptionCell.innerHTML; // Use innerHTML for richtext
      descriptionWrapper.append(p);
      contentWrapper.append(descriptionWrapper);

      const redirectButtonWrapper = document.createElement('div');
      redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-btn');
      // Assuming the button content is an SVG path or similar, handled by CSS or script
      // For now, it's empty as per the HTML example, or could be a text if present in cell
      redirectButtonWrapper.append(button);
      contentWrapper.append(redirectButtonWrapper);

      link.append(contentWrapper);
      section.append(link);
      cardWrapper.append(section);
    } else if (cells.length === 5) { // This corresponds to 'bolteSitareCard' model
      const [imageCell, titleCell, textCell, linkCell, buttonLabelCell] = cells;

      const bolteSitareLink = document.createElement('a');
      moveInstrumentation(row, bolteSitareLink);
      bolteSitareLink.classList.add('featurecards-boltesitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
      const href = linkCell.querySelector('a')?.href || linkCell.textContent.trim();
      bolteSitareLink.href = href;
      bolteSitareLink.title = titleCell.textContent.trim();
      bolteSitareLink.setAttribute('data-title', titleCell.textContent.trim());

      const bolteSitareCardWrapper = document.createElement('div');
      bolteSitareCardWrapper.classList.add('featurecards-boltesitare-card-wrapper');

      const bolteSitareImageDiv = document.createElement('div');
      bolteSitareImageDiv.classList.add('featurecards-boltesitare-card-image');
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featurecards-boltesitare-card-img');
        bolteSitareImageDiv.append(optimizedPic);
      }
      bolteSitareCardWrapper.append(bolteSitareImageDiv);

      const bolteSitareContentWrapper = document.createElement('div');
      bolteSitareContentWrapper.classList.add('featurecards-boltesitare-content-wrapper');

      const contentDiv1 = document.createElement('div');
      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-boltesitare-card-title', 'boing--text__heading-3', 'text-boing-dark');
      h2.textContent = titleCell.textContent.trim();
      contentDiv1.append(h2);
      const p = document.createElement('p');
      p.classList.add('featurecards-boltesitare-card-text', 'boing--text__body-3', 'text-boing-dark');
      p.innerHTML = textCell.innerHTML; // Use innerHTML for richtext
      contentDiv1.append(p);
      bolteSitareContentWrapper.append(contentDiv1);

      const contentDiv2 = document.createElement('div');
      const button = document.createElement('button');
      button.classList.add('featurecards-boltesitare-card-btn', 'text-white', 'boing--text__body-4', 'd-inline-block');
      button.textContent = buttonLabelCell.textContent.trim();
      contentDiv2.append(button);
      bolteSitareContentWrapper.append(contentDiv2);

      bolteSitareCardWrapper.append(bolteSitareContentWrapper);
      bolteSitareLink.append(bolteSitareCardWrapper);
      cardWrapper.append(bolteSitareLink);
    }
  });

  featureCardsContainer.append(cardWrapper);

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
}
