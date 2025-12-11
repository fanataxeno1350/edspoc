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

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleElement.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, titleElement);
  }
  latestblogsListingSectionFirst.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionElement.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionElement);
  }
  latestblogsListingSectionFirst.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');
  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const viewAllAnchor = document.createElement('a');
    viewAllAnchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    viewAllAnchor.href = viewAllLink.querySelector('a')?.href || '#';
    viewAllAnchor.title = viewAllLink.querySelector('a')?.title || '';
    viewAllAnchor.append(...viewAllLink.childNodes);
    moveInstrumentation(viewAllLink, viewAllAnchor);
    btnWrapper.append(viewAllAnchor);
  }
  latestblogsListingSectionFirst.append(btnWrapper);
  latestblogsListing.append(latestblogsListingSectionFirst);

  const latestblogsListingSectionSecond = document.createElement('div');
  latestblogsListingSectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogItems = block.querySelectorAll('[data-aue-model="blogItem"]');
  blogItems.forEach((blogItem) => {
    const blogCardWrapper = document.createElement('a');
    blogCardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    const link = blogItem.querySelector('[data-aue-prop="link"]');
    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        blogCardWrapper.href = anchor.href;
        blogCardWrapper.setAttribute('data-cta-label', anchor.title);
      }
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    const image = blogItem.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, picture.querySelector('img'));
        cardImageWrapper.append(picture);
      }
    }
    latestblogsCards.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = document.createElement('p');
    dateElement.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const dateContent = blogItem.querySelector('[data-aue-prop="date"]');
    if (dateContent) {
      dateElement.append(...dateContent.childNodes);
      if (dateContent.hasAttribute('data-date')) {
        dateElement.setAttribute('data-date', dateContent.getAttribute('data-date'));
      }
      moveInstrumentation(dateContent, dateElement);
    }
    cardsContentWrapper.append(dateElement);

    const blogTitleElement = document.createElement('p');
    blogTitleElement.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    const blogTitleContent = blogItem.querySelector('[data-aue-prop="blogTitle"]');
    if (blogTitleContent) {
      blogTitleElement.append(...blogTitleContent.childNodes);
      moveInstrumentation(blogTitleContent, blogTitleElement);
    }
    cardsContentWrapper.append(blogTitleElement);

    latestblogsCards.append(cardsContentWrapper);
    blogCardWrapper.append(latestblogsCards);
    latestblogsListingSectionSecond.append(blogCardWrapper);
    moveInstrumentation(blogItem, blogCardWrapper);
  });

  latestblogsListing.append(latestblogsListingSectionSecond);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}