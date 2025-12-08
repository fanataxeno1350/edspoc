import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSectionRoot = document.createElement('section');
  moveInstrumentation(block, headerSectionRoot);
  headerSectionRoot.className = 'header-section-root position-relative mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  // Assuming appName is the first cell of the first row
  const appNameCell = block.children[0]?.children[0];
  if (appNameCell) {
    appNameSpan.textContent = appNameCell.textContent.trim();
    appNameSpan.setAttribute('data-app-name', appNameCell.textContent.trim());
    moveInstrumentation(appNameCell, appNameSpan);
  }
  headerSectionRoot.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container boing-container d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerLeftSection = document.createElement('div');
  headerLeftSection.className = 'header-left-section d-flex w-25';
  // No specific content for headerLeftSection in the provided HTML, keeping it empty as per HTML
  headerContainer.append(headerLeftSection);

  const headerLogoWrapper = document.createElement('div');
  headerLogoWrapper.className = 'header-logo-wrapper d-flex justify-content-center w-25';
  const headerLogoLink = document.createElement('a');
  headerLogoLink.href = '/';
  headerLogoLink.className = 'header-logo-link analytics_cta_click';
  headerLogoLink.setAttribute('data-ct', '');
  headerLogoLink.setAttribute('a-label', 'header-logo-boing');

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header-logo d-flex align-items-center';

  // Logo Image
  const logoImageCell = block.children[0]?.children[1]; // Assuming logo image is the second cell of the first row
  const logoImg = logoImageCell?.querySelector('img');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    optimizedLogoPic.querySelector('img').className = 'header-logo-img';
    optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
    headerLogoDiv.append(optimizedLogoPic);
  }
  headerLogoLink.append(headerLogoDiv);
  headerLogoWrapper.append(headerLogoLink);
  headerContainer.append(headerLogoWrapper);

  const headerRightSection = document.createElement('div');
  headerRightSection.className = 'header-right-section d-flex w-25 justify-content-end';

  // Login Button
  const loginLinkCell = block.children[0]?.children[2]; // Assuming login link is the third cell of the first row
  const loginLink = loginLinkCell?.querySelector('a');
  if (loginLink) {
    const newLoginLinkWrapper = document.createElement('a');
    newLoginLinkWrapper.href = loginLink.href;
    newLoginLinkWrapper.className = 'header-login-btn-wrapper analytics_cta_click';
    newLoginLinkWrapper.style.display = 'inline';
    moveInstrumentation(loginLink, newLoginLinkWrapper);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLink.textContent.trim();
    newLoginLinkWrapper.append(loginButton);
    headerRightSection.append(newLoginLinkWrapper);
  }
  headerContainer.append(headerRightSection);
  headerSectionRoot.append(headerContainer);

  const headerSubmenuContainer = document.createElement('div');
  headerSubmenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const headerSidebar = document.createElement('aside');
  headerSidebar.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar-menu list-unstyled px-4';

  // Sidebar Menu Items (starting from the second row of the block)
  // Assuming sidebar menu items are in subsequent rows, each row representing one item
  // and each row having link, label, and icon in its cells.
  for (let i = 1; i < block.children.length; i += 1) {
    const row = block.children[i];
    const cells = row.children;
    if (cells.length >= 3) { // Expecting link, label, icon
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';

      const link = cells[0].querySelector('a');
      const label = cells[1].textContent.trim();
      const iconImg = cells[2].querySelector('img');

      if (link && label && iconImg) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
        newLink.setAttribute('data-consent', 'false'); // Default, adjust if needed
        newLink.setAttribute('data-link', link.href); // Assuming data-link is the same as href
        moveInstrumentation(link, newLink);

        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt);
        moveInstrumentation(iconImg, optimizedIconPic.querySelector('img'));
        optimizedIconPic.querySelector('img').className = 'header-sidebar-menu-icon me-4';
        optimizedIconPic.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedIconPic);
        newLink.append(document.createTextNode(label));
        li.append(newLink);
        sidebarMenuUl.append(li);
      }
    }
  }
  headerSidebar.append(sidebarMenuUl);

  const headerSidebarCurve = document.createElement('div');
  headerSidebarCurve.className = 'header-sidebar-curve';
  headerSidebar.append(headerSidebarCurve);

  const headerFooterBrand = document.createElement('div');
  headerFooterBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  // Footer Primary Logo
  const footerPrimaryLogoCell = block.children[block.children.length - 4]?.children[0]; // Assuming 4th last row, first cell
  const footerPrimaryLogoLink = footerPrimaryLogoCell?.querySelector('a');
  const footerPrimaryLogoImg = footerPrimaryLogoCell?.querySelector('img');
  if (footerPrimaryLogoLink && footerPrimaryLogoImg) {
    const newFooterPrimaryLogoLink = document.createElement('a');
    newFooterPrimaryLogoLink.href = footerPrimaryLogoLink.href;
    newFooterPrimaryLogoLink.target = '_blank';
    newFooterPrimaryLogoLink.className = 'header-footer-brand__logo d-inline-block analytics_cta_click';
    newFooterPrimaryLogoLink.setAttribute('data-cta-region', 'Footer');
    newFooterPrimaryLogoLink.setAttribute('aria-label', footerPrimaryLogoLink.getAttribute('aria-label') || 'ITC Logo');
    moveInstrumentation(footerPrimaryLogoLink, newFooterPrimaryLogoLink);

    const optimizedFooterPrimaryLogoPic = createOptimizedPicture(footerPrimaryLogoImg.src, footerPrimaryLogoImg.alt);
    moveInstrumentation(footerPrimaryLogoImg, optimizedFooterPrimaryLogoPic.querySelector('img'));
    optimizedFooterPrimaryLogoPic.querySelector('img').className = 'header-object-fit-contain w-100 h-100 header-no-rendition';
    optimizedFooterPrimaryLogoPic.querySelector('img').setAttribute('loading', 'lazy');
    newFooterPrimaryLogoLink.append(optimizedFooterPrimaryLogoPic);
    footerBrandLeft.append(newFooterPrimaryLogoLink);
  }

  // Footer Secondary Logo
  const footerSecondaryLogoCell = block.children[block.children.length - 3]?.children[0]; // Assuming 3rd last row, first cell
  const footerSecondaryLogoImg = footerSecondaryLogoCell?.querySelector('img');
  if (footerSecondaryLogoImg) {
    const footerSecondaryLogoDiv = document.createElement('div');
    footerSecondaryLogoDiv.className = 'header-footer-brand__secondary--logo d-inline-block';
    const optimizedFooterSecondaryLogoPic = createOptimizedPicture(footerSecondaryLogoImg.src, footerSecondaryLogoImg.alt);
    moveInstrumentation(footerSecondaryLogoImg, optimizedFooterSecondaryLogoPic.querySelector('img'));
    optimizedFooterSecondaryLogoPic.querySelector('img').className = 'header-object-fit-contain w-100 header-no-rendition';
    optimizedFooterSecondaryLogoPic.querySelector('img').setAttribute('loading', 'lazy');
    footerSecondaryLogoDiv.append(optimizedFooterSecondaryLogoPic);
    footerBrandLeft.append(footerSecondaryLogoDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left d-flex flex-column flex-md-row ';

  // Footer Lists (assuming they are in the last two rows of the block, each row containing 2 lists)
  // This part is complex due to the nested structure in the HTML. We'll assume the block has a specific structure for footer lists.
  // For simplicity, let's assume the footer lists are in the rows before the social links and copyright.
  // This will require more precise indexing based on the actual block JSON structure.

  // Let's assume footer lists are provided as individual cells within a row, each cell containing a list of links
  // This is a simplified assumption. The actual block JSON suggests a 'container' for footerList, which implies multiple rows for lists.
  // For now, we'll iterate through the rows after sidebar and before social links.

  // Placeholder for Footer Lists - need to refine based on exact block structure
  // Given the block JSON, footerList is a container of footerListItem. This means each footerListItem is a row in the block.
  // We need to group these into the correct HTML structure.

  // Find the start and end of footer list items based on the block JSON structure.
  // Assuming footer lists start after sidebar menu items and end before social links.
  const footerListStartRowIndex = block.children.length - 7; // Adjust based on actual content
  const footerListEndRowIndex = block.children.length - 5; // Adjust based on actual content

  const footerListsData = [];
  for (let i = footerListStartRowIndex; i < footerListEndRowIndex; i += 1) {
    const row = block.children[i];
    if (row && row.children) {
      footerListsData.push(row);
    }
  }

  // Assuming 4 footer lists, 2 in left, 2 in right
  const footerListDivs = [];
  for (let i = 0; i < footerListsData.length; i += 1) {
    const footerListWrapper = document.createElement('div');
    footerListWrapper.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
    moveInstrumentation(footerListsData[i], ul);

    [...footerListsData[i].children].forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent.trim();
        newLink.className = 'header-cta-analytics analytics_cta_click header-footer-list__item--link d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          newLink.target = link.target;
        }
        moveInstrumentation(link, newLink);
        li.append(newLink);
        ul.append(li);
      }
    });
    footerListWrapper.append(ul);
    footerListDivs.push(footerListWrapper);
  }

  if (footerListDivs.length >= 2) {
    footerNavbarLeft.append(footerListDivs[0]);
    footerNavbarLeft.append(footerListDivs[1]);
  }
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right d-flex flex-column flex-md-row';
  if (footerListDivs.length >= 4) {
    footerNavbarRight.append(footerListDivs[2]);
    footerNavbarRight.append(footerListDivs[3]);
  }
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerContainer);
  headerFooterBrand.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const footerSecondaryRight = document.createElement('section');
  footerSecondaryRight.className = 'header-footer-brand__right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerSecondaryRight.append(socialMediaTitle);

  const socialLinksUl = document.createElement('ul');
  socialLinksUl.className = 'header-footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  // Social Links
  // Assuming social links are in the rows after footer lists and before ITC portal link/copyright
  // Each row is a social link with a link and an icon
  const socialLinksStartRowIndex = footerListEndRowIndex; // Adjust based on actual content
  const socialLinksEndRowIndex = block.children.length - 2; // Adjust based on actual content

  for (let i = socialLinksStartRowIndex; i < socialLinksEndRowIndex; i += 1) {
    const row = block.children[i];
    const cells = row.children;
    if (cells.length >= 2) { // Expecting link, icon
      const link = cells[0].querySelector('a');
      const iconImg = cells[1].querySelector('img');

      if (link && iconImg) {
        const li = document.createElement('li');
        li.className = 'header-footer-brand__right--item d-flex justify-content-center align-items-center';

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.className = 'header-footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', `footer-${iconImg.alt.toLowerCase()}`); // Assuming alt text is platform name
        newLink.setAttribute('data-platform-name', iconImg.alt.toLowerCase());
        newLink.setAttribute('data-social-linktype', 'follow');
        moveInstrumentation(link, newLink);

        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt);
        moveInstrumentation(iconImg, optimizedIconPic.querySelector('img'));
        optimizedIconPic.querySelector('img').setAttribute('aria-label', iconImg.alt.toLowerCase());
        optimizedIconPic.querySelector('img').className = 'header-object-fit-contain w-100 h-100 header-no-rendition';
        optimizedIconPic.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedIconPic);
        li.append(newLink);
        socialLinksUl.append(li);
      }
    }
  }
  footerSecondaryRight.append(socialLinksUl);
  footerSecondaryContent.append(footerSecondaryRight);

  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.className = 'header-footer-brand__left py-5 d-flex flex-column gap-3';

  const footerSecondaryLeftList = document.createElement('ul');
  footerSecondaryLeftList.className = 'header-footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  // ITC Portal Link
  const itcPortalLinkCell = block.children[block.children.length - 2]?.children[0]; // Assuming second last row, first cell
  const itcPortalLink = itcPortalLinkCell?.querySelector('a');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    const newLink = document.createElement('a');
    newLink.href = itcPortalLink.href;
    newLink.target = '_blank';
    newLink.className = 'header-footer-brand__left--link analytics_cta_click';
    newLink.setAttribute('data-cta-region', 'Footer');
    newLink.textContent = itcPortalLink.textContent.trim();
    moveInstrumentation(itcPortalLink, newLink);
    li.append(newLink);
    footerSecondaryLeftList.append(li);
  }
  footerSecondaryLeft.append(footerSecondaryLeftList);

  // Copyright Text
  const copyrightCell = block.children[block.children.length - 1]?.children[0]; // Assuming last row, first cell
  if (copyrightCell) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-footer-brand__left--copyright text-center ';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand__left--text text-white';
    copyrightSpan.textContent = copyrightCell.textContent.trim();
    moveInstrumentation(copyrightCell, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
    footerSecondaryLeft.append(copyrightDiv);
  }
  footerSecondaryContent.append(footerSecondaryLeft);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  headerFooterBrand.append(footerSecondarySection);

  headerSidebar.append(headerFooterBrand);
  headerSubmenuContainer.append(headerSidebar);

  const headerOverlay = document.createElement('div');
  headerOverlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  headerSubmenuContainer.append(headerOverlay);

  headerSectionRoot.append(headerSubmenuContainer);

  block.textContent = '';
  block.append(headerSectionRoot);
}
