import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
  // Transfer attributes from the original swiper element if available in the block's first child
  const originalSwiper = block.querySelector('.swiper.carousel-primary-swiper');
  if (originalSwiper) {
    ['data-swiper-id', 'id', 'role', 'aria-live', 'aria-roledescription', 'data-is-autoplay', 'data-delay', 'data-autopause-disabled', 'data-is-loop', 'data-placeholder-text']
      .forEach((attr) => {
        if (originalSwiper.hasAttribute(attr)) {
          swiper.setAttribute(attr, originalSwiper.getAttribute(attr));
        }
      });
  }

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

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.classList.add('carousel-banner-section');

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const cells = [...row.children];

    // Extract content based on model fields
    const videoSrc = cells[0]?.textContent.trim(); // Assuming videoSrc is in the first cell
    const imageSrc = cells[1]?.querySelector('img')?.src || cells[1]?.textContent.trim(); // Assuming imageSrc in second cell, either img or text
    const imageAlt = cells[2]?.textContent.trim(); // Assuming imageAlt in third cell
    const ctaHref = cells[3]?.querySelector('a')?.href || cells[3]?.textContent.trim(); // Assuming ctaHref in fourth cell
    const ctaText = cells[4]?.textContent.trim(); // Assuming ctaText in fifth cell

    if (videoSrc) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      // Check if loop is explicitly 'false' or not present, otherwise assume true
      const isLoop = row.dataset.isLoop === 'false' ? false : true; // Assuming data-is-loop attribute on the row if needed
      if (isLoop) {
        video.setAttribute('loop', '');
      } else {
        video.removeAttribute('loop');
      }

      const sourceMp4 = document.createElement('source');
      sourceMp4.setAttribute('src', videoSrc);
      sourceMp4.setAttribute('type', 'video/mp4');
      video.append(sourceMp4);

      const sourceWebm = document.createElement('source');
      sourceWebm.setAttribute('src', videoSrc.replace('.mp4', '.webm')); // Assuming .webm version exists
      sourceWebm.setAttribute('type', 'video/webm');
      video.append(sourceWebm);

      videoWrapper.append(video);

      // Add play/pause and mute/unmute buttons (static structure from HTML)
      const controlsDiv = document.createElement('div');
      controlsDiv.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      controlsDiv.innerHTML = `
        <button type="button" class="carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1762760053254.svg+xml
        </button>
        <button type="button" class="carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1762760053336.svg+xml
        </button>
      `;
      videoWrapper.append(controlsDiv);

      const muteControlsDiv = document.createElement('div');
      muteControlsDiv.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      muteControlsDiv.innerHTML = `
        <button type="button" class="carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
          /content/dam/aemigrate/uploaded-folder/image/1762760053447.svg+xml
        </button>
        <button type="button" class="carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none">
          /content/dam/aemigrate/uploaded-folder/image/1762760053551.svg+xml
        </button>
        <button type="button" class="carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer">
          /content/dam/aemigrate/uploaded-folder/image/1762760053642.svg+xml
        </button>
      `;
      videoWrapper.append(muteControlsDiv);

      wrapperDiv.append(videoWrapper);
    } else if (imageSrc) {
      const img = createOptimizedPicture(imageSrc, imageAlt || '', true, [{ width: '2000' }]);
      img.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      img.querySelector('img').setAttribute('loading', 'eager');
      img.querySelector('img').setAttribute('fetchpriority', 'high');
      img.querySelector('img').setAttribute('decoding', 'async');
      moveInstrumentation(cells[1].querySelector('img') || cells[1], img.querySelector('img'));
      wrapperDiv.append(img);
    }

    if (ctaHref || ctaText) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      if (ctaHref && ctaText) {
        const ctaLink = document.createElement('a');
        ctaLink.setAttribute('id', `cta-${Math.random().toString(36).substring(2, 11)}`); // Generate a random ID
        ctaLink.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
        ctaLink.setAttribute('data-link-region', 'CTA');
        ctaLink.setAttribute('data-is-internal', 'false');
        ctaLink.setAttribute('data-enable-gating', 'false');
        ctaLink.setAttribute('href', ctaHref);
        ctaLink.setAttribute('target', '_blank');

        const span = document.createElement('span');
        span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
        span.textContent = ctaText;
        ctaLink.append(span);
        textCenterDiv.append(ctaLink);
      }

      // Add static popup structure if needed (from HTML)
      textCenterDiv.innerHTML += `
        <div class="carousel-pop-up carousel-d-none">
          <input type="hidden" class="carousel-popup-message">
          <input type="hidden" class="carousel-proceed-button-label">
          <input type="hidden" class="carousel-cancel-button-label">
          <input type="hidden" class="carousel-background-color">
        </div>
      `;

      const externalLinkPopup = document.createElement('div');
      externalLinkPopup.classList.add('carousel-external-link-popup');
      externalLinkPopup.innerHTML = `
        <div class="carousel-generic-popup">
          <div class="carousel-offcanvas carousel-offcanvas-bottom carousel-boing-container carousel-gating_offcanvas_bottom--wrapper carousel-gating_offcanvas_bottom" tabindex="-1" aria-labelledby="offcanvasBottomLabel">
            <div class="carousel-offcanvas-header carousel-position-relative">
              <button type="button" class="carousel-close-btn carousel-position-absolute" data-bs-dismiss="offcanvas" aria-label="Close">
                /content/dam/aemigrate/uploaded-folder/image/1762760053716.svg+xml
              </button>
            </div>
            <div class="carousel-offcanvas-body">
              <div class="carousel-pop-content carousel-d-flex carousel-flex-column carousel-align-items-center">
                <div class="carousel-pop-image_text-container carousel-d-flex carousel-flex-column carousel-align-items-center">
                  <div class="carousel-img_holder carousel-d-flex carousel-justify-content-center carousel-align-items-center">
                    <img alt="Popup Icon" class="carousel-icon-svg">
                  </div>
                  <div class="carousel-text_box carousel-d-flex carousel-flex-column carousel-text-center carousel-mt-4">
                  </div>
                </div>
                <div class="carousel-cta_box">
                  <a href="${ctaHref || '#'}.html" class="carousel-text-white carousel-popup-login-cta carousel-text-decoration-none carousel-boing--text__title-4 carousel-rounded-pill carousel-bg-boing-primary carousel-py-5 carousel-px-11 carousel-analytics_cta_click carousel-d-flex carousel-justify-content-center carousel-align-items-center">
                    /content/dam/aemigrate/uploaded-folder/image/1762760053818.svg+xml
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      bannerCta.append(textCenterDiv, externalLinkPopup);
      ctaWrapper.append(bannerCta);
      wrapperDiv.append(ctaWrapper);
    }

    carouselBannerSection.append(wrapperDiv);
    carouselBanner.append(carouselBannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add static navigation buttons, pagination, etc.
  swiper.innerHTML += `
    <div class="carousel-cmp-carousel__actions">
      <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
        <span class="carousel-cmp-carousel__action-icon"></span>
        <span class="carousel-cmp-carousel__action-text">Previous</span>
      </button>
      <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
        <span class="carousel-cmp-carousel__action-icon"></span>
        <span class="carousel-cmp-carousel__action-text">Next</span>
      </button>
      <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
        <span class="carousel-cmp-carousel__action-icon"></span>
        <span class="carousel-cmp-carousel__action-text">Pause</span>
      </button>
      <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play">
        <span class="carousel-cmp-carousel__action-icon"></span>
        <span class="carousel-cmp-carousel__action-text">Play</span>
      </button>
    </div>
    <div class="swiper-container">
      <div>
        <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click" disabled="">
          /content/dam/aemigrate/uploaded-folder/image/1762760053906.svg+xml
        </button>
      </div>
      <div>
        <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
          /content/dam/aemigrate/uploaded-folder/image/1762760053965.svg+xml
        </button>
      </div>
    </div>
    <div class="swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal">
      <span class="swiper-pagination-bullet"></span>
      <span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
    </div>
  `;

  carouselWrapper.append(swiper);
  block.textContent = '';
  block.append(carouselWrapper);
}
