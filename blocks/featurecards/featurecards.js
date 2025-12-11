import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featurecardsContainer = document.createElement('div');
  featurecardsContainer.className = 'featurecards-container';

  const titleWrapper = document.createElement('div');
  titleWrapper.id = 'text-68763da680';
  titleWrapper.className = 'featurecards-text-wrapper';

  const titleElement = document.createElement('h1');
  titleElement.className = 'featurecards-title';

  const titleText = block.querySelector('h1');
  if (titleText) {
    titleElement.innerHTML = titleText.innerHTML;
    moveInstrumentation(titleText, titleElement);
    titleWrapper.append(titleElement);
  } else {
    // Fallback if h1 is not directly available, but might be in the first div
    const firstDiv = block.querySelector('div:first-child');
    if (firstDiv && firstDiv.textContent.trim() !== '') {
      titleElement.textContent = firstDiv.textContent.trim();
      titleWrapper.append(titleElement);
      moveInstrumentation(firstDiv, titleWrapper);
    }
  }

  if (titleElement.hasChildNodes()) {
    featurecardsContainer.append(titleWrapper);
  }

  const featureCardItems = block.querySelectorAll('[data-aue-model="featurecard"]');
  featureCardItems.forEach((item) => {
    const section = document.createElement('section');
    section.className = 'featurecards-section';

    const linkElement = document.createElement('a');
    linkElement.className = 'featurecards-card-link analytics_cta_click';

    const linkAueProp = item.querySelector('[data-aue-prop="link"]');
    let linkHref = '';
    if (linkAueProp) {
      linkHref = linkAueProp.querySelector('a')?.href || linkAueProp.textContent.trim();
      linkElement.href = linkHref;
      linkElement.title = item.querySelector('[data-aue-prop="title"]')?.textContent.trim() || '';
      linkElement.dataset.ctaLabel = item.querySelector('[data-aue-prop="buttonText"]')?.textContent.trim() || 'Explore';
      moveInstrumentation(linkAueProp, linkElement);
    } else {
      // Fallback for link if aue-prop is missing, check for a direct <a>
      const fallbackLink = item.querySelector('a');
      if (fallbackLink) {
        linkHref = fallbackLink.href;
        linkElement.href = linkHref;
        linkElement.title = fallbackLink.title || '';
        linkElement.dataset.ctaLabel = fallbackLink.textContent.trim() || 'Explore';
        moveInstrumentation(fallbackLink, linkElement);
      }
    }

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.className = 'featurecards-card-image-wrapper';

    const imgAueProp = item.querySelector('[data-aue-prop="image"]');
    let imgElement = null;
    if (imgAueProp) {
      const img = imgAueProp.querySelector('img');
      if (img) {
        imgElement = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        imgElement.querySelector('img').className = 'featurecards-card-image';
        moveInstrumentation(img, imgElement.querySelector('img'));
      }
      moveInstrumentation(imgAueProp, cardImageWrapper);
    } else {
      // Fallback for image if aue-prop is missing, check for a direct <img>
      const fallbackImg = item.querySelector('img');
      if (fallbackImg) {
        imgElement = createOptimizedPicture(fallbackImg.src, fallbackImg.alt, false, [{ width: '750' }]);
        imgElement.querySelector('img').className = 'featurecards-card-image';
        moveInstrumentation(fallbackImg, imgElement.querySelector('img'));
      }
    }
    if (imgElement) {
      cardImageWrapper.append(imgElement);
    }
    linkElement.append(cardImageWrapper);

    const cardContent = document.createElement('div');
    cardContent.className = 'featurecards-card-content';

    const titleAueProp = item.querySelector('[data-aue-prop="title"]');
    if (titleAueProp) {
      const h2 = document.createElement('h2');
      h2.className = 'featurecards-card-title boing--text__heading-1';
      h2.textContent = titleAueProp.textContent.trim();
      moveInstrumentation(titleAueProp, h2);
      cardContent.append(h2);
    }

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.className = 'featurecards-card-description-wrapper';

    const descriptionAueProp = item.querySelector('[data-aue-prop="description"]');
    if (descriptionAueProp) {
      const p = document.createElement('p');
      p.className = 'featurecards-card-description boing--text__body-2 text-boing-dark';
      p.innerHTML = descriptionAueProp.innerHTML;
      moveInstrumentation(descriptionAueProp, p);
      descriptionWrapper.append(p);
    }
    cardContent.append(descriptionWrapper);

    const redirectButtonWrapper = document.createElement('div');
    redirectButtonWrapper.className = 'featurecards-redirect-button-wrapper d-none';
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.className = 'featurecards-arrow-icon-button';
    // The button content seems to be an SVG path or similar, not directly from AUE prop
    // For now, it's hardcoded based on the sample HTML, assuming it's a fixed asset.
    button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1765368595856.svg+xml';
    redirectButtonWrapper.append(button);
    cardContent.append(redirectButtonWrapper);

    linkElement.append(cardContent);
    section.append(linkElement);
    featurecardsContainer.append(section);
  });

  // Handle the 'bolte-sitare-card-section' items, which are also multifields but rendered differently
  // These are currently marked as d-none in the sample HTML, but we should still build them.
  featureCardItems.forEach((item) => {
    const bolteSitareCardSection = document.createElement('a');
    bolteSitareCardSection.className = 'featurecards-bolte-sitare-card-section d-none analytics_cta_click text-decoration-none';

    const linkAueProp = item.querySelector('[data-aue-prop="link"]');
    let linkHref = '';
    if (linkAueProp) {
      linkHref = linkAueProp.querySelector('a')?.href || linkAueProp.textContent.trim();
      bolteSitareCardSection.href = linkHref;
      bolteSitareCardSection.title = item.querySelector('[data-aue-prop="title"]')?.textContent.trim() || '';
      bolteSitareCardSection.dataset.title = item.querySelector('[data-aue-prop="title"]')?.textContent.trim() || '';
      // No moveInstrumentation here as the original link was moved to the other card type.
      // If this were a separate multifield, it would need its own instrumentation.
    } else {
      const fallbackLink = item.querySelector('a');
      if (fallbackLink) {
        linkHref = fallbackLink.href;
        bolteSitareCardSection.href = linkHref;
        bolteSitareCardSection.title = fallbackLink.title || '';
        bolteSitareCardSection.dataset.title = fallbackLink.title || '';
      }
    }

    const bolteSitareCardWrapper = document.createElement('div');
    bolteSitareCardWrapper.className = 'featurecards-bolte-sitare-card-wrapper d-flex';

    const bolteSitareCardImageDiv = document.createElement('div');
    bolteSitareCardImageDiv.className = 'featurecards-bolte-sitare-card-image';

    const imgAueProp = item.querySelector('[data-aue-prop="image"]');
    let imgElement = null;
    if (imgAueProp) {
      const img = imgAueProp.querySelector('img');
      if (img) {
        imgElement = createOptimizedPicture(img.src, img.alt, false, [{ width: '250' }]);
        imgElement.querySelector('img').className = 'featurecards-card-image-item';
        // No moveInstrumentation here as the original image was moved to the other card type.
      }
    } else {
      const fallbackImg = item.querySelector('img');
      if (fallbackImg) {
        imgElement = createOptimizedPicture(fallbackImg.src, fallbackImg.alt, false, [{ width: '250' }]);
        imgElement.querySelector('img').className = 'featurecards-card-image-item';
      }
    }
    if (imgElement) {
      bolteSitareCardImageDiv.append(imgElement);
    }
    bolteSitareCardWrapper.append(bolteSitareCardImageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'featurecards-content-wrapper d-flex flex-column justify-content-between';

    const textContentDiv = document.createElement('div');

    const titleAueProp = item.querySelector('[data-aue-prop="title"]');
    if (titleAueProp) {
      const h2 = document.createElement('h2');
      h2.className = 'featurecards-bolte-sitare-card-title boing--text__heading-3 text-boing-dark';
      h2.textContent = titleAueProp.textContent.trim();
      textContentDiv.append(h2);
    }

    const descriptionAueProp = item.querySelector('[data-aue-prop="description"]');
    if (descriptionAueProp) {
      const p = document.createElement('p');
      p.className = 'featurecards-bolte-sitare-card-text boing--text__body-3 text-boing-dark';
      p.innerHTML = descriptionAueProp.innerHTML;
      textContentDiv.append(p);
    }
    contentWrapper.append(textContentDiv);

    const buttonDiv = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'featurecards-bolte-sitare-card-button text-white boing--text__body-4 d-inline-block';
    const buttonTextAueProp = item.querySelector('[data-aue-prop="buttonText"]');
    if (buttonTextAueProp) {
      button.textContent = buttonTextAueProp.textContent.trim();
    } else {
      button.textContent = 'Explore'; // Default text if not found
    }
    buttonDiv.append(button);
    contentWrapper.append(buttonDiv);

    bolteSitareCardWrapper.append(contentWrapper);
    bolteSitareCardSection.append(bolteSitareCardWrapper);
    featurecardsContainer.append(bolteSitareCardSection);
  });

  const curveContainer = document.createElement('div');
  curveContainer.className = 'featurecards-curve-container d-none';
  featurecardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featurecardsContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
