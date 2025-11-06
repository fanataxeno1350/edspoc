export default function decorate(b){
  b.classList.add('carousel-container');
  const mainSwiper = b.querySelector('.carousel-primary-swiper');
  if(mainSwiper){
    mainSwiper.classList.add('carousel-swiper');
    const slides = mainSwiper.querySelectorAll('.carousel-primary-swiper-slide');
    slides.forEach(s => {
      s.classList.add('carousel-slide');
      const img = s.querySelector('img.carousel-banner-image');
      if(img){ img.classList.add('carousel-img'); }
      const vid = s.querySelector('video.carousel-banner-video');
      if(vid){ vid.classList.add('carousel-video'); }
      const cta = s.querySelector('.carousel-cmp-button');
      if(cta){ cta.classList.add('carousel-cta'); }
    });
    const actions = mainSwiper.querySelector('.carousel-cmp-carousel__actions');
    if(actions){ actions.classList.add('carousel-actions'); }
    const pagination = b.querySelector('.carousel-swiper-pagination');
    if(pagination){ pagination.classList.add('carousel-pagination'); }
  }
  const btnNext = b.querySelector('.carousel-primary-swiper__buttonNext');
  if(btnNext){ btnNext.classList.add('carousel-btn-next'); }
  const btnPrev = b.querySelector('.carousel-primary-swiper__buttonPrev');
  if(btnPrev){ btnPrev.classList.add('carousel-btn-prev'); }
}