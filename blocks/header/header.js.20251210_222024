import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-section-position-relative header-section-mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  appNameSpan.setAttribute('data-app-name', '');
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    appNameSpan.setAttribute('data-app-name', appName.textContent);
    moveInstrumentation(appName, appNameSpan);
  }
  mainSection.append(appNameSpan);

  // Header Container
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const divFlex1 = document.createElement('div');
  divFlex1.className = 'd-flex w-25';
  headerContainer.append(divFlex1);

  const divFlex2 = document.createElement('div');
  divFlex2.className = 'd-flex justify-content-center w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoAnchor = document.createElement('a');
  logoAnchor.className = 'header-analytics-cta-click';
  logoAnchor.setAttribute('a-label', 'header-logo-boing');
  if (logoLink) {
    logoAnchor.href = logoLink.href;
    moveInstrumentation(logoLink, logoAnchor);
  } else {
    logoAnchor.href = '/';
  }

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo d-flex align-items-center';

  const logoImage = block.querySelector('[data-aue-prop="logo"]');
  if (logoImage) {
    const img = logoImage.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, true, img.loading);
      picture.className = 'header-logo-img';
      logoDiv.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
  }
  logoAnchor.append(logoDiv);
  divFlex2.append(logoAnchor);
  headerContainer.append(divFlex2);

  const divFlex3 = document.createElement('div');
  divFlex3.className = 'd-flex w-25 justify-content-end';

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const loginAnchor = document.createElement('a');
  loginAnchor.className = 'header-login-btn-wrapper header-analytics-cta-click';
  loginAnchor.style.display = 'inline';
  if (loginLink) {
    loginAnchor.href = loginLink.href;
    const loginButton = loginLink.querySelector('button');
    if (loginButton) {
      loginAnchor.append(loginButton);
      moveInstrumentation(loginLink, loginAnchor);
    }
  } else {
    loginAnchor.href = '/login.html';
    const defaultButton = document.createElement('button');
    defaultButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    defaultButton.textContent = 'Login';
    loginAnchor.append(defaultButton);
  }
  divFlex3.append(loginAnchor);
  headerContainer.append(divFlex3);
  mainSection.append(headerContainer);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';
    if (item.classList.contains('header-sidebar-menu-item--logout')) {
      li.classList.add('header-sidebar-menu-item--logout');
      li.style.display = 'none';
    }

    const menuLink = item.querySelector('[data-aue-prop="menuLink"]');
    const anchor = document.createElement('a');
    anchor.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
    if (menuLink) {
      anchor.href = menuLink.href;
      anchor.setAttribute('data-consent', menuLink.dataset.consent || 'false');
      anchor.setAttribute('data-link', menuLink.dataset.link || '');
      moveInstrumentation(menuLink, anchor);
    } else {
      anchor.href = '#';
    }
    if (item.classList.contains('header-sidebar-menu-item--logout-btn')) {
      anchor.classList.add('header-sidebar-menu-item--logout-btn');
    }

    const menuIcon = item.querySelector('[data-aue-prop="menuIcon"]');
    if (menuIcon) {
      const img = menuIcon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, img.loading);
        picture.className = 'header-sidebar-menu-icon me-4';
        anchor.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }

    const menuLabel = item.querySelector('[data-aue-prop="menuLabel"]');
    if (menuLabel) {
      anchor.append(menuLabel.textContent);
      moveInstrumentation(menuLabel, anchor);
    }
    li.append(anchor);
    sidebarMenu.append(li);
  });
  aside.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.className = 'header-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  // ITC Logo
  const itcLogoLink = block.querySelector('.header-footer-brand-left a[aria-label="ITC Logo"]');
  if (itcLogoLink) {
    footerBrandLeft.append(itcLogoLink);
  }

  // FSSI Logo
  const fssiLogoDiv = block.querySelector('.header-footer-brand-secondary--logo');
  if (fssiLogoDiv) {
    footerBrandLeft.append(fssiLogoDiv);
  }
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const numFooterLinks = footerLinks.length;
  const linksPerColumn = Math.ceil(numFooterLinks / 4); // Distribute into 4 columns

  for (let i = 0; i < 4; i += 1) {
    const footerListContainer = document.createElement('div');
    footerListContainer.className = 'header-footer-list-container';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const start = i * linksPerColumn;
    const end = Math.min(start + linksPerColumn, numFooterLinks);

    for (let j = start; j < end; j += 1) {
      const item = footerLinks[j];
      const li = document.createElement('li');
      li.className = 'header-footer-list-item';

      const footerLink = item.querySelector('[data-aue-prop="footerLink"]');
      const footerLabel = item.querySelector('[data-aue-prop="footerLabel"]');

      const anchor = document.createElement('a');
      anchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (footerLink) {
        anchor.href = footerLink.href;
        if (footerLink.target) anchor.target = footerLink.target;
        moveInstrumentation(footerLink, anchor);
      } else {
        anchor.href = '#';
      }
      if (footerLabel) {
        anchor.textContent = footerLabel.textContent;
        moveInstrumentation(footerLabel, anchor);
      }
      li.append(anchor);
      ul.append(li);
    }
    footerListContainer.append(ul);
    if (i < 2) {
      footerNavbarLeft.append(footerListContainer);
    } else {
      // Create a new div for the right side if it's the 3rd or 4th column
      if (i === 2) {
        const footerNavbarRight = document.createElement('div');
        footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbar.querySelector('.header-footer-brand-navbar--right').append(footerListContainer);
    }
  }

  footerNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.className = 'header-container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand-right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social-media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

    const socialLink = item.querySelector('[data-aue-prop="socialLink"]');
    const socialIcon = item.querySelector('[data-aue-prop="socialIcon"]');

    const anchor = document.createElement('a');
    anchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.setAttribute('target', '_blank');
    anchor.setAttribute('data-social-linktype', 'follow');

    if (socialLink) {
      anchor.href = socialLink.href;
      anchor.setAttribute('data-cta-label', `footer-${socialLink.dataset.platformName || ''}`);
      anchor.setAttribute('data-platform-name', socialLink.dataset.platformName || '');
      moveInstrumentation(socialLink, anchor);
    } else {
      anchor.href = '#';
    }

    if (socialIcon) {
      const img = socialIcon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, img.loading);
        picture.className = 'object-fit-contain w-100 h-100 no-rendition';
        anchor.setAttribute('aria-label', img.alt || '');
        anchor.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }
    li.append(anchor);
    socialMediaList.append(li);
  });
  socialMediaSection.append(socialMediaList);
  footerBrandSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLink = block.querySelector('.header-foot-link a');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand-left--item header-foot-link';
    li.append(itcPortalLink);
    copyrightList.append(li);
  }
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  const copyrightText = block.querySelector('.header-footer-brand-left--copyright span');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  footerBrandSecondaryContent.append(copyrightSection);
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  mainSection.append(submenuContainer);

  block.textContent = '';
  block.append(mainSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
