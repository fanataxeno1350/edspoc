import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleElement.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, titleElement);
  }
  firstSection.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionElement.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionElement);
  }
  firstSection.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');
  const ctaLink = block.querySelector('[data-aue-prop="cta"]');
  if (ctaLink) {
    const anchor = ctaLink.querySelector('a');
    if (anchor) {
      anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      btnWrapper.append(anchor);
      moveInstrumentation(ctaLink, btnWrapper);
    }
  }
  firstSection.append(btnWrapper);
  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const blogLink = card.querySelector('[data-aue-prop="blogLink"] a');
    if (blogLink) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = blogLink.href;
      cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
      cardWrapper.dataset.ctaLabel = blogLink.textContent.trim();

      const latestBlogsCards = document.createElement('div');
      latestBlogsCards.classList.add('latestblogs-cards');

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
      const imageElement = card.querySelector('[data-aue-prop="image"] img');
      if (imageElement) {
        const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(imageElement, picture.querySelector('img'));
      }
      latestBlogsCards.append(cardImageWrapper);

      const cardsContentWrapper = document.createElement('div');
      cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

      const publishedDate = document.createElement('p');
      publishedDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      const publishDateContent = card.querySelector('[data-aue-prop="publishDate"]');
      if (publishDateContent) {
        publishedDate.textContent = publishDateContent.textContent.trim();
        publishedDate.dataset.date = publishDateContent.dataset.aueProp;
        moveInstrumentation(publishDateContent, publishedDate);
      }
      cardsContentWrapper.append(publishedDate);

      const headline = document.createElement('p');
      headline.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      const headlineContent = card.querySelector('[data-aue-prop="headline"]');
      if (headlineContent) {
        headline.append(...headlineContent.childNodes);
        moveInstrumentation(headlineContent, headline);
      }
      cardsContentWrapper.append(headline);

      latestBlogsCards.append(cardsContentWrapper);
      cardWrapper.append(latestBlogsCards);
      secondSection.append(cardWrapper);
      moveInstrumentation(blogLink, cardWrapper);
    }
  });
  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}