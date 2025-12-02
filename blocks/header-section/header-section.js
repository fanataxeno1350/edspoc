import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.classList.add('header-section-position-relative', 'header-section-mb-15');
  moveInstrumentation(block, headerSection);

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-app-name', 'd-none');
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.append(...appName.childNodes);
    moveInstrumentation(appName, appNameSpan);
  }
  headerSection.append(appNameSpan);

  const headerBoingContainer = document.createElement('header');
  headerBoingContainer.classList.add('header-boing-container', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('header-d-flex', 'header-w-25');
  headerBoingContainer.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');

  const logoLinkA = document.createElement('a');
  logoLinkA.classList.add('header-analytics_cta_click');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    logoLinkA.href = logoLink.href;
    logoLinkA.setAttribute('data-ct', '');
    logoLinkA.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoLinkA);
  }

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-d-flex', 'header-align-items-center');

  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const logoImg = createOptimizedPicture(logoImage.src, logoImage.alt, true, [{ width: '100px' }]);
    logoImg.querySelector('img').classList.add('header-logo-img');
    moveInstrumentation(logoImage, logoImg.querySelector('img'));
    logoDiv.append(logoImg);
  }
  logoLinkA.append(logoDiv);
  headerCenterDiv.append(logoLinkA);
  headerBoingContainer.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');

  const loginLinkA = document.createElement('a');
  loginLinkA.classList.add('header-login-btn-wrapper', 'header-analytics_cta_click');
  loginLinkA.style.display = 'inline';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    loginLinkA.href = loginLink.href;
    moveInstrumentation(loginLink, loginLinkA);
  }

  const loginButton = document.createElement('button');
  loginButton.classList.add('header-login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  if (loginText) {
    loginButton.append(...loginText.childNodes);
    moveInstrumentation(loginText, loginButton);
  }
  loginLinkA.append(loginButton);
  headerRightDiv.append(loginLinkA);
  headerBoingContainer.append(headerRightDiv);
  headerSection.append(headerBoingContainer);

  const headerSubmenuContainer = document.createElement('div');
  headerSubmenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');
    moveInstrumentation(item, li);

    const a = document.createElement('a');
    a.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
    a.setAttribute('data-consent', 'false');

    const link = item.querySelector('[data-aue-prop="link"]');
    if (link) {
      a.href = link.href;
      a.setAttribute('data-link', link.href);
      moveInstrumentation(link, a);
    }

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const iconImg = createOptimizedPicture(icon.src, icon.alt);
      iconImg.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
      moveInstrumentation(icon, iconImg.querySelector('img'));
      a.append(iconImg);
    }

    const label = item.querySelector('[data-aue-prop="label"]');
    if (label) {
      a.append(...label.childNodes);
      moveInstrumentation(label, a);
    }

    li.append(a);
    sidebarMenuUl.append(li);
  });
  aside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  aside.append(sidebarCurve);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('header-footer-brand__primary');
  footerBrandPrimary.style.backgroundColor = '';

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('header-container');

  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  const footerPrimaryLogoLink = document.createElement('a');
  footerPrimaryLogoLink.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
  footerPrimaryLogoLink.setAttribute('data-cta-region', 'Footer');
  footerPrimaryLogoLink.setAttribute('aria-label', 'ITC Logo');
  footerPrimaryLogoLink.target = '_blank';
  footerPrimaryLogoLink.href = 'https://www.itcportal.com/';

  const footerPrimaryLogo = block.querySelector('[data-aue-prop="footerPrimaryLogo"]');
  if (footerPrimaryLogo) {
    const primaryLogoImg = createOptimizedPicture(footerPrimaryLogo.src, footerPrimaryLogo.alt);
    primaryLogoImg.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
    moveInstrumentation(footerPrimaryLogo, primaryLogoImg.querySelector('img'));
    footerPrimaryLogoLink.append(primaryLogoImg);
  }
  footerBrandLeft.append(footerPrimaryLogoLink);

  const footerSecondaryLogoDiv = document.createElement('div');
  footerSecondaryLogoDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');

  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"]');
  if (footerSecondaryLogo) {
    const secondaryLogoImg = createOptimizedPicture(footerSecondaryLogo.src, footerSecondaryLogo.alt);
    secondaryLogoImg.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
    moveInstrumentation(footerSecondaryLogo, secondaryLogoImg.querySelector('img'));
    footerSecondaryLogoDiv.append(secondaryLogoImg);
  }
  footerBrandLeft.append(footerSecondaryLogoDiv);
  primaryContentDiv.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const footerListItems = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const numFooterLists = Math.ceil(footerListItems.length / 3); // Assuming 3 items per list for 2 lists in left and 2 in right

  for (let i = 0; i < numFooterLists; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('header-footerList');
    const footerUl = document.createElement('ul');
    footerUl.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');

    for (let j = 0; j < 3 && (i * 3 + j) < footerListItems.length; j += 1) {
      const item = footerListItems[i * 3 + j];
      const li = document.createElement('li');
      li.classList.add('header-footer-list__item');
      moveInstrumentation(item, li);

      const a = document.createElement('a');
      a.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
      a.setAttribute('data-link-region', 'Footer List');

      const link = item.querySelector('[data-aue-prop="link"]');
      if (link) {
        a.href = link.href;
        if (link.target) a.target = link.target;
        moveInstrumentation(link, a);
      }

      const label = item.querySelector('[data-aue-prop="label"]');
      if (label) {
        a.append(...label.childNodes);
        moveInstrumentation(label, a);
      }
      li.append(a);
      footerUl.append(li);
    }
    footerListDiv.append(footerUl);
    if (i < 2) {
      footerNavbarLeft.append(footerListDiv);
    } else {
      // This logic assumes a maximum of 4 footer lists, 2 on left and 2 on right.
      // If more lists are needed, this structure needs adjustment.
      let footerNavbarRight = footerNavbar.querySelector('.header-footer-brand__navbar--right');
      if (!footerNavbarRight) {
        footerNavbarRight = document.createElement('div');
        footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbarRight.append(footerListDiv);
    }
  }

  footerNavbar.append(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  primaryContentDiv.append(footerBrandRight);
  containerDiv.append(primaryContentDiv);
  footerBrandPrimary.append(containerDiv);
  footerBrandDiv.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('header-footer-brand__secondary');
  footerBrandSecondary.style.backgroundColor = '';

  const secondaryContainerDiv = document.createElement('div');
  secondaryContainerDiv.classList.add('header-container');

  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('header-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  const footerSocialItems = block.querySelectorAll('[data-aue-model="footerSocialItem"]');
  footerSocialItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
    moveInstrumentation(item, li);

    const a = document.createElement('a');
    a.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    a.target = '_blank';

    const socialLink = item.querySelector('[data-aue-prop="socialLink"]');
    if (socialLink) {
      a.href = socialLink.href;
      a.setAttribute('data-cta-label', `footer-${socialLink.textContent.toLowerCase()}`);
      a.setAttribute('data-platform-name', socialLink.textContent.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(socialLink, a);
    }

    const socialIcon = item.querySelector('[data-aue-prop="socialIcon"]');
    if (socialIcon) {
      const socialImg = createOptimizedPicture(socialIcon.src, socialIcon.alt);
      socialImg.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
      socialImg.querySelector('img').setAttribute('aria-label', socialIcon.alt);
      moveInstrumentation(socialIcon, socialImg.querySelector('img'));
      a.append(socialImg);
    }
    li.append(a);
    socialMediaUl.append(li);
  });
  socialMediaSection.append(socialMediaUl);
  secondaryContentDiv.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const externalLinkUl = document.createElement('ul');
  externalLinkUl.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');

  const externalLinkLi = document.createElement('li');
  externalLinkLi.classList.add('header-footer-brand__left--item', 'header-foot_link');

  const footerExternalLinkA = document.createElement('a');
  footerExternalLinkA.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
  footerExternalLinkA.setAttribute('data-cta-region', 'Footer');
  footerExternalLinkA.target = '_blank';

  const footerExternalLink = block.querySelector('[data-aue-prop="footerExternalLink"]');
  if (footerExternalLink) {
    footerExternalLinkA.href = footerExternalLink.href;
    footerExternalLinkA.append(...footerExternalLink.childNodes);
    moveInstrumentation(footerExternalLink, footerExternalLinkA);
  }
  externalLinkLi.append(footerExternalLinkA);
  externalLinkUl.append(externalLinkLi);
  copyrightSection.append(externalLinkUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');
  if (footerCopyright) {
    copyrightSpan.append(...footerCopyright.childNodes);
    moveInstrumentation(footerCopyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  secondaryContentDiv.append(copyrightSection);
  secondaryContainerDiv.append(secondaryContentDiv);
  footerBrandSecondary.append(secondaryContainerDiv);
  footerBrandDiv.append(footerBrandSecondary);

  aside.append(footerBrandDiv);
  headerSubmenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  headerSubmenuContainer.append(overlayDiv);

  headerSection.append(headerSubmenuContainer);
  block.replaceWith(headerSection);
}
