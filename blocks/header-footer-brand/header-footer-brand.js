export default function decorate(b){
  b.classList.add('header-footer-brand-block');
  const appName = b.querySelector('.header-app-name');
  if(appName) appName.classList.add('header-app-name--block');
  const logoContainer = b.querySelector('.header__logo');
  if(logoContainer) logoContainer.classList.add('header__logo--block');
  const loginBtnWrapper = b.querySelector('.header__login-btn-wrapper');
  if(loginBtnWrapper) loginBtnWrapper.classList.add('header__login-btn-wrapper--block');
  const sidebarMenu = b.querySelector('.header-sidebar__menu');
  if(sidebarMenu) sidebarMenu.classList.add('header-sidebar__menu--block');
  b.querySelectorAll('.header-sidebar__menu-item').forEach(item=>item.classList.add('header-sidebar__menu-item--block'));
  b.querySelectorAll('.header-footer-list').forEach(list=>list.classList.add('header-footer-list--block'));
  b.querySelectorAll('.header-footer-list__item').forEach(item=>item.classList.add('header-footer-list__item--block'));
  b.querySelectorAll('.header-footer-list__item--link').forEach(link=>link.classList.add('header-footer-list__item--link-block'));
  b.querySelectorAll('.header-footer-brand__logo').forEach(logo=>logo.classList.add('header-footer-brand__logo--block'));
  b.querySelectorAll('.header-footer-brand__secondary--logo').forEach(logo=>logo.classList.add('header-footer-brand__secondary--logo-block'));
  b.querySelectorAll('.header-footer-brand__right--link').forEach(link=>link.classList.add('header-footer-brand__right--link-block'));
  const copyright = b.querySelector('.header-footer-brand__left--copyright');
  if(copyright) copyright.classList.add('header-footer-brand__left--copyright-block');
}