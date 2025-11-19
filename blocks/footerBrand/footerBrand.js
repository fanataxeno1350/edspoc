import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('footer-brand', 'footer-brand--bg-boing-neutral-gray-600');

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand--primary');
  moveInstrumentation(block.children[0], primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-brand--container');
  moveInstrumentation(block.children[0].children[0], primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand--primary-content',
    'footer-brand--d-flex',
    'footer-brand--flex-column',
    'footer-brand--flex-md-row',
    'footer-brand--justify-content-md-between',
    'footer-brand--align-items-center',
  );
  moveInstrumentation(block.children[0].children[0].children[0], primaryContent);

  const leftSection = document.createElement('section');
  leftSection.classList.add(
    'footer-brand--left',
    'footer-brand--d-flex',
    'footer-brand--gap-16',
    'footer-brand--px-10',
    'footer-brand--align-items-center',
    'footer-brand--justify-content-center',
  );
  moveInstrumentation(block.children[0].children[0].children[0].children[0], leftSection);

  const logo1Cell = block.children[0].children[0].children[0].children[0].children[0];
  const logo1Link = logo1Cell.querySelector('a');
  const logo1Img = logo1Cell.querySelector('img');

  if (logo1Link && logo1Img) {
    const newLogo1Link = document.createElement('a');
    newLogo1Link.href = logo1Link.href;
    newLogo1Link.target = '_blank';
    newLogo1Link.classList.add(
      'footer-brand--logo',
      'footer-brand--d-inline-block',
      'footer-brand--analytics_cta_click',
    );
    newLogo1Link.setAttribute('data-cta-region', 'Footer');
    newLogo1Link.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(logo1Link, newLogo1Link);

    const optimizedLogo1Pic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
    optimizedLogo1Pic.querySelector('img').classList.add(
      'footer-brand--object-fit-contain',
      'footer-brand--w-100',
      'footer-brand--h-100',
      'footer-brand--no-rendition',
    );
    optimizedLogo1Pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(logo1Img, optimizedLogo1Pic.querySelector('img'));
    newLogo1Link.append(optimizedLogo1Pic);
    leftSection.append(newLogo1Link);
  }

  const logo2Cell = block.children[0].children[0].children[0].children[0].children[1];
  const logo2Img = logo2Cell.querySelector('img');

  if (logo2Img) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add(
      'footer-brand--secondary-logo',
      'footer-brand--d-inline-block',
    );
    moveInstrumentation(logo2Cell, secondaryLogoDiv);

    const optimizedLogo2Pic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
    optimizedLogo2Pic.querySelector('img').classList.add(
      'footer-brand--object-fit-contain',
      'footer-brand--w-100',
      'footer-brand--no-rendition',
    );
    optimizedLogo2Pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(logo2Img, optimizedLogo2Pic.querySelector('img'));
    secondaryLogoDiv.append(optimizedLogo2Pic);
    leftSection.append(secondaryLogoDiv);
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand--right');
  moveInstrumentation(block.children[0].children[0].children[0].children[1], rightSection);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand--navbar', 'footer-brand--d-grid', 'footer-brand--d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  moveInstrumentation(block.children[0].children[0].children[0].children[1].children[0], nav);

  const navbarLeft = document.createElement('div');
  navbarLeft.classList.add(
    'footer-brand--navbar-left',
    'footer-brand--d-flex',
    'footer-brand--flex-column',
    'footer-brand--flex-md-row',
  );
  moveInstrumentation(block.children[0].children[0].children[0].children[1].children[0].children[0], navbarLeft);

  const linksContainerLeft = block.children[0].children[0].children[0].children[1].children[0].children[0];
  [...linksContainerLeft.children].forEach((listComponent) => {
    const newListComponent = document.createElement('div');
    newListComponent.classList.add('footer-list-component');
    moveInstrumentation(listComponent, newListComponent);

    const ul = document.createElement('ul');
    ul.classList.add(
      'footer-list',
      'footer-list--d-flex',
      'footer-list--align-items-center',
      'footer-list--justify-content-center',
      'footer-list--align-items-md-start',
      'footer-list--flex-column',
    );
    moveInstrumentation(listComponent.querySelector('ul'), ul);

    [...listComponent.querySelectorAll('li')].forEach((li) => {
      const newLi = document.createElement('li');
      newLi.classList.add('footer-list--item');
      moveInstrumentation(li, newLi);

      const link = li.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.classList.add(
          'footer-list--cta-analytics',
          'footer-list--analytics_cta_click',
          'footer-list--item-link',
          'footer-list--d-inline-block',
        );
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          newLink.target = link.target;
        }
        moveInstrumentation(link, newLink);
        newLi.append(newLink);
      }
      ul.append(newLi);
    });
    newListComponent.append(ul);
    navbarLeft.append(newListComponent);
  });

  const navbarRight = document.createElement('div');
  navbarRight.classList.add(
    'footer-brand--navbar-right',
    'footer-brand--d-flex',
    'footer-brand--flex-column',
    'footer-brand--flex-md-row',
  );
  moveInstrumentation(block.children[0].children[0].children[0].children[1].children[0].children[1], navbarRight);

  const linksContainerRight = block.children[0].children[0].children[0].children[1].children[0].children[1];
  [...linksContainerRight.children].forEach((listComponent) => {
    const newListComponent = document.createElement('div');
    newListComponent.classList.add('footer-list-component');
    moveInstrumentation(listComponent, newListComponent);

    const ul = document.createElement('ul');
    ul.classList.add(
      'footer-list',
      'footer-list--d-flex',
      'footer-list--align-items-center',
      'footer-list--justify-content-center',
      'footer-list--align-items-md-start',
      'footer-list--flex-column',
    );
    moveInstrumentation(listComponent.querySelector('ul'), ul);

    [...listComponent.querySelectorAll('li')].forEach((li) => {
      const newLi = document.createElement('li');
      newLi.classList.add('footer-list--item');
      moveInstrumentation(li, newLi);

      const link = li.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.classList.add(
          'footer-list--cta-analytics',
          'footer-list--analytics_cta_click',
          'footer-list--item-link',
          'footer-list--d-inline-block',
        );
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          newLink.target = link.target;
        }
        moveInstrumentation(link, newLink);
        newLi.append(newLink);
      }
      ul.append(newLi);
    });
    newListComponent.append(ul);
    navbarRight.append(newListComponent);
  });

  nav.append(navbarLeft, navbarRight);
  rightSection.append(nav);

  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand--secondary');
  moveInstrumentation(block.children[1], secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-brand--container');
  moveInstrumentation(block.children[1].children[0], secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add(
    'footer-brand--secondary-content',
    'footer-brand--d-flex',
    'footer-brand--flex-column',
    'footer-brand--justify-content-md-between',
    'footer-brand--align-items-center',
  );
  moveInstrumentation(block.children[1].children[0].children[0], secondaryContent);

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add(
    'footer-brand--right',
    'footer-brand--d-flex',
    'footer-brand--flex-column',
    'footer-brand--pb-5',
  );
  moveInstrumentation(block.children[1].children[0].children[0].children[0], socialMediaSection);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-brand--social-media-title');
  socialMediaTitle.textContent = 'Follow Us On';
  moveInstrumentation(block.children[1].children[0].children[0].children[0].children[0], socialMediaTitle);
  socialMediaSection.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add(
    'footer-brand--right-list',
    'footer-brand--d-flex',
    'footer-brand--align-items-center',
    'footer-brand--justify-content-center',
    'footer-brand--px-10',
    'footer-brand--flex-wrap',
  );
  moveInstrumentation(block.children[1].children[0].children[0].children[0].children[1], socialList);

  [...block.children[1].children[0].children[0].children[0].children[1].children].forEach((socialItem) => {
    const newSocialItem = document.createElement('li');
    newSocialItem.classList.add(
      'footer-brand--right-item',
      'footer-brand--d-flex',
      'footer-brand--justify-content-center',
      'footer-brand--align-items-center',
    );
    moveInstrumentation(socialItem, newSocialItem);

    const socialLink = socialItem.querySelector('a');
    const socialImg = socialItem.querySelector('img');

    if (socialLink && socialImg) {
      const newSocialLink = document.createElement('a');
      newSocialLink.href = socialLink.href;
      newSocialLink.target = '_blank';
      newSocialLink.classList.add(
        'footer-brand--right-link',
        'footer-brand--d-flex',
        'footer-brand--justify-content-center',
        'footer-brand--align-items-center',
        'footer-brand--analytics_cta_click',
      );
      newSocialLink.setAttribute('data-cta-region', 'Footer');
      newSocialLink.setAttribute('data-cta-label', socialLink.getAttribute('data-cta-label'));
      newSocialLink.setAttribute('data-platform-name', socialLink.getAttribute('data-platform-name'));
      newSocialLink.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(socialLink, newSocialLink);

      const optimizedSocialPic = createOptimizedPicture(socialImg.src, socialImg.alt);
      optimizedSocialPic.querySelector('img').classList.add(
        'footer-brand--object-fit-contain',
        'footer-brand--w-100',
        'footer-brand--h-100',
        'footer-brand--no-rendition',
      );
      optimizedSocialPic.querySelector('img').setAttribute('loading', 'lazy');
      optimizedSocialPic.querySelector('img').setAttribute('aria-label', socialImg.getAttribute('aria-label'));
      moveInstrumentation(socialImg, optimizedSocialPic.querySelector('img'));
      newSocialLink.append(optimizedSocialPic);
      newSocialItem.append(newSocialLink);
    }
    socialList.append(newSocialItem);
  });
  socialMediaSection.append(socialList);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add(
    'footer-brand--left',
    'footer-brand--py-5',
    'footer-brand--d-flex',
    'footer-brand--flex-column',
    'footer-brand--gap-3',
  );
  moveInstrumentation(block.children[1].children[0].children[0].children[1], copyrightSection);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add(
    'footer-brand--left-list',
    'footer-brand--d-flex',
    'footer-brand--align-items-center',
    'footer-brand--justify-content-center',
    'footer-brand--flex-wrap',
  );
  moveInstrumentation(block.children[1].children[0].children[0].children[1].children[0], copyrightList);

  const copyrightListItem = document.createElement('li');
  copyrightListItem.classList.add('footer-brand--left-item', 'footer-brand--foot-link');
  moveInstrumentation(block.children[1].children[0].children[0].children[1].children[0].children[0], copyrightListItem);

  const copyrightLink = block.children[1].children[0].children[0].children[1].children[0].children[0].querySelector('a');
  if (copyrightLink) {
    const newCopyrightLink = document.createElement('a');
    newCopyrightLink.href = copyrightLink.href;
    newCopyrightLink.target = '_blank';
    newCopyrightLink.textContent = copyrightLink.textContent;
    newCopyrightLink.classList.add('footer-brand--left-link', 'footer-brand--analytics_cta_click');
    newCopyrightLink.setAttribute('data-cta-region', 'Footer');
    moveInstrumentation(copyrightLink, newCopyrightLink);
    copyrightListItem.append(newCopyrightLink);
  }
  copyrightList.append(copyrightListItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand--left-copyright', 'footer-brand--text-center');
  moveInstrumentation(block.children[1].children[0].children[0].children[1].children[1], copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand--left-text', 'footer-brand--text-white');
  copyrightSpan.textContent = block.children[1].children[0].children[0].children[1].children[1].querySelector('span').textContent;
  moveInstrumentation(block.children[1].children[0].children[0].children[1].children[1].querySelector('span'), copyrightSpan);
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  block.textContent = '';
  block.append(primarySection, secondarySection);
}
