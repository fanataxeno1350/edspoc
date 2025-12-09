import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The Space-Adder block is an empty block by design, it only adds a CSS class.
  // No content needs to be moved or transformed.
  // We just ensure the block is properly initialized for Franklin.
  block.textContent = '';
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
