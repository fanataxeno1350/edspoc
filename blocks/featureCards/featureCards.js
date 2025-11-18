import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featurecards-wrapper');
  moveInstrumentation(block, featureCardsWrapper);

  // Handle the title section
  const titleRow = block.children[0];
  if (titleRow) {
    const featurecardsText = document.createElement('div');
    featurecardsText.classList.add('featurecards-text');
    moveInstrumentation(titleRow, featurecardsText);

    const h1 = titleRow.querySelector('h1');
    if (h1) {
      const newH1 = document.createElement('h1');
      newH1.classList.add('featurecards-title-main');
      newH1.innerHTML = h1.innerHTML;
      featurecardsText.append(newH1);
    }
    featureCardsWrapper.append(featurecardsText);
  }

  // Handle the feature card sections
  const sections = [...block.children].slice(1);
  sections.forEach((row) => {
    if (row.querySelector('a.featurecards-link')) {
      // This is a primary feature card section
      const section = document.createElement('section');
      section.classList.add('featurecards-section', 'featurecards-card-section', 'featurecards-mx-auto');
      moveInstrumentation(row, section);

      const link = row.querySelector('a.featurecards-link');
      if (link) {
        const newLink = document.createElement('a');
        newLink.classList.add('featurecards-link', 'analytics_cta_click', 'featurecards-text-decoration-none');
        newLink.href = link.href;
        newLink.title = link.title;
        newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
        moveInstrumentation(link, newLink);

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('featurecards-image-wrapper', 'featurecards-w-100', 'featurecards-pb-4');
        const img = link.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageWrapper.append(optimizedPic);
        }
        newLink.append(imageWrapper);

        const textCenter = document.createElement('div');
        textCenter.classList.add('featurecards-text-center');

        const h2 = link.querySelector('h2');
        if (h2) {
          const newH2 = document.createElement('h2');
          newH2.classList.add('featurecards-title', 'featurecards-boing--text__heading-1');
          newH2.textContent = h2.textContent.trim();
          textCenter.append(newH2);
        }

        const pb5 = document.createElement('div');
        pb5.classList.add('featurecards-pb-5');
        const p = link.querySelector('p');
        if (p) {
          const newP = document.createElement('p');
          newP.classList.add('featurecards-description', 'featurecards-boing--text__body-2', 'featurecards-text-boing-dark');
          newP.textContent = p.textContent.trim();
          pb5.append(newP);
        }
        textCenter.append(pb5);

        const redirectedBtn = document.createElement('div');
        redirectedBtn.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
        const button = link.querySelector('button');
        if (button) {
          const newButton = document.createElement('button');
          newButton.type = 'button';
          newButton.role = 'button';
          newButton.classList.add('featurecards-arrow-icon-btn');
          newButton.textContent = button.textContent.trim();
          redirectedBtn.append(newButton);
        }
        textCenter.append(redirectedBtn);
        newLink.append(textCenter);
        section.append(newLink);
      }
      featureCardsWrapper.append(section);
    } else if (row.querySelector('a.featurecards-bolte-sitare-card-section')) {
      // This is a bolte sitare card section
      const link = row.querySelector('a.featurecards-bolte-sitare-card-section');
      if (link) {
        const newLink = document.createElement('a');
        newLink.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
        newLink.href = link.href;
        newLink.title = link.title;
        newLink.setAttribute('data-title', link.getAttribute('data-title'));
        moveInstrumentation(link, newLink);

        const wrapper = document.createElement('div');
        wrapper.classList.add('featurecards-bolte-sitare-card-section--wrapper');

        const imgDiv = document.createElement('div');
        imgDiv.classList.add('featurecards-bolte-sitare-card-section--img');
        const img = link.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imgDiv.append(optimizedPic);
        }
        wrapper.append(imgDiv);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');

        const textDiv = document.createElement('div');
        const h2 = link.querySelector('h2');
        if (h2) {
          const newH2 = document.createElement('h2');
          newH2.classList.add('featurecards-bolte-sitare-card-section--title', 'featurecards-boing--text__heading-3', 'featurecards-text-boing-dark');
          newH2.textContent = h2.textContent.trim();
          textDiv.append(newH2);
        }
        const p = link.querySelector('p');
        if (p) {
          const newP = document.createElement('p');
          newP.classList.add('featurecards-bolte-sitare-card-section--text', 'featurecards-boing--text__body-3', 'featurecards-text-boing-dark');
          newP.textContent = p.textContent.trim();
          textDiv.append(newP);
        }
        contentWrapper.append(textDiv);

        const btnDiv = document.createElement('div');
        const button = link.querySelector('button');
        if (button) {
          const newButton = document.createElement('button');
          newButton.classList.add('featurecards-bolte-sitare-card-section--btn', 'featurecards-text-white', 'featurecards-boing--text__body-4', 'featurecards-d-inline-block');
          newButton.textContent = button.textContent.trim();
          btnDiv.append(newButton);
        }
        contentWrapper.append(btnDiv);
        wrapper.append(contentWrapper);
        newLink.append(wrapper);
        featureCardsWrapper.append(newLink);
      }
    }
  });

  // Handle the curve container
  const curveContainerRow = block.children[block.children.length - 1];
  if (curveContainerRow && curveContainerRow.querySelector('.featurecards-curve-container')) {
    const curveContainer = document.createElement('div');
    curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
    moveInstrumentation(curveContainerRow, curveContainer);
    featureCardsWrapper.append(curveContainer);
  }

  block.textContent = '';
  block.append(featureCardsWrapper);
}
