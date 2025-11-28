import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rootSection = document.createElement('section');
  rootSection.className = 'text-and-media-section';

  const mainImageElement = block.querySelector('[data-aue-prop="mainImage"]');
  let authoredMainImg = null;
  if (mainImageElement) {
    authoredMainImg = mainImageElement.querySelector('img');
  }

  if (authoredMainImg) {
    const scarpImg = document.createElement('img');
    scarpImg.className = 'text-and-media-scarp fade-in';
    scarpImg.setAttribute('data-fade-in', '');
    scarpImg.setAttribute('is-animated', 'true');
    scarpImg.setAttribute('data-is-reverse', 'true');
    scarpImg.setAttribute('loading', 'lazy');
    scarpImg.src = authoredMainImg.src;
    scarpImg.alt = authoredMainImg.alt;
    scarpImg.setAttribute('aria-label', authoredMainImg.alt);
    moveInstrumentation(authoredMainImg, scarpImg);
    rootSection.append(scarpImg);
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

  const picture = document.createElement('picture');
  picture.className = 'text-and-media-image-container-picture';

  if (authoredMainImg) {
    const optimizedPic = createOptimizedPicture(authoredMainImg.src, authoredMainImg.alt);
    const source = optimizedPic.querySelector('source');
    const img = optimizedPic.querySelector('img');

    if (source) {
      source.setAttribute('srcset', `https://s7g10.scene7.com/is/image/qic/${authoredMainImg.src.split('/').pop()}?w=500&h=400`);
      source.setAttribute('type', 'image/webp');
      picture.append(source);
    }

    if (img) {
      img.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
      img.setAttribute('role', 'img');
      img.setAttribute('loading', 'lazy');
      picture.append(img);
      moveInstrumentation(authoredMainImg, img);
    }
  } else {
    // Fallback if no authored image, create an empty structure to maintain integrity
    const fallbackSource = document.createElement('source');
    fallbackSource.setAttribute('type', 'image/webp');
    picture.append(fallbackSource);

    const fallbackImg = document.createElement('img');
    fallbackImg.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
    fallbackImg.setAttribute('role', 'img');
    fallbackImg.setAttribute('loading', 'lazy');
    picture.append(fallbackImg);
  }

  imageContainer.append(picture);
  textAndMediaComponent.append(imageContainer);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';
  const slideUp = document.createElement('div');
  slideUp.setAttribute('data-slide-type', 'slide-up');
  slideUp.className = 'slide-up';

  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.className = 'text-and-media-content-title';
  titleDiv.setAttribute('tabindex', '0');
  const authoredTitle = block.querySelector('[data-aue-prop="title"]');
  if (authoredTitle) {
    titleDiv.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, titleDiv);
  }
  slideUp.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'text-and-media-content-description';
  descriptionDiv.setAttribute('tabindex', '0');
  const authoredDescription = block.querySelector('[data-aue-prop="description"]');
  if (authoredDescription) {
    descriptionDiv.append(...authoredDescription.childNodes);
    moveInstrumentation(authoredDescription, descriptionDiv);
  }
  slideUp.append(descriptionDiv);

  const ctaLink = document.createElement('a');
  ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta';
  ctaLink.setAttribute('target', '_self');

  const authoredCtaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (authoredCtaLink) {
    ctaLink.href = authoredCtaLink.textContent.trim();
    moveInstrumentation(authoredCtaLink, ctaLink);
  }

  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');
  if (ctaLabel) {
    ctaLink.setAttribute('aria-label', ctaLabel.textContent.trim());
    const iconSpan = document.createElement('span');
    iconSpan.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    ctaLink.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'text-and-media-cta-label';
    labelSpan.textContent = ctaLabel.textContent.trim();
    ctaLink.append(labelSpan);
    moveInstrumentation(ctaLabel, labelSpan);
  }

  slideUp.append(ctaLink);
  slideWrap.append(slideUp);
  contentDiv.append(slideWrap);
  textAndMediaComponent.append(contentDiv);

  const overflowFix = document.createElement('div');
  overflowFix.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFix);

  rootSection.append(textAndMediaComponent);

  block.textContent = '';
  block.append(rootSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
