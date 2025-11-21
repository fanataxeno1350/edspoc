import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const container = document.createElement('div');
  container.className = 'stats-by-the-number-container';

  const titleDiv = document.createElement('div');
  titleDiv.className = 'stats-by-the-number-title';
  const h2 = document.createElement('h2');

  const mainContentDiv = document.createElement('div');
  mainContentDiv.className = 'stats-by-the-number-main-content';

  const imageSectionDiv = document.createElement('div');
  imageSectionDiv.className = 'stats-by-the-number-image-section';

  const contentSectionDiv = document.createElement('div');
  contentSectionDiv.className = 'stats-by-the-number-content-section';

  const tabContentDiv = document.createElement('div');
  tabContentDiv.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  tabContentDiv.setAttribute('data-tab-content', '0');

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'stats-by-the-number-description';

  const cardsDiv = document.createElement('div');
  cardsDiv.className = 'stats-by-the-number-cards';
  cardsDiv.setAttribute('role', 'list');

  const ctaDiv = document.createElement('div');
  ctaDiv.className = 'stats-by-the-number-cta';

  // Process the block children (rows) to extract content
  [...block.children].forEach((row, index) => {
    if (index === 0) { // First row contains title, main image, description, cta
      const cells = [...row.children];

      // Title
      const titleCell = cells[0];
      if (titleCell) {
        h2.innerHTML = titleCell.innerHTML;
        titleDiv.append(h2);
      }

      // Main Image
      const mainImageCell = cells[1];
      if (mainImageCell) {
        const img = mainImageCell.querySelector('img');
        if (img) {
          const imageContainer = document.createElement('div');
          imageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
          imageContainer.setAttribute('data-tab-content', '0');
          imageContainer.setAttribute('data-image-path', img.src);

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          const mainImage = optimizedPic.querySelector('img');
          mainImage.className = 'stats-by-the-number-main-image';
          mainImage.setAttribute('data-tab-image', '0');
          mainImage.style.opacity = '1';
          moveInstrumentation(img, mainImage);
          imageContainer.append(optimizedPic);
          imageSectionDiv.append(imageContainer);
        }
      }

      // Description
      const descriptionCell = cells[2];
      if (descriptionCell) {
        descriptionDiv.innerHTML = descriptionCell.innerHTML;
        tabContentDiv.append(descriptionDiv);
      }

      // CTA Link and Label
      const ctaLinkCell = cells[3];
      const ctaLabelCell = cells[4];
      if (ctaLinkCell && ctaLabelCell) {
        const link = ctaLinkCell.querySelector('a');
        if (link) {
          const ctaAnchor = document.createElement('a');
          ctaAnchor.href = link.href;
          ctaAnchor.className = 'cta cta__primary';
          ctaAnchor.target = '_self';
          ctaAnchor.setAttribute('aria-label', ctaLabelCell.textContent);
          ctaAnchor.setAttribute('data-palette', 'palette-1');

          const iconSpan = document.createElement('span');
          iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
          iconSpan.setAttribute('aria-hidden', 'true');
          ctaAnchor.append(iconSpan);

          const labelSpan = document.createElement('span');
          labelSpan.className = 'cta__label';
          labelSpan.textContent = ctaLabelCell.textContent;
          ctaAnchor.append(labelSpan);

          ctaDiv.append(ctaAnchor);
          tabContentDiv.append(ctaDiv);
        }
      }
    } else { // Subsequent rows are stat cards
      const cells = [...row.children];
      const statCardDiv = document.createElement('div');
      statCardDiv.className = 'stats-by-the-number-card';
      statCardDiv.setAttribute('role', 'img');
      statCardDiv.setAttribute('tabindex', '0');
      moveInstrumentation(row, statCardDiv);

      const hoverImageCell = cells[0];
      const hoverDetailsCell = cells[1];
      const numberCell = cells[2];
      const descriptionCell = cells[3];

      if (hoverImageCell && hoverDetailsCell && numberCell && descriptionCell) {
        const hoverImageLink = hoverImageCell.querySelector('a');
        if (hoverImageLink) {
          statCardDiv.setAttribute('data-hover-image', hoverImageLink.href);
        }
        statCardDiv.setAttribute('data-hover-details', hoverDetailsCell.innerHTML);
        statCardDiv.setAttribute('aria-label', `${numberCell.textContent}: ${descriptionCell.textContent}`);

        const readOnlyAuthorSpan = document.createElement('span');
        readOnlyAuthorSpan.className = 'readOnlyAuthor';
        readOnlyAuthorSpan.style.display = 'none';
        readOnlyAuthorSpan.innerHTML = numberCell.innerHTML;
        statCardDiv.append(readOnlyAuthorSpan);

        const numberDiv = document.createElement('div');
        numberDiv.className = 'stats-by-the-number-card__number';
        numberDiv.setAttribute('data-count', numberCell.innerHTML);
        numberDiv.innerHTML = numberCell.innerHTML;
        statCardDiv.append(numberDiv);

        const descriptionDivCard = document.createElement('div');
        descriptionDivCard.className = 'stats-by-the-number-card__description';
        descriptionDivCard.innerHTML = descriptionCell.innerHTML;
        statCardDiv.append(descriptionDivCard);

        cardsDiv.append(statCardDiv);
      }
    }
  });

  tabContentDiv.append(cardsDiv);
  contentSectionDiv.append(tabContentDiv);

  mainContentDiv.append(imageSectionDiv);
  mainContentDiv.append(contentSectionDiv);

  container.append(titleDiv);
  container.append(mainContentDiv);

  wrapper.append(container);

  block.textContent = '';
  block.append(wrapper);
}
