import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
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

  // Logo Link
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoAnchor = document.createElement('a');
  logoAnchor.href = logoLink ? logoLink.textContent.trim() : '/';
  logoAnchor.target = '_self';
  const logoSpan = document.createElement('span');
  logoSpan.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
  for (let i = 1; i <= 25; i += 1) {
    logoSpan.append(document.createElement('span')).className = `path${i}`;
  }
  logoAnchor.append(logoSpan);
  navigationWrapperLogo.append(logoAnchor);
  if (logoLink) moveInstrumentation(logoLink, logoAnchor);

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  // Contact Us Link
  const contactUsLink = block.querySelector('[data-aue-prop="contactUsLink"]');
  const contactUsAnchor = document.createElement('a');
  contactUsAnchor.href = contactUsLink ? contactUsLink.textContent.trim() : '/contact/';
  contactUsAnchor.className = 'header-cta header-cta__ navigation--content__cta';
  contactUsAnchor.target = '_self';
  contactUsAnchor.setAttribute('aria-label', 'Contact Us');
  const contactUsIconSpan = document.createElement('span');
  contactUsIconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  contactUsIconSpan.setAttribute('aria-hidden', 'true');
  contactUsAnchor.append(contactUsIconSpan);
  const contactUsLabelSpan = document.createElement('span');
  contactUsLabelSpan.className = 'header-cta__label';
  contactUsLabelSpan.textContent = 'Contact Us';
  contactUsAnchor.append(contactUsLabelSpan);
  navigationWrapperContactUsCta.append(contactUsAnchor);
  if (contactUsLink) moveInstrumentation(contactUsLink, contactUsAnchor);

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.className = 'navigation-wrapper__icon';
  navigationWrapperIcon.id = 'navigation-toggle';
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.className = 'header-hamburger-ellipse';
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  navigationWrapperIcon.append(headerHamburgerEllipse);

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.className = 'header-hamburger-icon header-qd-icon header-qd-icon--hamburger';
  headerHamburgerEllipse.append(hamburgerIcon);

  const closeIcon = document.createElement('span');
  closeIcon.className = 'header-close-icon header-qd-icon header-qd-icon--cancel';
  headerHamburgerEllipse.append(closeIcon);

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

  const navigationMenus = block.querySelectorAll('[data-aue-model="navigationMenu"]');
  navigationMenus.forEach((menu) => {
    const menuLabel = menu.querySelector('[data-aue-prop="label"]');
    const menuLink = menu.querySelector('[data-aue-prop="link"]');

    const li = document.createElement('li');
    li.className = 'navigation-wrapper__navbar-menu';

    const a = document.createElement('a');
    a.setAttribute('aria-haspopup', 'true');
    a.setAttribute('aria-expanded', 'false');
    a.className = 'navigation-wrapper__navbar-menulink';
    a.target = '_self';
    a.href = menuLink ? menuLink.textContent.trim() : '#';
    const spanLabel = document.createElement('span');
    if (menuLabel) {
      spanLabel.append(...menuLabel.childNodes);
      moveInstrumentation(menuLabel, spanLabel);
    }
    a.append(spanLabel);
    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'header-qd-icon-wrapper';
    const menuIcon = document.createElement('span');
    menuIcon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
    iconWrapper.append(menuIcon);
    a.append(iconWrapper);
    li.append(a);
    if (menuLink) moveInstrumentation(menuLink, a);

    const submenuItems = menu.querySelectorAll('[data-aue-model="submenuItem"]');
    if (submenuItems.length > 0) {
      const submenuUl = document.createElement('ul');
      submenuUl.className = 'navigation-wrapper__navbar-submenu';
      submenuItems.forEach((subItem) => {
        const subLabel = subItem.querySelector('[data-aue-prop="label"]');
        const subLink = subItem.querySelector('[data-aue-prop="link"]');

        const subLi = document.createElement('li');
        const subA = document.createElement('a');
        subA.setAttribute('aria-expanded', 'false');
        subA.target = '_self';
        subA.href = subLink ? subLink.textContent.trim() : '#';
        const subSpan = document.createElement('span');
        if (subLabel) {
          subSpan.append(...subLabel.childNodes);
          moveInstrumentation(subLabel, subSpan);
        }
        subA.append(subSpan);
        subLi.append(subA);
        submenuUl.append(subLi);
        if (subLink) moveInstrumentation(subLink, subA);
      });
      li.append(submenuUl);
    }
    navbarDesktopList.append(li);
  });

  // Desktop Contact Us CTA (duplicate from above, but with different aria-label)
  const desktopContactUsAnchor = document.createElement('a');
  desktopContactUsAnchor.href = contactUsLink ? contactUsLink.textContent.trim() : '/contact/';
  desktopContactUsAnchor.className = 'header-cta header-cta__ navigation--content__cta';
  desktopContactUsAnchor.target = '_self';
  desktopContactUsAnchor.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
  const desktopContactUsIconSpan = document.createElement('span');
  desktopContactUsIconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  desktopContactUsIconSpan.setAttribute('aria-hidden', 'true');
  desktopContactUsAnchor.append(desktopContactUsIconSpan);
  const desktopContactUsLabelSpan = document.createElement('span');
  desktopContactUsLabelSpan.className = 'header-cta__label';
  desktopContactUsLabelSpan.textContent = 'Contact Us';
  desktopContactUsAnchor.append(desktopContactUsLabelSpan);
  navbarDesktop.append(desktopContactUsAnchor);
  if (contactUsLink) moveInstrumentation(contactUsLink, desktopContactUsAnchor);

  // Language Selector (Desktop)
  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLanguageSelector.style.visibility = 'visible';
  navbarDesktop.append(desktopLanguageSelector);

  const desktopLanguageUl = document.createElement('ul');
  desktopLanguageUl.className = 'header-cmp-language-selector';
  desktopLanguageSelector.append(desktopLanguageUl);

  const languageOptions = block.querySelectorAll('[data-aue-model="languageOption"]');
  languageOptions.forEach((langOption, index) => {
    const langLabel = langOption.querySelector('[data-aue-prop="label"]');
    const langLink = langOption.querySelector('[data-aue-prop="link"]');

    const langLi = document.createElement('li');
    if (index === 0) {
      langLi.className = 'active';
    }
    const langA = document.createElement('a');
    langA.href = langLink ? langLink.textContent.trim() : '#';
    langA.setAttribute('aria-label', langLabel ? langLabel.textContent.trim() : '');
    langA.className = 'header-cmp-language-selector__link';
    langA.setAttribute('data-lang', langLabel ? langLabel.textContent.trim().toLowerCase().substring(0, 2) : '');
    if (langLabel) {
      langA.append(...langLabel.childNodes);
      moveInstrumentation(langLabel, langA);
    }
    langLi.append(langA);
    desktopLanguageUl.append(langLi);
    if (langLink) moveInstrumentation(langLink, langA);
  });

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
    const menuLabel = menu.querySelector('[data-aue-prop="label"]');
    const menuLink = menu.querySelector('[data-aue-prop="link"]');

    const li = document.createElement('li');
    li.className = 'navigation-wrapper__mobilenavbar-menu border';

    const a = document.createElement('a');
    a.className = 'navigation-wrapper__mobilenavbar-menulink';
    const spanLabel = document.createElement('span');
    if (menuLabel) {
      spanLabel.append(...menuLabel.childNodes);
      moveInstrumentation(menuLabel, spanLabel);
    }
    a.append(spanLabel);
    const iconSpan = document.createElement('span');
    iconSpan.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
    a.append(iconSpan);
    li.append(a);
    // No instrumentation for mobile menu link itself, as it's a toggle

    const submenuItems = menu.querySelectorAll('[data-aue-model="submenuItem"]');
    if (submenuItems.length > 0) {
      const submenuUl = document.createElement('ul');
      submenuUl.className = 'navigation-wrapper__mobilenavbar-submenu';

      const menuHeaderLi = document.createElement('li');
      menuHeaderLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
      const menuHeaderA = document.createElement('a');
      const menuHeaderSpan = document.createElement('span');
      if (menuLabel) {
        menuHeaderSpan.append(...menuLabel.childNodes);
        moveInstrumentation(menuLabel, menuHeaderSpan);
      }
      menuHeaderA.append(menuHeaderSpan);
      menuHeaderLi.append(menuHeaderA);
      submenuUl.append(menuHeaderLi);

      submenuItems.forEach((subItem) => {
        const subLabel = subItem.querySelector('[data-aue-prop="label"]');
        const subLink = subItem.querySelector('[data-aue-prop="link"]');

        const subLi = document.createElement('li');
        subLi.className = 'navigation-wrapper__mobilenavbar-menu';
        const subA = document.createElement('a');
        subA.className = 'navigation-wrapper__mobilenavbar-menulink';
        subA.target = '_self';
        subA.href = subLink ? subLink.textContent.trim() : '#';
        const subSpan = document.createElement('span');
        if (subLabel) {
          subSpan.append(...subLabel.childNodes);
          moveInstrumentation(subLabel, subSpan);
        }
        subA.append(subSpan);
        subLi.append(subA);
        submenuUl.append(subLi);
        if (subLink) moveInstrumentation(subLink, subA);
      });
      li.append(submenuUl);
    }
    navbarMobileList.append(li);
  });

  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  navbarMobile.append(mobileNavBack);

  const mobileNavBackIconAnchor = document.createElement('a');
  mobileNavBackIconAnchor.className = 'navigation-wrapper__icon';
  const mobileNavBackIcon = document.createElement('span');
  mobileNavBackIcon.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  mobileNavBackIconAnchor.append(mobileNavBackIcon);
  mobileNavBack.append(mobileNavBackIconAnchor);

  const mobileNavBackLabel = document.createElement('span');
  mobileNavBackLabel.className = 'navigation-wrapper__iconlabel';
  mobileNavBackLabel.textContent = 'Back';
  mobileNavBack.append(mobileNavBackLabel);

  // Language Selector (Mobile)
  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLanguageSelector.style.visibility = 'visible';
  navbarMobile.append(mobileLanguageSelector);

  const mobileLanguageUl = document.createElement('ul');
  mobileLanguageUl.className = 'header-cmp-language-selector';
  mobileLanguageSelector.append(mobileLanguageUl);

  languageOptions.forEach((langOption, index) => {
    const langLabel = langOption.querySelector('[data-aue-prop="label"]');
    const langLink = langOption.querySelector('[data-aue-prop="link"]');

    const langLi = document.createElement('li');
    if (index === 0) {
      langLi.className = 'active';
    }
    const langA = document.createElement('a');
    langA.href = langLink ? langLink.textContent.trim() : '#';
    langA.setAttribute('aria-label', langLabel ? langLabel.textContent.trim() : '');
    langA.className = 'header-cmp-language-selector__link';
    langA.setAttribute('data-lang', langLabel ? langLabel.textContent.trim().toLowerCase().substring(0, 2) : '');
    if (langLabel) {
      langA.append(...langLabel.childNodes);
      moveInstrumentation(langLabel, langA);
    }
    langLi.append(langA);
    mobileLanguageUl.append(langLi);
    if (langLink) moveInstrumentation(langLink, langA);
  });

  block.textContent = '';
  block.append(container);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
