export default function decorate(b){
  b.classList.add('sticky-navigation-bottom-nav');
  const navList = b.querySelector('.sticky-navigation-bottom-nav__list');
  if(navList){
    navList.classList.add('sticky-navigation-bottom-nav__list');
    navList.querySelectorAll('.sticky-navigation-bottom-nav__item').forEach((item)=>{
      item.classList.add('sticky-navigation-bottom-nav__item');
      const link = item.querySelector('.sticky-navigation-bottom-nav__link');
      if(link){
        link.classList.add('sticky-navigation-bottom-nav__link');
        const img = link.querySelector('.sticky-navigation-bottom-nav__icon');
        if(img){
          img.classList.add('sticky-navigation-bottom-nav__icon');
        }
        const label = link.querySelector('.sticky-navigation-bottom-nav__label');
        if(label){
          label.classList.add('sticky-navigation-bottom-nav__label');
        }
      }
    });
  }
}