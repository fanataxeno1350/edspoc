export default function decorate(block) {
  block.classList.add('sticky-navigation-section', 'sticky-navigation-position-fixed', 'sticky-navigation-bottom-0', 'sticky-navigation-p-3', 'sticky-navigation-d-flex', 'sticky-navigation-align-items-center', 'sticky-navigation-container', 'sticky-navigation-bg-boing-primary');
  const ul = block.querySelector('.sticky-navigation-list');
  if (ul) {
    ul.classList.add('sticky-navigation-list', 'sticky-navigation-d-flex', 'sticky-navigation-justify-content-around', 'sticky-navigation-align-items-center', 'sticky-navigation-flex-grow-1');
    ul.querySelectorAll('.sticky-navigation-item').forEach(li => {
      li.classList.add('sticky-navigation-item', 'sticky-navigation-position-relative');
      const a = li.querySelector('.sticky-navigation-link');
      if (a) {
        a.classList.add('sticky-navigation-link', 'sticky-navigation-d-flex', 'sticky-navigation-flex-column', 'sticky-navigation-align-items-center', 'sticky-navigation-gap-1', 'analytics_cta_click');
        const img = a.querySelector('.sticky-navigation-icon');
        if (img) img.classList.add('sticky-navigation-icon');
        const span = a.querySelector('.sticky-navigation-label');
        if (span) span.classList.add('sticky-navigation-label');
      }
    });
  }
}