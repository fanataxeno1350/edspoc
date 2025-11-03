export default function decorate(b){
  b.classList.add('header-position-relative','header-mb-15');
  const appName=b.querySelector('.header-app-name');
  if(appName) appName.classList.add('header-app-name');
  const header=b.querySelector('.header-boing-container');
  if(header) header.classList.add('header-boing-container');
  const logoLink=b.querySelector('.header__logo-img');
  if(logoLink) logoLink.classList.add('header__logo-img');
  const loginBtn=b.querySelector('.header__login-btn');
  if(loginBtn) loginBtn.classList.add('header__login-btn');
  const sidebar=b.querySelector('.header-sidebar');
  if(sidebar) sidebar.classList.add('header-sidebar');
  b.querySelectorAll('.header-sidebar__menu-link').forEach(el=>el.classList.add('header-sidebar__menu-link'));
  b.querySelectorAll('.header-footer-list__item--link').forEach(el=>el.classList.add('header-footer-list__item--link'));
  b.querySelectorAll('.header-footer-brand__right--link').forEach(el=>el.classList.add('header-footer-brand__right--link'));
  b.querySelectorAll('.header-footer-brand__left--link').forEach(el=>el.classList.add('header-footer-brand__left--link'));
  const overlay=b.querySelector('.header-overlay');
  if(overlay) overlay.classList.add('header-overlay');
}