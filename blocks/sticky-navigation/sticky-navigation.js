export default function decorate(b){
  b.classList.add('stickyNavigation-block');
  const nav = b.querySelector('.stickyNavigation-sticky-bottom-nav');
  if(nav) {
    nav.classList.add('stickyNavigation-enhanced');
    const items = nav.querySelectorAll('.stickyNavigation-sticky-bottom-nav__item');
    items.forEach(item => {
      item.classList.add('stickyNavigation-block__item');
      const link = item.querySelector('.stickyNavigation-sticky-bottom-nav__link');
      if(link) {
        link.classList.add('stickyNavigation-block__link');
        const icon = link.querySelector('.stickyNavigation-sticky-bottom-nav__icon');
        if(icon) icon.classList.add('stickyNavigation-block__icon');
        const label = link.querySelector('.stickyNavigation-sticky-bottom-nav__label');
        if(label) label.classList.add('stickyNavigation-block__label');
      }
    });
  }
}