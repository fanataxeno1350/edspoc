import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiperCarouselPrimary = document.createElement('div');
  swiperCarouselPrimary.classList.add('swiper', 'carousel-primary-swiper');
  // Add dynamic classes and attributes from the sample HTML if needed, or if they are derived from block properties
  // For now, only adding basic classes

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  const slides = block.querySelectorAll('[data-aue-model="slide"]');
  slides.forEach((slide) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    moveInstrumentation(slide, swiperSlide);

    const carouselBanner = document.createElement('div');
    carouselBanner.classList.add('carousel-banner');

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.classList.add('carousel-banner-section');

    const positionRelativeWrapper = document.createElement('div');
    positionRelativeWrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoSource = slide.querySelector('[data-aue-prop="video"]');
    const imageSource = slide.querySelector('[data-aue-prop="image"]');
    const ctaLinkSource = slide.querySelector('[data-aue-prop="ctaLink"]');

    if (videoSource) {
      const carouselVideoWrapper = document.createElement('div');
      carouselVideoWrapper.classList.add('carousel-video-wrapper');

      const videoElement = document.createElement('video');
      videoElement.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      // Check for data-is-autoplay, loop from the original video element if it exists
      const authoredVideo = videoSource.querySelector('video');
      if (authoredVideo) {
        if (authoredVideo.getAttribute('data-is-autoplay') === 'true') {
          videoElement.setAttribute('data-is-autoplay', 'true');
        }
        if (authoredVideo.getAttribute('loop') === 'true') {
          videoElement.setAttribute('loop', 'true');
        } else {
          videoElement.setAttribute('loop', 'false');
        }
      }

      let sourceElement = videoSource.querySelector('source');
      if (!sourceElement) {
        // Fallback: look for an <a> tag if the video element isn't directly present
        const anchor = videoSource.querySelector('a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]');
        if (anchor) {
          sourceElement = document.createElement('source');
          sourceElement.setAttribute('src', anchor.href);
          // Infer type from extension, or set a common one
          if (anchor.href.endsWith('.mp4')) sourceElement.setAttribute('type', 'video/mp4');
          else if (anchor.href.endsWith('.mov')) sourceElement.setAttribute('type', 'video/quicktime');
          else if (anchor.href.endsWith('.webm')) sourceElement.setAttribute('type', 'video/webm');
          moveInstrumentation(anchor, sourceElement);
        }
      }

      if (sourceElement) {
        videoElement.append(sourceElement);
      }

      carouselVideoWrapper.append(videoElement);

      // Add play/pause buttons (placeholder, actual SVG content would be loaded dynamically)
      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('carousel-d-none', 'carousel-video-icon', 'carousel-icon-play', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('carousel-d-block', 'carousel-video-icon', 'carousel-icon-pause', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      playPauseWrapper.append(playButton, pauseButton);
      carouselVideoWrapper.append(playPauseWrapper);

      // Add mute/unmute buttons
      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-mute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('carousel-video-icon-volume', 'carousel-icon-unmute', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer', 'carousel-d-none');

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('carousel-video-icon-volume', 'carousel-no-audio-icon', 'carousel-bg-transparent', 'carousel-d-flex', 'carousel-align-items-center', 'carousel-justify-content-center', 'carousel-cursor-pointer');

      muteIconWrapper.append(muteButton, unmuteButton, noAudioButton);
      carouselVideoWrapper.append(muteIconWrapper);

      positionRelativeWrapper.append(carouselVideoWrapper);
    } else if (imageSource) {
      let img = imageSource.querySelector('img');
      if (!img) {
        // Fallback: look for an <a> tag wrapping an image or just an <img>
        img = imageSource.querySelector('a img');
        if (!img) {
          img = imageSource.querySelector('img');
        }
        if (!img) {
          const anchor = imageSource.querySelector('a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"], a[href$=".webp"], a[href$=".gif"]');
          if (anchor) {
            img = document.createElement('img');
            img.src = anchor.href;
            img.alt = anchor.title || '';
            moveInstrumentation(anchor, img);
          }
        }
      }

      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        const pictureImg = picture.querySelector('img');
        pictureImg.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        // Transfer attributes from original img to the new one in picture
        if (img.getAttribute('loading')) pictureImg.setAttribute('loading', img.getAttribute('loading'));
        if (img.getAttribute('fetchpriority')) pictureImg.setAttribute('fetchpriority', img.getAttribute('fetchpriority'));
        if (img.getAttribute('decoding')) pictureImg.setAttribute('decoding', img.getAttribute('decoding'));

        moveInstrumentation(img, pictureImg);
        positionRelativeWrapper.append(picture);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    if (ctaLinkSource) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('carousel-text-center');

      const ctaAnchor = ctaLinkSource.querySelector('a');
      if (ctaAnchor) {
        const newCtaAnchor = document.createElement('a');
        newCtaAnchor.id = ctaAnchor.id || `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID if not present
        newCtaAnchor.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
        newCtaAnchor.setAttribute('data-link-region', 'CTA');
        newCtaAnchor.setAttribute('data-is-internal', ctaAnchor.getAttribute('data-is-internal') || 'true');
        newCtaAnchor.setAttribute('data-enable-gating', ctaAnchor.getAttribute('data-enable-gating') || 'false');
        newCtaAnchor.href = ctaAnchor.href;
        if (ctaAnchor.target) newCtaAnchor.target = ctaAnchor.target;

        const spanText = document.createElement('span');
        spanText.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
        spanText.textContent = ctaAnchor.textContent.trim();
        newCtaAnchor.append(spanText);
        moveInstrumentation(ctaAnchor, newCtaAnchor);
        textCenterDiv.append(newCtaAnchor);
      }

      // Add pop-up placeholder if it exists in the original structure
      const popUpDiv = ctaLinkSource.querySelector('.carousel-pop-up');
      if (popUpDiv) {
        textCenterDiv.append(popUpDiv);
      }
      bannerCta.append(textCenterDiv);
    }

    ctaWrapper.append(bannerCta);
    positionRelativeWrapper.append(ctaWrapper);

    carouselBannerSection.append(positionRelativeWrapper);
    carouselBanner.append(carouselBannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiperCarouselPrimary.append(swiperWrapper);

  // Add navigation and pagination elements (placeholders for now)
  const cmpCarouselActions = document.createElement('div');
  cmpCarouselActions.classList.add('carousel-cmp-carousel__actions');
  // Add previous, next, pause, play buttons here as per sample HTML
  // For brevity, only creating the container
  swiperWrapper.append(cmpCarouselActions);

  const swiperContainerNav = document.createElement('div');
  swiperContainerNav.classList.add('carousel-swiper-container');
  // Add next/prev buttons here
  swiperCarouselPrimary.append(swiperContainerNav);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperCarouselPrimary.append(swiperPagination);

  carouselContainer.append(swiperCarouselPrimary);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
