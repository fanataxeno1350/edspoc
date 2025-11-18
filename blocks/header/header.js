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
  appNameSpan.textContent = 'boing'; // Default value, will be overwritten by block content if available
  mainSection.append(appNameSpan);

  // Header Container
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  mainSection.append(headerContainer);

  // Left div (for menu icon)
  const leftDiv = document.createElement('div');
  leftDiv.className = 'header-d-flex header-w-25';
  headerContainer.append(leftDiv);

  // Center div (for logo)
  const centerDiv = document.createElement('div');
  centerDiv.className = 'header-d-flex  header-justify-content-center header-w-25';
  headerContainer.append(centerDiv);

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  centerDiv.append(logoLink);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  logoLink.append(logoDiv);

  const logoImg = document.createElement('img');
  logoImg.className = 'header-header__logo-img';
  logoDiv.append(logoImg);

  // Right div (for login button)
  const rightDiv = document.createElement('div');
  rightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  headerContainer.append(rightDiv);

  const loginLink = document.createElement('a');
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  rightDiv.append(loginLink);

  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginLink.append(loginButton);

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

  // Footer Brand Container
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  aside.append(footerBrand);

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerBrand.append(footerPrimary);

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  footerPrimary.append(footerPrimaryContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerPrimaryContainer.append(footerPrimaryContent);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerPrimaryContent.append(footerLeftSection);

  const itcLink = document.createElement('a');
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.setAttribute('aria-label', 'ITC Logo');
  footerLeftSection.append(itcLink);

  const itcImg = document.createElement('img');
  itcImg.className = 'header-object-fit-contain header-w-100 header-h-100';
  itcImg.setAttribute('loading', 'lazy');
  itcLink.append(itcImg);

  const fssiDiv = document.createElement('div');
  fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  footerLeftSection.append(fssiDiv);

  const fssiImg = document.createElement('img');
  fssiImg.className = 'header-object-fit-contain header-w-100';
  fssiImg.setAttribute('loading', 'lazy');
  fssiDiv.append(fssiImg);

  const footerRightSection = document.createElement('section');
  footerRightSection.className = 'header-footer-brand__right';
  footerPrimaryContent.append(footerRightSection);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerRightSection.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavRight);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerBrand.append(footerSecondary);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondary.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

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

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(copyrightSection);

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  copyrightSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightDiv.append(copyrightSpan);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  // Loop through block children to extract data
  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, mainSection.children[rowIndex]); // Transfer instrumentation to the corresponding new element

    const cells = [...row.children];

    // Row 1: App Name, Logo Image, Login Button
    if (rowIndex === 0) {
      // App Name
      const appNameCell = cells[0];
      if (appNameCell) {
        appNameSpan.textContent = appNameCell.textContent.trim();
      }

      // Logo Image
      const logoImageCell = cells[1];
      if (logoImageCell) {
        const img = logoImageCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          logoImg.replaceWith(optimizedPic);
          logoImg.src = optimizedPic.querySelector('img').src;
          logoImg.alt = optimizedPic.querySelector('img').alt;
        }
      }

      // Login Button
      const loginButtonCell = cells[2];
      if (loginButtonCell) {
        const link = loginButtonCell.querySelector('a');
        const button = loginButtonCell.querySelector('button');
        if (link) {
          loginLink.href = link.href;
          loginLink.setAttribute('data-ct', link.getAttribute('data-ct') || '');
        }
        if (button) {
          loginButton.textContent = button.textContent.trim();
        }
      }
    }

    // Menu Items
    if (rowIndex === 1) {
      const menuItemsCell = cells[0];
      if (menuItemsCell) {
        const menuListItems = menuItemsCell.querySelectorAll('li');
        menuListItems.forEach((menuItem) => {
          const li = document.createElement('li');
          moveInstrumentation(menuItem, li);
          li.className = 'header-sidebar__menu-item  header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

          const link = menuItem.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
            newLink.setAttribute('data-link', link.getAttribute('data-link') || '');

            const img = link.querySelector('img');
            if (img) {
              const optimizedPic = createOptimizedPicture(img.src, img.alt);
              moveInstrumentation(img, optimizedPic.querySelector('img'));
              optimizedPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
              optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
              newLink.append(optimizedPic);
            }
            newLink.append(document.createTextNode(link.textContent.trim()));
            li.append(newLink);
          }
          sidebarMenu.append(li);
        });
      }
    }

    // Footer List Items
    if (rowIndex === 2) {
      const footerListItemsCell = cells[0];
      if (footerListItemsCell) {
        const footerLists = footerListItemsCell.querySelectorAll('.header-footerList');
        footerLists.forEach((footerList, listIndex) => {
          const ul = document.createElement('ul');
          ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
          moveInstrumentation(footerList, ul);

          const listItems = footerList.querySelectorAll('li');
          listItems.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'header-footer-list__item';
            moveInstrumentation(item, li);

            const link = item.querySelector('a');
            if (link) {
              const newLink = document.createElement('a');
              newLink.href = link.href;
              newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
              newLink.setAttribute('data-link-region', link.getAttribute('data-link-region') || 'Footer List');
              if (link.target) {
                newLink.target = link.target;
              }
              newLink.textContent = link.textContent.trim();
              li.append(newLink);
            }
            ul.append(li);
          });

          if (listIndex === 0) {
            footerNavLeft.append(ul);
          } else if (listIndex === 1) {
            footerNavLeft.append(ul);
          } else if (listIndex === 2) {
            footerNavRight.append(ul);
          } else if (listIndex === 3) {
            footerNavRight.append(ul);
          }
        });
      }
    }

    // Social Links
    if (rowIndex === 3) {
      const socialLinksCell = cells[0];
      if (socialLinksCell) {
        const socialItems = socialLinksCell.querySelectorAll('li');
        socialItems.forEach((socialItem) => {
          const li = document.createElement('li');
          li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
          moveInstrumentation(socialItem, li);

          const link = socialItem.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
            newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region') || 'Footer');
            newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || '');
            newLink.setAttribute('target', '_blank');
            newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || '');
            newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype') || 'follow');

            const img = link.querySelector('img');
            if (img) {
              const optimizedPic = createOptimizedPicture(img.src, img.alt);
              moveInstrumentation(img, optimizedPic.querySelector('img'));
              optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100';
              optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
              newLink.append(optimizedPic);
            }
            li.append(newLink);
          }
          socialList.append(li);
        });
      }
    }

    // Footer Copyright
    if (rowIndex === 4) {
      const copyrightCell = cells[0];
      if (copyrightCell) {
        copyrightSpan.textContent = copyrightCell.textContent.trim();
      }
    }
  });

  // Clear the original block content and append the new structure
  block.textContent = '';
  block.append(mainSection);
}
