import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The spaceadder-container block has no specific content to extract or restructure.
  // It primarily acts as a container for styling purposes.
  // Therefore, no content manipulation is needed in the decorate function.
  // The block will remain as an empty div with the class 'spaceadder-container'
  // as per the provided HTML and block JSON, which has no fields.

  // Ensure the block has the correct class and status for Franklin to load CSS.
  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
