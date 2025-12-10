import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const spaceadderContainer = document.createElement('div');
  spaceadderContainer.classList.add('spaceadder-container');
  moveInstrumentation(block, spaceadderContainer);

  // Spaceadder block has no children/content, it's just an empty div for spacing.
  // So we just clear the block and append the new container.
  block.textContent = '';
  block.append(spaceadderContainer);
}
