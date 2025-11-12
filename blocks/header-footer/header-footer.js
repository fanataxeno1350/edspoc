export default function decorate(b){
  // Add unique block class
  b.classList.add('header-footer-block');

  // App name
  const appName = b.querySelector('.header-app-name');
  if(appName) appName.classList.add('header-app-name--active');

  // Header logo
  const logoLink = b.querySelector('.header-header__logo-img');
  if(logoLink) logoLink.classList.add('header-header__logo-img--active');

  // Login button
  const loginBtn = b.querySelector('.header-header__login-btn');
  if(loginBtn) loginBtn.classList.add('header-header__login-btn--active');

  // Sidebar menu
  const sidebar = b.querySelector('.header-sidebar');
  if(sidebar) sidebar.classList.add('header-sidebar--active');

  // Footer ITC logo
  const itcLogo = b.querySelector('.header-footer-brand__logo img');
  if(itcLogo) itcLogo.classList.add('header-footer-brand__logo-img--active');

  // Footer FSSI logo
  const fssiLogo = b.querySelector('.header-footer-brand__secondary--logo img');
  if(fssiLogo) fssiLogo.classList.add('header-footer-brand__secondary--logo-img--active');

  // Footer social links
  const socialTitle = b.querySelector('.header-social_media--title');
  if(socialTitle) socialTitle.classList.add('header-social_media--title--active');

  const socialLinks = b.querySelectorAll('.header-footer-brand__right--link');
  socialLinks.forEach(link=>{
    link.classList.add('header-footer-brand__right--link--active');
    if(link.href&&!link.href.includes(window.location.hostname)){
      link.target='_blank';
      link.rel='noopener noreferrer';
    }
  });

  // Overlay
  const overlay = b.querySelector('.header-overlay');
  if(overlay) overlay.classList.add('header-overlay--active');
}