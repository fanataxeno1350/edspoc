import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const image = block.querySelector('div:nth-child(1) > div');
  const title = block.querySelector('div:nth-child(2) > div');
  const description = block.querySelector('div:nth-child(3) > div');
  const ctaLabel = block.querySelector('div:nth-child(4) > div');
  const ctaUrl = block.querySelector('div:nth-child(5) > div');

  const section = document.createElement('section');
  section.className = 'text-and-media-section';

  if (image && image.querySelector('img')) {
    const imgElement = image.querySelector('img');
    const scarpImg = createOptimizedPicture(imgElement.src, imgElement.alt);
    moveInstrumentation(imgElement, scarpImg.querySelector('img'));
    scarpImg.querySelector('img').className = 'text-and-media-scarp fade-in';
    scarpImg.querySelector('img').setAttribute('data-fade-in', '');
    scarpImg.querySelector('img').setAttribute('loading', 'lazy');
    scarpImg.querySelector('img').setAttribute('aria-label', imgElement.alt);
    scarpImg.querySelector('img').setAttribute('is-animated', 'true');
    scarpImg.querySelector('img').setAttribute('data-is-reverse', 'true');
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

  if (image && image.querySelector('picture')) {
    const pictureElement = image.querySelector('picture');
    const optimizedPicture = createOptimizedPicture(pictureElement.querySelector('img').src, pictureElement.querySelector('img').alt);
    moveInstrumentation(pictureElement.querySelector('img'), optimizedPicture.querySelector('img'));
    optimizedPicture.className = 'text-and-media-image-container-picture';

    const source = document.createElement('source');
    source.srcset = pictureElement.querySelector('source').srcset;
    source.type = pictureElement.querySelector('source').type;
    optimizedPicture.prepend(source);

    optimizedPicture.querySelector('img').className = 'text-and-media-image-container-image layout-portrait animate-image-zoom-out in-viewport';
    optimizedPicture.querySelector('img').setAttribute('loading', 'lazy');
    optimizedPicture.querySelector('img').setAttribute('role', 'img');
    imageContainer.append(optimizedPicture);
  }
  textAndMediaComponent.append(imageContainer);

  const contentDiv = document.createElement('div');
  contentDiv.className = 'text-and-media-content in-viewport';

  const slideWrap = document.createElement('div');
  slideWrap.className = 'slide-wrap';

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.className = 'slide-up';

  if (title) {
    const titleDiv = document.createElement('div');
    titleDiv.id = 'text-and-media-title';
    titleDiv.className = 'text-and-media-content-title';
    titleDiv.setAttribute('tabindex', '0');
    titleDiv.innerHTML = title.innerHTML;
    slideUpDiv.append(titleDiv);
  }

  if (description) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'text-and-media-content-description';
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.innerHTML = description.innerHTML;
    slideUpDiv.append(descriptionDiv);
  }

  if (ctaLabel && ctaUrl) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaUrl.textContent.trim();
    ctaLink.className = 'text-and-media-cta cta__primary text-and-media-content-cta ';
    ctaLink.target = '_self';
    ctaLink.setAttribute('aria-label', ctaLabel.textContent.trim());

    const iconSpan = document.createElement('span');
    iconSpan.className = 'text-and-media-cta-icon qd-icon qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    ctaLink.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'text-and-media-cta-label';
    labelSpan.textContent = ctaLabel.textContent.trim();
    ctaLink.append(labelSpan);

    slideUpDiv.append(ctaLink);
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
