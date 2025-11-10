export default function decorate(b){
  b.classList.add('header-position-relative','header-mb-15');
  const appName = b.querySelector('.header-app-name');
  if(appName && appName.dataset.appName){
    appName.classList.add('header-app-name-init');
  }
  const header = b.querySelector('.header-boing-container');
  if(header){
    header.classList.add('header-header-init');
    const logo = header.querySelector('.header-header__logo-img');
    if(logo){
      logo.classList.add('header-header__logo-img-init');
    }
    const loginBtn = header.querySelector('.header-header__login-btn');
    if(loginBtn){
      loginBtn.classList.add('header-header__login-btn-init');
    }
  }
  const sidebar = b.querySelector('.header-sidebar');
  if(sidebar){
    sidebar.classList.add('header-sidebar-init');
    sidebar.querySelectorAll('.header-sidebar__menu-item').forEach((item)=>{
      item.classList.add('header-sidebar__menu-item-init');
      const link = item.querySelector('.header-sidebar__menu-link');
      if(link){
        link.classList.add('header-sidebar__menu-link-init');
      }
      const icon = item.querySelector('.header-sidebar__menu-icon');
      if(icon){
        icon.classList.add('header-sidebar__menu-icon-init');
      }
    });
  }
  const footerBrand = b.querySelector('.header-footer-brand');
  if(footerBrand){
    footerBrand.classList.add('header-footer-brand-init');
    footerBrand.querySelectorAll('.header-footer-list__item--link').forEach((link)=>{
      link.classList.add('header-footer-list__item--link-init');
    });
    footerBrand.querySelectorAll('.header-footer-brand__logo img').forEach((img)=>{
      img.classList.add('header-footer-brand__logo-img-init');
    });
    footerBrand.querySelectorAll('.header-footer-brand__secondary--logo img').forEach((img)=>{
      img.classList.add('header-footer-brand__secondary--logo-img-init');
    });
    footerBrand.querySelectorAll('.header-footer-brand__right--link').forEach((a)=>{
      a.classList.add('header-footer-brand__right--link-init');
    });
    footerBrand.querySelectorAll('.header-footer-brand__right--item').forEach((li)=>{
      li.classList.add('header-footer-brand__right--item-init');
    });
    const copyright = footerBrand.querySelector('.header-footer-brand__left--copyright');
    if(copyright){
      copyright.classList.add('header-footer-brand__left--copyright-init');
    }
  }
  const overlay = b.querySelector('.header-overlay');
  if(overlay){
    overlay.classList.add('header-overlay-init');
  }
}
