import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const heading = block.querySelector('[data-aue-prop="heading"]');
  const cta = block.querySelector('[data-aue-prop="cta"]');
  const cards = [...block.querySelectorAll('[data-aue-model="card"]')];

  const cardListCmpCardList = document.createElement("div");
  cardListCmpCardList.className = "card-list-cmp-card-list parallax-child";

  const cardListCmpCardListContent = document.createElement("div");
  cardListCmpCardListContent.className = "card-list-cmp-card-list__content";

  const cardListSlideWrap = document.createElement("div");
  cardListSlideWrap.className = "card-list-slide-wrap";

  const cardListCmpCardListContentTop = document.createElement("div");
  cardListCmpCardListContentTop.className =
    "card-list-cmp-card-list__content__top card-list-slide-up";
  cardListCmpCardListContentTop.dataset.slideType = "slide-up";

  const cardListCmpCardListContentHeading = document.createElement("div");
  cardListCmpCardListContentHeading.className =
    "card-list-cmp-card-list__content__heading is-visible";

  const cardListCmpCardListContentHeadingTitle = document.createElement("div");
  cardListCmpCardListContentHeadingTitle.id = "card-list-heading";
  cardListCmpCardListContentHeadingTitle.className =
    "card-list-cmp-card-list__content__heading__title";
  cardListCmpCardListContentHeadingTitle.tabIndex = 0;
  if (heading) {
    cardListCmpCardListContentHeadingTitle.append(heading);
  }

  const cardListCmpCardListContentCtaWrapper = document.createElement("div");
  cardListCmpCardListContentCtaWrapper.className =
    "card-list-cmp-card-list__content__cta-wrapper is-visible";
  if (cta) {
    const ctaLink = cta.querySelector("a");
    if (ctaLink) {
      ctaLink.className = "card-list-cta card-list-cta__primary";
      ctaLink.target = "_self";
      ctaLink.dataset.palette = "palette-1";
      ctaLink.setAttribute("aria-label", ctaLink.textContent);

      const ctaIcon = document.createElement("span");
      ctaIcon.className = "card-list-cta__icon qd-icon qd-icon--cheveron-right";
      ctaIcon.setAttribute("aria-hidden", "true");

      const ctaLabel = document.createElement("span");
      ctaLabel.className = "card-list-cta__label";
      ctaLabel.textContent = ctaLink.textContent;

      ctaLink.innerHTML = ""; // Clear original content
      ctaLink.append(ctaIcon, ctaLabel);
      moveInstrumentation(cta, ctaLink);
      cardListCmpCardListContentCtaWrapper.append(ctaLink);
    }
  }

  cardListCmpCardListContentHeading.append(
    cardListCmpCardListContentHeadingTitle
  );
  cardListCmpCardListContentTop.append(
    cardListCmpCardListContentHeading,
    cardListCmpCardListContentCtaWrapper
  );
  cardListSlideWrap.append(cardListCmpCardListContentTop);

  const cardListCmpCardListContentItems = document.createElement("div");
  cardListCmpCardListContentItems.className =
    "card-list-cmp-card-list__content__items";

  cards.forEach((card, index) => {
    const image = card.querySelector('[data-aue-prop="image"]');
    const title = card.querySelector('[data-aue-prop="title"]');
    const description = card.querySelector('[data-aue-prop="description"]');

    const cardItem = document.createElement("div");
    cardItem.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardItem.dataset.animation = "card";
    cardItem.dataset.slideType = "slide-up";
    cardItem.dataset.slideNoWrap = "";
    cardItem.dataset.slideDelay = `${index * 100}`.padStart(3, "0");
    cardItem.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(card, cardItem);

    if (image) {
      const picture = createOptimizedPicture(image.src, image.alt);
      picture.querySelector("img").className =
        "card-list-cmp-card-list__content__card-item__image";
      moveInstrumentation(image, picture.querySelector("img"));
      cardItem.append(picture);
    }

    const cardItemContent = document.createElement("div");
    cardItemContent.className =
      "card-list-cmp-card-list__content__card-item-content";

    const cardItemContentHeadingWrapper = document.createElement("div");
    cardItemContentHeadingWrapper.className =
      "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    cardItemContentHeadingWrapper.tabIndex = 0;

    const cardItemContentTitle = document.createElement("div");
    cardItemContentTitle.className =
      "card-list-cmp-card-list__content__card-item-content__title";
    cardItemContentTitle.setAttribute("aria-hidden", "false");
    if (title) {
      cardItemContentTitle.append(title);
    }

    const cardItemContentDescription = document.createElement("div");
    cardItemContentDescription.className =
      "card-list-cmp-card-list__content__card-item-content__description";
    cardItemContentDescription.tabIndex = 0;
    cardItemContentDescription.setAttribute("aria-hidden", "false");
    if (description) {
      cardItemContentDescription.setAttribute(
        "aria-label",
        description.innerHTML
      );
      cardItemContentDescription.append(description);
    }

    cardItemContentHeadingWrapper.append(cardItemContentTitle);
    cardItemContent.append(
      cardItemContentHeadingWrapper,
      cardItemContentDescription
    );
    cardItem.append(cardItemContent);
    cardListCmpCardListContentItems.append(cardItem);
  });

  cardListCmpCardListContent.append(
    cardListSlideWrap,
    cardListCmpCardListContentItems
  );
  cardListCmpCardList.append(cardListCmpCardListContent);

  block.innerHTML = "";
  block.append(cardListCmpCardList);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
