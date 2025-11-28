import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const reasonsToJoinRockNRoad = document.createElement('section');
  reasonsToJoinRockNRoad.classList.add('reasons-to-join-rock-n-road', 'homeSlot');
  moveInstrumentation(block, reasonsToJoinRockNRoad);

  // Top Image
  const topImageWrapper = document.createElement('div');
  topImageWrapper.classList.add('reasons-to-join-after-layer-top');
  const topImage = block.querySelector('[data-aue-prop="topImage"]');
  if (topImage) {
    const pic = createOptimizedPicture(topImage.src, topImage.alt);
    topImageWrapper.append(pic);
    moveInstrumentation(topImage, pic.querySelector('img'));
  }
  reasonsToJoinRockNRoad.append(topImageWrapper);

  const mainContentWrapper = document.createElement('div');
  mainContentWrapper.classList.add('reasons-to-join-reason-join', 'reasons-to-join-padding-con');

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('reasons-to-join-reason-rock');
  const headingSpan = document.createElement('span');
  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    headingSpan.append(...heading.childNodes);
    moveInstrumentation(heading, headingSpan);
  }
  headingWrapper.append(headingSpan);
  mainContentWrapper.append(headingWrapper);

  // Logo Image
  const logoImageWrapper = document.createElement('div');
  logoImageWrapper.classList.add('reasons-to-join-tribe-road');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    logoImageWrapper.append(pic);
    moveInstrumentation(logoImage, pic.querySelector('img'));
  }
  mainContentWrapper.append(logoImageWrapper);

  // Steps
  const stepsWrapper = document.createElement('div');
  stepsWrapper.classList.add('reasons-to-join-steps-road');
  const steps = block.querySelectorAll('[data-aue-model="step"]');
  steps.forEach((step) => {
    const subStepWrapper = document.createElement('div');
    subStepWrapper.classList.add('reasons-to-join-sub-steps');
    moveInstrumentation(step, subStepWrapper);

    const titleDiv = document.createElement('div');
    const title = step.querySelector('[data-aue-prop="title"]');
    if (title) {
      titleDiv.append(...title.childNodes);
      moveInstrumentation(title, titleDiv);
    }
    subStepWrapper.append(titleDiv);

    const descriptionP = document.createElement('p');
    const description = step.querySelector('[data-aue-prop="description"]');
    if (description) {
      descriptionP.append(...description.childNodes);
      moveInstrumentation(description, descriptionP);
    }
    subStepWrapper.append(descriptionP);

    stepsWrapper.append(subStepWrapper);
  });
  mainContentWrapper.append(stepsWrapper);

  reasonsToJoinRockNRoad.append(mainContentWrapper);

  // Bottom Image
  const bottomImageWrapper = document.createElement('div');
  bottomImageWrapper.classList.add('reasons-to-join-after-layer-bottom');
  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    const pic = createOptimizedPicture(bottomImage.src, bottomImage.alt);
    bottomImageWrapper.append(pic);
    moveInstrumentation(bottomImage, pic.querySelector('img'));
  }
  reasonsToJoinRockNRoad.append(bottomImageWrapper);

  block.innerHTML = '';
  block.append(reasonsToJoinRockNRoad);
}