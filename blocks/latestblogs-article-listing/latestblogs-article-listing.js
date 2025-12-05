import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('section');
  mainWrapper.classList.add('latestblogs-article_listing--wrapper');

  const innerWrapper = document.createElement('div');
  innerWrapper.classList.add('latestblogs-article_listing', 'position-relative');
  mainWrapper.append(innerWrapper);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article_listing_section--first', 'text-white', 'text-center');
  innerWrapper.append(firstSection);

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...headingElement.childNodes);
    moveInstrumentation(headingElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const viewAllLinkWrapper = document.createElement('div');
  viewAllLinkWrapper.classList.add('latestblogs-article_listing--btnWrapper');
  firstSection.append(viewAllLinkWrapper);

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const a = document.createElement('a');
    a.classList.add('latestblogs-boing--text__title-3', 'latestblogs-article_listing--btn', 'analytics_cta_click');
    a.href = viewAllLink.href;
    a.title = viewAllLink.title;
    a.append(...viewAllLink.childNodes);
    moveInstrumentation(viewAllLink, a);
    viewAllLinkWrapper.append(a);
  }

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article_listing_section--second', 'd-flex');
  innerWrapper.append(secondSection);

  const articleCards = block.querySelectorAll('[data-aue-model="articleCard"]');
  articleCards.forEach((card) => {
    const cardLink = card.querySelector('[data-aue-prop="link"]');
    const cardHref = cardLink ? cardLink.href : '#';

    const cardWrapper = document.createElement('a');
    cardWrapper.href = cardHref;
    cardWrapper.classList.add('latestblogs-article_listing--cardWrapper', 'analytics_cta_click');
    if (cardLink && cardLink.title) {
      cardWrapper.dataset.ctaLabel = cardLink.title;
    }
    moveInstrumentation(card, cardWrapper);

    const cardInner = document.createElement('div');
    cardInner.classList.add('latestblogs-article_listing--cards');
    cardWrapper.append(cardInner);

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-article_listing--cardImageWrapper');
    cardInner.append(cardImageWrapper);

    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, pic.querySelector('img'));
        cardImageWrapper.append(pic);
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');
    cardInner.append(contentWrapper);

    const dateElement = card.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('latestblogs-boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.append(...dateElement.childNodes);
      moveInstrumentation(dateElement, pDate);
      contentWrapper.append(pDate);
    }

    const titleElement = card.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(...titleElement.childNodes);
      moveInstrumentation(titleElement, pTitle);
      contentWrapper.append(pTitle);
    }

    secondSection.append(cardWrapper);
  });

  block.textContent = '';
  block.append(mainWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
