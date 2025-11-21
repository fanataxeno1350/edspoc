import { moveInstrumentation } from '../../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.id = 'container-e9226c8e5e';
  headerContainer.className = 'header-container';
  moveInstrumentation(block, headerContainer);

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

  const navigationLogo = document.createElement('div');
  navigationLogo.className = 'navigation-wrapper__logo';
  navigationWrapper.append(navigationLogo);

  // Logo Link
  const logoLinkRow = block.children[0];
  const logoLinkCell = logoLinkRow.children[1];
  const logoLink = logoLinkCell.querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = '_self';
    moveInstrumentation(logoLink, newLogoLink);

    const logoSpan = document.createElement('span');
    logoSpan.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
    // Assuming the paths are static, as they are not in the JSON model
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.className = `path${i}`;
      logoSpan.append(pathSpan);
    }
    newLogoLink.append(logoSpan);
    navigationLogo.append(newLogoLink);
  }

  const contactUsCta = document.createElement('div');
  contactUsCta.className = 'navigation-wrapper__contactUs-cta';
  navigationLogo.append(contactUsCta);

  // Contact Us CTA
  const contactUsLabelRow = block.children[1];
  const contactUsLabelCell = contactUsLabelRow.children[1];
  const contactUsLinkRow = block.children[2];
  const contactUsLinkCell = contactUsLinkRow.children[1];

  const contactUsAnchor = document.createElement('a');
  contactUsAnchor.href = contactUsLinkCell.textContent.trim();
  contactUsAnchor.className = 'header-cta header-cta__ navigation--content__cta';
  contactUsAnchor.target = '_self';
  contactUsAnchor.setAttribute('aria-label', contactUsLabelCell.textContent.trim());
  moveInstrumentation(contactUsLabelCell, contactUsAnchor);
  moveInstrumentation(contactUsLinkCell, contactUsAnchor);

  const ctaIcon = document.createElement('span');
  ctaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  ctaIcon.setAttribute('aria-hidden', 'true');
  contactUsAnchor.append(ctaIcon);

  const ctaLabel = document.createElement('span');
  ctaLabel.className = 'header-cta__label';
  ctaLabel.textContent = contactUsLabelCell.textContent.trim();
  contactUsAnchor.append(ctaLabel);
  contactUsCta.append(contactUsAnchor);

  const navToggle = document.createElement('div');
  navToggle.className = 'navigation-wrapper__icon';
  navToggle.id = 'navigation-toggle';
  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.className = 'header-hamburger-ellipse';
  hamburgerEllipse.setAttribute('tabindex', '0');
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.className = 'header-hamburger-icon header-qd-icon header-qd-icon--hamburger';
  const closeIcon = document.createElement('span');
  closeIcon.className = 'header-close-icon header-qd-icon header-qd-icon--cancel';
  hamburgerEllipse.append(hamburgerIcon, closeIcon);
  navToggle.append(hamburgerEllipse);
  contactUsCta.append(navToggle);

  // Desktop Navigation
  const navbarDesktop = document.createElement('nav');
  navbarDesktop.className = 'navigation-wrapper__navbar';
  navbarDesktop.id = 'navbar-desktop';
  navbarDesktop.setAttribute('role', 'navigation');
  navbarDesktop.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarDesktop);

  const navbarListDesktop = document.createElement('ul');
  navbarListDesktop.className = 'navigation-wrapper__navbar-list';
  navbarDesktop.append(navbarListDesktop);

  // Menus (Desktop)
  const menusContainer = block.querySelector(':scope > div:nth-child(4) > div:nth-child(2)');
  if (menusContainer) {
    [...menusContainer.children].forEach((menuRow) => {
      const menuLabelCell = menuRow.children[0];
      const menuLinkCell = menuRow.children[1];

      const li = document.createElement('li');
      li.className = 'navigation-wrapper__navbar-menu';
      moveInstrumentation(menuRow, li);

      const menuLink = document.createElement('a');
      menuLink.href = menuLinkCell.textContent.trim();
      menuLink.className = 'navigation-wrapper__navbar-menulink';
      menuLink.target = '_self';
      menuLink.setAttribute('aria-haspopup', 'true');
      menuLink.setAttribute('aria-expanded', 'false');
      moveInstrumentation(menuLabelCell, menuLink);
      moveInstrumentation(menuLinkCell, menuLink);

      const spanLabel = document.createElement('span');
      spanLabel.textContent = menuLabelCell.textContent.trim();
      menuLink.append(spanLabel);

      const iconWrapper = document.createElement('span');
      iconWrapper.className = 'header-qd-icon-wrapper';
      const menuIcon = document.createElement('span');
      menuIcon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
      iconWrapper.append(menuIcon);
      menuLink.append(iconWrapper);
      li.append(menuLink);

      // Submenus (Desktop)
      const submenuItemsContainer = block.querySelector(':scope > div:nth-child(5) > div:nth-child(2)');
      if (submenuItemsContainer) {
        const submenuUl = document.createElement('ul');
        submenuUl.className = 'navigation-wrapper__navbar-submenu';

        // Find submenu items related to the current menu
        const menuLabelText = menuLabelCell.textContent.trim().toLowerCase();
        [...submenuItemsContainer.children].forEach((submenuRow) => {
          const submenuLabelCell = submenuRow.children[0];
          const submenuLinkCell = submenuRow.children[1];

          // Simple heuristic: check if submenu link starts with menu link or if label is related
          // This part might need refinement based on actual content structure
          const submenuLinkText = submenuLinkCell.textContent.trim().toLowerCase();
          const submenuLabelText = submenuLabelCell.textContent.trim().toLowerCase();
          const menuHref = menuLinkCell.textContent.trim().toLowerCase();

          if (submenuLinkText.startsWith(menuHref) || submenuLabelText.includes(menuLabelText)) {
            const submenuLi = document.createElement('li');
            moveInstrumentation(submenuRow, submenuLi);

            const submenuAnchor = document.createElement('a');
            submenuAnchor.href = submenuLinkCell.textContent.trim();
            submenuAnchor.target = '_self';
            submenuAnchor.setAttribute('aria-expanded', 'false');
            moveInstrumentation(submenuLabelCell, submenuAnchor);
            moveInstrumentation(submenuLinkCell, submenuAnchor);

            const submenuSpan = document.createElement('span');
            submenuSpan.textContent = submenuLabelCell.textContent.trim();
            submenuAnchor.append(submenuSpan);
            submenuLi.append(submenuAnchor);
            submenuUl.append(submenuLi);
          }
        });

        if (submenuUl.children.length > 0) {
          li.append(submenuUl);
        }
      }
      navbarListDesktop.append(li);
    });
  }

  // Contact Us CTA (Desktop - duplicated from mobile for now)
  const desktopContactUsAnchor = document.createElement('a');
  desktopContactUsAnchor.href = contactUsLinkCell.textContent.trim();
  desktopContactUsAnchor.className = 'header-cta header-cta__ navigation--content__cta';
  desktopContactUsAnchor.target = '_self';
  desktopContactUsAnchor.setAttribute('aria-label', '${navigation.contactUsAriaLabel}'); // Using placeholder as in HTML
  moveInstrumentation(contactUsLabelCell, desktopContactUsAnchor); // Re-use instrumentation from original cells
  moveInstrumentation(contactUsLinkCell, desktopContactUsAnchor);

  const desktopCtaIcon = document.createElement('span');
  desktopCtaIcon.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  desktopCtaIcon.setAttribute('aria-hidden', 'true');
  desktopContactUsAnchor.append(desktopCtaIcon);

  const desktopCtaLabel = document.createElement('span');
  desktopCtaLabel.className = 'header-cta__label';
  desktopCtaLabel.textContent = contactUsLabelCell.textContent.trim();
  desktopContactUsAnchor.append(desktopCtaLabel);
  navbarDesktop.append(desktopContactUsAnchor);

  // Language Selector (Desktop)
  const desktopLanguageSelector = document.createElement('div');
  desktopLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  desktopLanguageSelector.style.visibility = 'visible';
  navbarDesktop.append(desktopLanguageSelector);

  const desktopLangUl = document.createElement('ul');
  desktopLangUl.className = 'header-cmp-language-selector';
  desktopLanguageSelector.append(desktopLangUl);

  const languagesContainer = block.querySelector(':scope > div:nth-child(6) > div:nth-child(2)');
  if (languagesContainer) {
    [...languagesContainer.children].forEach((langRow, index) => {
      const langLabelCell = langRow.children[0];
      const langLinkCell = langRow.children[1];

      const li = document.createElement('li');
      if (index === 0) {
        li.className = 'active'; // First language is active by default
      }
      moveInstrumentation(langRow, li);

      const langAnchor = document.createElement('a');
      langAnchor.href = langLinkCell.textContent.trim();
      langAnchor.setAttribute('aria-label', langLabelCell.textContent.trim());
      langAnchor.className = 'header-cmp-language-selector__link';
      langAnchor.setAttribute('data-lang', langLinkCell.textContent.trim().split('/').filter(Boolean).pop() || 'en'); // Extract lang from link or default to 'en'
      langAnchor.textContent = langLabelCell.textContent.trim();
      moveInstrumentation(langLabelCell, langAnchor);
      moveInstrumentation(langLinkCell, langAnchor);
      li.append(langAnchor);
      desktopLangUl.append(li);
    });
  }

  // Mobile Navigation (structure is similar but distinct classes)
  const navbarMobile = document.createElement('nav');
  navbarMobile.className = 'navigation-wrapper__mobilenavbar';
  navbarMobile.id = 'navbar-mobile';
  navbarMobile.setAttribute('role', 'navigation');
  navbarMobile.setAttribute('aria-label', 'navigation.main.aria.label');
  navigationWrapper.append(navbarMobile);

  const navbarListMobile = document.createElement('ul');
  navbarListMobile.className = 'navigation-wrapper__mobilenavbar-list';
  navbarMobile.append(navbarListMobile);

  // Menus (Mobile)
  if (menusContainer) {
    [...menusContainer.children].forEach((menuRow) => {
      const menuLabelCell = menuRow.children[0];
      const menuLinkCell = menuRow.children[1];

      const li = document.createElement('li');
      li.className = 'navigation-wrapper__mobilenavbar-menu border';
      moveInstrumentation(menuRow, li);

      const menuLink = document.createElement('a');
      menuLink.className = 'navigation-wrapper__mobilenavbar-menulink';
      moveInstrumentation(menuLabelCell, menuLink);
      moveInstrumentation(menuLinkCell, menuLink);

      const spanLabel = document.createElement('span');
      spanLabel.textContent = menuLabelCell.textContent.trim();
      menuLink.append(spanLabel);

      const icon = document.createElement('span');
      icon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
      menuLink.append(icon);
      li.append(menuLink);

      // Submenus (Mobile)
      const submenuItemsContainer = block.querySelector(':scope > div:nth-child(5) > div:nth-child(2)');
      if (submenuItemsContainer) {
        const submenuUl = document.createElement('ul');
        submenuUl.className = 'navigation-wrapper__mobilenavbar-submenu';

        const submenuHeaderLi = document.createElement('li');
        submenuHeaderLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
        const submenuHeaderAnchor = document.createElement('a');
        const submenuHeaderSpan = document.createElement('span');
        submenuHeaderSpan.textContent = menuLabelCell.textContent.trim();
        submenuHeaderAnchor.append(submenuHeaderSpan);
        submenuHeaderLi.append(submenuHeaderAnchor);
        submenuUl.append(submenuHeaderLi);

        const menuLabelText = menuLabelCell.textContent.trim().toLowerCase();
        [...submenuItemsContainer.children].forEach((submenuRow) => {
          const submenuLabelCell = submenuRow.children[0];
          const submenuLinkCell = submenuRow.children[1];

          const submenuLinkText = submenuLinkCell.textContent.trim().toLowerCase();
          const submenuLabelText = submenuLabelCell.textContent.trim().toLowerCase();
          const menuHref = menuLinkCell.textContent.trim().toLowerCase();

          if (submenuLinkText.startsWith(menuHref) || submenuLabelText.includes(menuLabelText)) {
            const submenuLi = document.createElement('li');
            submenuLi.className = 'navigation-wrapper__mobilenavbar-menu';
            moveInstrumentation(submenuRow, submenuLi);

            const submenuAnchor = document.createElement('a');
            submenuAnchor.className = 'navigation-wrapper__mobilenavbar-menulink';
            submenuAnchor.href = submenuLinkCell.textContent.trim();
            submenuAnchor.target = '_self';
            moveInstrumentation(submenuLabelCell, submenuAnchor);
            moveInstrumentation(submenuLinkCell, submenuAnchor);

            const submenuSpan = document.createElement('span');
            submenuSpan.textContent = submenuLabelCell.textContent.trim();
            submenuAnchor.append(submenuSpan);
            submenuLi.append(submenuAnchor);
            submenuUl.append(submenuLi);
          }
        });

        if (submenuUl.children.length > 1) { // >1 because of the header item
          li.append(submenuUl);
        }
      }
      navbarListMobile.append(li);
    });
  }

  // Mobile Back button
  const mobileNavBack = document.createElement('div');
  mobileNavBack.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  const backAnchor = document.createElement('a');
  backAnchor.className = 'navigation-wrapper__icon';
  const backIcon = document.createElement('span');
  backIcon.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  backAnchor.append(backIcon);
  const backLabel = document.createElement('span');
  backLabel.className = 'navigation-wrapper__iconlabel';
  backLabel.textContent = 'Back';
  mobileNavBack.append(backAnchor, backLabel);
  navbarMobile.append(mobileNavBack);

  // Language Selector (Mobile)
  const mobileLanguageSelector = document.createElement('div');
  mobileLanguageSelector.className = 'header-language-selector header-lang-css-from-wrapper';
  mobileLanguageSelector.style.visibility = 'visible';
  navbarMobile.append(mobileLanguageSelector);

  const mobileLangUl = document.createElement('ul');
  mobileLangUl.className = 'header-cmp-language-selector';
  mobileLanguageSelector.append(mobileLangUl);

  if (languagesContainer) {
    [...languagesContainer.children].forEach((langRow, index) => {
      const langLabelCell = langRow.children[0];
      const langLinkCell = langRow.children[1];

      const li = document.createElement('li');
      if (index === 0) {
        li.className = 'active'; // First language is active by default
      }
      moveInstrumentation(langRow, li);

      const langAnchor = document.createElement('a');
      langAnchor.href = langLinkCell.textContent.trim();
      langAnchor.setAttribute('aria-label', langLabelCell.textContent.trim());
      langAnchor.className = 'header-cmp-language-selector__link';
      langAnchor.setAttribute('data-lang', langLinkCell.textContent.trim().split('/').filter(Boolean).pop() || 'en');
      langAnchor.textContent = langLabelCell.textContent.trim();
      moveInstrumentation(langLabelCell, langAnchor);
      moveInstrumentation(langLinkCell, langAnchor);
      li.append(langAnchor);
      mobileLangUl.append(li);
    });
  }

  block.textContent = '';
  block.append(headerContainer);
}
