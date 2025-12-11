import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  latestBlogsListing.append(sectionFirst);

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const titleRow = block.children[0];
  const titleContent = titleRow.children[0];
  titleElement.innerHTML = titleContent.innerHTML;
  moveInstrumentation(titleContent, titleElement);
  sectionFirst.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const descriptionRow = block.children[1];
  const descriptionContent = descriptionRow.children[0];
  descriptionElement.innerHTML = descriptionContent.innerHTML;
  moveInstrumentation(descriptionContent, descriptionElement);
  sectionFirst.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');
  const ctaLinkRow = block.children[2];
  const ctaLinkContent = ctaLinkRow.children[0];
  const ctaLink = ctaLinkContent.querySelector('a');
  if (ctaLink) {
    ctaLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    btnWrapper.append(ctaLink);
    moveInstrumentation(ctaLinkContent, ctaLink);
  }
  sectionFirst.append(btnWrapper);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestBlogsListing.append(sectionSecond);

  const blogCards = Array.from(block.children).slice(3);
  blogCards.forEach((row) => {
    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const dateCell = row.children[2];
    const headlineCell = row.children[3];

    const cardLink = linkCell.querySelector('a');
    if (cardLink) {
      cardLink.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
      cardLink.setAttribute('data-cta-label', headlineCell.textContent.trim());

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-cards');
      cardLink.append(cardDiv);
      moveInstrumentation(linkCell, cardLink);

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
      cardDiv.append(cardImageWrapper);

      const img = imageCell.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      } else {
        const anchor = imageCell.querySelector('a');
        if (anchor && (anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif')) ) {
          const generatedImg = document.createElement('img');
          generatedImg.src = anchor.href;
          generatedImg.alt = anchor.title || '';
          generatedImg.classList.add('latestblogs-cardImage', 'w-100', 'h-100');
          cardImageWrapper.append(generatedImg);
          moveInstrumentation(anchor, generatedImg);
        }
      }

      const cardContentWrapper = document.createElement('div');
      cardContentWrapper.classList.add('latestblogs-cards_content--wrapper');
      cardDiv.append(cardContentWrapper);

      const publishedDate = document.createElement('p');
      publishedDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      const dateValue = dateCell.textContent.trim();
      if (dateValue) {
        const dateObj = new Date(dateValue);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        publishedDate.textContent = dateObj.toLocaleDateString('en-GB', options);
        publishedDate.setAttribute('data-date', dateValue);
      }
      moveInstrumentation(dateCell, publishedDate);
      cardContentWrapper.append(publishedDate);

      const headline = document.createElement('p');
      headline.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      headline.textContent = headlineCell.textContent.trim();
      moveInstrumentation(headlineCell, headline);
      cardContentWrapper.append(headline);

      sectionSecond.append(cardLink);
    }
  });

  block.textContent = '';
  block.append(latestBlogsListing);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
