import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const ctaLink = block.querySelector('[data-aue-prop="cta"]');
  if (ctaLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.title = ctaLink.textContent.trim();
    a.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    a.textContent = ctaLink.textContent.trim();
    moveInstrumentation(ctaLink, a);
    btnWrapper.append(a);
    firstSection.append(btnWrapper);
  }

  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLink = card.querySelector('[data-aue-prop="cardLink"]');
    const cardLinkHref = cardLink ? cardLink.href : '#';
    const cardLinkText = cardLink ? cardLink.textContent.trim() : '';

    const cardWrapper = document.createElement('a');
    cardWrapper.href = cardLinkHref;
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    cardWrapper.dataset.ctaLabel = cardLinkText;

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-cardImageWrapper');

    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement && imageElement.src) {
      const picture = createOptimizedPicture(imageElement.src, '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      imageWrapper.append(picture);
      moveInstrumentation(imageElement, picture);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const publishDateElement = card.querySelector('[data-aue-prop="publishDate"]');
    if (publishDateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.textContent = publishDateElement.textContent.trim();
      moveInstrumentation(publishDateElement, pDate);
      contentWrapper.append(pDate);
    }

    const cardTitleElement = card.querySelector('[data-aue-prop="cardTitle"]');
    if (cardTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(...cardTitleElement.childNodes);
      moveInstrumentation(cardTitleElement, pTitle);
      contentWrapper.append(pTitle);
    }

    cardsDiv.append(imageWrapper, contentWrapper);
    cardWrapper.append(cardsDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(card, cardWrapper);
  });

  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.classList.add('latestblogs');
  block.dataset.blockStatus = 'loaded';
}
