import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.id = 'container-e9226c8e5e';
  headerContainer.classList.add('header-container');
  moveInstrumentation(block, headerContainer);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper', 'layout-container', 'transparent-header');

  const headerNavigation = document.createElement('div');
  headerNavigation.classList.add('header-navigation');

  const headerNavigationWrapper = document.createElement('div');
  headerNavigationWrapper.classList.add('header-navigation-wrapper');
  headerNavigationWrapper.setAttribute('role', 'banner');
  headerNavigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-navigation-wrapper__logo');

  const logoLink = document.createElement('a');
  logoLink.target = '_self';

  const logoSpan = document.createElement('span');
  logoSpan.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
  for (let i = 1; i <= 25; i += 1) {
    const pathSpan = document.createElement('span');
    pathSpan.classList.add(`path${i}`);
    logoSpan.append(pathSpan);
  }
  logoLink.append(logoSpan);
  logoDiv.append(logoLink);

  const contactUsCtaDiv = document.createElement('div');
  contactUsCtaDiv.classList.add('header-navigation-wrapper__contactUs-cta');

  const contactUsLink = document.createElement('a');
  contactUsLink.classList.add('header-cta', 'header-cta__', 'header-navigation--content__cta');
  contactUsLink.target = '_self';

  const contactUsIcon = document.createElement('span');
  contactUsIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  contactUsIcon.setAttribute('aria-hidden', 'true');
  contactUsLink.append(contactUsIcon);

  const contactUsLabel = document.createElement('span');
  contactUsLabel.classList.add('header-cta__label');
  contactUsLink.append(contactUsLabel);
  contactUsCtaDiv.append(contactUsLink);

  const navigationToggleDiv = document.createElement('div');
  navigationToggleDiv.classList.add('header-navigation-wrapper__icon');
  navigationToggleDiv.id = 'navigation-toggle';

  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.classList.add('header-hamburger-ellipse');
  hamburgerEllipse.setAttribute('tabindex', '0');

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('header-hamburger-icon', 'header-qd-icon', 'header-qd-icon--hamburger');
  hamburgerEllipse.append(hamburgerIcon);

  const closeIcon = document.createElement('span');
  closeIcon.classList.add('header-close-icon', 'header-qd-icon', 'header-qd-icon--cancel');
  hamburgerEllipse.append(closeIcon);
  navigationToggleDiv.append(hamburgerEllipse);
  contactUsCtaDiv.append(navigationToggleDiv);
  logoDiv.append(contactUsCtaDiv);
  headerNavigationWrapper.append(logoDiv);

  const desktopNavbar = document.createElement('nav');
  desktopNavbar.classList.add('header-navigation-wrapper__navbar');
  desktopNavbar.id = 'navbar-desktop';
  desktopNavbar.setAttribute('role', 'navigation');
  desktopNavbar.setAttribute('aria-label', 'navigation.main.aria.label');

  const desktopNavbarList = document.createElement('ul');
  desktopNavbarList.classList.add('header-navigation-wrapper__navbar-list');
  desktopNavbar.append(desktopNavbarList);

  const mobileNavbar = document.createElement('nav');
  mobileNavbar.classList.add('header-navigation-wrapper__mobilenavbar');
  mobileNavbar.id = 'navbar-mobile';
  mobileNavbar.setAttribute('role', 'navigation');
  mobileNavbar.setAttribute('aria-label', 'navigation.main.aria.label');

  const mobileNavbarList = document.createElement('ul');
  mobileNavbarList.classList.add('header-navigation-wrapper__mobilenavbar-list');
  mobileNavbar.append(mobileNavbarList);

  const mobileNavBackDiv = document.createElement('div');
  mobileNavBackDiv.classList.add('header-navigation-wrapper__mobilenavbar-back', 'header-nav-back');

  const mobileBackIconLink = document.createElement('a');
  mobileBackIconLink.classList.add('header-navigation-wrapper__icon');

  const mobileBackIcon = document.createElement('span');
  mobileBackIcon.classList.add('header-back-icon', 'header-qd-icon', 'header-qd-icon--cheveron-left');
  mobileBackIconLink.append(mobileBackIcon);
  mobileNavBackDiv.append(mobileBackIconLink);

  const mobileBackLabel = document.createElement('span');
  mobileBackLabel.classList.add('header-navigation-wrapper__iconlabel');
  mobileBackLabel.textContent = 'Back';
  mobileNavBackDiv.append(mobileBackLabel);
  mobileNavbar.append(mobileNavBackDiv);

  const languageSelectorDesktop = document.createElement('div');
  languageSelectorDesktop.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  languageSelectorDesktop.style.visibility = 'visible';
  const languageSelectorListDesktop = document.createElement('ul');
  languageSelectorListDesktop.classList.add('header-language-selector-list');
  languageSelectorDesktop.append(languageSelectorListDesktop);

  const languageSelectorMobile = languageSelectorDesktop.cloneNode(true);
  mobileNavbar.append(languageSelectorMobile);

  [...block.children].forEach((row) => {
    const rowType = row.children[0].textContent.trim();
    if (rowType === 'headerNavigation') {
      const logoLinkCell = row.children[1];
      const contactUsLabelCell = row.children[2];
      const contactUsUrlCell = row.children[3];

      const logoLinkHref = logoLinkCell.querySelector('a')?.href || '/';
      logoLink.href = logoLinkHref;

      const contactUsLabelText = contactUsLabelCell.textContent.trim();
      contactUsLabel.textContent = contactUsLabelText;

      const contactUsLinkHref = contactUsUrlCell.querySelector('a')?.href || '/contact/';
      contactUsLink.href = contactUsLinkHref;
      contactUsLink.setAttribute('aria-label', contactUsLabelText);
    } else if (rowType === 'menuItem') {
      const labelCell = row.children[1];
      const urlCell = row.children[2];
      const hasSubmenuCell = row.children[3];
      const submenuCell = row.children[4];

      const label = labelCell.textContent.trim();
      const url = urlCell.querySelector('a')?.href || '#';
      const hasSubmenu = hasSubmenuCell.textContent.includes('true');

      // Desktop Menu Item
      const desktopMenuItem = document.createElement('li');
      desktopMenuItem.classList.add('header-navigation-wrapper__navbar-menu');
      moveInstrumentation(row, desktopMenuItem);

      const desktopMenuLink = document.createElement('a');
      desktopMenuLink.classList.add('header-navigation-wrapper__navbar-menulink');
      desktopMenuLink.target = '_self';
      desktopMenuLink.href = url;
      desktopMenuLink.innerHTML = `<span>${label}</span>`;

      if (hasSubmenu) {
        desktopMenuLink.setAttribute('aria-haspopup', 'true');
        desktopMenuLink.setAttribute('aria-expanded', 'false');
        const iconWrapper = document.createElement('span');
        iconWrapper.classList.add('header-qd-icon-wrapper');
        const icon = document.createElement('span');
        icon.classList.add('header-menu-icon', 'header-qd-icon', 'header-qd-icon--cheveron-down');
        iconWrapper.append(icon);
        desktopMenuLink.append(iconWrapper);

        const submenuUl = document.createElement('ul');
        submenuUl.classList.add('header-navigation-wrapper__navbar-submenu');
        const submenuContent = submenuCell.innerHTML;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = submenuContent;
        [...tempDiv.children].forEach((subRow) => {
          const subLi = document.createElement('li');
          const subLink = subRow.querySelector('a');
          if (subLink) {
            const newSubLink = document.createElement('a');
            newSubLink.href = subLink.href;
            newSubLink.target = '_self';
            newSubLink.setAttribute('aria-expanded', 'false');
            newSubLink.innerHTML = `<span>${subLink.textContent.trim()}</span>`;
            subLi.append(newSubLink);
          }
          submenuUl.append(subLi);
        });
        desktopMenuItem.append(submenuUl);
      }
      desktopMenuItem.prepend(desktopMenuLink);
      desktopNavbarList.append(desktopMenuItem);

      // Mobile Menu Item
      const mobileMenuItem = document.createElement('li');
      mobileMenuItem.classList.add('header-navigation-wrapper__mobilenavbar-menu', 'border');
      moveInstrumentation(row, mobileMenuItem);

      const mobileMenuLink = document.createElement('a');
      mobileMenuLink.classList.add('header-navigation-wrapper__mobilenavbar-menulink');
      mobileMenuLink.innerHTML = `<span>${label}</span>`;

      if (hasSubmenu) {
        const icon = document.createElement('span');
        icon.classList.add('header-qd-icon', 'header-qd-icon--cheveron-right', 'header-navigation-wrapper__mobilenavbar-menulink-icon');
        mobileMenuLink.append(icon);

        const mobileSubmenuUl = document.createElement('ul');
        mobileSubmenuUl.classList.add('header-navigation-wrapper__mobilenavbar-submenu');

        const mobileSubmenuHeader = document.createElement('li');
        mobileSubmenuHeader.classList.add('header-navigation-wrapper__mobilenavbar-menuheader');
        const mobileSubmenuHeaderLink = document.createElement('a');
        mobileSubmenuHeaderLink.innerHTML = `<span>${label}</span>`;
        mobileSubmenuHeader.append(mobileSubmenuHeaderLink);
        mobileSubmenuUl.append(mobileSubmenuHeader);

        const submenuContent = submenuCell.innerHTML;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = submenuContent;
        [...tempDiv.children].forEach((subRow) => {
          const subLi = document.createElement('li');
          subLi.classList.add('header-navigation-wrapper__mobilenavbar-menu');
          const subLink = subRow.querySelector('a');
          if (subLink) {
            const newSubLink = document.createElement('a');
            newSubLink.href = subLink.href;
            newSubLink.target = '_self';
            newSubLink.classList.add('header-navigation-wrapper__mobilenavbar-menulink');
            newSubLink.innerHTML = `<span>${subLink.textContent.trim()}</span>`;
            subLi.append(newSubLink);
          }
          mobileSubmenuUl.append(subLi);
        });
        mobileMenuItem.append(mobileSubmenuUl);
      } else {
        mobileMenuLink.href = url;
        mobileMenuLink.target = '_self';
      }
      mobileMenuItem.prepend(mobileMenuLink);
      mobileNavbarList.append(mobileMenuItem);
    } else if (rowType === 'languageOption') {
      const labelCell = row.children[1];
      const urlCell = row.children[2];
      const langCodeCell = row.children[3];

      const label = labelCell.textContent.trim();
      const url = urlCell.querySelector('a')?.href || '#';
      const langCode = langCodeCell.textContent.trim();

      // Desktop Language Option
      const desktopLangLi = document.createElement('li');
      moveInstrumentation(row, desktopLangLi);
      if (langCode === 'en') {
        desktopLangLi.classList.add('active');
      }
      const desktopLangLink = document.createElement('a');
      desktopLangLink.href = url;
      desktopLangLink.setAttribute('aria-label', label);
      desktopLangLink.classList.add('header-language-selector__link');
      desktopLangLink.setAttribute('data-lang', langCode);
      desktopLangLink.textContent = label;
      desktopLangLi.append(desktopLangLink);
      languageSelectorListDesktop.append(desktopLangLi);

      // Mobile Language Option
      const mobileLangLi = desktopLangLi.cloneNode(true);
      languageSelectorMobile.querySelector('.header-language-selector-list').append(mobileLangLi);
    }
  });

  const desktopContactUsCta = document.createElement('a');
  desktopContactUsCta.classList.add('header-cta', 'header-cta__', 'header-navigation--content__cta');
  desktopContactUsCta.target = '_self';
  desktopContactUsCta.href = contactUsLink.href;
  desktopContactUsCta.setAttribute('aria-label', contactUsLabel.textContent);

  const desktopContactUsIcon = document.createElement('span');
  desktopContactUsIcon.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  desktopContactUsIcon.setAttribute('aria-hidden', 'true');
  desktopContactUsCta.append(desktopContactUsIcon);

  const desktopContactUsLabel = document.createElement('span');
  desktopContactUsLabel.classList.add('header-cta__label');
  desktopContactUsLabel.textContent = contactUsLabel.textContent;
  desktopContactUsCta.append(desktopContactUsLabel);
  desktopNavbar.append(desktopContactUsCta);
  desktopNavbar.append(languageSelectorDesktop);

  headerNavigationWrapper.append(desktopNavbar);
  headerNavigationWrapper.append(mobileNavbar);
  headerNavigation.append(headerNavigationWrapper);
  headerWrapper.append(headerNavigation);
  headerContainer.append(headerWrapper);

  block.textContent = '';
  block.append(headerContainer);
}
