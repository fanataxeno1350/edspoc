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

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const ctaElement = block.querySelector('[data-aue-prop="cta"]');
  if (ctaElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');
    const ctaLink = ctaElement.querySelector('a');
    if (ctaLink) {
      ctaLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      btnWrapper.append(ctaLink);
      moveInstrumentation(ctaElement, ctaLink);
    }
    firstSection.append(btnWrapper);
  }

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestBlogsListing.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const anchor = linkElement ? linkElement.querySelector('a') : null;

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (anchor) {
      cardWrapper.href = anchor.href;
      cardWrapper.title = anchor.title;
      cardWrapper.setAttribute('data-cta-label', anchor.textContent.trim());
      moveInstrumentation(anchor, cardWrapper);
    } else {
      // If no anchor, ensure instrumentation is moved from the link container itself
      moveInstrumentation(linkElement, cardWrapper);
    }
    secondSection.append(cardWrapper);

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');
    cardWrapper.append(cardsDiv);

    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
      const img = imageElement.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      } else {
        const anchorWithImg = imageElement.querySelector('a img');
        if (anchorWithImg) {
          const pic = createOptimizedPicture(anchorWithImg.src, anchorWithImg.alt);
          pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
          cardImageWrapper.append(pic);
          moveInstrumentation(anchorWithImg, pic.querySelector('img'));
        }
      }
      cardsDiv.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');
    cardsDiv.append(contentWrapper);

    const publishedDateElement = card.querySelector('[data-aue-prop="publishedDate"]');
    if (publishedDateElement) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      dateP.textContent = publishedDateElement.textContent.trim(); // Assuming date is text content
      // If the date is expected to be formatted, add logic here.
      moveInstrumentation(publishedDateElement, dateP);
      contentWrapper.append(dateP);
    }

    const headlineElement = card.querySelector('[data-aue-prop="headline"]');
    if (headlineElement) {
      const headlineP = document.createElement('p');
      headlineP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      moveInstrumentation(headlineElement, headlineP);
      contentWrapper.append(headlineP);
    }
  });

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
