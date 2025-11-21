import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');
  moveInstrumentation(block, footerWrapper);

  // Footer Navigation Section
  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');
  const footerNavigationWrapper = document.createElement('div');
  footerNavigationWrapper.classList.add('footer-navigation__wrapper');

  // Logo
  const logoCell = block.children[0]?.children[0];
  if (logoCell) {
    const logoLinkElement = logoCell.querySelector('a');
    if (logoLinkElement) {
      const footerNavigationLogo = document.createElement('div');
      footerNavigationLogo.classList.add('footer-navigation__logo');
      const newLogoLink = document.createElement('a');
      newLogoLink.href = logoLinkElement.href;
      newLogoLink.target = '_self';
      const qdIcon = document.createElement('span');
      qdIcon.classList.add('qd-icon', 'qd-icon--logo', 'footer-qd-logo');
      // Recreate all path spans
      for (let i = 1; i <= 25; i += 1) {
        const pathSpan = document.createElement('span');
        pathSpan.classList.add(`path${i}`);
        qdIcon.append(pathSpan);
      }
      newLogoLink.append(qdIcon);
      footerNavigationLogo.append(newLogoLink);
      footerNavigationWrapper.append(footerNavigationLogo);
      moveInstrumentation(logoCell, footerNavigationLogo);
    }
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');

  // Social Links
  const socialLinksCell = block.children[1]?.children[0];
  if (socialLinksCell) {
    const footerSocialLinks = document.createElement('div');
    footerSocialLinks.classList.add('footer-social-links');
    const socialLinksList = document.createElement('ul');
    socialLinksList.classList.add('footer-social-links__list');

    [...socialLinksCell.children].forEach((row) => {
      const link = row.querySelector('a');
      if (link) {
        const socialLinkItem = document.createElement('li');
        socialLinkItem.classList.add('footer-social-links__item');
        const socialLinkAnchor = document.createElement('a');
        socialLinkAnchor.classList.add('footer-social-links__icon', ...link.classList);
        socialLinkAnchor.href = link.href;
        socialLinkAnchor.target = '_blank';
        socialLinkAnchor.setAttribute('aria-label', link.getAttribute('aria-label'));
        socialLinkItem.append(socialLinkAnchor);
        socialLinksList.append(socialLinkItem);
        moveInstrumentation(row, socialLinkItem);
      }
    });
    footerSocialLinks.append(socialLinksList);
    footerNavigationContent.append(footerSocialLinks);
  }

  // Navigation Links
  const navLinksCell = block.children[2]?.children[0];
  if (navLinksCell) {
    const navLinksList = document.createElement('ul');
    navLinksList.classList.add('footer-navigation__links');

    [...navLinksCell.children].forEach((row) => {
      const link = row.querySelector('a');
      if (link) {
        const navLinkItem = document.createElement('li');
        const navLinkAnchor = document.createElement('a');
        navLinkAnchor.classList.add('footer-navigation__link-item');
        navLinkAnchor.setAttribute('tabindex', '0');
        navLinkAnchor.target = '_self';
        navLinkAnchor.title = link.title;
        navLinkAnchor.href = link.href;
        navLinkAnchor.textContent = link.textContent.trim();
        navLinkItem.append(navLinkAnchor);
        navLinksList.append(navLinkItem);
        moveInstrumentation(row, navLinkItem);
      }
    });
    footerNavigationContent.append(navLinksList);
  }

  footerNavigationWrapper.append(footerNavigationContent);
  footerNavigation.append(footerNavigationWrapper);
  footerWrapper.append(footerNavigation);

  // Divider
  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  // Language Selector
  const languageLinksCell = block.children[3]?.children[0];
  if (languageLinksCell) {
    const footerLanguageSelector = document.createElement('div');
    footerLanguageSelector.classList.add('footer-language-selector');
    const languageSelectorList = document.createElement('ul');
    languageSelectorList.classList.add('footer-language-selector__list');

    [...languageLinksCell.children].forEach((row) => {
      const link = row.querySelector('a');
      if (link) {
        const languageItem = document.createElement('li');
        if (row.textContent.includes('active')) {
          languageItem.classList.add('active');
        }
        const languageAnchor = document.createElement('a');
        languageAnchor.href = link.href;
        languageAnchor.setAttribute('aria-label', link.getAttribute('aria-label'));
        languageAnchor.classList.add('footer-language-selector__link');
        languageAnchor.setAttribute('data-lang', link.getAttribute('data-lang'));
        languageAnchor.textContent = link.textContent.trim();
        languageItem.append(languageAnchor);
        languageSelectorList.append(languageItem);
        moveInstrumentation(row, languageItem);
      }
    });
    footerLanguageSelector.append(languageSelectorList);
    footerBottom.append(footerLanguageSelector);
  }

  // Policy Links and Copyright
  const policyLinksCell = block.children[4]?.children[0];
  const copyrightCell = block.children[5]?.children[0];

  if (policyLinksCell || copyrightCell) {
    const footerPolicyLinks = document.createElement('div');
    footerPolicyLinks.classList.add('footer-policy-links');
    const footerPolicyLinksWrapper = document.createElement('div');
    footerPolicyLinksWrapper.classList.add('footer-policy-links__wrapper');

    if (policyLinksCell) {
      const footerPolicyLinksContent = document.createElement('div');
      footerPolicyLinksContent.classList.add('footer-policy-links__content');

      [...policyLinksCell.children].forEach((row) => {
        const link = row.querySelector('a');
        if (link) {
          const policyLinkAnchor = document.createElement('a');
          policyLinkAnchor.setAttribute('tabindex', '0');
          policyLinkAnchor.classList.add('footer-policy-links__item');
          policyLinkAnchor.title = link.title;
          policyLinkAnchor.href = link.href;
          policyLinkAnchor.target = '_self';
          policyLinkAnchor.textContent = link.textContent.trim();
          footerPolicyLinksContent.append(policyLinkAnchor);
          moveInstrumentation(row, policyLinkAnchor);
        }
      });
      footerPolicyLinksWrapper.append(footerPolicyLinksContent);
    }

    if (copyrightCell) {
      const copyrightParagraph = document.createElement('p');
      copyrightParagraph.classList.add('footer-policy-links__copyright');
      copyrightParagraph.textContent = copyrightCell.textContent.trim();
      footerPolicyLinksWrapper.append(copyrightParagraph);
      moveInstrumentation(copyrightCell, copyrightParagraph);
    }
    footerPolicyLinks.append(footerPolicyLinksWrapper);
    footerBottom.append(footerPolicyLinks);
  }

  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
