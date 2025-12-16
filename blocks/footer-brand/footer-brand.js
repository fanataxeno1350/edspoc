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

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-primary-content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  containerPrimary.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  primaryContent.append(footerBrandLeft);

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoLink && logoImage) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.textContent.trim();
    logoAnchor.target = '_blank';
    logoAnchor.classList.add('footer-brand-logo', 'd-inline-block', 'analytics_cta_click');
    logoAnchor.setAttribute('data-cta-region', 'Footer');
    logoAnchor.setAttribute('aria-label', logoImage.alt || 'Logo');
    const picture = createOptimizedPicture(logoImage.src, logoImage.alt, false, [{ width: '100' }]);
    picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
    logoAnchor.append(picture);
    footerBrandLeft.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
    moveInstrumentation(logoImage, picture);
  }

  const secondaryLogoImage = block.querySelector('[data-aue-prop="secondaryLogoImage"]');
  if (secondaryLogoImage) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand-secondary-logo', 'd-inline-block');
    const picture = createOptimizedPicture(secondaryLogoImage.src, secondaryLogoImage.alt, false, [{ width: '100' }]);
    picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
    secondaryLogoDiv.append(picture);
    footerBrandLeft.append(secondaryLogoDiv);
    moveInstrumentation(secondaryLogoImage, picture);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand-right');
  primaryContent.append(footerBrandRight);

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand-navbar-left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand-navbar-right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarRight);

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentLeftListContainer = null;
  let currentRightListContainer = null;
  let leftListCount = 0;
  let rightListCount = 0;

  footerLinks.forEach((linkNode, index) => {
    const link = linkNode.querySelector('[data-aue-prop="link"]');
    const label = linkNode.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-list-item');

      const linkElement = document.createElement('a');
      linkElement.href = link.textContent.trim();
      linkElement.textContent = label.textContent.trim();
      linkElement.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link', 'd-inline-block');
      linkElement.setAttribute('data-link-region', 'Footer List');
      listItem.append(linkElement);
      moveInstrumentation(link, linkElement);
      moveInstrumentation(label, linkElement);

      if (index < 6) { // First 6 links go to left navbar
        if (index % 3 === 0) {
          currentLeftListContainer = document.createElement('div');
          currentLeftListContainer.classList.add('footer-list-container');
          footerNavbarLeft.append(currentLeftListContainer);
          const ul = document.createElement('ul');
          ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
          currentLeftListContainer.append(ul);
        }
        currentLeftListContainer.querySelector('.footer-list').append(listItem);
        leftListCount++;
      } else { // Remaining links go to right navbar
        if ((index - 6) % 3 === 0) {
          currentRightListContainer = document.createElement('div');
          currentRightListContainer.classList.add('footer-list-container');
          footerNavbarRight.append(currentRightListContainer);
          const ul = document.createElement('ul');
          ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
          currentRightListContainer.append(ul);
        }
        currentRightListContainer.querySelector('.footer-list').append(listItem);
        rightListCount++;
      }
      moveInstrumentation(linkNode, listItem);
    }
  });

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandWrapper.append(footerBrandSecondary);

  const containerSecondary = document.createElement('div');
  containerSecondary.classList.add('container');
  footerBrandSecondary.append(containerSecondary);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-secondary-content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  containerSecondary.append(secondaryContent);

  const footerBrandSocialRight = document.createElement('section');
  footerBrandSocialRight.classList.add('footer-brand-right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContent.append(footerBrandSocialRight);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social-media-title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandSocialRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  footerBrandSocialRight.append(socialList);

  const footerSocials = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocials.forEach((socialNode) => {
    const socialLink = socialNode.querySelector('[data-aue-prop="socialLink"]');
    const socialIcon = socialNode.querySelector('[data-aue-prop="socialIcon"]');

    if (socialLink && socialIcon) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-brand-right-item', 'd-flex', 'justify-content-center', 'align-items-center');

      const linkElement = document.createElement('a');
      linkElement.href = socialLink.textContent.trim();
      linkElement.target = '_blank';
      linkElement.classList.add('footer-brand-right-link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      linkElement.setAttribute('data-cta-region', 'Footer');
      linkElement.setAttribute('data-cta-label', `footer-${socialIcon.alt.toLowerCase()}`);
      linkElement.setAttribute('data-platform-name', socialIcon.alt.toLowerCase());
      linkElement.setAttribute('data-social-linktype', 'follow');
      linkElement.setAttribute('aria-label', socialIcon.alt);

      const picture = createOptimizedPicture(socialIcon.src, socialIcon.alt, false, [{ width: '100' }]);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      linkElement.append(picture);
      listItem.append(linkElement);
      socialList.append(listItem);
      moveInstrumentation(socialLink, linkElement);
      moveInstrumentation(socialIcon, picture);
      moveInstrumentation(socialNode, listItem);
    }
  });

  const footerBrandCopyrightLeft = document.createElement('section');
  footerBrandCopyrightLeft.classList.add('footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContent.append(footerBrandCopyrightLeft);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandCopyrightLeft.append(copyrightList);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand-left-item', 'footer-link');

    const linkElement = document.createElement('a');
    linkElement.href = itcPortalLink.textContent.trim();
    linkElement.target = '_blank';
    linkElement.classList.add('footer-brand-left-link', 'analytics_cta_click');
    linkElement.setAttribute('data-cta-region', 'Footer');
    linkElement.textContent = 'ITC portal';
    listItem.append(linkElement);
    copyrightList.append(listItem);
    moveInstrumentation(itcPortalLink, linkElement);
  }

  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand-left-copyright', 'text-center');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-text', 'text-white');
    copyrightSpan.innerHTML = copyright.innerHTML;
    copyrightDiv.append(copyrightSpan);
    footerBrandCopyrightLeft.append(copyrightDiv);
    moveInstrumentation(copyright, copyrightSpan);
  }

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}