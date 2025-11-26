import { createOptimizedPicture } from '../../scripts/aem.js';

function moveInstrumentation(source, target) {
  const dataset = source.dataset;
  Object.keys(dataset).forEach((key) => {
    if (key.startsWith('aue')) {
      target.dataset[key] = dataset[key];
    }
  });
}

export default async function decorate(block) {
  const root = document.createElement('div');
  root.id = 'container-e9226c8e5e';
  root.className = 'header-container';

  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper layout-container transparent-header';
  root.append(headerWrapper);

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

  // Logo Link and Icon
  const logoLinkElement = block.querySelector('[data-aue-prop="logoLink"]');
  const logoIconElement = block.querySelector('[data-aue-prop="logoIcon"]');

  if (logoLinkElement && logoIconElement) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLinkElement.textContent;
    logoAnchor.target = '_self';
    moveInstrumentation(logoLinkElement, logoAnchor);

    const logoSpan = document.createElement('span');
    logoSpan.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
    logoSpan.innerHTML = logoIconElement.textContent;
    moveInstrumentation(logoIconElement, logoSpan);

    logoAnchor.append(logoSpan);
    navigationWrapperLogo.append(logoAnchor);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  // Contact Us CTA
  const contactUsLinkElement = block.querySelector('[data-aue-prop="contactUsLink"]');
  const contactUsLabelElement = block.querySelector('[data-aue-prop="contactUsLabel"]');

  if (contactUsLinkElement && contactUsLabelElement) {
    const contactUsAnchor = document.createElement('a');
    contactUsAnchor.href = contactUsLinkElement.textContent;
    contactUsAnchor.className = 'header-cta header-cta__ navigation--content__cta';
    contactUsAnchor.target = '_self';
    contactUsAnchor.setAttribute('aria-label', 'Contact Us');
    moveInstrumentation(contactUsLinkElement, contactUsAnchor);

    const ctaIconSpan = document.createElement('span');
    ctaIconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
    ctaIconSpan.setAttribute('aria-hidden', 'true');
    contactUsAnchor.append(ctaIconSpan);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'header-cta__label';
    ctaLabelSpan.textContent = contactUsLabelElement.textContent;
    moveInstrumentation(contactUsLabelElement, ctaLabelSpan);
    contactUsAnchor.append(ctaLabelSpan);

    navigationWrapperContactUsCta.append(contactUsAnchor);
  }

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.className = 'navigation-wrapper__icon';
  navigationWrapperIcon.id = 'navigation-toggle';
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.className = 'header-hamburger-ellipse';
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  navigationWrapperIcon.append(headerHamburgerEllipse);

  const hamburgerIconSpan = document.createElement('span');
  hamburgerIconSpan.className = 'header-hamburger-icon header-qd-icon header-qd-icon--hamburger';
  headerHamburgerEllipse.append(hamburgerIconSpan);

  const closeIconSpan = document.createElement('span');
  closeIconSpan.className = 'header-close-icon header-qd-icon header-qd-icon--cancel';
  headerHamburgerEllipse.append(closeIconSpan);

  // Desktop Navbar
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.className = 'navigation-wrapper__navbar';
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarDesktop);

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.className = 'navigation-wrapper__navbar-list';
  navbarDesktop.append(navbarDesktopList);

  // Mobile Navbar
  const navbarMobile = document.createElement('nav');
  navbarMobile.className = 'navigation-wrapper__mobilenavbar';
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarMobile);

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.className = 'navigation-wrapper__mobilenavbar-list';
  navbarMobile.append(navbarMobileList);

  // Nav Menus
  const navMenus = block.querySelectorAll('[data-aue-model="navMenu"]');
  navMenus.forEach((navMenu) => {
    const menuLabelElement = navMenu.querySelector('[data-aue-prop="menuLabel"]');
    const menuLinkElement = navMenu.querySelector('[data-aue-prop="menuLink"]');

    if (menuLabelElement && menuLinkElement) {
      // Desktop Menu Item
      const desktopMenuItem = document.createElement('li');
      desktopMenuItem.className = 'navigation-wrapper__navbar-menu';
      navbarDesktopList.append(desktopMenuItem);

      const desktopMenuLink = document.createElement('a');
      desktopMenuLink.setAttribute('aria-haspopup', 'true');
      desktopMenuLink.setAttribute('aria-expanded', 'false');
      desktopMenuLink.className = 'navigation-wrapper__navbar-menulink';
      desktopMenuLink.target = '_self';
      desktopMenuLink.href = menuLinkElement.textContent;
      moveInstrumentation(menuLinkElement, desktopMenuLink);

      const desktopMenuLabelSpan = document.createElement('span');
      desktopMenuLabelSpan.textContent = menuLabelElement.textContent;
      moveInstrumentation(menuLabelElement, desktopMenuLabelSpan);
      desktopMenuLink.append(desktopMenuLabelSpan);

      const desktopIconWrapper = document.createElement('span');
      desktopIconWrapper.className = 'header-qd-icon-wrapper';
      desktopMenuLink.append(desktopIconWrapper);

      const desktopMenuIcon = document.createElement('span');
      desktopMenuIcon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
      desktopIconWrapper.append(desktopMenuIcon);

      desktopMenuItem.append(desktopMenuLink);

      const desktopSubmenu = document.createElement('ul');
      desktopSubmenu.className = 'navigation-wrapper__navbar-submenu';
      desktopMenuItem.append(desktopSubmenu);

      // Mobile Menu Item
      const mobileMenuItem = document.createElement('li');
      mobileMenuItem.className = 'navigation-wrapper__mobilenavbar-menu border';
      navbarMobileList.append(mobileMenuItem);

      const mobileMenuLink = document.createElement('a');
      mobileMenuLink.className = 'navigation-wrapper__mobilenavbar-menulink';

      const mobileMenuLabelSpan = document.createElement('span');
      mobileMenuLabelSpan.textContent = menuLabelElement.textContent;
      moveInstrumentation(menuLabelElement, mobileMenuLabelSpan);
      mobileMenuLink.append(mobileMenuLabelSpan);

      const mobileMenuIcon = document.createElement('span');
      mobileMenuIcon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
      mobileMenuLink.append(mobileMenuIcon);

      mobileMenuItem.append(mobileMenuLink);

      const mobileSubmenu = document.createElement('ul');
      mobileSubmenu.className = 'navigation-wrapper__mobilenavbar-submenu';
      mobileMenuItem.append(mobileSubmenu);

      const mobileSubmenuHeader = document.createElement('li');
      mobileSubmenuHeader.className = 'navigation-wrapper__mobilenavbar-menuheader';
      mobileSubmenu.append(mobileSubmenuHeader);

      const mobileSubmenuHeaderLink = document.createElement('a');
      const mobileSubmenuHeaderSpan = document.createElement('span');
      mobileSubmenuHeaderSpan.textContent = menuLabelElement.textContent;
      mobileSubmenuHeaderLink.append(mobileSubmenuHeaderSpan);
      mobileSubmenuHeader.append(mobileSubmenuHeaderLink);

      // Submenu Items
      const submenuItems = navMenu.querySelectorAll('[data-aue-model="navSubmenuItem"]');
      submenuItems.forEach((submenuItem) => {
        const submenuLabelElement = submenuItem.querySelector('[data-aue-prop="submenuLabel"]');
        const submenuLinkElement = submenuItem.querySelector('[data-aue-prop="submenuLink"]');

        if (submenuLabelElement && submenuLinkElement) {
          // Desktop Submenu Item
          const desktopSubmenuLi = document.createElement('li');
          desktopSubmenu.append(desktopSubmenuLi);

          const desktopSubmenuAnchor = document.createElement('a');
          desktopSubmenuAnchor.setAttribute('aria-expanded', 'false');
          desktopSubmenuAnchor.target = '_self';
          desktopSubmenuAnchor.href = submenuLinkElement.textContent;
          moveInstrumentation(submenuLinkElement, desktopSubmenuAnchor);

          const desktopSubmenuSpan = document.createElement('span');
          desktopSubmenuSpan.textContent = submenuLabelElement.textContent;
          moveInstrumentation(submenuLabelElement, desktopSubmenuSpan);
          desktopSubmenuAnchor.append(desktopSubmenuSpan);
          desktopSubmenuLi.append(desktopSubmenuAnchor);

          // Mobile Submenu Item
          const mobileSubmenuLi = document.createElement('li');
          mobileSubmenuLi.className = 'navigation-wrapper__mobilenavbar-menu';
          mobileSubmenu.append(mobileSubmenuLi);

          const mobileSubmenuAnchor = document.createElement('a');
          mobileSubmenuAnchor.className = 'navigation-wrapper__mobilenavbar-menulink';
          mobileSubmenuAnchor.target = '_self';
          mobileSubmenuAnchor.href = submenuLinkElement.textContent;
          moveInstrumentation(submenuLinkElement, mobileSubmenuAnchor);

          const mobileSubmenuSpan = document.createElement('span');
          mobileSubmenuSpan.textContent = submenuLabelElement.textContent;
          moveInstrumentation(submenuLabelElement, mobileSubmenuSpan);
          mobileSubmenuAnchor.append(mobileSubmenuSpan);
          mobileSubmenuLi.append(mobileSubmenuAnchor);
        }
      });
    }
  });

  // Desktop Contact Us CTA (duplicate from above, but in navbar)
  if (contactUsLinkElement && contactUsLabelElement) {
    const desktopContactUsAnchor = document.createElement('a');
    desktopContactUsAnchor.href = contactUsLinkElement.textContent;
    desktopContactUsAnchor.className = 'header-cta header-cta__ navigation--content__cta';
    desktopContactUsAnchor.target = '_self';
    desktopContactUsAnchor.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
    // Re-use instrumentation from original contactUsLinkElement if it's the same link
    // Otherwise, if it's a distinct element in the authored content, use its instrumentation
    moveInstrumentation(contactUsLinkElement, desktopContactUsAnchor);

    const ctaIconSpan = document.createElement('span');
    ctaIconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
    ctaIconSpan.setAttribute('aria-hidden', 'true');
    desktopContactUsAnchor.append(ctaIconSpan);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.className = 'header-cta__label';
    ctaLabelSpan.textContent = contactUsLabelElement.textContent;
    moveInstrumentation(contactUsLabelElement, ctaLabelSpan);
    desktopContactUsAnchor.append(ctaLabelSpan);

    navbarDesktop.append(desktopContactUsAnchor);
  }

  // Desktop Language Selector
  const desktopLangSelector = document.createElement('div');
  desktopLangSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLangSelector.style.visibility = 'visible';
  navbarDesktop.append(desktopLangSelector);

  const desktopLangUl = document.createElement('ul');
  desktopLangUl.className = 'header-cmp-language-selector';
  desktopLangSelector.append(desktopLangUl);

  // Mobile Nav Back
  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  navbarMobile.append(mobileNavBack);

  const mobileNavBackAnchor = document.createElement('a');
  mobileNavBackAnchor.className = 'navigation-wrapper__icon';
  mobileNavBack.append(mobileNavBackAnchor);

  const mobileNavBackIcon = document.createElement('span');
  mobileNavBackIcon.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  mobileNavBackAnchor.append(mobileNavBackIcon);

  const mobileNavBackLabel = document.createElement('span');
  mobileNavBackLabel.className = 'navigation-wrapper__iconlabel';
  mobileNavBackLabel.textContent = 'Back';
  mobileNavBack.append(mobileNavBackLabel);

  // Mobile Language Selector
  const mobileLangSelector = document.createElement('div');
  mobileLangSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLangSelector.style.visibility = 'visible';
  navbarMobile.append(mobileLangSelector);

  const mobileLangUl = document.createElement('ul');
  mobileLangUl.className = 'header-cmp-language-selector';
  mobileLangSelector.append(mobileLangUl);

  // Languages
  const languages = block.querySelectorAll('[data-aue-model="language"]');
  languages.forEach((lang, index) => {
    const languageLabelElement = lang.querySelector('[data-aue-prop="languageLabel"]');
    const languageLinkElement = lang.querySelector('[data-aue-prop="languageLink"]');

    if (languageLabelElement && languageLinkElement) {
      // Desktop Language Item
      const desktopLangLi = document.createElement('li');
      if (index === 0) desktopLangLi.className = 'active';
      desktopLangUl.append(desktopLangLi);

      const desktopLangAnchor = document.createElement('a');
      desktopLangAnchor.href = languageLinkElement.textContent;
      desktopLangAnchor.setAttribute('aria-label', languageLabelElement.textContent);
      desktopLangAnchor.className = 'header-cmp-language-selector__link';
      desktopLangAnchor.setAttribute('data-lang', languageLinkElement.textContent.startsWith('/ar') ? 'ar' : 'en');
      moveInstrumentation(languageLinkElement, desktopLangAnchor);

      desktopLangAnchor.textContent = languageLabelElement.textContent;
      moveInstrumentation(languageLabelElement, desktopLangAnchor);
      desktopLangLi.append(desktopLangAnchor);

      // Mobile Language Item
      const mobileLangLi = document.createElement('li');
      if (index === 0) mobileLangLi.className = 'active';
      mobileLangUl.append(mobileLangLi);

      const mobileLangAnchor = document.createElement('a');
      mobileLangAnchor.href = languageLinkElement.textContent;
      mobileLangAnchor.setAttribute('aria-label', languageLabelElement.textContent);
      mobileLangAnchor.className = 'header-cmp-language-selector__link';
      mobileLangAnchor.setAttribute('data-lang', languageLinkElement.textContent.startsWith('/ar') ? 'ar' : 'en');
      moveInstrumentation(languageLinkElement, mobileLangAnchor);

      mobileLangAnchor.textContent = languageLabelElement.textContent;
      moveInstrumentation(languageLabelElement, mobileLangAnchor);
      mobileLangLi.append(mobileLangAnchor);
    }
  });

  block.textContent = '';
  block.append(root);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
