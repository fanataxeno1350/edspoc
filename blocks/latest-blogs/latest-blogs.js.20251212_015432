import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.className = 'latestblogs-wrapper';

  const latestblogsListing = document.createElement('div');
  latestblogsListing.className = 'latestblogs-listing position-relative';

  const latestblogsListingSectionFirst = document.createElement('div');
  latestblogsListingSectionFirst.className = 'latestblogs-listing_section--first text-white text-center';

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
    h2.append(...title.childNodes);
    moveInstrumentation(title, h2);
    latestblogsListingSectionFirst.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.className = 'latestblogs-desc boing--text__body-2 pb-4';
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    latestblogsListingSectionFirst.append(p);
  }

  const ctaLink = block.querySelector('.button-container a');
  if (ctaLink) {
    const latestblogsBtnWrapper = document.createElement('div');
    latestblogsBtnWrapper.className = 'latestblogs-btnWrapper';
    ctaLink.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
    latestblogsBtnWrapper.append(ctaLink);
    moveInstrumentation(ctaLink, latestblogsBtnWrapper);
    latestblogsListingSectionFirst.append(latestblogsBtnWrapper);
  }

  latestblogsListing.append(latestblogsListingSectionFirst);

  const latestblogsListingSectionSecond = document.createElement('div');
  latestblogsListingSectionSecond.className = 'latestblogs-listing_section--second d-flex';

  const blogItems = block.querySelectorAll('[data-aue-model="blog"]');
  blogItems.forEach((blogItem) => {
    const link = blogItem.querySelector('a');
    if (link) {
      const latestblogsCardWrapper = document.createElement('a');
      latestblogsCardWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
      latestblogsCardWrapper.href = link.href;
      latestblogsCardWrapper.setAttribute('data-cta-label', link.textContent.trim());
      moveInstrumentation(link, latestblogsCardWrapper);

      const latestblogsCards = document.createElement('div');
      latestblogsCards.className = 'latestblogs-cards';

      const latestblogsCardImageWrapper = document.createElement('div');
      latestblogsCardImageWrapper.className = 'latestblogs-cardImageWrapper';

      const image = blogItem.querySelector('[data-aue-prop="image"] img');
      if (image) {
        const picture = createOptimizedPicture(image.src, image.alt);
        picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
        latestblogsCardImageWrapper.append(picture);
        moveInstrumentation(image, picture.querySelector('img'));
      }
      latestblogsCards.append(latestblogsCardImageWrapper);

      const latestblogsCardsContentWrapper = document.createElement('div');
      latestblogsCardsContentWrapper.className = 'latestblogs-cards_content--wrapper';

      const date = blogItem.querySelector('[data-aue-prop="date"]');
      if (date) {
        const pDate = document.createElement('p');
        pDate.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
        pDate.setAttribute('data-date', date.textContent.trim());
        pDate.append(...date.childNodes);
        moveInstrumentation(date, pDate);
        latestblogsCardsContentWrapper.append(pDate);
      }

      const text = blogItem.querySelector('[data-aue-prop="text"]');
      if (text) {
        const pText = document.createElement('p');
        pText.className = 'boing--text__body-2 latestblogs-boing--text__body';
        pText.append(...text.childNodes);
        moveInstrumentation(text, pText);
        latestblogsCardsContentWrapper.append(pText);
      }

      latestblogsCards.append(latestblogsCardsContentWrapper);
      latestblogsCardWrapper.append(latestblogsCards);
      latestblogsListingSectionSecond.append(latestblogsCardWrapper);
    }
  });

  latestblogsListing.append(latestblogsListingSectionSecond);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.append(latestblogsWrapper);
  block.dataset.blockStatus = 'loaded';
}
