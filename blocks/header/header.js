import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logoLink = block.querySelector('[data-aue-prop="logo"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const loginLabel = block.querySelector('[data-aue-prop="loginLabel"]');
  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  const brandLogo1 = block.querySelector('[data-aue-prop="brandLogo1"]');
  const brandLogo2 = block.querySelector('[data-aue-prop="brandLogo2"]');
  const footerMenuItems = block.querySelectorAll('[data-aue-model="footerMenuItem"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  const section = document.createElement('section');
  section.className = 'header-section-position-relative header-section-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-app-name d-none';
    appNameSpan.dataset.appName = appName.textContent.trim();
    appNameSpan.textContent = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    section.append(appNameSpan);
  }

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const divLeft = document.createElement('div');
  divLeft.className = 'd-flex w-25';
  headerContainer.append(divLeft);

  const divCenter = document.createElement('div');
  divCenter.className = 'd-flex justify-content-center w-25';
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.querySelector('a')?.href || '/';
    logoAnchor.className = 'header-analytics-cta-click';
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-logo d-flex align-items-center';
    const img = logoLink.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '100px' }]);
      picture.querySelector('img').className = 'header-logo-img';
      moveInstrumentation(img, picture.querySelector('img'));
      logoDiv.append(picture);
    }
    logoAnchor.append(logoDiv);
    moveInstrumentation(logoLink, logoAnchor);
    divCenter.append(logoAnchor);
  }
  headerContainer.append(divCenter);

  const divRight = document.createElement('div');
  divRight.className = 'd-flex w-25 justify-content-end';
  if (loginLink && loginLabel) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.querySelector('a')?.href || '#';
    loginAnchor.className = 'header-login-btn-wrapper header-analytics-cta-click';
    loginAnchor.style.display = 'inline';
    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLabel.textContent.trim();
    loginAnchor.append(loginButton);
    moveInstrumentation(loginLink, loginAnchor);
    moveInstrumentation(loginLabel, loginButton);
    divRight.append(loginAnchor);
  }
  headerContainer.append(divRight);
  section.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar start-0 bg-white position-absolute';

  if (menuItems.length > 0) {
    const sidebarMenu = document.createElement('ul');
    sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';
    menuItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';
      const linkElement = item.querySelector('[data-aue-prop="link"]');
      const iconElement = item.querySelector('[data-aue-prop="icon"]');
      const labelElement = item.querySelector('[data-aue-prop="label"]');

      if (linkElement && labelElement) {
        const anchor = document.createElement('a');
        anchor.href = linkElement.querySelector('a')?.href || '#';
        anchor.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium header-analytics-cta-click';
        anchor.dataset.consent = 'false'; // Default, adjust if needed
        anchor.dataset.link = linkElement.querySelector('a')?.dataset.link || '';

        if (iconElement) {
          const img = iconElement.querySelector('img');
          if (img) {
            const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '32px' }]);
            picture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
            moveInstrumentation(img, picture.querySelector('img'));
            anchor.append(picture);
          }
        }
        anchor.append(labelElement.textContent.trim());
        moveInstrumentation(linkElement, anchor);
        moveInstrumentation(labelElement, anchor);
        listItem.append(anchor);
      }
      moveInstrumentation(item, listItem);
      sidebarMenu.append(listItem);
    });
    sidebar.append(sidebarMenu);
  }

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.className = 'header-container';

  const footerBrandContent = document.createElement('div');
  footerBrandContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';
  if (brandLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = brandLogo1.querySelector('a')?.href || '#';
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'header-footer-brand-logo d-inline-block header-analytics-cta-click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');
    const img1 = brandLogo1.querySelector('img');
    if (img1) {
      const picture = createOptimizedPicture(img1.src, img1.alt, false, [{ width: '100px' }]);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      moveInstrumentation(img1, picture.querySelector('img'));
      logo1Anchor.append(picture);
    }
    moveInstrumentation(brandLogo1, logo1Anchor);
    footerBrandLeft.append(logo1Anchor);
  }

  if (brandLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand-secondary--logo d-inline-block';
    const img2 = brandLogo2.querySelector('img');
    if (img2) {
      const picture = createOptimizedPicture(img2.src, img2.alt, false, [{ width: '100px' }]);
      picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
      moveInstrumentation(img2, picture.querySelector('img'));
      logo2Div.append(picture);
    }
    moveInstrumentation(brandLogo2, logo2Div);
    footerBrandLeft.append(logo2Div);
  }
  footerBrandContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  if (footerMenuItems.length > 0) {
    const footerNavbar = document.createElement('nav');
    footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
    footerNavbar.setAttribute('aria-label', 'footer navbar');

    const footerNavbarLeft = document.createElement('div');
    footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';

    const footerNavbarRight = document.createElement('div');
    footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';

    let currentColumn = 0;
    const columns = [[], [], [], []]; // Max 4 columns based on example

    footerMenuItems.forEach((item) => {
      const linkElement = item.querySelector('[data-aue-prop="link"]');
      const labelElement = item.querySelector('[data-aue-prop="label"]');

      if (linkElement && labelElement) {
        const listItem = document.createElement('li');
        listItem.className = 'header-footer-list-item';
        const anchor = document.createElement('a');
        anchor.href = linkElement.querySelector('a')?.href || '#';
        anchor.className = 'header-cta-analytics header-analytics-cta-click header-footer-list-item--link d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        anchor.textContent = labelElement.textContent.trim();
        if (linkElement.querySelector('a')?.target) {
          anchor.target = linkElement.querySelector('a').target;
        }
        moveInstrumentation(linkElement, anchor);
        moveInstrumentation(labelElement, anchor);
        listItem.append(anchor);
        columns[currentColumn % 4].push(listItem);
        currentColumn++;
      }
      moveInstrumentation(item, item);
    });

    columns.forEach((colItems, index) => {
      if (colItems.length > 0) {
        const listContainer = document.createElement('div');
        listContainer.className = 'header-footer-list-container';
        const ul = document.createElement('ul');
        ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
        colItems.forEach((item) => ul.append(item));
        listContainer.append(ul);
        if (index < 2) {
          footerNavbarLeft.append(listContainer);
        } else {
          footerNavbarRight.append(listContainer);
        }
      }
    });

    footerNavbar.append(footerNavbarLeft, footerNavbarRight);
    footerBrandRight.append(footerNavbar);
  }
  footerBrandContent.append(footerBrandRight);
  footerBrandContainer.append(footerBrandContent);
  footerBrandPrimary.append(footerBrandContainer);
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

  if (socialLinks.length > 0) {
    const socialList = document.createElement('ul');
    socialList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

    socialLinks.forEach((item) => {
      const linkElement = item.querySelector('[data-aue-prop="link"]');
      const iconElement = item.querySelector('[data-aue-prop="icon"]');

      if (linkElement && iconElement) {
        const listItem = document.createElement('li');
        listItem.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';
        const anchor = document.createElement('a');
        anchor.href = linkElement.querySelector('a')?.href || '#';
        anchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics-cta-click';
        anchor.setAttribute('data-cta-region', 'Footer');
        anchor.setAttribute('data-cta-label', `footer-${linkElement.textContent.trim().toLowerCase()}`); // Infer label
        anchor.target = '_blank';
        anchor.setAttribute('data-platform-name', linkElement.textContent.trim().toLowerCase()); // Infer platform
        anchor.setAttribute('data-social-linktype', 'follow');

        const img = iconElement.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '32px' }]);
          picture.querySelector('img').setAttribute('aria-label', img.alt || '');
          picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
          moveInstrumentation(img, picture.querySelector('img'));
          anchor.append(picture);
        }
        moveInstrumentation(linkElement, anchor);
        moveInstrumentation(iconElement, anchor);
        listItem.append(anchor);
        socialList.append(listItem);
      }
      moveInstrumentation(item, listItem);
    });
    socialMediaSection.append(socialList);
  }
  footerSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';
  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';
  // Add ITC portal link if needed, not explicitly in JSON but in HTML
  const itcPortalItem = document.createElement('li');
  itcPortalItem.className = 'header-footer-brand-left--item header-foot-link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand-left--link header-analytics-cta-click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalItem.append(itcPortalLink);
  copyrightList.append(itcPortalItem);
  copyrightSection.append(copyrightList);

  if (copyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand-left--text text-white';
    copyrightSpan.textContent = copyright.textContent.trim();
    moveInstrumentation(copyright, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
    copyrightSection.append(copyrightDiv);
  }
  footerSecondaryContent.append(copyrightSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);
  sidebar.append(footerBrand);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';

  submenuContainer.append(sidebar, overlay);
  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
