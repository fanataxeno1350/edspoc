import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.className = 'latestblogs-wrapper';

  const latestblogsListing = document.createElement('div');
  latestblogsListing.className = 'latestblogs-listing position-relative';

  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = document.createElement('h2');
  titleElement.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
  const authoredTitle = block.querySelector('[data-aue-prop="title"]');
  if (authoredTitle) {
    moveInstrumentation(authoredTitle, titleElement);
    titleElement.append(...authoredTitle.childNodes);
  }
  firstSection.append(titleElement);

  const descElement = document.createElement('p');
  descElement.className = 'latestblogs-desc boing--text__body-2 pb-4';
  const authoredDescription = block.querySelector('[data-aue-prop="description"]');
  if (authoredDescription) {
    moveInstrumentation(authoredDescription, descElement);
    descElement.append(...authoredDescription.childNodes);
  }
  firstSection.append(descElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'latestblogs-btnWrapper';
  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const anchor = ctaLink.querySelector('a');
    if (anchor) {
      anchor.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
      btnWrapper.append(anchor);
      moveInstrumentation(ctaLink, anchor);
    }
  }
  firstSection.append(btnWrapper);
  latestblogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-listing_section--second d-flex';

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLink = card.querySelector('[data-aue-prop="blogLink"] a');
    const cardWrapper = document.createElement('a');
    cardWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
    if (cardLink) {
      cardWrapper.href = cardLink.href;
      cardWrapper.title = cardLink.title;
      cardWrapper.setAttribute('data-cta-label', cardLink.textContent.trim());
      moveInstrumentation(cardLink, cardWrapper);
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.className = 'latestblogs-cards';

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.className = 'latestblogs-cardImageWrapper';
    const imageElement = card.querySelector('[data-aue-prop="image"] img');
    if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
      picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
      cardImageWrapper.append(picture);
      moveInstrumentation(imageElement, picture.querySelector('img'));
    } else {
      const imgAnchor = card.querySelector('[data-aue-prop="image"] a[href$=".png"], [data-aue-prop="image"] a[href$=".jpg"], [data-aue-prop="image"] a[href$=".jpeg"]');
      if (imgAnchor) {
        const picture = createOptimizedPicture(imgAnchor.href, imgAnchor.title);
        picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
        cardImageWrapper.append(picture);
        moveInstrumentation(imgAnchor, picture.querySelector('img'));
      }
    }
    latestblogsCards.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.className = 'latestblogs-cards_content--wrapper';

    const dateElement = document.createElement('p');
    dateElement.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
    const authoredDate = card.querySelector('[data-aue-prop="date"]');
    if (authoredDate) {
      dateElement.append(...authoredDate.childNodes);
      moveInstrumentation(authoredDate, dateElement);
    }
    cardsContentWrapper.append(dateElement);

    const textElement = document.createElement('p');
    textElement.className = 'boing--text__body-2 latestblogs-boing--text__body';
    const authoredText = card.querySelector('[data-aue-prop="text"]');
    if (authoredText) {
      textElement.append(...authoredText.childNodes);
      moveInstrumentation(authoredText, textElement);
    }
    cardsContentWrapper.append(textElement);

    latestblogsCards.append(cardsContentWrapper);
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
