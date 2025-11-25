import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.id = 'container-e9226c8e5e';
  headerContainer.classList.add('header-container');

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

  // Extract logo link from the first row (logoLink)
  const logoLinkRow = block.children[0];
  const logoLinkCell = logoLinkRow.children[0];
  const logoLink = logoLinkCell.querySelector('a');

  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
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
    moveInstrumentation(logoLink, logoAnchor);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.classList.add('navigation-wrapper__contactUs-cta');

  // Extract contact us link and label from the first row (contactUsLabel, contactUsHref)
  const contactUsLink = logoLinkRow.children[1].querySelector('a');

  if (contactUsLink) {
    const contactUsAnchor = document.createElement('a');
    contactUsAnchor.href = contactUsLink.href;
    contactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    contactUsAnchor.target = '_self';
    contactUsAnchor.setAttribute('aria-label', contactUsLink.getAttribute('aria-label') || 'Contact Us');

    const ctaIconSpan = document.createElement('span');
    ctaIconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    ctaIconSpan.setAttribute('aria-hidden', 'true');
    contactUsAnchor.append(ctaIconSpan);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('header-cta__label');
    ctaLabelSpan.textContent = contactUsLink.textContent;
    contactUsAnchor.append(ctaLabelSpan);
    navigationWrapperContactUsCta.append(contactUsAnchor);
    moveInstrumentation(contactUsLink, contactUsAnchor);
  }

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

  // Desktop Navigation
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.classList.add('navigation-wrapper__navbar');
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.classList.add('navigation-wrapper__navbar-list');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  // Mobile Navigation
  const navbarMobile = document.createElement('nav');
  navbarMobile.classList.add('navigation-wrapper__mobilenavbar');
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.classList.add('navigation-wrapper__mobilenavbar-list');

  // Iterate over block children for navigation items and languages
  // Skip the first row as it's handled for logo and contact us
  const navItemsStartRow = 1;
  let languageStartRow = -1;

  // Find the starting row for languages (assuming they come after nav items)
  for (let i = navItemsStartRow; i < block.children.length; i += 1) {
    const row = block.children[i];
    const firstCell = row.children[0];
    if (firstCell && firstCell.textContent.trim().toLowerCase().includes('language')) {
      languageStartRow = i;
      break;
    }
  }

  // Process navigation items
  for (let i = navItemsStartRow; i < (languageStartRow !== -1 ? languageStartRow : block.children.length); i += 1) {
    const row = block.children[i];
    const cells = [...row.children];

    if (cells.length >= 2) { // Expect at least a main link and potentially sub-links
      const mainLinkCell = cells[0];
      const mainLink = mainLinkCell.querySelector('a');
      const mainLabel = mainLinkCell.textContent.trim();

      if (mainLink) {
        // Desktop Nav Item
        const desktopNavItem = document.createElement('li');
        desktopNavItem.classList.add('navigation-wrapper__navbar-menu');
        moveInstrumentation(row, desktopNavItem);

        const desktopMainAnchor = document.createElement('a');
        desktopMainAnchor.setAttribute('aria-haspopup', 'true');
        desktopMainAnchor.setAttribute('aria-expanded', 'false');
        desktopMainAnchor.classList.add('navigation-wrapper__navbar-menulink');
        desktopMainAnchor.target = '_self';
        desktopMainAnchor.href = mainLink.href;

        const desktopSpanLabel = document.createElement('span');
        desktopSpanLabel.textContent = mainLabel;
        desktopMainAnchor.append(desktopSpanLabel);

        const desktopIconWrapper = document.createElement('span');
        desktopIconWrapper.classList.add('header-qd-icon-wrapper');
        const desktopMenuIcon = document.createElement('span');
        desktopMenuIcon.classList.add('header-menu-icon', 'header-qd-icon', 'header-qd-icon--cheveron-down');
        desktopIconWrapper.append(desktopMenuIcon);
        desktopMainAnchor.append(desktopIconWrapper);
        desktopNavItem.append(desktopMainAnchor);

        // Mobile Nav Item
        const mobileNavItem = document.createElement('li');
        mobileNavItem.classList.add('navigation-wrapper__mobilenavbar-menu', 'border');
        moveInstrumentation(row, mobileNavItem);

        const mobileMainAnchor = document.createElement('a');
        mobileMainAnchor.classList.add('navigation-wrapper__mobilenavbar-menulink');

        const mobileSpanLabel = document.createElement('span');
        mobileSpanLabel.textContent = mainLabel;
        mobileMainAnchor.append(mobileSpanLabel);

        const mobileIcon = document.createElement('span');
        mobileIcon.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'navigation-wrapper__mobilenavbar-menulink-icon');
        mobileMainAnchor.append(mobileIcon);
        mobileNavItem.append(mobileMainAnchor);

        // Submenu (if present)
        if (cells.length > 1 && cells[1].children.length > 0) {
          const desktopSubmenu = document.createElement('ul');
          desktopSubmenu.classList.add('navigation-wrapper__navbar-submenu');
          desktopNavItem.append(desktopSubmenu);

          const mobileSubmenu = document.createElement('ul');
          mobileSubmenu.classList.add('navigation-wrapper__mobilenavbar-submenu');
          mobileNavItem.append(mobileSubmenu);

          const mobileSubmenuHeader = document.createElement('li');
          mobileSubmenuHeader.classList.add('navigation-wrapper__mobilenavbar-menuheader');
          const mobileSubmenuHeaderAnchor = document.createElement('a');
          const mobileSubmenuHeaderSpan = document.createElement('span');
          mobileSubmenuHeaderSpan.textContent = mainLabel;
          mobileSubmenuHeaderAnchor.append(mobileSubmenuHeaderSpan);
          mobileSubmenuHeader.append(mobileSubmenuHeaderAnchor);
          mobileSubmenu.append(mobileSubmenuHeader);

          [...cells[1].children].forEach((subCell) => {
            const subLink = subCell.querySelector('a');
            if (subLink) {
              // Desktop Submenu Item
              const desktopSubmenuItem = document.createElement('li');
              const desktopSubmenuAnchor = document.createElement('a');
              desktopSubmenuAnchor.setAttribute('aria-expanded', 'false');
              desktopSubmenuAnchor.target = '_self';
              desktopSubmenuAnchor.href = subLink.href;
              const desktopSubmenuSpan = document.createElement('span');
              desktopSubmenuSpan.textContent = subLink.textContent;
              desktopSubmenuAnchor.append(desktopSubmenuSpan);
              desktopSubmenuItem.append(desktopSubmenuAnchor);
              desktopSubmenu.append(desktopSubmenuItem);
              moveInstrumentation(subLink, desktopSubmenuAnchor);

              // Mobile Submenu Item
              const mobileSubmenuItem = document.createElement('li');
              mobileSubmenuItem.classList.add('navigation-wrapper__mobilenavbar-menu');
              const mobileSubmenuAnchor = document.createElement('a');
              mobileSubmenuAnchor.classList.add('navigation-wrapper__mobilenavbar-menulink');
              mobileSubmenuAnchor.target = '_self';
              mobileSubmenuAnchor.href = subLink.href;
              const mobileSubmenuSpan = document.createElement('span');
              mobileSubmenuSpan.textContent = subLink.textContent;
              mobileSubmenuAnchor.append(mobileSubmenuSpan);
              mobileSubmenuItem.append(mobileSubmenuAnchor);
              mobileSubmenu.append(mobileSubmenuItem);
              moveInstrumentation(subLink, mobileSubmenuAnchor);
            }
          });
        }

        navbarDesktopList.append(desktopNavItem);
        navbarMobileList.append(mobileNavItem);
      }
    }
  }

  navbarDesktop.append(navbarDesktopList);

  // Add Contact Us CTA for desktop (duplicate from above)
  if (contactUsLink) {
    const desktopContactUsAnchor = document.createElement('a');
    desktopContactUsAnchor.href = contactUsLink.href;
    desktopContactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    desktopContactUsAnchor.target = '_self';
    desktopContactUsAnchor.setAttribute('aria-label', contactUsLink.getAttribute('aria-label') || 'Contact Us');

    const desktopCtaIconSpan = document.createElement('span');
    desktopCtaIconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    desktopCtaIconSpan.setAttribute('aria-hidden', 'true');
    desktopContactUsAnchor.append(desktopCtaIconSpan);

    const desktopCtaLabelSpan = document.createElement('span');
    desktopCtaLabelSpan.classList.add('header-cta__label');
    desktopCtaLabelSpan.textContent = contactUsLink.textContent;
    desktopContactUsAnchor.append(desktopCtaLabelSpan);
    navbarDesktop.append(desktopContactUsAnchor);
    moveInstrumentation(contactUsLink, desktopContactUsAnchor);
  }

  // Language Selector
  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  desktopLanguageSelector.style.visibility = 'visible';

  const desktopLangUl = document.createElement('ul');
  desktopLangUl.classList.add('header-cmp-language-selector');

  const mobileLanguageSelector = desktopLanguageSelector.cloneNode(true); // Clone for mobile
  const mobileLangUl = mobileLanguageSelector.querySelector('ul');

  if (languageStartRow !== -1) {
    for (let i = languageStartRow; i < block.children.length; i += 1) {
      const row = block.children[i];
      const langLabelCell = row.children[0];
      const langLinkCell = row.children[1];

      const langLabel = langLabelCell.textContent.trim();
      const langLink = langLinkCell.querySelector('a');

      if (langLink) {
        const desktopLangLi = document.createElement('li');
        if (langLink.href === '/') {
          desktopLangLi.classList.add('active');
        }
        const desktopLangAnchor = document.createElement('a');
        desktopLangAnchor.href = langLink.href;
        desktopLangAnchor.setAttribute('aria-label', langLabel);
        desktopLangAnchor.classList.add('header-cmp-language-selector__link');
        desktopLangAnchor.setAttribute('data-lang', langLink.getAttribute('data-lang') || (langLink.href === '/' ? 'en' : 'ar'));
        desktopLangAnchor.textContent = langLabel;
        desktopLangLi.append(desktopLangAnchor);
        desktopLangUl.append(desktopLangLi);
        moveInstrumentation(langLink, desktopLangAnchor);

        const mobileLangLi = desktopLangLi.cloneNode(true);
        mobileLangUl.append(mobileLangLi);
      }
    }
  }

  desktopLanguageSelector.append(desktopLangUl);
  navbarDesktop.append(desktopLanguageSelector);

  navigationWrapper.append(navbarDesktop);

  // Mobile Nav Back Button
  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');

  const mobileBackIconWrapper = document.createElement('a');
  mobileBackIconWrapper.classList.add('navigation-wrapper__icon');
  const mobileBackIcon = document.createElement('span');
  mobileBackIcon.classList.add('header-back-icon', 'header-qd-icon', 'header-qd-icon--cheveron-left');
  mobileBackIconWrapper.append(mobileBackIcon);
  mobileNavBack.append(mobileBackIconWrapper);

  const mobileBackLabel = document.createElement('span');
  mobileBackLabel.classList.add('navigation-wrapper__iconlabel');
  mobileBackLabel.textContent = 'Back';
  mobileNavBack.append(mobileBackLabel);

  navbarMobile.append(navbarMobileList);
  navbarMobile.append(mobileNavBack);
  navbarMobile.append(mobileLanguageSelector);
  navigationWrapper.append(navbarMobile);

  headerNavigation.append(navigationWrapper);
  headerWrapper.append(headerNavigation);
  headerContainer.append(headerWrapper);

  block.textContent = '';
  block.append(headerContainer);
}
