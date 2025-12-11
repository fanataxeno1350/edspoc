import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    sectionFirst.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    sectionFirst.append(p);
  }

  const viewAllLinkElement = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');
    const anchor = viewAllLinkElement.querySelector('a');
    if (anchor) {
      anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      btnWrapper.append(anchor);
      moveInstrumentation(viewAllLinkElement, btnWrapper);
      sectionFirst.append(btnWrapper);
    }
  }

  latestblogsListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLinkElement = card.querySelector('[data-aue-prop="link"]');
    let cardAnchor = cardLinkElement ? cardLinkElement.querySelector('a') : null;

    if (!cardAnchor) {
      cardAnchor = document.createElement('a');
      cardAnchor.href = '#';
    }

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    cardWrapper.href = cardAnchor.href;
    cardWrapper.setAttribute('data-cta-label', cardAnchor.textContent.trim());

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }
    latestblogsCards.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = card.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.append(...dateElement.childNodes);
      moveInstrumentation(dateElement, pDate);
      cardsContentWrapper.append(pDate);
    }

    const blogTitleElement = card.querySelector('[data-aue-prop="blogTitle"]');
    if (blogTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(...blogTitleElement.childNodes);
      moveInstrumentation(blogTitleElement, pTitle);
      cardsContentWrapper.append(pTitle);
    }

    latestblogsCards.append(cardsContentWrapper);
    cardWrapper.append(latestblogsCards);
    sectionSecond.append(cardWrapper);
    moveInstrumentation(card, cardWrapper);
  });

  latestblogsListing.append(sectionSecond);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}