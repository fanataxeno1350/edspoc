import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('featurecards-wrapper');

  // Handle the title row (first row in the block)
  const titleRow = block.children[0];
  if (titleRow) {
    const textDiv = document.createElement('div');
    moveInstrumentation(titleRow, textDiv);
    textDiv.id = 'text-68763da680'; // Static ID from HTML
    textDiv.classList.add('featurecards-text');

    const h1 = document.createElement('h1');
    h1.classList.add('featurecards-title-main');
    const titleText = titleRow.querySelector('h1')?.textContent || '';
    const highlightSpan = titleRow.querySelector('span.featurecards-title-highlight');

    if (highlightSpan) {
      const parts = titleText.split(highlightSpan.textContent);
      h1.append(document.createTextNode(parts[0]));
      const newHighlightSpan = document.createElement('span');
      newHighlightSpan.classList.add('featurecards-title-highlight');
      newHighlightSpan.textContent = highlightSpan.textContent;
      h1.append(newHighlightSpan);
      if (parts[1]) {
        h1.append(document.createTextNode(parts[1]));
      }
    } else {
      h1.textContent = titleText;
    }
    textDiv.append(h1);
    wrapper.append(textDiv);
  }

  // Handle feature cards (remaining rows)
  [...block.children].slice(1).forEach((row) => {
    const section = document.createElement('section');
    moveInstrumentation(row, section);
    section.classList.add('featurecards-section', 'featurecards-card-section', 'featurecards-mx-auto');

    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.classList.add('featurecards-link', 'analytics_cta_click', 'featurecards-text-decoration-none');
      newLink.href = link.href;
      newLink.title = link.title;
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      moveInstrumentation(link, newLink);

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image-wrapper', 'featurecards-w-100', 'featurecards-pb-4');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featurecards-image', 'featurecards-w-100', 'featurecards-h-100');
        imageWrapper.append(optimizedPic);
      }
      newLink.append(imageWrapper);

      const textCenter = document.createElement('div');
      textCenter.classList.add('featurecards-text-center');

      const h2 = document.createElement('h2');
      h2.classList.add('featurecards-title', 'featurecards-boing--text__heading-1');
      h2.textContent = link.querySelector('h2')?.textContent || '';
      textCenter.append(h2);

      const pb5 = document.createElement('div');
      pb5.classList.add('featurecards-pb-5');
      const p = document.createElement('p');
      p.classList.add('featurecards-description', 'featurecards-boing--text__body-2', 'featurecards-text-boing-dark');
      p.textContent = link.querySelector('p')?.textContent || '';
      pb5.append(p);
      textCenter.append(pb5);

      // Recreate the button div if it exists in the original structure
      const originalButtonDiv = link.querySelector('.featurecards-redirected-btn');
      if (originalButtonDiv) {
        const redirectedBtnDiv = document.createElement('div');
        redirectedBtnDiv.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
        const button = document.createElement('button');
        button.type = 'button';
        button.role = 'button';
        button.classList.add('featurecards-arrow-icon-btn');
        button.textContent = originalButtonDiv.querySelector('button')?.textContent || '';
        redirectedBtnDiv.append(button);
        textCenter.append(redirectedBtnDiv);
      }
      newLink.append(textCenter);
      section.append(newLink);
    }
    wrapper.append(section);
  });

  // Handle the 'bolte-sitare-card-section' elements which are initially d-none
  // These are often for different viewports or dynamic loading, so we recreate them as is.
  const bolteSitareCards = block.querySelectorAll('a.featurecards-bolte-sitare-card-section');
  bolteSitareCards.forEach((card) => {
    const newCard = document.createElement('a');
    moveInstrumentation(card, newCard);
    newCard.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
    newCard.href = card.href;
    newCard.title = card.title;
    newCard.setAttribute('data-title', card.getAttribute('data-title'));

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('featurecards-bolte-sitare-card-section--wrapper');

    const cardImgDiv = document.createElement('div');
    cardImgDiv.classList.add('featurecards-bolte-sitare-card-section--img');
    const img = card.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('featurecards-card-img', 'featurecards-h-100', 'featurecards-w-100');
      cardImgDiv.append(optimizedPic);
    }
    cardWrapper.append(cardImgDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');

    const textDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.classList.add('featurecards-bolte-sitare-card-section--title', 'featurecards-boing--text__heading-3', 'featurecards-text-boing-dark');
    h2.textContent = card.querySelector('h2')?.textContent || '';
    textDiv.append(h2);

    const p = document.createElement('p');
    p.classList.add('featurecards-bolte-sitare-card-section--text', 'featurecards-boing--text__body-3', 'featurecards-text-boing-dark');
    p.textContent = card.querySelector('p')?.textContent || '';
    textDiv.append(p);
    contentWrapper.append(textDiv);

    const btnDiv = document.createElement('div');
    const button = document.createElement('button');
    button.classList.add('featurecards-bolte-sitare-card-section--btn', 'featurecards-text-white', 'featurecards-boing--text__body-4', 'featurecards-d-inline-block');
    button.textContent = card.querySelector('button')?.textContent || 'Explore'; // Default text if not found
    btnDiv.append(button);
    contentWrapper.append(btnDiv);

    cardWrapper.append(contentWrapper);
    newCard.append(cardWrapper);
    wrapper.append(newCard);
  });

  // Add the curve container if it exists
  const curveContainer = block.querySelector('.featurecards-curve-container');
  if (curveContainer) {
    const newCurveContainer = document.createElement('div');
    moveInstrumentation(curveContainer, newCurveContainer);
    newCurveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
    wrapper.append(newCurveContainer);
  }

  block.textContent = '';
  block.append(wrapper);
}
