import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestBlogsWrapper.append(latestBlogsListing);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  latestBlogsListing.append(firstSection);

  const titleWrapper = document.createElement('h2');
  titleWrapper.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    titleWrapper.append(...title.childNodes);
    moveInstrumentation(title, titleWrapper);
  }
  firstSection.append(titleWrapper);

  const descriptionWrapper = document.createElement('p');
  descriptionWrapper.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    descriptionWrapper.append(...description.childNodes);
    moveInstrumentation(description, descriptionWrapper);
  }
  firstSection.append(descriptionWrapper);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');
  firstSection.append(btnWrapper);

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const anchor = viewAllLink.querySelector('a');
    if (anchor) {
      anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      btnWrapper.append(anchor);
      moveInstrumentation(viewAllLink, anchor);
    }
  }

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestBlogsListing.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLink = card.querySelector('[data-aue-prop="link"]');
    let anchor = null;
    if (cardLink) {
      anchor = cardLink.querySelector('a');
      if (anchor) {
        anchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
        const ctaLabel = anchor.textContent.trim();
        if (ctaLabel) {
          anchor.setAttribute('data-cta-label', ctaLabel);
        }
        moveInstrumentation(cardLink, anchor);
      }
    }

    if (!anchor) {
      anchor = document.createElement('a');
      anchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    }
    secondSection.append(anchor);

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');
    anchor.append(latestblogsCards);

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
    latestblogsCards.append(cardImageWrapper);

    const image = card.querySelector('[data-aue-prop="image"] img');
    if (image) {
      const pic = createOptimizedPicture(image.src, image.alt);
      pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(pic);
      moveInstrumentation(image, pic.querySelector('img'));
    } else {
      const imageAnchor = card.querySelector('[data-aue-prop="image"] a');
      if (imageAnchor) {
        const imgElement = document.createElement('img');
        imgElement.src = imageAnchor.href;
        imgElement.alt = imageAnchor.title || '';
        imgElement.classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(imgElement);
        moveInstrumentation(imageAnchor, imgElement);
      }
    }

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');
    latestblogsCards.append(cardsContentWrapper);

    const publishedDateWrapper = document.createElement('p');
    publishedDateWrapper.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const publishDate = card.querySelector('[data-aue-prop="publishDate"]');
    if (publishDate) {
      const dateText = publishDate.textContent.trim();
      const date = new Date(dateText);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      publishedDateWrapper.textContent = formattedDate;
      publishedDateWrapper.setAttribute('data-date', date.toISOString());
      moveInstrumentation(publishDate, publishedDateWrapper);
    }
    cardsContentWrapper.append(publishedDateWrapper);

    const cardTitleWrapper = document.createElement('p');
    cardTitleWrapper.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    const cardTitle = card.querySelector('[data-aue-prop="title"]');
    if (cardTitle) {
      cardTitleWrapper.append(...cardTitle.childNodes);
      moveInstrumentation(cardTitle, cardTitleWrapper);
    }
    cardsContentWrapper.append(cardTitleWrapper);
  });

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
