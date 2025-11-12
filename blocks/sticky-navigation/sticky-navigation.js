export default function decorate(b){
  b.classList.add('stickyNavigation-block');
  const navSection = b.querySelector('.stickyNavigation-sticky-bottom-nav');
  if(navSection){
    navSection.classList.add('stickyNavigation-block-nav');
    const navList = navSection.querySelector('.stickyNavigation-sticky-bottom-nav__list');
    if(navList){
      navList.classList.add('stickyNavigation-block-nav-list');
      navList.querySelectorAll('.stickyNavigation-sticky-bottom-nav__item').forEach(item=>{
        item.classList.add('stickyNavigation-block-nav-item');
        const link = item.querySelector('.stickyNavigation-sticky-bottom-nav__link');
        if(link){
          link.classList.add('stickyNavigation-block-nav-link');
          const img = link.querySelector('.stickyNavigation-sticky-bottom-nav__icon');
          if(img){
            img.classList.add('stickyNavigation-block-nav-icon');
          }
          const label = link.querySelector('.stickyNavigation-sticky-bottom-nav__label');
          if(label){
            label.classList.add('stickyNavigation-block-nav-label');
          }
        }
      });
    }
  }
}
