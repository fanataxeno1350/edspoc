import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.classList.add('spaceadder-container');

  // No content fields to extract from the block's children
  // as per the provided block JSON (fields: [])
  // and the desired HTML structure which is just an empty container.

  // Transfer instrumentation from the original block to the new container if needed,
  // although for an empty container, it might not be strictly necessary.
  moveInstrumentation(block, spaceadderContainer);

  block.textContent = '';
  block.append(spaceadderContainer);
}
