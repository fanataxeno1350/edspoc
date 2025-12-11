import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandSection = document.createElement('section');
  footerBrandSection.classList.add('footer-brand-section');

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'bg-boing-neutral-gray-600');
  footerBrandSection.append(footerBrandWrapper);

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

  const logoWrapper = block.querySelector('[data-aue-prop="logo"]');
  if (logoWrapper) {
    const logoLink = logoWrapper.querySelector('a');
    const logoImg = logoWrapper.querySelector('img');
    if (logoLink && logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      const newImg = picture.querySelector('img');
      newImg.classList.add('footer-brand-logo-img');
      newImg.setAttribute('loading', 'lazy');
      moveInstrumentation(logoImg, newImg);

      const newLogoLink = document.createElement('a');
      newLogoLink.href = logoLink.href;
      if (logoLink.target) newLogoLink.target = logoLink.target;
      if (logoLink.className) newLogoLink.className = logoLink.className;
      if (logoLink.getAttribute('data-cta-region')) newLogoLink.setAttribute('data-cta-region', logoLink.getAttribute('data-cta-region'));
      if (logoLink.getAttribute('aria-label')) newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label'));
      newLogoLink.append(picture);
      footerBrandLeftSection.append(newLogoLink);
      moveInstrumentation(logoLink, newLogoLink);
    }
  }

  const secondaryLogoWrapper = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoWrapper) {
    const secondaryLogoImg = secondaryLogoWrapper.querySelector('img');
    if (secondaryLogoImg) {
      const newSecondaryLogoWrapper = document.createElement('div');
      newSecondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');

      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      const newImg = picture.querySelector('img');
      newImg.classList.add('footer-brand-secondary-logo-img');
      newImg.setAttribute('loading', 'lazy');
      moveInstrumentation(secondaryLogoImg, newImg);
      newSecondaryLogoWrapper.append(picture);
      footerBrandLeftSection.append(newSecondaryLogoWrapper);
      moveInstrumentation(secondaryLogoWrapper, newSecondaryLogoWrapper);
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

  const footerLinksElements = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkColumns = [[], [], [], []]; // Two for left, two for right
  footerLinksElements.forEach((linkEl, i) => {
    const urlEl = linkEl.querySelector('[data-aue-prop="url"]');
    const textEl = linkEl.querySelector('[data-aue-prop="text"]');

    if (urlEl && textEl) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-list-item');

      const link = document.createElement('a');
      link.href = urlEl.textContent.trim();
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
      link.setAttribute('data-link-region', 'Footer List');
      if (urlEl.querySelector('a') && urlEl.querySelector('a').target) {
        link.target = urlEl.querySelector('a').target;
      }
      link.textContent = textEl.textContent.trim();
      listItem.append(link);
      moveInstrumentation(linkEl, listItem);

      // Distribute links into 4 columns (2 left, 2 right)
      const colIndex = i % 4;
      linkColumns[colIndex].push(listItem);
    }
  });

  // Append links to the respective nav sections
  [footerBrandNavbarLeft, footerBrandNavbarRight].forEach((parentDiv, parentIndex) => {
    for (let i = 0; i < 2; i++) {
      const colIndex = parentIndex * 2 + i;
      if (linkColumns[colIndex].length > 0) {
        const footerListComponent = document.createElement('div');
        footerListComponent.classList.add('footer-list-component');
        const footerList = document.createElement('ul');
        footerList.classList.add('footer-list');
        linkColumns[colIndex].forEach(item => footerList.append(item));
        footerListComponent.append(footerList);
        parentDiv.append(footerListComponent);
      }
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

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social-media-title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandRightSectionSocial.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list');
  footerBrandRightSectionSocial.append(socialList);

  const footerSocialElements = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocialElements.forEach((socialEl) => {
    const iconWrapper = socialEl.querySelector('[data-aue-prop="icon"]');
    const urlEl = socialEl.querySelector('[data-aue-prop="url"]');

    if (iconWrapper && urlEl) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-brand-right-item');

      const link = document.createElement('a');
      link.href = urlEl.textContent.trim();
      link.classList.add('footer-brand-right-link', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${iconWrapper.querySelector('img')?.alt?.toLowerCase() || 'social'}`);
      link.target = '_blank';
      link.setAttribute('data-platform-name', iconWrapper.querySelector('img')?.alt?.toLowerCase() || '');
      link.setAttribute('data-social-linktype', 'follow');

      const iconImg = iconWrapper.querySelector('img');
      if (iconImg) {
        const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
        const newImg = picture.querySelector('img');
        newImg.classList.add('footer-social-media-image');
        newImg.setAttribute('aria-label', iconImg.alt);
        newImg.setAttribute('loading', 'lazy');
        moveInstrumentation(iconImg, newImg);
        link.append(picture);
      }
      listItem.append(link);
      socialList.append(listItem);
      moveInstrumentation(socialEl, listItem);
    }
  });

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');
  footerBrandSecondaryContent.append(footerBrandLeftSectionCopyright);

  const copyrightLinkList = document.createElement('ul');
  copyrightLinkList.classList.add('footer-brand-left-list');
  footerBrandLeftSectionCopyright.append(copyrightLinkList);

  // Add ITC portal link to copyright section
  const itcPortalLinkEl = block.querySelector('a[href="https://www.itcportal.com/"]');
  if (itcPortalLinkEl) {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand-left-item', 'footer-link');

    const link = document.createElement('a');
    link.href = itcPortalLinkEl.href;
    link.target = '_blank';
    link.classList.add('footer-brand-left-link', 'analytics_cta_click');
    link.setAttribute('data-cta-region', 'Footer');
    link.textContent = itcPortalLinkEl.textContent.trim();
    listItem.append(link);
    copyrightLinkList.append(listItem);
    moveInstrumentation(itcPortalLinkEl, listItem);
  }

  const copyrightWrapper = document.createElement('div');
  copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');
  footerBrandLeftSectionCopyright.append(copyrightWrapper);

  const copyrightTextEl = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightTextEl) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.textContent = copyrightTextEl.textContent.trim();
    copyrightWrapper.append(copyrightSpan);
    moveInstrumentation(copyrightTextEl, copyrightSpan);
  }

  block.textContent = '';
  block.append(footerBrandSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}