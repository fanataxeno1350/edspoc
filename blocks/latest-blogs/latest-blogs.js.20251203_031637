import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('section');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');
  moveInstrumentation(block, latestBlogsWrapper);

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing');
  latestBlogsWrapper.append(latestBlogsListing);

  // First section: Title, Description, CTA
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'latestblogs-text--white', 'latestblogs-text-center');
  latestBlogsListing.append(firstSection);

  const sectionTitle = block.querySelector('[data-aue-prop="sectionTitle"]');
  if (sectionTitle) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-listing--title', 'latestblogs--text__heading-1', 'latestblogs-text--white', 'latestblogs-pb-3');
    h2.append(...sectionTitle.childNodes);
    moveInstrumentation(sectionTitle, h2);
    firstSection.append(h2);
  }

  const sectionDescription = block.querySelector('[data-aue-prop="sectionDescription"]');
  if (sectionDescription) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-listing--desc', 'latestblogs--text__body-2', 'latestblogs-pb-4');
    p.append(...sectionDescription.childNodes);
    moveInstrumentation(sectionDescription, p);
    firstSection.append(p);
  }

  const ctaLinkWrapper = block.querySelector('[data-aue-prop="ctaLink"]');
  if (ctaLinkWrapper) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-listing--btnwrapper');
    const ctaAnchor = ctaLinkWrapper.querySelector('a');
    if (ctaAnchor) {
      const newCtaAnchor = document.createElement('a');
      newCtaAnchor.href = ctaAnchor.href;
      newCtaAnchor.title = ctaAnchor.title;
      newCtaAnchor.classList.add('latestblogs--text__title-3', 'latestblogs-listing--btn', 'analytics_cta_click');
      newCtaAnchor.append(...ctaAnchor.childNodes);
      moveInstrumentation(ctaAnchor, newCtaAnchor);
      btnWrapper.append(newCtaAnchor);
    }
    firstSection.append(btnWrapper);
  }

  // Second section: Blog items
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'latestblogs-d-flex');
  latestBlogsListing.append(secondSection);

  const blogItems = block.querySelectorAll('[data-aue-model="blogItem"]');
  blogItems.forEach((blogItem) => {
    const linkWrapper = blogItem.querySelector('[data-aue-prop="link"]');
    let cardAnchor = null;

    if (linkWrapper) {
      const authoredLink = linkWrapper.querySelector('a');
      if (authoredLink) {
        cardAnchor = document.createElement('a');
        cardAnchor.href = authoredLink.href;
        cardAnchor.classList.add('latestblogs-listing--cardwrapper', 'analytics_cta_click');
        if (authoredLink.title) {
          cardAnchor.setAttribute('data-cta-label', authoredLink.title);
        } else {
          const titleEl = blogItem.querySelector('[data-aue-prop="title"]');
          if (titleEl) {
            cardAnchor.setAttribute('data-cta-label', titleEl.textContent.trim());
          }
        }
        moveInstrumentation(authoredLink, cardAnchor);
      }
    }

    if (!cardAnchor) {
      cardAnchor = document.createElement('a');
      cardAnchor.classList.add('latestblogs-listing--cardwrapper', 'analytics_cta_click');
      // Fallback if no link is authored directly, still create the wrapper
      moveInstrumentation(blogItem, cardAnchor);
    }

    const card = document.createElement('div');
    card.classList.add('latestblogs-listing--cards');
    cardAnchor.append(card);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('latestblogs-listing--cardimagewrapper');
    card.append(imageWrapper);

    const imageElement = blogItem.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt || '');
        pic.querySelector('img').classList.add('latestblogs-listing--cardimage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, pic.querySelector('img'));
        imageWrapper.append(pic);
      } else {
        // Handle case where image is an <a> tag with an image inside (like aem-content field)
        const anchor = imageElement.querySelector('a[href]');
        if (anchor && (anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.gif') || anchor.href.endsWith('.webp')) ) {
          const pic = createOptimizedPicture(anchor.href, anchor.title || '');
          pic.querySelector('img').classList.add('latestblogs-listing--cardimage', 'latestblogs-w-100', 'latestblogs-h-100');
          moveInstrumentation(anchor, pic.querySelector('img'));
          imageWrapper.append(pic);
        }
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');
    card.append(contentWrapper);

    const dateElement = blogItem.querySelector('[data-aue-prop="date"]');
    if (dateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('latestblogs--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-published_date');
      pDate.append(...dateElement.childNodes);
      moveInstrumentation(dateElement, pDate);
      contentWrapper.append(pDate);
    }

    const titleElement = blogItem.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('latestblogs--text__body-2', 'latestblogs--text__body');
      pTitle.append(...titleElement.childNodes);
      moveInstrumentation(titleElement, pTitle);
      contentWrapper.append(pTitle);
    }

    secondSection.append(cardAnchor);
  });

  block.replaceWith(latestBlogsWrapper);
}
