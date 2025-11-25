import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createLogo(logoLinkField) {
  const logoLink = logoLinkField.querySelector('a');
  if (!logoLink) return null;

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('footer-navigation__logo');

  const newLogoLink = document.createElement('a');
  newLogoLink.href = logoLink.href;
  newLogoLink.target = '_self';
  moveInstrumentation(logoLink, newLogoLink);

  const qdIcon = document.createElement('span');
  qdIcon.classList.add('qd-icon', 'qd-icon--logo', 'qd-logo-footer');
  for (let i = 1; i <= 25; i += 1) {
    const path = document.createElement('span');
    path.classList.add(`path${i}`);
    qdIcon.append(path);
  }
  newLogoLink.append(qdIcon);
  logoWrapper.append(newLogoLink);

  return logoWrapper;
}

function createSocialLinks(socialLinksField) {
  const socialLinksWrapper = document.createElement('div');
  socialLinksWrapper.classList.add('footer-social-links');

  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-social-links__list');

  Array.from(socialLinksField.children).forEach((socialLinkItem) => {
    const label = socialLinkItem.querySelector('div:first-child');
    const url = socialLinkItem.querySelector('div:last-child a');

    if (label && url) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-social-links__item');

      const link = document.createElement('a');
      link.classList.add('footer-social-links__icon');
      link.target = '_blank';
      link.href = url.href;
      link.setAttribute('aria-label', label.textContent.trim());
      moveInstrumentation(url, link);

      // Infer icon class from label
      const iconClass = `qd-icon--${label.textContent.trim().toLowerCase()}`;
      link.classList.add('qd-icon', iconClass);

      listItem.append(link);
      socialLinksList.append(listItem);
    }
  });

  socialLinksWrapper.append(socialLinksList);
  return socialLinksWrapper;
}

function createNavLinks(navLinksField) {
  const navLinksList = document.createElement('ul');
  navLinksList.classList.add('footer-navigation__links');

  Array.from(navLinksField.children).forEach((navLinkItem) => {
    const title = navLinkItem.querySelector('div:first-child');
    const url = navLinkItem.querySelector('div:last-child a');

    if (title && url) {
      const listItem = document.createElement('li');

      const link = document.createElement('a');
      link.classList.add('footer-navigation__link-item');
      link.tabIndex = 0;
      link.target = '_self';
      link.title = title.textContent.trim();
      link.href = url.href;
      link.textContent = title.textContent.trim();
      moveInstrumentation(url, link);

      listItem.append(link);
      navLinksList.append(listItem);
    }
  });
  return navLinksList;
}

function createLanguageSelector(languagesField) {
  const langSelectorWrapper = document.createElement('div');
  langSelectorWrapper.classList.add('footer-language-selector');

  const langList = document.createElement('ul');
  langList.classList.add('footer-language-selector__list');

  Array.from(languagesField.children).forEach((langItem) => {
    const label = langItem.querySelector('div:nth-child(1)');
    const url = langItem.querySelector('div:nth-child(2) a');
    const langCode = langItem.querySelector('div:nth-child(3)');
    const active = langItem.querySelector('div:nth-child(4)')?.textContent?.trim().toLowerCase() === 'true';

    if (label && url && langCode) {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-language-selector__item');
      if (active) {
        listItem.classList.add('active');
      }

      const link = document.createElement('a');
      link.href = url.href;
      link.setAttribute('aria-label', label.textContent.trim());
      link.classList.add('footer-language-selector__link');
      link.setAttribute('data-lang', langCode.textContent.trim());
      link.textContent = label.textContent.trim();
      moveInstrumentation(url, link);

      listItem.append(link);
      langList.append(listItem);
    }
  });
  langSelectorWrapper.append(langList);
  return langSelectorWrapper;
}

function createPolicyLinks(policyLinksField, copyrightField) {
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.classList.add('footer-policy-links');

  const policyLinksInnerWrapper = document.createElement('div');
  policyLinksInnerWrapper.classList.add('footer-policy-links__wrapper');

  const policyLinksContent = document.createElement('div');
  policyLinksContent.classList.add('footer-policy-links__content');

  Array.from(policyLinksField.children).forEach((policyLinkItem) => {
    const title = policyLinkItem.querySelector('div:first-child');
    const url = policyLinkItem.querySelector('div:last-child a');

    if (title && url) {
      const link = document.createElement('a');
      link.tabIndex = 0;
      link.classList.add('footer-policy-links__item');
      link.title = title.textContent.trim();
      link.href = url.href;
      link.target = '_self';
      link.textContent = title.textContent.trim();
      moveInstrumentation(url, link);
      policyLinksContent.append(link);
    }
  });
  policyLinksInnerWrapper.append(policyLinksContent);

  const copyrightText = copyrightField.querySelector('div:first-child');
  if (copyrightText) {
    const copyrightP = document.createElement('p');
    copyrightP.classList.add('footer-policy-links__copyright');
    copyrightP.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightP);
    policyLinksInnerWrapper.append(copyrightP);
  }

  policyLinksWrapper.append(policyLinksInnerWrapper);
  return policyLinksWrapper;
}

export default async function decorate(block) {
  const fields = {};
  Array.from(block.children).forEach((row) => {
    const fieldName = row.children[0].textContent.trim();
    fields[fieldName] = row.children[1];
  });

  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');

  const logo = createLogo(fields.logoLink);
  if (logo) {
    footerNavigation.append(logo);
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');

  const socialLinks = createSocialLinks(fields.socialLinks);
  if (socialLinks) {
    footerNavigationContent.append(socialLinks);
  }

  const navLinks = createNavLinks(fields.navLinks);
  if (navLinks) {
    footerNavigationContent.append(navLinks);
  }

  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const languageSelector = createLanguageSelector(fields.languages);
  if (languageSelector) {
    footerBottom.append(languageSelector);
  }

  const policyLinks = createPolicyLinks(fields.policyLinks, fields.copyright);
  if (policyLinks) {
    footerBottom.append(policyLinks);
  }

  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
