import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper footer-brand-w-100 footer-brand-bg-boing-neutral-gray-600';
  moveInstrumentation(block, footerBrandWrapper);

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-primary';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-brand-container container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-primary-content footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row footer-brand-justify-content-md-between footer-brand-align-items-center';

  const leftSectionPrimary = document.createElement('section');
  leftSectionPrimary.className = 'footer-brand-left footer-brand-d-flex footer-brand-gap-16 footer-brand-px-10 footer-brand-align-items-center footer-brand-justify-content-center';

  const rightSectionPrimary = document.createElement('section');
  rightSectionPrimary.className = 'footer-brand-right';
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

  const rightSectionSecondary = document.createElement('section');
  rightSectionSecondary.className = 'footer-brand-right footer-brand-d-flex footer-brand-flex-column footer-brand-pb-5';
  const leftSectionSecondary = document.createElement('section');
  leftSectionSecondary.className = 'footer-brand-left footer-brand-py-5 footer-brand-d-flex footer-brand-flex-column footer-brand-gap-3';

  const rows = [...block.children];

  // First row for primary section logos and copyright
  if (rows.length > 0) {
    const primaryRow = rows[0];
    moveInstrumentation(primaryRow, primaryContent);

    const cells = [...primaryRow.children];

    // Logo Link and Image
    const logoLinkCell = cells[0];
    const logoImageCell = cells[1];
    const secondaryLogoImageCell = cells[2];
    const secondaryLogoAltCell = cells[3];

    if (logoLinkCell && logoImageCell) {
      const logoLink = logoLinkCell.querySelector('a');
      const logoImg = logoImageCell.querySelector('img');

      if (logoLink && logoImg) {
        const newLogoLink = document.createElement('a');
        newLogoLink.href = logoLink.href;
        newLogoLink.target = '_blank';
        newLogoLink.className = 'footer-brand-logo footer-brand-d-inline-block analytics_cta_click';
        newLogoLink.setAttribute('data-cta-region', 'Footer');
        newLogoLink.setAttribute('aria-label', 'ITC Logo');
        moveInstrumentation(logoLink, newLogoLink);

        const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
        optimizedLogoPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100';
        optimizedLogoPic.querySelector('img').loading = 'lazy';
        moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
        newLogoLink.append(optimizedLogoPic);
        leftSectionPrimary.append(newLogoLink);
      }
    }

    // Secondary Logo
    if (secondaryLogoImageCell) {
      const secondaryImg = secondaryLogoImageCell.querySelector('img');
      if (secondaryImg) {
        const secondaryLogoDiv = document.createElement('div');
        secondaryLogoDiv.className = 'footer-brand-secondary-logo footer-brand-d-inline-block';
        const optimizedSecondaryPic = createOptimizedPicture(secondaryImg.src, secondaryImg.alt);
        optimizedSecondaryPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100';
        optimizedSecondaryPic.querySelector('img').loading = 'lazy';
        moveInstrumentation(secondaryImg, optimizedSecondaryPic.querySelector('img'));
        secondaryLogoDiv.append(optimizedSecondaryPic);
        leftSectionPrimary.append(secondaryLogoDiv);
      }
    }

    // Copyright Text
    const copyrightCell = cells[4];
    if (copyrightCell) {
      const copyrightDiv = document.createElement('div');
      copyrightDiv.className = 'footer-brand-left-copyright footer-brand-text-center ';
      const copyrightSpan = document.createElement('span');
      copyrightSpan.className = 'footer-brand-left-text footer-brand-text-white';
      copyrightSpan.innerHTML = copyrightCell.innerHTML;
      moveInstrumentation(copyrightCell, copyrightSpan);
      copyrightDiv.append(copyrightSpan);
      leftSectionSecondary.append(copyrightDiv);
    }

    // ITC Portal Link
    const itcPortalLinkCell = cells[5];
    const itcPortalTextCell = cells[6];
    if (itcPortalLinkCell && itcPortalTextCell) {
      const itcPortalLink = itcPortalLinkCell.querySelector('a');
      if (itcPortalLink) {
        const ul = document.createElement('ul');
        ul.className = 'footer-brand-left-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-flex-wrap';
        const li = document.createElement('li');
        li.className = 'footer-brand-left-item footer-brand-foot-link';
        const newItcLink = document.createElement('a');
        newItcLink.href = itcPortalLink.href;
        newItcLink.target = '_blank';
        newItcLink.className = 'footer-brand-left-link analytics_cta_click';
        newItcLink.setAttribute('data-cta-region', 'Footer');
        newItcLink.textContent = itcPortalTextCell.textContent;
        moveInstrumentation(itcPortalLink, newItcLink);
        li.append(newItcLink);
        ul.append(li);
        leftSectionSecondary.prepend(ul);
      }
    }

    // Social Heading
    const socialHeadingCell = cells[7];
    if (socialHeadingCell) {
      const socialHeading = document.createElement('h3');
      socialHeading.className = 'footer-brand-social-media-title';
      socialHeading.innerHTML = socialHeadingCell.innerHTML;
      moveInstrumentation(socialHeadingCell, socialHeading);
      rightSectionSecondary.append(socialHeading);
    }
  }

  // Navigation Columns
  // Assuming navigation columns start from the second row (index 1)
  let navColumnIndex = 0;
  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    if (row.hasAttribute('data-model-id') && row.getAttribute('data-model-id') === 'footerBrandNavColumn') {
      const listWrapper = document.createElement('div');
      listWrapper.className = 'footer-list-wrapper';
      moveInstrumentation(row, listWrapper);

      const ul = document.createElement('ul');
      ul.className = 'footer-list-ul footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-align-items-md-start footer-brand-flex-column';

      [...row.children].forEach((cell) => {
        const links = cell.querySelectorAll('a');
        links.forEach((link) => {
          const li = document.createElement('li');
          li.className = 'footer-list-item';
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'footer-list-link cta-analytics analytics_cta_click footer-brand-d-inline-block';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) {
            newLink.target = link.target;
          }
          moveInstrumentation(link, newLink);
          li.append(newLink);
          ul.append(li);
        });
      });
      listWrapper.append(ul);

      if (navColumnIndex < 2) {
        navbarLeft.append(listWrapper);
      } else {
        navbarRight.append(listWrapper);
      }
      navColumnIndex += 1;
    } else if (row.hasAttribute('data-model-id') && row.getAttribute('data-model-id') === 'footerBrandSocialLink') {
      // Social Links
      const socialLinksUl = rightSectionSecondary.querySelector('.footer-brand-right-list') || document.createElement('ul');
      if (!socialLinksUl.classList.contains('footer-brand-right-list')) {
        socialLinksUl.className = 'footer-brand-right-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-px-10 footer-brand-flex-wrap';
      }

      const platformLinkCell = row.children[0];
      const platformIconCell = row.children[1];

      if (platformLinkCell && platformIconCell) {
        const link = platformLinkCell.querySelector('a');
        const img = platformIconCell.querySelector('img');

        if (link && img) {
          const li = document.createElement('li');
          li.className = 'footer-brand-right-item footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center';
          moveInstrumentation(row, li);

          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.target = '_blank';
          newLink.className = 'footer-brand-right-link footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center analytics_cta_click';
          newLink.setAttribute('data-cta-region', 'Footer');
          newLink.setAttribute('data-cta-label', `footer-${img.alt.toLowerCase()}`);
          newLink.setAttribute('data-platform-name', img.alt.toLowerCase());
          newLink.setAttribute('data-social-linktype', 'follow');
          newLink.setAttribute('aria-label', img.alt.toLowerCase());
          moveInstrumentation(link, newLink);

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100';
          optimizedPic.querySelector('img').loading = 'lazy';
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newLink.append(optimizedPic);
          li.append(newLink);
          socialLinksUl.append(li);
        }
      }
      if (!rightSectionSecondary.contains(socialLinksUl)) {
        rightSectionSecondary.append(socialLinksUl);
      }
    }
  }

  nav.append(navbarLeft, navbarRight);
  rightSectionPrimary.append(nav);

  primaryContent.append(leftSectionPrimary, rightSectionPrimary);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  secondaryContent.append(rightSectionSecondary, leftSectionSecondary);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrandWrapper.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerBrandWrapper);
}
