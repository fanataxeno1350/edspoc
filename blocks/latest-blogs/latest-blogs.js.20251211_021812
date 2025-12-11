import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestblogsWrapper.append(latestblogsListing);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.textContent = titleElement.textContent;
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.textContent = descriptionElement.textContent;
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');

    const anchor = ctaLinkElement.querySelector('a');
    if (anchor) {
      anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      btnWrapper.append(anchor);
      moveInstrumentation(ctaLinkElement, anchor);
    }
    firstSection.append(btnWrapper);
  }
  latestblogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const imageElement = card.querySelector('[data-aue-prop="image"]');
    const dateElement = card.querySelector('[data-aue-prop="date"]');
    const textElement = card.querySelector('[data-aue-prop="text"]');

    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (linkElement && linkElement.querySelector('a')) {
      const authoredAnchor = linkElement.querySelector('a');
      cardLink.href = authoredAnchor.href;
      cardLink.setAttribute('data-cta-label', authoredAnchor.title || authoredAnchor.textContent.trim());
      moveInstrumentation(authoredAnchor, cardLink);
    } else if (linkElement) {
      // Fallback for aem-content without an <a> inside
      const href = linkElement.textContent.trim();
      if (href) {
        cardLink.href = href;
        cardLink.setAttribute('data-cta-label', href.substring(href.lastIndexOf('/') + 1).replace(/\.html$/, '').replace(/-/g, ' '));
      }
      moveInstrumentation(linkElement, cardLink);
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    } else {
      // Fallback for image reference
      const imgFallback = card.querySelector('img');
      if (imgFallback) {
        const picture = createOptimizedPicture(imgFallback.src, imgFallback.alt || '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(imgFallback, picture.querySelector('img'));
      }
    }
    cardsDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (dateElement) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      dateP.textContent = dateElement.textContent;
      const dataDate = dateElement.getAttribute('data-date');
      if (dataDate) {
        dateP.setAttribute('data-date', dataDate);
      }
      moveInstrumentation(dateElement, dateP);
      contentWrapper.append(dateP);
    }

    if (textElement) {
      const textP = document.createElement('p');
      textP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      textP.textContent = textElement.textContent;
      moveInstrumentation(textElement, textP);
      contentWrapper.append(textP);
    }

    cardsDiv.append(contentWrapper);
    cardLink.append(cardsDiv);
    secondSection.append(cardLink);
    moveInstrumentation(card, cardLink);
  });

  latestblogsListing.append(secondSection);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}