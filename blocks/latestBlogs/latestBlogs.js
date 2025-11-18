import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-article_listing', 'position-relative');
  moveInstrumentation(block, wrapper);

  // First section (heading, description, CTA)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article_listing_section--first', 'text-white', 'text-center');
  wrapper.append(firstSection);

  const headingCell = block.children[0]?.children[0];
  if (headingCell) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'text-white', 'pb-3');
    h2.innerHTML = headingCell.innerHTML;
    moveInstrumentation(headingCell, h2);
    firstSection.append(h2);
  }

  const descriptionCell = block.children[1]?.children[0];
  if (descriptionCell) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestblogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'pb-4');
    pDesc.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionCell, pDesc);
    firstSection.append(pDesc);
  }

  const ctaLinkCell = block.children[2]?.children[0];
  const ctaTextCell = block.children[3]?.children[0];
  const ctaIconCell = block.children[4]?.children[0];

  if (ctaLinkCell && ctaTextCell) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-article_listing--btnWrapper');
    firstSection.append(btnWrapper);

    const ctaLink = ctaLinkCell.querySelector('a') || document.createElement('a');
    ctaLink.href = ctaLink.href || ctaLinkCell.textContent.trim();
    ctaLink.title = ctaLink.title || ctaTextCell.textContent.trim();
    ctaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-article_listing--btn', 'analytics_cta_click');
    ctaLink.textContent = ctaTextCell.textContent.trim();
    moveInstrumentation(ctaLinkCell, ctaLink);
    moveInstrumentation(ctaTextCell, ctaLink);

    if (ctaIconCell) {
      const img = ctaIconCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        ctaLink.append(optimizedPic);
      } else {
        // If it's just a text path for an icon, you might need to handle it differently
        // For now, append as text if no image is found
        const iconText = document.createTextNode(ctaIconCell.textContent.trim());
        ctaLink.append(iconText);
      }
      moveInstrumentation(ctaIconCell, ctaLink);
    }
    btnWrapper.append(ctaLink);
  }

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article_listing_section--second', 'd-flex');
  wrapper.append(secondSection);

  // Loop through remaining rows for blog items, starting from the 6th row (index 5)
  for (let i = 5; i < block.children.length; i += 1) {
    const row = block.children[i];
    const cells = [...row.children];

    if (cells.length >= 4) { // Expecting link, image, date, title
      const cardLinkCell = cells[0];
      const imageCell = cells[1];
      const dateCell = cells[2];
      const titleCell = cells[3];

      const cardLink = cardLinkCell.querySelector('a') || document.createElement('a');
      cardLink.href = cardLink.href || cardLinkCell.textContent.trim();
      cardLink.classList.add('latestblogs-article_listing--cardWrapper', 'analytics_cta_click');
      cardLink.setAttribute('data-cta-label', titleCell.textContent.trim());
      moveInstrumentation(row, cardLink);

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-article_listing--cards');
      cardLink.append(cardDiv);

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-article_listing--cardImageWrapper');
      cardDiv.append(cardImageWrapper);

      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(optimizedPic);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards_content--wrapper');
      cardDiv.append(contentWrapper);

      const dateP = document.createElement('p');
      dateP.classList.add('latestblogs-boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      dateP.setAttribute('data-date', dateCell.textContent.trim()); // Assuming date is in ISO format
      dateP.textContent = new Date(dateCell.textContent.trim()).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }); // Format date
      moveInstrumentation(dateCell, dateP);
      contentWrapper.append(dateP);

      const titleP = document.createElement('p');
      titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      titleP.innerHTML = titleCell.innerHTML;
      moveInstrumentation(titleCell, titleP);
      contentWrapper.append(titleP);

      secondSection.append(cardLink);
    }
  }

  block.textContent = '';
  block.append(wrapper);
}
