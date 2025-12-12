import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');

  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    h2.append(...title.childNodes);
    moveInstrumentation(title, h2);
    sectionFirst.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    sectionFirst.append(p);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');

    const anchor = viewAllLink.querySelector('.button-container a') || viewAllLink.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.title = anchor.textContent.trim();
      newAnchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      newAnchor.textContent = anchor.textContent.trim();
      moveInstrumentation(anchor, newAnchor);
      btnWrapper.append(newAnchor);
    } else {
      const fallbackP = viewAllLink.querySelector('p');
      if (fallbackP) {
        const newAnchor = document.createElement('a');
        newAnchor.href = fallbackP.textContent.trim();
        newAnchor.title = fallbackP.textContent.trim();
        newAnchor.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
        newAnchor.textContent = fallbackP.textContent.trim();
        moveInstrumentation(fallbackP, newAnchor);
        btnWrapper.append(newAnchor);
      }
    }
    moveInstrumentation(viewAllLink, btnWrapper);
    sectionFirst.append(btnWrapper);
  }

  latestBlogsListing.append(sectionFirst);

  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('[data-aue-prop="cardLink"]');
    const cardTitle = cardNode.querySelector('[data-aue-prop="cardTitle"]');
    const publishedDate = cardNode.querySelector('[data-aue-prop="publishedDate"]');
    const image = cardNode.querySelector('[data-aue-prop="image"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');

    let linkHref = '';
    let ctaLabel = '';

    if (cardLink) {
      const anchor = cardLink.querySelector('.button-container a') || cardLink.querySelector('a');
      if (anchor) {
        linkHref = anchor.href;
        ctaLabel = anchor.textContent.trim();
        moveInstrumentation(anchor, cardWrapper);
      } else {
        const fallbackP = cardLink.querySelector('p');
        if (fallbackP) {
          linkHref = fallbackP.textContent.trim();
          ctaLabel = fallbackP.textContent.trim();
          moveInstrumentation(fallbackP, cardWrapper);
        }
      }
      moveInstrumentation(cardLink, cardWrapper);
    }

    if (cardTitle) {
      ctaLabel = cardTitle.textContent.trim();
    }

    cardWrapper.href = linkHref;
    cardWrapper.setAttribute('data-cta-label', ctaLabel);

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');

    if (image) {
      const imgElement = image.querySelector('img');
      if (imgElement) {
        const picture = createOptimizedPicture(imgElement.src, imgElement.alt || '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
        moveInstrumentation(imgElement, picture);
      } else {
        const fallbackA = image.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
        if (fallbackA) {
          const picture = createOptimizedPicture(fallbackA.href, '', false, [{ width: '750' }]);
          picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
          cardImageWrapper.append(picture);
          moveInstrumentation(fallbackA, picture);
        }
      }
      moveInstrumentation(image, cardImageWrapper);
    }
    cardsDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (publishedDate) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      dateP.append(...publishedDate.childNodes);
      moveInstrumentation(publishedDate, dateP);
      contentWrapper.append(dateP);
    } else {
      const fallbackP = cardNode.querySelector('p');
      if (fallbackP) {
        const dateP = document.createElement('p');
        dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
        dateP.append(...fallbackP.childNodes);
        contentWrapper.append(dateP);
      }
    }

    if (cardTitle) {
      const titleP = document.createElement('p');
      titleP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      titleP.append(...cardTitle.childNodes);
      moveInstrumentation(cardTitle, titleP);
      contentWrapper.append(titleP);
    } else {
      const fallbackP = cardNode.querySelector('h1, h2, h3, h4, h5, h6, p');
      if (fallbackP) {
        const titleP = document.createElement('p');
        titleP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
        titleP.append(...fallbackP.childNodes);
        contentWrapper.append(titleP);
      }
    }

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    moveInstrumentation(cardNode, cardWrapper);
    sectionSecond.append(cardWrapper);
  });

  latestBlogsListing.append(sectionSecond);
  latestBlogsWrapper.append(latestBlogsListing);

  block.textContent = '';
  block.append(latestBlogsWrapper);
  block.className = 'latest-blogs block';
  block.dataset.blockStatus = 'loaded';
}
