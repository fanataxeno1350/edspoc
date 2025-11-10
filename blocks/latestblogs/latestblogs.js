export default function decorate(block) {
  block.classList.add('latestblogs-wrapper');
  const h2 = block.querySelector('.latestblogs-article_listing--title');
  if (h2) h2.classList.add('latestblogs-title');
  const desc = block.querySelector('.latestblogs-article_listing--desc');
  if (desc) desc.classList.add('latestblogs-description');
  const cta = block.querySelector('.latestblogs-article_listing--btnWrapper a');
  if (cta) {
    cta.classList.add('latestblogs-cta');
    if (cta.href && !cta.href.includes(window.location.hostname)) {
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
    }
  }
  const cards = block.querySelectorAll('.latestblogs-article_listing--cardWrapper');
  cards.forEach(card => {
    card.classList.add('latestblogs-article-card');
    const img = card.querySelector('.latestblogs-article_listing--cardImage');
    if (img) img.classList.add('latestblogs-article-image');
    const date = card.querySelector('.latestblogs-published_date');
    if (date) date.classList.add('latestblogs-article-date');
    const title = card.querySelector('.latestblogs-boing--text__body');
    if (title) title.classList.add('latestblogs-article-title');
  });
}