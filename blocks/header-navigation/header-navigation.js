import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createHeaderQdIcon(className) {
  const span = document.createElement('span');
  span.className = `header-qd-icon ${className}`;
  for (let i = 1; i <= 25; i += 1) {
    span.append(document.createElement('span'));
  }
  return span;
}

function createHeaderCta(link, label, ariaLabel) {
  const a = document.createElement('a');
  a.href = link;
  a.className = 'header-cta header-cta__ navigation--content__cta';
  a.target = '_self';
  a.setAttribute('aria-label', ariaLabel);

  const iconSpan = document.createElement('span');
  iconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  iconSpan.setAttribute('aria-hidden', 'true');

  const labelSpan = document.createElement('span');
  labelSpan.className = 'header-cta__label';
  labelSpan.textContent = label;

  a.append(iconSpan, labelSpan);
  return a;
}

function createNavSubmenu(submenuData) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.setAttribute('aria-expanded', 'false');
  a.target = '_self';
  a.href = submenuData.link;
  const span = document.createElement('span');
  span.textContent = submenuData.label;
  a.append(span);
  li.append(a);
  return li;
}

function createMobileNavSubmenu(submenuData) {
  const li = document.createElement('li');
  li.className = 'navigation-wrapper__mobilenavbar-menu';
  const a = document.createElement('a');
  a.className = 'navigation-wrapper__mobilenavbar-menulink';
  a.target = '_self';
  a.href = submenuData.link;
  const span = document.createElement('span');
  span.textContent = submenuData.label;
  a.append(span);
  li.append(a);
  return li;
}

function createLanguageSelector(languagesData, isMobile = false) {
  const headerLanguageSelector = document.createElement('div');
  headerLanguageSelector.className = `header-language-selector header-lang-css-from-wrapper`;
  headerLanguageSelector.style.visibility = 'visible';

  const ul = document.createElement('ul');
  ul.className = 'header-cmp-language-selector';

  languagesData.forEach((lang, index) => {
    const li = document.createElement('li');
    if (index === 0) {
      li.className = 'active';
    }
    const a = document.createElement('a');
    a.href = lang.link;
    a.setAttribute('aria-label', lang.label);
    a.className = 'header-cmp-language-selector__link';
    a.setAttribute('data-lang', lang.link.split('/').filter(Boolean).pop() || 'en'); // Simple logic for data-lang
    a.textContent = lang.label;
    li.append(a);
    ul.append(li);
  });

  headerLanguageSelector.append(ul);
  return headerLanguageSelector;
}

export default async function decorate(block) {
  const headerNavigationData = {};

  // Extract logoLink
  const logoLinkEl = block.querySelector(':scope > div:first-child > div:first-child > div:first-child > div:first-child > div:first-child > a');
  if (logoLinkEl) {
    headerNavigationData.logoLink = logoLinkEl.href;
  }

  // Extract contactUsLink and contactUsLabel
  const contactUsCtaEl = block.querySelector(':scope > div:first-child > div:first-child > div:first-child > div:first-child > div:nth-child(2) > a');
  if (contactUsCtaEl) {
    headerNavigationData.contactUsLink = contactUsCtaEl.href;
    headerNavigationData.contactUsLabel = contactUsCtaEl.querySelector('.header-cta__label')?.textContent;
  }

  // Extract navMenus (desktop)
  headerNavigationData.navMenus = [];
  const desktopNavList = block.querySelector(':scope > div:first-child > div:first-child > div:first-child > nav.navigation-wrapper__navbar > ul.navigation-wrapper__navbar-list');
  if (desktopNavList) {
    Array.from(desktopNavList.children).forEach((menuLi) => {
      const menuLinkEl = menuLi.querySelector(':scope > a');
      if (menuLinkEl) {
        const menu = {
          label: menuLinkEl.querySelector('span:first-child')?.textContent,
          link: menuLinkEl.href,
          submenus: [],
        };
        const submenuUl = menuLi.querySelector(':scope > ul.navigation-wrapper__navbar-submenu');
        if (submenuUl) {
          Array.from(submenuUl.children).forEach((submenuLi) => {
            const submenuLinkEl = submenuLi.querySelector(':scope > a');
            if (submenuLinkEl) {
              menu.submenus.push({
                label: submenuLinkEl.querySelector('span')?.textContent,
                link: submenuLinkEl.href,
              });
            }
          });
        }
        headerNavigationData.navMenus.push(menu);
      }
    });
  }

  // Extract mobileNavMenus
  headerNavigationData.mobileNavMenus = [];
  const mobileNavList = block.querySelector(':scope > div:first-child > div:first-child > div:first-child > nav.navigation-wrapper__mobilenavbar > ul.navigation-wrapper__mobilenavbar-list');
  if (mobileNavList) {
    Array.from(mobileNavList.children).forEach((menuLi) => {
      const menuLinkEl = menuLi.querySelector(':scope > a');
      if (menuLinkEl) {
        const menu = {
          label: menuLinkEl.querySelector('span:first-child')?.textContent,
          link: '', // Mobile parent links are not direct, but submenus are
          submenus: [],
        };
        const submenuUl = menuLi.querySelector(':scope > ul.navigation-wrapper__mobilenavbar-submenu');
        if (submenuUl) {
          Array.from(submenuUl.children).forEach((submenuLi, index) => {
            if (index === 0) return; // Skip the header
            const submenuLinkEl = submenuLi.querySelector(':scope > a');
            if (submenuLinkEl) {
              menu.submenus.push({
                label: submenuLinkEl.querySelector('span')?.textContent,
                link: submenuLinkEl.href,
              });
            }
          });
        }
        headerNavigationData.mobileNavMenus.push(menu);
      }
    });
  }

  // Extract languages
  headerNavigationData.languages = [];
  const languageSelectorUl = block.querySelector(':scope .header-cmp-language-selector');
  if (languageSelectorUl) {
    Array.from(languageSelectorUl.children).forEach((li) => {
      const a = li.querySelector(':scope > a');
      if (a) {
        headerNavigationData.languages.push({
          label: a.textContent,
          link: a.href,
        });
      }
    });
  }

  // Rebuild the DOM
  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';
  moveInstrumentation(block.firstElementChild, headerContainer);

  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper layout-container transparent-header';
  moveInstrumentation(block.firstElementChild.firstElementChild, headerWrapper);

  const headerNavigation = document.createElement('div');
  headerNavigation.className = 'header-navigation';
  moveInstrumentation(block.firstElementChild.firstElementChild.firstElementChild, headerNavigation);

  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  moveInstrumentation(block.querySelector('.navigation-wrapper'), navigationWrapper);

  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.className = 'navigation-wrapper__logo';
  moveInstrumentation(block.querySelector('.navigation-wrapper__logo'), navigationWrapperLogo);

  const logoLinkA = document.createElement('a');
  logoLinkA.href = headerNavigationData.logoLink;
  logoLinkA.target = '_self';
  moveInstrumentation(block.querySelector('.navigation-wrapper__logo > a'), logoLinkA);

  const headerQdLogoSpan = createHeaderQdIcon('header-qd-icon--logo header-qd-logo');
  moveInstrumentation(block.querySelector('.header-qd-logo'), headerQdLogoSpan);
  logoLinkA.append(headerQdLogoSpan);
  navigationWrapperLogo.append(logoLinkA);

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  moveInstrumentation(block.querySelector('.navigation-wrapper__contactUs-cta'), navigationWrapperContactUsCta);

  const contactUsCta = createHeaderCta(headerNavigationData.contactUsLink, headerNavigationData.contactUsLabel, 'Contact Us');
  moveInstrumentation(block.querySelector('.navigation-wrapper__contactUs-cta > a'), contactUsCta);
  navigationWrapperContactUsCta.append(contactUsCta);

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.className = 'navigation-wrapper__icon';
  navigationWrapperIcon.id = 'navigation-toggle';
  moveInstrumentation(block.querySelector('#navigation-toggle'), navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.className = 'header-hamburger-ellipse';
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  moveInstrumentation(block.querySelector('.header-hamburger-ellipse'), headerHamburgerEllipse);

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.className = 'header-hamburger-icon header-qd-icon header-qd-icon--hamburger';
  moveInstrumentation(block.querySelector('.header-qd-icon--hamburger'), hamburgerIcon);

  const closeIcon = document.createElement('span');
  closeIcon.className = 'header-close-icon header-qd-icon header-qd-icon--cancel';
  moveInstrumentation(block.querySelector('.header-qd-icon--cancel'), closeIcon);

  headerHamburgerEllipse.append(hamburgerIcon, closeIcon);
  navigationWrapperIcon.append(headerHamburgerEllipse);
  navigationWrapperContactUsCta.append(navigationWrapperIcon);
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const navbarDesktop = document.createElement('nav');
  navbarDesktop.className = 'navigation-wrapper__navbar';
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  moveInstrumentation(block.querySelector('#navbar-desktop'), navbarDesktop);

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.className = 'navigation-wrapper__navbar-list';
  moveInstrumentation(block.querySelector('#navbar-desktop > ul'), navbarDesktopList);

  headerNavigationData.navMenus.forEach((menuData) => {
    const menuLi = document.createElement('li');
    menuLi.className = 'navigation-wrapper__navbar-menu';

    const menuLinkA = document.createElement('a');
    menuLinkA.setAttribute('aria-haspopup', 'true');
    menuLinkA.setAttribute('aria-expanded', 'false');
    menuLinkA.className = 'navigation-wrapper__navbar-menulink';
    menuLinkA.target = '_self';
    menuLinkA.href = menuData.link;

    const menuLabelSpan = document.createElement('span');
    menuLabelSpan.textContent = menuData.label;

    const iconWrapperSpan = document.createElement('span');
    iconWrapperSpan.className = 'header-qd-icon-wrapper';

    const menuIconSpan = document.createElement('span');
    menuIconSpan.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';

    iconWrapperSpan.append(menuIconSpan);
    menuLinkA.append(menuLabelSpan, iconWrapperSpan);
    menuLi.append(menuLinkA);

    if (menuData.submenus.length > 0) {
      const submenuUl = document.createElement('ul');
      submenuUl.className = 'navigation-wrapper__navbar-submenu';
      menuData.submenus.forEach((submenuData) => {
        submenuUl.append(createNavSubmenu(submenuData));
      });
      menuLi.append(submenuUl);
    }
    navbarDesktopList.append(menuLi);
  });
  navbarDesktop.append(navbarDesktopList);

  const desktopContactUsCta = createHeaderCta(headerNavigationData.contactUsLink, headerNavigationData.contactUsLabel, '${navigation.contactUsAriaLabel}');
  moveInstrumentation(block.querySelector('#navbar-desktop > a'), desktopContactUsCta);
  navbarDesktop.append(desktopContactUsCta);

  const desktopLanguageSelector = createLanguageSelector(headerNavigationData.languages);
  moveInstrumentation(block.querySelector('#navbar-desktop > .header-language-selector'), desktopLanguageSelector);
  navbarDesktop.append(desktopLanguageSelector);

  navigationWrapper.append(navbarDesktop);

  const navbarMobile = document.createElement('nav');
  navbarMobile.className = 'navigation-wrapper__mobilenavbar';
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  moveInstrumentation(block.querySelector('#navbar-mobile'), navbarMobile);

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.className = 'navigation-wrapper__mobilenavbar-list';
  moveInstrumentation(block.querySelector('#navbar-mobile > ul'), navbarMobileList);

  headerNavigationData.mobileNavMenus.forEach((menuData) => {
    const menuLi = document.createElement('li');
    menuLi.className = 'navigation-wrapper__mobilenavbar-menu border';

    const menuLinkA = document.createElement('a');
    menuLinkA.className = 'navigation-wrapper__mobilenavbar-menulink';

    const menuLabelSpan = document.createElement('span');
    menuLabelSpan.textContent = menuData.label;

    const menuIconSpan = document.createElement('span');
    menuIconSpan.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';

    menuLinkA.append(menuLabelSpan, menuIconSpan);
    menuLi.append(menuLinkA);

    if (menuData.submenus.length > 0) {
      const submenuUl = document.createElement('ul');
      submenuUl.className = 'navigation-wrapper__mobilenavbar-submenu';

      const submenuHeaderLi = document.createElement('li');
      submenuHeaderLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
      const submenuHeaderA = document.createElement('a');
      const submenuHeaderSpan = document.createElement('span');
      submenuHeaderSpan.textContent = menuData.label;
      submenuHeaderA.append(submenuHeaderSpan);
      submenuHeaderLi.append(submenuHeaderA);
      submenuUl.append(submenuHeaderLi);

      menuData.submenus.forEach((submenuData) => {
        submenuUl.append(createMobileNavSubmenu(submenuData));
      });
      menuLi.append(submenuUl);
    }
    navbarMobileList.append(menuLi);
  });
  navbarMobile.append(navbarMobileList);

  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  moveInstrumentation(block.querySelector('.navigation-wrapper__mobilenavbar-back'), mobileNavBack);

  const mobileBackIconA = document.createElement('a');
  mobileBackIconA.className = 'navigation-wrapper__icon';
  moveInstrumentation(block.querySelector('.navigation-wrapper__mobilenavbar-back > a'), mobileBackIconA);

  const mobileBackIconSpan = document.createElement('span');
  mobileBackIconSpan.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  moveInstrumentation(block.querySelector('.header-back-icon'), mobileBackIconSpan);
  mobileBackIconA.append(mobileBackIconSpan);

  const mobileBackLabelSpan = document.createElement('span');
  mobileBackLabelSpan.className = 'navigation-wrapper__iconlabel';
  mobileBackLabelSpan.textContent = 'Back';
  moveInstrumentation(block.querySelector('.navigation-wrapper__iconlabel'), mobileBackLabelSpan);

  mobileNavBack.append(mobileBackIconA, mobileBackLabelSpan);
  navbarMobile.append(mobileNavBack);

  const mobileLanguageSelector = createLanguageSelector(headerNavigationData.languages, true);
  moveInstrumentation(block.querySelector('#navbar-mobile > .header-language-selector'), mobileLanguageSelector);
  navbarMobile.append(mobileLanguageSelector);

  navigationWrapper.append(navbarMobile);
  headerNavigation.append(navigationWrapper);
  headerWrapper.append(headerNavigation);
  headerContainer.append(headerWrapper);

  // block.textContent = '';
  block.append(headerContainer);
}
