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

  const logoLink = document.createElement('a');
  logoLink.target = '_self';
  const logoSpan = document.createElement('span');
  logoSpan.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
  for (let i = 1; i <= 25; i += 1) {
    const pathSpan = document.createElement('span');
    pathSpan.classList.add(`path${i}`);
    logoSpan.append(pathSpan);
  }
  logoLink.append(logoSpan);
  navigationWrapperLogo.append(logoLink);

  const navigationWrapperContactCta = document.createElement('div');
  navigationWrapperContactCta.classList.add('navigation-wrapper__contactUs-cta');

  const contactUsLink = document.createElement('a');
  contactUsLink.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
  contactUsLink.target = '_self';
  contactUsLink.setAttribute('aria-label', 'Contact Us');
  const contactUsIcon = document.createElement('span');
  contactUsIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  contactUsIcon.setAttribute('aria-hidden', 'true');
  const contactUsLabel = document.createElement('span');
  contactUsLabel.classList.add('header-cta__label');
  contactUsLabel.textContent = 'Contact Us';
  contactUsLink.append(contactUsIcon, contactUsLabel);
  navigationWrapperContactCta.append(contactUsLink);

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
  navigationWrapperContactCta.append(navigationWrapperIcon);
  navigationWrapperLogo.append(navigationWrapperContactCta);
  navigationWrapper.append(navigationWrapperLogo);

  const navDesktop = document.createElement('nav');
  navDesktop.classList.add('navigation-wrapper__navbar');
  navDesktop.id = 'navbar-desktop';
  navDesktop.setAttribute('role', 'navigation');
  navDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  const navDesktopList = document.createElement('ul');
  navDesktopList.classList.add('navigation-wrapper__navbar-list');

  const navMobile = document.createElement('nav');
  navMobile.classList.add('navigation-wrapper__mobilenavbar');
  navMobile.id = 'navbar-mobile';
  navMobile.setAttribute('role', 'navigation');
  navMobile.setAttribute('aria-label', 'navigation.main.aria.label');

  const navMobileList = document.createElement('ul');
  navMobileList.classList.add('navigation-wrapper__mobilenavbar-list');

  let logoLinkHref = '/';
  let contactUsLinkHref = '/contact/';

  const languages = [];

  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, rowIndex === 0 ? logoLink : document.createElement('div'));
    const cells = [...row.children];

    if (rowIndex === 0) {
      // First row contains logo link, contact us link, and menus
      const logoCell = cells[0];
      const contactCell = cells[cells.length - 1];
      logoLinkHref = logoCell.querySelector('a')?.href || '/';
      contactUsLinkHref = contactCell.querySelector('a')?.href || '/contact/';

      logoLink.href = logoLinkHref;
      contactUsLink.href = contactUsLinkHref;

      // Process menus
      cells.slice(1, cells.length - 1).forEach((menuCell) => {
        const menuLabel = menuCell.querySelector('p:first-child')?.textContent.trim();
        const menuLink = menuCell.querySelector('a:first-of-type')?.href;

        if (menuLabel) {
          // Desktop Menu Item
          const desktopMenuItem = document.createElement('li');
          desktopMenuItem.classList.add('navigation-wrapper__navbar-menu');
          const desktopMenuAnchor = document.createElement('a');
          desktopMenuAnchor.setAttribute('aria-haspopup', 'true');
          desktopMenuAnchor.setAttribute('aria-expanded', 'false');
          desktopMenuAnchor.classList.add('navigation-wrapper__navbar-menulink');
          desktopMenuAnchor.target = '_self';
          if (menuLink) {
            desktopMenuAnchor.href = menuLink;
          }
          const desktopMenuSpan = document.createElement('span');
          desktopMenuSpan.textContent = menuLabel;
          const desktopIconWrapper = document.createElement('span');
          desktopIconWrapper.classList.add('header-qd-icon-wrapper');
          const desktopMenuIcon = document.createElement('span');
          desktopMenuIcon.classList.add('header-menu-icon', 'header-qd-icon', 'header-qd-icon--cheveron-down');
          desktopIconWrapper.append(desktopMenuIcon);
          desktopMenuAnchor.append(desktopMenuSpan, desktopIconWrapper);
          desktopMenuItem.append(desktopMenuAnchor);

          const desktopSubmenu = document.createElement('ul');
          desktopSubmenu.classList.add('navigation-wrapper__navbar-submenu');

          // Mobile Menu Item
          const mobileMenuItem = document.createElement('li');
          mobileMenuItem.classList.add('navigation-wrapper__mobilenavbar-menu', 'border');
          const mobileMenuAnchor = document.createElement('a');
          mobileMenuAnchor.classList.add('navigation-wrapper__mobilenavbar-menulink');
          const mobileMenuSpan = document.createElement('span');
          mobileMenuSpan.textContent = menuLabel;
          const mobileMenuIcon = document.createElement('span');
          mobileMenuIcon.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'navigation-wrapper__mobilenavbar-menulink-icon');
          mobileMenuAnchor.append(mobileMenuSpan, mobileMenuIcon);
          mobileMenuItem.append(mobileMenuAnchor);

          const mobileSubmenu = document.createElement('ul');
          mobileSubmenu.classList.add('navigation-wrapper__mobilenavbar-submenu');
          const mobileSubmenuHeader = document.createElement('li');
          mobileSubmenuHeader.classList.add('navigation-wrapper__mobilenavbar-menuheader');
          const mobileSubmenuHeaderAnchor = document.createElement('a');
          const mobileSubmenuHeaderSpan = document.createElement('span');
          mobileSubmenuHeaderSpan.textContent = menuLabel;
          mobileSubmenuHeaderAnchor.append(mobileSubmenuHeaderSpan);
          mobileSubmenuHeader.append(mobileSubmenuHeaderAnchor);
          mobileSubmenu.append(mobileSubmenuHeader);

          const subLinksContainer = menuCell.querySelector('ul');
          if (subLinksContainer) {
            [...subLinksContainer.children].forEach((subLinkLi) => {
              const subLinkAnchor = subLinkLi.querySelector('a');
              if (subLinkAnchor) {
                const subLinkLabel = subLinkAnchor.textContent.trim();
                const subLinkHref = subLinkAnchor.href;

                // Desktop Sublink
                const desktopSubmenuItem = document.createElement('li');
                const desktopSubmenuAnchor = document.createElement('a');
                desktopSubmenuAnchor.setAttribute('aria-expanded', 'false');
                desktopSubmenuAnchor.target = '_self';
                desktopSubmenuAnchor.href = subLinkHref;
                const desktopSubmenuSpan = document.createElement('span');
                desktopSubmenuSpan.textContent = subLinkLabel;
                desktopSubmenuAnchor.append(desktopSubmenuSpan);
                desktopSubmenuItem.append(desktopSubmenuAnchor);
                desktopSubmenu.append(desktopSubmenuItem);

                // Mobile Sublink
                const mobileSubmenuItem = document.createElement('li');
                mobileSubmenuItem.classList.add('navigation-wrapper__mobilenavbar-menu');
                const mobileSubmenuAnchor = document.createElement('a');
                mobileSubmenuAnchor.classList.add('navigation-wrapper__mobilenavbar-menulink');
                mobileSubmenuAnchor.target = '_self';
                mobileSubmenuAnchor.href = subLinkHref;
                const mobileSubmenuSpan = document.createElement('span');
                mobileSubmenuSpan.textContent = subLinkLabel;
                mobileSubmenuAnchor.append(mobileSubmenuSpan);
                mobileSubmenuItem.append(mobileSubmenuAnchor);
                mobileSubmenu.append(mobileSubmenuItem);
              }
            });
          }
          desktopMenuItem.append(desktopSubmenu);
          navDesktopList.append(desktopMenuItem);

          mobileMenuItem.append(mobileSubmenu);
          navMobileList.append(mobileMenuItem);
        }
      });
    } else {
      // Subsequent rows contain language links
      cells.forEach((languageCell) => {
        const languageAnchor = languageCell.querySelector('a');
        if (languageAnchor) {
          languages.push({
            label: languageAnchor.textContent.trim(),
            href: languageAnchor.href,
            dataLang: languageAnchor.dataset.lang,
            isActive: languageCell.classList.contains('active'),
          });
        }
      });
    }
  });

  navDesktop.append(navDesktopList);

  const desktopContactUsLink = document.createElement('a');
  desktopContactUsLink.href = contactUsLinkHref;
  desktopContactUsLink.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
  desktopContactUsLink.target = '_self';
  desktopContactUsLink.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
  const desktopContactUsIcon = document.createElement('span');
  desktopContactUsIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  desktopContactUsIcon.setAttribute('aria-hidden', 'true');
  const desktopContactUsLabel = document.createElement('span');
  desktopContactUsLabel.classList.add('header-cta__label');
  desktopContactUsLabel.textContent = 'Contact Us';
  desktopContactUsLink.append(desktopContactUsIcon, desktopContactUsLabel);
  navDesktop.append(desktopContactUsLink);

  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  desktopLanguageSelector.style.visibility = 'visible';
  const desktopLangUl = document.createElement('ul');
  desktopLangUl.classList.add('header-cmp-language-selector');
  languages.forEach((lang) => {
    const li = document.createElement('li');
    if (lang.isActive) {
      li.classList.add('active');
    }
    const a = document.createElement('a');
    a.href = lang.href;
    a.setAttribute('aria-label', lang.label);
    a.classList.add('header-cmp-language-selector__link');
    if (lang.dataLang) {
      a.setAttribute('data-lang', lang.dataLang);
    }
    a.textContent = lang.label;
    li.append(a);
    desktopLangUl.append(li);
  });
  desktopLanguageSelector.append(desktopLangUl);
  navDesktop.append(desktopLanguageSelector);

  navigationWrapper.append(navDesktop);

  // Mobile navigation back button
  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');
  const mobileBackAnchor = document.createElement('a');
  mobileBackAnchor.classList.add('navigation-wrapper__icon');
  const mobileBackIcon = document.createElement('span');
  mobileBackIcon.classList.add('header-back-icon', 'header-qd-icon', 'header-qd-icon--cheveron-left');
  mobileBackAnchor.append(mobileBackIcon);
  const mobileBackLabel = document.createElement('span');
  mobileBackLabel.classList.add('navigation-wrapper__iconlabel');
  mobileBackLabel.textContent = 'Back';
  mobileNavBack.append(mobileBackAnchor, mobileBackLabel);
  navMobileList.append(mobileNavBack);

  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  mobileLanguageSelector.style.visibility = 'visible';
  const mobileLangUl = document.createElement('ul');
  mobileLangUl.classList.add('header-cmp-language-selector');
  languages.forEach((lang) => {
    const li = document.createElement('li');
    if (lang.isActive) {
      li.classList.add('active');
    }
    const a = document.createElement('a');
    a.href = lang.href;
    a.setAttribute('aria-label', lang.label);
    a.classList.add('header-cmp-language-selector__link');
    if (lang.dataLang) {
      a.setAttribute('data-lang', lang.dataLang);
    }
    a.textContent = lang.label;
    li.append(a);
    mobileLangUl.append(li);
  });
  mobileLanguageSelector.append(mobileLangUl);
  navMobileList.append(mobileLanguageSelector);

  navMobile.append(navMobileList);
  navigationWrapper.append(navMobile);

  headerNavigation.append(navigationWrapper);
  headerWrapper.append(headerNavigation);
  headerContainer.append(headerWrapper);

  block.textContent = '';
  block.append(headerContainer);
}
