import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper', 'layout-container', 'transparent-header');
  moveInstrumentation(block, headerWrapper);

  const headerNavigation = document.createElement('div');
  headerNavigation.classList.add('header-navigation', 'header-nav-css-from-wrapper');
  headerWrapper.append(headerNavigation);

  const headerNavigationWrapper = document.createElement('div');
  headerNavigationWrapper.classList.add('header-navigation-wrapper');
  headerNavigationWrapper.setAttribute('role', 'banner');
  headerNavigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  headerNavigation.append(headerNavigationWrapper);

  const headerNavigationWrapperLogo = document.createElement('div');
  headerNavigationWrapperLogo.classList.add('header-navigation-wrapper__logo');
  headerNavigationWrapper.append(headerNavigationWrapperLogo);

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.target = '_self';
    const logoSpan = document.createElement('span');
    logoSpan.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
    logoSpan.innerHTML = '<span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span>';
    logoAnchor.append(logoSpan);
    headerNavigationWrapperLogo.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }

  const headerNavigationWrapperContactUsCta = document.createElement('div');
  headerNavigationWrapperContactUsCta.classList.add('header-navigation-wrapper__contactUs-cta');
  headerNavigationWrapperLogo.append(headerNavigationWrapperContactUsCta);

  const contactUsLink = block.querySelector('[data-aue-prop="contactUsLink"]');
  if (contactUsLink) {
    const contactUsAnchor = document.createElement('a');
    contactUsAnchor.href = contactUsLink.href;
    contactUsAnchor.classList.add('header-cta', 'header-cta__', 'header-cmp-navigation--content__cta');
    contactUsAnchor.target = '_self';
    contactUsAnchor.setAttribute('aria-label', 'Contact Us');
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    iconSpan.setAttribute('aria-hidden', 'true');
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('header-cta__label');
    labelSpan.textContent = 'Contact Us';
    contactUsAnchor.append(iconSpan, labelSpan);
    headerNavigationWrapperContactUsCta.append(contactUsAnchor);
    moveInstrumentation(contactUsLink, contactUsAnchor);
  }

  const headerNavigationWrapperIcon = document.createElement('div');
  headerNavigationWrapperIcon.classList.add('header-navigation-wrapper__icon');
  headerNavigationWrapperIcon.id = 'navigation-toggle';
  headerNavigationWrapperContactUsCta.append(headerNavigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.classList.add('header-hamburger-ellipse');
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  headerHamburgerEllipse.innerHTML = '<span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span><span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>';
  headerNavigationWrapperIcon.append(headerHamburgerEllipse);

  const navbarDesktop = document.createElement('nav');
  navbarDesktop.classList.add('header-navigation-wrapper__navbar');
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  headerNavigationWrapper.append(navbarDesktop);

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.classList.add('header-navigation-wrapper__navbar-list');
  navbarDesktop.append(navbarDesktopList);

  const navMenus = block.querySelectorAll('[data-aue-model="navMenu"]');
  navMenus.forEach((navMenu) => {
    const navMenuItem = document.createElement('li');
    navMenuItem.classList.add('header-navigation-wrapper__navbar-menu');
    navbarDesktopList.append(navMenuItem);
    moveInstrumentation(navMenu, navMenuItem);

    const menuLink = navMenu.querySelector('[data-aue-prop="menuLink"]');
    const menuLabel = navMenu.querySelector('[data-aue-prop="menuLabel"]');
    if (menuLink && menuLabel) {
      const menuAnchor = document.createElement('a');
      menuAnchor.href = menuLink.href;
      menuAnchor.target = '_self';
      menuAnchor.classList.add('header-navigation-wrapper__navbar-menulink');
      menuAnchor.setAttribute('aria-haspopup', 'true');
      menuAnchor.setAttribute('aria-expanded', 'false');
      const menuLabelSpan = document.createElement('span');
      menuLabelSpan.textContent = menuLabel.textContent;
      const iconWrapper = document.createElement('span');
      iconWrapper.classList.add('header-qd-icon-wrapper');
      iconWrapper.innerHTML = '<span class="header-menu-icon header-qd-icon header-qd-icon--cheveron-down"></span>';
      menuAnchor.append(menuLabelSpan, iconWrapper);
      navMenuItem.append(menuAnchor);
      moveInstrumentation(menuLink, menuAnchor);
      moveInstrumentation(menuLabel, menuLabelSpan);
    }

    const subMenus = navMenu.querySelectorAll('[data-aue-model="subMenuItem"]');
    if (subMenus.length > 0) {
      const submenuList = document.createElement('ul');
      submenuList.classList.add('header-navigation-wrapper__navbar-submenu');
      navMenuItem.append(submenuList);

      subMenus.forEach((subMenuItem) => {
        const subMenuItemLi = document.createElement('li');
        submenuList.append(subMenuItemLi);
        moveInstrumentation(subMenuItem, subMenuItemLi);

        const subMenuLink = subMenuItem.querySelector('[data-aue-prop="subMenuLink"]');
        const subMenuLabel = subMenuItem.querySelector('[data-aue-prop="subMenuLabel"]');
        if (subMenuLink && subMenuLabel) {
          const subMenuAnchor = document.createElement('a');
          subMenuAnchor.href = subMenuLink.href;
          subMenuAnchor.target = '_self';
          subMenuAnchor.setAttribute('aria-expanded', 'false');
          const subMenuLabelSpan = document.createElement('span');
          subMenuLabelSpan.textContent = subMenuLabel.textContent;
          subMenuAnchor.append(subMenuLabelSpan);
          subMenuItemLi.append(subMenuAnchor);
          moveInstrumentation(subMenuLink, subMenuAnchor);
          moveInstrumentation(subMenuLabel, subMenuLabelSpan);
        }
      });
    }
  });

  // Desktop Contact Us Link (duplicated for desktop nav)
  if (contactUsLink) {
    const desktopContactUsAnchor = document.createElement('a');
    desktopContactUsAnchor.href = contactUsLink.href;
    desktopContactUsAnchor.classList.add('header-cta', 'header-cta__', 'header-cmp-navigation--content__cta');
    desktopContactUsAnchor.target = '_self';
    desktopContactUsAnchor.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    iconSpan.setAttribute('aria-hidden', 'true');
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('header-cta__label');
    labelSpan.textContent = 'Contact Us';
    desktopContactUsAnchor.append(iconSpan, labelSpan);
    navbarDesktop.append(desktopContactUsAnchor);
    // No moveInstrumentation here as it's a duplicate, original is moved earlier.
  }

  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  desktopLanguageSelector.style.visibility = 'visible';
  navbarDesktop.append(desktopLanguageSelector);

  const desktopLanguageList = document.createElement('ul');
  desktopLanguageList.classList.add('header-cmp-language-selector');
  desktopLanguageSelector.append(desktopLanguageList);

  const languageOptions = block.querySelectorAll('[data-aue-model="languageOption"]');
  languageOptions.forEach((languageOption, index) => {
    const languageLi = document.createElement('li');
    if (index === 0) {
      languageLi.classList.add('active');
    }
    desktopLanguageList.append(languageLi);
    moveInstrumentation(languageOption, languageLi);

    const languageLink = languageOption.querySelector('[data-aue-prop="languageLink"]');
    const languageLabel = languageOption.querySelector('[data-aue-prop="languageLabel"]');
    if (languageLink && languageLabel) {
      const languageAnchor = document.createElement('a');
      languageAnchor.href = languageLink.href;
      languageAnchor.classList.add('header-cmp-language-selector__link');
      languageAnchor.setAttribute('aria-label', languageLabel.textContent);
      languageAnchor.setAttribute('data-lang', languageLink.href.split('/').filter(Boolean).pop() || 'en'); // Extract lang from href
      languageAnchor.textContent = languageLabel.textContent;
      languageLi.append(languageAnchor);
      moveInstrumentation(languageLink, languageAnchor);
      moveInstrumentation(languageLabel, languageAnchor);
    }
  });

  // Mobile Navigation
  const navbarMobile = document.createElement('nav');
  navbarMobile.classList.add('header-navigation-wrapper__mobilenavbar');
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  headerNavigationWrapper.append(navbarMobile);

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.classList.add('header-navigation-wrapper__mobilenavbar-list');
  navbarMobile.append(navbarMobileList);

  navMenus.forEach((navMenu) => {
    const mobileNavMenuItem = document.createElement('li');
    mobileNavMenuItem.classList.add('header-navigation-wrapper__mobilenavbar-menu', 'header-border');
    navbarMobileList.append(mobileNavMenuItem);
    // No moveInstrumentation here as the desktop navMenu already holds it.

    const menuLabel = navMenu.querySelector('[data-aue-prop="menuLabel"]');
    if (menuLabel) {
      const mobileMenuAnchor = document.createElement('a');
      mobileMenuAnchor.classList.add('header-navigation-wrapper__mobilenavbar-menulink');
      const menuLabelSpan = document.createElement('span');
      menuLabelSpan.textContent = menuLabel.textContent;
      const iconSpan = document.createElement('span');
      iconSpan.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'header-navigation-wrapper__mobilenavbar-menulink-icon');
      mobileMenuAnchor.append(menuLabelSpan, iconSpan);
      mobileNavMenuItem.append(mobileMenuAnchor);
      // No moveInstrumentation here as the desktop navMenu already holds it.
    }

    const subMenus = navMenu.querySelectorAll('[data-aue-model="subMenuItem"]');
    if (subMenus.length > 0) {
      const mobileSubmenuList = document.createElement('ul');
      mobileSubmenuList.classList.add('header-navigation-wrapper__mobilenavbar-submenu');
      mobileNavMenuItem.append(mobileSubmenuList);

      const mobileSubmenuHeader = document.createElement('li');
      mobileSubmenuHeader.classList.add('header-navigation-wrapper__mobilenavbar-menuheader');
      const headerAnchor = document.createElement('a');
      const headerSpan = document.createElement('span');
      if (menuLabel) {
        headerSpan.textContent = menuLabel.textContent;
      }
      headerAnchor.append(headerSpan);
      mobileSubmenuHeader.append(headerAnchor);
      mobileSubmenuList.append(mobileSubmenuHeader);

      subMenus.forEach((subMenuItem) => {
        const mobileSubMenuItemLi = document.createElement('li');
        mobileSubMenuItemLi.classList.add('header-navigation-wrapper__mobilenavbar-menu');
        mobileSubmenuList.append(mobileSubMenuItemLi);
        // No moveInstrumentation here as the desktop subMenuItem already holds it.

        const subMenuLink = subMenuItem.querySelector('[data-aue-prop="subMenuLink"]');
        const subMenuLabel = subMenuItem.querySelector('[data-aue-prop="subMenuLabel"]');
        if (subMenuLink && subMenuLabel) {
          const mobileSubMenuAnchor = document.createElement('a');
          mobileSubMenuAnchor.href = subMenuLink.href;
          mobileSubMenuAnchor.target = '_self';
          mobileSubMenuAnchor.classList.add('header-navigation-wrapper__mobilenavbar-menulink');
          const subMenuLabelSpan = document.createElement('span');
          subMenuLabelSpan.textContent = subMenuLabel.textContent;
          mobileSubMenuAnchor.append(subMenuLabelSpan);
          mobileSubMenuItemLi.append(mobileSubMenuAnchor);
          // No moveInstrumentation here as the desktop subMenuLink/Label already holds it.
        }
      });
    }
  });

  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('header-navigation-wrapper__mobilenavbar-back', 'header-nav-back');
  mobileNavBack.innerHTML = '<a class="header-navigation-wrapper__icon"><span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span></a><span class="header-navigation-wrapper__iconlabel">Back</span>';
  navbarMobile.append(mobileNavBack);

  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  mobileLanguageSelector.style.visibility = 'visible';
  navbarMobile.append(mobileLanguageSelector);

  const mobileLanguageList = document.createElement('ul');
  mobileLanguageList.classList.add('header-cmp-language-selector');
  mobileLanguageSelector.append(mobileLanguageList);

  languageOptions.forEach((languageOption, index) => {
    const languageLi = document.createElement('li');
    if (index === 0) {
      languageLi.classList.add('active');
    }
    mobileLanguageList.append(languageLi);
    // No moveInstrumentation here as the desktop languageOption already holds it.

    const languageLink = languageOption.querySelector('[data-aue-prop="languageLink"]');
    const languageLabel = languageOption.querySelector('[data-aue-prop="languageLabel"]');
    if (languageLink && languageLabel) {
      const languageAnchor = document.createElement('a');
      languageAnchor.href = languageLink.href;
      languageAnchor.classList.add('header-cmp-language-selector__link');
      languageAnchor.setAttribute('aria-label', languageLabel.textContent);
      languageAnchor.setAttribute('data-lang', languageLink.href.split('/').filter(Boolean).pop() || 'en');
      languageAnchor.textContent = languageLabel.textContent;
      languageLi.append(languageAnchor);
      // No moveInstrumentation here as the desktop languageLink/Label already holds it.
    }
  });

  block.textContent = '';
  block.append(headerWrapper);
}
