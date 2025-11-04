export default function decorate(block) {
  block.classList.add('carousel-position-relative');
  // Find main swiper carousel
  const mainSwiper = block.querySelector('.swiper.carousel-primary-swiper');
  if (!mainSwiper) return;
  const wrapper = mainSwiper.querySelector('.swiper-wrapper.carousel-primary-swiper-wrapper');
  if (!wrapper) return;
  const slides = [...wrapper.querySelectorAll('.swiper-slide.carousel-primary-swiper-slide')];
  const ul = document.createElement('ul');
  slides.forEach((slide) => {
    const li = document.createElement('li');
    li.append(slide.querySelector('.carousel-banner'));
    ul.append(li);
  });
  block.innerHTML = '';
  block.append(ul);
  // Optionally, move controls if needed
  const actions = mainSwiper.querySelector('.carousel-cmp-carousel__actions');
  if (actions) {
    block.append(actions);
  }
  const swiperContainer = block.querySelector('.carousel-swiper-container');
  if (swiperContainer) {
    block.append(swiperContainer);
  }
  const pagination = mainSwiper.querySelector('.carousel-swiper-pagination');
  if (pagination) {
    block.append(pagination);
  }
}