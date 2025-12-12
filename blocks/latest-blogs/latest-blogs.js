import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  console.log(block);
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const authoredTitle = block.querySelector('[data-aue-prop="title"]');
  if (authoredTitle) {
    titleElement.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, titleElement);
  }
  sectionFirst.append(titleElement);

  const descElement = document.createElement('p');
  descElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const authoredDesc = block.querySelector('[data-aue-prop="description"]');
  if (authoredDesc) {
    descElement.append(...authoredDesc.childNodes);
    moveInstrumentation(authoredDesc, descElement);
  }
  sectionFirst.append(descElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');

  const viewAllLink = document.createElement('a');
  viewAllLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
  const authoredViewAllLink = block.querySelector('[data-aue-prop="viewAllLink"] .button-container a');
  if (authoredViewAllLink) {
    viewAllLink.href = authoredViewAllLink.href;
    viewAllLink.title = authoredViewAllLink.textContent.trim();
    viewAllLink.textContent = authoredViewAllLink.textContent.trim();
    moveInstrumentation(authoredViewAllLink, viewAllLink);
  } else {
    const fallbackLink = block.querySelector('a[href*=".html"]');
    if (fallbackLink) {
      viewAllLink.href = fallbackLink.href;
      viewAllLink.title = fallbackLink.textContent.trim();
      viewAllLink.textContent = fallbackLink.textContent.trim();
      moveInstrumentation(fallbackLink, viewAllLink);
    }
  }
  btnWrapper.append(viewAllLink);
  sectionFirst.append(btnWrapper);
  latestBlogsListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogItems = block.querySelectorAll('[data-aue-model="blogItem"]');
  blogItems.forEach((item) => {
    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');

    const blogLink = item.querySelector('[data-aue-prop="blogLink"] .button-container a');
    if (blogLink) {
      cardWrapper.href = blogLink.href;
      cardWrapper.setAttribute('data-cta-label', blogLink.textContent.trim());
      moveInstrumentation(blogLink, cardWrapper);
    } else {
      const fallbackBlogLink = item.querySelector('a[href*=".html"]');
      if (fallbackBlogLink) {
        cardWrapper.href = fallbackBlogLink.href;
        cardWrapper.setAttribute('data-cta-label', fallbackBlogLink.textContent.trim());
        moveInstrumentation(fallbackBlogLink, cardWrapper);
      }
    }

    const cards = document.createElement('div');
    cards.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    const authoredImage = item.querySelector('[data-aue-prop="image"]');
    if (authoredImage) {
      const picture = createOptimizedPicture(authoredImage.src, authoredImage.alt || '');
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(authoredImage, picture);
    } else {
      const fallbackImage = item.querySelector('img');
      if (fallbackImage) {
        const picture = createOptimizedPicture(fallbackImage.src, fallbackImage.alt || '');
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(fallbackImage, picture);
      }
    }
    cards.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const publishedDate = document.createElement('p');
    publishedDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const authoredPublishedDate = item.querySelector('[data-aue-prop="publishedDate"]');
    if (authoredPublishedDate) {
      publishedDate.textContent = authoredPublishedDate.textContent.trim();
      const dateValue = authoredPublishedDate.textContent.trim();
      const date = new Date(dateValue);
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-GB', options);
      publishedDate.textContent = formattedDate;
      moveInstrumentation(authoredPublishedDate, publishedDate);
    } else {
      const fallbackDate = item.querySelector('p[data-date]');
      if (fallbackDate) {
        publishedDate.textContent = fallbackDate.textContent.trim();
        const dateValue = fallbackDate.getAttribute('data-date');
        const date = new Date(dateValue);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        publishedDate.textContent = formattedDate;
        moveInstrumentation(fallbackDate, publishedDate);
      }
    }
    contentWrapper.append(publishedDate);

    const blogTitle = document.createElement('p');
    blogTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    const authoredBlogTitle = item.querySelector('[data-aue-prop="blogTitle"]');
    if (authoredBlogTitle) {
      blogTitle.append(...authoredBlogTitle.childNodes);
      moveInstrumentation(authoredBlogTitle, blogTitle);
    } else {
      const fallbackBlogTitle = item.querySelector('p:not([data-date])');
      if (fallbackBlogTitle) {
        blogTitle.append(...fallbackBlogTitle.childNodes);
        moveInstrumentation(fallbackBlogTitle, blogTitle);
      }
    }
    contentWrapper.append(blogTitle);

    cards.append(contentWrapper);
    cardWrapper.append(cards);
    sectionSecond.append(cardWrapper);
  });

  latestBlogsListing.append(sectionSecond);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `latest-blogs block`;
  block.dataset.blockStatus = 'loaded';
  
  
}