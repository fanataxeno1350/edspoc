import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.classList.add('spaceadder-container');

  // Transfer instrumentation from the block itself to the new container
  // as there are no children rows to iterate over based on the block JSON.
  moveInstrumentation(block, spaceadderContainer);

  // Since the block JSON indicates no fields, we assume the block itself
  // is the only content to be transformed into the spaceadder-container.
  // If there were rows/cells, we would iterate block.children.

  // Clear the original block content and append the new container.
  block.textContent = '';
  block.append(spaceadderContainer);
}
