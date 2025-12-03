import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainHeading = block.children[0]?.querySelector('div[data-aue-prop="mainHeading"]');
  const backgroundTopImage = block.children[0]?.querySelector('div[data-aue-prop="backgroundTopImage"]');
  const backgroundMainImage = block.children[0]?.querySelector('div[data-aue-prop="backgroundMainImage"]');

  const section = document.createElement('section');
  section.classList.add('experience-section', 'homeSlot');
  section.id = 'experiences';

  if (backgroundTopImage) {
    const divTop = document.createElement('div');
    divTop.classList.add('experience-after-layer-top');
    const imgTop = backgroundTopImage.querySelector('img');
    if (imgTop) {
      const pic = createOptimizedPicture(imgTop.src, imgTop.alt);
      moveInstrumentation(imgTop, pic.querySelector('img'));
      divTop.append(pic);
    }
    section.append(divTop);
  }

  if (backgroundMainImage) {
    const imgMain = backgroundMainImage.querySelector('img');
    if (imgMain) {
      const pic = createOptimizedPicture(imgMain.src, imgMain.alt);
      moveInstrumentation(imgMain, pic.querySelector('img'));
      pic.style.cssText = 'position: absolute;top: 0;left: 0;width: 100%;height: 100%;';
      section.append(pic);
    }
  }

  if (mainHeading) {
    const divHeading = document.createElement('div');
    divHeading.classList.add('experience-main-heading');
    divHeading.append(...mainHeading.childNodes);
    moveInstrumentation(mainHeading, divHeading);
    section.append(divHeading);
  }

  const experienceMainDiv = document.createElement('div');
  experienceMainDiv.classList.add('experience-main-div');

  const experiences = block.querySelectorAll('div[data-aue-model="experience"]');
  experiences.forEach((experience, index) => {
    const icon = experience.querySelector('div[data-aue-prop="icon"] img');
    const title = experience.querySelector('div[data-aue-prop="title"]');
    const description = experience.querySelector('div[data-aue-prop="description"]');
    const ctaLink = experience.querySelector('div[data-aue-prop="ctaLink"] a');
    const ctaLabel = experience.querySelector('div[data-aue-prop="ctaLabel"]');
    const ctaIcon = experience.querySelector('div[data-aue-prop="ctaIcon"] img');

    const divExperience = document.createElement('div');
    divExperience.classList.add(`experience-div${index + 1}`, 'experience-divv');

    const contentDiv = document.createElement('div');
    const iconWrapper = document.createElement('div');
    const iconInnerWrapper = document.createElement('div');
    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      moveInstrumentation(icon, pic.querySelector('img'));
      pic.classList.add('experience-move-ment');
      iconInnerWrapper.append(pic);
    }
    iconWrapper.append(iconInnerWrapper);
    contentDiv.append(iconWrapper);

    if (title) {
      const h3 = document.createElement('h3');
      h3.append(...title.childNodes);
      moveInstrumentation(title, h3);
      contentDiv.append(h3);
    }

    if (description) {
      const p = document.createElement('p');
      p.classList.add('experience-exp-text');
      p.append(...description.childNodes);
      moveInstrumentation(description, p);
      contentDiv.append(p);
    }
    divExperience.append(contentDiv);

    if (ctaLink || ctaLabel || ctaIcon) {
      const anchor = document.createElement('a');
      anchor.classList.add('experience-cta', 'experience-ctaaa');
      if (ctaLink) {
        anchor.href = ctaLink.href;
        anchor.rel = ctaLink.rel || 'no-follow';
        moveInstrumentation(ctaLink, anchor);
      }

      if (ctaLabel) {
        const p = document.createElement('p');
        p.append(...ctaLabel.childNodes);
        moveInstrumentation(ctaLabel, p);
        anchor.append(p);
      }

      if (ctaIcon) {
        const pic = createOptimizedPicture(ctaIcon.src, ctaIcon.alt);
        moveInstrumentation(ctaIcon, pic.querySelector('img'));
        anchor.append(pic);
      }
      divExperience.append(anchor);
    }
    experienceMainDiv.append(divExperience);
  });

  section.append(experienceMainDiv);

  // Add bottom layer image
  if (backgroundTopImage) {
    const divBottom = document.createElement('div');
    divBottom.classList.add('experience-after-layer-bottom');
    const imgBottom = backgroundTopImage.querySelector('img'); // Reusing the same image as top
    if (imgBottom) {
      const pic = createOptimizedPicture(imgBottom.src, imgBottom.alt);
      moveInstrumentation(imgBottom, pic.querySelector('img'));
      divBottom.append(pic);
    }
    section.append(divBottom);
  }

  block.innerHTML = '';
  block.append(section);
}
