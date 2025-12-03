import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const statsByTheNumberContainer = document.createElement('div');
  statsByTheNumberContainer.classList.add('stats-by-the-number__container');
  moveInstrumentation(block, statsByTheNumberContainer);

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('stats-by-the-number__title');
  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    titleWrapper.append(...title.childNodes);
    moveInstrumentation(title, titleWrapper);
  }
  statsByTheNumberContainer.append(titleWrapper);

  const mainContent = document.createElement('div');
  mainContent.classList.add('stats-by-the-number__main-content');

  const imageSection = document.createElement('div');
  imageSection.classList.add('stats-by-the-number__image-section');
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('stats-by-the-number__image-container', 'stats-by-the-number__image-container--active');

  let mainImage = block.querySelector('[data-aue-prop="mainImage"]');
  if (!mainImage) {
    const anchor = block.querySelector('a[href$=".jpeg"], a[href$=".png"], a[href$=".webp"], a[href$=".gif"]');
    if (anchor) {
      mainImage = anchor;
    }
  }

  if (mainImage) {
    const img = mainImage.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('stats-by-the-number__main-image');
      imageContainer.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    } else if (mainImage.tagName === 'A') {
      const imgElement = document.createElement('img');
      imgElement.src = mainImage.href;
      imgElement.alt = mainImage.title || '';
      const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
      pic.classList.add('stats-by-the-number__main-image');
      imageContainer.append(pic);
      moveInstrumentation(mainImage, pic.querySelector('img'));
    }
  }
  imageSection.append(imageContainer);
  mainContent.append(imageSection);

  const contentSection = document.createElement('div');
  contentSection.classList.add('stats-by-the-number__content-section');
  const tabContent = document.createElement('div');
  tabContent.classList.add('stats-by-the-number__tab-content', 'stats-by-the-number__tab-content--active');

  const descriptionWrapper = document.createElement('div');
  descriptionWrapper.classList.add('stats-by-the-number__description');
  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    descriptionWrapper.append(...description.childNodes);
    moveInstrumentation(description, descriptionWrapper);
  }
  tabContent.append(descriptionWrapper);

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('stats-by-the-number__cards');
  cardsWrapper.setAttribute('role', 'list');

  const cardItems = block.querySelectorAll('[data-aue-model="statsCard"]');
  cardItems.forEach((card) => {
    const newCard = document.createElement('div');
    newCard.classList.add('stats-by-the-number__card');
    newCard.setAttribute('role', 'img');
    newCard.setAttribute('tabindex', '0');
    moveInstrumentation(card, newCard);

    const hoverImage = card.querySelector('[data-aue-prop="hoverImage"]');
    if (hoverImage) {
      let imgSrc = '';
      if (hoverImage.tagName === 'A') {
        imgSrc = hoverImage.href;
      } else if (hoverImage.querySelector('img')) {
        imgSrc = hoverImage.querySelector('img').src;
      }
      if (imgSrc) {
        newCard.setAttribute('data-hover-image', imgSrc);
      }
    }

    const numberWrapper = document.createElement('div');
    numberWrapper.classList.add('stats-by-the-number__card__number');
    const number = card.querySelector('[data-aue-prop="number"]');
    if (number) {
      numberWrapper.append(...number.childNodes);
      moveInstrumentation(number, numberWrapper);
    }
    newCard.append(numberWrapper);

    const cardDescriptionWrapper = document.createElement('div');
    cardDescriptionWrapper.classList.add('stats-by-the-number__card__description');
    const cardDescription = card.querySelector('[data-aue-prop="cardDescription"]');
    if (cardDescription) {
      cardDescriptionWrapper.append(...cardDescription.childNodes);
      moveInstrumentation(cardDescription, cardDescriptionWrapper);
    }
    newCard.append(cardDescriptionWrapper);
    cardsWrapper.append(newCard);
  });
  tabContent.append(cardsWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('stats-by-the-number__cta');
  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLink) {
    const newCta = document.createElement('a');
    newCta.classList.add('cta', 'cta__primary');
    newCta.target = '_self';
    newCta.setAttribute('data-palette', 'palette-1');

    if (ctaLink.tagName === 'A') {
      newCta.href = ctaLink.href;
      newCta.setAttribute('aria-label', ctaLink.title || ctaLink.textContent);
      const iconSpan = document.createElement('span');
      iconSpan.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
      iconSpan.setAttribute('aria-hidden', 'true');
      newCta.append(iconSpan);

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('cta__label');
      labelSpan.textContent = ctaLink.textContent;
      newCta.append(labelSpan);
      moveInstrumentation(ctaLink, newCta);
    }
    ctaWrapper.append(newCta);
  }
  tabContent.append(ctaWrapper);

  contentSection.append(tabContent);
  mainContent.append(contentSection);
  statsByTheNumberContainer.append(mainContent);

  block.innerHTML = '';
  block.append(statsByTheNumberContainer);
  block.classList.add('animate-ready', 'animate-in');
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Statistics by the numbers');
}
