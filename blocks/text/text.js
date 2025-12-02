import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const content = block.querySelector('[data-aue-prop="content"]');
  if (content) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('text-f3449c992e-cmp-text');
    newDiv.append(...content.childNodes);
    moveInstrumentation(content, newDiv);
    block.innerHTML = '';
    block.append(newDiv);
  }
}
