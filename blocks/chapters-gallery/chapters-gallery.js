import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const chaptersSection = document.createElement('section');
  chaptersSection.classList.add('chapters-section', 'chapters-homeSlot');

  const headingDesktopContainer = block.children[0]?.children[0];
  if (headingDesktopContainer) {
    const chaptersChapterHeadDesk = document.createElement('div');
    chaptersChapterHeadDesk.classList.add('chapters-chapter_head', 'chapters-for_desk_view');
    chaptersChapterHeadDesk.append(...headingDesktopContainer.childNodes);
    moveInstrumentation(headingDesktopContainer, chaptersChapterHeadDesk);
    chaptersSection.append(chaptersChapterHeadDesk);
  }

  const headingMobileContainer = block.children[1]?.children[0];
  if (headingMobileContainer) {
    const chaptersChapterHeadMobile = document.createElement('div');
    chaptersChapterHeadMobile.classList.add('chapters-chapter_head', 'chapters-for_phone_view');
    chaptersChapterHeadMobile.append(...headingMobileContainer.childNodes);
    moveInstrumentation(headingMobileContainer, chaptersChapterHeadMobile);
    chaptersSection.append(chaptersChapterHeadMobile);
  }

  const descriptionContainer = block.children[2]?.children[0];
  if (descriptionContainer) {
    const descriptionP = document.createElement('p');
    descriptionP.append(...descriptionContainer.childNodes);
    moveInstrumentation(descriptionContainer, descriptionP);
    chaptersSection.append(descriptionP);
  }

  const chaptersSliderGallery = document.createElement('div');
  chaptersSliderGallery.classList.add('chapters-sliderGallery');
  const chaptersGallery = document.createElement('div');
  chaptersGallery.classList.add('chapters-chapters_gallery');

  const chapterImagesContainer = block.children[3];
  if (chapterImagesContainer) {
    const chapterImages = chapterImagesContainer.querySelectorAll('[data-aue-model="chapterImage"]');
    chapterImages.forEach((chapterImage) => {
      const imageLink = chapterImage.querySelector('[data-aue-prop="image"]');
      const altText = chapterImage.querySelector('[data-aue-prop="alt"]');

      if (imageLink) {
        const chapDiv = document.createElement('div');
        chapDiv.classList.add('chapters-chapp');
        chapDiv.setAttribute('data-fancybox', 'highlights-gallery');
        chapDiv.setAttribute('style', 'cursor: pointer;');

        let imgElement = imageLink.querySelector('img');
        let imgSource = imgElement ? imgElement.src : imageLink.href;
        let imgAlt = altText ? altText.textContent : (imgElement ? imgElement.alt : '');

        if (imgSource) {
          const pic = createOptimizedPicture(imgSource, imgAlt);
          chapDiv.append(pic);
          moveInstrumentation(imageLink, pic.querySelector('img'));
          chapDiv.href = imgSource;
        }
        chaptersGallery.append(chapDiv);
      }
    });
  }

  chaptersSliderGallery.append(chaptersGallery);
  chaptersSection.append(chaptersSliderGallery);

  const ctaTextContainer = block.children[4]?.children[0];
  const ctaIconContainer = block.children[5]?.children[0];

  if (ctaTextContainer || ctaIconContainer) {
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('chapters-cta', 'chapters-open_galery', 'chapters-ctaaa');
    ctaLink.href = 'javascript:void(0)';
    ctaLink.rel = 'no-follow';

    if (ctaTextContainer) {
      const ctaP = document.createElement('p');
      ctaP.append(...ctaTextContainer.childNodes);
      moveInstrumentation(ctaTextContainer, ctaP);
      ctaLink.append(ctaP);
    }

    if (ctaIconContainer) {
      let imgElement = ctaIconContainer.querySelector('img');
      let imgSource = imgElement ? imgElement.src : ctaIconContainer.href;
      let imgAlt = imgElement ? imgElement.alt : '';

      if (imgSource) {
        const pic = createOptimizedPicture(imgSource, imgAlt);
        ctaLink.append(pic);
        moveInstrumentation(ctaIconContainer, pic.querySelector('img'));
      }
    }
    chaptersSection.append(ctaLink);
  }

  block.innerHTML = '';
  block.append(chaptersSection);
}
