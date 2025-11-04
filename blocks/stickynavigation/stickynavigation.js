export default function decorate(block) {
  block.classList.add('sticky-navigation-section',
    'sticky-navigation-position-fixed',
    'sticky-navigation-bottom-0',
    'sticky-navigation-p-3',
    'sticky-navigation-d-flex',
    'sticky-navigation-align-items-center',
    'sticky-navigation-container',
    'sticky-navigation-bg-boing-primary');

  const navList = document.createElement('ul');
  navList.className = 'sticky-navigation-list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';

  [...block.querySelectorAll('div > ul > li')].forEach((li) => {
    li.className = 'sticky-navigation-item sticky-navigation-position-relative';
    const a = li.querySelector('a');
    if (a) {
      a.className = 'sticky-navigation-link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
      const img = a.querySelector('img');
      if (img) {
        img.className = 'sticky-navigation-icon';
      }
      const span = a.querySelector('span');
      if (span) {
        span.className = 'sticky-navigation-label';
      }
    }
    navList.appendChild(li);
  });

  // Remove any existing children
  while (block.firstChild) block.removeChild(block.firstChild);
  block.appendChild(navList);
}