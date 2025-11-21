import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('div');
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

  const logoLink = block.children[0]?.children[0]?.querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = '_self';
    newLogoLink.innerHTML = `
      <span class="header-qd-icon header-qd-icon--logo header-qd-logo">
        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span>
      </span>
    `;
    moveInstrumentation(logoLink, newLogoLink);
    navigationWrapperLogo.append(newLogoLink);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsLink = block.children[0]?.children[1]?.querySelector('a');
  if (contactUsLink) {
    const newContactUsLink = document.createElement('a');
    newContactUsLink.href = contactUsLink.href;
    newContactUsLink.className = 'header-cta header-cta__ navigation--content__cta';
    newContactUsLink.target = '_self';
    newContactUsLink.setAttribute('aria-label', contactUsLink.getAttribute('aria-label') || 'Contact Us');
    newContactUsLink.innerHTML = `
      <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
      <span class="header-cta__label">${contactUsLink.textContent}</span>
    `;
    moveInstrumentation(contactUsLink, newContactUsLink);
    navigationWrapperContactUsCta.append(newContactUsLink);
  }

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.className = 'navigation-wrapper__icon';
  navigationWrapperIcon.id = 'navigation-toggle';
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.className = 'header-hamburger-ellipse';
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  headerHamburgerEllipse.innerHTML = `
    <span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span>
    <span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>
  `;
  navigationWrapperIcon.append(headerHamburgerEllipse);

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

  const navMenusContainer = block.children[0]?.children[2];
  if (navMenusContainer) {
    [...navMenusContainer.children].forEach((menuRow) => {
      const menuTitleLink = menuRow.children[0]?.querySelector('a');
      const menuTitleText = menuRow.children[0]?.textContent;
      const subMenuItemsContainer = menuRow.children[1];

      const navbarMenu = document.createElement('li');
      navbarMenu.className = 'navigation-wrapper__navbar-menu';
      moveInstrumentation(menuRow, navbarMenu);

      if (menuTitleLink) {
        const newMenuLink = document.createElement('a');
        newMenuLink.href = menuTitleLink.href;
        newMenuLink.target = '_self';
        newMenuLink.className = 'navigation-wrapper__navbar-menulink';
        newMenuLink.setAttribute('aria-haspopup', 'true');
        newMenuLink.setAttribute('aria-expanded', 'false');
        newMenuLink.innerHTML = `
          <span>${menuTitleText}</span>
          <span class="header-qd-icon-wrapper">
            <span class="header-menu-icon header-qd-icon header-qd-icon--cheveron-down"></span>
          </span>
        `;
        moveInstrumentation(menuTitleLink, newMenuLink);
        navbarMenu.append(newMenuLink);
      }

      if (subMenuItemsContainer) {
        const navbarSubmenu = document.createElement('ul');
        navbarSubmenu.className = 'navigation-wrapper__navbar-submenu';
        [...subMenuItemsContainer.children].forEach((subMenuItemRow) => {
          const subMenuLink = subMenuItemRow.querySelector('a');
          if (subMenuLink) {
            const newSubMenuItem = document.createElement('li');
            const newSubMenuLink = document.createElement('a');
            newSubMenuLink.href = subMenuLink.href;
            newSubMenuLink.target = '_self';
            newSubMenuLink.setAttribute('aria-expanded', 'false');
            newSubMenuLink.innerHTML = `<span>${subMenuLink.textContent}</span>`;
            moveInstrumentation(subMenuLink, newSubMenuLink);
            newSubMenuItem.append(newSubMenuLink);
            navbarSubmenu.append(newSubMenuItem);
          }
        });
        navbarMenu.append(navbarSubmenu);
      }
      navbarDesktopList.append(navbarMenu);
    });
  }

  // Desktop Contact Us CTA (duplicate from above, but for desktop nav)
  if (contactUsLink) {
    const newContactUsLinkDesktop = document.createElement('a');
    newContactUsLinkDesktop.href = contactUsLink.href;
    newContactUsLinkDesktop.className = 'header-cta header-cta__ navigation--content__cta';
    newContactUsLinkDesktop.target = '_self';
    newContactUsLinkDesktop.setAttribute('aria-label', contactUsLink.getAttribute('aria-label') || 'Contact Us');
    newContactUsLinkDesktop.innerHTML = `
      <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
      <span class="header-cta__label">${contactUsLink.textContent}</span>
    `;
    navbarDesktop.append(newContactUsLinkDesktop);
  }

  // Desktop Language Selector
  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLanguageSelector.style.visibility = 'visible';
  navbarDesktop.append(desktopLanguageSelector);

  const desktopLanguageUl = document.createElement('ul');
  desktopLanguageUl.className = 'header-cmp-language-selector';
  desktopLanguageSelector.append(desktopLanguageUl);

  const languagesContainer = block.children[0]?.children[3];
  if (languagesContainer) {
    [...languagesContainer.children].forEach((langRow, index) => {
      const langLink = langRow.querySelector('a');
      if (langLink) {
        const langLi = document.createElement('li');
        if (index === 0) {
          langLi.classList.add('active');
        }
        const newLangLink = document.createElement('a');
        newLangLink.href = langLink.href;
        newLangLink.setAttribute('aria-label', langLink.textContent);
        newLangLink.className = 'header-cmp-language-selector__link';
        newLangLink.setAttribute('data-lang', langLink.getAttribute('data-lang') || (index === 0 ? 'en' : 'ar')); // Assuming en/ar for example
        newLangLink.textContent = langLink.textContent;
        moveInstrumentation(langLink, newLangLink);
        langLi.append(newLangLink);
        desktopLanguageUl.append(langLi);
      }
    });
  }

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

  if (navMenusContainer) {
    [...navMenusContainer.children].forEach((menuRow) => {
      const menuTitleText = menuRow.children[0]?.textContent;
      const subMenuItemsContainer = menuRow.children[1];

      const mobileNavbarMenu = document.createElement('li');
      mobileNavbarMenu.className = 'navigation-wrapper__mobilenavbar-menu border';
      moveInstrumentation(menuRow, mobileNavbarMenu);

      const mobileMenuLink = document.createElement('a');
      mobileMenuLink.className = 'navigation-wrapper__mobilenavbar-menulink';
      mobileMenuLink.innerHTML = `
        <span>${menuTitleText}</span>
        <span class="header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon"></span>
      `;
      mobileNavbarMenu.append(mobileMenuLink);

      if (subMenuItemsContainer) {
        const mobileNavbarSubmenu = document.createElement('ul');
        mobileNavbarSubmenu.className = 'navigation-wrapper__mobilenavbar-submenu';

        const mobileSubmenuHeader = document.createElement('li');
        mobileSubmenuHeader.className = 'navigation-wrapper__mobilenavbar-menuheader';
        mobileSubmenuHeader.innerHTML = `<a><span>${menuTitleText}</span></a>`;
        mobileNavbarSubmenu.append(mobileSubmenuHeader);

        [...subMenuItemsContainer.children].forEach((subMenuItemRow) => {
          const subMenuLink = subMenuItemRow.querySelector('a');
          if (subMenuLink) {
            const mobileSubMenuItem = document.createElement('li');
            mobileSubMenuItem.className = 'navigation-wrapper__mobilenavbar-menu';
            const mobileSubMenuLink = document.createElement('a');
            mobileSubMenuLink.className = 'navigation-wrapper__mobilenavbar-menulink';
            mobileSubMenuLink.href = subMenuLink.href;
            mobileSubMenuLink.target = '_self';
            mobileSubMenuLink.innerHTML = `<span>${subMenuLink.textContent}</span>`;
            moveInstrumentation(subMenuLink, mobileSubMenuLink);
            mobileSubMenuItem.append(mobileSubMenuLink);
            mobileNavbarSubmenu.append(mobileSubMenuItem);
          }
        });
        mobileNavbarMenu.append(mobileNavbarSubmenu);
      }
      navbarMobileList.append(mobileNavbarMenu);
    });
  }

  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  mobileNavBack.innerHTML = `
    <a class="navigation-wrapper__icon">
      <span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span>
    </a>
    <span class="navigation-wrapper__iconlabel">Back</span>
  `;
  navbarMobile.append(mobileNavBack);

  // Mobile Language Selector
  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLanguageSelector.style.visibility = 'visible';
  navbarMobile.append(mobileLanguageSelector);

  const mobileLanguageUl = document.createElement('ul');
  mobileLanguageUl.className = 'header-cmp-language-selector';
  mobileLanguageSelector.append(mobileLanguageUl);

  if (languagesContainer) {
    [...languagesContainer.children].forEach((langRow, index) => {
      const langLink = langRow.querySelector('a');
      if (langLink) {
        const langLi = document.createElement('li');
        if (index === 0) {
          langLi.classList.add('active');
        }
        const newLangLink = document.createElement('a');
        newLangLink.href = langLink.href;
        newLangLink.setAttribute('aria-label', langLink.textContent);
        newLangLink.className = 'header-cmp-language-selector__link';
        newLangLink.setAttribute('data-lang', langLink.getAttribute('data-lang') || (index === 0 ? 'en' : 'ar'));
        newLangLink.textContent = langLink.textContent;
        moveInstrumentation(langLink, newLangLink);
        langLi.append(newLangLink);
        mobileLanguageUl.append(langLi);
      }
    });
  }

  block.textContent = '';
  block.append(headerContainer);
}
