/**
 * Header Navigation Block for AEM EDS
 * Handles desktop and mobile navigation with dropdowns
 */

/**
 * Creates the logo element
 */
function createLogo(logoLink) {
  const logoDiv = document.createElement('div');
  logoDiv.className = 'navigation-wrapper__logo';
  
  const logoAnchor = document.createElement('a');
  logoAnchor.href = logoLink || '/';
  logoAnchor.target = '_self';
  
  const logoSpan = document.createElement('span');
  logoSpan.className = 'header-qd-icon header-qd-icon--logo header-qd-logo';
  
  // Create multiple path spans for the logo icon
  for (let i = 1; i <= 25; i++) {
    const pathSpan = document.createElement('span');
    pathSpan.className = `path${i}`;
    logoSpan.appendChild(pathSpan);
  }
  
  logoAnchor.appendChild(logoSpan);
  logoDiv.appendChild(logoAnchor);
  
  return logoDiv;
}

/**
 * Creates the contact CTA and hamburger menu toggle
 */
function createContactAndToggle(contactUsLink) {
  const contactDiv = document.createElement('div');
  contactDiv.className = 'navigation-wrapper__contactUs-cta';
  
  // Contact Us CTA
  const ctaLink = document.createElement('a');
  ctaLink.href = contactUsLink || '/contact/';
  ctaLink.className = 'header-cta header-cta__ navigation--content__cta';
  ctaLink.target = '_self';
  ctaLink.setAttribute('aria-label', 'Contact Us');
  
  const iconSpan = document.createElement('span');
  iconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  iconSpan.setAttribute('aria-hidden', 'true');
  
  const labelSpan = document.createElement('span');
  labelSpan.className = 'header-cta__label';
  labelSpan.textContent = 'Contact Us';
  
  ctaLink.appendChild(iconSpan);
  ctaLink.appendChild(labelSpan);
  contactDiv.appendChild(ctaLink);
  
  // Hamburger toggle
  const toggleDiv = document.createElement('div');
  toggleDiv.className = 'navigation-wrapper__icon';
  toggleDiv.id = 'navigation-toggle';
  
  const ellipseDiv = document.createElement('div');
  ellipseDiv.className = 'header-hamburger-ellipse';
  ellipseDiv.tabIndex = 0;
  
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.className = 'header-hamburger-icon header-qd-icon header-qd-icon--hamburger';
  
  const closeIcon = document.createElement('span');
  closeIcon.className = 'header-close-icon header-qd-icon header-qd-icon--cancel';
  
  ellipseDiv.appendChild(hamburgerIcon);
  ellipseDiv.appendChild(closeIcon);
  toggleDiv.appendChild(ellipseDiv);
  contactDiv.appendChild(toggleDiv);
  
  return contactDiv;
}

/**
 * Creates desktop navigation menu
 */
function createDesktopNav(navMenus, contactUsLink, languages) {
  const nav = document.createElement('nav');
  nav.className = 'navigation-wrapper__navbar';
  nav.id = 'navbar-desktop';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'navigation.main.aria.label');
  
  const ul = document.createElement('ul');
  ul.className = 'navigation-wrapper__navbar-list';
  
  // Create menu items
  navMenus.forEach(menu => {
    const li = document.createElement('li');
    li.className = 'navigation-wrapper__navbar-menu';
    
    const menuLink = document.createElement('a');
    menuLink.className = 'navigation-wrapper__navbar-menulink';
    menuLink.href = menu.menuLink || '#';
    menuLink.target = '_self';
    menuLink.setAttribute('aria-haspopup', 'true');
    menuLink.setAttribute('aria-expanded', 'false');
    
    const menuText = document.createElement('span');
    menuText.textContent = menu.menuTitle;
    
    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'header-qd-icon-wrapper';
    
    const chevronIcon = document.createElement('span');
    chevronIcon.className = 'header-menu-icon header-qd-icon header-qd-icon--cheveron-down';
    
    iconWrapper.appendChild(chevronIcon);
    menuLink.appendChild(menuText);
    menuLink.appendChild(iconWrapper);
    li.appendChild(menuLink);
    
    // Create submenu if exists
    if (menu.subMenuItems && menu.subMenuItems.length > 0) {
      const subUl = document.createElement('ul');
      subUl.className = 'navigation-wrapper__navbar-submenu';
      
      menu.subMenuItems.forEach(subItem => {
        const subLi = document.createElement('li');
        const subLink = document.createElement('a');
        subLink.href = subItem.subMenuLink || '#';
        subLink.target = '_self';
        subLink.setAttribute('aria-expanded', 'false');
        
        const subSpan = document.createElement('span');
        subSpan.textContent = subItem.subMenuTitle;
        subLink.appendChild(subSpan);
        subLi.appendChild(subLink);
        subUl.appendChild(subLi);
      });
      
      li.appendChild(subUl);
    }
    
    ul.appendChild(li);
  });
  
  nav.appendChild(ul);
  
  // Add Contact CTA to desktop nav
  const ctaLink = document.createElement('a');
  ctaLink.href = contactUsLink || '/contact/';
  ctaLink.className = 'header-cta header-cta__ navigation--content__cta';
  ctaLink.target = '_self';
  ctaLink.setAttribute('aria-label', 'Contact Us');
  
  const iconSpan = document.createElement('span');
  iconSpan.className = 'header-cta__icon header-qd-icon header-qd-icon--cheveron-right';
  iconSpan.setAttribute('aria-hidden', 'true');
  
  const labelSpan = document.createElement('span');
  labelSpan.className = 'header-cta__label';
  labelSpan.textContent = 'Contact Us';
  
  ctaLink.appendChild(iconSpan);
  ctaLink.appendChild(labelSpan);
  nav.appendChild(ctaLink);
  
  // Add language selector
  if (languages && languages.length > 0) {
    const langDiv = createLanguageSelector(languages);
    nav.appendChild(langDiv);
  }
  
  return nav;
}

/**
 * Creates mobile navigation menu
 */
function createMobileNav(navMenus, languages) {
  const nav = document.createElement('nav');
  nav.className = 'navigation-wrapper__mobilenavbar';
  nav.id = 'navbar-mobile';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'navigation.main.aria.label');
  
  const ul = document.createElement('ul');
  ul.className = 'navigation-wrapper__mobilenavbar-list';
  
  // Create menu items
  navMenus.forEach(menu => {
    const li = document.createElement('li');
    li.className = 'navigation-wrapper__mobilenavbar-menu border';
    
    const menuLink = document.createElement('a');
    menuLink.className = 'navigation-wrapper__mobilenavbar-menulink';
    
    const menuText = document.createElement('span');
    menuText.textContent = menu.menuTitle;
    
    const chevronIcon = document.createElement('span');
    chevronIcon.className = 'header-qd-icon header-qd-icon--cheveron-right navigation-wrapper__mobilenavbar-menulink-icon';
    
    menuLink.appendChild(menuText);
    menuLink.appendChild(chevronIcon);
    li.appendChild(menuLink);
    
    // Create submenu if exists
    if (menu.subMenuItems && menu.subMenuItems.length > 0) {
      const subUl = document.createElement('ul');
      subUl.className = 'navigation-wrapper__mobilenavbar-submenu';
      
      // Add menu header
      const headerLi = document.createElement('li');
      headerLi.className = 'navigation-wrapper__mobilenavbar-menuheader';
      const headerLink = document.createElement('a');
      const headerSpan = document.createElement('span');
      headerSpan.textContent = menu.menuTitle;
      headerLink.appendChild(headerSpan);
      headerLi.appendChild(headerLink);
      subUl.appendChild(headerLi);
      
      // Add submenu items
      menu.subMenuItems.forEach(subItem => {
        const subLi = document.createElement('li');
        subLi.className = 'navigation-wrapper__mobilenavbar-menu';
        
        const subLink = document.createElement('a');
        subLink.className = 'navigation-wrapper__mobilenavbar-menulink';
        subLink.href = subItem.subMenuLink || '#';
        subLink.target = '_self';
        
        const subSpan = document.createElement('span');
        subSpan.textContent = subItem.subMenuTitle;
        subLink.appendChild(subSpan);
        subLi.appendChild(subLink);
        subUl.appendChild(subLi);
      });
      
      li.appendChild(subUl);
    }
    
    ul.appendChild(li);
  });
  
  nav.appendChild(ul);
  
  // Add back button
  const backDiv = document.createElement('div');
  backDiv.className = 'navigation-wrapper__mobilenavbar-back nav-back';
  
  const backLink = document.createElement('a');
  backLink.className = 'navigation-wrapper__icon';
  
  const backIcon = document.createElement('span');
  backIcon.className = 'header-back-icon header-qd-icon header-qd-icon--cheveron-left';
  
  const backLabel = document.createElement('span');
  backLabel.className = 'navigation-wrapper__iconlabel';
  backLabel.textContent = 'Back';
  
  backLink.appendChild(backIcon);
  backDiv.appendChild(backLink);
  backDiv.appendChild(backLabel);
  nav.appendChild(backDiv);
  
  // Add language selector
  if (languages && languages.length > 0) {
    const langDiv = createLanguageSelector(languages);
    nav.appendChild(langDiv);
  }
  
  return nav;
}

/**
 * Creates language selector
 */
function createLanguageSelector(languages) {
  const langDiv = document.createElement('div');
  langDiv.className = 'header-language-selector header-lang-css-from-wrapper';
  langDiv.style.visibility = 'visible';
  
  const langUl = document.createElement('ul');
  langUl.className = 'header-cmp-language-selector';
  
  languages.forEach((lang, index) => {
    const langLi = document.createElement('li');
    if (index === 0) langLi.className = 'active';
    
    const langLink = document.createElement('a');
    langLink.href = lang.languageLink || '#';
    langLink.className = 'header-cmp-language-selector__link';
    langLink.setAttribute('aria-label', lang.languageLabel);
    langLink.setAttribute('data-lang', lang.languageLabel.toLowerCase());
    langLink.textContent = lang.languageLabel;
    
    langLi.appendChild(langLink);
    langUl.appendChild(langLi);
  });
  
  langDiv.appendChild(langUl);
  return langDiv;
}

/**
 * Initializes navigation interactions
 */
function initNavigation(block) {
  const toggle = block.querySelector('#navigation-toggle');
  const mobileNav = block.querySelector('#navbar-mobile');
  const desktopNav = block.querySelector('#navbar-desktop');
  const headerWrapper = block.closest('.header-wrapper');
  
  // Toggle mobile menu
  if (toggle) {
    toggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }
  
  // Desktop dropdown interactions
  const desktopMenus = desktopNav?.querySelectorAll('.navigation-wrapper__navbar-menu');
  desktopMenus?.forEach(menu => {
    const menuLink = menu.querySelector('.navigation-wrapper__navbar-menulink');
    
    menuLink?.addEventListener('click', (e) => {
      const isExpanded = menuLink.getAttribute('aria-expanded') === 'true';
      menuLink.setAttribute('aria-expanded', !isExpanded);
      menu.classList.toggle('active');
    });
  });
  
  // Mobile menu interactions
  const mobileMenus = mobileNav?.querySelectorAll('.navigation-wrapper__mobilenavbar-menu.border > .navigation-wrapper__mobilenavbar-menulink');
  mobileMenus?.forEach(menuLink => {
    menuLink.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = menuLink.parentElement;
      const submenu = parent.querySelector('.navigation-wrapper__mobilenavbar-submenu');
      
      if (submenu) {
        submenu.classList.add('active');
        mobileNav.querySelector('.nav-back').classList.add('active');
      }
    });
  });
  
  // Mobile back button
  const backBtn = mobileNav?.querySelector('.nav-back');
  backBtn?.addEventListener('click', () => {
    const activeSubmenu = mobileNav.querySelector('.navigation-wrapper__mobilenavbar-submenu.active');
    if (activeSubmenu) {
      activeSubmenu.classList.remove('active');
      backBtn.classList.remove('active');
    }
  });
  
  // Handle scroll for transparent header
  if (headerWrapper?.classList.contains('transparent-header')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        headerWrapper.classList.add('scrolled');
      } else {
        headerWrapper.classList.remove('scrolled');
      }
    });
  }
}

/**
 * Decorate function - main entry point
 */
export default async function decorate(block) {
  // Parse block data
  const rows = [...block.children];
  const data = {
    logoLink: null,
    contactUsLink: null,
    navMenus: [],
    languages: []
  };
  
  rows.forEach(row => {
    const cells = [...row.children];
    if (cells.length < 2) return;
    
    const key = cells[0].textContent.trim().toLowerCase();
    
    if (key === 'logo link') {
      data.logoLink = cells[1].querySelector('a')?.href || '/';
    } else if (key === 'contact us link') {
      data.contactUsLink = cells[1].querySelector('a')?.href || '/contact/';
    } else if (key === 'navigation menus') {
      // Parse navigation menus structure
      const menuBlocks = cells[1].querySelectorAll(':scope > div');
      menuBlocks.forEach(menuBlock => {
        const menuData = {
          menuTitle: '',
          menuLink: '',
          subMenuItems: []
        };
        
        const menuCells = [...menuBlock.children];
        menuCells.forEach(cell => {
          const cellKey = cell.querySelector('div:first-child')?.textContent.trim().toLowerCase();
          const cellValue = cell.querySelector('div:last-child');
          
          if (cellKey === 'menu title') {
            menuData.menuTitle = cellValue?.textContent.trim();
          } else if (cellKey === 'menu link') {
            menuData.menuLink = cellValue?.querySelector('a')?.href || '#';
          } else if (cellKey === 'sub menu items') {
            const subItems = cellValue?.querySelectorAll(':scope > div');
            subItems?.forEach(subItem => {
              const subData = {
                subMenuTitle: subItem.querySelector('div:first-child div:last-child')?.textContent.trim(),
                subMenuLink: subItem.querySelector('div:last-child div:last-child a')?.href || '#'
              };
              menuData.subMenuItems.push(subData);
            });
          }
        });
        
        data.navMenus.push(menuData);
      });
    } else if (key === 'languages') {
      const langBlocks = cells[1].querySelectorAll(':scope > div');
      langBlocks.forEach(langBlock => {
        const langLabel = langBlock.querySelector('div:first-child div:last-child')?.textContent.trim();
        const langLink = langBlock.querySelector('div:last-child div:last-child a')?.href || '#';
        data.languages.push({
          languageLabel: langLabel,
          languageLink: langLink
        });
      });
    }
  });
  
  // Clear block
  block.innerHTML = '';
  
  // Build header structure
  const headerContainer = document.createElement('div');
  headerContainer.id = 'container-e9226c8e5e';
  headerContainer.className = 'header-container';
  
  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper layout-container transparent-header';
  
  const headerNavigation = document.createElement('div');
  headerNavigation.className = 'header-navigation';
  
  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  navigationWrapper.setAttribute('role', 'banner');
  navigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  
  // Build components
  const logo = createLogo(data.logoLink);
  const contactToggle = createContactAndToggle(data.contactUsLink);
  logo.appendChild(contactToggle);
  
  const desktopNav = createDesktopNav(data.navMenus, data.contactUsLink, data.languages);
  const mobileNav = createMobileNav(data.navMenus, data.languages);
  
  // Assemble structure
  navigationWrapper.appendChild(logo);
  navigationWrapper.appendChild(desktopNav);
  navigationWrapper.appendChild(mobileNav);
  headerNavigation.appendChild(navigationWrapper);
  headerWrapper.appendChild(headerNavigation);
  headerContainer.appendChild(headerWrapper);
  block.appendChild(headerContainer);
  
  // Initialize interactions
  initNavigation(block);
}