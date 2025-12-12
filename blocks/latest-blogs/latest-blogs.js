import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('div[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('div[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const ctaLinkWrapper = document.createElement('div');
  ctaLinkWrapper.classList.add('latestblogs-btnWrapper');
  const ctaLinkElement = block.querySelector('div[data-aue-prop="ctaLink"] a');
  if (ctaLinkElement) {
    const a = document.createElement('a');
    a.href = ctaLinkElement.href;
    a.title = ctaLinkElement.title;
    a.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    a.textContent = ctaLinkElement.textContent.split('\n')[0].trim();
    moveInstrumentation(ctaLinkElement.closest('div[data-aue-prop="ctaLink"]'), a);
    ctaLinkWrapper.append(a);
  }
  firstSection.append(ctaLinkWrapper);
  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('div[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('div[data-aue-prop="link"] a');
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (linkElement) {
      cardWrapper.href = linkElement.href;
      cardWrapper.dataset.ctaLabel = linkElement.textContent.trim();
      moveInstrumentation(linkElement.closest('div[data-aue-prop="link"]'), cardWrapper);
    }

    const latestBlogsCards = document.createElement('div');
    latestBlogsCards.classList.add('latestblogs-cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-cardImageWrapper');
    const imageElement = card.querySelector('div[data-aue-prop="image"] picture img');
    if (imageElement) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt, false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      imageWrapper.append(picture);
      moveInstrumentation(imageElement.closest('div[data-aue-prop="image"]'), picture);
    }
    latestBlogsCards.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = card.querySelector('div[data-aue-prop="date"]');
    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.textContent = dateElement.textContent.trim();
      moveInstrumentation(dateElement, pDate);
      contentWrapper.append(pDate);
    }

    const headlineElement = card.querySelector('div[data-aue-prop="headline"]');
    if (headlineElement) {
      const pHeadline = document.createElement('p');
      pHeadline.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pHeadline.append(...headlineElement.childNodes);
      moveInstrumentation(headlineElement, pHeadline);
      contentWrapper.append(pHeadline);
    }

    latestBlogsCards.append(contentWrapper);
    cardWrapper.append(latestBlogsCards);
    secondSection.append(cardWrapper);
    moveInstrumentation(card, cardWrapper);
  });

  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
