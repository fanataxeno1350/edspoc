import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand-component');

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand-component__primary');
  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-brand-component__container');
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-component__primary--content');

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand-component__left');

  // Logo 1
  const logo1Wrapper = document.createElement('div');
  const logo1Link = block.querySelector('[data-aue-prop="logo1Link"]');
  const logo1Img = block.querySelector('[data-aue-prop="logo1"]');
  if (logo1Link && logo1Img) {
    const a = document.createElement('a');
    a.href = logo1Link.textContent.trim();
    moveInstrumentation(logo1Link, a);
    const pic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
    a.append(pic);
    moveInstrumentation(logo1Img, pic.querySelector('img'));
    logo1Wrapper.append(a);
  }
  leftSection.append(logo1Wrapper);

  // Logo 2
  const logo2Wrapper = document.createElement('div');
  const logo2Img = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2Img) {
    const pic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
    logo2Wrapper.append(pic);
    moveInstrumentation(logo2Img, pic.querySelector('img'));
  }
  leftSection.append(logo2Wrapper);
  primaryContent.append(leftSection);

  // Navigation Columns
  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand-component__right');
  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-component__navbar');
  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand-component__navbar--left');
  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand-component__navbar--right');

  const navColumns = block.querySelectorAll('[data-aue-model="footerNavColumn"]');
  navColumns.forEach((column, index) => {
    const ul = document.createElement('ul');
    moveInstrumentation(column, ul);
    const navItems = column.querySelectorAll('[data-aue-model="footerNavItem"]');
    navItems.forEach((item) => {
      const li = document.createElement('li');
      moveInstrumentation(item, li);
      const link = item.querySelector('[data-aue-prop="link"]');
      const text = item.querySelector('[data-aue-prop="text"]');
      if (link && text) {
        const a = document.createElement('a');
        a.href = link.textContent.trim();
        a.textContent = text.textContent.trim();
        moveInstrumentation(link, a);
        moveInstrumentation(text, a);
        li.append(a);
      }
      ul.append(li);
    });
    if (index < 2) {
      navLeft.append(ul);
    } else {
      navRight.append(ul);
    }
  });
  nav.append(navLeft, navRight);
  rightSection.append(nav);
  primaryContent.append(rightSection);

  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);
  footerBrand.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-component__secondary');
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-brand-component__container');
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-component__secondary--content');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand-component__right');
  const socialTitle = document.createElement('h3');
  socialTitle.textContent = 'Follow Us On'; // Static text, not authored
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-component__right--list');
  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLink) => {
    const li = document.createElement('li');
    moveInstrumentation(socialLink, li);
    const platformLink = socialLink.querySelector('[data-aue-prop="platformLink"]');
    const icon = socialLink.querySelector('[data-aue-prop="icon"]');
    if (platformLink && icon) {
      const a = document.createElement('a');
      a.href = platformLink.textContent.trim();
      a.target = '_blank';
      moveInstrumentation(platformLink, a);
      const pic = createOptimizedPicture(icon.src, icon.alt);
      a.append(pic);
      moveInstrumentation(icon, pic.querySelector('img'));
      li.append(a);
    }
    socialList.append(li);
  });
  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('footer-brand-component__left');

  const itcPortalList = document.createElement('ul');
  itcPortalList.classList.add('footer-brand-component__left--list');
  const itcPortalItem = document.createElement('li');
  itcPortalItem.classList.add('footer-brand-component__left--item');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const a = document.createElement('a');
    a.href = itcPortalLink.textContent.trim();
    a.target = '_blank';
    a.textContent = 'ITC portal'; // Static text, not authored
    moveInstrumentation(itcPortalLink, a);
    itcPortalItem.append(a);
  }
  itcPortalList.append(itcPortalItem);
  copyrightSection.append(itcPortalList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-component__left--copyright');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand-component__left--text');
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  secondaryContent.append(copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  footerBrand.append(secondarySection);

  block.textContent = '';
  block.append(footerBrand);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
