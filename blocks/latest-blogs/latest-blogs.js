import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...title.childNodes);
    moveInstrumentation(title, h2);
    sectionFirst.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    sectionFirst.append(p);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');
    const anchor = viewAllLink.querySelector('a');
    if (anchor) {
      anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      moveInstrumentation(viewAllLink, anchor);
      btnWrapper.append(anchor);
    }
    sectionFirst.append(btnWrapper);
  }

  latestblogsListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLink = card.querySelector('[data-aue-prop="cardLink"]');
    const cardAnchor = cardLink ? cardLink.querySelector('a') : null;

    const latestblogsCardWrapper = document.createElement('a');
    if (cardAnchor) {
      latestblogsCardWrapper.href = cardAnchor.href;
      latestblogsCardWrapper.title = cardAnchor.title;
      latestblogsCardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
      latestblogsCardWrapper.dataset.ctaLabel = cardAnchor.textContent.trim();
      moveInstrumentation(cardLink, latestblogsCardWrapper);
    } else {
      latestblogsCardWrapper.classList.add('latestblogs-cardWrapper');
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');

    const latestblogsCardImageWrapper = document.createElement('div');
    latestblogsCardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    const image = card.querySelector('[data-aue-prop="image"]');
    if (image) {
      const imgElement = image.querySelector('img');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        moveInstrumentation(imgElement, picture.querySelector('img'));
        latestblogsCardImageWrapper.append(picture);
      }
    }
    latestblogsCards.append(latestblogsCardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const publishedDate = card.querySelector('[data-aue-prop="publishedDate"]');
    if (publishedDate) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.append(...publishedDate.childNodes);
      moveInstrumentation(publishedDate, pDate);
      cardsContentWrapper.append(pDate);
    }

    const cardTitle = card.querySelector('[data-aue-prop="cardTitle"]');
    if (cardTitle) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(...cardTitle.childNodes);
      moveInstrumentation(cardTitle, pTitle);
      cardsContentWrapper.append(pTitle);
    }

    latestblogsCards.append(cardsContentWrapper);
    latestblogsCardWrapper.append(latestblogsCards);
    sectionSecond.append(latestblogsCardWrapper);
  });

  latestblogsListing.append(sectionSecond);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
