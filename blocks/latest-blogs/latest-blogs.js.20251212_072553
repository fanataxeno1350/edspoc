import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.className = 'latestblogs-wrapper';

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.className = 'latestblogs-listing position-relative';

  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = document.createElement('h2');
  titleElement.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleElement.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, titleElement);
  } else {
    const fallbackTitle = block.querySelector('h1, h2, h3, h4, h5, h6');
    if (fallbackTitle) {
      titleElement.textContent = fallbackTitle.textContent;
    }
  }
  firstSection.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.className = 'latestblogs-desc boing--text__body-2 pb-4';
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionElement.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionElement);
  } else {
    const fallbackDesc = block.querySelector('p');
    if (fallbackDesc) {
      descriptionElement.textContent = fallbackDesc.textContent;
    }
  }
  firstSection.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'latestblogs-btnWrapper';
  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const linkElement = viewAllLink.querySelector('a') || viewAllLink;
    const newLink = document.createElement('a');
    newLink.href = linkElement.href;
    newLink.title = linkElement.textContent.trim();
    newLink.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
    newLink.textContent = linkElement.textContent.trim();
    btnWrapper.append(newLink);
    moveInstrumentation(viewAllLink, newLink);
  } else {
    const fallbackLink = block.querySelector('.button-container a');
    if (fallbackLink) {
      const newLink = document.createElement('a');
      newLink.href = fallbackLink.href;
      newLink.title = fallbackLink.textContent.trim();
      newLink.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
      newLink.textContent = fallbackLink.textContent.trim();
      btnWrapper.append(newLink);
    }
  }
  firstSection.append(btnWrapper);

  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-listing_section--second d-flex';

  const blogItems = block.querySelectorAll('[data-aue-model="latestBlogItem"]');
  blogItems.forEach((itemNode) => {
    const articleLink = itemNode.querySelector('[data-aue-prop="link"] a') || itemNode.querySelector('a[href]');
    const cardWrapper = document.createElement('a');
    cardWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
    if (articleLink) {
      cardWrapper.href = articleLink.href;
      cardWrapper.setAttribute('data-cta-label', articleLink.textContent.trim());
    }

    const card = document.createElement('div');
    card.className = 'latestblogs-cards';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'latestblogs-cardImageWrapper';
    const imageContent = itemNode.querySelector('[data-aue-prop="image"] img');
    if (imageContent) {
      const picture = createOptimizedPicture(imageContent.src, imageContent.alt);
      picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
      imageWrapper.append(picture);
      moveInstrumentation(imageContent.parentElement, picture);
    } else {
      const fallbackImage = itemNode.querySelector('img');
      if (fallbackImage) {
        const picture = createOptimizedPicture(fallbackImage.src, fallbackImage.alt);
        picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
        imageWrapper.append(picture);
      }
    }
    card.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'latestblogs-cards_content--wrapper';

    const dateElement = document.createElement('p');
    dateElement.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
    const dateContent = itemNode.querySelector('[data-aue-prop="date"]');
    if (dateContent) {
      dateElement.textContent = dateContent.textContent.trim();
      moveInstrumentation(dateContent, dateElement);
    } else {
      const fallbackDate = itemNode.querySelector('p[data-date]');
      if (fallbackDate) {
        dateElement.textContent = fallbackDate.textContent.trim();
      }
    }
    contentWrapper.append(dateElement);

    const headlineElement = document.createElement('p');
    headlineElement.className = 'boing--text__body-2 latestblogs-boing--text__body';
    const headlineContent = itemNode.querySelector('[data-aue-prop="headline"]');
    if (headlineContent) {
      headlineElement.append(...headlineContent.childNodes);
      moveInstrumentation(headlineContent, headlineElement);
    } else {
      const fallbackHeadline = itemNode.querySelector('p:not([data-date])');
      if (fallbackHeadline) {
        headlineElement.textContent = fallbackHeadline.textContent.trim();
      }
    }
    contentWrapper.append(headlineElement);

    card.append(contentWrapper);
    cardWrapper.append(card);
    secondSection.append(cardWrapper);
    moveInstrumentation(itemNode, cardWrapper);
  });

  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = 'latestblogs block';
  block.dataset.blockStatus = 'loaded';
}
