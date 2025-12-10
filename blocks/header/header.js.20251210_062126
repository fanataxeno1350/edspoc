import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const headerSectionWrapper = document.createElement('section');
  headerSectionWrapper.className = 'header-section-wrapper position-relative mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  headerSectionWrapper.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  // Left Section Image
  const headerLeftSection = document.createElement('div');
  headerLeftSection.className = 'header-left-section d-flex w-25';
  const leftImage = block.querySelector('[data-aue-prop="leftImage"]');
  if (leftImage) {
    const img = leftImage.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      headerLeftSection.append(pic);
    } else {
      // If it's a link to an image, create an img element
      const anchor = leftImage.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".webp"]');
      if (anchor) {
        const newImg = document.createElement('img');
        newImg.src = anchor.href;
        newImg.alt = anchor.title || '';
        newImg.loading = 'eager';
        const pic = createOptimizedPicture(newImg.src, newImg.alt);
        moveInstrumentation(anchor, pic.querySelector('img'));
        headerLeftSection.append(pic);
      } else {
        headerLeftSection.append(...leftImage.childNodes);
        moveInstrumentation(leftImage, headerLeftSection);
      }
    }
  }
  headerContainer.append(headerLeftSection);

  // Center Logo
  const headerCenterSection = document.createElement('div');
  headerCenterSection.className = 'header-center-section d-flex justify-content-center w-25';
  const centerLogoLinkWrapper = document.createElement('a');
  centerLogoLinkWrapper.className = 'header-cta-link analytics_cta_click';
  const centerLogoLink = block.querySelector('[data-aue-prop="centerLogoLink"]');
  if (centerLogoLink) {
    const anchor = centerLogoLink.querySelector('a');
    if (anchor) {
      centerLogoLinkWrapper.href = anchor.href;
      centerLogoLinkWrapper.setAttribute('data-ct', anchor.getAttribute('data-ct') || '');
      centerLogoLinkWrapper.setAttribute('a-label', anchor.getAttribute('a-label') || '');
      moveInstrumentation(anchor, centerLogoLinkWrapper);
    } else {
      centerLogoLinkWrapper.href = centerLogoLink.textContent.trim();
      moveInstrumentation(centerLogoLink, centerLogoLinkWrapper);
    }
  }

  const headerLogoWrapper = document.createElement('div');
  headerLogoWrapper.className = 'header-logo-wrapper d-flex align-items-center';
  const centerLogo = block.querySelector('[data-aue-prop="centerLogo"]');
  if (centerLogo) {
    const img = centerLogo.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      pic.querySelector('img').className = 'header-logo-img';
      pic.querySelector('img').setAttribute('fetchpriority', 'high');
      pic.querySelector('img').setAttribute('loading', 'eager');
      moveInstrumentation(img, pic.querySelector('img'));
      headerLogoWrapper.append(pic);
    } else {
      const anchor = centerLogo.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".webp"]');
      if (anchor) {
        const newImg = document.createElement('img');
        newImg.src = anchor.href;
        newImg.alt = anchor.title || '';
        newImg.className = 'header-logo-img';
        newImg.setAttribute('fetchpriority', 'high');
        newImg.setAttribute('loading', 'eager');
        const pic = createOptimizedPicture(newImg.src, newImg.alt, false, [{ width: '750' }]);
        pic.querySelector('img').className = 'header-logo-img';
        pic.querySelector('img').setAttribute('fetchpriority', 'high');
        pic.querySelector('img').setAttribute('loading', 'eager');
        moveInstrumentation(anchor, pic.querySelector('img'));
        headerLogoWrapper.append(pic);
      } else {
        headerLogoWrapper.append(...centerLogo.childNodes);
        moveInstrumentation(centerLogo, headerLogoWrapper);
      }
    }
  }
  centerLogoLinkWrapper.append(headerLogoWrapper);
  headerCenterSection.append(centerLogoLinkWrapper);
  headerContainer.append(headerCenterSection);

  // Right Section Login Button
  const headerRightSection = document.createElement('div');
  headerRightSection.className = 'header-right-section d-flex w-25 justify-content-end';
  const loginLinkWrapper = document.createElement('a');
  loginLinkWrapper.className = 'header-login-btn-wrapper analytics_cta_click';
  loginLinkWrapper.style.display = 'inline';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const anchor = loginLink.querySelector('a');
    if (anchor) {
      loginLinkWrapper.href = anchor.href;
      moveInstrumentation(anchor, loginLinkWrapper);
    } else {
      loginLinkWrapper.href = loginLink.textContent.trim();
      moveInstrumentation(loginLink, loginLinkWrapper);
    }
  }

  const loginButton = document.createElement('button');
  loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  if (loginText) {
    loginButton.textContent = loginText.textContent;
    moveInstrumentation(loginText, loginButton);
  } else {
    loginButton.textContent = 'Login'; // Default text if not authored
  }
  loginLinkWrapper.append(loginButton);
  headerRightSection.append(loginLinkWrapper);
  headerContainer.append(headerRightSection);
  headerSectionWrapper.append(headerContainer);

  // Submenu Container (Sidebar)
  const headerSubmenuContainer = document.createElement('div');
  headerSubmenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const headerSidebar = document.createElement('aside');
  headerSidebar.className = 'header-sidebar start-0 bg-white position-absolute';

  const headerSidebarMenu = document.createElement('ul');
  headerSidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';

    const linkWrapper = document.createElement('a');
    linkWrapper.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';

    const link = item.querySelector('[data-aue-prop="link"]');
    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        linkWrapper.href = anchor.href;
        linkWrapper.setAttribute('data-consent', anchor.getAttribute('data-consent') || 'false');
        linkWrapper.setAttribute('data-link', anchor.getAttribute('data-link') || '');
        moveInstrumentation(anchor, linkWrapper);
      } else {
        linkWrapper.href = link.textContent.trim();
        moveInstrumentation(link, linkWrapper);
      }
    }

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]);
        pic.querySelector('img').className = 'header-sidebar-menu-icon me-4';
        pic.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(img, pic.querySelector('img'));
        linkWrapper.append(pic);
      } else {
        const anchor = icon.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".webp"]');
        if (anchor) {
          const newImg = document.createElement('img');
          newImg.src = anchor.href;
          newImg.alt = anchor.title || '';
          newImg.className = 'header-sidebar-menu-icon me-4';
          newImg.setAttribute('loading', 'lazy');
          const pic = createOptimizedPicture(newImg.src, newImg.alt, false, [{ width: '48' }]);
          pic.querySelector('img').className = 'header-sidebar-menu-icon me-4';
          pic.querySelector('img').setAttribute('loading', 'lazy');
          moveInstrumentation(anchor, pic.querySelector('img'));
          linkWrapper.append(pic);
        } else {
          linkWrapper.append(...icon.childNodes);
          moveInstrumentation(icon, linkWrapper);
        }
      }
    }

    const text = item.querySelector('[data-aue-prop="text"]');
    if (text) {
      linkWrapper.append(text.textContent);
      moveInstrumentation(text, linkWrapper);
    }

    listItem.append(linkWrapper);
    headerSidebarMenu.append(listItem);
  });
  headerSidebar.append(headerSidebarMenu);

  const headerSidebarCurve = document.createElement('div');
  headerSidebarCurve.className = 'header-sidebar-curve';
  headerSidebar.append(headerSidebarCurve);

  // Footer Brand Section
  const headerFooterBrand = document.createElement('div');
  headerFooterBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const headerFooterBrandPrimary = document.createElement('section');
  headerFooterBrandPrimary.className = 'header-footer-brand-primary';
  headerFooterBrandPrimary.style.backgroundColor = '';

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  // Footer Logo 1
  const footerLogo1LinkWrapper = document.createElement('a');
  footerLogo1LinkWrapper.className = 'header-footer-brand-logo d-inline-block analytics_cta_click';
  footerLogo1LinkWrapper.setAttribute('data-cta-region', 'Footer');
  footerLogo1LinkWrapper.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1Link = block.querySelector('[data-aue-prop="footerLogo1Link"]');
  if (footerLogo1Link) {
    const anchor = footerLogo1Link.querySelector('a');
    if (anchor) {
      footerLogo1LinkWrapper.href = anchor.href;
      footerLogo1LinkWrapper.target = '_blank';
      moveInstrumentation(anchor, footerLogo1LinkWrapper);
    } else {
      footerLogo1LinkWrapper.href = footerLogo1Link.textContent.trim();
      footerLogo1LinkWrapper.target = '_blank';
      moveInstrumentation(footerLogo1Link, footerLogo1LinkWrapper);
    }
  }

  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1) {
    const img = footerLogo1.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
      pic.querySelector('img').className = 'header-object-fit-contain w-100 h-100 no-rendition';
      pic.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(img, pic.querySelector('img'));
      footerLogo1LinkWrapper.append(pic);
    } else {
      const anchor = footerLogo1.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".webp"]');
      if (anchor) {
        const newImg = document.createElement('img');
        newImg.src = anchor.href;
        newImg.alt = anchor.title || '';
        newImg.className = 'header-object-fit-contain w-100 h-100 no-rendition';
        newImg.setAttribute('loading', 'lazy');
        const pic = createOptimizedPicture(newImg.src, newImg.alt, false, [{ width: '150' }]);
        pic.querySelector('img').className = 'header-object-fit-contain w-100 h-100 no-rendition';
        pic.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(anchor, pic.querySelector('img'));
        footerLogo1LinkWrapper.append(pic);
      } else {
        footerLogo1LinkWrapper.append(...footerLogo1.childNodes);
        moveInstrumentation(footerLogo1, footerLogo1LinkWrapper);
      }
    }
  }
  footerBrandLeft.append(footerLogo1LinkWrapper);

  // Footer Logo 2
  const footerLogo2Wrapper = document.createElement('div');
  footerLogo2Wrapper.className = 'header-footer-brand-secondary--logo d-inline-block';
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2) {
    const img = footerLogo2.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
      pic.querySelector('img').className = 'header-object-fit-contain w-100 no-rendition';
      pic.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(img, pic.querySelector('img'));
      footerLogo2Wrapper.append(pic);
    } else {
      const anchor = footerLogo2.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".webp"]');
      if (anchor) {
        const newImg = document.createElement('img');
        newImg.src = anchor.href;
        newImg.alt = anchor.title || '';
        newImg.className = 'header-object-fit-contain w-100 no-rendition';
        newImg.setAttribute('loading', 'lazy');
        const pic = createOptimizedPicture(newImg.src, newImg.alt, false, [{ width: '150' }]);
        pic.querySelector('img').className = 'header-object-fit-contain w-100 no-rendition';
        pic.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(anchor, pic.querySelector('img'));
        footerLogo2Wrapper.append(pic);
      } else {
        footerLogo2Wrapper.append(...footerLogo2.childNodes);
        moveInstrumentation(footerLogo2, footerLogo2Wrapper);
      }
    }
  }
  footerBrandLeft.append(footerLogo2Wrapper);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';
  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row';

  // Footer Column 1
  const footerColumn1Wrapper = document.createElement('div');
  footerColumn1Wrapper.className = 'header-footer-list-wrapper';
  const footerColumn1List = document.createElement('ul');
  footerColumn1List.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
  const footerColumn1Items = block.querySelectorAll('[data-aue-model="footerColumnItem"][data-aue-filter="footerColumn1"]');
  footerColumn1Items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-list-item';
    const linkWrapper = document.createElement('a');
    linkWrapper.className = 'header-cta-analytics analytics_cta_click header-footer-list-item--link d-inline-block';
    linkWrapper.setAttribute('data-link-region', 'Footer List');

    const link = item.querySelector('[data-aue-prop="link"]');
    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        linkWrapper.href = anchor.href;
        if (anchor.target) linkWrapper.target = anchor.target;
        moveInstrumentation(anchor, linkWrapper);
      } else {
        linkWrapper.href = link.textContent.trim();
        moveInstrumentation(link, linkWrapper);
      }
    }
    const text = item.querySelector('[data-aue-prop="text"]');
    if (text) {
      linkWrapper.textContent = text.textContent;
      moveInstrumentation(text, linkWrapper);
    }
    listItem.append(linkWrapper);
    footerColumn1List.append(listItem);
  });
  footerColumn1Wrapper.append(footerColumn1List);
  footerNavbarLeft.append(footerColumn1Wrapper);

  // Footer Column 2
  const footerColumn2Wrapper = document.createElement('div');
  footerColumn2Wrapper.className = 'header-footer-list-wrapper';
  const footerColumn2List = document.createElement('ul');
  footerColumn2List.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
  const footerColumn2Items = block.querySelectorAll('[data-aue-model="footerColumnItem"][data-aue-filter="footerColumn2"]');
  footerColumn2Items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-list-item';
    const linkWrapper = document.createElement('a');
    linkWrapper.className = 'header-cta-analytics analytics_cta_click header-footer-list-item--link d-inline-block';
    linkWrapper.setAttribute('data-link-region', 'Footer List');

    const link = item.querySelector('[data-aue-prop="link"]');
    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        linkWrapper.href = anchor.href;
        if (anchor.target) linkWrapper.target = anchor.target;
        moveInstrumentation(anchor, linkWrapper);
      } else {
        linkWrapper.href = link.textContent.trim();
        moveInstrumentation(link, linkWrapper);
      }
    }
    const text = item.querySelector('[data-aue-prop="text"]');
    if (text) {
      linkWrapper.textContent = text.textContent;
      moveInstrumentation(text, linkWrapper);
    }
    listItem.append(linkWrapper);
    footerColumn2List.append(listItem);
  });
  footerColumn2Wrapper.append(footerColumn2List);
  footerNavbarLeft.append(footerColumn2Wrapper);
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';

  // Footer Column 3
  const footerColumn3Wrapper = document.createElement('div');
  footerColumn3Wrapper.className = 'header-footer-list-wrapper';
  const footerColumn3List = document.createElement('ul');
  footerColumn3List.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
  const footerColumn3Items = block.querySelectorAll('[data-aue-model="footerColumnItem"][data-aue-filter="footerColumn3"]');
  footerColumn3Items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-list-item';
    const linkWrapper = document.createElement('a');
    linkWrapper.className = 'header-cta-analytics analytics_cta_click header-footer-list-item--link d-inline-block';
    linkWrapper.setAttribute('data-link-region', 'Footer List');

    const link = item.querySelector('[data-aue-prop="link"]');
    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        linkWrapper.href = anchor.href;
        if (anchor.target) linkWrapper.target = anchor.target;
        moveInstrumentation(anchor, linkWrapper);
      } else {
        linkWrapper.href = link.textContent.trim();
        moveInstrumentation(link, linkWrapper);
      }
    }
    const text = item.querySelector('[data-aue-prop="text"]');
    if (text) {
      linkWrapper.textContent = text.textContent;
      moveInstrumentation(text, linkWrapper);
    }
    listItem.append(linkWrapper);
    footerColumn3List.append(listItem);
  });
  footerColumn3Wrapper.append(footerColumn3List);
  footerNavbarRight.append(footerColumn3Wrapper);

  // Footer Column 4
  const footerColumn4Wrapper = document.createElement('div');
  footerColumn4Wrapper.className = 'header-footer-list-wrapper';
  const footerColumn4List = document.createElement('ul');
  footerColumn4List.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
  const footerColumn4Items = block.querySelectorAll('[data-aue-model="footerColumnItem"][data-aue-filter="footerColumn4"]');
  footerColumn4Items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-list-item';
    const linkWrapper = document.createElement('a');
    linkWrapper.className = 'header-cta-analytics analytics_cta_click header-footer-list-item--link d-inline-block';
    linkWrapper.setAttribute('data-link-region', 'Footer List');

    const link = item.querySelector('[data-aue-prop="link"]');
    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        linkWrapper.href = anchor.href;
        if (anchor.target) linkWrapper.target = anchor.target;
        moveInstrumentation(anchor, linkWrapper);
      } else {
        linkWrapper.href = link.textContent.trim();
        moveInstrumentation(link, linkWrapper);
      }
    }
    const text = item.querySelector('[data-aue-prop="text"]');
    if (text) {
      linkWrapper.textContent = text.textContent;
      moveInstrumentation(text, linkWrapper);
    }
    listItem.append(linkWrapper);
    footerColumn4List.append(listItem);
  });
  footerColumn4Wrapper.append(footerColumn4List);
  footerNavbarRight.append(footerColumn4Wrapper);
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  headerFooterBrandPrimary.append(footerPrimaryContainer);
  headerFooterBrand.append(headerFooterBrandPrimary);

  const headerFooterBrandSecondary = document.createElement('section');
  headerFooterBrandSecondary.className = 'header-footer-brand-secondary';
  headerFooterBrandSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand-right d-flex flex-column pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social-media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialItem"]');
  socialLinks.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';
    const linkWrapper = document.createElement('a');
    linkWrapper.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center analytics_cta_click';
    linkWrapper.setAttribute('data-cta-region', 'Footer');
    linkWrapper.target = '_blank';

    const link = item.querySelector('[data-aue-prop="link"]');
    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        linkWrapper.href = anchor.href;
        linkWrapper.setAttribute('data-cta-label', anchor.getAttribute('data-cta-label') || '');
        linkWrapper.setAttribute('data-platform-name', anchor.getAttribute('data-platform-name') || '');
        linkWrapper.setAttribute('data-social-linktype', anchor.getAttribute('data-social-linktype') || '');
        moveInstrumentation(anchor, linkWrapper);
      } else {
        linkWrapper.href = link.textContent.trim();
        moveInstrumentation(link, linkWrapper);
      }
    }

    const icon = item.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]);
        pic.querySelector('img').className = 'header-object-fit-contain w-100 h-100 no-rendition';
        pic.querySelector('img').setAttribute('aria-label', img.alt);
        pic.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(img, pic.querySelector('img'));
        linkWrapper.append(pic);
      } else {
        const anchor = icon.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"], a[href$=".webp"]');
        if (anchor) {
          const newImg = document.createElement('img');
          newImg.src = anchor.href;
          newImg.alt = anchor.title || '';
          newImg.className = 'header-object-fit-contain w-100 h-100 no-rendition';
          newImg.setAttribute('aria-label', newImg.alt);
          newImg.setAttribute('loading', 'lazy');
          const pic = createOptimizedPicture(newImg.src, newImg.alt, false, [{ width: '48' }]);
          pic.querySelector('img').className = 'header-object-fit-contain w-100 h-100 no-rendition';
          pic.querySelector('img').setAttribute('aria-label', newImg.alt);
          pic.querySelector('img').setAttribute('loading', 'lazy');
          moveInstrumentation(anchor, pic.querySelector('img'));
          linkWrapper.append(pic);
        } else {
          linkWrapper.append(...icon.childNodes);
          moveInstrumentation(icon, linkWrapper);
        }
      }
    }
    listItem.append(linkWrapper);
    socialMediaList.append(listItem);
  });
  socialMediaSection.append(socialMediaList);
  footerSecondaryContent.append(socialMediaSection);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';

  const footerBrandLinkItem = document.createElement('li');
  footerBrandLinkItem.className = 'header-footer-brand-left--item header-foot-link';
  const footerBrandLinkWrapper = document.createElement('a');
  footerBrandLinkWrapper.className = 'header-footer-brand-left--link analytics_cta_click';
  footerBrandLinkWrapper.setAttribute('data-cta-region', 'Footer');
  footerBrandLinkWrapper.target = '_blank';
  const footerBrandLink = block.querySelector('[data-aue-prop="footerBrandLink"]');
  if (footerBrandLink) {
    const anchor = footerBrandLink.querySelector('a');
    if (anchor) {
      footerBrandLinkWrapper.href = anchor.href;
      footerBrandLinkWrapper.textContent = anchor.textContent;
      moveInstrumentation(anchor, footerBrandLinkWrapper);
    } else {
      footerBrandLinkWrapper.href = footerBrandLink.textContent.trim();
      footerBrandLinkWrapper.textContent = footerBrandLink.textContent.trim();
      moveInstrumentation(footerBrandLink, footerBrandLinkWrapper);
    }
  }
  footerBrandLinkItem.append(footerBrandLinkWrapper);
  footerBrandLeftList.append(footerBrandLinkItem);
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  const footerBrandText = block.querySelector('[data-aue-prop="footerBrandText"]');
  if (footerBrandText) {
    copyrightSpan.textContent = footerBrandText.textContent;
    moveInstrumentation(footerBrandText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftSecondary.append(copyrightDiv);
  footerSecondaryContent.append(footerBrandLeftSecondary);

  footerSecondaryContainer.append(footerSecondaryContent);
  headerFooterBrandSecondary.append(footerSecondaryContainer);
  headerFooterBrand.append(headerFooterBrandSecondary);

  headerSidebar.append(headerFooterBrand);
  headerSubmenuContainer.append(headerSidebar);

  const headerOverlay = document.createElement('div');
  headerOverlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  headerSubmenuContainer.append(headerOverlay);

  headerSectionWrapper.append(headerSubmenuContainer);

  block.textContent = '';
  block.append(headerSectionWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
