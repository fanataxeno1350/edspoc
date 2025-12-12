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

  const descElement = document.createElement('p');
  descElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const descContent = block.querySelector('[data-aue-prop="description"]');
  if (descContent) {
    descElement.append(...descContent.childNodes);
    moveInstrumentation(descContent, descElement);
  }
  latestblogsListingSectionFirst.append(descElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');
  const viewAllLink = block.querySelector('.button-container a');
  if (viewAllLink) {
    viewAllLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    btnWrapper.append(viewAllLink);
    moveInstrumentation(viewAllLink, btnWrapper);
  }
  latestblogsListingSectionFirst.append(btnWrapper);
  latestblogsListing.append(latestblogsListingSectionFirst);

  const latestblogsListingSectionSecond = document.createElement('div');
  latestblogsListingSectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const latestBlogItems = block.querySelectorAll('[data-aue-model="latestBlogItem"]');
  latestBlogItems.forEach((item) => {
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');

    const blogLink = item.querySelector('.button-container a');
    if (blogLink) {
      cardWrapper.href = blogLink.href;
      const ctaLabel = blogLink.textContent.trim();
      if (ctaLabel) {
        cardWrapper.dataset.ctaLabel = ctaLabel;
      }
      moveInstrumentation(blogLink, cardWrapper);
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
    const image = item.querySelector('[data-aue-prop="image"] img');
    if (image) {
      const picture = createOptimizedPicture(image.src, image.alt);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(image, cardImageWrapper);
    }
    cardsDiv.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const publishedDate = document.createElement('p');
    publishedDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const dateContent = item.querySelector('[data-aue-prop="publishDate"]');
    if (dateContent) {
      publishedDate.textContent = dateContent.textContent;
      publishedDate.dataset.date = dateContent.dataset.aueProp;
      moveInstrumentation(dateContent, publishedDate);
    }
    cardsContentWrapper.append(publishedDate);

    const blogTitle = document.createElement('p');
    blogTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    const blogTitleContent = item.querySelector('[data-aue-prop="blogTitle"]');
    if (blogTitleContent) {
      blogTitle.append(...blogTitleContent.childNodes);
      moveInstrumentation(blogTitleContent, blogTitle);
    }
    cardsContentWrapper.append(blogTitle);

    cardsDiv.append(cardsContentWrapper);
    cardWrapper.append(cardsDiv);
    latestblogsListingSectionSecond.append(cardWrapper);
  });

  latestblogsListing.append(latestblogsListingSectionSecond);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = 'latestblogs block';
  block.dataset.blockStatus = 'loaded';
}
