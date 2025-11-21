import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');
  moveInstrumentation(block, statsByTheNumberWrapper);

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.className = 'stats-by-the-number-container';
  statsByTheNumberWrapper.append(statsByTheNumberContainer);

  const rows = [...block.children];

  // First row for title, description, main image, cta
  const firstRow = rows.shift();
  if (firstRow) {
    const cells = [...firstRow.children];

    const titleCell = cells[0];
    const descriptionCell = cells[1];
    const mainImageCell = cells[2];
    const mainImagePathCell = cells[3];
    const ctaLinkCell = cells[4];
    const ctaTextCell = cells[5];

    // Title
    if (titleCell) {
      const statsByTheNumberTitle = document.createElement('div');
      statsByTheNumberTitle.className = 'stats-by-the-number-title';
      const h2 = titleCell.querySelector('h2') || document.createElement('h2');
      if (!h2.innerHTML) h2.innerHTML = titleCell.innerHTML;
      statsByTheNumberTitle.append(h2);
      statsByTheNumberContainer.append(statsByTheNumberTitle);
      moveInstrumentation(titleCell, h2);
    }

    const statsByTheNumberMainContent = document.createElement('div');
    statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';
    statsByTheNumberContainer.append(statsByTheNumberMainContent);

    // Image Section
    const statsByTheNumberImageSection = document.createElement('div');
    statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';
    statsByTheNumberMainContent.append(statsByTheNumberImageSection);

    if (mainImageCell) {
      const statsByTheNumberImageContainer = document.createElement('div');
      statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
      statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');
      
      const imagePath = mainImagePathCell?.textContent.trim();
      if (imagePath) {
        statsByTheNumberImageContainer.setAttribute('data-image-path', imagePath);
      }

      const img = mainImageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        const mainImage = optimizedPic.querySelector('img');
        mainImage.className = 'stats-by-the-number-main-image';
        mainImage.setAttribute('data-tab-image', '0');
        mainImage.style.opacity = '1';
        statsByTheNumberImageContainer.append(optimizedPic);
        moveInstrumentation(img, mainImage);
      } else if (mainImageCell.textContent.trim()) {
        // Handle case where image is just a URL string
        const newImg = document.createElement('img');
        newImg.className = 'stats-by-the-number-main-image';
        newImg.src = mainImageCell.textContent.trim();
        newImg.setAttribute('data-tab-image', '0');
        newImg.style.opacity = '1';
        statsByTheNumberImageContainer.append(newImg);
        moveInstrumentation(mainImageCell, newImg);
      }
      statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
    }

    // Content Section
    const statsByTheNumberContentSection = document.createElement('div');
    statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';
    statsByTheNumberMainContent.append(statsByTheNumberContentSection);

    const statsByTheNumberTabContent = document.createElement('div');
    statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
    statsByTheNumberTabContent.setAttribute('data-tab-content', '0');
    statsByTheNumberContentSection.append(statsByTheNumberTabContent);

    // Description
    if (descriptionCell) {
      const statsByTheNumberDescription = document.createElement('div');
      statsByTheNumberDescription.className = 'stats-by-the-number-description';
      const p = descriptionCell.querySelector('p') || document.createElement('p');
      if (!p.innerHTML) p.innerHTML = descriptionCell.innerHTML;
      statsByTheNumberDescription.append(p);
      statsByTheNumberTabContent.append(statsByTheNumberDescription);
      moveInstrumentation(descriptionCell, p);
    }

    // CTA
    if (ctaLinkCell && ctaTextCell) {
      const statsByTheNumberCta = document.createElement('div');
      statsByTheNumberCta.className = 'stats-by-the-number-cta';
      const link = ctaLinkCell.querySelector('a') || document.createElement('a');
      if (!link.href) link.href = ctaLinkCell.textContent.trim();
      link.className = 'cta cta__primary';
      link.setAttribute('target', '_self');
      link.setAttribute('data-palette', 'palette-1');

      const ctaLabel = ctaTextCell.textContent.trim();
      link.setAttribute('aria-label', ctaLabel);

      const iconSpan = document.createElement('span');
      iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
      iconSpan.setAttribute('aria-hidden', 'true');
      link.append(iconSpan);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'cta__label';
      labelSpan.textContent = ctaLabel;
      link.append(labelSpan);

      statsByTheNumberCta.append(link);
      statsByTheNumberTabContent.append(statsByTheNumberCta);
      moveInstrumentation(ctaLinkCell, link);
      moveInstrumentation(ctaTextCell, labelSpan);
    }

    // Stats Cards
    const statsByTheNumberCards = document.createElement('div');
    statsByTheNumberCards.className = 'stats-by-the-number-cards';
    statsByTheNumberCards.setAttribute('role', 'list');
    statsByTheNumberTabContent.append(statsByTheNumberCards);

    rows.forEach((row, index) => {
      const cells = [...row.children];
      const hoverImageCell = cells[0];
      const hoverDetailsCell = cells[1];
      const numberCell = cells[2];
      const descriptionCell = cells[3];

      const statsByTheNumberCard = document.createElement('div');
      statsByTheNumberCard.className = 'stats-by-the-number-card';
      statsByTheNumberCard.setAttribute('role', 'img');
      statsByTheNumberCard.setAttribute('tabindex', '0');
      moveInstrumentation(row, statsByTheNumberCard);

      if (hoverImageCell) {
        const img = hoverImageCell.querySelector('img');
        if (img) {
          statsByTheNumberCard.setAttribute('data-hover-image', img.src);
        } else if (hoverImageCell.textContent.trim()) {
          statsByTheNumberCard.setAttribute('data-hover-image', hoverImageCell.textContent.trim());
        }
      }

      if (hoverDetailsCell) {
        statsByTheNumberCard.setAttribute('data-hover-details', hoverDetailsCell.innerHTML.trim());
      }

      let ariaLabelContent = '';
      if (numberCell) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'stats-by-the-number-card__number';
        numberDiv.setAttribute('data-count', numberCell.innerHTML.trim());
        numberDiv.innerHTML = numberCell.innerHTML.trim();
        statsByTheNumberCard.append(numberDiv);
        moveInstrumentation(numberCell, numberDiv);
        ariaLabelContent += numberCell.textContent.trim();
      }

      if (descriptionCell) {
        const descriptionDiv = document.createElement('div');
        descriptionDiv.className = 'stats-by-the-number-card__description';
        descriptionDiv.innerHTML = descriptionCell.innerHTML.trim();
        statsByTheNumberCard.append(descriptionDiv);
        moveInstrumentation(descriptionCell, descriptionDiv);
        if (ariaLabelContent) ariaLabelContent += ': ';
        ariaLabelContent += descriptionCell.textContent.trim();
      }

      if (ariaLabelContent) {
        statsByTheNumberCard.setAttribute('aria-label', ariaLabelContent);
      }

      statsByTheNumberCards.append(statsByTheNumberCard);
    });
  }

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}
