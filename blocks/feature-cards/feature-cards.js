import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsSection = document.createElement('section');
  featureCardsSection.classList.add('featurecards-section');

  const bolteSitareCardSection = document.createElement('section');
  bolteSitareCardSection.classList.add('featurecards-boltesitare-cardsection-wrapper');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('featurecards-text-wrapper');
  const title = document.createElement('h1');
  title.classList.add('featurecards-title');

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container');

  let firstRow = true;
  Array.from(block.children).forEach((row) => {
    if (firstRow) {
      const titleContent = row.querySelector('div');
      if (titleContent) {
        const h1 = titleContent.querySelector('h1');
        if (h1) {
          title.append(...h1.childNodes);
          moveInstrumentation(h1, title);
        }
        titleWrapper.append(title);
        moveInstrumentation(titleContent, titleWrapper);
      }
      firstRow = false;
    } else {
      const link = row.querySelector('a[data-aue-model="featureCard"]');
      if (link) {
        const newAnchor = document.createElement('a');
        newAnchor.classList.add('featurecards-link', 'analytics_cta_click', 'text-decoration-none');
        newAnchor.href = link.href;
        newAnchor.title = link.title;
        if (link.dataset.ctaLabel) {
          newAnchor.dataset.ctaLabel = link.dataset.ctaLabel;
        }
        moveInstrumentation(link, newAnchor);

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('featurecards-image-wrapper');
        const img = row.querySelector('[data-aue-prop="image"]');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          imageWrapper.append(picture);
          moveInstrumentation(img, picture.querySelector('img'));
        }
        newAnchor.append(imageWrapper);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('featurecards-content-wrapper');

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('featurecards-card-title', 'boing--text__heading-1');
        const titleElement = row.querySelector('[data-aue-prop="title"]');
        if (titleElement) {
          cardTitle.append(...titleElement.childNodes);
          moveInstrumentation(titleElement, cardTitle);
        }
        contentWrapper.append(cardTitle);

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('featurecards-description-wrapper');
        const description = document.createElement('p');
        description.classList.add('featurecards-description', 'boing--text__body-2', 'text-boing-dark');
        const descriptionElement = row.querySelector('[data-aue-prop="description"]');
        if (descriptionElement) {
          description.append(...descriptionElement.childNodes);
          moveInstrumentation(descriptionElement, description);
        }
        descriptionWrapper.append(description);
        contentWrapper.append(descriptionWrapper);

        const redirectButtonWrapper = document.createElement('div');
        redirectButtonWrapper.classList.add('featurecards-redirect-button-wrapper');
        const button = document.createElement('button');
        button.type = 'button';
        button.role = 'button';
        button.classList.add('featurecards-arrow-icon-btn');
        // Assuming the button content is just an icon path or similar
        // No direct AUE prop for button content, so we'll leave it empty or add a default if needed.
        redirectButtonWrapper.append(button);
        contentWrapper.append(redirectButtonWrapper);

        newAnchor.append(contentWrapper);
        featureCardsSection.append(newAnchor);
      } else if (row.querySelector('a[data-title]')) {
        const bolteSitareLink = row.querySelector('a[data-title]');
        const newBolteSitareAnchor = document.createElement('a');
        newBolteSitareAnchor.classList.add('featurecards-boltesitare-cardsection', 'analytics_cta_click', 'text-decoration-none');
        newBolteSitareAnchor.href = bolteSitareLink.href;
        newBolteSitareAnchor.title = bolteSitareLink.title;
        newBolteSitareAnchor.dataset.title = bolteSitareLink.dataset.title;
        moveInstrumentation(bolteSitareLink, newBolteSitareAnchor);

        const bolteSitareCardWrapper = document.createElement('div');
        bolteSitareCardWrapper.classList.add('featurecards-boltesitare-cardsection-wrapper');

        const bolteSitareImgWrapper = document.createElement('div');
        bolteSitareImgWrapper.classList.add('featurecards-boltesitare-cardsection-img');
        const bolteSitareImg = row.querySelector('[data-aue-prop="image"]');
        if (bolteSitareImg) {
          const picture = createOptimizedPicture(bolteSitareImg.src, bolteSitareImg.alt);
          bolteSitareImgWrapper.append(picture);
          moveInstrumentation(bolteSitareImg, picture.querySelector('img'));
        }
        bolteSitareCardWrapper.append(bolteSitareImgWrapper);

        const bolteSitareContentWrapper = document.createElement('div');
        bolteSitareContentWrapper.classList.add('featurecards-boltesitare-content-wrapper');

        const textContentDiv = document.createElement('div');
        const bolteSitareTitle = document.createElement('h2');
        bolteSitareTitle.classList.add('featurecards-boltesitare-cardsection-title', 'boing--text__heading-3', 'text-boing-dark');
        const bolteSitareTitleElement = row.querySelector('[data-aue-prop="title"]');
        if (bolteSitareTitleElement) {
          bolteSitareTitle.append(...bolteSitareTitleElement.childNodes);
          moveInstrumentation(bolteSitareTitleElement, bolteSitareTitle);
        }
        textContentDiv.append(bolteSitareTitle);

        const bolteSitareDescription = document.createElement('p');
        bolteSitareDescription.classList.add('featurecards-boltesitare-cardsection-text', 'boing--text__body-3', 'text-boing-dark');
        const bolteSitareDescriptionElement = row.querySelector('[data-aue-prop="description"]');
        if (bolteSitareDescriptionElement) {
          bolteSitareDescription.append(...bolteSitareDescriptionElement.childNodes);
          moveInstrumentation(bolteSitareDescriptionElement, bolteSitareDescription);
        }
        textContentDiv.append(bolteSitareDescription);
        bolteSitareContentWrapper.append(textContentDiv);

        const buttonDiv = document.createElement('div');
        const bolteSitareButton = document.createElement('button');
        bolteSitareButton.classList.add('featurecards-boltesitare-cardsection-btn', 'text-white', 'boing--text__body-4', 'd-inline-block');
        bolteSitareButton.textContent = 'Explore'; // Assuming fixed text or extracting from a hidden element if available
        buttonDiv.append(bolteSitareButton);
        bolteSitareContentWrapper.append(buttonDiv);

        bolteSitareCardWrapper.append(bolteSitareContentWrapper);
        newBolteSitareAnchor.append(bolteSitareCardWrapper);
        bolteSitareCardSection.append(newBolteSitareAnchor);
      }
    }
  });

  block.textContent = '';
  block.append(titleWrapper);
  block.append(featureCardsSection);
  block.append(bolteSitareCardSection);
  block.append(curveContainer);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
