export default function decorate(b){
  b.classList.add('carousel-position-relative');
  const swiper=b.querySelector('.carousel-primary-swiper');
  if(swiper){
    if(swiper.dataset.isAutoplay==='true') swiper.setAttribute('data-autoplay','true');
    if(swiper.dataset.delay) swiper.setAttribute('data-delay',swiper.dataset.delay);
    if(swiper.dataset.autopauseDisabled==='true') swiper.setAttribute('data-autopause-disabled','true');
    if(swiper.dataset.isLoop==='true') swiper.setAttribute('data-loop','true');
  }
  b.querySelectorAll('.swiper-slide').forEach(slide=>{
    slide.classList.add('carousel-primary-swiper-slide');
    const img=slide.querySelector('img.carousel-banner-image');
    if(img) img.classList.add('carousel-banner-image');
    const video=slide.querySelector('video.carousel-banner-video');
    if(video) video.classList.add('carousel-banner-video');
    const ctaBox=slide.querySelector('.carousel-banner-cta');
    if(ctaBox) ctaBox.classList.add('carousel-banner-cta');
  });
  const actions=b.querySelector('.carousel-cmp-carousel__actions');
  if(actions){
    actions.classList.add('carousel-cmp-carousel__actions');
    actions.querySelectorAll('button').forEach(btn=>{
      btn.classList.add('carousel-cmp-carousel__action');
    });
  }
  const pagination=b.querySelector('.carousel-swiper-pagination');
  if(pagination) pagination.classList.add('carousel-swiper-pagination');
}