import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const mainWrapper = document.createElement('section');
  mainWrapper.classList.add('latestblogs-wrapper');

  const listingWrapper = document.createElement('div');
  listingWrapper.classList.add('latestblogs-listing', 'position-relative');
  mainWrapper.append(listingWrapper);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  listingWrapper.append(firstSection);

  const titleWrapper = block.children[0]?.querySelector('div[data-aue-prop="title"]');
  if (titleWrapper) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    moveInstrumentation(titleWrapper, h2);
    firstSection.append(h2);
  }

  const descriptionWrapper = block.children[0]?.querySelector('div[data-aue-prop="description"]');
  if (descriptionWrapper) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    moveInstrumentation(descriptionWrapper, p);
    firstSection.append(p);
  }

  const ctaLinkWrapper = block.children[0]?.querySelector('div[data-aue-prop="ctaLink"]');
  if (ctaLinkWrapper) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-btnWrapper');

    const ctaLink = ctaLinkWrapper.querySelector('.button-container a');
    if (ctaLink) {
      ctaLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
      ctaLink.setAttribute('title', ctaLink.textContent.trim());
      moveInstrumentation(ctaLink, ctaLink);
      btnWrapper.append(ctaLink);
    }
    firstSection.append(btnWrapper);
  }

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  listingWrapper.append(secondSection);

  const blogCards = block.querySelectorAll('div[data-aue-model="blogCard"]');

  blogCards.forEach((card) => {
    const linkWrapper = card.querySelector('div[data-aue-prop="link"]');
    const link = linkWrapper?.querySelector('.button-container a') || linkWrapper?.querySelector('a');

    const cardAnchor = document.createElement('a');
    cardAnchor.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    if (link) {
      cardAnchor.href = link.href;
      cardAnchor.setAttribute('data-cta-label', link.textContent.trim());
      moveInstrumentation(link, cardAnchor);
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-cards');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-cardImageWrapper');

    const imgElement = card.querySelector('div[data-aue-prop="image"] img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      moveInstrumentation(imgElement, picture.querySelector('img'));
      imageWrapper.append(picture);
    } else {
      // Fallback for image if not found in data-aue-prop
      const fallbackImg = card.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (fallbackImg) {
        const picture = createOptimizedPicture(fallbackImg.href, '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
        moveInstrumentation(fallbackImg, picture.querySelector('img'));
        imageWrapper.append(picture);
      }
    }
    cardDiv.append(imageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const dateWrapper = card.querySelector('div[data-aue-prop="date"]');
    if (dateWrapper) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      const dateText = dateWrapper.textContent.trim();
      const dateObj = new Date(dateText);
      const formattedDate = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      dateP.textContent = formattedDate;
      moveInstrumentation(dateWrapper, dateP);
      contentWrapper.append(dateP);
    }

    const blogTitleWrapper = card.querySelector('div[data-aue-prop="blogTitle"]');
    if (blogTitleWrapper) {
      const blogTitleP = document.createElement('p');
      blogTitleP.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      moveInstrumentation(blogTitleWrapper, blogTitleP);
      contentWrapper.append(blogTitleP);
    }

    cardDiv.append(contentWrapper);
    cardAnchor.append(cardDiv);
    secondSection.append(cardAnchor);
  });

  block.textContent = '';
  block.append(mainWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
