import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.className = 'latestblogs-wrapper';

  const latestblogsListing = document.createElement('div');
  latestblogsListing.className = 'latestblogs-listing position-relative';

  const latestblogsListingSectionFirst = document.createElement('div');
  latestblogsListingSectionFirst.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
    h2.textContent = titleElement.textContent;
    moveInstrumentation(titleElement, h2);
    latestblogsListingSectionFirst.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.className = 'latestblogs-desc boing--text__body-2 pb-4';
    p.textContent = descriptionElement.textContent;
    moveInstrumentation(descriptionElement, p);
    latestblogsListingSectionFirst.append(p);
  }

  const viewAllLinkWrapper = document.createElement('div');
  viewAllLinkWrapper.className = 'latestblogs-btnWrapper';
  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const a = document.createElement('a');
    a.href = viewAllLink.href;
    a.title = viewAllLink.title || '';
    a.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
    a.textContent = viewAllLink.textContent.trim().split(/\s+\/content\/dam\/aemigrate\/uploaded-folder\/image\/\d+\.svg\+xml/)[0];
    moveInstrumentation(viewAllLink, a);
    viewAllLinkWrapper.append(a);
  }
  latestblogsListingSectionFirst.append(viewAllLinkWrapper);
  latestblogsListing.append(latestblogsListingSectionFirst);

  const latestblogsListingSectionSecond = document.createElement('div');
  latestblogsListingSectionSecond.className = 'latestblogs-listing_section--second d-flex';

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const blogLink = linkElement ? linkElement.href : '#';
    const blogTitle = card.querySelector('[data-aue-prop="blogTitle"]')?.textContent.trim() || '';

    const cardAnchor = document.createElement('a');
    cardAnchor.href = blogLink;
    cardAnchor.className = 'latestblogs-cardWrapper analytics_cta_click';
    cardAnchor.dataset.ctaLabel = blogTitle;
    if (linkElement) {
      moveInstrumentation(linkElement, cardAnchor);
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.className = 'latestblogs-cards';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'latestblogs-cardImageWrapper';
    const imgElement = card.querySelector('[data-aue-prop="image"] img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt || blogTitle);
      picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
      moveInstrumentation(imgElement, picture.querySelector('img'));
      imageWrapper.append(picture);
    } else {
      // Fallback for image if it's just a link
      const imgAnchor = card.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (imgAnchor) {
        const picture = createOptimizedPicture(imgAnchor.href, imgAnchor.title || blogTitle);
        picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
        imageWrapper.append(picture);
      }
    }
    latestblogsCards.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'latestblogs-cards_content--wrapper';

    const publishedDateElement = card.querySelector('[data-aue-prop="publishedDate"]');
    if (publishedDateElement) {
      const pDate = document.createElement('p');
      pDate.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
      pDate.textContent = publishedDateElement.textContent;
      const dataDate = publishedDateElement.getAttribute('data-date');
      if (dataDate) {
        pDate.setAttribute('data-date', dataDate);
      }
      moveInstrumentation(publishedDateElement, pDate);
      contentWrapper.append(pDate);
    }

    const blogTitleElement = card.querySelector('[data-aue-prop="blogTitle"]');
    if (blogTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.className = 'boing--text__body-2 latestblogs-boing--text__body';
      pTitle.textContent = blogTitleElement.textContent;
      moveInstrumentation(blogTitleElement, pTitle);
      contentWrapper.append(pTitle);
    }

    latestblogsCards.append(contentWrapper);
    cardAnchor.append(latestblogsCards);
    latestblogsListingSectionSecond.append(cardAnchor);
    moveInstrumentation(card, cardAnchor);
  });

  latestblogsListing.append(latestblogsListingSectionSecond);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
