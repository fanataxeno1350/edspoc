export default function decorate(b){
  b.classList.add('stickyNavigation-block');
  const navSection = b.querySelector('.stickyNavigation-sticky-bottom-nav');
  if(navSection) {
    navSection.classList.add('stickyNavigation-nav-section');
    const navList = navSection.querySelector('.stickyNavigation-sticky-bottom-nav__list');
    if(navList) {
      navList.classList.add('stickyNavigation-nav-list');
      navList.querySelectorAll('.stickyNavigation-sticky-bottom-nav__item').forEach(item => {
        item.classList.add('stickyNavigation-nav-item');
        const link = item.querySelector('.stickyNavigation-sticky-bottom-nav__link');
        if(link) {
          link.classList.add('stickyNavigation-nav-link');
          link.querySelectorAll('.stickyNavigation-sticky-bottom-nav__icon').forEach(icon => {
            icon.classList.add('stickyNavigation-nav-icon');
          });
          link.querySelectorAll('.stickyNavigation-sticky-bottom-nav__label').forEach(label => {
            label.classList.add('stickyNavigation-nav-label');
          });
        }
      });
    }
  }
}