import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
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

  const primaryLogoLinkAue = block.querySelector('[data-aue-prop="primaryLogoLink"]');
  const primaryLogoLink = primaryLogoLinkAue ? primaryLogoLinkAue.querySelector('a') : null;
  const primaryLogoImageAue = block.querySelector('[data-aue-prop="primaryLogo"]');
  const primaryLogoImage = primaryLogoImageAue ? primaryLogoImageAue.querySelector('img') : null;

  if (primaryLogoLink && primaryLogoImage) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    logoLink.href = primaryLogoLink.href;
    logoLink.target = '_blank';
    logoLink.setAttribute('data-cta-region', 'Footer');
    logoLink.setAttribute('aria-label', primaryLogoImage.alt || 'ITC Logo');
    logoLink.append(createOptimizedPicture(primaryLogoImage.src, primaryLogoImage.alt || 'ITC Logo', false, [{ width: '100' }]));
    logoLink.querySelector('img').classList.add('footer-brand-logo-img');
    logoLink.querySelector('img').setAttribute('loading', 'lazy');
    footerBrandLeftSection.append(logoLink);
    moveInstrumentation(primaryLogoLinkAue, logoLink);
  }

  const secondaryLogoAue = block.querySelector('[data-aue-prop="secondaryLogo"]');
  const secondaryLogoImage = secondaryLogoAue ? secondaryLogoAue.querySelector('img') : null;

  if (secondaryLogoImage) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');
    secondaryLogoWrapper.append(createOptimizedPicture(secondaryLogoImage.src, secondaryLogoImage.alt || 'FSSI Logo', false, [{ width: '100' }]));
    secondaryLogoWrapper.querySelector('img').classList.add('footer-brand-secondary-logo-img');
    secondaryLogoWrapper.querySelector('img').setAttribute('loading', 'lazy');
    footerBrandLeftSection.append(secondaryLogoWrapper);
    moveInstrumentation(secondaryLogoAue, secondaryLogoWrapper);
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
  const numColumns = 4;
  const linksPerColumn = Math.ceil(footerLinks.length / numColumns);

  let currentLeftColumn = 0;
  let currentRightColumn = 0;

  footerLinks.forEach((linkNode, index) => {
    const linkAue = linkNode.querySelector('[data-aue-prop="link"]');
    const textAue = linkNode.querySelector('[data-aue-prop="text"]');

    if (!linkAue || !textAue) return;

    const link = linkAue.querySelector('a');
    const text = textAue.textContent;

    if (link && text) {
      let targetColumnContainer;
      if (index < linksPerColumn * 2) {
        if (index < linksPerColumn) {
          if (currentLeftColumn === 0) {
            targetColumnContainer = document.createElement('div');
            targetColumnContainer.classList.add('footer-list-component');
            footerBrandNavbarLeft.append(targetColumnContainer);
            currentLeftColumn++;
          } else {
            targetColumnContainer = footerBrandNavbarLeft.lastChild;
          }
        } else {
          if (currentLeftColumn === 1) {
            targetColumnContainer = document.createElement('div');
            targetColumnContainer.classList.add('footer-list-component');
            footerBrandNavbarLeft.append(targetColumnContainer);
            currentLeftColumn++;
          } else {
            targetColumnContainer = footerBrandNavbarLeft.lastChild;
          }
        }
      } else {
        if (index < linksPerColumn * 3) {
          if (currentRightColumn === 0) {
            targetColumnContainer = document.createElement('div');
            targetColumnContainer.classList.add('footer-list-component');
            footerBrandNavbarRight.append(targetColumnContainer);
            currentRightColumn++;
          } else {
            targetColumnContainer = footerBrandNavbarRight.lastChild;
          }
        } else {
          if (currentRightColumn === 1) {
            targetColumnContainer = document.createElement('div');
            targetColumnContainer.classList.add('footer-list-component');
            footerBrandNavbarRight.append(targetColumnContainer);
            currentRightColumn++;
          } else {
            targetColumnContainer = footerBrandNavbarRight.lastChild;
          }
        }
      }

      let footerList = targetColumnContainer.querySelector('.footer-list');
      if (!footerList) {
        footerList = document.createElement('ul');
        footerList.classList.add('footer-list');
        targetColumnContainer.append(footerList);
      }

      const listItem = document.createElement('li');
      listItem.classList.add('footer-list-item');

      const listItemLink = document.createElement('a');
      listItemLink.href = link.href;
      listItemLink.textContent = text;
      listItemLink.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
      listItemLink.setAttribute('data-link-region', 'Footer List');
      if (link.target) {
        listItemLink.target = link.target;
      }
      listItem.append(listItemLink);
      footerList.append(listItem);
      moveInstrumentation(linkNode, listItem);
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

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialLinkNode) => {
    const linkAue = socialLinkNode.querySelector('[data-aue-prop="link"]');
    const iconAue = socialLinkNode.querySelector('[data-aue-prop="icon"]');

    if (linkAue && iconAue) {
      const link = linkAue.querySelector('a');
      const icon = iconAue.querySelector('img');

      if (link && icon) {
        const listItem = document.createElement('li');
        listItem.classList.add('footer-brand-right-item');

        const listItemLink = document.createElement('a');
        listItemLink.href = link.href;
        listItemLink.classList.add('footer-brand-right-link', 'analytics_cta_click');
        listItemLink.setAttribute('data-cta-region', 'Footer');
        listItemLink.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
        if (link.target) {
          listItemLink.target = link.target;
        }
        listItemLink.setAttribute('data-platform-name', icon.alt.toLowerCase());
        listItemLink.setAttribute('data-social-linktype', 'follow');

        const socialIcon = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '24' }]);
        socialIcon.querySelector('img').classList.add('footer-social-media-image');
        socialIcon.querySelector('img').setAttribute('aria-label', icon.alt);
        socialIcon.querySelector('img').setAttribute('loading', 'lazy');
        listItemLink.append(socialIcon);
        listItem.append(listItemLink);
        socialList.append(listItem);
        moveInstrumentation(socialLinkNode, listItem);
      }
    }
  });
  footerBrandRightSectionSocial.append(socialList);

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');

  const itcPortalLinkAue = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const itcPortalAnchor = itcPortalLinkAue ? itcPortalLinkAue.querySelector('a') : null;

  if (itcPortalAnchor) {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand-left-item', 'footer-link');

    const listItemLink = document.createElement('a');
    listItemLink.href = itcPortalAnchor.href;
    listItemLink.target = '_blank';
    listItemLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
    listItemLink.setAttribute('data-cta-region', 'Footer');
    listItemLink.textContent = itcPortalAnchor.textContent || 'ITC portal';
    listItem.append(listItemLink);
    copyrightList.append(listItem);
    moveInstrumentation(itcPortalLinkAue, listItem);
  }
  footerBrandLeftSectionCopyright.append(copyrightList);

  const copyrightTextAue = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextAue) {
    const copyrightWrapper = document.createElement('div');
    copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');

    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.textContent = copyrightTextAue.textContent.trim();
    copyrightWrapper.append(copyrightSpan);
    footerBrandLeftSectionCopyright.append(copyrightWrapper);
    moveInstrumentation(copyrightTextAue, copyrightWrapper);
  }

  footerBrandSecondaryContent.append(footerBrandRightSectionSocial, footerBrandLeftSectionCopyright);
  containerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(containerSecondary);

  footerBrandWrapper.append(footerBrandPrimary, footerBrandSecondary);

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.classList.add('footer-brand-section');
  block.dataset.blockStatus = 'loaded';
}
