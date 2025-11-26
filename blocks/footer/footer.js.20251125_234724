import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  // --- Footer Navigation --- 
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.className = 'footer-navigation__logo';
  const logoLink = document.createElement('a');
  const authoredLogo = block.querySelector('[data-aue-prop="logo"]');
  if (authoredLogo) {
    logoLink.href = authoredLogo.textContent.trim();
    moveInstrumentation(authoredLogo, logoLink);
  } else {
    logoLink.href = '/'; // Default if not found
  }
  logoLink.target = '_self';
  const logoSpan = document.createElement('span');
  logoSpan.className = 'qd-icon qd-icon--logo qd-logo-footer';
  for (let i = 1; i <= 25; i += 1) {
    const pathSpan = document.createElement('span');
    pathSpan.className = `path${i}`;
    logoSpan.append(pathSpan);
  }
  logoLink.append(logoSpan);
  footerNavigationLogo.append(logoLink);
  footerNavigation.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';

  // --- Social Links --- 
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.className = 'footer-social-links';
  const socialLinksList = document.createElement('ul');
  socialLinksList.className = 'footer-social-links__list';

  const authoredSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  authoredSocialLinks.forEach((authoredLink) => {
    const socialLinkItem = document.createElement('li');
    socialLinkItem.className = 'footer-social-links__item';
    const socialLinkAnchor = document.createElement('a');
    socialLinkAnchor.className = `footer-social-links__icon qd-icon qd-icon--${authoredLink.dataset.aueResource.split('/').pop()}`;
    socialLinkAnchor.target = '_blank';
    const url = authoredLink.querySelector('[data-aue-prop="url"]');
    if (url) {
      socialLinkAnchor.href = url.textContent.trim();
      moveInstrumentation(url, socialLinkAnchor);
    }
    const ariaLabel = authoredLink.querySelector('[data-aue-prop="ariaLabel"]');
    if (ariaLabel) {
      socialLinkAnchor.setAttribute('aria-label', ariaLabel.textContent.trim());
      moveInstrumentation(ariaLabel, socialLinkAnchor);
    }
    socialLinkItem.append(socialLinkAnchor);
    socialLinksList.append(socialLinkItem);
    moveInstrumentation(authoredLink, socialLinkItem);
  });
  footerSocialLinks.append(socialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  // --- Navigation Links --- 
  const navigationLinksList = document.createElement('ul');
  navigationLinksList.className = 'footer-navigation__links';

  const authoredNavigationLinks = block.querySelectorAll('[data-aue-model="footerNavigationLink"]');
  authoredNavigationLinks.forEach((authoredLink) => {
    const navLinkItem = document.createElement('li');
    const navLinkAnchor = document.createElement('a');
    navLinkAnchor.className = 'footer-navigation__link-item';
    navLinkAnchor.tabIndex = 0;
    navLinkAnchor.target = '_self';

    const url = authoredLink.querySelector('[data-aue-prop="url"]');
    if (url) {
      navLinkAnchor.href = url.textContent.trim();
      moveInstrumentation(url, navLinkAnchor);
    }
    const title = authoredLink.querySelector('[data-aue-prop="title"]');
    if (title) {
      navLinkAnchor.title = title.textContent.trim();
      navLinkAnchor.textContent = title.textContent.trim();
      moveInstrumentation(title, navLinkAnchor);
    }
    navLinkItem.append(navLinkAnchor);
    navigationLinksList.append(navLinkItem);
    moveInstrumentation(authoredLink, navLinkItem);
  });
  footerNavigationContent.append(navigationLinksList);
  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  // --- Footer Divider --- 
  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  footerWrapper.append(footerDivider);

  // --- Footer Bottom --- 
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';

  // --- Language Selector --- 
  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.className = 'footer-language-selector';
  const languageSelectorList = document.createElement('ul');
  languageSelectorList.className = 'footer-language-selector__list';

  const authoredLanguageLinks = block.querySelectorAll('[data-aue-model="footerLanguage"]');
  authoredLanguageLinks.forEach((authoredLink, index) => {
    const langItem = document.createElement('li');
    langItem.className = 'footer-language-selector__item';
    if (index === 0) {
      langItem.classList.add('active');
    }
    const langAnchor = document.createElement('a');
    langAnchor.className = 'footer-language-selector__link';

    const url = authoredLink.querySelector('[data-aue-prop="url"]');
    if (url) {
      langAnchor.href = url.textContent.trim();
      moveInstrumentation(url, langAnchor);
    }
    const ariaLabel = authoredLink.querySelector('[data-aue-prop="ariaLabel"]');
    if (ariaLabel) {
      langAnchor.setAttribute('aria-label', ariaLabel.textContent.trim());
      langAnchor.textContent = ariaLabel.textContent.trim(); // Assuming text content is aria-label
      moveInstrumentation(ariaLabel, langAnchor);
    }
    const lang = authoredLink.querySelector('[data-aue-prop="lang"]');
    if (lang) {
      langAnchor.dataset.lang = lang.textContent.trim();
      moveInstrumentation(lang, langAnchor);
    }
    langItem.append(langAnchor);
    languageSelectorList.append(langItem);
    moveInstrumentation(authoredLink, langItem);
  });
  footerLanguageSelector.append(languageSelectorList);
  footerBottom.append(footerLanguageSelector);

  // --- Policy Links --- 
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.className = 'footer-policy-links';
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.className = 'footer-policy-links__wrapper ';
  const policyLinksContent = document.createElement('div');
  policyLinksContent.className = 'footer-policy-links__content';

  const authoredPolicyLinks = block.querySelectorAll('[data-aue-model="footerPolicyLink"]');
  authoredPolicyLinks.forEach((authoredLink) => {
    const policyLinkAnchor = document.createElement('a');
    policyLinkAnchor.tabIndex = 0;
    policyLinkAnchor.className = 'footer-policy-links__item';
    policyLinkAnchor.target = '_self';

    const url = authoredLink.querySelector('[data-aue-prop="url"]');
    if (url) {
      policyLinkAnchor.href = url.textContent.trim();
      moveInstrumentation(url, policyLinkAnchor);
    }
    const title = authoredLink.querySelector('[data-aue-prop="title"]');
    if (title) {
      policyLinkAnchor.title = title.textContent.trim();
      policyLinkAnchor.textContent = title.textContent.trim();
      moveInstrumentation(title, policyLinkAnchor);
    }
    policyLinksContent.append(policyLinkAnchor);
    moveInstrumentation(authoredLink, policyLinkAnchor);
  });
  policyLinksWrapper.append(policyLinksContent);

  const copyrightP = document.createElement('p');
  copyrightP.className = 'footer-policy-links__copyright';
  const authoredCopyright = block.querySelector('[data-aue-prop="copyright"]');
  if (authoredCopyright) {
    copyrightP.textContent = authoredCopyright.textContent.trim();
    moveInstrumentation(authoredCopyright, copyrightP);
  }
  policyLinksWrapper.append(copyrightP);
  footerPolicyLinks.append(policyLinksWrapper);
  footerBottom.append(footerPolicyLinks);
  footerWrapper.append(footerBottom);

  // --- Final Block Restoration --- 
  block.textContent = '';
  block.append(footerWrapper);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
