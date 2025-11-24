import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The 'block' element itself is the top-level 'header-container' div.
  // We first extract all necessary data and non-modeled DOM structures from its current children.

  const headerData = {};
  // Store original elements for instrumentation transfer and cloning complex, non-modeled structures.
  const originalElements = {}; 

  // --- Data Extraction & Original Element Storage ---

  // Logo Link and Content
  const originalLogoAnchor = block.querySelector('.navigation-wrapper__logo > a');
  if (originalLogoAnchor) {
    headerData.logoLink = originalLogoAnchor.href;
    headerData.logoContent = originalLogoAnchor.innerHTML; // Preserve complex SVG-like span structure
    originalElements.logoAnchor = originalLogoAnchor;
  }

  // Contact Us Link and Label (from the first instance found, typically the mobile/top-level one)
  const originalContactUsCta = block.querySelector('.navigation-wrapper__contactUs-cta > a');
  if (originalContactUsCta) {
    headerData.contactUsLink = originalContactUsCta.href;
    headerData.contactUsLabel = originalContactUsCta.querySelector('.header-cta__label')?.textContent.trim() || '';
    originalElements.contactUsCta = originalContactUsCta;
  }

  // Hamburger icon (not explicitly modeled but present in HTML, clone to preserve structure)
  const originalHamburgerWrapper = block.querySelector('.navigation-wrapper__icon#navigation-toggle');
  if (originalHamburgerWrapper) {
    originalElements.hamburgerWrapper = originalHamburgerWrapper;
    // Clone to preserve entire structure, including inner spans
    originalElements.hamburgerCloned = originalHamburgerWrapper.cloneNode(true);
  }

  // Nav Menus (desktop structure is typically the most complete for data extraction)
  // This will be reused for 'mobileNavMenus' as per the authored HTML structure, as there are no distinct selectors for mobile.
  headerData.navMenus = [];
  block.querySelectorAll('.navigation-wrapper__navbar-list > li.navigation-wrapper__navbar-menu').forEach((menuLi, menuIndex) => {
    const menuAnchor = menuLi.querySelector('.navigation-wrapper__navbar-menulink');
    const menuLabelSpan = menuAnchor?.querySelector('span:not(.header-qd-icon-wrapper)'); // Exclude icon wrapper
    const menu = {
      label: menuLabelSpan?.textContent.trim() || '',
      link: menuAnchor?.href || '',
      submenus: [],
    };
    originalElements[`menuAnchor_${menuIndex}`] = menuAnchor;

    menuLi.querySelectorAll('.navigation-wrapper__navbar-submenu > li > a').forEach((submenuAnchor, subMenuIndex) => {
      menu.submenus.push({
        label: submenuAnchor.querySelector('span')?.textContent.trim() || '',
        link: submenuAnchor.href || '',
      });
      originalElements[`submenuAnchor_${menuIndex}_${subMenuIndex}`] = submenuAnchor;
    });
    headerData.navMenus.push(menu);
  });

  // Desktop Contact Us CTA (duplicate as per authored HTML structure, clone to preserve)
  const desktopCtaLink = block.querySelector('nav#navbar-desktop > a.header-cta');
  if (desktopCtaLink) {
    originalElements.desktopCtaLink = desktopCtaLink;
    originalElements.desktopCtaLinkCloned = desktopCtaLink.cloneNode(true);
  }

  // Languages
  headerData.languages = [];
  block.querySelectorAll('.header-cmp-language-selector > li > a').forEach((langAnchor, langIndex) => {
    headerData.languages.push({
      label: langAnchor.textContent.trim(),
      link: langAnchor.href,
      isActive: langAnchor.parentElement.classList.contains('active'),
    });
    originalElements[`langAnchor_${langIndex}`] = langAnchor;
  });

  // Mobile Nav Back button (not modeled, clone to preserve)
  const originalMobileBack = block.querySelector('.navigation-wrapper__mobilenavbar-back.nav-back');
  if (originalMobileBack) {
    originalElements.mobileBack = originalMobileBack;
    originalElements.mobileBackCloned = originalMobileBack.cloneNode(true);
  }


  // --- DOM Reconstruction ---

  // Clear the original block content, but keep the block element itself (header-container)
  // All new elements will be appended to this cleared block.
  block.textContent = '';

  // Recreate the direct children of the block (header-container)
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

  // Logo Section
  const logoWrapper = document.createElement('div');
  logoWrapper.className = 'navigation-wrapper__logo';
  if (headerData.logoLink) {
    const newLogoAnchor = document.createElement('a');
    newLogoAnchor.href = headerData.logoLink;
    newLogoAnchor.target = '_self';
    newLogoAnchor.innerHTML = headerData.logoContent; // Re-insert the original complex logo SVG-like structure
    // Instrumentation for the logo anchor itself
    if (originalElements.logoAnchor) { // Ensure original element exists before moving instrumentation
      moveInstrumentation(originalElements.logoAnchor, newLogoAnchor);
    }
    logoWrapper.append(newLogoAnchor);
  }
  navigationWrapper.append(logoWrapper);

  // Contact Us CTA and Hamburger (for smaller screens/top-right)
  const contactUsCtaWrapper = document.createElement('div');
  contactUsCtaWrapper.className = 'navigation-wrapper__contactUs-cta';

  if (headerData.contactUsLink && headerData.contactUsLabel && originalElements.contactUsCta) {
    const newContactUsCta = document.createElement('a');
    newContactUsCta.href = headerData.contactUsLink;
    newContactUsCta.className = originalElements.contactUsCta.className; // Copy all classes
    newContactUsCta.target = '_self';
    newContactUsCta.setAttribute('aria-label', originalElements.contactUsCta.getAttribute('aria-label') || headerData.contactUsLabel);

    const iconSpan = document.createElement('span');
    iconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
    iconSpan.setAttribute('aria-hidden', 'true');
    newContactUsCta.append(iconSpan);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'header-cta__label';
    labelSpan.textContent = headerData.contactUsLabel;
    newContactUsCta.append(labelSpan);

    moveInstrumentation(originalElements.contactUsCta, newContactUsCta); // Transfer instrumentation
    contactUsCtaWrapper.append(newContactUsCta);
  }

  // Re-append cloned Hamburger icon
  if (originalElements.hamburgerCloned) {
    // moveInstrumentation from the original wrapper to the cloned one.
    if (originalElements.hamburgerWrapper) { // Ensure original element exists before moving instrumentation
      moveInstrumentation(originalElements.hamburgerWrapper, originalElements.hamburgerCloned);
    }
    contactUsCtaWrapper.append(originalElements.hamburgerCloned);
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
    // Instrumentation for the menu anchor
    if (originalElements[`menuAnchor_${menuIndex}`]) { // Ensure original element exists
      moveInstrumentation(originalElements[`menuAnchor_${menuIndex}`], anchorMenu);
    }
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
        // Instrumentation for the submenu anchor
        if (originalElements[`submenuAnchor_${menuIndex}_${subMenuIndex}`]) { // Ensure original element exists
          moveInstrumentation(originalElements[`submenuAnchor_${menuIndex}_${subMenuIndex}`], anchorSubmenu);
        }
        liSubmenu.append(anchorSubmenu);
        ulSubmenu.append(liSubmenu);
      });
      liMenu.append(ulSubmenu);
    }
    ulDesktop.append(liMenu);
  });
  navDesktop.append(ulDesktop);

  // Re-append cloned Desktop Contact Us CTA
  if (originalElements.desktopCtaLinkCloned) {
    if (originalElements.desktopCtaLink) { // Ensure original element exists
      moveInstrumentation(originalElements.desktopCtaLink, originalElements.desktopCtaLinkCloned);
    }
    navDesktop.append(originalElements.desktopCtaLinkCloned);
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
    // Infer data-lang from href, assuming '/ar/' -> 'ar', '/' -> 'en'
    anchorLang.setAttribute('data-lang', lang.link.split('/')[1] || 'en');
    anchorLang.textContent = lang.label;
    // Instrumentation for the language anchor
    if (originalElements[`langAnchor_${langIndex}`]) { // Ensure original element exists
      moveInstrumentation(originalElements[`langAnchor_${langIndex}`], anchorLang);
    }
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

  // Re-use desktop nav data for mobile structure, as per authored HTML
  headerData.navMenus.forEach((menu) => {
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
  if (originalElements.mobileBackCloned) {
    if (originalElements.mobileBack) { // Ensure original element exists
      moveInstrumentation(originalElements.mobileBack, originalElements.mobileBackCloned);
    }
    navMobile.append(originalElements.mobileBackCloned);
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