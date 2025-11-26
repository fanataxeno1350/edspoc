import { createOptimizedPicture } from "../../scripts/aem.js";

function moveInstrumentation(source, target) {
  const dataset = source.dataset;
  Object.keys(dataset).forEach((key) => {
    if (key.startsWith("aue")) {
      target.dataset[key] = dataset[key];
    }
  });
}

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
  cardListCmpCardListContentTop.dataset.slideType = "slide-up";

  const cardListCmpCardListContentHeading = document.createElement("div");
  cardListCmpCardListContentHeading.className =
    "card-list-cmp-card-list__content__heading is-visible";

  const cardListCmpCardListContentHeadingTitle = document.createElement("div");
  cardListCmpCardListContentHeadingTitle.id = "card-list-heading";
  cardListCmpCardListContentHeadingTitle.className =
    "card-list-cmp-card-list__content__heading__title";
  cardListCmpCardListContentHeadingTitle.tabIndex = 0;

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    cardListCmpCardListContentHeadingTitle.append(...heading.childNodes);
    moveInstrumentation(heading, cardListCmpCardListContentHeadingTitle);
  }

  cardListCmpCardListContentHeading.append(
    cardListCmpCardListContentHeadingTitle
  );

  const cardListCmpCardListContentCtaWrapper = document.createElement("div");
  cardListCmpCardListContentCtaWrapper.className =
    "card-list-cmp-card-list__content__cta-wrapper is-visible";

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaLink && ctaLabel) {
    const cta = document.createElement("a");
    cta.className = "card-list-cta card-list-cta__primary";
    cta.target = "_self";
    cta.dataset.palette = "palette-1";
    cta.href = ctaLink.textContent.trim();
    moveInstrumentation(ctaLink, cta);

    const ctaIcon = document.createElement("span");
    ctaIcon.className = "card-list-cta__icon qd-icon qd-icon--cheveron-right";
    ctaIcon.setAttribute("aria-hidden", "true");
    cta.append(ctaIcon);

    const ctaLabelSpan = document.createElement("span");
    ctaLabelSpan.className = "card-list-cta__label";
    ctaLabelSpan.textContent = ctaLabel.textContent.trim();
    moveInstrumentation(ctaLabel, ctaLabelSpan);
    cta.append(ctaLabelSpan);

    cta.setAttribute("aria-label", ctaLabel.textContent.trim());
    cardListCmpCardListContentCtaWrapper.append(cta);
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

  const cardItems = block.querySelectorAll('[data-aue-model="card"]');
  cardItems.forEach((cardItem, index) => {
    const cardListCmpCardItem = document.createElement("div");
    cardListCmpCardItem.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardListCmpCardItem.dataset.animation = "card";
    cardListCmpCardItem.dataset.slideType = "slide-up";
    cardListCmpCardItem.dataset.slideNoWrap = "";
    cardListCmpCardItem.dataset.slideDelay = `${index * 100}`.padStart(3, "0");
    cardListCmpCardItem.style.transitionDelay = `${index * 0.2}s`;

    const image = cardItem.querySelector('[data-aue-prop="image"]');
    if (image && image.querySelector("img")) {
      const imgElement = image.querySelector("img");
      const pic = createOptimizedPicture(imgElement.src, imgElement.alt);
      pic.querySelector("img").className =
        "card-list-cmp-card-list__content__card-item__image";
      moveInstrumentation(imgElement, pic.querySelector("img"));
      cardListCmpCardItem.append(pic);
    }

    const cardListCmpCardItemContent = document.createElement("div");
    cardListCmpCardItemContent.className =
      "card-list-cmp-card-list__content__card-item-content";

    const cardListCmpCardItemContentHeadingWrapper =
      document.createElement("div");
    cardListCmpCardItemContentHeadingWrapper.className =
      "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    cardListCmpCardItemContentHeadingWrapper.tabIndex = 0;

    const cardListCmpCardItemContentTitle = document.createElement("div");
    cardListCmpCardItemContentTitle.className =
      "card-list-cmp-card-list__content__card-item-content__title";
    cardListCmpCardItemContentTitle.setAttribute("aria-hidden", "false");

    const title = cardItem.querySelector('[data-aue-prop="title"]');
    if (title) {
      cardListCmpCardItemContentTitle.textContent = title.textContent.trim();
      moveInstrumentation(title, cardListCmpCardItemContentTitle);
    }
    cardListCmpCardItemContentHeadingWrapper.append(
      cardListCmpCardItemContentTitle
    );

    const cardListCmpCardItemContentDescription = document.createElement("div");
    cardListCmpCardItemContentDescription.className =
      "card-list-cmp-card-list__content__card-item-content__description";
    cardListCmpCardItemContentDescription.tabIndex = 0;
    cardListCmpCardItemContentDescription.setAttribute("aria-hidden", "false");

    const description = cardItem.querySelector('[data-aue-prop="description"]');
    if (description) {
      const p = document.createElement("p");
      p.append(...description.childNodes);
      moveInstrumentation(description, p);
      cardListCmpCardItemContentDescription.append(p);
      cardListCmpCardItemContentDescription.setAttribute(
        "aria-label",
        description.innerHTML.trim()
      );
    }

    cardListCmpCardItemContent.append(
      cardListCmpCardItemContentHeadingWrapper,
      cardListCmpCardItemContentDescription
    );
    cardListCmpCardItem.append(cardListCmpCardItemContent);
    cardListCmpCardListContentItems.append(cardListCmpCardItem);
  });

  cardListCmpCardListContent.append(cardListCmpCardListContentItems);
  cardListCmpCardList.append(cardListCmpCardListContent);

  block.textContent = "";
  block.append(cardListCmpCardList);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
