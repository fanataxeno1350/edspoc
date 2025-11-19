import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.classList.add('header-position-relative', 'header-mb-15');
  moveInstrumentation(block.children[0], mainSection); // Transfer instrumentation from the first row

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-d-none', 'header-app-name');
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = block.children[0].children[0].textContent.trim(); // Assuming appName is in the first cell of the first row
  mainSection.append(appNameSpan);

  // Header Container
  const headerContainer = document.createElement('header');
  headerContainer.classList.add('header-boing-container', 'header-header', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');
  mainSection.append(headerContainer);

  const headerDiv1 = document.createElement('div');
  headerDiv1.classList.add('header-d-flex', 'header-w-25');
  headerContainer.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  const logoLink = block.children[0].children[1].querySelector('a'); // Assuming logo link is in the second cell of the first row
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.classList.add('header-analytics_cta_click');
    newLogoLink.setAttribute('data-ct', '');
    newLogoLink.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, newLogoLink);

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('header__logo', 'header-d-flex', 'header-align-items-center');
    newLogoLink.append(logoDiv);

    const logoImg = logoLink.querySelector('img');
    if (logoImg) {
      const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
      moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
      optimizedLogoPic.querySelector('img').classList.add('header__logo-img');
      optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
      logoDiv.append(optimizedLogoPic);
    }
    headerDiv2.append(newLogoLink);
  }
  headerContainer.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  const loginLink = block.children[0].children[2].querySelector('a'); // Assuming login link is in the third cell of the first row
  if (loginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.classList.add('header__login-btn-wrapper', 'header-analytics_cta_click');
    newLoginLink.style.display = 'inline';
    moveInstrumentation(loginLink, newLoginLink);

    const loginButton = document.createElement('button');
    loginButton.classList.add('header__login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
    loginButton.textContent = loginLink.textContent.trim();
    newLoginLink.append(loginButton);
    headerDiv3.append(newLoginLink);
  }
  headerContainer.append(headerDiv3);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');
  mainSection.append(submenuContainer);

  const sidebarAside = document.createElement('aside');
  sidebarAside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');
  submenuContainer.append(sidebarAside);

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');
  sidebarAside.append(sidebarMenuUl);

  // Sidebar Menu Items
  // Assuming sidebar menu items start from the second row in the block
  // and each row represents a sidebar menu item
  for (let i = 1; i < block.children.length; i += 1) {
    const row = block.children[i];
    const cells = row.children;
    if (cells.length >= 3) { // Expecting icon, text, url
      const li = document.createElement('li');
      li.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');
      moveInstrumentation(row, li);

      const link = cells[2].querySelector('a'); // URL cell
      const iconImg = cells[0].querySelector('img'); // Icon cell
      const textContent = cells[1].textContent.trim(); // Text cell

      if (link && iconImg) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
        newLink.setAttribute('data-consent', 'false');
        newLink.setAttribute('data-link', link.getAttribute('data-link') || '');
        moveInstrumentation(link, newLink);

        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt);
        moveInstrumentation(iconImg, optimizedIconPic.querySelector('img'));
        optimizedIconPic.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
        optimizedIconPic.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedIconPic);
        newLink.append(document.createTextNode(textContent));
        li.append(newLink);
      } else if (link && textContent === 'Logout') { // Special handling for logout
        li.classList.add('header-sidebar__menu-item--logout');
        li.style.display = 'none';

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
        newLink.setAttribute('data-consent', 'false');
        newLink.setAttribute('data-link', link.getAttribute('data-link') || '');
        moveInstrumentation(link, newLink);

        if (iconImg) {
          const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt);
          moveInstrumentation(iconImg, optimizedIconPic.querySelector('img'));
          optimizedIconPic.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
          optimizedIconPic.querySelector('img').setAttribute('loading', 'lazy');
          newLink.append(optimizedIconPic);
        }
        newLink.append(document.createTextNode(textContent));
        li.append(newLink);
      }
      sidebarMenuUl.append(li);
    }
  }

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  sidebarAside.append(sidebarCurve);

  // Footer Brand
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');
  sidebarAside.append(footerBrandDiv);

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.classList.add('header-footer-brand__primary');
  footerPrimarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerPrimarySection);

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('header-container');
  footerPrimarySection.append(footerContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');
  footerContainer.append(footerPrimaryContent);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');
  footerPrimaryContent.append(footerLeftSection);

  // ITC Logo
  const itcLogoLink = block.children[block.children.length - 3].children[0].querySelector('a'); // Assuming ITC Logo is in the third to last row, first cell
  if (itcLogoLink) {
    const newItcLink = document.createElement('a');
    newItcLink.href = itcLogoLink.href;
    newItcLink.target = '_blank';
    newItcLink.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
    newItcLink.setAttribute('data-cta-region', 'Footer');
    newItcLink.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(itcLogoLink, newItcLink);

    const itcImg = itcLogoLink.querySelector('img');
    if (itcImg) {
      const optimizedItcPic = createOptimizedPicture(itcImg.src, itcImg.alt);
      moveInstrumentation(itcImg, optimizedItcPic.querySelector('img'));
      optimizedItcPic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
      optimizedItcPic.querySelector('img').setAttribute('loading', 'lazy');
      newItcLink.append(optimizedItcPic);
    }
    footerLeftSection.append(newItcLink);
  }

  // FSSI Logo
  const fssiLogoDiv = block.children[block.children.length - 3].children[1]; // Assuming FSSI Logo is in the third to last row, second cell
  if (fssiLogoDiv) {
    const newFssiDiv = document.createElement('div');
    newFssiDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
    moveInstrumentation(fssiLogoDiv, newFssiDiv);

    const fssiImg = fssiLogoDiv.querySelector('img');
    if (fssiImg) {
      const optimizedFssiPic = createOptimizedPicture(fssiImg.src, fssiImg.alt);
      moveInstrumentation(fssiImg, optimizedFssiPic.querySelector('img'));
      optimizedFssiPic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
      optimizedFssiPic.querySelector('img').setAttribute('loading', 'lazy');
      newFssiDiv.append(optimizedFssiPic);
    }
    footerLeftSection.append(newFssiDiv);
  }

  const footerRightSection = document.createElement('section');
  footerRightSection.classList.add('header-footer-brand__right');
  footerPrimaryContent.append(footerRightSection);

  const footerNav = document.createElement('nav');
  footerNav.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerRightSection.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
  footerNav.append(footerNavLeft);

  // Footer Links (assuming they are grouped into two columns in the block structure)
  // The block structure for footer links is complex, assuming two groups of links
  // in the fourth to last row and fifth to last row, each with two cells for two lists
  const footerLinksRow1 = block.children[block.children.length - 4];
  const footerLinksRow2 = block.children[block.children.length - 5];

  if (footerLinksRow2 && footerLinksRow2.children.length > 0) {
    const footerListDiv1 = document.createElement('div');
    footerListDiv1.classList.add('header-footerList');
    moveInstrumentation(footerLinksRow2.children[0], footerListDiv1);
    const ul1 = document.createElement('ul');
    ul1.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');
    [...footerLinksRow2.children[0].querySelectorAll('a')].forEach((link) => {
      const li = document.createElement('li');
      li.classList.add('header-footer-list__item');
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent.trim();
      newLink.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
      newLink.setAttribute('data-link-region', 'Footer List');
      if (link.target) newLink.target = link.target;
      moveInstrumentation(link, newLink);
      li.append(newLink);
      ul1.append(li);
    });
    footerListDiv1.append(ul1);
    footerNavLeft.append(footerListDiv1);

    if (footerLinksRow2.children.length > 1) {
      const footerListDiv2 = document.createElement('div');
      footerListDiv2.classList.add('header-footerList');
      moveInstrumentation(footerLinksRow2.children[1], footerListDiv2);
      const ul2 = document.createElement('ul');
      ul2.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');
      [...footerLinksRow2.children[1].querySelectorAll('a')].forEach((link) => {
        const li = document.createElement('li');
        li.classList.add('header-footer-list__item');
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent.trim();
        newLink.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) newLink.target = link.target;
        moveInstrumentation(link, newLink);
        li.append(newLink);
        ul2.append(li);
      });
      footerListDiv2.append(ul2);
      footerNavLeft.append(footerListDiv2);
    }
  }

  const footerNavRight = document.createElement('div');
  footerNavRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
  footerNav.append(footerNavRight);

  if (footerLinksRow1 && footerLinksRow1.children.length > 0) {
    const footerListDiv3 = document.createElement('div');
    footerListDiv3.classList.add('header-footerList');
    moveInstrumentation(footerLinksRow1.children[0], footerListDiv3);
    const ul3 = document.createElement('ul');
    ul3.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');
    [...footerLinksRow1.children[0].querySelectorAll('a')].forEach((link) => {
      const li = document.createElement('li');
      li.classList.add('header-footer-list__item');
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent.trim();
      newLink.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
      newLink.setAttribute('data-link-region', 'Footer List');
      if (link.target) newLink.target = link.target;
      moveInstrumentation(link, newLink);
      li.append(newLink);
      ul3.append(li);
    });
    footerListDiv3.append(ul3);
    footerNavRight.append(footerListDiv3);

    if (footerLinksRow1.children.length > 1) {
      const footerListDiv4 = document.createElement('div');
      footerListDiv4.classList.add('header-footerList');
      moveInstrumentation(footerLinksRow1.children[1], footerListDiv4);
      const ul4 = document.createElement('ul');
      ul4.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');
      [...footerLinksRow1.children[1].querySelectorAll('a')].forEach((link) => {
        const li = document.createElement('li');
        li.classList.add('header-footer-list__item');
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent.trim();
        newLink.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) newLink.target = link.target;
        moveInstrumentation(link, newLink);
        li.append(newLink);
        ul4.append(li);
      });
      footerListDiv4.append(ul4);
      footerNavRight.append(footerListDiv4);
    }
  }

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.classList.add('header-footer-brand__secondary');
  footerSecondarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('header-container');
  footerSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');
  footerSecondaryContainer.append(footerSecondaryContent);

  const footerSocialRightSection = document.createElement('section');
  footerSocialRightSection.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');
  footerSecondaryContent.append(footerSocialRightSection);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  footerSocialRightSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');
  footerSocialRightSection.append(socialUl);

  // Social Links
  // Assuming social links are in the second to last row
  const socialLinksRow = block.children[block.children.length - 2];
  if (socialLinksRow) {
    [...socialLinksRow.children].forEach((cell) => {
      const link = cell.querySelector('a');
      const img = cell.querySelector('img');

      if (link && img) {
        const li = document.createElement('li');
        li.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
        moveInstrumentation(cell, li);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || '');
        newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || '');
        newLink.setAttribute('data-social-linktype', 'follow');
        moveInstrumentation(link, newLink);

        const optimizedSocialPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedSocialPic.querySelector('img'));
        optimizedSocialPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label') || '');
        optimizedSocialPic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
        optimizedSocialPic.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedSocialPic);
        li.append(newLink);
        socialUl.append(li);
      }
    });
  }

  const footerCopyrightLeftSection = document.createElement('section');
  footerCopyrightLeftSection.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');
  footerSecondaryContent.append(footerCopyrightLeftSection);

  const footerCopyrightUl = document.createElement('ul');
  footerCopyrightUl.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');
  footerCopyrightLeftSection.append(footerCopyrightUl);

  // ITC Portal Link (from copyright row)
  const copyrightRow = block.children[block.children.length - 1]; // Last row for copyright and single link
  if (copyrightRow && copyrightRow.children.length > 0) {
    const itcPortalCell = copyrightRow.children[0];
    const itcPortalLink = itcPortalCell.querySelector('a');
    if (itcPortalLink) {
      const li = document.createElement('li');
      li.classList.add('header-footer-brand__left--item', 'header-foot_link');
      moveInstrumentation(itcPortalCell, li);

      const newLink = document.createElement('a');
      newLink.href = itcPortalLink.href;
      newLink.target = '_blank';
      newLink.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.textContent = itcPortalLink.textContent.trim();
      moveInstrumentation(itcPortalLink, newLink);
      li.append(newLink);
      footerCopyrightUl.append(li);
    }
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  footerCopyrightLeftSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
  // Assuming copyright text is in the last cell of the last row
  if (copyrightRow && copyrightRow.children.length > 1) {
    copyrightSpan.textContent = copyrightRow.children[1].textContent.trim();
  } else if (copyrightRow && copyrightRow.children.length > 0 && !copyrightRow.children[0].querySelector('a')) {
    // If only one cell and it's not a link, assume it's the copyright text
    copyrightSpan.textContent = copyrightRow.children[0].textContent.trim();
  }
  copyrightDiv.append(copyrightSpan);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(mainSection);
}
