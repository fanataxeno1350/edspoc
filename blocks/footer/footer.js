import { createOptimizedPicture, moveInstrumentation } from '../../scripts/aem.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  // Footer Navigation
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.className = 'footer-navigation__logo';
  const logoLinkWrapper = document.createElement('a');
  logoLinkWrapper.target = '_self';
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    logoLinkWrapper.href = logoLink.textContent;
    moveInstrumentation(logoLink, logoLinkWrapper);
  }
  const logoIconClass = block.querySelector('[data-aue-prop="logoIconClass"]');
  if (logoIconClass) {
    const span = document.createElement('span');
    span.className = `qd-icon qd-icon--logo ${logoIconClass.textContent}`;
    for (let i = 1; i <= 25; i += 1) {
      span.appendChild(document.createElement('span')).className = `path${i}`;
    }
    logoLinkWrapper.append(span);
    moveInstrumentation(logoIconClass, span);
  }
  footerNavigationLogo.append(logoLinkWrapper);
  footerNavigation.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';

  // Social Links
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.className = 'footer-social-links';
  const footerSocialLinksList = document.createElement('ul');
  footerSocialLinksList.className = 'footer-social-links__list';

  const socialLinksContainer = block.querySelector('[data-aue-model="socialLinks"]');
  if (socialLinksContainer) {
    socialLinksContainer.querySelectorAll('[data-aue-model="footerSocialLink"]').forEach((socialLinkItem) => {
      const listItem = document.createElement('li');
      listItem.className = 'footer-social-links__item';
      const link = document.createElement('a');
      link.target = '_blank';
      const iconClass = socialLinkItem.querySelector('[data-aue-prop="iconClass"]');
      const url = socialLinkItem.querySelector('[data-aue-prop="url"]');
      const label = socialLinkItem.querySelector('[data-aue-prop="label"]');

      if (iconClass) {
        link.className = `footer-social-links__icon qd-icon ${iconClass.textContent}`;
        moveInstrumentation(iconClass, link);
      }
      if (url) {
        link.href = url.textContent;
        moveInstrumentation(url, link);
      }
      if (label) {
        link.setAttribute('aria-label', label.textContent);
        moveInstrumentation(label, link);
      }
      listItem.append(link);
      footerSocialLinksList.append(listItem);
      moveInstrumentation(socialLinkItem, listItem);
    });
  }
  footerSocialLinks.append(footerSocialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  // Navigation Links
  const footerNavigationLinks = document.createElement('ul');
  footerNavigationLinks.className = 'footer-navigation__links';

  const navLinksContainer = block.querySelector('[data-aue-model="navLinks"]');
  if (navLinksContainer) {
    navLinksContainer.querySelectorAll('[data-aue-model="footerNavLink"]').forEach((navLinkItem) => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'footer-navigation__link-item';
      link.tabIndex = 0;
      link.target = '_self';

      const url = navLinkItem.querySelector('[data-aue-prop="url"]');
      const title = navLinkItem.querySelector('[data-aue-prop="title"]');

      if (url) {
        link.href = url.textContent;
        moveInstrumentation(url, link);
      }
      if (title) {
        link.title = title.textContent;
        link.textContent = title.textContent;
        moveInstrumentation(title, link);
      }
      listItem.append(link);
      footerNavigationLinks.append(listItem);
      moveInstrumentation(navLinkItem, listItem);
    });
  }
  footerNavigationContent.append(footerNavigationLinks);
  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  footerWrapper.append(footerDivider);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';

  // Language Selector
  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.className = 'footer-language-selector';
  const footerLanguageSelectorList = document.createElement('ul');
  footerLanguageSelectorList.className = 'footer-language-selector__list';

  const languageLinksContainer = block.querySelector('[data-aue-model="languageLinks"]');
  if (languageLinksContainer) {
    languageLinksContainer.querySelectorAll('[data-aue-model="footerLanguageLink"]').forEach((langLinkItem) => {
      const listItem = document.createElement('li');
      listItem.className = 'footer-language-selector__item';
      const link = document.createElement('a');
      link.className = 'footer-language-selector__link';

      const url = langLinkItem.querySelector('[data-aue-prop="url"]');
      const label = langLinkItem.querySelector('[data-aue-prop="label"]');
      const langCode = langLinkItem.querySelector('[data-aue-prop="langCode"]');

      if (url) {
        link.href = url.textContent;
        moveInstrumentation(url, link);
      }
      if (label) {
        link.setAttribute('aria-label', label.textContent);
        link.textContent = label.textContent;
        moveInstrumentation(label, link);
      }
      if (langCode) {
        link.setAttribute('data-lang', langCode.textContent);
        if (langCode.textContent === 'en') {
          listItem.classList.add('active');
        }
        moveInstrumentation(langCode, link);
      }
      listItem.append(link);
      footerLanguageSelectorList.append(listItem);
      moveInstrumentation(langLinkItem, listItem);
    });
  }
  footerLanguageSelector.append(footerLanguageSelectorList);
  footerBottom.append(footerLanguageSelector);

  // Policy Links
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.className = 'footer-policy-links';
  const footerPolicyLinksWrapper = document.createElement('div');
  footerPolicyLinksWrapper.className = 'footer-policy-links__wrapper';
  const footerPolicyLinksContent = document.createElement('div');
  footerPolicyLinksContent.className = 'footer-policy-links__content';

  const policyLinksContainer = block.querySelector('[data-aue-model="policyLinks"]');
  if (policyLinksContainer) {
    policyLinksContainer.querySelectorAll('[data-aue-model="footerPolicyLink"]').forEach((policyLinkItem) => {
      const link = document.createElement('a');
      link.tabIndex = 0;
      link.className = 'footer-policy-links__item';
      link.target = '_self';

      const url = policyLinkItem.querySelector('[data-aue-prop="url"]');
      const title = policyLinkItem.querySelector('[data-aue-prop="title"]');

      if (url) {
        link.href = url.textContent;
        moveInstrumentation(url, link);
      }
      if (title) {
        link.title = title.textContent;
        link.textContent = title.textContent;
        moveInstrumentation(title, link);
      }
      footerPolicyLinksContent.append(link);
      moveInstrumentation(policyLinkItem, link);
    });
  }
  footerPolicyLinksWrapper.append(footerPolicyLinksContent);

  // Copyright
  const copyrightP = document.createElement('p');
  copyrightP.className = 'footer-policy-links__copyright';
  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    copyrightP.textContent = copyright.textContent;
    moveInstrumentation(copyright, copyrightP);
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
