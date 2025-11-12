export default function decorate(b){
  b.classList.add('carousel-position-relative');
  const swiper = b.querySelector('.carousel-primary-swiper');
  if(swiper){
    swiper.classList.add('carousel-primary-swiper-initialized');
    // Set autoplay if present
    if(swiper.dataset.isAutoplay === 'true') swiper.classList.add('carousel-autoplay');
    // Actions
    const actions = swiper.querySelector('.carousel-cmp-carousel__actions');
    if(actions) actions.classList.add('carousel-actions-init');
    // Slides
    const slides = swiper.querySelectorAll('.carousel-swiper-slide');
    slides.forEach((slide) => {
      slide.classList.add('carousel-slide-init');
      // If video
      const video = slide.querySelector('video');
      if(video) video.classList.add('carousel-banner-video-init');
      // If image
      const img = slide.querySelector('img');
      if(img) img.classList.add('carousel-banner-image-init');
      // CTA
      const cta = slide.querySelector('.carousel-banner-cta');
      if(cta) cta.classList.add('carousel-banner-cta-init');
    });
    // Pagination
    const pagination = swiper.querySelector('.carousel-swiper-pagination');
    if(pagination) pagination.classList.add('carousel-pagination-init');
    // Navigation Buttons
    const btnNext = b.querySelector('.carousel-primary-swiper__buttonNext');
    if(btnNext) btnNext.classList.add('carousel-next-init');
    const btnPrev = b.querySelector('.carousel-primary-swiper__buttonPrev');
    if(btnPrev) btnPrev.classList.add('carousel-prev-init');
  }
}