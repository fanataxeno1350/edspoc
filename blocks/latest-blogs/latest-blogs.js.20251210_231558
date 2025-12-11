import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');

  const latestblogsListingSectionFirst = document.createElement('div');
  latestblogsListingSectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    latestblogsListingSectionFirst.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    latestblogsListingSectionFirst.append(p);
  }

  const viewAllLinkElement = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkElement) {
    const latestblogsBtnWrapper = document.createElement('div');
    latestblogsBtnWrapper.classList.add('latestblogs-btnWrapper');

    const anchor = viewAllLinkElement.querySelector('a');
    if (anchor) {
      anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      latestblogsBtnWrapper.append(anchor);
      moveInstrumentation(viewAllLinkElement, anchor);
    }
    latestblogsListingSectionFirst.append(latestblogsBtnWrapper);
  }

  latestblogsListing.append(latestblogsListingSectionFirst);

  const latestblogsListingSectionSecond = document.createElement('div');
  latestblogsListingSectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    let cardAnchor = linkElement ? linkElement.querySelector('a') : null;

    if (!cardAnchor) {
      // Fallback for link if aem-content doesn't render an <a> directly
      cardAnchor = document.createElement('a');
      cardAnchor.href = '#'; // Default href if not found
      const linkText = linkElement ? linkElement.textContent.trim() : '';
      if (linkText) {
        cardAnchor.href = linkText;
      }
    }

    const latestblogsCardWrapper = cardAnchor.cloneNode(false);
    latestblogsCardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    latestblogsCardWrapper.removeAttribute('data-aue-prop');
    moveInstrumentation(linkElement, latestblogsCardWrapper);

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');

    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const latestblogsCardImageWrapper = document.createElement('div');
      latestblogsCardImageWrapper.classList.add('latestblogs-cardImageWrapper');

      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        const pictureImg = picture.querySelector('img');
        pictureImg.classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        latestblogsCardImageWrapper.append(picture);
        moveInstrumentation(img, pictureImg);
      } else {
        // Fallback for image if no <img> is directly present
        const anchor = imageElement.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".webp"], a[href$=".gif"]');
        if (anchor) {
          const picture = createOptimizedPicture(anchor.href, '');
          const pictureImg = picture.querySelector('img');
          pictureImg.classList.add('latestblogs-cardImage', 'w-100', 'h-100');
          latestblogsCardImageWrapper.append(picture);
          moveInstrumentation(imageElement, pictureImg);
        }
      }
      latestblogsCards.append(latestblogsCardImageWrapper);
    }

    const latestblogsCardsContentWrapper = document.createElement('div');
    latestblogsCardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = card.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      dateP.append(...dateElement.childNodes);
      moveInstrumentation(dateElement, dateP);
      latestblogsCardsContentWrapper.append(dateP);
    }

    const textElement = card.querySelector('[data-aue-prop="text"]');
    if (textElement) {
      const textP = document.createElement('p');
      textP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      textP.append(...textElement.childNodes);
      moveInstrumentation(textElement, textP);
      latestblogsCardsContentWrapper.append(textP);
    }

    latestblogsCards.append(latestblogsCardsContentWrapper);
    latestblogsCardWrapper.append(latestblogsCards);
    latestblogsListingSectionSecond.append(latestblogsCardWrapper);
  });

  latestblogsListing.append(latestblogsListingSectionSecond);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
