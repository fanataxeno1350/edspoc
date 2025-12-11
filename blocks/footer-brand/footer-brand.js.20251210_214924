import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  footerBrandWrapper.append(footerBrandPrimary);

  const containerPrimary = document.createElement('div');
  containerPrimary.classList.add('container');
  footerBrandPrimary.append(containerPrimary);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content');
  containerPrimary.append(footerBrandPrimaryContent);

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.classList.add('footer-brand-left-section');
  footerBrandPrimaryContent.append(footerBrandLeftSection);

  const primaryLogoLinkAue = block.querySelector('[data-aue-prop="primaryLogoLink"]');
  const primaryLogoAue = block.querySelector('[data-aue-prop="primaryLogo"]');

  if (primaryLogoLinkAue && primaryLogoAue) {
    const primaryLogoLink = document.createElement('a');
    primaryLogoLink.href = primaryLogoLinkAue.textContent.trim();
    primaryLogoLink.target = '_blank';
    primaryLogoLink.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    primaryLogoLink.setAttribute('data-cta-region', 'Footer');
    primaryLogoLink.setAttribute('aria-label', primaryLogoAue.alt || 'Primary Logo');

    const primaryImg = primaryLogoAue.querySelector('img');
    if (primaryImg) {
      const picture = createOptimizedPicture(primaryImg.src, primaryImg.alt, false, [{ width: '100' }]);
      const newImg = picture.querySelector('img');
      newImg.classList.add('footer-brand-logo-img');
      newImg.setAttribute('loading', 'lazy');
      primaryLogoLink.append(picture);
      moveInstrumentation(primaryLogoAue, newImg);
    }
    footerBrandLeftSection.append(primaryLogoLink);
    moveInstrumentation(primaryLogoLinkAue, primaryLogoLink);
  }

  const footerBrandSecondaryLogoWrapper = document.createElement('div');
  footerBrandSecondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');
  footerBrandLeftSection.append(footerBrandSecondaryLogoWrapper);

  const secondaryLogoAue = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoAue) {
    const secondaryImg = secondaryLogoAue.querySelector('img');
    if (secondaryImg) {
      const picture = createOptimizedPicture(secondaryImg.src, secondaryImg.alt, false, [{ width: '100' }]);
      const newImg = picture.querySelector('img');
      newImg.classList.add('footer-brand-secondary-logo-img');
      newImg.setAttribute('loading', 'lazy');
      footerBrandSecondaryLogoWrapper.append(picture);
      moveInstrumentation(secondaryLogoAue, newImg);
    }
  }

  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.classList.add('footer-brand-right-section');
  footerBrandPrimaryContent.append(footerBrandRightSection);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRightSection.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');
  footerBrandNavbar.append(footerBrandNavbarRight);

  const footerLinksAue = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentLeftList = null;
  let currentRightList = null;
  let listCount = 0;

  footerLinksAue.forEach((linkItemAue) => {
    const labelAue = linkItemAue.querySelector('[data-aue-prop="label"]');
    const linkAue = linkItemAue.querySelector('[data-aue-prop="link"]');

    if (labelAue && linkAue) {
      if (listCount % 2 === 0) {
        if (!currentLeftList || currentLeftList.children.length >= 3) {
          const footerListComponent = document.createElement('div');
          footerListComponent.classList.add('footer-list-component');
          footerBrandNavbarLeft.append(footerListComponent);
          currentLeftList = document.createElement('ul');
          currentLeftList.classList.add('footer-list');
          footerListComponent.append(currentLeftList);
        }
        const listItem = document.createElement('li');
        listItem.classList.add('footer-list-item');
        const link = document.createElement('a');
        link.href = linkAue.textContent.trim();
        link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
        link.setAttribute('data-link-region', 'Footer List');
        link.textContent = labelAue.textContent.trim();
        listItem.append(link);
        currentLeftList.append(listItem);
        moveInstrumentation(linkItemAue, listItem);
      } else {
        if (!currentRightList || currentRightList.children.length >= 3) {
          const footerListComponent = document.createElement('div');
          footerListComponent.classList.add('footer-list-component');
          footerBrandNavbarRight.append(footerListComponent);
          currentRightList = document.createElement('ul');
          currentRightList.classList.add('footer-list');
          footerListComponent.append(currentRightList);
        }
        const listItem = document.createElement('li');
        listItem.classList.add('footer-list-item');
        const link = document.createElement('a');
        link.href = linkAue.textContent.trim();
        link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
        link.setAttribute('data-link-region', 'Footer List');
        link.textContent = labelAue.textContent.trim();
        listItem.append(link);
        currentRightList.append(listItem);
        moveInstrumentation(linkItemAue, listItem);
      }
      listCount++;
    }
  });

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandWrapper.append(footerBrandSecondary);

  const containerSecondary = document.createElement('div');
  containerSecondary.classList.add('container');
  footerBrandSecondary.append(containerSecondary);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary-content');
  containerSecondary.append(footerBrandSecondaryContent);

  const footerBrandRightSectionSocial = document.createElement('section');
  footerBrandRightSectionSocial.classList.add('footer-brand-right-section-social');
  footerBrandSecondaryContent.append(footerBrandRightSectionSocial);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-social-media-title');
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSectionSocial.append(socialMediaTitle);

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.classList.add('footer-brand-right-list');
  footerBrandRightSectionSocial.append(footerBrandRightList);

  const footerSocialsAue = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocialsAue.forEach((socialItemAue) => {
    const platformAue = socialItemAue.querySelector('[data-aue-prop="platform"]');
    const linkAue = socialItemAue.querySelector('[data-aue-prop="link"]');
    const iconAue = socialItemAue.querySelector('[data-aue-prop="icon"]');

    if (platformAue && linkAue && iconAue) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-brand-right-item');
      const link = document.createElement('a');
      link.href = linkAue.textContent.trim();
      link.classList.add('footer-brand-right-link', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${platformAue.textContent.trim().toLowerCase()}`);
      link.target = '_blank';
      link.setAttribute('data-platform-name', platformAue.textContent.trim().toLowerCase());
      link.setAttribute('data-social-linktype', 'follow');

      const iconImg = iconAue.querySelector('img');
      if (iconImg) {
        const picture = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '32' }]);
        const newImg = picture.querySelector('img');
        newImg.classList.add('footer-social-media-image');
        newImg.setAttribute('aria-label', platformAue.textContent.trim().toLowerCase());
        newImg.setAttribute('loading', 'lazy');
        link.append(picture);
        moveInstrumentation(iconAue, newImg);
      }
      listItem.append(link);
      footerBrandRightList.append(listItem);
      moveInstrumentation(socialItemAue, listItem);
    }
  });

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');
  footerBrandSecondaryContent.append(footerBrandLeftSectionCopyright);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand-left-list');
  footerBrandLeftSectionCopyright.append(footerBrandLeftList);

  const itcPortalLink = block.querySelector('a[href="https://www.itcportal.com/"]');
  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand-left-item', 'footer-link');
    const link = document.createElement('a');
    link.href = itcPortalLink.href;
    link.target = '_blank';
    link.classList.add('footer-brand-left-link', 'analytics_cta_click');
    link.setAttribute('data-cta-region', 'Footer');
    link.textContent = 'ITC portal';
    listItem.append(link);
    footerBrandLeftList.append(listItem);
    moveInstrumentation(itcPortalLink, link);
  }

  const footerBrandLeftCopyrightWrapper = document.createElement('div');
  footerBrandLeftCopyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');
  footerBrandLeftSectionCopyright.append(footerBrandLeftCopyrightWrapper);

  const copyrightTextAue = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextAue) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.textContent = copyrightTextAue.textContent.trim();
    footerBrandLeftCopyrightWrapper.append(copyrightSpan);
    moveInstrumentation(copyrightTextAue, copyrightSpan);
  }

  block.textContent = '';
  block.append(footerBrandWrapper);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
