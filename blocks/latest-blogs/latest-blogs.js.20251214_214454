import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...titleElement.childNodes);
    firstSection.append(h2);
    moveInstrumentation(titleElement, h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...descriptionElement.childNodes);
    firstSection.append(p);
    moveInstrumentation(descriptionElement, p);
  }

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLinkElement) {
    const latestBlogsBtnWrapper = document.createElement('div');
    latestBlogsBtnWrapper.classList.add('latestblogs-btnWrapper');

    const ctaLink = ctaLinkElement.querySelector('a');
    if (ctaLink) {
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.title = ctaLink.textContent.trim();
      newCtaLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      newCtaLink.textContent = ctaLink.textContent.trim();
      latestBlogsBtnWrapper.append(newCtaLink);
      moveInstrumentation(ctaLink, newCtaLink);
    }
    firstSection.append(latestBlogsBtnWrapper);
    moveInstrumentation(ctaLinkElement, latestBlogsBtnWrapper);
  }

  latestBlogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((blogCard) => {
    const blogLinkElement = blogCard.querySelector('[data-aue-prop="link"]');
    let cardLink = blogLinkElement ? blogLinkElement.querySelector('a') : null;
    if (!cardLink) {
      cardLink = document.createElement('a');
      cardLink.href = '#';
    }

    const latestblogsCardWrapper = document.createElement('a');
    latestblogsCardWrapper.href = cardLink.href;
    latestblogsCardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    const ctaLabel = blogCard.querySelector('[data-aue-prop="text"]')?.textContent.trim();
    if (ctaLabel) {
      latestblogsCardWrapper.dataset.ctaLabel = ctaLabel;
    }

    const latestblogsCards = document.createElement('div');
    latestblogsCards.classList.add('latestblogs-cards');

    const imageElement = blogCard.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const latestblogsCardImageWrapper = document.createElement('div');
      latestblogsCardImageWrapper.classList.add('latestblogs-cardImageWrapper');

      if (imageElement) {
        const optimizedPicture = createOptimizedPicture(imageElement.src, imageElement.alt, false, [{ width: '750' }]);
        const newImg = optimizedPicture.querySelector('img');
        if (newImg) {
          newImg.classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        }
        latestblogsCardImageWrapper.append(optimizedPicture);
        moveInstrumentation(imageElement, latestblogsCardImageWrapper);
      }
      latestblogsCards.append(latestblogsCardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = blogCard.querySelector('[data-aue-prop="date"]');
    if (dateElement && dateElement.textContent.trim()) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      const date = new Date(dateElement.textContent.trim());
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      dateP.textContent = date.toLocaleDateString('en-GB', options);
      contentWrapper.append(dateP);
      moveInstrumentation(dateElement, dateP);
    }

    const textElement = blogCard.querySelector('[data-aue-prop="text"]');
    if (textElement) {
      const textP = document.createElement('p');
      textP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      textP.append(...textElement.childNodes);
      contentWrapper.append(textP);
      moveInstrumentation(textElement, textP);
    }

    latestblogsCards.append(contentWrapper);
    latestblogsCardWrapper.append(latestblogsCards);
    secondSection.append(latestblogsCardWrapper);
    moveInstrumentation(blogCard, latestblogsCardWrapper);
  });

  latestBlogsListing.append(secondSection);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.classList.add('latestblogs');
  block.dataset.blockStatus = 'loaded';
}
