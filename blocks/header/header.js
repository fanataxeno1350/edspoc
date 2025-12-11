import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-section-position-relative header-section-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    appNameSpan.dataset.appName = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  headerSection.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const div1 = document.createElement('div');
  div1.className = 'd-flex w-25';
  headerContainer.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'd-flex justify-content-center w-25';
  const logoLink = block.querySelector('[data-aue-prop="logoLink"] a');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.className = 'header-analytics-cta-click';
    logoAnchor.setAttribute('aria-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-logo d-flex align-items-center';
    logoAnchor.append(logoDiv);

    const logoImg = block.querySelector('[data-aue-prop="logo"] img');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').className = 'header-logo-img';
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('loading', 'eager');
      logoDiv.append(picture);
      moveInstrumentation(logoImg, picture.querySelector('img'));
    }
    div2.append(logoAnchor);
  }
  headerContainer.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'd-flex w-25 justify-content-end';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"] a');
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  if (loginLink && loginText) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header-login-btn-wrapper header-analytics-cta-click';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginText.textContent;
    moveInstrumentation(loginText, loginButton);
    loginAnchor.append(loginButton);
    div3.append(loginAnchor);
  }
  headerContainer.append(div3);
  headerSection.append(headerContainer);

  const subMenuContainer = document.createElement('div');
  subMenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

  const headerMenuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  headerMenuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';

    const menuLink = item.querySelector('[data-aue-prop="menuLink"] a');
    const menuText = item.querySelector('[data-aue-prop="menuText"]');
    const menuIcon = item.querySelector('[data-aue-prop="icon"] img');

    if (menuLink && menuText) {
      const anchor = document.createElement('a');
      anchor.href = menuLink.href;
      anchor.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
      anchor.dataset.consent = 'false'; // Default, adjust if needed
      anchor.dataset.link = menuLink.href.replace('.html', ''); // Adjust path as needed
      moveInstrumentation(menuLink, anchor);

      if (menuIcon) {
        const picture = createOptimizedPicture(menuIcon.src, menuIcon.alt);
        picture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
        picture.querySelector('img').setAttribute('loading', 'lazy');
        anchor.append(picture);
        moveInstrumentation(menuIcon, picture.querySelector('img'));
      }
      anchor.append(menuText.textContent);
      moveInstrumentation(menuText, anchor);
      listItem.append(anchor);
    }
    sidebarMenu.append(listItem);
  });

  // Add the logout item if it exists in the authored content
  const logoutItem = block.querySelector('.header-sidebar-menu-item--logout');
  if (logoutItem) {
    sidebarMenu.append(logoutItem);
  }

  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';
  const footerBrandPrimaryContainer = document.createElement('div');
  footerBrandPrimaryContainer.className = 'header-container';
  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const footerLogos = block.querySelectorAll('[data-aue-model="footerLogoItem"]');
  footerLogos.forEach((item, index) => {
    const logoLink = item.querySelector('[data-aue-prop="logoLink"] a');
    const logoImg = item.querySelector('[data-aue-prop="logoImg"] img');

    if (logoLink && logoImg) {
      const anchor = document.createElement('a');
      anchor.href = logoLink.href;
      anchor.target = '_blank';
      anchor.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
      anchor.setAttribute('aria-label', logoImg.alt);
      if (index === 0) {
        moveInstrumentation(logoLink, anchor);
      } else {
        anchor.className = 'header-footer-brand-secondary--logo d-inline-block';
        moveInstrumentation(logoLink, anchor);
      }

      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      picture.querySelector('img').setAttribute('loading', 'lazy');
      anchor.append(picture);
      moveInstrumentation(logoImg, picture.querySelector('img'));
      footerBrandLeft.append(anchor);
    }
  });
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';

  const footerMenuItems = block.querySelectorAll('[data-aue-model="footerMenuItem"]');
  const numColumns = 2; // Assuming 2 columns for left and 2 for right
  const itemsPerColumn = Math.ceil(footerMenuItems.length / (numColumns * 2)); // Divide by 4 total columns

  for (let i = 0; i < numColumns; i += 1) {
    const listContainer = document.createElement('div');
    listContainer.className = 'header-footer-list-container';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    for (let j = 0; j < itemsPerColumn; j += 1) {
      const itemIndex = (i * itemsPerColumn) + j;
      if (itemIndex < footerMenuItems.length) {
        const item = footerMenuItems[itemIndex];
        const listItem = document.createElement('li');
        listItem.className = 'header-footer-list-item';

        const footerLink = item.querySelector('[data-aue-prop="footerLink"] a');
        const footerText = item.querySelector('[data-aue-prop="footerText"]');

        if (footerLink && footerText) {
          const anchor = document.createElement('a');
          anchor.href = footerLink.href;
          anchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
          anchor.dataset.linkRegion = 'Footer List';
          if (footerLink.target) {
            anchor.target = footerLink.target;
          }
          anchor.textContent = footerText.textContent;
          moveInstrumentation(footerLink, anchor);
          moveInstrumentation(footerText, anchor);
          listItem.append(anchor);
        }
        ul.append(listItem);
      }
    }
    listContainer.append(ul);
    footerNavbarLeft.append(listContainer);
  }
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';

  for (let i = numColumns; i < numColumns * 2; i += 1) {
    const listContainer = document.createElement('div');
    listContainer.className = 'header-footer-list-container';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    for (let j = 0; j < itemsPerColumn; j += 1) {
      const itemIndex = (i * itemsPerColumn) + j;
      if (itemIndex < footerMenuItems.length) {
        const item = footerMenuItems[itemIndex];
        const listItem = document.createElement('li');
        listItem.className = 'header-footer-list-item';

        const footerLink = item.querySelector('[data-aue-prop="footerLink"] a');
        const footerText = item.querySelector('[data-aue-prop="footerText"]');

        if (footerLink && footerText) {
          const anchor = document.createElement('a');
          anchor.href = footerLink.href;
          anchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
          anchor.dataset.linkRegion = 'Footer List';
          if (footerLink.target) {
            anchor.target = footerLink.target;
          }
          anchor.textContent = footerText.textContent;
          moveInstrumentation(footerLink, anchor);
          moveInstrumentation(footerText, anchor);
          listItem.append(anchor);
        }
        ul.append(listItem);
      }
    }
    listContainer.append(ul);
    footerNavbarRight.append(listContainer);
  }
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandPrimaryContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandPrimaryContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';
  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.className = 'header-container';
  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const footerSocialSection = document.createElement('section');
  footerSocialSection.className = 'header-footer-brand-right d-flex flex-column pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social-media--title';
  socialTitle.textContent = 'Follow Us On';
  footerSocialSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocialItems = block.querySelectorAll('[data-aue-model="footerSocialItem"]');
  footerSocialItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

    const socialLink = item.querySelector('[data-aue-prop="socialLink"] a');
    const socialIcon = item.querySelector('[data-aue-prop="socialIcon"] img');

    if (socialLink && socialIcon) {
      const anchor = document.createElement('a');
      anchor.href = socialLink.href;
      anchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
      anchor.dataset.ctaRegion = 'Footer';
      anchor.dataset.ctaLabel = `footer-${socialIcon.alt.toLowerCase()}`;
      anchor.target = '_blank';
      anchor.dataset.platformName = socialIcon.alt.toLowerCase();
      anchor.dataset.socialLinktype = 'follow';
      moveInstrumentation(socialLink, anchor);

      const picture = createOptimizedPicture(socialIcon.src, socialIcon.alt);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      picture.querySelector('img').setAttribute('aria-label', socialIcon.alt.toLowerCase());
      picture.querySelector('img').setAttribute('loading', 'lazy');
      anchor.append(picture);
      moveInstrumentation(socialIcon, picture.querySelector('img'));
      listItem.append(anchor);
    }
    socialList.append(listItem);
  });
  footerSocialSection.append(socialList);
  footerBrandSecondaryContent.append(footerSocialSection);

  const footerBrandLeftBottom = document.createElement('section');
  footerBrandLeftBottom.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';
  const footerBrandLeftListItem = document.createElement('li');
  footerBrandLeftListItem.className = 'header-footer-brand-left--item header-foot-link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcPortalLink.dataset.ctaRegion = 'Footer';
  itcPortalLink.textContent = 'ITC portal';
  footerBrandLeftListItem.append(itcPortalLink);
  footerBrandLeftList.append(footerBrandLeftListItem);
  footerBrandLeftBottom.append(footerBrandLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftBottom.append(copyrightDiv);
  footerBrandSecondaryContent.append(footerBrandLeftBottom);

  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);
  sidebar.append(footerBrand);
  subMenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  subMenuContainer.append(overlay);

  headerSection.append(subMenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
