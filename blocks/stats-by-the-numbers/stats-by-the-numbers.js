import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.classList.add('stats-by-the-number-wrapper', 'animate-ready', 'animate-in');
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.classList.add('stats-by-the-number-container');
  statsByTheNumberWrapper.append(statsByTheNumberContainer);

  const rows = [...block.children];

  // Row 1: Title
  if (rows[0]) {
    const titleRow = rows[0];
    const titleCell = titleRow.children[0];
    const statsByTheNumberTitle = document.createElement('div');
    statsByTheNumberTitle.classList.add('stats-by-the-number-title');
    statsByTheNumberTitle.innerHTML = titleCell.innerHTML;
    moveInstrumentation(titleRow, statsByTheNumberTitle);
    statsByTheNumberContainer.append(statsByTheNumberTitle);
  }

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.classList.add('stats-by-the-number-main-content');
  statsByTheNumberContainer.append(statsByTheNumberMainContent);

  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.classList.add('stats-by-the-number-image-section');
  statsByTheNumberMainContent.append(statsByTheNumberImageSection);

  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.classList.add('stats-by-the-number-content-section');
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.classList.add('stats-by-the-number-tab-content', 'stats-by-the-number-tab-content--active');
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');
  statsByTheNumberContentSection.append(statsByTheNumberTabContent);

  // Row 2: Main Image
  if (rows[1]) {
    const mainImageRow = rows[1];
    const imageCell = mainImageRow.children[0];
    const img = imageCell.querySelector('img');
    if (img) {
      const statsByTheNumberImageContainer = document.createElement('div');
      statsByTheNumberImageContainer.classList.add('stats-by-the-number-image-container', 'stats-by-the-number-image-container--active');
      statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');
      statsByTheNumberImageContainer.setAttribute('data-image-path', img.src);

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      const mainImage = optimizedPic.querySelector('img');
      mainImage.classList.add('stats-by-the-number-main-image');
      mainImage.setAttribute('data-tab-image', '0');
      mainImage.style.opacity = '1';
      moveInstrumentation(img, mainImage);
      statsByTheNumberImageContainer.append(optimizedPic);
      statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
    }
    moveInstrumentation(mainImageRow, statsByTheNumberImageSection);
  }

  // Row 3: Main Description
  if (rows[2]) {
    const descriptionRow = rows[2];
    const descriptionCell = descriptionRow.children[0];
    const statsByTheNumberDescription = document.createElement('div');
    statsByTheNumberDescription.classList.add('stats-by-the-number-description');
    statsByTheNumberDescription.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionRow, statsByTheNumberDescription);
    statsByTheNumberTabContent.append(statsByTheNumberDescription);
  }

  const statsByTheNumberCards = document.createElement('div');
  statsByTheNumberCards.classList.add('stats-by-the-number-cards');
  statsByTheNumberCards.setAttribute('role', 'list');
  statsByTheNumberTabContent.append(statsByTheNumberCards);

  // Rows 4 onwards: Stat Cards
  for (let i = 3; i < rows.length - 1; i += 1) {
    const cardRow = rows[i];
    const cells = [...cardRow.children];
    if (cells.length >= 4) { // Ensure all card fields are present
      const statsByTheNumberCard = document.createElement('div');
      statsByTheNumberCard.classList.add('stats-by-the-number-card');
      statsByTheNumberCard.setAttribute('role', 'img');
      statsByTheNumberCard.setAttribute('tabindex', '0');
      moveInstrumentation(cardRow, statsByTheNumberCard);

      const hoverImageCell = cells[0];
      const hoverDetailsCell = cells[1];
      const numberCell = cells[2];
      const descriptionCell = cells[3];

      const hoverImageLink = hoverImageCell.querySelector('a');
      if (hoverImageLink) {
        statsByTheNumberCard.setAttribute('data-hover-image', hoverImageLink.href);
      }

      if (hoverDetailsCell) {
        statsByTheNumberCard.setAttribute('data-hover-details', hoverDetailsCell.innerHTML.trim());
      }

      if (descriptionCell) {
        statsByTheNumberCard.setAttribute('aria-label', `${numberCell.textContent.trim()}: ${descriptionCell.textContent.trim()}`);
      }

      // Hidden readOnlyAuthor span
      const readOnlyAuthorSpan = document.createElement('span');
      readOnlyAuthorSpan.classList.add('readOnlyAuthor');
      readOnlyAuthorSpan.style.display = 'none';
      readOnlyAuthorSpan.innerHTML = numberCell.innerHTML.trim();
      statsByTheNumberCard.append(readOnlyAuthorSpan);

      const statsByTheNumberCardNumber = document.createElement('div');
      statsByTheNumberCardNumber.classList.add('stats-by-the-number-card__number');
      statsByTheNumberCardNumber.setAttribute('data-count', numberCell.innerHTML.trim());
      statsByTheNumberCardNumber.innerHTML = numberCell.innerHTML;
      statsByTheNumberCard.append(statsByTheNumberCardNumber);

      const statsByTheNumberCardDescription = document.createElement('div');
      statsByTheNumberCardDescription.classList.add('stats-by-the-number-card__description');
      statsByTheNumberCardDescription.innerHTML = descriptionCell.innerHTML;
      statsByTheNumberCard.append(statsByTheNumberCardDescription);

      statsByTheNumberCards.append(statsByTheNumberCard);
    }
  }

  // Last Row: CTA
  const lastRow = rows[rows.length - 1];
  if (lastRow) {
    const ctaCell = lastRow.children[0];
    const ctaLink = ctaCell.querySelector('a');
    if (ctaLink) {
      const statsByTheNumberCta = document.createElement('div');
      statsByTheNumberCta.classList.add('stats-by-the-number-cta');

      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.classList.add('cta', 'cta__primary');
      if (ctaLink.target) {
        newCtaLink.target = ctaLink.target;
      }
      if (ctaLink.getAttribute('aria-label')) {
        newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label'));
      }
      if (ctaLink.getAttribute('data-palette')) {
        newCtaLink.setAttribute('data-palette', ctaLink.getAttribute('data-palette'));
      }

      const ctaIcon = document.createElement('span');
      ctaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      ctaIcon.setAttribute('aria-hidden', 'true');
      newCtaLink.append(ctaIcon);

      const ctaLabel = document.createElement('span');
      ctaLabel.classList.add('cta__label');
      ctaLabel.textContent = ctaLink.textContent;
      newCtaLink.append(ctaLabel);

      moveInstrumentation(ctaLink, newCtaLink);
      statsByTheNumberCta.append(newCtaLink);
      statsByTheNumberTabContent.append(statsByTheNumberCta);
    }
    moveInstrumentation(lastRow, statsByTheNumberTabContent);
  }

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}
