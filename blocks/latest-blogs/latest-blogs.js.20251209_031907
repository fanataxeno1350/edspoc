import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');
  moveInstrumentation(block, latestBlogsWrapper);

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestBlogsWrapper.append(latestBlogsListing);

  // First section (title, description, CTA)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  latestBlogsListing.append(firstSection);

  const title = block.children[0]?.children[0]?.querySelector('h1, h2, h3, h4, h5, h6');
  if (title) {
    const newTitle = document.createElement('h2');
    newTitle.classList.add('latestblogs-listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    newTitle.textContent = title.textContent;
    moveInstrumentation(title, newTitle);
    firstSection.append(newTitle);
  }

  const description = block.children[0]?.children[1]?.querySelector('p');
  if (description) {
    const newDesc = document.createElement('p');
    newDesc.classList.add('latestblogs-listing--desc', 'boing--text__body-2', 'pb-4');
    newDesc.textContent = description.textContent;
    moveInstrumentation(description, newDesc);
    firstSection.append(newDesc);
  }

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('latestblogs-listing--btnWrapper');
  firstSection.append(ctaWrapper);

  const ctaLink = block.children[0]?.children[2]?.querySelector('a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaLink.href;
    newCtaLink.title = ctaLink.title || ctaLink.textContent;
    newCtaLink.classList.add('boing--text__title-3', 'latestblogs-listing--btn', 'analytics_cta_click');
    newCtaLink.textContent = ctaLink.textContent;
    moveInstrumentation(ctaLink, newCtaLink);
    ctaWrapper.append(newCtaLink);
  }

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestBlogsListing.append(secondSection);

  // Loop through remaining rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const linkEl = row.children[0]?.querySelector('a');
    const imageEl = row.children[1]?.querySelector('img');
    const dateEl = row.children[2]?.querySelector('p');
    const textEl = row.children[3]?.querySelector('p');

    if (linkEl) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = linkEl.href;
      cardWrapper.classList.add('latestblogs-listing--cardWrapper', 'analytics_cta_click');
      cardWrapper.setAttribute('data-cta-label', linkEl.textContent.trim()); // Assuming cta-label from link text
      moveInstrumentation(row, cardWrapper);

      const card = document.createElement('div');
      card.classList.add('latestblogs-listing--cards');
      cardWrapper.append(card);

      if (imageEl) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-listing--cardImageWrapper');
        card.append(cardImageWrapper);

        const optimizedPic = createOptimizedPicture(imageEl.src, imageEl.alt || '', false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(imageEl, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards_content--wrapper');
      card.append(contentWrapper);

      if (dateEl) {
        const newDate = document.createElement('p');
        newDate.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
        newDate.textContent = dateEl.textContent;
        if (dateEl.dataset.date) {
          newDate.setAttribute('data-date', dateEl.dataset.date);
        }
        moveInstrumentation(dateEl, newDate);
        contentWrapper.append(newDate);
      }

      if (textEl) {
        const newText = document.createElement('p');
        newText.classList.add('boing--text__body-2', 'boing--text__body');
        newText.textContent = textEl.textContent;
        moveInstrumentation(textEl, newText);
        contentWrapper.append(newText);
      }

      secondSection.append(cardWrapper);
    }
  });

  block.textContent = '';
  block.append(latestBlogsWrapper);
}
