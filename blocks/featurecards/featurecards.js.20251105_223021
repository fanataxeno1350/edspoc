export default function decorate(block) {
  block.classList.add('featurecards-wrapper');
  const blockChildren = [...block.children];
  blockChildren.forEach((child) => {
    if (child.classList.contains('featurecards-section')) {
      // Feature card
      const a = child.querySelector('.featurecards-link');
      if (a) {
        const img = a.querySelector('.featurecards-image img');
        const title = a.querySelector('.featurecards-title-h2');
        const desc = a.querySelector('.featurecards-desc');
        const arrowBtn = a.querySelector('.featurecards-arrow-icon-btn');
        // Rebuild structure if needed
        child.classList.add('featurecards-card');
        a.classList.add('featurecards-link');
        if (img) img.className = 'featurecards-w-100 featurecards-h-100';
        if (title) title.className = 'featurecards-title-h2 featurecards-boing-text__heading-1';
        if (desc) desc.className = 'featurecards-desc featurecards-boing-text__body-2 featurecards-text-boing-dark';
        if (arrowBtn) arrowBtn.className = 'featurecards-arrow-icon-btn';
      }
    } else if (child.classList.contains('featurecards-bolte-sitare-card-section')) {
      // Bolte Sitare card section
      const wrapper = child.querySelector('.featurecards-bolte-sitare-card-section--wrapper');
      if (wrapper) {
        wrapper.classList.add('featurecards-d-flex');
        const imgDiv = wrapper.querySelector('.featurecards-bolte-sitare-card-section--img');
        if (imgDiv) {
          const img = imgDiv.querySelector('img');
          if (img) img.className = 'featurecards-h-100 featurecards-w-100 featurecards-card-img';
        }
        const contentWrapper = wrapper.querySelector('.featurecards-content-wrapper');
        if (contentWrapper) contentWrapper.className = 'featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between';
        const title = wrapper.querySelector('.featurecards-bolte-sitare-card-section--title');
        if (title) title.className = 'featurecards-bolte-sitare-card-section--title featurecards-boing-text__heading-3 featurecards-text-boing-dark';
        const text = wrapper.querySelector('.featurecards-bolte-sitare-card-section--text');
        if (text) text.className = 'featurecards-bolte-sitare-card-section--text featurecards-boing-text__body-3 featurecards-text-boing-dark';
        const btn = wrapper.querySelector('.featurecards-bolte-sitare-card-section--btn');
        if (btn) btn.className = 'featurecards-bolte-sitare-card-section--btn featurecards-text-white featurecards-boing-text__body-4 featurecards-d-inline-block';
      }
    }
  });
}