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

  [...block.children].forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'carousel-primary-swiper-slide');
    moveInstrumentation(row, slide);

    const banner = document.createElement('div');
    banner.classList.add('carousel-banner');

    const section = document.createElement('section');
    section.classList.add('carousel-banner-section');

    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-position-relative', 'carousel-boing', 'carousel-banner-section__wrapper');

    const videoCell = row.children[0];
    const imageCell = row.children[1];
    const ctaLinkCell = row.children[2];
    const ctaLabelCell = row.children[3];

    let mediaElement = null;
    const videoLink = videoCell.querySelector('a[data-aue-prop="video"]');
    const image = imageCell.querySelector('img[data-aue-prop="image"]');

    if (videoLink) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('carousel-video-wrapper');

      const video = document.createElement('video');
      video.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', '');
      video.setAttribute('muted', '');
      video.setAttribute('autoplay', '');
      moveInstrumentation(videoLink, video);

      const source = document.createElement('source');
      source.setAttribute('src', videoLink.href);
      source.setAttribute('type', 'video/mp4');
      video.append(source);
      videoWrapper.append(video);

      const controlsWrapper = document.createElement('div');
      controlsWrapper.classList.add('carousel-position-absolute', 'carousel-w-100', 'carousel-h-100', 'carousel-start-0', 'carousel-top-0', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer');
      videoWrapper.append(controlsWrapper);

      const muteWrapper = document.createElement('div');
      muteWrapper.classList.add('carousel-position-absolute', 'carousel-z-2', 'carousel-d-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-cursor-pointer', 'carousel-mute-icon');
      videoWrapper.append(muteWrapper);

      mediaElement = videoWrapper;
    } else if (image) {
      const pic = createOptimizedPicture(image.src, image.alt);
      pic.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
      moveInstrumentation(image, pic.querySelector('img'));
      mediaElement = pic;
    }

    if (mediaElement) {
      wrapper.append(mediaElement);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('carousel-position-absolute', 'carousel-start-50', 'carousel-translate-middle-x', 'carousel-w-100', 'carousel-boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('carousel-banner-cta');

    const textCenter = document.createElement('div');
    textCenter.classList.add('carousel-text-center');

    const ctaLink = ctaLinkCell.querySelector('a[data-aue-prop="ctaLink"]');
    const ctaLabel = ctaLabelCell.querySelector('[data-aue-prop="ctaLabel"]');

    if (ctaLink && ctaLabel) {
      const link = document.createElement('a');
      link.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
      link.setAttribute('data-link-region', 'CTA');
      link.setAttribute('data-is-internal', 'true');
      link.setAttribute('data-enable-gating', 'false');
      link.href = ctaLink.href;
      link.target = '_blank';
      moveInstrumentation(ctaLink, link);

      const span = document.createElement('span');
      span.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
      span.textContent = ctaLabel.textContent;
      moveInstrumentation(ctaLabel, span);
      link.append(span);
      textCenter.append(link);
    }

    bannerCta.append(textCenter);
    ctaWrapper.append(bannerCta);
    wrapper.append(ctaWrapper);
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
