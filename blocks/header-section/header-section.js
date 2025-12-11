import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-section-position-relative header-section-mb-15';

  const appName = document.createElement('span');
  appName.className = 'header-app-name d-none';
  appName.textContent = 'boing';
  appName.setAttribute('data-app-name', 'boing');
  headerSection.append(appName);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'd-flex w-25';
  headerContainer.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'd-flex justify-content-center w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]') || block.querySelector('a');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.className = 'header-analytics-cta-click';
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-logo d-flex align-items-center';

    const logoImage = block.querySelector('[data-aue-prop="logoImage"] img');
    if (logoImage) {
      const picture = createOptimizedPicture(logoImage.src, logoImage.alt, true, [{ width: '100px' }]);
      picture.querySelector('img').className = 'header-logo-img';
      moveInstrumentation(logoImage, picture.querySelector('img'));
      logoDiv.append(picture);
    }
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
  }
  headerContainer.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'd-flex w-25 justify-content-end';

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]') || block.querySelector('a[href*="login"]');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header-login-btn-wrapper header-analytics-cta-click';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
  }
  headerContainer.append(headerRightDiv);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  menuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';
    if (item.querySelector('a[data-link="/content/boing/in/en/home"]')) {
      listItem.classList.add('header-sidebar-menu-item--logout');
      listItem.style.display = 'none';
    }

    const link = item.querySelector('[data-aue-prop="link"]') || item.querySelector('a');
    const text = item.querySelector('[data-aue-prop="text"]') || link;
    const icon = item.querySelector('[data-aue-prop="icon"] img');

    if (link && text) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
      anchor.setAttribute('data-consent', link.dataset.consent || 'false');
      anchor.setAttribute('data-link', link.dataset.link || link.href);
      moveInstrumentation(link, anchor);

      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
        moveInstrumentation(icon, picture.querySelector('img'));
        anchor.append(picture);
      }
      anchor.append(text.textContent.trim());
      listItem.append(anchor);
    }
    sidebarMenu.append(listItem);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const footerBrandLogo1 = block.querySelector('[data-aue-prop="footerBrandLogo1"] img');
  if (footerBrandLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = 'https://www.itcportal.com/';
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerBrandLogo1.closest('a'), logo1Anchor);

    const picture = createOptimizedPicture(footerBrandLogo1.src, footerBrandLogo1.alt);
    picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    moveInstrumentation(footerBrandLogo1, picture.querySelector('img'));
    logo1Anchor.append(picture);
    footerBrandLeft.append(logo1Anchor);
  }

  const footerBrandLogo2 = block.querySelector('[data-aue-prop="footerBrandLogo2"] img');
  if (footerBrandLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand-secondary--logo d-inline-block';
    moveInstrumentation(footerBrandLogo2.closest('div'), logo2Div);

    const picture = createOptimizedPicture(footerBrandLogo2.src, footerBrandLogo2.alt);
    picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    moveInstrumentation(footerBrandLogo2, picture.querySelector('img'));
    logo2Div.append(picture);
    footerBrandLeft.append(logo2Div);
  }
  footerContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const numLinksPerColumn = Math.ceil(footerLinks.length / 4);

  for (let i = 0; i < 4; i += 1) {
    const footerListContainer = document.createElement('div');
    footerListContainer.className = 'header-footer-list-container';
    const footerList = document.createElement('ul');
    footerList.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const startIndex = i * numLinksPerColumn;
    const endIndex = Math.min(startIndex + numLinksPerColumn, footerLinks.length);

    for (let j = startIndex; j < endIndex; j += 1) {
      const item = footerLinks[j];
      const listItem = document.createElement('li');
      listItem.className = 'header-footer-list-item';

      const link = item.querySelector('[data-aue-prop="link"]') || item.querySelector('a');
      const text = item.querySelector('[data-aue-prop="text"]') || link;

      if (link && text) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        if (link.target) anchor.target = link.target;
        anchor.textContent = text.textContent.trim();
        moveInstrumentation(link, anchor);
        listItem.append(anchor);
      }
      footerList.append(listItem);
    }
    footerListContainer.append(footerList);
    if (i < 2) {
      footerNavbarLeft.append(footerListContainer);
    } else {
      if (!footerNavbar.querySelector('.header-footer-brand-navbar--right')) {
        const footerNavbarRight = document.createElement('div');
        footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbar.querySelector('.header-footer-brand-navbar--right').append(footerListContainer);
    }
  }

  footerNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerContent.append(footerBrandRight);
  footerContainer.append(footerContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const footerSecondaryRight = document.createElement('section');
  footerSecondaryRight.className = 'header-footer-brand-right d-flex flex-column pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social-media--title';
  socialTitle.textContent = 'Follow Us On';
  footerSecondaryRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocialItems = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocialItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

    const link = item.querySelector('[data-aue-prop="link"]') || item.querySelector('a');
    const icon = item.querySelector('[data-aue-prop="icon"] img');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      moveInstrumentation(icon, picture.querySelector('img'));
      anchor.append(picture);
      listItem.append(anchor);
    }
    socialList.append(listItem);
  });
  footerSecondaryRight.append(socialList);
  footerSecondaryContent.append(footerSecondaryRight);

  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const footerSecondaryLeftList = document.createElement('ul');
  footerSecondaryLeftList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLink = document.createElement('li');
  itcPortalLink.className = 'header-footer-brand-left--item header-foot-link';
  const itcAnchor = document.createElement('a');
  itcAnchor.href = 'https://www.itcportal.com/';
  itcAnchor.target = '_blank';
  itcAnchor.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcAnchor.setAttribute('data-cta-region', 'Footer');
  itcAnchor.textContent = 'ITC portal';
  itcPortalLink.append(itcAnchor);
  footerSecondaryLeftList.append(itcPortalLink);
  footerSecondaryLeft.append(footerSecondaryLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');
  if (footerCopyright) {
    copyrightSpan.textContent = footerCopyright.textContent.trim();
    moveInstrumentation(footerCopyright, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  footerSecondaryLeft.append(copyrightDiv);

  footerSecondaryContent.append(footerSecondaryLeft);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
