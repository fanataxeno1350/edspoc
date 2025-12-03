import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';
  moveInstrumentation(block, footerWrapper);

  // Footer Navigation
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';
  footerWrapper.append(footerNavigation);

  const footerNavigationWrapper = document.createElement('div');
  footerNavigationWrapper.className = 'footer-navigation__wrapper';
  footerNavigation.append(footerNavigationWrapper);

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.className = 'footer-navigation__logo';
  footerNavigationWrapper.append(footerNavigationLogo);

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const a = document.createElement('a');
    a.href = logoLink.href;
    a.target = '_self';
    const span = document.createElement('span');
    span.className = 'qd-icon qd-icon--logo qd-logo-footer';
    span.innerHTML = '<span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span>';
    moveInstrumentation(logoLink, a);
    a.append(span);
    footerNavigationLogo.append(a);
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';
  footerNavigationWrapper.append(footerNavigationContent);

  // Social Links
  const socialLinksContainer = block.querySelector('[data-aue-name="socialLinks"]');
  if (socialLinksContainer) {
    const footerSocialLinks = document.createElement('div');
    footerSocialLinks.className = 'footer-social-links';
    footerNavigationContent.append(footerSocialLinks);

    const footerSocialLinksList = document.createElement('ul');
    footerSocialLinksList.className = 'footer-social-links__list';
    footerSocialLinks.append(footerSocialLinksList);

    Array.from(socialLinksContainer.children).forEach((socialLinkItem) => {
      const listItem = document.createElement('li');
      listItem.className = 'footer-social-links__item';

      const link = socialLinkItem.querySelector('[data-aue-prop="link"]');
      const label = socialLinkItem.querySelector('[data-aue-prop="label"]');

      if (link && label) {
        const a = document.createElement('a');
        a.className = `footer-social-links__icon qd-icon qd-icon--${label.textContent.toLowerCase()}`;
        a.target = '_blank';
        a.href = link.href;
        a.setAttribute('aria-label', label.textContent);
        moveInstrumentation(link, a);
        moveInstrumentation(label, a);
        listItem.append(a);
      }
      footerSocialLinksList.append(listItem);
      moveInstrumentation(socialLinkItem, listItem);
    });
  }

  // Navigation Links
  const navigationLinksContainer = block.querySelector('[data-aue-name="navigationLinks"]');
  if (navigationLinksContainer) {
    const footerNavigationLinks = document.createElement('ul');
    footerNavigationLinks.className = 'footer-navigation__links';
    footerNavigationContent.append(footerNavigationLinks);

    Array.from(navigationLinksContainer.children).forEach((navLinkItem) => {
      const listItem = document.createElement('li');

      const link = navLinkItem.querySelector('[data-aue-prop="link"]');
      const label = navLinkItem.querySelector('[data-aue-prop="label"]');

      if (link && label) {
        const a = document.createElement('a');
        a.className = 'footer-navigation__link-item';
        a.tabIndex = 0;
        a.target = '_self';
        a.title = label.textContent;
        a.href = link.href;
        a.textContent = label.textContent;
        moveInstrumentation(link, a);
        moveInstrumentation(label, a);
        listItem.append(a);
      }
      footerNavigationLinks.append(listItem);
      moveInstrumentation(navLinkItem, listItem);
    });
  }

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  footerWrapper.append(footerDivider);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';
  footerWrapper.append(footerBottom);

  // Language Selector
  const languageLinksContainer = block.querySelector('[data-aue-name="languageLinks"]');
  if (languageLinksContainer) {
    const footerLanguageSelector = document.createElement('div');
    footerLanguageSelector.className = 'footer-language-selector';
    footerBottom.append(footerLanguageSelector);

    const footerLanguageSelectorList = document.createElement('ul');
    footerLanguageSelectorList.className = 'footer-language-selector__list';
    footerLanguageSelector.append(footerLanguageSelectorList);

    Array.from(languageLinksContainer.children).forEach((langLinkItem) => {
      const listItem = document.createElement('li');

      const link = langLinkItem.querySelector('[data-aue-prop="link"]');
      const label = langLinkItem.querySelector('[data-aue-prop="label"]');
      const langCode = langLinkItem.querySelector('[data-aue-prop="langCode"]');

      if (link && label && langCode) {
        const a = document.createElement('a');
        a.href = link.href;
        a.setAttribute('aria-label', label.textContent);
        a.className = 'footer-language-selector__link';
        a.setAttribute('data-lang', langCode.textContent);
        a.textContent = label.textContent;
        moveInstrumentation(link, a);
        moveInstrumentation(label, a);
        moveInstrumentation(langCode, a);
        listItem.append(a);
      }
      footerLanguageSelectorList.append(listItem);
      moveInstrumentation(langLinkItem, listItem);
    });
  }

  // Policy Links
  const policyLinksContainer = block.querySelector('[data-aue-name="policyLinks"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  if (policyLinksContainer || copyright) {
    const footerPolicyLinks = document.createElement('div');
    footerPolicyLinks.className = 'footer-policy-links';
    footerBottom.append(footerPolicyLinks);

    const footerPolicyLinksWrapper = document.createElement('div');
    footerPolicyLinksWrapper.className = 'footer-policy-links__wrapper ';
    footerPolicyLinks.append(footerPolicyLinksWrapper);

    if (policyLinksContainer) {
      const footerPolicyLinksContent = document.createElement('div');
      footerPolicyLinksContent.className = 'footer-policy-links__content';
      footerPolicyLinksWrapper.append(footerPolicyLinksContent);

      Array.from(policyLinksContainer.children).forEach((policyLinkItem) => {
        const link = policyLinkItem.querySelector('[data-aue-prop="link"]');
        const label = policyLinkItem.querySelector('[data-aue-prop="label"]');

        if (link && label) {
          const a = document.createElement('a');
          a.tabIndex = 0;
          a.className = 'footer-policy-links__item';
          a.title = label.textContent;
          a.href = link.href;
          a.target = '_self';
          a.textContent = label.textContent;
          moveInstrumentation(link, a);
          moveInstrumentation(label, a);
          footerPolicyLinksContent.append(a);
        }
        moveInstrumentation(policyLinkItem, footerPolicyLinksContent);
      });
    }

    if (copyright) {
      const copyrightP = document.createElement('p');
      copyrightP.className = 'footer-policy-links__copyright';
      copyrightP.textContent = copyright.textContent;
      moveInstrumentation(copyright, copyrightP);
      footerPolicyLinksWrapper.append(copyrightP);
    }
  }

  block.innerHTML = '';
  block.append(footerWrapper);
}
