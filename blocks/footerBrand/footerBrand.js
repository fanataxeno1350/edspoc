import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main outer wrapper
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper footer-brand-w-100 footer-brand-bg-boing-neutral-gray-600';

  // Create primary section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-brand-container container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-primary-content footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row footer-brand-justify-content-md-between footer-brand-align-items-center';

  // Create left section for logos
  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.className = 'footer-brand-left footer-brand-d-flex footer-brand-gap-16 footer-brand-px-10 footer-brand-align-items-center footer-brand-justify-content-center';

  // Create right section for navigation
  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.className = 'footer-brand-right';
  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar footer-brand-d-grid footer-brand-d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar-left footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row ';
  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar-right footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row';

  // Create secondary section
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-brand-container container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-secondary-content footer-brand-d-flex footer-brand-flex-column  footer-brand-justify-content-md-between footer-brand-align-items-center';

  // Create right section for social media
  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.className = 'footer-brand-right footer-brand-d-flex footer-brand-flex-column footer-brand-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-brand-social-media-title';
  socialMediaTitle.textContent = 'Follow Us On';
  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-right-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-px-10 footer-brand-flex-wrap';

  // Create left section for ITC portal and copyright
  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'footer-brand-left footer-brand-py-5 footer-brand-d-flex footer-brand-flex-column footer-brand-gap-3';
  const itcPortalList = document.createElement('ul');
  itcPortalList.className = 'footer-brand-left-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-flex-wrap';
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-left-copyright footer-brand-text-center ';

  // Loop over block children (CMS rows)
  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, row); // Transfer instrumentation to the row itself

    // Row 1: Primary Logo, Secondary Logo
    if (rowIndex === 0) {
      const cells = [...row.children];
      // Primary Logo
      const primaryLogoCell = cells[0];
      const primaryLogoLink = primaryLogoCell.querySelector('a');
      const primaryLogoImg = primaryLogoCell.querySelector('img');
      if (primaryLogoLink && primaryLogoImg) {
        const newLink = document.createElement('a');
        newLink.href = primaryLogoLink.href;
        newLink.target = primaryLogoLink.target;
        newLink.className = 'footer-brand-logo footer-brand-d-inline-block analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('aria-label', primaryLogoLink.getAttribute('aria-label') || 'Logo');
        const optimizedPic = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
        optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100';
        optimizedPic.querySelector('img').loading = 'lazy';
        moveInstrumentation(primaryLogoImg, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
        footerBrandLeftPrimary.append(newLink);
      }

      // Secondary Logo
      const secondaryLogoCell = cells[1];
      const secondaryLogoImg = secondaryLogoCell.querySelector('img');
      if (secondaryLogoImg) {
        const secondaryLogoDiv = document.createElement('div');
        secondaryLogoDiv.className = 'footer-brand-secondary-logo footer-brand-d-inline-block';
        const optimizedPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
        optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100';
        optimizedPic.querySelector('img').loading = 'lazy';
        moveInstrumentation(secondaryLogoImg, optimizedPic.querySelector('img'));
        secondaryLogoDiv.append(optimizedPic);
        footerBrandLeftPrimary.append(secondaryLogoDiv);
      }
    }

    // Rows 2-5: Navigation Columns
    if (rowIndex >= 1 && rowIndex <= 4) {
      const footerListWrapper = document.createElement('div');
      footerListWrapper.className = 'footer-list-wrapper';
      const ul = document.createElement('ul');
      ul.className = 'footer-list-ul footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-align-items-md-start footer-brand-flex-column';

      [...row.children].forEach((cell) => {
        const link = cell.querySelector('a');
        if (link) {
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
          li.append(newLink);
          ul.append(li);
        }
      });
      footerListWrapper.append(ul);
      if (rowIndex <= 2) {
        footerBrandNavbarLeft.append(footerListWrapper);
      } else {
        footerBrandNavbarRight.append(footerListWrapper);
      }
    }

    // Rows 6-8: Social Links
    if (rowIndex >= 5 && rowIndex <= 7) {
      const cells = [...row.children];
      const linkCell = cells[0];
      const iconCell = cells[1];

      const link = linkCell.querySelector('a');
      const iconImg = iconCell.querySelector('img');

      if (link && iconImg) {
        const li = document.createElement('li');
        li.className = 'footer-brand-right-item footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center';

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand-right-link footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', `footer-${link.textContent.toLowerCase().replace(/ /g, '-')}`);
        newLink.setAttribute('data-platform-name', link.textContent.toLowerCase());
        newLink.setAttribute('data-social-linktype', 'follow');

        const optimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt);
        optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100';
        optimizedPic.querySelector('img').loading = 'lazy';
        optimizedPic.querySelector('img').setAttribute('aria-label', link.textContent.toLowerCase());
        moveInstrumentation(iconImg, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
        li.append(newLink);
        socialMediaList.append(li);
      }
    }

    // Row 9: ITC Portal Link
    if (rowIndex === 8) {
      const itcLinkCell = row.children[0];
      const itcLink = itcLinkCell.querySelector('a');
      if (itcLink) {
        const li = document.createElement('li');
        li.className = 'footer-brand-left-item footer-brand-foot-link';
        const newLink = document.createElement('a');
        newLink.href = itcLink.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand-left-link analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.textContent = itcLink.textContent.trim();
        li.append(newLink);
        itcPortalList.append(li);
      }
    }

    // Row 10: Copyright Text
    if (rowIndex === 9) {
      const copyrightCell = row.children[0];
      const copyrightSpan = document.createElement('span');
      copyrightSpan.className = 'footer-brand-left-text footer-brand-text-white';
      copyrightSpan.textContent = copyrightCell.textContent.trim();
      copyrightDiv.append(copyrightSpan);
    }
  });

  // Assemble primary section
  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightPrimary.append(footerBrandNavbar);
  primaryContent.append(footerBrandLeftPrimary, footerBrandRightPrimary);
  primaryContainer.append(primaryContent);
  footerBrandPrimary.append(primaryContainer);

  // Assemble secondary section
  footerBrandRightSecondary.append(socialMediaTitle, socialMediaList);
  footerBrandLeftSecondary.append(itcPortalList, copyrightDiv);
  secondaryContent.append(footerBrandRightSecondary, footerBrandLeftSecondary);
  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);

  // Assemble main wrapper
  footerBrandWrapper.append(footerBrandPrimary, footerBrandSecondary);

  // Clear existing block content and append new structure
  block.textContent = '';
  block.append(footerBrandWrapper);
}
