import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const mainDiv = document.createElement("div");
  mainDiv.className = "card-list-cmp-card-list parallax-child";

  const contentDiv = document.createElement("div");
  contentDiv.className = "card-list-cmp-card-list__content";
  mainDiv.append(contentDiv);

  const slideWrap = document.createElement("div");
  slideWrap.className = "card-list-slide-wrap";
  contentDiv.append(slideWrap);

  const topContent = document.createElement("div");
  topContent.className =
    "card-list-cmp-card-list__content__top card-list-slide-up";
  topContent.setAttribute("data-slide-type", "slide-up");
  slideWrap.append(topContent);

  const headingWrapper = document.createElement("div");
  headingWrapper.className =
    "card-list-cmp-card-list__content__heading is-visible";
  topContent.append(headingWrapper);

  const headingTitle = document.createElement("div");
  headingTitle.id = "card-list-heading";
  headingTitle.className = "card-list-cmp-card-list__content__heading__title";
  headingTitle.setAttribute("tabindex", "0");
  headingWrapper.append(headingTitle);

  const headingEl = block.querySelector('[data-aue-prop="heading"]');
  if (headingEl) {
    const h2 = document.createElement("h2");
    h2.append(...headingEl.childNodes);
    moveInstrumentation(headingEl, h2);
    headingTitle.append(h2);
  }

  const ctaWrapper = document.createElement("div");
  ctaWrapper.className =
    "card-list-cmp-card-list__content__cta-wrapper is-visible";
  topContent.append(ctaWrapper);

  const ctaLinkEl = block.querySelector('[data-aue-prop="cta-link"]');
  const ctaLabelEl = block.querySelector('[data-aue-prop="cta-label"]');

  if (ctaLinkEl && ctaLabelEl) {
    const cta = document.createElement("a");
    cta.className = "card-list-cta card-list-cta__primary";
    cta.setAttribute("target", "_self");
    cta.setAttribute("data-palette", "palette-1");
    cta.href = ctaLinkEl.textContent.trim();
    moveInstrumentation(ctaLinkEl, cta);

    const icon = document.createElement("span");
    icon.className = "card-list-cta__icon qd-icon qd-icon--cheveron-right";
    icon.setAttribute("aria-hidden", "true");
    cta.append(icon);

    const label = document.createElement("span");
    label.className = "card-list-cta__label";
    label.append(...ctaLabelEl.childNodes);
    moveInstrumentation(ctaLabelEl, label);
    cta.append(label);

    ctaWrapper.append(cta);
  }

  const itemsDiv = document.createElement("div");
  itemsDiv.className = "card-list-cmp-card-list__content__items";
  contentDiv.append(itemsDiv);

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card, index) => {
    const cardItem = document.createElement("div");
    cardItem.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardItem.setAttribute("data-animation", "card");
    cardItem.setAttribute("data-slide-type", "slide-up");
    cardItem.setAttribute("data-slide-no-wrap", "");
    const delay = index * 100;
    cardItem.setAttribute("data-slide-delay", String(delay).padStart(3, "0"));
    cardItem.style.transitionDelay = `${delay / 1000}s`;

    const imageEl = card.querySelector('[data-aue-prop="image"]');
    if (imageEl) {
      const picture = createOptimizedPicture(imageEl.src, imageEl.alt);
      picture.querySelector("img").className =
        "card-list-cmp-card-list__content__card-item__image";
      moveInstrumentation(imageEl, picture.querySelector("img"));
      cardItem.append(picture);
    }

    const cardItemContent = document.createElement("div");
    cardItemContent.className =
      "card-list-cmp-card-list__content__card-item-content";
    cardItem.append(cardItemContent);

    const titleWrapper = document.createElement("div");
    titleWrapper.className =
      "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    titleWrapper.setAttribute("tabindex", "0");
    cardItemContent.append(titleWrapper);

    const titleDiv = document.createElement("div");
    titleDiv.className =
      "card-list-cmp-card-list__content__card-item-content__title";
    titleDiv.setAttribute("aria-hidden", "false");
    const titleEl = card.querySelector('[data-aue-prop="title"]');
    if (titleEl) {
      titleDiv.append(...titleEl.childNodes);
      moveInstrumentation(titleEl, titleDiv);
    }
    titleWrapper.append(titleDiv);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.className =
      "card-list-cmp-card-list__content__card-item-content__description";
    descriptionDiv.setAttribute("tabindex", "0");
    descriptionDiv.setAttribute("aria-hidden", "false");
    const descriptionEl = card.querySelector('[data-aue-prop="description"]');
    if (descriptionEl) {
      descriptionDiv.append(...descriptionEl.childNodes);
      moveInstrumentation(descriptionEl, descriptionDiv);
      descriptionDiv.setAttribute("aria-label", descriptionDiv.innerHTML);
    }
    cardItemContent.append(descriptionDiv);

    itemsDiv.append(cardItem);
  });

  block.textContent = "";
  block.append(mainDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
