import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.classList.add('spaceadder-container');

  block.textContent = '';
  block.append(spaceadderContainer);
  block.className = 'spaceadder-container block';
  block.dataset.blockStatus = 'loaded';
}
