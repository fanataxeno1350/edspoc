import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandSection = document.createElement('section');
  footerBrandSection.classList.add('footer-brand-section');

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');

  const containerPrimary = document.createElement('div');
  containerPrimary.classList.add('container');

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content');

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.classList.add('footer-brand-left-section');

  // Primary Logo
  const logoWrapper = block.querySelector('[data-aue-prop="logo"]');
  if (logoWrapper) {
    const logoLink = logoWrapper.querySelector('a');
    const logoImg = logoWrapper.querySelector('img');
    if (logoLink && logoImg) {
      const newLogoLink = document.createElement('a');
      newLogoLink.href = logoLink.href;
      newLogoLink.target = '_blank';
      newLogoLink.classList.add('footer-brand-logo-link', 'analytics_cta_click');
      newLogoLink.setAttribute('data-cta-region', 'Footer');
      newLogoLink.setAttribute('aria-label', logoImg.alt || 'Logo');

      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').classList.add('footer-brand-logo-img');
      picture.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(logoImg, picture.querySelector('img'));

      newLogoLink.append(picture);
      footerBrandLeftSection.append(newLogoLink);
      moveInstrumentation(logoLink, newLogoLink);
    }
  }

  // Secondary Logo
  const secondaryLogoWrapper = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoWrapper) {
    const secondaryLogoImg = secondaryLogoWrapper.querySelector('img');
    if (secondaryLogoImg) {
      const newSecondaryLogoWrapper = document.createElement('div');
      newSecondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');

      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      picture.querySelector('img').classList.add('footer-brand-secondary-logo-img');
      picture.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(secondaryLogoImg, picture.querySelector('img'));

      newSecondaryLogoWrapper.append(picture);
      footerBrandLeftSection.append(newSecondaryLogoWrapper);
      moveInstrumentation(secondaryLogoWrapper, newSecondaryLogoWrapper);
    }
  }

  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.classList.add('footer-brand-right-section');

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');

  // Footer Links
  const footerLinksElements = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentLeftList = null;
  let currentRightList = null;
  let leftListCount = 0;
  let rightListCount = 0;

  footerLinksElements.forEach((linkItem, index) => {
    const linkEl = linkItem.querySelector('[data-aue-prop="link"] a');
    const labelEl = linkItem.querySelector('[data-aue-prop="label"]');

    if (linkEl && labelEl) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-list-item');

      const link = document.createElement('a');
      link.href = linkEl.href;
      link.textContent = labelEl.textContent.trim();
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
      link.setAttribute('data-link-region', 'Footer List');
      if (linkEl.target) {
        link.target = linkEl.target;
      }
      listItem.append(link);
      moveInstrumentation(linkItem, listItem);

      if (index % 6 < 3) { // First three links for left column
        if (leftListCount % 3 === 0) {
          const footerListComponent = document.createElement('div');
          footerListComponent.classList.add('footer-list-component');
          currentLeftList = document.createElement('ul');
          currentLeftList.classList.add('footer-list');
          footerListComponent.append(currentLeftList);
          footerBrandNavbarLeft.append(footerListComponent);
        }
        if (currentLeftList) {
          currentLeftList.append(listItem);
        }
        leftListCount++;
      } else { // Next three links for right column
        if (rightListCount % 3 === 0) {
          const footerListComponent = document.createElement('div');
          footerListComponent.classList.add('footer-list-component');
          currentRightList = document.createElement('ul');
          currentRightList.classList.add('footer-list');
          footerListComponent.append(currentRightList);
          footerBrandNavbarRight.append(footerListComponent);
        }
        if (currentRightList) {
          currentRightList.append(listItem);
        }
        rightListCount++;
      }
    }
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightSection.append(footerBrandNavbar);

  footerBrandPrimaryContent.append(footerBrandLeftSection, footerBrandRightSection);
  containerPrimary.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(containerPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');

  const containerSecondary = document.createElement('div');
  containerSecondary.classList.add('container');

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary-content');

  const footerBrandRightSectionSocial = document.createElement('section');
  footerBrandRightSectionSocial.classList.add('footer-brand-right-section-social');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-social-media-title');
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSectionSocial.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list');

  // Footer Social Links
  const footerSocialLinksElements = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinksElements.forEach((socialLinkItem) => {
    const linkEl = socialLinkItem.querySelector('[data-aue-prop="link"] a');
    const iconEl = socialLinkItem.querySelector('[data-aue-prop="icon"] img');

    if (linkEl && iconEl) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-brand-right-item');

      const link = document.createElement('a');
      link.href = linkEl.href;
      link.classList.add('footer-brand-right-link', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${iconEl.alt.toLowerCase()}`);
      link.target = '_blank';
      link.setAttribute('data-platform-name', iconEl.alt.toLowerCase());
      link.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(iconEl.src, iconEl.alt);
      picture.querySelector('img').classList.add('footer-social-media-image');
      picture.querySelector('img').setAttribute('aria-label', iconEl.alt);
      picture.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(iconEl, picture.querySelector('img'));

      link.append(picture);
      listItem.append(link);
      socialList.append(listItem);
      moveInstrumentation(socialLinkItem, listItem);
    }
  });
  footerBrandRightSectionSocial.append(socialList);

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');

  // ITC Portal Link (hardcoded based on sample, assuming it's not dynamic from AUE for now)
  const itcPortalLinkItem = document.createElement('li');
  itcPortalLinkItem.classList.add('footer-brand-left-item', 'footer-link');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLinkItem.append(itcPortalLink);
  copyrightList.append(itcPortalLinkItem);

  const copyrightWrapper = document.createElement('div');
  copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');

  const copyrightTextElement = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightTextElement) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.textContent = copyrightTextElement.textContent.trim();
    copyrightWrapper.append(copyrightSpan);
    moveInstrumentation(copyrightTextElement, copyrightSpan);
  }

  footerBrandLeftSectionCopyright.append(copyrightList, copyrightWrapper);

  footerBrandSecondaryContent.append(footerBrandRightSectionSocial, footerBrandLeftSectionCopyright);
  containerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(containerSecondary);

  footerBrandWrapper.append(footerBrandPrimary, footerBrandSecondary);
  footerBrandSection.append(footerBrandWrapper);

  block.textContent = '';
  block.append(footerBrandSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
