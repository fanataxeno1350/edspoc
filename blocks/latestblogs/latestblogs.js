export default function decorate(block) {
  block.classList.add('latestblogs-block');

  const firstSection = block.querySelector('.latestblogs-listing_section--first');
  if (firstSection) {
    const title = firstSection.querySelector('.latestblogs-listing--title');
    if (title) title.classList.add('latestblogs-title');

    const description = firstSection.querySelector('.latestblogs-listing--desc');
    if (description) description.classList.add('latestblogs-description');

    const cta = firstSection.querySelector('.latestblogs-listing--btn');
    if (cta) {
      cta.classList.add('latestblogs-cta');
      if (cta.href && !cta.href.includes(window.location.hostname)) {
        cta.target = '_blank';
        cta.rel = 'noopener noreferrer';
      }
    }
  }

  const cardsSection = block.querySelector('.latestblogs-listing_section--second');
  if (cardsSection) {
    const cardWrappers = cardsSection.querySelectorAll('.latestblogs-listing--cardwrapper');
    cardWrappers.forEach(cardWrapper => {
      cardWrapper.classList.add('latestblogs-card-wrapper');

      const cardImage = cardWrapper.querySelector('.latestblogs-listing--cardimage');
      if (cardImage) cardImage.classList.add('latestblogs-card-image');

      const publishedDate = cardWrapper.querySelector('.latestblogs-published_date');
      if (publishedDate) publishedDate.classList.add('latestblogs-card-date');

      const cardText = cardWrapper.querySelector('.latestblogs--text__body');
      if (cardText) cardText.classList.add('latestblogs-card-text');
    });
  }
}