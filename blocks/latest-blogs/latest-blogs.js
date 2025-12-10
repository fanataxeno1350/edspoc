import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('latestblogs-listing', 'position-relative');

  // First Section
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  mainWrapper.append(firstSection);

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const ctaLinkWrapper = document.createElement('div');
  ctaLinkWrapper.classList.add('latestblogs-btnWrapper');
  firstSection.append(ctaLinkWrapper);

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const anchor = ctaLink.querySelector('a') || ctaLink;
    const newAnchor = document.createElement('a');
    newAnchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    newAnchor.href = anchor.href;
    newAnchor.title = anchor.title || '';
    newAnchor.textContent = anchor.textContent;
    moveInstrumentation(anchor, newAnchor);
    ctaLinkWrapper.append(newAnchor);
  }

  // Second Section
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  mainWrapper.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const anchor = linkElement.querySelector('a') || linkElement;
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    cardWrapper.href = anchor.href;
    cardWrapper.setAttribute('data-cta-label', card.querySelector('[data-aue-prop="headline"]')?.textContent.trim() || '');
    moveInstrumentation(anchor, cardWrapper);

    const blogCardDiv = document.createElement('div');
    blogCardDiv.classList.add('latestblogs-cards');
    cardWrapper.append(blogCardDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-cardImageWrapper');
    blogCardDiv.append(imageWrapper);

    const imageElement = card.querySelector('[data-aue-prop="image"] img');
    if (imageElement) {
      const pic = createOptimizedPicture(imageElement.src, imageElement.alt);
      pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      moveInstrumentation(imageElement, pic.querySelector('img'));
      imageWrapper.append(pic);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');
    blogCardDiv.append(contentWrapper);

    const dateElement = card.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      if (dateElement.textContent) {
        const date = new Date(dateElement.textContent);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        dateP.textContent = date.toLocaleDateString('en-GB', options);
      }
      moveInstrumentation(dateElement, dateP);
      contentWrapper.append(dateP);
    }

    const headlineElement = card.querySelector('[data-aue-prop="headline"]');
    if (headlineElement) {
      const headlineP = document.createElement('p');
      headlineP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      moveInstrumentation(headlineElement, headlineP);
      contentWrapper.append(headlineP);
    }

    secondSection.append(cardWrapper);
  });

  block.textContent = '';
  block.append(mainWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
