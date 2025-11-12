export default function decorate(b){
  b.classList.add('header-footer');
  const appName = b.querySelector('.header-app-name');
  if(appName) appName.classList.add('header-footer__app-name');
  const logoLink = b.querySelector('.header-header__logo-img');
  if(logoLink) logoLink.classList.add('header-footer__logo-img');
  const loginBtn = b.querySelector('.header-header__login-btn');
  if(loginBtn) loginBtn.classList.add('header-footer__login-btn');
  const sidebarMenu = b.querySelectorAll('.header-sidebar__menu-item');
  sidebarMenu.forEach(item => item.classList.add('header-footer__sidebar-menu-item'));
  const sidebarLinks = b.querySelectorAll('.header-sidebar__menu-link');
  sidebarLinks.forEach(link => link.classList.add('header-footer__sidebar-menu-link'));
  const brandLogos = b.querySelectorAll('.header-footer-brand__logo img, .header-footer-brand__secondary--logo img');
  brandLogos.forEach(logo => logo.classList.add('header-footer__footer-brand-logo'));
  const footerLinks = b.querySelectorAll('.header-footer-list__item--link');
  footerLinks.forEach(link => link.classList.add('header-footer__footer-link'));
  const socialLinks = b.querySelectorAll('.header-footer-brand__right--link');
  socialLinks.forEach(link => link.classList.add('header-footer__footer-social-link'));
  const copyright = b.querySelector('.header-footer-brand__left--copyright');
  if(copyright) copyright.classList.add('header-footer__copyright');
}