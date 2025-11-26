import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  // Footer Navigation Section
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';
  moveInstrumentation(block.children[0], footerNavigation); // Transfer instrumentation for the whole navigation section

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.className = 'footer-navigation__logo';
  const logoLink = block.children[0].children[0].querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = logoLink.target;
    const logoSpan = logoLink.querySelector('span.qd-icon--logo');
    if (logoSpan) {
      const newLogoSpan = logoSpan.cloneNode(true);
      moveInstrumentation(logoSpan, newLogoSpan);
      newLogoLink.append(newLogoSpan);
    }
    footerNavigationLogo.append(newLogoLink);
    moveInstrumentation(logoLink, newLogoLink);
  }
  footerNavigation.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';

  // Social Links
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.className = 'footer-social-links';
  const socialLinksList = document.createElement('ul');
  socialLinksList.className = 'footer-social-links__list';

  const socialLinksRow = block.children[0].children[1].children[0];
  if (socialLinksRow) {
    [...socialLinksRow.children].forEach((socialLinkCell) => {
      const socialLinkItem = document.createElement('li');
      socialLinkItem.className = 'footer-social-links__item';
      moveInstrumentation(socialLinkCell, socialLinkItem);

      const link = socialLinkCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.className = link.className;
        newLink.target = link.target;
        newLink.href = link.href;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        socialLinkItem.append(newLink);
        moveInstrumentation(link, newLink);
      }
      socialLinksList.append(socialLinkItem);
    });
  }
  footerSocialLinks.append(socialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  // Navigation Links
  const footerNavigationLinks = document.createElement('ul');
  footerNavigationLinks.className = 'footer-navigation__links';

  const navigationLinksRow = block.children[0].children[1].children[1];
  if (navigationLinksRow) {
    [...navigationLinksRow.children].forEach((navLinkCell) => {
      const navLinkItem = document.createElement('li');
      moveInstrumentation(navLinkCell, navLinkItem);

      const link = navLinkCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.className = 'footer-navigation__link-item';
        newLink.tabIndex = 0;
        newLink.target = link.target;
        newLink.title = link.title;
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        navLinkItem.append(newLink);
        moveInstrumentation(link, newLink);
      }
      footerNavigationLinks.append(navLinkItem);
    });
  }
  footerNavigationContent.append(footerNavigationLinks);
  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  footerWrapper.append(footerDivider);

  // Footer Bottom Section
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';
  moveInstrumentation(block.children[1], footerBottom); // Transfer instrumentation for the whole bottom section

  // Language Selector
  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.className = 'footer-language-selector';
  const languageList = document.createElement('ul');
  languageList.className = 'footer-language-selector__list';

  const languageRow = block.children[1].children[0];
  if (languageRow) {
    [...languageRow.children].forEach((langCell) => {
      const langItem = document.createElement('li');
      langItem.className = 'footer-language-selector__item';
      moveInstrumentation(langCell, langItem);

      const link = langCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        newLink.className = 'footer-language-selector__link';
        newLink.setAttribute('data-lang', link.getAttribute('data-lang'));
        newLink.textContent = link.textContent;
        if (langCell.classList.contains('active')) {
          langItem.classList.add('active');
        }
        langItem.append(newLink);
        moveInstrumentation(link, newLink);
      }
      languageList.append(langItem);
    });
  }
  footerLanguageSelector.append(languageList);
  footerBottom.append(footerLanguageSelector);

  // Policy Links and Copyright
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.className = 'footer-policy-links';
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.className = 'footer-policy-links__wrapper';

  const policyLinksContent = document.createElement('div');
  policyLinksContent.className = 'footer-policy-links__content';

  const policyLinksRow = block.children[1].children[1].children[0];
  if (policyLinksRow) {
    [...policyLinksRow.children].forEach((policyLinkCell) => {
      const link = policyLinkCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.tabIndex = 0;
        newLink.className = 'footer-policy-links__item';
        newLink.title = link.title;
        newLink.href = link.href;
        newLink.target = link.target;
        newLink.textContent = link.textContent;
        policyLinksContent.append(newLink);
        moveInstrumentation(link, newLink);
      }
    });
  }
  policyLinksWrapper.append(policyLinksContent);

  const copyrightP = block.children[1].children[1].children[1].querySelector('p');
  if (copyrightP) {
    const newCopyrightP = document.createElement('p');
    newCopyrightP.className = 'footer-policy-links__copyright';
    newCopyrightP.textContent = copyrightP.textContent;
    policyLinksWrapper.append(newCopyrightP);
    moveInstrumentation(copyrightP, newCopyrightP);
  }

  footerPolicyLinks.append(policyLinksWrapper);
  footerBottom.append(footerPolicyLinks);
  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
