import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('section');
  mainWrapper.classList.add('latestblogs-article_listing--wrapper');

  const listingDiv = document.createElement('div');
  listingDiv.classList.add('latestblogs-article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article_listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-article_listing--btnWrapper');

    const a = document.createElement('a');
    a.classList.add('latestblogs-boing--text__title-3', 'latestblogs-article_listing--btn', 'analytics_cta_click');
    a.href = ctaLinkElement.textContent.trim();
    a.title = ctaLinkElement.textContent.trim();
    a.textContent = ctaLinkElement.textContent.trim();

    moveInstrumentation(ctaLinkElement, a);
    btnWrapper.append(a);
    firstSection.append(btnWrapper);
  }

  listingDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article_listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"]');
    const imageElement = cardNode.querySelector('[data-aue-prop="image"]');
    const dateElement = cardNode.querySelector('[data-aue-prop="date"]');
    const headlineElement = cardNode.querySelector('[data-aue-prop="headline"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-article_listing--cardWrapper', 'analytics_cta_click');
    if (linkElement) {
      cardWrapper.href = linkElement.textContent.trim();
      moveInstrumentation(linkElement, cardWrapper);
    }
    if (headlineElement) {
      cardWrapper.dataset.ctaLabel = headlineElement.textContent.trim();
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-article_listing--cards');

    if (imageElement) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-article_listing--cardImageWrapper');
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
      }
      moveInstrumentation(imageElement, cardImageWrapper);
      cardDiv.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('latestblogs-boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.textContent = dateElement.textContent.trim();
      if (dateElement.dataset.date) {
        pDate.dataset.date = dateElement.dataset.date;
      }
      moveInstrumentation(dateElement, pDate);
      contentWrapper.append(pDate);
    }

    if (headlineElement) {
      const pHeadline = document.createElement('p');
      pHeadline.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      pHeadline.append(...headlineElement.childNodes);
      moveInstrumentation(headlineElement, pHeadline);
      contentWrapper.append(pHeadline);
    }

    cardDiv.append(contentWrapper);
    cardWrapper.append(cardDiv);
    moveInstrumentation(cardNode, cardWrapper);
    secondSection.append(cardWrapper);
  });

  listingDiv.append(secondSection);
  mainWrapper.append(listingDiv);

  block.textContent = '';
  block.append(mainWrapper);
  block.className = 'latestblogs-article-listing block';
  block.dataset.blockStatus = 'loaded';
}
