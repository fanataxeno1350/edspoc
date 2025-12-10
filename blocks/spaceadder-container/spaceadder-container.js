import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.classList.add('spaceadder-container');

  // No content to extract or move as per the block JSON
  // The block is essentially an empty container for spacing purposes.

  block.textContent = '';
  block.append(spaceadderContainer);
}
