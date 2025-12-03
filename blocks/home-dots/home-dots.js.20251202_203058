import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('home-dots-container');

  const dotItems = block.querySelectorAll('[data-aue-model="dot"]');

  dotItems.forEach((dotItem) => {
    const dotSpan = document.createElement('span');
    dotSpan.classList.add('home-dots-dot');

    const activeProp = dotItem.querySelector('[data-aue-prop="active"]');
    if (activeProp && activeProp.textContent.toLowerCase() === 'true') {
      dotSpan.classList.add('home-dots-active');
    }

    moveInstrumentation(dotItem, dotSpan);
    dotsContainer.append(dotSpan);
  });

  block.innerHTML = '';
  block.append(dotsContainer);
}
