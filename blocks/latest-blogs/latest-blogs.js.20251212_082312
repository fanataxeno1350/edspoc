import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');

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

  const viewAllLinkContainer = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkContainer) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');

    const link = viewAllLinkContainer.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.title = link.title;
      newLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      newLink.textContent = link.textContent;
      btnWrapper.append(newLink);
      moveInstrumentation(viewAllLinkContainer, btnWrapper);
    }
    firstSection.append(btnWrapper);
  }

  latestblogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"] a');
    const imageElement = cardNode.querySelector('[data-aue-prop="image"] img');
    const dateElement = cardNode.querySelector('[data-aue-prop="date"]');
    const titleElement = cardNode.querySelector('[data-aue-prop="title"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (linkElement) {
      cardWrapper.href = linkElement.href;
      cardWrapper.setAttribute('data-cta-label', titleElement ? titleElement.textContent.trim() : '');
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
    if (imageElement && imageElement.src) {
      const picture = createOptimizedPicture(imageElement.src, imageElement.alt, false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(imageElement.closest('div'), cardImageWrapper);
    } else {
      const fallbackImg = document.createElement('img');
      fallbackImg.classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(fallbackImg);
    }
    cardsDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateP = document.createElement('p');
    dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    if (dateElement) {
      const date = new Date(dateElement.textContent);
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      dateP.textContent = date.toLocaleDateString('en-GB', options);
      dateP.setAttribute('data-date', dateElement.textContent);
      moveInstrumentation(dateElement, dateP);
    } else {
      dateP.textContent = '';
    }
    contentWrapper.append(dateP);

    const titleP = document.createElement('p');
    titleP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    if (titleElement) {
      titleP.textContent = titleElement.textContent;
      moveInstrumentation(titleElement, titleP);
    } else {
      titleP.textContent = '';
    }
    contentWrapper.append(titleP);

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  latestblogsListing.append(secondSection);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.classList.add('latest-blogs');
  block.dataset.blockStatus = 'loaded';
}
