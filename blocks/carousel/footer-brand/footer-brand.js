import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandContainer = document.createElement('section');
  footerBrandContainer.classList.add('footer-brand-container-hd', 'p-0');
  moveInstrumentation(block, footerBrandContainer);

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrandContainer.append(footerBrandWrapper);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  footerBrandWrapper.append(footerBrandPrimary);

  const footerBrandInnerContainer = document.createElement('div');
  footerBrandInnerContainer.classList.add('footer-brand-container');
  footerBrandPrimary.append(footerBrandInnerContainer);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  footerBrandInnerContainer.append(footerBrandPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  footerBrandPrimaryContent.append(footerBrandLeft);

  // Logo 1
  const logo1Wrapper = document.createElement('a');
  logo1Wrapper.classList.add('footer-brand-logo', 'd-inline-block', 'analytics_cta_click');
  const logo1 = block.querySelector('[data-aue-prop="logo1"]');
  if (logo1) {
    logo1Wrapper.href = logo1.href || '#';
    logo1Wrapper.target = '_blank';
    logo1Wrapper.setAttribute('aria-label', logo1.alt || '');
    logo1Wrapper.setAttribute('data-cta-region', 'Footer');
    const pic = createOptimizedPicture(logo1.src, logo1.alt);
    pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(logo1, pic.querySelector('img'));
    logo1Wrapper.append(pic);
  }
  footerBrandLeft.append(logo1Wrapper);

  // Logo 2
  const logo2Wrapper = document.createElement('div');
  logo2Wrapper.classList.add('footer-brand-secondary--logo', 'd-inline-block');
  const logo2 = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2) {
    const pic = createOptimizedPicture(logo2.src, logo2.alt);
    pic.querySelector('img').classList.add('object-fit-contain', 'w-100');
    moveInstrumentation(logo2, pic.querySelector('img'));
    logo2Wrapper.append(pic);
  }
  footerBrandLeft.append(logo2Wrapper);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand-right');
  footerBrandPrimaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  // Primary Links
  const primaryLinksContainer = block.querySelector('[data-aue-prop="primaryLinks"]');
  if (primaryLinksContainer) {
    const footerListComponent = document.createElement('div');
    footerListComponent.classList.add('footer-list-component');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    Array.from(primaryLinksContainer.children).forEach((linkItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-item');
      const link = linkItem.querySelector('[data-aue-prop="link"]');
      const text = linkItem.querySelector('[data-aue-prop="text"]');
      if (link && text) {
        const a = document.createElement('a');
        a.href = link.href || '#';
        a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item--link', 'd-inline-block');
        a.setAttribute('data-link-region', 'Footer List');
        a.append(...text.childNodes);
        moveInstrumentation(text, a);
        moveInstrumentation(link, a);
        li.append(a);
      }
      ul.append(li);
    });
    footerListComponent.append(ul);
    footerBrandNavbarLeft.append(footerListComponent);
  }

  // Secondary Links
  const secondaryLinksContainer = block.querySelector('[data-aue-prop="secondaryLinks"]');
  if (secondaryLinksContainer) {
    const footerListComponent = document.createElement('div');
    footerListComponent.classList.add('footer-list-component');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    Array.from(secondaryLinksContainer.children).forEach((linkItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-item');
      const link = linkItem.querySelector('[data-aue-prop="link"]');
      const text = linkItem.querySelector('[data-aue-prop="text"]');
      if (link && text) {
        const a = document.createElement('a');
        a.href = link.href || '#';
        a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item--link', 'd-inline-block');
        a.setAttribute('data-link-region', 'Footer List');
        a.append(...text.childNodes);
        moveInstrumentation(text, a);
        moveInstrumentation(link, a);
        li.append(a);
      }
      ul.append(li);
    });
    footerListComponent.append(ul);
    footerBrandNavbarLeft.append(footerListComponent);
  }

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarRight);

  // Right Links
  const rightLinksContainer = block.querySelector('[data-aue-prop="rightLinks"]');
  if (rightLinksContainer) {
    const footerListComponent = document.createElement('div');
    footerListComponent.classList.add('footer-list-component');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    Array.from(rightLinksContainer.children).forEach((linkItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-item');
      const link = linkItem.querySelector('[data-aue-prop="link"]');
      const text = linkItem.querySelector('[data-aue-prop="text"]');
      if (link && text) {
        const a = document.createElement('a');
        a.href = link.href || '#';
        a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item--link', 'd-inline-block');
        a.setAttribute('data-link-region', 'Footer List');
        a.append(...text.childNodes);
        moveInstrumentation(text, a);
        moveInstrumentation(link, a);
        li.append(a);
      }
      ul.append(li);
    });
    footerListComponent.append(ul);
    footerBrandNavbarRight.append(footerListComponent);
  }

  // Extra Links
  const extraLinksContainer = block.querySelector('[data-aue-prop="extraLinks"]');
  if (extraLinksContainer) {
    const footerListComponent = document.createElement('div');
    footerListComponent.classList.add('footer-list-component');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    Array.from(extraLinksContainer.children).forEach((linkItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-item');
      const link = linkItem.querySelector('[data-aue-prop="link"]');
      const text = linkItem.querySelector('[data-aue-prop="text"]');
      if (link && text) {
        const a = document.createElement('a');
        a.href = link.href || '#';
        a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item--link', 'd-inline-block');
        a.setAttribute('data-link-region', 'Footer List');
        a.append(...text.childNodes);
        moveInstrumentation(text, a);
        moveInstrumentation(link, a);
        li.append(a);
      }
      ul.append(li);
    });
    footerListComponent.append(ul);
    footerBrandNavbarRight.append(footerListComponent);
  }

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandWrapper.append(footerBrandSecondary);

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.classList.add('footer-brand-container');
  footerBrandSecondary.append(footerBrandSecondaryContainer);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand-right', 'd-flex', 'flex-column', 'pb-5');
  footerBrandSecondaryContent.append(footerBrandRightSecondary);

  const followUsTitle = document.createElement('h3');
  followUsTitle.classList.add('footer-social-media--title');
  followUsTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(followUsTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add('footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  footerBrandRightSecondary.append(socialMediaList);

  // Social Links
  const socialLinksContainer = block.querySelector('[data-aue-prop="socialLinks"]');
  if (socialLinksContainer) {
    Array.from(socialLinksContainer.children).forEach((socialItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');
      const link = socialItem.querySelector('[data-aue-prop="link"]');
      const icon = socialItem.querySelector('[data-aue-prop="icon"]');
      if (link && icon) {
        const a = document.createElement('a');
        a.href = link.href || '#';
        a.classList.add('footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
        a.target = '_blank';
        a.setAttribute('data-cta-region', 'Footer');
        const platformName = new URL(link.href).hostname.split('.')[0];
        a.setAttribute('data-cta-label', `footer-${platformName}`);
        a.setAttribute('data-platform-name', platformName);
        a.setAttribute('data-social-linktype', 'follow');

        const pic = createOptimizedPicture(icon.src, icon.alt);
        pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
        pic.querySelector('img').setAttribute('aria-label', platformName);
        moveInstrumentation(icon, pic.querySelector('img'));
        a.append(pic);
        moveInstrumentation(link, a);
        li.append(a);
      }
      socialMediaList.append(li);
    });
  }

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandLeftSecondary.append(footerBrandLeftList);

  // ITC Portal Link (hardcoded from example, assuming it's not dynamic via AUE prop for now)
  const itcPortalLi = document.createElement('li');
  itcPortalLi.classList.add('footer-brand-left--item', 'footer-foot_link');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.classList.add('footer-brand-left--link', 'analytics_cta_click');
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  footerBrandLeftList.append(itcPortalLi);

  // Copyright
  const copyrightWrapper = document.createElement('div');
  copyrightWrapper.classList.add('footer-brand-left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand-left--text', 'text-white');
  const copyrightContent = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightContent) {
    copyrightSpan.append(...copyrightContent.childNodes);
    moveInstrumentation(copyrightContent, copyrightSpan);
  }
  copyrightWrapper.append(copyrightSpan);
  footerBrandLeftSecondary.append(copyrightWrapper);

  block.replaceWith(footerBrandContainer);
}
