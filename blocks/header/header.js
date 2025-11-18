import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, mainSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainSection.append(appNameSpan);

  // Header Container
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  mainSection.append(header);

  const headerRow = block.children[0];
  if (headerRow) {
    const headerCells = [...headerRow.children];

    // Left div (empty in provided HTML, but present in block structure)
    const leftDiv = document.createElement('div');
    leftDiv.className = 'header-d-flex header-w-25';
    header.append(leftDiv);

    // Center div (Logo)
    const centerDiv = document.createElement('div');
    centerDiv.className = 'header-d-flex  header-justify-content-center header-w-25';
    const logoLink = headerCells[0].querySelector('a'); // headerLogo field
    if (logoLink) {
      const newLogoLink = document.createElement('a');
      newLogoLink.href = logoLink.href;
      newLogoLink.className = 'header-analytics_cta_click';
      newLogoLink.setAttribute('data-ct', '');
      newLogoLink.setAttribute('a-label', 'header-logo-boing');
      moveInstrumentation(logoLink, newLogoLink);

      const logoDiv = document.createElement('div');
      logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

      const logoImg = logoLink.querySelector('img');
      if (logoImg) {
        const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
        moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
        logoDiv.append(optimizedLogoPic);
      }
      newLogoLink.append(logoDiv);
      centerDiv.append(newLogoLink);
    }
    header.append(centerDiv);

    // Right div (Login Button)
    const rightDiv = document.createElement('div');
    rightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
    const loginLink = headerCells[1].querySelector('a'); // loginButtonLink field
    if (loginLink) {
      const newLoginLink = document.createElement('a');
      newLoginLink.href = loginLink.href;
      newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
      newLoginLink.style.display = 'inline';
      moveInstrumentation(loginLink, newLoginLink);

      const loginButton = document.createElement('button');
      loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
      loginButton.textContent = loginLink.textContent.trim(); // loginButtonText field
      newLoginLink.append(loginButton);
      rightDiv.append(newLoginLink);
    }
    header.append(rightDiv);
  }

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  mainSection.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(sidebarMenu);

  // Header Menu Items
  const headerMenuItemsContainer = block.children[1]; // Assuming header menu items are in the second row
  if (headerMenuItemsContainer) {
    [...headerMenuItemsContainer.children].forEach((row) => {
      const li = document.createElement('li');
      li.className = 'header-sidebar__menu-item  header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
      moveInstrumentation(row, li);

      const link = row.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
        newLink.setAttribute('data-link', link.getAttribute('data-link'));
        moveInstrumentation(link, newLink);

        const img = link.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          newLink.append(optimizedPic);
        }
        newLink.append(document.createTextNode(link.textContent.trim()));
      }
      li.append(newLink);
      sidebarMenu.append(li);
    });
  }

  // Logout item (static from HTML, adjust if dynamic)
  const logoutLi = document.createElement('li');
  logoutLi.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
  logoutLi.style.display = 'none';
  logoutLi.innerHTML = `
    <a href="/" class="header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click" data-link="/content/boing/in/en/home">
      <img src="/content/dam/aemigrate/uploaded-folder/image/logout-3?fmt=webp-alpha.webp" alt="Logout" class="header-sidebar__menu-icon header-me-4" loading="lazy">
      Logout
    </a>
  `;
  sidebarMenu.append(logoutLi);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  aside.append(footerBrand);

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = '';
  footerBrand.append(footerPrimary);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';
  footerPrimary.append(footerContainer);

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerContainer.append(footerContent);

  // Footer Brand Left (Logos)
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerContent.append(footerBrandLeft);

  const footerLogosRow = block.children[2]; // Assuming footer logos are in the third row
  if (footerLogosRow) {
    const itcLogoLink = footerLogosRow.children[0].querySelector('a');
    if (itcLogoLink) {
      const newItcLink = document.createElement('a');
      newItcLink.href = itcLogoLink.href;
      newItcLink.target = '_blank';
      newItcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
      newItcLink.setAttribute('data-cta-region', 'Footer');
      newItcLink.setAttribute('aria-label', 'ITC Logo');
      moveInstrumentation(itcLogoLink, newItcLink);

      const itcImg = itcLogoLink.querySelector('img');
      if (itcImg) {
        const optimizedItcPic = createOptimizedPicture(itcImg.src, itcImg.alt);
        moveInstrumentation(itcImg, optimizedItcPic.querySelector('img'));
        optimizedItcPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100';
        optimizedItcPic.querySelector('img').setAttribute('loading', 'lazy');
        newItcLink.append(optimizedItcPic);
      }
      footerBrandLeft.append(newItcLink);
    }

    const fssiLogoDiv = footerLogosRow.children[1].querySelector('div');
    if (fssiLogoDiv) {
      const newFssiDiv = document.createElement('div');
      newFssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
      moveInstrumentation(fssiLogoDiv, newFssiDiv);

      const fssiImg = fssiLogoDiv.querySelector('img');
      if (fssiImg) {
        const optimizedFssiPic = createOptimizedPicture(fssiImg.src, fssiImg.alt);
        moveInstrumentation(fssiImg, optimizedFssiPic.querySelector('img'));
        optimizedFssiPic.querySelector('img').className = 'header-object-fit-contain header-w-100';
        optimizedFssiPic.querySelector('img').setAttribute('loading', 'lazy');
        newFssiDiv.append(optimizedFssiPic);
      }
      footerBrandLeft.append(newFssiDiv);
    }
  }

  // Footer Brand Right (Navigation)
  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  footerContent.append(footerBrandRight);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavRight);

  // Footer Menu Items
  const footerMenuItemsContainer = block.children[3]; // Assuming footer menu items start from the fourth row
  if (footerMenuItemsContainer) {
    [...footerMenuItemsContainer.children].forEach((cell, index) => {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';

      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
      moveInstrumentation(cell, ul);

      [...cell.children].forEach((linkWrapper) => {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        moveInstrumentation(linkWrapper, li);

        const link = linkWrapper.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) {
            newLink.target = link.target;
          }
          newLink.textContent = link.textContent.trim();
          moveInstrumentation(link, newLink);
          li.append(newLink);
        }
        ul.append(li);
      });
      footerListDiv.append(ul);

      if (index < 2) { // Assuming first two columns go to footerNavLeft
        footerNavLeft.append(footerListDiv);
      } else {
        footerNavRight.append(footerListDiv);
      }
    });
  }

  // Footer Secondary (Social Media and Copyright)
  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';
  footerBrand.append(footerSecondary);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondary.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  // Footer Social Media
  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  footerSecondaryContent.append(socialMediaSection);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  socialMediaSection.append(socialList);

  const footerSocialLinksContainer = block.children[4]; // Assuming social links are in the fifth row
  if (footerSocialLinksContainer) {
    [...footerSocialLinksContainer.children].forEach((cell) => {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
      moveInstrumentation(cell, li);

      const link = cell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
        newLink.target = '_blank';
        newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
        newLink.setAttribute('data-social-linktype', 'follow');
        moveInstrumentation(link, newLink);

        const img = link.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
          optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          newLink.append(optimizedPic);
        }
        li.append(newLink);
      }
      socialList.append(li);
    });
  }

  // Footer Copyright
  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(footerCopyrightSection);

  const footerCopyrightList = document.createElement('ul');
  footerCopyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  footerCopyrightSection.append(footerCopyrightList);

  const itcPortalLinkWrapper = block.children[5]; // Assuming ITC portal link is in the sixth row
  if (itcPortalLinkWrapper) {
    const itcPortalLink = itcPortalLinkWrapper.querySelector('a');
    if (itcPortalLink) {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__left--item header-foot_link';
      moveInstrumentation(itcPortalLinkWrapper, li);

      const newLink = document.createElement('a');
      newLink.href = itcPortalLink.href;
      newLink.target = '_blank';
      newLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.textContent = itcPortalLink.textContent.trim();
      moveInstrumentation(itcPortalLink, newLink);
      li.append(newLink);
      footerCopyrightList.append(li);
    }
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  footerCopyrightSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  // Assuming copyright text is in the last cell of the last row of the block
  const copyrightTextCell = block.children[6]?.children[0];
  if (copyrightTextCell) {
    copyrightSpan.textContent = copyrightTextCell.textContent.trim();
    moveInstrumentation(copyrightTextCell, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.'; // Fallback
  }
  copyrightDiv.append(copyrightSpan);

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  block.textContent = '';
  block.append(mainSection);
}
