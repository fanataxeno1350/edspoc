import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  moveInstrumentation(block, headerSection);
  headerSection.className = 'header-section-position-relative header-section-mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  appNameSpan.setAttribute('data-app-name', block.children[0]?.children[0]?.textContent || 'boing');
  appNameSpan.textContent = block.children[0]?.children[0]?.textContent || 'boing';
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
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, block.children[0]?.children[2]?.textContent || logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    optimizedLogoPic.querySelector('img').className = 'header-logo-img';
    optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
    logoDiv.append(optimizedLogoPic);
  }

  const div3 = document.createElement('div');
  div3.className = 'd-flex w-25 justify-content-end';
  headerContainer.append(div3);

  const loginLink = document.createElement('a');
  loginLink.href = block.children[0]?.children[4]?.querySelector('a')?.href || '/login.html';
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

  const sidebarMenuItems = Array.from(block.children).slice(1, -3); // Skip appName, logo, login, and footer sections
  sidebarMenuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';

    const link = row.children[0]?.querySelector('a');
    const icon = row.children[0]?.querySelector('img');
    const label = row.children[0]?.textContent.trim();

    if (link && icon && label) {
      const menuLink = document.createElement('a');
      menuLink.href = link.href;
      menuLink.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
      menuLink.setAttribute('data-consent', link.getAttribute('data-consent') || 'false');
      menuLink.setAttribute('data-link', link.getAttribute('data-link') || '');

      const optimizedIconPic = createOptimizedPicture(icon.src, icon.alt);
      moveInstrumentation(icon, optimizedIconPic.querySelector('img'));
      optimizedIconPic.querySelector('img').className = 'header-sidebar-menu-icon me-4';
      optimizedIconPic.querySelector('img').setAttribute('loading', 'lazy');
      menuLink.append(optimizedIconPic);
      menuLink.append(document.createTextNode(label));
      li.append(menuLink);
    }
    sidebarMenu.append(li);
  });

  // Logout menu item (hardcoded as it's not directly in the block children in the provided JSON structure)
  const logoutLi = document.createElement('li');
  logoutLi.className = 'header-sidebar-menu-item header-sidebar-menu-item--logout py-6 border-bottom border-boing-neutral-gray-200';
  logoutLi.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar-menu-link header-sidebar-menu-item--logout-btn d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  const logoutImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', 'Logout');
  logoutImg.querySelector('img').className = 'header-sidebar-menu-icon me-4';
  logoutImg.querySelector('img').setAttribute('loading', 'lazy');
  logoutLink.append(logoutImg);
  logoutLink.append(document.createTextNode('Logout'));
  logoutLi.append(logoutLink);
  sidebarMenu.append(logoutLi);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  sidebar.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';
  sidebar.append(footerBrand);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';
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

  const footerLogoLink = document.createElement('a');
  footerLogoLink.href = 'https://www.itcportal.com/';
  footerLogoLink.target = '_blank';
  footerLogoLink.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
  footerLogoLink.setAttribute('data-cta-region', 'Footer');
  footerLogoLink.setAttribute('aria-label', 'ITC Logo');
  footerBrandLeft.append(footerLogoLink);

  const footerLogoImg = block.children[block.children.length - 3]?.children[0]?.querySelector('img');
  if (footerLogoImg) {
    const optimizedFooterLogoPic = createOptimizedPicture(footerLogoImg.src, footerLogoImg.alt);
    moveInstrumentation(footerLogoImg, optimizedFooterLogoPic.querySelector('img'));
    optimizedFooterLogoPic.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    optimizedFooterLogoPic.querySelector('img').setAttribute('loading', 'lazy');
    footerLogoLink.append(optimizedFooterLogoPic);
  }

  const footerBrandSecondaryLogoDiv = document.createElement('div');
  footerBrandSecondaryLogoDiv.className = 'header-footer-brand-secondary--logo d-inline-block';
  footerBrandLeft.append(footerBrandSecondaryLogoDiv);

  const footerLogoSecondaryImg = block.children[block.children.length - 2]?.children[0]?.querySelector('img');
  if (footerLogoSecondaryImg) {
    const optimizedFooterLogoSecondaryPic = createOptimizedPicture(footerLogoSecondaryImg.src, footerLogoSecondaryImg.alt);
    moveInstrumentation(footerLogoSecondaryImg, optimizedFooterLogoSecondaryPic.querySelector('img'));
    optimizedFooterLogoSecondaryPic.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    optimizedFooterLogoSecondaryPic.querySelector('img').setAttribute('loading', 'lazy');
    footerBrandSecondaryLogoDiv.append(optimizedFooterLogoSecondaryPic);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';
  footerContent.append(footerBrandRight);

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';
  footerNavbar.append(footerNavbarLeft);

  // Footer Links - dynamically create columns based on the block's children structure
  const footerLinksRows = Array.from(block.children).slice(block.children.length - 1);
  const footerLinksData = footerLinksRows[0]?.children || [];

  // Group footer links into columns (assuming 2 links per column based on HTML structure)
  const numColumns = Math.ceil(footerLinksData.length / 3);

  for (let i = 0; i < numColumns; i += 1) {
    const footerListContainer = document.createElement('div');
    footerListContainer.className = 'header-footer-list-container';
    if (i < Math.ceil(numColumns / 2)) {
      footerNavbarLeft.append(footerListContainer);
    } else {
      // Create a new right section if needed
      if (!footerNavbar.querySelector('.header-footer-brand-navbar--right')) {
        const footerNavbarRight = document.createElement('div');
        footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbar.querySelector('.header-footer-brand-navbar--right').append(footerListContainer);
    }

    const footerList = document.createElement('ul');
    footerList.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
    footerListContainer.append(footerList);

    for (let j = 0; j < 3; j += 1) {
      const linkIndex = (i * 3) + j;
      if (footerLinksData[linkIndex]) {
        const footerLinkCell = footerLinksData[linkIndex];
        const footerLink = footerLinkCell.querySelector('a');
        if (footerLink) {
          const li = document.createElement('li');
          moveInstrumentation(footerLinkCell, li);
          li.className = 'header-footer-list-item';

          const newLink = document.createElement('a');
          newLink.href = footerLink.href;
          newLink.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (footerLink.target) {
            newLink.target = footerLink.target;
          }
          newLink.textContent = footerLink.textContent;
          li.append(newLink);
          footerList.append(li);
        }
      }
    }
  }

  // Footer Brand Secondary
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';
  footerBrand.append(footerBrandSecondary);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerBrandSecondary.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  const footerSecondaryRight = document.createElement('section');
  footerSecondaryRight.className = 'header-footer-brand-right d-flex flex-column pb-5';
  footerSecondaryContent.append(footerSecondaryRight);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social-media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerSecondaryRight.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';
  footerSecondaryRight.append(socialMediaList);

  const socialLinksData = Array.from(block.children).slice(-1)[0]?.children || [];
  socialLinksData.forEach((cell) => {
    const socialLink = cell.querySelector('a');
    const socialIcon = cell.querySelector('img');

    if (socialLink && socialIcon) {
      const li = document.createElement('li');
      moveInstrumentation(cell, li);
      li.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

      const newSocialLink = document.createElement('a');
      newSocialLink.href = socialLink.href;
      newSocialLink.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
      newSocialLink.setAttribute('data-cta-region', 'Footer');
      newSocialLink.setAttribute('data-cta-label', socialLink.getAttribute('data-cta-label') || '');
      newSocialLink.target = '_blank';
      newSocialLink.setAttribute('data-platform-name', socialLink.getAttribute('data-platform-name') || '');
      newSocialLink.setAttribute('data-social-linktype', socialLink.getAttribute('data-social-linktype') || 'follow');

      const optimizedSocialIconPic = createOptimizedPicture(socialIcon.src, socialIcon.alt);
      moveInstrumentation(socialIcon, optimizedSocialIconPic.querySelector('img'));
      optimizedSocialIconPic.querySelector('img').setAttribute('aria-label', socialIcon.getAttribute('aria-label') || '');
      optimizedSocialIconPic.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      optimizedSocialIconPic.querySelector('img').setAttribute('loading', 'lazy');
      newSocialLink.append(optimizedSocialIconPic);
      li.append(newSocialLink);
      socialMediaList.append(li);
    }
  });

  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';
  footerSecondaryContent.append(footerSecondaryLeft);

  const footerSecondaryLeftList = document.createElement('ul');
  footerSecondaryLeftList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';
  footerSecondaryLeft.append(footerSecondaryLeftList);

  const footerLeftLinkItem = document.createElement('li');
  footerLeftLinkItem.className = 'header-footer-brand-left--item header-foot-link';
  footerSecondaryLeftList.append(footerLeftLinkItem);

  const footerLeftLink = document.createElement('a');
  footerLeftLink.href = block.children[block.children.length - 1]?.children[0]?.querySelector('a')?.href || 'https://www.itcportal.com/';
  footerLeftLink.target = '_blank';
  footerLeftLink.className = 'header-footer-brand-left--link header-analytics-cta-click';
  footerLeftLink.setAttribute('data-cta-region', 'Footer');
  footerLeftLink.textContent = block.children[block.children.length - 1]?.children[0]?.querySelector('a')?.textContent || 'ITC portal';
  footerLeftLinkItem.append(footerLeftLink);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  footerSecondaryLeft.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  copyrightSpan.textContent = block.children[block.children.length - 1]?.children[1]?.textContent || '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  block.textContent = '';
  block.append(headerSection);
}
