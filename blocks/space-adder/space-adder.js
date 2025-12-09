import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const finalRoot = document.createElement('div');
  moveInstrumentation(block, finalRoot);

  block.textContent = '';
  block.append(finalRoot);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
