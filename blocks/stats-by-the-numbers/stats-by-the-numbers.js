import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const statsByTheNumberWrapper = document.createElement('div');
  statsByTheNumberWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumberWrapper.setAttribute('role', 'region');
  statsByTheNumberWrapper.setAttribute('aria-label', 'Statistics by the numbers');
  moveInstrumentation(block, statsByTheNumberWrapper);

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.className = 'stats-by-the-number-container';

  const titleDiv = block.querySelector('div:has(h2)');
  if (titleDiv) {
    const statsByTheNumberTitle = document.createElement('div');
    statsByTheNumberTitle.className = 'stats-by-the-number-title';
    const h2 = document.createElement('h2');
    h2.innerHTML = titleDiv.innerHTML;
    moveInstrumentation(titleDiv, h2);
    statsByTheNumberTitle.append(h2);
    statsByTheNumberContainer.append(statsByTheNumberTitle);
  }

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';

  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';

  const mainImageDiv = block.querySelector('picture, img');
  if (mainImageDiv) {
    const statsByTheNumberImageContainer = document.createElement('div');
    statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
    statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');
    const img = mainImageDiv.querySelector('img') || mainImageDiv;
    statsByTheNumberImageContainer.setAttribute('data-image-path', img.src);

    const pic = createOptimizedPicture(img.src, img.alt);
    const newImg = pic.querySelector('img');
    newImg.className = 'stats-by-the-number-main-image';
    newImg.setAttribute('data-tab-image', '0');
    newImg.style.opacity = '1';
    moveInstrumentation(img, newImg);
    statsByTheNumberImageContainer.append(pic);
    statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
  }
  statsByTheNumberMainContent.append(statsByTheNumberImageSection);

  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');

  const descriptionDiv = block.querySelector('p');
  if (descriptionDiv) {
    const statsByTheNumberDescription = document.createElement('div');
    statsByTheNumberDescription.className = 'stats-by-the-number-description';
    const p = document.createElement('p');
    p.innerHTML = descriptionDiv.innerHTML;
    moveInstrumentation(descriptionDiv, p);
    statsByTheNumberDescription.append(p);
    statsByTheNumberTabContent.append(statsByTheNumberDescription);
  }

  const statsByTheNumberCards = document.createElement('div');
  statsByTheNumberCards.className = 'stats-by-the-number-cards';
  statsByTheNumberCards.setAttribute('role', 'list');

  const cardRows = Array.from(block.children).filter((child, index) => index > 2 && child.children.length === 4);
  cardRows.forEach((row, index) => {
    const numberCell = row.children[0];
    const descriptionCell = row.children[1];
    const hoverImageCell = row.children[2];
    const hoverDetailsCell = row.children[3];

    const statsByTheNumberCard = document.createElement('div');
    statsByTheNumberCard.className = 'stats-by-the-number-card';
    statsByTheNumberCard.setAttribute('role', 'img');
    statsByTheNumberCard.setAttribute('tabindex', '0');
    statsByTheNumberCard.setAttribute('data-hover-image', hoverImageCell.textContent.trim());
    statsByTheNumberCard.setAttribute('data-hover-details', hoverDetailsCell.innerHTML.trim());
    statsByTheNumberCard.setAttribute('aria-label', `${numberCell.textContent.trim()}: ${descriptionCell.textContent.trim()}`);
    moveInstrumentation(row, statsByTheNumberCard);

    const readOnlyAuthorSpan = document.createElement('span');
    readOnlyAuthorSpan.className = 'readOnlyAuthor';
    readOnlyAuthorSpan.style.display = 'none';
    readOnlyAuthorSpan.innerHTML = numberCell.innerHTML.trim();
    statsByTheNumberCard.append(readOnlyAuthorSpan);

    const statsByTheNumberCardNumber = document.createElement('div');
    statsByTheNumberCardNumber.className = 'stats-by-the-number-card__number';
    statsByTheNumberCardNumber.setAttribute('data-count', numberCell.innerHTML.trim());
    const numberP = document.createElement('p');
    numberP.innerHTML = numberCell.innerHTML.trim();
    moveInstrumentation(numberCell, numberP);
    statsByTheNumberCardNumber.append(numberP);
    statsByTheNumberCard.append(statsByTheNumberCardNumber);

    const statsByTheNumberCardDescription = document.createElement('div');
    statsByTheNumberCardDescription.className = 'stats-by-the-number-card__description';
    const descriptionP = document.createElement('p');
    descriptionP.innerHTML = descriptionCell.innerHTML.trim();
    moveInstrumentation(descriptionCell, descriptionP);
    statsByTheNumberCardDescription.append(descriptionP);
    statsByTheNumberCard.append(statsByTheNumberCardDescription);

    statsByTheNumberCards.append(statsByTheNumberCard);
  });
  statsByTheNumberTabContent.append(statsByTheNumberCards);

  const ctaRow = Array.from(block.children).find((child) => child.children.length === 2 && child.querySelector('a'));
  if (ctaRow) {
    const ctaLabelCell = ctaRow.children[0];
    const ctaLinkCell = ctaRow.children[1];

    const statsByTheNumberCta = document.createElement('div');
    statsByTheNumberCta.className = 'stats-by-the-number-cta';

    const cta = document.createElement('a');
    cta.href = ctaLinkCell.textContent.trim();
    cta.className = 'cta cta__primary';
    cta.target = '_self';
    cta.setAttribute('aria-label', ctaLabelCell.textContent.trim());
    cta.setAttribute('data-palette', 'palette-1');
    moveInstrumentation(ctaRow, cta);

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    cta.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.className = 'cta__label';
    ctaLabel.textContent = ctaLabelCell.textContent.trim();
    cta.append(ctaLabel);

    statsByTheNumberCta.append(cta);
    statsByTheNumberTabContent.append(statsByTheNumberCta);
  }

  statsByTheNumberContentSection.append(statsByTheNumberTabContent);
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);
  statsByTheNumberContainer.append(statsByTheNumberMainContent);
  statsByTheNumberWrapper.append(statsByTheNumberContainer);

  block.textContent = '';
  block.append(statsByTheNumberWrapper);
}
