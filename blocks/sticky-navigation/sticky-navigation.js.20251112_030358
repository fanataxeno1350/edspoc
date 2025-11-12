export default function decorate(b){
  b.classList.add('stickyNavigation-block');
  const popup=b.querySelector('.stickyNavigation-pop-up');
  if(popup) popup.classList.add('stickyNavigation-pop-up');
  const transPopup=b.querySelector('.stickyNavigation-trans-pop-up');
  if(transPopup) transPopup.classList.add('stickyNavigation-trans-pop-up');
  const navSection=b.querySelector('.stickyNavigation-sticky-bottom-nav');
  if(navSection){
    navSection.classList.add('stickyNavigation-sticky-bottom-nav');
    const navList=navSection.querySelector('.stickyNavigation-sticky-bottom-nav__list');
    if(navList){
      navList.classList.add('stickyNavigation-sticky-bottom-nav__list');
      const items=navList.querySelectorAll('.stickyNavigation-sticky-bottom-nav__item');
      items.forEach(item=>{
        item.classList.add('stickyNavigation-sticky-bottom-nav__item');
        const link=item.querySelector('.stickyNavigation-sticky-bottom-nav__link');
        if(link){
          link.classList.add('stickyNavigation-sticky-bottom-nav__link');
          const icon=link.querySelector('.stickyNavigation-sticky-bottom-nav__icon');
          if(icon) icon.classList.add('stickyNavigation-sticky-bottom-nav__icon');
          const label=link.querySelector('.stickyNavigation-sticky-bottom-nav__label');
          if(label) label.classList.add('stickyNavigation-sticky-bottom-nav__label');
        }
      });
    }
  }
}