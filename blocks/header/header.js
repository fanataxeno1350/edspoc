import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-section-position-relative header-section-mb-15';

  const appNameSpan = block.querySelector('[data-app-name]');
  if (appNameSpan) {
    headerSection.append(appNameSpan);
  }

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const div1 = document.createElement('div');
  div1.className = 'd-flex w-25';
  headerContainer.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'd-flex justify-content-center w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.querySelector('a')?.href || '/';
    logoAnchor.className = 'header-analytics-cta-click';
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-logo d-flex align-items-center';

    const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
    if (logoImage) {
      const img = logoImage.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '150' }]);
        picture.querySelector('img').className = 'header-logo-img';
        logoDiv.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }
    logoAnchor.append(logoDiv);
    div2.append(logoAnchor);
  }
  headerContainer.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'd-flex w-25 justify-content-end';

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.querySelector('a')?.href || '/login.html';
    loginAnchor.className = 'header-login-btn-wrapper header-analytics-cta-click';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLink.textContent.trim() || 'Login';
    loginAnchor.append(loginButton);
    div3.append(loginAnchor);
  }
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
    if (item.classList.contains('header-sidebar-menu-item--logout')) {
      li.classList.add('header-sidebar-menu-item--logout');
      li.style.display = 'none';
    }

    const link = item.querySelector('[data-aue-prop="link"]');
    const anchor = document.createElement('a');
    anchor.href = link?.querySelector('a')?.href || '#';
    anchor.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
    anchor.setAttribute('data-consent', link?.querySelector('a')?.dataset.consent || 'false');
    anchor.setAttribute('data-link', link?.querySelector('a')?.dataset.link || '');
    moveInstrumentation(link, anchor);

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        picture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
        anchor.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
    }

    const label = item.querySelector('[data-aue-prop="label"]');
    if (label) {
      anchor.append(label.textContent.trim());
      moveInstrumentation(label, anchor);
    }

    li.append(anchor);
    sidebarMenu.append(li);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';

  const footerBrandPrimaryContainer = document.createElement('div');
  footerBrandPrimaryContainer.className = 'header-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const footerBrandLogo = block.querySelector('[data-aue-prop="footerBrandLogo"]');
  if (footerBrandLogo) {
    const anchor = document.createElement('a');
    anchor.href = footerBrandLogo.querySelector('a')?.href || 'https://www.itcportal.com/';
    anchor.target = '_blank';
    anchor.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.setAttribute('aria-label', footerBrandLogo.querySelector('img')?.alt || 'ITC Logo');
    moveInstrumentation(footerBrandLogo, anchor);

    const img = footerBrandLogo.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      anchor.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    footerBrandLeft.append(anchor);
  }

  const footerSecondaryLogoDiv = document.createElement('div');
  footerSecondaryLogoDiv.className = 'header-footer-brand-secondary--logo d-inline-block';
  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"]');
  if (footerSecondaryLogo) {
    const img = footerSecondaryLogo.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
      picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
      footerSecondaryLogoDiv.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
  }
  footerBrandLeft.append(footerSecondaryLogoDiv);
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkContainers = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];
  linkContainers.forEach(container => container.className = 'header-footer-list-container');

  const linkLists = linkContainers.map(() => {
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
    return ul;
  });

  footerLinks.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'header-footer-list-item';

    const link = item.querySelector('[data-aue-prop="link"]');
    const label = item.querySelector('[data-aue-prop="label"]');

    const anchor = document.createElement('a');
    anchor.href = link?.querySelector('a')?.href || '#';
    anchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
    anchor.setAttribute('data-link-region', 'Footer List');
    anchor.textContent = label?.textContent.trim() || '';
    if (link?.querySelector('a')?.target) {
      anchor.target = link.querySelector('a').target;
    }
    moveInstrumentation(item, anchor);

    li.append(anchor);
    linkLists[index % 4].append(li);
  });

  linkLists.forEach((list, index) => {
    if (list.children.length > 0) {
      if (index < 2) {
        linkContainers[index].append(list);
        footerBrandNavbarLeft.append(linkContainers[index]);
      } else {
        linkContainers[index].append(list);
        if (!footerBrandNavbar.querySelector('.header-footer-brand-navbar--right')) {
          const footerBrandNavbarRight = document.createElement('div');
          footerBrandNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
          footerBrandNavbar.append(footerBrandNavbarRight);
        }
        footerBrandNavbar.querySelector('.header-footer-brand-navbar--right').append(linkContainers[index]);
      }
    }
  });

  footerBrandNavbar.prepend(footerBrandNavbarLeft);
  footerBrandRight.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandPrimaryContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandPrimaryContainer);
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

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

    const link = item.querySelector('[data-aue-prop="link"]');
    const anchor = document.createElement('a');
    anchor.href = link?.querySelector('a')?.href || '#';
    anchor.target = '_blank';
    anchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.setAttribute('data-cta-label', `footer-${link?.querySelector('a')?.dataset.platformName || ''}`);
    anchor.setAttribute('data-platform-name', link?.querySelector('a')?.dataset.platformName || '');
    anchor.setAttribute('data-social-linktype', 'follow');
    moveInstrumentation(link, anchor);

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
        picture.querySelector('img').setAttribute('aria-label', img.alt);
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

  const itcPortalLink = document.createElement('li');
  itcPortalLink.className = 'header-footer-brand-left--item header-foot-link';
  const itcAnchor = document.createElement('a');
  itcAnchor.href = 'https://www.itcportal.com/';
  itcAnchor.target = '_blank';
  itcAnchor.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcAnchor.setAttribute('data-cta-region', 'Footer');
  itcAnchor.textContent = 'ITC portal';
  itcPortalLink.append(itcAnchor);
  copyrightList.append(itcPortalLink);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.className = 'header-footer-brand-left--text text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightTextSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightTextSpan);
  } else {
    copyrightTextSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightTextSpan);
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