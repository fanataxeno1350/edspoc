import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerNavigation = block.querySelector(':scope > div');
  const logoLink = headerNavigation.children[0]?.querySelector('a');
  const contactUsLink = headerNavigation.children[1]?.querySelector('a');
  const contactUsLabel = headerNavigation.children[1]?.querySelector('a')?.textContent;
  const menuItems = [...headerNavigation.children].slice(2, -1);
  const languageItems = headerNavigation.lastElementChild;

  const containerE9226c8e5e = document.createElement('div');
  containerE9226c8e5e.id = 'container-e9226c8e5e';
  containerE9226c8e5e.classList.add('header-container');

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper', 'layout-container', 'transparent-header');

  const headerNavigationDiv = document.createElement('div');
  headerNavigationDiv.classList.add('header-navigation');

  const navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('navigation-wrapper');
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');

  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.classList.add('navigation-wrapper__logo');

  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.target = '_self';
    const span = document.createElement('span');
    span.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.classList.add(`path${i}`);
      span.append(pathSpan);
    }
    logoAnchor.append(span);
    navigationWrapperLogo.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.classList.add('navigation-wrapper__contactUs-cta');

  if (contactUsLink) {
    const contactUsAnchor = document.createElement('a');
    contactUsAnchor.href = contactUsLink.href;
    contactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    contactUsAnchor.target = '_self';
    contactUsAnchor.setAttribute('aria-label', contactUsLabel || '');

    const ctaIconSpan = document.createElement('span');
    ctaIconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    ctaIconSpan.setAttribute('aria-hidden', 'true');
    contactUsAnchor.append(ctaIconSpan);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('header-cta__label');
    ctaLabelSpan.textContent = contactUsLabel;
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

  const navbarDesktop = document.createElement('nav');
  navbarDesktop.classList.add('navigation-wrapper__navbar');
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.classList.add('navigation-wrapper__navbar-list');

  menuItems.forEach((menuItem) => {
    const li = document.createElement('li');
    li.classList.add('navigation-wrapper__navbar-menu');

    const menuLink = menuItem.querySelector('a');
    if (menuLink) {
      const anchor = document.createElement('a');
      anchor.href = menuLink.href;
      anchor.target = '_self';
      anchor.classList.add('navigation-wrapper__navbar-menulink');
      anchor.setAttribute('aria-haspopup', 'true');
      anchor.setAttribute('aria-expanded', 'false');
      const spanLabel = document.createElement('span');
      spanLabel.textContent = menuLink.textContent;
      anchor.append(spanLabel);

      const iconWrapper = document.createElement('span');
      iconWrapper.classList.add('header-qd-icon-wrapper');
      const icon = document.createElement('span');
      icon.classList.add('header-menu-icon', 'header-qd-icon', 'header-qd-icon--cheveron-down');
      iconWrapper.append(icon);
      anchor.append(iconWrapper);
      li.append(anchor);
      moveInstrumentation(menuLink, anchor);
    }

    const submenuItems = menuItem.querySelector('ul');
    if (submenuItems) {
      const submenuUl = document.createElement('ul');
      submenuUl.classList.add('navigation-wrapper__navbar-submenu');
      [...submenuItems.children].forEach((subItem) => {
        const subLi = document.createElement('li');
        const subLink = subItem.querySelector('a');
        if (subLink) {
          const subAnchor = document.createElement('a');
          subAnchor.href = subLink.href;
          subAnchor.target = '_self';
          subAnchor.setAttribute('aria-expanded', 'false');
          const subSpan = document.createElement('span');
          subSpan.textContent = subLink.textContent;
          subAnchor.append(subSpan);
          subLi.append(subAnchor);
          moveInstrumentation(subLink, subAnchor);
        }
        submenuUl.append(subLi);
      });
      li.append(submenuUl);
    }
    navbarDesktopList.append(li);
  });
  navbarDesktop.append(navbarDesktopList);

  if (contactUsLink) {
    const desktopContactUsAnchor = document.createElement('a');
    desktopContactUsAnchor.href = contactUsLink.href;
    desktopContactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    desktopContactUsAnchor.target = '_self';
    desktopContactUsAnchor.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');

    const ctaIconSpan = document.createElement('span');
    ctaIconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    ctaIconSpan.setAttribute('aria-hidden', 'true');
    desktopContactUsAnchor.append(ctaIconSpan);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('header-cta__label');
    ctaLabelSpan.textContent = contactUsLabel;
    desktopContactUsAnchor.append(ctaLabelSpan);
    navbarDesktop.append(desktopContactUsAnchor);
    moveInstrumentation(contactUsLink, desktopContactUsAnchor);
  }

  if (languageItems) {
    const headerLanguageSelector = document.createElement('div');
    headerLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
    headerLanguageSelector.style.visibility = 'visible';

    const langUl = document.createElement('ul');
    langUl.classList.add('header-cmp-language-selector');

    [...languageItems.children].forEach((langItem, index) => {
      const langLi = document.createElement('li');
      if (index === 0) {
        langLi.classList.add('active');
      }
      const langLink = langItem.querySelector('a');
      if (langLink) {
        const langAnchor = document.createElement('a');
        langAnchor.href = langLink.href;
        langAnchor.setAttribute('aria-label', langLink.textContent);
        langAnchor.classList.add('header-cmp-language-selector__link');
        langAnchor.setAttribute('data-lang', langLink.textContent.toLowerCase().substring(0, 2));
        langAnchor.textContent = langLink.textContent;
        langLi.append(langAnchor);
        moveInstrumentation(langLink, langAnchor);
      }
      langUl.append(langLi);
    });
    headerLanguageSelector.append(langUl);
    navbarDesktop.append(headerLanguageSelector);
  }
  navigationWrapper.append(navbarDesktop);

  const navbarMobile = document.createElement('nav');
  navbarMobile.classList.add('navigation-wrapper__mobilenavbar');
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.classList.add('navigation-wrapper__mobilenavbar-list');

  menuItems.forEach((menuItem) => {
    const li = document.createElement('li');
    li.classList.add('navigation-wrapper__mobilenavbar-menu', 'border');

    const menuLink = menuItem.querySelector('a');
    if (menuLink) {
      const anchor = document.createElement('a');
      anchor.classList.add('navigation-wrapper__mobilenavbar-menulink');
      const spanLabel = document.createElement('span');
      spanLabel.textContent = menuLink.textContent;
      anchor.append(spanLabel);

      const icon = document.createElement('span');
      icon.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'navigation-wrapper__mobilenavbar-menulink-icon');
      anchor.append(icon);
      li.append(anchor);
      moveInstrumentation(menuLink, anchor);
    }

    const submenuItems = menuItem.querySelector('ul');
    if (submenuItems) {
      const submenuUl = document.createElement('ul');
      submenuUl.classList.add('navigation-wrapper__mobilenavbar-submenu');

      const headerLi = document.createElement('li');
      headerLi.classList.add('navigation-wrapper__mobilenavbar-menuheader');
      const headerAnchor = document.createElement('a');
      const headerSpan = document.createElement('span');
      headerSpan.textContent = menuLink.textContent;
      headerAnchor.append(headerSpan);
      headerLi.append(headerAnchor);
      submenuUl.append(headerLi);

      [...submenuItems.children].forEach((subItem) => {
        const subLi = document.createElement('li');
        subLi.classList.add('navigation-wrapper__mobilenavbar-menu');
        const subLink = subItem.querySelector('a');
        if (subLink) {
          const subAnchor = document.createElement('a');
          subAnchor.classList.add('navigation-wrapper__mobilenavbar-menulink');
          subAnchor.href = subLink.href;
          subAnchor.target = '_self';
          const subSpan = document.createElement('span');
          subSpan.textContent = subLink.textContent;
          subAnchor.append(subSpan);
          subLi.append(subAnchor);
          moveInstrumentation(subLink, subAnchor);
        }
        submenuUl.append(subLi);
      });
      li.append(submenuUl);
    }
    navbarMobileList.append(li);
  });
  navbarMobile.append(navbarMobileList);

  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');

  const mobileNavBackIconAnchor = document.createElement('a');
  mobileNavBackIconAnchor.classList.add('navigation-wrapper__icon');
  const mobileNavBackIconSpan = document.createElement('span');
  mobileNavBackIconSpan.classList.add('header-back-icon', 'header-qd-icon', 'header-qd-icon--cheveron-left');
  mobileNavBackIconAnchor.append(mobileNavBackIconSpan);
  mobileNavBack.append(mobileNavBackIconAnchor);

  const mobileNavBackLabelSpan = document.createElement('span');
  mobileNavBackLabelSpan.classList.add('navigation-wrapper__iconlabel');
  mobileNavBackLabelSpan.textContent = 'Back';
  mobileNavBack.append(mobileNavBackLabelSpan);
  navbarMobile.append(mobileNavBack);

  if (languageItems) {
    const headerLanguageSelector = document.createElement('div');
    headerLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
    headerLanguageSelector.style.visibility = 'visible';

    const langUl = document.createElement('ul');
    langUl.classList.add('header-cmp-language-selector');

    [...languageItems.children].forEach((langItem, index) => {
      const langLi = document.createElement('li');
      if (index === 0) {
        langLi.classList.add('active');
      }
      const langLink = langItem.querySelector('a');
      if (langLink) {
        const langAnchor = document.createElement('a');
        langAnchor.href = langLink.href;
        langAnchor.setAttribute('aria-label', langLink.textContent);
        langAnchor.classList.add('header-cmp-language-selector__link');
        langAnchor.setAttribute('data-lang', langLink.textContent.toLowerCase().substring(0, 2));
        langAnchor.textContent = langLink.textContent;
        langLi.append(langAnchor);
        moveInstrumentation(langLink, langAnchor);
      }
      langUl.append(langLi);
    });
    headerLanguageSelector.append(langUl);
    navbarMobile.append(headerLanguageSelector);
  }
  navigationWrapper.append(navbarMobile);

  headerNavigationDiv.append(navigationWrapper);
  headerWrapper.append(headerNavigationDiv);
  containerE9226c8e5e.append(headerWrapper);

  block.textContent = '';
  block.append(containerE9226c8e5e);
}
