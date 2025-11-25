import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createFooterLogo(logoLink) {
  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.className = 'footer-navigation__logo';

  const a = document.createElement('a');
  a.href = logoLink.url.textContent;
  a.target = '_self';

  const span = document.createElement('span');
  span.className = 'qd-icon qd-icon--logo qd-logo-footer';
  for (let i = 1; i <= 25; i += 1) {
    const pathSpan = document.createElement('span');
    pathSpan.className = `path${i}`;
    span.append(pathSpan);
  }

  a.append(span);
  footerNavigationLogo.append(a);
  moveInstrumentation(logoLink.url.parentElement, footerNavigationLogo);
  return footerNavigationLogo;
}

function createFooterSocialLinks(socialLinks) {
  const footerSocialLinks = document.createElement('div');
  footerSocialLinks.className = 'footer-social-links';

  const ul = document.createElement('ul');
  ul.className = 'footer-social-links__list';

  socialLinks.querySelectorAll(':scope > div').forEach((socialLink) => {
    const icon = socialLink.querySelector('div:nth-child(1)');
    const url = socialLink.querySelector('div:nth-child(2)');
    const ariaLabel = socialLink.querySelector('div:nth-child(3)');

    if (icon && url && ariaLabel) {
      const li = document.createElement('li');
      li.className = 'footer-social-links__item';

      const a = document.createElement('a');
      a.className = `footer-social-links__icon qd-icon ${icon.textContent}`;
      a.target = '_blank';
      a.href = url.textContent;
      a.setAttribute('aria-label', ariaLabel.textContent);

      li.append(a);
      ul.append(li);
      moveInstrumentation(socialLink, li);
    }
  });

  footerSocialLinks.append(ul);
  return footerSocialLinks;
}

function createFooterNavigationLinks(footerLinks) {
  const ul = document.createElement('ul');
  ul.className = 'footer-navigation__links';

  footerLinks.querySelectorAll(':scope > div').forEach((footerLink) => {
    const label = footerLink.querySelector('div:nth-child(1)');
    const url = footerLink.querySelector('div:nth-child(2)');

    if (label && url) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.className = 'footer-navigation__link-item';
      a.tabIndex = 0;
      a.target = '_self';
      a.title = label.textContent;
      a.href = url.textContent;
      a.textContent = label.textContent;

      li.append(a);
      ul.append(li);
      moveInstrumentation(footerLink, li);
    }
  });
  return ul;
}

function createFooterLanguageSelector(languages) {
  const footerLanguageSelector = document.createElement('div');
  footerLanguageSelector.className = 'footer-language-selector';

  const ul = document.createElement('ul');
  ul.className = 'footer-language-selector__list';

  languages.querySelectorAll(':scope > div').forEach((language, index) => {
    const label = language.querySelector('div:nth-child(1)');
    const url = language.querySelector('div:nth-child(2)');
    const dataLang = language.querySelector('div:nth-child(3)');

    if (label && url && dataLang) {
      const li = document.createElement('li');
      li.className = 'footer-language-selector__item';
      if (index === 0) {
        li.classList.add('active');
      }

      const a = document.createElement('a');
      a.href = url.textContent;
      a.setAttribute('aria-label', label.textContent);
      a.className = 'footer-language-selector__link';
      a.setAttribute('data-lang', dataLang.textContent);
      a.textContent = label.textContent;

      li.append(a);
      ul.append(li);
      moveInstrumentation(language, li);
    }
  });

  footerLanguageSelector.append(ul);
  return footerLanguageSelector;
}

function createFooterPolicyLinks(policyLinks, copyright) {
  const footerPolicyLinks = document.createElement('div');
  footerPolicyLinks.className = 'footer-policy-links';

  const wrapper = document.createElement('div');
  wrapper.className = 'footer-policy-links__wrapper ';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'footer-policy-links__content';

  policyLinks.querySelectorAll(':scope > div').forEach((policyLink) => {
    const label = policyLink.querySelector('div:nth-child(1)');
    const url = policyLink.querySelector('div:nth-child(2)');

    if (label && url) {
      const a = document.createElement('a');
      a.tabIndex = 0;
      a.className = 'footer-policy-links__item';
      a.title = label.textContent;
      a.href = url.textContent;
      a.target = '_self';
      a.textContent = label.textContent;

      contentDiv.append(a);
      moveInstrumentation(policyLink, a);
    }
  });
  wrapper.append(contentDiv);

  if (copyright) {
    const p = document.createElement('p');
    p.className = 'footer-policy-links__copyright';
    p.textContent = copyright.textContent;
    wrapper.append(p);
    moveInstrumentation(copyright, p);
  }

  footerPolicyLinks.append(wrapper);
  return footerPolicyLinks;
}

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-wrapper';

  const [logo, socialLinks, footerLinks, languages, policyLinks, copyright] = block.children;

  // Footer Navigation
  const footerNavigation = document.createElement('div');
  footerNavigation.className = 'footer-navigation';
  moveInstrumentation(logo, footerNavigation);

  if (logo) {
    footerNavigation.append(createFooterLogo(logo));
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.className = 'footer-navigation__content';
  moveInstrumentation(socialLinks, footerNavigationContent);

  if (socialLinks) {
    footerNavigationContent.append(createFooterSocialLinks(socialLinks));
  }

  if (footerLinks) {
    footerNavigationContent.append(createFooterNavigationLinks(footerLinks));
  }
  footerNavigation.append(footerNavigationContent);
  footerWrapper.append(footerNavigation);

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.className = 'footer-divider';
  footerWrapper.append(footerDivider);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';
  moveInstrumentation(languages, footerBottom);

  if (languages) {
    footerBottom.append(createFooterLanguageSelector(languages));
  }

  if (policyLinks || copyright) {
    footerBottom.append(createFooterPolicyLinks(policyLinks, copyright));
  }
  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
