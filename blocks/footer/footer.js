import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.className = 'footer-navigation__logo';
  const logoLink = block.querySelector('[data-name="logoLink"] a');
  const logoIconClass = block.querySelector('[data-name="logoIconClass"] span');
  if (logoLink && logoIconClass) {
    const a = document.createElement('a');
    a.href = logoLink.href;
    a.target = '_self';
    const span = document.createElement('span');
    span.className = logoIconClass.className;
    span.innerHTML = logoIconClass.innerHTML;
    a.append(span);
    footerNavigationLogo.append(a);
    moveInstrumentation(logoLink, a);
  }
  footerNavigation.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';

  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.className = 'footer-social-links';
  const socialLinksList = document.createElement('ul');
  socialLinksList.className = 'footer-social-links__list';
  const socialLinks = block.querySelectorAll('[data-name="socialLinks"] > div');
  socialLinks.forEach((socialLink) => {
    const iconClass = socialLink.querySelector('[data-name="iconClass"] span');
    const link = socialLink.querySelector('[data-name="link"] a');
    const ariaLabel = socialLink.querySelector('[data-name="ariaLabel"]');

    if (iconClass && link && ariaLabel) {
      const listItem = document.createElement('li');
      listItem.className = 'footer-social-links__item';
      const a = document.createElement('a');
      a.className = `footer-social-links__icon ${iconClass.className}`;
      a.target = '_blank';
      a.href = link.href;
      a.setAttribute('aria-label', ariaLabel.textContent.trim());
      listItem.append(a);
      socialLinksList.append(listItem);
      moveInstrumentation(socialLink, listItem);
    }
  });
  footerSocialLinks.append(socialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  const footerNavigationLinks = document.createElement('ul');
  footerNavigationLinks.className = 'footer-navigation__links';
  const navLinks = block.querySelectorAll('[data-name="navLinks"] > div');
  navLinks.forEach((navLink) => {
    const title = navLink.querySelector('[data-name="title"]');
    const link = navLink.querySelector('[data-name="link"] a');

    if (title && link) {
      const listItem = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'footer-navigation__link-item';
      a.tabIndex = 0;
      a.target = '_self';
      a.title = title.textContent.trim();
      a.href = link.href;
      a.textContent = title.textContent.trim();
      listItem.append(a);
      footerNavigationLinks.append(listItem);
      moveInstrumentation(navLink, listItem);
    }
  });
  footerNavigationContent.append(footerNavigationLinks);
  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  footerWrapper.append(footerDivider);

  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';

  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.className = 'footer-language-selector';
  const languageList = document.createElement('ul');
  languageList.className = 'footer-language-selector__list';
  const languageLinks = block.querySelectorAll('[data-name="languageLinks"] > div');
  languageLinks.forEach((languageLink, index) => {
    const language = languageLink.querySelector('[data-name="language"]');
    const link = languageLink.querySelector('[data-name="link"] a');

    if (language && link) {
      const listItem = document.createElement('li');
      listItem.className = 'footer-language-selector__item';
      if (index === 0) {
        listItem.classList.add('active');
      }
      const a = document.createElement('a');
      a.href = link.href;
      a.setAttribute('aria-label', language.textContent.trim());
      a.className = 'footer-language-selector__link';
      a.setAttribute('data-lang', language.textContent.trim().toLowerCase().substring(0, 2));
      a.textContent = language.textContent.trim();
      listItem.append(a);
      languageList.append(listItem);
      moveInstrumentation(languageLink, listItem);
    }
  });
  footerLanguageSelector.append(languageList);
  footerBottom.append(footerLanguageSelector);

  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.className = 'footer-policy-links';
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.className = 'footer-policy-links__wrapper ';
  const policyLinksContent = document.createElement('div');
  policyLinksContent.className = 'footer-policy-links__content';
  const policyLinks = block.querySelectorAll('[data-name="policyLinks"] > div');
  policyLinks.forEach((policyLink) => {
    const title = policyLink.querySelector('[data-name="title"]');
    const link = policyLink.querySelector('[data-name="link"] a');

    if (title && link) {
      const a = document.createElement('a');
      a.tabIndex = 0;
      a.className = 'footer-policy-links__item';
      a.title = title.textContent.trim();
      a.href = link.href;
      a.target = '_self';
      a.textContent = title.textContent.trim();
      policyLinksContent.append(a);
      moveInstrumentation(policyLink, a);
    }
  });
  policyLinksWrapper.append(policyLinksContent);

  const copyright = block.querySelector('[data-name="copyright"]');
  if (copyright) {
    const p = document.createElement('p');
    p.className = 'footer-policy-links__copyright';
    p.textContent = copyright.textContent.trim();
    policyLinksWrapper.append(p);
    moveInstrumentation(copyright, p);
  }

  footerPolicyLinks.append(policyLinksWrapper);
  footerBottom.append(footerPolicyLinks);
  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
