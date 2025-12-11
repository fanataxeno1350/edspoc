import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');
  moveInstrumentation(block, latestBlogsListing);

  // First section
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleElement.append(titleContent);
  }
  firstSection.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionElement.append(descriptionContent);
  }
  firstSection.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const anchor = document.createElement('a');
    anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    anchor.href = viewAllLink.href;
    anchor.title = viewAllLink.title;
    anchor.textContent = viewAllLink.textContent.trim();
    moveInstrumentation(viewAllLink, anchor);
    btnWrapper.append(anchor);
  }
  firstSection.append(btnWrapper);
  latestBlogsListing.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const blogLink = card.querySelector('[data-aue-prop="blogLink"]');
    const cardAnchor = document.createElement('a');
    cardAnchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (blogLink) {
      cardAnchor.href = blogLink.href;
      cardAnchor.setAttribute('data-cta-label', blogLink.textContent.trim());
      moveInstrumentation(blogLink, cardAnchor);
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    let imageElement = card.querySelector('[data-aue-prop="image"] img');
    if (!imageElement) {
      const anchor = card.querySelector('[data-aue-prop="image"] a');
      if (anchor && anchor.href) {
        imageElement = document.createElement('img');
        imageElement.src = anchor.href;
        imageElement.alt = anchor.title || '';
      }
    }

    if (imageElement) {
      const optimizedPicture = createOptimizedPicture(imageElement.src, imageElement.alt);
      optimizedPicture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      moveInstrumentation(imageElement, optimizedPicture.querySelector('img'));
      cardImageWrapper.append(optimizedPicture);
    }
    cardsDiv.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const publishDateElement = document.createElement('p');
    publishDateElement.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const publishDateContent = card.querySelector('[data-aue-prop="publishDate"]');
    if (publishDateContent) {
      publishDateElement.textContent = publishDateContent.textContent.trim();
      publishDateElement.setAttribute('data-date', publishDateContent.getAttribute('data-date'));
      moveInstrumentation(publishDateContent, publishDateElement);
    }
    cardsContentWrapper.append(publishDateElement);

    const blogTitleElement = document.createElement('p');
    blogTitleElement.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    const blogTitleContent = card.querySelector('[data-aue-prop="blogTitle"]');
    if (blogTitleContent) {
      blogTitleElement.append(blogTitleContent);
    }
    cardsContentWrapper.append(blogTitleElement);

    cardsDiv.append(cardsContentWrapper);
    cardAnchor.append(cardsDiv);
    secondSection.append(cardAnchor);
  });

  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
