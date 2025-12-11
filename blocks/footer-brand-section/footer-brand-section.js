import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('section');
  footerBrandWrapper.classList.add('footer-brand-section');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-primary-content');
  footerBrandPrimary.append(primaryContainer);
  primaryContainer.append(primaryContent);

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.classList.add('footer-brand-left-section');
  primaryContent.append(footerBrandLeftSection);

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoLink && logoImage) {
    const primaryLogoLink = document.createElement('a');
    primaryLogoLink.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    primaryLogoLink.href = logoLink.textContent.trim();
    primaryLogoLink.target = '_blank';
    primaryLogoLink.setAttribute('aria-label', logoImage.alt || 'Logo');
    moveInstrumentation(logoLink, primaryLogoLink);

    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    primaryLogoLink.append(pic);
    moveInstrumentation(logoImage, pic.querySelector('img'));

    footerBrandLeftSection.append(primaryLogoLink);
  }

  const secondaryLogoImage = block.querySelector('[data-aue-prop="secondaryLogoImage"]');
  if (secondaryLogoImage) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');

    const pic = createOptimizedPicture(secondaryLogoImage.src, secondaryLogoImage.alt);
    secondaryLogoWrapper.append(pic);
    moveInstrumentation(secondaryLogoImage, pic.querySelector('img'));

    footerBrandLeftSection.append(secondaryLogoWrapper);
  }

  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.classList.add('footer-brand-right-section');
  primaryContent.append(footerBrandRightSection);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRightSection.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');
  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');
  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentColumn = 0;
  const columns = [footerBrandNavbarLeft, footerBrandNavbarRight];

  footerLinks.forEach((row, index) => {
    const link = row.querySelector('[data-aue-prop="link"]');
    const text = row.querySelector('[data-aue-prop="text"]');

    if (link && text) {
      let footerListComponent = columns[currentColumn].lastElementChild;
      if (!footerListComponent || footerListComponent.tagName !== 'DIV' || !footerListComponent.classList.contains('footer-list-component')) {
        footerListComponent = document.createElement('div');
        footerListComponent.classList.add('footer-list-component');
        columns[currentColumn].append(footerListComponent);
      }

      let footerList = footerListComponent.lastElementChild;
      if (!footerList || footerList.tagName !== 'UL' || !footerList.classList.contains('footer-list')) {
        footerList = document.createElement('ul');
        footerList.classList.add('footer-list');
        footerListComponent.append(footerList);
      }

      const footerListItem = document.createElement('li');
      footerListItem.classList.add('footer-list-item');

      const footerLinkElement = document.createElement('a');
      footerLinkElement.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
      footerLinkElement.href = link.textContent.trim();
      footerLinkElement.textContent = text.textContent.trim();
      footerLinkElement.setAttribute('data-link-region', 'Footer List');
      if (link.textContent.startsWith('http')) {
        footerLinkElement.target = '_blank';
      }
      moveInstrumentation(link, footerLinkElement);
      moveInstrumentation(text, footerLinkElement);

      footerListItem.append(footerLinkElement);
      footerList.append(footerListItem);

      if ((index + 1) % 3 === 0) {
        currentColumn = (currentColumn + 1) % columns.length;
      }
    }
    row.remove(); // Remove the original row after processing
  });

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-secondary-content');
  footerBrandSecondary.append(secondaryContainer);
  secondaryContainer.append(secondaryContent);

  const footerBrandRightSectionSocial = document.createElement('section');
  footerBrandRightSectionSocial.classList.add('footer-brand-right-section-social');
  secondaryContent.append(footerBrandRightSectionSocial);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social-media-title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandRightSectionSocial.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list');
  footerBrandRightSectionSocial.append(socialList);

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((row) => {
    const link = row.querySelector('[data-aue-prop="link"]');
    const iconImage = row.querySelector('[data-aue-prop="iconImage"]');

    if (link && iconImage) {
      const socialListItem = document.createElement('li');
      socialListItem.classList.add('footer-brand-right-item');

      const socialLinkElement = document.createElement('a');
      socialLinkElement.classList.add('footer-brand-right-link', 'analytics_cta_click');
      socialLinkElement.href = link.textContent.trim();
      socialLinkElement.target = '_blank';
      socialLinkElement.setAttribute('data-cta-region', 'Footer');
      socialLinkElement.setAttribute('data-platform-name', iconImage.alt.toLowerCase());
      socialLinkElement.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, socialLinkElement);

      const pic = createOptimizedPicture(iconImage.src, iconImage.alt);
      pic.querySelector('img').classList.add('footer-social-media-image');
      pic.querySelector('img').setAttribute('aria-label', iconImage.alt);
      socialLinkElement.append(pic);
      moveInstrumentation(iconImage, pic.querySelector('img'));

      socialListItem.append(socialLinkElement);
      socialList.append(socialListItem);
    }
    row.remove(); // Remove the original row after processing
  });

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');
  secondaryContent.append(footerBrandLeftSectionCopyright);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');
  footerBrandLeftSectionCopyright.append(copyrightList);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const copyrightListItem = document.createElement('li');
    copyrightListItem.classList.add('footer-brand-left-item', 'footer-link');

    const itcLinkElement = document.createElement('a');
    itcLinkElement.classList.add('footer-brand-left-link', 'analytics_cta_click');
    itcLinkElement.href = itcPortalLink.textContent.trim();
    itcLinkElement.target = '_blank';
    itcLinkElement.setAttribute('data-cta-region', 'Footer');
    itcLinkElement.textContent = 'ITC portal';
    moveInstrumentation(itcPortalLink, itcLinkElement);

    copyrightListItem.append(itcLinkElement);
    copyrightList.append(copyrightListItem);
  }

  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    const copyrightWrapper = document.createElement('div');
    copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');

    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);

    copyrightWrapper.append(copyrightSpan);
    footerBrandLeftSectionCopyright.append(copyrightWrapper);
  }

  footerBrandWrapper.append(footerBrandPrimary, footerBrandSecondary);

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
