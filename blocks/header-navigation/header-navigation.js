import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createHeaderQDIcon(className) {
  const span = document.createElement('span');
  span.className = `header-qd-icon ${className}`;
  for (let i = 1; i <= 25; i += 1) {
    span.append(document.createElement('span'));
  }
  return span;
}

function createLanguageSelector(languagesData, originalLanguageSelector) {
  const headerLanguageSelector = document.createElement('div');
  headerLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  if (originalLanguageSelector) {
    moveInstrumentation(originalLanguageSelector, headerLanguageSelector);
  }

  const ul = document.createElement('ul');
  ul.className = 'header-cmp-language-selector';

  languagesData.forEach((lang, index) => {
    const li = document.createElement('li');
    if (index === 0) {
      li.classList.add('active');
    }
    const a = document.createElement('a');
    a.href = lang.link;
    a.setAttribute('aria-label', lang.label);
    a.className = 'header-cmp-language-selector__link';
    a.setAttribute('data-lang', lang.label.substring(0, 2).toLowerCase()); // Assuming first two letters for lang code
    a.textContent = lang.label;
    li.append(a);
    ul.append(li);
  });

  headerLanguageSelector.append(ul);
  return headerLanguageSelector;
}

function createDesktopNavMenu(navMenuData) {
  const li = document.createElement('li');
  li.className = 'navigation-wrapper__navbar-menu';

  const menuLink = document.createElement('a');
  menuLink.setAttribute('aria-haspopup', 'true');
  menuLink.setAttribute('aria-expanded', 'false');
  menuLink.className = 'navigation-wrapper__navbar-menulink';
  menuLink.target = '_self';
  menuLink.href = navMenuData.link;

  const spanLabel = document.createElement('span');
  spanLabel.textContent = navMenuData.label;
  menuLink.append(spanLabel);

  const iconWrapper = document.createElement('span');
  iconWrapper.className = 'header-qd-icon-wrapper';
  const icon = document.createElement('span');
  icon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
  iconWrapper.append(icon);
  menuLink.append(iconWrapper);
  li.append(menuLink);

  if (navMenuData.subMenus && navMenuData.subMenus.length > 0) {
    const subMenuUl = document.createElement('ul');
    subMenuUl.className = 'navigation-wrapper__navbar-submenu';
    navMenuData.subMenus.forEach((subMenuItem) => {
      const subMenuLi = document.createElement('li');
      const subMenuA = document.createElement('a');
      subMenuA.setAttribute('aria-expanded', 'false');
      subMenuA.target = '_self';
      subMenuA.href = subMenuItem.link;
      const subMenuSpan = document.createElement('span');
      subMenuSpan.textContent = subMenuItem.label;
      subMenuA.append(subMenuSpan);
      subMenuLi.append(subMenuA);
      subMenuUl.append(subMenuLi);
    });
    li.append(subMenuUl);
  }
  return li;
}

function createMobileNavMenu(navMenuData) {
  const li = document.createElement('li');
  li.className = 'navigation-wrapper__mobilenavbar-menu border';

  const menuLink = document.createElement('a');
  menuLink.className = 'navigation-wrapper__mobilenavbar-menulink';

  const spanLabel = document.createElement('span');
  spanLabel.textContent = navMenuData.label;
  menuLink.append(spanLabel);

  const icon = document.createElement('span');
  icon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
  menuLink.append(icon);
  li.append(menuLink);

  if (navMenuData.subMenus && navMenuData.subMenus.length > 0) {
    const subMenuUl = document.createElement('ul');
    subMenuUl.className = 'navigation-wrapper__mobilenavbar-submenu';

    const headerLi = document.createElement('li');
    headerLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
    const headerA = document.createElement('a');
    const headerSpan = document.createElement('span');
    headerSpan.textContent = navMenuData.label;
    headerA.append(headerSpan);
    headerLi.append(headerA);
    subMenuUl.append(headerLi);

    navMenuData.subMenus.forEach((subMenuItem) => {
      const subMenuLi = document.createElement('li');
      subMenuLi.className = 'navigation-wrapper__mobilenavbar-menu';
      const subMenuA = document.createElement('a');
      subMenuA.className = 'navigation-wrapper__mobilenavbar-menulink';
      subMenuA.target = '_self';
      subMenuA.href = subMenuItem.link;
      const subMenuSpan = document.createElement('span');
      subMenuSpan.textContent = subMenuItem.label;
      subMenuA.append(subMenuSpan);
      subMenuLi.append(subMenuA);
      subMenuUl.append(subMenuLi);
    });
    li.append(subMenuUl);
  }
  return li;
}

export default async function decorate(block) {
  const headerNavigationModel = JSON.parse(block.querySelector('script[type="application/json"]').textContent);

  const container = document.createElement('div');
  container.className = 'header-container';
  moveInstrumentation(block, container);

  const wrapper = document.createElement('div');
  wrapper.className = 'header-wrapper layout-container transparent-header';
  container.append(wrapper);

  const headerNavigation = document.createElement('div');
  headerNavigation.className = 'header-navigation';
  wrapper.append(headerNavigation);

  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  headerNavigation.append(navigationWrapper);

  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.className = 'navigation-wrapper__logo';
  navigationWrapper.append(navigationWrapperLogo);

  const logoLink = document.createElement('a');
  logoLink.href = headerNavigationModel.logoLink;
  logoLink.target = '_self';
  const logoIcon = createHeaderQDIcon('header-qd-icon--logo header-qd-logo');
  logoLink.append(logoIcon);
  navigationWrapperLogo.append(logoLink);

  const contactUsCtaWrapper = document.createElement('div');
  contactUsCtaWrapper.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(contactUsCtaWrapper);

  const contactUsCta = document.createElement('a');
  contactUsCta.href = headerNavigationModel.contactUsLink;
  contactUsCta.className = 'header-cta header-cta__ navigation--content__cta';
  contactUsCta.target = '_self';
  contactUsCta.setAttribute('aria-label', headerNavigationModel.contactUsLabel);

  const ctaIcon = document.createElement('span');
  ctaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  ctaIcon.setAttribute('aria-hidden', 'true');
  contactUsCta.append(ctaIcon);

  const ctaLabel = document.createElement('span');
  ctaLabel.className = 'header-cta__label';
  ctaLabel.textContent = headerNavigationModel.contactUsLabel;
  contactUsCta.append(ctaLabel);
  contactUsCtaWrapper.append(contactUsCta);

  const navigationToggle = document.createElement('div');
  navigationToggle.className = 'navigation-wrapper__icon';
  navigationToggle.id = 'navigation-toggle';
  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.className = 'header-hamburger-ellipse';
  hamburgerEllipse.setAttribute('tabindex', '0');
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.className = 'header-hamburger-icon header-qd-icon header-qd-icon--hamburger';
  const closeIcon = document.createElement('span');
  closeIcon.className = 'header-close-icon header-qd-icon header-qd-icon--cancel';
  hamburgerEllipse.append(hamburgerIcon, closeIcon);
  navigationToggle.append(hamburgerEllipse);
  contactUsCtaWrapper.append(navigationToggle);

  // Desktop Navbar
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.className = 'navigation-wrapper__navbar';
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.className = 'navigation-wrapper__navbar-list';
  headerNavigationModel.navMenus.forEach((menu) => {
    navbarDesktopList.append(createDesktopNavMenu(menu));
  });
  navbarDesktop.append(navbarDesktopList);

  const desktopContactUsCta = document.createElement('a');
  desktopContactUsCta.href = headerNavigationModel.contactUsLink;
  desktopContactUsCta.className = 'header-cta header-cta__ navigation--content__cta';
  desktopContactUsCta.target = '_self';
  desktopContactUsCta.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');

  const desktopCtaIcon = document.createElement('span');
  desktopCtaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  desktopCtaIcon.setAttribute('aria-hidden', 'true');
  desktopContactUsCta.append(desktopCtaIcon);

  const desktopCtaLabel = document.createElement('span');
  desktopCtaLabel.className = 'header-cta__label';
  desktopCtaLabel.textContent = headerNavigationModel.contactUsLabel;
  desktopContactUsCta.append(desktopCtaLabel);
  navbarDesktop.append(desktopContactUsCta);

  const originalDesktopLanguageSelector = block.querySelector('.header-language-selector');
  navbarDesktop.append(createLanguageSelector(headerNavigationModel.languages, originalDesktopLanguageSelector));
  navigationWrapper.append(navbarDesktop);

  // Mobile Navbar
  const navbarMobile = document.createElement('nav');
  navbarMobile.className = 'navigation-wrapper__mobilenavbar';
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.className = 'navigation-wrapper__mobilenavbar-list';
  headerNavigationModel.navMenus.forEach((menu) => {
    navbarMobileList.append(createMobileNavMenu(menu));
  });
  navbarMobile.append(navbarMobileList);

  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';

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
  navbarMobile.append(mobileNavBack);

  const originalMobileLanguageSelector = block.querySelector('.header-language-selector');
  navbarMobile.append(createLanguageSelector(headerNavigationModel.languages, originalMobileLanguageSelector));
  navigationWrapper.append(navbarMobile);

  block.textContent = '';
  block.append(container);
}
