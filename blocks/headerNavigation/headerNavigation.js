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

  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.classList.add('navigation-wrapper__logo');
  navigationWrapper.append(navigationWrapperLogo);

  // Extract Logo Link
  const logoLinkRow = block.children[0]; // Assuming first row is logo link
  const logoLinkA = logoLinkRow.children[0].querySelector('a');
  if (logoLinkA) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLinkA.href;
    logoAnchor.target = '_self';
    const logoSpan = document.createElement('span');
    logoSpan.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.classList.add(`path${i}`);
      logoSpan.append(pathSpan);
    }
    logoAnchor.append(logoSpan);
    navigationWrapperLogo.append(logoAnchor);
    moveInstrumentation(logoLinkRow, logoAnchor);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.classList.add('navigation-wrapper__contactUs-cta');
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  // Extract Contact Us Link
  const contactUsLinkRow = block.children[1]; // Assuming second row is contact us link
  const contactUsLinkA = contactUsLinkRow.children[0].querySelector('a');
  if (contactUsLinkA) {
    const contactUsAnchor = document.createElement('a');
    contactUsAnchor.href = contactUsLinkA.href;
    contactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    contactUsAnchor.target = '_self';
    contactUsAnchor.setAttribute('aria-label', 'Contact Us');

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    iconSpan.setAttribute('aria-hidden', 'true');
    contactUsAnchor.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('header-cta__label');
    labelSpan.textContent = contactUsLinkA.textContent;
    contactUsAnchor.append(labelSpan);
    navigationWrapperContactUsCta.append(contactUsAnchor);
    moveInstrumentation(contactUsLinkRow, contactUsAnchor);
  }

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.classList.add('navigation-wrapper__icon');
  navigationWrapperIcon.id = 'navigation-toggle';
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.classList.add('header-hamburger-ellipse');
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  navigationWrapperIcon.append(headerHamburgerEllipse);

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('header-hamburger-icon', 'header-qd-icon', 'header-qd-icon--hamburger');
  headerHamburgerEllipse.append(hamburgerIcon);

  const closeIcon = document.createElement('span');
  closeIcon.classList.add('header-close-icon', 'header-qd-icon', 'header-qd-icon--cancel');
  headerHamburgerEllipse.append(closeIcon);

  // Desktop Navigation
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.classList.add('navigation-wrapper__navbar');
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarDesktop);

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.classList.add('navigation-wrapper__navbar-list');
  navbarDesktop.append(navbarDesktopList);

  // Mobile Navigation
  const navbarMobile = document.createElement('nav');
  navbarMobile.classList.add('navigation-wrapper__mobilenavbar');
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarMobile);

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.classList.add('navigation-wrapper__mobilenavbar-list');
  navbarMobile.append(navbarMobileList);

  // Process Menu Items and Languages
  let menuItemsStarted = false;
  let languagesStarted = false;
  let currentDesktopSubmenu = null;
  let currentMobileSubmenu = null;
  let currentMobileSubmenuHeader = null;

  // Skip the first two rows (logo and contact us) which are already handled
  const contentRows = [...block.children].slice(2);

  contentRows.forEach((row) => {
    const cells = [...row.children];
    const typeCell = cells[0];
    const dataCell = cells[1];

    if (typeCell.textContent.trim() === 'Menu Items') {
      menuItemsStarted = true;
      languagesStarted = false;
      currentDesktopSubmenu = null;
      currentMobileSubmenu = null;
      currentMobileSubmenuHeader = null;
    } else if (typeCell.textContent.trim() === 'Languages') {
      languagesStarted = true;
      menuItemsStarted = false;
      currentDesktopSubmenu = null;
      currentMobileSubmenu = null;
      currentMobileSubmenuHeader = null;
    }

    if (menuItemsStarted && typeCell.textContent.trim() === 'menuItem') {
      const label = dataCell.children[0].textContent.trim();
      const href = dataCell.children[1].textContent.trim();

      // Desktop Menu Item
      const desktopMenuItem = document.createElement('li');
      desktopMenuItem.classList.add('navigation-wrapper__navbar-menu');
      moveInstrumentation(row, desktopMenuItem);

      const desktopMenuLink = document.createElement('a');
      desktopMenuLink.setAttribute('aria-haspopup', 'true');
      desktopMenuLink.setAttribute('aria-expanded', 'false');
      desktopMenuLink.classList.add('navigation-wrapper__navbar-menulink');
      desktopMenuLink.target = '_self';
      desktopMenuLink.href = href;

      const desktopSpan = document.createElement('span');
      desktopSpan.textContent = label;
      desktopMenuLink.append(desktopSpan);

      const desktopIconWrapper = document.createElement('span');
      desktopIconWrapper.classList.add('header-qd-icon-wrapper');
      const desktopIcon = document.createElement('span');
      desktopIcon.classList.add('header-menu-icon', 'header-qd-icon', 'header-qd-icon--cheveron-down');
      desktopIconWrapper.append(desktopIcon);
      desktopMenuLink.append(desktopIconWrapper);
      desktopMenuItem.append(desktopMenuLink);

      // Mobile Menu Item
      const mobileMenuItem = document.createElement('li');
      mobileMenuItem.classList.add('navigation-wrapper__mobilenavbar-menu', 'border');
      moveInstrumentation(row, mobileMenuItem);

      const mobileMenuLink = document.createElement('a');
      mobileMenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');

      const mobileSpan = document.createElement('span');
      mobileSpan.textContent = label;
      mobileMenuLink.append(mobileSpan);

      const mobileIcon = document.createElement('span');
      mobileIcon.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'navigation-wrapper__mobilenavbar-menulink-icon');
      mobileMenuLink.append(mobileIcon);
      mobileMenuItem.append(mobileMenuLink);

      // Check if this is a top-level menu item or a submenu item
      if (row.dataset.level === '1' || !row.dataset.level) { // Top-level item
        navbarDesktopList.append(desktopMenuItem);
        navbarMobileList.append(mobileMenuItem);

        currentDesktopSubmenu = document.createElement('ul');
        currentDesktopSubmenu.classList.add('navigation-wrapper__navbar-submenu');
        desktopMenuItem.append(currentDesktopSubmenu);

        currentMobileSubmenu = document.createElement('ul');
        currentMobileSubmenu.classList.add('navigation-wrapper__mobilenavbar-submenu');
        mobileMenuItem.append(currentMobileSubmenu);

        currentMobileSubmenuHeader = document.createElement('li');
        currentMobileSubmenuHeader.classList.add('navigation-wrapper__mobilenavbar-menuheader');
        const headerLink = document.createElement('a');
        const headerSpan = document.createElement('span');
        headerSpan.textContent = label;
        headerLink.append(headerSpan);
        currentMobileSubmenuHeader.append(headerLink);
        currentMobileSubmenu.append(currentMobileSubmenuHeader);
      } else if (row.dataset.level === '2' && currentDesktopSubmenu && currentMobileSubmenu) { // Submenu item
        const desktopSubmenuItem = document.createElement('li');
        const desktopSubmenuLink = document.createElement('a');
        desktopSubmenuLink.setAttribute('aria-expanded', 'false');
        desktopSubmenuLink.target = '_self';
        desktopSubmenuLink.href = href;
        const desktopSubmenuSpan = document.createElement('span');
        desktopSubmenuSpan.textContent = label;
        desktopSubmenuLink.append(desktopSubmenuSpan);
        desktopSubmenuItem.append(desktopSubmenuLink);
        currentDesktopSubmenu.append(desktopSubmenuItem);
        moveInstrumentation(row, desktopSubmenuItem);

        const mobileSubmenuItem = document.createElement('li');
        mobileSubmenuItem.classList.add('navigation-wrapper__mobilenavbar-menu');
        const mobileSubmenuLink = document.createElement('a');
        mobileSubmenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');
        mobileSubmenuLink.target = '_self';
        mobileSubmenuLink.href = href;
        const mobileSubmenuSpan = document.createElement('span');
        mobileSubmenuSpan.textContent = label;
        mobileSubmenuLink.append(mobileSubmenuSpan);
        mobileSubmenuItem.append(mobileSubmenuLink);
        currentMobileSubmenu.append(mobileSubmenuItem);
        moveInstrumentation(row, mobileSubmenuItem);
      }
    } else if (languagesStarted && typeCell.textContent.trim() === 'language') {
      const label = dataCell.children[0].textContent.trim();
      const href = dataCell.children[1].textContent.trim();

      // Desktop Language Selector (create if not exists)
      let desktopLangSelector = navbarDesktop.querySelector('.header-language-selector');
      if (!desktopLangSelector) {
        desktopLangSelector = document.createElement('div');
        desktopLangSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
        desktopLangSelector.style.visibility = 'visible';
        navbarDesktop.append(desktopLangSelector);
      }

      let desktopLangList = desktopLangSelector.querySelector('.header-cmp-language-selector');
      if (!desktopLangList) {
        desktopLangList = document.createElement('ul');
        desktopLangList.classList.add('header-cmp-language-selector');
        desktopLangSelector.append(desktopLangList);
      }

      const desktopLangItem = document.createElement('li');
      if (href === '/') { // Assuming '/' is the active language
        desktopLangItem.classList.add('active');
      }
      const desktopLangLink = document.createElement('a');
      desktopLangLink.href = href;
      desktopLangLink.setAttribute('aria-label', label);
      desktopLangLink.classList.add('header-cmp-language-selector__link');
      desktopLangLink.setAttribute('data-lang', label.substring(0, 2).toLowerCase()); // Simple data-lang creation
      desktopLangLink.textContent = label;
      desktopLangItem.append(desktopLangLink);
      desktopLangList.append(desktopLangItem);
      moveInstrumentation(row, desktopLangItem);

      // Mobile Language Selector (create if not exists)
      let mobileLangSelector = navbarMobile.querySelector('.header-language-selector');
      if (!mobileLangSelector) {
        mobileLangSelector = document.createElement('div');
        mobileLangSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
        mobileLangSelector.style.visibility = 'visible';
        navbarMobile.append(mobileLangSelector);
      }

      let mobileLangList = mobileLangSelector.querySelector('.header-cmp-language-selector');
      if (!mobileLangList) {
        mobileLangList = document.createElement('ul');
        mobileLangList.classList.add('header-cmp-language-selector');
        mobileLangSelector.append(mobileLangList);
      }

      const mobileLangItem = document.createElement('li');
      if (href === '/') { // Assuming '/' is the active language
        mobileLangItem.classList.add('active');
      }
      const mobileLangLink = document.createElement('a');
      mobileLangLink.href = href;
      mobileLangLink.setAttribute('aria-label', label);
      mobileLangLink.classList.add('header-cmp-language-selector__link');
      mobileLangLink.setAttribute('data-lang', label.substring(0, 2).toLowerCase()); // Simple data-lang creation
      mobileLangLink.textContent = label;
      mobileLangItem.append(mobileLangLink);
      mobileLangList.append(mobileLangItem);
      moveInstrumentation(row, mobileLangItem);
    }
  });

  // Add desktop contact us link (again, as per HTML structure)
  if (contactUsLinkA) {
    const desktopContactUsAnchor = document.createElement('a');
    desktopContactUsAnchor.href = contactUsLinkA.href;
    desktopContactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    desktopContactUsAnchor.target = '_self';
    desktopContactUsAnchor.setAttribute('aria-label', '${navigation.contactUsAriaLabel}'); // Note: This uses a placeholder from the original HTML

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    iconSpan.setAttribute('aria-hidden', 'true');
    desktopContactUsAnchor.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('header-cta__label');
    labelSpan.textContent = contactUsLinkA.textContent;
    desktopContactUsAnchor.append(labelSpan);
    navbarDesktop.append(desktopContactUsAnchor);
  }

  // Add mobile navigation back button
  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');
  navbarMobile.append(mobileNavBack);

  const mobileNavBackIconWrapper = document.createElement('a');
  mobileNavBackIconWrapper.classList.add('navigation-wrapper__icon');
  const mobileNavBackIcon = document.createElement('span');
  mobileNavBackIcon.classList.add('header-back-icon', 'header-qd-icon', 'header-qd-icon--cheveron-left');
  mobileNavBackIconWrapper.append(mobileNavBackIcon);
  mobileNavBack.append(mobileNavBackIconWrapper);

  const mobileNavBackLabel = document.createElement('span');
  mobileNavBackLabel.classList.add('navigation-wrapper__iconlabel');
  mobileNavBackLabel.textContent = 'Back';
  mobileNavBack.append(mobileNavBackLabel);

  block.textContent = '';
  block.append(headerContainer);
}
