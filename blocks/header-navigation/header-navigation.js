import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The 'block' element itself is the top-level 'header-container' div.
  // We first extract all necessary data and non-modeled DOM structures from its current children.

  const headerData = {};
  const clonedElements = {}; // To store complex elements not easily modeled, for re-appending.

  // --- Data Extraction ---

  // Logo Link and Content
  const originalLogoAnchor = block.querySelector('.navigation-wrapper__logo > a');
  if (originalLogoAnchor) {
    headerData.logoLink = originalLogoAnchor.href;
    headerData.logoContent = originalLogoAnchor.innerHTML; // Preserve complex SVG-like span structure
    clonedElements.originalLogoAnchor = originalLogoAnchor; // Store for instrumentation
  }

  // Contact Us Link and Label (from the first instance found, typically the mobile/top-level one)
  const originalContactUsCta = block.querySelector('.navigation-wrapper__contactUs-cta > a');
  if (originalContactUsCta) {
    headerData.contactUsLink = originalContactUsCta.href;
    headerData.contactUsLabel = originalContactUsCta.querySelector('.header-cta__label')?.textContent.trim() || '';
    clonedElements.originalContactUsCta = originalContactUsCta; // Store for instrumentation
  }

  // Hamburger icon (not explicitly modeled but present in HTML, clone to preserve)
  const originalHamburger = block.querySelector('.navigation-wrapper__icon#navigation-toggle');
  if (originalHamburger) {
    clonedElements.hamburger = originalHamburger.cloneNode(true);
    clonedElements.originalHamburger = originalHamburger; // Store for instrumentation
  }

  // Nav Menus (desktop structure is typically the most complete for data extraction)
  headerData.navMenus = [];
  block.querySelectorAll('.navigation-wrapper__navbar-list > li.navigation-wrapper__navbar-menu').forEach((menuLi, menuIndex) => {
    const menuAnchor = menuLi.querySelector('.navigation-wrapper__navbar-menulink');
    const menuLabelSpan = menuAnchor?.querySelector('span:not(.header-qd-icon-wrapper)'); // Exclude icon wrapper
    const menu = {
      label: menuLabelSpan?.textContent.trim() || '',
      link: menuAnchor?.href || '',
      submenus: [],
    };
    clonedElements[`originalMenuAnchor_${menuIndex}`] = menuAnchor; // Store for instrumentation

    menuLi.querySelectorAll('.navigation-wrapper__navbar-submenu > li > a').forEach((submenuAnchor, subMenuIndex) => {
      menu.submenus.push({
        label: submenuAnchor.querySelector('span')?.textContent.trim() || '',
        link: submenuAnchor.href || '',
      });
      clonedElements[`originalSubmenuAnchor_${menuIndex}_${subMenuIndex}`] = submenuAnchor; // Store for instrumentation
    });
    headerData.navMenus.push(menu);
  });

  // Desktop Contact Us CTA (duplicate as per authored HTML structure, clone to preserve)
  const desktopCtaLink = block.querySelector('nav#navbar-desktop > a.header-cta');
  if (desktopCtaLink) {
    clonedElements.desktopContactUsCta = desktopCtaLink.cloneNode(true);
    clonedElements.originalDesktopCtaLink = desktopCtaLink; // Store for instrumentation
  }

  // Languages
  headerData.languages = [];
  block.querySelectorAll('.header-cmp-language-selector > li > a').forEach((langAnchor, langIndex) => {
    headerData.languages.push({
      label: langAnchor.textContent.trim(),
      link: langAnchor.href,
      isActive: langAnchor.parentElement.classList.contains('active'),
    });
    clonedElements[`originalLangAnchor_${langIndex}`] = langAnchor; // Store for instrumentation
  });

  // Mobile Nav Back button (not modeled, clone to preserve)
  const originalMobileBack = block.querySelector('.navigation-wrapper__mobilenavbar-back.nav-back');
  if (originalMobileBack) {
    clonedElements.mobileBack = originalMobileBack.cloneNode(true);
    clonedElements.originalMobileBack = originalMobileBack; // Store for instrumentation
  }


  // --- DOM Reconstruction ---

  // Clear the original block content
  block.textContent = '';

  // Re-append the main wrapper structure inside the block
  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper layout-container transparent-header';
  block.append(headerWrapper);

  const headerNavigation = document.createElement('div');
  headerNavigation.className = 'header-navigation';
  headerWrapper.append(headerNavigation);

  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  headerNavigation.append(navigationWrapper);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.className = 'navigation-wrapper__logo';
  if (headerData.logoLink) {
    const newLogoAnchor = document.createElement('a');
    newLogoAnchor.href = headerData.logoLink;
    newLogoAnchor.target = '_self';
    newLogoAnchor.innerHTML = headerData.logoContent; // Re-insert the original complex logo SVG-like structure
    moveInstrumentation(clonedElements.originalLogoAnchor, newLogoAnchor); // Transfer instrumentation
    logoWrapper.append(newLogoAnchor);
  }
  navigationWrapper.append(logoWrapper);

  // Contact Us CTA and Hamburger (for smaller screens/top-right)
  const contactUsCtaWrapper = document.createElement('div');
  contactUsCtaWrapper.className = 'navigation-wrapper__contactUs-cta';

  if (headerData.contactUsLink && headerData.contactUsLabel) {
    const newContactUsCta = document.createElement('a');
    newContactUsCta.href = headerData.contactUsLink;
    newContactUsCta.className = clonedElements.originalContactUsCta.className; // Copy all classes
    newContactUsCta.target = '_self';
    newContactUsCta.setAttribute('aria-label', clonedElements.originalContactUsCta.getAttribute('aria-label') || headerData.contactUsLabel);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    newContactUsCta.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'header-cta__label';
    labelSpan.textContent = headerData.contactUsLabel;
    newContactUsCta.append(labelSpan);

    moveInstrumentation(clonedElements.originalContactUsCta, newContactUsCta); // Transfer instrumentation
    contactUsCtaWrapper.append(newContactUsCta);
  }

  // Re-append cloned Hamburger icon
  if (clonedElements.hamburger) {
    moveInstrumentation(clonedElements.originalHamburger, clonedElements.hamburger); // Transfer instrumentation
    contactUsCtaWrapper.append(clonedElements.hamburger);
  }
  logoWrapper.append(contactUsCtaWrapper);

  // --- Desktop Navigation ---
  const navDesktop = document.createElement('nav');
  navDesktop.className = 'navigation-wrapper__navbar';
  navDesktop.id = 'navbar-desktop';
  navDesktop.setAttribute('role', 'navigation');
  navDesktop.setAttribute('aria-label', 'navigation.main.aria.label');

  const ulDesktop = document.createElement('ul');
  ulDesktop.className = 'navigation-wrapper__navbar-list';

  headerData.navMenus.forEach((menu, menuIndex) => {
    const liMenu = document.createElement('li');
    liMenu.className = 'navigation-wrapper__navbar-menu';

    const anchorMenu = document.createElement('a');
    anchorMenu.href = menu.link;
    anchorMenu.className = 'navigation-wrapper__navbar-menulink';
    anchorMenu.target = '_self';
    anchorMenu.setAttribute('aria-haspopup', menu.submenus.length > 0 ? 'true' : 'false');
    anchorMenu.setAttribute('aria-expanded', 'false'); // Initial state as per authored HTML

    const spanLabel = document.createElement('span');
    spanLabel.textContent = menu.label;
    anchorMenu.append(spanLabel);

    if (menu.submenus.length > 0) {
      const iconWrapper = document.createElement('span');
      iconWrapper.className = 'header-qd-icon-wrapper';
      const iconSpan = document.createElement('span');
      iconSpan.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
      iconWrapper.append(iconSpan);
      anchorMenu.append(iconWrapper);
    }
    moveInstrumentation(clonedElements[`originalMenuAnchor_${menuIndex}`], anchorMenu); // Transfer instrumentation
    liMenu.append(anchorMenu);

    if (menu.submenus.length > 0) {
      const ulSubmenu = document.createElement('ul');
      ulSubmenu.className = 'navigation-wrapper__navbar-submenu';
      menu.submenus.forEach((submenu, subMenuIndex) => {
        const liSubmenu = document.createElement('li');
        const anchorSubmenu = document.createElement('a');
        anchorSubmenu.href = submenu.link;
        anchorSubmenu.target = '_self';
        anchorSubmenu.setAttribute('aria-expanded', 'false'); // Initial state
        const spanSubmenuLabel = document.createElement('span');
        spanSubmenuLabel.textContent = submenu.label;
        anchorSubmenu.append(spanSubmenuLabel);
        moveInstrumentation(clonedElements[`originalSubmenuAnchor_${menuIndex}_${subMenuIndex}`], anchorSubmenu); // Transfer instrumentation
        liSubmenu.append(anchorSubmenu);
        ulSubmenu.append(liSubmenu);
      });
      liMenu.append(ulSubmenu);
    }
    ulDesktop.append(liMenu);
  });
  navDesktop.append(ulDesktop);

  // Re-append cloned Desktop Contact Us CTA
  if (clonedElements.desktopContactUsCta) {
    moveInstrumentation(clonedElements.originalDesktopCtaLink, clonedElements.desktopContactUsCta);
    navDesktop.append(clonedElements.desktopContactUsCta);
  }

  // Desktop Language Selector
  const desktopLangSelectorWrapper = document.createElement('div');
  desktopLangSelectorWrapper.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLangSelectorWrapper.style.visibility = 'visible'; // As per authored HTML
  const ulDesktopLang = document.createElement('ul');
  ulDesktopLang.className = 'header-cmp-language-selector';

  headerData.languages.forEach((lang, langIndex) => {
    const liLang = document.createElement('li');
    if (lang.isActive) liLang.classList.add('active');
    const anchorLang = document.createElement('a');
    anchorLang.href = lang.link;
    anchorLang.setAttribute('aria-label', lang.label);
    anchorLang.className = 'header-cmp-language-selector__link';
    anchorLang.setAttribute('data-lang', lang.link.split('/')[1] || 'en'); // Infer data-lang from href
    anchorLang.textContent = lang.label;
    moveInstrumentation(clonedElements[`originalLangAnchor_${langIndex}`], anchorLang); // Transfer instrumentation
    liLang.append(anchorLang);
    ulDesktopLang.append(liLang);
  });
  desktopLangSelectorWrapper.append(ulDesktopLang);
  navDesktop.append(desktopLangSelectorWrapper);

  navigationWrapper.append(navDesktop);

  // --- Mobile Navigation ---
  const navMobile = document.createElement('nav');
  navMobile.className = 'navigation-wrapper__mobilenavbar';
  navMobile.id = 'navbar-mobile';
  navMobile.setAttribute('role', 'navigation');
  navMobile.setAttribute('aria-label', 'navigation.main.aria.label');

  const ulMobile = document.createElement('ul');
  ulMobile.className = 'navigation-wrapper__mobilenavbar-list';

  headerData.navMenus.forEach((menu) => { // Re-use desktop nav data for mobile structure
    const liMobileMenuOuter = document.createElement('li');
    liMobileMenuOuter.className = 'navigation-wrapper__mobilenavbar-menu border';

    const anchorMobileMenu = document.createElement('a');
    anchorMobileMenu.className = 'navigation-wrapper__mobilenavbar-menulink';
    // Mobile main menu links are not directly navigable in the authored HTML; they expand submenus.
    // They don't have href in the authored HTML example for the top-level mobile menu links.
    // So, we don't set href here, matching the authored mobile structure.
    const spanMobileLabel = document.createElement('span');
    spanMobileLabel.textContent = menu.label;
    anchorMobileMenu.append(spanMobileLabel);
    const iconMobile = document.createElement('span');
    iconMobile.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
    anchorMobileMenu.append(iconMobile);
    liMobileMenuOuter.append(anchorMobileMenu);

    if (menu.submenus.length > 0) {
      const ulMobileSubmenu = document.createElement('ul');
      ulMobileSubmenu.className = 'navigation-wrapper__mobilenavbar-submenu';

      const liMobileSubmenuHeader = document.createElement('li');
      liMobileSubmenuHeader.className = 'navigation-wrapper__mobilenavbar-menuheader';
      const anchorMobileSubmenuHeader = document.createElement('a');
      // Mobile submenu header does not have href in authored HTML
      const spanMobileSubmenuHeader = document.createElement('span');
      spanMobileSubmenuHeader.textContent = menu.label; // Mobile submenu header uses parent menu label
      anchorMobileSubmenuHeader.append(spanMobileSubmenuHeader);
      liMobileSubmenuHeader.append(anchorMobileSubmenuHeader);
      ulMobileSubmenu.append(liMobileSubmenuHeader);

      menu.submenus.forEach((submenu) => {
        const liMobileSub = document.createElement('li');
        liMobileSub.className = 'navigation-wrapper__mobilenavbar-menu';
        const anchorMobileSub = document.createElement('a');
        anchorMobileSub.href = submenu.link;
        anchorMobileSub.className = 'navigation-wrapper__mobilenavbar-menulink';
        anchorMobileSub.target = '_self';
        const spanMobileSubLabel = document.createElement('span');
        spanMobileSubLabel.textContent = submenu.label;
        anchorMobileSub.append(spanMobileSubLabel);
        liMobileSub.append(anchorMobileSub);
        ulMobileSubmenu.append(liMobileSub);
      });
      liMobileMenuOuter.append(ulMobileSubmenu);
    }
    ulMobile.append(liMobileMenuOuter);
  });
  navMobile.append(ulMobile);

  // Re-append cloned Mobile Nav Back button
  if (clonedElements.mobileBack) {
    moveInstrumentation(clonedElements.originalMobileBack, clonedElements.mobileBack);
    navMobile.append(clonedElements.mobileBack);
  }

  // Mobile Language Selector (duplicate as per authored HTML structure)
  const mobileLangSelectorWrapper = document.createElement('div');
  mobileLangSelectorWrapper.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLangSelectorWrapper.style.visibility = 'visible'; // As per authored HTML
  const ulMobileLang = document.createElement('ul');
  ulMobileLang.className = 'header-cmp-language-selector';

  headerData.languages.forEach((lang) => {
    const liLang = document.createElement('li');
    if (lang.isActive) liLang.classList.add('active');
    const anchorLang = document.createElement('a');
    anchorLang.href = lang.link;
    anchorLang.setAttribute('aria-label', lang.label);
    anchorLang.className = 'header-cmp-language-selector__link';
    anchorLang.setAttribute('data-lang', lang.link.split('/')[1] || 'en'); // Infer data-lang from href
    anchorLang.textContent = lang.label;
    liLang.append(anchorLang);
    ulMobileLang.append(liLang);
  });
  mobileLangSelectorWrapper.append(ulMobileLang);
  navMobile.append(mobileLangSelectorWrapper);

  navigationWrapper.append(navMobile);
}