export default function decorate(block) {
  const menus = block.querySelectorAll('.sidenavigation-menu1');
  menus.forEach((menu) => {
    const titleSpan = menu.querySelector('.sidenavigation-linktop');
    if (titleSpan) {
      titleSpan.classList.add('sidenavigation-title');
      const titleText = titleSpan.querySelector('b');
      if (titleText) {
        titleText.classList.add('sidenavigation-title-text');
      }
    }
    const ul = menu.querySelector('ul');
    if (ul) {
      ul.classList.add('sidenavigation-list');
      const links = ul.querySelectorAll('a');
      links.forEach((link) => {
        link.classList.add('sidenavigation-link');
        if (link.href && !link.href.includes(window.location.hostname)) {
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
      });
      const nestedUls = ul.querySelectorAll('li > ul');
      nestedUls.forEach((nestedUl) => {
        nestedUl.classList.add('sidenavigation-nested-list');
        const nestedLinks = nestedUl.querySelectorAll('a');
        nestedLinks.forEach((link) => {
          link.classList.add('sidenavigation-link');
          if (link.href && !link.href.includes(window.location.hostname)) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
          }
        });
      });
    }
  });
}