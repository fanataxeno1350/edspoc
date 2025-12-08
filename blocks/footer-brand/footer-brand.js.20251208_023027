import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('section');
  footerBrandWrapper.classList.add('footer-brand-container-hd', 'p-0');
  moveInstrumentation(block, footerBrandWrapper);

  const innerWrapper = document.createElement('div');
  innerWrapper.classList.add('footer-brand-wrapper', 'w-100', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');

  const footerBrandContainerPrimary = document.createElement('div');
  footerBrandContainerPrimary.classList.add('footer-brand-container');

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const logo1Wrapper = document.createElement('a');
  logo1Wrapper.classList.add('footer-brand-logo', 'd-inline-block', 'analytics_cta_click');
  const logo1Link = block.querySelector('[data-aue-prop="logo1"]');
  if (logo1Link) {
    const img = logo1Link.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      logo1Wrapper.append(pic);
      logo1Wrapper.href = logo1Link.href;
      logo1Wrapper.target = '_blank';
      logo1Wrapper.setAttribute('data-cta-region', 'Footer');
      logo1Wrapper.setAttribute('aria-label', img.alt);
      pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    }
    moveInstrumentation(logo1Link, logo1Wrapper);
  }

  const logo2Wrapper = document.createElement('div');
  logo2Wrapper.classList.add('footer-brand-secondary--logo', 'd-inline-block');
  const logo2 = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2) {
    const img = logo2.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      logo2Wrapper.append(pic);
      pic.querySelector('img').classList.add('object-fit-contain', 'w-100');
    }
    moveInstrumentation(logo2, logo2Wrapper);
  }

  footerBrandLeft.append(logo1Wrapper, logo2Wrapper);

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.classList.add('footer-brand-right');

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  const footerLinksContainer = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinksContainer) {
    const footerLinksItems = footerLinksContainer.querySelectorAll('[data-aue-model="footerLink"]');
    let currentNavbarColumn = 0;
    const navbarColumns = [footerBrandNavbarLeft, footerBrandNavbarLeft, footerBrandNavbarRight, footerBrandNavbarRight];

    footerLinksItems.forEach((linkItem, index) => {
      const link = linkItem.querySelector('[data-aue-prop="link"]');
      const label = linkItem.querySelector('[data-aue-prop="label"]');

      if (link && label) {
        const columnIdx = Math.floor(index / 3);
        const targetColumn = navbarColumns[columnIdx] || navbarColumns[navbarColumns.length - 1];

        let footerListComponent = targetColumn.lastElementChild;
        if (!footerListComponent || (index % 3 === 0 && index > 0)) {
          footerListComponent = document.createElement('div');
          footerListComponent.classList.add('footer-list-component');
          targetColumn.append(footerListComponent);
        }

        let footerList = footerListComponent.querySelector('.footer-list');
        if (!footerList) {
          footerList = document.createElement('ul');
          footerList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
          footerListComponent.append(footerList);
        }

        const listItem = document.createElement('li');
        listItem.classList.add('footer-list-item');

        const linkElement = document.createElement('a');
        linkElement.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item--link', 'd-inline-block');
        linkElement.setAttribute('data-link-region', 'Footer List');
        linkElement.href = link.href;
        linkElement.textContent = label.textContent;

        moveInstrumentation(link, linkElement);
        moveInstrumentation(label, linkElement);
        listItem.append(linkElement);
        footerList.append(listItem);
      }
      moveInstrumentation(linkItem, linkItem);
    });
  }

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightPrimary.append(footerBrandNavbar);

  footerBrandPrimaryContent.append(footerBrandLeft, footerBrandRightPrimary);
  footerBrandContainerPrimary.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainerPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');

  const footerBrandContainerSecondary = document.createElement('div');
  footerBrandContainerSecondary.classList.add('footer-brand-container');

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand-right', 'd-flex', 'flex-column', 'pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-social-media--title');
  socialMediaTitle.textContent = 'Follow Us On';

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add('footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const footerSocialLinksContainer = block.querySelector('[data-aue-prop="footerSocialLinks"]');
  if (footerSocialLinksContainer) {
    const footerSocialLinkItems = footerSocialLinksContainer.querySelectorAll('[data-aue-model="footerSocialLink"]');
    footerSocialLinkItems.forEach((socialLinkItem) => {
      const link = socialLinkItem.querySelector('[data-aue-prop="link"]');
      const icon = socialLinkItem.querySelector('[data-aue-prop="icon"]');

      if (link && icon) {
        const listItem = document.createElement('li');
        listItem.classList.add('footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');

        const linkElement = document.createElement('a');
        linkElement.classList.add('footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
        linkElement.setAttribute('data-cta-region', 'Footer');
        linkElement.setAttribute('target', '_blank');
        linkElement.href = link.href;

        const img = icon.querySelector('img');
        if (img) {
          const pic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, pic.querySelector('img'));
          linkElement.append(pic);
          pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
          linkElement.setAttribute('aria-label', img.alt);
          linkElement.setAttribute('data-cta-label', `footer-${img.alt.toLowerCase()}`);
          linkElement.setAttribute('data-platform-name', img.alt.toLowerCase());
          linkElement.setAttribute('data-social-linktype', 'follow');
        }

        moveInstrumentation(link, linkElement);
        moveInstrumentation(icon, linkElement);
        listItem.append(linkElement);
        socialMediaList.append(listItem);
      }
      moveInstrumentation(socialLinkItem, socialLinkItem);
    });
  }

  footerBrandRightSecondary.append(socialMediaTitle, socialMediaList);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const itcPortalList = document.createElement('ul');
  itcPortalList.classList.add('footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const itcPortalListItem = document.createElement('li');
  itcPortalListItem.classList.add('footer-brand-left--item', 'footer-foot_link');

  const itcPortalLinkElement = document.createElement('a');
  itcPortalLinkElement.classList.add('footer-brand-left--link', 'analytics_cta_click');
  itcPortalLinkElement.setAttribute('data-cta-region', 'Footer');
  itcPortalLinkElement.setAttribute('target', '_blank');

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    itcPortalLinkElement.href = itcPortalLink.href;
    itcPortalLinkElement.textContent = itcPortalLink.textContent;
    moveInstrumentation(itcPortalLink, itcPortalLinkElement);
  }
  itcPortalListItem.append(itcPortalLinkElement);
  itcPortalList.append(itcPortalListItem);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-left--copyright', 'text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand-left--text', 'text-white');

  const copyrightContent = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightContent) {
    copyrightSpan.textContent = copyrightContent.textContent;
    moveInstrumentation(copyrightContent, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);

  footerBrandLeftSecondary.append(itcPortalList, copyrightDiv);

  footerBrandSecondaryContent.append(footerBrandRightSecondary, footerBrandLeftSecondary);
  footerBrandContainerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandContainerSecondary);

  innerWrapper.append(footerBrandPrimary, footerBrandSecondary);
  footerBrandWrapper.append(innerWrapper);

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
