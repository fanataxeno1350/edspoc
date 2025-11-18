import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper footer-brand-w-100 footer-brand-bg-boing-neutral-gray-600';

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-primary';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-brand-container container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-primary-content footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row footer-brand-justify-content-md-between footer-brand-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-left footer-brand-d-flex footer-brand-gap-16 footer-brand-px-10 footer-brand-align-items-center footer-brand-justify-content-center';

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-right';
  const nav = document.createElement('nav');
  nav.className = 'footer-brand-navbar footer-brand-d-grid footer-brand-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');
  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand-navbar-left footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row ';
  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand-navbar-right footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row';

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-secondary';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-brand-container container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-secondary-content footer-brand-d-flex footer-brand-flex-column  footer-brand-justify-content-md-between footer-brand-align-items-center';

  const secondaryRightSection = document.createElement('section');
  secondaryRightSection.className = 'footer-brand-right footer-brand-d-flex footer-brand-flex-column footer-brand-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-brand-social-media-title';
  socialMediaTitle.textContent = 'Follow Us On';
  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-right-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-px-10 footer-brand-flex-wrap';

  const secondaryLeftSection = document.createElement('section');
  secondaryLeftSection.className = 'footer-brand-left footer-brand-py-5 footer-brand-d-flex footer-brand-flex-column footer-brand-gap-3';
  const itcPortalList = document.createElement('ul');
  itcPortalList.className = 'footer-brand-left-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-flex-wrap';
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-left-copyright footer-brand-text-center ';

  // Assuming the block children are structured to match the model fields
  // First row: Logo Link, Logo Image, Secondary Logo Image
  // Subsequent rows: Footer Links (grouped), Social Links (grouped), ITC Portal Link, Copyright

  const children = [...block.children];

  // Extract Logo Link, Logo Image, Secondary Logo Image from the first row
  if (children.length > 0) {
    const firstRow = children[0];
    const cells = [...firstRow.children];

    // Logo Link and Image
    if (cells[0]) {
      const logoLinkCell = cells[0];
      const logoLink = logoLinkCell.querySelector('a');
      const logoImg = logoLinkCell.querySelector('img');
      if (logoLink && logoImg) {
        const newLogoLink = document.createElement('a');
        moveInstrumentation(logoLink, newLogoLink);
        newLogoLink.href = logoLink.href;
        newLogoLink.target = logoLink.target;
        newLogoLink.className = 'footer-brand-logo footer-brand-d-inline-block analytics_cta_click';
        newLogoLink.setAttribute('data-cta-region', 'Footer');
        newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label') || 'Logo');

        const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
        moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
        optimizedLogoPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100';
        newLogoLink.append(optimizedLogoPic);
        leftSection.append(newLogoLink);
      }
    }

    // Secondary Logo Image
    if (cells[1]) {
      const secondaryLogoCell = cells[1];
      const secondaryLogoImg = secondaryLogoCell.querySelector('img');
      if (secondaryLogoImg) {
        const secondaryLogoDiv = document.createElement('div');
        secondaryLogoDiv.className = 'footer-brand-secondary-logo footer-brand-d-inline-block';
        const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
        moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogoPic.querySelector('img'));
        optimizedSecondaryLogoPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100';
        secondaryLogoDiv.append(optimizedSecondaryLogoPic);
        leftSection.append(secondaryLogoDiv);
      }
    }
  }

  // Grouping footer links and social links
  const footerLinksGroups = [];
  const socialLinks = [];
  let itcPortalLinkData = null;
  let copyrightData = null;

  // Start from the second row for links and copyright
  for (let i = 1; i < children.length; i += 1) {
    const row = children[i];
    const cells = [...row.children];

    // Check if it's a footer link group
    if (cells[0] && cells[0].querySelector('a') && cells[0].querySelector('a').closest('ul')) {
      const ul = cells[0].querySelector('ul');
      if (ul) {
        const newUl = document.createElement('ul');
        newUl.className = 'footer-list-ul footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-align-items-md-start footer-brand-flex-column';
        [...ul.children].forEach((li) => {
          const newLi = document.createElement('li');
          moveInstrumentation(li, newLi);
          newLi.className = 'footer-list-item';
          const link = li.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            moveInstrumentation(link, newLink);
            newLink.href = link.href;
            newLink.textContent = link.textContent;
            newLink.className = 'footer-list-link cta-analytics analytics_cta_click footer-brand-d-inline-block';
            newLink.setAttribute('data-link-region', 'Footer List');
            if (link.target) newLink.target = link.target;
            newLi.append(newLink);
          }
          newUl.append(newLi);
        });
        footerLinksGroups.push(newUl);
      }
    } else if (cells[0] && cells[0].querySelector('a') && cells[0].querySelector('img')) {
      // Check if it's a social link
      const socialLinkCell = cells[0];
      const link = socialLinkCell.querySelector('a');
      const img = socialLinkCell.querySelector('img');
      if (link && img) {
        socialLinks.push({ link, img });
      }
    } else if (cells[0] && cells[0].querySelector('a') && cells[0].textContent.includes('ITC portal')) {
      // Check if it's the ITC Portal link
      itcPortalLinkData = cells[0].querySelector('a');
    } else if (cells[0] && cells[0].textContent.includes('©')) {
      // Check if it's the copyright text
      copyrightData = cells[0].textContent.trim();
    }
  }

  // Build footer links structure
  const maxLinksPerColumn = 3;
  let currentNavbarColumn = navbarLeft;
  let linksInCurrentColumn = 0;

  footerLinksGroups.forEach((ul, index) => {
    if (linksInCurrentColumn >= maxLinksPerColumn) {
      currentNavbarColumn = navbarRight;
      linksInCurrentColumn = 0;
    }
    const footerListWrapper = document.createElement('div');
    footerListWrapper.className = 'footer-list-wrapper';
    footerListWrapper.append(ul);
    currentNavbarColumn.append(footerListWrapper);
    linksInCurrentColumn += 1;
  });

  nav.append(navbarLeft, navbarRight);
  rightSection.append(nav);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  // Build social links structure
  socialLinks.forEach(({ link, img }) => {
    const li = document.createElement('li');
    li.className = 'footer-brand-right-item footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center';
    const newLink = document.createElement('a');
    moveInstrumentation(link, newLink);
    newLink.href = link.href;
    newLink.target = '_blank';
    newLink.className = 'footer-brand-right-link footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center analytics_cta_click';
    newLink.setAttribute('data-cta-region', 'Footer');
    newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || `footer-${img.alt.toLowerCase()}`);
    newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || img.alt.toLowerCase());
    newLink.setAttribute('data-social-linktype', 'follow');
    newLink.setAttribute('aria-label', img.alt);

    const optimizedPic = createOptimizedPicture(img.src, img.alt);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100';
    newLink.append(optimizedPic);
    li.append(newLink);
    socialMediaList.append(li);
  });

  secondaryRightSection.append(socialMediaTitle, socialMediaList);

  // Build ITC Portal Link and Copyright
  if (itcPortalLinkData) {
    const li = document.createElement('li');
    li.className = 'footer-brand-left-item footer-brand-foot-link';
    const newLink = document.createElement('a');
    moveInstrumentation(itcPortalLinkData, newLink);
    newLink.href = itcPortalLinkData.href;
    newLink.target = '_blank';
    newLink.className = 'footer-brand-left-link analytics_cta_click';
    newLink.setAttribute('data-cta-region', 'Footer');
    newLink.textContent = itcPortalLinkData.textContent.trim();
    li.append(newLink);
    itcPortalList.append(li);
  }

  if (copyrightData) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'footer-brand-left-text footer-brand-text-white';
    copyrightSpan.textContent = copyrightData;
    copyrightDiv.append(copyrightSpan);
  }

  secondaryLeftSection.append(itcPortalList, copyrightDiv);
  secondaryContent.append(secondaryRightSection, secondaryLeftSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrandWrapper.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.classList.add('footer-brand-section', 'p-0');
}
