import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('featurecards-container');

  // Extract and move the title if present
  const titleRow = block.children[0];
  if (titleRow) {
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('featurecards-text');
    const titleElement = titleRow.querySelector('h1');
    if (titleElement) {
      titleElement.classList.add('featurecards-title');
      const spanElement = titleElement.querySelector('span');
      if (spanElement) {
        spanElement.classList.add('featurecards-title-highlight');
      }
      moveInstrumentation(titleRow, titleWrapper);
      titleWrapper.append(titleElement);
    } else {
      // Fallback for title if not an H1, assume first cell content
      const firstCell = titleRow.children[0];
      if (firstCell) {
        const newTitle = document.createElement('h1');
        newTitle.classList.add('featurecards-title');
        moveInstrumentation(firstCell, newTitle);
        newTitle.innerHTML = firstCell.innerHTML;
        titleWrapper.append(newTitle);
      }
    }
    mainWrapper.append(titleWrapper);
  }

  // Iterate over feature cards
  Array.from(block.children).forEach((row, index) => {
    if (index === 0) return; // Skip the title row, already processed

    const imageCell = row.children[0];
    const titleCell = row.children[1];
    const descriptionCell = row.children[2];
    const linkCell = row.children[3];

    if (imageCell && titleCell && descriptionCell && linkCell) {
      const section = document.createElement('section');
      section.classList.add('featurecards-section', 'featurecards-card-wrapper');

      const link = linkCell.querySelector('a');
      if (link) {
        link.classList.add('featurecards-link', 'analytics_cta_click');
        link.setAttribute('data-cta-label', link.title || 'Explore');
        moveInstrumentation(linkCell, link);

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('featurecards-image-wrapper');
        const img = imageCell.querySelector('img');
        if (img) {
          const pic = createOptimizedPicture(img.src, img.alt);
          pic.classList.add('featurecards-image');
          moveInstrumentation(img, pic.querySelector('img'));
          imageWrapper.append(pic);
        } else {
          // If img is not directly in cell, look for an anchor with an image
          const anchor = imageCell.querySelector('a');
          if (anchor && anchor.href.match(/\.(jpeg|jpg|gif|png|webp)$/i)) {
            const newImg = document.createElement('img');
            newImg.src = anchor.href;
            newImg.alt = anchor.title || '';
            const pic = createOptimizedPicture(newImg.src, newImg.alt);
            pic.classList.add('featurecards-image');
            moveInstrumentation(anchor, pic.querySelector('img'));
            imageWrapper.append(pic);
          } else if (imageCell.textContent.trim()) {
            // If content is just a URL, create an image
            const newImg = document.createElement('img');
            newImg.src = imageCell.textContent.trim();
            newImg.alt = ''; // No alt text from cell, can be improved with data-aue-prop
            const pic = createOptimizedPicture(newImg.src, newImg.alt);
            pic.classList.add('featurecards-image');
            moveInstrumentation(imageCell, pic.querySelector('img'));
            imageWrapper.append(pic);
          }
        }
        link.append(imageWrapper);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('featurecards-content-wrapper');

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
        moveInstrumentation(titleCell, cardTitle);
        cardTitle.innerHTML = titleCell.innerHTML;
        contentWrapper.append(cardTitle);

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('featurecards-description-wrapper');
        const cardDescription = document.createElement('p');
        cardDescription.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
        moveInstrumentation(descriptionCell, cardDescription);
        cardDescription.innerHTML = descriptionCell.innerHTML;
        descriptionWrapper.append(cardDescription);
        contentWrapper.append(descriptionWrapper);

        const redirectButtonWrapper = document.createElement('div');
        redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
        const arrowButton = document.createElement('button');
        arrowButton.setAttribute('type', 'button');
        arrowButton.setAttribute('role', 'button');
        arrowButton.classList.add('featurecards-arrow-icon-btn');
        // Assuming an SVG path or similar might be in the cell, or it's just a placeholder
        // For now, it's d-none, so no content is strictly needed unless specified.
        redirectButtonWrapper.append(arrowButton);
        contentWrapper.append(redirectButtonWrapper);

        link.append(contentWrapper);
        section.append(link);
        mainWrapper.append(section);
      }
    }
  });

  // Add the d-none curve container if needed (static element)
  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  mainWrapper.append(curveContainer);

  block.textContent = '';
  block.append(mainWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
