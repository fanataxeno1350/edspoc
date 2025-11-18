import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, section);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  section.append(appNameSpan);

  // Header Container
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  section.append(header);

  // Header Left Div
  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  header.append(headerLeftDiv);

  // Header Middle Div (Logo)
  const headerMiddleDiv = document.createElement('div');
  headerMiddleDiv.className = 'header-d-flex  header-justify-content-center header-w-25';
  header.append(headerMiddleDiv);

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  headerMiddleDiv.append(logoLink);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  logoLink.append(logoDiv);

  const logoImg = document.createElement('img');
  logoImg.src = '/content/dam/aemigrate/uploaded-folder/image/lets-boing-logo?fmt=webp-alpha.webp';
  logoImg.alt = 'Let\'s Boing';
  logoImg.className = 'header-header__logo-img';
  logoDiv.append(logoImg);

  // Header Right Div (Login Button)
  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  header.append(headerRightDiv);

  const loginLink = document.createElement('a');
  loginLink.href = '/login.html';
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  headerRightDiv.append(loginLink);

  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = 'Login';
  loginLink.append(loginButton);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  section.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  const ul = document.createElement('ul');
  ul.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(ul);

  // Loop through menu items
  const menuItems = block.querySelectorAll('.menu-item');
  menuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar__menu-item  header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = row.querySelector('a');
    const img = row.querySelector('img');
    const label = row.querySelector('p:last-of-type'); // Assuming label is the last paragraph

    if (link && img && label) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      newLink.setAttribute('data-link', link.getAttribute('data-link'));

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      optimizedPic.querySelector('img').loading = 'lazy';
      newLink.append(optimizedPic);
      newLink.append(document.createTextNode(label.textContent.trim()));
      li.append(newLink);
    }
    ul.append(li);
  });

  // Logout menu item (static, as per HTML)
  const logoutLi = document.createElement('li');
  logoutLi.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
  logoutLi.style.display = 'none';
  ul.append(logoutLi);

  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');

  const logoutImg = document.createElement('img');
  logoutImg.src = '/content/dam/aemigrate/uploaded-folder/image/logout-3?fmt=webp-alpha.webp';
  logoutImg.alt = 'Logout';
  logoutImg.className = 'header-sidebar__menu-icon header-me-4';
  logoutImg.loading = 'lazy';
  logoutLink.append(logoutImg);
  logoutLink.append(document.createTextNode('Logout'));
  logoutLi.append(logoutLink);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  aside.append(footerBrandDiv);

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerPrimarySection);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';
  footerPrimarySection.append(footerContainer);

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerContainer.append(footerContent);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerContent.append(footerLeftSection);

  // Brand Logo
  const brandLogoLink = document.createElement('a');
  brandLogoLink.href = 'https://www.itcportal.com/';
  brandLogoLink.target = '_blank';
  brandLogoLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  brandLogoLink.setAttribute('data-cta-region', 'Footer');
  brandLogoLink.setAttribute('aria-label', 'ITC Logo');
  footerLeftSection.append(brandLogoLink);

  const brandLogoImg = document.createElement('img');
  brandLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/itc-logo-2?fmt=webp-alpha.webp';
  brandLogoImg.alt = 'ITC Logo';
  brandLogoImg.className = 'header-object-fit-contain header-w-100 header-h-100';
  brandLogoImg.loading = 'lazy';
  brandLogoLink.append(brandLogoImg);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  footerLeftSection.append(secondaryLogoDiv);

  const secondaryLogoImg = document.createElement('img');
  secondaryLogoImg.className = 'header-object-fit-contain header-w-100';
  secondaryLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update?fmt=webp-alpha.webp';
  secondaryLogoImg.alt = 'FSSI Logo';
  secondaryLogoImg.loading = 'lazy';
  secondaryLogoDiv.append(secondaryLogoImg);

  const footerRightSection = document.createElement('section');
  footerRightSection.className = 'header-footer-brand__right';
  footerContent.append(footerRightSection);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerRightSection.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';
  footerNav.append(footerNavLeft);

  // Footer Link Lists
  const footerLinkLists = block.querySelectorAll('.footer-link-list');
  footerLinkLists.forEach((listRow) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    footerNavLeft.append(footerListDiv);

    const footerUl = document.createElement('ul');
    footerUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    footerListDiv.append(footerUl);

    [...listRow.children].forEach((linkCell) => {
      const link = linkCell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        moveInstrumentation(linkCell, li);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          newLink.target = link.target;
        }
        newLink.textContent = link.textContent.trim();
        li.append(newLink);
        footerUl.append(li);
      }
    });
  });

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavRight);

  // Assuming there are two more footer link lists for the right section
  // You would need to adapt this based on how the block JSON structures these
  // For now, I'll simulate by taking the next two 'footer-link-list' if they exist
  const remainingFooterLinkLists = Array.from(block.querySelectorAll('.footer-link-list')).slice(2);
  remainingFooterLinkLists.forEach((listRow) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    footerNavRight.append(footerListDiv);

    const footerUl = document.createElement('ul');
    footerUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    footerListDiv.append(footerUl);

    [...listRow.children].forEach((linkCell) => {
      const link = linkCell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        moveInstrumentation(linkCell, li);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          newLink.target = link.target;
        }
        newLink.textContent = link.textContent.trim();
        li.append(newLink);
        footerUl.append(li);
      }
    });
  });

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

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

  // Loop through social links
  const socialLinks = block.querySelectorAll('.social-link');
  socialLinks.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    moveInstrumentation(row, li);

    const link = row.querySelector('a');
    const img = row.querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.target = '_blank';
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', 'follow');

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
      optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100';
      optimizedPic.querySelector('img').loading = 'lazy';
      newLink.append(optimizedPic);
      li.append(newLink);
    }
    socialUl.append(li);
  });

  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(footerCopyrightSection);

  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  footerCopyrightSection.append(copyrightUl);

  const copyrightLi = document.createElement('li');
  copyrightLi.className = 'header-footer-brand__left--item header-foot_link';
  copyrightUl.append(copyrightLi);

  const copyrightLink = document.createElement('a');
  copyrightLink.href = 'https://www.itcportal.com/';
  copyrightLink.target = '_blank';
  copyrightLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  copyrightLink.setAttribute('data-cta-region', 'Footer');
  copyrightLink.textContent = 'ITC portal';
  copyrightLi.append(copyrightLink);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  footerCopyrightSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(section);
}
