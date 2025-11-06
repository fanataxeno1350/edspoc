export default function decorate(b){
  b.classList.add('sticky-navigation');
  const ul = b.querySelector('.sticky-navigation-list');
  if (ul) {
    ul.classList.add('sticky-navigation-list-enhanced');
    ul.querySelectorAll('.sticky-navigation-item').forEach(li => {
      li.classList.add('sticky-navigation-item-enhanced');
      const link = li.querySelector('.sticky-navigation-link');
      if (link) {
        link.classList.add('sticky-navigation-link-enhanced');
        const img = link.querySelector('.sticky-navigation-icon');
        if (img) img.classList.add('sticky-navigation-icon-enhanced');
        const label = link.querySelector('.sticky-navigation-label');
        if (label) label.classList.add('sticky-navigation-label-enhanced');
      }
    });
  }
}