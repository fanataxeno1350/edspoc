import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestBlogsWrapper.append(latestBlogsListing);

  const latestBlogsSectionFirst = document.createElement('div');
  latestBlogsSectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    latestBlogsSectionFirst.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    latestBlogsSectionFirst.append(p);
  }

  const viewAllLinkElement = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkElement) {
    const latestBlogsBtnWrapper = document.createElement('div');
    latestBlogsBtnWrapper.classList.add('latestblogs-btnWrapper');

    const a = viewAllLinkElement.querySelector('a');
    if (a) {
      a.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      moveInstrumentation(viewAllLinkElement, a);
      latestBlogsBtnWrapper.append(a);
      latestBlogsSectionFirst.append(latestBlogsBtnWrapper);
    }
  }
  latestBlogsListing.append(latestBlogsSectionFirst);

  const latestBlogsSectionSecond = document.createElement('div');
  latestBlogsSectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const cardLink = linkElement ? linkElement.querySelector('a') : null;

    const latestblogsCardWrapper = cardLink ? cardLink.cloneNode(false) : document.createElement('a');
    latestblogsCardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (cardLink) {
      latestblogsCardWrapper.href = cardLink.href;
      latestblogsCardWrapper.title = cardLink.title;
      latestblogsCardWrapper.setAttribute('data-cta-label', cardLink.textContent.trim());
      moveInstrumentation(linkElement, latestblogsCardWrapper);
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');

    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const latestblogsCardImageWrapper = document.createElement('div');
      latestblogsCardImageWrapper.classList.add('latestblogs-cardImageWrapper');

      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const pictureImg = picture.querySelector('img');
        pictureImg.classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, pictureImg);
        latestblogsCardImageWrapper.append(picture);
      }
      latestblogsCards.append(latestblogsCardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = card.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.textContent = dateElement.textContent.trim();
      pDate.setAttribute('data-date', dateElement.getAttribute('data-date'));
      moveInstrumentation(dateElement, pDate);
      contentWrapper.append(pDate);
    }

    const textElement = card.querySelector('[data-aue-prop="text"]');
    if (textElement) {
      const pText = document.createElement('p');
      pText.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pText.append(...textElement.childNodes);
      moveInstrumentation(textElement, pText);
      contentWrapper.append(pText);
    }
    latestblogsCards.append(contentWrapper);
    latestblogsCardWrapper.append(latestblogsCards);
    latestBlogsSectionSecond.append(latestblogsCardWrapper);
  });

  latestBlogsListing.append(latestBlogsSectionSecond);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
