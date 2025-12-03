import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('section');
  mainContainer.classList.add('sequence-section', 'sequence-homeSlot');
  mainContainer.id = 'about_us';

  const canvas = document.createElement('canvas');
  canvas.classList.add('sequence-frameSequence');
  canvas.setAttribute('height', '10800');
  canvas.setAttribute('width', '1920');
  mainContainer.append(canvas);

  const storyTDiv = document.createElement('div');
  storyTDiv.classList.add('sequence-storyT');
  const h2 = document.createElement('h2');

  const headingContent = block.querySelector('[data-aue-prop="heading"]');
  if (headingContent) {
    const inlineImages = block.querySelectorAll('[data-aue-model="inlineImage"]');
    let inlineImageIndex = 0;

    // Process the heading content to insert images
    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textParts = node.textContent.split(/(\s+)/); // Split by whitespace to preserve it
        textParts.forEach(part => {
          if (part.trim() !== '') {
            const span = document.createElement('span');
            span.classList.add('sequence-span-tag');
            span.textContent = part;
            h2.append(span);
          } else if (part !== '') {
            // Append whitespace as is
            h2.append(document.createTextNode(part));
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'P') {
          // If it's a paragraph, iterate its children
          Array.from(node.childNodes).forEach(child => processNode(child));
        } else if (node.tagName === 'A' && (node.href.endsWith('.png') || node.href.endsWith('.jpg') || node.href.endsWith('.jpeg') || node.href.endsWith('.webp') || node.href.endsWith('.gif'))) {
          const img = document.createElement('img');
          img.src = node.href;
          img.alt = node.title || '';
          const span = document.createElement('span');
          span.classList.add('sequence-span-tag');
          span.append(img);
          moveInstrumentation(node, span);
          h2.append(span);
        } else {
          // For other elements, like <span>, append them directly
          h2.append(node);
        }
      }
    };

    Array.from(headingContent.childNodes).forEach(child => processNode(child));

    moveInstrumentation(headingContent, h2);
  }
  storyTDiv.append(h2);
  mainContainer.append(storyTDiv);

  const afterLayerBottomDiv = document.createElement('div');
  afterLayerBottomDiv.classList.add('sequence-afterLayerBottom');
  const bottomImage = block.querySelector('[data-aue-prop="bottomImage"]');
  if (bottomImage) {
    let imgElement = bottomImage.querySelector('img');
    if (!imgElement) {
      const anchor = bottomImage.querySelector('a');
      if (anchor && (anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.webp') || anchor.href.endsWith('.gif'))) {
        imgElement = document.createElement('img');
        imgElement.src = anchor.href;
        imgElement.alt = anchor.title || '';
      }
    }
    if (imgElement) {
      const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
      afterLayerBottomDiv.append(pic);
      moveInstrumentation(bottomImage, pic.querySelector('img'));
    }
  }
  mainContainer.append(afterLayerBottomDiv);

  block.innerHTML = '';
  block.append(mainContainer);
}
