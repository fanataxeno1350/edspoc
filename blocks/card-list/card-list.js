import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/utils.js";

export default function decorate(block) {
  const cardListCmpCardList = document.createElement("div");
  cardListCmpCardList.className = "card-list-cmp-card-list parallax-child";

  const cardListCmpCardListContent = document.createElement("div");
  cardListCmpCardListContent.className = "card-list-cmp-card-list__content";

  const cardListSlideWrap = document.createElement("div");
  cardListSlideWrap.className = "card-list-slide-wrap";

  const cardListCmpCardListContentTop = document.createElement("div");
  cardListCmpCardListContentTop.className =
    "card-list-cmp-card-list__content__top card-list-slide-up";
  cardListCmpCardListContentTop.setAttribute("data-slide-type", "slide-up");

  const cardListCmpCardListContentHeading = document.createElement("div");
  cardListCmpCardListContentHeading.className =
    "card-list-cmp-card-list__content__heading is-visible";

  const cardListCmpCardListContentHeadingTitle = document.createElement("div");
  cardListCmpCardListContentHeadingTitle.id = "card-list-heading";
  cardListCmpCardListContentHeadingTitle.className =
    "card-list-cmp-card-list__content__heading__title";
  cardListCmpCardListContentHeadingTitle.setAttribute("tabindex", "0");

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    cardListCmpCardListContentHeadingTitle.append(...headingElement.children);
    moveInstrumentation(headingElement, cardListCmpCardListContentHeadingTitle);
  }
  cardListCmpCardListContentHeading.append(
    cardListCmpCardListContentHeadingTitle
  );

  const cardListCmpCardListContentCtaWrapper = document.createElement("div");
  cardListCmpCardListContentCtaWrapper.className =
    "card-list-cmp-card-list__content__cta-wrapper is-visible";

  const ctaElement = block.querySelector('[data-aue-prop="cta"]');
  if (ctaElement) {
    const ctaLink = ctaElement.querySelector("a");
    if (ctaLink) {
      ctaLink.className = "card-list-cta card-list-cta__primary";
      ctaLink.setAttribute("target", "_self");
      ctaLink.setAttribute("aria-label", ctaLink.textContent);
      ctaLink.setAttribute("data-palette", "palette-1");

      const iconSpan = document.createElement("span");
      iconSpan.className =
        "card-list-cta__icon qd-icon qd-icon--cheveron-right";
      iconSpan.setAttribute("aria-hidden", "true");

      const labelSpan = document.createElement("span");
      labelSpan.className = "card-list-cta__label";
      labelSpan.textContent = ctaLink.textContent;

      ctaLink.textContent = "";
      ctaLink.append(iconSpan, labelSpan);
      cardListCmpCardListContentCtaWrapper.append(ctaLink);
      moveInstrumentation(ctaElement, ctaLink);
    }
  }

  cardListCmpCardListContentTop.append(
    cardListCmpCardListContentHeading,
    cardListCmpCardListContentCtaWrapper
  );
  cardListSlideWrap.append(cardListCmpCardListContentTop);
  cardListCmpCardListContent.append(cardListSlideWrap);

  const cardListCmpCardListContentItems = document.createElement("div");
  cardListCmpCardListContentItems.className =
    "card-list-cmp-card-list__content__items";

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card, index) => {
    const cardListCmpCardListContentCardItem = document.createElement("div");
    cardListCmpCardListContentCardItem.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardListCmpCardListContentCardItem.setAttribute("data-animation", "card");
    cardListCmpCardListContentCardItem.setAttribute(
      "data-slide-type",
      "slide-up"
    );
    cardListCmpCardListContentCardItem.setAttribute("data-slide-no-wrap", "");
    cardListCmpCardListContentCardItem.setAttribute(
      "data-slide-delay",
      `${index * 100}`.padStart(3, "0")
    );
    cardListCmpCardListContentCardItem.style.transitionDelay = `${
      index * 0.2
    }s`;

    const imageElement = card.querySelector('[data-aue-prop="image"] img');
    if (imageElement) {
      const pic = createOptimizedPicture(imageElement.src, imageElement.alt);
      pic.querySelector("img").className =
        "card-list-cmp-card-list__content__card-item__image";
      cardListCmpCardListContentCardItem.append(pic);
      moveInstrumentation(imageElement, pic.querySelector("img"));
    }

    const cardListCmpCardListContentCardItemContent =
      document.createElement("div");
    cardListCmpCardListContentCardItemContent.className =
      "card-list-cmp-card-list__content__card-item-content";

    const cardListCmpCardListContentCardItemContentHeadingWrapper =
      document.createElement("div");
    cardListCmpCardListContentCardItemContentHeadingWrapper.className =
      "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    cardListCmpCardListContentCardItemContentHeadingWrapper.setAttribute(
      "tabindex",
      "0"
    );

    const cardListCmpCardListContentCardItemContentTitle =
      document.createElement("div");
    cardListCmpCardListContentCardItemContentTitle.className =
      "card-list-cmp-card-list__content__card-item-content__title";
    cardListCmpCardListContentCardItemContentTitle.setAttribute(
      "aria-hidden",
      "false"
    );

    const titleElement = card.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      cardListCmpCardListContentCardItemContentTitle.textContent =
        titleElement.textContent;
      moveInstrumentation(
        titleElement,
        cardListCmpCardListContentCardItemContentTitle
      );
    }
    cardListCmpCardListContentCardItemContentHeadingWrapper.append(
      cardListCmpCardListContentCardItemContentTitle
    );

    const cardListCmpCardListContentCardItemContentDescription =
      document.createElement("div");
    cardListCmpCardListContentCardItemContentDescription.className =
      "card-list-cmp-card-list__content__card-item-content__description";
    cardListCmpCardListContentCardItemContentDescription.setAttribute(
      "tabindex",
      "0"
    );
    cardListCmpCardListContentCardItemContentDescription.setAttribute(
      "aria-hidden",
      "false"
    );

    const descriptionElement = card.querySelector(
      '[data-aue-prop="description"]'
    );
    if (descriptionElement) {
      cardListCmpCardListContentCardItemContentDescription.innerHTML =
        descriptionElement.innerHTML;
      cardListCmpCardListContentCardItemContentDescription.setAttribute(
        "aria-label",
        descriptionElement.innerHTML
      );
      moveInstrumentation(
        descriptionElement,
        cardListCmpCardListContentCardItemContentDescription
      );
    }

    cardListCmpCardListContentCardItemContent.append(
      cardListCmpCardListContentCardItemContentHeadingWrapper,
      cardListCmpCardListContentCardItemContentDescription
    );

    cardListCmpCardListContentCardItem.append(
      cardListCmpCardListContentCardItemContent
    );
    cardListCmpCardListContentItems.append(cardListCmpCardListContentCardItem);
    moveInstrumentation(card, cardListCmpCardListContentCardItem);
  });

  cardListCmpCardListContent.append(cardListCmpCardListContentItems);
  cardListCmpCardList.append(cardListCmpCardListContent);

  block.textContent = "";
  block.append(cardListCmpCardList);
}
