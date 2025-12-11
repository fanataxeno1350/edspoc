import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestBlogsWrapper.append(latestBlogsListing);

  // First section (title, description, CTA)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  latestBlogsListing.append(firstSection);

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, p);
    firstSection.append(p);
  }

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLinkElement) {
    const div = document.createElement('div');
    div.classList.add('latestblogs-btnWrapper');
    const anchor = ctaLinkElement.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.title = anchor.title;
      newAnchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      newAnchor.append(...anchor.childNodes);
      moveInstrumentation(anchor, newAnchor);
      div.append(newAnchor);
    }
    firstSection.append(div);
  }

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestBlogsListing.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLinkElement = card.querySelector('[data-aue-prop="cardLink"]');
    const cardAnchor = cardLinkElement?.querySelector('a');
    if (cardAnchor) {
      const newCardAnchor = document.createElement('a');
      newCardAnchor.href = cardAnchor.href;
      newCardAnchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
      // Transfer data-cta-label if it exists on the original card
      if (card.dataset.ctaLabel) {
        newCardAnchor.dataset.ctaLabel = card.dataset.ctaLabel;
      }
      moveInstrumentation(cardAnchor, newCardAnchor);

      const latestblogsCards = document.createElement('div');
      latestblogsCards.classList.add('latestblogs-cards');
      newCardAnchor.append(latestblogsCards);

      const imageElement = card.querySelector('[data-aue-prop="image"]');
      const img = imageElement?.querySelector('img');
      if (img) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, pic.querySelector('img'));
        cardImageWrapper.append(pic);
        latestblogsCards.append(cardImageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards_content--wrapper');
      latestblogsCards.append(contentWrapper);

      const publishedDateElement = card.querySelector('[data-aue-prop="publishedDate"]');
      if (publishedDateElement) {
        const pDate = document.createElement('p');
        pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
        // Transfer data-date if it exists on the original element
        if (publishedDateElement.dataset.date) {
          pDate.dataset.date = publishedDateElement.dataset.date;
        }
        pDate.append(...publishedDateElement.childNodes);
        moveInstrumentation(publishedDateElement, pDate);
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
      secondSection.append(newCardAnchor);
    }
  });

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
