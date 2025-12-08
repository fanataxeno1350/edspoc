import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export function decorate(block) {
  const latestBlogsSection = document.createElement('section');
  latestBlogsSection.classList.add('article_listing--wrapper');
  moveInstrumentation(block, latestBlogsSection);

  const articleListingDiv = document.createElement('div');
  articleListingDiv.classList.add('article_listing', 'position-relative');
  latestBlogsSection.append(articleListingDiv);

  // First section (title, description, view all link)
  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');
  articleListingDiv.append(firstSection);

  const titleElement = document.createElement('h2');
  titleElement.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    titleElement.append(...title.childNodes);
    moveInstrumentation(title, titleElement);
  }
  firstSection.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    descriptionElement.append(...description.childNodes);
    moveInstrumentation(description, descriptionElement);
  }
  firstSection.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('article_listing--btnWrapper');
  firstSection.append(btnWrapper);

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink && viewAllLink.tagName === 'A') {
    const linkElement = document.createElement('a');
    linkElement.href = viewAllLink.href;
    linkElement.title = viewAllLink.title || '';
    linkElement.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
    linkElement.append(...viewAllLink.childNodes);
    moveInstrumentation(viewAllLink, linkElement);

    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.classList.add('arrow-icon');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/etc.clientlibs/itc-family-comedy/clientlibs/clientlib-boing/resources/images/sprite/sprite-boing.svg#arrow_forward');
    svgIcon.append(use);
    linkElement.append(svgIcon);
    btnWrapper.append(linkElement);
  }

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');
  articleListingDiv.append(secondSection);

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const cardLink = card.querySelector('[data-aue-prop="link"]');
    if (cardLink && cardLink.tagName === 'A') {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = cardLink.href;
      cardWrapper.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
      if (cardLink.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = cardLink.dataset.ctaLabel;
      }
      moveInstrumentation(cardLink, cardWrapper);

      const articleCards = document.createElement('div');
      articleCards.classList.add('article_listing--cards');
      cardWrapper.append(articleCards);

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('article_listing--cardImageWrapper');
      articleCards.append(cardImageWrapper);

      const image = card.querySelector('[data-aue-prop="image"]');
      if (image && image.tagName === 'IMG') {
        const pic = createOptimizedPicture(image.src, image.alt);
        pic.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(pic);
        moveInstrumentation(image, pic.querySelector('img'));
      } else if (image && image.tagName === 'A') {
        // Handle case where image is wrapped in an anchor
        const img = image.querySelector('img');
        if (img) {
          const pic = createOptimizedPicture(img.src, img.alt);
          pic.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
          cardImageWrapper.append(pic);
          moveInstrumentation(img, pic.querySelector('img'));
        }
      }

      const cardsContentWrapper = document.createElement('div');
      cardsContentWrapper.classList.add('cards_content--wrapper');
      articleCards.append(cardsContentWrapper);

      const dateElement = document.createElement('p');
      dateElement.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
      const date = card.querySelector('[data-aue-prop="date"]');
      if (date) {
        if (date.dataset.date) {
          dateElement.dataset.date = date.dataset.date;
        }
        dateElement.append(...date.childNodes);
        moveInstrumentation(date, dateElement);
      }
      cardsContentWrapper.append(dateElement);

      const blogTitleElement = document.createElement('p');
      blogTitleElement.classList.add('boing--text__body-2', 'boing--text__body');
      const blogTitle = card.querySelector('[data-aue-prop="blogTitle"]');
      if (blogTitle) {
        blogTitleElement.append(...blogTitle.childNodes);
        moveInstrumentation(blogTitle, blogTitleElement);
      }
      cardsContentWrapper.append(blogTitleElement);

      secondSection.append(cardWrapper);
    }
  });

  block.textContent = '';
  block.append(latestBlogsSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
