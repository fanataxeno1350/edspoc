import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.className = 'latestblogs-wrapper';

  const latestblogsListing = document.createElement('div');
  latestblogsListing.className = 'latestblogs-listing position-relative';

  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
    h2.append(titleElement);
    firstSection.append(h2);
    moveInstrumentation(titleElement, h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.className = 'latestblogs-desc boing--text__body-2 pb-4';
    p.append(descriptionElement);
    firstSection.append(p);
    moveInstrumentation(descriptionElement, p);
  }

  const ctaLink = block.querySelector('[data-aue-prop="cta"]');
  if (ctaLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'latestblogs-btnWrapper';
    const anchor = ctaLink.querySelector('a');
    if (anchor) {
      anchor.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
      btnWrapper.append(anchor);
      firstSection.append(btnWrapper);
      moveInstrumentation(ctaLink, btnWrapper);
    }
  }

  latestblogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-listing_section--second d-flex';

  const blogItems = block.querySelectorAll('[data-aue-model="blogItem"]');
  blogItems.forEach((itemNode) => {
    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    const linkAnchor = linkElement ? linkElement.querySelector('a') : null;

    const cardWrapper = document.createElement('a');
    cardWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
    if (linkAnchor) {
      cardWrapper.href = linkAnchor.href;
      cardWrapper.title = linkAnchor.textContent.trim();
      cardWrapper.dataset.ctaLabel = linkAnchor.textContent.trim();
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.className = 'latestblogs-cards';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'latestblogs-cardImageWrapper';
    const imgElement = itemNode.querySelector('[data-aue-prop="image"] img');
    if (imgElement) {
      imageWrapper.append(createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]));
    }
    cardsDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'latestblogs-cards_content--wrapper';

    const dateElement = itemNode.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const dateP = document.createElement('p');
      dateP.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
      dateP.append(dateElement);
      contentWrapper.append(dateP);
      moveInstrumentation(dateElement, dateP);
    }

    const blogTitleElement = itemNode.querySelector('[data-aue-prop="blogTitle"]');
    if (blogTitleElement) {
      const blogTitleP = document.createElement('p');
      blogTitleP.className = 'boing--text__body-2 latestblogs-boing--text__body';
      blogTitleP.append(blogTitleElement);
      contentWrapper.append(blogTitleP);
      moveInstrumentation(blogTitleElement, blogTitleP);
    }

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(itemNode, cardWrapper);
  });

  latestblogsListing.append(secondSection);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
