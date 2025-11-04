export default function decorate(block) {
  block.classList.add(
    'sticky-navigation-section',
    'sticky-navigation-position-fixed',
    'sticky-navigation-bottom-0',
    'sticky-navigation-p-3',
    'sticky-navigation-d-flex',
    'sticky-navigation-align-items-center',
    'sticky-navigation-container',
    'sticky-navigation-bg-boing-primary'
  );
  const ul = document.createElement('ul');
  ul.className = 'sticky-navigation-list sticky-navigation-d-flex sticky-navigation-justify-content-around sticky-navigation-align-items-center sticky-navigation-flex-grow-1';
  [...block.querySelectorAll(':scope > div > ul > li, :scope > ul > li, :scope > li')].forEach((li) => {
    const newLi = document.createElement('li');
    newLi.className = 'sticky-navigation-item sticky-navigation-position-relative';
    const a = li.querySelector('a');
    if (a) {
      const link = a.getAttribute('href') || '';
      const dataLink = a.getAttribute('data-link') || '';
      const img = a.querySelector('img.sticky-navigation-icon');
      let iconSrc = '';
      let iconAlt = '';
      if (img) {
        iconSrc = img.getAttribute('src') || '';
        iconAlt = img.getAttribute('alt') || '';
      }
      const span = a.querySelector('span.sticky-navigation-label');
      const label = span ? span.textContent : '';
      const linkA = document.createElement('a');
      linkA.setAttribute('href', link);
      linkA.setAttribute('data-link', dataLink);
      linkA.className = 'sticky-navigation-link sticky-navigation-d-flex sticky-navigation-flex-column sticky-navigation-align-items-center sticky-navigation-gap-1 analytics_cta_click';
      if (iconSrc) {
        const imgTag = document.createElement('img');
        imgTag.src = iconSrc;
        imgTag.alt = iconAlt;
        imgTag.className = 'sticky-navigation-icon';
        linkA.appendChild(imgTag);
      }
      if (label) {
        const spanTag = document.createElement('span');
        spanTag.className = 'sticky-navigation-label';
        spanTag.textContent = label;
        linkA.appendChild(spanTag);
      }
      newLi.appendChild(linkA);
    }
    ul.appendChild(newLi);
  });
  block.textContent = '';
  block.appendChild(ul);
}