export default function decorate(block) {
  block.classList.add('featurecards-wrapper');
  const text = block.querySelector('.featurecards-text');
  if (text) {
    text.classList.add('featurecards-text');
    const mainTitle = text.querySelector('.featurecards-title-main');
    if (mainTitle) mainTitle.classList.add('featurecards-title-main');
    const highlight = mainTitle && mainTitle.querySelector('.featurecards-title-highlight');
    if (highlight) highlight.classList.add('featurecards-title-highlight');
  }
  block.querySelectorAll('.featurecards-section').forEach((section) => {
    section.classList.add('featurecards-section');
    section.classList.add('featurecards-card-section');
    section.classList.add('featurecards-mx-auto');
    const link = section.querySelector('.featurecards-link');
    if (link) {
      link.classList.add('featurecards-link', 'analytics_cta_click', 'featurecards-text-decoration-none');
      const imgWrapper = link.querySelector('.featurecards-image-wrapper');
      if (imgWrapper) imgWrapper.classList.add('featurecards-image-wrapper', 'featurecards-w-100', 'featurecards-pb-4');
      const img = link.querySelector('img');
      if (img) img.classList.add('featurecards-image', 'featurecards-w-100', 'featurecards-h-100');
      const textCenter = link.querySelector('.featurecards-text-center');
      if (textCenter) {
        textCenter.classList.add('featurecards-text-center');
        const title = textCenter.querySelector('.featurecards-title');
        if (title) title.classList.add('featurecards-title', 'featurecards-boing--text__heading-1');
        const desc = textCenter.querySelector('.featurecards-description');
        if (desc) desc.classList.add('featurecards-description', 'featurecards-boing--text__body-2', 'featurecards-text-boing-dark');
        const btnContainer = textCenter.querySelector('.featurecards-redirected-btn');
        if (btnContainer) btnContainer.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
        const btn = btnContainer && btnContainer.querySelector('.featurecards-arrow-icon-btn');
        if (btn) btn.classList.add('featurecards-arrow-icon-btn');
      }
    }
  });
  block.querySelectorAll('.featurecards-bolte-sitare-card-section').forEach((card) => {
    card.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
    const wrapper = card.querySelector('.featurecards-bolte-sitare-card-section--wrapper');
    if (wrapper) {
      wrapper.classList.add('featurecards-bolte-sitare-card-section--wrapper');
      const img = wrapper.querySelector('.featurecards-bolte-sitare-card-section--img img');
      if (img) img.classList.add('featurecards-card-img', 'featurecards-h-100', 'featurecards-w-100');
      const content = wrapper.querySelector('.featurecards-content-wrapper');
      if (content) {
        content.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');
        const title = content.querySelector('.featurecards-bolte-sitare-card-section--title');
        if (title) title.classList.add('featurecards-bolte-sitare-card-section--title', 'featurecards-boing--text__heading-3', 'featurecards-text-boing-dark');
        const text = content.querySelector('.featurecards-bolte-sitare-card-section--text');
        if (text) text.classList.add('featurecards-bolte-sitare-card-section--text', 'featurecards-boing--text__body-3', 'featurecards-text-boing-dark');
        const btn = content.querySelector('.featurecards-bolte-sitare-card-section--btn');
        if (btn) btn.classList.add('featurecards-bolte-sitare-card-section--btn', 'featurecards-text-white', 'featurecards-boing--text__body-4', 'featurecards-d-inline-block');
      }
    }
  });
  const curve = block.querySelector('.featurecards-curve-container');
  if (curve) curve.classList.add('featurecards-curve-container', 'featurecards-d-none');
}
