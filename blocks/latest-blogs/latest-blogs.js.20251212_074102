import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.textContent = heading.textContent;
    moveInstrumentation(heading, h2);
    sectionFirst.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    pDesc.textContent = description.textContent;
    moveInstrumentation(description, pDesc);
    sectionFirst.append(pDesc);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');
    const a = viewAllLink.querySelector('.button-container a');
    if (a) {
      const newA = document.createElement('a');
      newA.href = a.href;
      newA.title = a.textContent.trim();
      newA.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      newA.textContent = a.textContent.trim();
      btnWrapper.append(newA);
      moveInstrumentation(viewAllLink, btnWrapper);
      sectionFirst.append(btnWrapper);
    }
  }

  latestBlogsListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"] .button-container a');
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (linkElement) {
      cardWrapper.href = linkElement.href;
      cardWrapper.dataset.ctaLabel = linkElement.textContent.trim();
    } else {
      cardWrapper.href = '#';
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    const image = card.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(image, cardImageWrapper);
      }
    }
    cardsDiv.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const date = card.querySelector('[data-aue-prop="date"]');
    if (date) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.textContent = date.textContent;
      cardsContentWrapper.append(pDate);
      moveInstrumentation(date, pDate);
    }

    const title = card.querySelector('[data-aue-prop="title"]');
    if (title) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.textContent = title.textContent;
      cardsContentWrapper.append(pTitle);
      moveInstrumentation(title, pTitle);
    }

    cardsDiv.append(cardsContentWrapper);
    cardWrapper.append(cardsDiv);
    moveInstrumentation(card, cardWrapper);
    sectionSecond.append(cardWrapper);
  });

  latestBlogsListing.append(sectionSecond);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = 'latest-blogs block';
  block.dataset.blockStatus = 'loaded';
}