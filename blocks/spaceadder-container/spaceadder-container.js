import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The Spaceadder-Container block does not have any authorable content fields
  // based on the provided block JSON. It seems to be a structural block
  // that might be used for layout or spacing purposes without direct content.
  // Therefore, no content extraction or manipulation is needed.

  // We just ensure the block has the correct class and status.
  block.textContent = ''; // Clear any potential default content from the block
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
