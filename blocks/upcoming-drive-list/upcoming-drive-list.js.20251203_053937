import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('upcoming-drive-section-container', 'homeSlot');
  sectionContainer.id = 'upcomingDrive';

  // First row: Background Image
  const backgroundRow = block.children[0];
  if (backgroundRow) {
    const backgroundPicContainer = document.createElement('div');
    moveInstrumentation(backgroundRow, backgroundPicContainer);
    const img = backgroundRow.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('upcoming-drive-section-backcover');
      moveInstrumentation(img, pic.querySelector('img'));
      backgroundPicContainer.append(pic);
      sectionContainer.append(backgroundPicContainer);
    } else {
      // If no img, append the original content to avoid loss
      sectionContainer.append(...backgroundRow.childNodes);
    }
  }

  // Second row: Upcoming Drives text
  const upcomingDrivesTextRow = block.children[1];
  if (upcomingDrivesTextRow) {
    const upTextDiv = document.createElement('div');
    upTextDiv.classList.add('upcoming-drive-section-uptext');
    moveInstrumentation(upcomingDrivesTextRow, upTextDiv);
    upTextDiv.append(...upcomingDrivesTextRow.childNodes);
    sectionContainer.append(upTextDiv);
  }

  // Wrapper for slider and buttons
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('upcoming-drive-section-wrapper');

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add('upcoming-drive-section-btn-slide', 'upcoming-drive-section-prev-slide');
  const prevButtonImg = document.createElement('img');
  prevButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/Group%20265%402x.png'; // Static asset
  prevButtonImg.alt = '';
  prevButton.append(prevButtonImg);
  wrapperDiv.append(prevButton);

  // Slider container
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('upcoming-drive-section-slider-container');

  const sliderDiv = document.createElement('div');
  sliderDiv.classList.add('upcoming-drive-section-slider');

  const sliderTrack = document.createElement('ul');
  sliderTrack.classList.add('upcoming-drive-section-slider-track');

  // Iterate over upcoming drive items
  const upcomingDriveItemsContainer = block.children[2]; // This row contains all upcoming drive items
  if (upcomingDriveItemsContainer) {
    const upcomingDriveItems = upcomingDriveItemsContainer.querySelectorAll('[data-aue-model="upcomingDrive"]');
    upcomingDriveItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.classList.add('upcoming-drive-section-item-s');
      moveInstrumentation(item, listItem);

      const contentDiv = document.createElement('div');
      listItem.append(contentDiv);

      // Image
      const imgElement = item.querySelector('[data-aue-prop="image"]');
      if (imgElement) {
        const img = imgElement.querySelector('img');
        if (img) {
          const pic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, pic.querySelector('img'));
          contentDiv.append(pic);
        } else {
          // If img is null, check for anchor with image reference
          const anchor = imgElement.querySelector('a');
          if (anchor && (anchor.href.endsWith('.webp') || anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif')) ) {
            const imgFromAnchor = document.createElement('img');
            imgFromAnchor.src = anchor.href;
            imgFromAnchor.alt = anchor.title || '';
            const pic = createOptimizedPicture(imgFromAnchor.src, imgFromAnchor.alt);
            moveInstrumentation(anchor, pic.querySelector('img')); // Transfer instrumentation from anchor to the new img
            contentDiv.append(pic);
          } else {
            contentDiv.append(...imgElement.childNodes);
          }
        }
      }

      // Title
      const titleElement = item.querySelector('[data-aue-prop="title"]');
      if (titleElement) {
        const h3Red = document.createElement('h3');
        h3Red.classList.add('upcoming-drive-section-h3-red');
        moveInstrumentation(titleElement, h3Red);
        h3Red.append(...titleElement.childNodes);
        contentDiv.append(h3Red);
      }

      // Subtitle
      const subtitleElement = item.querySelector('[data-aue-prop="subtitle"]');
      if (subtitleElement) {
        const h3Small = document.createElement('h3');
        h3Small.classList.add('upcoming-drive-section-h3-small');
        moveInstrumentation(subtitleElement, h3Small);
        h3Small.append(...subtitleElement.childNodes);
        contentDiv.append(h3Small);
      }

      // Description
      const descriptionElement = item.querySelector('[data-aue-prop="description"]');
      if (descriptionElement) {
        const p = document.createElement('p');
        moveInstrumentation(descriptionElement, p);
        p.append(...descriptionElement.childNodes);
        contentDiv.append(p);
      }

      // CTA
      const ctaAnchor = document.createElement('a');
      ctaAnchor.classList.add('upcoming-drive-section-cta');
      ctaAnchor.href = 'javascript:void(0)'; // Default href
      ctaAnchor.rel = 'no-follow';

      const ctaTextElement = item.querySelector('[data-aue-prop="ctaText"]');
      if (ctaTextElement) {
        const p = document.createElement('p');
        moveInstrumentation(ctaTextElement, p);
        p.append(...ctaTextElement.childNodes);
        ctaAnchor.append(p);
      }

      const ctaIconElement = item.querySelector('[data-aue-prop="ctaIcon"]');
      if (ctaIconElement) {
        const img = ctaIconElement.querySelector('img');
        if (img) {
          const pic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, pic.querySelector('img'));
          ctaAnchor.append(pic);
        } else {
          // If img is null, check for anchor with image reference
          const anchor = ctaIconElement.querySelector('a');
          if (anchor && (anchor.href.endsWith('.webp') || anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif') || anchor.href.endsWith('.svg')) ) {
            const imgFromAnchor = document.createElement('img');
            imgFromAnchor.src = anchor.href;
            imgFromAnchor.alt = anchor.title || '';
            const pic = createOptimizedPicture(imgFromAnchor.src, imgFromAnchor.alt);
            moveInstrumentation(anchor, pic.querySelector('img')); // Transfer instrumentation from anchor to the new img
            ctaAnchor.append(pic);
          } else {
            ctaAnchor.append(...ctaIconElement.childNodes);
          }
        }
      }
      listItem.append(ctaAnchor);
      sliderTrack.append(listItem);
    });
  }

  sliderDiv.append(sliderTrack);
  sliderContainer.append(sliderDiv);
  wrapperDiv.append(sliderContainer);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('upcoming-drive-section-btn-slide', 'upcoming-drive-section-next-slide');
  const nextButtonImg = document.createElement('img');
  nextButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/Group%20265%402x%20-%20Copy.png'; // Static asset
  nextButtonImg.alt = '';
  nextButton.append(nextButtonImg);
  wrapperDiv.append(nextButton);

  sectionContainer.append(wrapperDiv);

  block.innerHTML = '';
  block.append(sectionContainer);
}