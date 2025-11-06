export default function decorate(b){
  b.classList.add('footer-brand-container-hd');
  const wrappers = b.querySelectorAll('.footer-brand-wrapper');
  wrappers.forEach(wrapper => {
    wrapper.classList.add('w-100','bg-boing-neutral-gray-600');
    const prim = wrapper.querySelector('.footer-brand-primary');
    if(prim) {
      prim.classList.add('footer-brand-primary');
      const left = prim.querySelector('.footer-brand-left');
      if(left) left.classList.add('d-flex','gap-16','px-10','align-items-center','justify-content-center');
      const nav = prim.querySelector('.footer-brand-navbar');
      if(nav) nav.classList.add('d-grid','d-md-flex');
      const lists = nav ? nav.querySelectorAll('.footer-list') : [];
      lists.forEach(list => list.classList.add('d-flex','align-items-center','justify-content-center','align-items-md-start','flex-column'));
      const links = nav ? nav.querySelectorAll('a') : [];
      links.forEach(link => {
        link.classList.add('footer-list-item--link','d-inline-block');
        if(link.href && !link.href.includes(window.location.hostname)){
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      });
    }
    const sec = wrapper.querySelector('.footer-brand-secondary');
    if(sec) {
      sec.classList.add('footer-brand-secondary');
      const social = sec.querySelector('.footer-brand-right--list');
      if(social) social.classList.add('d-flex','align-items-center','justify-content-center','px-10','flex-wrap');
      const socialLinks = social ? social.querySelectorAll('a') : [];
      socialLinks.forEach(link => {
        link.classList.add('footer-brand-right--link','d-flex','justify-content-center','align-items-center');
        if(link.href && !link.href.includes(window.location.hostname)){
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      });
      const copyright = sec.querySelector('.footer-brand-left--copyright');
      if(copyright) copyright.classList.add('text-center');
    }
  });
}
