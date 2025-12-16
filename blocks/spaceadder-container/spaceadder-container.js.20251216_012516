import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('spaceadder-container');

  // No authored content to extract, just build the static structure

  block.textContent = '';
  block.append(mainDiv);
  block.classList.add('spaceadder-container');
  block.dataset.blockStatus = 'loaded';
}
