import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // 1. Extract data from the authored block's children based on the JSON model fields.
  // We'll iterate through the block's children (rows) and map them to fields.

  const blockChildren = [...block.children];
  const footerData = {};
  const originalElements = {}; // To store original elements for instrumentation transfer

  // --- Extract Logo Link ---
  // The logo is in the first row, first cell, as an anchor within a div.
  const logoCell = blockChildren[0]?.children[0];
  const originalLogoAnchor = logoCell?.querySelector('a');
  if (originalLogoAnchor) {
    footerData.logoLink = originalLogoAnchor.href;
    // The logo itself is a complex SVG-like span structure, which we'll copy directly
    footerData.logoContent = originalLogoAnchor.innerHTML;
    originalElements.logoAnchor = originalLogoAnchor;
  }

  // --- Extract Social Links ---
  // Social links are in the first row, second cell, within .footer-social-links__list
  const socialLinksCell = blockChildren[0]?.children[1];
  footerData.socialLinks = [];
  socialLinksCell?.querySelectorAll('.footer-social-links__list > li > a').forEach((linkElement, index) => {
    const iconClass = linkElement.className.split(' ').find(cls => cls.startsWith('qd-icon--'));
    footerData.socialLinks.push({
      label: linkElement.getAttribute('aria-label') || iconClass?.replace('qd-icon--', '') || '',
      url: linkElement.href,
      iconClass: iconClass, // Store the specific icon class
    });
    originalElements[`socialLink_${index}`] = linkElement;
  });

  // --- Extract Navigation Links ---
  // Navigation links are in the first row, second cell, within .footer-navigation__links
  footerData.navLinks = [];
  socialLinksCell?.querySelectorAll('.footer-navigation__links > li > a').forEach((linkElement, index) => {
    footerData.navLinks.push({
      title: linkElement.title || linkElement.textContent.trim(),
      url: linkElement.href,
    });
    originalElements[`navLink_${index}`] = linkElement;
  });

  // --- Extract Languages ---
  // Languages are in the second row, first cell, within .footer-language-selector__list
  const languagesCell = blockChildren[1]?.children[0];
  footerData.languages = [];
  languagesCell?.querySelectorAll('.footer-language-selector__list > li > a').forEach((linkElement, index) => {
    footerData.languages.push({
      label: linkElement.textContent.trim(),
      url: linkElement.href,
      langCode: linkElement.getAttribute('data-lang'),
      active: linkElement.parentElement.classList.contains('active'),
    });
    originalElements[`languageLink_${index}`] = linkElement;
  });

  // --- Extract Policy Links ---
  // Policy links are in the second row, second cell, within .footer-policy-links__content
  const policyLinksCell = blockChildren[1]?.children[1];
  footerData.policyLinks = [];
  policyLinksCell?.querySelectorAll('.footer-policy-links__content > a').forEach((linkElement, index) => {
    footerData.policyLinks.push({
      title: linkElement.title || linkElement.textContent.trim(),
      url: linkElement.href,
    });
    originalElements[`policyLink_${index}`] = linkElement;
  });

  // --- Extract Copyright ---
  // Copyright is in the second row, second cell, within .footer-policy-links__copyright
  const originalCopyrightP = policyLinksCell?.querySelector('.footer-policy-links__copyright');
  if (originalCopyrightP) {
    footerData.copyright = originalCopyrightP.textContent.trim();
    originalElements.copyrightP = originalCopyrightP;
  }

  // --- DOM Reconstruction ---

  // Clear the original block content
  block.textContent = '';

  // Create the main .footer-wrapper
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';
  // Note: The block itself is the .footer-wrapper, so we append the content directly
  // and move instrumentation from the original block to this new wrapper.
  // However, the provided HTML already has .footer-wrapper as the block's inner content.
  // We'll reconstruct the content *within* the block, and the block itself will retain its original ID/classes.
  // Move instrumentation from the original block to the new footerWrapper if the block is just a container.
  // If the block *is* the footer-wrapper, then the block itself already has instrumentation.

  // The provided HTML shows `block` as `div class="footer-wrapper"`.
  // So we reconstruct its *inner* structure.

  // --- Footer Navigation Section ---
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';

  const footerLogo = document.createElement('div');
  footerLogo.className = 'footer-navigation__logo';
  if (footerData.logoLink && footerData.logoContent) {
    const newLogoAnchor = document.createElement('a');
    newLogoAnchor.href = footerData.logoLink;
    newLogoAnchor.target = '_self';
    newLogoAnchor.innerHTML = footerData.logoContent;
    if (originalElements.logoAnchor) {
        moveInstrumentation(originalElements.logoAnchor, newLogoAnchor);
    }
    footerLogo.append(newLogoAnchor);
  }
  footerNavigation.append(footerLogo);

  const footerContent = document.createElement('div');
  footerContent.className = 'footer-navigation__content';

  // Social Links
  if (footerData.socialLinks.length > 0) {
    const socialLinksDiv = document.createElement('div');
    socialLinksDiv.className = 'footer-social-links';
    const socialLinksList = document.createElement('ul');
    socialLinksList.className = 'footer-social-links__list';

    footerData.socialLinks.forEach((socialLink, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'footer-social-links__item';
      const anchor = document.createElement('a');
      anchor.className = `footer-social-links__icon ${socialLink.iconClass}`;
      anchor.target = '_blank';
      anchor.href = socialLink.url;
      anchor.setAttribute('aria-label', socialLink.label);
      if (originalElements[`socialLink_${index}`]) {
          moveInstrumentation(originalElements[`socialLink_${index}`], anchor);
      }
      listItem.append(anchor);
      socialLinksList.append(listItem);
    });
    socialLinksDiv.append(socialLinksList);
    footerContent.append(socialLinksDiv);
  }

  // Navigation Links
  if (footerData.navLinks.length > 0) {
    const navLinksList = document.createElement('ul');
    navLinksList.className = 'footer-navigation__links';

    footerData.navLinks.forEach((navLink, index) => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.className = 'footer-navigation__link-item';
      anchor.setAttribute('tabindex', '0');
      anchor.target = '_self';
      anchor.title = navLink.title;
      anchor.href = navLink.url;
      anchor.textContent = navLink.title;
      if (originalElements[`navLink_${index}`]) {
          moveInstrumentation(originalElements[`navLink_${index}`], anchor);
      }
      listItem.append(anchor);
      navLinksList.append(listItem);
    });
    footerContent.append(navLinksList);
  }
  footerNavigation.append(footerContent);
  block.append(footerNavigation);

  // --- Footer Divider ---
  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  block.append(footerDivider);

  // --- Footer Bottom Section ---
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';

  // Language Selector
  if (footerData.languages.length > 0) {
    const langSelectorDiv = document.createElement('div');
    langSelectorDiv.className = 'footer-language-selector';
    const langList = document.createElement('ul');
    langList.className = 'footer-language-selector__list';

    footerData.languages.forEach((lang, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'footer-language-selector__item';
      if (lang.active) listItem.classList.add('active');
      const anchor = document.createElement('a');
      anchor.href = lang.url;
      anchor.setAttribute('aria-label', lang.label);
      anchor.className = 'footer-language-selector__link';
      anchor.setAttribute('data-lang', lang.langCode);
      anchor.textContent = lang.label;
      if (originalElements[`languageLink_${index}`]) {
          moveInstrumentation(originalElements[`languageLink_${index}`], anchor);
      }
      listItem.append(anchor);
      langList.append(listItem);
    });
    langSelectorDiv.append(langList);
    footerBottom.append(langSelectorDiv);
  }

  // Policy Links and Copyright
  const policyLinksDiv = document.createElement('div');
  policyLinksDiv.className = 'footer-policy-links';
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.className = 'footer-policy-links__wrapper ';

  if (footerData.policyLinks.length > 0) {
    const policyLinksContent = document.createElement('div');
    policyLinksContent.className = 'footer-policy-links__content';

    footerData.policyLinks.forEach((policyLink, index) => {
      const anchor = document.createElement('a');
      anchor.setAttribute('tabindex', '0');
      anchor.className = 'footer-policy-links__item';
      anchor.title = policyLink.title;
      anchor.href = policyLink.url;
      anchor.target = '_self';
      anchor.textContent = policyLink.title;
      if (originalElements[`policyLink_${index}`]) {
          moveInstrumentation(originalElements[`policyLink_${index}`], anchor);
      }
      policyLinksContent.append(anchor);
    });
    policyLinksWrapper.append(policyLinksContent);
  }

  if (footerData.copyright) {
    const copyrightP = document.createElement('p');
    copyrightP.className = 'footer-policy-links__copyright';
    copyrightP.textContent = footerData.copyright;
    if (originalElements.copyrightP) {
        moveInstrumentation(originalElements.copyrightP, copyrightP);
    }
    policyLinksWrapper.append(copyrightP);
  }
  policyLinksDiv.append(policyLinksWrapper);
  footerBottom.append(policyLinksDiv);
  block.append(footerBottom);
}