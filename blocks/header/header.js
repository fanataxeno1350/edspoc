import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.id = 'container-e9226c8e5e';
  headerContainer.className = 'header-container';

  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper layout-container transparent-header';
  headerContainer.append(headerWrapper);

  const headerNavigation = document.createElement('div');
  headerNavigation.className = 'header-navigation';
  headerWrapper.append(headerNavigation);

  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  headerNavigation.append(navigationWrapper);

  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.className = 'navigation-wrapper__logo';
  navigationWrapper.append(navigationWrapperLogo);

  const logoLink = block.querySelector(':scope > div:first-child > div:first-child a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = '_self';
    newLogoLink.innerHTML = `
      <span class="header-qd-icon header-qd-icon--logo header-qd-logo">
        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span>
      </span>
    `;
    moveInstrumentation(logoLink, newLogoLink);
    navigationWrapperLogo.append(newLogoLink);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsLink = block.querySelector(':scope > div:first-child > div:nth-child(2) a');
  if (contactUsLink) {
    const newContactUsLink = document.createElement('a');
    newContactUsLink.href = contactUsLink.href;
    newContactUsLink.className = 'header-cta header-cta__ navigation--content__cta';
    newContactUsLink.target = '_self';
    newContactUsLink.setAttribute('aria-label', 'Contact Us');
    newContactUsLink.innerHTML = `
      <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
      <span class="header-cta__label">${contactUsLink.textContent.trim()}</span>
    `;
    moveInstrumentation(contactUsLink, newContactUsLink);
    navigationWrapperContactUsCta.append(newContactUsLink);
  }

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.className = 'navigation-wrapper__icon';
  navigationWrapperIcon.id = 'navigation-toggle';
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.className = 'header-hamburger-ellipse';
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  headerHamburgerEllipse.innerHTML = `
    <span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span>
    <span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>
  `;
  navigationWrapperIcon.append(headerHamburgerEllipse);

  const navbarDesktop = document.createElement('nav');
  navbarDesktop.className = 'navigation-wrapper__navbar';
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarDesktop);

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.className = 'navigation-wrapper__navbar-list';
  navbarDesktop.append(navbarDesktopList);

  const navMenuRows = Array.from(block.querySelectorAll(':scope > div:nth-child(3) > div'));
  navMenuRows.forEach((navMenuRow) => {
    const navMenu = document.createElement('li');
    navMenu.className = 'navigation-wrapper__navbar-menu';

    const menuLink = navMenuRow.querySelector('div:first-child a');
    if (menuLink) {
      const newMenuLink = document.createElement('a');
      newMenuLink.setAttribute('aria-haspopup', 'true');
      newMenuLink.setAttribute('aria-expanded', 'false');
      newMenuLink.className = 'navigation-wrapper__navbar-menulink';
      newMenuLink.target = '_self';
      newMenuLink.href = menuLink.href;
      newMenuLink.innerHTML = `
        <span>${menuLink.textContent.trim()}</span>
        <span class="header-qd-icon-wrapper">
          <span class="header-menu-icon header-qd-icon header-qd-icon--cheveron-down"></span>
        </span>
      `;
      moveInstrumentation(menuLink, newMenuLink);
      navMenu.append(newMenuLink);
    }

    const subMenuItemsWrapper = navMenuRow.querySelector('div:nth-child(2)');
    if (subMenuItemsWrapper) {
      const subMenu = document.createElement('ul');
      subMenu.className = 'navigation-wrapper__navbar-submenu';

      Array.from(subMenuItemsWrapper.children).forEach((subMenuItemRow) => {
        const subMenuItem = document.createElement('li');
        const subMenuItemLink = subMenuItemRow.querySelector('a');
        if (subMenuItemLink) {
          const newSubMenuItemLink = document.createElement('a');
          newSubMenuItemLink.setAttribute('aria-expanded', 'false');
          newSubMenuItemLink.target = '_self';
          newSubMenuItemLink.href = subMenuItemLink.href;
          newSubMenuItemLink.innerHTML = `<span>${subMenuItemLink.textContent.trim()}</span>`;
          moveInstrumentation(subMenuItemLink, newSubMenuItemLink);
          subMenuItem.append(newSubMenuItemLink);
        }
        subMenu.append(subMenuItem);
      });
      navMenu.append(subMenu);
    }
    navbarDesktopList.append(navMenu);
  });

  const desktopContactUsCta = document.createElement('a');
  desktopContactUsCta.href = '/contact/';
  desktopContactUsCta.className = 'header-cta header-cta__ navigation--content__cta';
  desktopContactUsCta.target = '_self';
  desktopContactUsCta.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
  desktopContactUsCta.innerHTML = `
    <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
    <span class="header-cta__label">Contact Us</span>
  `;
  navbarDesktop.append(desktopContactUsCta);

  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLanguageSelector.style.visibility = 'visible';
  navbarDesktop.append(desktopLanguageSelector);

  const desktopLanguageList = document.createElement('ul');
  desktopLanguageList.className = 'header-cmp-language-selector';
  desktopLanguageSelector.append(desktopLanguageList);

  const languageOptionRows = Array.from(block.querySelectorAll(':scope > div:last-child > div'));
  languageOptionRows.forEach((languageOptionRow, index) => {
    const languageOption = document.createElement('li');
    if (index === 0) {
      languageOption.className = 'active';
    }
    const languageLink = languageOptionRow.querySelector('a');
    if (languageLink) {
      const newLanguageLink = document.createElement('a');
      newLanguageLink.href = languageLink.href;
      newLanguageLink.setAttribute('aria-label', languageLink.textContent.trim());
      newLanguageLink.className = 'header-cmp-language-selector__link';
      newLanguageLink.setAttribute('data-lang', languageLink.textContent.trim().toLowerCase() === 'english' ? 'en' : 'ar');
      newLanguageLink.textContent = languageLink.textContent.trim();
      moveInstrumentation(languageLink, newLanguageLink);
      languageOption.append(newLanguageLink);
    }
    desktopLanguageList.append(languageOption);
  });

  const navbarMobile = document.createElement('nav');
  navbarMobile.className = 'navigation-wrapper__mobilenavbar';
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarMobile);

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.className = 'navigation-wrapper__mobilenavbar-list';
  navbarMobile.append(navbarMobileList);

  navMenuRows.forEach((navMenuRow) => {
    const mobileNavMenu = document.createElement('li');
    mobileNavMenu.className = 'navigation-wrapper__mobilenavbar-menu border';

    const menuLink = navMenuRow.querySelector('div:first-child a');
    if (menuLink) {
      const newMenuLink = document.createElement('a');
      newMenuLink.className = 'navigation-wrapper__mobilenavbar-menulink';
      newMenuLink.innerHTML = `
        <span>${menuLink.textContent.trim()}</span>
        <span class="header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon"></span>
      `;
      // No instrumentation move for mobile menu link as it's a new element not directly replacing authored content
      mobileNavMenu.append(newMenuLink);
    }

    const subMenuItemsWrapper = navMenuRow.querySelector('div:nth-child(2)');
    if (subMenuItemsWrapper) {
      const mobileSubMenu = document.createElement('ul');
      mobileSubMenu.className = 'navigation-wrapper__mobilenavbar-submenu';

      const mobileSubMenuHeader = document.createElement('li');
      mobileSubMenuHeader.className = 'navigation-wrapper__mobilenavbar-menuheader';
      mobileSubMenuHeader.innerHTML = `<a><span>${menuLink.textContent.trim()}</span></a>`;
      mobileSubMenu.append(mobileSubMenuHeader);

      Array.from(subMenuItemsWrapper.children).forEach((subMenuItemRow) => {
        const mobileSubMenuItem = document.createElement('li');
        mobileSubMenuItem.className = 'navigation-wrapper__mobilenavbar-menu';
        const subMenuItemLink = subMenuItemRow.querySelector('a');
        if (subMenuItemLink) {
          const newSubMenuItemLink = document.createElement('a');
          newSubMenuItemLink.className = 'navigation-wrapper__mobilenavbar-menulink';
          newSubMenuItemLink.target = '_self';
          newSubMenuItemLink.href = subMenuItemLink.href;
          newSubMenuItemLink.innerHTML = `<span>${subMenuItemLink.textContent.trim()}</span>`;
          // No instrumentation move for mobile submenu item link as it's a new element not directly replacing authored content
          mobileSubMenuItem.append(newSubMenuItemLink);
        }
        mobileSubMenu.append(mobileSubMenuItem);
      });
      mobileNavMenu.append(mobileSubMenu);
    }
    navbarMobileList.append(mobileNavMenu);
  });

  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  mobileNavBack.innerHTML = `
    <a class="navigation-wrapper__icon">
      <span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span>
    </a>
    <span class="navigation-wrapper__iconlabel">Back</span>
  `;
  navbarMobile.append(mobileNavBack);

  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLanguageSelector.style.visibility = 'visible';
  navbarMobile.append(mobileLanguageSelector);

  const mobileLanguageList = document.createElement('ul');
  mobileLanguageList.className = 'header-cmp-language-selector';
  mobileLanguageSelector.append(mobileLanguageList);

  languageOptionRows.forEach((languageOptionRow, index) => {
    const languageOption = document.createElement('li');
    if (index === 0) {
      languageOption.className = 'active';
    }
    const languageLink = languageOptionRow.querySelector('a');
    if (languageLink) {
      const newLanguageLink = document.createElement('a');
      newLanguageLink.href = languageLink.href;
      newLanguageLink.setAttribute('aria-label', languageLink.textContent.trim());
      newLanguageLink.className = 'header-cmp-language-selector__link';
      newLanguageLink.setAttribute('data-lang', languageLink.textContent.trim().toLowerCase() === 'english' ? 'en' : 'ar');
      newLanguageLink.textContent = languageLink.textContent.trim();
      // No instrumentation move for mobile language link as it's a new element not directly replacing authored content
      languageOption.append(newLanguageLink);
    }
    mobileLanguageList.append(languageOption);
  });

  block.textContent = '';
  block.append(headerContainer);
}
