export default function decorate(block) {
  const ul = block.querySelector('ul');
  if (ul) {
    ul.classList.add('featurehighlights-list');
  }

  const cta = block.querySelector('a.featurehighlights-discover-more');
  if (cta) {
    cta.classList.add('featurehighlights-discover-more');
    const b = cta.querySelector('b');
    if (b) {
      b.classList.add('featurehighlights-discover-more-text');
    }
  }
}