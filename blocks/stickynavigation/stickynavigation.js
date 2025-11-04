export default function decorate(block) {
  block.classList.add('sticky-navigation-section', 'sticky-navigation-position-fixed', 'sticky-navigation-bottom-0', 'sticky-navigation-p-3', 'sticky-navigation-d-flex', 'sticky-navigation-align-items-center', 'sticky-navigation-container', 'sticky-navigation-bg-boing-primary');
  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';
  [...block.children].forEach((row) => {
    const items = row.querySelectorAll('li.sticky-navigation-item');
    items.forEach((item) => {
      item.className = 'sticky-navigation-item sticky-navigation-position-relative';
      const link = item.querySelector('a.sticky-navigation-link');
      if (link) {
        link.className = 'sticky-navigation-link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
        const img = link.querySelector('img.sticky-navigation-icon');
        if (img) {
          img.className = 'sticky-navigation-icon';
        }
        const span = link.querySelector('span.sticky-navigation-label');
        if (span) {
          span.className = 'sticky-navigation-label';
        }
      }
      ul.append(item);
    });
  });
  block.textContent = '';
  block.append(ul);
}