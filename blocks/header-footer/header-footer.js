export default function decorate(b){
  b.classList.add('header-position-relative','header-block');
  // App Name
  const appName = b.querySelector('.header-app-name');
  if (appName) appName.classList.add('header-block__app-name');

  // Header Container
  const header = b.querySelector('.header-boing-container');
  if (header) header.classList.add('header-block__main-header');

  // Logo
  const logoLink = b.querySelector('.header-header__logo-img');
  if (logoLink) logoLink.classList.add('header-block__logo-img');

  // Login Button
  const loginBtn = b.querySelector('.header-header__login-btn');
  if (loginBtn) loginBtn.classList.add('header-block__login-btn');

  // Sidebar Menu
  const sidebar = b.querySelector('.header-sidebar');
  if (sidebar) sidebar.classList.add('header-block__sidebar');

  // Sidebar menu items
  b.querySelectorAll('.header-sidebar__menu-item').forEach((item)=>{
    item.classList.add('header-block__sidebar-menu-item');
  });
  b.querySelectorAll('.header-sidebar__menu-link').forEach((link)=>{
    link.classList.add('header-block__sidebar-menu-link');
  });
  b.querySelectorAll('.header-sidebar__menu-icon').forEach((icon)=>{
    icon.classList.add('header-block__sidebar-menu-icon');
  });

  // Footer
  const footer = b.querySelector('.header-footer-brand');
  if (footer) footer.classList.add('header-block__footer');

  // Footer links
  b.querySelectorAll('.header-footer-list__item--link').forEach((flink)=>{
    flink.classList.add('header-block__footer-link');
  });

  // Footer Social Links
  b.querySelectorAll('.header-footer-brand__right--link').forEach((slink)=>{
    slink.classList.add('header-block__footer-social-link');
  });
  b.querySelectorAll('.header-footer-brand__right--item').forEach((sitem)=>{
    sitem.classList.add('header-block__footer-social-item');
  });

  // Copyright
  const copyright = b.querySelector('.header-footer-brand__left--copyright');
  if (copyright) copyright.classList.add('header-block__copyright');

  // Overlay
  const overlay = b.querySelector('.header-overlay');
  if (overlay) overlay.classList.add('header-block__overlay');
}
