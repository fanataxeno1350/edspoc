import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createFooterSocialLink(socialLinkData, originalLi) {
  const li = document.createElement('li');
  li.className = 'footer-social-links__item';

  const a = document.createElement('a');
  a.className = `footer-social-links__icon qd-icon ${socialLinkData.iconClass}`;
  a.target = '_blank';
  a.href = socialLinkData.link;
  a.setAttribute('aria-label', socialLinkData.ariaLabel);

  li.append(a);
  moveInstrumentation(originalLi, li);
  return li;
}

function createFooterNavigationLink(navLinkData, originalLi) {
  const li = document.createElement('li');

  const a = document.createElement('a');
  a.className = 'footer-navigation__link-item';
  a.tabIndex = 0;
  a.target = '_self';
  a.title = navLinkData.title;
  a.href = navLinkData.link;
  a.textContent = navLinkData.title;

  li.append(a);
  moveInstrumentation(originalLi, li);
  return li;
}

function createFooterLanguageLink(langLinkData, originalLi) {
  const li = document.createElement('li');
  li.className = 'footer-language-selector__item';
  if (langLinkData.active) {
    li.classList.add('active');
  }

  const a = document.createElement('a');
  a.href = langLinkData.link;
  a.setAttribute('aria-label', langLinkData.label);
  a.className = 'footer-language-selector__link';
  a.setAttribute('data-lang', langLinkData.lang);
  a.textContent = langLinkData.label;

  li.append(a);
  moveInstrumentation(originalLi, li);
  return li;
}

function createFooterPolicyLink(policyLinkData, originalA) {
  const a = document.createElement('a');
  a.tabIndex = 0;
  a.className = 'footer-policy-links__item';
  a.title = policyLinkData.title;
  a.href = policyLinkData.link;
  a.target = '_self';
  a.textContent = policyLinkData.title;
  moveInstrumentation(originalA, a);
  return a;
}

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.className = 'footer-navigation__logo';
  const logoLinkEl = block.querySelector('div:nth-child(1) > div:nth-child(1) > p:nth-child(1) > a');
  const logoIconClassEl = block.querySelector('div:nth-child(1) > div:nth-child(1) > p:nth-child(2)');

  if (logoLinkEl && logoIconClassEl) {
    const a = document.createElement('a');
    a.href = logoLinkEl.href;
    a.target = '_self';
    const span = document.createElement('span');
    span.className = `qd-icon ${logoIconClassEl.textContent.trim()}`;
    // Recreate the specific span structure for the logo icon
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.className = `path${i}`;
      span.append(pathSpan);
    }
    a.append(span);
    footerNavigationLogo.append(a);
    moveInstrumentation(logoLinkEl.closest('div'), footerNavigationLogo);
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';

  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.className = 'footer-social-links';
  const footerSocialLinksList = document.createElement('ul');
  footerSocialLinksList.className = 'footer-social-links__list';

  const socialLinksContainer = block.querySelector('div:nth-child(2)');
  if (socialLinksContainer) {
    const socialLinkRows = Array.from(socialLinksContainer.children);
    socialLinkRows.forEach((row, index) => {
      if (row.children.length >= 3) {
        const iconClass = row.children[0].textContent.trim();
        const link = row.children[1].querySelector('a')?.href || '';
        const ariaLabel = row.children[2].textContent.trim();
        const socialLinkData = { iconClass, link, ariaLabel };
        footerSocialLinksList.append(createFooterSocialLink(socialLinkData, row));
      }
    });
    footerSocialLinks.append(footerSocialLinksList);
    moveInstrumentation(socialLinksContainer, footerSocialLinks);
  }

  const footerNavigationLinks = document.createElement('ul');
  footerNavigationLinks.className = 'footer-navigation__links';

  const navigationLinksContainer = block.querySelector('div:nth-child(3)');
  if (navigationLinksContainer) {
    const navigationLinkRows = Array.from(navigationLinksContainer.children);
    navigationLinkRows.forEach((row) => {
      if (row.children.length >= 2) {
        const title = row.children[0].textContent.trim();
        const link = row.children[1].querySelector('a')?.href || '';
        const navLinkData = { title, link };
        footerNavigationLinks.append(createFooterNavigationLink(navLinkData, row));
      }
    });
    moveInstrumentation(navigationLinksContainer, footerNavigationLinks);
  }

  footerNavigationContent.append(footerSocialLinks, footerNavigationLinks);
  footerNavigation.append(footerNavigationLogo, footerNavigationContent);

  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';

  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';

  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.className = 'footer-language-selector';
  const footerLanguageSelectorList = document.createElement('ul');
  footerLanguageSelectorList.className = 'footer-language-selector__list';

  const languageLinksContainer = block.querySelector('div:nth-child(4)');
  if (languageLinksContainer) {
    const languageLinkRows = Array.from(languageLinksContainer.children);
    languageLinkRows.forEach((row) => {
      if (row.children.length >= 3) {
        const label = row.children[0].textContent.trim();
        const link = row.children[1].querySelector('a')?.href || '';
        const lang = row.children[2].textContent.trim();
        const langLinkData = { label, link, lang, active: row.classList.contains('active') };
        footerLanguageSelectorList.append(createFooterLanguageLink(langLinkData, row));
      }
    });
    footerLanguageSelector.append(footerLanguageSelectorList);
    moveInstrumentation(languageLinksContainer, footerLanguageSelector);
  }

  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.className = 'footer-policy-links';
  const footerPolicyLinksWrapper = document.createElement('div');
  footerPolicyLinksWrapper.className = 'footer-policy-links__wrapper ';
  const footerPolicyLinksContent = document.createElement('div');
  footerPolicyLinksContent.className = 'footer-policy-links__content';

  const policyLinksContainer = block.querySelector('div:nth-child(5)');
  if (policyLinksContainer) {
    const policyLinkRows = Array.from(policyLinksContainer.children);
    policyLinkRows.forEach((row) => {
      if (row.children.length >= 2) {
        const title = row.children[0].textContent.trim();
        const link = row.children[1].querySelector('a')?.href || '';
        const policyLinkData = { title, link };
        footerPolicyLinksContent.append(createFooterPolicyLink(policyLinkData, row));
      }
    });
    moveInstrumentation(policyLinksContainer, footerPolicyLinksContent);
  }

  const copyrightEl = block.querySelector('div:nth-child(6) > p');
  if (copyrightEl) {
    const p = document.createElement('p');
    p.className = 'footer-policy-links__copyright';
    p.textContent = copyrightEl.textContent.trim();
    footerPolicyLinksWrapper.append(footerPolicyLinksContent, p);
    moveInstrumentation(copyrightEl.closest('div'), footerPolicyLinksWrapper);
  } else {
    footerPolicyLinksWrapper.append(footerPolicyLinksContent);
  }

  footerPolicyLinks.append(footerPolicyLinksWrapper);

  footerBottom.append(footerLanguageSelector, footerPolicyLinks);
  footerWrapper.append(footerNavigation, footerDivider, footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
