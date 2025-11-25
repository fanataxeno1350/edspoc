import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createLogo(logoUrl, logoIconClass, originalElement) {
  const logoWrapper = document.createElement('div');
  logoWrapper.className = 'footer-navigation__logo';

  const logoLink = document.createElement('a');
  logoLink.href = logoUrl;
  logoLink.target = '_self';

  const logoIcon = document.createElement('span');
  logoIcon.className = logoIconClass;

  logoLink.append(logoIcon);
  logoWrapper.append(logoLink);

  moveInstrumentation(originalElement, logoWrapper);
  return logoWrapper;
}

function createSocialLinks(socialLinksData, originalElement) {
  const socialLinksDiv = document.createElement('div');
  socialLinksDiv.className = 'footer-social-links';

  const socialLinksList = document.createElement('ul');
  socialLinksList.className = 'footer-social-links__list';

  socialLinksData.forEach((linkData) => {
    const listItem = document.createElement('li');
    listItem.className = 'footer-social-links__item';

    const link = document.createElement('a');
    link.className = `footer-social-links__icon ${linkData.iconClass}`;
    link.target = '_blank';
    link.href = linkData.url;
    link.setAttribute('aria-label', linkData.ariaLabel);

    listItem.append(link);
    socialLinksList.append(listItem);

    moveInstrumentation(linkData.originalElement, listItem);
  });

  socialLinksDiv.append(socialLinksList);
  moveInstrumentation(originalElement, socialLinksDiv);
  return socialLinksDiv;
}

function createNavigationLinks(navigationLinksData, originalElement) {
  const navLinksList = document.createElement('ul');
  navLinksList.className = 'footer-navigation__links';

  navigationLinksData.forEach((linkData) => {
    const listItem = document.createElement('li');

    const link = document.createElement('a');
    link.className = 'footer-navigation__link-item';
    link.tabIndex = 0;
    link.target = '_self';
    link.title = linkData.title;
    link.href = linkData.url;
    link.textContent = linkData.title;

    listItem.append(link);
    navLinksList.append(listItem);

    moveInstrumentation(linkData.originalElement, listItem);
  });

  moveInstrumentation(originalElement, navLinksList);
  return navLinksList;
}

function createLanguageSelector(languageLinksData, originalElement) {
  const langSelectorDiv = document.createElement('div');
  langSelectorDiv.className = 'footer-language-selector';

  const langList = document.createElement('ul');
  langList.className = 'footer-language-selector__list';

  languageLinksData.forEach((linkData) => {
    const listItem = document.createElement('li');
    listItem.className = 'footer-language-selector__item';
    if (linkData.originalElement.classList.contains('active')) {
      listItem.classList.add('active');
    }

    const link = document.createElement('a');
    link.href = linkData.url;
    link.setAttribute('aria-label', linkData.label);
    link.className = 'footer-language-selector__link';
    link.setAttribute('data-lang', linkData.langCode);
    link.textContent = linkData.label;

    listItem.append(link);
    langList.append(listItem);

    moveInstrumentation(linkData.originalElement, listItem);
  });

  langSelectorDiv.append(langList);
  moveInstrumentation(originalElement, langSelectorDiv);
  return langSelectorDiv;
}

function createPolicyLinks(policyLinksData, copyrightText, originalPolicyLinksElement, originalCopyrightElement) {
  const policyLinksDiv = document.createElement('div');
  policyLinksDiv.className = 'footer-policy-links';

  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.className = 'footer-policy-links__wrapper ';

  const policyLinksContent = document.createElement('div');
  policyLinksContent.className = 'footer-policy-links__content';

  policyLinksData.forEach((linkData) => {
    const link = document.createElement('a');
    link.tabIndex = 0;
    link.className = 'footer-policy-links__item';
    link.title = linkData.title;
    link.href = linkData.url;
    link.target = '_self';
    link.textContent = linkData.title;
    policyLinksContent.append(link);
    moveInstrumentation(linkData.originalElement, link);
  });

  policyLinksWrapper.append(policyLinksContent);
  moveInstrumentation(originalPolicyLinksElement, policyLinksContent);

  const copyrightP = document.createElement('p');
  copyrightP.className = 'footer-policy-links__copyright';
  copyrightP.textContent = copyrightText;
  policyLinksWrapper.append(copyrightP);
  moveInstrumentation(originalCopyrightElement, copyrightP);

  policyLinksDiv.append(policyLinksWrapper);
  return policyLinksDiv;
}

export default async function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  // Extract data based on model
  const children = Array.from(block.children);

  // Logo
  const logoRow = children.shift();
  const logoUrl = logoRow.querySelector('a')?.href || '';
  const logoIconClass = logoRow.querySelector('span')?.className || '';

  // Social Links
  const socialLinksRow = children.shift();
  const socialLinks = Array.from(socialLinksRow.querySelectorAll('li')).map((li) => {
    const link = li.querySelector('a');
    return {
      url: link?.href || '',
      iconClass: link?.className.replace('footer-social-links__icon ', '') || '',
      ariaLabel: link?.getAttribute('aria-label') || '',
      originalElement: li,
    };
  });

  // Navigation Links
  const navigationLinksRow = children.shift();
  const navigationLinks = Array.from(navigationLinksRow.querySelectorAll('li')).map((li) => {
    const link = li.querySelector('a');
    return {
      url: link?.href || '',
      title: link?.textContent.trim() || '',
      originalElement: li,
    };
  });

  // Language Links
  const languageLinksRow = children.shift();
  const languageLinks = Array.from(languageLinksRow.querySelectorAll('li')).map((li) => {
    const link = li.querySelector('a');
    return {
      url: link?.href || '',
      label: link?.textContent.trim() || '',
      langCode: link?.getAttribute('data-lang') || '',
      originalElement: li,
    };
  });

  // Policy Links and Copyright
  const policyLinksRow = children.shift();
  const policyLinkElements = Array.from(policyLinksRow.querySelectorAll('a'));
  const policyLinks = policyLinkElements.map((a) => ({
    url: a?.href || '',
    title: a?.textContent.trim() || '',
    originalElement: a,
  }));

  const copyrightElement = policyLinksRow.querySelector('p');
  const copyright = copyrightElement?.textContent.trim() || '';

  // Build the DOM
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';

  const logo = createLogo(logoUrl, logoIconClass, logoRow);
  footerNavigation.append(logo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';

  const socialLinksBlock = createSocialLinks(socialLinks, socialLinksRow);
  footerNavigationContent.append(socialLinksBlock);

  const navigationLinksBlock = createNavigationLinks(navigationLinks, navigationLinksRow);
  footerNavigationContent.append(navigationLinksBlock);

  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  footerWrapper.append(footerDivider);

  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';

  const languageSelector = createLanguageSelector(languageLinks, languageLinksRow);
  footerBottom.append(languageSelector);

  const policyLinksBlock = createPolicyLinks(policyLinks, copyright, policyLinksRow.querySelector('.footer-policy-links__content'), copyrightElement);
  footerBottom.append(policyLinksBlock);

  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}