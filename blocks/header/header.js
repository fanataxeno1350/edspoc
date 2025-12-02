import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerLeftLink = block.querySelector('[data-aue-prop="footerLeftLink"]');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');

  const section = document.createElement('section');
  section.classList.add('header-position-relative', 'header-mb-15');
  moveInstrumentation(block, section);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-d-none', 'header-app-name');
  appNameSpan.setAttribute('data-app-name', appName?.textContent || '');
  if (appName) {
    appNameSpan.append(...appName.childNodes);
    moveInstrumentation(appName, appNameSpan);
  }
  section.append(appNameSpan);

  // Header Container
  const header = document.createElement('header');
  header.classList.add('header-boing-container', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerDiv1 = document.createElement('div');
  headerDiv1.classList.add('header-d-flex', 'header-w-25');
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  const logoAnchor = document.createElement('a');
  logoAnchor.classList.add('header-analytics_cta_click');
  logoAnchor.setAttribute('data-ct', '');
  logoAnchor.setAttribute('a-label', 'header-logo-boing');
  if (logoLink) {
    logoAnchor.href = logoLink.href || '/';
    moveInstrumentation(logoLink, logoAnchor);
  } else {
    logoAnchor.href = '/';
  }
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header__logo', 'header-d-flex', 'header-align-items-center');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    logoDiv.append(pic);
    moveInstrumentation(logoImage, pic.querySelector('img'));
  }
  logoAnchor.append(logoDiv);
  headerDiv2.append(logoAnchor);
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  const loginAnchor = document.createElement('a');
  loginAnchor.classList.add('header__login-btn-wrapper', 'header-analytics_cta_click');
  loginAnchor.style.display = 'inline';
  if (loginLink) {
    loginAnchor.href = loginLink.href || '/login.html';
    moveInstrumentation(loginLink, loginAnchor);
  } else {
    loginAnchor.href = '/login.html';
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add('header__login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
  if (loginText) {
    loginButton.append(...loginText.childNodes);
    moveInstrumentation(loginText, loginButton);
  } else {
    loginButton.textContent = 'Login';
  }
  loginAnchor.append(loginButton);
  headerDiv3.append(loginAnchor);
  header.append(headerDiv3);
  section.append(header);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const menuUL = document.createElement('ul');
  menuUL.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  menuItems.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');
    moveInstrumentation(item, li);

    const link = item.querySelector('[data-aue-prop="link"]');
    const text = item.querySelector('[data-aue-prop="text"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');

    const anchor = document.createElement('a');
    anchor.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
    if (link) {
      anchor.href = link.href || '#';
      anchor.setAttribute('data-link', link.getAttribute('data-link') || '');
      moveInstrumentation(link, anchor);
    } else {
      anchor.href = '#';
    }

    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      pic.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
      pic.querySelector('img').setAttribute('loading', 'lazy');
      anchor.append(pic);
      moveInstrumentation(icon, pic.querySelector('img'));
    }
    if (text) {
      anchor.append(...text.childNodes);
      moveInstrumentation(text, anchor);
    }
    li.append(anchor);
    menuUL.append(li);
  });
  aside.append(menuUL);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('header-footer-brand__primary');
  footerPrimary.style.backgroundColor = '';
  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.classList.add('header-container');
  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  if (footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = footerLogo1.closest('a')?.href || '#';
    logo1Anchor.target = '_blank';
    logo1Anchor.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');
    const pic1 = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    pic1.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100');
    pic1.querySelector('img').setAttribute('loading', 'lazy');
    logo1Anchor.append(pic1);
    moveInstrumentation(footerLogo1, pic1.querySelector('img'));
    footerBrandLeft.append(logo1Anchor);
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
    const pic2 = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    pic2.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100');
    pic2.querySelector('img').setAttribute('loading', 'lazy');
    logo2Div.append(pic2);
    moveInstrumentation(footerLogo2, pic2.querySelector('img'));
    footerBrandLeft.append(logo2Div);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');
  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const footerListItems = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const numLists = Math.ceil(footerListItems.length / 3); // Assuming 3 items per list for 4 lists

  for (let i = 0; i < numLists; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('header-footerList');
    const footerUL = document.createElement('ul');
    footerUL.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');

    for (let j = 0; j < 3; j += 1) {
      const itemIndex = (i * 3) + j;
      if (itemIndex < footerListItems.length) {
        const item = footerListItems[itemIndex];
        const li = document.createElement('li');
        li.classList.add('header-footer-list__item');
        moveInstrumentation(item, li);

        const link = item.querySelector('[data-aue-prop="link"]');
        const text = item.querySelector('[data-aue-prop="text"]');

        const anchor = document.createElement('a');
        anchor.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
        anchor.setAttribute('data-link-region', 'Footer List');
        if (link) {
          anchor.href = link.href || '#';
          if (link.target) anchor.target = link.target;
          moveInstrumentation(link, anchor);
        } else {
          anchor.href = '#';
        }
        if (text) {
          anchor.append(...text.childNodes);
          moveInstrumentation(text, anchor);
        }
        li.append(anchor);
        footerUL.append(li);
      }
    }
    footerListDiv.append(footerUL);
    if (i < 2) {
      footerNavbarLeft.append(footerListDiv);
    } else {
      // For the example HTML, there are 4 lists, two in left and two in right
      // This logic might need adjustment based on the actual number of lists
      // and how they are split between left and right in the authored content.
      // For now, assuming the first two go to left and the rest to right.
      // A more robust solution would be to have separate multifields for left/right footer lists.
      let footerNavbarRight = footerNavbar.querySelector('.header-footer-brand__navbar--right');
      if (!footerNavbarRight) {
        footerNavbarRight = document.createElement('div');
        footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbarRight.append(footerListDiv);
    }
  }

  footerNavbar.append(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.classList.add('header-footer-brand__secondary');
  footerSecondary.style.backgroundColor = '';
  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('header-container');
  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const socialRight = document.createElement('section');
  socialRight.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialRight.append(socialTitle);

  const socialUL = document.createElement('ul');
  socialUL.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  const footerSocials = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocials.forEach((socialItem) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
    moveInstrumentation(socialItem, li);

    const link = socialItem.querySelector('[data-aue-prop="link"]');
    const icon = socialItem.querySelector('[data-aue-prop="icon"]');

    const anchor = document.createElement('a');
    anchor.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');
    if (link) {
      anchor.href = link.href || '#';
      anchor.target = '_blank';
      anchor.setAttribute('data-cta-label', `footer-${link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : 'youtube'}`);
      anchor.setAttribute('data-platform-name', link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : 'youtube');
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);
    } else {
      anchor.href = '#';
    }

    if (icon) {
      const pic = createOptimizedPicture(icon.src, icon.alt);
      pic.querySelector('img').setAttribute('aria-label', icon.alt || '');
      pic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100');
      pic.querySelector('img').setAttribute('loading', 'lazy');
      anchor.append(pic);
      moveInstrumentation(icon, pic.querySelector('img'));
    }
    li.append(anchor);
    socialUL.append(li);
  });
  socialRight.append(socialUL);
  footerSecondaryContent.append(socialRight);

  const footerLeftBottom = document.createElement('section');
  footerLeftBottom.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');
  const footerLeftBottomUL = document.createElement('ul');
  footerLeftBottomUL.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');

  if (footerLeftLink) {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__left--item', 'header-foot_link');
    const anchor = document.createElement('a');
    anchor.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.href = footerLeftLink.href || '#';
    if (footerLeftLink.target) anchor.target = footerLeftLink.target;
    anchor.append(...footerLeftLink.childNodes);
    moveInstrumentation(footerLeftLink, anchor);
    li.append(anchor);
    footerLeftBottomUL.append(li);
  }
  footerLeftBottom.append(footerLeftBottomUL);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
  if (footerCopyright) {
    copyrightSpan.append(...footerCopyright.childNodes);
    moveInstrumentation(footerCopyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerLeftBottom.append(copyrightDiv);
  footerSecondaryContent.append(footerLeftBottom);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlay);

  section.append(submenuContainer);

  block.innerHTML = '';
  block.append(section);
}
