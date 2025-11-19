import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('featurecards-wrapper');

  // Process the title row
  const titleRow = block.children[0];
  if (titleRow) {
    const textDiv = document.createElement('div');
    moveInstrumentation(titleRow, textDiv);
    textDiv.id = 'text-68763da680'; // Static ID from HTML
    textDiv.classList.add('featurecards-text');

    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title');
    h1.innerHTML = titleRow.children[0].textContent; // Assuming title is in the first cell

    textDiv.append(h1);
    wrapper.append(textDiv);
  }

  // Process feature cards and bolte sitare cards
  [...block.children].slice(1).forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 5) { // Assuming 5 cells for a featureCard or bolteSitareCard
      const imageCell = cells[0];
      const altTextCell = cells[1];
      const titleCell = cells[2];
      const descriptionCell = cells[3]; // For featureCard or text for bolteSitareCard
      const linkCell = cells[4];

      const linkHref = linkCell.querySelector('a')?.href || linkCell.textContent.trim();
      const linkTitle = titleCell.textContent.trim(); // Use the card title as the link title

      // Determine if it's a 'featureCard' or 'bolteSitareCard' based on the presence of specific classes in the original row
      // Or, more robustly, based on the structure of the description/text cell
      const isBolteSitareCard = descriptionCell.querySelector('p') === null; // Simple heuristic: if no <p> in description, assume bolte sitare

      if (isBolteSitareCard) {
        // Bolte Sitare Card
        const anchor = document.createElement('a');
        moveInstrumentation(row, anchor);
        anchor.classList.add('featurecards-bolte-sitare-card-section');
        anchor.href = linkHref;
        anchor.title = linkTitle;
        anchor.setAttribute('data-title', linkTitle);

        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper');

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('featurecards-bolte-sitare-image-wrapper');
        const img = imageCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim());
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('featurecards-bolte-sitare-image');
          imageWrapper.append(optimizedPic);
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('featurecards-bolte-sitare-content-wrapper');

        const textDiv = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.classList.add('featurecards-bolte-sitare-title');
        h2.textContent = titleCell.textContent.trim();
        const p = document.createElement('p');
        p.classList.add('featurecards-bolte-sitare-text');
        p.textContent = descriptionCell.textContent.trim(); // This cell is 'text' for bolteSitareCard
        textDiv.append(h2, p);

        const buttonDiv = document.createElement('div');
        const button = document.createElement('button');
        button.classList.add('featurecards-bolte-sitare-btn');
        button.type = 'button';
        button.textContent = 'Explore'; // Static text from HTML
        buttonDiv.append(button);

        contentWrapper.append(textDiv, buttonDiv);
        cardWrapper.append(imageWrapper, contentWrapper);
        anchor.append(cardWrapper);
        wrapper.append(anchor);
      } else {
        // Feature Card
        const section = document.createElement('section');
        moveInstrumentation(row, section);
        section.classList.add('featurecards-section', 'featurecards-card-section');

        const anchor = document.createElement('a');
        anchor.classList.add('featurecards-link');
        anchor.href = linkHref;
        anchor.title = 'Explore'; // Static text from HTML
        anchor.setAttribute('data-cta-label', 'Explore'); // Static attribute from HTML

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('featurecards-image-wrapper');
        const img = imageCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim());
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('featurecards-image');
          imageWrapper.append(optimizedPic);
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('featurecards-content-wrapper');

        const h2 = document.createElement('h2');
        h2.classList.add('featurecards-card-title');
        h2.textContent = titleCell.textContent.trim();

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('featurecards-description-wrapper');
        const p = document.createElement('p');
        p.classList.add('featurecards-card-description');
        p.textContent = descriptionCell.textContent.trim();
        descriptionWrapper.append(p);

        const redirectButtonWrapper = document.createElement('div');
        redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper');
        const button = document.createElement('button');
        button.type = 'button';
        button.role = 'button';
        button.classList.add('featurecards-arrow-icon-btn');
        redirectButtonWrapper.append(button);

        contentWrapper.append(h2, descriptionWrapper, redirectButtonWrapper);
        anchor.append(imageWrapper, contentWrapper);
        section.append(anchor);
        wrapper.append(section);
      }
    }
  });

  // Add the curve container
  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container');
  wrapper.append(curveContainer);

  block.textContent = '';
  block.append(wrapper);
}
