import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.classList.add('spaceadder-container');

  // Transfer instrumentation from the block itself if needed, or from its children if they exist.
  // Since the block JSON shows no fields, we assume the block itself is the primary element
  // to transfer instrumentation from, if any was applied directly to the block element.
  moveInstrumentation(block, spaceadderContainer);

  // The block JSON indicates no fields, meaning this block is likely a simple
  // structural element or a placeholder that doesn't process children for content.
  // If there were children (rows/cells) in the actual authored content, and they needed
  // to be processed, this is where that logic would go.
  // For this specific case, we'll just append the new container.

  block.textContent = '';
  block.append(spaceadderContainer);
}
