import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.classList.add('spaceadder-container');

  // No authored fields to extract or move based on the provided JSON.
  // The block is essentially an empty container with a specific class.

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(spaceadderContainer);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
