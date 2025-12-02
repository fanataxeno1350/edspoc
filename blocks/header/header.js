import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.classList.add('header-section-position-relative', 'header-section-mb-15');
  moveInstrumentation(block, headerSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-app-name', 'd-none');
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  headerSection.append(appNameSpan);

  // Header Container
  const headerBoingContainer = document.createElement('header');
  headerBoingContainer.classList.add('header-boing-container', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerDiv1 = document.createElement('div');
  headerDiv1.classList.add('header-d-flex', 'header-w-25');
  headerBoingContainer.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  const logoLinkWrapper = document.createElement('a');
  logoLinkWrapper.classList.add('header-analytics_cta_click');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    logoLinkWrapper.href = logoLink.href;
    logoLinkWrapper.setAttribute('aria-label', 'header-logo-boing');
    logoLinkWrapper.setAttribute('data-ct', '');
    moveInstrumentation(logoLink, logoLinkWrapper);
  }
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-d-flex', 'header-align-items-center');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt, true, [{ width: '150' }]);
    pic.querySelector('img').classList.add('header-logo-img');
    moveInstrumentation(logoImage, pic.querySelector('img'));
    logoDiv.append(pic);
  }
  logoLinkWrapper.append(logoDiv);
  headerDiv2.append(logoLinkWrapper);
  headerBoingContainer.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  const loginLinkWrapper = document.createElement('a');
  loginLinkWrapper.classList.add('header-login-btn-wrapper', 'header-analytics_cta_click');
  loginLinkWrapper.style.display = 'inline';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    loginLinkWrapper.href = loginLink.href;
    moveInstrumentation(loginLink, loginLinkWrapper);
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add('header-login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
  loginButton.textContent = 'Login';
  loginLinkWrapper.append(loginButton);
  headerDiv3.append(loginLinkWrapper);
  headerBoingContainer.append(headerDiv3);
  headerSection.append(headerBoingContainer);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const sidebarMenuUL = document.createElement('ul');
  sidebarMenuUL.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');
    moveInstrumentation(item, li);

    const link = document.createElement('a');
    link.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
    link.setAttribute('data-consent', 'false');

    const menuLink = item.querySelector('[data-aue-prop="link"]');
    if (menuLink) {
      link.href = menuLink.href;
      link.setAttribute('data-link', menuLink.href);
      moveInstrumentation(menuLink, link);
    }

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      pic.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
      pic.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(icon, pic.querySelector('img'));
      link.append(pic);
    }

    const label = item.querySelector('[data-aue-prop="label"]');
    if (label) {
      link.append(label.textContent);
      moveInstrumentation(label, link);
    }
    li.append(link);
    sidebarMenuUL.append(li);
  });
  aside.append(sidebarMenuUL);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('header-footer-brand__primary');
  footerPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('header-container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  const footerLogo1Link = document.createElement('a');
  footerLogo1Link.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
  footerLogo1Link.href = 'https://www.itcportal.com/';
  footerLogo1Link.target = '_blank';
  footerLogo1Link.setAttribute('data-cta-region', 'Footer');
  footerLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1) {
    const pic = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    pic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
    pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogo1, pic.querySelector('img'));
    footerLogo1Link.append(pic);
  }
  footerBrandLeft.append(footerLogo1Link);

  const footerSecondaryLogoDiv = document.createElement('div');
  footerSecondaryLogoDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2) {
    const pic = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    pic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
    pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogo2, pic.querySelector('img'));
    footerSecondaryLogoDiv.append(pic);
  }
  footerBrandLeft.append(footerSecondaryLogoDiv);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const footerLists = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const numLists = Math.ceil(footerLists.length / 3); // Distribute into 4 columns, roughly

  for (let i = 0; i < 4; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('header-footerList');
    const ul = document.createElement('ul');
    ul.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');

    const startIndex = i * numLists;
    const endIndex = Math.min(startIndex + numLists, footerLists.length);

    for (let j = startIndex; j < endIndex; j += 1) {
      const item = footerLists[j];
      const li = document.createElement('li');
      li.classList.add('header-footer-list__item');
      moveInstrumentation(item, li);

      const link = document.createElement('a');
      link.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
      link.setAttribute('data-link-region', 'Footer List');

      const footerLink = item.querySelector('[data-aue-prop="link"]');
      if (footerLink) {
        link.href = footerLink.href;
        moveInstrumentation(footerLink, link);
      }

      const label = item.querySelector('[data-aue-prop="label"]');
      if (label) {
        link.textContent = label.textContent;
        moveInstrumentation(label, link);
      }
      li.append(link);
      ul.append(li);
    }
    if (ul.children.length > 0) {
      if (i < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        let footerNavbarRight = footerNavbar.querySelector('.header-footer-brand__navbar--right');
        if (!footerNavbarRight) {
          footerNavbarRight = document.createElement('div');
          footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
          footerNavbar.append(footerNavbarRight);
        }
        footerNavbarRight.append(footerListDiv);
      }
      footerListDiv.append(ul);
    }
  }
  footerNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimary.append(footerContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.classList.add('header-footer-brand__secondary');
  footerSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('header-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialLinksUL = document.createElement('ul');
  socialLinksUL.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
    moveInstrumentation(item, li);

    const link = document.createElement('a');
    link.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
    link.target = '_blank';
    link.setAttribute('data-cta-region', 'Footer');
    link.setAttribute('data-social-linktype', 'follow');

    const socialLinkHref = item.querySelector('[data-aue-prop="link"]');
    if (socialLinkHref) {
      link.href = socialLinkHref.href;
      link.setAttribute('data-cta-label', `footer-${socialLinkHref.textContent.toLowerCase()}`);
      link.setAttribute('data-platform-name', socialLinkHref.textContent.toLowerCase());
      moveInstrumentation(socialLinkHref, link);
    }

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      pic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
      pic.querySelector('img').setAttribute('loading', 'lazy');
      pic.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      moveInstrumentation(icon, pic.querySelector('img'));
      link.append(pic);
    }
    li.append(link);
    socialLinksUL.append(li);
  });
  socialMediaSection.append(socialLinksUL);
  footerSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const itcPortalUL = document.createElement('ul');
  itcPortalUL.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');
  const itcPortalLI = document.createElement('li');
  itcPortalLI.classList.add('header-footer-brand__left--item', 'header-foot_link');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
  itcPortalLink.target = '_blank';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  const itcLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcLink) {
    itcPortalLink.href = itcLink.href;
    itcPortalLink.textContent = itcLink.textContent;
    moveInstrumentation(itcLink, itcPortalLink);
  }
  itcPortalLI.append(itcPortalLink);
  itcPortalUL.append(itcPortalLI);
  copyrightSection.append(itcPortalUL);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  footerSecondaryContent.append(copyrightSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.innerHTML = '';
  block.append(headerSection);
}
