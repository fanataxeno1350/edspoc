import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.classList.add('header-section-position-relative', 'header-section-mb-15');

  const headerContainer = document.createElement('header');
  headerContainer.classList.add('header-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-app-name', 'd-none');
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  headerSection.append(appNameSpan);

  const headerDiv1 = document.createElement('div');
  headerDiv1.classList.add('d-flex', 'w-25');

  const headerDiv2 = document.createElement('div');
  headerDiv2.classList.add('d-flex', 'justify-content-center', 'w-25');

  const logoLinkWrapper = document.createElement('a');
  logoLinkWrapper.classList.add('header-analytics-cta-click');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    logoLinkWrapper.href = logoLink.href;
    logoLinkWrapper.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoLinkWrapper);
  }

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'd-flex', 'align-items-center');

  const logoImg = block.querySelector('[data-aue-prop="logo"]');
  if (logoImg) {
    const pic = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '200' }]);
    pic.querySelector('img').classList.add('header-logo-img');
    moveInstrumentation(logoImg, pic.querySelector('img'));
    logoDiv.append(pic);
  }
  logoLinkWrapper.append(logoDiv);
  headerDiv2.append(logoLinkWrapper);

  const headerDiv3 = document.createElement('div');
  headerDiv3.classList.add('d-flex', 'w-25', 'justify-content-end');

  const loginLinkWrapper = document.createElement('a');
  loginLinkWrapper.classList.add('header-login-btn-wrapper', 'header-analytics-cta-click');
  loginLinkWrapper.style.display = 'inline';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    loginLinkWrapper.href = loginLink.href;
    moveInstrumentation(loginLink, loginLinkWrapper);
  }

  const loginButton = document.createElement('button');
  loginButton.classList.add('header-login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
  loginButton.textContent = 'Login'; // Static text, not authored
  loginLinkWrapper.append(loginButton);
  headerDiv3.append(loginLinkWrapper);

  headerContainer.append(headerDiv1, headerDiv2, headerDiv3);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebarAside = document.createElement('aside');
  sidebarAside.classList.add('header-sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('header-sidebar-menu', 'list-unstyled', 'px-4');

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-sidebar-menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

    const link = document.createElement('a');
    link.classList.add('header-sidebar-menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');

    const itemLink = item.querySelector('[data-aue-prop="link"]');
    if (itemLink) {
      link.href = itemLink.href;
      link.setAttribute('data-link', itemLink.href);
      moveInstrumentation(itemLink, link);
    }

    const itemIcon = item.querySelector('[data-aue-prop="icon"]');
    if (itemIcon) {
      const pic = createOptimizedPicture(itemIcon.src, itemIcon.alt);
      pic.querySelector('img').classList.add('header-sidebar-menu-icon', 'me-4');
      moveInstrumentation(itemIcon, pic.querySelector('img'));
      link.append(pic);
    }

    const itemLabel = item.querySelector('[data-aue-prop="label"]');
    if (itemLabel) {
      link.append(itemLabel.textContent);
      moveInstrumentation(itemLabel, link);
    }

    li.append(link);
    sidebarMenu.append(li);
  });

  // Logout item (static structure, conditional display)
  const logoutLi = document.createElement('li');
  logoutLi.classList.add('header-sidebar-menu-item', 'header-sidebar-menu-item--logout', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');
  logoutLi.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.classList.add('header-sidebar-menu-link', 'header-sidebar-menu-item--logout-btn', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');
  logoutLink.href = '/';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  const logoutImg = document.createElement('img');
  logoutImg.src = '/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp';
  logoutImg.alt = 'Logout';
  logoutImg.classList.add('header-sidebar-menu-icon', 'me-4');
  logoutLink.append(logoutImg, 'Logout');
  logoutLi.append(logoutLink);
  sidebarMenu.append(logoutLi);

  sidebarAside.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar-curve');
  sidebarAside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'w-100', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('header-footer-brand-primary');
  footerBrandPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('header-container');

  const footerContent = document.createElement('div');
  footerContent.classList.add('header-footer-brand-primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // ITC Logo (static, but could be authored)
  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.classList.add('header-footer-brand-logo', 'd-inline-block', 'header-analytics-cta-click');
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.setAttribute('aria-label', 'ITC Logo');
  const itcImg = document.createElement('img');
  itcImg.src = '/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp';
  itcImg.alt = 'ITC Logo';
  itcImg.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
  itcImg.loading = 'lazy';
  itcLink.append(itcImg);
  footerBrandLeft.append(itcLink);

  // FSSI Logo (static, but could be authored)
  const fssiDiv = document.createElement('div');
  fssiDiv.classList.add('header-footer-brand-secondary--logo', 'd-inline-block');
  const fssiImg = document.createElement('img');
  fssiImg.classList.add('object-fit-contain', 'w-100', 'no-rendition');
  fssiImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp';
  fssiImg.alt = 'FSSI Logo';
  fssiImg.loading = 'lazy';
  fssiDiv.append(fssiImg);
  footerBrandLeft.append(fssiDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand-right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Group footer links into columns (static structure based on example HTML)
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkColumns = [[], [], [], []]; // 4 columns based on example HTML structure
  let colIndex = 0;
  footerLinks.forEach((linkItem) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-list-item');

    const link = document.createElement('a');
    link.classList.add('header-cta-analytics', 'header-analytics-cta-click', 'header-footer-list-item--link', 'd-inline-block');
    link.setAttribute('data-link-region', 'Footer List');

    const itemLink = linkItem.querySelector('[data-aue-prop="link"]');
    if (itemLink) {
      link.href = itemLink.href;
      if (itemLink.target) link.target = itemLink.target;
      moveInstrumentation(itemLink, link);
    }

    const itemLabel = linkItem.querySelector('[data-aue-prop="label"]');
    if (itemLabel) {
      link.textContent = itemLabel.textContent;
      moveInstrumentation(itemLabel, link);
    }

    li.append(link);
    linkColumns[colIndex % 4].push(li);
    colIndex++;
  });

  linkColumns.forEach((column, index) => {
    if (column.length > 0) {
      const listContainer = document.createElement('div');
      listContainer.classList.add('header-footer-list-container');
      const ul = document.createElement('ul');
      ul.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      column.forEach((li) => ul.append(li));
      listContainer.append(ul);
      if (index < 2) {
        footerNavbarLeft.append(listContainer);
      } else {
        // Assuming the last two columns go into footerNavbarRight
        if (!footerNavbar.querySelector('.header-footer-brand-navbar--right')) {
          const footerNavbarRight = document.createElement('div');
          footerNavbarRight.classList.add('header-footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
          footerNavbar.append(footerNavbarRight);
        }
        footerNavbar.querySelector('.header-footer-brand-navbar--right').append(listContainer);
      }
    }
  });

  footerNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerContent.append(footerBrandLeft, footerBrandRight);
  footerContainer.append(footerContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('header-footer-brand-secondary');
  footerBrandSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand-right', 'd-flex', 'flex-column', 'pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social-media--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('header-footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialItem) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('header-footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'header-analytics-cta-click');
    link.setAttribute('data-cta-region', 'Footer');
    link.target = '_blank';
    link.setAttribute('data-social-linktype', 'follow');

    const itemLink = socialItem.querySelector('[data-aue-prop="link"]');
    if (itemLink) {
      link.href = itemLink.href;
      link.setAttribute('data-cta-label', `footer-${itemLink.textContent.toLowerCase()}`); // Assuming textContent can be used for label
      link.setAttribute('data-platform-name', itemLink.textContent.toLowerCase());
      link.setAttribute('aria-label', itemLink.textContent.toLowerCase());
      moveInstrumentation(itemLink, link);
    }

    const itemIcon = socialItem.querySelector('[data-aue-prop="icon"]');
    if (itemIcon) {
      const pic = createOptimizedPicture(itemIcon.src, itemIcon.alt);
      pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      moveInstrumentation(itemIcon, pic.querySelector('img'));
      link.append(pic);
    }

    li.append(link);
    socialList.append(li);
  });
  socialMediaSection.append(socialList);
  footerSecondaryContent.append(socialMediaSection);

  const footerBottomLeft = document.createElement('section');
  footerBottomLeft.classList.add('header-footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const bottomList = document.createElement('ul');
  bottomList.classList.add('header-footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  // ITC portal link (static, but could be authored)
  const itcPortalLi = document.createElement('li');
  itcPortalLi.classList.add('header-footer-brand-left--item', 'header-foot-link');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.classList.add('header-footer-brand-left--link', 'header-analytics-cta-click');
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  bottomList.append(itcPortalLi);
  footerBottomLeft.append(bottomList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand-left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand-left--text', 'text-white');
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.'; // Static text
  copyrightDiv.append(copyrightSpan);
  footerBottomLeft.append(copyrightDiv);

  footerSecondaryContent.append(footerBottomLeft);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebarAside.append(footerBrand);
  submenuContainer.append(sidebarAside);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('header-overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlayDiv);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
