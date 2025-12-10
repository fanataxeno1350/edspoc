import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-primary-content');

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.classList.add('footer-brand-left-section');

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  if (logoLink && logo) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    logoAnchor.setAttribute('data-cta-region', 'Footer');
    logoAnchor.setAttribute('aria-label', logo.alt || 'Logo');
    logoAnchor.href = logoLink.href || logoLink.textContent.trim();
    if (logoAnchor.href.startsWith('http')) {
      logoAnchor.target = '_blank';
    }
    const pic = createOptimizedPicture(logo.src, logo.alt, false, [{ width: 'auto' }]);
    pic.querySelector('img').classList.add('footer-brand-logo-img');
    pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(logoLink, logoAnchor);
    moveInstrumentation(logo, pic.querySelector('img'));
    logoAnchor.append(pic);
    footerBrandLeftSection.append(logoAnchor);
  } else if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    logoAnchor.setAttribute('data-cta-region', 'Footer');
    logoAnchor.setAttribute('aria-label', 'Logo');
    logoAnchor.href = logoLink.href || logoLink.textContent.trim();
    if (logoAnchor.href.startsWith('http')) {
      logoAnchor.target = '_blank';
    }
    const img = document.createElement('img');
    img.classList.add('footer-brand-logo-img');
    img.setAttribute('loading', 'lazy');
    img.alt = 'Logo';
    moveInstrumentation(logoLink, logoAnchor);
    logoAnchor.append(img);
    footerBrandLeftSection.append(logoAnchor);
  }

  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogo) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');
    const pic = createOptimizedPicture(secondaryLogo.src, secondaryLogo.alt, false, [{ width: 'auto' }]);
    pic.querySelector('img').classList.add('footer-brand-secondary-logo-img');
    pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(secondaryLogo, pic.querySelector('img'));
    secondaryLogoWrapper.append(pic);
    footerBrandLeftSection.append(secondaryLogoWrapper);
  }
  primaryContent.append(footerBrandLeftSection);

  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.classList.add('footer-brand-right-section');
  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');
  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');

  const linksContainer = block.querySelector('[data-aue-prop="links"]');
  if (linksContainer) {
    const footerLinks = Array.from(linksContainer.querySelectorAll('[data-aue-model="footerLink"]'));
    const numColumns = 2; // Assuming 2 columns for left and right nav
    const linksPerColumn = Math.ceil(footerLinks.length / numColumns);

    footerLinks.forEach((linkItem, index) => {
      const linkText = linkItem.querySelector('[data-aue-prop="text"]');
      const linkHref = linkItem.querySelector('[data-aue-prop="href"]');

      if (linkText && linkHref) {
        const footerListItem = document.createElement('li');
        footerListItem.classList.add('footer-list-item');
        const anchor = document.createElement('a');
        anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
        anchor.setAttribute('data-link-region', 'Footer List');
        anchor.href = linkHref.href || linkHref.textContent.trim();
        anchor.textContent = linkText.textContent.trim();
        if (anchor.href.startsWith('http')) {
          anchor.target = '_blank';
        }
        moveInstrumentation(linkText, anchor);
        moveInstrumentation(linkHref, anchor);
        footerListItem.append(anchor);

        let targetColumn;
        let listComponent;

        if (index < linksPerColumn * numColumns / 2) { // First half for left nav
          if (index < linksPerColumn) { // First group for left nav
            if (!footerBrandNavbarLeft.children[0]) {
              listComponent = document.createElement('div');
              listComponent.classList.add('footer-list-component');
              footerBrandNavbarLeft.append(listComponent);
              listComponent.append(document.createElement('ul'));
              listComponent.querySelector('ul').classList.add('footer-list');
            }
            targetColumn = footerBrandNavbarLeft.children[0].querySelector('ul');
          } else { // Second group for left nav
            if (!footerBrandNavbarLeft.children[1]) {
              listComponent = document.createElement('div');
              listComponent.classList.add('footer-list-component');
              footerBrandNavbarLeft.append(listComponent);
              listComponent.append(document.createElement('ul'));
              listComponent.querySelector('ul').classList.add('footer-list');
            }
            targetColumn = footerBrandNavbarLeft.children[1].querySelector('ul');
          }
        } else { // Second half for right nav
          if (index < linksPerColumn * numColumns / 2 + linksPerColumn) { // First group for right nav
            if (!footerBrandNavbarRight.children[0]) {
              listComponent = document.createElement('div');
              listComponent.classList.add('footer-list-component');
              footerBrandNavbarRight.append(listComponent);
              listComponent.append(document.createElement('ul'));
              listComponent.querySelector('ul').classList.add('footer-list');
            }
            targetColumn = footerBrandNavbarRight.children[0].querySelector('ul');
          } else { // Second group for right nav
            if (!footerBrandNavbarRight.children[1]) {
              listComponent = document.createElement('div');
              listComponent.classList.add('footer-list-component');
              footerBrandNavbarRight.append(listComponent);
              listComponent.append(document.createElement('ul'));
              listComponent.querySelector('ul').classList.add('footer-list');
            }
            targetColumn = footerBrandNavbarRight.children[1].querySelector('ul');
          }
        }
        if (targetColumn) {
          targetColumn.append(footerListItem);
        }
      }
    });
  }

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightSection.append(footerBrandNavbar);
  primaryContent.append(footerBrandRightSection);
  primaryContainer.append(primaryContent);
  footerBrandPrimary.append(primaryContainer);
  footerBrandWrapper.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-secondary-content');

  const footerBrandRightSectionSocial = document.createElement('section');
  footerBrandRightSectionSocial.classList.add('footer-brand-right-section-social');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social-media-title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandRightSectionSocial.append(socialTitle);

  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-brand-right-list');

  const socialLinksContainer = block.querySelector('[data-aue-prop="socialLinks"]');
  if (socialLinksContainer) {
    const socialLinks = Array.from(socialLinksContainer.querySelectorAll('[data-aue-model="footerSocialLink"]'));
    socialLinks.forEach((socialLinkItem) => {
      const socialIcon = socialLinkItem.querySelector('[data-aue-prop="icon"]');
      const socialHref = socialLinkItem.querySelector('[data-aue-prop="href"]');

      if (socialIcon && socialHref) {
        const socialListItem = document.createElement('li');
        socialListItem.classList.add('footer-brand-right-item');
        const anchor = document.createElement('a');
        anchor.classList.add('footer-brand-right-link', 'analytics_cta_click');
        anchor.setAttribute('data-cta-region', 'Footer');
        anchor.setAttribute('data-cta-label', `footer-${socialIcon.alt || 'social'}`);
        anchor.setAttribute('data-social-linktype', 'follow');
        anchor.href = socialHref.href || socialHref.textContent.trim();
        if (anchor.href.startsWith('http')) {
          anchor.target = '_blank';
        }
        const pic = createOptimizedPicture(socialIcon.src, socialIcon.alt, false, [{ width: 'auto' }]);
        pic.querySelector('img').classList.add('footer-social-media-image');
        pic.querySelector('img').setAttribute('loading', 'lazy');
        pic.querySelector('img').setAttribute('aria-label', socialIcon.alt || 'social icon');

        moveInstrumentation(socialIcon, pic.querySelector('img'));
        moveInstrumentation(socialHref, anchor);

        anchor.append(pic);
        socialListItem.append(anchor);
        socialLinksList.append(socialListItem);
      }
    });
  }
  footerBrandRightSectionSocial.append(socialLinksList);
  secondaryContent.append(footerBrandRightSectionSocial);

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const itcList = document.createElement('ul');
    itcList.classList.add('footer-brand-left-list');
    const itcListItem = document.createElement('li');
    itcListItem.classList.add('footer-brand-left-item', 'footer-link');
    const itcAnchor = document.createElement('a');
    itcAnchor.classList.add('footer-brand-left-link', 'analytics_cta_click');
    itcAnchor.setAttribute('data-cta-region', 'Footer');
    itcAnchor.href = itcPortalLink.href || itcPortalLink.textContent.trim();
    itcAnchor.textContent = 'ITC portal';
    if (itcAnchor.href.startsWith('http')) {
      itcAnchor.target = '_blank';
    }
    moveInstrumentation(itcPortalLink, itcAnchor);
    itcListItem.append(itcAnchor);
    itcList.append(itcListItem);
    footerBrandLeftSectionCopyright.append(itcList);
  }

  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const copyrightWrapper = document.createElement('div');
    copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.innerHTML = copyright.innerHTML;
    moveInstrumentation(copyright, copyrightSpan);
    copyrightWrapper.append(copyrightSpan);
    footerBrandLeftSectionCopyright.append(copyrightWrapper);
  }

  secondaryContent.append(footerBrandLeftSectionCopyright);
  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);
  footerBrandWrapper.append(footerBrandSecondary);

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
