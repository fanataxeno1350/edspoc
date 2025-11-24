import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const statsByTheNumbersWrapper = document.createElement('div');
  statsByTheNumbersWrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  statsByTheNumbersWrapper.setAttribute('role', 'region');
  statsByTheNumbersWrapper.setAttribute('aria-label', 'Statistics by the numbers');

  const statsByTheNumbersContainer = document.createElement('div');
  statsByTheNumbersContainer.className = 'stats-by-the-number-container';

  // Model: statsByTheNumbers
  // Fields: title, mainImage, description, ctaUrl, ctaLabel, statCards

  // Title
  const titleElement = block.querySelector(':scope > div:first-child > div:first-child');
  const statsByTheNumberTitle = document.createElement('div');
  statsByTheNumberTitle.className = 'stats-by-the-number-title';
  statsByTheNumberTitle.innerHTML = titleElement.innerHTML;
  moveInstrumentation(titleElement, statsByTheNumberTitle.querySelector('h2'));

  // Main Content Wrapper
  const statsByTheNumberMainContent = document.createElement('div');
  statsByTheNumberMainContent.className = 'stats-by-the-number-main-content';

  // Main Image Section
  const statsByTheNumberImageSection = document.createElement('div');
  statsByTheNumberImageSection.className = 'stats-by-the-number-image-section';

  const mainImageRow = block.querySelector(':scope > div:nth-child(2) > div:first-child');
  const mainImage = mainImageRow.querySelector('img');
  const mainImageSrc = mainImage.src;

  const statsByTheNumberImageContainer = document.createElement('div');
  statsByTheNumberImageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
  statsByTheNumberImageContainer.setAttribute('data-tab-content', '0');
  statsByTheNumberImageContainer.setAttribute('data-image-path', mainImageSrc);

  const pic = createOptimizedPicture(mainImage.src, mainImage.alt);
  const newImage = pic.querySelector('img');
  newImage.className = 'stats-by-the-number-main-image';
  newImage.setAttribute('data-tab-image', '0');
  newImage.style.opacity = '1';
  statsByTheNumberImageContainer.append(pic);
  moveInstrumentation(mainImage, newImage);

  statsByTheNumberImageSection.append(statsByTheNumberImageContainer);

  // Content Section
  const statsByTheNumberContentSection = document.createElement('div');
  statsByTheNumberContentSection.className = 'stats-by-the-number-content-section';

  const statsByTheNumberTabContent = document.createElement('div');
  statsByTheNumberTabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
  statsByTheNumberTabContent.setAttribute('data-tab-content', '0');

  // Description
  const descriptionRow = block.querySelector(':scope > div:nth-child(2) > div:nth-child(2)');
  const statsByTheNumberDescription = document.createElement('div');
  statsByTheNumberDescription.className = 'stats-by-the-number-description';
  statsByTheNumberDescription.innerHTML = descriptionRow.innerHTML;
  moveInstrumentation(descriptionRow, statsByTheNumberDescription.querySelector('p'));

  // Stat Cards
  const statCardsWrapper = document.createElement('div');
  statCardsWrapper.className = 'stats-by-the-number-cards';
  statCardsWrapper.setAttribute('role', 'list');

  const statCardRows = Array.from(block.querySelectorAll(':scope > div:nth-child(3) > div'));

  statCardRows.forEach((cardRow, index) => {
    // Model: statCard
    // Fields: number, description, hoverImage, hoverDetails

    const statCard = document.createElement('div');
    statCard.className = 'stats-by-the-number-card';
    statCard.setAttribute('role', 'img');
    statCard.setAttribute('tabindex', '0');

    const numberElement = cardRow.querySelector('div:first-child');
    const descriptionElement = cardRow.querySelector('div:nth-child(2)');
    const hoverImageElement = cardRow.querySelector('div:nth-child(3)');
    const hoverDetailsElement = cardRow.querySelector('div:nth-child(4)');

    const numberHtml = numberElement ? numberElement.innerHTML : '';
    const descriptionHtml = descriptionElement ? descriptionElement.innerHTML : '';
    const hoverImageSrc = hoverImageElement ? hoverImageElement.textContent.trim() : '';
    const hoverDetailsHtml = hoverDetailsElement ? hoverDetailsElement.innerHTML : '';

    statCard.setAttribute('data-hover-image', hoverImageSrc);
    statCard.setAttribute('data-hover-details', hoverDetailsHtml);

    // Reconstruct aria-label from number and description
    const ariaLabelNumber = numberElement.textContent.trim();
    const ariaLabelDescription = descriptionElement.textContent.trim();
    statCard.setAttribute('aria-label', `${ariaLabelNumber}: ${ariaLabelDescription}`);

    const readOnlyAuthorSpan = document.createElement('span');
    readOnlyAuthorSpan.className = 'readOnlyAuthor';
    readOnlyAuthorSpan.style.display = 'none';
    readOnlyAuthorSpan.innerHTML = numberHtml;
    statCard.append(readOnlyAuthorSpan);

    const statCardNumber = document.createElement('div');
    statCardNumber.className = 'stats-by-the-number-card__number';
    statCardNumber.setAttribute('data-count', numberHtml);
    statCardNumber.innerHTML = numberHtml;
    statCard.append(statCardNumber);
    moveInstrumentation(numberElement, statCardNumber.querySelector('p'));

    const statCardDescription = document.createElement('div');
    statCardDescription.className = 'stats-by-the-number-card__description';
    statCardDescription.innerHTML = descriptionHtml;
    statCard.append(statCardDescription);
    moveInstrumentation(descriptionElement, statCardDescription.querySelector('p'));

    statCardsWrapper.append(statCard);
  });

  // CTA
  const ctaRow = block.querySelector(':scope > div:nth-child(4) > div');
  const ctaLink = ctaRow.querySelector('a');
  const ctaUrl = ctaLink.href;
  const ctaLabel = ctaLink.textContent.trim();

  const statsByTheNumberCta = document.createElement('div');
  statsByTheNumberCta.className = 'stats-by-the-number-cta';

  const ctaAnchor = document.createElement('a');
  ctaAnchor.href = ctaUrl;
  ctaAnchor.className = 'cta cta__primary';
  ctaAnchor.target = '_self';
  ctaAnchor.setAttribute('aria-label', ctaLabel);
  ctaAnchor.setAttribute('data-palette', 'palette-1');

  const ctaIcon = document.createElement('span');
  ctaIcon.className = 'cta__icon qd-icon qd-icon--cheveron-right';
  ctaIcon.setAttribute('aria-hidden', 'true');
  ctaAnchor.append(ctaIcon);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.className = 'cta__label';
  ctaLabelSpan.textContent = ctaLabel;
  ctaAnchor.append(ctaLabelSpan);

  statsByTheNumberCta.append(ctaAnchor);
  moveInstrumentation(ctaLink, ctaAnchor);

  statsByTheNumberTabContent.append(statsByTheNumberDescription);
  statsByTheNumberTabContent.append(statCardsWrapper);
  statsByTheNumberTabContent.append(statsByTheNumberCta);

  statsByTheNumberContentSection.append(statsByTheNumberTabContent);

  statsByTheNumberMainContent.append(statsByTheNumberImageSection);
  statsByTheNumberMainContent.append(statsByTheNumberContentSection);

  statsByTheNumbersContainer.append(statsByTheNumberTitle);
  statsByTheNumbersContainer.append(statsByTheNumberMainContent);

  statsByTheNumbersWrapper.append(statsByTheNumbersContainer);

  block.textContent = '';
  block.append(statsByTheNumbersWrapper);
}
