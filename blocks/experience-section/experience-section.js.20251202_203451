import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainHeading = block.querySelector('[data-aue-prop="mainHeading"]');
  const backgroundImageTop = block.querySelector('[data-aue-prop="backgroundImageTop"]');
  const backgroundImageMain = block.querySelector('[data-aue-prop="backgroundImageMain"]');

  const section = document.createElement('section');
  section.className = 'experience-section homeSlot';
  section.id = 'experiences';

  if (backgroundImageTop) {
    const topLayerDiv = document.createElement('div');
    topLayerDiv.className = 'experience-after-layer-top';
    const pic = createOptimizedPicture(backgroundImageTop.src, backgroundImageTop.alt);
    topLayerDiv.append(pic);
    moveInstrumentation(backgroundImageTop, pic.querySelector('img'));
    section.append(topLayerDiv);
  }

  if (backgroundImageMain) {
    const pic = createOptimizedPicture(backgroundImageMain.src, backgroundImageMain.alt);
    pic.style.cssText = 'position: absolute;top: 0;left: 0;width: 100%;height: 100%;';
    section.append(pic);
    moveInstrumentation(backgroundImageMain, pic.querySelector('img'));
  }

  if (mainHeading) {
    const mainHeadingDiv = document.createElement('div');
    mainHeadingDiv.className = 'experience-main-heading';
    mainHeadingDiv.append(...mainHeading.childNodes);
    moveInstrumentation(mainHeading, mainHeadingDiv);
    section.append(mainHeadingDiv);
  }

  const experienceMainDiv = document.createElement('div');
  experienceMainDiv.className = 'experience-main-div';

  const experiences = block.querySelectorAll('[data-aue-model="experience"]');
  experiences.forEach((experience, index) => {
    const mainImage = experience.querySelector('[data-aue-prop="mainImage"]');
    const heading = experience.querySelector('[data-aue-prop="heading"]');
    const description = experience.querySelector('[data-aue-prop="description"]');
    const ctaLink = experience.querySelector('[data-aue-prop="ctaLink"]');
    const ctaText = experience.querySelector('[data-aue-prop="ctaText"]');
    const ctaIcon = experience.querySelector('[data-aue-prop="ctaIcon"]');

    const experienceDiv = document.createElement('div');
    experienceDiv.className = `experience-div${index + 1} experience-divv`;

    const contentWrapper = document.createElement('div');

    if (mainImage) {
      const imageDiv = document.createElement('div');
      const pic = createOptimizedPicture(mainImage.src, mainImage.alt);
      pic.querySelector('img').className = 'experience-move-ment';
      imageDiv.append(pic);
      moveInstrumentation(mainImage, pic.querySelector('img'));
      contentWrapper.append(imageDiv);
    }

    if (heading) {
      const h3 = document.createElement('h3');
      h3.append(...heading.childNodes);
      moveInstrumentation(heading, h3);
      contentWrapper.append(h3);
    }

    if (description) {
      const p = document.createElement('p');
      p.className = 'experience-exp-text';
      p.append(...description.childNodes);
      moveInstrumentation(description, p);
      contentWrapper.append(p);
    }

    experienceDiv.append(contentWrapper);

    if (ctaLink || ctaText || ctaIcon) {
      const anchor = document.createElement('a');
      anchor.className = 'experience-cta experience-ctaaa';
      if (ctaLink) {
        anchor.href = ctaLink.href;
        anchor.rel = 'no-follow';
        moveInstrumentation(ctaLink, anchor);
      } else {
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
      experienceDiv.append(anchor);
    }

    experienceMainDiv.append(experienceDiv);
  });

  section.append(experienceMainDiv);

  if (backgroundImageTop) {
    const bottomLayerDiv = document.createElement('div');
    bottomLayerDiv.className = 'experience-after-layer-bottom';
    const pic = createOptimizedPicture(backgroundImageTop.src, backgroundImageTop.alt);
    bottomLayerDiv.append(pic);
    // No specific instrumentation for bottom image as it's a duplicate of top
    section.append(bottomLayerDiv);
  }

  block.innerHTML = '';
  block.append(section);
}
