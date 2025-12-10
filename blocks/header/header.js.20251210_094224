import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const root = document.createElement('section');
  root.className = 'header-section-position-relative header-section-mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  root.append(appNameSpan);

  // Header Container
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const divLeft = document.createElement('div');
  divLeft.className = 'd-flex w-25';
  headerContainer.append(divLeft);

  const divCenter = document.createElement('div');
  divCenter.className = 'd-flex justify-content-center w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics-cta-click';
  logoLink.setAttribute('a-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo d-flex align-items-center';
  const logoImg = block.querySelector('[data-aue-prop="logo"] img');
  if (logoImg) {
    const picture = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '75' }]);
    picture.querySelector('img').className = 'header-logo-img';
    logoDiv.append(picture);
    moveInstrumentation(logoImg, picture.querySelector('img'));
  } else {
    const fallbackLogoLink = block.querySelector('[data-aue-prop="logo"] a');
    if (fallbackLogoLink && fallbackLogoLink.href.match(/\.(jpeg|jpg|webp|png)$/i)) {
      const picture = createOptimizedPicture(fallbackLogoLink.href, 'Logo', true, [{ width: '75' }]);
      picture.querySelector('img').className = 'header-logo-img';
      logoDiv.append(picture);
      moveInstrumentation(fallbackLogoLink, picture.querySelector('img'));
    }
  }
  logoLink.append(logoDiv);
  divCenter.append(logoLink);
  headerContainer.append(divCenter);

  const divRight = document.createElement('div');
  divRight.className = 'd-flex w-25 justify-content-end';
  const loginLinkWrapper = document.createElement('a');
  loginLinkWrapper.className = 'header-login-btn-wrapper header-analytics-cta-click';
  loginLinkWrapper.style.display = 'inline';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"] a');
  if (loginLink) {
    loginLinkWrapper.href = loginLink.href;
    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLink.textContent.trim();
    loginLinkWrapper.append(loginButton);
    moveInstrumentation(loginLink, loginLinkWrapper);
  }
  divRight.append(loginLinkWrapper);
  headerContainer.append(divRight);
  root.append(headerContainer);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar start-0 bg-white position-absolute';

  // Sidebar Menu
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

    const link = document.createElement('a');
    link.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';

    const itemLink = item.querySelector('[data-aue-prop="link"] a');
    if (itemLink) {
      link.href = itemLink.href;
      if (itemLink.dataset.consent) link.dataset.consent = itemLink.dataset.consent;
      if (itemLink.dataset.link) link.dataset.link = itemLink.dataset.link;
      moveInstrumentation(itemLink, link);
    }

    const iconImg = item.querySelector('[data-aue-prop="icon"] img');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]);
      picture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
      link.append(picture);
      moveInstrumentation(iconImg, picture.querySelector('img'));
    } else {
      const fallbackIconLink = item.querySelector('[data-aue-prop="icon"] a');
      if (fallbackIconLink && fallbackIconLink.href.match(/\.(jpeg|jpg|webp|png)$/i)) {
        const picture = createOptimizedPicture(fallbackIconLink.href, 'Icon', false, [{ width: '24' }]);
        picture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
        link.append(picture);
        moveInstrumentation(fallbackIconLink, picture.querySelector('img'));
      }
    }

    const label = item.querySelector('[data-aue-prop="label"]');
    if (label) {
      link.append(label.textContent.trim());
      moveInstrumentation(label, link);
    }
    li.append(link);
    sidebarMenu.append(li);
  });
  aside.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  // Footer Brand Primary
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';
  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const itcLink = document.createElement('a');
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.setAttribute('aria-label', 'ITC Logo');
  const itcLogo = block.querySelector('[data-aue-prop="footerLogoITC"] img');
  if (itcLogo) {
    itcLink.href = itcLogo.closest('a')?.href || '#';
    const picture = createOptimizedPicture(itcLogo.src, itcLogo.alt, false, [{ width: '100' }]);
    picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    itcLink.append(picture);
    moveInstrumentation(itcLogo, picture.querySelector('img'));
  } else {
    const fallbackItcLink = block.querySelector('[data-aue-prop="footerLogoITC"] a');
    if (fallbackItcLink && fallbackItcLink.href.match(/\.(jpeg|jpg|webp|png)$/i)) {
      itcLink.href = fallbackItcLink.href;
      const picture = createOptimizedPicture(fallbackItcLink.href, 'ITC Logo', false, [{ width: '100' }]);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      itcLink.append(picture);
      moveInstrumentation(fallbackItcLink, picture.querySelector('img'));
    }
  }
  footerBrandLeft.append(itcLink);

  const fssiDiv = document.createElement('div');
  fssiDiv.className = 'header-footer-brand-secondary--logo d-inline-block';
  const fssiLogo = block.querySelector('[data-aue-prop="footerLogoFSSI"] img');
  if (fssiLogo) {
    const picture = createOptimizedPicture(fssiLogo.src, fssiLogo.alt, false, [{ width: '100' }]);
    picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    fssiDiv.append(picture);
    moveInstrumentation(fssiLogo, picture.querySelector('img'));
  } else {
    const fallbackFssiLink = block.querySelector('[data-aue-prop="footerLogoFSSI"] a');
    if (fallbackFssiLink && fallbackFssiLink.href.match(/\.(jpeg|jpg|webp|png)$/i)) {
      const picture = createOptimizedPicture(fallbackFssiLink.href, 'FSSI Logo', false, [{ width: '100' }]);
      picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
      fssiDiv.append(picture);
      moveInstrumentation(fallbackFssiLink, picture.querySelector('img'));
    }
  }
  footerBrandLeft.append(fssiDiv);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';
  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerLinks = Array.from(block.querySelectorAll('[data-aue-model="footerLink"]'));
  const numLinks = footerLinks.length;
  const linksPerColumn = Math.ceil(numLinks / 4); // Distribute links into 4 columns

  const divNavbarLeft = document.createElement('div');
  divNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';
  const divNavbarRight = document.createElement('div');
  divNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';

  for (let i = 0; i < 4; i += 1) {
    const listContainer = document.createElement('div');
    listContainer.className = 'header-footer-list-container';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const start = i * linksPerColumn;
    const end = Math.min(start + linksPerColumn, numLinks);

    for (let j = start; j < end; j += 1) {
      const item = footerLinks[j];
      const li = document.createElement('li');
      li.className = 'header-footer-list-item';
      const link = document.createElement('a');
      link.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
      link.setAttribute('data-link-region', 'Footer List');

      const itemLink = item.querySelector('[data-aue-prop="link"] a');
      const itemLabel = item.querySelector('[data-aue-prop="label"]');

      if (itemLink) {
        link.href = itemLink.href;
        if (itemLink.target) link.target = itemLink.target;
        moveInstrumentation(itemLink, link);
      }
      if (itemLabel) {
        link.textContent = itemLabel.textContent.trim();
        moveInstrumentation(itemLabel, link);
      }
      li.append(link);
      ul.append(li);
    }
    listContainer.append(ul);
    if (i < 2) {
      divNavbarLeft.append(listContainer);
    } else {
      divNavbarRight.append(listContainer);
    }
  }
  footerNavbar.append(divNavbarLeft, divNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerBrandPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerBrandPrimary);

  // Footer Brand Secondary
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';
  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand-right d-flex flex-column pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social-media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';
    const link = document.createElement('a');
    link.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
    link.setAttribute('data-cta-region', 'Footer');
    link.target = '_blank';

    const itemLink = item.querySelector('[data-aue-prop="link"] a');
    if (itemLink) {
      link.href = itemLink.href;
      if (itemLink.dataset.ctaLabel) link.setAttribute('data-cta-label', itemLink.dataset.ctaLabel);
      if (itemLink.dataset.platformName) link.setAttribute('data-platform-name', itemLink.dataset.platformName);
      if (itemLink.dataset.socialLinktype) link.setAttribute('data-social-linktype', itemLink.dataset.socialLinktype);
      link.setAttribute('aria-label', itemLink.textContent.trim() || itemLink.href);
      moveInstrumentation(itemLink, link);
    }

    const iconImg = item.querySelector('[data-aue-prop="icon"] img');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '32' }]);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      link.append(picture);
      moveInstrumentation(iconImg, picture.querySelector('img'));
    } else {
      const fallbackIconLink = item.querySelector('[data-aue-prop="icon"] a');
      if (fallbackIconLink && fallbackIconLink.href.match(/\.(jpeg|jpg|webp|png)$/i)) {
        const picture = createOptimizedPicture(fallbackIconLink.href, 'Social Icon', false, [{ width: '32' }]);
        picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
        link.append(picture);
        moveInstrumentation(fallbackIconLink, picture.querySelector('img'));
      }
    }
    li.append(link);
    socialList.append(li);
  });
  socialMediaSection.append(socialList);
  footerSecondaryContent.append(socialMediaSection);

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
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');
  if (footerCopyright) {
    copyrightSpan.textContent = footerCopyright.textContent.trim();
    moveInstrumentation(footerCopyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  footerSecondaryContent.append(copyrightSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  root.append(submenuContainer);

  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.append(root);
  block.dataset.blockStatus = 'loaded';
}
