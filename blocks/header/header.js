import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = [...block.querySelectorAll('[data-aue-model="headerMenuItem"]')];
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerLinks = [...block.querySelectorAll('[data-aue-model="footerLink"]')];
  const socialLinks = [...block.querySelectorAll('[data-aue-model="socialLink"]')];
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', appName.textContent.trim());
  appNameSpan.setAttribute('data-aue-prop', 'appName');
  appNameSpan.textContent = appName.textContent.trim();
  moveInstrumentation(appName, appNameSpan);
  section.append(appNameSpan);

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const div1 = document.createElement('div');
  div1.className = 'header-d-flex header-w-25';
  header.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoAnchor = document.createElement('a');
  logoAnchor.className = 'header-analytics_cta_click';
  logoAnchor.setAttribute('data-ct', '');
  logoAnchor.setAttribute('a-label', 'header-logo-boing');
  logoAnchor.setAttribute('data-aue-prop', 'logoLink');
  logoAnchor.href = logoLink ? logoLink.textContent.trim() : '/';

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  if (logo) {
    const logoImg = logo.querySelector('img');
    if (logoImg) {
      const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '750' }]);
      optimizedLogo.querySelector('img').className = 'header-header__logo-img';
      logoDiv.append(optimizedLogo);
      moveInstrumentation(logo, optimizedLogo);
    }
  }
  logoAnchor.append(logoDiv);
  div2.append(logoAnchor);
  moveInstrumentation(logoLink, logoAnchor);
  header.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginAnchor = document.createElement('a');
  loginAnchor.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginAnchor.style.display = 'inline';
  loginAnchor.setAttribute('data-aue-prop', 'loginLink');
  loginAnchor.href = loginLink ? loginLink.textContent.trim() : '/login.html';

  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = 'Login';
  loginAnchor.append(loginButton);
  div3.append(loginAnchor);
  moveInstrumentation(loginLink, loginAnchor);
  header.append(div3);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  menuItems.forEach((item) => {
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const label = item.querySelector('[data-aue-prop="label"]');
    const link = item.querySelector('[data-aue-prop="link"]');

    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const itemLink = document.createElement('a');
    itemLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
    itemLink.setAttribute('data-consent', 'false');
    itemLink.setAttribute('data-link', link ? link.textContent.trim() : '');
    itemLink.href = link ? link.textContent.trim() : '#';
    itemLink.setAttribute('data-aue-prop', 'link');

    if (icon) {
      const iconImg = icon.querySelector('img');
      if (iconImg) {
        const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '50' }]);
        optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        itemLink.append(optimizedIcon);
        moveInstrumentation(icon, optimizedIcon);
      }
    }
    if (label) {
      itemLink.append(label.textContent.trim());
      moveInstrumentation(label, itemLink);
    }
    listItem.append(itemLink);
    moveInstrumentation(link, itemLink);
    moveInstrumentation(item, listItem);
    menuList.append(listItem);
  });

  const logoutListItem = document.createElement('li');
  logoutListItem.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
  logoutListItem.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  logoutLink.href = '/';
  const logoutImg = document.createElement('img');
  logoutImg.src = '/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp';
  logoutImg.alt = 'Logout';
  logoutImg.className = 'header-sidebar__menu-icon header-me-4';
  logoutImg.loading = 'lazy';
  logoutLink.append(logoutImg, 'Logout');
  logoutListItem.append(logoutLink);
  menuList.append(logoutListItem);

  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'header-container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const logo1Anchor = document.createElement('a');
  logo1Anchor.href = 'https://www.itcportal.com/';
  logo1Anchor.target = '_blank';
  logo1Anchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  logo1Anchor.setAttribute('data-cta-region', 'Footer');
  logo1Anchor.setAttribute('aria-label', 'ITC Logo');
  logo1Anchor.setAttribute('data-aue-prop', 'footerLogo1');

  if (footerLogo1) {
    const logo1Img = footerLogo1.querySelector('img');
    if (logo1Img) {
      const optimizedLogo1 = createOptimizedPicture(logo1Img.src, logo1Img.alt, false, [{ width: '200' }]);
      optimizedLogo1.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      logo1Anchor.append(optimizedLogo1);
      moveInstrumentation(footerLogo1, optimizedLogo1);
    }
  }
  footerBrandLeft.append(logo1Anchor);

  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  secondaryLogoDiv.setAttribute('data-aue-prop', 'footerLogo2');
  if (footerLogo2) {
    const logo2Img = footerLogo2.querySelector('img');
    if (logo2Img) {
      const optimizedLogo2 = createOptimizedPicture(logo2Img.src, logo2Img.alt, false, [{ width: '200' }]);
      optimizedLogo2.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      secondaryLogoDiv.append(optimizedLogo2);
      moveInstrumentation(footerLogo2, optimizedLogo2);
    }
  }
  footerBrandLeft.append(secondaryLogoDiv);
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const createFooterList = (links) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    links.forEach((linkItem) => {
      const label = linkItem.querySelector('[data-aue-prop="label"]');
      const link = linkItem.querySelector('[data-aue-prop="link"]');

      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      const a = document.createElement('a');
      a.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      a.setAttribute('data-link-region', 'Footer List');
      a.setAttribute('data-aue-prop', 'link');
      a.href = link ? link.textContent.trim() : '#';
      a.textContent = label ? label.textContent.trim() : '';
      li.append(a);
      moveInstrumentation(label, a);
      moveInstrumentation(link, a);
      moveInstrumentation(linkItem, li);
      ul.append(li);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  const firstColumnLinks = footerLinks.slice(0, 3);
  const secondColumnLinks = footerLinks.slice(3, 6);
  const thirdColumnLinks = footerLinks.slice(6, 9);
  const fourthColumnLinks = footerLinks.slice(9, 12);

  navbarLeft.append(createFooterList(firstColumnLinks));
  navbarLeft.append(createFooterList(secondColumnLinks));
  footerNavbar.append(navbarLeft);

  const navbarRight = document.createElement('div');
  navbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  navbarRight.append(createFooterList(thirdColumnLinks));
  navbarRight.append(createFooterList(fourthColumnLinks));
  footerNavbar.append(navbarRight);

  footerBrandRight.append(footerNavbar);
  primaryContent.append(footerBrandRight);
  containerDiv.append(primaryContent);
  footerBrandPrimary.append(containerDiv);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((socialItem) => {
    const platform = socialItem.querySelector('[data-aue-prop="platform"]');
    const link = socialItem.querySelector('[data-aue-prop="link"]');
    const icon = socialItem.querySelector('[data-aue-prop="icon"]');

    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const a = document.createElement('a');
    a.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
    a.setAttribute('data-cta-region', 'Footer');
    a.setAttribute('data-cta-label', `footer-${platform ? platform.textContent.trim().toLowerCase() : ''}`);
    a.target = '_blank';
    a.setAttribute('data-platform-name', platform ? platform.textContent.trim().toLowerCase() : '');
    a.setAttribute('data-social-linktype', 'follow');
    a.setAttribute('data-aue-prop', 'link');
    a.href = link ? link.textContent.trim() : '#';

    if (icon) {
      const iconImg = icon.querySelector('img');
      if (iconImg) {
        const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '50' }]);
        optimizedIcon.querySelector('img').setAttribute('aria-label', platform ? platform.textContent.trim().toLowerCase() : '');
        optimizedIcon.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        optimizedIcon.querySelector('img').alt = link ? link.textContent.trim() : '';
        a.append(optimizedIcon);
        moveInstrumentation(icon, optimizedIcon);
      }
    }
    li.append(a);
    moveInstrumentation(link, a);
    moveInstrumentation(platform, a);
    moveInstrumentation(socialItem, li);
    socialList.append(li);
  });
  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const copyrightListItem = document.createElement('li');
  copyrightListItem.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  copyrightListItem.append(itcPortalLink);
  copyrightList.append(copyrightListItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.setAttribute('data-aue-prop', 'copyright');
  copyrightSpan.textContent = copyright ? copyright.textContent.trim() : '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  moveInstrumentation(copyright, copyrightSpan);
  copyrightSection.append(copyrightDiv);

  secondaryContent.append(copyrightSection);
  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);
  footerBrand.append(footerBrandSecondary);
  aside.append(footerBrand);

  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);
  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}