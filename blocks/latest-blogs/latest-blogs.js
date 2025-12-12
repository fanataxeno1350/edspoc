import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const latestBlogsListingSectionFirst = document.createElement('div');
  latestBlogsListingSectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleElement.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, titleElement);
  }
  latestBlogsListingSectionFirst.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionElement.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionElement);
  }
  latestBlogsListingSectionFirst.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"] .button-container a');
  const ctaText = block.querySelector('[data-aue-prop="ctaText"]');
  const ctaIcon = block.querySelector('[data-aue-prop="ctaIcon"]');

  if (ctaLink && ctaText) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.href = ctaLink.href;
    ctaAnchor.title = ctaText.textContent.trim();
    ctaAnchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    ctaAnchor.append(...ctaText.childNodes);
    if (ctaIcon && ctaIcon.querySelector('img')) {
      const img = ctaIcon.querySelector('img');
      ctaAnchor.append(img);
    }
    btnWrapper.append(ctaAnchor);
    moveInstrumentation(ctaLink, ctaAnchor);
    moveInstrumentation(ctaText, ctaAnchor);
    if (ctaIcon) moveInstrumentation(ctaIcon, ctaAnchor);
  }
  latestBlogsListingSectionFirst.append(btnWrapper);
  latestBlogsListing.append(latestBlogsListingSectionFirst);

  const latestBlogsListingSectionSecond = document.createElement('div');
  latestBlogsListingSectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const blogLink = cardNode.querySelector('[data-aue-prop="blogLink"] .button-container a');
    const image = cardNode.querySelector('[data-aue-prop="image"] img');
    const publishDate = cardNode.querySelector('[data-aue-prop="publishDate"]');
    const blogTitle = cardNode.querySelector('[data-aue-prop="title"]');

    const cardAnchor = document.createElement('a');
    cardAnchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (blogLink) {
      cardAnchor.href = blogLink.href;
      cardAnchor.dataset.ctaLabel = blogTitle ? blogTitle.textContent.trim() : '';
    }

    const latestBlogsCards = document.createElement('div');
    latestBlogsCards.classList.add('latestblogs-cards');

    if (image) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
      const picture = createOptimizedPicture(image.src, image.alt, false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      latestBlogsCards.append(cardImageWrapper);
      moveInstrumentation(image, picture);
    }

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (publishDate) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      const dateValue = new Date(publishDate.textContent);
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      dateP.textContent = dateValue.toLocaleDateString('en-GB', options);
      dateP.dataset.date = publishDate.textContent;
      cardsContentWrapper.append(dateP);
      moveInstrumentation(publishDate, dateP);
    }

    if (blogTitle) {
      const titleP = document.createElement('p');
      titleP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      titleP.append(...blogTitle.childNodes);
      cardsContentWrapper.append(titleP);
      moveInstrumentation(blogTitle, titleP);
    }

    latestBlogsCards.append(cardsContentWrapper);
    cardAnchor.append(latestBlogsCards);
    latestBlogsListingSectionSecond.append(cardAnchor);
    moveInstrumentation(cardNode, cardAnchor);
  });

  latestBlogsListing.append(latestBlogsListingSectionSecond);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = 'latest-blogs block';
  block.dataset.blockStatus = 'loaded';
}
