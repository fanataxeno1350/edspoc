import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  // Footer Navigation
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';

  // Logo Link
  const logoLinkWrapper = block.querySelector('.footer-navigation__logo');
  if (logoLinkWrapper) {
    moveInstrumentation(logoLinkWrapper, footerNavigation);
    footerNavigation.append(logoLinkWrapper);
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';

  // Social Links
  const socialLinksList = block.querySelector('.footer-social-links__list');
  if (socialLinksList) {
    const footerSocialLinks = document.createElement('div');
    footerSocialLinks.className = 'footer-social-links';
    const newSocialLinksList = document.createElement('ul');
    newSocialLinksList.className = 'footer-social-links__list';
    Array.from(socialLinksList.children).forEach((socialLinkItem) => {
      const newSocialLinkItem = document.createElement('li');
      newSocialLinkItem.className = 'footer-social-links__item';
      const anchor = socialLinkItem.querySelector('a');
      if (anchor) {
        moveInstrumentation(anchor, newSocialLinkItem);
        newSocialLinkItem.append(anchor);
      }
      newSocialLinksList.append(newSocialLinkItem);
    });
    moveInstrumentation(socialLinksList.closest('.footer-social-links'), footerSocialLinks);
    footerSocialLinks.append(newSocialLinksList);
    footerNavigationContent.append(footerSocialLinks);
  }

  // Navigation Links
  const navigationLinksList = block.querySelector('.footer-navigation__links');
  if (navigationLinksList) {
    const newNavigationLinksList = document.createElement('ul');
    newNavigationLinksList.className = 'footer-navigation__links';
    Array.from(navigationLinksList.children).forEach((navLinkItem) => {
      const newNavLinkItem = document.createElement('li');
      const anchor = navLinkItem.querySelector('a');
      if (anchor) {
        moveInstrumentation(anchor, newNavLinkItem);
        newNavLinkItem.append(anchor);
      }
      newNavigationLinksList.append(newNavLinkItem);
    });
    moveInstrumentation(navigationLinksList, footerNavigationContent);
    footerNavigationContent.append(newNavigationLinksList);
  }

  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  // Footer Divider
  const footerDivider = block.querySelector('.footer-divider');
  if (footerDivider) {
    moveInstrumentation(footerDivider, footerWrapper);
    footerWrapper.append(footerDivider);
  }

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';

  // Language Selector
  const languageSelectorList = block.querySelector('.footer-language-selector__list');
  if (languageSelectorList) {
    const footerLanguageSelector = document.createElement('div');
    footerLanguageSelector.className = 'footer-language-selector';
    const newLanguageSelectorList = document.createElement('ul');
    newLanguageSelectorList.className = 'footer-language-selector__list';
    Array.from(languageSelectorList.children).forEach((langItem) => {
      const newLangItem = document.createElement('li');
      if (langItem.classList.contains('active')) {
        newLangItem.classList.add('active');
      }
      const anchor = langItem.querySelector('a');
      if (anchor) {
        moveInstrumentation(anchor, newLangItem);
        newLangItem.append(anchor);
      }
      newLanguageSelectorList.append(newLangItem);
    });
    moveInstrumentation(languageSelectorList.closest('.footer-language-selector'), footerLanguageSelector);
    footerLanguageSelector.append(newLanguageSelectorList);
    footerBottom.append(footerLanguageSelector);
  }

  // Policy Links and Copyright
  const policyLinksWrapper = block.querySelector('.footer-policy-links__wrapper');
  if (policyLinksWrapper) {
    const footerPolicyLinks = document.createElement('div');
    footerPolicyLinks.className = 'footer-policy-links';
    const newPolicyLinksWrapper = document.createElement('div');
    newPolicyLinksWrapper.className = 'footer-policy-links__wrapper ';

    const policyLinksContent = policyLinksWrapper.querySelector('.footer-policy-links__content');
    if (policyLinksContent) {
      const newPolicyLinksContent = document.createElement('div');
      newPolicyLinksContent.className = 'footer-policy-links__content';
      Array.from(policyLinksContent.children).forEach((policyLink) => {
        const anchor = policyLink.querySelector('a');
        if (anchor) {
          moveInstrumentation(anchor, newPolicyLinksContent);
          newPolicyLinksContent.append(anchor);
        }
      });
      newPolicyLinksWrapper.append(newPolicyLinksContent);
    }

    const copyrightP = policyLinksWrapper.querySelector('.footer-policy-links__copyright');
    if (copyrightP) {
      moveInstrumentation(copyrightP, newPolicyLinksWrapper);
      newPolicyLinksWrapper.append(copyrightP);
    }
    moveInstrumentation(policyLinksWrapper.closest('.footer-policy-links'), footerPolicyLinks);
    footerPolicyLinks.append(newPolicyLinksWrapper);
    footerBottom.append(footerPolicyLinks);
  }

  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
