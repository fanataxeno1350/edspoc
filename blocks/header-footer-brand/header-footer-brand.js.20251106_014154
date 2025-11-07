export default function decorate(b){
  b.classList.add('header-footer-brand');

  // App Name
  const appName = b.querySelector('.header-app-name');
  if(appName) appName.classList.add('header-footer-brand__app-name');

  // Main Logo
  const logoLink = b.querySelector('.header__logo-img');
  if(logoLink) logoLink.classList.add('header-footer-brand__main-logo');

  // Login Button
  const loginBtn = b.querySelector('.header__login-btn');
  if(loginBtn) loginBtn.classList.add('header-footer-brand__login-btn');

  // Sidebar Menu
  const sidebarMenu = b.querySelector('.header-sidebar__menu');
  if(sidebarMenu) sidebarMenu.classList.add('header-footer-brand__sidebar-menu');
  const sidebarMenuItems = b.querySelectorAll('.header-sidebar__menu-item');
  sidebarMenuItems.forEach((item)=>{
    item.classList.add('header-footer-brand__sidebar-menu-item');
    const link = item.querySelector('.header-sidebar__menu-link');
    if(link) link.classList.add('header-footer-brand__sidebar-menu-link');
    const icon = item.querySelector('.header-sidebar__menu-icon');
    if(icon) icon.classList.add('header-footer-brand__sidebar-menu-icon');
  });

  // Footer Brand Primary Logos
  const leftLogo1 = b.querySelector('.header-footer-brand__logo img');
  if(leftLogo1) leftLogo1.classList.add('header-footer-brand__logo-img');
  const leftLogo2 = b.querySelector('.header-footer-brand__secondary--logo img');
  if(leftLogo2) leftLogo2.classList.add('header-footer-brand__secondary-logo-img');

  // Footer Links
  const footerLists = b.querySelectorAll('.header-footer-list');
  footerLists.forEach((list)=>{
    list.classList.add('header-footer-brand__footer-list');
    const items = list.querySelectorAll('.header-footer-list__item');
    items.forEach((li)=>{
      li.classList.add('header-footer-brand__footer-list-item');
      const a = li.querySelector('a');
      if(a) a.classList.add('header-footer-brand__footer-link');
    });
  });

  // Social Links
  const socialList = b.querySelector('.header-footer-brand__right--list');
  if(socialList) socialList.classList.add('header-footer-brand__social-list');
  const socialItems = b.querySelectorAll('.header-footer-brand__right--item');
  socialItems.forEach((item)=>{
    item.classList.add('header-footer-brand__social-item');
    const a = item.querySelector('.header-footer-brand__right--link');
    if(a) a.classList.add('header-footer-brand__social-link');
    const img = item.querySelector('img');
    if(img) img.classList.add('header-footer-brand__social-icon');
  });

  // Copyright
  const copyright = b.querySelector('.header-footer-brand__left--copyright');
  if(copyright) copyright.classList.add('header-footer-brand__copyright');
}
