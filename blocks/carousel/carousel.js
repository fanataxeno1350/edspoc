export default function decorate(b){
  b.classList.add('carousel-position-relative');
  const swiper=b.querySelector('.carousel-primary-swiper');
  if(swiper){
    swiper.classList.add('carousel-primary-swiper');
    if(swiper.dataset.isAutoplay==='true'){
      swiper.setAttribute('data-autoplay','true');
    }
    if(swiper.dataset.delay){
      swiper.setAttribute('data-delay',swiper.dataset.delay);
    }
    if(swiper.dataset.autopauseDisabled==='true'){
      swiper.setAttribute('data-autopause-disabled','true');
    }
    if(swiper.dataset.isLoop==='true'){
      swiper.setAttribute('data-is-loop','true');
    }
  }
  b.querySelectorAll('.carousel-swiper-slide').forEach((slide)=>{
    slide.classList.add('carousel-swiper-slide');
    const img=slide.querySelector('.carousel-banner-image');
    if(img){img.classList.add('carousel-banner-image');}
    const vid=slide.querySelector('.carousel-banner-video');
    if(vid){vid.classList.add('carousel-banner-video');}
    const cta=slide.querySelector('.carousel-cmp-button');
    if(cta){cta.classList.add('carousel-cmp-button');}
  });
  b.querySelectorAll('.carousel-cmp-carousel__action').forEach(btn=>{
    btn.classList.add('carousel-cmp-carousel__action');
  });
  b.querySelectorAll('.carousel-primary-swiper__buttonNext').forEach(btn=>{
    btn.classList.add('carousel-primary-swiper__buttonNext');
  });
  b.querySelectorAll('.carousel-primary-swiper__buttonPrev').forEach(btn=>{
    btn.classList.add('carousel-primary-swiper__buttonPrev');
  });
  b.querySelectorAll('.carousel-swiper-pagination').forEach(pg=>{
    pg.classList.add('carousel-swiper-pagination');
  });
}