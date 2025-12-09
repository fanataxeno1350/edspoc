import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('section');
  mainWrapper.classList.add('latestblogs-article_listing--wrapper');

  const innerWrapper = document.createElement('div');
  innerWrapper.classList.add('latestblogs-article_listing', 'position-relative');
  mainWrapper.append(innerWrapper);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article_listing_section--first', 'text-white', 'text-center');
  innerWrapper.append(firstSection);

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'text-white', 'pb-3');
  const authoredTitle = block.querySelector('div:nth-child(1) > div:nth-child(1) > h2');
  if (authoredTitle) {
    titleElement.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, titleElement);
  }
  firstSection.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('latestblogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'pb-4');
  const authoredDescription = block.querySelector('div:nth-child(1) > div:nth-child(1) > p');
  if (authoredDescription) {
    descriptionElement.append(...authoredDescription.childNodes);
    moveInstrumentation(authoredDescription, descriptionElement);
  }
  firstSection.append(descriptionElement);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('latestblogs-article_listing--btnWrapper');
  firstSection.append(buttonWrapper);

  const authoredLink = block.querySelector('div:nth-child(1) > div:nth-child(1) > div > p > a');
  if (authoredLink) {
    const linkElement = document.createElement('a');
    linkElement.href = authoredLink.href;
    linkElement.title = authoredLink.title;
    linkElement.classList.add('latestblogs-boing--text__title-3', 'latestblogs-article_listing--btn', 'analytics_cta_click');
    linkElement.append(...authoredLink.childNodes);
    moveInstrumentation(authoredLink, linkElement);
    buttonWrapper.append(linkElement);
  }

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article_listing_section--second', 'd-flex');
  innerWrapper.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLink = card.querySelector('a');
    const newCardLink = document.createElement('a');
    if (cardLink) {
      newCardLink.href = cardLink.href;
      newCardLink.classList.add('latestblogs-article_listing--cardWrapper', 'analytics_cta_click');
      if (cardLink.dataset.ctaLabel) {
        newCardLink.dataset.ctaLabel = cardLink.dataset.ctaLabel;
      }
      moveInstrumentation(cardLink, newCardLink);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-article_listing--cards');
    newCardLink.append(cardDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-article_listing--cardImageWrapper');
    cardDiv.append(imageWrapper);

    const img = card.querySelector('[data-aue-prop="image"]');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'w-100', 'h-100');
      imageWrapper.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');
    cardDiv.append(contentWrapper);

    const dateElement = document.createElement('p');
    dateElement.classList.add('latestblogs-boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const authoredDate = card.querySelector('[data-aue-prop="date"]');
    if (authoredDate) {
      dateElement.append(...authoredDate.childNodes);
      moveInstrumentation(authoredDate, dateElement);
      if (authoredDate.dataset.date) {
        dateElement.dataset.date = authoredDate.dataset.date;
      }
    }
    contentWrapper.append(dateElement);

    const titleContentElement = document.createElement('p');
    titleContentElement.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
    const authoredCardTitle = card.querySelector('[data-aue-prop="title"]');
    if (authoredCardTitle) {
      titleContentElement.append(...authoredCardTitle.childNodes);
      moveInstrumentation(authoredCardTitle, titleContentElement);
    }
    contentWrapper.append(titleContentElement);

    secondSection.append(newCardLink);
  });

  block.textContent = '';
  block.append(mainWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
