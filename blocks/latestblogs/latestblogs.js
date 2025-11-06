export default function decorate(block) {
  block.classList.add('latestblogs-wrapper');
  const title = block.querySelector('.latestblogs-article_listing--title');
  if (title) title.classList.add('latestblogs-title');
  const desc = block.querySelector('.latestblogs-article_listing--desc');
  if (desc) desc.classList.add('latestblogs-desc');
  const btn = block.querySelector('.latestblogs-article_listing--btnWrapper a');
  if (btn) btn.classList.add('latestblogs-viewall-btn');
  const cards = block.querySelectorAll('.latestblogs-article_listing--cardWrapper');
  cards.forEach(card => {
    card.classList.add('latestblogs-card');
    const img = card.querySelector('.latestblogs-article_listing--cardImage');
    if (img) img.classList.add('latestblogs-card-img');
    const date = card.querySelector('.latestblogs-published_date');
    if (date) date.classList.add('latestblogs-card-date');
    const ctitle = card.querySelector('.latestblogs-boing--text__body');
    if (ctitle) ctitle.classList.add('latestblogs-card-title');
  });
}