import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.className = 'latestblogs-wrapper';

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.className = 'latestblogs-listing position-relative';

  const sectionFirst = document.createElement('div');
  sectionFirst.className = 'latestblogs-listing_section--first text-white text-center';

  const titleElement = document.createElement('h2');
  titleElement.className = 'latestblogs-title boing--text__heading-1 text-white pb-3';
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
  sectionFirst.append(titleElement);

  const descElement = document.createElement('p');
  descElement.className = 'latestblogs-desc boing--text__body-2 pb-4';
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descElement.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descElement);
  } else {
    const fallbackDesc = block.querySelector('p');
    if (fallbackDesc) {
      descElement.textContent = fallbackDesc.textContent;
    }
  }
  sectionFirst.append(descElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'latestblogs-btnWrapper';
  const ctaLinkContent = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLinkContent) {
    const ctaLink = ctaLinkContent.querySelector('a');
    if (ctaLink) {
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.title = ctaLink.textContent.trim();
      newCtaLink.className = 'boing--text__title-3 latestblogs-btn analytics_cta_click';
      newCtaLink.textContent = ctaLink.textContent.trim();
      btnWrapper.append(newCtaLink);
      moveInstrumentation(ctaLinkContent, newCtaLink);
    }
  }
  sectionFirst.append(btnWrapper);
  latestBlogsListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.className = 'latestblogs-listing_section--second d-flex';

  const blogItems = block.querySelectorAll('[data-aue-model="latestBlogItem"]');
  blogItems.forEach((item) => {
    const cardWrapper = document.createElement('a');
    const linkElement = item.querySelector('[data-aue-prop="link"] a');
    if (linkElement) {
      cardWrapper.href = linkElement.href;
      cardWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
      cardWrapper.setAttribute('data-cta-label', linkElement.textContent.trim());
      moveInstrumentation(linkElement.parentNode, cardWrapper);
    } else {
      // Fallback for link if data-aue-prop is missing
      const fallbackLink = item.querySelector('a');
      if (fallbackLink) {
        cardWrapper.href = fallbackLink.href;
        cardWrapper.className = 'latestblogs-cardWrapper analytics_cta_click';
        cardWrapper.setAttribute('data-cta-label', fallbackLink.textContent.trim());
      }
    }

    const cards = document.createElement('div');
    cards.className = 'latestblogs-cards';

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.className = 'latestblogs-cardImageWrapper';
    const imageContent = item.querySelector('[data-aue-prop="image"] img');
    if (imageContent) {
      const picture = createOptimizedPicture(imageContent.src, imageContent.alt, false, [{ width: '750' }]);
      picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
      cardImageWrapper.append(picture);
      moveInstrumentation(imageContent.parentNode, cardImageWrapper);
    } else {
      // Fallback for image if data-aue-prop is missing
      const fallbackImage = item.querySelector('img');
      if (fallbackImage) {
        const picture = createOptimizedPicture(fallbackImage.src, fallbackImage.alt, false, [{ width: '750' }]);
        picture.querySelector('img').className = 'latestblogs-cardImage w-100 h-100';
        cardImageWrapper.append(picture);
      }
    }
    cards.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.className = 'latestblogs-cards_content--wrapper';

    const publishedDateElement = document.createElement('p');
    publishedDateElement.className = 'boing--text__body-5 p-0 m-0 mb-3 latestblogs-published_date';
    const publishDateContent = item.querySelector('[data-aue-prop="publishDate"]');
    if (publishDateContent) {
      publishedDateElement.append(...publishDateContent.childNodes);
      moveInstrumentation(publishDateContent, publishedDateElement);
    } else {
      const fallbackDate = item.querySelector('p[data-date]');
      if (fallbackDate) {
        publishedDateElement.textContent = fallbackDate.textContent;
        publishedDateElement.setAttribute('data-date', fallbackDate.getAttribute('data-date'));
      }
    }
    cardsContentWrapper.append(publishedDateElement);

    const blogTitleElement = document.createElement('p');
    blogTitleElement.className = 'boing--text__body-2 latestblogs-boing--text__body';
    const blogTitleContent = item.querySelector('[data-aue-prop="title"]');
    if (blogTitleContent) {
      blogTitleElement.append(...blogTitleContent.childNodes);
      moveInstrumentation(blogTitleContent, blogTitleElement);
    } else {
      const fallbackTitle = item.querySelector('p:not([data-date])');
      if (fallbackTitle) {
        blogTitleElement.textContent = fallbackTitle.textContent;
      }
    }
    cardsContentWrapper.append(blogTitleElement);

    cards.append(cardsContentWrapper);
    cardWrapper.append(cards);
    sectionSecond.append(cardWrapper);
  });

  latestBlogsListing.append(sectionSecond);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
