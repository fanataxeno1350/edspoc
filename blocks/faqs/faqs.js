import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const faqsSection = document.createElement('section');
  faqsSection.classList.add('faqs-section', 'faqs-homeSlot');

  const faqsPaddingCon = document.createElement('div');
  faqsPaddingCon.classList.add('faqs-paddingCon');
  faqsSection.append(faqsPaddingCon);

  const faqsHead = document.createElement('div');
  faqsHead.classList.add('faqs-faq_head');
  faqsHead.textContent = 'FAQs';
  faqsPaddingCon.append(faqsHead);

  const faqsTandC = document.createElement('div');
  faqsTandC.classList.add('faqs-tandc');
  faqsPaddingCon.append(faqsTandC);

  const faqItems = block.querySelectorAll('[data-aue-model="faqItem"]');
  faqItems.forEach((faqItem, index) => {
    const faqsTandcCont = document.createElement('div');
    faqsTandcCont.classList.add('faqs-tandc_cont');
    faqsTandcCont.id = `FAQ_${index + 4}`;
    moveInstrumentation(faqItem, faqsTandcCont);

    const faqsTandcText = document.createElement('div');
    faqsTandcText.classList.add('faqs-tandc_text');
    faqsTandcCont.append(faqsTandcText);

    const question = faqItem.querySelector('[data-aue-prop="question"]');
    if (question) {
      const pQuestion = document.createElement('p');
      pQuestion.append(...question.childNodes);
      moveInstrumentation(question, pQuestion);
      faqsTandcText.append(pQuestion);
    }

    let icon = faqItem.querySelector('[data-aue-prop="icon"]');
    if (!icon) {
      const anchor = faqItem.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (anchor) {
        icon = anchor;
      }
    }

    if (icon) {
      let imgElement;
      if (icon.tagName === 'IMG') {
        imgElement = icon;
      } else if (icon.tagName === 'A') {
        imgElement = document.createElement('img');
        imgElement.src = icon.href;
        imgElement.alt = icon.title || '';
      }

      if (imgElement) {
        const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
        faqsTandcText.append(pic);
        moveInstrumentation(imgElement, pic.querySelector('img'));
      }
    }

    const faqsExtText = document.createElement('div');
    faqsExtText.classList.add('faqs-ext_text');
    faqsTandcCont.append(faqsExtText);

    const answer = faqItem.querySelector('[data-aue-prop="answer"]');
    if (answer) {
      const pAnswer = document.createElement('p');
      pAnswer.classList.add('faqs-faqPara');
      pAnswer.append(...answer.childNodes);
      moveInstrumentation(answer, pAnswer);
      faqsExtText.append(pAnswer);
    }
    faqsTandC.append(faqsTandcCont);
  });

  block.innerHTML = '';
  block.append(faqsSection);
}
