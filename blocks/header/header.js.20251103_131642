export default function decorate(b){
  b.classList.add('header-block');
  const appName = b.querySelector('.header-app-name');
  if(appName) appName.classList.add('header__app-name');

  const sidebarMenu = b.querySelectorAll('.header-sidebar__menu-item');
  sidebarMenu.forEach(li=>{
    li.classList.add('header__sidebar-menu-item');
    const link = li.querySelector('a.header-sidebar__menu-link');
    if(link) link.classList.add('header__sidebar-menu-link');
    const icon = li.querySelector('img.header-sidebar__menu-icon');
    if(icon) icon.classList.add('header__sidebar-menu-icon');
  });

  const footerLists = b.querySelectorAll('.header-footer-list');
  footerLists.forEach(list=>{
    list.classList.add('header__footer-list');
    list.querySelectorAll('li.header-footer-list__item').forEach(li=>{
      li.classList.add('header__footer-list-item');
      const link = li.querySelector('a.header-footer-list__item--link');
      if(link) link.classList.add('header__footer-list-link');
    });
  });

  const socialList = b.querySelector('.header-footer-brand__right--list');
  if(socialList){
    socialList.classList.add('header__social-list');
    socialList.querySelectorAll('li.header-footer-brand__right--item').forEach(li=>{
      li.classList.add('header__social-item');
      const link = li.querySelector('a.header-footer-brand__right--link');
      if(link) link.classList.add('header__social-link');
      const icon = li.querySelector('img');
      if(icon) icon.classList.add('header__social-icon');
    });
  }

  const copyright = b.querySelector('.header-footer-brand__left--copyright');
  if(copyright) copyright.classList.add('header__copyright');
}
