import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, mainSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainSection.append(appNameSpan);

  // Header Container
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  mainSection.append(headerContainer);

  // Header Left Div (for placeholder/menu icon)
  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  // Assuming the SVG is a placeholder and not directly from block JSON
  // If it needs to be dynamic, it would need a field in the block JSON
  headerContainer.append(headerLeftDiv);

  // Header Center Div (Logo)
  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex  header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const logoImg = block.querySelector('.header-header__logo-img');
  if (logoImg) {
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    logoDiv.append(optimizedLogo);
  }
  logoLink.append(logoDiv);
  headerCenterDiv.append(logoLink);
  headerContainer.append(headerCenterDiv);

  // Header Right Div (Login Button)
  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.querySelector('.header-header__login-btn-wrapper');
  if (loginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    newLoginLink.style.display = 'inline';
    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.querySelector('button').textContent.trim();
    newLoginLink.append(loginButton);
    headerRightDiv.append(newLoginLink);
  }
  headerContainer.append(headerRightDiv);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  mainSection.append(submenuContainer);

  // Sidebar Aside
  const sidebarAside = document.createElement('aside');
  sidebarAside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(sidebarAside);

  // Sidebar Menu
  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  sidebarAside.append(sidebarMenuUl);

  // Menu Items
  const menuItems = block.querySelectorAll('.header-sidebar__menu-item');
  menuItems.forEach((item) => {
    const li = document.createElement('li');
    moveInstrumentation(item, li);
    li.className = item.className;
    const link = item.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.setAttribute('data-link', link.getAttribute('data-link'));

      const img = link.querySelector('img');
      if (img) {
        const optimizedIcon = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedIcon.querySelector('img'));
        optimizedIcon.querySelector('img').className = img.className;
        optimizedIcon.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedIcon);
      }
      newLink.append(document.createTextNode(link.textContent.trim()));
      li.append(newLink);
    }
    sidebarMenuUl.append(li);
  });

  // Sidebar Curve
  const sidebarCurveDiv = document.createElement('div');
  sidebarCurveDiv.className = 'header-sidebar__curve';
  sidebarAside.append(sidebarCurveDiv);

  // Footer Brand
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  sidebarAside.append(footerBrandDiv);

  // Footer Brand Primary
  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = ''; // Keep as is if it's dynamic
  footerBrandDiv.append(footerPrimarySection);

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  footerPrimarySection.append(footerPrimaryContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerPrimaryContainer.append(footerPrimaryContent);

  // Footer Brand Left (ITC and FSSI Logos)
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerPrimaryContent.append(footerBrandLeft);

  const itcLink = block.querySelector('a[aria-label="ITC Logo"]');
  if (itcLink) {
    const newItcLink = document.createElement('a');
    newItcLink.href = itcLink.href;
    newItcLink.target = '_blank';
    newItcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    newItcLink.setAttribute('data-cta-region', 'Footer');
    newItcLink.setAttribute('aria-label', 'ITC Logo');
    const itcImg = itcLink.querySelector('img');
    if (itcImg) {
      const optimizedItc = createOptimizedPicture(itcImg.src, itcImg.alt);
      moveInstrumentation(itcImg, optimizedItc.querySelector('img'));
      optimizedItc.querySelector('img').className = itcImg.className;
      optimizedItc.querySelector('img').setAttribute('loading', 'lazy');
      newItcLink.append(optimizedItc);
    }
    footerBrandLeft.append(newItcLink);
  }

  const fssiDiv = block.querySelector('.header-footer-brand__secondary--logo');
  if (fssiDiv) {
    const newFssiDiv = document.createElement('div');
    newFssiDiv.className = fssiDiv.className;
    const fssiImg = fssiDiv.querySelector('img');
    if (fssiImg) {
      const optimizedFssi = createOptimizedPicture(fssiImg.src, fssiImg.alt);
      moveInstrumentation(fssiImg, optimizedFssi.querySelector('img'));
      optimizedFssi.querySelector('img').className = fssiImg.className;
      optimizedFssi.querySelector('img').setAttribute('loading', 'lazy');
      newFssiDiv.append(optimizedFssi);
    }
    footerBrandLeft.append(newFssiDiv);
  }

  // Footer Brand Right (Navigation)
  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  footerPrimaryContent.append(footerBrandRight);

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';
  footerNavbar.append(footerNavbarLeft);

  // Footer Lists (dynamic based on authored content)
  const footerLists = block.querySelectorAll('.header-footerList');
  footerLists.forEach((footerList) => {
    const newFooterListDiv = document.createElement('div');
    newFooterListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    const listItems = footerList.querySelectorAll('.header-footer-list__item');
    listItems.forEach((item) => {
      const li = document.createElement('li');
      moveInstrumentation(item, li);
      li.className = item.className;
      const link = item.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = link.className;
        newLink.textContent = link.textContent.trim();
        if (link.hasAttribute('target')) {
          newLink.target = link.target;
        }
        if (link.hasAttribute('data-link-region')) {
          newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
        }
        li.append(newLink);
      }
      ul.append(li);
    });
    newFooterListDiv.append(ul);
    // Determine if it belongs to left or right based on original structure
    // This assumes the first two .header-footerList go into footerNavbarLeft
    // and the next two go into footerNavbarRight
    if (footerNavbarLeft.children.length < 2) {
      footerNavbarLeft.append(newFooterListDiv);
    } else if (!footerNavbar.querySelector('.header-footer-brand__navbar--right')) {
      const footerNavbarRight = document.createElement('div');
      footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
      footerNavbar.append(footerNavbarRight);
      footerNavbarRight.append(newFooterListDiv);
    } else {
      footerNavbar.querySelector('.header-footer-brand__navbar--right').append(newFooterListDiv);
    }
  });

  // Footer Secondary
  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = ''; // Keep as is
  footerBrandDiv.append(footerSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  // Footer Secondary Right (Social Media)
  const footerSocialSection = document.createElement('section');
  footerSocialSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  footerSecondaryContent.append(footerSocialSection);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerSocialSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  footerSocialSection.append(socialUl);

  const socialLinks = block.querySelectorAll('.header-footer-brand__right--item');
  socialLinks.forEach((socialItem) => {
    const li = document.createElement('li');
    moveInstrumentation(socialItem, li);
    li.className = socialItem.className;
    const link = socialItem.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.target = '_blank';
      newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype'));

      const img = link.querySelector('img');
      if (img) {
        const optimizedIcon = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedIcon.querySelector('img'));
        optimizedIcon.querySelector('img').className = img.className;
        optimizedIcon.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
        optimizedIcon.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedIcon);
      }
      li.append(newLink);
    }
    socialUl.append(li);
  });

  // Footer Secondary Left (ITC Portal and Copyright)
  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(footerSecondaryLeft);

  const footerLeftUl = document.createElement('ul');
  footerLeftUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  footerSecondaryLeft.append(footerLeftUl);

  const itcPortalLink = block.querySelector('.header-foot_link a');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    const newLink = document.createElement('a');
    newLink.href = itcPortalLink.href;
    newLink.target = '_blank';
    newLink.className = itcPortalLink.className;
    newLink.setAttribute('data-cta-region', itcPortalLink.getAttribute('data-cta-region'));
    newLink.textContent = itcPortalLink.textContent.trim();
    li.append(newLink);
    footerLeftUl.append(li);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = block.querySelector('.header-footer-brand__left--copyright span').textContent.trim();
  copyrightDiv.append(copyrightSpan);
  footerSecondaryLeft.append(copyrightDiv);

  // Overlay
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(mainSection);
}
