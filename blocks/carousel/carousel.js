import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'carousel-primary-swiper');
  // Transfer attributes from the original swiper div if needed, e.g., data-is-autoplay, data-delay
  // For simplicity, only class is added here based on the desired output structure.

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const carouselSection = document.createElement('section');
    carouselSection.classList.add('carousel-banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoCell = row.children[0]; // Assuming video is in the first cell if present
    const imageCell = row.children[1]; // Assuming image is in the second cell if present
    const altTextCell = row.children[2]; // Assuming alt text is in the third cell if present
    const ctaLabelCell = row.children[3]; // Assuming CTA label is in the fourth cell if present
    const ctaLinkCell = row.children[4]; // Assuming CTA link is in the fifth cell if present

    const video = videoCell ? videoCell.querySelector('a') : null;
    const image = imageCell ? imageCell.querySelector('img') : null;
    const altText = altTextCell ? altTextCell.textContent.trim() : '';
    const ctaLabel = ctaLabelCell ? ctaLabelCell.textContent.trim() : '';
    const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;

    if (video && video.href) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      const sourceMp4 = document.createElement('source');
      sourceMp4.src = video.href;
      sourceMp4.type = 'video/mp4';
      videoElement.append(sourceMp4);

      // Add webm source if available or desired, currently only one video link is extracted
      // const sourceWebm = document.createElement('source');
      // sourceWebm.src = video.href.replace('.mp4', '.webm'); // Example transformation
      // sourceWebm.type = 'video/webm';
      // videoElement.append(sourceWebm);

      videoWrapper.append(videoElement);

      // Placeholder for play/pause/mute buttons - these are static in the example HTML
      const controlsDiv = document.createElement('div');
      controlsDiv.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      // Add play/pause buttons here as per the static HTML structure if dynamic interaction is needed

      const muteIconDiv = document.createElement('div');
      muteIconDiv.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      // Add mute/unmute buttons here as per the static HTML structure if dynamic interaction is needed

      videoWrapper.append(controlsDiv, muteIconDiv);
      wrapperDiv.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, altText || image.alt);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      wrapperDiv.append(optimizedPic);
    }

    if (ctaLabel && ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const ctaAnchor = document.createElement('a');
      ctaAnchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaAnchor.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      ctaAnchor.setAttribute('data-link-region', 'CTA');
      ctaAnchor.setAttribute('data-is-internal', 'false');
      ctaAnchor.setAttribute('data-enable-gating', 'false');
      ctaAnchor.href = ctaLink.href;
      ctaAnchor.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = ctaLabel;

      ctaAnchor.append(ctaSpan);
      textCenterDiv.append(ctaAnchor);
      bannerCta.append(textCenterDiv);
      ctaWrapper.append(bannerCta);
      wrapperDiv.append(ctaWrapper);
    }

    carouselSection.append(wrapperDiv);
    carouselBanner.append(carouselSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiperContainer.append(swiperWrapper);

  // Add static navigation buttons and pagination as per the example HTML
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');
  // Add previous/next/pause/play buttons here

  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('swiper-container');
  // Add buttonNext/buttonPrev here

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
  // Add pagination bullets here

  swiperContainer.append(actionsDiv, swiperNavContainer, paginationDiv);
  carouselWrapper.append(swiperContainer);

  block.textContent = '';
  block.append(carouselWrapper);
}
