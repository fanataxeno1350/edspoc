import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featurecards-wrapper');
  moveInstrumentation(block, featureCardsWrapper);

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('featurecards-text');
  const title = document.createElement('h1');
  title.classList.add('featurecards-title');

  // Assuming the first child is the main title content
  const authoredTitle = block.querySelector('div:first-child h1');
  if (authoredTitle) {
    title.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, title);
  }
  titleContainer.append(title);
  featureCardsWrapper.append(titleContainer);

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('featurecards-cards-container');

  // Iterate over each feature card authored in the block
  // The block children are expected to be the individual card rows
  Array.from(block.children).forEach((row) => {
    if (row.children.length > 0) {
      const newCardSection = document.createElement('section');
      newCardSection.classList.add('featurecards-section', 'featurecards-card', 'featurecards-mx-auto');
      moveInstrumentation(row, newCardSection);

      const linkElement = document.createElement('a');
      linkElement.classList.add('featurecards-link', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-text-decoration-none');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image', 'featurecards-w-100', 'featurecards-pb-4');

      const textCenter = document.createElement('div');
      textCenter.classList.add('featurecards-text-center');

      const titleH2 = document.createElement('h2');
      titleH2.classList.add('featurecards-title-h2', 'featurecards-boing-text__heading-1');

      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featurecards-pb-5');

      const descriptionP = document.createElement('p');
      descriptionP.classList.add('featurecards-desc', 'featurecards-boing-text__body-2', 'featurecards-text-boing-dark');

      const redirectedBtn = document.createElement('div');
      redirectedBtn.classList.add('featurecards-redirected-btn', 'featurecards-d-none');

      const arrowIconBtn = document.createElement('button');
      arrowIconBtn.setAttribute('type', 'button');
      arrowIconBtn.setAttribute('role', 'button');
      arrowIconBtn.classList.add('featurecards-arrow-icon-btn');

      // Extract content based on data-aue-prop
      const img = row.querySelector('[data-aue-prop="image"]');
        // let img = imageCell.querySelector('img');
        
        if (img) {
          const pic = createOptimizedPicture(img.src, img.alt);
          pic.querySelector('img').classList.add('featurecards-w-100', 'featurecards-h-100');
          imageWrapper.append(pic);
          moveInstrumentation(img, pic.querySelector('img'));
        } else {
          const anchor = img.querySelector('a');
          if (anchor && (anchor.href.endsWith('.webp') || anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.svg')))
          {
            img = document.createElement('img');
            img.src = anchor.href;
            img.alt = row.querySelector('[data-aue-prop="altText"]')?.textContent || '';
            moveInstrumentation(anchor, img);
          }
        }
      

      const linkCell = row.querySelector('[data-aue-prop="link"]');
      if (linkCell) {
        const authoredLink = linkCell.querySelector('a');
        if (authoredLink) {
          linkElement.href = authoredLink.href;
          linkElement.title = authoredLink.title || authoredLink.textContent;
          linkElement.setAttribute('data-cta-label', authoredLink.textContent);
          moveInstrumentation(authoredLink, linkElement);
        }
      }

      const titleCell = row.querySelector('[data-aue-prop="title"]');
      if (titleCell) {
        titleH2.append(...titleCell.childNodes);
        moveInstrumentation(titleCell, titleH2);
      }

      const descriptionCell = row.querySelector('[data-aue-prop="description"]');
      if (descriptionCell) {
        descriptionP.append(...descriptionCell.childNodes);
        moveInstrumentation(descriptionCell, descriptionP);
      }

      const linkLabelCell = row.querySelector('[data-aue-prop="linkLabel"]');
      if (linkLabelCell) {
        arrowIconBtn.append(...linkLabelCell.childNodes);
        moveInstrumentation(linkLabelCell, arrowIconBtn);
      }

      descriptionWrapper.append(descriptionP);
      redirectedBtn.append(arrowIconBtn);
      textCenter.append(titleH2, descriptionWrapper, redirectedBtn);
      linkElement.append(imageWrapper, textCenter);
      newCardSection.append(linkElement);
      cardsContainer.append(newCardSection);
    }
  });

  featureCardsWrapper.append(cardsContainer);

  // Handle the 'd-none' elements from the original HTML if they are not authored
  // These are typically for responsive layouts or specific design variations not directly mapped to AEM fields.
  // For now, we'll create them as empty divs with the correct classes.
  const bolteSitareCardSection1 = document.createElement('a');
  bolteSitareCardSection1.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
  bolteSitareCardSection1.href = '/tedhe-medhe-samachaar.html'; // Placeholder, as this is not authored
  bolteSitareCardSection1.title = 'Tedhe Medhe Samachar'; // Placeholder
  bolteSitareCardSection1.setAttribute('data-title', 'Tedhe Medhe Samachar'); // Placeholder
  bolteSitareCardSection1.innerHTML = `
    <div class="featurecards-bolte-sitare-card-section--wrapper featurecards-d-flex">
      <div class="featurecards-bolte-sitare-card-section--img">
        <img src="/content/dam/aemigrate/uploaded-folder/image/tedhe-medhe-cards?fmt=webp-alpha.webp" alt="Tedhe Medhe Samachaar" class="featurecards-h-100 featurecards-w-100 featurecards-card-img">
      </div>
      <div class="featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between">
        <div>
          <h2 class="featurecards-bolte-sitare-card-section--title featurecards-boing-text__heading-3 featurecards-text-boing-dark">
            Tedhe Medhe Samachar
          </h2>
          <p class="featurecards-bolte-sitare-card-section--text featurecards-boing-text__body-3 featurecards-text-boing-dark">
            India ki taaza aur thodi-si tedhi news!
          </p>
        </div>
        <div>
          <button class="featurecards-bolte-sitare-card-section--btn featurecards-text-white featurecards-boing-text__body-4 featurecards-d-inline-block">
            Explore</button>
        </div>
      </div>
    </div>
  `;
  featureCardsWrapper.append(bolteSitareCardSection1);

  const bolteSitareCardSection2 = document.createElement('a');
  bolteSitareCardSection2.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
  bolteSitareCardSection2.href = '/bolte-sitare.html'; // Placeholder
  bolteSitareCardSection2.title = 'Bolte Sitare'; // Placeholder
  bolteSitareCardSection2.setAttribute('data-title', 'Bolte Sitare'); // Placeholder
  bolteSitareCardSection2.innerHTML = `
    <div class="featurecards-bolte-sitare-card-section--wrapper featurecards-d-flex">
      <div class="featurecards-bolte-sitare-card-section--img">
        <img src="/content/dam/aemigrate/uploaded-folder/image/bolte-sitare-cards?fmt=webp-alpha.webp" alt="Bolte Sitare - Lets Boing!" class="featurecards-h-100 featurecards-w-100 featurecards-card-img">
      </div>
      <div class="featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between">
        <div>
          <h2 class="featurecards-bolte-sitare-card-section--title featurecards-boing-text__heading-3 featurecards-text-boing-dark">
            Bolte Sitare
          </h2>
          <p class="featurecards-bolte-sitare-card-section--text featurecards-boing-text__body-3 featurecards-text-boing-dark">
            Aapki bhavishyavaani, Bingo! ki zubaani
          </p>
        </div>
        <div>
          <button class="featurecards-bolte-sitare-card-section--btn featurecards-text-white featurecards-boing-text__body-4 featurecards-d-inline-block">
            Explore</button>
        </div>
      </div>
    </div>
  `;
  featureCardsWrapper.append(bolteSitareCardSection2);

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  featureCardsWrapper.append(curveContainer);

  block.innerHTML = '';
  block.append(featureCardsWrapper);
}
