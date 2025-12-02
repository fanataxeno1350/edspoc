import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blogListingWrapper = document.createElement('div');
  blogListingWrapper.classList.add('bloglisting-wrapper');
  moveInstrumentation(block, blogListingWrapper);

  block.querySelectorAll('[data-aue-model="blogItem"]').forEach((blogItem) => {
    const blogSectionWrapper = document.createElement('div');
    blogSectionWrapper.classList.add('bloglisting-section--wrapper');
    moveInstrumentation(blogItem, blogSectionWrapper);

    const blogSectionWrapperInner = document.createElement('div');
    blogSectionWrapperInner.classList.add('bloglisting-section--wrapper-inner', 'bloglisting-position-relative');

    const linkElement = blogItem.querySelector('[data-aue-prop="link"]');
    let anchor = linkElement ? linkElement.querySelector('a') : null;
    if (!anchor) {
      anchor = document.createElement('a');
      anchor.href = '#'; // Default href if not found
    }
    anchor.classList.add('bloglisting-text-decoration-none');
    moveInstrumentation(linkElement || blogItem, anchor);

    const blogWrapper = document.createElement('div');
    blogWrapper.classList.add('bloglisting-section--blog-wrapper', 'bloglisting-blog-wrapper');

    const imageContainer = document.createElement('div');
    const imgElement = blogItem.querySelector('[data-aue-prop="image"] img');
    if (imgElement) {
      const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
      pic.classList.add('bloglisting-w-100', 'bloglisting-blog-wrapper--img');
      imageContainer.append(pic);
      moveInstrumentation(imgElement, pic.querySelector('img'));
    } else {
      // Handle case where image might be in an <a> tag or not present
      const imgAnchor = blogItem.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (imgAnchor) {
        const img = document.createElement('img');
        img.src = imgAnchor.href;
        img.alt = imgAnchor.title || '';
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('bloglisting-w-100', 'bloglisting-blog-wrapper--img');
        imageContainer.append(pic);
        moveInstrumentation(imgAnchor, pic.querySelector('img'));
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('bloglisting-blog-wrapper--content');

    const dateElement = document.createElement('div');
    dateElement.classList.add('bloglisting-blog-date', 'bloglisting-boing--text__heading-6');
    const dateProp = blogItem.querySelector('[data-aue-prop="date"]');
    const daysAgoProp = blogItem.querySelector('[data-aue-prop="daysAgo"]');

    if (dateProp) {
      dateElement.setAttribute('data-date', dateProp.textContent.trim());
      moveInstrumentation(dateProp, dateElement);
    }
    if (daysAgoProp) {
      dateElement.append(...daysAgoProp.childNodes);
      moveInstrumentation(daysAgoProp, dateElement);
    }

    const titleElement = document.createElement('div');
    titleElement.classList.add('bloglisting-blog-title', 'bloglisting-boing--text__heading-2');
    const titleProp = blogItem.querySelector('[data-aue-prop="title"]');
    if (titleProp) {
      titleElement.append(...titleProp.childNodes);
      moveInstrumentation(titleProp, titleElement);
    }

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('bloglisting-blog-desc', 'bloglisting-boing--text__body-2', 'bloglisting-blog-desc-clamp');
    const descriptionProp = blogItem.querySelector('[data-aue-prop="description"]');
    if (descriptionProp) {
      descriptionElement.append(...descriptionProp.childNodes);
      moveInstrumentation(descriptionProp, descriptionElement);
    }

    const readMoreSpan = document.createElement('span');
    readMoreSpan.classList.add('bloglisting-read-more-btn');
    readMoreSpan.textContent = 'Read more...';

    contentWrapper.append(dateElement, titleElement, descriptionElement, readMoreSpan);
    blogWrapper.append(imageContainer, contentWrapper);
    anchor.append(blogWrapper);
    blogSectionWrapperInner.append(anchor);
    blogSectionWrapper.append(blogSectionWrapperInner);
    blogListingWrapper.append(blogSectionWrapper);
  });

  const observerElement = document.createElement('div');
  observerElement.classList.add('bloglisting-observer-element', 'bloglisting-spinner-container', 'bloglisting-d-flex', 'bloglisting-justify-content-center');

  const spinner = document.createElement('div');
  spinner.classList.add('bloglisting-card-load-spinner', 'bloglisting-boing-spinner');
  observerElement.append(spinner);

  block.innerHTML = '';
  block.append(blogListingWrapper, observerElement);

  // Transfer data attributes from the original block to the new main wrapper
  const dataAttributes = [
    'data-card-limit',
    'data-path',
    'data-offset',
    'data-order',
    'data-days-text',
    'data-day-text',
    'data-months-text',
    'data-month-text',
    'data-years-text',
    'data-year-text',
  ];

  dataAttributes.forEach(attr => {
    if (block.hasAttribute(attr)) {
      blogListingWrapper.setAttribute(attr, block.getAttribute(attr));
    }
  });
}