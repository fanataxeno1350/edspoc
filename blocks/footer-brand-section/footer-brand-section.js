import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandSection = document.createElement('section');
  footerBrandSection.classList.add('footer-brand-section');

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'bg-boing-neutral-gray-600');
  footerBrandSection.append(footerBrandWrapper);

  // Primary Section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  footerBrandWrapper.append(footerBrandPrimary);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  footerBrandPrimary.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-primary-content');
  primaryContainer.append(primaryContent);

  // Left Section - Logos
  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.classList.add('footer-brand-left-section');
  primaryContent.append(footerBrandLeftSection);

  // Primary Logo
  const primaryLogoAue = block.querySelector('[data-aue-prop="primaryLogo"]');
  if (primaryLogoAue) {
    const primaryLogoLink = primaryLogoAue.querySelector('a');
    const primaryLogoImg = primaryLogoAue.querySelector('img');
    if (primaryLogoLink && primaryLogoImg) {
      const newPrimaryLogoLink = document.createElement('a');
      newPrimaryLogoLink.href = primaryLogoLink.href;
      newPrimaryLogoLink.target = primaryLogoLink.target;
      newPrimaryLogoLink.classList.add('footer-brand-logo-link', 'analytics_cta_click');
      newPrimaryLogoLink.setAttribute('data-cta-region', 'Footer');
      newPrimaryLogoLink.setAttribute('aria-label', primaryLogoImg.alt);

      const picture = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
      const newPrimaryLogoImg = picture.querySelector('img');
      newPrimaryLogoImg.classList.add('footer-brand-logo-img');
      newPrimaryLogoImg.setAttribute('loading', 'lazy');
      newPrimaryLogoLink.append(picture);
      moveInstrumentation(primaryLogoAue, newPrimaryLogoLink);
      footerBrandLeftSection.append(newPrimaryLogoLink);
    }
  }

  // Secondary Logo
  const secondaryLogoAue = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoAue) {
    const secondaryLogoImg = secondaryLogoAue.querySelector('img');
    if (secondaryLogoImg) {
      const secondaryLogoWrapper = document.createElement('div');
      secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');

      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      const newSecondaryLogoImg = picture.querySelector('img');
      newSecondaryLogoImg.classList.add('footer-brand-secondary-logo-img');
      newSecondaryLogoImg.setAttribute('loading', 'lazy');
      secondaryLogoWrapper.append(picture);
      moveInstrumentation(secondaryLogoAue, secondaryLogoWrapper);
      footerBrandLeftSection.append(secondaryLogoWrapper);
    }
  }

  // Right Section - Navigation
  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.classList.add('footer-brand-right-section');
  primaryContent.append(footerBrandRightSection);

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

  const footerLinks = block.querySelectorAll('[data-aue-model="footerBrandLink"]');
  const numLinks = footerLinks.length;

  // Distribute links into 4 columns (2 in left, 2 in right) if possible
  const columns = [[], [], [], []];
  footerLinks.forEach((linkItem, index) => {
    columns[index % 4].push(linkItem);
  });

  columns.forEach((col, colIndex) => {
    if (col.length > 0) {
      const footerListComponent = document.createElement('div');
      footerListComponent.classList.add('footer-list-component');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list');
      footerListComponent.append(ul);

      col.forEach((linkItem) => {
        const li = document.createElement('li');
        li.classList.add('footer-list-item');

        const linkAue = linkItem.querySelector('[data-aue-prop="link"]');
        const textAue = linkItem.querySelector('[data-aue-prop="text"]');

        if (linkAue && textAue) {
          const link = linkAue.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.textContent = textAue.textContent;
            newLink.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
            newLink.setAttribute('data-link-region', 'Footer List');
            if (link.target) {
              newLink.target = link.target;
            }
            li.append(newLink);
            moveInstrumentation(linkItem, li);
          }
        }
        ul.append(li);
      });

      if (colIndex < 2) {
        footerBrandNavbarLeft.append(footerListComponent);
      } else {
        footerBrandNavbarRight.append(footerListComponent);
      }
    }
  });

  // Secondary Section
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandWrapper.append(footerBrandSecondary);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  footerBrandSecondary.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-secondary-content');
  secondaryContainer.append(secondaryContent);

  // Right Section - Social Media
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
  footerSocialLinks.forEach((socialLinkItem) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-right-item');

    const socialLinkAue = socialLinkItem.querySelector('[data-aue-prop="socialLink"]');
    const iconAue = socialLinkItem.querySelector('[data-aue-prop="icon"]');

    if (socialLinkAue && iconAue) {
      const link = socialLinkAue.querySelector('a');
      const iconImg = iconAue.querySelector('img');
      if (link && iconImg) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = link.target || '_blank';
        newLink.classList.add('footer-brand-right-link', 'analytics_cta_click');
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', `footer-${iconImg.alt.toLowerCase()}`);
        newLink.setAttribute('data-platform-name', iconImg.alt.toLowerCase());
        newLink.setAttribute('data-social-linktype', 'follow');

        const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
        const newIconImg = picture.querySelector('img');
        newIconImg.classList.add('footer-social-media-image');
        newIconImg.setAttribute('aria-label', iconImg.alt);
        newIconImg.setAttribute('loading', 'lazy');
        newLink.append(picture);
        li.append(newLink);
        moveInstrumentation(socialLinkItem, li);
      }
    }
    socialList.append(li);
  });

  // Left Section - Copyright
  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');
  secondaryContent.append(footerBrandLeftSectionCopyright);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');
  footerBrandLeftSectionCopyright.append(copyrightList);

  const itcPortalLi = document.createElement('li');
  itcPortalLi.classList.add('footer-brand-left-item', 'footer-link');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  copyrightList.append(itcPortalLi);

  const copyrightWrapper = document.createElement('div');
  copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');
  footerBrandLeftSectionCopyright.append(copyrightWrapper);

  const copyrightTextAue = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextAue) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.textContent = copyrightTextAue.textContent.trim();
    copyrightWrapper.append(copyrightSpan);
    moveInstrumentation(copyrightTextAue, copyrightSpan);
  }

  block.textContent = '';
  block.append(footerBrandSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
