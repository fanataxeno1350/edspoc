import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Statistics by the numbers');
  block.classList.add('animate-ready', 'animate-in');

  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.classList.add('stats-by-the-number-container');
  moveInstrumentation(block.firstElementChild, statsByTheNumberContainer);

  const titleRow = block.children[0];
  const mainImageRow = block.children[1];
  const mainDescriptionRow = block.children[2];
  const ctaLinkRow = block.children[3];
  const ctaLabelRow = block.children[4];

  // Title Section
  const statsByTheNumberTitle = document.createElement('div');
  statsByTheNumberTitle.classList.add('stats-by-the-number-title');
  const titleContent = titleRow.children[0].innerHTML;
  statsByTheNumberTitle.innerHTML = `<h2>${titleContent}</h2>`;
  moveInstrumentation(titleRow, statsByTheNumberTitle);
  statsByTheNumberContainer.append(statsByTheNumberTitle);

  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.classList.add('stats-by-the-number-main-content');
  statsByTheNumberContainer.append(statsByTheNumberMainContent);

  // Image Section
  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.classList.add('stats-by-the-number-image-section');
  const statsByTheNumberImageContainer = document.createElement('div');
  statsByTheNumberImageContainer.classList.add('stats-by-the-number-image-container', 'stats-by-the-number-image-container--active');
  statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');

  const mainImage = mainImageRow.children[0].querySelector('img');
  if (mainImage) {
    const optimizedPic = createOptimizedPicture(mainImage.src, mainImage.alt);
    moveInstrumentation(mainImage, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('stats-by-the-number-main-image');
    optimizedPic.querySelector('img').setAttribute('data-tab-image', '0');
    statsByTheNumberImageContainer.append(optimizedPic);
    statsByTheNumberImageContainer.setAttribute('data-image-path', mainImage.src);
  }
  moveInstrumentation(mainImageRow, statsByTheNumberImageSection);
  statsByTheNumberImageSection.append(statsByTheNumberImageContainer);
  statsByTheNumberMainContent.append(statsByTheNumberImageSection);

  // Content Section
  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.classList.add('stats-by-the-number-content-section');

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.classList.add('stats-by-the-number-tab-content', 'stats-by-the-number-tab-content--active');
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');

  // Main Description
  const statsByTheNumberDescription = document.createElement('div');
  statsByTheNumberDescription.classList.add('stats-by-the-number-description');
  statsByTheNumberDescription.innerHTML = mainDescriptionRow.children[0].innerHTML;
  moveInstrumentation(mainDescriptionRow, statsByTheNumberDescription);
  statsByTheNumberTabContent.append(statsByTheNumberDescription);

  // Stat Cards
  const statsByTheNumberCards = document.createElement('div');
  statsByTheNumberCards.classList.add('stats-by-the-number-cards');
  statsByTheNumberCards.setAttribute('role', 'list');
  statsByTheNumberTabContent.append(statsByTheNumberCards);

  // Loop through remaining rows for stat cards
  for (let i = 5; i < block.children.length; i += 1) {
    const row = block.children[i];
    const cells = [...row.children];

    const statsByTheNumberCard = document.createElement('div');
    statsByTheNumberCard.classList.add('stats-by-the-number-card');
    statsByTheNumberCard.setAttribute('role', 'img');
    statsByTheNumberCard.setAttribute('tabindex', '0');
    moveInstrumentation(row, statsByTheNumberCard);

    const numberCell = cells[0];
    const descriptionCell = cells[1];
    const hoverImageCell = cells[2];
    const hoverDetailsCell = cells[3];

    if (hoverImageCell) {
      const hoverImage = hoverImageCell.querySelector('img');
      if (hoverImage) {
        statsByTheNumberCard.setAttribute('data-hover-image', hoverImage.src);
      }
    }

    if (hoverDetailsCell) {
      statsByTheNumberCard.setAttribute('data-hover-details', hoverDetailsCell.innerHTML);
    }

    // Number
    const numberWrapper = document.createElement('div');
    numberWrapper.classList.add('stats-by-the-number-card__number');
    numberWrapper.setAttribute('data-count', numberCell.innerHTML);
    numberWrapper.innerHTML = numberCell.innerHTML;
    statsByTheNumberCard.append(numberWrapper);

    // Description
    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('stats-by-the-number-card__description');
    descriptionWrapper.innerHTML = descriptionCell.innerHTML;
    statsByTheNumberCard.append(descriptionWrapper);

    statsByTheNumberCards.append(statsByTheNumberCard);
  }

  // CTA
  const statsByTheNumberCta = document.createElement('div');
  statsByTheNumberCta.classList.add('stats-by-the-number-cta');
  const ctaLink = ctaLinkRow.children[0].querySelector('a');
  const ctaLabel = ctaLabelRow.children[0].textContent;

  if (ctaLink) {
    const newCta = document.createElement('a');
    newCta.href = ctaLink.href;
    newCta.classList.add('cta', 'cta__primary');
    newCta.setAttribute('target', '_self');
    newCta.setAttribute('aria-label', ctaLabel);
    newCta.setAttribute('data-palette', 'palette-1');

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    iconSpan.setAttribute('aria-hidden', 'true');
    newCta.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('cta__label');
    labelSpan.textContent = ctaLabel;
    newCta.append(labelSpan);

    moveInstrumentation(ctaLinkRow, newCta);
    moveInstrumentation(ctaLabelRow, newCta);
    statsByTheNumberCta.append(newCta);
  }
  statsByTheNumberTabContent.append(statsByTheNumberCta);

  statsByTheNumberContentSection.append(statsByTheNumberTabContent);
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);

  block.textContent = '';
  block.append(statsByTheNumberContainer);
}
