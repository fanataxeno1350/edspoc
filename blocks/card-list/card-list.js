import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const cardListCmp = document.createElement("div");
  cardListCmp.className = "card-list-cmp-card-list parallax-child";

  const content = document.createElement("div");
  content.className = "card-list-cmp-card-list__content";

  const slideWrap = document.createElement("div");
  slideWrap.className = "card-list-slide-wrap";

  const contentTop = document.createElement("div");
  contentTop.className =
    "card-list-cmp-card-list__content__top card-list-slide-up";
  contentTop.setAttribute("data-slide-type", "slide-up");

  // Heading
  const headingWrapper = document.createElement("div");
  headingWrapper.className =
    "card-list-cmp-card-list__content__heading is-visible";
  const headingTitle = document.createElement("div");
  headingTitle.id = "card-list-heading";
  headingTitle.className = "card-list-cmp-card-list__content__heading__title";
  headingTitle.setAttribute("tabindex", "0");

  const headingElement = block.querySelector('[data-aue-prop="heading"]');
  if (headingElement) {
    headingTitle.append(...headingElement.children);
    moveInstrumentation(headingElement, headingTitle);
  }
  headingWrapper.append(headingTitle);
  contentTop.append(headingWrapper);

  // CTA
  const ctaWrapper = document.createElement("div");
  ctaWrapper.className =
    "card-list-cmp-card-list__content__cta-wrapper is-visible";

  const ctaElement = block.querySelector('[data-aue-prop="cta"]');
  if (ctaElement) {
    const ctaLink = ctaElement.querySelector("a");
    if (ctaLink) {
      ctaLink.className = "card-list-cta card-list-cta__primary";
      ctaLink.setAttribute("target", "_self");
      ctaLink.setAttribute("aria-label", ctaLink.textContent);
      ctaLink.setAttribute("data-palette", "palette-1");

      const icon = document.createElement("span");
      icon.className = "card-list-cta__icon qd-icon qd-icon--cheveron-right";
      icon.setAttribute("aria-hidden", "true");

      const label = document.createElement("span");
      label.className = "card-list-cta__label";
      label.textContent = ctaLink.textContent;

      ctaLink.textContent = ""; // Clear original text
      ctaLink.append(icon, label);
      moveInstrumentation(ctaElement, ctaLink);
      ctaWrapper.append(ctaLink);
    }
  }
  contentTop.append(ctaWrapper);
  slideWrap.append(contentTop);
  content.append(slideWrap);

  // Cards
  const cardItemsContainer = document.createElement("div");
  cardItemsContainer.className = "card-list-cmp-card-list__content__items";

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card, index) => {
    const cardItem = document.createElement("div");
    cardItem.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardItem.setAttribute("data-animation", "card");
    cardItem.setAttribute("data-slide-type", "slide-up");
    cardItem.setAttribute("data-slide-no-wrap", "");
    cardItem.setAttribute(
      "data-slide-delay",
      `${index * 100}`.padStart(3, "0")
    );
    cardItem.style.transitionDelay = `${index * 0.2}s`;

    // Card Image
    const imageElement = card.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector("img");
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        pic.querySelector("img").className =
          "card-list-cmp-card-list__content__card-item__image";
        moveInstrumentation(img, pic.querySelector("img"));
        cardItem.append(pic);
      }
    }

    const cardItemContent = document.createElement("div");
    cardItemContent.className =
      "card-list-cmp-card-list__content__card-item-content";

    // Card Title
    const titleWrapper = document.createElement("div");
    titleWrapper.className =
      "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    titleWrapper.setAttribute("tabindex", "0");
    const titleDiv = document.createElement("div");
    titleDiv.className =
      "card-list-cmp-card-list__content__card-item-content__title";
    titleDiv.setAttribute("aria-hidden", "false");

    const titleElement = card.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      titleDiv.textContent = titleElement.textContent;
      moveInstrumentation(titleElement, titleDiv);
    }
    titleWrapper.append(titleDiv);
    cardItemContent.append(titleWrapper);

    // Card Description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className =
      "card-list-cmp-card-list__content__card-item-content__description";
    descriptionDiv.setAttribute("tabindex", "0");
    descriptionDiv.setAttribute("aria-hidden", "false");

    const descriptionElement = card.querySelector(
      '[data-aue-prop="description"]'
    );
    if (descriptionElement) {
      descriptionDiv.innerHTML = descriptionElement.innerHTML;
      descriptionDiv.setAttribute("aria-label", descriptionElement.innerHTML);
      moveInstrumentation(descriptionElement, descriptionDiv);
    }
    cardItemContent.append(descriptionDiv);

    cardItem.append(cardItemContent);
    moveInstrumentation(card, cardItem);
    cardItemsContainer.append(cardItem);
  });

  content.append(cardItemsContainer);
  cardListCmp.append(content);

  block.textContent = "";
  block.append(cardListCmp);
}
