import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper', 'layout-container', 'transparent-header');
  moveInstrumentation(block, headerWrapper);

  const headerNavigation = document.createElement('div');
  headerNavigation.classList.add('header-navigation');
  headerWrapper.append(headerNavigation);

  const navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('navigation-wrapper');
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  headerNavigation.append(navigationWrapper);

  const navigationWrapperLogo = document.createElement('div');
  navigationWrapperLogo.classList.add('navigation-wrapper__logo');
  navigationWrapper.append(navigationWrapperLogo);

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.target = '_self';
    const logoSpan = document.createElement('span');
    logoSpan.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
    // Append all path spans from the original logo structure
    const originalLogoSpan = logoLink.querySelector('.header-qd-logo');
    if (originalLogoSpan) {
      logoSpan.append(...originalLogoSpan.childNodes);
    }
    logoAnchor.append(logoSpan);
    navigationWrapperLogo.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }

  const navigationWrapperContactUsCta = document.createElement('div');
  navigationWrapperContactUsCta.classList.add('navigation-wrapper__contactUs-cta');
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsLink = block.querySelector('[data-aue-prop="contactUsLink"]');
  if (contactUsLink) {
    const contactUsAnchor = document.createElement('a');
    contactUsAnchor.href = contactUsLink.href;
    contactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    contactUsAnchor.target = '_self';
    contactUsAnchor.setAttribute('aria-label', 'Contact Us');

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    contactUsAnchor.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('header-cta__label');
    ctaLabel.textContent = contactUsLink.textContent;
    contactUsAnchor.append(ctaLabel);

    navigationWrapperContactUsCta.append(contactUsAnchor);
    moveInstrumentation(contactUsLink, contactUsAnchor);
  }

  const navigationWrapperIcon = document.createElement('div');
  navigationWrapperIcon.classList.add('navigation-wrapper__icon');
  navigationWrapperIcon.id = 'navigation-toggle';
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement('div');
  headerHamburgerEllipse.classList.add('header-hamburger-ellipse');
  headerHamburgerEllipse.setAttribute('tabindex', '0');
  headerHamburgerEllipse.innerHTML = `
    <span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span>
    <span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>
  `;
  navigationWrapperIcon.append(headerHamburgerEllipse);

  // Desktop Navigation
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.classList.add('navigation-wrapper__navbar');
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarDesktop);

  const navbarDesktopList = document.createElement('ul');
  navbarDesktopList.classList.add('navigation-wrapper__navbar-list');
  navbarDesktop.append(navbarDesktopList);

  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  menuItems.forEach((menuItem) => {
    const listItem = document.createElement('li');
    listItem.classList.add('navigation-wrapper__navbar-menu');

    const menuLink = document.createElement('a');
    menuLink.classList.add('navigation-wrapper__navbar-menulink');
    menuLink.setAttribute('aria-haspopup', 'true');
    menuLink.setAttribute('aria-expanded', 'false');
    menuLink.target = '_self';

    const linkProp = menuItem.querySelector('[data-aue-prop="link"]');
    if (linkProp) {
      menuLink.href = linkProp.href;
      moveInstrumentation(linkProp, menuLink);
    }

    const labelProp = menuItem.querySelector('[data-aue-prop="label"]');
    if (labelProp) {
      const labelSpan = document.createElement('span');
      labelSpan.textContent = labelProp.textContent;
      menuLink.append(labelSpan);
      moveInstrumentation(labelProp, labelSpan);
    }

    const iconWrapper = document.createElement('span');
    iconWrapper.classList.add('header-qd-icon-wrapper');
    iconWrapper.innerHTML = '<span class="header-menu-icon header-qd-icon header-qd-icon--cheveron-down"></span>';
    menuLink.append(iconWrapper);

    listItem.append(menuLink);

    const submenuItems = menuItem.querySelectorAll('[data-aue-model="menuItem"]');
    if (submenuItems.length > 0) {
      const subMenu = document.createElement('ul');
      subMenu.classList.add('navigation-wrapper__navbar-submenu');
      submenuItems.forEach((subMenuItem) => {
        const subListItem = document.createElement('li');
        const subMenuLink = document.createElement('a');
        subMenuLink.setAttribute('aria-expanded', 'false');
        subMenuLink.target = '_self';

        const subLinkProp = subMenuItem.querySelector('[data-aue-prop="link"]');
        if (subLinkProp) {
          subMenuLink.href = subLinkProp.href;
          moveInstrumentation(subLinkProp, subMenuLink);
        }

        const subLabelProp = subMenuItem.querySelector('[data-aue-prop="label"]');
        if (subLabelProp) {
          const subLabelSpan = document.createElement('span');
          subLabelSpan.textContent = subLabelProp.textContent;
          subMenuLink.append(subLabelSpan);
          moveInstrumentation(subLabelProp, subLabelSpan);
        }
        subListItem.append(subMenuLink);
        subMenu.append(subListItem);
      });
      listItem.append(subMenu);
    }
    navbarDesktopList.append(listItem);
  });

  // Desktop Contact Us CTA (duplicate of the one in logo area, for desktop nav)
  if (contactUsLink) {
    const desktopContactUsAnchor = document.createElement('a');
    desktopContactUsAnchor.href = contactUsLink.href;
    desktopContactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
    desktopContactUsAnchor.target = '_self';
    desktopContactUsAnchor.setAttribute('aria-label', '${navigation.contactUsAriaLabel}'); // Use placeholder for dynamic label

    const desktopCtaIcon = document.createElement('span');
    desktopCtaIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
    desktopCtaIcon.setAttribute('aria-hidden', 'true');
    desktopContactUsAnchor.append(desktopCtaIcon);

    const desktopCtaLabel = document.createElement('span');
    desktopCtaLabel.classList.add('header-cta__label');
    desktopCtaLabel.textContent = contactUsLink.textContent;
    desktopContactUsAnchor.append(desktopCtaLabel);

    navbarDesktop.append(desktopContactUsAnchor);
    // No moveInstrumentation here as it's a duplication, the original is moved above.
  }

  // Language Selector for Desktop
  const desktopLangSelector = document.createElement('div');
  desktopLangSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  desktopLangSelector.style.visibility = 'visible';
  const desktopLangUl = document.createElement('ul');
  desktopLangUl.classList.add('header-cmp-language-selector');

  const languageOptions = block.querySelectorAll('[data-aue-model="languageOption"]');
  languageOptions.forEach((langOption, index) => {
    const langLi = document.createElement('li');
    if (index === 0) {
      langLi.classList.add('active');
    }
    const langLink = document.createElement('a');
    langLink.classList.add('header-cmp-language-selector__link');

    const langLinkProp = langOption.querySelector('[data-aue-prop="link"]');
    if (langLinkProp) {
      langLink.href = langLinkProp.href;
      moveInstrumentation(langLinkProp, langLink);
    }

    const langLabelProp = langOption.querySelector('[data-aue-prop="label"]');
    if (langLabelProp) {
      langLink.setAttribute('aria-label', langLabelProp.textContent);
      langLink.textContent = langLabelProp.textContent;
      moveInstrumentation(langLabelProp, langLink);
    }
    langLi.append(langLink);
    desktopLangUl.append(langLi);
  });
  desktopLangSelector.append(desktopLangUl);
  navbarDesktop.append(desktopLangSelector);

  // Mobile Navigation
  const navbarMobile = document.createElement('nav');
  navbarMobile.classList.add('navigation-wrapper__mobilenavbar');
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarMobile);

  const navbarMobileList = document.createElement('ul');
  navbarMobileList.classList.add('navigation-wrapper__mobilenavbar-list');
  navbarMobile.append(navbarMobileList);

  // Re-iterate menuItems for mobile structure
  menuItems.forEach((menuItem) => {
    const listItem = document.createElement('li');
    listItem.classList.add('navigation-wrapper__mobilenavbar-menu', 'border');

    const menuLink = document.createElement('a');
    menuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');

    const labelProp = menuItem.querySelector('[data-aue-prop="label"]');
    if (labelProp) {
      const labelSpan = document.createElement('span');
      labelSpan.textContent = labelProp.textContent;
      menuLink.append(labelSpan);
      // No moveInstrumentation here as it's a duplication, the original is moved above.
    }

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'navigation-wrapper__mobilenavbar-menulink-icon');
    menuLink.append(iconSpan);
    listItem.append(menuLink);

    const submenuItems = menuItem.querySelectorAll('[data-aue-model="menuItem"]');
    if (submenuItems.length > 0) {
      const subMenu = document.createElement('ul');
      subMenu.classList.add('navigation-wrapper__mobilenavbar-submenu');

      const menuHeader = document.createElement('li');
      menuHeader.classList.add('navigation-wrapper__mobilenavbar-menuheader');
      const menuHeaderLink = document.createElement('a');
      const menuHeaderSpan = document.createElement('span');
      if (labelProp) {
        menuHeaderSpan.textContent = labelProp.textContent;
      }
      menuHeaderLink.append(menuHeaderSpan);
      menuHeader.append(menuHeaderLink);
      subMenu.append(menuHeader);

      submenuItems.forEach((subMenuItem) => {
        const subListItem = document.createElement('li');
        subListItem.classList.add('navigation-wrapper__mobilenavbar-menu');
        const subMenuLink = document.createElement('a');
        subMenuLink.classList.add('navigation-wrapper__mobilenavbar-menulink');
        subMenuLink.target = '_self';

        const subLinkProp = subMenuItem.querySelector('[data-aue-prop="link"]');
        if (subLinkProp) {
          subMenuLink.href = subLinkProp.href;
          // No moveInstrumentation here as it's a duplication, the original is moved above.
        }

        const subLabelProp = subMenuItem.querySelector('[data-aue-prop="label"]');
        if (subLabelProp) {
          const subLabelSpan = document.createElement('span');
          subLabelSpan.textContent = subLabelProp.textContent;
          subMenuLink.append(subLabelSpan);
          // No moveInstrumentation here as it's a duplication, the original is moved above.
        }
        subListItem.append(subMenuLink);
        subMenu.append(subListItem);
      });
      listItem.append(subMenu);
    }
    navbarMobileList.append(listItem);
  });

  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');
  mobileNavBack.innerHTML = `
    <a class="navigation-wrapper__icon">
      <span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span>
    </a>
    <span class="navigation-wrapper__iconlabel">Back</span>
  `;
  navbarMobile.append(mobileNavBack);

  // Language Selector for Mobile
  const mobileLangSelector = document.createElement('div');
  mobileLangSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  mobileLangSelector.style.visibility = 'visible';
  const mobileLangUl = document.createElement('ul');
  mobileLangUl.classList.add('header-cmp-language-selector');

  languageOptions.forEach((langOption, index) => {
    const langLi = document.createElement('li');
    if (index === 0) {
      langLi.classList.add('active');
    }
    const langLink = document.createElement('a');
    langLink.classList.add('header-cmp-language-selector__link');

    const langLinkProp = langOption.querySelector('[data-aue-prop="link"]');
    if (langLinkProp) {
      langLink.href = langLinkProp.href;
      // No moveInstrumentation here as it's a duplication, the original is moved above.
    }

    const langLabelProp = langOption.querySelector('[data-aue-prop="label"]');
    if (langLabelProp) {
      langLink.setAttribute('aria-label', langLabelProp.textContent);
      langLink.textContent = langLabelProp.textContent;
      // No moveInstrumentation here as it's a duplication, the original is moved above.
    }
    langLi.append(langLink);
    mobileLangUl.append(langLi);
  });
  mobileLangSelector.append(mobileLangUl);
  navbarMobile.append(mobileLangSelector);

  block.innerHTML = '';
  block.append(headerWrapper);
}
