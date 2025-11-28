import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/utils.js';

export default async function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');

  // Footer Logo
  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.classList.add('footer-navigation__logo');
  const logoLink = block.querySelector('[data-aue-prop="logo"]');
  if (logoLink) {
    const a = document.createElement('a');
    a.href = logoLink.href;
    a.target = '_self';
    const span = document.createElement('span');
    span.classList.add('qd-icon', 'qd-icon--logo', 'qd-logo-footer');
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.classList.add(`path${i}`);
      span.append(pathSpan);
    }
    a.append(span);
    footerNavigationLogo.append(a);
    moveInstrumentation(logoLink, a);
  }
  footerNavigation.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');

  // Social Links
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.classList.add('footer-social-links');
  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-social-links__list');
  const authoredSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  authoredSocialLinks.forEach((link) => {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-social-links__item');
    const a = document.createElement('a');
    const url = link.querySelector('[data-aue-prop="url"]');
    const label = link.querySelector('[data-aue-prop="label"]');
    if (url) {
      a.href = url.href;
      moveInstrumentation(url, a);
    }
    a.target = '_blank';
    if (label) {
      a.setAttribute('aria-label', label.textContent);
      const iconClass = label.textContent.toLowerCase();
      a.classList.add('footer-social-links__icon', 'qd-icon', `qd-icon--${iconClass}`);
      moveInstrumentation(label, a);
    }
    listItem.append(a);
    socialLinksList.append(listItem);
    moveInstrumentation(link, listItem);
  });
  footerSocialLinks.append(socialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  // Navigation Links
  const footerNavigationLinks = document.createElement('ul');
  footerNavigationLinks.classList.add('footer-navigation__links');
  const authoredNavigationLinks = block.querySelectorAll('[data-aue-model="footerNavigationLink"]');
  authoredNavigationLinks.forEach((link) => {
    const listItem = document.createElement('li');
    const a = document.createElement('a');
    a.classList.add('footer-navigation__link-item');
    a.tabIndex = 0;
    a.target = '_self';
    const url = link.querySelector('[data-aue-prop="url"]');
    const label = link.querySelector('[data-aue-prop="label"]');
    if (url) {
      a.href = url.href;
      moveInstrumentation(url, a);
    }
    if (label) {
      a.title = label.textContent;
      a.textContent = label.textContent;
      moveInstrumentation(label, a);
    }
    listItem.append(a);
    footerNavigationLinks.append(listItem);
    moveInstrumentation(link, listItem);
  });
  footerNavigationContent.append(footerNavigationLinks);

  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  // Language Selector
  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.classList.add('footer-language-selector');
  const languageList = document.createElement('ul');
  languageList.classList.add('footer-language-selector__list');
  const authoredLanguages = block.querySelectorAll('[data-aue-model="footerLanguage"]');
  authoredLanguages.forEach((lang, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-language-selector__item');
    if (index === 0) {
      listItem.classList.add('active');
    }
    const a = document.createElement('a');
    a.classList.add('footer-language-selector__link');
    const url = lang.querySelector('[data-aue-prop="url"]');
    const label = lang.querySelector('[data-aue-prop="label"]');
    if (url) {
      a.href = url.href;
      moveInstrumentation(url, a);
    }
    if (label) {
      a.setAttribute('aria-label', label.textContent);
      a.textContent = label.textContent;
      a.setAttribute('data-lang', label.textContent.substring(0, 2).toLowerCase());
      moveInstrumentation(label, a);
    }
    listItem.append(a);
    languageList.append(listItem);
    moveInstrumentation(lang, listItem);
  });
  footerLanguageSelector.append(languageList);
  footerBottom.append(footerLanguageSelector);

  // Policy Links and Copyright
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.classList.add('footer-policy-links');
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.classList.add('footer-policy-links__wrapper');
  const policyLinksContent = document.createElement('div');
  policyLinksContent.classList.add('footer-policy-links__content');

  const authoredPolicyLinks = block.querySelectorAll('[data-aue-model="footerPolicyLink"]');
  authoredPolicyLinks.forEach((link) => {
    const a = document.createElement('a');
    a.tabIndex = 0;
    a.classList.add('footer-policy-links__item');
    a.target = '_self';
    const url = link.querySelector('[data-aue-prop="url"]');
    const label = link.querySelector('[data-aue-prop="label"]');
    if (url) {
      a.href = url.href;
      moveInstrumentation(url, a);
    }
    if (label) {
      a.title = label.textContent;
      a.textContent = label.textContent;
      moveInstrumentation(label, a);
    }
    policyLinksContent.append(a);
    moveInstrumentation(link, a);
  });
  policyLinksWrapper.append(policyLinksContent);

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('footer-policy-links__copyright');
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightP.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightP);
  }
  policyLinksWrapper.append(copyrightP);

  footerPolicyLinks.append(policyLinksWrapper);
  footerBottom.append(footerPolicyLinks);

  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
