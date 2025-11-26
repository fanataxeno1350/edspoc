import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  // Footer Navigation
  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.classList.add('footer-navigation__logo');
  const logoLink = document.createElement('a');
  logoLink.setAttribute('target', '_self');
  logoLink.setAttribute('href', block.querySelector('[data-aue-prop="logoLink"]').textContent);
  moveInstrumentation(block.querySelector('[data-aue-prop="logoLink"]'), logoLink);
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

  // Footer Social Links
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.classList.add('footer-social-links');
  const footerSocialLinksList = document.createElement('ul');
  footerSocialLinksList.classList.add('footer-social-links__list');
  const socialLinksContainer = block.querySelector('[data-aue-model="footerSocialLinks"]');
  if (socialLinksContainer) {
    socialLinksContainer.querySelectorAll('[data-aue-model="footerSocialLink"]').forEach((socialLinkItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-social-links__item');
      const a = document.createElement('a');
      a.classList.add('footer-social-links__icon', 'qd-icon');
      a.setAttribute('target', '_blank');
      const link = socialLinkItem.querySelector('[data-aue-prop="link"]');
      const ariaLabel = socialLinkItem.querySelector('[data-aue-prop="ariaLabel"]');
      if (link) {
        a.setAttribute('href', link.textContent);
        moveInstrumentation(link, a);
      }
      if (ariaLabel) {
        a.setAttribute('aria-label', ariaLabel.textContent);
        moveInstrumentation(ariaLabel, a);
        const iconClass = ariaLabel.textContent.toLowerCase().replace(/\s/g, '');
        a.classList.add(`qd-icon--${iconClass}`);
      }
      li.append(a);
      footerSocialLinksList.append(li);
    });
  }
  footerSocialLinks.append(footerSocialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  // Footer Navigation Links
  const footerNavLinksList = document.createElement('ul');
  footerNavLinksList.classList.add('footer-navigation__links');
  const navLinksContainer = block.querySelector('[data-aue-model="footerNavLinks"]');
  if (navLinksContainer) {
    navLinksContainer.querySelectorAll('[data-aue-model="footerNavLink"]').forEach((navLinkItem) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.classList.add('footer-navigation__link-item');
      a.setAttribute('tabindex', '0');
      a.setAttribute('target', '_self');
      const link = navLinkItem.querySelector('[data-aue-prop="link"]');
      const title = navLinkItem.querySelector('[data-aue-prop="title"]');
      if (link) {
        a.setAttribute('href', link.textContent);
        moveInstrumentation(link, a);
      }
      if (title) {
        a.setAttribute('title', title.textContent);
        a.textContent = title.textContent;
        moveInstrumentation(title, a);
      }
      li.append(a);
      footerNavLinksList.append(li);
    });
  }
  footerNavigationContent.append(footerNavLinksList);
  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  // Footer Language Selector
  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.classList.add('footer-language-selector');
  const footerLanguageSelectorList = document.createElement('ul');
  footerLanguageSelectorList.classList.add('footer-language-selector__list');
  const langLinksContainer = block.querySelector('[data-aue-model="footerLanguageLinks"]');
  if (langLinksContainer) {
    langLinksContainer.querySelectorAll('[data-aue-model="footerLanguageLink"]').forEach((langLinkItem, index) => {
      const li = document.createElement('li');
      li.classList.add('footer-language-selector__item');
      if (index === 0) {
        li.classList.add('active');
      }
      const a = document.createElement('a');
      a.classList.add('footer-language-selector__link');
      const link = langLinkItem.querySelector('[data-aue-prop="link"]');
      const ariaLabel = langLinkItem.querySelector('[data-aue-prop="ariaLabel"]');
      const langCode = langLinkItem.querySelector('[data-aue-prop="langCode"]');
      if (link) {
        a.setAttribute('href', link.textContent);
        moveInstrumentation(link, a);
      }
      if (ariaLabel) {
        a.setAttribute('aria-label', ariaLabel.textContent);
        moveInstrumentation(ariaLabel, a);
      }
      if (langCode) {
        a.setAttribute('data-lang', langCode.textContent);
        a.textContent = ariaLabel.textContent; // Use ariaLabel for text content
        moveInstrumentation(langCode, a);
      }
      li.append(a);
      footerLanguageSelectorList.append(li);
    });
  }
  footerLanguageSelector.append(footerLanguageSelectorList);
  footerBottom.append(footerLanguageSelector);

  // Footer Policy Links
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.classList.add('footer-policy-links');
  const footerPolicyLinksWrapper = document.createElement('div');
  footerPolicyLinksWrapper.classList.add('footer-policy-links__wrapper');
  const footerPolicyLinksContent = document.createElement('div');
  footerPolicyLinksContent.classList.add('footer-policy-links__content');

  const policyLinksContainer = block.querySelector('[data-aue-model="footerPolicyLinks"]');
  if (policyLinksContainer) {
    policyLinksContainer.querySelectorAll('[data-aue-model="footerPolicyLink"]').forEach((policyLinkItem) => {
      const a = document.createElement('a');
      a.classList.add('footer-policy-links__item');
      a.setAttribute('tabindex', '0');
      a.setAttribute('target', '_self');
      const link = policyLinkItem.querySelector('[data-aue-prop="link"]');
      const title = policyLinkItem.querySelector('[data-aue-prop="title"]');
      if (link) {
        a.setAttribute('href', link.textContent);
        moveInstrumentation(link, a);
      }
      if (title) {
        a.setAttribute('title', title.textContent);
        a.textContent = title.textContent;
        moveInstrumentation(title, a);
      }
      footerPolicyLinksContent.append(a);
    });
  }
  footerPolicyLinksWrapper.append(footerPolicyLinksContent);

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('footer-policy-links__copyright');
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightP.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightP);
  }
  footerPolicyLinksWrapper.append(copyrightP);
  footerPolicyLinks.append(footerPolicyLinksWrapper);
  footerBottom.append(footerPolicyLinks);
  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
