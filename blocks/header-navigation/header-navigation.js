import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createLogo(logoLink) {
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('navigation-wrapper__logo');

  const logoAnchor = document.createElement('a');
  logoAnchor.href = logoLink || '/';
  logoAnchor.target = '_self';
  moveInstrumentation(logoLink, logoAnchor);

  const logoSpan = document.createElement('span');
  logoSpan.classList.add('header-qd-icon', 'header-qd-icon--logo', 'header-qd-logo');
  for (let i = 1; i <= 25; i += 1) {
    logoSpan.appendChild(document.createElement('span')).classList.add(`path${i}`);
  }
  logoAnchor.append(logoSpan);
  logoWrapper.append(logoAnchor);
  return logoWrapper;
}

function createContactUsCta(contactUsLink, contactUsLabel) {
  const contactUsCtaWrapper = document.createElement('div');
  contactUsCtaWrapper.classList.add('navigation-wrapper__contactUs-cta');

  const contactUsAnchor = document.createElement('a');
  contactUsAnchor.href = contactUsLink || '/contact/';
  contactUsAnchor.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
  contactUsAnchor.target = '_self';
  contactUsAnchor.setAttribute('aria-label', contactUsLabel || 'Contact Us');
  moveInstrumentation(contactUsLink, contactUsAnchor);
  moveInstrumentation(contactUsLabel, contactUsAnchor);

  const iconSpan = document.createElement('span');
  iconSpan.classList.add('header-cta__icon', 'header-qd-icon', 'header-qd-icon--cheveron-right');
  iconSpan.setAttribute('aria-hidden', 'true');
  contactUsAnchor.append(iconSpan);

  const labelSpan = document.createElement('span');
  labelSpan.classList.add('header-cta__label');
  labelSpan.textContent = contactUsLabel || 'Contact Us';
  contactUsAnchor.append(labelSpan);
  contactUsCtaWrapper.append(contactUsAnchor);

  const toggleIconWrapper = document.createElement('div');
  toggleIconWrapper.classList.add('navigation-wrapper__icon');
  toggleIconWrapper.id = 'navigation-toggle';
  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.classList.add('header-hamburger-ellipse');
  hamburgerEllipse.tabIndex = 0;
  hamburgerEllipse.innerHTML = `
    <span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span>
    <span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>
  `;
  toggleIconWrapper.append(hamburgerEllipse);
  contactUsCtaWrapper.append(toggleIconWrapper);

  return contactUsCtaWrapper;
}

function createNavMenu(menuData, isMobile = false) {
  const li = document.createElement('li');
  li.classList.add(`navigation-wrapper__${isMobile ? 'mobilenavbar' : 'navbar'}-menu`);
  if (isMobile) li.classList.add('border');

  const anchor = document.createElement('a');
  anchor.classList.add(`navigation-wrapper__${isMobile ? 'mobilenavbar' : 'navbar'}-menulink`);
  if (!isMobile) {
    anchor.setAttribute('aria-haspopup', 'true');
    anchor.setAttribute('aria-expanded', 'false');
    anchor.target = '_self';
    anchor.href = menuData.link || '#';
  }
  moveInstrumentation(menuData.link, anchor);

  const labelSpan = document.createElement('span');
  labelSpan.textContent = menuData.label;
  moveInstrumentation(menuData.label, labelSpan);
  anchor.append(labelSpan);

  const iconWrapper = document.createElement('span');
  iconWrapper.classList.add('header-qd-icon-wrapper');
  const iconSpan = document.createElement('span');
  iconSpan.classList.add(
    `header-${isMobile ? 'qd-icon' : 'menu-icon'}`, 
    `header-qd-icon--cheveron-${isMobile ? 'right' : 'down'}`
  );
  if (isMobile) iconSpan.classList.add('navigation-wrapper__mobilenavbar-menulink-icon');
  iconWrapper.append(iconSpan);
  anchor.append(iconWrapper);
  li.append(anchor);

  if (menuData.subMenus && menuData.subMenus.length > 0) {
    const submenuUl = document.createElement('ul');
    submenuUl.classList.add(`navigation-wrapper__${isMobile ? 'mobilenavbar' : 'navbar'}-submenu`);

    if (isMobile) {
      const headerLi = document.createElement('li');
      headerLi.classList.add('navigation-wrapper__mobilenavbar-menuheader');
      const headerAnchor = document.createElement('a');
      const headerSpan = document.createElement('span');
      headerSpan.textContent = menuData.label;
      headerAnchor.append(headerSpan);
      headerLi.append(headerAnchor);
      submenuUl.append(headerLi);
    }

    menuData.subMenus.forEach((subMenuItem) => {
      const subLi = document.createElement('li');
      subLi.classList.add(`navigation-wrapper__${isMobile ? 'mobilenavbar' : 'navbar'}-menu`);
      const subAnchor = document.createElement('a');
      if (!isMobile) {
        subAnchor.setAttribute('aria-expanded', 'false');
      }
      subAnchor.target = '_self';
      subAnchor.href = subMenuItem.link || '#';
      moveInstrumentation(subMenuItem.link, subAnchor);
      const subSpan = document.createElement('span');
      subSpan.textContent = subMenuItem.label;
      moveInstrumentation(subMenuItem.label, subSpan);
      subAnchor.append(subSpan);
      subLi.append(subAnchor);
      submenuUl.append(subLi);
    });
    li.append(submenuUl);
  }

  return li;
}

function createLanguageSelector(languages, isMobile = false) {
  const langSelectorDiv = document.createElement('div');
  langSelectorDiv.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  langSelectorDiv.style.visibility = 'visible';

  const langUl = document.createElement('ul');
  langUl.classList.add('header-cmp-language-selector');

  languages.forEach((lang, index) => {
    const langLi = document.createElement('li');
    if (index === 0) langLi.classList.add('active'); // Assuming first language is active
    const langAnchor = document.createElement('a');
    langAnchor.href = lang.link || '#';
    langAnchor.setAttribute('aria-label', lang.label);
    langAnchor.classList.add('header-cmp-language-selector__link');
    langAnchor.setAttribute('data-lang', lang.label.substring(0, 2).toLowerCase()); // Simple data-lang creation
    langAnchor.textContent = lang.label;
    moveInstrumentation(lang.link, langAnchor);
    moveInstrumentation(lang.label, langAnchor);
    langLi.append(langAnchor);
    langUl.append(langLi);
  });
  langSelectorDiv.append(langUl);
  return langSelectorDiv;
}

export default async function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'container-e9226c8e5e'; // Hardcoded ID from HTML
  rootDiv.classList.add('header-container');

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper', 'layout-container', 'transparent-header');

  const headerNavigation = document.createElement('div');
  headerNavigation.classList.add('header-navigation');

  const navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('navigation-wrapper');
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');

  // Extracting data based on Block JSON models
  const headerNavigationModel = {};
  const navMenus = [];
  const languages = [];

  Array.from(block.children).forEach((row) => {
    if (row.children.length > 1) {
      const fieldName = row.children[0].textContent.trim();
      const fieldValueElement = row.children[1];

      switch (fieldName) {
        case 'Logo Link':
          headerNavigationModel.logoLink = fieldValueElement.querySelector('a')?.href || '';
          moveInstrumentation(fieldValueElement, headerNavigationModel.logoLink);
          break;
        case 'Contact Us Link':
          headerNavigationModel.contactUsLink = fieldValueElement.querySelector('a')?.href || '';
          moveInstrumentation(fieldValueElement, headerNavigationModel.contactUsLink);
          break;
        case 'Contact Us Label':
          headerNavigationModel.contactUsLabel = fieldValueElement.textContent.trim();
          moveInstrumentation(fieldValueElement, headerNavigationModel.contactUsLabel);
          break;
        case 'Navigation Menus':
          Array.from(fieldValueElement.children).forEach((menuRow) => {
            if (menuRow.children.length > 1) {
              const menuLabel = menuRow.children[0].textContent.trim();
              const menuLink = menuRow.children[1].querySelector('a')?.href || '';
              const subMenus = [];
              if (menuRow.children.length > 2) {
                Array.from(menuRow.children[2].children).forEach((subMenuRow) => {
                  if (subMenuRow.children.length > 1) {
                    subMenus.push({
                      label: subMenuRow.children[0].textContent.trim(),
                      link: subMenuRow.children[1].querySelector('a')?.href || '',
                    });
                    moveInstrumentation(subMenuRow.children[0], subMenus[subMenus.length - 1].label);
                    moveInstrumentation(subMenuRow.children[1], subMenus[subMenus.length - 1].link);
                  }
                });
              }
              navMenus.push({
                label: menuLabel,
                link: menuLink,
                subMenus,
              });
              moveInstrumentation(menuRow.children[0], navMenus[navMenus.length - 1].label);
              moveInstrumentation(menuRow.children[1], navMenus[navMenus.length - 1].link);
            }
          });
          break;
        case 'Languages':
          Array.from(fieldValueElement.children).forEach((langRow) => {
            if (langRow.children.length > 1) {
              languages.push({
                label: langRow.children[0].textContent.trim(),
                link: langRow.children[1].querySelector('a')?.href || '',
              });
              moveInstrumentation(langRow.children[0], languages[languages.length - 1].label);
              moveInstrumentation(langRow.children[1], languages[languages.length - 1].link);
            }
          });
          break;
        default:
          break;
      }
    }
  });

  // Build the DOM structure
  const logoDiv = createLogo(headerNavigationModel.logoLink);
  navigationWrapper.append(logoDiv);

  const contactUsCtaDiv = createContactUsCta(headerNavigationModel.contactUsLink, headerNavigationModel.contactUsLabel);
  logoDiv.append(contactUsCtaDiv); // Appended to logoDiv to match HTML structure

  // Desktop Navigation
  const desktopNavbar = document.createElement('nav');
  desktopNavbar.classList.add('navigation-wrapper__navbar');
  desktopNavbar.id = 'navbar-desktop';
  desktopNavbar.setAttribute('role', 'navigation');
  desktopNavbar.setAttribute('aria-label', 'navigation.main.aria.label');

  const desktopNavList = document.createElement('ul');
  desktopNavList.classList.add('navigation-wrapper__navbar-list');
  navMenus.forEach((menu) => desktopNavList.append(createNavMenu(menu)));
  desktopNavbar.append(desktopNavList);

  const desktopContactUsCta = document.createElement('a');
  desktopContactUsCta.href = headerNavigationModel.contactUsLink || '/contact/';
  desktopContactUsCta.classList.add('header-cta', 'header-cta__', 'navigation--content__cta');
  desktopContactUsCta.target = '_self';
  desktopContactUsCta.setAttribute('aria-label', '${navigation.contactUsAriaLabel}'); // Hardcoded from HTML
  desktopContactUsCta.innerHTML = `
    <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
    <span class="header-cta__label">${headerNavigationModel.contactUsLabel || 'Contact Us'}</span>
  `;
  desktopNavbar.append(desktopContactUsCta);

  const desktopLangSelector = createLanguageSelector(languages);
  desktopNavbar.append(desktopLangSelector);
  navigationWrapper.append(desktopNavbar);

  // Mobile Navigation
  const mobileNavbar = document.createElement('nav');
  mobileNavbar.classList.add('navigation-wrapper__mobilenavbar');
  mobileNavbar.id = 'navbar-mobile';
  mobileNavbar.setAttribute('role', 'navigation');
  mobileNavbar.setAttribute('aria-label', 'navigation.main.aria.label');

  const mobileNavList = document.createElement('ul');
  mobileNavList.classList.add('navigation-wrapper__mobilenavbar-list');
  navMenus.forEach((menu) => mobileNavList.append(createNavMenu(menu, true)));
  mobileNavbar.append(mobileNavList);

  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('navigation-wrapper__mobilenavbar-back', 'nav-back');
  mobileNavBack.innerHTML = `
    <a class="navigation-wrapper__icon">
      <span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span>
    </a>
    <span class="navigation-wrapper__iconlabel">Back</span>
  `;
  mobileNavbar.append(mobileNavBack);

  const mobileLangSelector = createLanguageSelector(languages, true);
  mobileNavbar.append(mobileLangSelector);
  navigationWrapper.append(mobileNavbar);

  headerNavigation.append(navigationWrapper);
  headerWrapper.append(headerNavigation);
  rootDiv.append(headerWrapper);

  block.textContent = '';
  block.append(rootDiv);
}
