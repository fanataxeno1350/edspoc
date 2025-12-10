import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');

  const headerSection = document.createElement('section');
  headerSection.classList.add('header-section-position-relative', 'header-section-mb-15');

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.classList.add('header-app-name', 'd-none');
    appNameSpan.dataset.appName = appName.textContent;
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
    headerSection.append(appNameSpan);
  }

  const headerContainer = document.createElement('header');
  headerContainer.classList.add('header-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const div1 = document.createElement('div');
  div1.classList.add('d-flex', 'w-25');
  headerContainer.append(div1);

  const div2 = document.createElement('div');
  div2.classList.add('d-flex', 'justify-content-center', 'w-25');
  const logoAnchor = document.createElement('a');
  logoAnchor.classList.add('header-analytics-cta-click');
  logoAnchor.setAttribute('a-label', 'header-logo-boing');
  if (logoLink) {
    logoAnchor.href = logoLink.href;
    moveInstrumentation(logoLink, logoAnchor);
  } else if (logo) {
    const parentAnchor = logo.closest('a');
    if (parentAnchor) {
      logoAnchor.href = parentAnchor.href;
      moveInstrumentation(parentAnchor, logoAnchor);
    }
  }

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'd-flex', 'align-items-center');
  if (logo) {
    const img = logo.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt, true, [{ width: '200' }]);
      pic.querySelector('img').classList.add('header-logo-img');
      moveInstrumentation(img, pic.querySelector('img'));
      logoDiv.append(pic);
    }
  }
  logoAnchor.append(logoDiv);
  div2.append(logoAnchor);
  headerContainer.append(div2);

  const div3 = document.createElement('div');
  div3.classList.add('d-flex', 'w-25', 'justify-content-end');
  const loginAnchor = document.createElement('a');
  loginAnchor.classList.add('header-login-btn-wrapper', 'header-analytics-cta-click');
  loginAnchor.style.display = 'inline';
  if (loginLink) {
    loginAnchor.href = loginLink.href;
    moveInstrumentation(loginLink, loginAnchor);
  } else {
    const parentAnchor = block.querySelector('a[href*="login.html"]');
    if (parentAnchor) {
      loginAnchor.href = parentAnchor.href;
      moveInstrumentation(parentAnchor, loginAnchor);
    }
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add('header-login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
  loginButton.textContent = 'Login';
  loginAnchor.append(loginButton);
  div3.append(loginAnchor);
  headerContainer.append(div3);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'start-0', 'bg-white', 'position-absolute');

  const menuList = document.createElement('ul');
  menuList.classList.add('header-sidebar-menu', 'list-unstyled', 'px-4');

  const headerMenuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  headerMenuItems.forEach((item) => {
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const label = item.querySelector('[data-aue-prop="label"]');
    const link = item.querySelector('[data-aue-prop="link"]');

    const listItem = document.createElement('li');
    listItem.classList.add('header-sidebar-menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

    const anchor = document.createElement('a');
    anchor.classList.add('header-sidebar-menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');
    anchor.dataset.consent = 'false';

    if (link) {
      anchor.href = link.href;
      anchor.dataset.link = link.href;
      moveInstrumentation(link, anchor);
    }

    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        pic.querySelector('img').classList.add('header-sidebar-menu-icon', 'me-4');
        moveInstrumentation(img, pic.querySelector('img'));
        anchor.append(pic);
      }
    }
    if (label) {
      anchor.append(label.textContent);
      moveInstrumentation(label, anchor);
    }
    listItem.append(anchor);
    menuList.append(listItem);
  });

  // Logout item (static, as it's not in JSON, but present in original HTML)
  const logoutItem = document.createElement('li');
  logoutItem.classList.add('header-sidebar-menu-item', 'header-sidebar-menu-item--logout', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');
  logoutItem.style.display = 'none';
  const logoutAnchor = document.createElement('a');
  logoutAnchor.classList.add('header-sidebar-menu-link', 'header-sidebar-menu-item--logout-btn', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');
  logoutAnchor.href = '/';
  logoutAnchor.dataset.consent = 'false';
  logoutAnchor.dataset.link = '/content/boing/in/en/home';
  const logoutImg = document.createElement('img');
  logoutImg.src = '/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp';
  logoutImg.alt = 'Logout';
  logoutImg.classList.add('header-sidebar-menu-icon', 'me-4');
  logoutImg.loading = 'lazy';
  logoutAnchor.append(logoutImg, 'Logout');
  logoutItem.append(logoutAnchor);
  menuList.append(logoutItem);

  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar-curve');
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'w-100', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('header-footer-brand-primary');
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.classList.add('header-container');

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('header-footer-brand-primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // ITC Logo (static, as it's not in JSON, but present in original HTML)
  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.classList.add('header-footer-brand-logo', 'd-inline-block', 'header-analytics-cta-click');
  itcLink.dataset.ctaRegion = 'Footer';
  itcLink.setAttribute('aria-label', 'ITC Logo');
  const itcImg = document.createElement('img');
  itcImg.src = '/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp';
  itcImg.alt = 'ITC Logo';
  itcImg.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
  itcImg.loading = 'lazy';
  itcLink.append(itcImg);
  footerBrandLeft.append(itcLink);

  // FSSI Logo (static, as it's not in JSON, but present in original HTML)
  const fssiDiv = document.createElement('div');
  fssiDiv.classList.add('header-footer-brand-secondary--logo', 'd-inline-block');
  const fssiImg = document.createElement('img');
  fssiImg.classList.add('object-fit-contain', 'w-100', 'no-rendition');
  fssiImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp';
  fssiImg.alt = 'FSSI Logo';
  fssiImg.loading = 'lazy';
  fssiDiv.append(fssiImg);
  footerBrandLeft.append(fssiDiv);

  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand-right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Group footer links into lists based on original structure
  const footerLinkGroups = [[], [], [], []]; // 4 groups
  const footerLinkItems = block.querySelectorAll('[data-aue-model="footerLinkItem"]');
  footerLinkItems.forEach((item, index) => {
    const label = item.querySelector('[data-aue-prop="label"]');
    const link = item.querySelector('[data-aue-prop="link"]');

    const listItem = document.createElement('li');
    listItem.classList.add('header-footer-list-item');

    const anchor = document.createElement('a');
    anchor.classList.add('header-cta-analytics', 'header-analytics-cta-click', 'header-footer-list-item--link', 'd-inline-block');
    anchor.dataset.linkRegion = 'Footer List';
    if (link) {
      anchor.href = link.href;
      moveInstrumentation(link, anchor);
    }
    if (label) {
      anchor.textContent = label.textContent;
      moveInstrumentation(label, anchor);
    }
    listItem.append(anchor);
    footerLinkGroups[index % 4].push(listItem); // Distribute into 4 columns
  });

  footerLinkGroups.forEach((group, groupIndex) => {
    const listContainer = document.createElement('div');
    listContainer.classList.add('header-footer-list-container');
    const ul = document.createElement('ul');
    ul.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    group.forEach((item) => ul.append(item));
    listContainer.append(ul);
    if (groupIndex < 2) {
      footerNavbarLeft.append(listContainer);
    } else {
      // Create footerNavbarRight if it doesn't exist yet
      let footerNavbarRight = footerNavbar.querySelector('.header-footer-brand-navbar--right');
      if (!footerNavbarRight) {
        footerNavbarRight = document.createElement('div');
        footerNavbarRight.classList.add('header-footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbarRight.append(listContainer);
    }
  });
  footerNavbar.prepend(footerNavbarLeft);

  footerBrandRight.append(footerNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('header-footer-brand-secondary');
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.classList.add('header-container');

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('header-footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand-right', 'd-flex', 'flex-column', 'pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('header-social-media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add('header-footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const socialLinkItems = block.querySelectorAll('[data-aue-model="socialLinkItem"]');
  socialLinkItems.forEach((item) => {
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const link = item.querySelector('[data-aue-prop="link"]');

    const listItem = document.createElement('li');
    listItem.classList.add('header-footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const anchor = document.createElement('a');
    anchor.classList.add('header-footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'header-analytics-cta-click');
    anchor.dataset.ctaRegion = 'Footer';
    anchor.target = '_blank';
    anchor.dataset.socialLinktype = 'follow';

    if (link) {
      anchor.href = link.href;
      // Extract platform name from link for data-cta-label and data-platform-name
      const url = new URL(link.href);
      const platformName = url.hostname.split('.')[1] || url.hostname.split('.')[0];
      anchor.dataset.ctaLabel = `footer-${platformName}`;
      anchor.dataset.platformName = platformName;
      moveInstrumentation(link, anchor);
    }

    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        pic.querySelector('img').setAttribute('aria-label', anchor.dataset.platformName || img.alt);
        moveInstrumentation(img, pic.querySelector('img'));
        anchor.append(pic);
      }
    }
    listItem.append(anchor);
    socialMediaList.append(listItem);
  });

  socialMediaSection.append(socialMediaList);
  footerBrandSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('header-footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('header-footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  // ITC portal link (static, as it's not in JSON, but present in original HTML)
  const itcPortalItem = document.createElement('li');
  itcPortalItem.classList.add('header-footer-brand-left--item', 'header-foot-link');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.classList.add('header-footer-brand-left--link', 'header-analytics-cta-click');
  itcPortalLink.dataset.ctaRegion = 'Footer';
  itcPortalLink.textContent = 'ITC portal';
  itcPortalItem.append(itcPortalLink);
  copyrightList.append(itcPortalItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand-left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand-left--text', 'text-white');
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  footerBrandSecondaryContent.append(copyrightSection);
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
