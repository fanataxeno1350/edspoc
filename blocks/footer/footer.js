import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.classList.add('footer-navigation__logo');
  const logoLink = block.querySelector('div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a');
  if (logoLink) {
    footerNavigationLogo.append(logoLink);
  }
  footerNavigation.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');

  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.classList.add('footer-social-links');
  const footerSocialLinksList = document.createElement('ul');
  footerSocialLinksList.classList.add('footer-social-links__list');

  const socialLinksContainer = block.querySelector('div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)');
  if (socialLinksContainer) {
    Array.from(socialLinksContainer.children).forEach((socialLinkItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-social-links__item');
      const a = socialLinkItem.querySelector('a');
      if (a) {
        li.append(a);
      }
      footerSocialLinksList.append(li);
    });
  }
  footerSocialLinks.append(footerSocialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  const footerNavigationLinks = document.createElement('ul');
  footerNavigationLinks.classList.add('footer-navigation__links');
  const navLinksContainer = block.querySelector('div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)');
  if (navLinksContainer) {
    Array.from(navLinksContainer.children).forEach((navLinkItem) => {
      const li = document.createElement('li');
      const a = navLinkItem.querySelector('a');
      if (a) {
        li.append(a);
      }
      footerNavigationLinks.append(li);
    });
  }
  footerNavigationContent.append(footerNavigationLinks);
  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.classList.add('footer-language-selector');
  const footerLanguageSelectorList = document.createElement('ul');
  footerLanguageSelectorList.classList.add('footer-language-selector__list');

  const langLinksContainer = block.querySelector('div:nth-child(1) > div:nth-child(3) > div:nth-child(1)');
  if (langLinksContainer) {
    Array.from(langLinksContainer.children).forEach((langLinkItem) => {
      const li = document.createElement('li');
      li.classList.add('footer-language-selector__item');
      if (langLinkItem.classList.contains('active')) {
        li.classList.add('active');
      }
      const a = langLinkItem.querySelector('a');
      if (a) {
        li.append(a);
      }
      footerLanguageSelectorList.append(li);
    });
  }
  footerLanguageSelector.append(footerLanguageSelectorList);
  footerBottom.append(footerLanguageSelector);

  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.classList.add('footer-policy-links');
  const footerPolicyLinksWrapper = document.createElement('div');
  footerPolicyLinksWrapper.classList.add('footer-policy-links__wrapper');

  const policyLinksContainer = block.querySelector('div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(1)');
  if (policyLinksContainer) {
    const footerPolicyLinksContent = document.createElement('div');
    footerPolicyLinksContent.classList.add('footer-policy-links__content');
    Array.from(policyLinksContainer.children).forEach((policyLinkItem) => {
      const a = policyLinkItem.querySelector('a');
      if (a) {
        footerPolicyLinksContent.append(a);
      }
    });
    footerPolicyLinksWrapper.append(footerPolicyLinksContent);
  }

  const copyrightP = block.querySelector('div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div:nth-child(2)');
  if (copyrightP) {
    copyrightP.classList.add('footer-policy-links__copyright');
    footerPolicyLinksWrapper.append(copyrightP);
  }
  footerPolicyLinks.append(footerPolicyLinksWrapper);
  footerBottom.append(footerPolicyLinks);
  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}