import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel-wrapper');
  moveInstrumentation(block, carouselWrapper);

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'carousel-primary-swiper');
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', 'true');
  swiper.setAttribute('data-delay', '5000');
  swiper.setAttribute('data-autopause-disabled', 'true');
  swiper.setAttribute('data-is-loop', 'false');
  swiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(row, swiperSlide);

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.classList.add('carousel-banner-section');

    const carouselBannerSectionWrapper = document.createElement('div');
    carouselBannerSectionWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoCell = row.children[0]; // Assuming video is the first cell if present
    const imageCell = row.children[1]; // Assuming image is the second cell if present
    const ctaCell = row.children[2]; // Assuming CTA is the third cell if present

    const video = videoCell ? videoCell.querySelector('video') : null;
    const image = imageCell ? imageCell.querySelector('img') : null;
    const cta = ctaCell ? ctaCell.querySelector('a') : null;

    if (video) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const newVideo = document.createElement('video');
      newVideo.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      newVideo.setAttribute('title', video.getAttribute('title') || 'Video');
      newVideo.setAttribute('aria-label', video.getAttribute('aria-label') || 'Video');
      newVideo.setAttribute('data-is-autoplay', video.getAttribute('data-is-autoplay') || 'true');
      newVideo.setAttribute('playsinline', '');
      newVideo.setAttribute('preload', video.getAttribute('preload') || 'metadata');
      newVideo.setAttribute('fetchpriority', video.getAttribute('fetchpriority') || 'high');
      newVideo.setAttribute('loop', video.getAttribute('loop') || 'false');
      newVideo.setAttribute('muted', video.getAttribute('muted') || 'true');
      newVideo.setAttribute('autoplay', video.getAttribute('autoplay') || 'true');

      [...video.querySelectorAll('source')].forEach((source) => {
        const newSource = document.createElement('source');
        newSource.setAttribute('src', source.getAttribute('src'));
        newSource.setAttribute('type', source.getAttribute('type'));
        newVideo.append(newSource);
      });
      moveInstrumentation(video, newVideo);
      videoWrapper.append(newVideo);

      // Add play/pause buttons (simplified, assuming structure from HTML)
      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      // Assuming inner content is SVG path or text, adjust as needed
      playButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1762760053254.svg+xml';

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      pauseButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1762760053336.svg+xml';

      playPauseOverlay.append(playButton, pauseButton);
      videoWrapper.append(playPauseOverlay);

      // Add mute/unmute buttons (simplified)
      const muteIconOverlay = document.createElement('div');
      muteIconOverlay.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      muteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1762760053447.svg+xml';

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');
      unmuteButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1762760053551.svg+xml';

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');
      noAudioButton.textContent = '/content/dam/aemigrate/uploaded-folder/image/1762760053642.svg+xml';

      muteIconOverlay.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteIconOverlay);
      carouselBannerSectionWrapper.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt);
      optimizedPic.querySelector('img').classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      optimizedPic.querySelector('img').setAttribute('loading', image.getAttribute('loading') || 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', image.getAttribute('fetchpriority') || 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', image.getAttribute('decoding') || 'async');
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      carouselBannerSectionWrapper.append(optimizedPic);
    }

    if (cta) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

      const bannerCta = document.createElement('div');
      bannerCta.classList.add('carousel-banner-cta');

      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');

      const newCta = document.createElement('a');
      newCta.id = cta.id;
      newCta.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      newCta.setAttribute('data-link-region', cta.getAttribute('data-link-region') || 'CTA');
      newCta.setAttribute('data-is-internal', cta.getAttribute('data-is-internal') || 'false');
      newCta.setAttribute('data-enable-gating', cta.getAttribute('data-enable-gating') || 'false');
      newCta.href = cta.href;
      newCta.target = cta.target || '_self';

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      ctaSpan.textContent = cta.textContent.trim();
      newCta.append(ctaSpan);
      moveInstrumentation(cta, newCta);
      textCenter.append(newCta);

      // Add pop-up and external link popup structure (simplified, assuming static content)
      const popup = document.createElement('div');
      popup.classList.add('carousel-pop-up', 'carousel-d-none');
      popup.innerHTML = '<input type="hidden" class="carousel-popup-message">' +
                        '<input type="hidden" class="carousel-proceed-button-label">' +
                        '<input type="hidden" class="carousel-cancel-button-label">' +
                        '<input type="hidden" class="carousel-background-color">';
      textCenter.append(popup);

      const externalLinkPopup = document.createElement('div');
      externalLinkPopup.classList.add('carousel-external-link-popup');
      externalLinkPopup.innerHTML = '<div class="carousel-generic-popup">' +
                                    '<div class="carousel-offcanvas carousel-offcanvas-bottom carousel-boing-container carousel-gating_offcanvas_bottom--wrapper carousel-gating_offcanvas_bottom" tabindex="-1" aria-labelledby="offcanvasBottomLabel">' +
                                    '<div class="carousel-offcanvas-header carousel-position-relative">' +
                                    '<button type="button" class="carousel-close-btn carousel-position-absolute" data-bs-dismiss="offcanvas" aria-label="Close">/content/dam/aemigrate/uploaded-folder/image/1762760053716.svg+xml</button>' +
                                    '</div>' +
                                    '<div class="carousel-offcanvas-body">' +
                                    '<div class="carousel-pop-content carousel-d-flex carousel-flex-column carousel-align-items-center">' +
                                    '<div class="carousel-pop-image_text-container carousel-d-flex carousel-flex-column carousel-align-items-center">' +
                                    '<div class="carousel-img_holder carousel-d-flex carousel-justify-content-center carousel-align-items-center">' +
                                    '<img alt="Popup Icon" class="carousel-icon-svg">' +
                                    '</div>' +
                                    '<div class="carousel-text_box carousel-d-flex carousel-flex-column carousel-text-center carousel-mt-4">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="carousel-cta_box">' +
                                    `<a href="${cta.href}" class="carousel-text-white carousel-popup-login-cta carousel-text-decoration-none carousel-boing--text__title-4 carousel-rounded-pill carousel-bg-boing-primary carousel-py-5 carousel-px-11 carousel-analytics_cta_click carousel-d-flex carousel-justify-content-center carousel-align-items-center">/content/dam/aemigrate/uploaded-folder/image/1762760053818.svg+xml</a>` +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';

      bannerCta.append(textCenter, externalLinkPopup);
      ctaWrapper.append(bannerCta);
      carouselBannerSectionWrapper.append(ctaWrapper);
    }

    carouselBannerSection.append(carouselBannerSectionWrapper);
    carouselBanner.append(carouselBannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add carousel actions (Previous, Next, Pause, Play buttons)
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('carousel-cmp-carousel__actions');
  actionsDiv.innerHTML = `
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
  `;
  swiper.append(actionsDiv);

  // Add swiper navigation buttons (Next/Prev with SVG paths)
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container');
  swiperContainer.innerHTML = `
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
  `;
  swiper.append(swiperContainer);

  // Add swiper pagination
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
  // Dynamically add bullets based on the number of slides
  for (let i = 0; i < block.children.length; i += 1) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 0) { // Assuming the first slide is active initially
      bullet.classList.add('swiper-pagination-bullet-active');
    }
    paginationDiv.append(bullet);
  }
  swiper.append(paginationDiv);

  carouselWrapper.append(swiper);

  block.textContent = '';
  block.append(carouselWrapper);
}
