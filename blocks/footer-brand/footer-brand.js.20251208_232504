import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper bg-boing-neutral-gray-600';
  moveInstrumentation(block, footerBrandWrapper);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';

  const containerPrimary = document.createElement('div');
  containerPrimary.className = 'container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'footer-brand-primary-content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand-right';

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar-left d-flex flex-column flex-md-row ';

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar-right d-flex flex-column flex-md-row';

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';

  const containerSecondary = document.createElement('div');
  containerSecondary.className = 'container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'footer-brand-secondary-content d-flex flex-column justify-content-md-between align-items-center';

  const footerBrandSocialRight = document.createElement('section');
  footerBrandSocialRight.className = 'footer-brand-right d-flex flex-column pb-5';

  const footerBrandCopyrightLeft = document.createElement('section');
  footerBrandCopyrightLeft.className = 'footer-brand-left py-5 d-flex flex-column gap-3';

  let primaryLogoLink, primaryLogoImg;
  let secondaryLogoImg;
  const footerLinkLists = [];
  const footerSocialLinks = [];
  let footerCopyrightText;

  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) {
      // Primary Logo and Secondary Logo
      const cells = [...row.children];
      const primaryLogoCell = cells[0];
      const secondaryLogoCell = cells[1];

      if (primaryLogoCell) {
        primaryLogoLink = primaryLogoCell.querySelector('a');
        primaryLogoImg = primaryLogoCell.querySelector('img');
      }
      if (secondaryLogoCell) {
        secondaryLogoImg = secondaryLogoCell.querySelector('img');
      }
    } else if (rowIndex >= 1 && rowIndex <= 4) {
      // Footer Link Lists (rows 1 to 4)
      const linkListWrapper = document.createElement('div');
      linkListWrapper.className = 'footer-list-wrapper';
      const ul = document.createElement('ul');
      ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
      [...row.children].forEach((cell) => {
        const link = cell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.className = 'footer-list-item';
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'cta-analytics analytics_cta_click footer-list-item-link d-inline-block';
          if (link.target) {
            newLink.target = link.target;
          }
          if (link.getAttribute('data-link-region')) {
            newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
          }
          moveInstrumentation(link, newLink);
          li.append(newLink);
          ul.append(li);
        }
      });
      linkListWrapper.append(ul);
      footerLinkLists.push(linkListWrapper);
    } else if (rowIndex === 5) {
      // Social Links
      const h3 = document.createElement('h3');
      h3.className = 'footer-brand-social-media--title';
      h3.textContent = 'Follow Us On';
      footerBrandSocialRight.append(h3);

      const ul = document.createElement('ul');
      ul.className = 'footer-brand-right-list d-flex align-items-center justify-content-center px-10 flex-wrap';
      [...row.children].forEach((cell) => {
        const link = cell.querySelector('a');
        const img = cell.querySelector('img');
        if (link && img) {
          const li = document.createElement('li');
          li.className = 'footer-brand-right-item d-flex justify-content-center align-items-center';
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.className = 'footer-brand-right-link d-flex justify-content-center align-items-center analytics_cta_click';
          if (link.target) {
            newLink.target = link.target;
          }
          if (link.getAttribute('data-cta-region')) {
            newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
          }
          if (link.getAttribute('data-cta-label')) {
            newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
          }
          if (link.getAttribute('data-platform-name')) {
            newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
          }
          if (link.getAttribute('data-social-linktype')) {
            newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype'));
          }

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          optimizedPic.querySelector('img').className = 'object-fit-contain w-100 h-100 footer-brand-no-rendition';
          optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newLink.append(optimizedPic);
          moveInstrumentation(link, newLink);
          li.append(newLink);
          ul.append(li);
        }
      });
      footerSocialLinks.push(ul);
    } else if (rowIndex === 6) {
      // Copyright and ITC portal link
      const cells = [...row.children];
      const itcPortalCell = cells[0];
      const copyrightCell = cells[1];

      if (itcPortalCell) {
        const ul = document.createElement('ul');
        ul.className = 'footer-brand-left-list d-flex align-items-center justify-content-center flex-wrap';
        const li = document.createElement('li');
        li.className = 'footer-brand-left-item footer-link';
        const link = itcPortalCell.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'footer-brand-left-link analytics_cta_click';
          if (link.target) {
            newLink.target = link.target;
          }
          if (link.getAttribute('data-cta-region')) {
            newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
          }
          moveInstrumentation(link, newLink);
          li.append(newLink);
        }
        ul.append(li);
        footerBrandCopyrightLeft.append(ul);
      }

      if (copyrightCell) {
        const div = document.createElement('div');
        div.className = 'footer-brand-left-copyright text-center ';
        const span = document.createElement('span');
        span.className = 'footer-brand-left-text text-white';
        span.textContent = copyrightCell.textContent.trim();
        div.append(span);
        footerBrandCopyrightLeft.append(div);
      }
    }
  });

  // Build primary logos
  if (primaryLogoLink && primaryLogoImg) {
    const newPrimaryLogoLink = document.createElement('a');
    newPrimaryLogoLink.href = primaryLogoLink.href;
    newPrimaryLogoLink.target = primaryLogoLink.target;
    newPrimaryLogoLink.className = 'footer-brand-logo d-inline-block analytics_cta_click';
    newPrimaryLogoLink.setAttribute('data-cta-region', primaryLogoLink.getAttribute('data-cta-region'));
    newPrimaryLogoLink.setAttribute('aria-label', primaryLogoLink.getAttribute('aria-label'));

    const optimizedPic = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
    optimizedPic.querySelector('img').className = 'object-fit-contain w-100 h-100 footer-brand-no-rendition';
    moveInstrumentation(primaryLogoImg, optimizedPic.querySelector('img'));
    newPrimaryLogoLink.append(optimizedPic);
    moveInstrumentation(primaryLogoLink, newPrimaryLogoLink);
    footerBrandLeft.append(newPrimaryLogoLink);
  }

  if (secondaryLogoImg) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'footer-brand-secondary-logo d-inline-block';
    const optimizedPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
    optimizedPic.querySelector('img').className = 'object-fit-contain w-100 footer-brand-no-rendition';
    moveInstrumentation(secondaryLogoImg, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
    footerBrandLeft.append(secondaryLogoDiv);
  }

  // Append link lists to their respective navbar sections
  footerLinkLists.forEach((list, index) => {
    if (index < 2) {
      footerBrandNavbarLeft.append(list);
    } else {
      footerBrandNavbarRight.append(list);
    }
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRight.append(footerBrandNavbar);

  footerBrandPrimaryContent.append(footerBrandLeft, footerBrandRight);
  containerPrimary.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(containerPrimary);

  // Append social links
  footerSocialLinks.forEach((ul) => {
    footerBrandSocialRight.append(ul);
  });

  footerBrandSecondaryContent.append(footerBrandSocialRight, footerBrandCopyrightLeft);
  containerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(containerSecondary);

  footerBrandWrapper.append(footerBrandPrimary, footerBrandSecondary);

  block.textContent = '';
  block.append(footerBrandWrapper);
}
