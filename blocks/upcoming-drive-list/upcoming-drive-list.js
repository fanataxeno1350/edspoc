import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const upcomingDriveSectionContainer = document.createElement('section');
  upcomingDriveSectionContainer.classList.add('upcoming-drive-section-container', 'homeSlot');
  upcomingDriveSectionContainer.id = 'upcomingDrive';

  const backcoverImage = block.querySelector('div:first-child > div:first-child img');
  if (backcoverImage) {
    const optimizedBackcover = createOptimizedPicture(backcoverImage.src, backcoverImage.alt || 'backcover');
    const imgElement = optimizedBackcover.querySelector('img');
    imgElement.classList.add('upcoming-drive-section-backcover');
    upcomingDriveSectionContainer.append(optimizedBackcover);
    moveInstrumentation(backcoverImage, imgElement);
  }

  const upcomingDriveUptext = document.createElement('div');
  upcomingDriveUptext.classList.add('upcoming-drive-section-uptext');
  const uptextContent = block.querySelector('div:first-child > div:nth-child(2)');
  if (uptextContent) {
    upcomingDriveUptext.append(...uptextContent.childNodes);
    moveInstrumentation(uptextContent, upcomingDriveUptext);
  }
  upcomingDriveSectionContainer.append(upcomingDriveUptext);

  const upcomingDriveSectionWrapper = document.createElement('div');
  upcomingDriveSectionWrapper.classList.add('upcoming-drive-section-wrapper');

  const prevButton = document.createElement('button');
  prevButton.classList.add('upcoming-drive-section-btn-slide', 'upcoming-drive-section-prev-slide');
  const prevButtonImg = block.querySelector('div:first-child > div:nth-child(3) > div:first-child img');
  if (prevButtonImg) {
    const optimizedPrevButtonImg = createOptimizedPicture(prevButtonImg.src, prevButtonImg.alt || '');
    const imgElement = optimizedPrevButtonImg.querySelector('img');
    prevButton.append(imgElement);
    moveInstrumentation(prevButtonImg, imgElement);
  }
  upcomingDriveSectionWrapper.append(prevButton);

  const upcomingDriveSectionSliderContainer = document.createElement('div');
  upcomingDriveSectionSliderContainer.classList.add('upcoming-drive-section-slider-container');

  const upcomingDriveSectionSlider = document.createElement('div');
  upcomingDriveSectionSlider.classList.add('upcoming-drive-section-slider');

  const upcomingDriveSectionSliderTrack = document.createElement('ul');
  upcomingDriveSectionSliderTrack.classList.add('upcoming-drive-section-slider-track');

  const upcomingDriveItems = block.querySelectorAll('[data-aue-label="Upcoming-Drive-Item"]');
  upcomingDriveItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('upcoming-drive-section-item-s');
    moveInstrumentation(item, li);

    const contentDiv = document.createElement('div');

    const image = item.querySelector('[data-aue-prop="image"] img');
    if (image) {
      const optimizedImage = createOptimizedPicture(image.src, image.alt || '');
      const imgElement = optimizedImage.querySelector('img');
      contentDiv.append(imgElement);
      moveInstrumentation(image, imgElement);
    }

    const title = item.querySelector('[data-aue-prop="title"]');
    if (title) {
      const h3Red = document.createElement('h3');
      h3Red.classList.add('upcoming-drive-section-h3-red');
      h3Red.append(...title.childNodes);
      contentDiv.append(h3Red);
      moveInstrumentation(title, h3Red);
    }

    const subtitle = item.querySelector('[data-aue-prop="subtitle"]');
    if (subtitle) {
      const h3Small = document.createElement('h3');
      h3Small.classList.add('upcoming-drive-section-h3-small');
      h3Small.append(...subtitle.childNodes);
      contentDiv.append(h3Small);
      moveInstrumentation(subtitle, h3Small);
    }

    const description = item.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement('p');
      p.append(...description.childNodes);
      contentDiv.append(p);
      moveInstrumentation(description, p);
    }
    li.append(contentDiv);

    const cta = document.createElement('a');
    cta.classList.add('upcoming-drive-section-cta');
    cta.href = 'javascript:void(0)'; // Default href
    cta.rel = 'no-follow';

    const ctaText = item.querySelector('[data-aue-prop="ctaText"]');
    if (ctaText) {
      const p = document.createElement('p');
      p.append(...ctaText.childNodes);
      cta.append(p);
      moveInstrumentation(ctaText, p);
    }

    const ctaIcon = item.querySelector('[data-aue-prop="ctaIcon"] img');
    if (ctaIcon) {
      const optimizedCtaIcon = createOptimizedPicture(ctaIcon.src, ctaIcon.alt || '');
      const imgElement = optimizedCtaIcon.querySelector('img');
      cta.append(imgElement);
      moveInstrumentation(ctaIcon, imgElement);
    }
    li.append(cta);
    upcomingDriveSectionSliderTrack.append(li);
  });

  upcomingDriveSectionSlider.append(upcomingDriveSectionSliderTrack);
  upcomingDriveSectionSliderContainer.append(upcomingDriveSectionSlider);
  upcomingDriveSectionWrapper.append(upcomingDriveSectionSliderContainer);

  const nextButton = document.createElement('button');
  nextButton.classList.add('upcoming-drive-section-btn-slide', 'upcoming-drive-section-next-slide');
  const nextButtonImg = block.querySelector('div:first-child > div:nth-child(3) > div:nth-child(3) img');
  if (nextButtonImg) {
    const optimizedNextButtonImg = createOptimizedPicture(nextButtonImg.src, nextButtonImg.alt || '');
    const imgElement = optimizedNextButtonImg.querySelector('img');
    nextButton.append(imgElement);
    moveInstrumentation(nextButtonImg, imgElement);
  }
  upcomingDriveSectionWrapper.append(nextButton);

  upcomingDriveSectionContainer.append(upcomingDriveSectionWrapper);

  block.innerHTML = '';
  block.append(upcomingDriveSectionContainer);
}
