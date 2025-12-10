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

  const primaryLogoLink = block.querySelector('[data-aue-prop="primaryLogoLink"]');
  const primaryLogo = block.querySelector('[data-aue-prop="primaryLogo"] img');
  if (primaryLogoLink && primaryLogo) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    logoAnchor.setAttribute('data-cta-region', 'Footer');
    logoAnchor.setAttribute('aria-label', primaryLogo.alt);
    logoAnchor.href = primaryLogoLink.href || '#';
    if (primaryLogoLink.target) {
      logoAnchor.target = primaryLogoLink.target;
    }
    const pic = createOptimizedPicture(primaryLogo.src, primaryLogo.alt);
    pic.querySelector('img').classList.add('footer-brand-logo-img');
    pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(primaryLogo, pic.querySelector('img'));
    moveInstrumentation(primaryLogoLink, logoAnchor);
    logoAnchor.append(pic);
    footerBrandLeftSection.append(logoAnchor);
  }

  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"] img');
  if (secondaryLogo) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');
    const pic = createOptimizedPicture(secondaryLogo.src, secondaryLogo.alt);
    pic.querySelector('img').classList.add('footer-brand-secondary-logo-img');
    pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(secondaryLogo, pic.querySelector('img'));
    secondaryLogoWrapper.append(pic);
    footerBrandLeftSection.append(secondaryLogoWrapper);
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

  const footerLinksContainer = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinksContainer) {
    Array.from(footerLinksContainer.children).forEach((row, index) => {
      const link = row.querySelector('[data-aue-prop="link"] a');
      const label = row.querySelector('[data-aue-prop="label"]');

      if (link && label) {
        let targetColumn = null;
        if (index % 4 < 2) {
          if (!footerBrandNavbarLeft.children[Math.floor(index / 2)]) {
            const footerListComponent = document.createElement('div');
            footerListComponent.classList.add('footer-list-component');
            const footerList = document.createElement('ul');
            footerList.classList.add('footer-list');
            footerListComponent.append(footerList);
            footerBrandNavbarLeft.append(footerListComponent);
          }
          targetColumn = footerBrandNavbarLeft.children[Math.floor(index / 2)].querySelector('.footer-list');
        } else {
          if (!footerBrandNavbarRight.children[Math.floor((index - 2) / 2)]) {
            const footerListComponent = document.createElement('div');
            footerListComponent.classList.add('footer-list-component');
            const footerList = document.createElement('ul');
            footerList.classList.add('footer-list');
            footerListComponent.append(footerList);
            footerBrandNavbarRight.append(footerListComponent);
          }
          targetColumn = footerBrandNavbarRight.children[Math.floor((index - 2) / 2)].querySelector('.footer-list');
        }

        if (targetColumn) {
          const footerListItem = document.createElement('li');
          footerListItem.classList.add('footer-list-item');
          const footerLinkAnchor = document.createElement('a');
          footerLinkAnchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
          footerLinkAnchor.setAttribute('data-link-region', 'Footer List');
          footerLinkAnchor.href = link.href;
          if (link.target) {
            footerLinkAnchor.target = link.target;
          }
          footerLinkAnchor.textContent = label.textContent;
          moveInstrumentation(link, footerLinkAnchor);
          moveInstrumentation(label, footerLinkAnchor);
          footerListItem.append(footerLinkAnchor);
          targetColumn.append(footerListItem);
        }
      }
    });
  }

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

  const footerSocialLinksContainer = block.querySelector('[data-aue-prop="footerSocialLinks"]');
  if (footerSocialLinksContainer) {
    Array.from(footerSocialLinksContainer.children).forEach((row) => {
      const socialLink = row.querySelector('[data-aue-prop="link"] a');
      const socialIcon = row.querySelector('[data-aue-prop="icon"] img');

      if (socialLink && socialIcon) {
        const footerBrandRightItem = document.createElement('li');
        footerBrandRightItem.classList.add('footer-brand-right-item');
        const footerBrandRightLink = document.createElement('a');
        footerBrandRightLink.classList.add('footer-brand-right-link', 'analytics_cta_click');
        footerBrandRightLink.setAttribute('data-cta-region', 'Footer');
        footerBrandRightLink.setAttribute('data-cta-label', `footer-${socialIcon.alt.toLowerCase()}`);
        footerBrandRightLink.setAttribute('data-platform-name', socialIcon.alt.toLowerCase());
        footerBrandRightLink.setAttribute('data-social-linktype', 'follow');
        footerBrandRightLink.setAttribute('aria-label', socialIcon.alt);
        footerBrandRightLink.href = socialLink.href;
        if (socialLink.target) {
          footerBrandRightLink.target = socialLink.target;
        }

        const pic = createOptimizedPicture(socialIcon.src, socialIcon.alt);
        pic.querySelector('img').classList.add('footer-social-media-image');
        pic.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(socialIcon, pic.querySelector('img'));
        moveInstrumentation(socialLink, footerBrandRightLink);
        footerBrandRightLink.append(pic);
        footerBrandRightItem.append(footerBrandRightLink);
        footerBrandRightList.append(footerBrandRightItem);
      }
    });
  }

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');
  footerBrandSecondaryContent.append(footerBrandLeftSectionCopyright);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand-left-list');
  footerBrandLeftSectionCopyright.append(footerBrandLeftList);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"] a');
  if (itcPortalLink) {
    const footerBrandLeftItem = document.createElement('li');
    footerBrandLeftItem.classList.add('footer-brand-left-item', 'footer-link');
    const itcLinkAnchor = document.createElement('a');
    itcLinkAnchor.classList.add('footer-brand-left-link', 'analytics_cta_click');
    itcLinkAnchor.setAttribute('data-cta-region', 'Footer');
    itcLinkAnchor.href = itcPortalLink.href;
    if (itcPortalLink.target) {
      itcLinkAnchor.target = itcPortalLink.target;
    }
    itcLinkAnchor.textContent = 'ITC portal';
    moveInstrumentation(itcPortalLink, itcLinkAnchor);
    footerBrandLeftItem.append(itcLinkAnchor);
    footerBrandLeftList.append(footerBrandLeftItem);
  }

  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    const copyrightWrapper = document.createElement('div');
    copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-copyright-text');
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
    copyrightWrapper.append(copyrightSpan);
    footerBrandLeftSectionCopyright.append(copyrightWrapper);
  }

  block.textContent = '';
  block.append(footerBrandSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
