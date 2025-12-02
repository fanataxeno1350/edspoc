import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'w-100', 'bg-boing-neutral-gray-600');
  moveInstrumentation(block, footerBrandWrapper);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');

  const footerBrandContainerPrimary = document.createElement('div');
  footerBrandContainerPrimary.classList.add('footer-brand-container', 'container');

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.classList.add('footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const itcLogoWrapper = document.createElement('a');
  itcLogoWrapper.classList.add('footer-brand-logo', 'd-inline-block', 'analytics_cta_click');
  itcLogoWrapper.setAttribute('data-cta-region', 'Footer');
  itcLogoWrapper.setAttribute('aria-label', 'ITC Logo');

  const itcLogo = block.querySelector('[data-aue-prop="itcLogo"]');
  if (itcLogo) {
    const itcPic = createOptimizedPicture(itcLogo.src, itcLogo.alt);
    itcLogoWrapper.href = itcLogo.parentElement.href || '#';
    itcLogoWrapper.target = '_blank';
    itcLogoWrapper.append(itcPic);
    moveInstrumentation(itcLogo, itcPic.querySelector('img'));
    moveInstrumentation(itcLogo.parentElement, itcLogoWrapper);
  }

  const fssiLogoWrapper = document.createElement('div');
  fssiLogoWrapper.classList.add('footer-brand-secondary-logo', 'd-inline-block');

  const fssiLogo = block.querySelector('[data-aue-prop="fssiLogo"]');
  if (fssiLogo) {
    const fssiPic = createOptimizedPicture(fssiLogo.src, fssiLogo.alt);
    fssiLogoWrapper.append(fssiPic);
    moveInstrumentation(fssiLogo, fssiPic.querySelector('img'));
  }

  footerBrandLeftPrimary.append(itcLogoWrapper, fssiLogoWrapper);

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.classList.add('footer-brand-right');

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right', 'd-flex', 'flex-column', 'flex-md-row');

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentListWrapper = null;
  let currentList = null;

  footerLinks.forEach((linkItem, index) => {
    if (index % 3 === 0) {
      currentListWrapper = document.createElement('div');
      currentListWrapper.classList.add('footer-list-wrapper');
      currentList = document.createElement('ul');
      currentList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      currentListWrapper.append(currentList);

      if (index < 6) {
        footerBrandNavbarLeft.append(currentListWrapper);
      } else {
        footerBrandNavbarRight.append(currentListWrapper);
      }
    }

    const listItem = document.createElement('li');
    listItem.classList.add('footer-list-item');

    const link = document.createElement('a');
    link.classList.add('footer-list-item-link', 'cta-analytics', 'analytics_cta_click', 'd-inline-block');
    link.setAttribute('data-link-region', 'Footer List');

    const url = linkItem.querySelector('[data-aue-prop="url"]');
    if (url) {
      link.href = url.href;
      moveInstrumentation(url, link);
    }

    const label = linkItem.querySelector('[data-aue-prop="label"]');
    if (label) {
      link.textContent = label.textContent;
      moveInstrumentation(label, link);
    }
    listItem.append(link);
    currentList.append(listItem);
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightPrimary.append(footerBrandNavbar);

  footerBrandPrimaryContent.append(footerBrandLeftPrimary, footerBrandRightPrimary);
  footerBrandContainerPrimary.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainerPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');

  const footerBrandContainerSecondary = document.createElement('div');
  footerBrandContainerSecondary.classList.add('footer-brand-container', 'container');

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary-content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand-right', 'd-flex', 'flex-column', 'pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-brand-social-media-title');
  socialMediaTitle.textContent = 'Follow Us On';

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialLinkItem) => {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand-right-item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand-right-link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    link.setAttribute('data-cta-region', 'Footer');
    link.target = '_blank';
    link.setAttribute('data-social-linktype', 'follow');

    const url = socialLinkItem.querySelector('[data-aue-prop="url"]');
    if (url) {
      link.href = url.href;
      link.setAttribute('data-cta-label', `footer-${url.textContent.toLowerCase()}`); // Assuming platform name from text
      link.setAttribute('data-platform-name', url.textContent.toLowerCase());
      moveInstrumentation(url, link);
    }

    const icon = socialLinkItem.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const iconPic = createOptimizedPicture(icon.src, icon.alt || '');
      iconPic.querySelector('img').classList.add('footer-brand-social-icon', 'object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      iconPic.querySelector('img').setAttribute('aria-label', icon.alt || '');
      link.append(iconPic);
      moveInstrumentation(icon, iconPic.querySelector('img'));
    }

    listItem.append(link);
    socialList.append(listItem);
  });

  footerBrandRightSecondary.append(socialMediaTitle, socialList);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const itcPortalList = document.createElement('ul');
  itcPortalList.classList.add('footer-brand-left-list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const itcPortalListItem = document.createElement('li');
  itcPortalListItem.classList.add('footer-brand-left-item', 'footer-link');

  const itcPortalLink = document.createElement('a');
  itcPortalLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.target = '_blank';

  const itcPortalLinkContent = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkContent) {
    itcPortalLink.href = itcPortalLinkContent.href;
    itcPortalLink.textContent = itcPortalLinkContent.textContent;
    moveInstrumentation(itcPortalLinkContent, itcPortalLink);
  }
  itcPortalListItem.append(itcPortalLink);
  itcPortalList.append(itcPortalListItem);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-left-copyright', 'text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand-left-text', 'text-white');

  const copyrightContent = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightContent) {
    copyrightSpan.textContent = copyrightContent.textContent;
    moveInstrumentation(copyrightContent, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);

  footerBrandLeftSecondary.append(itcPortalList, copyrightDiv);

  footerBrandSecondaryContent.append(footerBrandRightSecondary, footerBrandLeftSecondary);
  footerBrandContainerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandContainerSecondary);

  footerBrandWrapper.append(footerBrandPrimary, footerBrandSecondary);
  block.innerHTML = '';
  block.classList.add('footer-brand-section', 'p-0');
  block.append(footerBrandWrapper);
}
