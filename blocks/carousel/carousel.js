export default function decorate(b){
  b.classList.add('carousel-position-relative');
  const swiper = b.querySelector('.carousel-primary-swiper');
  if(swiper){
    swiper.classList.add('carousel-primary-swiper');
    // autoplay
    if(swiper.dataset.isAutoplay === 'true'){
      swiper.classList.add('carousel-autoplay');
    }
    // loop
    if(swiper.dataset.isLoop === 'true'){
      swiper.classList.add('carousel-loop');
    }
  }
  // Slides
  const slides = b.querySelectorAll('.carousel-swiper-slide');
  slides.forEach((slide)=>{
    slide.classList.add('carousel-swiper-slide');
    if(slide.querySelector('video')){
      const v = slide.querySelector('video');
      v.classList.add('carousel-banner-video');
    }
    if(slide.querySelector('img')){
      const img = slide.querySelector('img');
      img.classList.add('carousel-banner-image');
    }
    const cta = slide.querySelector('.carousel-cmp-button');
    if(cta){
      cta.classList.add('carousel-cmp-button');
    }
  });
  // Navigation & pagination
  const actions = b.querySelector('.carousel-cmp-carousel__actions');
  if(actions){
    actions.classList.add('carousel-cmp-carousel__actions');
  }
  const pagination = b.querySelector('.carousel-swiper-pagination');
  if(pagination){
    pagination.classList.add('carousel-swiper-pagination');
  }
  // Next/Prev buttons
  const nextBtn = b.querySelector('.carousel-primary-swiper__buttonNext');
  if(nextBtn){
    nextBtn.classList.add('carousel-primary-swiper__buttonNext');
  }
  const prevBtn = b.querySelector('.carousel-primary-swiper__buttonPrev');
  if(prevBtn){
    prevBtn.classList.add('carousel-primary-swiper__buttonPrev');
  }
}