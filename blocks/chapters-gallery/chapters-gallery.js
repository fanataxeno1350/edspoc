import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const desktopTitleContainer = block.querySelector('[data-aue-prop="desktopTitle"]');
  const mobileTitleContainer = block.querySelector('[data-aue-prop="mobileTitle"]');
  const descriptionContainer = block.querySelector('[data-aue-prop="description"]');
  const ctaLinkContainer = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaImageContainer = block.querySelector('[data-aue-prop="ctaImage"]');

  const section = document.createElement('section');
  section.classList.add('chapters-section', 'chapters-homeSlot');

  // Desktop Title
  if (desktopTitleContainer) {
    const desktopHead = document.createElement('div');
    desktopHead.classList.add('chapters-chapter_head', 'chapters-for_desk_view');
    desktopHead.innerHTML = 'Previous chapters of ';

    const suvBack = document.createElement('span');
    suvBack.classList.add('chapters-suv_back');
    suvBack.append(...desktopTitleContainer.childNodes);
    moveInstrumentation(desktopTitleContainer, suvBack);

    desktopHead.append(suvBack);
    section.append(desktopHead);
  }

  // Mobile Title
  if (mobileTitleContainer) {
    const mobileHead = document.createElement('div');
    mobileHead.classList.add('chapters-chapter_head', 'chapters-for_phone_view');
    mobileHead.append(...mobileTitleContainer.childNodes);
    moveInstrumentation(mobileTitleContainer, mobileHead);
    section.append(mobileHead);
  }

  // Description
  if (descriptionContainer) {
    const p = document.createElement('p');
    p.append(...descriptionContainer.childNodes);
    moveInstrumentation(descriptionContainer, p);
    section.append(p);
  }

  // Gallery Images
  const sliderGallery = document.createElement('div');
  sliderGallery.classList.add('chapters-sliderGallery');

  const chaptersGallery = document.createElement('div');
  chaptersGallery.classList.add('chapters-chapters_gallery');

  const imageItems = block.querySelectorAll('[data-aue-model="chapterImage"]');
  imageItems.forEach((item) => {
    const imageSrc = item.querySelector('[data-aue-prop="image"]');
    const altText = item.querySelector('[data-aue-prop="alt"]');

    if (imageSrc) {
      const chapDiv = document.createElement('div');
      chapDiv.classList.add('chapters-chapp');
      chapDiv.style.cursor = 'pointer';
      chapDiv.setAttribute('data-fancybox', 'highlights-gallery');

      let imgElement = imageSrc.querySelector('img');
      if (!imgElement) {
        const anchor = imageSrc.querySelector('a');
        if (anchor && anchor.href) {
          imgElement = document.createElement('img');
          imgElement.src = anchor.href;
          imgElement.alt = altText ? altText.textContent : '';
        }
      }

      if (imgElement) {
        chapDiv.href = imgElement.src;
        const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
        chapDiv.append(pic);
        moveInstrumentation(imageSrc, pic.querySelector('img'));
      }
      chaptersGallery.append(chapDiv);
    }
    item.remove(); // Remove the original authored item after processing
  });

  sliderGallery.append(chaptersGallery);
  section.append(sliderGallery);

  // CTA Link and Image
  if (ctaLinkContainer || ctaImageContainer) {
    const cta = document.createElement('a');
    cta.classList.add('chapters-cta', 'chapters-open_galery', 'chapters-ctaaa');
    cta.href = 'javascript:void(0)'; // Default to void
    cta.rel = 'no-follow';

    if (ctaLinkContainer) {
      const link = ctaLinkContainer.querySelector('a');
      if (link) {
        cta.href = link.href;
        const p = document.createElement('p');
        p.append(...link.childNodes);
        moveInstrumentation(link, p);
        cta.append(p);
      } else {
        const p = document.createElement('p');
        p.append(...ctaLinkContainer.childNodes);
        moveInstrumentation(ctaLinkContainer, p);
        cta.append(p);
      }
    }

    if (ctaImageContainer) {
      let imgElement = ctaImageContainer.querySelector('img');
      if (!imgElement) {
        const anchor = ctaImageContainer.querySelector('a');
        if (anchor && anchor.href) {
          imgElement = document.createElement('img');
          imgElement.src = anchor.href;
          imgElement.alt = ''; // Alt text might not be available directly for CTA image
        }
      }
      if (imgElement) {
        const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
        cta.append(pic);
        moveInstrumentation(ctaImageContainer, pic.querySelector('img'));
      }
    }
    section.append(cta);
  }

  block.innerHTML = '';
  block.append(section);
}
