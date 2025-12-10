import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.className = 'latestblogs-wrapper';

  const latestblogsListing = document.createElement('div');
  latestblogsListing.className = 'latestblogs-listing position-relative';

  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.className = 'latestblogs-desc boing--text__body-2 pb-4';
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const viewAllLinkElement = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'latestblogs-btnWrapper';
    const a = document.createElement('a');
    a.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
    a.href = viewAllLinkElement.href;
    a.title = viewAllLinkElement.textContent.trim();
    a.append(...viewAllLinkElement.childNodes);
    moveInstrumentation(viewAllLinkElement, a);
    btnWrapper.append(a);
    firstSection.append(btnWrapper);
  }

  latestblogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-listing_section--second d-flex';

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const cardWrapper = document.createElement('a');
    cardWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
    if (linkElement) {
      cardWrapper.href = linkElement.href;
      cardWrapper.setAttribute('data-cta-label', card.querySelector('[data-aue-prop="cardTitle"]').textContent.trim());
      moveInstrumentation(linkElement, cardWrapper);
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.className = 'latestblogs-cards';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'latestblogs-cardImageWrapper';
    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
        moveInstrumentation(img, picture.querySelector('img'));
        imageWrapper.append(picture);
      }
    }
    latestblogsCards.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'latestblogs-cards_content--wrapper';

    const dateElement = card.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
      pDate.setAttribute('data-date', dateElement.getAttribute('data-date'));
      pDate.append(...dateElement.childNodes);
      moveInstrumentation(dateElement, pDate);
      contentWrapper.append(pDate);
    }

    const cardTitleElement = card.querySelector('[data-aue-prop="cardTitle"]');
    if (cardTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.className = 'boing--text__body-2 latestblogs-boing--text__body';
      pTitle.append(...cardTitleElement.childNodes);
      moveInstrumentation(cardTitleElement, pTitle);
      contentWrapper.append(pTitle);
    }

    latestblogsCards.append(contentWrapper);
    cardWrapper.append(latestblogsCards);
    secondSection.append(cardWrapper);
  });

  latestblogsListing.append(secondSection);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
