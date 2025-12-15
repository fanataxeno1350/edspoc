import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.className = 'latestblogs-wrapper';

  const latestblogsListing = document.createElement('div');
  latestblogsListing.className = 'latestblogs-listing position-relative';

  const sectionFirst = document.createElement('div');
  sectionFirst.className = 'latestblogs-listing_section--first text-white text-center';

  const sectionTitle = block.querySelector('[data-aue-prop="sectionTitle"]');
  if (sectionTitle) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
    h2.append(...sectionTitle.childNodes);
    moveInstrumentation(sectionTitle, h2);
    sectionFirst.append(h2);
  }

  const sectionDesc = block.querySelector('[data-aue-prop="sectionDesc"]');
  if (sectionDesc) {
    const p = document.createElement('p');
    p.className = 'latestblogs-desc boing--text__body-2 pb-4';
    p.append(...sectionDesc.childNodes);
    moveInstrumentation(sectionDesc, p);
    sectionFirst.append(p);
  }

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'latestblogs-btnWrapper';
    const a = document.createElement('a');
    a.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
    a.href = ctaLink.querySelector('a')?.href || '#';
    a.title = ctaLink.textContent.trim();
    a.textContent = ctaLink.textContent.trim();
    moveInstrumentation(ctaLink, a);
    btnWrapper.append(a);
    sectionFirst.append(btnWrapper);
  }

  latestblogsListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.className = 'latestblogs-listing_section--second d-flex';

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLink = card.querySelector('[data-aue-prop="link"] a');
    const cardWrapper = document.createElement('a');
    cardWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
    cardWrapper.href = cardLink?.href || '#';
    cardWrapper.dataset.ctaLabel = card.querySelector('[data-aue-prop="title"]')?.textContent.trim() || '';

    const latestblogsCards = document.createElement('div');
    latestblogsCards.className = 'latestblogs-cards';

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.className = 'latestblogs-cardImageWrapper';
    const image = card.querySelector('[data-aue-prop="image"] img');
    if (image) {
      const picture = createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]);
      picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
      cardImageWrapper.append(picture);
    }
    latestblogsCards.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.className = 'latestblogs-cards_content--wrapper';

    const date = card.querySelector('[data-aue-prop="date"]');
    if (date) {
      const pDate = document.createElement('p');
      pDate.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
      pDate.textContent = date.textContent.trim();
      moveInstrumentation(date, pDate);
      cardsContentWrapper.append(pDate);
    }

    const title = card.querySelector('[data-aue-prop="title"]');
    if (title) {
      const pTitle = document.createElement('p');
      pTitle.className = 'boing--text__body-2 latestblogs-boing--text__body';
      pTitle.append(...title.childNodes);
      moveInstrumentation(title, pTitle);
      cardsContentWrapper.append(pTitle);
    }

    latestblogsCards.append(cardsContentWrapper);
    cardWrapper.append(latestblogsCards);
    moveInstrumentation(card, cardWrapper);
    sectionSecond.append(cardWrapper);
  });

  latestblogsListing.append(sectionSecond);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `latestblogs block`;
  block.dataset.blockStatus = 'loaded';
}