import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.className = 'latestblogs-listing position-relative';

  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = block.querySelector('h2');
  const titleWrapper = document.createElement('h2');
  titleWrapper.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
  if (titleElement) {
    titleWrapper.innerHTML = titleElement.innerHTML;
    titleWrapper.setAttribute('data-aue-prop', 'title');
    titleWrapper.setAttribute('data-aue-type', 'richtext');
    moveInstrumentation(titleElement, titleWrapper);
  }
  firstSection.append(titleWrapper);

  const descriptionElement = block.querySelector('p');
  const descriptionWrapper = document.createElement('p');
  descriptionWrapper.className = 'latestblogs-desc boing--text__body-2 pb-4';
  if (descriptionElement) {
    descriptionWrapper.innerHTML = descriptionElement.innerHTML;
    descriptionWrapper.setAttribute('data-aue-prop', 'description');
    descriptionWrapper.setAttribute('data-aue-type', 'richtext');
    moveInstrumentation(descriptionElement, descriptionWrapper);
  }
  firstSection.append(descriptionWrapper);

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'latestblogs-btnWrapper';

  const ctaLink = block.querySelector('.button-container a');
  const ctaLinkWrapper = document.createElement('a');
  if (ctaLink) {
    ctaLinkWrapper.href = ctaLink.href;
    ctaLinkWrapper.title = ctaLink.title || ctaLink.textContent;
    ctaLinkWrapper.textContent = ctaLink.textContent;
    ctaLinkWrapper.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
    ctaLinkWrapper.setAttribute('data-aue-prop', 'ctaLink');
    ctaLinkWrapper.setAttribute('data-aue-type', 'richtext');
    moveInstrumentation(ctaLink, ctaLinkWrapper);
  }
  btnWrapper.append(ctaLinkWrapper);
  firstSection.append(btnWrapper);
  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-listing_section--second d-flex';

  const blogCards = block.querySelectorAll(':scope > div:not(:first-of-type)');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('a');
    const cardLinkWrapper = document.createElement('a');
    cardLinkWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
    cardLinkWrapper.setAttribute('data-aue-model', 'blogCard');

    if (linkElement) {
      cardLinkWrapper.href = linkElement.href;
      cardLinkWrapper.setAttribute('data-cta-label', linkElement.getAttribute('data-cta-label') || linkElement.textContent);
      cardLinkWrapper.setAttribute('data-aue-prop', 'link');
      cardLinkWrapper.setAttribute('data-aue-type', 'richtext');
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.className = 'latestblogs-cards';

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.className = 'latestblogs-cardImageWrapper';

    const imgElement = card.querySelector('img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
      picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
      picture.setAttribute('data-aue-prop', 'image');
      picture.setAttribute('data-aue-type', 'image');
      cardImageWrapper.append(picture);
    }
    latestblogsCards.append(cardImageWrapper);

    const cardContentWrapper = document.createElement('div');
    cardContentWrapper.className = 'latestblogs-cards_content--wrapper';

    const publishedDateElement = card.querySelector('p[data-date]');
    const publishedDateWrapper = document.createElement('p');
    publishedDateWrapper.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
    if (publishedDateElement) {
      publishedDateWrapper.textContent = publishedDateElement.textContent;
      publishedDateWrapper.setAttribute('data-date', publishedDateElement.getAttribute('data-date'));
      publishedDateWrapper.setAttribute('data-aue-prop', 'publishedDate');
      publishedDateWrapper.setAttribute('data-aue-type', 'richtext');
    }
    cardContentWrapper.append(publishedDateWrapper);

    const descriptionCardElement = card.querySelector('p:not([data-date])');
    const descriptionCardWrapper = document.createElement('p');
    descriptionCardWrapper.className = 'boing--text__body-2 latestblogs-boing--text__body';
    if (descriptionCardElement) {
      descriptionCardWrapper.textContent = descriptionCardElement.textContent;
      descriptionCardWrapper.setAttribute('data-aue-prop', 'description');
      descriptionCardWrapper.setAttribute('data-aue-type', 'richtext');
    }
    cardContentWrapper.append(descriptionCardWrapper);

    latestblogsCards.append(cardContentWrapper);
    cardLinkWrapper.append(latestblogsCards);
    secondSection.append(cardLinkWrapper);
    moveInstrumentation(card, cardLinkWrapper);
  });

  latestBlogsListing.append(secondSection);

  block.textContent = '';
  block.append(latestBlogsListing);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
