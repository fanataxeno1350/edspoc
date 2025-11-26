import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const image = block.querySelector('[data-aue-prop="image"]');
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');
  const ctaHref = block.querySelector('[data-aue-prop="ctaHref"]');

  const section = document.createElement('section');
  section.className = 'text-and-media-section';

  // Scarp Image (decorative)
  if (image) {
    const scarpImg = document.createElement('img');
    scarpImg.className = 'text-and-media-scarp fade-in';
    scarpImg.setAttribute('data-fade-in', '');
    scarpImg.setAttribute('is-animated', 'true');
    scarpImg.setAttribute('data-is-reverse', 'true');
    scarpImg.setAttribute('loading', 'lazy');

    const authoredImg = image.querySelector('img');
    if (authoredImg) {
      scarpImg.src = authoredImg.src;
      scarpImg.alt = authoredImg.alt;
      scarpImg.setAttribute('aria-label', authoredImg.alt);
      moveInstrumentation(authoredImg, scarpImg);
    }
    section.append(scarpImg);
  }

  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.className = 'text-and-media-component';
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.setAttribute('data-is-reverse', 'true');

  const imageContainer = document.createElement('div');
  imageContainer.className = 'text-and-media-image-container animate-image-container-up-fade in-viewport slide-up';
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  const pictureContainer = document.createElement('picture');
  pictureContainer.className = 'text-and-media-image-container-picture';

  if (image) {
    const authoredImg = image.querySelector('img');
    if (authoredImg) {
      const pic = createOptimizedPicture(authoredImg.src, authoredImg.alt);
      pic.querySelector('img').className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
      pic.querySelector('img').setAttribute('role', 'img');
      moveInstrumentation(authoredImg, pic.querySelector('img'));
      pictureContainer.append(...pic.children);
    }
  }

  imageContainer.append(pictureContainer);
  textAndMediaComponent.append(imageContainer);

  const content = document.createElement('div');
  content.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';
  const slideUp = document.createElement('div');
  slideUp.setAttribute('data-slide-type', 'slide-up');
  slideUp.className = 'slide-up';

  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.className = 'text-and-media-content-title';
  titleDiv.setAttribute('tabindex', '0');
  if (title) {
    titleDiv.append(...title.childNodes);
    moveInstrumentation(title, titleDiv);
  }
  slideUp.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'text-and-media-content-description';
  descriptionDiv.setAttribute('tabindex', '0');
  if (description) {
    descriptionDiv.append(...description.childNodes);
    moveInstrumentation(description, descriptionDiv);
  }
  slideUp.append(descriptionDiv);

  const ctaLink = document.createElement('a');
  ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta ';
  ctaLink.setAttribute('target', '_self');

  if (ctaHref) {
    ctaLink.href = ctaHref.textContent;
    moveInstrumentation(ctaHref, ctaLink);
  }
  if (ctaLabel) {
    ctaLink.setAttribute('aria-label', ctaLabel.textContent);
    const iconSpan = document.createElement('span');
    iconSpan.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    ctaLink.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'text-and-media-cta-label';
    labelSpan.append(...ctaLabel.childNodes);
    moveInstrumentation(ctaLabel, labelSpan);
    ctaLink.append(labelSpan);
  }
  slideUp.append(ctaLink);

  slideWrap.append(slideUp);
  content.append(slideWrap);
  textAndMediaComponent.append(content);

  const overflowFix = document.createElement('div');
  overflowFix.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFix);

  section.append(textAndMediaComponent);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
