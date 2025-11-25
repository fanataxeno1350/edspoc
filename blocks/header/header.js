import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = block.dataset.blockName;

  // Step 1: Extract authored content
  const logoLinkEl = block.querySelector('[data-aue-prop="logoLink"]');
  const contactUsLinkEl = block.querySelector('[data-aue-prop="contactUsLink"]');
  const navigationMenus = block.querySelectorAll('[data-aue-model="navigationMenu"]');
  const languageOptions = block.querySelectorAll('[data-aue-model="languageOption"]');

  // Step 2: Build the new DOM structure
  const container = document.createElement('div');
  container.id = 'container-e9226c8e5e';
  container.className = 'header-container';

  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper layout-container transparent-header';
  container.append(headerWrapper);

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

  const logoAnchor = document.createElement('a');
  logoAnchor.target = '_self';
  if (logoLinkEl) {
    logoAnchor.href = logoLinkEl.href;
    moveInstrumentation(logoLinkEl, logoAnchor);
  } else {
    logoAnchor.href = '/'; // Default if not authored
  }
  const logoSpan = document.createElement('span');
  logoSpan.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
  for (let i = 1; i <= 25; i += 1) {
    logoSpan.append(document.createElement('span')).className = `path${i}`;
  }
  logoAnchor.append(logoSpan);
  navigationWrapperLogo.append(logoAnchor);

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsCta = document.createElement('a');
  contactUsCta.className = 'header-cta header-cta__ navigation--content__cta';
  contactUsCta.target = '_self';
  contactUsCta.setAttribute('aria-label', 'Contact Us');
  if (contactUsLinkEl) {
    contactUsCta.href = contactUsLinkEl.href;
    moveInstrumentation(contactUsLinkEl, contactUsCta);
  } else {
    contactUsCta.href = '/contact/'; // Default if not authored
  }
  const contactUsIcon = document.createElement('span');
  contactUsIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  contactUsIcon.setAttribute('aria-hidden', 'true');
  contactUsCta.append(contactUsIcon);
  const contactUsLabel = document.createElement('span');
  contactUsLabel.className = 'header-cta__label';
  contactUsLabel.textContent = 'Contact Us';
  contactUsCta.append(contactUsLabel);
  navigationWrapperContactUsCta.append(contactUsCta);

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.className = 'navigation-wrapper__icon';
  navigationWrapperIcon.id = 'navigation-toggle';
  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.className = 'header-hamburger-ellipse';
  hamburgerEllipse.setAttribute('tabindex', '0');
  hamburgerEllipse.innerHTML = '<span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span><span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>';
  navigationWrapperIcon.append(hamburgerEllipse);
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

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

  navigationMenus.forEach((menu) => {
    const menuLabelEl = menu.querySelector('[data-aue-prop="label"]');
    const menuHrefEl = menu.querySelector('[data-aue-prop="href"]');
    const submenus = menu.querySelectorAll('[data-aue-model="navigationSubmenu"]');

    if (menuLabelEl && menuHrefEl) {
      // Desktop Menu Item
      const desktopMenuItem = document.createElement('li');
      desktopMenuItem.className = 'navigation-wrapper__navbar-menu';
      const desktopMenuLink = document.createElement('a');
      desktopMenuLink.setAttribute('aria-haspopup', 'true');
      desktopMenuLink.setAttribute('aria-expanded', 'false');
      desktopMenuLink.className = 'navigation-wrapper__navbar-menulink';
      desktopMenuLink.target = '_self';
      desktopMenuLink.href = menuHrefEl.href;
      moveInstrumentation(menuHrefEl, desktopMenuLink);
      const desktopMenuSpan = document.createElement('span');
      desktopMenuSpan.textContent = menuLabelEl.textContent;
      moveInstrumentation(menuLabelEl, desktopMenuSpan);
      desktopMenuLink.append(desktopMenuSpan);
      const desktopIconWrapper = document.createElement('span');
      desktopIconWrapper.className = 'header-qd-icon-wrapper';
      desktopIconWrapper.innerHTML = '<span class="header-menu-icon header-qd-icon header-qd-icon--cheveron-down"></span>';
      desktopMenuLink.append(desktopIconWrapper);
      desktopMenuItem.append(desktopMenuLink);

      if (submenus.length > 0) {
        const desktopSubmenuList = document.createElement('ul');
        desktopSubmenuList.className = 'navigation-wrapper__navbar-submenu';
        submenus.forEach((submenu) => {
          const submenuLabelEl = submenu.querySelector('[data-aue-prop="label"]');
          const submenuHrefEl = submenu.querySelector('[data-aue-prop="href"]');
          if (submenuLabelEl && submenuHrefEl) {
            const desktopSubmenuItem = document.createElement('li');
            const desktopSubmenuLink = document.createElement('a');
            desktopSubmenuLink.setAttribute('aria-expanded', 'false');
            desktopSubmenuLink.target = '_self';
            desktopSubmenuLink.href = submenuHrefEl.href;
            moveInstrumentation(submenuHrefEl, desktopSubmenuLink);
            const desktopSubmenuSpan = document.createElement('span');
            desktopSubmenuSpan.textContent = submenuLabelEl.textContent;
            moveInstrumentation(submenuLabelEl, desktopSubmenuSpan);
            desktopSubmenuLink.append(desktopSubmenuSpan);
            desktopSubmenuItem.append(desktopSubmenuLink);
            desktopSubmenuList.append(desktopSubmenuItem);
          }
        });
        desktopMenuItem.append(desktopSubmenuList);
      }
      navbarDesktopList.append(desktopMenuItem);

      // Mobile Menu Item
      const mobileMenuItem = document.createElement('li');
      mobileMenuItem.className = 'navigation-wrapper__mobilenavbar-menu border';
      const mobileMenuLink = document.createElement('a');
      mobileMenuLink.className = 'navigation-wrapper__mobilenavbar-menulink';
      const mobileMenuSpan = document.createElement('span');
      mobileMenuSpan.textContent = menuLabelEl.textContent;
      mobileMenuLink.append(mobileMenuSpan);
      const mobileMenuIcon = document.createElement('span');
      mobileMenuIcon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
      mobileMenuLink.append(mobileMenuIcon);
      mobileMenuItem.append(mobileMenuLink);

      if (submenus.length > 0) {
        const mobileSubmenuList = document.createElement('ul');
        mobileSubmenuList.className = 'navigation-wrapper__mobilenavbar-submenu';
        const mobileSubmenuHeader = document.createElement('li');
        mobileSubmenuHeader.className = 'navigation-wrapper__mobilenavbar-menuheader';
        const mobileSubmenuHeaderLink = document.createElement('a');
        mobileSubmenuHeaderLink.innerHTML = `<span>${menuLabelEl.textContent}</span>`;
        mobileSubmenuHeader.append(mobileSubmenuHeaderLink);
        mobileSubmenuList.append(mobileSubmenuHeader);

        submenus.forEach((submenu) => {
          const submenuLabelEl = submenu.querySelector('[data-aue-prop="label"]');
          const submenuHrefEl = submenu.querySelector('[data-aue-prop="href"]');
          if (submenuLabelEl && submenuHrefEl) {
            const mobileSubmenuItem = document.createElement('li');
            mobileSubmenuItem.className = 'navigation-wrapper__mobilenavbar-menu';
            const mobileSubmenuLink = document.createElement('a');
            mobileSubmenuLink.className = 'navigation-wrapper__mobilenavbar-menulink';
            mobileSubmenuLink.target = '_self';
            mobileSubmenuLink.href = submenuHrefEl.href;
            const mobileSubmenuSpan = document.createElement('span');
            mobileSubmenuSpan.textContent = submenuLabelEl.textContent;
            mobileSubmenuLink.append(mobileSubmenuSpan);
            mobileSubmenuItem.append(mobileSubmenuLink);
            mobileSubmenuList.append(mobileSubmenuItem);
          }
        });
        mobileMenuItem.append(mobileSubmenuList);
      } else {
        // If no submenus, the mobile menu item should link directly
        mobileMenuLink.href = menuHrefEl.href;
        mobileMenuLink.target = '_self';
      }
      navbarMobileList.append(mobileMenuItem);
    }
  });

  // Desktop Contact Us CTA (duplicate from above)
  const desktopContactUsCta = document.createElement('a');
  desktopContactUsCta.className = 'header-cta header-cta__ navigation--content__cta';
  desktopContactUsCta.target = '_self';
  desktopContactUsCta.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
  if (contactUsLinkEl) {
    desktopContactUsCta.href = contactUsLinkEl.href;
  } else {
    desktopContactUsCta.href = '/contact/';
  }
  desktopContactUsCta.innerHTML = '<span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span><span class="header-cta__label">Contact Us</span>';
  navbarDesktop.append(desktopContactUsCta);

  // Language Selectors (Desktop)
  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLanguageSelector.style.visibility = 'visible';
  const desktopLanguageList = document.createElement('ul');
  desktopLanguageList.className = 'header-cmp-language-selector';
  languageOptions.forEach((langOption) => {
    const langLabelEl = langOption.querySelector('[data-aue-prop="label"]');
    const langHrefEl = langOption.querySelector('[data-aue-prop="href"]');
    const langCodeEl = langOption.querySelector('[data-aue-prop="langCode"]');

    if (langLabelEl && langHrefEl && langCodeEl) {
      const langItem = document.createElement('li');
      if (langCodeEl.textContent === 'en') {
        langItem.className = 'active';
      }
      const langLink = document.createElement('a');
      langLink.href = langHrefEl.href;
      moveInstrumentation(langHrefEl, langLink);
      langLink.setAttribute('aria-label', langLabelEl.textContent);
      langLink.className = 'header-cmp-language-selector__link';
      langLink.dataset.lang = langCodeEl.textContent;
      moveInstrumentation(langCodeEl, langLink);
      langLink.textContent = langLabelEl.textContent;
      moveInstrumentation(langLabelEl, langLink);
      langItem.append(langLink);
      desktopLanguageList.append(langItem);
    }
  });
  desktopLanguageSelector.append(desktopLanguageList);
  navbarDesktop.append(desktopLanguageSelector);

  // Mobile Navigation Back button
  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  mobileNavBack.innerHTML = '<a class="navigation-wrapper__icon"><span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span></a><span class="navigation-wrapper__iconlabel">Back</span>';
  navbarMobile.append(mobileNavBack);

  // Language Selectors (Mobile)
  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLanguageSelector.style.visibility = 'visible';
  const mobileLanguageList = document.createElement('ul');
  mobileLanguageList.className = 'header-cmp-language-selector';
  languageOptions.forEach((langOption) => {
    const langLabelEl = langOption.querySelector('[data-aue-prop="label"]');
    const langHrefEl = langOption.querySelector('[data-aue-prop="href"]');
    const langCodeEl = langOption.querySelector('[data-aue-prop="langCode"]');

    if (langLabelEl && langHrefEl && langCodeEl) {
      const langItem = document.createElement('li');
      if (langCodeEl.textContent === 'en') {
        langItem.className = 'active';
      }
      const langLink = document.createElement('a');
      langLink.href = langHrefEl.href;
      langLink.setAttribute('aria-label', langLabelEl.textContent);
      langLink.className = 'header-cmp-language-selector__link';
      langLink.dataset.lang = langCodeEl.textContent;
      langLink.textContent = langLabelEl.textContent;
      langItem.append(langLink);
      mobileLanguageList.append(langItem);
    }
  });
  mobileLanguageSelector.append(mobileLanguageList);
  navbarMobile.append(mobileLanguageSelector);

  // Step 3: Replace block content and restore identity
  block.textContent = '';
  block.append(container);
  block.className = `${blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
