export default function decorate(b){
  b.classList.add('header-footer-boing-block');
  const header = b.querySelector('.header-boing-container');
  if(header){
    header.classList.add('header-main');
    const logo = header.querySelector('.header__logo-img');
    if(logo) logo.classList.add('header-logo-img');
    const loginBtn = header.querySelector('.header__login-btn');
    if(loginBtn) loginBtn.classList.add('header-login-btn');
  }
  const sidebar = b.querySelector('.header-sidebar');
  if(sidebar){
    sidebar.classList.add('header-sidebar-block');
    const menuItems = sidebar.querySelectorAll('.header-sidebar__menu-item');
    menuItems.forEach(i=>i.classList.add('sidebar-menu-item-block'));
  }
  const submenu = b.querySelector('.header-submenu-container');
  if(submenu){
    submenu.classList.add('header-submenu-block');
  }
  const footerBrand = b.querySelector('.header-footer-brand');
  if(footerBrand){
    footerBrand.classList.add('footer-brand-block');
    const leftLogos = footerBrand.querySelectorAll('.header-footer-brand__left img');
    leftLogos.forEach(img=>img.classList.add('footer-left-logo-img'));
    const footerLists = footerBrand.querySelectorAll('.header-footer-list');
    footerLists.forEach(list=>list.classList.add('footer-list-block'));
    const socialList = footerBrand.querySelector('.header-footer-brand__right--list');
    if(socialList){
      socialList.classList.add('footer-social-list-block');
      const socialLinks = socialList.querySelectorAll('.header-footer-brand__right--link');
      socialLinks.forEach(link=>link.classList.add('footer-social-link-block'));
    }
    const copyright = footerBrand.querySelector('.header-footer-brand__left--copyright');
    if(copyright) copyright.classList.add('footer-copyright-block');
  }
  const overlay = b.querySelector('.header-overlay');
  if(overlay){
    overlay.classList.add('header-overlay-block');
  }
}