import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  const itcLogo = block.querySelector('[data-aue-prop="itcLogo"]');
  const fssiLogo = block.querySelector('[data-aue-prop="fssiLogo"]');

  const headerSection = document.createElement('section');
  headerSection.classList.add('header-position-relative', 'header-mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-d-none', 'header-app-name');
  if (appName) {
    appNameSpan.setAttribute('data-app-name', appName.textContent);
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  headerSection.append(appNameSpan);

  const header = document.createElement('header');
  header.classList.add(
    'boing-container',
    'header-header',
    'header-d-flex',
    'header-justify-content-between',
    'header-align-items-center',
    'header-h-15',
    'header-px-5',
    'header-py-2',
    'header-fixed-top',
    'header-w-100',
    'header-bg-white'
  );

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('header-d-flex', 'header-w-25');
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.classList.add(
    'header-d-flex',
    'header-justify-content-center',
    'header-w-25'
  );
  const logoLinkAnchor = document.createElement('a');
  logoLinkAnchor.classList.add('header-analytics_cta_click');
  logoLinkAnchor.setAttribute('data-ct', '');
  logoLinkAnchor.setAttribute('a-label', 'header-logo-boing');
  if (logoLink) {
    logoLinkAnchor.href = logoLink.href;
    moveInstrumentation(logoLink, logoLinkAnchor);
  } else {
    logoLinkAnchor.href = '/';
  }

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header__logo', 'header-d-flex', 'header-align-items-center');
  const logoImg = document.createElement('img');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    moveInstrumentation(logoImage, pic.querySelector('img'));
    logoImg.src = pic.querySelector('img').src;
    logoImg.alt = pic.querySelector('img').alt;
  } else {
    logoImg.src = '/content/dam/aemigrate/uploaded-folder/image/lets-boing-logo?fmt=webp-alpha.webp';
    logoImg.alt = 'Let\'s Boing';
  }
  logoImg.classList.add('header__logo-img');
  logoImg.setAttribute('fetchpriority', 'high');
  logoImg.setAttribute('loading', 'eager');
  logoDiv.append(logoImg);
  logoLinkAnchor.append(logoDiv);
  headerCenterDiv.append(logoLinkAnchor);
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add(
    'header-d-flex',
    'header-w-25',
    'header-justify-content-end'
  );
  const loginLinkAnchor = document.createElement('a');
  loginLinkAnchor.classList.add('header__login-btn-wrapper', 'header-analytics_cta_click');
  loginLinkAnchor.style.display = 'inline';
  if (loginLink) {
    loginLinkAnchor.href = loginLink.href;
    moveInstrumentation(loginLink, loginLinkAnchor);
  } else {
    loginLinkAnchor.href = '/login.html';
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add(
    'header__login-btn',
    'header-btn',
    'header-text-boing-primary',
    'header-bg-transparent',
    'header-fw-semibold',
    'header-rounded-4',
    'header-btn-sm',
    'header-py-3',
    'header-px-4'
  );
  if (loginText) {
    loginButton.textContent = loginText.textContent;
    moveInstrumentation(loginText, loginButton);
  } else {
    loginButton.textContent = 'Login';
  }
  loginLinkAnchor.append(loginButton);
  headerRightDiv.append(loginLinkAnchor);
  header.append(headerRightDiv);
  headerSection.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add(
    'header-submenu-container',
    'header-position-fixed',
    'header-top-0',
    'header-start-0',
    'header-end-0',
    'header-m-auto',
    'header-overflow-hidden'
  );

  const sidebar = document.createElement('aside');
  sidebar.classList.add(
    'header-sidebar',
    'header-start-0',
    'header-bg-white',
    'header-position-absolute'
  );

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  menuItems.forEach((item) => {
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const link = item.querySelector('[data-aue-prop="link"]');
    const text = item.querySelector('[data-aue-prop="text"]');

    const listItem = document.createElement('li');
    listItem.classList.add(
      'header-sidebar__menu-item',
      'header-py-6',
      'header-border-bottom',
      'header-border-boing-neutral-gray-200'
    );
    if (text && text.textContent.toLowerCase() === 'logout') {
      listItem.classList.add('header-sidebar__menu-item--logout');
      listItem.style.display = 'none';
    }

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add(
      'header-sidebar__menu-link',
      'header-d-flex',
      'header-align-items-center',
      'header-text-decoration-none',
      'header-px-6',
      'header-fw-medium',
      'header-analytics_cta_click'
    );
    linkAnchor.setAttribute('data-consent', 'false');
    if (link) {
      linkAnchor.href = link.href;
      linkAnchor.setAttribute('data-link', link.href);
      moveInstrumentation(link, linkAnchor);
    }

    if (icon) {
      const iconImg = document.createElement('img');
      const pic = createOptimizedPicture(icon.src, icon.alt);
      moveInstrumentation(icon, pic.querySelector('img'));
      iconImg.src = pic.querySelector('img').src;
      iconImg.alt = pic.querySelector('img').alt;
      iconImg.classList.add('header-sidebar__menu-icon', 'header-me-4');
      iconImg.setAttribute('loading', 'lazy');
      linkAnchor.append(iconImg);
    }

    if (text) {
      linkAnchor.append(text.textContent);
      moveInstrumentation(text, linkAnchor);
    }
    if (text && text.textContent.toLowerCase() === 'logout') {
      linkAnchor.classList.add('header-sidebar__menu-item--logout-btn');
    }

    listItem.append(linkAnchor);
    sidebarMenu.append(listItem);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('header-footer-brand__primary');
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.classList.add('header-container');

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add(
    'header-footer-brand__primary--content',
    'header-d-flex',
    'header-flex-column',
    'header-flex-md-row',
    'header-justify-content-md-between',
    'header-align-items-center'
  );

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add(
    'header-footer-brand__left',
    'header-d-flex',
    'header-gap-16',
    'header-px-10',
    'header-align-items-center',
    'header-justify-content-center'
  );

  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.setAttribute('aria-label', 'ITC Logo');
  if (itcLogo) {
    const itcImg = document.createElement('img');
    const pic = createOptimizedPicture(itcLogo.src, itcLogo.alt);
    moveInstrumentation(itcLogo, pic.querySelector('img'));
    itcImg.src = pic.querySelector('img').src;
    itcImg.alt = pic.querySelector('img').alt;
    itcImg.classList.add(
      'header-object-fit-contain',
      'header-w-100',
      'header-h-100',
      'header-no-rendition'
    );
    itcImg.setAttribute('loading', 'lazy');
    itcLink.append(itcImg);
  }
  footerBrandLeft.append(itcLink);

  const fssiDiv = document.createElement('div');
  fssiDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
  if (fssiLogo) {
    const fssiImg = document.createElement('img');
    const pic = createOptimizedPicture(fssiLogo.src, fssiLogo.alt);
    moveInstrumentation(fssiLogo, pic.querySelector('img'));
    fssiImg.src = pic.querySelector('img').src;
    fssiImg.alt = pic.querySelector('img').alt;
    fssiImg.classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
    fssiImg.setAttribute('loading', 'lazy');
    fssiDiv.append(fssiImg);
  }
  footerBrandLeft.append(fssiDiv);
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkGroups = [[], [], [], []]; // Max 4 columns
  footerLinks.forEach((linkItem, index) => {
    const link = linkItem.querySelector('[data-aue-prop="link"]');
    const text = linkItem.querySelector('[data-aue-prop="text"]');
    if (link && text) {
      linkGroups[index % 4].push({ link, text });
    }
  });

  linkGroups.forEach((group, groupIndex) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('header-footerList');
      const footerListUl = document.createElement('ul');
      footerListUl.classList.add(
        'header-footer-list',
        'header-d-flex',
        'header-align-items-center',
        'header-justify-content-center',
        'header-align-items-md-start',
        'header-flex-column'
      );

      group.forEach(({ link, text }) => {
        const listItem = document.createElement('li');
        listItem.classList.add('header-footer-list__item');
        const linkAnchor = document.createElement('a');
        linkAnchor.classList.add(
          'header-cta-analytics',
          'header-analytics_cta_click',
          'header-footer-list__item--link',
          'header-d-inline-block'
        );
        linkAnchor.setAttribute('data-link-region', 'Footer List');
        linkAnchor.href = link.href;
        linkAnchor.textContent = text.textContent;
        moveInstrumentation(link, linkAnchor);
        moveInstrumentation(text, linkAnchor);
        listItem.append(linkAnchor);
        footerListUl.append(listItem);
      });
      footerListDiv.append(footerListUl);
      if (groupIndex < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        let footerNavbarRight = footerNavbar.querySelector('.header-footer-brand__navbar--right');
        if (!footerNavbarRight) {
          footerNavbarRight = document.createElement('div');
          footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
          footerNavbar.append(footerNavbarRight);
        }
        footerNavbarRight.append(footerListDiv);
      }
    }
  });

  footerNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('header-footer-brand__secondary');
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.classList.add('header-container');

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add(
    'header-footer-brand__secondary--content',
    'header-d-flex',
    'header-flex-column',
    'header-justify-content-md-between',
    'header-align-items-center'
  );

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('header-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add(
    'header-footer-brand__right--list',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-center',
    'header-px-10',
    'header-flex-wrap'
  );

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialItem) => {
    const link = socialItem.querySelector('[data-aue-prop="link"]');
    const icon = socialItem.querySelector('[data-aue-prop="icon"]');

    const listItem = document.createElement('li');
    listItem.classList.add(
      'header-footer-brand__right--item',
      'header-d-flex',
      'header-justify-content-center',
      'header-align-items-center'
    );

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add(
      'header-footer-brand__right--link',
      'header-d-flex',
      'header-justify-content-center',
      'header-align-items-center',
      'header-analytics_cta_click'
    );
    linkAnchor.setAttribute('data-cta-region', 'Footer');
    linkAnchor.target = '_blank';
    linkAnchor.setAttribute('data-social-linktype', 'follow');

    if (link) {
      linkAnchor.href = link.href;
      const platformName = new URL(link.href).hostname.split('.')[1] || '';
      linkAnchor.setAttribute('data-cta-label', `footer-${platformName}`);
      linkAnchor.setAttribute('data-platform-name', platformName);
      moveInstrumentation(link, linkAnchor);
    }

    if (icon) {
      const iconImg = document.createElement('img');
      const pic = createOptimizedPicture(icon.src, icon.alt);
      moveInstrumentation(icon, pic.querySelector('img'));
      iconImg.src = pic.querySelector('img').src;
      iconImg.alt = pic.querySelector('img').alt;
      iconImg.setAttribute('aria-label', iconImg.alt || 'social icon');
      iconImg.classList.add(
        'header-object-fit-contain',
        'header-w-100',
        'header-h-100',
        'header-no-rendition'
      );
      iconImg.setAttribute('loading', 'lazy');
      linkAnchor.append(iconImg);
    }
    listItem.append(linkAnchor);
    socialMediaList.append(listItem);
  });
  socialMediaSection.append(socialMediaList);
  footerBrandSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add(
    'header-footer-brand__left--list',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-center',
    'header-flex-wrap'
  );
  const copyrightListItem = document.createElement('li');
  copyrightListItem.classList.add('header-footer-brand__left--item', 'header-foot_link');
  const copyrightLink = document.createElement('a');
  copyrightLink.href = 'https://www.itcportal.com/';
  copyrightLink.target = '_blank';
  copyrightLink.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
  copyrightLink.setAttribute('data-cta-region', 'Footer');
  copyrightLink.textContent = 'ITC portal';
  copyrightListItem.append(copyrightLink);
  copyrightList.append(copyrightListItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  footerBrandSecondaryContent.append(copyrightSection);

  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add(
    'header-overlay',
    'header-position-absolute',
    'header-top-0',
    'header-start-0',
    'header-w-100',
    'header-h-100',
    'header-bg-black',
    'header-opacity-25'
  );
  submenuContainer.append(overlay);
  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
