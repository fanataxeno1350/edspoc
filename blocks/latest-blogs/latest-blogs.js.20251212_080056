import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleElement.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, titleElement);
  } else {
    const fallbackTitle = block.querySelector('h1, h2, h3, h4, h5, h6');
    if (fallbackTitle) {
      titleElement.textContent = fallbackTitle.textContent;
    }
  }
  firstSection.append(titleElement);

  const descElement = document.createElement('p');
  descElement.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
  const descContent = block.querySelector('[data-aue-prop="description"]');
  if (descContent) {
    descElement.append(...descContent.childNodes);
    moveInstrumentation(descContent, descElement);
  } else {
    const fallbackDesc = block.querySelector('p');
    if (fallbackDesc) {
      descElement.textContent = fallbackDesc.textContent;
    }
  }
  firstSection.append(descElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnWrapper');
  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const anchor = ctaLink.querySelector('a');
    if (anchor) {
      const btn = document.createElement('a');
      btn.href = anchor.href;
      btn.title = anchor.title || anchor.textContent.trim();
      btn.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      btn.textContent = anchor.textContent.trim();
      btnWrapper.append(btn);
      moveInstrumentation(ctaLink, btnWrapper);
    }
  }
  firstSection.append(btnWrapper);
  latestblogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('[data-aue-prop="link"] a');
    const cardWrapper = document.createElement('a');
    if (cardLink) {
      cardWrapper.href = cardLink.href;
      cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
      cardWrapper.dataset.ctaLabel = cardLink.textContent.trim();
    } else {
      cardWrapper.href = '#';
      cardWrapper.classList.add('latestblogs-cardWrapper');
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    const imageProp = cardNode.querySelector('[data-aue-prop="image"]');
    if (!img) {
      const fallbackAnchor = cardNode.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (fallbackAnchor) {
        img = document.createElement('img');
        img.src = fallbackAnchor.href;
        img.alt = '';
      }
    }

    if (img) {
      const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPicture.querySelector('img');
      if (optimizedImg) {
        optimizedImg.classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(optimizedPicture);
      }
    }
    cardsDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = document.createElement('p');
    dateElement.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
    const dateContent = cardNode.querySelector('[data-aue-prop="date"]');
    if (dateContent) {
      dateElement.append(...dateContent.childNodes);
      const dateValue = dateContent.textContent.trim();
      const dateMatch = dateValue.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}:\d{2}/);
      if (dateMatch) {
        dateElement.dataset.date = dateMatch[0];
      }
    } else {
      const fallbackDate = cardNode.querySelector('p[data-date]');
      if (fallbackDate) {
        dateElement.textContent = fallbackDate.textContent;
        dateElement.dataset.date = fallbackDate.dataset.date;
      } else {
        const fallbackP = cardNode.querySelector('p');
        if (fallbackP) {
          dateElement.textContent = fallbackP.textContent;
        }
      }
    }
    contentWrapper.append(dateElement);

    const textElement = document.createElement('p');
    textElement.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
    const textContent = cardNode.querySelector('[data-aue-prop="text"]');
    if (textContent) {
      textElement.append(...textContent.childNodes);
    } else {
      const fallbackText = cardNode.querySelector('p:not([data-date])');
      if (fallbackText) {
        textElement.textContent = fallbackText.textContent;
      }
    }
    contentWrapper.append(textElement);

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    secondSection.append(cardWrapper);
    moveInstrumentation(cardNode, cardWrapper);
  });

  latestblogsListing.append(secondSection);
  latestblogsWrapper.append(latestblogsListing);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
