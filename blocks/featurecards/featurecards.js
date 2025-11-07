export default function decorate(block) {
  const titleDiv = block.querySelector('.featurecards-text');
  if (titleDiv) {
    const h1 = titleDiv.querySelector('h1');
    if (h1) {
      h1.classList.add('featurecards-title');
      const span = h1.querySelector('span');
      if (span) {
        span.classList.add('featurecards-title-partial');
      }
    }
  }

  block.querySelectorAll('.featurecards-section.featurecards-card').forEach((section) => {
    section.classList.add('featurecards-mx-auto');
    const link = section.querySelector('a');
    if (link) {
      link.classList.add('featurecards-link', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-text-decoration-none');
      if (link.href && !link.href.includes(window.location.hostname)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      const imageDiv = link.querySelector('.featurecards-image');
      if (imageDiv) {
        imageDiv.classList.add('featurecards-w-100', 'featurecards-pb-4');
        const img = imageDiv.querySelector('img');
        if (img) {
          img.classList.add('featurecards-w-100', 'featurecards-h-100');
        }
      }
      const textCenterDiv = link.querySelector('.featurecards-text-center');
      if (textCenterDiv) {
        const h2 = textCenterDiv.querySelector('h2');
        if (h2) {
          h2.classList.add('featurecards-title-h2', 'featurecards-boing-text__heading-1');
        }
        const pb5Div = textCenterDiv.querySelector('.featurecards-pb-5');
        if (pb5Div) {
          const p = pb5Div.querySelector('p');
          if (p) {
            p.classList.add('featurecards-desc', 'featurecards-boing-text__body-2', 'featurecards-text-boing-dark');
          }
        }
        const redirectedBtnDiv = textCenterDiv.querySelector('.featurecards-redirected-btn');
        if (redirectedBtnDiv) {
          redirectedBtnDiv.classList.add('featurecards-d-none');
          const button = redirectedBtnDiv.querySelector('button');
          if (button) {
            button.classList.add('featurecards-arrow-icon-btn');
          }
        }
      }
    }
  });

  block.querySelectorAll('.featurecards-bolte-sitare-card-section').forEach((cardSection) => {
    cardSection.classList.add('featurecards-d-none', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
    if (cardSection.href && !cardSection.href.includes(window.location.hostname)) {
      cardSection.target = '_blank';
      cardSection.rel = 'noopener noreferrer';
    }
    const wrapperDiv = cardSection.querySelector('.featurecards-bolte-sitare-card-section--wrapper');
    if (wrapperDiv) {
      wrapperDiv.classList.add('featurecards-d-flex');
      const imgDiv = wrapperDiv.querySelector('.featurecards-bolte-sitare-card-section--img');
      if (imgDiv) {
        const img = imgDiv.querySelector('img');
        if (img) {
          img.classList.add('featurecards-h-100', 'featurecards-w-100', 'featurecards-card-img');
        }
      }
      const contentWrapper = wrapperDiv.querySelector('.featurecards-content-wrapper');
      if (contentWrapper) {
        contentWrapper.classList.add('featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');
        const h2 = contentWrapper.querySelector('h2');
        if (h2) {
          h2.classList.add('featurecards-bolte-sitare-card-section--title', 'featurecards-boing-text__heading-3', 'featurecards-text-boing-dark');
        }
        const p = contentWrapper.querySelector('p');
        if (p) {
          p.classList.add('featurecards-bolte-sitare-card-section--text', 'featurecards-boing-text__body-3', 'featurecards-text-boing-dark');
        }
        const button = contentWrapper.querySelector('button');
        if (button) {
          button.classList.add('featurecards-bolte-sitare-card-section--btn', 'featurecards-text-white', 'featurecards-boing-text__body-4', 'featurecards-d-inline-block');
        }
      }
    }
  });

  const curveContainer = block.querySelector('.featurecards-curve-container');
  if (curveContainer) {
    curveContainer.classList.add('featurecards-d-none');
  }
}