import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  latestBlogsListing.append(firstSection);

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const authoredTitle = block.querySelector('[data-aue-prop="title"]');
  if (authoredTitle) {
    titleElement.innerHTML = authoredTitle.innerHTML;
    moveInstrumentation(authoredTitle, titleElement);
  }
  firstSection.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const authoredDescription = block.querySelector('[data-aue-prop="description"]');
  if (authoredDescription) {
    descriptionElement.innerHTML = authoredDescription.innerHTML;
    moveInstrumentation(authoredDescription, descriptionElement);
  }
  firstSection.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');
  firstSection.append(btnWrapper);

  const viewAllLink = document.createElement('a');
  viewAllLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
  const authoredViewAllLink = block.querySelector('[data-aue-prop="viewAllLink"] a');
  if (authoredViewAllLink) {
    viewAllLink.href = authoredViewAllLink.href;
    viewAllLink.title = authoredViewAllLink.title;
    viewAllLink.innerHTML = authoredViewAllLink.innerHTML;
    moveInstrumentation(authoredViewAllLink, viewAllLink);
  }
  btnWrapper.append(viewAllLink);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestBlogsListing.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardRow) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');

    const authoredCardLink = cardRow.querySelector('[data-aue-prop="cardLink"] a');
    if (authoredCardLink) {
      cardLink.href = authoredCardLink.href;
      cardLink.setAttribute('data-cta-label', authoredCardLink.textContent.trim());
      moveInstrumentation(authoredCardLink, cardLink);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-cards');
    cardLink.append(cardDiv);

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
    cardDiv.append(cardImageWrapper);

    let authoredImage = cardRow.querySelector('[data-aue-prop="image"] img');
    if (!authoredImage) {
      const anchor = cardRow.querySelector('[data-aue-prop="image"] a');
      if (anchor) {
        authoredImage = document.createElement('img');
        authoredImage.src = anchor.href;
        authoredImage.alt = anchor.title || '';
        moveInstrumentation(anchor, authoredImage);
      }
    }

    if (authoredImage) {
      const pic = createOptimizedPicture(authoredImage.src, authoredImage.alt, false, [{ width: '750' }]);
      pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      moveInstrumentation(authoredImage, pic.querySelector('img'));
      cardImageWrapper.append(pic);
    }

    const cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('latestblogs-cards_content--wrapper');
    cardDiv.append(cardContentWrapper);

    const publishedDate = document.createElement('p');
    publishedDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const authoredPublishDate = cardRow.querySelector('[data-aue-prop="publishDate"]');
    if (authoredPublishDate) {
      const dateValue = authoredPublishDate.textContent.trim();
      const date = new Date(dateValue);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      publishedDate.textContent = date.toLocaleDateString('en-GB', options);
      publishedDate.setAttribute('data-date', dateValue);
      moveInstrumentation(authoredPublishDate, publishedDate);
    }
    cardContentWrapper.append(publishedDate);

    const cardTitle = document.createElement('p');
    cardTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    const authoredCardTitle = cardRow.querySelector('[data-aue-prop="cardTitle"]');
    if (authoredCardTitle) {
      cardTitle.innerHTML = authoredCardTitle.innerHTML;
      moveInstrumentation(authoredCardTitle, cardTitle);
    }
    cardContentWrapper.append(cardTitle);

    secondSection.append(cardLink);
  });

  block.textContent = '';
  block.append(latestBlogsListing);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
