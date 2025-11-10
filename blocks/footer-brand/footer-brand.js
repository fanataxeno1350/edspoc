export default function decorate(b){
  b.classList.add('footer-brand-block');
  const wrapper = b.querySelector('.footer-brand-wrapper');
  if(wrapper) wrapper.classList.add('footer-brand-wrapper-enhanced');
  const logo = b.querySelector('.footer-brand-logo');
  if(logo) logo.classList.add('footer-brand-logo-enhanced');
  const secondaryLogo = b.querySelector('.footer-brand-secondary-logo');
  if(secondaryLogo) secondaryLogo.classList.add('footer-brand-secondary-logo-enhanced');
  b.querySelectorAll('.footer-list-link').forEach(link => {
    link.classList.add('footer-brand-link-enhanced');
    if(link.href && !link.href.includes(window.location.hostname)){
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
  b.querySelectorAll('.footer-brand-right-link').forEach(link => {
    link.classList.add('footer-brand-social-link-enhanced');
    if(link.href && !link.href.includes(window.location.hostname)){
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
  const copyright = b.querySelector('.footer-brand-left-copyright');
  if(copyright) copyright.classList.add('footer-brand-copyright-enhanced');
}