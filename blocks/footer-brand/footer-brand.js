import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandSection = document.createElement('section');
  footerBrandSection.classList.add('footer-brand-section', 'p-0');
  moveInstrumentation(block, footerBrandSection);

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrandSection.append(footerBrandWrapper);

  // Primary Section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  footerBrandWrapper.append(footerBrandPrimary);

  const footerBrandContainerPrimary = document.createElement('div');
  footerBrandContainerPrimary.classList.add('footer-brand-container', 'container');
  footerBrandPrimary.append(footerBrandContainerPrimary);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  footerBrandContainerPrimary.append(footerBrandPrimaryContent);

  // Footer Brand Left (Logos)
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  footerBrandPrimaryContent.append(footerBrandLeft);

  const mainLogoWrapper = document.createElement('a');
  mainLogoWrapper.classList.add('footer-brand-logo', 'd-inline-block', 'analytics_cta_click');
  footerBrandLeft.append(mainLogoWrapper);

  const mainLogo = block.querySelector('[data-aue-prop="mainLogo"]');
  if (mainLogo) {
    const img = mainLogo.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      mainLogoWrapper.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
      moveInstrumentation(mainLogo, mainLogoWrapper);
      mainLogoWrapper.href = mainLogo.href || '#';
      mainLogoWrapper.target = '_blank';
      mainLogoWrapper.setAttribute('aria-label', img.alt);
    }
  }

  const secondaryLogoWrapper = document.createElement('div');
  secondaryLogoWrapper.classList.add('footer-brand-secondary-logo', 'd-inline-block');
  footerBrandLeft.append(secondaryLogoWrapper);

  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogo) {
    const img = secondaryLogo.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      secondaryLogoWrapper.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
      moveInstrumentation(secondaryLogo, secondaryLogoWrapper);
    }
  }

  // Footer Brand Right (Navigation)
  const footerBrandRightNav = document.createElement('section');
  footerBrandRightNav.classList.add('footer-brand-right');
  footerBrandPrimaryContent.append(footerBrandRightNav);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRightNav.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarRight);

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentListWrapper = null;
  let currentList = null;
  let linkCounter = 0;

  footerLinks.forEach((linkItem) => {
    if (linkCounter % 3 === 0) {
      currentListWrapper = document.createElement('div');
      currentListWrapper.classList.add('footer-list-wrapper');
      if (linkCounter < 6) {
        footerBrandNavbarLeft.append(currentListWrapper);
      } else {
        footerBrandNavbarRight.append(currentListWrapper);
      }

      currentList = document.createElement('ul');
      currentList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      currentListWrapper.append(currentList);
    }

    const listItem = document.createElement('li');
    listItem.classList.add('footer-list-item');
    currentList.append(listItem);

    const linkElement = linkItem.querySelector('[data-aue-prop="link"]');
    const labelElement = linkItem.querySelector('[data-aue-prop="label"]');

    if (linkElement && labelElement) {
      const anchor = document.createElement('a');
      anchor.classList.add('footer-list-item-link', 'cta-analytics', 'analytics_cta_click', 'd-inline-block');
      anchor.href = linkElement.href || '#';
      anchor.textContent = labelElement.textContent;
      anchor.setAttribute('data-link-region', 'Footer List');
      if (linkElement.target) {
        anchor.target = linkElement.target;
      }
      listItem.append(anchor);
      moveInstrumentation(linkItem, listItem);
      moveInstrumentation(linkElement, anchor);
      moveInstrumentation(labelElement, anchor);
    }
    linkCounter += 1;
  });

  // Secondary Section
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandWrapper.append(footerBrandSecondary);

  const footerBrandContainerSecondary = document.createElement('div');
  footerBrandContainerSecondary.classList.add('footer-brand-container', 'container');
  footerBrandSecondary.append(footerBrandContainerSecondary);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary-content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  footerBrandContainerSecondary.append(footerBrandSecondaryContent);

  // Footer Brand Right (Social Media)
  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.classList.add('footer-brand-right', 'd-flex', 'flex-column', 'pb-5');
  footerBrandSecondaryContent.append(footerBrandRightSocial);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-brand-social-media-title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandRightSocial.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  footerBrandRightSocial.append(socialList);

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialLinkItem) => {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand-right-item', 'd-flex', 'justify-content-center', 'align-items-center');
    socialList.append(listItem);

    const socialLinkElement = socialLinkItem.querySelector('[data-aue-prop="socialLink"]');
    const iconElement = socialLinkItem.querySelector('[data-aue-prop="icon"]');

    if (socialLinkElement && iconElement) {
      const anchor = document.createElement('a');
      anchor.classList.add('footer-brand-right-link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      anchor.href = socialLinkElement.href || '#';
      anchor.target = '_blank';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${iconElement.alt || 'social'}`);
      anchor.setAttribute('data-platform-name', iconElement.alt || 'social');
      anchor.setAttribute('data-social-linktype', 'follow');
      listItem.append(anchor);

      const img = iconElement.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        anchor.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
        moveInstrumentation(iconElement, anchor);
      }
      moveInstrumentation(socialLinkItem, listItem);
      moveInstrumentation(socialLinkElement, anchor);
    }
  });

  // Footer Brand Left (ITC Portal and Copyright)
  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);

  const itcPortalList = document.createElement('ul');
  itcPortalList.classList.add('footer-brand-left-list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandLeftSecondary.append(itcPortalList);

  const itcPortalListItem = document.createElement('li');
  itcPortalListItem.classList.add('footer-brand-left-item', 'footer-link');
  itcPortalList.append(itcPortalListItem);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const anchor = document.createElement('a');
    anchor.classList.add('footer-brand-left-link', 'analytics_cta_click');
    anchor.href = itcPortalLink.href || '#';
    anchor.textContent = itcPortalLink.textContent;
    anchor.target = '_blank';
    anchor.setAttribute('data-cta-region', 'Footer');
    itcPortalListItem.append(anchor);
    moveInstrumentation(itcPortalLink, anchor);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-left-copyright', 'text-center');
  footerBrandLeftSecondary.append(copyrightDiv);

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.classList.add('footer-brand-left-text', 'text-white');
  copyrightDiv.append(copyrightTextSpan);

  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightTextSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightTextSpan);
  }

  block.replaceWith(footerBrandSection);
}
