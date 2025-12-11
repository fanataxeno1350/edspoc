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
  footerBrandPrimary.append(primaryContainer);
  primaryContainer.append(primaryContent);

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.classList.add('footer-brand-left-section');
  primaryContent.append(footerBrandLeftSection);

  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.classList.add('footer-brand-right-section');
  primaryContent.append(footerBrandRightSection);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRightSection.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');
  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');
  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-secondary-content');
  footerBrandSecondary.append(secondaryContainer);
  secondaryContainer.append(secondaryContent);

  const footerBrandRightSectionSocial = document.createElement('section');
  footerBrandRightSectionSocial.classList.add('footer-brand-right-section-social');
  secondaryContent.append(footerBrandRightSectionSocial);

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');
  secondaryContent.append(footerBrandLeftSectionCopyright);

  const footerLinksData = block.querySelector('[data-aue-model="footerBrand"] [data-aue-prop="footerLinks"]');
  const footerSocialLinksData = block.querySelector('[data-aue-model="footerBrand"] [data-aue-prop="footerSocialLinks"]');

  const rows = [...block.children];

  let primaryLogoLinkElement;
  let primaryLogoImgElement;
  let secondaryLogoImgElement;
  let copyrightLinkElement;
  let copyrightTextElement;

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const prop = cell.dataset.aueProp;
      if (prop === 'primaryLogoLink') {
        primaryLogoLinkElement = cell.querySelector('a');
        if (!primaryLogoLinkElement) {
          const link = document.createElement('a');
          link.href = cell.textContent.trim();
          primaryLogoLinkElement = link;
        }
        moveInstrumentation(cell, primaryLogoLinkElement);
      } else if (prop === 'primaryLogo') {
        primaryLogoImgElement = cell.querySelector('img');
        if (!primaryLogoImgElement) {
          const img = document.createElement('img');
          img.src = cell.textContent.trim();
          img.alt = 'Primary Logo';
          primaryLogoImgElement = img;
        }
        moveInstrumentation(cell, primaryLogoImgElement);
      } else if (prop === 'secondaryLogo') {
        secondaryLogoImgElement = cell.querySelector('img');
        if (!secondaryLogoImgElement) {
          const img = document.createElement('img');
          img.src = cell.textContent.trim();
          img.alt = 'Secondary Logo';
          secondaryLogoImgElement = img;
        }
        moveInstrumentation(cell, secondaryLogoImgElement);
      } else if (prop === 'copyrightLink') {
        copyrightLinkElement = cell.querySelector('a');
        if (!copyrightLinkElement) {
          const link = document.createElement('a');
          link.href = cell.textContent.trim();
          copyrightLinkElement = link;
        }
        moveInstrumentation(cell, copyrightLinkElement);
      } else if (prop === 'copyrightText') {
        copyrightTextElement = cell.querySelector('div');
        if (!copyrightTextElement) {
          const span = document.createElement('span');
          span.textContent = cell.textContent.trim();
          copyrightTextElement = span;
        }
        moveInstrumentation(cell, copyrightTextElement);
      }
    });
  });

  if (primaryLogoLinkElement && primaryLogoImgElement) {
    const primaryLogoPic = createOptimizedPicture(primaryLogoImgElement.src, primaryLogoImgElement.alt);
    primaryLogoLinkElement.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    primaryLogoLinkElement.setAttribute('data-cta-region', 'Footer');
    primaryLogoLinkElement.setAttribute('aria-label', primaryLogoImgElement.alt);
    primaryLogoLinkElement.setAttribute('target', '_blank');
    primaryLogoLinkElement.append(primaryLogoPic);
    moveInstrumentation(primaryLogoImgElement, primaryLogoPic.querySelector('img'));
    footerBrandLeftSection.append(primaryLogoLinkElement);
  }

  if (secondaryLogoImgElement) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');
    const secondaryLogoPic = createOptimizedPicture(secondaryLogoImgElement.src, secondaryLogoImgElement.alt);
    secondaryLogoPic.querySelector('img').classList.add('footer-brand-secondary-logo-img');
    secondaryLogoWrapper.append(secondaryLogoPic);
    moveInstrumentation(secondaryLogoImgElement, secondaryLogoPic.querySelector('img'));
    footerBrandLeftSection.append(secondaryLogoWrapper);
  }

  if (footerLinksData) {
    const footerLinks = [...footerLinksData.children].filter((child) => child.dataset.aueModel === 'footerLink');
    const numColumns = Math.ceil(footerLinks.length / 2);

    for (let i = 0; i < 2; i += 1) {
      const footerListComponent = document.createElement('div');
      footerListComponent.classList.add('footer-list-component');
      const footerList = document.createElement('ul');
      footerList.classList.add('footer-list');
      footerListComponent.append(footerList);

      const start = i * numColumns;
      const end = Math.min(start + numColumns, footerLinks.length);

      for (let j = start; j < end; j += 1) {
        const linkItem = footerLinks[j];
        const linkElement = linkItem.querySelector('[data-aue-prop="link"] a');
        const labelElement = linkItem.querySelector('[data-aue-prop="label"]');

        if (linkElement && labelElement) {
          const footerListItem = document.createElement('li');
          footerListItem.classList.add('footer-list-item');
          linkElement.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
          linkElement.setAttribute('data-link-region', 'Footer List');
          linkElement.textContent = labelElement.textContent.trim();
          moveInstrumentation(linkItem, footerListItem);
          moveInstrumentation(linkItem.querySelector('[data-aue-prop="link"]'), linkElement);
          moveInstrumentation(linkItem.querySelector('[data-aue-prop="label"]'), linkElement);
          footerListItem.append(linkElement);
          footerList.append(footerListItem);
        }
      }
      if (i === 0) {
        footerBrandNavbarLeft.append(footerListComponent);
      } else {
        footerBrandNavbarRight.append(footerListComponent);
      }
    }
  }

  if (footerSocialLinksData) {
    const socialLinks = [...footerSocialLinksData.children].filter((child) => child.dataset.aueModel === 'footerSocialLink');
    const socialMediaTitle = document.createElement('h3');
    socialMediaTitle.classList.add('footer-social-media-title');
    socialMediaTitle.textContent = 'Follow Us On';
    footerBrandRightSectionSocial.append(socialMediaTitle);

    const socialList = document.createElement('ul');
    socialList.classList.add('footer-brand-right-list');
    footerBrandRightSectionSocial.append(socialList);

    socialLinks.forEach((socialLinkItem) => {
      const linkElement = socialLinkItem.querySelector('[data-aue-prop="link"] a');
      const iconElement = socialLinkItem.querySelector('[data-aue-prop="icon"] img');

      if (linkElement && iconElement) {
        const socialListItem = document.createElement('li');
        socialListItem.classList.add('footer-brand-right-item');
        linkElement.classList.add('footer-brand-right-link', 'analytics_cta_click');
        linkElement.setAttribute('data-cta-region', 'Footer');
        linkElement.setAttribute('data-cta-label', `footer-${iconElement.alt.toLowerCase()}`);
        linkElement.setAttribute('target', '_blank');
        linkElement.setAttribute('data-platform-name', iconElement.alt.toLowerCase());
        linkElement.setAttribute('data-social-linktype', 'follow');

        const iconPic = createOptimizedPicture(iconElement.src, iconElement.alt);
        iconPic.querySelector('img').classList.add('footer-social-media-image');
        iconPic.querySelector('img').setAttribute('aria-label', iconElement.alt);

        linkElement.append(iconPic);
        moveInstrumentation(socialLinkItem, socialListItem);
        moveInstrumentation(socialLinkItem.querySelector('[data-aue-prop="link"]'), linkElement);
        moveInstrumentation(iconElement, iconPic.querySelector('img'));
        socialListItem.append(linkElement);
        socialList.append(socialListItem);
      }
    });
  }

  if (copyrightLinkElement || copyrightTextElement) {
    const copyrightList = document.createElement('ul');
    copyrightList.classList.add('footer-brand-left-list');
    footerBrandLeftSectionCopyright.append(copyrightList);

    if (copyrightLinkElement) {
      const copyrightListItem = document.createElement('li');
      copyrightListItem.classList.add('footer-brand-left-item', 'footer-link');
      copyrightLinkElement.classList.add('footer-brand-left-link', 'analytics_cta_click');
      copyrightLinkElement.setAttribute('data-cta-region', 'Footer');
      copyrightLinkElement.setAttribute('target', '_blank');
      copyrightListItem.append(copyrightLinkElement);
      copyrightList.append(copyrightListItem);
    }

    if (copyrightTextElement) {
      const copyrightWrapper = document.createElement('div');
      copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');
      const copyrightSpan = document.createElement('span');
      copyrightSpan.classList.add('footer-brand-left-copyright-text');
      copyrightSpan.textContent = copyrightTextElement.textContent.trim();
      moveInstrumentation(copyrightTextElement, copyrightSpan);
      copyrightWrapper.append(copyrightSpan);
      footerBrandLeftSectionCopyright.append(copyrightWrapper);
    }
  }

  footerBrandWrapper.append(footerBrandPrimary, footerBrandSecondary);
  block.textContent = '';
  block.append(footerBrandWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
