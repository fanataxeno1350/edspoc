export default function decorate(b){
  b.classList.add('header-section-top-0','header-section-start-0','header-section-w-100','header-section-z-3');
  const mainContainer = b.querySelector('.header-container-hd.header-fmm-container.header-p-0');
  if(mainContainer){
    mainContainer.classList.add('header-container-hd','header-fmm-container','header-p-0');
    const primary = mainContainer.querySelector('.header-primary');
    if(primary) primary.classList.add('header-primary');
    const logoDesktop = mainContainer.querySelector('.header-primary__logo');
    if(logoDesktop) logoDesktop.classList.add('header-primary__logo','header-d-inline-block','header-cta-analytics');
    const logoDesktopImg = logoDesktop ? logoDesktop.querySelector('img') : null;
    if(logoDesktopImg) logoDesktopImg.classList.add('header-object-fit-contain','header-w-100','header-h-100');
    const navDesktop = mainContainer.querySelector('.header-primary__navbar--desktop');
    if(navDesktop) navDesktop.classList.add('header-primary__navbar--desktop','header-d-none','header-d-lg-block');
  }
  const logoMobile = b.querySelector('.header-primary__mobile--logo');
  if(logoMobile) logoMobile.classList.add('header-primary__mobile--logo','header-d-inline-block','header-d-lg-none','header-cta-analytics');
  const logoMobileImg = logoMobile ? logoMobile.querySelector('img') : null;
  if(logoMobileImg) logoMobileImg.classList.add('header-object-fit-contain','header-w-100','header-h-100');
  const modal = b.parentElement.querySelector('.header-primary__modal');
  if(modal){
    modal.classList.add('header-primary__modal','header-z-3','header-start-0','header-w-100');
    const modalContainer = modal.querySelector('.header-primary__modal--container');
    if(modalContainer) modalContainer.classList.add('header-primary__modal--container','header-h-100','header-w-100');
    const sidemenu = modalContainer ? modalContainer.querySelector('.header-primary__sidemenu') : null;
    if(sidemenu) sidemenu.classList.add('header-primary__sidemenu','header-h-100','header-overflow-auto');
    const navMobile = sidemenu ? sidemenu.querySelector('.header-primary__sidemenu--navbar') : null;
    if(navMobile) navMobile.classList.add('header-primary__sidemenu--navbar');
  }
  const spacer = b.parentElement.querySelector('.header-primary__spacer');
  if(spacer) spacer.classList.add('header-container-hd','header-fmm-container','header-p-0','header-primary__spacer');
}