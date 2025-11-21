import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');
  moveInstrumentation(block, footerWrapper);

  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');
  footerWrapper.append(footerNavigation);

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.classList.add('footer-navigation__logo');
  footerNavigation.append(footerNavigationLogo);

  // Logo Link
  const logoLinkCell = block.children[0]?.children[0];
  if (logoLinkCell) {
    const logoAnchor = logoLinkCell.querySelector('a');
    if (logoAnchor) {
      const newLogoAnchor = document.createElement('a');
      newLogoAnchor.href = logoAnchor.href;
      newLogoAnchor.target = logoAnchor.target;
      newLogoAnchor.innerHTML = logoAnchor.innerHTML;
      moveInstrumentation(logoAnchor, newLogoAnchor);
      footerNavigationLogo.append(newLogoAnchor);
    }
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');
  footerNavigation.append(footerNavigationContent);

  // Social Links
  const socialLinksContainer = document.createElement('div');
  socialLinksContainer.classList.add('footer-social-links');
  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-social-links__list');
  socialLinksContainer.append(socialLinksList);
  footerNavigationContent.append(socialLinksContainer);

  const socialLinksRow = block.children[1]; // Assuming social links are in the second row
  if (socialLinksRow) {
    const socialLinkItems = socialLinksRow.querySelectorAll('li');
    socialLinkItems.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('footer-social-links__item');
      moveInstrumentation(item, li);
      const anchor = item.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.classList.add('footer-social-links__icon', ...Array.from(anchor.classList).filter((cls) => cls.startsWith('qd-icon--')));
        newAnchor.target = anchor.target;
        newAnchor.href = anchor.href;
        newAnchor.setAttribute('aria-label', anchor.getAttribute('aria-label'));
        moveInstrumentation(anchor, newAnchor);
        li.append(newAnchor);
      }
      socialLinksList.append(li);
    });
  }

  // Navigation Links
  const navigationLinksList = document.createElement('ul');
  navigationLinksList.classList.add('footer-navigation__links');
  footerNavigationContent.append(navigationLinksList);

  const navigationLinksRow = block.children[2]; // Assuming navigation links are in the third row
  if (navigationLinksRow) {
    const navLinkItems = navigationLinksRow.querySelectorAll('li');
    navLinkItems.forEach((item) => {
      const li = document.createElement('li');
      moveInstrumentation(item, li);
      const anchor = item.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.classList.add('footer-navigation__link-item');
        newAnchor.tabIndex = anchor.tabIndex;
        newAnchor.target = anchor.target;
        newAnchor.title = anchor.title;
        newAnchor.href = anchor.href;
        newAnchor.textContent = anchor.textContent.trim();
        moveInstrumentation(anchor, newAnchor);
        li.append(newAnchor);
      }
      navigationLinksList.append(li);
    });
  }

  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');
  footerWrapper.append(footerBottom);

  // Language Selector
  const languageSelector = document.createElement('div');
  languageSelector.classList.add('footer-language-selector');
  const languageSelectorList = document.createElement('ul');
  languageSelectorList.classList.add('footer-language-selector__list');
  languageSelector.append(languageSelectorList);
  footerBottom.append(languageSelector);

  const languageLinksRow = block.children[3]; // Assuming language links are in the fourth row
  if (languageLinksRow) {
    const langLinkItems = languageLinksRow.querySelectorAll('li');
    langLinkItems.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('footer-language-selector__item');
      if (item.classList.contains('active')) {
        li.classList.add('active');
      }
      moveInstrumentation(item, li);
      const anchor = item.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.href = anchor.href;
        newAnchor.setAttribute('aria-label', anchor.getAttribute('aria-label'));
        newAnchor.classList.add('footer-language-selector__link');
        newAnchor.setAttribute('data-lang', anchor.getAttribute('data-lang'));
        newAnchor.textContent = anchor.textContent.trim();
        moveInstrumentation(anchor, newAnchor);
        li.append(newAnchor);
      }
      languageSelectorList.append(li);
    });
  }

  // Policy Links and Copyright
  const policyLinksContainer = document.createElement('div');
  policyLinksContainer.classList.add('footer-policy-links');
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.classList.add('footer-policy-links__wrapper');
  policyLinksContainer.append(policyLinksWrapper);
  footerBottom.append(policyLinksContainer);

  const policyLinksContent = document.createElement('div');
  policyLinksContent.classList.add('footer-policy-links__content');
  policyLinksWrapper.append(policyLinksContent);

  const policyLinksRow = block.children[4]; // Assuming policy links are in the fifth row
  if (policyLinksRow) {
    const policyLinkAnchors = policyLinksRow.querySelectorAll('a');
    policyLinkAnchors.forEach((anchor) => {
      const newAnchor = document.createElement('a');
      newAnchor.tabIndex = anchor.tabIndex;
      newAnchor.classList.add('footer-policy-links__item');
      newAnchor.title = anchor.title;
      newAnchor.href = anchor.href;
      newAnchor.target = anchor.target;
      newAnchor.textContent = anchor.textContent.trim();
      moveInstrumentation(anchor, newAnchor);
      policyLinksContent.append(newAnchor);
    });
  }

  const copyrightRow = block.children[5]; // Assuming copyright is in the sixth row
  if (copyrightRow) {
    const copyrightP = copyrightRow.querySelector('p');
    if (copyrightP) {
      const newCopyrightP = document.createElement('p');
      newCopyrightP.classList.add('footer-policy-links__copyright');
      newCopyrightP.textContent = copyrightP.textContent.trim();
      moveInstrumentation(copyrightP, newCopyrightP);
      policyLinksWrapper.append(newCopyrightP);
    }
  }

  block.textContent = '';
  block.append(footerWrapper);
}
