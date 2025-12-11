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

  // Left Section - Logo and Secondary Logo
  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.classList.add('footer-brand-left-section');
  primaryContent.append(footerBrandLeftSection);

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoLink && logoImage) {
    const primaryLogoLink = document.createElement('a');
    primaryLogoLink.href = logoLink.href;
    primaryLogoLink.target = '_blank';
    primaryLogoLink.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    primaryLogoLink.setAttribute('data-cta-region', 'Footer');
    primaryLogoLink.setAttribute('aria-label', logoImage.alt || 'ITC Logo');

    const picture = createOptimizedPicture(logoImage.src, logoImage.alt || 'ITC Logo', false, [{ width: '400' }]);
    picture.querySelector('img').classList.add('footer-brand-logo-img');
    picture.querySelector('img').setAttribute('loading', 'lazy');
    primaryLogoLink.append(picture);
    moveInstrumentation(logoLink, primaryLogoLink);
    moveInstrumentation(logoImage, picture.querySelector('img'));
    footerBrandLeftSection.append(primaryLogoLink);
  }

  const secondaryLogoImage = block.querySelector('[data-aue-prop="secondaryLogoImage"]');
  if (secondaryLogoImage) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.classList.add('footer-brand-secondary-logo-wrapper');
    const picture = createOptimizedPicture(secondaryLogoImage.src, secondaryLogoImage.alt || 'FSSI Logo', false, [{ width: '400' }]);
    picture.querySelector('img').classList.add('footer-brand-secondary-logo-img');
    picture.querySelector('img').setAttribute('loading', 'lazy');
    secondaryLogoWrapper.append(picture);
    moveInstrumentation(secondaryLogoImage, picture.querySelector('img'));
    footerBrandLeftSection.append(secondaryLogoWrapper);
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

  const navLinks = block.querySelectorAll('[data-aue-model="footerNavLink"]');
  if (navLinks.length > 0) {
    // Distribute nav links into two columns for left and right navbars
    const navColumns = [[], []];
    navLinks.forEach((link, index) => {
      navColumns[index % 2].push(link);
    });

    navColumns.forEach((columnLinks, colIndex) => {
      if (columnLinks.length > 0) {
        const footerListComponent = document.createElement('div');
        footerListComponent.classList.add('footer-list-component');
        const footerList = document.createElement('ul');
        footerList.classList.add('footer-list');
        footerListComponent.append(footerList);

        columnLinks.forEach((linkItem) => {
          const link = linkItem.querySelector('[data-aue-prop="link"]');
          const text = linkItem.querySelector('[data-aue-prop="text"]');

          if (link && text) {
            const listItem = document.createElement('li');
            listItem.classList.add('footer-list-item');
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = text.textContent;
            anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
            anchor.setAttribute('data-link-region', 'Footer List');
            if (link.target) {
              anchor.target = link.target;
            }
            listItem.append(anchor);
            moveInstrumentation(linkItem, listItem);
            moveInstrumentation(link, anchor);
            moveInstrumentation(text, anchor);
            footerList.append(listItem);
          }
        });
        if (colIndex === 0) {
          footerBrandNavbarLeft.append(footerListComponent);
        } else {
          footerBrandNavbarRight.append(footerListComponent);
        }
      }
    });
  }

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

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialItem) => {
    const socialLink = socialItem.querySelector('[data-aue-prop="socialLink"]');
    const icon = socialItem.querySelector('[data-aue-prop="icon"]');

    if (socialLink && icon) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-brand-right-item');

      const anchor = document.createElement('a');
      anchor.href = socialLink.href;
      anchor.classList.add('footer-brand-right-link', 'analytics_cta_click');
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt?.toLowerCase() || 'social'}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.alt?.toLowerCase() || 'social');
      anchor.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt || 'Social Media Icon', false, [{ width: '48' }]);
      picture.querySelector('img').classList.add('footer-social-media-image');
      picture.querySelector('img').setAttribute('loading', 'lazy');
      picture.querySelector('img').setAttribute('aria-label', icon.alt || 'social media icon');

      anchor.append(picture);
      listItem.append(anchor);
      moveInstrumentation(socialItem, listItem);
      moveInstrumentation(socialLink, anchor);
      moveInstrumentation(icon, picture.querySelector('img'));
      socialList.append(listItem);
    }
  });

  // Left Section - Copyright
  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.classList.add('footer-brand-left-section-copyright');
  secondaryContent.append(footerBrandLeftSectionCopyright);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');
  footerBrandLeftSectionCopyright.append(copyrightList);

  const copyrightLink = block.querySelector('[data-aue-prop="copyrightLink"]');
  if (copyrightLink) {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand-left-item', 'footer-link');
    const anchor = document.createElement('a');
    anchor.href = copyrightLink.href;
    anchor.target = '_blank';
    anchor.classList.add('footer-brand-left-link', 'analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.textContent = copyrightLink.textContent;
    listItem.append(anchor);
    moveInstrumentation(copyrightLink, anchor);
    copyrightList.append(listItem);
  }

  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    const copyrightWrapper = document.createElement('div');
    copyrightWrapper.classList.add('footer-brand-left-copyright-wrapper');
    const span = document.createElement('span');
    span.classList.add('footer-brand-left-copyright-text');
    span.innerHTML = copyrightText.innerHTML;
    copyrightWrapper.append(span);
    moveInstrumentation(copyrightText, span);
    footerBrandLeftSectionCopyright.append(copyrightWrapper);
  }

  block.textContent = '';
  block.append(footerBrandSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
