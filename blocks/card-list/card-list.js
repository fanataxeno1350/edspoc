// working checkpoint
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListCmp = document.createElement("div");
  cardListCmp.className = "card-list-cmp-card-list parallax-child";

  const cardListContent = document.createElement("div");
  cardListContent.className = "card-list-cmp-card-list__content";
  cardListCmp.append(cardListContent);

  // Top section
  const slideWrap = document.createElement("div");
  slideWrap.className = "card-list-slide-wrap";
  cardListContent.append(slideWrap);

  const contentTop = document.createElement("div");
  contentTop.className =
    "card-list-cmp-card-list__content__top card-list-slide-up";
  contentTop.dataset.slideType = "slide-up";
  slideWrap.append(contentTop);

  const headingWrapper = document.createElement("div");
  headingWrapper.className =
    "card-list-cmp-card-list__content__heading is-visible";
  contentTop.append(headingWrapper);

  const headingTitle = document.createElement("div");
  headingTitle.id = "card-list-heading";
  headingTitle.className = "card-list-cmp-card-list__content__heading__title";
  headingTitle.tabIndex = 0;
  headingWrapper.append(headingTitle);

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    const h2 = document.createElement("h2");
    h2.append(...headingElement.childNodes);
    moveInstrumentation(headingElement, h2);
    headingTitle.append(h2);
  }

  const ctaWrapper = document.createElement("div");
  ctaWrapper.className =
    "card-list-cmp-card-list__content__cta-wrapper is-visible";
  contentTop.append(ctaWrapper);

  const ctaLinkElement = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaLabelElement = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaLinkElement && ctaLabelElement) {
    const cta = document.createElement("a");
    cta.className = "card-list-cta card-list-cta__primary";
    cta.target = "_self";
    cta.dataset.palette = "palette-1";
    cta.href = ctaLinkElement.textContent.trim();
    moveInstrumentation(ctaLinkElement, cta);

    const ctaIcon = document.createElement("span");
    ctaIcon.className = "card-list-cta__icon qd-icon qd-icon--cheveron-right";
    ctaIcon.setAttribute("aria-hidden", "true");
    cta.append(ctaIcon);

    const ctaLabelSpan = document.createElement("span");
    ctaLabelSpan.className = "card-list-cta__label";
    ctaLabelSpan.textContent = ctaLabelElement.textContent.trim();
    moveInstrumentation(ctaLabelElement, ctaLabelSpan);
    cta.append(ctaLabelSpan);

    ctaWrapper.append(cta);
  }

  // Card items section
  const cardItemsContainer = document.createElement("div");
  cardItemsContainer.className = "card-list-cmp-card-list__content__items";
  cardListContent.append(cardItemsContainer);

  const cardModels = block.querySelectorAll('[data-aue-model="card"]');
  cardModels.forEach((cardModel, index) => {
    const cardItem = document.createElement("div");
    cardItem.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardItem.dataset.animation = "card";
    cardItem.dataset.slideType = "slide-up";
    cardItem.dataset.slideNoWrap = "";
    cardItem.dataset.slideDelay = `${index * 100}`.padStart(3, "0");
    cardItem.style.transitionDelay = `${index * 0.2}s`;

    const imageElement = cardModel.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      // const img = imageElement.querySelector("img");
      if (imageElement) {
        const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
        picture.querySelector("img").className =
          "card-list-cmp-card-list__content__card-item__image";
        moveInstrumentation(imageElement, picture.querySelector("img"));
        cardItem.append(picture);
      }
    }

    const cardItemContent = document.createElement("div");
    cardItemContent.className =
      "card-list-cmp-card-list__content__card-item-content";
    cardItem.append(cardItemContent);

    const titleWrapper = document.createElement("div");
    titleWrapper.className =
      "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    titleWrapper.tabIndex = 0;
    cardItemContent.append(titleWrapper);

    const titleElement = cardModel.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const titleDiv = document.createElement("div");
      titleDiv.className =
        "card-list-cmp-card-list__content__card-item-content__title";
      titleDiv.setAttribute("aria-hidden", "false");
      titleDiv.textContent = titleElement.textContent.trim();
      moveInstrumentation(titleElement, titleDiv);
      titleWrapper.append(titleDiv);
    }

    const descriptionElement = cardModel.querySelector(
      '[data-aue-prop="description"]'
    );
    if (descriptionElement) {
      const descriptionDiv = document.createElement("div");
      descriptionDiv.className =
        "card-list-cmp-card-list__content__card-item-content__description";
      descriptionDiv.tabIndex = 0;
      descriptionDiv.setAttribute(
        "aria-label",
        descriptionElement.innerHTML.trim()
      );
      descriptionDiv.setAttribute("aria-hidden", "false");
      descriptionDiv.append(...descriptionElement.childNodes);
      moveInstrumentation(descriptionElement, descriptionDiv);
      cardItemContent.append(descriptionDiv);
    }

    cardItemsContainer.append(cardItem);
  });

  block.textContent = "";
  block.append(cardListCmp);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
