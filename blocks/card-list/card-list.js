import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListModel = block.querySelector('.card-list-cardlist');
  const cardListFields = JSON.parse(cardListModel.textContent);
  const cardModels = block.querySelectorAll('.card-list-card');

  const cardListCmpCardList = document.createElement('div');
  cardListCmpCardList.className = 'card-list-cmp-card-list parallax-child';

  const cardListCmpCardListContent = document.createElement('div');
  cardListCmpCardListContent.className = 'card-list-cmp-card-list__content';

  const cardListSlideWrap = document.createElement('div');
  cardListSlideWrap.className = 'card-list-slide-wrap';

  const cardListCmpCardListContentTop = document.createElement('div');
  cardListCmpCardListContentTop.className = 'card-list-cmp-card-list__content__top card-list-slide-up';
  cardListCmpCardListContentTop.setAttribute('data-slide-type', 'slide-up');

  const cardListCmpCardListContentHeading = document.createElement('div');
  cardListCmpCardListContentHeading.className = 'card-list-cmp-card-list__content__heading is-visible';

  const cardListCmpCardListContentHeadingTitle = document.createElement('div');
  cardListCmpCardListContentHeadingTitle.id = 'card-list-heading';
  cardListCmpCardListContentHeadingTitle.className = 'card-list-cmp-card-list__content__heading__title';
  cardListCmpCardListContentHeadingTitle.setAttribute('tabindex', '0');
  cardListCmpCardListContentHeadingTitle.innerHTML = cardListFields.heading;

  cardListCmpCardListContentHeading.append(cardListCmpCardListContentHeadingTitle);

  const cardListCmpCardListContentCtaWrapper = document.createElement('div');
  cardListCmpCardListContentCtaWrapper.className = 'card-list-cmp-card-list__content__cta-wrapper is-visible';

  const ctaLink = document.createElement('a');
  ctaLink.href = cardListFields.cta.href;
  ctaLink.className = 'card-list-cta card-list-cta__primary';
  ctaLink.target = '_self';
  ctaLink.setAttribute('aria-label', cardListFields.cta.label);
  ctaLink.setAttribute('data-palette', 'palette-1');

  const ctaIcon = document.createElement('span');
  ctaIcon.className = 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
  ctaIcon.setAttribute('aria-hidden', 'true');

  const ctaLabel = document.createElement('span');
  ctaLabel.className = 'card-list-cta__label';
  ctaLabel.textContent = cardListFields.cta.label;

  ctaLink.append(ctaIcon, ctaLabel);
  cardListCmpCardListContentCtaWrapper.append(ctaLink);

  cardListCmpCardListContentTop.append(cardListCmpCardListContentHeading, cardListCmpCardListContentCtaWrapper);
  cardListSlideWrap.append(cardListCmpCardListContentTop);

  const cardListCmpCardListContentItems = document.createElement('div');
  cardListCmpCardListContentItems.className = 'card-list-cmp-card-list__content__items';

  cardModels.forEach((cardModel, index) => {
    const cardFields = JSON.parse(cardModel.textContent);

    const cardListCmpCardListContentCardItem = document.createElement('div');
    cardListCmpCardListContentCardItem.className = 'card-list-cmp-card-list__content__card-item is-visible card-list-slide-up';
    cardListCmpCardListContentCardItem.setAttribute('data-animation', 'card');
    cardListCmpCardListContentCardItem.setAttribute('data-slide-type', 'slide-up');
    cardListCmpCardListContentCardItem.setAttribute('data-slide-no-wrap', '');
    cardListCmpCardListContentCardItem.setAttribute('data-slide-delay', `${index * 100}`);
    cardListCmpCardListContentCardItem.style.transitionDelay = `${index * 0.2}s`;

    const picture = document.createElement('picture');
    const img = cardModel.querySelector('img');
    if (img) {
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPicture.querySelector('img'));
      picture.append(...optimizedPicture.children);
      picture.querySelector('img').className = 'card-list-cmp-card-list__content__card-item__image';
      picture.querySelector('img').setAttribute('loading', 'lazy');
    }

    const cardListCmpCardListContentCardItemContent = document.createElement('div');
    cardListCmpCardListContentCardItemContent.className = 'card-list-cmp-card-list__content__card-item-content';

    const cardListCmpCardListContentCardItemContentHeadingWrapper = document.createElement('div');
    cardListCmpCardListContentCardItemContentHeadingWrapper.className = 'card-list-cmp-card-list__content__card-item-content__heading-wrapper';
    cardListCmpCardListContentCardItemContentHeadingWrapper.setAttribute('tabindex', '0');

    const cardListCmpCardListContentCardItemContentTitle = document.createElement('div');
    cardListCmpCardListContentCardItemContentTitle.className = 'card-list-cmp-card-list__content__card-item-content__title';
    cardListCmpCardListContentCardItemContentTitle.setAttribute('aria-hidden', 'false');
    cardListCmpCardListContentCardItemContentTitle.textContent = cardFields.title;

    cardListCmpCardListContentCardItemContentHeadingWrapper.append(cardListCmpCardListContentCardItemContentTitle);

    const cardListCmpCardListContentCardItemContentDescription = document.createElement('div');
    cardListCmpCardListContentCardItemContentDescription.className = 'card-list-cmp-card-list__content__card-item-content__description';
    cardListCmpCardListContentCardItemContentDescription.setAttribute('tabindex', '0');
    cardListCmpCardListContentCardItemContentDescription.setAttribute('aria-label', cardFields.description);
    cardListCmpCardListContentCardItemContentDescription.setAttribute('aria-hidden', 'false');
    cardListCmpCardListContentCardItemContentDescription.innerHTML = cardFields.description;

    cardListCmpCardListContentCardItemContent.append(
      cardListCmpCardListContentCardItemContentHeadingWrapper,
      cardListCmpCardListContentCardItemContentDescription,
    );

    cardListCmpCardListContentCardItem.append(picture, cardListCmpCardListContentCardItemContent);
    cardListCmpCardListContentItems.append(cardListCmpCardListContentCardItem);
  });

  cardListCmpCardListContent.append(cardListSlideWrap, cardListCmpCardListContentItems);
  cardListCmpCardList.append(cardListCmpCardListContent);

  block.textContent = '';
  block.append(cardListCmpCardList);
}
