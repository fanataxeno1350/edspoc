import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');
  moveInstrumentation(block, footerWrapper);

  const rows = [...block.children];

  // Footer Navigation Section
  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');
  footerWrapper.append(footerNavigation);

  // Logo
  const logoCell = rows[0]?.children[0];
  if (logoCell) {
    const logoLink = logoCell.querySelector('a');
    if (logoLink) {
      const footerLogoDiv = document.createElement('div');
      footerLogoDiv.classList.add('footer-navigation__logo');
      const newLogoLink = document.createElement('a');
      newLogoLink.href = logoLink.href;
      newLogoLink.target = logoLink.target;
      const qdIcon = document.createElement('span');
      qdIcon.className = 'qd-icon qd-icon--logo qd-logo-footer';
      // Recreate all path spans
      for (let i = 1; i <= 25; i += 1) {
        const pathSpan = document.createElement('span');
        pathSpan.classList.add(`path${i}`);
        qdIcon.append(pathSpan);
      }
      newLogoLink.append(qdIcon);
      footerLogoDiv.append(newLogoLink);
      footerNavigation.append(footerLogoDiv);
      moveInstrumentation(logoLink, newLogoLink);
    }
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');
  footerNavigation.append(footerNavigationContent);

  // Social Links
  const socialLinksCell = rows[0]?.children[1];
  if (socialLinksCell) {
    const socialLinksDiv = document.createElement('div');
    socialLinksDiv.classList.add('footer-social-links');
    const socialLinksList = document.createElement('ul');
    socialLinksList.classList.add('footer-social-links__list');

    const socialLinkElements = socialLinksCell.querySelectorAll('li');
    socialLinkElements.forEach((socialLinkItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-social-links__item');
      const link = socialLinkItem.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.className = link.className;
        newLink.target = link.target;
        newLink.href = link.href;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        li.append(newLink);
        moveInstrumentation(socialLinkItem, li);
        moveInstrumentation(link, newLink);
      }
      socialLinksList.append(li);
    });
    socialLinksDiv.append(socialLinksList);
    footerNavigationContent.append(socialLinksDiv);
  }

  // Footer Navigation Links
  const footerNavLinksCell = rows[0]?.children[2];
  if (footerNavLinksCell) {
    const footerNavLinksList = document.createElement('ul');
    footerNavLinksList.classList.add('footer-navigation__links');

    const navLinkElements = footerNavLinksCell.querySelectorAll('li');
    navLinkElements.forEach((navLinkItem) => {
      const li = document.createElement('li');
      const link = navLinkItem.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.className = link.className;
        newLink.tabIndex = link.tabIndex;
        newLink.target = link.target;
        newLink.title = link.title;
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        li.append(newLink);
        moveInstrumentation(navLinkItem, li);
        moveInstrumentation(link, newLink);
      }
      footerNavLinksList.append(li);
    });
    footerNavigationContent.append(footerNavLinksList);
  }

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  // Footer Bottom Section
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');
  footerWrapper.append(footerBottom);

  // Language Selector
  const languageSelectorCell = rows[0]?.children[3];
  if (languageSelectorCell) {
    const footerLanguageSelector = document.createElement('div');
    footerLanguageSelector.classList.add('footer-language-selector');
    const languageList = document.createElement('ul');
    languageList.classList.add('footer-language-selector__list');

    const languageLinkElements = languageSelectorCell.querySelectorAll('li');
    languageLinkElements.forEach((langLinkItem) => {
      const li = document.createElement('li');
      li.className = langLinkItem.className;
      const link = langLinkItem.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        newLink.className = link.className;
        newLink.setAttribute('data-lang', link.getAttribute('data-lang'));
        newLink.textContent = link.textContent;
        li.append(newLink);
        moveInstrumentation(langLinkItem, li);
        moveInstrumentation(link, newLink);
      }
      languageList.append(li);
    });
    footerLanguageSelector.append(languageList);
    footerBottom.append(footerLanguageSelector);
  }

  // Policy Links and Copyright
  const policyLinksCell = rows[0]?.children[4];
  const copyrightCell = rows[0]?.children[5];

  if (policyLinksCell || copyrightCell) {
    const footerPolicyLinks = document.createElement('div');
    footerPolicyLinks.classList.add('footer-policy-links');
    const policyLinksWrapper = document.createElement('div');
    policyLinksWrapper.classList.add('footer-policy-links__wrapper');

    if (policyLinksCell) {
      const policyLinksContent = document.createElement('div');
      policyLinksContent.classList.add('footer-policy-links__content');

      const policyLinkElements = policyLinksCell.querySelectorAll('a');
      policyLinkElements.forEach((policyLink) => {
        const newLink = document.createElement('a');
        newLink.tabIndex = policyLink.tabIndex;
        newLink.classList.add('footer-policy-links__item');
        newLink.title = policyLink.title;
        newLink.href = policyLink.href;
        newLink.target = policyLink.target;
        newLink.textContent = policyLink.textContent;
        policyLinksContent.append(newLink);
        moveInstrumentation(policyLink, newLink);
      });
      policyLinksWrapper.append(policyLinksContent);
    }

    if (copyrightCell) {
      const copyrightP = document.createElement('p');
      copyrightP.classList.add('footer-policy-links__copyright');
      copyrightP.textContent = copyrightCell.textContent.trim();
      policyLinksWrapper.append(copyrightP);
      moveInstrumentation(copyrightCell, copyrightP);
    }
    footerPolicyLinks.append(policyLinksWrapper);
    footerBottom.append(footerPolicyLinks);
  }

  block.textContent = '';
  block.append(footerWrapper);
}
