import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');

  const latestblogsListingSectionFirst = document.createElement('div');
  latestblogsListingSectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(titleElement);
    moveInstrumentation(titleElement, h2);
    latestblogsListingSectionFirst.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(descriptionElement);
    moveInstrumentation(descriptionElement, p);
    latestblogsListingSectionFirst.append(p);
  }

  const viewAllLinkWrapper = document.createElement('div');
  viewAllLinkWrapper.classList.add('latestblogs-btnWrapper');
  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const anchor = viewAllLink.querySelector('a');
    if (anchor) {
      anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      viewAllLinkWrapper.append(anchor);
      moveInstrumentation(viewAllLink, anchor);
    }
  }
  latestblogsListingSectionFirst.append(viewAllLinkWrapper);
  latestblogsListing.append(latestblogsListingSectionFirst);

  const latestblogsListingSectionSecond = document.createElement('div');
  latestblogsListingSectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogItems = block.querySelectorAll('[data-aue-model="blogItem"]');
  blogItems.forEach((blogItem) => {
    const linkElement = blogItem.querySelector('[data-aue-prop="link"]');
    let linkAnchor = null;
    if (linkElement) {
      linkAnchor = linkElement.querySelector('a');
      if (linkAnchor) {
        linkAnchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
        linkAnchor.setAttribute('data-cta-label', linkAnchor.textContent.trim());
        moveInstrumentation(linkElement, linkAnchor);
      } else {
        linkAnchor = document.createElement('a');
        linkAnchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
        linkAnchor.href = linkElement.textContent.trim();
        linkAnchor.setAttribute('data-cta-label', linkElement.textContent.trim());
        moveInstrumentation(linkElement, linkAnchor);
      }
    } else {
      linkAnchor = document.createElement('a');
      linkAnchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');

    const imageElement = blogItem.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const latestblogsCardImageWrapper = document.createElement('div');
      latestblogsCardImageWrapper.classList.add('latestblogs-cardImageWrapper');
      let img = imageElement.querySelector('img');
      if (!img) {
        const anchor = imageElement.querySelector('a');
        if (anchor && anchor.href) {
          img = document.createElement('img');
          img.src = anchor.href;
          img.alt = anchor.title || '';
        }
      }
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        latestblogsCardImageWrapper.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      }
      latestblogsCards.append(latestblogsCardImageWrapper);
    }

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = blogItem.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      pDate.append(dateElement);
      moveInstrumentation(dateElement, pDate);
      cardsContentWrapper.append(pDate);
    }

    const blogTitleElement = blogItem.querySelector('[data-aue-prop="title"]');
    if (blogTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(blogTitleElement);
      moveInstrumentation(blogTitleElement, pTitle);
      cardsContentWrapper.append(pTitle);
    }

    latestblogsCards.append(cardsContentWrapper);
    if (linkAnchor) {
      linkAnchor.append(latestblogsCards);
      latestblogsListingSectionSecond.append(linkAnchor);
    } else {
      latestblogsListingSectionSecond.append(latestblogsCards);
    }
  });

  latestblogsListing.append(latestblogsListingSectionSecond);

  block.textContent = '';
  block.append(latestblogsListing);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}