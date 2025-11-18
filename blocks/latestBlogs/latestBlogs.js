import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-article_listing', 'position-relative');
  moveInstrumentation(block, wrapper);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article_listing_section--first', 'text-white', 'text-center');

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article_listing_section--second', 'd-flex');

  // Process the first row for heading, description, and CTA
  const firstRow = block.children[0];
  if (firstRow) {
    moveInstrumentation(firstRow, firstSection);
    const cells = [...firstRow.children];

    // Heading
    const headingCell = cells[0];
    if (headingCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('latestblogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'text-white', 'pb-3');
      h2.innerHTML = headingCell.innerHTML;
      moveInstrumentation(headingCell, h2);
      firstSection.append(h2);
    }

    // Description
    const descriptionCell = cells[1];
    if (descriptionCell) {
      const pDesc = document.createElement('p');
      pDesc.classList.add('latestblogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'pb-4');
      pDesc.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, pDesc);
      firstSection.append(pDesc);
    }

    // CTA
    const ctaCell = cells[2];
    if (ctaCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('latestblogs-article_listing--btnWrapper');

      const ctaLink = ctaCell.querySelector('a');
      if (ctaLink) {
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.title = ctaLink.title || '';
        newCtaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-article_listing--btn', 'analytics_cta_click');
        newCtaLink.textContent = ctaLink.textContent.trim();
        moveInstrumentation(ctaLink, newCtaLink);
        ctaWrapper.append(newCtaLink);
      }
      firstSection.append(ctaWrapper);
    }
  }
  wrapper.append(firstSection);

  // Process subsequent rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = link.href;
      cardWrapper.classList.add('latestblogs-article_listing--cardWrapper', 'analytics_cta_click');
      if (link.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      moveInstrumentation(row, cardWrapper);

      const cardsDiv = document.createElement('div');
      cardsDiv.classList.add('latestblogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestblogs-article_listing--cardImageWrapper');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
      cardsDiv.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards_content--wrapper');

      const dateP = link.querySelector('.latestblogs-published_date');
      if (dateP) {
        const newDateP = document.createElement('p');
        newDateP.classList.add('latestblogs-boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
        newDateP.textContent = dateP.textContent;
        if (dateP.dataset.date) {
          newDateP.dataset.date = dateP.dataset.date;
        }
        moveInstrumentation(dateP, newDateP);
        contentWrapper.append(newDateP);
      }

      const titleP = link.querySelector('.latestblogs-boing--text__body:not(.latestblogs-published_date)');
      if (titleP) {
        const newTitleP = document.createElement('p');
        newTitleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        newTitleP.textContent = titleP.textContent;
        moveInstrumentation(titleP, newTitleP);
        contentWrapper.append(newTitleP);
      }

      cardsDiv.append(contentWrapper);
      cardWrapper.append(cardsDiv);
      secondSection.append(cardWrapper);
    }
  });
  wrapper.append(secondSection);

  block.textContent = '';
  block.append(wrapper);
}
