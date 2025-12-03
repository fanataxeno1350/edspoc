import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main container for the chapters gallery
  const chaptersGallerySection = document.createElement('section');
  chaptersGallerySection.classList.add('chapters-chapters', 'homeSlot');

  // Desktop Title
  const desktopTitleDiv = document.createElement('div');
  desktopTitleDiv.classList.add('chapters-chapter_head', 'chapters-for_desk_view');
  const desktopTitleSpan = document.createElement('span');
  desktopTitleSpan.classList.add('chapters-suv_back');
  const desktopTitle = block.querySelector('[data-aue-prop="desktopTitle"]');
  if (desktopTitle) {
    desktopTitleSpan.append(...desktopTitle.childNodes);
    moveInstrumentation(desktopTitle, desktopTitleSpan);
  }
  const desktopTitleImg = desktopTitleSpan.querySelector('img');
  if (desktopTitleImg) {
    const pic = createOptimizedPicture(desktopTitleImg.src, desktopTitleImg.alt);
    desktopTitleSpan.replaceChild(pic, desktopTitleImg);
    moveInstrumentation(desktopTitleImg, pic.querySelector('img'));
  }
  desktopTitleDiv.append('Previous chapters of ', desktopTitleSpan);
  chaptersGallerySection.append(desktopTitleDiv);

  // Mobile Title
  const mobileTitleDiv = document.createElement('div');
  mobileTitleDiv.classList.add('chapters-chapter_head', 'chapters-for_phone_view');
  const mobileTitle = block.querySelector('[data-aue-prop="mobileTitle"]');
  if (mobileTitle) {
    mobileTitleDiv.append(...mobileTitle.childNodes);
    moveInstrumentation(mobileTitle, mobileTitleDiv);
  }
  chaptersGallerySection.append(mobileTitleDiv);

  // Description
  const descriptionP = document.createElement('p');
  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    descriptionP.append(...description.childNodes);
    moveInstrumentation(description, descriptionP);
  }
  chaptersGallerySection.append(descriptionP);

  // Chapters Slider Gallery
  const chaptersSliderGalleryDiv = document.createElement('div');
  chaptersSliderGalleryDiv.classList.add('chapters-sliderGallery');
  const chaptersGalleryDiv = document.createElement('div');
  chaptersGalleryDiv.classList.add('chapters-chapters_gallery');

  const chapterImages = block.querySelectorAll('[data-aue-model="chapterImage"]');
  chapterImages.forEach((chapterImage) => {
    const newChapterDiv = document.createElement('div');
    newChapterDiv.classList.add('chapters-chapp');
    newChapterDiv.style.cursor = 'pointer';
    newChapterDiv.setAttribute('data-fancybox', 'highlights-gallery');

    let imageLink = chapterImage.querySelector('[data-aue-prop="image"]');
    let imgElement = null;

    if (imageLink) {
      // Check if imageLink is an <a> tag or contains one
      const anchor = imageLink.tagName === 'A' ? imageLink : imageLink.querySelector('a');
      if (anchor) {
        newChapterDiv.href = anchor.href;
        imgElement = anchor.querySelector('img');
      } else {
        // If it's a direct img element
        imgElement = imageLink.querySelector('img');
        if (imgElement) {
          newChapterDiv.href = imgElement.src;
        }
      }
    }

    if (imgElement) {
      const altTextElement = chapterImage.querySelector('[data-aue-prop="alt"]');
      const altText = altTextElement ? altTextElement.textContent : imgElement.alt;

      const pic = createOptimizedPicture(imgElement.src, altText);
      newChapterDiv.append(pic);
      moveInstrumentation(imgElement, pic.querySelector('img'));
    }

    chaptersGalleryDiv.append(newChapterDiv);
    moveInstrumentation(chapterImage, newChapterDiv);
  });

  chaptersSliderGalleryDiv.append(chaptersGalleryDiv);
  chaptersGallerySection.append(chaptersSliderGalleryDiv);

  // Gallery CTA
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('chapters-cta', 'chapters-open_galery', 'chapters-ctaaa');
  ctaLink.href = 'javascript:void(0)'; // Default href
  ctaLink.rel = 'no-follow';

  const galleryCtaLink = block.querySelector('[data-aue-prop="galleryCtaLink"]');
  if (galleryCtaLink) {
    const anchor = galleryCtaLink.tagName === 'A' ? galleryCtaLink : galleryCtaLink.querySelector('a');
    if (anchor) {
      ctaLink.href = anchor.href;
      const p = document.createElement('p');
      p.append(...anchor.childNodes);
      moveInstrumentation(anchor, p);
      ctaLink.append(p);
    } else {
      // Fallback if galleryCtaLink is not an anchor but contains text
      const p = document.createElement('p');
      p.append(...galleryCtaLink.childNodes);
      moveInstrumentation(galleryCtaLink, p);
      ctaLink.append(p);
    }
  }

  const galleryCtaIcon = block.querySelector('[data-aue-prop="galleryCtaIcon"]');
  if (galleryCtaIcon) {
    const img = galleryCtaIcon.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      ctaLink.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    }
  }

  chaptersGallerySection.append(ctaLink);

  // Replace the block content with the new structure
  block.innerHTML = '';
  block.append(chaptersGallerySection);
}