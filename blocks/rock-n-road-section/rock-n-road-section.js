import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rockNroadSection = document.createElement('section');
  rockNroadSection.classList.add('rock-n-road-section', 'rock-n-road-homeSlot');
  moveInstrumentation(block, rockNroadSection);

  // Top Image
  const topImageContainer = document.createElement('div');
  topImageContainer.classList.add('rock-n-road-afterLayerTop');
  const topImage = block.querySelector('[data-aue-prop="topImage"]');
  if (topImage) {
    const pic = createOptimizedPicture(topImage.src, topImage.alt);
    moveInstrumentation(topImage, pic.querySelector('img'));
    topImageContainer.append(pic);
  }
  rockNroadSection.append(topImageContainer);

  // Reason to Join Section
  const reasonJoinContainer = document.createElement('div');
  reasonJoinContainer.classList.add('rock-n-road-reasonJoin', 'rock-n-road-paddingCon');

  const reasonRock = document.createElement('div');
  reasonRock.classList.add('rock-n-road-reason_rock');
  const reasonTitleSpan = document.createElement('span');
  const reasonTitle = block.querySelector('[data-aue-prop="reasonTitle"]');
  if (reasonTitle) {
    reasonTitleSpan.append(...reasonTitle.childNodes);
    moveInstrumentation(reasonTitle, reasonTitleSpan);
  }
  reasonRock.append(reasonTitleSpan);
  reasonJoinContainer.append(reasonRock);

  const tribeRoad = document.createElement('div');
  tribeRoad.classList.add('rock-n-road-tribe_road');
  const tribeImage = block.querySelector('[data-aue-prop="tribeImage"]');
  if (tribeImage) {
    const pic = createOptimizedPicture(tribeImage.src, tribeImage.alt);
    moveInstrumentation(tribeImage, pic.querySelector('img'));
    tribeRoad.append(pic);
  }
  reasonJoinContainer.append(tribeRoad);

  const stepsRoad = document.createElement('div');
  stepsRoad.classList.add('rock-n-road-steps_road');

  const steps = block.querySelectorAll('[data-aue-model="rockNRoadStep"]');
  steps.forEach((step) => {
    const subSteps = document.createElement('div');
    subSteps.classList.add('rock-n-road-sub_steps');

    const titleDiv = document.createElement('div');
    const title = step.querySelector('[data-aue-prop="title"]');
    if (title) {
      titleDiv.append(...title.childNodes);
      moveInstrumentation(title, titleDiv);
    }
    subSteps.append(titleDiv);

    const descriptionP = document.createElement('p');
    const description = step.querySelector('[data-aue-prop="description"]');
    if (description) {
      descriptionP.append(...description.childNodes);
      moveInstrumentation(description, descriptionP);
    }
    subSteps.append(descriptionP);

    stepsRoad.append(subSteps);
  });
  reasonJoinContainer.append(stepsRoad);
  rockNroadSection.append(reasonJoinContainer);

  // Bottom Image
  const bottomImageContainer = document.createElement('div');
  bottomImageContainer.classList.add('rock-n-road-afterLayerBottom');
  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    moveInstrumentation(bottomImage, pic.querySelector('img'));
    bottomImageContainer.append(pic);
  }
  rockNroadSection.append(bottomImageContainer);

  block.innerHTML = '';
  block.append(rockNroadSection);
}
