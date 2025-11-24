import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createSocialLink(link, ariaLabel, originalLinkElement) {
  const li = document.createElement('li');
  li.className = 'footer-social-links__item';

  const a = document.createElement('a');
  a.className = `footer-social-links__icon qd-icon qd-icon--${ariaLabel.toLowerCase()}`;
  a.target = '_blank';
  a.href = link;
  a.setAttribute('aria-label', ariaLabel);

  moveInstrumentation(originalLinkElement, a);
  li.append(a);
  return li;
}

function createNavLink(link, title, originalLinkElement) {
  const li = document.createElement('li');

  const a = document.createElement('a');
  a.className = 'footer-navigation__link-item';
  a.tabIndex = '0';
  a.target = '_self';
  a.title = title;
  a.href = link;
  a.textContent = title;

  moveInstrumentation(originalLinkElement, a);
  li.append(a);
  return li;
}

function createLanguageLink(link, label, originalLinkElement) {
  const li = document.createElement('li');
  li.className = 'footer-language-selector__item';

  const a = document.createElement('a');
  a.href = link;
  a.setAttribute('aria-label', label);
  a.className = 'footer-language-selector__link';
  a.setAttribute('data-lang', label === 'English' ? 'en' : 'ar'); // Assuming English/Arabic for data-lang
  a.textContent = label;

  moveInstrumentation(originalLinkElement, a);
  li.append(a);
  return li;
}

function createPolicyLink(link, title, originalLinkElement) {
  const a = document.createElement('a');
  a.tabIndex = '0';
  a.className = 'footer-policy-links__item';
  a.title = title;
  a.href = link;
  a.target = '_self';
  a.textContent = title;

  moveInstrumentation(originalLinkElement, a);
  return a;
}

export default async function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  // Footer Navigation
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.className = 'footer-navigation__logo';
  const logoLinkElement = block.querySelector(':scope > div:first-child > div:first-child a');
  if (logoLinkElement) {
    const logoA = document.createElement('a');
    logoA.href = logoLinkElement.href;
    logoA.target = '_self';
    const logoSpan = document.createElement('span');
    logoSpan.className = 'qd-icon qd-icon--logo qd-logo-footer';
    // Recreate all path spans
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.className = `path${i}`;
      logoSpan.append(pathSpan);
    }
    logoA.append(logoSpan);
    moveInstrumentation(logoLinkElement, logoA);
    footerNavigationLogo.append(logoA);
  }
  footerNavigation.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';

  // Social Links
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.className = 'footer-social-links';
  const footerSocialLinksList = document.createElement('ul');
  footerSocialLinksList.className = 'footer-social-links__list';

  const socialLinksContainer = block.querySelector(':scope > div:nth-child(2)');
  if (socialLinksContainer) {
    const socialLinkElements = socialLinksContainer.querySelectorAll(':scope > div');
    socialLinkElements.forEach((socialLinkEl) => {
      const link = socialLinkEl.querySelector('a')?.href || '';
      const ariaLabel = socialLinkEl.querySelector('p:last-child')?.textContent.trim() || '';
      if (link && ariaLabel) {
        footerSocialLinksList.append(createSocialLink(link, ariaLabel, socialLinkEl.querySelector('a')));
      }
    });
  }
  footerSocialLinks.append(footerSocialLinksList);
  footerNavigationContent.append(footerSocialLinks);

  // Navigation Links
  const footerNavigationLinks = document.createElement('ul');
  footerNavigationLinks.className = 'footer-navigation__links';

  const navLinksContainer = block.querySelector(':scope > div:nth-child(3)');
  if (navLinksContainer) {
    const navLinkElements = navLinksContainer.querySelectorAll(':scope > div');
    navLinkElements.forEach((navLinkEl) => {
      const link = navLinkEl.querySelector('a')?.href || '';
      const title = navLinkEl.querySelector('p:last-child')?.textContent.trim() || '';
      if (link && title) {
        footerNavigationLinks.append(createNavLink(link, title, navLinkEl.querySelector('a')));
      }
    });
  }
  footerNavigationContent.append(footerNavigationLinks);
  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  // Divider
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

  const languageContainer = block.querySelector(':scope > div:nth-child(4)');
  if (languageContainer) {
    const languageElements = languageContainer.querySelectorAll(':scope > div');
    languageElements.forEach((langEl, index) => {
      const link = langEl.querySelector('a')?.href || '';
      const label = langEl.querySelector('p:last-child')?.textContent.trim() || '';
      if (link && label) {
        const langLi = createLanguageLink(link, label, langEl.querySelector('a'));
        if (index === 0) {
          langLi.classList.add('active'); // Assuming the first one is active
        }
        footerLanguageSelectorList.append(langLi);
      }
    });
  }
  footerLanguageSelector.append(footerLanguageSelectorList);
  footerBottom.append(footerLanguageSelector);

  // Policy Links and Copyright
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.className = 'footer-policy-links';
  const footerPolicyLinksWrapper = document.createElement('div');
  footerPolicyLinksWrapper.className = 'footer-policy-links__wrapper ';
  const footerPolicyLinksContent = document.createElement('div');
  footerPolicyLinksContent.className = 'footer-policy-links__content';

  const policyContainer = block.querySelector(':scope > div:nth-child(5)');
  if (policyContainer) {
    const policyLinkElements = policyContainer.querySelectorAll(':scope > div');
    policyLinkElements.forEach((policyLinkEl) => {
      const link = policyLinkEl.querySelector('a')?.href || '';
      const title = policyLinkEl.querySelector('p:last-child')?.textContent.trim() || '';
      if (link && title) {
        footerPolicyLinksContent.append(createPolicyLink(link, title, policyLinkEl.querySelector('a')));
      }
    });
  }
  footerPolicyLinksWrapper.append(footerPolicyLinksContent);

  const copyrightP = document.createElement('p');
  copyrightP.className = 'footer-policy-links__copyright';
  const copyrightElement = block.querySelector(':scope > div:last-child > div:last-child p');
  if (copyrightElement) {
    copyrightP.textContent = copyrightElement.textContent.trim();
    moveInstrumentation(copyrightElement, copyrightP);
  }
  footerPolicyLinksWrapper.append(copyrightP);
  footerPolicyLinks.append(footerPolicyLinksWrapper);
  footerBottom.append(footerPolicyLinks);

  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
