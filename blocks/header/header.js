import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
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

  const logoLink = document.createElement('a');
  logoLink.target = '_self';
  const authoredLogoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (authoredLogoLink) {
    logoLink.href = authoredLogoLink.textContent.trim();
    moveInstrumentation(authoredLogoLink, logoLink);
  } else {
    logoLink.href = '/';
  }
  navigationWrapperLogo.append(logoLink);

  const headerQdIconLogo = document.createElement('span');
  headerQdIconLogo.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
  const authoredLogoIcon = block.querySelector('[data-aue-prop="logoIcon"]');
  if (authoredLogoIcon) {
    headerQdIconLogo.innerHTML = authoredLogoIcon.innerHTML;
    moveInstrumentation(authoredLogoIcon, headerQdIconLogo);
  } else {
    for (let i = 1; i <= 25; i += 1) {
      headerQdIconLogo.append(document.createElement('span')).className = `path${i}`;
    }
  }
  logoLink.append(headerQdIconLogo);

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsLink = document.createElement('a');
  contactUsLink.className = 'header-cta header-cta__ navigation--content__cta';
  contactUsLink.target = '_self';
  contactUsLink.setAttribute('aria-label', 'Contact Us');
  const authoredContactUsLink = block.querySelector('[data-aue-prop="contactUsLink"]');
  if (authoredContactUsLink) {
    contactUsLink.href = authoredContactUsLink.textContent.trim();
    moveInstrumentation(authoredContactUsLink, contactUsLink);
  } else {
    contactUsLink.href = '/contact/';
  }
  navigationWrapperContactUsCta.append(contactUsLink);

  const contactUsIcon = document.createElement('span');
  contactUsIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  contactUsIcon.setAttribute('aria-hidden', 'true');
  contactUsLink.append(contactUsIcon);

  const contactUsLabel = document.createElement('span');
  contactUsLabel.className = 'header-cta__label';
  const authoredContactUsLabel = block.querySelector('[data-aue-prop="contactUsLabel"]');
  if (authoredContactUsLabel) {
    contactUsLabel.textContent = authoredContactUsLabel.textContent.trim();
    moveInstrumentation(authoredContactUsLabel, contactUsLabel);
  } else {
    contactUsLabel.textContent = 'Contact Us';
  }
  contactUsLink.append(contactUsLabel);

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.className = 'navigation-wrapper__icon';
  navigationWrapperIcon.id = 'navigation-toggle';
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.className = 'header-hamburger-ellipse';
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  navigationWrapperIcon.append(headerHamburgerEllipse);

  const headerHamburgerIcon = document.createElement('span');
  headerHamburgerIcon.className = 'header-hamburger-icon header-qd-icon header-qd-icon--hamburger';
  headerHamburgerEllipse.append(headerHamburgerIcon);

  const headerCloseIcon = document.createElement('span');
  headerCloseIcon.className = 'header-close-icon header-qd-icon header-qd-icon--cancel';
  headerHamburgerEllipse.append(headerCloseIcon);

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

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((navItem) => {
    const li = document.createElement('li');
    li.className = 'navigation-wrapper__navbar-menu';

    const link = document.createElement('a');
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
    link.className = 'navigation-wrapper__navbar-menulink';
    link.target = '_self';

    const navItemLink = navItem.querySelector('[data-aue-prop="link"]');
    if (navItemLink) {
      link.href = navItemLink.textContent.trim();
      moveInstrumentation(navItemLink, link);
    } else {
      link.href = '#'; // Default if no link is provided
    }

    const labelSpan = document.createElement('span');
    const navItemLabel = navItem.querySelector('[data-aue-prop="label"]');
    if (navItemLabel) {
      labelSpan.textContent = navItemLabel.textContent.trim();
      moveInstrumentation(navItemLabel, labelSpan);
    }
    link.append(labelSpan);

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'header-qd-icon-wrapper';
    const icon = document.createElement('span');
    icon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
    iconWrapper.append(icon);
    link.append(iconWrapper);
    li.append(link);

    const submenuItems = navItem.querySelectorAll('[data-aue-model="navItem"] [data-aue-model="navItem"]');
    if (submenuItems.length > 0) {
      const submenuUl = document.createElement('ul');
      submenuUl.className = 'navigation-wrapper__navbar-submenu';
      submenuItems.forEach((subItem) => {
        const subLi = document.createElement('li');
        const subLink = document.createElement('a');
        subLink.setAttribute('aria-expanded', 'false');
        subLink.target = '_self';

        const subItemLink = subItem.querySelector('[data-aue-prop="link"]');
        if (subItemLink) {
          subLink.href = subItemLink.textContent.trim();
          moveInstrumentation(subItemLink, subLink);
        } else {
          subLink.href = '#';
        }

        const subLabelSpan = document.createElement('span');
        const subItemLabel = subItem.querySelector('[data-aue-prop="label"]');
        if (subItemLabel) {
          subLabelSpan.textContent = subItemLabel.textContent.trim();
          moveInstrumentation(subItemLabel, subLabelSpan);
        }
        subLink.append(subLabelSpan);
        subLi.append(subLink);
        submenuUl.append(subLi);
      });
      li.append(submenuUl);
    }
    navbarDesktopList.append(li);
  });

  const desktopContactUsLink = document.createElement('a');
  desktopContactUsLink.className = 'header-cta header-cta__ navigation--content__cta';
  desktopContactUsLink.target = '_self';
  desktopContactUsLink.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
  const authoredDesktopContactUsLink = block.querySelector('[data-aue-prop="contactUsLink"]');
  if (authoredDesktopContactUsLink) {
    desktopContactUsLink.href = authoredDesktopContactUsLink.textContent.trim();
  } else {
    desktopContactUsLink.href = '/contact/';
  }
  navbarDesktop.append(desktopContactUsLink);

  const desktopContactUsIcon = document.createElement('span');
  desktopContactUsIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  desktopContactUsIcon.setAttribute('aria-hidden', 'true');
  desktopContactUsLink.append(desktopContactUsIcon);

  const desktopContactUsLabel = document.createElement('span');
  desktopContactUsLabel.className = 'header-cta__label';
  const authoredDesktopContactUsLabel = block.querySelector('[data-aue-prop="contactUsLabel"]');
  if (authoredDesktopContactUsLabel) {
    desktopContactUsLabel.textContent = authoredDesktopContactUsLabel.textContent.trim();
  } else {
    desktopContactUsLabel.textContent = 'Contact Us';
  }
  desktopContactUsLink.append(desktopContactUsLabel);

  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLanguageSelector.style.visibility = 'visible';
  navbarDesktop.append(desktopLanguageSelector);

  const desktopLanguageUl = document.createElement('ul');
  desktopLanguageUl.className = 'header-cmp-language-selector';
  desktopLanguageSelector.append(desktopLanguageUl);

  const languages = block.querySelectorAll('[data-aue-model="language"]');
  languages.forEach((lang, index) => {
    const li = document.createElement('li');
    if (index === 0) {
      li.className = 'active';
    }

    const link = document.createElement('a');
    link.className = 'header-cmp-language-selector__link';
    link.target = '_self'; // Added target attribute based on expected HTML

    const langLink = lang.querySelector('[data-aue-prop="link"]');
    if (langLink) {
      link.href = langLink.textContent.trim();
      moveInstrumentation(langLink, link);
    } else {
      link.href = '#';
    }

    const langLabel = lang.querySelector('[data-aue-prop="label"]');
    if (langLabel) {
      link.setAttribute('aria-label', langLabel.textContent.trim());
      link.textContent = langLabel.textContent.trim();
      link.setAttribute('data-lang', langLabel.textContent.trim().toLowerCase().substring(0, 2));
      moveInstrumentation(langLabel, link);
    }

    li.append(link);
    desktopLanguageUl.append(li);
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

  navItems.forEach((navItem) => {
    const li = document.createElement('li');
    li.className = 'navigation-wrapper__mobilenavbar-menu border';

    const link = document.createElement('a');
    link.className = 'navigation-wrapper__mobilenavbar-menulink';

    const labelSpan = document.createElement('span');
    const navItemLabel = navItem.querySelector('[data-aue-prop="label"]');
    if (navItemLabel) {
      labelSpan.textContent = navItemLabel.textContent.trim();
      moveInstrumentation(navItemLabel, labelSpan);
    }
    link.append(labelSpan);

    const icon = document.createElement('span');
    icon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
    link.append(icon);
    li.append(link);

    const submenuItems = navItem.querySelectorAll('[data-aue-model="navItem"] [data-aue-model="navItem"]');
    if (submenuItems.length > 0) {
      const submenuUl = document.createElement('ul');
      submenuUl.className = 'navigation-wrapper__mobilenavbar-submenu';

      const menuHeaderLi = document.createElement('li');
      menuHeaderLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
      const menuHeaderLink = document.createElement('a');
      const menuHeaderSpan = document.createElement('span');
      if (navItemLabel) {
        menuHeaderSpan.textContent = navItemLabel.textContent.trim();
      }
      menuHeaderLink.append(menuHeaderSpan);
      menuHeaderLi.append(menuHeaderLink);
      submenuUl.append(menuHeaderLi);

      submenuItems.forEach((subItem) => {
        const subLi = document.createElement('li');
        subLi.className = 'navigation-wrapper__mobilenavbar-menu';
        const subLink = document.createElement('a');
        subLink.className = 'navigation-wrapper__mobilenavbar-menulink';
        subLink.target = '_self';

        const subItemLink = subItem.querySelector('[data-aue-prop="link"]');
        if (subItemLink) {
          subLink.href = subItemLink.textContent.trim();
          moveInstrumentation(subItemLink, subLink);
        } else {
          subLink.href = '#';
        }

        const subLabelSpan = document.createElement('span');
        const subItemLabel = subItem.querySelector('[data-aue-prop="label"]');
        if (subItemLabel) {
          subLabelSpan.textContent = subItemLabel.textContent.trim();
          moveInstrumentation(subItemLabel, subLabelSpan);
        }
        subLink.append(subLabelSpan);
        subLi.append(subLink);
        submenuUl.append(subLi);
      });
      li.append(submenuUl);
    }
    navbarMobileList.append(li);
  });

  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  navbarMobile.append(mobileNavBack);

  const mobileNavBackIconWrapper = document.createElement('a');
  mobileNavBackIconWrapper.className = 'navigation-wrapper__icon';
  mobileNavBack.append(mobileNavBackIconWrapper);

  const mobileNavBackIcon = document.createElement('span');
  mobileNavBackIcon.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  mobileNavBackIconWrapper.append(mobileNavBackIcon);

  const mobileNavBackLabel = document.createElement('span');
  mobileNavBackLabel.className = 'navigation-wrapper__iconlabel';
  mobileNavBackLabel.textContent = 'Back';
  mobileNavBack.append(mobileNavBackLabel);

  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLanguageSelector.style.visibility = 'visible';
  navbarMobile.append(mobileLanguageSelector);

  const mobileLanguageUl = document.createElement('ul');
  mobileLanguageUl.className = 'header-cmp-language-selector';
  mobileLanguageSelector.append(mobileLanguageUl);

  languages.forEach((lang, index) => {
    const li = document.createElement('li');
    if (index === 0) {
      li.className = 'active';
    }

    const link = document.createElement('a');
    link.className = 'header-cmp-language-selector__link';
    link.target = '_self'; // Added target attribute based on expected HTML

    const langLink = lang.querySelector('[data-aue-prop="link"]');
    if (langLink) {
      link.href = langLink.textContent.trim();
      moveInstrumentation(langLink, link);
    } else {
      link.href = '#';
    }

    const langLabel = lang.querySelector('[data-aue-prop="label"]');
    if (langLabel) {
      link.setAttribute('aria-label', langLabel.textContent.trim());
      link.textContent = langLabel.textContent.trim();
      link.setAttribute('data-lang', langLabel.textContent.trim().toLowerCase().substring(0, 2));
      moveInstrumentation(langLabel, link);
    }

    li.append(link);
    mobileLanguageUl.append(li);
  });

  block.textContent = '';
  block.append(headerContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
