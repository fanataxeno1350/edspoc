import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainRoot = document.createElement('section');
  mainRoot.classList.add('header-section-root', 'position-relative', 'mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-app-name', 'd-none');
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    appNameSpan.setAttribute('data-app-name', appName.textContent);
    moveInstrumentation(appName, appNameSpan);
  }
  mainRoot.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.classList.add('header-container', 'boing-container', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const headerLeftSection = document.createElement('div');
  headerLeftSection.classList.add('header-left-section', 'd-flex', 'w-25');
  const headerLeftImage = block.querySelector('[data-aue-prop="headerLeftImage"] img');
  if (headerLeftImage) {
    const pic = createOptimizedPicture(headerLeftImage.src, headerLeftImage.alt);
    headerLeftSection.append(pic);
    moveInstrumentation(headerLeftImage, pic.querySelector('img'));
  }
  headerContainer.append(headerLeftSection);

  const headerLogoWrapper = document.createElement('div');
  headerLogoWrapper.classList.add('header-logo-wrapper', 'd-flex', 'justify-content-center', 'w-25');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  if (headerLogoLink) {
    const logoLink = document.createElement('a');
    logoLink.href = headerLogoLink.href;
    logoLink.classList.add('header-logo-link', 'analytics_cta_click');
    logoLink.setAttribute('data-ct', '');
    logoLink.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(headerLogoLink, logoLink);

    const headerLogoDiv = document.createElement('div');
    headerLogoDiv.classList.add('header-logo', 'd-flex', 'align-items-center');
    const headerLogoImg = block.querySelector('[data-aue-prop="headerLogo"] img');
    if (headerLogoImg) {
      const pic = createOptimizedPicture(headerLogoImg.src, headerLogoImg.alt, false, [{ width: '750' }]);
      pic.querySelector('img').classList.add('header-logo-img');
      pic.querySelector('img').setAttribute('fetchpriority', 'high');
      pic.querySelector('img').setAttribute('loading', 'eager');
      headerLogoDiv.append(pic);
      moveInstrumentation(headerLogoImg, pic.querySelector('img'));
    }
    logoLink.append(headerLogoDiv);
    headerLogoWrapper.append(logoLink);
  }
  headerContainer.append(headerLogoWrapper);

  const headerRightSection = document.createElement('div');
  headerRightSection.classList.add('header-right-section', 'd-flex', 'w-25', 'justify-content-end');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const loginBtnWrapper = document.createElement('a');
    loginBtnWrapper.href = loginLink.href;
    loginBtnWrapper.classList.add('header-login-btn-wrapper', 'analytics_cta_click');
    loginBtnWrapper.style.display = 'inline';
    moveInstrumentation(loginLink, loginBtnWrapper);

    const loginBtn = document.createElement('button');
    loginBtn.classList.add('header-login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
    loginBtn.textContent = loginLink.textContent;
    loginBtnWrapper.append(loginBtn);
    headerRightSection.append(loginBtnWrapper);
  }
  headerContainer.append(headerRightSection);
  mainRoot.append(headerContainer);

  const headerSubmenuContainer = document.createElement('div');
  headerSubmenuContainer.classList.add('header-submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const headerSidebar = document.createElement('aside');
  headerSidebar.classList.add('header-sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('header-sidebar-menu', 'list-unstyled', 'px-4');
  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('header-sidebar-menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"] img');
    const label = item.querySelector('[data-aue-prop="label"]');

    if (link) {
      const menuLink = document.createElement('a');
      menuLink.href = link.href;
      menuLink.classList.add('header-sidebar-menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');
      menuLink.setAttribute('data-consent', 'false'); // Default, can be overridden if needed
      menuLink.setAttribute('data-link', link.href);
      moveInstrumentation(link, menuLink);

      if (icon) {
        const pic = createOptimizedPicture(icon.src, icon.alt);
        pic.querySelector('img').classList.add('header-sidebar-menu-icon', 'me-4');
        menuLink.append(pic);
        moveInstrumentation(icon, pic.querySelector('img'));
      }

      if (label) {
        menuLink.append(label.textContent);
        moveInstrumentation(label, menuLink);
      }
      listItem.append(menuLink);
    }
    sidebarMenu.append(listItem);
  });
  headerSidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar-curve');
  headerSidebar.append(sidebarCurve);

  const headerFooterBrand = document.createElement('div');
  headerFooterBrand.classList.add('header-footer-brand', 'w-100', 'bg-boing-neutral-gray-600');

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.classList.add('header-footer-brand__primary');
  footerPrimarySection.style.backgroundColor = '';

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.classList.add('header-container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const footerPrimaryLogo = block.querySelector('[data-aue-prop="footerPrimaryLogo"] img');
  if (footerPrimaryLogo) {
    const logoLink = document.createElement('a');
    logoLink.href = 'https://www.itcportal.com/'; // Hardcoded from HTML
    logoLink.target = '_blank';
    logoLink.classList.add('header-footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
    logoLink.setAttribute('data-cta-region', 'Footer');
    logoLink.setAttribute('aria-label', 'ITC Logo');

    const pic = createOptimizedPicture(footerPrimaryLogo.src, footerPrimaryLogo.alt);
    pic.querySelector('img').classList.add('header-object-fit-contain', 'w-100', 'h-100', 'header-no-rendition');
    logoLink.append(pic);
    moveInstrumentation(footerPrimaryLogo, pic.querySelector('img'));
    footerBrandLeft.append(logoLink);
  }

  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"] img');
  if (footerSecondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('header-footer-brand__secondary--logo', 'd-inline-block');

    const pic = createOptimizedPicture(footerSecondaryLogo.src, footerSecondaryLogo.alt);
    pic.querySelector('img').classList.add('header-object-fit-contain', 'w-100', 'header-no-rendition');
    secondaryLogoDiv.append(pic);
    moveInstrumentation(footerSecondaryLogo, pic.querySelector('img'));
    footerBrandLeft.append(secondaryLogoDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');
  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerListItems = block.querySelectorAll('[data-aue-model="footerListItem"]');
  // Group footer list items into two columns based on original HTML structure
  const footerListColumns = [[], []];
  footerListItems.forEach((item, index) => {
    footerListColumns[index % 2].push(item);
  });

  footerListColumns.forEach((columnItems) => {
    if (columnItems.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('header-footerList');
      const ul = document.createElement('ul');
      ul.classList.add('header-footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

      columnItems.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('header-footer-list__item');
        const footerLink = item.querySelector('[data-aue-prop="footerLink"]');
        const footerLabel = item.querySelector('[data-aue-prop="footerLabel"]');

        if (footerLink) {
          const link = document.createElement('a');
          link.href = footerLink.href;
          link.classList.add('header-cta-analytics', 'analytics_cta_click', 'header-footer-list__item--link', 'd-inline-block');
          link.setAttribute('data-link-region', 'Footer List');
          if (footerLink.target) {
            link.target = footerLink.target;
          }
          link.textContent = footerLabel ? footerLabel.textContent : footerLink.textContent;
          moveInstrumentation(footerLink, link);
          if (footerLabel) moveInstrumentation(footerLabel, link);
          li.append(link);
        }
        ul.append(li);
      });
      footerListDiv.append(ul);
      footerNavbarLeft.append(footerListDiv);
    }
  });
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  // Assuming more footer list items might go here, for now, it's empty based on current structure
  // You would apply similar logic as footerListColumns if there were distinct right-side footer lists
  footerNavbar.append(footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerPrimaryContainer);
  headerFooterBrand.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.classList.add('header-footer-brand__secondary');
  footerSecondarySection.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('header-footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const socialUrl = item.querySelector('[data-aue-prop="socialUrl"]');
    const socialIcon = item.querySelector('[data-aue-prop="socialIcon"] img');

    if (socialUrl) {
      const link = document.createElement('a');
      link.href = socialUrl.href;
      link.target = '_blank';
      link.classList.add('header-footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${socialIcon.alt.toLowerCase()}`); // Assuming alt text is platform name
      link.setAttribute('data-platform-name', socialIcon.alt.toLowerCase());
      link.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(socialUrl, link);

      if (socialIcon) {
        const pic = createOptimizedPicture(socialIcon.src, socialIcon.alt);
        pic.querySelector('img').classList.add('header-object-fit-contain', 'w-100', 'h-100', 'header-no-rendition');
        pic.querySelector('img').setAttribute('aria-label', socialIcon.alt);
        link.append(pic);
        moveInstrumentation(socialIcon, pic.querySelector('img'));
      }
      li.append(link);
    }
    socialList.append(li);
  });
  socialMediaSection.append(socialList);
  footerSecondaryContent.append(socialMediaSection);

  const footerBottomLeft = document.createElement('section');
  footerBottomLeft.classList.add('header-footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const footerBottomLeftList = document.createElement('ul');
  footerBottomLeftList.classList.add('header-footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const footerLeftLink = block.querySelector('[data-aue-prop="footerLeftLink"]');
  if (footerLeftLink) {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__left--item', 'header-foot_link');
    const link = document.createElement('a');
    link.href = footerLeftLink.href;
    link.target = '_blank';
    link.classList.add('header-footer-brand__left--link', 'analytics_cta_click');
    link.setAttribute('data-cta-region', 'Footer');
    link.textContent = footerLeftLink.textContent;
    moveInstrumentation(footerLeftLink, link);
    li.append(link);
    footerBottomLeftList.append(li);
  }
  footerBottomLeft.append(footerBottomLeftList);

  const footerCopyrightDiv = document.createElement('div');
  footerCopyrightDiv.classList.add('header-footer-brand__left--copyright', 'text-center');
  const footerCopyrightSpan = document.createElement('span');
  footerCopyrightSpan.classList.add('header-footer-brand__left--text', 'text-white');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');
  if (footerCopyright) {
    footerCopyrightSpan.textContent = footerCopyright.textContent;
    moveInstrumentation(footerCopyright, footerCopyrightSpan);
  }
  footerCopyrightDiv.append(footerCopyrightSpan);
  footerBottomLeft.append(footerCopyrightDiv);
  footerSecondaryContent.append(footerBottomLeft);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  headerFooterBrand.append(footerSecondarySection);

  headerSidebar.append(headerFooterBrand);
  headerSubmenuContainer.append(headerSidebar);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  headerSubmenuContainer.append(overlay);

  mainRoot.append(headerSubmenuContainer);

  block.textContent = '';
  block.append(mainRoot);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
