import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('featurecards-container');

  // First row is the title
  const titleRow = block.children[0];
  if (titleRow) {
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('featurecards-text-wrapper');
    titleWrapper.id = `text-${Math.random().toString(36).substring(2, 15)}`; // Generate a unique ID

    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title');

    // Extract title text and potential highlight
    const titleText = titleRow.children[0];
    if (titleText) {
      // Check for highlight span
      const highlightSpan = titleText.querySelector('span');
      if (highlightSpan) {
        h1.innerHTML = titleText.innerHTML;
        moveInstrumentation(titleText, h1);
      } else {
        h1.textContent = titleText.textContent;
        moveInstrumentation(titleText, h1);
      }
    }
    titleWrapper.append(h1);
    mainContainer.append(titleWrapper);
  }

  // Subsequent rows are cards
  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('featurecards-cards-wrapper');

  Array.from(block.children).slice(1).forEach((row) => {
    const cardSection = document.createElement('section');
    cardSection.classList.add('featurecards-section');

    const linkEl = row.children[0];
    if (linkEl) {
      const link = document.createElement('a');
      link.classList.add('featurecards-card-link', 'analytics_cta_click');

      const linkHref = linkEl.querySelector('a[data-aue-prop="link"]');
      if (linkHref) {
        link.href = linkHref.href;
        link.title = linkHref.title || '';
        link.setAttribute('data-cta-label', linkHref.getAttribute('data-aue-label') || '');
        moveInstrumentation(linkHref, link);
      } else {
        // Fallback if aem-content generates a p tag with an anchor
        const anchor = linkEl.querySelector('p a');
        if (anchor) {
          link.href = anchor.href;
          link.title = anchor.title || '';
          link.setAttribute('data-cta-label', anchor.textContent || '');
          moveInstrumentation(anchor, link);
        }
      }

      const imageCell = row.children[1];
      if (imageCell) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('featurecards-card-image-wrapper');

        let img = imageCell.querySelector('img[data-aue-prop="image"]');
        if (!img) {
          // Look for <a> containing the image if img is not directly authored
          const anchorWithImg = imageCell.querySelector('a[data-aue-prop="image"]');
          if (anchorWithImg) {
            img = anchorWithImg.querySelector('img');
          }
        }

        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          picture.querySelector('img').classList.add('featurecards-card-image');
          moveInstrumentation(img, picture.querySelector('img'));
          imageWrapper.append(picture);
        }
        link.append(imageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-card-content');

      const titleCell = row.children[2];
      if (titleCell) {
        const h2 = document.createElement('h2');
        h2.classList.add('featurecards-card-title', 'boing--text__heading-1');
        h2.textContent = titleCell.textContent;
        moveInstrumentation(titleCell, h2);
        contentWrapper.append(h2);
      }

      const descriptionCell = row.children[3];
      if (descriptionCell) {
        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('featurecards-card-description-wrapper');

        const p = document.createElement('p');
        p.classList.add('featurecards-card-description', 'boing--text__body-2', 'text-boing-dark');
        p.textContent = descriptionCell.textContent;
        moveInstrumentation(descriptionCell, p);
        descriptionWrapper.append(p);
        contentWrapper.append(descriptionWrapper);
      }

      // Add the redirect button wrapper (always d-none as per HTML)
      const redirectButtonWrapper = document.createElement('div');
      redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper', 'd-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-button');
      // The content of this button is an SVG path, which is not directly authored as a field.
      // For now, we'll leave it empty or add a placeholder if needed. If it comes from a cell,
      // we'd extract it from there.
      redirectButtonWrapper.append(button);
      contentWrapper.append(redirectButtonWrapper);

      link.append(contentWrapper);
      cardSection.append(link);
    }
    cardsWrapper.append(cardSection);
    moveInstrumentation(row, cardSection);
  });
  mainContainer.append(cardsWrapper);

  // Append the d-none sections for bolte-sitare-card and curve-container
  // These are static and not driven by authored content in the block JSON provided.
  // They are added as direct static elements based on the example HTML.
  const bolteSitareCard1 = document.createElement('a');
  bolteSitareCard1.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
  bolteSitareCard1.href = '/tedhe-medhe-samachaar.html'; // Placeholder, should be dynamic if authored
  bolteSitareCard1.title = 'Tedhe Medhe Samachar';
  bolteSitareCard1.setAttribute('data-title', 'Tedhe Medhe Samachar');
  bolteSitareCard1.innerHTML = `
    <div class="featurecards-bolte-sitare-card-wrapper d-flex">
      <div class="featurecards-bolte-sitare-card-image">
        <img src="/content/dam/aemigrate/uploaded-folder/image/tedhe-medhe-cards-fmt-webp-alpha.webp" alt="Tedhe Medhe Samachaar" class="featurecards-card-image-item">
      </div>
      <div class="featurecards-content-wrapper d-flex flex-column justify-content-between">
        <div>
          <h2 class="featurecards-bolte-sitare-card-title boing--text__heading-3 text-boing-dark">Tedhe Medhe Samachar</h2>
          <p class="featurecards-bolte-sitare-card-text boing--text__body-3 text-boing-dark">India ki taaza aur thodi-si tedhi news!</p>
        </div>
        <div>
          <button class="featurecards-bolte-sitare-card-button text-white boing--text__body-4 d-inline-block">Explore</button>
        </div>
      </div>
    </div>`;
  mainContainer.append(bolteSitareCard1);

  const bolteSitareCard2 = document.createElement('a');
  bolteSitareCard2.classList.add('featurecards-bolte-sitare-card-section', 'd-none', 'analytics_cta_click', 'text-decoration-none');
  bolteSitareCard2.href = '/bolte-sitare.html'; // Placeholder, should be dynamic if authored
  bolteSitareCard2.title = 'Bolte Sitare';
  bolteSitareCard2.setAttribute('data-title', 'Bolte Sitare');
  bolteSitareCard2.innerHTML = `
    <div class="featurecards-bolte-sitare-card-wrapper d-flex">
      <div class="featurecards-bolte-sitare-card-image">
        <img src="/content/dam/aemigrate/uploaded-folder/image/bolte-sitare-cards-fmt-webp-alpha.webp" alt="Bolte Sitare - Lets Boing!" class="featurecards-card-image-item">
      </div>
      <div class="featurecards-content-wrapper d-flex flex-column justify-content-between">
        <div>
          <h2 class="featurecards-bolte-sitare-card-title boing--text__heading-3 text-boing-dark">Bolte Sitare</h2>
          <p class="featurecards-bolte-sitare-card-text boing--text__body-3 text-boing-dark">Aapki bhavishyavaani, Bingo! ki zubaani</p>
        </div>
        <div>
          <button class="featurecards-bolte-sitare-card-button text-white boing--text__body-4 d-inline-block">Explore</button>
        </div>
      </div>
    </div>`;
  mainContainer.append(bolteSitareCard2);

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'd-none');
  mainContainer.append(curveContainer);

  block.textContent = '';
  block.append(mainContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
