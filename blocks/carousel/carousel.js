export default function decorate(block) {
  block.classList.add('carousel-position-relative');
  const swiper = block.querySelector('.swiper');
  if (swiper) {
    swiper.classList.add('carousel-primary-swiper');
    const wrapper = swiper.querySelector('.swiper-wrapper');
    if (wrapper) {
      wrapper.classList.add('carousel-primary-swiper-wrapper', 'carousel-z-0');
      const slides = wrapper.querySelectorAll('.swiper-slide');
      slides.forEach((slide) => {
        slide.classList.add('carousel-primary-swiper-slide');
        const banner = slide.querySelector('.carousel-banner');
        if (banner) {
          const section = banner.querySelector('.carousel-banner-section');
          if (section) {
            const wrapper = section.querySelector('.carousel-banner-section__wrapper');
            if (wrapper) {
              const mediaImg = wrapper.querySelector('img.carousel-banner-image');
              const mediaVideo = wrapper.querySelector('video.carousel-banner-video');
              if (mediaImg) {
                mediaImg.classList.add('carousel-w-100', 'carousel-h-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-image');
              }
              if (mediaVideo) {
                mediaVideo.classList.add('carousel-w-100', 'carousel-object-fit-cover', 'carousel-banner-media', 'carousel-banner-video');
              }
              const ctaSection = wrapper.querySelector('.carousel-boing__banner--cta');
              if (ctaSection) {
                const cta = ctaSection.querySelector('.carousel-banner-cta');
                if (cta) {
                  cta.classList.add('carousel-banner-cta');
                  const btn = cta.querySelector('.carousel-cmp-button');
                  if (btn) {
                    btn.classList.add('carousel-cmp-button', 'carousel-analytics_cta_click', 'carousel-text-center', 'carousel-cta-layout');
                    const btnText = btn.querySelector('.carousel-cmp-button__text');
                    if (btnText) {
                      btnText.classList.add('carousel-cmp-button__text', 'carousel-primary-btn', 'carousel-w-75', 'carousel-p-5', 'carousel-rounded-pill', 'carousel-d-inline-flex', 'carousel-justify-content-center', 'carousel-align-items-center', 'carousel-famlf-cta-btn');
                    }
                  }
                }
              }
            }
          }
        }
      });
    }
    const actions = swiper.querySelector('.carousel-cmp-carousel__actions');
    if (actions) {
      actions.classList.add('carousel-cmp-carousel__actions');
      actions.querySelectorAll('button').forEach((btn) => {
        btn.classList.forEach(cls => btn.classList.add(cls));
      });
    }
    const pagination = swiper.querySelector('.carousel-swiper-pagination');
    if (pagination) {
      pagination.classList.add('carousel-primary-swiper-pagination', 'carousel-pagination-set', 'carousel-mb-md-8', 'carousel-mb-10', 'carousel-mt-6', 'carousel-position-absolute', 'carousel-swiper-pagination-clickable', 'carousel-swiper-pagination-bullets', 'carousel-swiper-pagination-horizontal');
    }
  }
  const container = block.querySelector('.carousel-swiper-container');
  if (container) {
    const nextBtn = container.querySelector('.carousel-primary-swiper__buttonNext');
    if (nextBtn) {
      nextBtn.classList.add('carousel-primary-swiper__buttonNext', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click', 'carousel-disabled');
    }
    const prevBtn = container.querySelector('.carousel-primary-swiper__buttonPrev');
    if (prevBtn) {
      prevBtn.classList.add('carousel-primary-swiper__buttonPrev', 'carousel-position-absolute', 'carousel-top-50', 'carousel-swiper-buttonBg', 'carousel-d-none', 'carousel-d-sm-block', 'carousel-cursor-pointer', 'carousel-analytics_cta_click');
    }
  }
}