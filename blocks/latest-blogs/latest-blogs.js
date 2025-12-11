import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestblogsWrapper.append(latestblogsListing);

  const latestblogsListingSectionFirst = document.createElement('div');
  latestblogsListingSectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  latestblogsListing.append(latestblogsListingSectionFirst);

  const titleElement = block.querySelector('h2');
  if (titleElement) {
    titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    latestblogsListingSectionFirst.append(titleElement);
    moveInstrumentation(block.children[0], titleElement);
  }

  const descriptionElement = block.querySelector('p');
  if (descriptionElement) {
    descriptionElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    latestblogsListingSectionFirst.append(descriptionElement);
    moveInstrumentation(block.children[1], descriptionElement);
  }

  const latestblogsBtnWrapper = document.createElement('div');
  latestblogsBtnWrapper.classList.add('latestblogs-btnWrapper');
  latestblogsListingSectionFirst.append(latestblogsBtnWrapper);

  const ctaLink = block.querySelector('a');
  if (ctaLink) {
    ctaLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    latestblogsBtnWrapper.append(ctaLink);
    moveInstrumentation(block.children[2], ctaLink);
  }

  const latestblogsListingSectionSecond = document.createElement('div');
  latestblogsListingSectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestblogsListing.append(latestblogsListingSectionSecond);

  const blogItems = block.querySelectorAll('[data-aue-model="blogItem"]');
  blogItems.forEach((item) => {
    const blogLink = item.querySelector('[data-aue-prop="blogLink"]');
    const image = item.querySelector('[data-aue-prop="image"] img');
    const date = item.querySelector('[data-aue-prop="date"]');
    const title = item.querySelector('[data-aue-prop="title"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (blogLink) {
      cardWrapper.href = blogLink.href;
      cardWrapper.title = blogLink.title || '';
      cardWrapper.setAttribute('data-cta-label', blogLink.textContent.trim());
    } else {
      cardWrapper.href = '#'; // Fallback link
    }
    moveInstrumentation(item, cardWrapper);

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');
    cardWrapper.append(cardsDiv);

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
    cardsDiv.append(cardImageWrapper);

    if (image) {
      const optimizedPicture = createOptimizedPicture(image.src, image.alt);
      optimizedPicture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(optimizedPicture);
      moveInstrumentation(image, optimizedPicture.querySelector('img'));
    }

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');
    cardsDiv.append(cardsContentWrapper);

    if (date) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      dateP.textContent = date.textContent.trim();
      if (date.dataset.date) {
        dateP.setAttribute('data-date', date.dataset.date);
      }
      cardsContentWrapper.append(dateP);
      moveInstrumentation(date, dateP);
    }

    if (title) {
      const titleP = document.createElement('p');
      titleP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      titleP.textContent = title.textContent.trim();
      cardsContentWrapper.append(titleP);
      moveInstrumentation(title, titleP);
    }

    latestblogsListingSectionSecond.append(cardWrapper);
  });

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
