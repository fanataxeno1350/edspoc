import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const faqsContainer = document.createElement('section');
  faqsContainer.classList.add('faqs-section', 'faqs-homeSlot');

  const faqsPaddingCon = document.createElement('div');
  faqsPaddingCon.classList.add('faqs-paddingCon');
  faqsContainer.append(faqsPaddingCon);

  const faqsHead = document.createElement('div');
  faqsHead.classList.add('faqs-faq_head');
  faqsHead.textContent = 'FAQs';
  faqsPaddingCon.append(faqsHead);

  const faqsTandC = document.createElement('div');
  faqsTandC.classList.add('faqs-tandc');
  faqsPaddingCon.append(faqsTandC);

  const faqItems = block.querySelectorAll('[data-aue-model="faqItem"]');

  faqItems.forEach((faqItem) => {
    const tandcCont = document.createElement('div');
    tandcCont.classList.add('faqs-tandc_cont');
    moveInstrumentation(faqItem, tandcCont);

    const questionDiv = faqItem.querySelector('[data-aue-prop="question"]');
    const iconDiv = faqItem.querySelector('[data-aue-prop="icon"]');
    const answerDiv = faqItem.querySelector('[data-aue-prop="answer"]');

    const faqsTandcText = document.createElement('div');
    faqsTandcText.classList.add('faqs-tandc_text');
    tandcCont.append(faqsTandcText);

    if (questionDiv) {
      const questionP = document.createElement('p');
      questionP.append(...questionDiv.childNodes);
      moveInstrumentation(questionDiv, questionP);
      faqsTandcText.append(questionP);
    }

    if (iconDiv) {
      let iconImg = iconDiv.querySelector('img');
      if (!iconImg) {
        const anchor = iconDiv.querySelector('a[href]');
        if (anchor) {
          iconImg = document.createElement('img');
          iconImg.src = anchor.href;
          iconImg.alt = anchor.title || '';
        }
      }
      if (iconImg) {
        const pic = createOptimizedPicture(iconImg.src, iconImg.alt);
        moveInstrumentation(iconImg, pic.querySelector('img'));
        faqsTandcText.append(pic);
      }
    }

    const faqsExtText = document.createElement('div');
    faqsExtText.classList.add('faqs-ext_text');
    tandcCont.append(faqsExtText);

    if (answerDiv) {
      const answerP = document.createElement('p');
      answerP.classList.add('faqs-faqPara');
      answerP.append(...answerDiv.childNodes);
      moveInstrumentation(answerDiv, answerP);
      faqsExtText.append(answerP);
    }

    faqsTandC.append(tandcCont);
  });

  block.innerHTML = '';
  block.append(faqsContainer);
}
