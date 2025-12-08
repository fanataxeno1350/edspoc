import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('section');
  footerBrandWrapper.classList.add('footer-brand-container-hd', 'p-0');

  const footerBrandInnerWrapper = document.createElement('div');
  footerBrandInnerWrapper.classList.add('footer-brand-wrapper', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrandWrapper.append(footerBrandInnerWrapper);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  footerBrandPrimary.style.backgroundColor = '';
  footerBrandInnerWrapper.append(footerBrandPrimary);

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.classList.add('footer-brand-container');
  footerBrandPrimary.append(footerBrandContainer);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  footerBrandContainer.append(footerBrandPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  footerBrandPrimaryContent.append(footerBrandLeft);

  // Logo 1
  const logo1Cell = block.querySelector('[data-aue-prop="logo1"]');
  if (logo1Cell) {
    const logo1Link = logo1Cell.querySelector('a');
    const logo1Img = logo1Cell.querySelector('img');
    if (logo1Link && logo1Img) {
      const newLogo1Link = document.createElement('a');
      newLogo1Link.classList.add('footer-brand-logo', 'd-inline-block', 'analytics_cta_click');
      newLogo1Link.href = logo1Link.href;
      newLogo1Link.target = '_blank';
      newLogo1Link.setAttribute('data-cta-region', 'Footer');
      newLogo1Link.setAttribute('aria-label', logo1Img.alt);
      const pic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
      newLogo1Link.append(pic);
      pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
      moveInstrumentation(logo1Link, newLogo1Link);
      moveInstrumentation(logo1Img, pic.querySelector('img'));
      footerBrandLeft.append(newLogo1Link);
    }
  }

  // Logo 2
  const logo2Cell = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2Cell) {
    const logo2Img = logo2Cell.querySelector('img');
    if (logo2Img) {
      const newLogo2Div = document.createElement('div');
      newLogo2Div.classList.add('footer-brand-secondary--logo', 'd-inline-block');
      const pic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
      newLogo2Div.append(pic);
      pic.querySelector('img').classList.add('object-fit-contain', 'w-100');
      moveInstrumentation(logo2Img, pic.querySelector('img'));
      footerBrandLeft.append(newLogo2Div);
    }
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand-right');
  footerBrandPrimaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarRight);

  // Footer Links
  const footerLinksContainer = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinksContainer) {
    const footerLinkItems = footerLinksContainer.querySelectorAll('[data-aue-model="footerLink"]');
    let currentColumn = 0;
    const columns = [footerBrandNavbarLeft, footerBrandNavbarLeft, footerBrandNavbarRight, footerBrandNavbarRight];

    footerLinkItems.forEach((row, index) => {
      const linkCell = row.querySelector('[data-aue-prop="link"]');
      const textCell = row.querySelector('[data-aue-prop="text"]');

      if (linkCell && textCell) {
        let listComponent = columns[currentColumn].lastElementChild;
        if (!listComponent || listComponent.tagName !== 'DIV' || !listComponent.classList.contains('footer-list-component')) {
          listComponent = document.createElement('div');
          listComponent.classList.add('footer-list-component');
          columns[currentColumn].append(listComponent);
        }

        let ul = listComponent.lastElementChild;
        if (!ul || ul.tagName !== 'UL' || !ul.classList.contains('footer-list')) {
          ul = document.createElement('ul');
          ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
          listComponent.append(ul);
        }

        const li = document.createElement('li');
        li.classList.add('footer-list-item');
        ul.append(li);

        const a = document.createElement('a');
        a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item--link', 'd-inline-block');
        a.setAttribute('data-link-region', 'Footer List');

        const link = linkCell.querySelector('a');
        if (link) {
          a.href = link.href;
          if (link.target) a.target = link.target;
          moveInstrumentation(link, a);
        } else {
          a.href = linkCell.textContent.trim();
        }

        a.textContent = textCell.textContent.trim();
        moveInstrumentation(textCell, a);
        li.append(a);

        // Move to next column after 3 items
        if ((index + 1) % 3 === 0) {
          currentColumn = (currentColumn + 1) % columns.length;
        }
      }
      moveInstrumentation(row, row.parentElement); // Move instrumentation of the row container
    });
  }

  // Footer Secondary Section
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandSecondary.style.backgroundColor = '';
  footerBrandInnerWrapper.append(footerBrandSecondary);

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.classList.add('footer-brand-container');
  footerBrandSecondary.append(footerBrandSecondaryContainer);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);

  const footerBrandSocialRight = document.createElement('section');
  footerBrandSocialRight.classList.add('footer-brand-right', 'd-flex', 'flex-column', 'pb-5');
  footerBrandSecondaryContent.append(footerBrandSocialRight);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social-media--title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandSocialRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  footerBrandSocialRight.append(socialList);

  // Footer Social Links
  const footerSocialLinksContainer = block.querySelector('[data-aue-prop="footerSocialLinks"]');
  if (footerSocialLinksContainer) {
    const footerSocialLinkItems = footerSocialLinksContainer.querySelectorAll('[data-aue-model="footerSocialLink"]');
    footerSocialLinkItems.forEach((row) => {
      const linkCell = row.querySelector('[data-aue-prop="link"]');
      const iconCell = row.querySelector('[data-aue-prop="icon"]');

      if (linkCell && iconCell) {
        const li = document.createElement('li');
        li.classList.add('footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');
        socialList.append(li);

        const a = document.createElement('a');
        a.classList.add('footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
        a.setAttribute('data-cta-region', 'Footer');
        a.target = '_blank';

        const link = linkCell.querySelector('a');
        if (link) {
          a.href = link.href;
          a.setAttribute('data-cta-label', `footer-${link.textContent.trim().toLowerCase()}`);
          a.setAttribute('data-platform-name', link.textContent.trim().toLowerCase());
          a.setAttribute('data-social-linktype', 'follow');
          moveInstrumentation(link, a);
        } else {
          a.href = linkCell.textContent.trim();
        }

        const iconImg = iconCell.querySelector('img');
        if (iconImg) {
          const pic = createOptimizedPicture(iconImg.src, iconImg.alt);
          pic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
          a.append(pic);
          moveInstrumentation(iconImg, pic.querySelector('img'));
        }
        li.append(a);
      }
      moveInstrumentation(row, row.parentElement); // Move instrumentation of the row container
    });
  }

  const footerBrandSocialLeft = document.createElement('section');
  footerBrandSocialLeft.classList.add('footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  footerBrandSecondaryContent.append(footerBrandSocialLeft);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandSocialLeft.append(footerBrandLeftList);

  // ITC Portal Link
  const itcPortalLinkCell = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkCell) {
    const itcLink = itcPortalLinkCell.querySelector('a');
    if (itcLink) {
      const li = document.createElement('li');
      li.classList.add('footer-brand-left--item', 'footer-foot_link');
      footerBrandLeftList.append(li);

      const a = document.createElement('a');
      a.classList.add('footer-brand-left--link', 'analytics_cta_click');
      a.href = itcLink.href;
      a.target = '_blank';
      a.setAttribute('data-cta-region', 'Footer');
      a.textContent = itcLink.textContent.trim();
      moveInstrumentation(itcLink, a);
      li.append(a);
    }
  }

  // Copyright
  const copyrightCell = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightCell) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand-left--copyright', 'text-center');
    footerBrandSocialLeft.append(copyrightDiv);

    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left--text', 'text-white');
    copyrightSpan.textContent = copyrightCell.textContent.trim();
    moveInstrumentation(copyrightCell, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
  }

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
