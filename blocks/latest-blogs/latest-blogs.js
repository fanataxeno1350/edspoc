import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.className = 'latestblogs-wrapper';

  const latestblogsListing = document.createElement('div');
  latestblogsListing.className = 'latestblogs-listing position-relative';

  const latestblogsListingSectionFirst = document.createElement('div');
  latestblogsListingSectionFirst.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    latestblogsListingSectionFirst.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.className = 'latestblogs-desc boing--text__body-2 pb-4';
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    latestblogsListingSectionFirst.append(p);
  }

  const viewAllLinkElement = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkElement) {
    const latestblogsBtnWrapper = document.createElement('div');
    latestblogsBtnWrapper.className = 'latestblogs-btnWrapper';

    const a = document.createElement('a');
    a.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
    a.href = viewAllLinkElement.href;
    a.title = viewAllLinkElement.textContent.trim();
    a.textContent = viewAllLinkElement.textContent.trim();
    moveInstrumentation(viewAllLinkElement, a);
    latestblogsBtnWrapper.append(a);
    latestblogsListingSectionFirst.append(latestblogsBtnWrapper);
  }

  latestblogsListing.append(latestblogsListingSectionFirst);

  const latestblogsListingSectionSecond = document.createElement('div');
  latestblogsListingSectionSecond.className = 'latestblogs-listing_section--second d-flex';

  const blogCardsContainer = block.querySelector('[data-aue-prop="blogCards"]');
  if (blogCardsContainer) {
    const blogCardItems = blogCardsContainer.querySelectorAll('[data-aue-model="blogCard"]');
    blogCardItems.forEach((cardNode) => {
      const linkElement = cardNode.querySelector('[data-aue-prop="link"]');
      const imageElement = cardNode.querySelector('[data-aue-prop="image"]');
      const dateElement = cardNode.querySelector('[data-aue-prop="date"]');
      const headlineElement = cardNode.querySelector('[data-aue-prop="headline"]');

      const cardAnchor = document.createElement('a');
      cardAnchor.className = 'latestblogs-cardWrapper analytics_cta_click';
      if (linkElement) {
        cardAnchor.href = linkElement.href;
        cardAnchor.setAttribute('data-cta-label', headlineElement ? headlineElement.textContent.trim() : '');
        moveInstrumentation(linkElement, cardAnchor);
      }

      const latestblogsCards = document.createElement('div');
      latestblogsCards.className = 'latestblogs-cards';

      if (imageElement) {
        const latestblogsCardImageWrapper = document.createElement('div');
        latestblogsCardImageWrapper.className = 'latestblogs-cardImageWrapper';
        const img = imageElement.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
          latestblogsCardImageWrapper.append(picture);
          moveInstrumentation(imageElement, latestblogsCardImageWrapper);
        }
        latestblogsCards.append(latestblogsCardImageWrapper);
      }

      const latestblogsCardsContentWrapper = document.createElement('div');
      latestblogsCardsContentWrapper.className = 'latestblogs-cards_content--wrapper';

      if (dateElement) {
        const pDate = document.createElement('p');
        pDate.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
        if (dateElement.dataset.date) {
          pDate.setAttribute('data-date', dateElement.dataset.date);
        }
        pDate.append(...dateElement.childNodes);
        moveInstrumentation(dateElement, pDate);
        latestblogsCardsContentWrapper.append(pDate);
      }

      if (headlineElement) {
        const pHeadline = document.createElement('p');
        pHeadline.className = 'boing--text__body-2 latestblogs-boing--text__body';
        pHeadline.append(...headlineElement.childNodes);
        moveInstrumentation(headlineElement, pHeadline);
        latestblogsCardsContentWrapper.append(pHeadline);
      }
      latestblogsCards.append(latestblogsCardsContentWrapper);
      cardAnchor.append(latestblogsCards);
      moveInstrumentation(cardNode, cardAnchor);
      latestblogsListingSectionSecond.append(cardAnchor);
    });
  }

  latestblogsListing.append(latestblogsListingSectionSecond);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.className = 'latestblogs block';
  block.append(latestblogsWrapper);
  block.dataset.blockStatus = 'loaded';
}