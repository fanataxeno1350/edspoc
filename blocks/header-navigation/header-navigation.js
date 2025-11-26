import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";

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

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoAnchor = document.createElement('a');
  if (logoLink) {
    logoAnchor.href = logoLink.textContent.trim();
    moveInstrumentation(logoLink, logoAnchor);
  } else {
    logoAnchor.href = '/';
  }
  logoAnchor.target = '_self';
  navigationWrapperLogo.append(logoAnchor);

  const headerQdIcon = document.createElement('span');
  headerQdIcon.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
  logoAnchor.append(headerQdIcon);

  // Add all path spans for the logo icon
  for (let i = 1; i <= 25; i++) {
    const pathSpan = document.createElement('span');
    pathSpan.className = `path${i}`;
    headerQdIcon.append(pathSpan);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsLink = block.querySelector('[data-aue-prop="contactUsLink"]');
  const contactUsLabel = block.querySelector('[data-aue-prop="contactUsLabel"]');

  const contactUsAnchor = document.createElement('a');
  contactUsAnchor.className = 'header-cta header-cta__ navigation--content__cta';
  if (contactUsLink) {
    contactUsAnchor.href = contactUsLink.textContent.trim();
    moveInstrumentation(contactUsLink, contactUsAnchor);
  } else {
    contactUsAnchor.href = '/contact/';
  }
  contactUsAnchor.target = '_self';
  contactUsAnchor.setAttribute('aria-label', 'Contact Us');
  navigationWrapperContactUsCta.append(contactUsAnchor);

  const ctaIcon = document.createElement('span');
  ctaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  ctaIcon.setAttribute('aria-hidden', 'true');
  contactUsAnchor.append(ctaIcon);

  const ctaLabel = document.createElement('span');
  ctaLabel.className = 'header-cta__label';
  if (contactUsLabel) {
    ctaLabel.append(...contactUsLabel.childNodes);
    moveInstrumentation(contactUsLabel, ctaLabel);
  } else {
    ctaLabel.textContent = 'Contact Us';
  }
  contactUsAnchor.append(ctaLabel);

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

  const menus = block.querySelectorAll('[data-aue-model="headerMenu"]');
  menus.forEach((menu) => {
    const menuLabel = menu.querySelector('[data-aue-prop="menuLabel"]');
    const menuLink = menu.querySelector('[data-aue-prop="menuLink"]');

    const navbarMenu = document.createElement('li');
    navbarMenu.className = 'navigation-wrapper__navbar-menu';
    navbarDesktopList.append(navbarMenu);

    const menuAnchor = document.createElement('a');
    menuAnchor.setAttribute('aria-haspopup', 'true');
    menuAnchor.setAttribute('aria-expanded', 'false');
    menuAnchor.className = 'navigation-wrapper__navbar-menulink';
    if (menuLink) {
      menuAnchor.href = menuLink.textContent.trim();
      moveInstrumentation(menuLink, menuAnchor);
    } else {
      menuAnchor.href = '#'; // Default if no link
    }
    menuAnchor.target = '_self';
    navbarMenu.append(menuAnchor);

    const menuSpan = document.createElement('span');
    if (menuLabel) {
      menuSpan.append(...menuLabel.childNodes);
      moveInstrumentation(menuLabel, menuSpan);
    } else {
      menuSpan.textContent = 'Menu Item'; // Default if no label
    }
    menuAnchor.append(menuSpan);

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'header-qd-icon-wrapper';
    menuAnchor.append(iconWrapper);

    const menuIcon = document.createElement('span');
    menuIcon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
    iconWrapper.append(menuIcon);

    const subMenus = menu.querySelectorAll('[data-aue-model="headerSubMenu"]');
    if (subMenus.length > 0) {
      const submenuList = document.createElement('ul');
      submenuList.className = 'navigation-wrapper__navbar-submenu';
      navbarMenu.append(submenuList);

      subMenus.forEach((subMenu) => {
        const subMenuLabel = subMenu.querySelector('[data-aue-prop="subMenuLabel"]');
        const subMenuLink = subMenu.querySelector('[data-aue-prop="subMenuLink"]');

        const subMenuListItem = document.createElement('li');
        submenuList.append(subMenuListItem);

        const subMenuAnchor = document.createElement('a');
        subMenuAnchor.setAttribute('aria-expanded', 'false');
        subMenuAnchor.target = '_self';
        if (subMenuLink) {
          subMenuAnchor.href = subMenuLink.textContent.trim();
          moveInstrumentation(subMenuLink, subMenuAnchor);
        } else {
          subMenuAnchor.href = '#'; // Default if no link
        }
        subMenuListItem.append(subMenuAnchor);

        const subMenuSpan = document.createElement('span');
        if (subMenuLabel) {
          subMenuSpan.append(...subMenuLabel.childNodes);
          moveInstrumentation(subMenuLabel, subMenuSpan);
        } else {
          subMenuSpan.textContent = 'SubMenu Item'; // Default if no label
        }
        subMenuAnchor.append(subMenuSpan);
      });
    }
  });

  // Desktop Contact Us CTA (duplicate of the one in logo div)
  const desktopContactUsAnchor = document.createElement('a');
  desktopContactUsAnchor.className = 'header-cta header-cta__ navigation--content__cta';
  if (contactUsLink) {
    desktopContactUsAnchor.href = contactUsLink.textContent.trim();
  } else {
    desktopContactUsAnchor.href = '/contact/';
  }
  desktopContactUsAnchor.target = '_self';
  desktopContactUsAnchor.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
  navbarDesktop.append(desktopContactUsAnchor);

  const desktopCtaIcon = document.createElement('span');
  desktopCtaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  desktopCtaIcon.setAttribute('aria-hidden', 'true');
  desktopContactUsAnchor.append(desktopCtaIcon);

  const desktopCtaLabel = document.createElement('span');
  desktopCtaLabel.className = 'header-cta__label';
  if (contactUsLabel) {
    desktopCtaLabel.append(...contactUsLabel.childNodes.cloneNode(true)); // Clone to avoid moving from original
  } else {
    desktopCtaLabel.textContent = 'Contact Us';
  }
  desktopContactUsAnchor.append(desktopCtaLabel);

  // Desktop Language Selector
  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLanguageSelector.style.visibility = 'visible';
  navbarDesktop.append(desktopLanguageSelector);

  const desktopLanguageList = document.createElement('ul');
  desktopLanguageList.className = 'header-cmp-language-selector';
  desktopLanguageSelector.append(desktopLanguageList);

  const languages = block.querySelectorAll('[data-aue-model="language"]');
  languages.forEach((lang, index) => {
    const languageLabel = lang.querySelector('[data-aue-prop="languageLabel"]');
    const languageLink = lang.querySelector('[data-aue-prop="languageLink"]');

    const langListItem = document.createElement('li');
    if (index === 0) {
      langListItem.className = 'active';
    }
    desktopLanguageList.append(langListItem);

    const langAnchor = document.createElement('a');
    langAnchor.className = 'header-cmp-language-selector__link';
    if (languageLink) {
      langAnchor.href = languageLink.textContent.trim();
      moveInstrumentation(languageLink, langAnchor);
    } else {
      langAnchor.href = '#';
    }
    if (languageLabel) {
      langAnchor.setAttribute('aria-label', languageLabel.textContent.trim());
      langAnchor.textContent = languageLabel.textContent.trim();
      moveInstrumentation(languageLabel, langAnchor);
    } else {
      langAnchor.setAttribute('aria-label', 'Language');
      langAnchor.textContent = 'Language';
    }
    langAnchor.dataset.lang = langAnchor.textContent.trim().substring(0, 2).toLowerCase(); // Basic lang code extraction
    langListItem.append(langAnchor);
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

  menus.forEach((menu) => {
    const menuLabel = menu.querySelector('[data-aue-prop="menuLabel"]');
    const menuLink = menu.querySelector('[data-aue-prop="menuLink"]');

    const mobileNavbarMenu = document.createElement('li');
    mobileNavbarMenu.className = 'navigation-wrapper__mobilenavbar-menu border';
    navbarMobileList.append(mobileNavbarMenu);

    const mobileMenuAnchor = document.createElement('a');
    mobileMenuAnchor.className = 'navigation-wrapper__mobilenavbar-menulink';
    mobileNavbarMenu.append(mobileMenuAnchor);

    const mobileMenuSpan = document.createElement('span');
    if (menuLabel) {
      mobileMenuSpan.append(...menuLabel.childNodes.cloneNode(true));
    } else {
      mobileMenuSpan.textContent = 'Menu Item';
    }
    mobileMenuAnchor.append(mobileMenuSpan);

    const mobileMenuIcon = document.createElement('span');
    mobileMenuIcon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
    mobileMenuAnchor.append(mobileMenuIcon);

    const subMenus = menu.querySelectorAll('[data-aue-model="headerSubMenu"]');
    if (subMenus.length > 0) {
      const mobileSubmenuList = document.createElement('ul');
      mobileSubmenuList.className = 'navigation-wrapper__mobilenavbar-submenu';
      mobileNavbarMenu.append(mobileSubmenuList);

      const mobileSubmenuHeader = document.createElement('li');
      mobileSubmenuHeader.className = 'navigation-wrapper__mobilenavbar-menuheader';
      mobileSubmenuList.append(mobileSubmenuHeader);

      const mobileSubmenuHeaderAnchor = document.createElement('a');
      mobileSubmenuHeader.append(mobileSubmenuHeaderAnchor);

      const mobileSubmenuHeaderSpan = document.createElement('span');
      if (menuLabel) {
        mobileSubmenuHeaderSpan.append(...menuLabel.childNodes.cloneNode(true));
      } else {
        mobileSubmenuHeaderSpan.textContent = 'Menu Item';
      }
      mobileSubmenuHeaderAnchor.append(mobileSubmenuHeaderSpan);

      subMenus.forEach((subMenu) => {
        const subMenuLabel = subMenu.querySelector('[data-aue-prop="subMenuLabel"]');
        const subMenuLink = subMenu.querySelector('[data-aue-prop="subMenuLink"]');

        const mobileSubMenuListItem = document.createElement('li');
        mobileSubMenuListItem.className = 'navigation-wrapper__mobilenavbar-menu';
        mobileSubmenuList.append(mobileSubMenuListItem);

        const mobileSubMenuAnchor = document.createElement('a');
        mobileSubMenuAnchor.className = 'navigation-wrapper__mobilenavbar-menulink';
        mobileSubMenuAnchor.target = '_self';
        if (subMenuLink) {
          mobileSubMenuAnchor.href = subMenuLink.textContent.trim();
        } else {
          mobileSubMenuAnchor.href = '#';
        }
        mobileSubMenuListItem.append(mobileSubMenuAnchor);

        const mobileSubMenuSpan = document.createElement('span');
        if (subMenuLabel) {
          mobileSubMenuSpan.append(...subMenuLabel.childNodes.cloneNode(true));
        } else {
          mobileSubMenuSpan.textContent = 'SubMenu Item';
        }
        mobileSubMenuAnchor.append(mobileSubMenuSpan);
      });
    }
  });

  const mobileNavbarBack = document.createElement('div');
  mobileNavbarBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  navbarMobile.append(mobileNavbarBack);

  const mobileBackAnchor = document.createElement('a');
  mobileBackAnchor.className = 'navigation-wrapper__icon';
  mobileNavbarBack.append(mobileBackAnchor);

  const backIcon = document.createElement('span');
  backIcon.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  mobileBackAnchor.append(backIcon);

  const backLabel = document.createElement('span');
  backLabel.className = 'navigation-wrapper__iconlabel';
  backLabel.textContent = 'Back';
  mobileNavbarBack.append(backLabel);

  // Mobile Language Selector (duplicate of desktop)
  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLanguageSelector.style.visibility = 'visible';
  navbarMobile.append(mobileLanguageSelector);

  const mobileLanguageList = document.createElement('ul');
  mobileLanguageList.className = 'header-cmp-language-selector';
  mobileLanguageSelector.append(mobileLanguageList);

  languages.forEach((lang, index) => {
    const languageLabel = lang.querySelector('[data-aue-prop="languageLabel"]');
    const languageLink = lang.querySelector('[data-aue-prop="languageLink"]');

    const langListItem = document.createElement('li');
    if (index === 0) {
      langListItem.className = 'active';
    }
    mobileLanguageList.append(langListItem);

    const langAnchor = document.createElement('a');
    langAnchor.className = 'header-cmp-language-selector__link';
    if (languageLink) {
      langAnchor.href = languageLink.textContent.trim();
    } else {
      langAnchor.href = '#';
    }
    if (languageLabel) {
      langAnchor.setAttribute('aria-label', languageLabel.textContent.trim());
      langAnchor.textContent = languageLabel.textContent.trim();
    } else {
      langAnchor.setAttribute('aria-label', 'Language');
      langAnchor.textContent = 'Language';
    }
    langAnchor.dataset.lang = langAnchor.textContent.trim().substring(0, 2).toLowerCase();
    langListItem.append(langAnchor);
  });

  block.innerHTML = '';
  block.append(headerContainer);
}