import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...heading.childNodes);
    firstSection.append(h2);
    moveInstrumentation(heading, h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    pDesc.append(...description.childNodes);
    firstSection.append(pDesc);
    moveInstrumentation(description, pDesc);
  }

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaText = block.querySelector('[data-aue-prop="ctaText"]');

  if (ctaLink || ctaText) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');

    const anchor = document.createElement('a');
    anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    if (ctaLink) {
      anchor.href = ctaLink.textContent.trim();
      anchor.title = ctaText ? ctaText.textContent.trim() : '';
      moveInstrumentation(ctaLink, anchor);
    }
    if (ctaText) {
      anchor.append(...ctaText.childNodes);
      moveInstrumentation(ctaText, anchor);
    } else if (ctaLink) {
      anchor.textContent = 'View All'; // Fallback text if ctaText is missing
    }
    btnWrapper.append(anchor);
    firstSection.append(btnWrapper);
  }

  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkEl = cardNode.querySelector('[data-aue-prop="link"]');
    const imageEl = cardNode.querySelector('[data-aue-prop="image"]');
    const dateEl = cardNode.querySelector('[data-aue-prop="date"]');
    const titleEl = cardNode.querySelector('[data-aue-prop="title"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (linkEl) {
      cardWrapper.href = linkEl.textContent.trim();
      moveInstrumentation(linkEl, cardWrapper);
    }
    if (titleEl) {
      cardWrapper.dataset.ctaLabel = titleEl.textContent.trim();
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    if (imageEl) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt, false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      cardsDiv.append(cardImageWrapper);
      moveInstrumentation(imageEl, cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (dateEl) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.textContent = dateEl.textContent.trim();
      pDate.dataset.date = dateEl.dataset.aueProp ? '' : ''; // Remove data-date if it's not a direct prop value
      contentWrapper.append(pDate);
      moveInstrumentation(dateEl, pDate);
    }

    if (titleEl) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(...titleEl.childNodes);
      contentWrapper.append(pTitle);
      moveInstrumentation(titleEl, pTitle);
    }

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `latestblogs block`;
  block.dataset.blockStatus = 'loaded';
}
