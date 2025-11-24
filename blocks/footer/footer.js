import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The 'block' element itself is the top-level 'footer-wrapper' in the provided HTML.
  // We will reconstruct its inner children.

  const blockChildren = [...block.children];
  const footerData = {};
  const originalElements = {}; // To store original elements for instrumentation transfer

  // --- Data Extraction & Original Element Storage ---

  // Assuming the structure from the provided HTML, the footer content is within the first child of the block.
  // The actual block itself IS the .footer-wrapper.
  // So we directly query within the block for its children's children.

  // --- Footer Navigation Section ---
  const originalFooterNavigation = block.querySelector('.footer-navigation');
  if (originalFooterNavigation) {
    originalElements.footerNavigation = originalFooterNavigation;

    // Logo Link and Content
    const originalLogoAnchor = originalFooterNavigation.querySelector('.footer-navigation__logo > a');
    if (originalLogoAnchor) {
      footerData.logoLink = originalLogoAnchor.href;
      // Preserve complex SVG-like span structure inside the anchor
      footerData.logoContent = originalLogoAnchor.innerHTML; 
      originalElements.logoAnchor = originalLogoAnchor;
    }

    const originalFooterNavigationContent = originalFooterNavigation.querySelector('.footer-navigation__content');
    if (originalFooterNavigationContent) {
      // Social Links
      footerData.socialLinks = [];
      originalFooterNavigationContent.querySelectorAll('.footer-social-links__list > li > a').forEach((linkElement, index) => {
        const iconClass = [...linkElement.classList].find(cls => cls.startsWith('qd-icon--'));
        footerData.socialLinks.push({
          label: linkElement.getAttribute('aria-label') || iconClass?.replace('qd-icon--', '') || '', // Prioritize aria-label
          url: linkElement.href,
          iconClass: iconClass || '', // Store the specific icon class
        });
        originalElements[`socialLink_${index}`] = linkElement;
      });

      // Navigation Links
      footerData.navLinks = [];
      originalFooterNavigationContent.querySelectorAll('.footer-navigation__links > li > a').forEach((linkElement, index) => {
        footerData.navLinks.push({
          title: linkElement.title || linkElement.textContent.trim(), // Prioritize title attribute
          url: linkElement.href,
        });
        originalElements[`navLink_${index}`] = linkElement;
      });
    }
  }

  // --- Footer Divider ---
  const originalFooterDivider = block.querySelector('.footer-divider');
  if (originalFooterDivider) {
    originalElements.footerDivider = originalFooterDivider;
  }

  // --- Footer Bottom Section ---
  const originalFooterBottom = block.querySelector('.footer-bottom');
  if (originalFooterBottom) {
    originalElements.footerBottom = originalFooterBottom;

    // Languages
    footerData.languages = [];
    originalFooterBottom.querySelectorAll('.footer-language-selector__list > li > a').forEach((linkElement, index) => {
      footerData.languages.push({
        label: linkElement.textContent.trim(),
        url: linkElement.href,
        langCode: linkElement.getAttribute('data-lang'),
        active: linkElement.parentElement.classList.contains('active'),
      });
      originalElements[`languageLink_${index}`] = linkElement;
    });

    // Policy Links
    footerData.policyLinks = [];
    originalFooterBottom.querySelectorAll('.footer-policy-links__content > a').forEach((linkElement, index) => {
      footerData.policyLinks.push({
        title: linkElement.title || linkElement.textContent.trim(), // Prioritize title attribute
        url: linkElement.href,
      });
      originalElements[`policyLink_${index}`] = linkElement;
    });

    // Copyright
    const originalCopyrightP = originalFooterBottom.querySelector('.footer-policy-links__copyright');
    if (originalCopyrightP) {
      footerData.copyright = originalCopyrightP.textContent.trim();
      originalElements.copyrightP = originalCopyrightP;
    }
  }


  // --- DOM Reconstruction ---

  // Clear the original block content. The `block` element itself (`.footer-wrapper`) remains.
  block.textContent = '';

  // --- Reconstruct Footer Navigation Section ---
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';
  if (originalElements.footerNavigation) {
    moveInstrumentation(originalElements.footerNavigation, footerNavigation);
  }

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

  // --- Reconstruct Footer Divider ---
  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  if (originalElements.footerDivider) {
    moveInstrumentation(originalElements.footerDivider, footerDivider);
  }
  block.append(footerDivider);

  // --- Reconstruct Footer Bottom Section ---
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';
  if (originalElements.footerBottom) {
    moveInstrumentation(originalElements.footerBottom, footerBottom);
  }

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