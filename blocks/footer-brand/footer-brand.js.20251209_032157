import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content');

  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.classList.add('footer-brand-left');

  const mainLogoWrapper = document.createElement('a');
  mainLogoWrapper.classList.add('footer-brand-logo', 'analytics_cta_click');
  moveInstrumentation(block.querySelector('[data-aue-prop="mainLogo"]'), mainLogoWrapper);
  const mainLogoLink = block.querySelector('[data-aue-prop="mainLogo"] a');
  if (mainLogoLink) {
    mainLogoWrapper.href = mainLogoLink.href;
    mainLogoWrapper.target = '_blank';
    mainLogoWrapper.setAttribute('aria-label', mainLogoLink.title || 'ITC Logo');
    const img = mainLogoLink.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt || 'ITC Logo');
      pic.classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
      moveInstrumentation(img, pic.querySelector('img'));
      mainLogoWrapper.append(pic);
    }
  }
  footerBrandLeftPrimary.append(mainLogoWrapper);

  const secondaryLogoWrapper = document.createElement('div');
  secondaryLogoWrapper.classList.add('footer-brand-secondary-logo');
  moveInstrumentation(block.querySelector('[data-aue-prop="secondaryLogo"]'), secondaryLogoWrapper);
  const secondaryLogoLink = block.querySelector('[data-aue-prop="secondaryLogo"] a');
  if (secondaryLogoLink) {
    const img = secondaryLogoLink.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt || 'FSSI Logo');
      pic.classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
      moveInstrumentation(img, pic.querySelector('img'));
      secondaryLogoWrapper.append(pic);
    }
  }
  footerBrandLeftPrimary.append(secondaryLogoWrapper);
  footerBrandPrimaryContent.append(footerBrandLeftPrimary);

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.classList.add('footer-brand-right');

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-navbar');
  nav.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentColumn = 0;
  const totalColumns = 4;

  footerLinks.forEach((linkItem, index) => {
    const listComponent = document.createElement('div');
    listComponent.classList.add('footer-list-component');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list');
    listComponent.append(ul);

    const li = document.createElement('li');
    li.classList.add('footer-list-item');
    const a = document.createElement('a');
    a.classList.add('footer-cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
    a.setAttribute('data-link-region', 'Footer List');

    const label = linkItem.querySelector('[data-aue-prop="label"]');
    if (label) {
      a.textContent = label.textContent;
      moveInstrumentation(label, a);
    }

    const url = linkItem.querySelector('[data-aue-prop="url"]');
    if (url) {
      const link = url.querySelector('a');
      if (link) {
        a.href = link.href;
        if (link.target) a.target = link.target;
        moveInstrumentation(link, a);
      }
    }
    li.append(a);
    ul.append(li);

    // Distribute links into 4 columns
    if (index % (footerLinks.length / totalColumns) === 0 && index !== 0) {
      currentColumn += 1;
    }

    if (currentColumn < totalColumns / 2) {
      footerBrandNavbarLeft.append(listComponent);
    } else {
      footerBrandNavbarRight.append(listComponent);
    }
  });

  nav.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightPrimary.append(nav);
  footerBrandPrimaryContent.append(footerBrandRightPrimary);
  footerContainer.append(footerBrandPrimaryContent);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandSecondary.style.backgroundColor = 'transparent';

  const secondaryFooterContainer = document.createElement('div');
  secondaryFooterContainer.classList.add('footer-container');

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary-content');

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand-right');

  const followUsTitle = document.createElement('h3');
  followUsTitle.classList.add('footer-social-media-title');
  followUsTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(followUsTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list');

  const footerSocials = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocials.forEach((socialItem) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-right-item');
    const a = document.createElement('a');
    a.classList.add('footer-brand-right-link', 'analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');

    const url = socialItem.querySelector('[data-aue-prop="url"]');
    if (url) {
      const link = url.querySelector('a');
      if (link) {
        a.href = link.href;
        a.target = '_blank';
        a.setAttribute('data-platform-name', link.title || '');
        a.setAttribute('data-social-linktype', 'follow');
        moveInstrumentation(link, a);
      }
    }

    const icon = socialItem.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt || '');
        pic.classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
        pic.querySelector('img').setAttribute('aria-label', img.alt || '');
        moveInstrumentation(img, pic.querySelector('img'));
        a.append(pic);
      }
    }
    li.append(a);
    socialList.append(li);
  });
  footerBrandRightSecondary.append(socialList);
  footerBrandSecondaryContent.append(footerBrandRightSecondary);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand-left');

  const itcPortalList = document.createElement('ul');
  itcPortalList.classList.add('footer-brand-left-list');

  const itcPortalItem = document.createElement('li');
  itcPortalItem.classList.add('footer-brand-left-item', 'footer-foot-link');

  const itcPortalLink = document.createElement('a');
  itcPortalLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  moveInstrumentation(block.querySelector('[data-aue-prop="itcPortalLink"]'), itcPortalLink);
  const itcPortalA = block.querySelector('[data-aue-prop="itcPortalLink"] a');
  if (itcPortalA) {
    itcPortalLink.href = itcPortalA.href;
    itcPortalLink.target = '_blank';
    itcPortalLink.textContent = itcPortalA.textContent;
  }
  itcPortalItem.append(itcPortalLink);
  itcPortalList.append(itcPortalItem);
  footerBrandLeftSecondary.append(itcPortalList);

  const copyrightWrapper = document.createElement('div');
  copyrightWrapper.classList.add('footer-brand-left-copyright');

  const copyrightText = document.createElement('span');
  copyrightText.classList.add('footer-brand-left-text', 'footer-text-white');
  moveInstrumentation(block.querySelector('[data-aue-prop="copyrightText"]'), copyrightText);
  const copyrightContent = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightContent) {
    copyrightText.textContent = copyrightContent.textContent;
  }
  copyrightWrapper.append(copyrightText);
  footerBrandLeftSecondary.append(copyrightWrapper);
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);
  secondaryFooterContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(secondaryFooterContainer);

  const finalRoot = document.createElement('div');
  finalRoot.classList.add('footer-brand-wrapper');
  finalRoot.append(footerContainer, footerBrandSecondary);

  block.textContent = '';
  block.append(finalRoot);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
