import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featurecards-wrapper');
  moveInstrumentation(block, featureCardsWrapper);

  // Process the title row
  const titleRow = block.children[0];
  if (titleRow) {
    const textDiv = document.createElement('div');
    textDiv.id = 'text-68763da680'; // Static ID from HTML
    textDiv.classList.add('featurecards-text');
    moveInstrumentation(titleRow, textDiv);

    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title-main');
    const titleText = titleRow.querySelector('div:first-child')?.textContent.trim();
    if (titleText) {
      const parts = titleText.split('LetsBoing!');
      h1.textContent = parts[0];
      if (parts.length > 1) {
        const span = document.createElement('span');
        span.classList.add('featurecards-title-highlight');
        span.textContent = 'LetsBoing!';
        h1.append(span);
        h1.append(parts[1]);
      }
    } else {
        h1.innerHTML = 'Welcome to <span class="featurecards-title-highlight">LetsBoing!</span>'; // Default if no content
    }
    textDiv.append(h1);
    featureCardsWrapper.append(textDiv);
  }

  // Process feature cards
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('featurecards-card-container'); // Custom class for the new container

  [...block.children].slice(1).forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const section = document.createElement('section');
      section.classList.add('featurecards-section', 'featurecards-card-section', 'featurecards-mx-auto');
      moveInstrumentation(row, section);

      const newLink = document.createElement('a');
      newLink.classList.add('featurecards-link', 'analytics_cta_click', 'featurecards-text-decoration-none');
      newLink.href = link.href;
      newLink.title = link.title || '';
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || 'Explore');
      moveInstrumentation(link, newLink);

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image-wrapper', 'featurecards-w-100', 'featurecards-pb-4');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-image', 'featurecards-w-100', 'featurecards-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
      newLink.append(imageWrapper);

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('featurecards-text-center');

      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-title', 'featurecards-boing--text__heading-1');
      h2.textContent = link.querySelector('h2')?.textContent.trim() || '';
      textCenterDiv.append(h2);

      const pb5Div = document.createElement('div');
      pb5Div.classList.add('featurecards-pb-5');
      const p = document.createElement('p');
      p.classList.add('featurecards-description', 'featurecards-boing--text__body-2', 'featurecards-text-boing-dark');
      p.textContent = link.querySelector('p')?.textContent.trim() || '';
      pb5Div.append(p);
      textCenterDiv.append(pb5Div);

      const redirectedBtnDiv = document.createElement('div');
      redirectedBtnDiv.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-btn');
      // Assuming the button content is a static SVG path or similar from the HTML example
      button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1762760054025.svg+xml';
      redirectedBtnDiv.append(button);
      textCenterDiv.append(redirectedBtnDiv);

      newLink.append(textCenterDiv);
      section.append(newLink);
      cardContainer.append(section);
    }
  });
  featureCardsWrapper.append(cardContainer);

  // Append the d-none bolte-sitare-card-section elements (static from HTML)
  const bolteSitareCard1 = document.createElement('a');
  bolteSitareCard1.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
  bolteSitareCard1.href = '/tedhe-medhe-samachaar.html';
  bolteSitareCard1.title = 'Tedhe Medhe Samachar';
  bolteSitareCard1.setAttribute('data-title', 'Tedhe Medhe Samachar');
  bolteSitareCard1.innerHTML = `
    <div class="featurecards-bolte-sitare-card-section--wrapper">
      <div class="featurecards-bolte-sitare-card-section--img">
        <img src="/content/dam/aemigrate/uploaded-folder/image/tedhe-medhe-cards?fmt=webp-alpha.webp" alt="Tedhe Medhe Samachaar" class="featurecards-card-img featurecards-h-100 featurecards-w-100">
      </div>
      <div class="featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between">
        <div>
          <h2 class="featurecards-bolte-sitare-card-section--title featurecards-boing--text__heading-3 featurecards-text-boing-dark">
            Tedhe Medhe Samachar
          </h2>
          <p class="featurecards-bolte-sitare-card-section--text featurecards-boing--text__body-3 featurecards-text-boing-dark">
            India ki taaza aur thodi-si tedhi news!
          </p>
        </div>
        <div>
          <button class="featurecards-bolte-sitare-card-section--btn featurecards-text-white featurecards-boing--text__body-4 featurecards-d-inline-block">
            Explore
          </button>
        </div>
      </div>
    </div>
  `;
  featureCardsWrapper.append(bolteSitareCard1);

  const bolteSitareCard2 = document.createElement('a');
  bolteSitareCard2.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
  bolteSitareCard2.href = '/bolte-sitare.html';
  bolteSitareCard2.title = 'Bolte Sitare';
  bolteSitareCard2.setAttribute('data-title', 'Bolte Sitare');
  bolteSitareCard2.innerHTML = `
    <div class="featurecards-bolte-sitare-card-section--wrapper">
      <div class="featurecards-bolte-sitare-card-section--img">
        <img src="/content/dam/aemigrate/uploaded-folder/image/bolte-sitare-cards?fmt=webp-alpha.webp" alt="Bolte Sitare - Lets Boing!" class="featurecards-card-img featurecards-h-100 featurecards-w-100">
      </div>
      <div class="featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between">
        <div>
          <h2 class="featurecards-bolte-sitare-card-section--title featurecards-boing--text__heading-3 featurecards-text-boing-dark">
            Bolte Sitare
          </h2>
          <p class="featurecards-bolte-sitare-card-section--text featurecards-boing--text__body-3 featurecards-text-boing-dark">
            Aapki bhavishyavaani, Bingo! ki zubaani
          </p>
        </div>
        <div>
          <button class="featurecards-bolte-sitare-card-section--btn featurecards-text-white featurecards-boing--text__body-4 featurecards-d-inline-block">
            Explore
          </button>
        </div>
      </div>
    </div>
  `;
  featureCardsWrapper.append(bolteSitareCard2);

  // Append the curve-container (static from HTML)
  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  featureCardsWrapper.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsWrapper);
}
