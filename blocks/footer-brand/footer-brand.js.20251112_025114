export default function decorate(block){
  block.classList.add('footer-brand-section');
  const wrapper = block.querySelector('.footer-brand-wrapper');
  if(wrapper) wrapper.classList.add('footer-brand-wrapper');
  const logoLink = block.querySelector('.footer-brand-logo');
  if(logoLink) logoLink.classList.add('footer-brand-logo');
  const secondaryLogo = block.querySelector('.footer-brand-secondary-logo');
  if(secondaryLogo) secondaryLogo.classList.add('footer-brand-secondary-logo');
  const navBar = block.querySelector('.footer-brand-navbar');
  if(navBar) navBar.classList.add('footer-brand-navbar');
  const navItems = block.querySelectorAll('.footer-list-item-link');
  navItems.forEach(a => a.classList.add('footer-list-item-link'));
  const socialLinks = block.querySelectorAll('.footer-brand-right-link');
  socialLinks.forEach(link => {
    link.classList.add('footer-brand-right-link');
    if(link.href && !link.href.includes(window.location.hostname)){
      link.target='_blank'; link.rel='noopener noreferrer';
    }
  });
  const copyright = block.querySelector('.footer-brand-left-copyright');
  if(copyright) copyright.classList.add('footer-brand-left-copyright');
}