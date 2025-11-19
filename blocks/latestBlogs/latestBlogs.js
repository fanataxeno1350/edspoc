import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('div');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');
  moveInstrumentation(block, latestBlogsWrapper);

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing', 'position-relative');
  latestBlogsWrapper.append(latestBlogsListing);

  // First section (title, description, CTA)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'text-white', 'text-center');
  latestBlogsListing.append(firstSection);

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-title', 'latestblogs-text__heading-1', 'text-white', 'pb-3');
  firstSection.append(titleElement);

  const descElement = document.createElement('p');
  descElement.classList.add('latestblogs-desc', 'latestblogs-text__body-2', 'pb-4');
  firstSection.append(descElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-btnwrapper');
  firstSection.append(btnWrapper);

  const ctaLinkElement = document.createElement('a');
  ctaLinkElement.classList.add('latestblogs-text__title-3', 'latestblogs-btn', 'analytics_cta_click');
  btnWrapper.append(ctaLinkElement);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'd-flex');
  latestBlogsListing.append(secondSection);

  // Process block children
  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) {
      // This is the first row for the main block properties
      const cells = [...row.children];
      titleElement.textContent = cells[0]?.textContent.trim() || '';
      descElement.innerHTML = cells[1]?.innerHTML.trim() || '';

      const ctaAnchor = cells[2]?.querySelector('a');
      if (ctaAnchor) {
        ctaLinkElement.href = ctaAnchor.href;
        ctaLinkElement.title = ctaAnchor.title || '';
        ctaLinkElement.textContent = ctaAnchor.textContent.trim();
      } else {
        ctaLinkElement.href = cells[2]?.textContent.trim() || '';
        ctaLinkElement.textContent = cells[3]?.textContent.trim() || '';
      }
      // The CTA icon is not directly used from block.children in the provided HTML structure
      // If it were, it would be handled here.
      moveInstrumentation(row, firstSection);
    } else {
      // These are the blog items
      const cells = [...row.children];
      const linkCell = cells[0];
      const imageCell = cells[1];
      const dateCell = cells[2];
      const titleCell = cells[3];

      const blogLink = linkCell?.querySelector('a');
      const blogImage = imageCell?.querySelector('img');
      const blogDate = dateCell?.textContent.trim();
      const blogTitle = titleCell?.textContent.trim();

      if (blogLink && blogImage) {
        const cardWrapper = document.createElement('a');
        cardWrapper.href = blogLink.href;
        cardWrapper.classList.add('latestblogs-cardwrapper', 'analytics_cta_click');
        cardWrapper.setAttribute('data-cta-label', blogLink.textContent.trim());
        moveInstrumentation(row, cardWrapper);

        const cards = document.createElement('div');
        cards.classList.add('latestblogs-cards');
        cardWrapper.append(cards);

        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-cardimage-wrapper');
        cards.append(cardImageWrapper);

        const optimizedPic = createOptimizedPicture(blogImage.src, blogImage.alt || blogTitle);
        optimizedPic.querySelector('img').classList.add('latestblogs-cardimage', 'w-100', 'h-100');
        moveInstrumentation(blogImage, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);

        const cardsContentWrapper = document.createElement('div');
        cardsContentWrapper.classList.add('latestblogs-cards_content--wrapper');
        cards.append(cardsContentWrapper);

        if (blogDate) {
          const dateP = document.createElement('p');
          dateP.classList.add('latestblogs-text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
          // Assuming the date in the block is already formatted as 'DD Month YYYY'
          // If it needs reformatting, add logic here.
          dateP.textContent = blogDate;
          // The data-date attribute is not present in the block JSON, but if it was needed
          // from the original HTML, you'd parse blogDate to an ISO string.
          // e.g., const parsedDate = new Date(blogDate); dateP.setAttribute('data-date', parsedDate.toISOString());
          cardsContentWrapper.append(dateP);
        }

        if (blogTitle) {
          const titleP = document.createElement('p');
          titleP.classList.add('latestblogs-text__body-2', 'latestblogs-text__body');
          titleP.textContent = blogTitle;
          cardsContentWrapper.append(titleP);
        }
        secondSection.append(cardWrapper);
      }
    }
  });

  block.textContent = '';
  block.append(latestBlogsWrapper);
}
