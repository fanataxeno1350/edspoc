export default function decorate(block) {
  block.classList.add('latestblogs-wrapper');
  const title = block.querySelector('.latestblogs-listing--title');
  if (title) title.classList.add('latestblogs-title');
  const desc = block.querySelector('.latestblogs-listing--desc');
  if (desc) desc.classList.add('latestblogs-description');
  const cta = block.querySelector('.latestblogs-listing--btnwrapper a');
  if (cta) cta.classList.add('latestblogs-cta');
  const cards = block.querySelectorAll('.latestblogs-listing--cardwrapper');
  cards.forEach(card => {
    card.classList.add('latestblogs-card');
    const img = card.querySelector('.latestblogs-listing--cardimage');
    if (img) img.classList.add('latestblogs-card-image');
    const date = card.querySelector('.latestblogs-published_date');
    if (date) date.classList.add('latestblogs-card-date');
    const title = card.querySelector('.latestblogs-text__body-2');
    if (title) title.classList.add('latestblogs-card-title');
  });
}