import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestBlogsWrapper.append(latestBlogsListing);

  // First section: Title, Description, View All Link
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  const titleContent = block.querySelector('[data-aue-prop="title"]');
  if (titleContent) {
    titleElement.append(...titleContent.childNodes);
    moveInstrumentation(titleContent, titleElement);
  }
  firstSection.append(titleElement);

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('latestblogs-listing--desc', 'boing--text__body-2', 'pb-4');
  const descriptionContent = block.querySelector('[data-aue-prop="description"]');
  if (descriptionContent) {
    descriptionElement.append(...descriptionContent.childNodes);
    moveInstrumentation(descriptionContent, descriptionElement);
  }
  firstSection.append(descriptionElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-listing--btnWrapper');

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const anchor = viewAllLink.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.title = anchor.title;
      newAnchor.classList.add('boing--text__title-3', 'latestblogs-listing--btn', 'analytics_cta_click');
      newAnchor.append(...anchor.childNodes);
      moveInstrumentation(anchor, newAnchor);
      btnWrapper.append(newAnchor);
    }
  }
  firstSection.append(btnWrapper);
  latestBlogsListing.append(firstSection);

  // Second section: Blog cards
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogItems = block.querySelectorAll('[data-aue-model="blog"]');
  blogItems.forEach((blogItem) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-listing--cardWrapper', 'analytics_cta_click');

    const linkContent = blogItem.querySelector('[data-aue-prop="link"]');
    if (linkContent) {
      const anchor = linkContent.querySelector('a');
      if (anchor) {
        cardLink.href = anchor.href;
        if (anchor.title) {
          cardLink.setAttribute('data-cta-label', anchor.title);
        }
        moveInstrumentation(anchor, cardLink);
      }
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-listing--cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-listing--cardImageWrapper');

    const imageContent = blogItem.querySelector('[data-aue-prop="image"]');
    if (imageContent) {
      let img = imageContent.querySelector('img');
      if (!img) {
        const anchor = imageContent.querySelector('a');
        if (anchor && anchor.href) {
          img = document.createElement('img');
          img.src = anchor.href;
          img.alt = anchor.title || '';
        }
      }
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.querySelector('img').classList.add('latestblogs-listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, pic.querySelector('img'));
        cardImageWrapper.append(pic);
      }
    }
    cardDiv.append(cardImageWrapper);

    const cardContentWrapper = document.createElement('div');
    cardContentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateElement = document.createElement('p');
    dateElement.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
    const dateContent = blogItem.querySelector('[data-aue-prop="date"]');
    if (dateContent) {
      // Check if the date content contains a <p> tag with data-date
      const authoredDateP = dateContent.querySelector('p[data-date]');
      if (authoredDateP) {
        dateElement.setAttribute('data-date', authoredDateP.getAttribute('data-date'));
        dateElement.append(...authoredDateP.childNodes);
        moveInstrumentation(authoredDateP, dateElement);
      } else {
        // Fallback for direct text content or other structures
        dateElement.append(...dateContent.childNodes);
        moveInstrumentation(dateContent, dateElement);
      }
    }
    cardContentWrapper.append(dateElement);

    const blogTitleElement = document.createElement('p');
    blogTitleElement.classList.add('boing--text__body-2', 'boing--text__body');
    const blogTitleContent = blogItem.querySelector('[data-aue-prop="blogTitle"]');
    if (blogTitleContent) {
      blogTitleElement.append(...blogTitleContent.childNodes);
      moveInstrumentation(blogTitleContent, blogTitleElement);
    }
    cardContentWrapper.append(blogTitleElement);

    cardDiv.append(cardContentWrapper);
    cardLink.append(cardDiv);
    secondSection.append(cardLink);
    moveInstrumentation(blogItem, cardLink);
  });

  latestBlogsListing.append(secondSection);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
