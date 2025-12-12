import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]')?.textContent;
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const headerLogoImage = block.querySelector('[data-aue-prop="headerLogo"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');

  block.textContent = '';

  const section = document.createElement('section');
  section.className = 'header-section-position-relative header-section-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-app-name d-none';
    appNameSpan.setAttribute('data-app-name', appName);
    appNameSpan.textContent = appName;
    section.append(appNameSpan);
    moveInstrumentation(block.querySelector('[data-aue-prop="appName"]'), appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const div1 = document.createElement('div');
  div1.className = 'd-flex w-25';
  header.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'd-flex justify-content-center w-25';

  if (headerLogoLink && headerLogoImage) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = headerLogoLink.href || '/';
    logoAnchor.className = 'header-analytics-cta-click';
    logoAnchor.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-logo d-flex align-items-center';

    const optimizedPicture = createOptimizedPicture(headerLogoImage.src, headerLogoImage.alt, true, [{ width: '100px' }]);
    optimizedPicture.querySelector('img').className = 'header-logo-img';
    logoDiv.append(optimizedPicture);
    logoAnchor.append(logoDiv);
    div2.append(logoAnchor);
    moveInstrumentation(headerLogoLink, logoAnchor);
    moveInstrumentation(headerLogoImage, optimizedPicture);
  }
  header.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'd-flex w-25 justify-content-end';

  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href || '/login.html';
    loginAnchor.className = 'header-login-btn-wrapper header-analytics-cta-click';
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLink.textContent || 'Login';
    loginAnchor.append(loginButton);
    div3.append(loginAnchor);
    moveInstrumentation(loginLink, loginAnchor);
  }
  header.append(div3);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar start-0 bg-white position-absolute';

  if (sidebarMenuItems.length > 0) {
    const sidebarMenu = document.createElement('ul');
    sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

    sidebarMenuItems.forEach((itemNode) => {
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const icon = itemNode.querySelector('[data-aue-prop="icon"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');

      const listItem = document.createElement('li');
      listItem.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';

      const itemLink = document.createElement('a');
      itemLink.href = link?.href || '#';
      itemLink.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
      itemLink.setAttribute('data-consent', 'false');
      itemLink.setAttribute('data-link', link?.href || '');

      if (icon) {
        const optimizedIcon = createOptimizedPicture(icon.src, icon.alt);
        optimizedIcon.querySelector('img').className = 'header-sidebar-menu-icon me-4';
        itemLink.append(optimizedIcon);
        moveInstrumentation(icon, optimizedIcon);
      }
      if (label) {
        itemLink.append(label.textContent);
        moveInstrumentation(label, itemLink);
      }
      listItem.append(itemLink);
      sidebarMenu.append(listItem);
      moveInstrumentation(itemNode, listItem);
    });

    // Add Logout item (static, as per HTML structure)
    const logoutListItem = document.createElement('li');
    logoutListItem.className = 'header-sidebar-menu-item header-sidebar-menu-item--logout py-6 border-bottom border-boing-neutral-gray-200';
    logoutListItem.style.display = 'none';
    const logoutLink = document.createElement('a');
    logoutLink.href = '/';
    logoutLink.className = 'header-sidebar-menu-link header-sidebar-menu-item--logout-btn d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
    logoutLink.setAttribute('data-consent', 'false');
    logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
    const logoutImg = document.createElement('img');
    logoutImg.src = '/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp';
    logoutImg.alt = 'Logout';
    logoutImg.className = 'header-sidebar-menu-icon me-4';
    logoutImg.loading = 'lazy';
    logoutLink.append(logoutImg, 'Logout');
    logoutListItem.append(logoutLink);
    sidebarMenu.append(logoutListItem);

    aside.append(sidebarMenu);
  }

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  // ITC Logo (static)
  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.setAttribute('aria-label', 'ITC Logo');
  const itcImg = document.createElement('img');
  itcImg.src = '/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp';
  itcImg.alt = 'ITC Logo';
  itcImg.className = 'object-fit-contain w-100 h-100 no-rendition';
  itcImg.loading = 'lazy';
  itcLink.append(itcImg);
  footerBrandLeft.append(itcLink);

  // FSSI Logo (static)
  const fssiDiv = document.createElement('div');
  fssiDiv.className = 'header-footer-brand-secondary--logo d-inline-block';
  const fssiImg = document.createElement('img');
  fssiImg.className = 'object-fit-contain w-100 no-rendition';
  fssiImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp';
  fssiImg.alt = 'FSSI Logo';
  fssiImg.loading = 'lazy';
  fssiDiv.append(fssiImg);
  footerBrandLeft.append(fssiDiv);

  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';

  // Group footer links into columns (static structure, dynamic content)
  const footerLinkColumns = [1, 2, 3, 4]; // Assuming 4 columns based on HTML
  const linksPerColumn = Math.ceil(footerLinks.length / footerLinkColumns.length);

  footerLinkColumns.forEach((_, colIndex) => {
    const listContainer = document.createElement('div');
    listContainer.className = 'header-footer-list-container';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const startIndex = colIndex * linksPerColumn;
    const endIndex = Math.min(startIndex + linksPerColumn, footerLinks.length);

    for (let i = startIndex; i < endIndex; i++) {
      const itemNode = footerLinks[i];
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');

      if (link && label) {
        const listItem = document.createElement('li');
        listItem.className = 'header-footer-list-item';
        const itemAnchor = document.createElement('a');
        itemAnchor.href = link.href || '#';
        itemAnchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
        itemAnchor.setAttribute('data-link-region', 'Footer List');
        itemAnchor.textContent = label.textContent;
        listItem.append(itemAnchor);
        ul.append(listItem);
        moveInstrumentation(itemNode, listItem);
      }
    }
    listContainer.append(ul);
    if (colIndex < 2) {
      footerNavbarLeft.append(listContainer);
    } else {
      // Assuming the last two columns go into footerNavbarRight
      if (!footerNavbar.querySelector('.header-footer-brand-navbar--right')) {
        const footerNavbarRight = document.createElement('div');
        footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbar.querySelector('.header-footer-brand-navbar--right').append(listContainer);
    }
  });

  footerNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand-right d-flex flex-column pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social-media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  if (footerSocialLinks.length > 0) {
    const socialList = document.createElement('ul');
    socialList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

    footerSocialLinks.forEach((itemNode) => {
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const icon = itemNode.querySelector('[data-aue-prop="icon"]');

      if (link && icon) {
        const listItem = document.createElement('li');
        listItem.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';
        const itemAnchor = document.createElement('a');
        itemAnchor.href = link.href || '#';
        itemAnchor.target = '_blank';
        itemAnchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
        itemAnchor.setAttribute('data-cta-region', 'Footer');
        itemAnchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
        itemAnchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
        itemAnchor.setAttribute('data-social-linktype', 'follow');

        const optimizedIcon = createOptimizedPicture(icon.src, icon.alt);
        optimizedIcon.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
        optimizedIcon.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
        itemAnchor.append(optimizedIcon);
        listItem.append(itemAnchor);
        socialList.append(listItem);
        moveInstrumentation(itemNode, listItem);
      }
    });
    socialMediaSection.append(socialList);
  }
  footerSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';

  // ITC Portal link (static)
  const itcPortalListItem = document.createElement('li');
  itcPortalListItem.className = 'header-footer-brand-left--item header-foot-link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalListItem.append(itcPortalLink);
  copyrightList.append(itcPortalListItem);
  copyrightSection.append(copyrightList);

  // Copyright text (static)
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  footerSecondaryContent.append(copyrightSection);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  section.append(submenuContainer);

  block.append(section);
  block.className = `header-section block`;
  block.dataset.blockStatus = 'loaded';
}
