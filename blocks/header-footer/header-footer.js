export default function decorate(b){
  b.classList.add('header-footer-block');
  const appName=b.querySelector('.header-app-name');
  if(appName) appName.classList.add('header-footer-app-name');
  const header=b.querySelector('.header-header');
  if(header) header.classList.add('header-footer-header');
  const logoLink=b.querySelector('.header-header__logo-img');
  if(logoLink) logoLink.classList.add('header-footer-logo-img');
  const loginBtn=b.querySelector('.header-header__login-btn');
  if(loginBtn) loginBtn.classList.add('header-footer-login-btn');
  const sidebar=b.querySelector('.header-sidebar');
  if(sidebar) sidebar.classList.add('header-footer-sidebar');
  b.querySelectorAll('.header-sidebar__menu-item').forEach(i=>i.classList.add('header-footer-sidebar-menu-item'));
  b.querySelectorAll('.header-sidebar__menu-link').forEach(i=>i.classList.add('header-footer-sidebar-menu-link'));
  b.querySelectorAll('.header-sidebar__menu-icon').forEach(i=>i.classList.add('header-footer-sidebar-menu-icon'));
  const footerBrand=b.querySelector('.header-footer-brand');
  if(footerBrand) footerBrand.classList.add('header-footer-footer-brand');
  b.querySelectorAll('.header-footer-list__item--link').forEach(i=>i.classList.add('header-footer-footer-link'));
  b.querySelectorAll('.header-footer-brand__right--link').forEach(i=>i.classList.add('header-footer-social-link'));
  const copyright=b.querySelector('.header-footer-brand__left--copyright');
  if(copyright) copyright.classList.add('header-footer-copyright');
}