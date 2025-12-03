import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing');
  moveInstrumentation(block, latestblogsListing);

  // First section (heading, description, CTA)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'latestblogs-text--white', 'latestblogs-text-center');

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-listing--title', 'latestblogs--text__heading-1', 'latestblogs-text--white', 'latestblogs-pb-3');
    h2.append(...headingElement.childNodes);
    moveInstrumentation(headingElement, h2);
    firstSection.append(h2);
  }

  const descriptionElement = block.querySelector('[data-aue-prop="description"]');
  if (descriptionElement) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestblogs-listing--desc', 'latestblogs--text__body-2', 'latestblogs-pb-4');
    pDesc.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, pDesc);
    firstSection.append(pDesc);
  }

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaTextElement = block.querySelector('[data-aue-prop="ctaText"]');
  const ctaIconElement = block.querySelector('[data-aue-prop="ctaIcon"]');

  if (ctaLinkElement && ctaTextElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-listing--btnwrapper');

    const ctaAnchor = document.createElement('a');
    ctaAnchor.classList.add('latestblogs--text__title-3', 'latestblogs-listing--btn', 'analytics_cta_click');
    ctaAnchor.href = ctaLinkElement.textContent.trim();
    ctaAnchor.title = ctaTextElement.textContent.trim();
    ctaAnchor.append(...ctaTextElement.childNodes);
    moveInstrumentation(ctaLinkElement, ctaAnchor);
    moveInstrumentation(ctaTextElement, ctaAnchor);

    if (ctaIconElement) {
      const iconImg = ctaIconElement.querySelector('img');
      if (iconImg) {
        const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt);
        moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
        ctaAnchor.append(optimizedIcon);
      } else {
        // Handle case where ctaIcon is a link to an SVG or other asset
        const anchor = ctaIconElement.querySelector('a');
        if (anchor && anchor.href.endsWith('.svg')) {
          const svgImg = document.createElement('img');
          svgImg.src = anchor.href;
          svgImg.alt = 'CTA Icon'; // Default alt text
          moveInstrumentation(anchor, svgImg);
          ctaAnchor.append(svgImg);
        }
      }
    }
    btnWrapper.append(ctaAnchor);
    firstSection.append(btnWrapper);
  }

  latestblogsListing.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'latestblogs-d-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const linkElement = card.querySelector('[data-aue-prop="link"]');
    const imageElement = card.querySelector('[data-aue-prop="image"]');
    const dateElement = card.querySelector('[data-aue-prop="date"]');
    const titleElement = card.querySelector('[data-aue-prop="title"]');

    if (linkElement) {
      const cardAnchor = document.createElement('a');
      cardAnchor.classList.add('latestblogs-listing--cardwrapper', 'analytics_cta_click');
      cardAnchor.href = linkElement.textContent.trim();
      moveInstrumentation(linkElement, cardAnchor);

      if (titleElement) {
        cardAnchor.setAttribute('data-cta-label', titleElement.textContent.trim());
      }

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-listing--cards');

      if (imageElement) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-listing--cardimagewrapper');
        const img = imageElement.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(img.src, img.alt);
          optimizedPicture.querySelector('img').classList.add('latestblogs-listing--cardimage', 'latestblogs-w-100', 'latestblogs-h-100');
          moveInstrumentation(img, optimizedPicture.querySelector('img'));
          cardImageWrapper.append(optimizedPicture);
        } else {
          // If image is an anchor to an image asset
          const anchor = imageElement.querySelector('a');
          if (anchor && (anchor.href.endsWith('.webp') || anchor.href.endsWith('.jpeg') || anchor.href.endsWith('.png') || anchor.href.endsWith('.jpg')) ) {
            const newImg = document.createElement('img');
            newImg.src = anchor.href;
            newImg.alt = 'Blog Image'; // Default alt text
            newImg.classList.add('latestblogs-listing--cardimage', 'latestblogs-w-100', 'latestblogs-h-100');
            const optimizedPicture = createOptimizedPicture(newImg.src, newImg.alt);
            moveInstrumentation(anchor, optimizedPicture.querySelector('img'));
            cardImageWrapper.append(optimizedPicture);
          }
        }
        cardDiv.append(cardImageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards_content--wrapper');

      if (dateElement) {
        const pDate = document.createElement('p');
        pDate.classList.add('latestblogs--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-published_date');
        pDate.append(...dateElement.childNodes);
        moveInstrumentation(dateElement, pDate);
        contentWrapper.append(pDate);
      }

      if (titleElement) {
        const pTitle = document.createElement('p');
        pTitle.classList.add('latestblogs--text__body-2', 'latestblogs--text__body');
        pTitle.append(...titleElement.childNodes);
        moveInstrumentation(titleElement, pTitle);
        contentWrapper.append(pTitle);
      }

      cardDiv.append(contentWrapper);
      cardAnchor.append(cardDiv);
      secondSection.append(cardAnchor);
    }
  });

  latestblogsListing.append(secondSection);
  latestblogsWrapper.append(latestblogsListing);

  block.innerHTML = '';
  block.append(latestblogsWrapper);
}
