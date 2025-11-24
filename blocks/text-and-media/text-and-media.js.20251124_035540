import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const imageCell = block.querySelector('div:nth-child(1) > div');
  const titleCell = block.querySelector('div:nth-child(2) > div');
  const descriptionCell = block.querySelector('div:nth-child(3) > div');
  const ctaLinkCell = block.querySelector('div:nth-child(4) > div');
  const ctaLabelCell = block.querySelector('div:nth-child(5) > div');

  const image = imageCell ? imageCell.querySelector('img') : null;
  const title = titleCell ? titleCell.innerHTML : '';
  const description = descriptionCell ? descriptionCell.innerHTML : '';
  const ctaLink = ctaLinkCell ? ctaLinkCell.textContent.trim() : '';
  const ctaLabel = ctaLabelCell ? ctaLabelCell.textContent.trim() : '';

  const section = document.createElement('section');
  section.className = 'text-and-media-section';
  moveInstrumentation(block, section);

  if (image) {
    const scarpImg = createOptimizedPicture(image.src, image.alt);
    const scarpImgElement = scarpImg.querySelector('img');
    scarpImgElement.className = 'text-and-media-scarp fade-in';
    scarpImgElement.setAttribute('data-fade-in', '');
    scarpImgElement.setAttribute('loading', 'lazy');
    scarpImgElement.setAttribute('aria-label', image.alt);
    scarpImgElement.setAttribute('is-animated', 'true');
    scarpImgElement.setAttribute('data-is-reverse', 'true');
    moveInstrumentation(image, scarpImgElement);
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

  if (image) {
    const picture = document.createElement('picture');
    picture.className = 'text-and-media-image-container-picture';

    const source = document.createElement('source');
    source.setAttribute('srcset', image.src.replace('/content/dam/aemigrate', 'https://s7g10.scene7.com/is/image/qic').replace('.png', '?w=500&h=400'));
    source.setAttribute('type', 'image/webp');
    picture.append(source);

    const imgElement = createOptimizedPicture(image.src, image.alt).querySelector('img');
    imgElement.className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
    imgElement.setAttribute('loading', 'lazy');
    imgElement.setAttribute('role', 'img');
    moveInstrumentation(image, imgElement);
    picture.append(imgElement);
    imageContainer.append(picture);
  }
  textAndMediaComponent.append(imageContainer);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.className = 'slide-up';

  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.className = 'text-and-media-content-title';
  titleDiv.setAttribute('tabindex', '0');
  titleDiv.innerHTML = title;
  slideUpDiv.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.className = 'text-and-media-content-description';
  descriptionDiv.setAttribute('tabindex', '0');
  descriptionDiv.innerHTML = description;
  slideUpDiv.append(descriptionDiv);

  if (ctaLink && ctaLabel) {
    const cta = document.createElement('a');
    cta.href = ctaLink;
    cta.className = 'text-and-media-cta cta__primary text-and-media-content-cta ';
    cta.target = '_self';
    cta.setAttribute('aria-label', ctaLabel);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    cta.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'text-and-media-cta-label';
    labelSpan.textContent = ctaLabel;
    cta.append(labelSpan);
    slideUpDiv.append(cta);
  }

  slideWrap.append(slideUpDiv);
  contentDiv.append(slideWrap);
  textAndMediaComponent.append(contentDiv);

  const overflowFixDiv = document.createElement('div');
  overflowFixDiv.className = 'text-and-media-overflow-fix';
  textAndMediaComponent.append(overflowFixDiv);

  section.append(textAndMediaComponent);

  block.textContent = '';
  block.append(section);
}
