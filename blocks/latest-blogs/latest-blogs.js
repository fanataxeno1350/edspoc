import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestblogsWrapper.append(latestblogsListing);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  latestblogsListing.append(firstSection);

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.textContent = headingElement.textContent;
    moveInstrumentation(headingElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.textContent = descriptionElement.textContent;
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const viewAllLinkElement = block.querySelector('[data-aue-prop="viewAllLink"]');
  const viewAllIconElement = block.querySelector('[data-aue-prop="viewAllIcon"]');

  if (viewAllLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');

    const anchor = document.createElement('a');
    anchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    anchor.setAttribute('title', viewAllLinkElement.textContent.trim());
    anchor.setAttribute('href', viewAllLinkElement.href);
    anchor.textContent = viewAllLinkElement.textContent.trim();
    moveInstrumentation(viewAllLinkElement, anchor);

    if (viewAllIconElement) {
      const img = viewAllIconElement.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, pic.querySelector('img'));
        anchor.append(pic);
      }
    }
    btnWrapper.append(anchor);
    firstSection.append(btnWrapper);
  }

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestblogsListing.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');

  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const imageElement = card.querySelector('[data-aue-prop="image"]');
    const dateElement = card.querySelector('[data-aue-prop="date"]');
    const titleElement = card.querySelector('[data-aue-prop="title"]');

    if (linkElement) {
      const cardAnchor = document.createElement('a');
      cardAnchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
      cardAnchor.setAttribute('href', linkElement.href);
      cardAnchor.setAttribute('data-cta-label', titleElement ? titleElement.textContent.trim() : '');
      moveInstrumentation(linkElement, cardAnchor);

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-cards');

      if (imageElement) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
        const img = imageElement.querySelector('img');
        if (img) {
          const pic = createOptimizedPicture(img.src, img.alt);
          pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
          moveInstrumentation(img, pic.querySelector('img'));
          cardImageWrapper.append(pic);
        }
        cardDiv.append(cardImageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards_content--wrapper');

      if (dateElement) {
        const pDate = document.createElement('p');
        pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
        pDate.textContent = dateElement.textContent;
        moveInstrumentation(dateElement, pDate);
        contentWrapper.append(pDate);
      }

      if (titleElement) {
        const pTitle = document.createElement('p');
        pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
        pTitle.textContent = titleElement.textContent;
        moveInstrumentation(titleElement, pTitle);
        contentWrapper.append(pTitle);
      }

      cardDiv.append(contentWrapper);
      cardAnchor.append(cardDiv);
      secondSection.append(cardAnchor);
    }
  });

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
