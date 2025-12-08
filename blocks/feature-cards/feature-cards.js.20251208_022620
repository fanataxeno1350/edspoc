import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('feature-cards-container');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('feature-cards-title-wrapper');
  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    titleWrapper.append(...title.childNodes);
    moveInstrumentation(title, titleWrapper);
  }
  mainDiv.append(titleWrapper);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('feature-cards-cards-wrapper');

  const cardModels = block.querySelectorAll('[data-aue-model="card"]');
  cardModels.forEach((cardModel) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('feature-cards-card');

    const linkEl = cardModel.querySelector('[data-aue-prop="link"]');
    const link = document.createElement('a');
    if (linkEl) {
      link.href = linkEl.href || '#';
      link.title = linkEl.title || '';
      link.classList.add('feature-cards-card-link');
      moveInstrumentation(linkEl, link);
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('feature-cards-card-image');
    const imgEl = cardModel.querySelector('[data-aue-prop="image"]');
    if (imgEl) {
      const picture = createOptimizedPicture(imgEl.src, imgEl.alt);
      imageWrapper.append(picture);
      moveInstrumentation(imgEl, picture.querySelector('img'));
    }
    link.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('feature-cards-card-content');

    const headingEl = cardModel.querySelector('[data-aue-prop="heading"]');
    if (headingEl) {
      const heading = document.createElement('h2');
      heading.classList.add('feature-cards-card-heading');
      heading.append(...headingEl.childNodes);
      moveInstrumentation(headingEl, heading);
      contentWrapper.append(heading);
    }

    const descriptionEl = cardModel.querySelector('[data-aue-prop="description"]');
    if (descriptionEl) {
      const description = document.createElement('p');
      description.classList.add('feature-cards-card-description');
      description.append(...descriptionEl.childNodes);
      moveInstrumentation(descriptionEl, description);
      contentWrapper.append(description);
    }

    link.append(contentWrapper);
    cardDiv.append(link);
    cardsWrapper.append(cardDiv);
  });

  mainDiv.append(cardsWrapper);

  block.textContent = '';
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
