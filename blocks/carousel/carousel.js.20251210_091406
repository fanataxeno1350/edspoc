import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('carousel-container');

  const swiperCarousel = document.createElement('div');
  swiperCarousel.classList.add('swiper', 'carousel-primary-swiper');
  swiperCarousel.setAttribute('role', 'group');
  swiperCarousel.setAttribute('aria-live', 'polite');
  swiperCarousel.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'carousel-primary-swiper-wrapper', 'carousel-z-0');

  block.querySelectorAll(':scope > div').forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(row, slide);

    const banner = document.createElement('div');
    banner.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoCell = row.children[0];
    const imageCell = row.children[1];
    const linkCell = row.children[2];

    let mediaElement = null;
    let mediaWrapper = null;

    const videoSource = videoCell.querySelector('[data-aue-prop="video"]');
    if (videoSource) {
      mediaWrapper = document.createElement('div');
      mediaWrapper.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      moveInstrumentation(videoSource, video);

      const source = document.createElement('source');
      source.setAttribute('src', videoSource.href);
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      mediaElement = video;

      mediaWrapper.append(video);
    }

    const imageSource = imageCell.querySelector('[data-aue-prop="image"]');
    if (imageSource) {
      const img = imageSource.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
        pic.querySelector('img').setAttribute('loading', 'eager');
        pic.querySelector('img').setAttribute('fetchpriority', 'high');
        pic.querySelector('img').setAttribute('decoding', 'async');
        moveInstrumentation(img, pic.querySelector('img'));
        mediaElement = pic;
      } else {
        // Fallback for image link if no img tag is found
        const anchor = imageSource.querySelector('a');
        if (anchor && (anchor.href.endsWith('.webp') || anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif')) ) {
          const newImg = document.createElement('img');
          newImg.src = anchor.href;
          newImg.alt = anchor.title || '';
          newImg.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
          newImg.setAttribute('loading', 'eager');
          newImg.setAttribute('fetchpriority', 'high');
          newImg.setAttribute('decoding', 'async');
          moveInstrumentation(anchor, newImg);
          mediaElement = newImg;
        }
      }
    }

    if (mediaElement) {
      if (mediaWrapper) {
        mediaWrapper.append(mediaElement);
        wrapper.append(mediaWrapper);
      } else {
        wrapper.append(mediaElement);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    const linkElement = linkCell.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      const textCenter = document.createElement('div');
      textCenter.classList.add('carousel-text-center');

      const anchor = linkElement.querySelector('a');
      if (anchor) {
        anchor.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
        anchor.setAttribute('data-link-region', 'CTA');
        anchor.setAttribute('data-is-internal', 'true');
        anchor.setAttribute('data-enable-gating', 'false');
        anchor.setAttribute('target', '_blank');
        moveInstrumentation(linkElement, anchor);

        const span = document.createElement('span');
        span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
        span.textContent = anchor.textContent;
        anchor.textContent = '';
        anchor.append(span);

        textCenter.append(anchor);
      }
      bannerCta.append(textCenter);
    }

    if (bannerCta.hasChildNodes()) {
      ctaWrapper.append(bannerCta);
      wrapper.append(ctaWrapper);
    }

    section.append(wrapper);
    banner.append(section);
    slide.append(banner);
    swiperWrapper.append(slide);
  });

  swiperCarousel.append(swiperWrapper);
  carouselContainer.append(swiperCarousel);

  block.textContent = '';
  block.append(carouselContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
