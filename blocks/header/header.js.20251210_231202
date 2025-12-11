import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-section-position-relative header-section-mb-15';

  const appNameSpan = block.querySelector('[data-aue-prop="appName"]');
  if (appNameSpan) {
    appNameSpan.classList.add('header-app-name', 'd-none');
    headerSection.append(appNameSpan);
  }

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const divLeft = document.createElement('div');
  divLeft.className = 'd-flex w-25';
  headerContainer.append(divLeft);

  const divCenter = document.createElement('div');
  divCenter.className = 'd-flex justify-content-center w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]') || block.querySelector('a[data-aue-prop="logo"]');
  if (logoLink) {
    logoLink.classList.add('header-analytics-cta-click');
    logoLink.setAttribute('a-label', 'header-logo-boing');
    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-logo d-flex align-items-center';
    const logoImg = block.querySelector('[data-aue-prop="logo"]');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '150' }]);
      picture.querySelector('img').classList.add('header-logo-img');
      moveInstrumentation(logoImg, picture.querySelector('img'));
      logoDiv.append(picture);
    }
    logoLink.prepend(logoDiv);
    divCenter.append(logoLink);
  }
  headerContainer.append(divCenter);

  const divRight = document.createElement('div');
  divRight.className = 'd-flex w-25 justify-content-end';

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    loginLink.classList.add('header-login-btn-wrapper', 'header-analytics-cta-click');
    loginLink.style.display = 'inline';
    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLink.textContent;
    loginLink.textContent = '';
    loginLink.append(loginButton);
    divRight.append(loginLink);
  }
  headerContainer.append(divRight);
  headerSection.append(headerContainer);

  const headerSubmenuContainer = document.createElement('div');
  headerSubmenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';
    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const label = item.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      link.classList.add('header-sidebar-menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');
      link.setAttribute('data-link', link.href);
      link.textContent = '';
      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.querySelector('img').classList.add('header-sidebar-menu-icon', 'me-4');
        moveInstrumentation(icon, picture.querySelector('img'));
        link.append(picture);
      }
      link.append(label.textContent);
      moveInstrumentation(label, link);
      listItem.append(link);
    }
    if (item.classList.contains('header-sidebar-menu-item--logout')) {
      listItem.classList.add('header-sidebar-menu-item--logout');
      listItem.style.display = 'none';
      const logoutButton = listItem.querySelector('.header-sidebar-menu-item--logout-btn');
      if (logoutButton) {
        logoutButton.classList.add('header-sidebar-menu-link', 'header-sidebar-menu-item--logout-btn', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');
      }
    }
    sidebarMenu.append(listItem);
    moveInstrumentation(item, listItem);
  });
  aside.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.className = 'header-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const footerBrandLogos = block.querySelectorAll('[data-aue-model="footerBrandLogo"]');
  footerBrandLogos.forEach((logoItem) => {
    const link = logoItem.querySelector('[data-aue-prop="link"]');
    const logoImg = logoItem.querySelector('[data-aue-prop="logo"]');
    if (link && logoImg) {
      link.classList.add('header-footer-brand-logo', 'd-inline-block', 'header-analytics-cta-click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('aria-label', logoImg.alt);
      link.textContent = '';
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      moveInstrumentation(logoImg, picture.querySelector('img'));
      link.append(picture);
      footerBrandLeft.append(link);
      moveInstrumentation(logoItem, link);
    } else if (logoImg) {
      const div = document.createElement('div');
      div.className = 'header-footer-brand-secondary--logo d-inline-block';
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
      moveInstrumentation(logoImg, picture.querySelector('img'));
      div.append(picture);
      footerBrandLeft.append(div);
      moveInstrumentation(logoItem, div);
    }
  });
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentListContainer = document.createElement('div');
  currentListContainer.className = 'header-footer-list-container';
  let currentList = document.createElement('ul');
  currentList.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

  footerLinks.forEach((linkItem, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-list-item';
    const link = linkItem.querySelector('[data-aue-prop="link"]');
    const label = linkItem.querySelector('[data-aue-prop="label"]');
    if (link && label) {
      link.classList.add('header-cta-analytics', 'header-analytics-cta-click', 'header-footer-list-item--link', 'd-inline-block');
      link.setAttribute('data-link-region', 'Footer List');
      link.textContent = label.textContent;
      moveInstrumentation(label, link);
      listItem.append(link);
    }
    currentList.append(listItem);
    moveInstrumentation(linkItem, listItem);

    if ((index + 1) % 3 === 0) {
      currentListContainer.append(currentList);
      if ((index + 1) <= 6) {
        footerBrandNavbarLeft.append(currentListContainer);
      } else {
        if (!footerBrandNavbar.querySelector('.header-footer-brand-navbar--right')) {
          const footerBrandNavbarRight = document.createElement('div');
          footerBrandNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
          footerBrandNavbar.append(footerBrandNavbarRight);
        }
        footerBrandNavbar.querySelector('.header-footer-brand-navbar--right').append(currentListContainer);
      }
      currentListContainer = document.createElement('div');
      currentListContainer.className = 'header-footer-list-container';
      currentList = document.createElement('ul');
      currentList.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
    }
  });

  if (currentList.children.length > 0) {
    currentListContainer.append(currentList);
    if (footerLinks.length <= 6) {
      footerBrandNavbarLeft.append(currentListContainer);
    } else {
      if (!footerBrandNavbar.querySelector('.header-footer-brand-navbar--right')) {
        const footerBrandNavbarRight = document.createElement('div');
        footerBrandNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
        footerBrandNavbar.append(footerBrandNavbarRight);
      }
      footerBrandNavbar.querySelector('.header-footer-brand-navbar--right').append(currentListContainer);
    }
  }

  footerBrandNavbar.append(footerBrandNavbarLeft);
  footerBrandRight.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';

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
  socialLinks.forEach((socialItem) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';
    const link = socialItem.querySelector('[data-aue-prop="link"]');
    const icon = socialItem.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      link.classList.add('header-footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'header-analytics-cta-click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      link.setAttribute('target', '_blank');
      link.setAttribute('data-platform-name', icon.alt.toLowerCase());
      link.setAttribute('data-social-linktype', 'follow');
      link.textContent = '';
      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      moveInstrumentation(icon, picture.querySelector('img'));
      link.append(picture);
      listItem.append(link);
    }
    socialMediaList.append(listItem);
    moveInstrumentation(socialItem, listItem);
  });
  socialMediaSection.append(socialMediaList);
  footerBrandSecondaryContent.append(socialMediaSection);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLink = document.createElement('li');
  itcPortalLink.className = 'header-footer-brand-left--item header-foot-link';
  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.textContent = 'ITC portal';
  itcPortalLink.append(itcLink);
  footerBrandLeftList.append(itcPortalLink);
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftSecondary.append(copyrightDiv);
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);

  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  headerSubmenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  headerSubmenuContainer.append(overlay);
  headerSection.append(headerSubmenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}