export default function decorate(b){
  b.classList.add('carousel-block');
  const swiper = b.querySelector('.carousel-primary-swiper');
  if (swiper) {
    swiper.classList.add('carousel-main-swiper');
    const wrapper = swiper.querySelector('.carousel-swiper-wrapper');
    if(wrapper) wrapper.classList.add('carousel-main-wrapper');
    const slides = wrapper ? wrapper.querySelectorAll('.carousel-swiper-slide') : [];
    slides.forEach((slide) => {
      slide.classList.add('carousel-slide');
      const img = slide.querySelector('img.carousel-banner-image');
      if(img) img.classList.add('carousel-slide-image');
      const video = slide.querySelector('video.carousel-banner-video');
      if(video) video.classList.add('carousel-slide-video');
      const cta = slide.querySelector('.carousel-banner-cta a.carousel-cmp-button');
      if(cta) cta.classList.add('carousel-slide-cta');
    });
  }
  const actions = b.querySelector('.carousel-cmp-carousel__actions');
  if(actions) actions.classList.add('carousel-actions');
  const nextBtn = b.querySelector('.carousel-primary-swiper__buttonNext');
  if(nextBtn) nextBtn.classList.add('carousel-next-btn');
  const prevBtn = b.querySelector('.carousel-primary-swiper__buttonPrev');
  if(prevBtn) prevBtn.classList.add('carousel-prev-btn');
  const pagination = b.querySelector('.carousel-swiper-pagination');
  if(pagination) pagination.classList.add('carousel-pagination');
}