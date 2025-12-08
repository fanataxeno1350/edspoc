import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const stickyNavigationSection = document.createElement('div');
  stickyNavigationSection.id = 'sticky-navigation';
  stickyNavigationSection.className = 'sticky-navigation-section sticky-navigation-position-fixed sticky-navigation-bottom-0 sticky-navigation-p-3 sticky-navigation-d-flex sticky-navigation-align-items-center sticky-navigation-container sticky-navigation-bg-boing-primary';

  const stickyNavigationList = document.createElement('ul');
  stickyNavigationList.className = 'sticky-navigation-list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  const navigationItems = block.querySelectorAll('[data-aue-model="navigationItem"]');
  navigationItems.forEach((item) => {
    const stickyNavigationItem = document.createElement('li');
    stickyNavigationItem.className = 'sticky-navigation-item sticky-navigation-position-relative';
    moveInstrumentation(item, stickyNavigationItem);

    const linkWrapper = item.querySelector('[data-aue-prop="link"]');
    const link = linkWrapper ? linkWrapper.querySelector('a') : null;

    const stickyNavigationLink = document.createElement('a');
    stickyNavigationLink.className = 'sticky-navigation-link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
    if (link) {
      stickyNavigationLink.href = link.href;
      stickyNavigationLink.dataset.link = link.dataset.aueSrc;
      moveInstrumentation(link, stickyNavigationLink);
    }

    const iconWrapper = item.querySelector('[data-aue-prop="icon"]');
    const img = iconWrapper ? iconWrapper.querySelector('img') : null;
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
      pic.className = 'sticky-navigation-icon';
      moveInstrumentation(img, pic.querySelector('img'));
      stickyNavigationLink.append(pic);
    }

    const labelWrapper = item.querySelector('[data-aue-prop="label"]');
    const labelSpan = document.createElement('span');
    labelSpan.className = 'sticky-navigation-label';
    if (labelWrapper) {
      labelSpan.append(...labelWrapper.childNodes);
      moveInstrumentation(labelWrapper, labelSpan);
    }
    stickyNavigationLink.append(labelSpan);

    stickyNavigationItem.append(stickyNavigationLink);
    stickyNavigationList.append(stickyNavigationItem);
  });

  stickyNavigationSection.append(stickyNavigationList);

  block.textContent = '';
  block.append(stickyNavigationSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
