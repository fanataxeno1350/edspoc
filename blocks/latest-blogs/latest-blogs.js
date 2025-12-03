import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestblogsWrapper = document.createElement('section');
  latestblogsWrapper.classList.add('latestblogs-wrapper');

  const latestblogsListing = document.createElement('div');
  latestblogsListing.classList.add('latestblogs-listing');
  moveInstrumentation(block, latestblogsListing);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'latestblogs-text--white', 'latestblogs-text-center');

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-listing--title', 'latestblogs--text__heading-1', 'latestblogs-text--white', 'latestblogs-pb-3');
    h2.append(...heading.childNodes);
    moveInstrumentation(heading, h2);
    firstSection.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.classList.add('latestblogs-listing--desc', 'latestblogs--text__body-2', 'latestblogs-pb-4');
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    firstSection.append(p);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  const viewAllIcon = block.querySelector('[data-aue-prop="viewAllIcon"]');

  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-listing--btnwrapper');
    const anchor = document.createElement('a');
    anchor.classList.add('latestblogs--text__title-3', 'latestblogs-listing--btn', 'analytics_cta_click');
    anchor.href = viewAllLink.href || '#';
    anchor.title = viewAllLink.title || '';
    anchor.append(...viewAllLink.childNodes);
    moveInstrumentation(viewAllLink, anchor);

    if (viewAllIcon) {
      const iconImg = viewAllIcon.querySelector('img');
      if (iconImg) {
        const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt);
        moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
        anchor.append(optimizedIcon);
      } else {
        const anchorIcon = viewAllIcon.querySelector('a[href$=".svg"], a[href$=".png"]');
        if (anchorIcon) {
          const img = document.createElement('img');
          img.src = anchorIcon.href;
          img.alt = anchorIcon.title || '';
          img.loading = 'lazy';
          anchor.append(img);
          moveInstrumentation(anchorIcon, img);
        }
      }
    }
    btnWrapper.append(anchor);
    firstSection.append(btnWrapper);
  }

  latestblogsListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'latestblogs-d-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((card) => {
    const link = card.querySelector('[data-aue-prop="link"]');
    const image = card.querySelector('[data-aue-prop="image"]');
    const date = card.querySelector('[data-aue-prop="date"]');
    const title = card.querySelector('[data-aue-prop="title"]');

    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('latestblogs-listing--cardwrapper', 'analytics_cta_click');
    cardWrapper.href = link ? link.href : '#';
    cardWrapper.setAttribute('data-cta-label', title ? title.textContent.trim() : '');
    moveInstrumentation(card, cardWrapper);

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('latestblogs-listing--cards');

    if (image) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-listing--cardimagewrapper');
      const imgElement = image.querySelector('img');
      if (imgElement) {
        const optimizedPic = createOptimizedPicture(imgElement.src, imgElement.alt);
        optimizedPic.classList.add('latestblogs-listing--cardimage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(imgElement, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
      } else {
        const anchorImg = image.querySelector('a[href$=".webp"], a[href$=".jpeg"], a[href$=".png"], a[href$=".jpg"]');
        if (anchorImg) {
          const img = document.createElement('img');
          img.src = anchorImg.href;
          img.alt = anchorImg.title || '';
          img.loading = 'lazy';
          img.classList.add('latestblogs-listing--cardimage', 'latestblogs-w-100', 'latestblogs-h-100');
          cardImageWrapper.append(img);
          moveInstrumentation(anchorImg, img);
        }
      }
      cardsDiv.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (date) {
      const dateP = document.createElement('p');
      dateP.classList.add('latestblogs--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-published_date');
      dateP.setAttribute('data-date', date.textContent.trim()); // Assuming date content is already in desired format or can be parsed
      dateP.append(...date.childNodes);
      moveInstrumentation(date, dateP);
      contentWrapper.append(dateP);
    }

    if (title) {
      const titleP = document.createElement('p');
      titleP.classList.add('latestblogs--text__body-2', 'latestblogs--text__body');
      titleP.append(...title.childNodes);
      moveInstrumentation(title, titleP);
      contentWrapper.append(titleP);
    }

    cardsDiv.append(contentWrapper);
    cardWrapper.append(cardsDiv);
    secondSection.append(cardWrapper);
  });

  latestblogsListing.append(secondSection);
  latestblogsWrapper.append(latestblogsListing);
  block.replaceWith(latestblogsWrapper);
}
