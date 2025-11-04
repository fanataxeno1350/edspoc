export default function decorate(block) {
  // Container
  block.classList.add('footer-brand-container-hd', 'p-0');
  const wrapper = block.querySelector('.footer-brand-wrapper');
  if (wrapper) {
    wrapper.classList.add('w-100', 'bg-boing-neutral-gray-600');
  }

  // Primary section
  const primarySection = block.querySelector('.footer-brand-primary');
  if (primarySection) {
    primarySection.style.backgroundColor = '';
    const container = primarySection.querySelector('.footer-brand-container');
    if (container) {
      const content = container.querySelector('.footer-brand-primary--content');
      if (content) {
        content.classList.add('d-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
      }
      const left = container.querySelector('.footer-brand-left');
      if (left) {
        left.classList.add('d-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
      }
      const right = container.querySelector('.footer-brand-right');
      if (right) {
        // Navigation
        const nav = right.querySelector('.footer-brand-navbar');
        if (nav) {
          nav.classList.add('d-grid', 'd-md-flex');
        }
        // Columns
        nav?.querySelectorAll('.footer-brand-navbar--left, .footer-brand-navbar--right').forEach(col => {
          col.classList.add('d-flex', 'flex-column', 'flex-md-row');
        });
        // Lists
        nav?.querySelectorAll('.footer-list-component').forEach(listComp => {
          listComp.querySelectorAll('.footer-list').forEach(list => {
            list.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
          });
        });
      }
    }
  }

  // Secondary section
  const secondarySection = block.querySelector('.footer-brand-secondary');
  if (secondarySection) {
    secondarySection.style.backgroundColor = '';
    const container = secondarySection.querySelector('.footer-brand-container');
    if (container) {
      const content = container.querySelector('.footer-brand-secondary--content');
      if (content) {
        content.classList.add('d-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
      }
      // Social section
      const right = container.querySelector('.footer-brand-right');
      if (right) {
        right.classList.add('d-flex', 'flex-column', 'pb-5');
        const socialTitle = right.querySelector('.footer-social-media--title');
        if (socialTitle) {
          socialTitle.classList.add('footer-social-media--title');
        }
        const socialList = right.querySelector('.footer-brand-right--list');
        if (socialList) {
          socialList.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
        }
        socialList?.querySelectorAll('.footer-brand-right--item').forEach(item => {
          item.classList.add('d-flex', 'justify-content-center', 'align-items-center');
          const link = item.querySelector('.footer-brand-right--link');
          if (link) {
            link.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
          }
        });
      }
      // Copyright section
      const left = container.querySelector('.footer-brand-left');
      if (left) {
        left.classList.add('py-5', 'd-flex', 'flex-column', 'gap-3');
        const list = left.querySelector('.footer-brand-left--list');
        if (list) {
          list.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
        }
        left.querySelectorAll('.footer-brand-left--item').forEach(item => {
          item.classList.add('footer-foot_link');
        });
        const copyright = left.querySelector('.footer-brand-left--copyright');
        if (copyright) {
          copyright.classList.add('text-center');
          const copyrightText = copyright.querySelector('.footer-brand-left--text');
          if (copyrightText) {
            copyrightText.classList.add('text-white');
          }
        }
      }
    }
  }
}