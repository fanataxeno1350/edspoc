import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const finalRoot = document.createElement('div');
  finalRoot.className = 'spaceadder-container';

  // Since there are no fields defined in the block JSON, 
  // the block is essentially an empty container that might get its content 
  // from the authoring UI directly as children, or it's just a structural element.
  // In this specific case, the block JSON has no fields, and the HTML is an empty div.
  // This implies the block might be used as a simple wrapper or a placeholder.
  // If there were any children in the authored block, we would move them.

  // For a block with no defined fields and an empty initial HTML structure,
  // we just ensure the root element has the correct class.
  // If the block had any direct children from authoring (e.g., a user manually added content
  // inside the block in the editor without a specific field mapping),
  // we would move them here. However, based on the provided JSON and HTML,
  // there's nothing to move.

  // Example of how you would move children if they existed:
  // while (block.firstElementChild) {
  //   const child = block.firstElementChild;
  //   finalRoot.append(child);
  //   moveInstrumentation(child, child); // Move instrumentation if the child itself is instrumented
  // }

  block.textContent = '';
  block.append(finalRoot);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
