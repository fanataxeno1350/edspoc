import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  moveInstrumentation(block, headerSection);
  headerSection.className = 'header-section-position-relative header-section-mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  appNameSpan.dataset.appName = block.children[0]?.children[0]?.textContent || '';
  appNameSpan.textContent = block.children[0]?.children[0]?.textContent || '';
  headerSection.append(appNameSpan);

  // Header Container
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';
  headerSection.append(headerContainer);

  const div1 = document.createElement('div');
  div1.className = 'd-flex w-25';
  headerContainer.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'd-flex justify-content-center w-25';
  headerContainer.append(div2);

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics-cta-click';
  logoLink.setAttribute('a-label', 'header-logo-boing');
  div2.append(logoLink);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo d-flex align-items-center';
  logoLink.append(logoDiv);

  const logoImg = block.children[0]?.children[1]?.querySelector('img');
  if (logoImg) {
    const optimizedLogo = createOptimizedPicture(logoImg.src, block.children[0]?.children[2]?.textContent || logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    optimizedLogo.querySelector('img').className = 'header-logo-img';
    optimizedLogo.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedLogo.querySelector('img').setAttribute('loading', 'eager');
    logoDiv.append(optimizedLogo);
  }

  const div3 = document.createElement('div');
  div3.className = 'd-flex w-25 justify-content-end';
  headerContainer.append(div3);

  const loginLink = document.createElement('a');
  loginLink.href = block.children[0]?.children[4]?.textContent || '/login.html';
  loginLink.className = 'header-login-btn-wrapper header-analytics-cta-click';
  loginLink.style.display = 'inline';
  div3.append(loginLink);

  const loginButton = document.createElement('button');
  loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
  loginButton.textContent = block.children[0]?.children[3]?.textContent || 'Login';
  loginLink.append(loginButton);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';
  headerSection.append(submenuContainer);

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar start-0 bg-white position-absolute';
  submenuContainer.append(sidebar);

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';
  sidebar.append(sidebarMenu);

  // Sidebar Menu Items
  const sidebarItems = Array.from(block.children).filter((row, index) => index > 0 && row.children.length === 3 && row.children[0].querySelector('img') && row.children[1].querySelector('a') && row.children[2].textContent);

  sidebarItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';

    const link = document.createElement('a');
    link.href = row.children[2]?.textContent || '#';
    link.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
    link.dataset.consent = 'false'; // Default value
    link.dataset.link = row.children[2]?.textContent || '';
    link.textContent = row.children[1]?.textContent || '';
    li.append(link);

    const img = row.children[0]?.querySelector('img');
    if (img) {
      const optimizedIcon = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedIcon.querySelector('img'));
      optimizedIcon.querySelector('img').className = 'header-sidebar-menu-icon me-4';
      optimizedIcon.querySelector('img').setAttribute('loading', 'lazy');
      link.prepend(optimizedIcon);
    }
    sidebarMenu.append(li);
  });

  // Logout item (static from HTML, not from block JSON)
  const logoutLi = document.createElement('li');
  logoutLi.className = 'header-sidebar-menu-item header-sidebar-menu-item--logout py-6 border-bottom border-boing-neutral-gray-200';
  logoutLi.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar-menu-link header-sidebar-menu-item--logout-btn d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
  logoutLink.dataset.consent = 'false';
  logoutLink.dataset.link = '/content/boing/in/en/home';
  const logoutImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', 'Logout');
  logoutImg.querySelector('img').className = 'header-sidebar-menu-icon me-4';
  logoutImg.querySelector('img').setAttribute('loading', 'lazy');
  logoutLink.append(logoutImg);
  logoutLink.append('Logout');
  logoutLi.append(logoutLink);
  sidebarMenu.append(logoutLi);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';
  sidebar.append(footerBrand);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrand.append(footerBrandPrimary);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';
  footerBrandPrimary.append(footerContainer);

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';
  footerContainer.append(footerContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';
  footerContent.append(footerBrandLeft);

  // ITC Logo (static)
  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
  itcLink.dataset.ctaRegion = 'Footer';
  itcLink.setAttribute('aria-label', 'ITC Logo');
  const itcImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp', 'ITC Logo');
  itcImg.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
  itcImg.querySelector('img').setAttribute('loading', 'lazy');
  itcLink.append(itcImg);
  footerBrandLeft.append(itcLink);

  // FSSI Logo (static)
  const fssiDiv = document.createElement('div');
  fssiDiv.className = 'header-footer-brand-secondary--logo d-inline-block';
  const fssiImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp', 'FSSI Logo');
  fssiImg.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
  fssiImg.querySelector('img').setAttribute('loading', 'lazy');
  fssiDiv.append(fssiImg);
  footerBrandLeft.append(fssiDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';
  footerContent.append(footerBrandRight);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';
  footerNav.append(footerNavLeft);

  const footerLinks = Array.from(block.children).filter((row, index) => index > 0 && row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].textContent);

  // Group footer links into two columns for left navbar
  const footerCol1 = document.createElement('div');
  footerCol1.className = 'header-footer-list-container';
  const ul1 = document.createElement('ul');
  ul1.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
  footerCol1.append(ul1);
  footerNavLeft.append(footerCol1);

  const footerCol2 = document.createElement('div');
  footerCol2.className = 'header-footer-list-container';
  const ul2 = document.createElement('ul');
  ul2.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
  footerCol2.append(ul2);
  footerNavLeft.append(footerCol2);

  footerLinks.slice(0, Math.ceil(footerLinks.length / 2)).forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-footer-list-item';
    const link = row.children[0].querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
      newLink.dataset.linkRegion = 'Footer List';
      if (link.target) newLink.target = link.target;
      li.append(newLink);
    }
    ul1.append(li);
  });

  footerLinks.slice(Math.ceil(footerLinks.length / 2)).forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-footer-list-item';
    const link = row.children[0].querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
      newLink.dataset.linkRegion = 'Footer List';
      if (link.target) newLink.target = link.target;
      li.append(newLink);
    }
    ul2.append(li);
  });

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
  footerNav.append(footerNavRight);

  // Social Links
  const socialLinks = Array.from(block.children).filter((row) => row.children.length === 2 && row.children[0].querySelector('img') && row.children[1].querySelector('a'));

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';
  footerBrand.append(footerBrandSecondary);

  const footerContainer2 = document.createElement('div');
  footerContainer2.className = 'header-container';
  footerBrandSecondary.append(footerContainer2);

  const footerContent2 = document.createElement('div');
  footerContent2.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';
  footerContainer2.append(footerContent2);

  const footerBrandRight2 = document.createElement('section');
  footerBrandRight2.className = 'header-footer-brand-right d-flex flex-column pb-5';
  footerContent2.append(footerBrandRight2);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social-media--title';
  socialTitle.textContent = 'Follow Us On';
  footerBrandRight2.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';
  footerBrandRight2.append(socialList);

  socialLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

    const link = row.children[1].querySelector('a');
    const img = row.children[0].querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
      newLink.dataset.ctaRegion = 'Footer';
      newLink.dataset.ctaLabel = `footer-${link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : link.href.includes('youtube') ? 'youtube' : ''}`;
      newLink.target = '_blank';
      newLink.dataset.platformName = link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : link.href.includes('youtube') ? 'youtube' : '';
      newLink.dataset.socialLinktype = 'follow';

      const optimizedIcon = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedIcon.querySelector('img'));
      optimizedIcon.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      optimizedIcon.querySelector('img').setAttribute('loading', 'lazy');
      optimizedIcon.querySelector('img').setAttribute('aria-label', newLink.dataset.platformName);
      newLink.append(optimizedIcon);
      li.append(newLink);
    }
    socialList.append(li);
  });

  const footerBrandLeft2 = document.createElement('section');
  footerBrandLeft2.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';
  footerContent2.append(footerBrandLeft2);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';
  footerBrandLeft2.append(footerBrandLeftList);

  // ITC Portal link (static)
  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-footer-brand-left--item header-foot-link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcPortalLink.dataset.ctaRegion = 'Footer';
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  footerBrandLeftList.append(itcPortalLi);

  // Copyright (static)
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerBrandLeft2.append(copyrightDiv);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  block.textContent = '';
  block.append(headerSection);
}
