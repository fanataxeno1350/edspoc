import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsSection = document.createElement('section');
  latestBlogsSection.classList.add('article_listing--wrapper');
  moveInstrumentation(block, latestBlogsSection);

  const articleListingDiv = document.createElement('div');
  articleListingDiv.classList.add('article_listing', 'position-relative');
  latestBlogsSection.append(articleListingDiv);

  // First section (title, description, view all link)
  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleElement.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, titleElement);
  }
  firstSection.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionElement.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionElement);
  }
  firstSection.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('article_listing--btnWrapper');
  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const anchor = viewAllLink.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.title = anchor.title;
      newAnchor.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
      newAnchor.append(...anchor.childNodes);
      moveInstrumentation(anchor, newAnchor);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('arrow-icon');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/etc.clientlibs/itc-family-comedy/clientlibs/clientlib-boing/resources/images/sprite/sprite-boing.svg#arrow_forward');
      svg.append(use);
      newAnchor.append(svg);
      btnWrapper.append(newAnchor);
    }
  }
  firstSection.append(btnWrapper);
  articleListingDiv.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  const cards = block.querySelectorAll('[data-aue-model="blogCard"]');
  cards.forEach((card) => {
    const cardLinkWrapper = document.createElement('a');
    cardLinkWrapper.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
    moveInstrumentation(card, cardLinkWrapper);

    const cardLink = card.querySelector('[data-aue-prop="cardLink"]');
    if (cardLink && cardLink.querySelector('a')) {
      cardLinkWrapper.href = cardLink.querySelector('a').href;
    }
    // Transfer data-cta-label from the original card if present
    if (card.dataset.ctaLabel) {
      cardLinkWrapper.dataset.ctaLabel = card.dataset.ctaLabel;
    }

    const articleCardsDiv = document.createElement('div');
    articleCardsDiv.classList.add('article_listing--cards');
    cardLinkWrapper.append(articleCardsDiv);

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('article_listing--cardImageWrapper');
    articleCardsDiv.append(cardImageWrapper);

    const image = card.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        cardImageWrapper.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      }
    }

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('cards_content--wrapper');
    articleCardsDiv.append(cardsContentWrapper);

    const dateElement = document.createElement('p');
    dateElement.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
    const dateContent = card.querySelector('[data-aue-prop="date"]');
    if (dateContent) {
      dateElement.append(...dateContent.childNodes);
      moveInstrumentation(dateContent, dateElement);
      if (dateContent.dataset.date) {
        dateElement.dataset.date = dateContent.dataset.date;
      }
    }
    cardsContentWrapper.append(dateElement);

    const textElement = document.createElement('p');
    textElement.classList.add('boing--text__body-2', 'boing--text__body');
    const textContent = card.querySelector('[data-aue-prop="text"]');
    if (textContent) {
      textElement.append(...textContent.childNodes);
      moveInstrumentation(textContent, textElement);
    }
    cardsContentWrapper.append(textElement);

    secondSection.append(cardLinkWrapper);
  });
  articleListingDiv.append(secondSection);

  block.textContent = '';
  block.append(latestBlogsSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
