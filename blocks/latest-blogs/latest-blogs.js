import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('div');
  latestblogsWrapper.classList.add('latestblogs-listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-title', 'boing--text__heading-1', 'text-white', 'pb-3');
    moveInstrumentation(title, h2);
    firstSection.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-desc', 'boing--text__body-2', 'pb-4');
    moveInstrumentation(description, p);
    firstSection.append(p);
  }

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('latestblogs-btnWrapper');
  const ctaLink = block.querySelector('.button-container a');
  if (ctaLink) {
    ctaLink.classList.add('boing--text__title-3', 'latestblogs-btn', 'analytics_cta_click');
    moveInstrumentation(ctaLink, ctaLink);
    ctaWrapper.append(ctaLink);
  }
  firstSection.append(ctaWrapper);
  latestblogsWrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');

  const blogItems = block.querySelectorAll('[data-aue-model="latestBlogItem"]');
  blogItems.forEach((item) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-cardWrapper', 'analytics_cta_click');
    const link = item.querySelector('.button-container a');
    if (link) {
      cardLink.href = link.href;
      cardLink.setAttribute('data-cta-label', link.textContent.trim());
      moveInstrumentation(link, cardLink);
    }

    const card = document.createElement('div');
    card.classList.add('latestblogs-cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-cardImageWrapper');
    const imageProp = item.querySelector('[data-aue-prop="image"]');
    let img = imageProp ? imageProp.querySelector('img') : null;

    if (!img) {
      const fallbackLink = item.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (fallbackLink) {
        img = document.createElement('img');
        img.src = fallbackLink.href;
        img.alt = fallbackLink.title || '';
        moveInstrumentation(fallbackLink, img);
      }
    }

    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      picture.querySelector('img').classList.add('latestblogs-cardImage', 'w-100', 'h-100');
      moveInstrumentation(img, picture);
      cardImageWrapper.append(picture);
    }
    card.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    const publishDate = item.querySelector('[data-aue-prop="publishDate"]');
    if (publishDate) {
      const pDate = document.createElement('p');
      pDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      const date = new Date(publishDate.textContent);
      pDate.textContent = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      pDate.setAttribute('data-date', publishDate.textContent);
      moveInstrumentation(publishDate, pDate);
      contentWrapper.append(pDate);
    }

    const blogTitle = item.querySelector('[data-aue-prop="blogTitle"]');
    if (blogTitle) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('boing--text__body-2', 'latestblogs-boing--text__body');
      moveInstrumentation(blogTitle, pTitle);
      contentWrapper.append(pTitle);
    }

    card.append(contentWrapper);
    cardLink.append(card);
    secondSection.append(cardLink);
  });

  latestblogsWrapper.append(secondSection);

  block.textContent = '';
  block.append(latestblogsWrapper);
  block.className = 'latestblogs block';
  block.dataset.blockStatus = 'loaded';
}
