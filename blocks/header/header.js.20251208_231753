import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const footerLogoITC = block.querySelector('[data-aue-prop="footerLogoITC"]');
  const footerLogoFSSI = block.querySelector('[data-aue-prop="footerLogoFSSI"]');
  const footerLeftLink = block.querySelector('[data-aue-prop="footerLeftLink"]');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');

  const headerSection = document.createElement('section');
  headerSection.classList.add('header-position-relative', 'header-mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-d-none', 'header-app-name');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    appNameSpan.dataset.appName = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  headerSection.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.classList.add('header-boing-container', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('header-d-flex', 'header-w-25');
  // Assuming some content might go here, but not explicitly in JSON
  headerContainer.append(headerLeftDiv);

  const headerMiddleDiv = document.createElement('div');
  headerMiddleDiv.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  const headerLogoAnchor = document.createElement('a');
  headerLogoAnchor.classList.add('header-analytics_cta_click');
  headerLogoAnchor.dataset.ct = '';
  headerLogoAnchor.dataset.label = 'header-logo-boing';
  if (headerLogoLink) {
    headerLogoAnchor.href = headerLogoLink.href;
    moveInstrumentation(headerLogoLink, headerLogoAnchor);
  } else {
    headerLogoAnchor.href = '/';
  }
  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('header__logo', 'header-d-flex', 'header-align-items-center');
  if (headerLogo) {
    const pic = createOptimizedPicture(headerLogo.src, headerLogo.alt);
    pic.classList.add('header__logo-img');
    headerLogoDiv.append(pic);
    moveInstrumentation(headerLogo, pic.querySelector('img'));
  }
  headerLogoAnchor.append(headerLogoDiv);
  headerMiddleDiv.append(headerLogoAnchor);
  headerContainer.append(headerMiddleDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  const loginAnchor = document.createElement('a');
  loginAnchor.classList.add('header__login-btn-wrapper', 'header-analytics_cta_click');
  loginAnchor.style.display = 'inline';
  if (loginLink) {
    loginAnchor.href = loginLink.href;
    moveInstrumentation(loginLink, loginAnchor);
  } else {
    loginAnchor.href = '/login.html';
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add('header__login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
  loginButton.textContent = 'Login';
  loginAnchor.append(loginButton);
  headerRightDiv.append(loginAnchor);
  headerContainer.append(headerRightDiv);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');

  const sidebarAside = document.createElement('aside');
  sidebarAside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const menuLink = item.querySelector('[data-aue-prop="menuLink"]');
    const menuIcon = item.querySelector('[data-aue-prop="menuIcon"]');
    const menuText = item.querySelector('[data-aue-prop="menuText"]');

    const li = document.createElement('li');
    li.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');
    moveInstrumentation(item, li);

    const anchor = document.createElement('a');
    anchor.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
    if (menuLink) {
      anchor.href = menuLink.href;
      anchor.dataset.link = menuLink.href;
      moveInstrumentation(menuLink, anchor);
    }

    if (menuIcon) {
      const pic = createOptimizedPicture(menuIcon.src, menuIcon.alt);
      pic.classList.add('header-sidebar__menu-icon', 'header-me-4');
      pic.querySelector('img').loading = 'lazy';
      anchor.append(pic);
      moveInstrumentation(menuIcon, pic.querySelector('img'));
    }

    if (menuText) {
      anchor.append(menuText.textContent);
      moveInstrumentation(menuText, anchor);
    }
    li.append(anchor);
    sidebarMenuUl.append(li);
  });
  sidebarAside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  sidebarAside.append(sidebarCurve);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.classList.add('header-footer-brand__primary');
  footerPrimarySection.style.backgroundColor = '';

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.classList.add('header-container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  const itcAnchor = document.createElement('a');
  itcAnchor.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
  itcAnchor.dataset.ctaRegion = 'Footer';
  itcAnchor.ariaLabel = 'ITC Logo';
  itcAnchor.target = '_blank';
  itcAnchor.href = 'https://www.itcportal.com/'; // Default value
  if (footerLogoITC) {
    const pic = createOptimizedPicture(footerLogoITC.src, footerLogoITC.alt);
    pic.classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100');
    pic.querySelector('img').loading = 'lazy';
    itcAnchor.append(pic);
    moveInstrumentation(footerLogoITC, pic.querySelector('img'));
  }
  footerBrandLeft.append(itcAnchor);

  const fssiDiv = document.createElement('div');
  fssiDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
  if (footerLogoFSSI) {
    const pic = createOptimizedPicture(footerLogoFSSI.src, footerLogoFSSI.alt);
    pic.classList.add('header-object-fit-contain', 'header-w-100');
    pic.querySelector('img').loading = 'lazy';
    fssiDiv.append(pic);
    moveInstrumentation(footerLogoFSSI, pic.querySelector('img'));
  }
  footerBrandLeft.append(fssiDiv);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNavbar.ariaLabel = 'footer navbar';

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const createFooterList = (listItems) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('header-footerList');
    const ul = document.createElement('ul');
    ul.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');

    listItems.forEach((item) => {
      const footerLink = item.querySelector('[data-aue-prop="footerLink"]');
      const footerLinkText = item.querySelector('[data-aue-prop="footerLinkText"]');

      const li = document.createElement('li');
      li.classList.add('header-footer-list__item');
      moveInstrumentation(item, li);

      const anchor = document.createElement('a');
      anchor.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
      anchor.dataset.linkRegion = 'Footer List';
      if (footerLink) {
        anchor.href = footerLink.href;
        if (footerLink.target) anchor.target = footerLink.target;
        moveInstrumentation(footerLink, anchor);
      }
      if (footerLinkText) {
        anchor.textContent = footerLinkText.textContent;
        moveInstrumentation(footerLinkText, anchor);
      }
      li.append(anchor);
      ul.append(li);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  const footerList1Items = block.querySelectorAll('[data-aue-model="footerListItem"][data-aue-label="Footer List 1"]');
  if (footerList1Items.length > 0) {
    footerNavbarLeft.append(createFooterList(Array.from(footerList1Items)));
  }

  const footerList2Items = block.querySelectorAll('[data-aue-model="footerListItem"][data-aue-label="Footer List 2"]');
  if (footerList2Items.length > 0) {
    footerNavbarLeft.append(createFooterList(Array.from(footerList2Items)));
  }
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const footerList3Items = block.querySelectorAll('[data-aue-model="footerListItem"][data-aue-label="Footer List 3"]');
  if (footerList3Items.length > 0) {
    footerNavbarRight.append(createFooterList(Array.from(footerList3Items)));
  }

  const footerList4Items = block.querySelectorAll('[data-aue-model="footerListItem"][data-aue-label="Footer List 4"]');
  if (footerList4Items.length > 0) {
    footerNavbarRight.append(createFooterList(Array.from(footerList4Items)));
  }
  footerNavbar.append(footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerPrimaryContainer);
  footerBrandDiv.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.classList.add('header-footer-brand__secondary');
  footerSecondarySection.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const socialMediaRight = document.createElement('section');
  socialMediaRight.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('header-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialMediaTitle);

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((item) => {
    const socialUrl = item.querySelector('[data-aue-prop="socialUrl"]');
    const socialIcon = item.querySelector('[data-aue-prop="socialIcon"]');

    const li = document.createElement('li');
    li.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
    moveInstrumentation(item, li);

    const anchor = document.createElement('a');
    anchor.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
    anchor.dataset.ctaRegion = 'Footer';
    anchor.target = '_blank';
    if (socialUrl) {
      anchor.href = socialUrl.href;
      anchor.dataset.ctaLabel = `footer-${socialUrl.textContent.toLowerCase()}`;
      anchor.dataset.platformName = socialUrl.textContent.toLowerCase();
      anchor.dataset.socialLinktype = 'follow';
      moveInstrumentation(socialUrl, anchor);
    }

    if (socialIcon) {
      const pic = createOptimizedPicture(socialIcon.src, socialIcon.alt);
      pic.classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100');
      pic.querySelector('img').loading = 'lazy';
      pic.querySelector('img').ariaLabel = anchor.dataset.platformName;
      anchor.append(pic);
      moveInstrumentation(socialIcon, pic.querySelector('img'));
    }
    li.append(anchor);
    socialMediaUl.append(li);
  });
  socialMediaRight.append(socialMediaUl);
  footerSecondaryContent.append(socialMediaRight);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const footerLeftUl = document.createElement('ul');
  footerLeftUl.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');

  const footerLeftLi = document.createElement('li');
  footerLeftLi.classList.add('header-footer-brand__left--item', 'header-foot_link');
  const footerLeftAnchor = document.createElement('a');
  footerLeftAnchor.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
  footerLeftAnchor.dataset.ctaRegion = 'Footer';
  footerLeftAnchor.target = '_blank';
  if (footerLeftLink) {
    footerLeftAnchor.href = footerLeftLink.href;
    footerLeftAnchor.textContent = footerLeftLink.textContent;
    moveInstrumentation(footerLeftLink, footerLeftAnchor);
  } else {
    footerLeftAnchor.href = 'https://www.itcportal.com/';
    footerLeftAnchor.textContent = 'ITC portal';
  }
  footerLeftLi.append(footerLeftAnchor);
  footerLeftUl.append(footerLeftLi);
  footerLeftSection.append(footerLeftUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  footerLeftSection.append(copyrightDiv);
  footerSecondaryContent.append(footerLeftSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrandDiv.append(footerSecondarySection);

  sidebarAside.append(footerBrandDiv);
  submenuContainer.append(sidebarAside);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlayDiv);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
