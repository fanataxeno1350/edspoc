import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'card-list';

  const cardListContent = block.querySelector(':scope > div');
  const [headingEl, ctaEl, cardsEl] = cardListContent.querySelectorAll(':scope > div');

  const cardListCmpCardList = document.createElement('div');
  cardListCmpCardList.className = `${blockName}-cmp-card-list parallax-child`;

  const cardListCmpCardListContent = document.createElement('div');
  cardListCmpCardListContent.className = `${blockName}-cmp-card-list__content`;

  const cardListSlideWrap = document.createElement('div');
  cardListSlideWrap.className = `${blockName}-slide-wrap`;

  const cardListCmpCardListContentTop = document.createElement('div');
  cardListCmpCardListContentTop.className = `${blockName}-cmp-card-list__content__top ${blockName}-slide-up`;
  cardListCmpCardListContentTop.setAttribute('data-slide-type', 'slide-up');

  if (headingEl) {
    const cardListCmpCardListContentHeading = document.createElement('div');
    cardListCmpCardListContentHeading.className = `${blockName}-cmp-card-list__content__heading is-visible`;

    const cardListCmpCardListContentHeadingTitle = document.createElement('div');
    cardListCmpCardListContentHeadingTitle.id = `${blockName}-heading`;
    cardListCmpCardListContentHeadingTitle.className = `${blockName}-cmp-card-list__content__heading__title`;
    cardListCmpCardListContentHeadingTitle.setAttribute('tabindex', '0');

    const headingContent = headingEl.querySelector('h1, h2, h3, h4, h5, h6');
    if (headingContent) {
      cardListCmpCardListContentHeadingTitle.innerHTML = headingContent.outerHTML;
    } else {
      cardListCmpCardListContentHeadingTitle.innerHTML = headingEl.innerHTML;
    }
    moveInstrumentation(headingEl, cardListCmpCardListContentHeadingTitle);
    cardListCmpCardListContentHeading.append(cardListCmpCardListContentHeadingTitle);
    cardListCmpCardListContentTop.append(cardListCmpCardListContentHeading);
  }

  if (ctaEl) {
    const cardListCmpCardListContentCtaWrapper = document.createElement('div');
    cardListCmpCardListContentCtaWrapper.className = `${blockName}-cmp-card-list__content__cta-wrapper is-visible`;

    const ctaLink = ctaEl.querySelector('a');
    if (ctaLink) {
      const newCtaLink = ctaLink.cloneNode(true);
      newCtaLink.className = `${blockName}-cta ${blockName}-cta__primary`;
      newCtaLink.setAttribute('target', '_self');
      newCtaLink.setAttribute('data-palette', 'palette-1');

      const ctaIcon = document.createElement('span');
      ctaIcon.className = `${blockName}-cta__icon qd-icon qd-icon--cheveron-right`;
      ctaIcon.setAttribute('aria-hidden', 'true');

      const ctaLabel = document.createElement('span');
      ctaLabel.className = `${blockName}-cta__label`;
      ctaLabel.textContent = newCtaLink.textContent;

      newCtaLink.textContent = '';
      newCtaLink.prepend(ctaIcon);
      newCtaLink.append(ctaLabel);

      cardListCmpCardListContentCtaWrapper.append(newCtaLink);
      moveInstrumentation(ctaEl, cardListCmpCardListContentCtaWrapper);
    }
    cardListCmpCardListContentTop.append(cardListCmpCardListContentCtaWrapper);
  }

  cardListSlideWrap.append(cardListCmpCardListContentTop);
  cardListCmpCardListContent.append(cardListSlideWrap);

  if (cardsEl) {
    const cardListCmpCardListContentItems = document.createElement('div');
    cardListCmpCardListContentItems.className = `${blockName}-cmp-card-list__content__items`;

    Array.from(cardsEl.children).forEach((card, index) => {
      const cardListCmpCardListContentCardItem = document.createElement('div');
      cardListCmpCardListContentCardItem.className = `${blockName}-cmp-card-list__content__card-item is-visible ${blockName}-slide-up`;
      cardListCmpCardListContentCardItem.setAttribute('data-animation', 'card');
      cardListCmpCardListContentCardItem.setAttribute('data-slide-type', 'slide-up');
      cardListCmpCardListContentCardItem.setAttribute('data-slide-no-wrap', '');
      cardListCmpCardListContentCardItem.setAttribute('data-slide-delay', `${index * 100}`);
      cardListCmpCardListContentCardItem.style.transitionDelay = `${index * 0.2}s`;

      const [imageWrapper, contentWrapper] = card.children;

      if (imageWrapper) {
        const img = imageWrapper.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          picture.querySelector('img').className = `${blockName}-cmp-card-list__content__card-item__image`;
          cardListCmpCardListContentCardItem.append(picture);
          moveInstrumentation(img, picture);
        }
      }

      if (contentWrapper) {
        const cardListCmpCardListContentCardItemContent = document.createElement('div');
        cardListCmpCardListContentCardItemContent.className = `${blockName}-cmp-card-list__content__card-item-content`;

        const [titleWrapper, descriptionWrapper] = contentWrapper.children;

        if (titleWrapper) {
          const cardListCmpCardListContentCardItemContentHeadingWrapper = document.createElement('div');
          cardListCmpCardListContentCardItemContentHeadingWrapper.className = `${blockName}-cmp-card-list__content__card-item-content__heading-wrapper`;
          cardListCmpCardListContentCardItemContentHeadingWrapper.setAttribute('tabindex', '0');

          const cardListCmpCardListContentCardItemContentTitle = document.createElement('div');
          cardListCmpCardListContentCardItemContentTitle.className = `${blockName}-cmp-card-list__content__card-item-content__title`;
          cardListCmpCardListContentCardItemContentTitle.setAttribute('aria-hidden', 'false');
          cardListCmpCardListContentCardItemContentTitle.innerHTML = titleWrapper.innerHTML;
          moveInstrumentation(titleWrapper, cardListCmpCardListContentCardItemContentTitle);

          cardListCmpCardListContentCardItemContentHeadingWrapper.append(cardListCmpCardListContentCardItemContentTitle);
          cardListCmpCardListContentCardItemContent.append(cardListCmpCardListContentCardItemContentHeadingWrapper);
        }

        if (descriptionWrapper) {
          const cardListCmpCardListContentCardItemContentDescription = document.createElement('div');
          cardListCmpCardListContentCardItemContentDescription.className = `${blockName}-cmp-card-list__content__card-item-content__description`;
          cardListCmpCardListContentCardItemContentDescription.setAttribute('tabindex', '0');
          cardListCmpCardListContentCardItemContentDescription.setAttribute('aria-hidden', 'false');
          const pTag = descriptionWrapper.querySelector('p');
          if (pTag) {
            cardListCmpCardListContentCardItemContentDescription.setAttribute('aria-label', pTag.outerHTML);
            cardListCmpCardListContentCardItemContentDescription.innerHTML = pTag.outerHTML;
          } else {
            cardListCmpCardListContentCardItemContentDescription.innerHTML = descriptionWrapper.innerHTML;
          }
          moveInstrumentation(descriptionWrapper, cardListCmpCardListContentCardItemContentDescription);

          cardListCmpCardListContentCardItemContent.append(cardListCmpCardListContentCardItemContentDescription);
        }
        cardListCmpCardListContentCardItem.append(cardListCmpCardListContentCardItemContent);
      }
      cardListCmpCardListContentItems.append(cardListCmpCardListContentCardItem);
    });
    cardListCmpCardListContent.append(cardListCmpCardListContentItems);
  }

  cardListCmpCardList.append(cardListCmpCardListContent);

  block.textContent = '';
  block.append(cardListCmpCardList);
}
