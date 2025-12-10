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

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('d-flex', 'w-25');
  headerContainer.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.classList.add('d-flex', 'justify-content-center', 'w-25');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('header-analytics-cta-click');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    logoAnchor.href = logoLink.href;
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('header-logo', 'd-flex', 'align-items-center');

    if (logo) {
      const logoImg = createOptimizedPicture(logo.src, logo.alt, true, [{ width: '200' }]);
      logoImg.querySelector('img').classList.add('header-logo-img');
      moveInstrumentation(logo, logoImg.querySelector('img'));
      logoDiv.append(logoImg);
    }
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
  }
  headerContainer.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('d-flex', 'w-25', 'justify-content-end');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.classList.add('header-login-btn-wrapper', 'header-analytics-cta-click');
    loginAnchor.style.display = 'inline';
    loginAnchor.href = loginLink.href;
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.classList.add('header-login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
    loginButton.textContent = loginLink.textContent;
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
  }
  headerContainer.append(headerRightDiv);
  headerSection.append(headerContainer);

  const headerSubmenuContainer = document.createElement('div');
  headerSubmenuContainer.classList.add('header-submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const headerSidebar = document.createElement('aside');
  headerSidebar.classList.add('header-sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('header-sidebar-menu', 'list-unstyled', 'px-4');

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

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand-right');

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('header-footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('header-footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('header-footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('header-footer-brand-secondary');
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.classList.add('header-container');

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('header-footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const footerSocialMediaSection = document.createElement('section');
  footerSocialMediaSection.classList.add('header-footer-brand-right', 'd-flex', 'flex-column', 'pb-5');

  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.classList.add('header-footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  let currentFooterListContainer = null;
  let currentFooterList = null;

  Array.from(block.children).forEach((row) => {
    const model = row.dataset.aueModel;

    if (model === 'sidebarMenuItem') {
      const icon = row.querySelector('[data-aue-prop="icon"]');
      const link = row.querySelector('[data-aue-prop="link"]');
      const label = row.querySelector('[data-aue-prop="label"]');

      const listItem = document.createElement('li');
      listItem.classList.add('header-sidebar-menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

      if (link) {
        const anchor = document.createElement('a');
        anchor.classList.add('header-sidebar-menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');
        anchor.href = link.href;
        anchor.dataset.consent = 'false';
        anchor.dataset.link = link.href;
        moveInstrumentation(link, anchor);

        if (icon) {
          const iconImg = createOptimizedPicture(icon.src, icon.alt);
          iconImg.querySelector('img').classList.add('header-sidebar-menu-icon', 'me-4');
          moveInstrumentation(icon, iconImg.querySelector('img'));
          anchor.append(iconImg);
        }

        if (label) {
          anchor.append(label.textContent);
          moveInstrumentation(label, anchor);
        }
        listItem.append(anchor);
      }
      sidebarMenu.append(listItem);
    } else if (model === 'footerListItem') {
      const link = row.querySelector('[data-aue-prop="link"]');
      const label = row.querySelector('[data-aue-prop="label"]');

      if (!currentFooterListContainer || currentFooterList.children.length >= 3) {
        currentFooterListContainer = document.createElement('div');
        currentFooterListContainer.classList.add('header-footer-list-container');
        currentFooterList = document.createElement('ul');
        currentFooterList.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
        currentFooterListContainer.append(currentFooterList);

        if (footerBrandNavbarLeft.children.length < 2) {
          footerBrandNavbarLeft.append(currentFooterListContainer);
        } else {
          footerBrandNavbarRight.append(currentFooterListContainer);
        }
      }

      const listItem = document.createElement('li');
      listItem.classList.add('header-footer-list-item');

      if (link) {
        const anchor = document.createElement('a');
        anchor.classList.add('header-cta-analytics', 'header-analytics-cta-click', 'header-footer-list-item--link', 'd-inline-block');
        anchor.dataset.linkRegion = 'Footer List';
        anchor.href = link.href;
        moveInstrumentation(link, anchor);

        if (label) {
          anchor.textContent = label.textContent;
          moveInstrumentation(label, anchor);
        }
        listItem.append(anchor);
      }
      currentFooterList.append(listItem);
    } else if (model === 'socialLink') {
      const link = row.querySelector('[data-aue-prop="link"]');
      const icon = row.querySelector('[data-aue-prop="icon"]');

      const socialMediaList = footerSocialMediaSection.querySelector('ul') || document.createElement('ul');
      socialMediaList.classList.add('header-footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

      const listItem = document.createElement('li');
      listItem.classList.add('header-footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');

      if (link) {
        const anchor = document.createElement('a');
        anchor.classList.add('header-footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'header-analytics-cta-click');
        anchor.dataset.ctaRegion = 'Footer';
        anchor.dataset.ctaLabel = `footer-${link.textContent.toLowerCase()}`;
        anchor.target = '_blank';
        anchor.dataset.platformName = link.textContent.toLowerCase();
        anchor.dataset.socialLinktype = 'follow';
        anchor.href = link.href;
        moveInstrumentation(link, anchor);

        if (icon) {
          const iconImg = createOptimizedPicture(icon.src, icon.alt);
          iconImg.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
          iconImg.querySelector('img').setAttribute('aria-label', link.textContent.toLowerCase());
          moveInstrumentation(icon, iconImg.querySelector('img'));
          anchor.append(iconImg);
        }
        listItem.append(anchor);
      }
      socialMediaList.append(listItem);
      footerSocialMediaSection.append(socialMediaList);
    }
  });

  headerSidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar-curve');
  headerSidebar.append(sidebarCurve);

  footerBrandPrimaryContent.append(footerBrandLeft, footerBrandRight);
  footerBrandContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainer);

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRight.append(footerBrandNavbar);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('header-social-media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  footerSocialMediaSection.prepend(socialMediaTitle);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('header-footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  const copyrightListItem = document.createElement('li');
  copyrightListItem.classList.add('header-footer-brand-left--item', 'header-foot-link');
  const copyrightLink = document.createElement('a');
  copyrightLink.href = 'https://www.itcportal.com/';
  copyrightLink.target = '_blank';
  copyrightLink.classList.add('header-footer-brand-left--link', 'header-analytics-cta-click');
  copyrightLink.dataset.ctaRegion = 'Footer';
  copyrightLink.textContent = 'ITC portal';
  copyrightListItem.append(copyrightLink);
  copyrightList.append(copyrightListItem);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand-left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand-left--text', 'text-white');
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);

  footerCopyrightSection.append(copyrightList, copyrightDiv);

  footerBrandSecondaryContent.append(footerSocialMediaSection, footerCopyrightSection);
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);

  footerBrand.append(footerBrandPrimary, footerBrandSecondary);
  headerSidebar.append(footerBrand);

  const headerOverlay = document.createElement('div');
  headerOverlay.classList.add('header-overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');

  headerSubmenuContainer.append(headerSidebar, headerOverlay);
  headerSection.append(headerSubmenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
