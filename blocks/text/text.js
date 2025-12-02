import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const content = block.querySelector('[data-aue-prop="content"]');
  if (content) {
    const newDiv = document.createElement('div');
    moveInstrumentation(content, newDiv);
    newDiv.append(...content.childNodes);
    block.replaceChildren(newDiv);
  }
}
