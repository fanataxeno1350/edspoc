import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.classList.add('header-section-position-relative', 'header-section-mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-app-name', 'd-none');
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  headerSection.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.classList.add('header-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const headerDiv1 = document.createElement('div');
  headerDiv1.classList.add('d-flex', 'w-25');
  headerContainer.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.classList.add('d-flex', 'justify-content-center', 'w-25');
  const logoLinkWrapper = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLinkWrapper) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('header-analytics-cta-click');
    logoLink.setAttribute('a-label', 'header-logo-boing');
    logoLink.href = logoLinkWrapper.href;
    moveInstrumentation(logoLinkWrapper, logoLink);

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('header-logo', 'd-flex', 'align-items-center');

    const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
    if (logoImage) {
      const img = logoImage.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, true, [{ width: '200' }]);
        pic.classList.add('header-logo-img');
        logoDiv.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      }
    }
    logoLink.append(logoDiv);
    headerDiv2.append(logoLink);
  }
  headerContainer.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.classList.add('d-flex', 'w-25', 'justify-content-end');
  const loginLinkWrapper = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLinkWrapper) {
    const loginLink = document.createElement('a');
    loginLink.classList.add('header-login-btn-wrapper', 'header-analytics-cta-click');
    loginLink.style.display = 'inline';
    loginLink.href = loginLinkWrapper.href;
    moveInstrumentation(loginLinkWrapper, loginLink);

    const loginButton = document.createElement('button');
    loginButton.classList.add('header-login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
    loginButton.textContent = loginLinkWrapper.textContent.trim();
    loginLink.append(loginButton);
  }
  headerDiv3.append(loginLinkWrapper);
  headerContainer.append(headerDiv3);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebar = document.createElement('aside');
  sidebar.classList.add('header-sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('header-sidebar-menu', 'list-unstyled', 'px-4');

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-sidebar-menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');
    moveInstrumentation(item, li);

    const link = item.querySelector('[data-aue-prop="link"]');
    const label = item.querySelector('[data-aue-prop="label"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');

    if (link && label) {
      const a = document.createElement('a');
      a.classList.add('header-sidebar-menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');
      a.href = link.href;
      a.textContent = label.textContent;
      moveInstrumentation(link, a);
      moveInstrumentation(label, a);

      if (icon) {
        const img = icon.querySelector('img');
        if (img) {
          const pic = createOptimizedPicture(img.src, img.alt);
          pic.classList.add('header-sidebar-menu-icon', 'me-4');
          a.prepend(pic);
          moveInstrumentation(img, pic.querySelector('img'));
        }
      }
      li.append(a);
    }
    sidebarMenu.append(li);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar-curve');
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'w-100', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('header-footer-brand-primary');
  footerBrandPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('header-container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand-primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // ITC Logo (static, not from block json)
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

  // FSSI Logo (static, not from block json)
  const fssiDiv = document.createElement('div');
  fssiDiv.classList.add('header-footer-brand-secondary--logo', 'd-inline-block');
  const fssiImg = document.createElement('img');
  fssiImg.classList.add('object-fit-contain', 'w-100', 'no-rendition');
  fssiImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp';
  fssiImg.alt = 'FSSI Logo';
  fssiImg.loading = 'lazy';
  fssiDiv.append(fssiImg);
  footerBrandLeft.append(fssiDiv);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand-right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerListItems = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const numLists = Math.ceil(footerListItems.length / 3); // Assuming 3 items per list for now

  for (let i = 0; i < numLists; i++) {
    const listContainer = document.createElement('div');
    listContainer.classList.add('header-footer-list-container');
    const ul = document.createElement('ul');
    ul.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    for (let j = 0; j < 3; j++) {
      const itemIndex = i * 3 + j;
      if (itemIndex < footerListItems.length) {
        const item = footerListItems[itemIndex];
        const li = document.createElement('li');
        li.classList.add('header-footer-list-item');
        moveInstrumentation(item, li);

        const link = item.querySelector('[data-aue-prop="link"]');
        const label = item.querySelector('[data-aue-prop="label"]');

        if (link && label) {
          const a = document.createElement('a');
          a.classList.add('header-cta-analytics', 'header-analytics-cta-click', 'header-footer-list-item--link', 'd-inline-block');
          a.setAttribute('data-link-region', 'Footer List');
          a.href = link.href;
          a.textContent = label.textContent;
          moveInstrumentation(link, a);
          moveInstrumentation(label, a);
          li.append(a);
        }
        ul.append(li);
      }
    }
    listContainer.append(ul);
    if (i < 2) { // Distribute into left and right, assuming 2 containers for left
      footerNavbarLeft.append(listContainer);
    } else { // Remaining for right
      // This logic needs to be more robust if the number of lists is dynamic
      // For now, it assumes a fixed structure of 2 on left, 2 on right
      // We'll append to a new 'footerNavbarRight' if it exists.
    }
  }

  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('header-footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  // Re-iterate for the right side or adjust the loop above to handle 4 columns
  for (let i = 2; i < numLists; i++) {
    const listContainer = document.createElement('div');
    listContainer.classList.add('header-footer-list-container');
    const ul = document.createElement('ul');
    ul.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    for (let j = 0; j < 3; j++) {
      const itemIndex = i * 3 + j;
      if (itemIndex < footerListItems.length) {
        const item = footerListItems[itemIndex];
        const li = document.createElement('li');
        li.classList.add('header-footer-list-item');
        moveInstrumentation(item, li);

        const link = item.querySelector('[data-aue-prop="link"]');
        const label = item.querySelector('[data-aue-prop="label"]');

        if (link && label) {
          const a = document.createElement('a');
          a.classList.add('header-cta-analytics', 'header-analytics-cta-click', 'header-footer-list-item--link', 'd-inline-block');
          a.setAttribute('data-link-region', 'Footer List');
          a.href = link.href;
          a.textContent = label.textContent;
          moveInstrumentation(link, a);
          moveInstrumentation(label, a);
          li.append(a);
        }
        ul.append(li);
      }
    }
    listContainer.append(ul);
    footerNavbarRight.append(listContainer);
  }
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('header-footer-brand-secondary');
  footerBrandSecondary.style.backgroundColor = '';

  const footerContainer2 = document.createElement('div');
  footerContainer2.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const footerSocialRight = document.createElement('section');
  footerSocialRight.classList.add('header-footer-brand-right', 'd-flex', 'flex-column', 'pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social-media--title');
  socialTitle.textContent = 'Follow Us On';
  footerSocialRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('header-footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const footerSocialItems = block.querySelectorAll('[data-aue-model="footerSocialItem"]');
  footerSocialItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    moveInstrumentation(item, li);

    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const a = document.createElement('a');
      a.classList.add('header-footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'header-analytics-cta-click');
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${link.textContent.toLowerCase().replace(/\s/g, '-')}`); // Example label
      a.target = '_blank';
      a.setAttribute('data-platform-name', link.textContent.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');
      a.href = link.href;
      moveInstrumentation(link, a);

      const img = icon.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        pic.setAttribute('aria-label', link.textContent.toLowerCase());
        a.append(pic);
        moveInstrumentation(img, pic.querySelector('img'));
      }
      li.append(a);
    }
    socialList.append(li);
  });
  footerSocialRight.append(socialList);
  footerSecondaryContent.append(footerSocialRight);

  const footerCopyrightLeft = document.createElement('section');
  footerCopyrightLeft.classList.add('header-footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('header-footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  // ITC Portal Link (static)
  const itcPortalLi = document.createElement('li');
  itcPortalLi.classList.add('header-footer-brand-left--item', 'header-foot-link');
  const itcPortalA = document.createElement('a');
  itcPortalA.href = 'https://www.itcportal.com/';
  itcPortalA.target = '_blank';
  itcPortalA.classList.add('header-footer-brand-left--link', 'header-analytics-cta-click');
  itcPortalA.setAttribute('data-cta-region', 'Footer');
  itcPortalA.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalA);
  copyrightList.append(itcPortalLi);
  footerCopyrightLeft.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand-left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand-left--text', 'text-white');
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerCopyrightLeft.append(copyrightDiv);
  footerSecondaryContent.append(footerCopyrightLeft);

  footerContainer2.append(footerSecondaryContent);
  footerBrandSecondary.append(footerContainer2);
  footerBrand.append(footerBrandSecondary);
  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
