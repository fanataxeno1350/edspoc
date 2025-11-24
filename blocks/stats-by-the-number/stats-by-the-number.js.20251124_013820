import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-by-the-number-wrapper animate-ready animate-in';
  wrapper.setAttribute('role', 'region');
  wrapper.setAttribute('aria-label', 'Statistics by the numbers');
  moveInstrumentation(block, wrapper);

  const container = document.createElement('div');
  container.className = 'stats-by-the-number-container';
  wrapper.append(container);

  // Process the first row for title, main image, description, CTA
  const firstRow = block.children[0];
  if (firstRow) {
    const cells = [...firstRow.children];

    // Title
    const titleCell = cells[0];
    if (titleCell) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'stats-by-the-number-title';
      const h2 = titleCell.querySelector('h2');
      if (h2) {
        titleDiv.append(h2);
        moveInstrumentation(titleCell, h2);
      } else {
        titleDiv.innerHTML = titleCell.innerHTML;
      }
      container.append(titleDiv);
    }

    const mainContentDiv = document.createElement('div');
    mainContentDiv.className = 'stats-by-the-number-main-content';
    container.append(mainContentDiv);

    // Main Image Section
    const mainImageCell = cells[1];
    if (mainImageCell) {
      const imageSection = document.createElement('div');
      imageSection.className = 'stats-by-the-number-image-section';
      const imageContainer = document.createElement('div');
      imageContainer.className = 'stats-by-the-number-image-container stats-by-the-number-image-container--active';
      imageContainer.setAttribute('data-tab-content', '0');

      const img = mainImageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').className = 'stats-by-the-number-main-image';
        optimizedPic.querySelector('img').setAttribute('data-tab-image', '0');
        optimizedPic.querySelector('img').style.opacity = '1';
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageContainer.append(optimizedPic);
        imageContainer.setAttribute('data-image-path', img.src);
      } else {
        imageContainer.innerHTML = mainImageCell.innerHTML;
      }
      imageSection.append(imageContainer);
      mainContentDiv.append(imageSection);
    }

    // Content Section
    const contentSection = document.createElement('div');
    contentSection.className = 'stats-by-the-number-content-section';
    const tabContent = document.createElement('div');
    tabContent.className = 'stats-by-the-number-tab-content stats-by-the-number-tab-content--active';
    tabContent.setAttribute('data-tab-content', '0');
    contentSection.append(tabContent);
    mainContentDiv.append(contentSection);

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'stats-by-the-number-description';
      const p = descriptionCell.querySelector('p');
      if (p) {
        descriptionDiv.append(p);
        moveInstrumentation(descriptionCell, p);
      } else {
        descriptionDiv.innerHTML = descriptionCell.innerHTML;
      }
      tabContent.append(descriptionDiv);
    }

    // CTA Link and Label
    const ctaLinkCell = cells[4];
    const ctaLabelCell = cells[5];
    if (ctaLinkCell && ctaLabelCell) {
      const ctaDiv = document.createElement('div');
      ctaDiv.className = 'stats-by-the-number-cta';
      const link = ctaLinkCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'cta cta__primary';
        newLink.target = link.target;
        newLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());
        newLink.setAttribute('data-palette', 'palette-1');

        const iconSpan = document.createElement('span');
        iconSpan.className = 'cta__icon qd-icon qd-icon--cheveron-right';
        iconSpan.setAttribute('aria-hidden', 'true');
        newLink.append(iconSpan);

        const labelSpan = document.createElement('span');
        labelSpan.className = 'cta__label';
        labelSpan.textContent = ctaLabelCell.textContent.trim();
        newLink.append(labelSpan);
        moveInstrumentation(ctaLinkCell, newLink);
        moveInstrumentation(ctaLabelCell, labelSpan);
        ctaDiv.append(newLink);
      } else {
        ctaDiv.innerHTML = ctaLinkCell.innerHTML; // Fallback if no link found
      }
      tabContent.append(ctaDiv);
    }
  }

  // Cards Section
  const cardsDiv = document.createElement('div');
  cardsDiv.className = 'stats-by-the-number-cards';
  cardsDiv.setAttribute('role', 'list');
  const tabContentDiv = wrapper.querySelector('.stats-by-the-number-tab-content');
  if (tabContentDiv) {
    const descriptionDiv = tabContentDiv.querySelector('.stats-by-the-number-description');
    if (descriptionDiv) {
      descriptionDiv.after(cardsDiv);
    } else {
      tabContentDiv.append(cardsDiv);
    }
  }

  // Loop through remaining rows for cards
  [...block.children].slice(1).forEach((row) => {
    const card = document.createElement('div');
    card.className = 'stats-by-the-number-card';
    card.setAttribute('role', 'img');
    card.setAttribute('tabindex', '0');
    moveInstrumentation(row, card);

    const cells = [...row.children];

    // Extract data attributes from the row's first cell (assuming the first cell contains all card data)
    const firstCardCell = cells[0];
    if (firstCardCell) {
      const hoverImage = firstCardCell.textContent.trim(); // Assuming hoverImage is the first cell's text content
      const hoverDetails = firstCardCell.nextElementSibling ? firstCardCell.nextElementSibling.innerHTML : '';
      const number = firstCardCell.nextElementSibling?.nextElementSibling ? firstCardCell.nextElementSibling.nextElementSibling.innerHTML : '';
      const description = firstCardCell.nextElementSibling?.nextElementSibling?.nextElementSibling ? firstCardCell.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML : '';

      card.setAttribute('data-hover-image', hoverImage);
      card.setAttribute('data-hover-details', hoverDetails);
      card.setAttribute('aria-label', `${number.replace(/<[^>]*>?/gm, '')}: ${description.replace(/<[^>]*>?/gm, '')}`);

      // Number Div
      const numberDiv = document.createElement('div');
      numberDiv.className = 'stats-by-the-number-card__number';
      numberDiv.setAttribute('data-count', number);
      numberDiv.innerHTML = number;
      card.append(numberDiv);

      // Description Div
      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'stats-by-the-number-card__description';
      descriptionDiv.innerHTML = description;
      card.append(descriptionDiv);
    }
    cardsDiv.append(card);
  });

  block.textContent = '';
  block.append(wrapper);
}
