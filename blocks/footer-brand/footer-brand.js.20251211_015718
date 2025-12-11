import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
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

  const primaryLogoLink = block.querySelector('[data-aue-prop="primaryLogoLink"]');
  const primaryLogo = block.querySelector('[data-aue-prop="primaryLogo"]');
  if (primaryLogoLink && primaryLogo) {
    const primaryAnchor = document.createElement('a');
    primaryAnchor.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    primaryAnchor.setAttribute('data-cta-region', 'Footer');
    primaryAnchor.setAttribute('aria-label', 'ITC Logo');
    primaryAnchor.href = primaryLogoLink.textContent.trim();
    primaryAnchor.target = '_blank';

    const primaryImg = primaryLogo.querySelector('img');
    if (primaryImg) {
      const optimizedPrimaryPicture = createOptimizedPicture(primaryImg.src, primaryImg.alt);
      const optimizedPrimaryImg = optimizedPrimaryPicture.querySelector('img');
      optimizedPrimaryImg.classList.add('footer-brand-logo-img');
      optimizedPrimaryImg.setAttribute('loading', 'lazy');
      primaryAnchor.append(optimizedPrimaryPicture);
      moveInstrumentation(primaryImg, optimizedPrimaryImg);
    }
    footerBrandLeftSection.append(primaryAnchor);
    moveInstrumentation(primaryLogoLink, primaryAnchor);
    moveInstrumentation(primaryLogo, primaryAnchor);
  }

  const secondaryLogoWrapper = document.createElement('div');
  secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');

  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogo) {
    const secondaryImg = secondaryLogo.querySelector('img');
    if (secondaryImg) {
      const optimizedSecondaryPicture = createOptimizedPicture(secondaryImg.src, secondaryImg.alt);
      const optimizedSecondaryImg = optimizedSecondaryPicture.querySelector('img');
      optimizedSecondaryImg.classList.add('footer-brand-secondary-logo-img');
      optimizedSecondaryImg.setAttribute('loading', 'lazy');
      secondaryLogoWrapper.append(optimizedSecondaryPicture);
      moveInstrumentation(secondaryImg, optimizedSecondaryImg);
    }
    footerBrandLeftSection.append(secondaryLogoWrapper);
    moveInstrumentation(secondaryLogo, secondaryLogoWrapper);
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

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkGroups = [[], [], [], []]; // Two for left, two for right
  footerLinks.forEach((linkItem, index) => {
    const link = linkItem.querySelector('[data-aue-prop="link"]');
    const label = linkItem.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-list-item');

      const anchor = document.createElement('a');
      anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
      anchor.setAttribute('data-link-region', 'Footer List');
      anchor.href = link.textContent.trim();
      anchor.textContent = label.textContent.trim();

      if (link.textContent.trim().startsWith('http')) {
        anchor.target = '_blank';
      }

      listItem.append(anchor);
      moveInstrumentation(linkItem, listItem);

      // Distribute links into four groups
      if (index % 4 === 0) {
        linkGroups[0].push(listItem);
      } else if (index % 4 === 1) {
        linkGroups[1].push(listItem);
      } else if (index % 4 === 2) {
        linkGroups[2].push(listItem);
      } else {
        linkGroups[3].push(listItem);
      }
    }
  });

  linkGroups.forEach((group, groupIndex) => {
    if (group.length > 0) {
      const footerListComponent = document.createElement('div');
      footerListComponent.classList.add('footer-list-component');
      const footerList = document.createElement('ul');
      footerList.classList.add('footer-list');
      group.forEach((item) => footerList.append(item));
      footerListComponent.append(footerList);

      if (groupIndex < 2) {
        footerBrandNavbarLeft.append(footerListComponent);
      } else {
        footerBrandNavbarRight.append(footerListComponent);
      }
    }
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightSection.append(footerBrandNavbar);

  footerBrandPrimaryContent.append(footerBrandLeftSection, footerBrandRightSection);
  containerPrimary.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(containerPrimary);
  footerBrandWrapper.append(footerBrandPrimary);

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

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialLinkItem) => {
    const socialLink = socialLinkItem.querySelector('[data-aue-prop="socialLink"]');
    const icon = socialLinkItem.querySelector('[data-aue-prop="icon"]');

    if (socialLink && icon) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-brand-right-item');

      const anchor = document.createElement('a');
      anchor.classList.add('footer-brand-right-link', 'analytics_cta_click');
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.target = '_blank';
      anchor.href = socialLink.textContent.trim();

      const platformName = new URL(socialLink.textContent.trim()).hostname.split('.')[1] || '';
      anchor.setAttribute('data-cta-label', `footer-${platformName}`);
      anchor.setAttribute('data-platform-name', platformName);
      anchor.setAttribute('data-social-linktype', 'follow');

      const img = icon.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(img.src, img.alt);
        const optimizedImg = optimizedPicture.querySelector('img');
        optimizedImg.classList.add('footer-social-media-image');
        optimizedImg.setAttribute('aria-label', platformName);
        optimizedImg.setAttribute('loading', 'lazy');
        anchor.append(optimizedPicture);
        moveInstrumentation(img, optimizedImg);
      }
      listItem.append(anchor);
      socialList.append(listItem);
      moveInstrumentation(socialLinkItem, listItem);
    }
  });
  footerBrandRightSectionSocial.append(socialList);

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');

  const itcPortalLink = document.createElement('li');
  itcPortalLink.classList.add('footer-brand-left-item', 'footer-link');

  const itcAnchor = document.createElement('a');
  itcAnchor.href = 'https://www.itcportal.com/';
  itcAnchor.target = '_blank';
  itcAnchor.classList.add('footer-brand-left-link', 'analytics_cta_click');
  itcAnchor.setAttribute('data-cta-region', 'Footer');
  itcAnchor.textContent = 'ITC portal';
  itcPortalLink.append(itcAnchor);
  copyrightList.append(itcPortalLink);
  footerBrandLeftSectionCopyright.append(copyrightList);

  const copyrightWrapper = document.createElement('div');
  copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');

  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.textContent = copyrightText.textContent.trim();
    copyrightWrapper.append(copyrightSpan);
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  footerBrandLeftSectionCopyright.append(copyrightWrapper);

  footerBrandSecondaryContent.append(footerBrandRightSectionSocial, footerBrandLeftSectionCopyright);
  containerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(containerSecondary);
  footerBrandWrapper.append(footerBrandSecondary);

  footerBrandSection.append(footerBrandWrapper);

  block.textContent = '';
  block.append(footerBrandSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
