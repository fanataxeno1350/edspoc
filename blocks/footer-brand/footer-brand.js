export default function decorate(b){
  b.classList.add('footer-brand-section');
  const wrapper=b.querySelector('.footer-brand-wrapper');
  if(wrapper) wrapper.classList.add('footer-brand-bg-boing-neutral-gray-600');
  const logoLink=b.querySelector('.footer-brand-logo');
  if(logoLink){
    logoLink.classList.add('d-inline-block','analytics_cta_click');
    const img=logoLink.querySelector('img');
    if(img){
      img.classList.add('footer-brand-object-fit-contain','w-100','h-100');
      img.setAttribute('loading','lazy');
    }
  }
  const secondaryLogo=b.querySelector('.footer-brand-secondary-logo img');
  if(secondaryLogo){
    secondaryLogo.classList.add('footer-brand-object-fit-contain','w-100');
    secondaryLogo.setAttribute('loading','lazy');
  }
  b.querySelectorAll('.footer-list-item-link').forEach(a=>{
    a.classList.add('footer-list-cta-analytics','analytics_cta_click','d-inline-block');
  });
  b.querySelectorAll('.footer-brand-right-link').forEach(a=>{
    a.classList.add('d-flex','justify-content-center','align-items-center','analytics_cta_click');
    a.setAttribute('target','_blank');
  });
  b.querySelectorAll('.footer-brand-right-link img').forEach(img=>{
    img.classList.add('footer-brand-object-fit-contain','w-100','h-100');
    img.setAttribute('loading','lazy');
  });
  const copyright=b.querySelector('.footer-brand-left-copyright');
  if(copyright){
    copyright.classList.add('text-center');
    const span=copyright.querySelector('.footer-brand-left-text');
    if(span) span.classList.add('text-white');
  }
}