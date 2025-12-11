import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainHeader = document.createElement('header');
  mainHeader.classList.add('header-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.classList.add('header-app-name', 'd-none');
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
    mainHeader.append(appNameSpan);
  }

  const div1 = document.createElement('div');
  div1.classList.add('d-flex', 'w-25');
  mainHeader.append(div1);

  const div2 = document.createElement('div');
  div2.classList.add('d-flex', 'justify-content-center', 'w-25');
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
    const pic = createOptimizedPicture(logoImg.src, logoImg.alt);
    pic.querySelector('img').classList.add('header-logo-img');
    moveInstrumentation(logoImg, pic.querySelector('img'));
    logoDiv.append(pic);
  }
  logoLinkWrapper.append(logoDiv);
  div2.append(logoLinkWrapper);
  mainHeader.append(div2);

  const div3 = document.createElement('div');
  div3.classList.add('d-flex', 'w-25', 'justify-content-end');
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
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  if (loginText) {
    loginButton.textContent = loginText.textContent;
    moveInstrumentation(loginText, loginButton);
  }
  loginLinkWrapper.append(loginButton);
  div3.append(loginLinkWrapper);
  mainHeader.append(div3);

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

    const link = document.createElement('a');
    link.classList.add('header-sidebar-menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'header-analytics-cta-click');

    const itemLink = item.querySelector('[data-aue-prop="link"]');
    if (itemLink) {
      link.href = itemLink.href;
      link.setAttribute('data-link', itemLink.href.replace('.html', ''));
      moveInstrumentation(itemLink, link);
    }

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      pic.querySelector('img').classList.add('header-sidebar-menu-icon', 'me-4');
      moveInstrumentation(icon, pic.querySelector('img'));
      link.append(pic);
    }

    const text = item.querySelector('[data-aue-prop="text"]');
    if (text) {
      link.append(text.textContent);
      moveInstrumentation(text, link);
    }
    li.append(link);
    sidebarMenu.append(li);
  });

  const logoutItem = document.createElement('li');
  logoutItem.classList.add('header-sidebar-menu-item', 'header-sidebar-menu-item--logout', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');
  logoutItem.style.display = 'none';
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
  logoutItem.append(logoutLink);
  sidebarMenu.append(logoutItem);

  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar-curve');
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'w-100', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('header-footer-brand-primary');
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('header-container');
  const footerContent = document.createElement('div');
  footerContent.classList.add('header-footer-brand-primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const footerLogo1Link = document.createElement('a');
  footerLogo1Link.href = 'https://www.itcportal.com/';
  footerLogo1Link.target = '_blank';
  footerLogo1Link.classList.add('header-footer-brand-logo', 'd-inline-block', 'header-analytics-cta-click');
  footerLogo1Link.setAttribute('data-cta-region', 'Footer');
  footerLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1) {
    const pic = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
    moveInstrumentation(footerLogo1, pic.querySelector('img'));
    footerLogo1Link.append(pic);
  }
  footerBrandLeft.append(footerLogo1Link);

  const footerLogo2Div = document.createElement('div');
  footerLogo2Div.classList.add('header-footer-brand-secondary--logo', 'd-inline-block');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2) {
    const pic = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
    moveInstrumentation(footerLogo2, pic.querySelector('img'));
    footerLogo2Div.append(pic);
  }
  footerBrandLeft.append(footerLogo2Div);
  footerContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand-right');
  const footerNav = document.createElement('nav');
  footerNav.classList.add('header-footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavLeft = document.createElement('div');
  footerNavLeft.classList.add('header-footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const numFooterLinks = footerLinks.length;
  const half = Math.ceil(numFooterLinks / 2);

  const listContainer1 = document.createElement('div');
  listContainer1.classList.add('header-footer-list-container');
  const ul1 = document.createElement('ul');
  ul1.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  listContainer1.append(ul1);

  const listContainer2 = document.createElement('div');
  listContainer2.classList.add('header-footer-list-container');
  const ul2 = document.createElement('ul');
  ul2.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  listContainer2.append(ul2);

  const listContainer3 = document.createElement('div');
  listContainer3.classList.add('header-footer-list-container');
  const ul3 = document.createElement('ul');
  ul3.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  listContainer3.append(ul3);

  const listContainer4 = document.createElement('div');
  listContainer4.classList.add('header-footer-list-container');
  const ul4 = document.createElement('ul');
  ul4.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  listContainer4.append(ul4);

  footerLinks.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-list-item');
    const link = document.createElement('a');
    link.classList.add('header-cta-analytics', 'header-analytics-cta-click', 'header-footer-list-item--link', 'd-inline-block');
    link.setAttribute('data-link-region', 'Footer List');

    const itemLink = item.querySelector('[data-aue-prop="link"]');
    if (itemLink) {
      link.href = itemLink.href;
      if (itemLink.hasAttribute('target')) {
        link.target = itemLink.target;
      }
      moveInstrumentation(itemLink, link);
    }

    const text = item.querySelector('[data-aue-prop="text"]');
    if (text) {
      link.textContent = text.textContent;
      moveInstrumentation(text, link);
    }
    li.append(link);

    if (index < half / 2) {
      ul1.append(li);
    } else if (index < half) {
      ul2.append(li);
    } else if (index < numFooterLinks - (numFooterLinks - half) / 2) {
      ul3.append(li);
    } else {
      ul4.append(li);
    }
  });

  footerNavLeft.append(listContainer1, listContainer2);
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.classList.add('header-footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavRight.append(listContainer3, listContainer4);
  footerNav.append(footerNavRight);

  footerBrandRight.append(footerNav);
  footerContent.append(footerBrandRight);

  footerContainer.append(footerContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('header-footer-brand-secondary');
  const footerContainer2 = document.createElement('div');
  footerContainer2.classList.add('header-container');
  const footerContent2 = document.createElement('div');
  footerContent2.classList.add('header-footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand-right', 'd-flex', 'flex-column', 'pb-5');
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('header-social-media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add('header-footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    const link = document.createElement('a');
    link.classList.add('header-footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'header-analytics-cta-click');
    link.setAttribute('data-cta-region', 'Footer');
    link.target = '_blank';
    link.setAttribute('data-social-linktype', 'follow');

    const itemLink = item.querySelector('[data-aue-prop="link"]');
    if (itemLink) {
      link.href = itemLink.href;
      link.setAttribute('data-platform-name', itemLink.href.includes('facebook') ? 'facebook' : itemLink.href.includes('instagram') ? 'instagram' : 'youtube');
      link.setAttribute('data-cta-label', `footer-${itemLink.href.includes('facebook') ? 'facebook' : itemLink.href.includes('instagram') ? 'instagram' : 'youtube'}`);
      moveInstrumentation(itemLink, link);
    }

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      pic.querySelector('img').setAttribute('aria-label', icon.alt);
      moveInstrumentation(icon, pic.querySelector('img'));
      link.append(pic);
    }
    li.append(link);
    socialMediaList.append(li);
  });

  socialMediaSection.append(socialMediaList);
  footerContent2.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('header-footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('header-footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  const copyrightListItem = document.createElement('li');
  copyrightListItem.classList.add('header-footer-brand-left--item', 'header-foot-link');
  const externalLink = document.createElement('a');
  externalLink.classList.add('header-footer-brand-left--link', 'header-analytics-cta-click');
  externalLink.setAttribute('data-cta-region', 'Footer');
  externalLink.target = '_blank';
  const footerExternalLink = block.querySelector('[data-aue-prop="footerExternalLink"]');
  if (footerExternalLink) {
    externalLink.href = footerExternalLink.href;
    externalLink.textContent = footerExternalLink.textContent;
    moveInstrumentation(footerExternalLink, externalLink);
  }
  copyrightListItem.append(externalLink);
  copyrightList.append(copyrightListItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand-left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand-left--text', 'text-white');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  footerContent2.append(copyrightSection);

  footerContainer2.append(footerContent2);
  footerBrandSecondary.append(footerContainer2);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlay);

  const finalRoot = document.createElement('section');
  finalRoot.classList.add('header-section-position-relative', 'header-section-mb-15');
  finalRoot.append(mainHeader, submenuContainer);

  block.textContent = '';
  block.append(finalRoot);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
