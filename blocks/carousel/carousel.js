export default function decorate(block) {
  const carouselPositionRelative = block.querySelector('.carousel-position-relative');
  if (carouselPositionRelative) {
    carouselPositionRelative.classList.add('carousel-block');
  }

  const swiperContainer = block.querySelector('.swiper.carousel-primary-swiper');
  if (swiperContainer) {
    const isAutoplay = swiperContainer.dataset.isAutoplay === 'true';
    const delay = parseInt(swiperContainer.dataset.delay, 10);
    const autopauseDisabled = swiperContainer.dataset.autopauseDisabled === 'true';
    const isLoop = swiperContainer.dataset.isLoop === 'true';

    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
      swiperWrapper.classList.add('carousel-wrapper');
    }

    const slides = swiperContainer.querySelectorAll('.swiper-slide');
    slides.forEach(slide => {
      slide.classList.add('carousel-slide');
      const video = slide.querySelector('video.carousel-banner-video');
      if (video) {
        video.classList.add('carousel-video');
      }
      const image = slide.querySelector('img.carousel-banner-image');
      if (image) {
        image.classList.add('carousel-image');
      }
      const cta = slide.querySelector('a.carousel-cmp-button');
      if (cta) {
        cta.classList.add('carousel-cta');
      }
    });

    const prevButton = block.querySelector('.carousel-primary-swiper__buttonPrev');
    if (prevButton) {
      prevButton.classList.add('carousel-prev-button');
    }

    const nextButton = block.querySelector('.carousel-primary-swiper__buttonNext');
    if (nextButton) {
      nextButton.classList.add('carousel-next-button');
    }

    const pagination = block.querySelector('.carousel-swiper-pagination');
    if (pagination) {
      pagination.classList.add('carousel-pagination');
    }

    // Add logic for autoplay, delay, autopauseDisabled, and loop if needed for custom JS behavior
    // For example, if using a custom Swiper instance, these would be passed as options.
  }
}