export default function decorate(b) {
  b.classList.add('footer-brand-section');
  const wrapper = b.querySelector('.footer-brand-wrapper');
  if (wrapper) {
    wrapper.classList.add('footer-brand-bg-boing-neutral-gray-600');
    const container = wrapper.querySelectorAll('.footer-brand-container');
    container.forEach(el => el.classList.add('footer-brand-container'));
  }
  const logo = b.querySelector('.footer-brand-logo');
  if (logo) logo.classList.add('d-inline-block', 'analytics_cta_click');
  const logoImg = b.querySelector('.footer-brand-logo img');
  if (logoImg) logoImg.classList.add('footer-brand-object-fit-contain', 'w-100', 'h-100');
  const secLogo = b.querySelector('.footer-brand-secondary-logo img');
  if (secLogo) secLogo.classList.add('footer-brand-object-fit-contain', 'w-100');
  const navbars = b.querySelectorAll('.footer-brand-navbar');
  navbars.forEach(nav => nav.classList.add('d-grid', 'd-md-flex'));
  const lists = b.querySelectorAll('.footer-list');
  lists.forEach(list => list.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column'));
  const items = b.querySelectorAll('.footer-list-item');
  items.forEach(item => item.classList.add('footer-list-item'));
  const links = b.querySelectorAll('.footer-list-item-link');
  links.forEach(link => link.classList.add('d-inline-block'));
  const socialTitle = b.querySelector('.footer-brand-social-media-title');
  if (socialTitle) socialTitle.classList.add('footer-brand-social-media-title');
  const socialList = b.querySelector('.footer-brand-right-list');
  if (socialList) socialList.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  const socialItems = b.querySelectorAll('.footer-brand-right-item');
  socialItems.forEach(item => item.classList.add('d-flex', 'justify-content-center', 'align-items-center'));
  const socialLinks = b.querySelectorAll('.footer-brand-right-link');
  socialLinks.forEach(link => link.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click'));
  const leftLinks = b.querySelectorAll('.footer-brand-left-link');
  leftLinks.forEach(link => link.classList.add('analytics_cta_click'));
  const copyright = b.querySelector('.footer-brand-left-copyright');
  if (copyright) copyright.classList.add('text-center');
  const copyrightText = b.querySelector('.footer-brand-left-text');
  if (copyrightText) copyrightText.classList.add('text-white');
}