import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper bg-boing-neutral-gray-600';
  moveInstrumentation(block.firstElementChild, footerBrandWrapper);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';
  footerBrandWrapper.append(footerBrandPrimary);

  const containerPrimary = document.createElement('div');
  containerPrimary.className = 'container';
  footerBrandPrimary.append(containerPrimary);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'footer-brand-primary-content';
  containerPrimary.append(footerBrandPrimaryContent);

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.className = 'footer-brand-left-section';
  footerBrandPrimaryContent.append(footerBrandLeftSection);

  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.className = 'footer-brand-right-section';
  footerBrandPrimaryContent.append(footerBrandRightSection);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRightSection.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar-left';
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar-right';
  footerBrandNavbar.append(footerBrandNavbarRight);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';
  footerBrandWrapper.append(footerBrandSecondary);

  const containerSecondary = document.createElement('div');
  containerSecondary.className = 'container';
  footerBrandSecondary.append(containerSecondary);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'footer-brand-secondary-content';
  containerSecondary.append(footerBrandSecondaryContent);

  const footerBrandRightSectionSocial = document.createElement('section');
  footerBrandRightSectionSocial.className = 'footer-brand-right-section-social';
  footerBrandSecondaryContent.append(footerBrandRightSectionSocial);

  const footerBrandLeftSectionCopyright = document.createElement('section');
  footerBrandLeftSectionCopyright.className = 'footer-brand-left-section-copyright';
  footerBrandSecondaryContent.append(footerBrandLeftSectionCopyright);

  const rows = [...block.children];

  // Primary Logo and Secondary Logo
  const primaryLogoRow = rows.shift();
  if (primaryLogoRow) {
    const primaryLogoLinkCell = primaryLogoRow.children[0];
    const primaryLogoCell = primaryLogoRow.children[1];
    const secondaryLogoCell = primaryLogoRow.children[2];

    const primaryLogoLink = primaryLogoLinkCell.querySelector('a');
    const primaryLogoImg = primaryLogoLinkCell.querySelector('img');

    if (primaryLogoLink && primaryLogoImg) {
      const newPrimaryLogoLink = document.createElement('a');
      newPrimaryLogoLink.href = primaryLogoLink.href;
      newPrimaryLogoLink.target = '_blank';
      newPrimaryLogoLink.className = 'footer-brand-logo-link analytics_cta_click';
      newPrimaryLogoLink.setAttribute('data-cta-region', 'Footer');
      newPrimaryLogoLink.setAttribute('aria-label', primaryLogoLink.getAttribute('aria-label') || 'ITC Logo');
      moveInstrumentation(primaryLogoLink, newPrimaryLogoLink);

      const optimizedPrimaryPic = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
      optimizedPrimaryPic.querySelector('img').className = 'footer-brand-logo-img';
      optimizedPrimaryPic.querySelector('img').loading = 'lazy';
      moveInstrumentation(primaryLogoImg, optimizedPrimaryPic.querySelector('img'));
      newPrimaryLogoLink.append(optimizedPrimaryPic);
      footerBrandLeftSection.append(newPrimaryLogoLink);
    }

    const secondaryLogoImg = secondaryLogoCell.querySelector('img');
    if (secondaryLogoImg) {
      const footerBrandSecondaryLogoWrapper = document.createElement('div');
      footerBrandSecondaryLogoWrapper.className = 'footer-brand-secondary-logo-wrapper';
      moveInstrumentation(secondaryLogoImg.parentElement, footerBrandSecondaryLogoWrapper);

      const optimizedSecondaryPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      optimizedSecondaryPic.querySelector('img').className = 'footer-brand-secondary-logo-img';
      optimizedSecondaryPic.querySelector('img').loading = 'lazy';
      moveInstrumentation(secondaryLogoImg, optimizedSecondaryPic.querySelector('img'));
      footerBrandSecondaryLogoWrapper.append(optimizedSecondaryPic);
      footerBrandLeftSection.append(footerBrandSecondaryLogoWrapper);
    }
  }

  // Footer Link Lists
  let linkListCounter = 0;
  while (rows.length > 0 && rows[0].children.length === 1 && rows[0].querySelector('ul')) {
    const linkListRow = rows.shift();
    const ul = linkListRow.querySelector('ul');
    if (ul) {
      const footerListComponent = document.createElement('div');
      footerListComponent.className = 'footer-list-component';
      moveInstrumentation(linkListRow, footerListComponent);

      const newUl = document.createElement('ul');
      newUl.className = 'footer-list';
      moveInstrumentation(ul, newUl);

      [...ul.children].forEach((li) => {
        const newLi = document.createElement('li');
        newLi.className = 'footer-list-item';
        moveInstrumentation(li, newLi);

        const link = li.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'cta-analytics analytics_cta_click footer-list-item-link';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) {
            newLink.target = link.target;
          }
          moveInstrumentation(link, newLink);
          newLi.append(newLink);
        }
        newUl.append(newLi);
      });
      footerListComponent.append(newUl);

      if (linkListCounter < 2) {
        footerBrandNavbarLeft.append(footerListComponent);
      } else {
        footerBrandNavbarRight.append(footerListComponent);
      }
      linkListCounter += 1;
    }
  }

  // Footer Social Links
  const socialLinksRow = rows.shift();
  if (socialLinksRow) {
    const socialLinksUl = socialLinksRow.querySelector('ul');
    if (socialLinksUl) {
      const socialMediaTitle = document.createElement('h3');
      socialMediaTitle.className = 'footer-social-media-title';
      socialMediaTitle.textContent = 'Follow Us On';
      footerBrandRightSectionSocial.append(socialMediaTitle);

      const newSocialUl = document.createElement('ul');
      newSocialUl.className = 'footer-brand-right-list';
      moveInstrumentation(socialLinksUl, newSocialUl);

      [...socialLinksUl.children].forEach((li) => {
        const newLi = document.createElement('li');
        newLi.className = 'footer-brand-right-item';
        moveInstrumentation(li, newLi);

        const link = li.querySelector('a');
        const img = li.querySelector('img');

        if (link && img) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.className = 'footer-brand-right-link analytics_cta_click';
          newLink.setAttribute('data-cta-region', 'Footer');
          newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || '');
          newLink.target = '_blank';
          newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || '');
          newLink.setAttribute('data-social-linktype', 'follow');
          moveInstrumentation(link, newLink);

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          optimizedPic.querySelector('img').className = 'footer-social-media-image';
          optimizedPic.querySelector('img').loading = 'lazy';
          optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label') || '');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newLink.append(optimizedPic);
          newLi.append(newLink);
        }
        newSocialUl.append(newLi);
      });
      footerBrandRightSectionSocial.append(newSocialUl);
    }
  }

  // Copyright and Copyright Link
  const copyrightRow = rows.shift();
  if (copyrightRow) {
    const copyrightLinkCell = copyrightRow.children[0];
    const copyrightTextCell = copyrightRow.children[1];

    const copyrightLink = copyrightLinkCell.querySelector('a');
    if (copyrightLink) {
      const copyrightUl = document.createElement('ul');
      copyrightUl.className = 'footer-brand-left-list';
      moveInstrumentation(copyrightLinkCell, copyrightUl);

      const copyrightLi = document.createElement('li');
      copyrightLi.className = 'footer-brand-left-item footer-link';
      moveInstrumentation(copyrightLink.parentElement, copyrightLi);

      const newLink = document.createElement('a');
      newLink.href = copyrightLink.href;
      newLink.target = '_blank';
      newLink.className = 'footer-brand-left-link analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.textContent = copyrightLink.textContent.trim();
      moveInstrumentation(copyrightLink, newLink);
      copyrightLi.append(newLink);
      copyrightUl.append(copyrightLi);
      footerBrandLeftSectionCopyright.append(copyrightUl);
    }

    const copyrightTextSpan = copyrightTextCell.querySelector('span');
    if (copyrightTextSpan) {
      const copyrightWrapper = document.createElement('div');
      copyrightWrapper.className = 'footer-brand-left-copyright-wrapper';
      moveInstrumentation(copyrightTextCell, copyrightWrapper);

      const newSpan = document.createElement('span');
      newSpan.className = 'footer-brand-left-copyright-text';
      newSpan.textContent = copyrightTextSpan.textContent.trim();
      moveInstrumentation(copyrightTextSpan, newSpan);
      copyrightWrapper.append(newSpan);
      footerBrandLeftSectionCopyright.append(copyrightWrapper);
    }
  }

  block.textContent = '';
  block.append(footerBrandWrapper);
}
