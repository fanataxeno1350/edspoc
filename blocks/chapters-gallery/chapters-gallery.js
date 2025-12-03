import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('chapters-section', 'chapters-homeSlot');

  const titleDesktopDiv = document.createElement('div');
  titleDesktopDiv.classList.add('chapters-chapter_head', 'chapters-for_desk_view');
  const titleDesktopContent = block.children[0]?.querySelector('[data-aue-prop="titleDesktop"]');
  if (titleDesktopContent) {
    titleDesktopDiv.append(...titleDesktopContent.childNodes);
    moveInstrumentation(titleDesktopContent, titleDesktopDiv);
  }
  mainDiv.append(titleDesktopDiv);

  const titleMobileDiv = document.createElement('div');
  titleMobileDiv.classList.add('chapters-chapter_head', 'chapters-for_phone_view');
  const titleMobileContent = block.children[1]?.querySelector('[data-aue-prop="titleMobile"]');
  if (titleMobileContent) {
    titleMobileDiv.append(...titleMobileContent.childNodes);
    moveInstrumentation(titleMobileContent, titleMobileDiv);
  }
  mainDiv.append(titleMobileDiv);

  const descriptionP = document.createElement('p');
  const descriptionContent = block.children[2]?.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionP.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionP);
  }
  mainDiv.append(descriptionP);

  const sliderGalleryDiv = document.createElement('div');
  sliderGalleryDiv.classList.add('chapters-sliderGallery');

  const chaptersGalleryDiv = document.createElement('div');
  chaptersGalleryDiv.classList.add('chapters-chapters_gallery');

  const chaptersContainer = block.querySelector('[data-aue-prop="chapters"]');
  if (chaptersContainer) {
    Array.from(chaptersContainer.children).forEach((chapterItem) => {
      const chapterDiv = document.createElement('div');
      chapterDiv.classList.add('chapters-chapp');
      chapterDiv.style.cursor = 'pointer';
      chapterDiv.setAttribute('data-fancybox', 'highlights-gallery');
      moveInstrumentation(chapterItem, chapterDiv);

      let imageLink = chapterItem.querySelector('[data-aue-prop="image"]');
      if (!imageLink) {
        imageLink = chapterItem.querySelector('a[href$=".webp"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"]');
      }

      let imgSrc = '';
      if (imageLink) {
        imgSrc = imageLink.getAttribute('href') || imageLink.src;
        chapterDiv.setAttribute('href', imgSrc);
      }

      const altTextElement = chapterItem.querySelector('[data-aue-prop="alt"]');
      const altText = altTextElement ? altTextElement.textContent : '';

      if (imgSrc) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = altText;
        chapterDiv.append(img);
        if (imageLink && imageLink.tagName === 'A') {
            moveInstrumentation(imageLink, img);
        } else if (imageLink && imageLink.tagName === 'IMG') {
            moveInstrumentation(imageLink, img);
        }
      }
      chaptersGalleryDiv.append(chapterDiv);
    });
  }

  sliderGalleryDiv.append(chaptersGalleryDiv);
  mainDiv.append(sliderGalleryDiv);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('chapters-cta', 'chapters-open_galery', 'chapters-ctaaa');
  ctaLink.href = 'javascript:void(0)';
  ctaLink.rel = 'no-follow';

  const ctaP = document.createElement('p');
  const ctaText = block.children[4]?.querySelector('p');
  if (ctaText) {
    ctaP.append(...ctaText.childNodes);
    moveInstrumentation(ctaText, ctaP);
  }
  ctaLink.append(ctaP);

  const galleryIcon = block.children[4]?.querySelector('[data-aue-prop="galleryIcon"]');
  let galleryIconSrc = '';
  if (galleryIcon) {
    if (galleryIcon.tagName === 'IMG') {
      galleryIconSrc = galleryIcon.src;
    } else if (galleryIcon.tagName === 'A') {
      galleryIconSrc = galleryIcon.href;
    }
  }

  if (galleryIconSrc) {
    const img = document.createElement('img');
    img.src = galleryIconSrc;
    img.alt = ''; // Alt text is not available in the provided JSON for this icon
    ctaLink.append(img);
    if (galleryIcon.tagName === 'IMG' || galleryIcon.tagName === 'A') {
        moveInstrumentation(galleryIcon, img);
    }
  }

  mainDiv.append(ctaLink);

  block.innerHTML = '';
  block.append(mainDiv);
}
