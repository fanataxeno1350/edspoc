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

  const viewAllLinkElement = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');

    const a = document.createElement('a');
    a.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    a.href = viewAllLinkElement.href;
    a.title = viewAllLinkElement.textContent.trim();
    a.textContent = viewAllLinkElement.textContent.trim();

    btnWrapper.append(a);
    firstSection.append(btnWrapper);
    moveInstrumentation(viewAllLinkElement, a);
  }

  mainDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogItems = block.querySelectorAll('[data-aue-model="blogItem"]');
  blogItems.forEach((blogItem) => {
    const linkElement = blogItem.querySelector('[data-aue-prop="link"]');
    const imageElement = blogItem.querySelector('[data-aue-prop="image"]');
    const publishDateElement = blogItem.querySelector('[data-aue-prop="publishDate"]');
    const blogTitleElement = blogItem.querySelector('[data-aue-prop="blogTitle"]');

    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.dataset.ctaLabel = blogTitleElement ? blogTitleElement.textContent.trim() : '';
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

    if (publishDateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.textContent = publishDateElement.textContent.trim();
      pDate.dataset.date = publishDateElement.dataset.date;
      contentWrapper.append(pDate);
      moveInstrumentation(publishDateElement, pDate);
    }

    if (blogTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(...blogTitleElement.childNodes);
      contentWrapper.append(pTitle);
      moveInstrumentation(blogTitleElement, pTitle);
    }

    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    secondSection.append(cardLink);
    moveInstrumentation(blogItem, cardLink);
  });

  mainDiv.append(secondSection);

  block.textContent = '';
  block.classList.add('latestblogs-wrapper');
  block.append(mainDiv);
  block.dataset.blockStatus = 'loaded';
}
