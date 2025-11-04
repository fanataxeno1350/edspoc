export default function decorate(block) {
  block.classList.add('latestblogs-wrapper');
  const wrapper = document.createElement('div');
  wrapper.className = 'latestblogs-listing';
  // First Section (Header)
  const header = document.createElement('div');
  header.className = 'latestblogs-listing_section--first latestblogs-text--white latestblogs-text-center';
  const h2 = block.querySelector('.latestblogs-listing--title');
  if (h2) header.append(h2);
  const desc = block.querySelector('.latestblogs-listing--desc');
  if (desc) header.append(desc);
  const btnWrap = block.querySelector('.latestblogs-listing--btnwrapper');
  if (btnWrap) header.append(btnWrap);
  wrapper.append(header);

  // Second Section (Cards)
  const cardSection = document.createElement('div');
  cardSection.className = 'latestblogs-listing_section--second latestblogs-d-flex';

  // Find all cards
  block.querySelectorAll('.latestblogs-listing--cardwrapper').forEach((card) => {
    cardSection.append(card);
  });
  wrapper.append(cardSection);

  // Clear and append
  block.textContent = '';
  block.append(wrapper);
}