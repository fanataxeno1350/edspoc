import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    firstSection.append(h2);
    moveInstrumentation(titleElement, h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    firstSection.append(p);
    moveInstrumentation(descriptionElement, p);
  }

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');
    const a = document.createElement('a');
    a.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    a.href = ctaLinkElement.href;
    a.title = ctaLinkElement.textContent.trim();
    a.textContent = ctaLinkElement.textContent.trim();
    btnWrapper.append(a);
    firstSection.append(btnWrapper);
    moveInstrumentation(ctaLinkElement, a);
  }
  mainDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"]');
    const imageElement = cardNode.querySelector('[data-aue-prop="image"]');
    const publishedDateElement = cardNode.querySelector('[data-aue-prop="publishedDate"]');
    const headlineElement = cardNode.querySelector('[data-aue-prop="headline"]');

    const cardLinkWrapper = document.createElement('a');
    cardLinkWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (linkElement) {
      cardLinkWrapper.href = linkElement.href;
      cardLinkWrapper.setAttribute('data-cta-label', headlineElement ? headlineElement.textContent.trim() : '');
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-cards');

    if (imageElement) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      cardDiv.append(cardImageWrapper);
      moveInstrumentation(imageElement, picture);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (publishedDateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.textContent = publishedDateElement.textContent.trim();
      if (publishedDateElement.dataset.date) {
        pDate.setAttribute('data-date', publishedDateElement.dataset.date);
      }
      contentWrapper.append(pDate);
      moveInstrumentation(publishedDateElement, pDate);
    }

    if (headlineElement) {
      const pHeadline = document.createElement('p');
      pHeadline.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pHeadline.append(...headlineElement.childNodes);
      contentWrapper.append(pHeadline);
      moveInstrumentation(headlineElement, pHeadline);
    }

    cardDiv.append(contentWrapper);
    cardLinkWrapper.append(cardDiv);
    secondSection.append(cardLinkWrapper);
    moveInstrumentation(cardNode, cardLinkWrapper);
  });

  mainDiv.append(secondSection);

  block.textContent = '';
  block.append(mainDiv);
  block.classList.add('latestblogs-wrapper');
  block.dataset.blockStatus = 'loaded';
}
