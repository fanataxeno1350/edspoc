import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.id = 'container-e9226c8e5e';
  headerContainer.classList.add('header-container');
  moveInstrumentation(block, headerContainer);

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
  logoLink.target = '_self';

  const headerQdIcon = document.createElement('span');
  headerQdIcon.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
  for (let i = 1; i <= 25; i += 1) {
    headerQdIcon.appendChild(document.createElement('span')).classList.add(`path${i}`);
  }
  logoLink.appendChild(headerQdIcon);
  navigationWrapperLogo.appendChild(logoLink);

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.classList.add('navigation-wrapper__contactUs-cta');

  const contactUsLink = document.createElement('a');
  contactUsLink.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
  contactUsLink.target = '_self';
  contactUsLink.setAttribute('aria-label', 'Contact Us');

  const contactUsIcon = document.createElement('span');
  contactUsIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  contactUsIcon.setAttribute('aria-hidden', 'true');
  contactUsLink.appendChild(contactUsIcon);

  const contactUsLabel = document.createElement('span');
  contactUsLabel.classList.add('header-cta__label');
  contactUsLabel.textContent = 'Contact Us';
  contactUsLink.appendChild(contactUsLabel);
  navigationWrapperContactUsCta.appendChild(contactUsLink);

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.classList.add('navigation-wrapper__icon');
  navigationWrapperIcon.id = 'navigation-toggle';

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.classList.add('header-hamburger-ellipse');
  headerHamburgerEllipse.setAttribute('tabindex', '0');

  const headerHamburgerIcon = document.createElement('span');
  headerHamburgerIcon.classList.add('header-hamburger-icon', 'header-qd-icon', 'header-qd-icon--hamburger');
  headerHamburgerEllipse.appendChild(headerHamburgerIcon);

  const headerCloseIcon = document.createElement('span');
  headerCloseIcon.classList.add('header-close-icon', 'header-qd-icon', 'header-qd-icon--cancel');
  headerHamburgerEllipse.appendChild(headerCloseIcon);
  navigationWrapperIcon.appendChild(headerHamburgerEllipse);
  navigationWrapperContactUsCta.appendChild(navigationWrapperIcon);
  navigationWrapperLogo.appendChild(navigationWrapperContactUsCta);
  navigationWrapper.appendChild(navigationWrapperLogo);

  const navbarDesktop = document.createElement('nav');
  navbarDesktop.classList.add('navigation-wrapper__navbar');
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.classList.add('navigation-wrapper__navbar-list');
  navbarDesktop.appendChild(navbarDesktopList);

  const navbarMobile = document.createElement('nav');
  navbarMobile.classList.add('navigation-wrapper__mobilenavbar');
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.classList.add('navigation-wrapper__mobilenavbar-list');
  navbarMobile.appendChild(navbarMobileList);

  const navMenus = block.children[0].children[2];
  if (navMenus) {
    [...navMenus.children].forEach((row) => {
      const menuTitle = row.children[0].textContent;
      const menuLink = row.children[1].querySelector('a');
      const subMenuItems = row.children[2];

      // Desktop Menu
      const desktopMenuItem = document.createElement('li');
      desktopMenuItem.classList.add('navigation-wrapper__navbar-menu');
      moveInstrumentation(row, desktopMenuItem);

      const desktopMenuLink = document.createElement('a');
      desktopMenuLink.setAttribute('aria-haspopup', 'true');
      desktopMenuLink.setAttribute('aria-expanded', 'false');
      desktopMenuLink.classList.add('navigation-wrapper__navbar-menulink');
      desktopMenuLink.target = '_self';
      if (menuLink) {
        desktopMenuLink.href = menuLink.href;
      }
      const desktopMenuSpan = document.createElement('span');
      desktopMenuSpan.textContent = menuTitle;
      desktopMenuLink.appendChild(desktopMenuSpan);

      const desktopIconWrapper = document.createElement('span');
      desktopIconWrapper.classList.add('header-qd-icon-wrapper');
      const desktopMenuIcon = document.createElement('span');
      desktopMenuIcon.classList.add('header-menu-icon', 'header-qd-icon', 'header-qd-icon--cheveron-down');
      desktopIconWrapper.appendChild(desktopMenuIcon);
      desktopMenuLink.appendChild(desktopIconWrapper);
      desktopMenuItem.appendChild(desktopMenuLink);

      if (subMenuItems && subMenuItems.children.length > 0) {
        const desktopSubmenu = document.createElement('ul');
        desktopSubmenu.classList.add('navigation-wrapper__navbar-submenu');
        [...subMenuItems.children].forEach((subRow) => {
          const subMenuLabel = subRow.children[0].textContent;
          const subMenuLink = subRow.children[1].querySelector('a');

          const desktopSubmenuItem = document.createElement('li');
          moveInstrumentation(subRow, desktopSubmenuItem);
          const desktopSubmenuLink = document.createElement('a');
          desktopSubmenuLink.setAttribute('aria-expanded', 'false');
          desktopSubmenuLink.target = '_self';
          if (subMenuLink) {
            desktopSubmenuLink.href = subMenuLink.href;
          }
          const desktopSubmenuSpan = document.createElement('span');
          desktopSubmenuSpan.textContent = subMenuLabel;
          desktopSubmenuLink.appendChild(desktopSubmenuSpan);
          desktopSubmenuItem.appendChild(desktopSubmenuLink);
          desktopSubmenu.appendChild(desktopSubmenuItem);
        });
        desktopMenuItem.appendChild(desktopSubmenu);
      }
      navbarDesktopList.appendChild(desktopMenuItem);

      // Mobile Menu
      const mobileMenuItem = document.createElement('li');
      mobileMenuItem.classList.add('navigation-wrapper__mobilenavbar-menu', 'border');
      moveInstrumentation(row, mobileMenuItem);

      const mobileMenuLink = document.createElement('a');
      mobileMenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');
      const mobileMenuSpan = document.createElement('span');
      mobileMenuSpan.textContent = menuTitle;
      mobileMenuLink.appendChild(mobileMenuSpan);

      const mobileMenuIcon = document.createElement('span');
      mobileMenuIcon.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'navigation-wrapper__mobilenavbar-menulink-icon');
      mobileMenuLink.appendChild(mobileMenuIcon);
      mobileMenuItem.appendChild(mobileMenuLink);

      if (subMenuItems && subMenuItems.children.length > 0) {
        const mobileSubmenu = document.createElement('ul');
        mobileSubmenu.classList.add('navigation-wrapper__mobilenavbar-submenu');

        const mobileSubmenuHeader = document.createElement('li');
        mobileSubmenuHeader.classList.add('navigation-wrapper__mobilenavbar-menuheader');
        const mobileSubmenuHeaderLink = document.createElement('a');
        const mobileSubmenuHeaderSpan = document.createElement('span');
        mobileSubmenuHeaderSpan.textContent = menuTitle;
        mobileSubmenuHeaderLink.appendChild(mobileSubmenuHeaderSpan);
        mobileSubmenuHeader.appendChild(mobileSubmenuHeaderLink);
        mobileSubmenu.appendChild(mobileSubmenuHeader);

        [...subMenuItems.children].forEach((subRow) => {
          const subMenuLabel = subRow.children[0].textContent;
          const subMenuLink = subRow.children[1].querySelector('a');

          const mobileSubmenuItem = document.createElement('li');
          mobileSubmenuItem.classList.add('navigation-wrapper__mobilenavbar-menu');
          moveInstrumentation(subRow, mobileSubmenuItem);
          const mobileSubmenuLink = document.createElement('a');
          mobileSubmenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');
          mobileSubmenuLink.target = '_self';
          if (subMenuLink) {
            mobileSubmenuLink.href = subMenuLink.href;
          }
          const mobileSubmenuSpan = document.createElement('span');
          mobileSubmenuSpan.textContent = subMenuLabel;
          mobileSubmenuLink.appendChild(mobileSubmenuSpan);
          mobileSubmenuItem.appendChild(mobileSubmenuLink);
          mobileSubmenu.appendChild(mobileSubmenuItem);
        });
        mobileMenuItem.appendChild(mobileSubmenu);
      }
      navbarMobileList.appendChild(mobileMenuItem);
    });
  }

  // Desktop Contact Us CTA (duplicate from above)
  const desktopContactUsCta = document.createElement('a');
  desktopContactUsCta.href = '/contact/';
  desktopContactUsCta.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
  desktopContactUsCta.target = '_self';
  desktopContactUsCta.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
  const desktopContactUsIcon = document.createElement('span');
  desktopContactUsIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  desktopContactUsIcon.setAttribute('aria-hidden', 'true');
  desktopContactUsCta.appendChild(desktopContactUsIcon);
  const desktopContactUsLabel = document.createElement('span');
  desktopContactUsLabel.classList.add('header-cta__label');
  desktopContactUsLabel.textContent = 'Contact Us';
  desktopContactUsCta.appendChild(desktopContactUsLabel);
  navbarDesktop.appendChild(desktopContactUsCta);

  // Language Selector for Desktop
  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  desktopLanguageSelector.style.visibility = 'visible';
  const desktopLanguageList = document.createElement('ul');
  desktopLanguageList.classList.add('header-cmp-language-selector');
  desktopLanguageSelector.appendChild(desktopLanguageList);
  navbarDesktop.appendChild(desktopLanguageSelector);

  // Language Selector for Mobile
  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  mobileLanguageSelector.style.visibility = 'visible';
  const mobileLanguageList = document.createElement('ul');
  mobileLanguageList.classList.add('header-cmp-language-selector');
  mobileLanguageSelector.appendChild(mobileLanguageList);

  const languages = block.children[0].children[3];
  if (languages) {
    [...languages.children].forEach((row) => {
      const label = row.children[0].textContent;
      const link = row.children[1].querySelector('a');

      const desktopLangItem = document.createElement('li');
      moveInstrumentation(row, desktopLangItem);
      const desktopLangLink = document.createElement('a');
      if (link) {
        desktopLangLink.href = link.href;
        desktopLangLink.setAttribute('aria-label', label);
        desktopLangLink.classList.add('header-cmp-language-selector__link');
        desktopLangLink.setAttribute('data-lang', link.href === '/' ? 'en' : 'ar'); // Assuming / is en, /ar/ is ar
        desktopLangLink.textContent = label;
      }
      if (link.href === '/') {
        desktopLangItem.classList.add('active');
      }
      desktopLangItem.appendChild(desktopLangLink);
      desktopLanguageList.appendChild(desktopLangItem);

      const mobileLangItem = document.createElement('li');
      moveInstrumentation(row, mobileLangItem);
      const mobileLangLink = document.createElement('a');
      if (link) {
        mobileLangLink.href = link.href;
        mobileLangLink.setAttribute('aria-label', label);
        mobileLangLink.classList.add('header-cmp-language-selector__link');
        mobileLangLink.setAttribute('data-lang', link.href === '/' ? 'en' : 'ar');
        mobileLangLink.textContent = label;
      }
      if (link.href === '/') {
        mobileLangItem.classList.add('active');
      }
      mobileLangItem.appendChild(mobileLangLink);
      mobileLanguageList.appendChild(mobileLangItem);
    });
  }
  navbarMobile.appendChild(mobileLanguageSelector);

  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');

  const mobileNavBackIconWrapper = document.createElement('a');
  mobileNavBackIconWrapper.classList.add('navigation-wrapper__icon');
  const mobileNavBackIcon = document.createElement('span');
  mobileNavBackIcon.classList.add('header-back-icon', 'header-qd-icon', 'header-qd-icon--cheveron-left');
  mobileNavBackIconWrapper.appendChild(mobileNavBackIcon);
  mobileNavBack.appendChild(mobileNavBackIconWrapper);

  const mobileNavBackLabel = document.createElement('span');
  mobileNavBackLabel.classList.add('navigation-wrapper__iconlabel');
  mobileNavBackLabel.textContent = 'Back';
  mobileNavBack.appendChild(mobileNavBackLabel);
  navbarMobile.appendChild(mobileNavBack);

  navigationWrapper.appendChild(navbarDesktop);
  navigationWrapper.appendChild(navbarMobile);
  headerNavigation.appendChild(navigationWrapper);
  headerWrapper.appendChild(headerNavigation);
  headerContainer.appendChild(headerWrapper);

  block.textContent = '';
  block.append(headerContainer);

  // Set dynamic links from block data
  const logoLinkData = block.children[0].children[0].querySelector('a');
  if (logoLinkData) {
    logoLink.href = logoLinkData.href;
  }

  const contactUsLinkData = block.children[0].children[1].querySelector('a');
  if (contactUsLinkData) {
    contactUsLink.href = contactUsLinkData.href;
  }
}
