import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const faqsContainer = document.createElement('div');
  faqsContainer.classList.add('faqs-padding-container');

  const faqsHead = document.createElement('div');
  faqsHead.classList.add('faqs-head');
  faqsHead.textContent = 'FAQs';
  faqsContainer.append(faqsHead);

  const faqsTandC = document.createElement('div');
  faqsTandC.classList.add('faqs-tandc');
  faqsContainer.append(faqsTandC);

  Array.from(block.children).forEach((row, index) => {
    const faqItemContainer = document.createElement('div');
    faqItemContainer.classList.add('faqs-tandc-cont');
    faqItemContainer.id = `faq-${index + 4}`; // Assuming id starts from faq-4 based on the HTML
    moveInstrumentation(row, faqItemContainer);

    const questionElement = row.querySelector('div:nth-child(1)');
    const answerElement = row.querySelector('div:nth-child(2)');

    if (questionElement) {
      const faqsTandCText = document.createElement('div');
      faqsTandCText.classList.add('faqs-tandc-text');
      faqItemContainer.append(faqsTandCText);

      const questionPara = questionElement.querySelector('p');
      if (questionPara) {
        faqsTandCText.append(questionPara);
        moveInstrumentation(questionElement, questionPara);
      }

      let iconImg = questionElement.querySelector('img');
      if (iconImg) {
        const pic = createOptimizedPicture(iconImg.src, iconImg.alt);
        faqsTandCText.append(pic);
        moveInstrumentation(iconImg, pic.querySelector('img'));
      }
    }

    if (answerElement) {
      const faqsExtText = document.createElement('div');
      faqsExtText.classList.add('faqs-ext-text');
      faqItemContainer.append(faqsExtText);

      const answerPara = answerElement.querySelector('p');
      if (answerPara) {
        answerPara.classList.add('faqs-para');
        faqsExtText.append(answerPara);
        moveInstrumentation(answerElement, answerPara);
      }
    }

    faqsTandC.append(faqItemContainer);
  });

  block.innerHTML = '';
  block.append(faqsContainer);
}
