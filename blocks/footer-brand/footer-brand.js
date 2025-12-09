import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandContainer = document.createElement('section');
  footerBrandContainer.classList.add('footer-brand-container', 'p-0');

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.classList.add('footer-brand-wrapper', 'bg-boing-neutral-gray-600');
  footerBrandContainer.append(footerBrandWrapper);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  footerBrandWrapper.append(footerBrandPrimary);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  footerBrandPrimary.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-primary-content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand-right');
  primaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarRight);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandWrapper.append(footerBrandSecondary);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  footerBrandSecondary.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-secondary-content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  secondaryContainer.append(secondaryContent);

  const footerBrandSocialSection = document.createElement('section');
  footerBrandSocialSection.classList.add('footer-brand-right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContent.append(footerBrandSocialSection);

  const footerBrandCopyrightSection = document.createElement('section');
  footerBrandCopyrightSection.classList.add('footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContent.append(footerBrandCopyrightSection);

  // Extract content from the block
  const children = Array.from(block.children);

  // Logo Image
  const logoImageCell = children[0]?.children[0];
  if (logoImageCell) {
    const logoImage = logoImageCell.querySelector('img');
    if (logoImage) {
      const logoLink = document.createElement('a');
      logoLink.classList.add('footer-brand-logo', 'd-inline-block', 'analytics_cta_click');
      logoLink.setAttribute('data-cta-region', 'Footer');
      logoLink.setAttribute('aria-label', logoImage.alt || 'Logo');
      logoLink.href = logoImage.closest('a')?.href || '#';
      if (logoImage.closest('a')?.target) {
        logoLink.target = logoImage.closest('a').target;
      }

      const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
      pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'footer-brand-no-rendition');
      logoLink.append(pic);
      moveInstrumentation(logoImage, pic.querySelector('img'));
      moveInstrumentation(logoImage.closest('a'), logoLink);
      footerBrandLeft.append(logoLink);
    }
  }

  // Secondary Logo Image
  const secondaryLogoImageCell = children[1]?.children[0];
  if (secondaryLogoImageCell) {
    const secondaryLogoImage = secondaryLogoImageCell.querySelector('img');
    if (secondaryLogoImage) {
      const secondaryLogoWrapper = document.createElement('div');
      secondaryLogoWrapper.classList.add('footer-brand-secondary-logo', 'd-inline-block');

      const pic = createOptimizedPicture(secondaryLogoImage.src, secondaryLogoImage.alt);
      pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'footer-brand-no-rendition');
      secondaryLogoWrapper.append(pic);
      moveInstrumentation(secondaryLogoImage, pic.querySelector('img'));
      footerBrandLeft.append(secondaryLogoWrapper);
    }
  }

  // Footer Links
  const footerLinksWrapper = document.createElement('div');
  footerLinksWrapper.classList.add('footer-list-wrapper');
  const footerList = document.createElement('ul');
  footerList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  footerLinksWrapper.append(footerList);

  const allFooterLinks = Array.from(block.querySelectorAll('[data-aue-model="footerLink"]'));
  let currentListWrapper = document.createElement('div');
  currentListWrapper.classList.add('footer-list-wrapper');
  let currentList = document.createElement('ul');
  currentList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  currentListWrapper.append(currentList);
  footerBrandNavbarLeft.append(currentListWrapper);

  allFooterLinks.forEach((linkItem, index) => {
    if (index > 0 && index % 3 === 0) {
      currentListWrapper = document.createElement('div');
      currentListWrapper.classList.add('footer-list-wrapper');
      currentList = document.createElement('ul');
      currentList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      currentListWrapper.append(currentList);
      if (index < 6) {
        footerBrandNavbarLeft.append(currentListWrapper);
      } else {
        footerBrandNavbarRight.append(currentListWrapper);
      }
    }

    const labelElement = linkItem.querySelector('[data-aue-prop="label"]');
    const urlElement = linkItem.querySelector('[data-aue-prop="url"]');

    if (labelElement && urlElement) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-list-item');

      const link = document.createElement('a');
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link', 'd-inline-block');
      link.setAttribute('data-link-region', 'Footer List');
      link.href = urlElement.textContent.trim();
      link.textContent = labelElement.textContent.trim();

      // Check if the URL is external and set target="_blank"
      try {
        const linkUrl = new URL(link.href);
        const currentHost = window.location.hostname;
        if (linkUrl.hostname !== currentHost) {
          link.target = '_blank';
        }
      } catch (e) {
        // Handle invalid URLs if necessary
      }

      moveInstrumentation(labelElement, link);
      moveInstrumentation(urlElement, link);
      moveInstrumentation(linkItem, listItem);
      listItem.append(link);
      currentList.append(listItem);
    }
  });

  // Social Links
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-brand-social-media--title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandSocialSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  footerBrandSocialSection.append(socialList);

  const socialLinks = Array.from(block.querySelectorAll('[data-aue-model="socialLink"]'));
  socialLinks.forEach((socialLinkItem) => {
    const platformElement = socialLinkItem.querySelector('[data-aue-prop="platform"]');
    const urlElement = socialLinkItem.querySelector('[data-aue-prop="url"]');
    let iconImage = socialLinkItem.querySelector('[data-aue-prop="icon"] img');

    if (platformElement && urlElement) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-brand-right-item', 'd-flex', 'justify-content-center', 'align-items-center');

      const link = document.createElement('a');
      link.classList.add('footer-brand-right-link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${platformElement.textContent.toLowerCase().trim()}`);
      link.setAttribute('data-platform-name', platformElement.textContent.toLowerCase().trim());
      link.setAttribute('data-social-linktype', 'follow');
      link.target = '_blank';
      link.href = urlElement.textContent.trim();

      if (iconImage) {
        const pic = createOptimizedPicture(iconImage.src, iconImage.alt || platformElement.textContent.trim());
        pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'footer-brand-no-rendition');
        pic.querySelector('img').setAttribute('aria-label', platformElement.textContent.trim());
        link.append(pic);
        moveInstrumentation(iconImage, pic.querySelector('img'));
      } else {
        // Fallback for icon if not an image, or if image src is missing
        const iconText = document.createElement('span');
        iconText.textContent = platformElement.textContent.trim();
        link.append(iconText);
      }
      moveInstrumentation(platformElement, link);
      moveInstrumentation(urlElement, link);
      moveInstrumentation(socialLinkItem, listItem);
      listItem.append(link);
      socialList.append(listItem);
    }
  });

  // Copyright Text
  const copyrightTextElement = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextElement) {
    const copyrightList = document.createElement('ul');
    copyrightList.classList.add('footer-brand-left-list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
    footerBrandCopyrightSection.append(copyrightList);

    // Add ITC portal link as per HTML structure
    const itcPortalListItem = document.createElement('li');
    itcPortalListItem.classList.add('footer-brand-left-item', 'footer-link');
    const itcPortalLink = document.createElement('a');
    itcPortalLink.href = 'https://www.itcportal.com/';
    itcPortalLink.target = '_blank';
    itcPortalLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
    itcPortalLink.setAttribute('data-cta-region', 'Footer');
    itcPortalLink.textContent = 'ITC portal';
    itcPortalListItem.append(itcPortalLink);
    copyrightList.append(itcPortalListItem);

    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand-left-copyright', 'text-center');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left-text', 'text-white');
    copyrightSpan.textContent = copyrightTextElement.textContent.trim();
    moveInstrumentation(copyrightTextElement, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
    footerBrandCopyrightSection.append(copyrightDiv);
  }

  block.textContent = '';
  block.append(footerBrandContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
