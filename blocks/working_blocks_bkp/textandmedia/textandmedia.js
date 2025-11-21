import { createOptimizedPicture } from '../../../scripts/aem.js';
import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const textAndMediaSection = document.createElement('section');
  moveInstrumentation(block, textAndMediaSection);
  textAndMediaSection.classList.add('text-and-media-section');

  const textAndMediaComponent = document.createElement('div');
  textAndMediaComponent.classList.add('text-and-media-component');
  textAndMediaComponent.setAttribute('data-cmp-is', 'text-and-media');
  textAndMediaComponent.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMediaComponent.style.overflow = 'hidden';
  textAndMediaComponent.setAttribute('is-animated', 'true');
  textAndMediaComponent.setAttribute('data-is-reverse', 'true');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('text-and-media-image-container', 'animate-image-container-up-fade', 'in-viewport', 'slide-up');
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');
  textAndMediaComponent.append(imageContainer);

  const picture = document.createElement('picture');
  picture.classList.add('text-and-media-image-container-picture');
  imageContainer.append(picture);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-and-media-content', 'in-viewport');
  textAndMediaComponent.append(contentDiv);

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');
  contentDiv.append(slideWrap);

  const slideUpDiv = document.createElement('div');
  slideUpDiv.setAttribute('data-slide-type', 'slide-up');
  slideUpDiv.classList.add('slide-up');
  slideWrap.append(slideUpDiv);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');
  textAndMediaComponent.append(overflowFix);

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{
          media: '(min-width: 600px)',
          width: '2000',
        }, {
          width: '750',
        }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));

        const source = document.createElement('source');
        source.setAttribute('srcset', `https://s7g10.scene7.com/is/image/qic/${img.src.split('/').pop().split('.')[0]}?w=500&h=400`);
        source.setAttribute('type', 'image/webp');
        picture.append(source);

        const imgElement = optimizedPic.querySelector('img');
        imgElement.classList.add('text-and-media-image-container-image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
        imgElement.setAttribute('role', 'img');
        picture.append(imgElement);

        const scarpImg = document.createElement('img');
        scarpImg.classList.add('text-and-media-scarp', 'fade-in');
        scarpImg.setAttribute('data-fade-in', '');
        scarpImg.src = img.src;
        scarpImg.alt = img.alt;
        scarpImg.setAttribute('loading', 'lazy');
        scarpImg.setAttribute('aria-label', img.alt);
        scarpImg.setAttribute('is-animated', 'true');
        scarpImg.setAttribute('data-is-reverse', 'true');
        textAndMediaSection.prepend(scarpImg);
      }
    }

    // Title
    const titleCell = cells[1];
    if (titleCell) {
      const titleDiv = document.createElement('div');
      titleDiv.id = 'text-and-media-title';
      titleDiv.classList.add('text-and-media-content-title');
      titleDiv.setAttribute('tabindex', '0');
      titleDiv.innerHTML = titleCell.innerHTML;
      slideUpDiv.append(titleDiv);
    }

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('text-and-media-content-description');
      descriptionDiv.setAttribute('tabindex', '0');
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      slideUpDiv.append(descriptionDiv);
    }

    // CTA
    const ctaLabelCell = cells[3];
    const ctaUrlCell = cells[4];
    if (ctaLabelCell && ctaUrlCell) {
      const ctaLink = document.createElement('a');
      ctaLink.href = ctaUrlCell.textContent.trim();
      ctaLink.classList.add('text-and-media-cta', 'cta__primary', 'text-and-media-content-cta');
      ctaLink.setAttribute('target', '_self');
      ctaLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());

      const iconSpan = document.createElement('span');
      iconSpan.classList.add('text-and-media-cta-icon', 'qd-icon', 'qd-icon--cheveron-right');
      iconSpan.setAttribute('aria-hidden', 'true');
      ctaLink.append(iconSpan);

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('text-and-media-cta-label');
      labelSpan.textContent = ctaLabelCell.textContent.trim();
      ctaLink.append(labelSpan);

      slideUpDiv.append(ctaLink);
    }
  });

  textAndMediaSection.append(textAndMediaComponent);
  block.textContent = '';
  block.append(textAndMediaSection);
}
