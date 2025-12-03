import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rockNRoadSectionModel = block.querySelector('[data-aue-model="rockNRoadSection"]');

  const topImageContainer = document.createElement('div');
  topImageContainer.classList.add('rock-n-road-afterLayerTop');
  const topImage = rockNRoadSectionModel.querySelector('[data-aue-prop="topImage"]');
  if (topImage) {
    const pic = createOptimizedPicture(topImage.src, topImage.alt);
    moveInstrumentation(topImage, pic.querySelector('img'));
    topImageContainer.append(pic);
  }

  const reasonJoinDiv = document.createElement('div');
  reasonJoinDiv.classList.add('rock-n-road-reasonJoin', 'rock-n-road-paddingCon');

  const reasonRockDiv = document.createElement('div');
  reasonRockDiv.classList.add('rock-n-road-reason_rock');
  const headingSpan = document.createElement('span');
  const heading = rockNRoadSectionModel.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    headingSpan.append(...heading.childNodes);
    moveInstrumentation(heading, headingSpan);
  }
  reasonRockDiv.append(headingSpan);
  reasonJoinDiv.append(reasonRockDiv);

  const tribeRoadDiv = document.createElement('div');
  tribeRoadDiv.classList.add('rock-n-road-tribe_road');
  const tribeImage = rockNRoadSectionModel.querySelector('[data-aue-prop="tribeImage"]');
  if (tribeImage) {
    const pic = createOptimizedPicture(tribeImage.src, tribeImage.alt);
    moveInstrumentation(tribeImage, pic.querySelector('img'));
    tribeRoadDiv.append(pic);
  }
  reasonJoinDiv.append(tribeRoadDiv);

  const stepsRoadDiv = document.createElement('div');
  stepsRoadDiv.classList.add('rock-n-road-steps_road');

  const reasonItems = block.querySelectorAll('[data-aue-model="reason"]');
  reasonItems.forEach((reason) => {
    const subStepsDiv = document.createElement('div');
    subStepsDiv.classList.add('rock-n-road-sub_steps');

    const titleDiv = document.createElement('div');
    const title = reason.querySelector('[data-aue-prop="title"]');
    if (title) {
      titleDiv.append(...title.childNodes);
      moveInstrumentation(title, titleDiv);
    }
    subStepsDiv.append(titleDiv);

    const descriptionP = document.createElement('p');
    const description = reason.querySelector('[data-aue-prop="description"]');
    if (description) {
      descriptionP.append(...description.childNodes);
      moveInstrumentation(description, descriptionP);
    }
    subStepsDiv.append(descriptionP);
    stepsRoadDiv.append(subStepsDiv);
  });
  reasonJoinDiv.append(stepsRoadDiv);

  const bottomImageContainer = document.createElement('div');
  bottomImageContainer.classList.add('rock-n-road-afterLayerBottom');
  const bottomImage = rockNRoadSectionModel.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    moveInstrumentation(bottomImage, pic.querySelector('img'));
    bottomImageContainer.append(pic);
  }

  block.innerHTML = '';
  block.classList.add('rock-n-road-section', 'rock-n-road-homeSlot');
  block.append(topImageContainer, reasonJoinDiv, bottomImageContainer);
}
