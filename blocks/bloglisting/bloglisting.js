import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bloglistingWrapper = document.createElement('div');
  bloglistingWrapper.classList.add('bloglisting-wrapper');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');

  blogCards.forEach((card) => {
    const blogSectionWrapper = document.createElement('div');
    blogSectionWrapper.classList.add('bloglisting-section--wrapper');
    moveInstrumentation(card, blogSectionWrapper);

    const innerWrapperDiv = document.createElement('div');
    const innerWrapperInnerDiv = document.createElement('div');
    innerWrapperInnerDiv.classList.add('bloglisting-section--wrapper-inner', 'bloglisting-position-relative');
    innerWrapperDiv.append(innerWrapperInnerDiv);

    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const anchor = document.createElement('a');
    anchor.classList.add('bloglisting-text-decoration-none');
    if (linkElement) {
      anchor.href = linkElement.href || '';
      moveInstrumentation(linkElement, anchor);
    }
    anchor.target = '_self';

    const blogWrapper = document.createElement('div');
    blogWrapper.classList.add('bloglisting-section--blog-wrapper', 'bloglisting-blog-wrapper');

    const imageContainer = document.createElement('div');
    const imgElement = card.querySelector('[data-aue-prop="image"]');
    if (imgElement) {
      const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
      pic.classList.add('bloglisting-w-100', 'bloglisting-blog-wrapper--img');
      imageContainer.append(pic);
      moveInstrumentation(imgElement, pic.querySelector('img'));
    }
    blogWrapper.append(imageContainer);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('bloglisting-blog-wrapper--content');

    const dateElement = document.createElement('div');
    dateElement.classList.add('bloglisting-blog-date', 'bloglisting-boing--text__heading-6');
    const dateProp = card.querySelector('[data-aue-prop="date"]');
    if (dateProp) {
      dateElement.setAttribute('data-date', dateProp.textContent.trim());
      moveInstrumentation(dateProp, dateElement);
    }
    const dateTextProp = card.querySelector('[data-aue-prop="dateText"]');
    if (dateTextProp) {
      dateElement.append(dateTextProp);
      moveInstrumentation(dateTextProp, dateElement);
    }
    contentWrapper.append(dateElement);

    const titleElement = document.createElement('div');
    titleElement.classList.add('bloglisting-blog-title', 'bloglisting-boing--text__heading-2');
    const titleProp = card.querySelector('[data-aue-prop="title"]');
    if (titleProp) {
      titleElement.append(...titleProp.childNodes);
      moveInstrumentation(titleProp, titleElement);
    }
    contentWrapper.append(titleElement);

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('bloglisting-blog-desc', 'bloglisting-boing--text__body-2', 'bloglisting-blog-desc-clamp');
    const descriptionProp = card.querySelector('[data-aue-prop="description"]');
    if (descriptionProp) {
      descriptionElement.append(...descriptionProp.childNodes);
      moveInstrumentation(descriptionProp, descriptionElement);
    }
    contentWrapper.append(descriptionElement);

    const readMoreSpan = document.createElement('span');
    readMoreSpan.classList.add('bloglisting-read-more-btn');
    readMoreSpan.textContent = 'Read more...';
    contentWrapper.append(readMoreSpan);

    blogWrapper.append(contentWrapper);
    anchor.append(blogWrapper);
    innerWrapperInnerDiv.append(anchor);
    blogSectionWrapper.append(innerWrapperDiv);
    bloglistingWrapper.append(blogSectionWrapper);
  });

  block.innerHTML = '';
  block.append(bloglistingWrapper);

  // Re-append the observer element if it exists in the original block
  const observerElement = block.querySelector('.bloglisting-observer-element');
  if (observerElement) {
    block.append(observerElement);
  }
}
