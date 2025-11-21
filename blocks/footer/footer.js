import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');
  moveInstrumentation(block, footerWrapper);

  // Footer Navigation Section
  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation');
  footerWrapper.append(footerNavigation);

  // Logo Link (first row, first cell)
  const logoLinkCell = block.children[0]?.children[0];
  if (logoLinkCell) {
    const footerNavigationLogo = document.createElement('div');
    footerNavigationLogo.classList.add('footer-navigation__logo');
    const logoAnchor = logoLinkCell.querySelector('a');
    if (logoAnchor) {
      const newLogoAnchor = document.createElement('a');
      newLogoAnchor.href = logoAnchor.href;
      newLogoAnchor.target = logoAnchor.target;
      newLogoAnchor.innerHTML = '<span class="qd-icon qd-icon--logo qd-logo-footer"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span></span>';
      moveInstrumentation(logoAnchor, newLogoAnchor);
      footerNavigationLogo.append(newLogoAnchor);
    }
    footerNavigation.append(footerNavigationLogo);
  }

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');
  footerNavigation.append(footerNavigationContent);

  // Social Links (first row, second cell)
  const socialLinksCell = block.children[0]?.children[1];
  if (socialLinksCell) {
    const footerSocialLinks = document.createElement('div');
    footerSocialLinks.classList.add('footer-social-links');
    const socialLinksList = document.createElement('ul');
    socialLinksList.classList.add('footer-social-links__list');

    const socialLinkItems = socialLinksCell.querySelectorAll('li');
    socialLinkItems.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('footer-social-links__item');
      moveInstrumentation(item, li);
      const anchor = item.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.href = anchor.href;
        newAnchor.target = anchor.target;
        newAnchor.setAttribute('aria-label', anchor.getAttribute('aria-label'));
        newAnchor.classList.add('footer-social-links__icon');
        // Extract the icon class from the original anchor
        const iconClass = [...anchor.classList].find((cls) => cls.startsWith('qd-icon--'));
        if (iconClass) {
          newAnchor.classList.add('qd-icon', iconClass);
        }
        moveInstrumentation(anchor, newAnchor);
        li.append(newAnchor);
      }
      socialLinksList.append(li);
    });
    footerSocialLinks.append(socialLinksList);
    footerNavigationContent.append(footerSocialLinks);
  }

  // Navigation Links (first row, third cell)
  const navigationLinksCell = block.children[0]?.children[2];
  if (navigationLinksCell) {
    const navigationLinksList = document.createElement('ul');
    navigationLinksList.classList.add('footer-navigation__links');

    const navLinkItems = navigationLinksCell.querySelectorAll('li');
    navLinkItems.forEach((item) => {
      const li = document.createElement('li');
      moveInstrumentation(item, li);
      const anchor = item.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.href = anchor.href;
        newAnchor.target = anchor.target;
        newAnchor.title = anchor.title;
        newAnchor.textContent = anchor.textContent;
        newAnchor.classList.add('footer-navigation__link-item');
        newAnchor.setAttribute('tabindex', '0');
        moveInstrumentation(anchor, newAnchor);
        li.append(newAnchor);
      }
      navigationLinksList.append(li);
    });
    footerNavigationContent.append(navigationLinksList);
  }

  // Footer Divider
  const footerDivider = document.createElement('div');
  footerDivider.classList.add('footer-divider');
  footerWrapper.append(footerDivider);

  // Footer Bottom Section
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');
  footerWrapper.append(footerBottom);

  // Language Selector (first row, fourth cell)
  const languageSelectorCell = block.children[0]?.children[3];
  if (languageSelectorCell) {
    const footerLanguageSelector = document.createElement('div');
    footerLanguageSelector.classList.add('footer-language-selector');
    const languageSelectorList = document.createElement('ul');
    languageSelectorList.classList.add('footer-language-selector__list');

    const langLinkItems = languageSelectorCell.querySelectorAll('li');
    langLinkItems.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('footer-language-selector__item');
      if (item.classList.contains('active')) {
        li.classList.add('active');
      }
      moveInstrumentation(item, li);
      const anchor = item.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.href = anchor.href;
        newAnchor.setAttribute('aria-label', anchor.getAttribute('aria-label'));
        newAnchor.classList.add('footer-language-selector__link');
        newAnchor.setAttribute('data-lang', anchor.getAttribute('data-lang'));
        newAnchor.textContent = anchor.textContent;
        moveInstrumentation(anchor, newAnchor);
        li.append(newAnchor);
      }
      languageSelectorList.append(li);
    });
    footerLanguageSelector.append(languageSelectorList);
    footerBottom.append(footerLanguageSelector);
  }

  // Policy Links and Copyright (first row, fifth cell)
  const policyLinksCell = block.children[0]?.children[4];
  if (policyLinksCell) {
    const footerPolicyLinks = document.createElement('div');
    footerPolicyLinks.classList.add('footer-policy-links');
    const footerPolicyLinksWrapper = document.createElement('div');
    footerPolicyLinksWrapper.classList.add('footer-policy-links__wrapper');

    const footerPolicyLinksContent = document.createElement('div');
    footerPolicyLinksContent.classList.add('footer-policy-links__content');

    const policyLinkItems = policyLinksCell.querySelectorAll('a');
    policyLinkItems.forEach((anchor) => {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.target = anchor.target;
      newAnchor.title = anchor.title;
      newAnchor.textContent = anchor.textContent;
      newAnchor.classList.add('footer-policy-links__item');
      newAnchor.setAttribute('tabindex', '0');
      moveInstrumentation(anchor, newAnchor);
      footerPolicyLinksContent.append(newAnchor);
    });
    footerPolicyLinksWrapper.append(footerPolicyLinksContent);

    const copyrightP = policyLinksCell.querySelector('p');
    if (copyrightP) {
      const newCopyrightP = document.createElement('p');
      newCopyrightP.classList.add('footer-policy-links__copyright');
      newCopyrightP.textContent = copyrightP.textContent;
      moveInstrumentation(copyrightP, newCopyrightP);
      footerPolicyLinksWrapper.append(newCopyrightP);
    }

    footerPolicyLinks.append(footerPolicyLinksWrapper);
    footerBottom.append(footerPolicyLinks);
  }

  block.textContent = '';
  block.append(footerWrapper);
}
