import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createLogo(logoUrl, logoLink, originalLogoElement) {
  const logoAnchor = document.createElement('a');
  logoAnchor.href = logoLink || '/';
  logoAnchor.target = '_self';

  const logoSpan = document.createElement('span');
  logoSpan.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
  // Replicate the original span structure for the logo icon
  for (let i = 1; i <= 25; i += 1) {
    logoSpan.appendChild(document.createElement('span')).className = `path${i}`;
  }
  logoAnchor.append(logoSpan);
  moveInstrumentation(originalLogoElement, logoAnchor);
  return logoAnchor;
}

function createContactUsCta(contactUsLabel, contactUsUrl, originalCtaElement) {
  const ctaAnchor = document.createElement('a');
  ctaAnchor.href = contactUsUrl || '/contact/';
  ctaAnchor.className = 'header-cta header-cta__ navigation--content__cta';
  ctaAnchor.target = '_self';
  ctaAnchor.setAttribute('aria-label', contactUsLabel || 'Contact Us');

  const iconSpan = document.createElement('span');
  iconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  iconSpan.setAttribute('aria-hidden', 'true');
  ctaAnchor.append(iconSpan);

  const labelSpan = document.createElement('span');
  labelSpan.className = 'header-cta__label';
  labelSpan.textContent = contactUsLabel || 'Contact Us';
  ctaAnchor.append(labelSpan);

  moveInstrumentation(originalCtaElement, ctaAnchor);
  return ctaAnchor;
}

function createMenu(menuItem, isMobile = false) {
  const li = document.createElement('li');
  li.className = isMobile ? 'navigation-wrapper__mobilenavbar-menu' : 'navigation-wrapper__navbar-menu';

  const link = document.createElement('a');
  link.className = isMobile ? 'navigation-wrapper__mobilenavbar-menulink' : 'navigation-wrapper__navbar-menulink';
  link.target = '_self';

  const labelSpan = document.createElement('span');
  labelSpan.textContent = menuItem.label;
  link.append(labelSpan);

  if (menuItem.submenu && menuItem.submenu.length > 0) {
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
    if (!isMobile) {
      link.href = menuItem.link || '#'; // Desktop menu link
      const iconWrapper = document.createElement('span');
      iconWrapper.className = 'header-qd-icon-wrapper';
      const icon = document.createElement('span');
      icon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
      iconWrapper.append(icon);
      link.append(iconWrapper);
    } else {
      // Mobile menu link has no href, only expands submenu
      const icon = document.createElement('span');
      icon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
      link.append(icon);
      li.classList.add('border');
    }

    const submenuUl = document.createElement('ul');
    submenuUl.className = isMobile ? 'navigation-wrapper__mobilenavbar-submenu' : 'navigation-wrapper__navbar-submenu';

    if (isMobile) {
      const headerLi = document.createElement('li');
      headerLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
      const headerLink = document.createElement('a');
      const headerSpan = document.createElement('span');
      headerSpan.textContent = menuItem.label;
      headerLink.append(headerSpan);
      headerLi.append(headerLink);
      submenuUl.append(headerLi);
    }

    menuItem.submenu.forEach((subItem) => {
      const subLi = document.createElement('li');
      subLi.className = isMobile ? 'navigation-wrapper__mobilenavbar-menu' : '';
      const subLink = document.createElement('a');
      if (!isMobile) {
        subLink.setAttribute('aria-expanded', 'false');
      }
      subLink.target = '_self';
      subLink.href = subItem.link || '#';
      const subSpan = document.createElement('span');
      subSpan.textContent = subItem.label;
      subLink.append(subSpan);
      subLi.append(subLink);
      submenuUl.append(subLi);
    });
    li.append(link, submenuUl);
  } else {
    link.href = menuItem.link || '#';
    li.append(link);
  }
  return li;
}

function createLanguageSelector(languages, originalLanguageElement) {
  const languageDiv = document.createElement('div');
  languageDiv.className = 'header-language-selector header-lang-css-from-wrapper';
  languageDiv.style.visibility = 'visible';

  const ul = document.createElement('ul');
  ul.className = 'header-cmp-language-selector';

  languages.forEach((langItem) => {
    const li = document.createElement('li');
    if (langItem.langCode === 'en') {
      li.classList.add('active');
    }
    const a = document.createElement('a');
    a.href = langItem.link || '#';
    a.setAttribute('aria-label', langItem.label);
    a.className = 'header-cmp-language-selector__link';
    a.setAttribute('data-lang', langItem.langCode);
    a.textContent = langItem.label;
    li.append(a);
    ul.append(li);
  });
  languageDiv.append(ul);
  moveInstrumentation(originalLanguageElement, languageDiv);
  return languageDiv;
}

export default async function decorate(block) {
  const headerNavigation = {};
  const children = Array.from(block.children);

  // Extract logoUrl and logoLink
  const logoRow = children.find((row) => row.children[0]?.textContent.trim().toLowerCase() === 'logourl');
  if (logoRow) {
    headerNavigation.logoUrl = logoRow.children[1]?.querySelector('a')?.href || '';
    headerNavigation.logoLink = logoRow.children[2]?.querySelector('a')?.href || '/';
  }

  // Extract contactUsLabel and contactUsUrl
  const contactUsRow = children.find((row) => row.children[0]?.textContent.trim().toLowerCase() === 'contactuslabel');
  if (contactUsRow) {
    headerNavigation.contactUsLabel = contactUsRow.children[1]?.textContent.trim() || 'Contact Us';
    headerNavigation.contactUsUrl = contactUsRow.children[2]?.querySelector('a')?.href || '/contact/';
  }

  // Extract menu items
  const menuRows = children.filter((row) => row.children[0]?.textContent.trim().toLowerCase() === 'menu');
  headerNavigation.menu = menuRows.map((row) => {
    const menu = {};
    menu.label = row.children[1]?.textContent.trim();
    menu.link = row.children[2]?.querySelector('a')?.href;

    const submenuRows = Array.from(row.children[3]?.children || []).map((subRow) => {
      const submenu = {};
      submenu.label = subRow.children[0]?.textContent.trim();
      submenu.link = subRow.children[1]?.querySelector('a')?.href;
      return submenu;
    });
    menu.submenu = submenuRows;
    return menu;
  });

  // Extract language items
  const languageRows = children.filter((row) => row.children[0]?.textContent.trim().toLowerCase() === 'language');
  headerNavigation.language = languageRows.map((row) => {
    const language = {};
    language.label = row.children[1]?.textContent.trim();
    language.link = row.children[2]?.querySelector('a')?.href;
    language.langCode = row.children[3]?.textContent.trim();
    return language;
  });

  // Build the new DOM structure
  const container = document.createElement('div');
  container.className = 'header-container';

  const wrapper = document.createElement('div');
  wrapper.className = 'header-wrapper layout-container transparent-header';

  const navigation = document.createElement('div');
  navigation.className = 'header-navigation';

  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');

  const logoDiv = document.createElement('div');
  logoDiv.className = 'navigation-wrapper__logo';

  // Create logo
  const originalLogoElement = logoRow?.children[1]; // Assuming this cell contains the original logo element for instrumentation
  const logoAnchor = createLogo(headerNavigation.logoUrl, headerNavigation.logoLink, originalLogoElement);
  logoDiv.append(logoAnchor);

  const contactUsCtaDiv = document.createElement('div');
  contactUsCtaDiv.className = 'navigation-wrapper__contactUs-cta';

  // Create contact us CTA
  const originalContactUsElement = contactUsRow?.children[1]; // Assuming this cell contains the original cta element for instrumentation
  const contactUsCta = createContactUsCta(headerNavigation.contactUsLabel, headerNavigation.contactUsUrl, originalContactUsElement);
  contactUsCtaDiv.append(contactUsCta);

  const navigationToggleDiv = document.createElement('div');
  navigationToggleDiv.className = 'navigation-wrapper__icon';
  navigationToggleDiv.id = 'navigation-toggle';

  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.className = 'header-hamburger-ellipse';
  hamburgerEllipse.setAttribute('tabindex', '0');

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.className = 'header-hamburger-icon header-qd-icon header-qd-icon--hamburger';
  const closeIcon = document.createElement('span');
  closeIcon.className = 'header-close-icon header-qd-icon header-qd-icon--cancel';

  hamburgerEllipse.append(hamburgerIcon, closeIcon);
  navigationToggleDiv.append(hamburgerEllipse);
  contactUsCtaDiv.append(navigationToggleDiv);
  logoDiv.append(contactUsCtaDiv);
  navigationWrapper.append(logoDiv);

  // Desktop Navbar
  const desktopNavbar = document.createElement('nav');
  desktopNavbar.className = 'navigation-wrapper__navbar';
  desktopNavbar.id = 'navbar-desktop';
  desktopNavbar.setAttribute('role', 'navigation');
  desktopNavbar.setAttribute('aria-label', 'navigation.main.aria.label');

  const desktopUl = document.createElement('ul');
  desktopUl.className = 'navigation-wrapper__navbar-list';
  headerNavigation.menu.forEach((menuItem) => {
    desktopUl.append(createMenu(menuItem));
  });
  desktopNavbar.append(desktopUl);

  // Desktop Contact Us CTA
  const desktopContactUsCta = createContactUsCta(headerNavigation.contactUsLabel, headerNavigation.contactUsUrl, originalContactUsElement);
  desktopNavbar.append(desktopContactUsCta);

  // Desktop Language Selector
  const originalLanguageSelectorElement = languageRows[0]?.children[1]; // Assuming first language label cell for instrumentation
  const desktopLanguageSelector = createLanguageSelector(headerNavigation.language, originalLanguageSelectorElement);
  desktopNavbar.append(desktopLanguageSelector);
  navigationWrapper.append(desktopNavbar);

  // Mobile Navbar
  const mobileNavbar = document.createElement('nav');
  mobileNavbar.className = 'navigation-wrapper__mobilenavbar';
  mobileNavbar.id = 'navbar-mobile';
  mobileNavbar.setAttribute('role', 'navigation');
  mobileNavbar.setAttribute('aria-label', 'navigation.main.aria.label');

  const mobileUl = document.createElement('ul');
  mobileUl.className = 'navigation-wrapper__mobilenavbar-list';
  headerNavigation.menu.forEach((menuItem) => {
    mobileUl.append(createMenu(menuItem, true));
  });
  mobileNavbar.append(mobileUl);

  const mobileNavBackDiv = document.createElement('div');
  mobileNavBackDiv.className = 'navigation-wrapper__mobilenavbar-back nav-back';

  const mobileNavBackAnchor = document.createElement('a');
  mobileNavBackAnchor.className = 'navigation-wrapper__icon';
  const mobileNavBackIcon = document.createElement('span');
  mobileNavBackIcon.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  mobileNavBackAnchor.append(mobileNavBackIcon);

  const mobileNavBackLabel = document.createElement('span');
  mobileNavBackLabel.className = 'navigation-wrapper__iconlabel';
  mobileNavBackLabel.textContent = 'Back';

  mobileNavBackDiv.append(mobileNavBackAnchor, mobileNavBackLabel);
  mobileNavbar.append(mobileNavBackDiv);

  // Mobile Language Selector
  const mobileLanguageSelector = createLanguageSelector(headerNavigation.language, originalLanguageSelectorElement);
  mobileNavbar.append(mobileLanguageSelector);
  navigationWrapper.append(mobileNavbar);

  navigation.append(navigationWrapper);
  wrapper.append(navigation);
  container.append(wrapper);

  block.textContent = '';
  block.append(container);
}