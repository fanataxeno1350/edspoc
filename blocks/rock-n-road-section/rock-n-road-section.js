import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rockNRoadSection = document.createElement('section');
  rockNRoadSection.classList.add('rock-n-road-section', 'rock-n-road-homeSlot');
  moveInstrumentation(block, rockNRoadSection);

  // Top Image
  const topImageWrapper = document.createElement('div');
  topImageWrapper.classList.add('rock-n-road-afterLayerTop');
  const topImage = block.querySelector('[data-aue-prop="topImage"]');
  if (topImage) {
    const pic = createOptimizedPicture(topImage.src, topImage.alt);
    moveInstrumentation(topImage, pic.querySelector('img'));
    topImageWrapper.append(pic);
  }
  rockNRoadSection.append(topImageWrapper);

  const reasonJoinDiv = document.createElement('div');
  reasonJoinDiv.classList.add('rock-n-road-reasonJoin', 'rock-n-road-paddingCon');

  // Headline
  const reasonRockDiv = document.createElement('div');
  reasonRockDiv.classList.add('rock-n-road-reason_rock');
  const headlineSpan = document.createElement('span');
  const headline = block.querySelector('[data-aue-prop="headline"]');
  if (headline) {
    headlineSpan.append(...headline.childNodes);
    moveInstrumentation(headline, headlineSpan);
  }
  reasonRockDiv.append(headlineSpan);
  reasonJoinDiv.append(reasonRockDiv);

  // Tribe Image
  const tribeRoadDiv = document.createElement('div');
  tribeRoadDiv.classList.add('rock-n-road-tribe_road');
  const tribeImage = block.querySelector('[data-aue-prop="tribeImage"]');
  if (tribeImage) {
    const pic = createOptimizedPicture(tribeImage.src, tribeImage.alt);
    moveInstrumentation(tribeImage, pic.querySelector('img'));
    tribeRoadDiv.append(pic);
  }
  reasonJoinDiv.append(tribeRoadDiv);

  // Steps
  const stepsRoadDiv = document.createElement('div');
  stepsRoadDiv.classList.add('rock-n-road-steps_road');
  const stepsContainer = block.querySelector('[data-aue-prop="steps"]');
  if (stepsContainer) {
    const stepItems = stepsContainer.querySelectorAll('[data-aue-model="step"]');
    stepItems.forEach((step) => {
      const subStepsDiv = document.createElement('div');
      subStepsDiv.classList.add('rock-n-road-sub_steps');
      moveInstrumentation(step, subStepsDiv);

      const titleDiv = document.createElement('div');
      const title = step.querySelector('[data-aue-prop="title"]');
      if (title) {
        titleDiv.append(...title.childNodes);
        moveInstrumentation(title, titleDiv);
      }
      subStepsDiv.append(titleDiv);

      const descriptionP = document.createElement('p');
      const description = step.querySelector('[data-aue-prop="description"]');
      if (description) {
        descriptionP.append(...description.childNodes);
        moveInstrumentation(description, descriptionP);
      }
      subStepsDiv.append(descriptionP);

      stepsRoadDiv.append(subStepsDiv);
    });
  }
  reasonJoinDiv.append(stepsRoadDiv);
  rockNRoadSection.append(reasonJoinDiv);

  // Bottom Image
  const bottomImageWrapper = document.createElement('div');
  bottomImageWrapper.classList.add('rock-n-road-afterLayerBottom');
  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    moveInstrumentation(bottomImage, pic.querySelector('img'));
    bottomImageWrapper.append(pic);
  }
  rockNRoadSection.append(bottomImageWrapper);

  block.innerHTML = '';
  block.append(rockNRoadSection);
}
