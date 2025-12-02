import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The Spaceadder-Container block is an empty container by design.
  // It does not have any children or content to transform.
  // Therefore, the decorate function will do nothing.
}