import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');
  moveInstrumentation(block, footerWrapper);

  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');
  footerWrapper.append(footerNavigation);

  // Logo
  const logoCell = block.children[0]?.children[0];
  if (logoCell) {
    const logoLink = logoCell.querySelector('a');
    if (logoLink) {
      const footerNavigationLogo = document.createElement('div');
      footerNavigationLogo.classList.add('footer-navigation__logo');
      const newLogoLink = document.createElement('a');
      newLogoLink.href = logoLink.href;
      newLogoLink.target = '_self';
      const qdIcon = logoLink.querySelector('.qd-icon');
      if (qdIcon) {
        const newQdIcon = qdIcon.cloneNode(true);
        newLogoLink.append(newQdIcon);
      }
      footerNavigationLogo.append(newLogoLink);
      footerNavigation.append(footerNavigationLogo);
      moveInstrumentation(logoCell, footerNavigationLogo);
    }
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');
  footerNavigation.append(footerNavigationContent);

  // Social Links
  const socialLinksCell = block.children[0]?.children[1];
  if (socialLinksCell) {
    const socialLinksUl = document.createElement('ul');
    socialLinksUl.classList.add('footer-social-links__list');

    const socialLinksDiv = document.createElement('div');
    socialLinksDiv.classList.add('footer-social-links');
    socialLinksDiv.append(socialLinksUl);
    footerNavigationContent.append(socialLinksDiv);
    moveInstrumentation(socialLinksCell, socialLinksDiv);

    [...socialLinksCell.children].forEach((socialLinkRow) => {
      const socialLink = socialLinkRow.querySelector('a');
      if (socialLink) {
        const li = document.createElement('li');
        li.classList.add('footer-social-links__item');
        moveInstrumentation(socialLinkRow, li);

        const newLink = document.createElement('a');
        newLink.classList.add('footer-social-links__icon');
        newLink.href = socialLink.href;
        newLink.target = '_blank';
        newLink.setAttribute('aria-label', socialLink.getAttribute('aria-label'));
        const iconClass = socialLink.className.split(' ').find(cls => cls.startsWith('qd-icon--'));
        if (iconClass) {
          newLink.classList.add('qd-icon', iconClass);
        }
        li.append(newLink);
        socialLinksUl.append(li);
      }
    });
  }

  // Navigation Links
  const navigationLinksCell = block.children[0]?.children[2];
  if (navigationLinksCell) {
    const navigationLinksUl = document.createElement('ul');
    navigationLinksUl.classList.add('footer-navigation__links');
    footerNavigationContent.append(navigationLinksUl);
    moveInstrumentation(navigationLinksCell, navigationLinksUl);

    [...navigationLinksCell.children].forEach((navLinkRow) => {
      const navLink = navLinkRow.querySelector('a');
      if (navLink) {
        const li = document.createElement('li');
        moveInstrumentation(navLinkRow, li);

        const newLink = document.createElement('a');
        newLink.classList.add('footer-navigation__link-item');
        newLink.href = navLink.href;
        newLink.textContent = navLink.textContent;
        newLink.target = '_self';
        newLink.setAttribute('tabindex', '0');
        newLink.setAttribute('title', navLink.textContent);
        li.append(newLink);
        navigationLinksUl.append(li);
      }
    });
  }

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');
  footerWrapper.append(footerBottom);

  // Language Selector
  const languageSelectorCell = block.children[0]?.children[3];
  if (languageSelectorCell) {
    const languageSelectorDiv = document.createElement('div');
    languageSelectorDiv.classList.add('footer-language-selector');
    footerBottom.append(languageSelectorDiv);
    moveInstrumentation(languageSelectorCell, languageSelectorDiv);

    const languageUl = document.createElement('ul');
    languageUl.classList.add('footer-language-selector__list');
    languageSelectorDiv.append(languageUl);

    [...languageSelectorCell.children].forEach((langLinkRow) => {
      const langLink = langLinkRow.querySelector('a');
      if (langLink) {
        const li = document.createElement('li');
        li.classList.add('footer-language-selector__item');
        if (langLink.parentElement.classList.contains('active')) {
          li.classList.add('active');
        }
        moveInstrumentation(langLinkRow, li);

        const newLink = document.createElement('a');
        newLink.classList.add('footer-language-selector__link');
        newLink.href = langLink.href;
        newLink.textContent = langLink.textContent;
        newLink.setAttribute('aria-label', langLink.getAttribute('aria-label'));
        newLink.setAttribute('data-lang', langLink.getAttribute('data-lang'));
        li.append(newLink);
        languageUl.append(li);
      }
    });
  }

  // Policy Links and Copyright
  const policyLinksCell = block.children[0]?.children[4];
  if (policyLinksCell) {
    const footerPolicyLinks = document.createElement('div');
    footerPolicyLinks.classList.add('footer-policy-links');
    footerBottom.append(footerPolicyLinks);
    moveInstrumentation(policyLinksCell, footerPolicyLinks);

    const policyLinksWrapper = document.createElement('div');
    policyLinksWrapper.classList.add('footer-policy-links__wrapper');
    footerPolicyLinks.append(policyLinksWrapper);

    const policyLinksContent = document.createElement('div');
    policyLinksContent.classList.add('footer-policy-links__content');
    policyLinksWrapper.append(policyLinksContent);

    // Policy Links
    [...policyLinksCell.children].forEach((policyLinkRow) => {
      const policyLink = policyLinkRow.querySelector('a');
      if (policyLink) {
        const newLink = document.createElement('a');
        newLink.classList.add('footer-policy-links__item');
        newLink.href = policyLink.href;
        newLink.textContent = policyLink.textContent;
        newLink.target = '_self';
        newLink.setAttribute('tabindex', '0');
        newLink.setAttribute('title', policyLink.textContent);
        policyLinksContent.append(newLink);
        moveInstrumentation(policyLinkRow, newLink);
      }
    });

    // Copyright
    const copyrightP = policyLinksCell.querySelector('p');
    if (copyrightP) {
      const newCopyrightP = document.createElement('p');
      newCopyrightP.classList.add('footer-policy-links__copyright');
      newCopyrightP.textContent = copyrightP.textContent;
      policyLinksWrapper.append(newCopyrightP);
      moveInstrumentation(copyrightP, newCopyrightP);
    }
  }

  block.textContent = '';
  block.append(footerWrapper);
}
