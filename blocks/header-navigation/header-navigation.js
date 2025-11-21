/**
 * Header Navigation Block for AEM EDS
 * Simplified version without submenu complexity
 */

/**
 * Decorate function - main entry point
 */
export default async function decorate(block) {
  // Get all rows from the block
  const rows = [...block.children];
  
  // Parse the block content
  let logoLink = '/';
  let contactUsLink = '/contact/';
  const navMenus = [];
  const languages = [];
  
  rows.forEach(row => {
    const cells = [...row.children];
    if (cells.length < 2) return;
    
    const label = cells[0].textContent.trim();
    const content = cells[1];
    
    if (label === 'Logo Link') {
      const link = content.querySelector('a');
      if (link) logoLink = link.href;
    } else if (label === 'Contact Us Link') {
      const link = content.querySelector('a');
      if (link) contactUsLink = link.href;
    } else if (label === 'Navigation Menus') {
      // Each menu item should be in a div
      const menuItems = content.querySelectorAll(':scope > div > div');
      menuItems.forEach(item => {
        const title = item.querySelector('div:nth-child(1)')?.textContent.trim();
        const link = item.querySelector('div:nth-child(2) a')?.href;
        if (title && link) {
          navMenus.push({ title, link });
        }
      });
    } else if (label === 'Languages') {
      // Each language should be in a div
      const langItems = content.querySelectorAll(':scope > div > div');
      langItems.forEach(item => {
        const label = item.querySelector('div:nth-child(1)')?.textContent.trim();
        const link = item.querySelector('div:nth-child(2) a')?.href;
        if (label && link) {
          languages.push({ label, link });
        }
      });
    }
  });
  
  // Clear the block
  block.innerHTML = '';
  block.className = 'header-navigation';
  
  // Create header structure
  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-wrapper';
  
  const navigationWrapper = document.createElement('div');
  navigationWrapper.className = 'navigation-wrapper';
  
  // Create logo section
  const logoDiv = document.createElement('div');
  logoDiv.className = 'navigation-wrapper__logo';
  logoDiv.innerHTML = `
    <a href="${logoLink}">
      <span class="header-qd-icon header-qd-icon--logo"></span>
    </a>
  `;
  
  // Create mobile toggle and contact section
  const mobileSection = document.createElement('div');
  mobileSection.className = 'navigation-wrapper__mobile-section';
  mobileSection.innerHTML = `
    <a href="${contactUsLink}" class="header-cta">
      <span class="header-cta__icon"></span>
      <span class="header-cta__label">Contact Us</span>
    </a>
    <button class="navigation-toggle" id="nav-toggle" aria-label="Toggle navigation">
      <span class="hamburger-icon"></span>
    </button>
  `;
  
  // Create desktop navigation
  const desktopNav = document.createElement('nav');
  desktopNav.className = 'navigation-wrapper__desktop';
  desktopNav.id = 'navbar-desktop';
  
  const navList = document.createElement('ul');
  navList.className = 'navigation-list';
  
  navMenus.forEach(menu => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = menu.link;
    a.textContent = menu.title;
    li.appendChild(a);
    navList.appendChild(li);
  });
  
  desktopNav.appendChild(navList);
  
  // Add contact button to desktop nav
  const desktopContact = document.createElement('a');
  desktopContact.href = contactUsLink;
  desktopContact.className = 'header-cta';
  desktopContact.innerHTML = `
    <span class="header-cta__icon"></span>
    <span class="header-cta__label">Contact Us</span>
  `;
  desktopNav.appendChild(desktopContact);
  
  // Add language selector to desktop nav
  if (languages.length > 0) {
    const langSelector = document.createElement('div');
    langSelector.className = 'header-language-selector';
    const langList = document.createElement('ul');
    
    languages.forEach((lang, index) => {
      const li = document.createElement('li');
      if (index === 0) li.className = 'active';
      const a = document.createElement('a');
      a.href = lang.link;
      a.textContent = lang.label;
      li.appendChild(a);
      langList.appendChild(li);
    });
    
    langSelector.appendChild(langList);
    desktopNav.appendChild(langSelector);
  }
  
  // Create mobile navigation
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'navigation-wrapper__mobile';
  mobileNav.id = 'navbar-mobile';
  
  const mobileList = document.createElement('ul');
  
  navMenus.forEach(menu => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = menu.link;
    a.textContent = menu.title;
    li.appendChild(a);
    mobileList.appendChild(li);
  });
  
  mobileNav.appendChild(mobileList);
  
  // Add language selector to mobile nav
  if (languages.length > 0) {
    const langSelector = document.createElement('div');
    langSelector.className = 'header-language-selector';
    const langList = document.createElement('ul');
    
    languages.forEach((lang, index) => {
      const li = document.createElement('li');
      if (index === 0) li.className = 'active';
      const a = document.createElement('a');
      a.href = lang.link;
      a.textContent = lang.label;
      li.appendChild(a);
      langList.appendChild(li);
    });
    
    langSelector.appendChild(langList);
    mobileNav.appendChild(langSelector);
  }
  
  // Assemble everything
  navigationWrapper.appendChild(logoDiv);
  navigationWrapper.appendChild(mobileSection);
  navigationWrapper.appendChild(desktopNav);
  navigationWrapper.appendChild(mobileNav);
  headerWrapper.appendChild(navigationWrapper);
  block.appendChild(headerWrapper);
  
  // Add mobile menu toggle functionality
  const toggle = block.querySelector('#nav-toggle');
  const mobileMenu = block.querySelector('#navbar-mobile');
  
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('active');
      if (isOpen) {
        mobileMenu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('active');
        toggle.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!navigationWrapper.contains(e.target)) {
        mobileMenu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
  
  // Handle scroll for header transparency
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      headerWrapper.classList.add('scrolled');
    } else {
      headerWrapper.classList.remove('scrolled');
    }
  });
}