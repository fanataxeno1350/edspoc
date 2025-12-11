import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-section-position-relative header-section-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  headerSection.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const div1 = document.createElement('div');
  div1.className = 'd-flex w-25';
  headerContainer.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'd-flex justify-content-center w-25';
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoAnchor = document.createElement('a');
  logoAnchor.className = 'header-analytics-cta-click';
  logoAnchor.setAttribute('a-label', 'header-logo-boing');
  if (logoLink) {
    logoAnchor.href = logoLink.querySelector('a')?.href || '#';
    moveInstrumentation(logoLink, logoAnchor);
  } else {
    logoAnchor.href = '/';
  }

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo d-flex align-items-center';
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const img = logoImage.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, true, img.loading);
      picture.querySelector('img').className = 'header-logo-img';
      logoDiv.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    logoImage.remove();
  }
  logoAnchor.append(logoDiv);
  div2.append(logoAnchor);
  headerContainer.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'd-flex w-25 justify-content-end';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  const loginAnchor = document.createElement('a');
  loginAnchor.className = 'header-login-btn-wrapper header-analytics-cta-click';
  loginAnchor.style.display = 'inline';
  if (loginLink) {
    loginAnchor.href = loginLink.querySelector('a')?.href || '#';
    moveInstrumentation(loginLink, loginAnchor);
  } else {
    loginAnchor.href = '/login.html';
  }

  const loginButton = document.createElement('button');
  loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
  if (loginText) {
    loginButton.textContent = loginText.textContent;
    moveInstrumentation(loginText, loginButton);
  } else {
    loginButton.textContent = 'Login';
  }
  loginAnchor.append(loginButton);
  div3.append(loginAnchor);
  headerContainer.append(div3);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';
    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const text = item.querySelector('[data-aue-prop="text"]');

    const anchor = document.createElement('a');
    anchor.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
    anchor.setAttribute('data-consent', 'false');
    if (link) {
      anchor.href = link.querySelector('a')?.href || '#';
      anchor.setAttribute('data-link', link.querySelector('a')?.href || '');
      moveInstrumentation(link, anchor);
    }

    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, img.loading);
        picture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
        anchor.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
      icon.remove();
    }

    if (text) {
      anchor.append(text.textContent);
      moveInstrumentation(text, anchor);
    }
    li.append(anchor);
    sidebarMenu.append(li);
    item.remove();
  });

  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  sidebar.append(sidebarCurve);

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

  const brandLogos = block.querySelectorAll('[data-aue-model="brandLogo"]');
  brandLogos.forEach((item) => {
    const brandLogoAnchor = document.createElement('a');
    brandLogoAnchor.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
    brandLogoAnchor.setAttribute('data-cta-region', 'Footer');
    brandLogoAnchor.setAttribute('aria-label', 'ITC Logo');
    brandLogoAnchor.target = '_blank';

    const link = item.querySelector('[data-aue-prop="link"]');
    if (link) {
      brandLogoAnchor.href = link.querySelector('a')?.href || '#';
      moveInstrumentation(link, brandLogoAnchor);
    }

    const image = item.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, img.loading);
        picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
        brandLogoAnchor.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
      image.remove();
    }
    footerBrandLeft.append(brandLogoAnchor);
    item.remove();
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
  let currentList = document.createElement('ul');
  currentList.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
  let listContainer = document.createElement('div');
  listContainer.className = 'header-footer-list-container';
  listContainer.append(currentList);
  footerBrandNavbarLeft.append(listContainer);

  footerLinks.forEach((item, index) => {
    if (index > 0 && index % 3 === 0) {
      currentList = document.createElement('ul');
      currentList.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
      listContainer = document.createElement('div');
      listContainer.className = 'header-footer-list-container';
      listContainer.append(currentList);
      if (index < 6) {
        footerBrandNavbarLeft.append(listContainer);
      } else {
        if (!footerBrandNavbar.querySelector('.header-footer-brand-navbar--right')) {
          const footerBrandNavbarRight = document.createElement('div');
          footerBrandNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
          footerBrandNavbar.append(footerBrandNavbarRight);
        }
        footerBrandNavbar.querySelector('.header-footer-brand-navbar--right').append(listContainer);
      }
    }

    const li = document.createElement('li');
    li.className = 'header-footer-list-item';

    const link = item.querySelector('[data-aue-prop="link"]');
    const text = item.querySelector('[data-aue-prop="text"]');

    const anchor = document.createElement('a');
    anchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
    anchor.setAttribute('data-link-region', 'Footer List');
    if (link) {
      anchor.href = link.querySelector('a')?.href || '#';
      moveInstrumentation(link, anchor);
    }
    if (text) {
      anchor.textContent = text.textContent;
      moveInstrumentation(text, anchor);
    }
    li.append(anchor);
    currentList.append(li);
    item.remove();
  });

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

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social-media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');

    const anchor = document.createElement('a');
    anchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.target = '_blank';

    if (link) {
      anchor.href = link.querySelector('a')?.href || '#';
      anchor.setAttribute('data-platform-name', 'social'); // Placeholder, actual platform name might need parsing from link
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);
    }

    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, img.loading);
        picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
        anchor.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
      icon.remove();
    }
    li.append(anchor);
    socialList.append(li);
    item.remove();
  });

  socialMediaSection.append(socialList);
  footerBrandSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';

  const copyrightListItem = document.createElement('li');
  copyrightListItem.className = 'header-footer-brand-left--item header-foot-link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  copyrightListItem.append(itcPortalLink);
  copyrightList.append(copyrightListItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
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
