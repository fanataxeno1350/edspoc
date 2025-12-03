import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainHeading = block.querySelector('div[data-aue-prop="mainHeading"]');
  const experienceItems = block.querySelectorAll('div[data-aue-model="experienceItem"]');
  const topLayerImage = block.querySelector('div[data-aue-prop="topLayerImage"] img');
  const bottomLayerImage = block.querySelector('div[data-aue-prop="bottomLayerImage"] img');
  const backgroundImage = block.querySelector('img[data-aue-prop="backgroundImage"]');

  const section = document.createElement('section');
  section.classList.add('experience-section', 'homeSlot');
  section.id = 'experiences';

  if (topLayerImage) {
    const divTopLayer = document.createElement('div');
    divTopLayer.classList.add('experience-after-layer-top');
    const pic = createOptimizedPicture(topLayerImage.src, topLayerImage.alt);
    divTopLayer.append(pic);
    moveInstrumentation(topLayerImage, pic.querySelector('img'));
    section.append(divTopLayer);
  }

  if (backgroundImage) {
    const pic = createOptimizedPicture(backgroundImage.src, backgroundImage.alt);
    pic.style.cssText = 'position: absolute;top: 0;left: 0;width: 100%;height: 100%;';
    section.append(pic);
    moveInstrumentation(backgroundImage, pic.querySelector('img'));
  }

  if (mainHeading) {
    const mainHeadingDiv = document.createElement('div');
    mainHeadingDiv.classList.add('experience-main-heading');
    mainHeadingDiv.append(...mainHeading.childNodes);
    moveInstrumentation(mainHeading, mainHeadingDiv);
    section.append(mainHeadingDiv);
  }

  if (experienceItems.length > 0) {
    const experienceMainDiv = document.createElement('div');
    experienceMainDiv.classList.add('experience-main-div');

    experienceItems.forEach((item, index) => {
      const itemContainer = document.createElement('div');
      itemContainer.classList.add(`experience-div${index + 1}`, 'experience-divv');
      moveInstrumentation(item, itemContainer);

      const contentDiv = document.createElement('div');
      itemContainer.append(contentDiv);

      const imageWrapperDiv = document.createElement('div');
      const image = item.querySelector('[data-aue-prop="image"] img');
      if (image) {
        const pic = createOptimizedPicture(image.src, image.alt);
        pic.classList.add('experience-move-ment');
        imageWrapperDiv.append(pic);
        moveInstrumentation(image, pic.querySelector('img'));
      }
      contentDiv.append(imageWrapperDiv);

      const title = item.querySelector('[data-aue-prop="title"]');
      if (title) {
        const h3 = document.createElement('h3');
        h3.append(...title.childNodes);
        moveInstrumentation(title, h3);
        contentDiv.append(h3);
      }

      const description = item.querySelector('[data-aue-prop="description"]');
      if (description) {
        const p = document.createElement('p');
        p.classList.add('experience-exp-text');
        p.append(...description.childNodes);
        moveInstrumentation(description, p);
        contentDiv.append(p);
      }

      const ctaLink = item.querySelector('[data-aue-prop="ctaLink"]');
      const ctaText = item.querySelector('[data-aue-prop="ctaText"]');
      const ctaIcon = item.querySelector('[data-aue-prop="ctaIcon"] img');

      if (ctaLink || ctaText || ctaIcon) {
        const anchor = document.createElement('a');
        anchor.classList.add('experience-cta', 'experience-ctaaa');
        if (ctaLink) {
          anchor.href = ctaLink.href || '#';
          anchor.rel = 'no-follow';
          moveInstrumentation(ctaLink, anchor);
        } else {
          // If ctaLink is null, still create a dummy link to hold instrumentation
          anchor.href = '#';
          anchor.rel = 'no-follow';
        }

        if (ctaText) {
          const p = document.createElement('p');
          p.append(...ctaText.childNodes);
          moveInstrumentation(ctaText, p);
          anchor.append(p);
        }

        if (ctaIcon) {
          const pic = createOptimizedPicture(ctaIcon.src, ctaIcon.alt);
          anchor.append(pic);
          moveInstrumentation(ctaIcon, pic.querySelector('img'));
        }
        itemContainer.append(anchor);
      }
      experienceMainDiv.append(itemContainer);
    });
    section.append(experienceMainDiv);
  }

  if (bottomLayerImage) {
    const divBottomLayer = document.createElement('div');
    divBottomLayer.classList.add('experience-after-layer-bottom');
    const pic = createOptimizedPicture(bottomLayerImage.src, bottomLayerImage.alt);
    divBottomLayer.append(pic);
    moveInstrumentation(bottomLayerImage, pic.querySelector('img'));
    section.append(divBottomLayer);
  }

  block.textContent = '';
  block.append(section);
}
