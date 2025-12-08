import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerImage = block.querySelector('[data-aue-prop="headerImage"]');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');

  const section = document.createElement('section');
  section.classList.add('header-position-relative', 'header-mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-d-none', 'header-app-name');
  appNameSpan.dataset.appName = appName?.textContent || '';
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  section.append(appNameSpan);

  const header = document.createElement('header');
  header.classList.add(
    'header-boing-container',
    'header-d-flex',
    'header-justify-content-between',
    'header-align-items-center',
    'header-h-15',
    'header-px-5',
    'header-py-2',
    'header-fixed-top',
    'header-w-100',
    'header-bg-white',
  );

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('header-d-flex', 'header-w-25');
  if (headerImage) {
    const pic = createOptimizedPicture(headerImage.src, headerImage.alt);
    headerLeftDiv.append(pic);
    moveInstrumentation(headerImage, pic.querySelector('img'));
  }
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  const logoLinkAnchor = document.createElement('a');
  logoLinkAnchor.classList.add('header-analytics_cta_click');
  logoLinkAnchor.dataset.ct = '';
  logoLinkAnchor.ariaLabel = 'header-logo-boing';
  if (logoLink) {
    logoLinkAnchor.href = logoLink.href;
    moveInstrumentation(logoLink, logoLinkAnchor);
  } else {
    logoLinkAnchor.href = '/';
  }

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header__logo', 'header-d-flex', 'header-align-items-center');
  if (logo) {
    const pic = createOptimizedPicture(logo.src, logo.alt);
    pic.classList.add('header__logo-img');
    logoDiv.append(pic);
    moveInstrumentation(logo, pic.querySelector('img'));
  }
  logoLinkAnchor.append(logoDiv);
  headerCenterDiv.append(logoLinkAnchor);
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  const loginLinkAnchor = document.createElement('a');
  loginLinkAnchor.classList.add('header__login-btn-wrapper', 'header-analytics_cta_click');
  loginLinkAnchor.style.display = 'inline';
  if (loginLink) {
    loginLinkAnchor.href = loginLink.href;
    moveInstrumentation(loginLink, loginLinkAnchor);
  } else {
    loginLinkAnchor.href = '/login.html';
  }

  const loginButton = document.createElement('button');
  loginButton.classList.add(
    'header__login-btn',
    'header-btn',
    'header-text-boing-primary',
    'header-bg-transparent',
    'header-fw-semibold',
    'header-rounded-4',
    'header-btn-sm',
    'header-py-3',
    'header-px-4',
  );
  loginButton.textContent = 'Login';
  loginLinkAnchor.append(loginButton);
  headerRightDiv.append(loginLinkAnchor);
  header.append(headerRightDiv);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add(
    'header-submenu-container',
    'header-position-fixed',
    'header-top-0',
    'header-start-0',
    'header-end-0',
    'header-m-auto',
    'header-overflow-hidden',
  );

  const sidebar = document.createElement('aside');
  sidebar.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const label = item.querySelector('[data-aue-prop="label"]');

    const li = document.createElement('li');
    li.classList.add(
      'header-sidebar__menu-item',
      'header-py-6',
      'header-border-bottom',
      'header-border-boing-neutral-gray-200',
    );
    if (item.classList.contains('header__menu-item--logout')) {
      li.classList.add('header__menu-item--logout');
      li.style.display = 'none';
    }

    const anchor = document.createElement('a');
    anchor.classList.add(
      'header-sidebar__menu-link',
      'header-d-flex',
      'header-align-items-center',
      'header-text-decoration-none',
      'header-px-6',
      'header-fw-medium',
      'header-analytics_cta_click',
    );
    if (link) {
      anchor.href = link.href;
      anchor.dataset.link = link.href;
      moveInstrumentation(link, anchor);
    } else {
      anchor.href = '/';
    }

    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      pic.classList.add('header-sidebar__menu-icon', 'header-me-4');
      pic.loading = 'lazy';
      anchor.append(pic);
      moveInstrumentation(icon, pic.querySelector('img'));
    }

    if (label) {
      anchor.append(label.textContent);
      moveInstrumentation(label, anchor);
    }
    li.append(anchor);
    sidebarMenu.append(li);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('header-footer-brand__primary');
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandPrimaryContainer = document.createElement('div');
  footerBrandPrimaryContainer.classList.add('header-container');

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add(
    'header-footer-brand__primary--content',
    'header-d-flex',
    'header-flex-column',
    'header-flex-md-row',
    'header-justify-content-md-between',
    'header-align-items-center',
  );

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add(
    'header-footer-brand__left',
    'header-d-flex',
    'header-gap-16',
    'header-px-10',
    'header-align-items-center',
    'header-justify-content-center',
  );

  const itcLogoLink = block.querySelector('a[data-cta-label="ITC Logo"]');
  if (itcLogoLink) {
    const itcLogoAnchor = document.createElement('a');
    itcLogoAnchor.href = itcLogoLink.href;
    itcLogoAnchor.target = '_blank';
    itcLogoAnchor.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
    itcLogoAnchor.dataset.ctaRegion = 'Footer';
    itcLogoAnchor.ariaLabel = 'ITC Logo';

    const itcLogoImg = itcLogoLink.querySelector('img');
    if (itcLogoImg) {
      const pic = createOptimizedPicture(itcLogoImg.src, itcLogoImg.alt);
      pic.classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100');
      pic.loading = 'lazy';
      itcLogoAnchor.append(pic);
      moveInstrumentation(itcLogoImg, pic.querySelector('img'));
    }
    footerBrandLeft.append(itcLogoAnchor);
    moveInstrumentation(itcLogoLink, itcLogoAnchor);
  }

  const fssiLogoDiv = block.querySelector('.header-footer-brand__secondary--logo');
  if (fssiLogoDiv) {
    const newFssiLogoDiv = document.createElement('div');
    newFssiLogoDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
    const fssiLogoImg = fssiLogoDiv.querySelector('img');
    if (fssiLogoImg) {
      const pic = createOptimizedPicture(fssiLogoImg.src, fssiLogoImg.alt);
      pic.classList.add('header-object-fit-contain', 'header-w-100');
      pic.loading = 'lazy';
      newFssiLogoDiv.append(pic);
      moveInstrumentation(fssiLogoImg, pic.querySelector('img'));
    }
    footerBrandLeft.append(newFssiLogoDiv);
    moveInstrumentation(fssiLogoDiv, newFssiLogoDiv);
  }
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerBrandNavbar.ariaLabel = 'footer navbar';

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const footerLists = block.querySelectorAll('.header-footerList');
  footerLists.forEach((footerList, index) => {
    const newFooterListDiv = document.createElement('div');
    newFooterListDiv.classList.add('header-footerList');

    const ul = document.createElement('ul');
    ul.classList.add(
      'header-footer-list',
      'header-d-flex',
      'header-align-items-center',
      'header-justify-content-center',
      'header-align-items-md-start',
      'header-flex-column',
    );

    const footerListItems = footerList.querySelectorAll('[data-aue-model="footerListItem"]');
    footerListItems.forEach((item) => {
      const link = item.querySelector('[data-aue-prop="link"]');
      const label = item.querySelector('[data-aue-prop="label"]');

      const li = document.createElement('li');
      li.classList.add('header-footer-list__item');

      const anchor = document.createElement('a');
      anchor.classList.add(
        'header-cta-analytics',
        'header-analytics_cta_click',
        'header-footer-list__item--link',
        'header-d-inline-block',
      );
      anchor.dataset.linkRegion = 'Footer List';
      if (link) {
        anchor.href = link.href;
        if (link.target) anchor.target = link.target;
        moveInstrumentation(link, anchor);
      } else {
        anchor.href = '#';
      }
      if (label) {
        anchor.textContent = label.textContent;
        moveInstrumentation(label, anchor);
      }
      li.append(anchor);
      ul.append(li);
    });
    newFooterListDiv.append(ul);
    if (index < 2) {
      footerBrandNavbarLeft.append(newFooterListDiv);
    } else {
      // This is a bit brittle, assuming the 3rd and 4th lists go into the right nav
      let footerBrandNavbarRight = footerBrandNavbar.querySelector('.header-footer-brand__navbar--right');
      if (!footerBrandNavbarRight) {
        footerBrandNavbarRight = document.createElement('div');
        footerBrandNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
        footerBrandNavbar.append(footerBrandNavbarRight);
      }
      footerBrandNavbarRight.append(newFooterListDiv);
    }
  });

  footerBrandNavbar.prepend(footerBrandNavbarLeft);
  footerBrandRight.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandPrimaryContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandPrimaryContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('header-footer-brand__secondary');
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.classList.add('header-container');

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add(
    'header-footer-brand__secondary--content',
    'header-d-flex',
    'header-flex-column',
    'header-justify-content-md-between',
    'header-align-items-center',
  );

  const socialMediaRight = document.createElement('section');
  socialMediaRight.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('header-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add(
    'header-footer-brand__right--list',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-center',
    'header-px-10',
    'header-flex-wrap',
  );

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((item) => {
    const socialUrl = item.querySelector('[data-aue-prop="socialUrl"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');

    const li = document.createElement('li');
    li.classList.add(
      'header-footer-brand__right--item',
      'header-d-flex',
      'header-justify-content-center',
      'header-align-items-center',
    );

    const anchor = document.createElement('a');
    anchor.classList.add(
      'header-footer-brand__right--link',
      'header-d-flex',
      'header-justify-content-center',
      'header-align-items-center',
      'header-analytics_cta_click',
    );
    anchor.dataset.ctaRegion = 'Footer';
    anchor.target = '_blank';
    anchor.dataset.socialLinktype = 'follow';

    if (socialUrl) {
      anchor.href = socialUrl.href;
      anchor.dataset.ctaLabel = `footer-${socialUrl.textContent.toLowerCase()}`;
      anchor.dataset.platformName = socialUrl.textContent.toLowerCase();
      moveInstrumentation(socialUrl, anchor);
    } else {
      anchor.href = '#';
    }

    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      pic.ariaLabel = icon.alt;
      pic.classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100');
      pic.loading = 'lazy';
      anchor.append(pic);
      moveInstrumentation(icon, pic.querySelector('img'));
    }
    li.append(anchor);
    socialMediaList.append(li);
  });
  socialMediaRight.append(socialMediaList);
  footerBrandSecondaryContent.append(socialMediaRight);

  const footerBrandSecondaryLeft = document.createElement('section');
  footerBrandSecondaryLeft.classList.add(
    'header-footer-brand__left',
    'header-py-5',
    'header-d-flex',
    'header-flex-column',
    'header-gap-3',
  );

  const footerBrandSecondaryLeftList = document.createElement('ul');
  footerBrandSecondaryLeftList.classList.add(
    'header-footer-brand__left--list',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-center',
    'header-flex-wrap',
  );

  const itcPortalLink = block.querySelector('a[href="https://www.itcportal.com/"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__left--item', 'header-foot_link');

    const anchor = document.createElement('a');
    anchor.href = itcPortalLink.href;
    anchor.target = '_blank';
    anchor.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
    anchor.dataset.ctaRegion = 'Footer';
    anchor.textContent = itcPortalLink.textContent.trim();
    li.append(anchor);
    footerBrandSecondaryLeftList.append(li);
    moveInstrumentation(itcPortalLink, anchor);
  }
  footerBrandSecondaryLeft.append(footerBrandSecondaryLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
  const copyrightText = block.querySelector('.header-footer-brand__left--copyright span');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  footerBrandSecondaryLeft.append(copyrightDiv);
  footerBrandSecondaryContent.append(footerBrandSecondaryLeft);

  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);
  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add(
    'header-overlay',
    'header-position-absolute',
    'header-top-0',
    'header-start-0',
    'header-w-100',
    'header-h-100',
    'header-bg-black',
    'header-opacity-25',
  );
  submenuContainer.append(overlay);
  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
