export default function decorate(block) {
  // HEADER/LOGO
  const header = document.querySelector('.header-boing-container');
  if (header) {
    block.append(header.cloneNode(true));
  }

  // SIDEBAR MENU
  const sidebarMenu = document.querySelector('.header-sidebar__menu');
  if (sidebarMenu) {
    const menu = document.createElement('ul');
    menu.className = sidebarMenu.className;
    sidebarMenu.querySelectorAll('.header-sidebar__menu-item').forEach((item) => {
      const li = document.createElement('li');
      li.className = item.className;
      const link = item.querySelector('a');
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.className = link.className;
        a.innerHTML = link.innerHTML;
        li.append(a);
      }
      menu.append(li);
    });
    block.append(menu);
  }

  // FOOTER BRAND SECTION
  const footerBrand = document.querySelector('.header-footer-brand');
  if (footerBrand) {
    block.append(footerBrand.cloneNode(true));
  }

  // OVERLAY (for mobile menu)
  const overlay = document.querySelector('.header-overlay');
  if (overlay) {
    block.append(overlay.cloneNode(true));
  }
}