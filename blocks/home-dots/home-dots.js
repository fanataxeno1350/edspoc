import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('home-dots-container');

  [...block.children].forEach((row) => {
    const dot = document.createElement('span');
    dot.classList.add('home-dots-dot');
    moveInstrumentation(row, dot);

    const active = row.querySelector('[data-aue-prop="active"]');
    if (active && active.textContent.trim() === 'true') {
      dot.classList.add('home-dots-active');
    }

    container.append(dot);
  });

  block.innerHTML = '';
  block.append(container);
}
