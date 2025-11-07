export default function decorate(b){
  b.classList.add('header-footer-brand-block');
  const appName = b.querySelector('.header-app-name');
  if(appName){
    appName.classList.add('header-app-name--visible');
  }
  const headerLogo = b.querySelector('.header__logo-img');
  if(headerLogo){
    headerLogo.classList.add('header__logo-img--block');
  }
  const loginBtn = b.querySelector('.header__login-btn-wrapper');
  if(loginBtn){
    loginBtn.classList.add('header__login-btn-wrapper--block');
  }
  const navItems = b.querySelectorAll('.header-sidebar__menu-item');
  navItems.forEach(item => {
    item.classList.add('header-sidebar__menu-item--block');
  });
  const footerLogo1 = b.querySelector('.header-footer-brand__logo img');
  if(footerLogo1){
    footerLogo1.classList.add('header-footer-brand__logo-img--block');
  }
  const footerLogo2 = b.querySelector('.header-footer-brand__secondary--logo img');
  if(footerLogo2){
    footerLogo2.classList.add('header-footer-brand__secondary--logo-img--block');
  }
  const footerLinks = b.querySelectorAll('.header-footer-list__item--link');
  footerLinks.forEach(link => {
    link.classList.add('header-footer-list__item--link-block');
  });
  const socialLinks = b.querySelectorAll('.header-footer-brand__right--link');
  socialLinks.forEach(link => {
    link.classList.add('header-footer-brand__right--link-block');
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  });
  const copyright = b.querySelector('.header-footer-brand__left--copyright');
  if(copyright){
    copyright.classList.add('header-footer-brand__left--copyright-block');
  }
}