import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('experience-main-div');

  const topLayerImageDiv = document.createElement('div');
  topLayerImageDiv.classList.add('experience-after-layer-top');
  const topLayerImage = block.querySelector('[data-aue-prop="topLayerImage"]');
  if (topLayerImage) {
    const pic = createOptimizedPicture(topLayerImage.src, topLayerImage.alt);
    moveInstrumentation(topLayerImage, pic.querySelector('img'));
    topLayerImageDiv.append(pic);
  }

  const backgroundImage = block.querySelector('[data-aue-prop="backgroundImage"]');
  if (backgroundImage) {
    const pic = createOptimizedPicture(backgroundImage.src, backgroundImage.alt);
    pic.style.cssText = 'position: absolute;top: 0;left: 0;width: 100%;height: 100%;';
    moveInstrumentation(backgroundImage, pic.querySelector('img'));
    block.append(pic);
  }

  const mainHeadingDiv = document.createElement('div');
  mainHeadingDiv.classList.add('experience-main-heading');
  const mainHeading = block.querySelector('[data-aue-prop="mainHeading"]');
  if (mainHeading) {
    mainHeadingDiv.append(...mainHeading.childNodes);
    moveInstrumentation(mainHeading, mainHeadingDiv);
  }

  const experienceCards = block.querySelectorAll('[data-aue-model="experienceCard"]');
  experienceCards.forEach((card, index) => {
    const experienceDiv = document.createElement('div');
    experienceDiv.classList.add(`experience-div${index + 1}`, 'experience-divv');

    const contentDiv = document.createElement('div');

    const imageDiv = document.createElement('div');
    const mainImage = card.querySelector('[data-aue-prop="mainImage"]');
    if (mainImage) {
      const pic = createOptimizedPicture(mainImage.src, mainImage.alt);
      pic.classList.add('experience-move-ment');
      moveInstrumentation(mainImage, pic.querySelector('img'));
      imageDiv.append(pic);
    }
    contentDiv.append(imageDiv);

    const heading = card.querySelector('[data-aue-prop="heading"]');
    if (heading) {
      const h3 = document.createElement('h3');
      h3.append(...heading.childNodes);
      moveInstrumentation(heading, h3);
      contentDiv.append(h3);
    }

    const description = card.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement('p');
      p.classList.add('experience-exp-text');
      p.append(...description.childNodes);
      moveInstrumentation(description, p);
      contentDiv.append(p);
    }

    experienceDiv.append(contentDiv);

    const ctaLink = card.querySelector('[data-aue-prop="ctaLink"]');
    if (ctaLink) {
      const anchor = document.createElement('a');
      anchor.classList.add('experience-cta', 'experience-ctaaa');
      anchor.href = ctaLink.href;
      anchor.rel = 'no-follow';
      moveInstrumentation(ctaLink, anchor);

      const ctaText = card.querySelector('[data-aue-prop="ctaText"]');
      if (ctaText) {
        const p = document.createElement('p');
        p.append(...ctaText.childNodes);
        moveInstrumentation(ctaText, p);
        anchor.append(p);
      }

      const ctaIcon = card.querySelector('[data-aue-prop="ctaIcon"]');
      if (ctaIcon) {
        const pic = createOptimizedPicture(ctaIcon.src, ctaIcon.alt);
        moveInstrumentation(ctaIcon, pic.querySelector('img'));
        anchor.append(pic);
      }
      experienceDiv.append(anchor);
    }

    mainDiv.append(experienceDiv);
  });

  const bottomLayerImageDiv = document.createElement('div');
  bottomLayerImageDiv.classList.add('experience-after-layer-bottom');
  // Assuming bottomLayerImage reuses the same authored content as topLayerImage for simplicity
  // If it's a separate authored field, a new querySelector would be needed.
  // For now, we'll create a placeholder or reuse if the authored content implies it.
  // Since there's no specific 'bottomLayerImage' prop in the JSON, and the HTML shows the same image as top, 
  // we'll extract the image from the existing block structure that corresponds to the bottom layer.
  const authoredBottomLayerImage = block.querySelector('.experience-after-layer-bottom img');
  if (authoredBottomLayerImage) {
    const pic = createOptimizedPicture(authoredBottomLayerImage.src, authoredBottomLayerImage.alt);
    moveInstrumentation(authoredBottomLayerImage, pic.querySelector('img'));
    bottomLayerImageDiv.append(pic);
  } else if (topLayerImage) { // Fallback if no specific bottom layer image is found, use top layer image
    const pic = createOptimizedPicture(topLayerImage.src, topLayerImage.alt);
    moveInstrumentation(topLayerImage, pic.querySelector('img')); // Re-instrumenting the same source, but for a new target
    bottomLayerImageDiv.append(pic);
  }

  block.innerHTML = '';
  block.append(topLayerImageDiv, mainHeadingDiv, mainDiv, bottomLayerImageDiv);
}