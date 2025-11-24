import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.id = 'container-e9226c8e5e';
  mainDiv.className = 'header-container';

  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper layout-container transparent-header';
  mainDiv.append(headerWrapper);

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

  // Logo Link
  const logoLinkElement = block.querySelector('.navigation-wrapper__logo > a');
  if (logoLinkElement) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLinkElement.href;
    newLogoLink.target = logoLinkElement.target;
    newLogoLink.innerHTML = logoLinkElement.innerHTML;
    moveInstrumentation(logoLinkElement, newLogoLink);
    navigationWrapperLogo.append(newLogoLink);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  // Contact Us Link and Label
  const contactUsLinkElement = block.querySelector('.navigation-wrapper__contactUs-cta > a');
  if (contactUsLinkElement) {
    const newContactUsLink = document.createElement('a');
    newContactUsLink.href = contactUsLinkElement.href;
    newContactUsLink.className = 'header-cta header-cta__ navigation--content__cta';
    newContactUsLink.target = contactUsLinkElement.target;
    newContactUsLink.setAttribute('aria-label', contactUsLinkElement.getAttribute('aria-label'));
    newContactUsLink.innerHTML = contactUsLinkElement.innerHTML;
    moveInstrumentation(contactUsLinkElement, newContactUsLink);
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

  // Desktop Navigation
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.className = 'navigation-wrapper__navbar';
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarDesktop);

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.className = 'navigation-wrapper__navbar-list';
  navbarDesktop.append(navbarDesktopList);

  // Header Menus (Desktop)
  const desktopMenus = block.querySelectorAll('#navbar-desktop > .navigation-wrapper__navbar-list > .navigation-wrapper__navbar-menu');
  desktopMenus.forEach((menuElement) => {
    const newMenuLi = document.createElement('li');
    newMenuLi.className = 'navigation-wrapper__navbar-menu';

    const menuLink = menuElement.querySelector('a.navigation-wrapper__navbar-menulink');
    if (menuLink) {
      const newMenuLink = document.createElement('a');
      newMenuLink.setAttribute('aria-haspopup', menuLink.getAttribute('aria-haspopup'));
      newMenuLink.setAttribute('aria-expanded', menuLink.getAttribute('aria-expanded'));
      newMenuLink.className = menuLink.className;
      newMenuLink.target = menuLink.target;
      newMenuLink.href = menuLink.href;
      newMenuLink.innerHTML = menuLink.innerHTML;
      moveInstrumentation(menuLink, newMenuLink);
      newMenuLi.append(newMenuLink);
    }

    const subMenuUl = menuElement.querySelector('.navigation-wrapper__navbar-submenu');
    if (subMenuUl) {
      const newSubMenuUl = document.createElement('ul');
      newSubMenuUl.className = 'navigation-wrapper__navbar-submenu';
      const subMenuItems = subMenuUl.querySelectorAll('li > a');
      subMenuItems.forEach((subMenuItem) => {
        const newSubMenuLi = document.createElement('li');
        const newSubMenuLink = document.createElement('a');
        newSubMenuLink.setAttribute('aria-expanded', subMenuItem.getAttribute('aria-expanded'));
        newSubMenuLink.target = subMenuItem.target;
        newSubMenuLink.href = subMenuItem.href;
        newSubMenuLink.innerHTML = subMenuItem.innerHTML;
        moveInstrumentation(subMenuItem, newSubMenuLink);
        newSubMenuLi.append(newSubMenuLink);
        newSubMenuUl.append(newSubMenuLi);
      });
      newMenuLi.append(newSubMenuUl);
    }
    navbarDesktopList.append(newMenuLi);
  });

  // Desktop Contact Us CTA (duplicate of above, but inside navbar)
  const desktopContactUsCta = block.querySelector('#navbar-desktop > a.header-cta');
  if (desktopContactUsCta) {
    const newDesktopContactUsCta = document.createElement('a');
    newDesktopContactUsCta.href = desktopContactUsCta.href;
    newDesktopContactUsCta.className = desktopContactUsCta.className;
    newDesktopContactUsCta.target = desktopContactUsCta.target;
    newDesktopContactUsCta.setAttribute('aria-label', desktopContactUsCta.getAttribute('aria-label'));
    newDesktopContactUsCta.innerHTML = desktopContactUsCta.innerHTML;
    moveInstrumentation(desktopContactUsCta, newDesktopContactUsCta);
    navbarDesktop.append(newDesktopContactUsCta);
  }

  // Language Options (Desktop)
  const desktopLanguageSelector = block.querySelector('#navbar-desktop .header-language-selector');
  if (desktopLanguageSelector) {
    const newDesktopLanguageSelector = document.createElement('div');
    newDesktopLanguageSelector.className = desktopLanguageSelector.className;
    newDesktopLanguageSelector.style.visibility = desktopLanguageSelector.style.visibility;

    const newDesktopLangUl = document.createElement('ul');
    newDesktopLangUl.className = 'header-cmp-language-selector';

    const desktopLangOptions = desktopLanguageSelector.querySelectorAll('li > a');
    desktopLangOptions.forEach((langOption) => {
      const newLangLi = document.createElement('li');
      if (langOption.parentElement.classList.contains('active')) {
        newLangLi.classList.add('active');
      }
      const newLangLink = document.createElement('a');
      newLangLink.href = langOption.href;
      newLangLink.setAttribute('aria-label', langOption.getAttribute('aria-label'));
      newLangLink.className = langOption.className;
      newLangLink.setAttribute('data-lang', langOption.getAttribute('data-lang'));
      newLangLink.textContent = langOption.textContent;
      moveInstrumentation(langOption, newLangLink);
      newLangLi.append(newLangLink);
      newDesktopLangUl.append(newLangLi);
    });
    newDesktopLanguageSelector.append(newDesktopLangUl);
    navbarDesktop.append(newDesktopLanguageSelector);
  }

  // Mobile Navigation
  const navbarMobile = document.createElement('nav');
  navbarMobile.className = 'navigation-wrapper__mobilenavbar';
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarMobile);

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.className = 'navigation-wrapper__mobilenavbar-list';
  navbarMobile.append(navbarMobileList);

  // Header Menus (Mobile)
  const mobileMenus = block.querySelectorAll('#navbar-mobile > .navigation-wrapper__mobilenavbar-list > .navigation-wrapper__mobilenavbar-menu');
  mobileMenus.forEach((menuElement) => {
    const newMenuLi = document.createElement('li');
    newMenuLi.className = menuElement.className;
    if (menuElement.classList.contains('border')) {
      newMenuLi.classList.add('border');
    }

    const menuLink = menuElement.querySelector('a.navigation-wrapper__mobilenavbar-menulink');
    if (menuLink) {
      const newMenuLink = document.createElement('a');
      newMenuLink.className = menuLink.className;
      newMenuLink.innerHTML = menuLink.innerHTML;
      moveInstrumentation(menuLink, newMenuLink);
      newMenuLi.append(newMenuLink);
    }

    const subMenuUl = menuElement.querySelector('.navigation-wrapper__mobilenavbar-submenu');
    if (subMenuUl) {
      const newSubMenuUl = document.createElement('ul');
      newSubMenuUl.className = 'navigation-wrapper__mobilenavbar-submenu';

      const subMenuHeader = subMenuUl.querySelector('.navigation-wrapper__mobilenavbar-menuheader > a');
      if (subMenuHeader) {
        const newSubMenuHeaderLi = document.createElement('li');
        newSubMenuHeaderLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
        const newSubMenuHeaderLink = document.createElement('a');
        newSubMenuHeaderLink.innerHTML = subMenuHeader.innerHTML;
        moveInstrumentation(subMenuHeader, newSubMenuHeaderLink);
        newSubMenuHeaderLi.append(newSubMenuHeaderLink);
        newSubMenuUl.append(newSubMenuHeaderLi);
      }

      const subMenuItems = subMenuUl.querySelectorAll('.navigation-wrapper__mobilenavbar-menu > a');
      subMenuItems.forEach((subMenuItem) => {
        const newSubMenuLi = document.createElement('li');
        newSubMenuLi.className = 'navigation-wrapper__mobilenavbar-menu';
        const newSubMenuLink = document.createElement('a');
        newSubMenuLink.className = subMenuItem.className;
        newSubMenuLink.target = subMenuItem.target;
        newSubMenuLink.href = subMenuItem.href;
        newSubMenuLink.innerHTML = subMenuItem.innerHTML;
        moveInstrumentation(subMenuItem, newSubMenuLink);
        newSubMenuLi.append(newSubMenuLink);
        newSubMenuUl.append(newSubMenuLi);
      });
      newMenuLi.append(newSubMenuUl);
    }
    navbarMobileList.append(newMenuLi);
  });

  const mobileNavbarBack = document.createElement('div');
  mobileNavbarBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  mobileNavbarBack.innerHTML = `
    <a class="navigation-wrapper__icon">
      <span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span>
    </a>
    <span class="navigation-wrapper__iconlabel">Back</span>
  `;
  navbarMobile.append(mobileNavbarBack);

  // Language Options (Mobile)
  const mobileLanguageSelector = block.querySelector('#navbar-mobile .header-language-selector');
  if (mobileLanguageSelector) {
    const newMobileLanguageSelector = document.createElement('div');
    newMobileLanguageSelector.className = mobileLanguageSelector.className;
    newMobileLanguageSelector.style.visibility = mobileLanguageSelector.style.visibility;

    const newMobileLangUl = document.createElement('ul');
    newMobileLangUl.className = 'header-cmp-language-selector';

    const mobileLangOptions = mobileLanguageSelector.querySelectorAll('li > a');
    mobileLangOptions.forEach((langOption) => {
      const newLangLi = document.createElement('li');
      if (langOption.parentElement.classList.contains('active')) {
        newLangLi.classList.add('active');
      }
      const newLangLink = document.createElement('a');
      newLangLink.href = langOption.href;
      newLangLink.setAttribute('aria-label', langOption.getAttribute('aria-label'));
      newLangLink.className = langOption.className;
      newLangLink.setAttribute('data-lang', langOption.getAttribute('data-lang'));
      newLangLink.textContent = langOption.textContent;
      moveInstrumentation(langOption, newLangLink);
      newLangLi.append(newLangLink);
      newMobileLangUl.append(newLangLi);
    });
    newMobileLanguageSelector.append(newMobileLangUl);
    navbarMobile.append(newMobileLanguageSelector);
  }

  block.textContent = '';
  block.append(mainDiv);
}
