import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const authoredTitle = block.querySelector('[data-aue-prop="title"]');
  if (authoredTitle) {
    titleElement.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, titleElement);
  }

  const descElement = document.createElement('p');
  descElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const authoredDesc = block.querySelector('[data-aue-prop="description"]');
  if (authoredDesc) {
    descElement.append(...authoredDesc.childNodes);
    moveInstrumentation(authoredDesc, descElement);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');
  const viewAllLink = document.createElement('a');
  viewAllLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
  const authoredViewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (authoredViewAllLink) {
    viewAllLink.href = authoredViewAllLink.href;
    viewAllLink.title = authoredViewAllLink.title || authoredViewAllLink.textContent;
    viewAllLink.textContent = authoredViewAllLink.textContent;
    moveInstrumentation(authoredViewAllLink, viewAllLink);
  }
  btnWrapper.append(viewAllLink);

  firstSection.append(titleElement, descElement, btnWrapper);
  mainDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');

  blogCards.forEach((cardNode) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    const authoredCardLink = cardNode.querySelector('[data-aue-prop="cardLink"]');
    if (authoredCardLink) {
      cardLink.href = authoredCardLink.href;
      cardLink.setAttribute('data-cta-label', authoredCardLink.textContent);
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
    const authoredImage = cardNode.querySelector('[data-aue-prop="image"]');
    if (authoredImage && authoredImage.src) {
      const picture = createOptimizedPicture(authoredImage.src, authoredImage.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(authoredImage, picture);
    }
    latestblogsCards.append(cardImageWrapper);

    const cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const publishedDate = document.createElement('p');
    publishedDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const authoredPublishedDate = cardNode.querySelector('[data-aue-prop="publishedDate"]');
    if (authoredPublishedDate) {
      publishedDate.textContent = authoredPublishedDate.textContent;
      publishedDate.setAttribute('data-date', authoredPublishedDate.getAttribute('data-date') || '');
      moveInstrumentation(authoredPublishedDate, publishedDate);
    }

    const description = document.createElement('p');
    description.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    const authoredCardDescription = cardNode.querySelector('[data-aue-prop="description"]');
    if (authoredCardDescription) {
      description.append(...authoredCardDescription.childNodes);
      moveInstrumentation(authoredCardDescription, description);
    }

    cardContentWrapper.append(publishedDate, description);
    latestblogsCards.append(cardContentWrapper);
    cardLink.append(latestblogsCards);
    secondSection.append(cardLink);
    moveInstrumentation(cardNode, cardLink);
  });

  mainDiv.append(secondSection);

  block.textContent = '';
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
