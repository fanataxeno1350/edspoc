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

  // Primary Logo
  const primaryLogoLink = block.querySelector('[data-aue-prop="primaryLogo"]');
  if (primaryLogoLink) {
    const link = primaryLogoLink.querySelector('a');
    const img = primaryLogoLink.querySelector('img');
    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.classList.add('footer-brand-logo-link', 'analytics_cta_click');
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('aria-label', img.alt);
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').classList.add('footer-brand-logo-img');
      newLink.append(picture);
      moveInstrumentation(primaryLogoLink, newLink);
      footerBrandLeftSection.append(newLink);
    }
  }

  // Secondary Logo
  const secondaryLogoWrapper = document.createElement('div');
  secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');
  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogo) {
    const img = secondaryLogo.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').classList.add('footer-brand-secondary-logo-img');
      secondaryLogoWrapper.append(picture);
      moveInstrumentation(secondaryLogo, secondaryLogoWrapper);
      footerBrandLeftSection.append(secondaryLogoWrapper);
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

  // Links (Multifield)
  const linksContainer = block.querySelector('[data-aue-prop="links"]');
  if (linksContainer) {
    const linkItems = linksContainer.querySelectorAll('[data-aue-model="footerBrandLink"]');
    const numLinks = linkItems.length;
    const half = Math.ceil(numLinks / 2);

    let currentLeftList = null;
    let currentRightList = null;

    linkItems.forEach((linkItem, index) => {
      const linkElement = linkItem.querySelector('[data-aue-prop="link"]');
      const labelElement = linkItem.querySelector('[data-aue-prop="label"]');

      if (linkElement && labelElement) {
        const link = linkElement.querySelector('a');
        const label = labelElement.textContent;

        if (link && label) {
          if (index < half) {
            if (index % 3 === 0) {
              const footerListComponent = document.createElement('div');
              footerListComponent.classList.add('footer-list-component');
              currentLeftList = document.createElement('ul');
              currentLeftList.classList.add('footer-list');
              footerListComponent.append(currentLeftList);
              footerBrandNavbarLeft.append(footerListComponent);
            }
            if (currentLeftList) {
              const listItem = document.createElement('li');
              listItem.classList.add('footer-list-item');
              const newLink = document.createElement('a');
              newLink.href = link.href;
              newLink.textContent = label;
              newLink.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
              newLink.setAttribute('data-link-region', 'Footer List');
              if (link.target) newLink.target = link.target;
              listItem.append(newLink);
              currentLeftList.append(listItem);
              moveInstrumentation(linkItem, listItem);
            }
          } else {
            if (index % 3 === 0) {
              const footerListComponent = document.createElement('div');
              footerListComponent.classList.add('footer-list-component');
              currentRightList = document.createElement('ul');
              currentRightList.classList.add('footer-list');
              footerListComponent.append(currentRightList);
              footerBrandNavbarRight.append(footerListComponent);
            }
            if (currentRightList) {
              const listItem = document.createElement('li');
              listItem.classList.add('footer-list-item');
              const newLink = document.createElement('a');
              newLink.href = link.href;
              newLink.textContent = label;
              newLink.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
              newLink.setAttribute('data-link-region', 'Footer List');
              if (link.target) newLink.target = link.target;
              listItem.append(newLink);
              currentRightList.append(listItem);
              moveInstrumentation(linkItem, listItem);
            }
          }
        }
      }
    });
  }

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

  // Social Links (Multifield)
  const socialLinksContainer = block.querySelector('[data-aue-prop="socialLinks"]');
  if (socialLinksContainer) {
    const socialItems = socialLinksContainer.querySelectorAll('[data-aue-model="footerBrandSocial"]');
    socialItems.forEach((socialItem) => {
      const socialLinkElement = socialItem.querySelector('[data-aue-prop="socialLink"]');
      const iconElement = socialItem.querySelector('[data-aue-prop="icon"]');

      if (socialLinkElement && iconElement) {
        const link = socialLinkElement.querySelector('a');
        const iconImg = iconElement.querySelector('img');

        if (link && iconImg) {
          const listItem = document.createElement('li');
          listItem.classList.add('footer-brand-right-item');
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.target = '_blank';
          newLink.classList.add('footer-brand-right-link', 'analytics_cta_click');
          newLink.setAttribute('data-cta-region', 'Footer');

          let platformName = '';
          if (link.href.includes('facebook')) {
            platformName = 'facebook';
          } else if (link.href.includes('instagram')) {
            platformName = 'instagram';
          } else if (link.href.includes('youtube')) {
            platformName = 'youtube';
          }
          newLink.setAttribute('data-cta-label', `footer-${platformName}`);
          newLink.setAttribute('data-platform-name', platformName);
          newLink.setAttribute('data-social-linktype', 'follow');

          const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
          picture.querySelector('img').classList.add('footer-social-media-image');
          picture.querySelector('img').setAttribute('aria-label', platformName);
          newLink.append(picture);
          listItem.append(newLink);
          socialList.append(listItem);
          moveInstrumentation(socialItem, listItem);
        }
      }
    });
  }
  footerBrandRightSectionSocial.append(socialList);

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand-left-list');

  // ITC Portal Link (hardcoded for now as per sample HTML, though it could be authored)
  const itcPortalListItem = document.createElement('li');
  itcPortalListItem.classList.add('footer-brand-left-item', 'footer-link');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalListItem.append(itcPortalLink);
  footerBrandLeftList.append(itcPortalListItem);
  footerBrandLeftSectionCopyright.append(footerBrandLeftList);

  const copyrightWrapper = document.createElement('div');
  copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');

  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    const span = document.createElement('span');
    span.classList.add('footer-brand-left-copyright-text');
    span.textContent = copyrightText.textContent.trim();
    copyrightWrapper.append(span);
    moveInstrumentation(copyrightText, span);
  }
  footerBrandLeftSectionCopyright.append(copyrightWrapper);

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
