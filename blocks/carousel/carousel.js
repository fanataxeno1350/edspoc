export default function decorate(b){
  b.classList.add('carousel-wrapper');
  const swiper = b.querySelector('.swiper');
  if(swiper) {
    swiper.classList.add('carousel-primary-swiper');
    const wrapper = swiper.querySelector('.swiper-wrapper');
    if(wrapper) wrapper.classList.add('carousel-primary-swiper-wrapper');
    const slides = wrapper ? wrapper.querySelectorAll('.swiper-slide') : [];
    slides.forEach((slide) => {
      slide.classList.add('carousel-primary-swiper-slide');
      const banner = slide.querySelector('.carousel-banner');
      if(banner) banner.classList.add('carousel-banner');
      const cta = slide.querySelector('.carousel-banner-cta');
      if(cta) cta.classList.add('carousel-banner-cta');
    });
    const actions = swiper.querySelector('.carousel-cmp-carousel__actions');
    if(actions) actions.classList.add('carousel-cmp-carousel__actions');
    const btnNext = swiper.querySelector('.carousel-primary-swiper__buttonNext');
    const btnPrev = swiper.querySelector('.carousel-primary-swiper__buttonPrev');
    if(btnNext) btnNext.classList.add('carousel-primary-swiper__buttonNext');
    if(btnPrev) btnPrev.classList.add('carousel-primary-swiper__buttonPrev');
    const pagination = swiper.querySelector('.swiper-pagination');
    if(pagination) pagination.classList.add('carousel-primary-swiper-pagination');
  }
}