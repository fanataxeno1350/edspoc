import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  // Footer Navigation
  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.classList.add('footer-navigation__logo');
  const logoLink = document.createElement('a');
  logoLink.href = '/'; // Default or get from block if available
  logoLink.target = '_self';
  const logoSpan = document.createElement('span');
  logoSpan.classList.add('qd-icon', 'qd-icon--logo', 'qd-logo-footer');
  for (let i = 1; i <= 25; i += 1) {
    const pathSpan = document.createElement('span');
    pathSpan.classList.add(`path${i}`);
    logoSpan.append(pathSpan);
  }
  logoLink.append(logoSpan);
  footerNavigationLogo.append(logoLink);
  footerNavigation.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');

  // Social Links
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.classList.add('footer-social-links');
  const footerSocialLinksList = document.createElement('ul');
  footerSocialLinksList.classList.add('footer-social-links__list');

  // Find the social links row in the block
  const socialLinksRow = [...block.children].find((row) => row.children[0]?.textContent.toLowerCase() === 'social links');
  if (socialLinksRow) {
    const socialLinksCells = [...socialLinksRow.children].slice(1); // Skip the label cell
    socialLinksCells.forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        moveInstrumentation(cell, li);
        li.classList.add('footer-social-links__item');
        const newLink = document.createElement('a');
        newLink.classList.add('footer-social-links__icon');
        newLink.target = '_blank';
        newLink.href = link.href;
        newLink.setAttribute('aria-label', link.textContent);

        // Determine icon class based on link text content
        const iconClassMap = {
          x: 'qd-icon--x',
          instagram: 'qd-icon--instagram',
          youtube: 'qd-icon--youtube',
          tiktok: 'qd-icon--tiktok',
          linkedin: 'qd-icon--linkedin',
        };
        const iconName = link.textContent.toLowerCase();
        if (iconClassMap[iconName]) {
          newLink.classList.add('qd-icon', iconClassMap[iconName]);
        }
        li.append(newLink);
        footerSocialLinksList.append(li);
      }
    });
  }
  footerSocialLinks.append(footerSocialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  // Navigation Links
  const footerNavigationLinks = document.createElement('ul');
  footerNavigationLinks.classList.add('footer-navigation__links');

  // Find the navigation links row in the block
  const navLinksRow = [...block.children].find((row) => row.children[0]?.textContent.toLowerCase() === 'navigation links');
  if (navLinksRow) {
    const navLinksCells = [...navLinksRow.children].slice(1); // Skip the label cell
    navLinksCells.forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        moveInstrumentation(cell, li);
        const newLink = document.createElement('a');
        newLink.classList.add('footer-navigation__link-item');
        newLink.tabIndex = 0;
        newLink.target = '_self';
        newLink.title = link.textContent;
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        li.append(newLink);
        footerNavigationLinks.append(li);
      }
    });
  }
  footerNavigationContent.append(footerNavigationLinks);

  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  // Language Selector
  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.classList.add('footer-language-selector');
  const footerLanguageSelectorList = document.createElement('ul');
  footerLanguageSelectorList.classList.add('footer-language-selector__list');

  // Find the language links row in the block
  const languageLinksRow = [...block.children].find((row) => row.children[0]?.textContent.toLowerCase() === 'language links');
  if (languageLinksRow) {
    const languageLinksCells = [...languageLinksRow.children].slice(1);
    languageLinksCells.forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        moveInstrumentation(cell, li);
        li.classList.add('footer-language-selector__item');
        if (link.dataset.lang === 'en') { // Assuming 'en' is default active
          li.classList.add('active');
        }
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.setAttribute('aria-label', link.textContent);
        newLink.classList.add('footer-language-selector__link');
        newLink.setAttribute('data-lang', link.dataset.lang || ''); // Ensure data-lang is transferred
        newLink.textContent = link.textContent;
        li.append(newLink);
        footerLanguageSelectorList.append(li);
      }
    });
  }
  footerLanguageSelector.append(footerLanguageSelectorList);
  footerBottom.append(footerLanguageSelector);

  // Policy Links and Copyright
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.classList.add('footer-policy-links');
  const footerPolicyLinksWrapper = document.createElement('div');
  footerPolicyLinksWrapper.classList.add('footer-policy-links__wrapper');
  const footerPolicyLinksContent = document.createElement('div');
  footerPolicyLinksContent.classList.add('footer-policy-links__content');

  // Find the policy links row in the block
  const policyLinksRow = [...block.children].find((row) => row.children[0]?.textContent.toLowerCase() === 'policy links');
  if (policyLinksRow) {
    const policyLinksCells = [...policyLinksRow.children].slice(1);
    policyLinksCells.forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        moveInstrumentation(cell, newLink);
        newLink.tabIndex = 0;
        newLink.classList.add('footer-policy-links__item');
        newLink.title = link.textContent;
        newLink.href = link.href;
        newLink.target = '_self';
        newLink.textContent = link.textContent;
        footerPolicyLinksContent.append(newLink);
      }
    });
  }
  footerPolicyLinksWrapper.append(footerPolicyLinksContent);

  // Copyright
  const copyrightRow = [...block.children].find((row) => row.children[0]?.textContent.toLowerCase() === 'copyright');
  if (copyrightRow && copyrightRow.children[1]) {
    const copyrightP = document.createElement('p');
    moveInstrumentation(copyrightRow.children[1], copyrightP);
    copyrightP.classList.add('footer-policy-links__copyright');
    copyrightP.textContent = copyrightRow.children[1].textContent;
    footerPolicyLinksWrapper.append(copyrightP);
  }

  footerPolicyLinks.append(footerPolicyLinksWrapper);
  footerBottom.append(footerPolicyLinks);

  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
