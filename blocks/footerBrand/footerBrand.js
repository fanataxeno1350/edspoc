import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper footer-brand-w-100 footer-brand-bg-boing-neutral-gray-600';
  moveInstrumentation(block, footerBrandWrapper);

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-primary';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-brand-container container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-primary-content footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row footer-brand-justify-content-md-between footer-brand-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-left footer-brand-d-flex footer-brand-gap-16 footer-brand-px-10 footer-brand-align-items-center footer-brand-justify-content-center';

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-right';
  const nav = document.createElement('nav');
  nav.className = 'footer-brand-navbar footer-brand-d-grid footer-brand-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');
  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand-navbar-left footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row ';
  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand-navbar-right footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row';

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-secondary';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-brand-container container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-secondary-content footer-brand-d-flex footer-brand-flex-column  footer-brand-justify-content-md-between footer-brand-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand-right footer-brand-d-flex footer-brand-flex-column footer-brand-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-brand-social-media-title';
  socialMediaTitle.textContent = 'Follow Us On';
  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-right-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-px-10 footer-brand-flex-wrap';

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-left footer-brand-py-5 footer-brand-d-flex footer-brand-flex-column footer-brand-gap-3';
  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-left-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-flex-wrap';
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-left-copyright footer-brand-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand-left-text footer-brand-text-white';

  let footerLinksCounter = 0;
  let socialLinksCounter = 0;

  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, rowIndex === 0 ? primaryContent : secondaryContent);

    const cells = [...row.children];

    // Primary Logo
    const primaryLogoCell = cells[0];
    if (primaryLogoCell) {
      const link = primaryLogoCell.querySelector('a');
      const img = primaryLogoCell.querySelector('img');
      if (link && img) {
        const logoLink = document.createElement('a');
        logoLink.href = link.href;
        logoLink.target = '_blank';
        logoLink.className = 'footer-brand-logo footer-brand-d-inline-block analytics_cta_click';
        logoLink.setAttribute('data-cta-region', 'Footer');
        logoLink.setAttribute('aria-label', 'ITC Logo');
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        logoLink.append(optimizedPic);
        leftSection.append(logoLink);
      }
    }

    // Secondary Logo
    const secondaryLogoCell = cells[1];
    if (secondaryLogoCell) {
      const img = secondaryLogoCell.querySelector('img');
      if (img) {
        const secondaryLogoDiv = document.createElement('div');
        secondaryLogoDiv.className = 'footer-brand-secondary-logo footer-brand-d-inline-block';
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        secondaryLogoDiv.append(optimizedPic);
        leftSection.append(secondaryLogoDiv);
      }
    }

    // Footer Links
    const footerLinksCell = cells[2];
    if (footerLinksCell) {
      const footerLinkItems = footerLinksCell.querySelectorAll('li');
      if (footerLinkItems.length > 0) {
        const footerListWrapper = document.createElement('div');
        footerListWrapper.className = 'footer-list-wrapper';
        const ul = document.createElement('ul');
        ul.className = 'footer-list-ul footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-align-items-md-start footer-brand-flex-column';

        footerLinkItems.forEach((item) => {
          const li = document.createElement('li');
          moveInstrumentation(item, li);
          li.className = 'footer-list-item';
          const link = item.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.textContent = link.textContent;
            newLink.className = 'footer-list-link cta-analytics analytics_cta_click footer-brand-d-inline-block';
            newLink.setAttribute('data-link-region', 'Footer List');
            if (link.target) {
              newLink.target = link.target;
            }
            li.append(newLink);
          }
          ul.append(li);
        });
        footerListWrapper.append(ul);
        if (footerLinksCounter < 2) {
          navbarLeft.append(footerListWrapper);
        } else {
          navbarRight.append(footerListWrapper);
        }
        footerLinksCounter += 1;
      }
    }

    // Social Links
    const socialLinksCell = cells[3];
    if (socialLinksCell) {
      const socialLinkItems = socialLinksCell.querySelectorAll('li');
      socialLinkItems.forEach((item) => {
        const li = document.createElement('li');
        moveInstrumentation(item, li);
        li.className = 'footer-brand-right-item footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center';
        const link = item.querySelector('a');
        const img = item.querySelector('img');
        if (link && img) {
          const socialLink = document.createElement('a');
          socialLink.href = link.href;
          socialLink.target = '_blank';
          socialLink.className = 'footer-brand-right-link footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center analytics_cta_click';
          socialLink.setAttribute('data-cta-region', 'Footer');
          socialLink.setAttribute('data-cta-label', `footer-${img.alt.toLowerCase()}`);
          socialLink.setAttribute('data-platform-name', img.alt.toLowerCase());
          socialLink.setAttribute('data-social-linktype', 'follow');
          socialLink.setAttribute('aria-label', img.alt.toLowerCase());

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          socialLink.append(optimizedPic);
          li.append(socialLink);
        }
        socialMediaList.append(li);
      });
    }

    // Copyright
    const copyrightCell = cells[4];
    if (copyrightCell) {
      const copyrightText = copyrightCell.textContent.trim();
      if (copyrightText) {
        copyrightSpan.textContent = copyrightText;
      }
      const itcPortalLink = copyrightCell.querySelector('a');
      if (itcPortalLink) {
        const li = document.createElement('li');
        moveInstrumentation(itcPortalLink, li);
        li.className = 'footer-brand-left-item footer-brand-foot-link';
        const newLink = document.createElement('a');
        newLink.href = itcPortalLink.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand-left-link analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.textContent = itcPortalLink.textContent;
        li.append(newLink);
        copyrightList.append(li);
      }
    }
  });

  primaryContent.append(leftSection);
  nav.append(navbarLeft, navbarRight);
  rightSection.append(nav);
  primaryContent.append(rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  socialMediaSection.append(socialMediaTitle, socialMediaList);
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightList, copyrightDiv);
  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrandWrapper.append(primarySection, secondarySection);

  block.textContent = '';
  block.className = 'footer-brand-section p-0';
  block.append(footerBrandWrapper);
}
