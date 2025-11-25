import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.id = 'container-e9226c8e5e';
  headerContainer.classList.add('header-container');

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper', 'layout-container', 'transparent-header');
  headerContainer.append(headerWrapper);

  const headerNavigation = document.createElement('div');
  headerNavigation.classList.add('header-navigation');
  headerWrapper.append(headerNavigation);

  const navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('navigation-wrapper');
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  headerNavigation.append(navigationWrapper);

  // Extracting data from the first row (header model)
  const headerRow = block.children[0];
  moveInstrumentation(headerRow, navigationWrapper);

  // Logo and Contact Us CTA
  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.classList.add('navigation-wrapper__logo');
  navigationWrapper.append(navigationWrapperLogo);

  const logoLinkCell = headerRow.children[0];
  const logoLink = logoLinkCell.querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = logoLink.target;
    const logoSpan = document.createElement('span');
    logoSpan.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
    // Assuming the paths are static for the logo icon as they are not in blockJson
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.classList.add(`path${i}`);
      logoSpan.append(pathSpan);
    }
    newLogoLink.append(logoSpan);
    navigationWrapperLogo.append(newLogoLink);
    moveInstrumentation(logoLink, newLogoLink);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.classList.add('navigation-wrapper__contactUs-cta');
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsLinkCell = headerRow.children[2];
  const contactUsLabelCell = headerRow.children[3];

  const contactUsLink = contactUsLinkCell.querySelector('a');
  const contactUsLabel = contactUsLabelCell.textContent.trim();

  if (contactUsLink && contactUsLabel) {
    const newContactUsLink = document.createElement('a');
    newContactUsLink.href = contactUsLink.href;
    newContactUsLink.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    newContactUsLink.target = contactUsLink.target;
    newContactUsLink.setAttribute('aria-label', contactUsLink.getAttribute('aria-label') || contactUsLabel);

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    newContactUsLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('header-cta__label');
    ctaLabel.textContent = contactUsLabel;
    newContactUsLink.append(ctaLabel);

    navigationWrapperContactUsCta.append(newContactUsLink);
    moveInstrumentation(contactUsLink, newContactUsLink);
  }

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.classList.add('navigation-wrapper__icon');
  navigationWrapperIcon.id = 'navigation-toggle';
  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.classList.add('header-hamburger-ellipse');
  hamburgerEllipse.setAttribute('tabindex', '0');
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('header-hamburger-icon', 'header-qd-icon', 'header-qd-icon--hamburger');
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('header-close-icon', 'header-qd-icon', 'header-qd-icon--cancel');
  hamburgerEllipse.append(hamburgerIcon, closeIcon);
  navigationWrapperIcon.append(hamburgerEllipse);
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  // Desktop Navbar
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.classList.add('navigation-wrapper__navbar');
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarDesktop);

  const navbarList = document.createElement('ul');
  navbarList.classList.add('navigation-wrapper__navbar-list');
  navbarDesktop.append(navbarList);

  // Mobile Navbar
  const navbarMobile = document.createElement('nav');
  navbarMobile.classList.add('navigation-wrapper__mobilenavbar');
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarMobile);

  const mobileNavbarList = document.createElement('ul');
  mobileNavbarList.classList.add('navigation-wrapper__mobilenavbar-list');
  navbarMobile.append(mobileNavbarList);

  // Nav Menus and Languages (iterating over remaining rows)
  // Start from the second row as the first row is header data
  for (let i = 1; i < block.children.length; i += 1) {
    const row = block.children[i];
    const cells = [...row.children];

    // Check if it's a NavMenu
    if (cells.length >= 2 && cells[0].querySelector('a') && cells[1].textContent.trim()) {
      const menuLabel = cells[0].textContent.trim();
      const menuLink = cells[0].querySelector('a');

      // Desktop Menu Item
      const desktopMenuItem = document.createElement('li');
      desktopMenuItem.classList.add('navigation-wrapper__navbar-menu');
      navbarList.append(desktopMenuItem);
      moveInstrumentation(row, desktopMenuItem);

      const desktopMenuLink = document.createElement('a');
      desktopMenuLink.setAttribute('aria-haspopup', 'true');
      desktopMenuLink.setAttribute('aria-expanded', 'false');
      desktopMenuLink.classList.add('navigation-wrapper__navbar-menulink');
      desktopMenuLink.target = menuLink.target;
      desktopMenuLink.href = menuLink.href;
      const desktopMenuSpan = document.createElement('span');
      desktopMenuSpan.textContent = menuLabel;
      desktopMenuLink.append(desktopMenuSpan);
      const desktopIconWrapper = document.createElement('span');
      desktopIconWrapper.classList.add('header-qd-icon-wrapper');
      const desktopMenuIcon = document.createElement('span');
      desktopMenuIcon.classList.add('header-menu-icon', 'header-qd-icon', 'header-qd-icon--cheveron-down');
      desktopIconWrapper.append(desktopMenuIcon);
      desktopMenuLink.append(desktopIconWrapper);
      desktopMenuItem.append(desktopMenuLink);

      // Mobile Menu Item
      const mobileMenuItem = document.createElement('li');
      mobileMenuItem.classList.add('navigation-wrapper__mobilenavbar-menu', 'border');
      mobileNavbarList.append(mobileMenuItem);

      const mobileMenuLink = document.createElement('a');
      mobileMenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');
      const mobileMenuSpan = document.createElement('span');
      mobileMenuSpan.textContent = menuLabel;
      mobileMenuLink.append(mobileMenuSpan);
      const mobileMenuIcon = document.createElement('span');
      mobileMenuIcon.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'navigation-wrapper__mobilenavbar-menulink-icon');
      mobileMenuLink.append(mobileMenuIcon);
      mobileMenuItem.append(mobileMenuLink);

      const subMenuItems = cells[1].querySelectorAll('li'); // SubMenu items are in the second cell as a list
      if (subMenuItems.length > 0) {
        const desktopSubMenu = document.createElement('ul');
        desktopSubMenu.classList.add('navigation-wrapper__navbar-submenu');
        desktopMenuItem.append(desktopSubMenu);

        const mobileSubMenu = document.createElement('ul');
        mobileSubMenu.classList.add('navigation-wrapper__mobilenavbar-submenu');
        mobileMenuItem.append(mobileSubMenu);

        const mobileSubMenuHeader = document.createElement('li');
        mobileSubMenuHeader.classList.add('navigation-wrapper__mobilenavbar-menuheader');
        const mobileSubMenuHeaderLink = document.createElement('a');
        const mobileSubMenuHeaderSpan = document.createElement('span');
        mobileSubMenuHeaderSpan.textContent = menuLabel;
        mobileSubMenuHeaderLink.append(mobileSubMenuHeaderSpan);
        mobileSubMenuHeader.append(mobileSubMenuHeaderLink);
        mobileSubMenu.append(mobileSubMenuHeader);

        subMenuItems.forEach((subMenuItem) => {
          const itemLink = subMenuItem.querySelector('a');
          if (itemLink) {
            const itemLabel = itemLink.textContent.trim();

            const desktopSubMenuItem = document.createElement('li');
            const desktopSubMenuLink = document.createElement('a');
            desktopSubMenuLink.setAttribute('aria-expanded', 'false');
            desktopSubMenuLink.target = itemLink.target;
            desktopSubMenuLink.href = itemLink.href;
            const desktopSubMenuSpan = document.createElement('span');
            desktopSubMenuSpan.textContent = itemLabel;
            desktopSubMenuLink.append(desktopSubMenuSpan);
            desktopSubMenuItem.append(desktopSubMenuLink);
            desktopSubMenu.append(desktopSubMenuItem);
            moveInstrumentation(subMenuItem, desktopSubMenuItem);

            const mobileSubMenuItem = document.createElement('li');
            mobileSubMenuItem.classList.add('navigation-wrapper__mobilenavbar-menu');
            const mobileSubMenuLink = document.createElement('a');
            mobileSubMenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');
            mobileSubMenuLink.target = itemLink.target;
            mobileSubMenuLink.href = itemLink.href;
            const mobileSubMenuSpan = document.createElement('span');
            mobileSubMenuSpan.textContent = itemLabel;
            mobileSubMenuLink.append(mobileSubMenuSpan);
            mobileSubMenuItem.append(mobileSubMenuLink);
            mobileSubMenu.append(mobileSubMenuItem);
          }
        });
      }
    } else if (cells.length === 2 && cells[0].querySelector('a') && cells[1].querySelector('a')) {
      // This is a language item
      const langLabel = cells[0].textContent.trim();
      const langLink = cells[0].querySelector('a');

      let desktopLanguageSelector = navbarDesktop.querySelector('.header-language-selector');
      if (!desktopLanguageSelector) {
        desktopLanguageSelector = document.createElement('div');
        desktopLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
        desktopLanguageSelector.style.visibility = 'visible';
        navbarDesktop.append(desktopLanguageSelector);
      }

      let desktopLangList = desktopLanguageSelector.querySelector('.header-cmp-language-selector');
      if (!desktopLangList) {
        desktopLangList = document.createElement('ul');
        desktopLangList.classList.add('header-cmp-language-selector');
        desktopLanguageSelector.append(desktopLangList);
      }

      const desktopLangItem = document.createElement('li');
      if (langLink.href === '/') {
        desktopLangItem.classList.add('active');
      }
      const desktopLangAnchor = document.createElement('a');
      desktopLangAnchor.href = langLink.href;
      desktopLangAnchor.setAttribute('aria-label', langLabel);
      desktopLangAnchor.classList.add('header-cmp-language-selector__link');
      desktopLangAnchor.setAttribute('data-lang', langLink.href.split('/').filter(Boolean).pop() || 'en');
      desktopLangAnchor.textContent = langLabel;
      desktopLangItem.append(desktopLangAnchor);
      desktopLangList.append(desktopLangItem);
      moveInstrumentation(row, desktopLangItem);

      // Mobile Language Selector
      let mobileLanguageSelector = navbarMobile.querySelector('.header-language-selector');
      if (!mobileLanguageSelector) {
        mobileLanguageSelector = document.createElement('div');
        mobileLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
        mobileLanguageSelector.style.visibility = 'visible';
        navbarMobile.append(mobileLanguageSelector);
      }

      let mobileLangList = mobileLanguageSelector.querySelector('.header-cmp-language-selector');
      if (!mobileLangList) {
        mobileLangList = document.createElement('ul');
        mobileLangList.classList.add('header-cmp-language-selector');
        mobileLanguageSelector.append(mobileLangList);
      }

      const mobileLangItem = document.createElement('li');
      if (langLink.href === '/') {
        mobileLangItem.classList.add('active');
      }
      const mobileLangAnchor = document.createElement('a');
      mobileLangAnchor.href = langLink.href;
      mobileLangAnchor.setAttribute('aria-label', langLabel);
      mobileLangAnchor.classList.add('header-cmp-language-selector__link');
      mobileLangAnchor.setAttribute('data-lang', langLink.href.split('/').filter(Boolean).pop() || 'en');
      mobileLangAnchor.textContent = langLabel;
      mobileLangItem.append(mobileLangAnchor);
      mobileLangList.append(mobileLangItem);
    }
  }

  // Add the Contact Us CTA to desktop navbar again (as per HTML structure)
  if (contactUsLink && contactUsLabel) {
    const desktopContactUsLink = document.createElement('a');
    desktopContactUsLink.href = contactUsLink.href;
    desktopContactUsLink.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    desktopContactUsLink.target = contactUsLink.target;
    desktopContactUsLink.setAttribute('aria-label', contactUsLink.getAttribute('aria-label') || contactUsLabel);

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    desktopContactUsLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('header-cta__label');
    ctaLabel.textContent = contactUsLabel;
    desktopContactUsLink.append(ctaLabel);

    navbarDesktop.append(desktopContactUsLink);
  }

  // Mobile Nav Back button
  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');
  const backIconLink = document.createElement('a');
  backIconLink.classList.add('navigation-wrapper__icon');
  const backIcon = document.createElement('span');
  backIcon.classList.add('header-back-icon', 'header-qd-icon', 'header-qd-icon--cheveron-left');
  backIconLink.append(backIcon);
  const backLabel = document.createElement('span');
  backLabel.classList.add('navigation-wrapper__iconlabel');
  backLabel.textContent = 'Back';
  mobileNavBack.append(backIconLink, backLabel);
  navbarMobile.append(mobileNavBack);

  block.textContent = '';
  block.append(headerContainer);
}
