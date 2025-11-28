import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  // Footer Navigation
  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');
  footerWrapper.append(footerNavigation);

  // Footer Navigation Logo
  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.classList.add('footer-navigation__logo');
  footerNavigation.append(footerNavigationLogo);

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.target = '_self';
    moveInstrumentation(logoLink, logoAnchor);

    const logoIcon = block.querySelector('[data-aue-prop="logoIcon"]');
    if (logoIcon) {
      const span = document.createElement('span');
      span.classList.add('qd-icon', 'qd-icon--logo', 'qd-logo-footer');
      span.innerHTML = logoIcon.textContent;
      moveInstrumentation(logoIcon, span);
      logoAnchor.append(span);
    }
    footerNavigationLogo.append(logoAnchor);
  }

  // Footer Navigation Content
  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');
  footerNavigation.append(footerNavigationContent);

  // Social Links
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.classList.add('footer-social-links');
  footerNavigationContent.append(footerSocialLinks);

  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-social-links__list');
  footerSocialLinks.append(socialLinksList);

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLink) => {
    const socialLinkItem = document.createElement('li');
    socialLinkItem.classList.add('footer-social-links__item');
    moveInstrumentation(socialLink, socialLinkItem);

    const url = socialLink.querySelector('[data-aue-prop="url"]');
    const label = socialLink.querySelector('[data-aue-prop="label"]');

    if (url && label) {
      const anchor = document.createElement('a');
      anchor.classList.add('footer-social-links__icon', 'qd-icon');
      anchor.target = '_blank';
      anchor.href = url.href;
      anchor.setAttribute('aria-label', label.textContent);

      // Determine icon class based on label
      const iconClassMap = {
        'X': 'qd-icon--x',
        'Instagram': 'qd-icon--instagram',
        'Youtube': 'qd-icon--youtube',
        'TikTok': 'qd-icon--tiktok',
        'LinkedIn': 'qd-icon--linkedin',
      };
      const iconClassName = iconClassMap[label.textContent] || '';
      if (iconClassName) {
        anchor.classList.add(iconClassName);
      }
      moveInstrumentation(url, anchor);
      moveInstrumentation(label, anchor);
      socialLinkItem.append(anchor);
    }
    socialLinksList.append(socialLinkItem);
  });

  // Navigation Links
  const navigationLinksList = document.createElement('ul');
  navigationLinksList.classList.add('footer-navigation__links');
  footerNavigationContent.append(navigationLinksList);

  const navigationLinks = block.querySelectorAll('[data-aue-model="navigationLink"]');
  navigationLinks.forEach((navLink) => {
    const navLinkItem = document.createElement('li');
    moveInstrumentation(navLink, navLinkItem);

    const url = navLink.querySelector('[data-aue-prop="url"]');
    const label = navLink.querySelector('[data-aue-prop="label"]');

    if (url && label) {
      const anchor = document.createElement('a');
      anchor.classList.add('footer-navigation__link-item');
      anchor.tabIndex = 0;
      anchor.target = '_self';
      anchor.title = label.textContent;
      anchor.href = url.href;
      anchor.textContent = label.textContent;
      moveInstrumentation(url, anchor);
      moveInstrumentation(label, anchor);
      navLinkItem.append(anchor);
    }
    navigationLinksList.append(navLinkItem);
  });

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');
  footerWrapper.append(footerBottom);

  // Language Selector
  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.classList.add('footer-language-selector');
  footerBottom.append(footerLanguageSelector);

  const languageLinksList = document.createElement('ul');
  languageLinksList.classList.add('footer-language-selector__list');
  footerLanguageSelector.append(languageLinksList);

  const languageLinks = block.querySelectorAll('[data-aue-model="languageLink"]');
  languageLinks.forEach((langLink, index) => {
    const langLinkItem = document.createElement('li');
    langLinkItem.classList.add('footer-language-selector__item');
    if (index === 0) {
      langLinkItem.classList.add('active');
    }
    moveInstrumentation(langLink, langLinkItem);

    const url = langLink.querySelector('[data-aue-prop="url"]');
    const label = langLink.querySelector('[data-aue-prop="label"]');

    if (url && label) {
      const anchor = document.createElement('a');
      anchor.href = url.href;
      anchor.setAttribute('aria-label', label.textContent);
      anchor.classList.add('footer-language-selector__link');
      anchor.setAttribute('data-lang', label.textContent.toLowerCase().substring(0, 2));
      anchor.textContent = label.textContent;
      moveInstrumentation(url, anchor);
      moveInstrumentation(label, anchor);
      langLinkItem.append(anchor);
    }
    languageLinksList.append(langLinkItem);
  });

  // Policy Links
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.classList.add('footer-policy-links');
  footerBottom.append(footerPolicyLinks);

  const footerPolicyLinksWrapper = document.createElement('div');
  footerPolicyLinksWrapper.classList.add('footer-policy-links__wrapper');
  footerPolicyLinks.append(footerPolicyLinksWrapper);

  const footerPolicyLinksContent = document.createElement('div');
  footerPolicyLinksContent.classList.add('footer-policy-links__content');
  footerPolicyLinksWrapper.append(footerPolicyLinksContent);

  const policyLinks = block.querySelectorAll('[data-aue-model="policyLink"]');
  policyLinks.forEach((policyLink) => {
    const url = policyLink.querySelector('[data-aue-prop="url"]');
    const label = policyLink.querySelector('[data-aue-prop="label"]');

    if (url && label) {
      const anchor = document.createElement('a');
      anchor.tabIndex = 0;
      anchor.classList.add('footer-policy-links__item');
      anchor.title = label.textContent;
      anchor.href = url.href;
      anchor.target = '_self';
      anchor.textContent = label.textContent;
      moveInstrumentation(url, anchor);
      moveInstrumentation(label, anchor);
      footerPolicyLinksContent.append(anchor);
    }
    moveInstrumentation(policyLink, footerPolicyLinksContent);
  });

  // Copyright
  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const copyrightParagraph = document.createElement('p');
    copyrightParagraph.classList.add('footer-policy-links__copyright');
    copyrightParagraph.textContent = copyright.textContent;
    moveInstrumentation(copyright, copyrightParagraph);
    footerPolicyLinksWrapper.append(copyrightParagraph);
  }

  block.innerHTML = '';
  block.append(footerWrapper);
}
