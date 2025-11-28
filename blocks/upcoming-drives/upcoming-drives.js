import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('upcoming-drives-main-div');
  moveInstrumentation(block, mainDiv);

  const backcoverImage = block.querySelector('[data-aue-prop="backcover"]');
  if (backcoverImage) {
    const backcoverPic = createOptimizedPicture(backcoverImage.src, backcoverImage.alt);
    const backcoverContainer = document.createElement('img');
    backcoverContainer.classList.add('upcoming-drives-backcover');
    backcoverContainer.src = backcoverPic.querySelector('img').src;
    backcoverContainer.alt = backcoverPic.querySelector('img').alt;
    moveInstrumentation(backcoverImage, backcoverContainer);
    mainDiv.append(backcoverContainer);
  }

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const headingDiv = document.createElement('div');
    headingDiv.classList.add('upcoming-drives-text');
    headingDiv.append(...heading.childNodes);
    moveInstrumentation(heading, headingDiv);
    mainDiv.append(headingDiv);
  }

  const sliderSection = document.createElement('div');
  const prevButton = document.createElement('button');
  prevButton.classList.add('upcoming-drives-btn-slide', 'upcoming-drives-prev-slide');
  const prevIcon = document.createElement('img');
  prevIcon.src = '/content/dam/aemigrate/uploaded-folder/image/Group%20265%402x.png'; // Static asset
  prevIcon.alt = 'Previous';
  prevButton.append(prevIcon);
  sliderSection.append(prevButton);

  const upcomingDrivesContainer = document.createElement('div');
  upcomingDrivesContainer.classList.add('upcoming-drives-container');
  const upcomingDrivesSlider = document.createElement('div');
  upcomingDrivesSlider.classList.add('upcoming-drives-slider');
  const upcomingDrivesSliderTrack = document.createElement('ul');
  upcomingDrivesSliderTrack.classList.add('upcoming-drives-slider-track');

  const driveItems = block.querySelectorAll('[data-aue-model="drive"]');
  driveItems.forEach((drive) => {
    const driveItem = document.createElement('li');
    driveItem.classList.add('upcoming-drives-item-s');
    moveInstrumentation(drive, driveItem);

    const contentDiv = document.createElement('div');

    const image = drive.querySelector('[data-aue-prop="image"]');
    if (image) {
      const pic = createOptimizedPicture(image.src, image.alt);
      const imgElement = document.createElement('img');
      imgElement.src = pic.querySelector('img').src;
      imgElement.alt = pic.querySelector('img').alt;
      moveInstrumentation(image, imgElement);
      contentDiv.append(imgElement);
    }

    const title = drive.querySelector('[data-aue-prop="title"]');
    if (title) {
      const titleH3 = document.createElement('h3');
      titleH3.classList.add('upcoming-drives-item-title');
      titleH3.append(...title.childNodes);
      moveInstrumentation(title, titleH3);
      contentDiv.append(titleH3);
    }

    const subtitle = drive.querySelector('[data-aue-prop="subtitle"]');
    if (subtitle) {
      const subtitleH3 = document.createElement('h3');
      subtitleH3.classList.add('upcoming-drives-item-subtitle');
      subtitleH3.append(...subtitle.childNodes);
      moveInstrumentation(subtitle, subtitleH3);
      contentDiv.append(subtitleH3);
    }

    const description = drive.querySelector('[data-aue-prop="description"]');
    if (description) {
      const descriptionP = document.createElement('p');
      descriptionP.classList.add('upcoming-drives-item-description');
      descriptionP.append(...description.childNodes);
      moveInstrumentation(description, descriptionP);
      contentDiv.append(descriptionP);
    }

    driveItem.append(contentDiv);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('upcoming-drives-cta');
    ctaLink.href = 'javascript:void(0)'; // Placeholder for actual link
    ctaLink.rel = 'no-follow';

    const ctaText = drive.querySelector('[data-aue-prop="ctaText"]');
    if (ctaText) {
      const ctaTextP = document.createElement('p');
      ctaTextP.classList.add('upcoming-drives-cta-text');
      ctaTextP.append(...ctaText.childNodes);
      moveInstrumentation(ctaText, ctaTextP);
      ctaLink.append(ctaTextP);
    }

    const ctaIcon = drive.querySelector('[data-aue-prop="ctaIcon"]');
    if (ctaIcon) {
      const ctaIconPic = createOptimizedPicture(ctaIcon.src, ctaIcon.alt);
      const ctaIconImg = document.createElement('img');
      ctaIconImg.src = ctaIconPic.querySelector('img').src;
      ctaIconImg.alt = ctaIconPic.querySelector('img').alt;
      moveInstrumentation(ctaIcon, ctaIconImg);
      ctaLink.append(ctaIconImg);
    }

    driveItem.append(ctaLink);
    upcomingDrivesSliderTrack.append(driveItem);
  });

  upcomingDrivesSlider.append(upcomingDrivesSliderTrack);
  upcomingDrivesContainer.append(upcomingDrivesSlider);
  sliderSection.append(upcomingDrivesContainer);

  const nextButton = document.createElement('button');
  nextButton.classList.add('upcoming-drives-btn-slide', 'upcoming-drives-next-slide');
  const nextIcon = document.createElement('img');
  nextIcon.src = '/content/dam/aemigrate/uploaded-folder/image/Group%20265%402x%20-%20Copy.png'; // Static asset
  nextIcon.alt = 'Next';
  nextButton.append(nextIcon);
  sliderSection.append(nextButton);

  mainDiv.append(sliderSection);

  block.innerHTML = '';
  block.append(mainDiv);
}
