import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.id = 'container-e9226c8e5e';
  container.className = 'header-container';

  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper layout-container transparent-header';

  const headerNavigation = document.createElement('div');
  headerNavigation.className = 'header-navigation';

  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');

  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.className = 'navigation-wrapper__logo';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoA = document.createElement('a');
  if (logoLink) {
    logoA.href = logoLink.textContent.trim();
    moveInstrumentation(logoLink, logoA);
  } else {
    logoA.href = '/';
  }
  logoA.target = '_self';
  const logoAriaLabel = block.querySelector('[data-aue-prop="logoAriaLabel"]');
  if (logoAriaLabel) {
    logoA.setAttribute('aria-label', logoAriaLabel.textContent.trim());
    moveInstrumentation(logoAriaLabel, logoA);
  }

  const headerQdIcon = document.createElement('span');
  headerQdIcon.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
  for (let i = 1; i <= 25; i += 1) {
    headerQdIcon.appendChild(document.createElement('span')).className = `path${i}`;
  }
  logoA.append(headerQdIcon);
  navigationWrapperLogo.append(logoA);

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.className = 'navigation-wrapper__contactUs-cta';

  const contactUsLink = block.querySelector('[data-aue-prop="contactUsLink"]');
  const contactUsLabel = block.querySelector('[data-aue-prop="contactUsLabel"]');

  const headerCta = document.createElement('a');
  headerCta.className = 'header-cta header-cta__ navigation--content__cta';
  if (contactUsLink) {
    headerCta.href = contactUsLink.textContent.trim();
    moveInstrumentation(contactUsLink, headerCta);
  } else {
    headerCta.href = '/contact/';
  }
  headerCta.target = '_self';
  if (contactUsLabel) {
    headerCta.setAttribute('aria-label', contactUsLabel.textContent.trim());
    moveInstrumentation(contactUsLabel, headerCta);
  } else {
    headerCta.setAttribute('aria-label', 'Contact Us');
  }

  const headerCtaIcon = document.createElement('span');
  headerCtaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  headerCtaIcon.setAttribute('aria-hidden', 'true');
  headerCta.append(headerCtaIcon);

  const headerCtaLabel = document.createElement('span');
  headerCtaLabel.className = 'header-cta__label';
  if (contactUsLabel) {
    headerCtaLabel.textContent = contactUsLabel.textContent.trim();
  } else {
    headerCtaLabel.textContent = 'Contact Us';
  }
  headerCta.append(headerCtaLabel);
  navigationWrapperContactUsCta.append(headerCta);

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.className = 'navigation-wrapper__icon';
  navigationWrapperIcon.id = 'navigation-toggle';

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.className = 'header-hamburger-ellipse';
  headerHamburgerEllipse.tabIndex = 0;
  headerHamburgerEllipse.innerHTML = `
    <span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span>
    <span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>
  `;
  navigationWrapperIcon.append(headerHamburgerEllipse);
  navigationWrapperContactUsCta.append(navigationWrapperIcon);
  navigationWrapperLogo.append(navigationWrapperContactUsCta);
  navigationWrapper.append(navigationWrapperLogo);

  // Desktop Navigation
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.className = 'navigation-wrapper__navbar';
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.className = 'navigation-wrapper__navbar-list';

  const navMenus = block.querySelectorAll('[data-aue-model="navMenu"]');
  navMenus.forEach((menu) => {
    const menuLabel = menu.querySelector('[data-aue-prop="menuLabel"]');
    const menuLink = menu.querySelector('[data-aue-prop="menuLink"]');
    const submenuItems = menu.querySelectorAll('[data-aue-model="navMenu"]'); // Submenu items are also navMenu models

    const li = document.createElement('li');
    li.className = 'navigation-wrapper__navbar-menu';

    const a = document.createElement('a');
    a.setAttribute('aria-haspopup', 'true');
    a.setAttribute('aria-expanded', 'false');
    a.className = 'navigation-wrapper__navbar-menulink';
    a.target = '_self';
    if (menuLink) {
      a.href = menuLink.textContent.trim();
      moveInstrumentation(menuLink, a);
    }
    if (menuLabel) {
      const span = document.createElement('span');
      span.textContent = menuLabel.textContent.trim();
      a.append(span);
      moveInstrumentation(menuLabel, span);
    }

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'header-qd-icon-wrapper';
    iconWrapper.innerHTML = '<span class="header-menu-icon header-qd-icon header-qd-icon--cheveron-down"></span>';
    a.append(iconWrapper);
    li.append(a);

    if (submenuItems.length > 0) {
      const submenuUl = document.createElement('ul');
      submenuUl.className = 'navigation-wrapper__navbar-submenu';
      submenuItems.forEach((subMenuItem) => {
        const subMenuLabel = subMenuItem.querySelector('[data-aue-prop="menuLabel"]');
        const subMenuLink = subMenuItem.querySelector('[data-aue-prop="menuLink"]');

        const subLi = document.createElement('li');
        const subA = document.createElement('a');
        subA.setAttribute('aria-expanded', 'false');
        subA.target = '_self';
        if (subMenuLink) {
          subA.href = subMenuLink.textContent.trim();
          moveInstrumentation(subMenuLink, subA);
        }
        if (subMenuLabel) {
          const subSpan = document.createElement('span');
          subSpan.textContent = subMenuLabel.textContent.trim();
          subA.append(subSpan);
          moveInstrumentation(subMenuLabel, subSpan);
        }
        subLi.append(subA);
        submenuUl.append(subLi);
      });
      li.append(submenuUl);
    }
    navbarDesktopList.append(li);
  });
  navbarDesktop.append(navbarDesktopList);

  // Desktop Contact Us CTA
  const desktopCta = document.createElement('a');
  desktopCta.className = 'header-cta header-cta__ navigation--content__cta';
  if (contactUsLink) {
    desktopCta.href = contactUsLink.textContent.trim();
  } else {
    desktopCta.href = '/contact/';
  }
  desktopCta.target = '_self';
  if (contactUsLabel) {
    desktopCta.setAttribute('aria-label', contactUsLabel.textContent.trim());
  } else {
    desktopCta.setAttribute('aria-label', '${navigation.contactUsAriaLabel}');
  }
  desktopCta.innerHTML = `
    <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
    <span class="header-cta__label">${contactUsLabel ? contactUsLabel.textContent.trim() : 'Contact Us'}</span>
  `;
  navbarDesktop.append(desktopCta);

  // Desktop Language Selector
  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLanguageSelector.style.visibility = 'visible';
  const desktopLangUl = document.createElement('ul');
  desktopLangUl.className = 'header-cmp-language-selector';

  const languages = block.querySelectorAll('[data-aue-model="language"]');
  languages.forEach((lang, index) => {
    const langLabel = lang.querySelector('[data-aue-prop="langLabel"]');
    const langLink = lang.querySelector('[data-aue-prop="langLink"]');
    const langCode = lang.querySelector('[data-aue-prop="langCode"]');

    const langLi = document.createElement('li');
    if (index === 0) {
      langLi.classList.add('active');
    }
    const langA = document.createElement('a');
    if (langLink) {
      langA.href = langLink.textContent.trim();
      moveInstrumentation(langLink, langA);
    }
    if (langLabel) {
      langA.setAttribute('aria-label', langLabel.textContent.trim());
      langA.textContent = langLabel.textContent.trim();
      moveInstrumentation(langLabel, langA);
    }
    langA.className = 'header-cmp-language-selector__link';
    if (langCode) {
      langA.setAttribute('data-lang', langCode.textContent.trim());
      moveInstrumentation(langCode, langA);
    }
    langLi.append(langA);
    desktopLangUl.append(langLi);
  });
  desktopLanguageSelector.append(desktopLangUl);
  navbarDesktop.append(desktopLanguageSelector);
  navigationWrapper.append(navbarDesktop);

  // Mobile Navigation
  const navbarMobile = document.createElement('nav');
  navbarMobile.className = 'navigation-wrapper__mobilenavbar';
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.className = 'navigation-wrapper__mobilenavbar-list';

  navMenus.forEach((menu) => {
    const menuLabel = menu.querySelector('[data-aue-prop="menuLabel"]');
    const submenuItems = menu.querySelectorAll('[data-aue-model="navMenu"]');

    const li = document.createElement('li');
    li.className = 'navigation-wrapper__mobilenavbar-menu border';

    const a = document.createElement('a');
    a.className = 'navigation-wrapper__mobilenavbar-menulink';
    if (menuLabel) {
      const span = document.createElement('span');
      span.textContent = menuLabel.textContent.trim();
      a.append(span);
    }
    a.innerHTML += '<span class="header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon"></span>';
    li.append(a);

    if (submenuItems.length > 0) {
      const submenuUl = document.createElement('ul');
      submenuUl.className = 'navigation-wrapper__mobilenavbar-submenu';

      const submenuHeaderLi = document.createElement('li');
      submenuHeaderLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
      const submenuHeaderA = document.createElement('a');
      if (menuLabel) {
        submenuHeaderA.innerHTML = `<span>${menuLabel.textContent.trim()}</span>`;
      }
      submenuHeaderLi.append(submenuHeaderA);
      submenuUl.append(submenuHeaderLi);

      submenuItems.forEach((subMenuItem) => {
        const subMenuLabel = subMenuItem.querySelector('[data-aue-prop="menuLabel"]');
        const subMenuLink = subMenuItem.querySelector('[data-aue-prop="menuLink"]');

        const subLi = document.createElement('li');
        subLi.className = 'navigation-wrapper__mobilenavbar-menu';
        const subA = document.createElement('a');
        subA.className = 'navigation-wrapper__mobilenavbar-menulink';
        subA.target = '_self';
        if (subMenuLink) {
          subA.href = subMenuLink.textContent.trim();
          moveInstrumentation(subMenuLink, subA);
        }
        if (subMenuLabel) {
          const subSpan = document.createElement('span');
          subSpan.textContent = subMenuLabel.textContent.trim();
          subA.append(subSpan);
          moveInstrumentation(subMenuLabel, subSpan);
        }
        subLi.append(subA);
        submenuUl.append(subLi);
      });
      li.append(submenuUl);
    }
    navbarMobileList.append(li);
  });
  navbarMobile.append(navbarMobileList);

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
  const mobileLangUl = document.createElement('ul');
  mobileLangUl.className = 'header-cmp-language-selector';

  languages.forEach((lang, index) => {
    const langLabel = lang.querySelector('[data-aue-prop="langLabel"]');
    const langLink = lang.querySelector('[data-aue-prop="langLink"]');
    const langCode = lang.querySelector('[data-aue-prop="langCode"]');

    const langLi = document.createElement('li');
    if (index === 0) {
      langLi.classList.add('active');
    }
    const langA = document.createElement('a');
    if (langLink) {
      langA.href = langLink.textContent.trim();
    }
    if (langLabel) {
      langA.setAttribute('aria-label', langLabel.textContent.trim());
      langA.textContent = langLabel.textContent.trim();
    }
    langA.className = 'header-cmp-language-selector__link';
    if (langCode) {
      langA.setAttribute('data-lang', langCode.textContent.trim());
    }
    langLi.append(langA);
    mobileLangUl.append(langLi);
  });
  mobileLanguageSelector.append(mobileLangUl);
  navbarMobile.append(mobileLanguageSelector);
  navigationWrapper.append(navbarMobile);

  headerNavigation.append(navigationWrapper);
  headerWrapper.append(headerNavigation);
  container.append(headerWrapper);

  block.textContent = '';
  block.append(container);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
