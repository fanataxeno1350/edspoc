export default function decorate(b){
  b.classList.add('featureCards-container');
  const title = b.querySelector('.featureCards-title');
  if(title) title.classList.add('featureCards-title');
  b.querySelectorAll('.featureCards-section').forEach(sec => {
    sec.classList.add('featureCards-section');
    const link = sec.querySelector('.featureCards-link');
    if(link) {
      link.classList.add('featureCards-link');
      const imgWrap = link.querySelector('.featureCards-image-wrapper');
      if(imgWrap) imgWrap.classList.add('featureCards-image-wrapper');
      const img = link.querySelector('.featureCards-image');
      if(img) img.classList.add('featureCards-image');
      const contentWrap = link.querySelector('.featureCards-content-wrapper');
      if(contentWrap) contentWrap.classList.add('featureCards-content-wrapper');
      const h2 = link.querySelector('.featureCards-item-title');
      if(h2) h2.classList.add('featureCards-item-title');
      const descWrap = link.querySelector('.featureCards-description-wrapper');
      if(descWrap) descWrap.classList.add('featureCards-description-wrapper');
      const desc = link.querySelector('.featureCards-description');
      if(desc) desc.classList.add('featureCards-description');
      const btnWrap = link.querySelector('.featureCards-redirect-button-wrapper');
      if(btnWrap) btnWrap.classList.add('featureCards-redirect-button-wrapper');
      const btn = link.querySelector('.featureCards-arrow-icon-button');
      if(btn) btn.classList.add('featureCards-arrow-icon-button');
    }
  });
  b.querySelectorAll('.featureCards-bolte-sitare-card-section').forEach(card => {
    card.classList.add('featureCards-bolte-sitare-card-section');
    if(card.classList.contains('featureCards-hide-desktop')) card.classList.add('featureCards-hide-desktop');
    const wrap = card.querySelector('.featureCards-bolte-sitare-card-wrapper');
    if(wrap) wrap.classList.add('featureCards-bolte-sitare-card-wrapper');
    const imgWrap = card.querySelector('.featureCards-bolte-sitare-card-image');
    if(imgWrap) imgWrap.classList.add('featureCards-bolte-sitare-card-image');
    const img = card.querySelector('.featureCards-card-image');
    if(img) img.classList.add('featureCards-card-image');
    const contentWrap = card.querySelector('.featureCards-bolte-sitare-content-wrapper');
    if(contentWrap) contentWrap.classList.add('featureCards-bolte-sitare-content-wrapper');
    const h2 = card.querySelector('.featureCards-bolte-sitare-title');
    if(h2) h2.classList.add('featureCards-bolte-sitare-title');
    const text = card.querySelector('.featureCards-bolte-sitare-text');
    if(text) text.classList.add('featureCards-bolte-sitare-text');
    const btn = card.querySelector('.featureCards-bolte-sitare-button');
    if(btn) btn.classList.add('featureCards-bolte-sitare-button');
  });
  const curve = b.querySelector('.featureCards-curve-container');
  if(curve && curve.classList.contains('featureCards-hide-desktop')) {
    curve.classList.add('featureCards-curve-container','featureCards-hide-desktop');
  }
}
