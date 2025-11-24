import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';
  moveInstrumentation(block, headerContainer);

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

  const logoLink = block.querySelector('div:nth-child(1) > div:nth-child(1) > a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = logoLink.target;
    moveInstrumentation(logoLink, newLogoLink);

    const headerQdIcon = document.createElement('span');
    headerQdIcon.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
    newLogoLink.append(headerQdIcon);

    Array.from({ length: 25 }).forEach((_, i) => {
      const path = document.createElement('span');
      path.className = `path${i + 1}`;
      headerQdIcon.append(path);
    });
    navigationWrapperLogo.append(newLogoLink);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsLink = block.querySelector('div:nth-child(1) > div:nth-child(2) > a');
  if (contactUsLink) {
    const newContactUsLink = document.createElement('a');
    newContactUsLink.href = contactUsLink.href;
    newContactUsLink.className = 'header-cta header-cta__ navigation--content__cta';
    newContactUsLink.target = contactUsLink.target;
    newContactUsLink.setAttribute('aria-label', contactUsLink.getAttribute('aria-label'));
    moveInstrumentation(contactUsLink, newContactUsLink);

    const ctaIcon = document.createElement('span');
    ctaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
    ctaIcon.setAttribute('aria-hidden', 'true');
    newContactUsLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.className = 'header-cta__label';
    ctaLabel.textContent = contactUsLink.querySelector('span.header-cta__label')?.textContent || '';
    newContactUsLink.append(ctaLabel);
    navigationWrapperContactUsCta.append(newContactUsLink);
  }

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

  // Desktop Navbar
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.className = 'navigation-wrapper__navbar';
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarDesktop);

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.className = 'navigation-wrapper__navbar-list';
  navbarDesktop.append(navbarDesktopList);

  const navMenus = block.querySelectorAll('div.nav-menu');
  navMenus.forEach((menu) => {
    const menuLabel = menu.querySelector('div:nth-child(1)');
    const menuLink = menu.querySelector('div:nth-child(2) > a');
    const submenuItems = menu.querySelectorAll('div.nav-submenu-item');

    if (menuLabel && menuLink) {
      const navbarMenuItem = document.createElement('li');
      navbarMenuItem.className = 'navigation-wrapper__navbar-menu';

      const menuAnchor = document.createElement('a');
      menuAnchor.setAttribute('aria-haspopup', 'true');
      menuAnchor.setAttribute('aria-expanded', 'false');
      menuAnchor.className = 'navigation-wrapper__navbar-menulink';
      menuAnchor.target = menuLink.target;
      menuAnchor.href = menuLink.href;

      const menuSpan = document.createElement('span');
      menuSpan.textContent = menuLabel.textContent;
      menuAnchor.append(menuSpan);

      const iconWrapper = document.createElement('span');
      iconWrapper.className = 'header-qd-icon-wrapper';
      const menuIcon = document.createElement('span');
      menuIcon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
      iconWrapper.append(menuIcon);
      menuAnchor.append(iconWrapper);
      navbarMenuItem.append(menuAnchor);

      if (submenuItems.length > 0) {
        const submenuList = document.createElement('ul');
        submenuList.className = 'navigation-wrapper__navbar-submenu';
        submenuItems.forEach((subItem) => {
          const submenuLabel = subItem.querySelector('div:nth-child(1)');
          const submenuLink = subItem.querySelector('div:nth-child(2) > a');
          if (submenuLabel && submenuLink) {
            const subListItem = document.createElement('li');
            const subAnchor = document.createElement('a');
            subAnchor.setAttribute('aria-expanded', 'false');
            subAnchor.target = submenuLink.target;
            subAnchor.href = submenuLink.href;
            const subSpan = document.createElement('span');
            subSpan.textContent = submenuLabel.textContent;
            subAnchor.append(subSpan);
            subListItem.append(subAnchor);
            submenuList.append(subListItem);
          }
        });
        navbarMenuItem.append(submenuList);
      }
      navbarDesktopList.append(navbarMenuItem);
    }
  });

  const desktopContactUsLink = block.querySelector('div:nth-child(1) > div:nth-child(2) > a'); // Re-use the contact us link for desktop nav
  if (desktopContactUsLink) {
    const newDesktopContactUsLink = document.createElement('a');
    newDesktopContactUsLink.href = desktopContactUsLink.href;
    newDesktopContactUsLink.className = 'header-cta header-cta__ navigation--content__cta';
    newDesktopContactUsLink.target = desktopContactUsLink.target;
    newDesktopContactUsLink.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');

    const desktopCtaIcon = document.createElement('span');
    desktopCtaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
    desktopCtaIcon.setAttribute('aria-hidden', 'true');
    newDesktopContactUsLink.append(desktopCtaIcon);

    const desktopCtaLabel = document.createElement('span');
    desktopCtaLabel.className = 'header-cta__label';
    desktopCtaLabel.textContent = desktopContactUsLink.querySelector('span.header-cta__label')?.textContent || '';
    newDesktopContactUsLink.append(desktopCtaLabel);
    navbarDesktop.append(newDesktopContactUsLink);
  }

  const headerLanguageSelectorDesktop = document.createElement('div');
  headerLanguageSelectorDesktop.className = 'header-language-selector header-lang-css-from-wrapper';
  headerLanguageSelectorDesktop.style.visibility = 'visible';
  navbarDesktop.append(headerLanguageSelectorDesktop);

  const desktopLangList = document.createElement('ul');
  desktopLangList.className = 'header-cmp-language-selector';
  headerLanguageSelectorDesktop.append(desktopLangList);

  const languageOptions = block.querySelectorAll('div.language-option');
  languageOptions.forEach((langOption, index) => {
    const languageLabel = langOption.querySelector('div:nth-child(1)');
    const languageLink = langOption.querySelector('div:nth-child(2) > a');
    const languageCode = langOption.querySelector('div:nth-child(3)');

    if (languageLabel && languageLink && languageCode) {
      const langListItem = document.createElement('li');
      if (index === 0) {
        langListItem.className = 'active';
      }
      const langAnchor = document.createElement('a');
      langAnchor.href = languageLink.href;
      langAnchor.setAttribute('aria-label', languageLabel.textContent);
      langAnchor.className = 'header-cmp-language-selector__link';
      langAnchor.setAttribute('data-lang', languageCode.textContent);
      langAnchor.textContent = languageLabel.textContent;
      langListItem.append(langAnchor);
      desktopLangList.append(langListItem);
    }
  });

  // Mobile Navbar
  const navbarMobile = document.createElement('nav');
  navbarMobile.className = 'navigation-wrapper__mobilenavbar';
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarMobile);

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.className = 'navigation-wrapper__mobilenavbar-list';
  navbarMobile.append(navbarMobileList);

  navMenus.forEach((menu) => {
    const menuLabel = menu.querySelector('div:nth-child(1)');
    const menuLink = menu.querySelector('div:nth-child(2) > a');
    const submenuItems = menu.querySelectorAll('div.nav-submenu-item');

    if (menuLabel && menuLink) {
      const mobileNavbarMenuItem = document.createElement('li');
      mobileNavbarMenuItem.className = 'navigation-wrapper__mobilenavbar-menu border';

      const mobileMenuAnchor = document.createElement('a');
      mobileMenuAnchor.className = 'navigation-wrapper__mobilenavbar-menulink';

      const mobileMenuSpan = document.createElement('span');
      mobileMenuSpan.textContent = menuLabel.textContent;
      mobileMenuAnchor.append(mobileMenuSpan);

      const mobileMenuIcon = document.createElement('span');
      mobileMenuIcon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
      mobileMenuAnchor.append(mobileMenuIcon);
      mobileNavbarMenuItem.append(mobileMenuAnchor);

      if (submenuItems.length > 0) {
        const mobileSubmenuList = document.createElement('ul');
        mobileSubmenuList.className = 'navigation-wrapper__mobilenavbar-submenu';

        const mobileSubmenuHeader = document.createElement('li');
        mobileSubmenuHeader.className = 'navigation-wrapper__mobilenavbar-menuheader';
        const headerAnchor = document.createElement('a');
        const headerSpan = document.createElement('span');
        headerSpan.textContent = menuLabel.textContent;
        headerAnchor.append(headerSpan);
        mobileSubmenuHeader.append(headerAnchor);
        mobileSubmenuList.append(mobileSubmenuHeader);

        submenuItems.forEach((subItem) => {
          const submenuLabel = subItem.querySelector('div:nth-child(1)');
          const submenuLink = subItem.querySelector('div:nth-child(2) > a');
          if (submenuLabel && submenuLink) {
            const mobileSubListItem = document.createElement('li');
            mobileSubListItem.className = 'navigation-wrapper__mobilenavbar-menu';
            const mobileSubAnchor = document.createElement('a');
            mobileSubAnchor.className = 'navigation-wrapper__mobilenavbar-menulink';
            mobileSubAnchor.target = submenuLink.target;
            mobileSubAnchor.href = submenuLink.href;
            const mobileSubSpan = document.createElement('span');
            mobileSubSpan.textContent = submenuLabel.textContent;
            mobileSubAnchor.append(mobileSubSpan);
            mobileSubListItem.append(mobileSubAnchor);
            mobileSubmenuList.append(mobileSubListItem);
          }
        });
        mobileNavbarMenuItem.append(mobileSubmenuList);
      }
      navbarMobileList.append(mobileNavbarMenuItem);
    }
  });

  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  navbarMobile.append(mobileNavBack);

  const mobileBackIconWrapper = document.createElement('a');
  mobileBackIconWrapper.className = 'navigation-wrapper__icon';
  const mobileBackIcon = document.createElement('span');
  mobileBackIcon.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  mobileBackIconWrapper.append(mobileBackIcon);
  mobileNavBack.append(mobileBackIconWrapper);

  const mobileBackLabel = document.createElement('span');
  mobileBackLabel.className = 'navigation-wrapper__iconlabel';
  mobileBackLabel.textContent = 'Back';
  mobileNavBack.append(mobileBackLabel);

  const headerLanguageSelectorMobile = document.createElement('div');
  headerLanguageSelectorMobile.className = 'header-language-selector header-lang-css-from-wrapper';
  headerLanguageSelectorMobile.style.visibility = 'visible';
  navbarMobile.append(headerLanguageSelectorMobile);

  const mobileLangList = document.createElement('ul');
  mobileLangList.className = 'header-cmp-language-selector';
  headerLanguageSelectorMobile.append(mobileLangList);

  languageOptions.forEach((langOption, index) => {
    const languageLabel = langOption.querySelector('div:nth-child(1)');
    const languageLink = langOption.querySelector('div:nth-child(2) > a');
    const languageCode = langOption.querySelector('div:nth-child(3)');

    if (languageLabel && languageLink && languageCode) {
      const langListItem = document.createElement('li');
      if (index === 0) {
        langListItem.className = 'active';
      }
      const langAnchor = document.createElement('a');
      langAnchor.href = languageLink.href;
      langAnchor.setAttribute('aria-label', languageLabel.textContent);
      langAnchor.className = 'header-cmp-language-selector__link';
      langAnchor.setAttribute('data-lang', languageCode.textContent);
      langAnchor.textContent = languageLabel.textContent;
      langListItem.append(langAnchor);
      mobileLangList.append(langListItem);
    }
  });

  block.textContent = '';
  block.append(headerContainer);
}
