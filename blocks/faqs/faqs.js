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

  const faqItems = block.querySelectorAll('[data-aue-model="faq"]');

  faqItems.forEach((faqItem, index) => {
    const tandcCont = document.createElement('div');
    tandcCont.classList.add('faqs-tandc_cont');
    tandcCont.id = `FAQ_${index + 4}`;
    moveInstrumentation(faqItem, tandcCont);

    const tandcText = document.createElement('div');
    tandcText.classList.add('faqs-tandc_text');
    tandcCont.append(tandcText);

    const question = faqItem.querySelector('[data-aue-prop="question"]');
    if (question) {
      const p = document.createElement('p');
      p.append(...question.childNodes);
      moveInstrumentation(question, p);
      tandcText.append(p);
    }

    let icon = faqItem.querySelector('[data-aue-prop="icon"]');
    if (!icon) {
      const anchor = faqItem.querySelector('a[href$=".svg"], a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (anchor) {
        icon = anchor;
      }
    }

    if (icon) {
      const img = document.createElement('img');
      img.src = icon.href || icon.src;
      img.alt = icon.alt || '';
      moveInstrumentation(icon, img);
      tandcText.append(img);
    }

    const extText = document.createElement('div');
    extText.classList.add('faqs-ext_text');
    tandcCont.append(extText);

    const answer = faqItem.querySelector('[data-aue-prop="answer"]');
    if (answer) {
      const p = document.createElement('p');
      p.classList.add('faqs-faqPara');
      p.append(...answer.childNodes);
      moveInstrumentation(answer, p);
      extText.append(p);
    }

    faqsTandC.append(tandcCont);
  });

  block.innerHTML = '';
  block.append(faqsSection);
}
