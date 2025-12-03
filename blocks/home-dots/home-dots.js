import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const homeDotsContainer = document.createElement('div');
  homeDotsContainer.className = 'home-dots-container';

  [...block.children].forEach((row) => {
    const dot = document.createElement('span');
    dot.className = 'home-dots-dot';

    const activeProp = row.querySelector('[data-aue-prop="active"]');
    if (activeProp && activeProp.textContent.toLowerCase() === 'true') {
      dot.classList.add('home-dots-active');
    }

    moveInstrumentation(row, dot);
    homeDotsContainer.append(dot);
  });

  block.innerHTML = '';
  block.append(homeDotsContainer);
}
