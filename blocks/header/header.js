import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-section-position-relative header-section-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  headerSection.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const divLeft = document.createElement('div');
  divLeft.className = 'd-flex w-25';
  headerContainer.append(divLeft);

  const divCenter = document.createElement('div');
  divCenter.className = 'd-flex justify-content-center w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoAnchor = document.createElement('a');
  logoAnchor.className = 'header-analytics-cta-click';
  logoAnchor.setAttribute('a-label', 'header-logo-boing');
  if (logoLink) {
    logoAnchor.href = logoLink.querySelector('a')?.href || '#';
    moveInstrumentation(logoLink, logoAnchor);
  } else {
    logoAnchor.href = '/';
  }

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo d-flex align-items-center';

  const logoImage = block.querySelector('[data-aue-prop="logo"] img');
  if (logoImage) {
    const picture = createOptimizedPicture(logoImage.src, logoImage.alt, true, [{ width: '100%' }]);
    picture.querySelector('img').className = 'header-logo-img';
    logoDiv.append(picture);
    moveInstrumentation(logoImage, picture.querySelector('img'));
  }
  logoAnchor.append(logoDiv);
  divCenter.append(logoAnchor);
  headerContainer.append(divCenter);

  const divRight = document.createElement('div');
  divRight.className = 'd-flex w-25 justify-content-end';

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const loginAnchor = document.createElement('a');
  loginAnchor.className = 'header-login-btn-wrapper header-analytics-cta-click';
  loginAnchor.style.display = 'inline';
  if (loginLink) {
    loginAnchor.href = loginLink.querySelector('a')?.href || '#';
    moveInstrumentation(loginLink, loginAnchor);
  } else {
    loginAnchor.href = '/login.html';
  }

  const loginButton = document.createElement('button');
  loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
  loginButton.textContent = 'Login';
  loginAnchor.append(loginButton);
  divRight.append(loginAnchor);
  headerContainer.append(divRight);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebarAside = document.createElement('aside');
  sidebarAside.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="headerSidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';
    if (item.classList.contains('header-sidebar-menu-item--logout')) {
      li.classList.add('header-sidebar-menu-item--logout');
      li.style.display = 'none';
    }

    const itemLink = item.querySelector('[data-aue-prop="itemLink"]');
    const anchor = document.createElement('a');
    anchor.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
    anchor.setAttribute('data-consent', itemLink?.querySelector('a')?.dataset.consent || 'false');
    anchor.setAttribute('data-link', itemLink?.querySelector('a')?.dataset.link || '');
    if (itemLink) {
      anchor.href = itemLink.querySelector('a')?.href || '#';
      moveInstrumentation(itemLink, anchor);
    } else {
      anchor.href = '#';
    }

    const itemIcon = item.querySelector('[data-aue-prop="itemIcon"] img');
    if (itemIcon) {
      const picture = createOptimizedPicture(itemIcon.src, itemIcon.alt);
      picture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
      anchor.append(picture);
      moveInstrumentation(itemIcon, picture.querySelector('img'));
    }

    const itemLabel = item.querySelector('[data-aue-prop="itemLabel"]');
    if (itemLabel) {
      anchor.append(itemLabel.textContent);
      moveInstrumentation(itemLabel, anchor);
    }

    li.append(anchor);
    sidebarMenu.append(li);
  });
  sidebarAside.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  sidebarAside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const footerPrimaryLogoLink = document.createElement('a');
  footerPrimaryLogoLink.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
  footerPrimaryLogoLink.setAttribute('data-cta-region', 'Footer');
  footerPrimaryLogoLink.setAttribute('aria-label', 'ITC Logo');
  footerPrimaryLogoLink.target = '_blank';
  if (itcPortalLink) {
    footerPrimaryLogoLink.href = itcPortalLink.querySelector('a')?.href || '#';
    moveInstrumentation(itcPortalLink, footerPrimaryLogoLink);
  } else {
    footerPrimaryLogoLink.href = 'https://www.itcportal.com/';
  }

  const footerPrimaryLogo = block.querySelector('[data-aue-prop="footerPrimaryLogo"] img');
  if (footerPrimaryLogo) {
    const picture = createOptimizedPicture(footerPrimaryLogo.src, footerPrimaryLogo.alt);
    picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    footerPrimaryLogoLink.append(picture);
    moveInstrumentation(footerPrimaryLogo, picture.querySelector('img'));
  }
  footerBrandLeft.append(footerPrimaryLogoLink);

  const footerSecondaryLogoDiv = document.createElement('div');
  footerSecondaryLogoDiv.className = 'header-footer-brand-secondary--logo d-inline-block';

  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"] img');
  if (footerSecondaryLogo) {
    const picture = createOptimizedPicture(footerSecondaryLogo.src, footerSecondaryLogo.alt);
    picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    footerSecondaryLogoDiv.append(picture);
    moveInstrumentation(footerSecondaryLogo, picture.querySelector('img'));
  }
  footerBrandLeft.append(footerSecondaryLogoDiv);
  footerContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';
  footerNavbar.append(footerNavbarLeft);

  const footerListItems = block.querySelectorAll('[data-aue-model="headerFooterListItem"]');
  const numLists = Math.ceil(footerListItems.length / 3); // Assuming 3 items per list for now

  for (let i = 0; i < numLists; i++) {
    const footerListContainer = document.createElement('div');
    footerListContainer.className = 'header-footer-list-container';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    for (let j = 0; j < 3 && (i * 3 + j) < footerListItems.length; j++) {
      const item = footerListItems[i * 3 + j];
      const li = document.createElement('li');
      li.className = 'header-footer-list-item';

      const footerLink = item.querySelector('[data-aue-prop="footerLink"]');
      const anchor = document.createElement('a');
      anchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (footerLink) {
        anchor.href = footerLink.querySelector('a')?.href || '#';
        if (footerLink.querySelector('a')?.target) {
          anchor.target = footerLink.querySelector('a').target;
        }
        moveInstrumentation(footerLink, anchor);
      } else {
        anchor.href = '#';
      }

      const footerLabel = item.querySelector('[data-aue-prop="footerLabel"]');
      if (footerLabel) {
        anchor.textContent = footerLabel.textContent;
        moveInstrumentation(footerLabel, anchor);
      }

      li.append(anchor);
      ul.append(li);
    }
    footerListContainer.append(ul);
    if (i < 2) { // Assuming first two go to left, rest to right
      footerNavbarLeft.append(footerListContainer);
    } else {
      let footerNavbarRight = footerNavbar.querySelector('.header-footer-brand-navbar--right');
      if (!footerNavbarRight) {
        footerNavbarRight = document.createElement('div');
        footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbarRight.append(footerListContainer);
    }
  }

  footerBrandRight.append(footerNavbar);
  footerContent.append(footerBrandRight);
  footerContainer.append(footerContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand-right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social-media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="headerSocialLink"]');
  footerSocialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

    const socialUrl = item.querySelector('[data-aue-prop="socialUrl"]');
    const anchor = document.createElement('a');
    anchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.target = '_blank';
    if (socialUrl) {
      anchor.href = socialUrl.querySelector('a')?.href || '#';
      anchor.setAttribute('data-cta-label', `footer-${socialUrl.querySelector('a')?.href.includes('facebook') ? 'facebook' : socialUrl.querySelector('a')?.href.includes('instagram') ? 'instagram' : socialUrl.querySelector('a')?.href.includes('youtube') ? 'youtube' : ''}`);
      anchor.setAttribute('data-platform-name', socialUrl.querySelector('a')?.href.includes('facebook') ? 'facebook' : socialUrl.querySelector('a')?.href.includes('instagram') ? 'instagram' : socialUrl.querySelector('a')?.href.includes('youtube') ? 'youtube' : '');
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(socialUrl, anchor);
    } else {
      anchor.href = '#';
    }

    const socialIcon = item.querySelector('[data-aue-prop="socialIcon"] img');
    if (socialIcon) {
      const picture = createOptimizedPicture(socialIcon.src, socialIcon.alt);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      picture.querySelector('img').setAttribute('aria-label', socialIcon.alt);
      anchor.append(picture);
      moveInstrumentation(socialIcon, picture.querySelector('img'));
    }

    li.append(anchor);
    socialMediaList.append(li);
  });
  socialMediaSection.append(socialMediaList);
  footerSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalListItem = document.createElement('li');
  itcPortalListItem.className = 'header-footer-brand-left--item header-foot-link';
  const itcPortalAnchor = document.createElement('a');
  itcPortalAnchor.href = 'https://www.itcportal.com/';
  itcPortalAnchor.target = '_blank';
  itcPortalAnchor.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcPortalAnchor.setAttribute('data-cta-region', 'Footer');
  itcPortalAnchor.textContent = 'ITC portal';
  itcPortalListItem.append(itcPortalAnchor);
  copyrightList.append(itcPortalListItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  footerSecondaryContent.append(copyrightSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebarAside.append(footerBrand);
  submenuContainer.append(sidebarAside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}