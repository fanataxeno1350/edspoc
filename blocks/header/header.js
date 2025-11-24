import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerJson = block.querySelector('.header.block-json');
  const headerData = headerJson ? JSON.parse(headerJson.textContent) : {};

  const container = document.createElement('div');
  container.id = 'container-e9226c8e5e';
  container.classList.add('header-container');

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper', 'layout-container', 'transparent-header');

  const headerNavigation = document.createElement('div');
  headerNavigation.classList.add('header-navigation');

  const navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('navigation-wrapper');
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');

  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.classList.add('navigation-wrapper__logo');

  const logoLink = document.createElement('a');
  logoLink.href = headerData.logoLink || '/';
  logoLink.target = '_self';
  const logoImageSpan = document.createElement('span');
  logoImageSpan.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
  for (let i = 1; i <= 25; i += 1) {
    const pathSpan = document.createElement('span');
    pathSpan.classList.add(`path${i}`);
    logoImageSpan.append(pathSpan);
  }
  logoLink.append(logoImageSpan);
  navigationWrapperLogo.append(logoLink);

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.classList.add('navigation-wrapper__contactUs-cta');

  const contactUsCta = document.createElement('a');
  contactUsCta.href = headerData.contactUsLink || '/contact/';
  contactUsCta.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
  contactUsCta.target = '_self';
  contactUsCta.setAttribute('aria-label', 'Contact Us');

  const contactUsIcon = document.createElement('span');
  contactUsIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  contactUsIcon.setAttribute('aria-hidden', 'true');
  contactUsCta.append(contactUsIcon);

  const contactUsLabel = document.createElement('span');
  contactUsLabel.classList.add('header-cta__label');
  contactUsLabel.innerHTML = headerData.contactUsText || 'Contact Us';
  contactUsCta.append(contactUsLabel);
  navigationWrapperContactUsCta.append(contactUsCta);

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.classList.add('navigation-wrapper__icon');
  navigationWrapperIcon.id = 'navigation-toggle';

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.classList.add('header-hamburger-ellipse');
  headerHamburgerEllipse.setAttribute('tabindex', '0');

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('header-hamburger-icon', 'header-qd-icon', 'header-qd-icon--hamburger');
  headerHamburgerEllipse.append(hamburgerIcon);

  const closeIcon = document.createElement('span');
  closeIcon.classList.add('header-close-icon', 'header-qd-icon', 'header-qd-icon--cancel');
  headerHamburgerEllipse.append(closeIcon);
  navigationWrapperIcon.append(headerHamburgerEllipse);
  navigationWrapperContactUsCta.append(navigationWrapperIcon);
  navigationWrapperLogo.append(navigationWrapperContactUsCta);
  navigationWrapper.append(navigationWrapperLogo);

  const navbarDesktop = document.createElement('nav');
  navbarDesktop.classList.add('navigation-wrapper__navbar');
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.classList.add('navigation-wrapper__navbar-list');

  (headerData.menu || []).forEach((menuItem) => {
    const navMenu = document.createElement('li');
    navMenu.classList.add('navigation-wrapper__navbar-menu');

    const menuLink = document.createElement('a');
    menuLink.setAttribute('aria-haspopup', 'true');
    menuLink.setAttribute('aria-expanded', 'false');
    menuLink.classList.add('navigation-wrapper__navbar-menulink');
    menuLink.target = '_self';
    menuLink.href = menuItem.link || '#';

    const menuLinkSpan = document.createElement('span');
    menuLinkSpan.innerHTML = menuItem.title;
    menuLink.append(menuLinkSpan);

    const iconWrapper = document.createElement('span');
    iconWrapper.classList.add('header-qd-icon-wrapper');
    const menuIcon = document.createElement('span');
    menuIcon.classList.add('header-menu-icon', 'header-qd-icon', 'header-qd-icon--cheveron-down');
    iconWrapper.append(menuIcon);
    menuLink.append(iconWrapper);
    navMenu.append(menuLink);

    if (menuItem.submenu && menuItem.submenu.length > 0) {
      const submenu = document.createElement('ul');
      submenu.classList.add('navigation-wrapper__navbar-submenu');
      (menuItem.submenu).forEach((subItem) => {
        const subMenuItem = document.createElement('li');
        const subMenuLink = document.createElement('a');
        subMenuLink.setAttribute('aria-expanded', 'false');
        subMenuLink.target = '_self';
        subMenuLink.href = subItem.link || '#';
        const subMenuLinkSpan = document.createElement('span');
        subMenuLinkSpan.innerHTML = subItem.text;
        subMenuLink.append(subMenuLinkSpan);
        subMenuItem.append(subMenuLink);
        submenu.append(subMenuItem);
      });
      navMenu.append(submenu);
    }
    navbarDesktopList.append(navMenu);
  });
  navbarDesktop.append(navbarDesktopList);

  const desktopContactUsCta = document.createElement('a');
  desktopContactUsCta.href = '/contact/';
  desktopContactUsCta.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
  desktopContactUsCta.target = '_self';
  desktopContactUsCta.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');

  const desktopContactUsIcon = document.createElement('span');
  desktopContactUsIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  desktopContactUsIcon.setAttribute('aria-hidden', 'true');
  desktopContactUsCta.append(desktopContactUsIcon);

  const desktopContactUsLabel = document.createElement('span');
  desktopContactUsLabel.classList.add('header-cta__label');
  desktopContactUsLabel.innerHTML = 'Contact Us';
  desktopContactUsCta.append(desktopContactUsLabel);
  navbarDesktop.append(desktopContactUsCta);

  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  desktopLanguageSelector.style.visibility = 'visible';

  const desktopLanguageList = document.createElement('ul');
  desktopLanguageList.classList.add('header-cmp-language-selector');
  (headerData.languages || []).forEach((langItem, index) => {
    const langLi = document.createElement('li');
    if (index === 0) {
      langLi.classList.add('active');
    }
    const langLink = document.createElement('a');
    langLink.href = langItem.link || '#';
    langLink.setAttribute('aria-label', langItem.language);
    langLink.classList.add('header-cmp-language-selector__link');
    langLink.setAttribute('data-lang', langItem.language === 'English' ? 'en' : 'ar');
    langLink.innerHTML = langItem.language;
    langLi.append(langLink);
    desktopLanguageList.append(langLi);
  });
  desktopLanguageSelector.append(desktopLanguageList);
  navbarDesktop.append(desktopLanguageSelector);
  navigationWrapper.append(navbarDesktop);

  const navbarMobile = document.createElement('nav');
  navbarMobile.classList.add('navigation-wrapper__mobilenavbar');
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.classList.add('navigation-wrapper__mobilenavbar-list');

  (headerData.mobileMenu || []).forEach((menuItem) => {
    const mobileNavMenu = document.createElement('li');
    mobileNavMenu.classList.add('navigation-wrapper__mobilenavbar-menu', 'border');

    const mobileMenuLink = document.createElement('a');
    mobileMenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');

    const mobileMenuLinkSpan = document.createElement('span');
    mobileMenuLinkSpan.innerHTML = menuItem.title;
    mobileMenuLink.append(mobileMenuLinkSpan);

    const mobileMenuLinkIcon = document.createElement('span');
    mobileMenuLinkIcon.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'navigation-wrapper__mobilenavbar-menulink-icon');
    mobileMenuLink.append(mobileMenuLinkIcon);
    mobileNavMenu.append(mobileMenuLink);

    if (menuItem.submenu && menuItem.submenu.length > 0) {
      const mobileSubmenu = document.createElement('ul');
      mobileSubmenu.classList.add('navigation-wrapper__mobilenavbar-submenu');

      const mobileSubmenuHeader = document.createElement('li');
      mobileSubmenuHeader.classList.add('navigation-wrapper__mobilenavbar-menuheader');
      const mobileSubmenuHeaderLink = document.createElement('a');
      const mobileSubmenuHeaderSpan = document.createElement('span');
      mobileSubmenuHeaderSpan.innerHTML = menuItem.title;
      mobileSubmenuHeaderLink.append(mobileSubmenuHeaderSpan);
      mobileSubmenuHeader.append(mobileSubmenuHeaderLink);
      mobileSubmenu.append(mobileSubmenuHeader);

      (menuItem.submenu).forEach((subItem) => {
        const mobileSubMenuItem = document.createElement('li');
        mobileSubMenuItem.classList.add('navigation-wrapper__mobilenavbar-menu');
        const mobileSubMenuLink = document.createElement('a');
        mobileSubMenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');
        mobileSubMenuLink.target = '_self';
        mobileSubMenuLink.href = subItem.link || '#';
        const mobileSubMenuLinkSpan = document.createElement('span');
        mobileSubMenuLinkSpan.innerHTML = subItem.text;
        mobileSubMenuLink.append(mobileSubMenuLinkSpan);
        mobileSubMenuItem.append(mobileSubMenuLink);
        mobileSubmenu.append(mobileSubMenuItem);
      });
      mobileNavMenu.append(mobileSubmenu);
    }
    navbarMobileList.append(mobileNavMenu);
  });
  navbarMobile.append(navbarMobileList);

  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');

  const mobileNavBackIconWrapper = document.createElement('a');
  mobileNavBackIconWrapper.classList.add('navigation-wrapper__icon');
  const mobileNavBackIcon = document.createElement('span');
  mobileNavBackIcon.classList.add('header-back-icon', 'header-qd-icon', 'header-qd-icon--cheveron-left');
  mobileNavBackIconWrapper.append(mobileNavBackIcon);
  mobileNavBack.append(mobileNavBackIconWrapper);

  const mobileNavBackLabel = document.createElement('span');
  mobileNavBackLabel.classList.add('navigation-wrapper__iconlabel');
  mobileNavBackLabel.innerHTML = 'Back';
  mobileNavBack.append(mobileNavBackLabel);
  navbarMobile.append(mobileNavBack);

  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  mobileLanguageSelector.style.visibility = 'visible';

  const mobileLanguageList = document.createElement('ul');
  mobileLanguageList.classList.add('header-cmp-language-selector');
  (headerData.languages || []).forEach((langItem, index) => {
    const langLi = document.createElement('li');
    if (index === 0) {
      langLi.classList.add('active');
    }
    const langLink = document.createElement('a');
    langLink.href = langItem.link || '#';
    langLink.setAttribute('aria-label', langItem.language);
    langLink.classList.add('header-cmp-language-selector__link');
    langLink.setAttribute('data-lang', langItem.language === 'English' ? 'en' : 'ar');
    langLink.innerHTML = langItem.language;
    langLi.append(langLink);
    mobileLanguageList.append(langLi);
  });
  mobileLanguageSelector.append(mobileLanguageList);
  navbarMobile.append(mobileLanguageSelector);
  navigationWrapper.append(navbarMobile);

  headerNavigation.append(navigationWrapper);
  headerWrapper.append(headerNavigation);
  container.append(headerWrapper);

  block.textContent = '';
  block.append(container);

  moveInstrumentation(block, container);
}