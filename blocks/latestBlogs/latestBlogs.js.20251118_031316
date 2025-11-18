import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-article_listing', 'position-relative');
  moveInstrumentation(block, wrapper);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article_listing_section--first', 'text-white', 'text-center');
  wrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article_listing_section--second', 'd-flex');
  wrapper.append(secondSection);

  // Process the first row for heading, description, and CTA
  const firstRow = block.children[0];
  if (firstRow) {
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
    const ctaLabelCell = cells[2];
    const ctaUrlCell = cells[3];
    const ctaIconCell = cells[4];

    if (ctaLabelCell && ctaUrlCell) {
      const btnWrapper = document.createElement('div');
      btnWrapper.classList.add('latestblogs-article_listing--btnWrapper');
      moveInstrumentation(ctaLabelCell, btnWrapper);

      const ctaLink = document.createElement('a');
      ctaLink.href = ctaUrlCell.textContent.trim();
      ctaLink.title = ctaLabelCell.textContent.trim();
      ctaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-article_listing--btn', 'analytics_cta_click');
      ctaLink.textContent = ctaLabelCell.textContent.trim();
      moveInstrumentation(ctaUrlCell, ctaLink);

      if (ctaIconCell) {
        const ctaIconImg = ctaIconCell.querySelector('img');
        if (ctaIconImg) {
          const optimizedIcon = createOptimizedPicture(ctaIconImg.src, ctaIconImg.alt);
          moveInstrumentation(ctaIconImg, optimizedIcon.querySelector('img'));
          ctaLink.append(optimizedIcon);
        } else {
          // If it's an SVG string, append it directly
          const svgContent = ctaIconCell.textContent.trim();
          if (svgContent.startsWith('<svg')) {
            const svgDiv = document.createElement('div');
            svgDiv.innerHTML = svgContent;
            ctaLink.append(svgDiv.firstElementChild);
          }
        }
      }
      btnWrapper.append(ctaLink);
      firstSection.append(btnWrapper);
    }
  }

  // Process subsequent rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 4) { // Expecting URL, Image, Date, Title
      const urlCell = cells[0];
      const imageCell = cells[1];
      const dateCell = cells[2];
      const titleCell = cells[3];

      const cardLink = document.createElement('a');
      cardLink.href = urlCell.textContent.trim();
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
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards_content--wrapper');
      cardDiv.append(contentWrapper);

      const dateP = document.createElement('p');
      dateP.classList.add('latestblogs-boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      dateP.textContent = dateCell.textContent.trim();
      dateP.setAttribute('data-date', dateCell.textContent.trim()); // Assuming date cell directly contains the date string
      moveInstrumentation(dateCell, dateP);
      contentWrapper.append(dateP);

      const titleP = document.createElement('p');
      titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      titleP.textContent = titleCell.textContent.trim();
      moveInstrumentation(titleCell, titleP);
      contentWrapper.append(titleP);

      secondSection.append(cardLink);
    }
  });

  block.textContent = '';
  block.append(wrapper);
}
