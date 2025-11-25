import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const finalRoot = document.createElement("div");
  finalRoot.className = "card-list-cmp-card-list parallax-child";

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "card-list-cmp-card-list__content";

  // Top section
  const slideWrap = document.createElement("div");
  slideWrap.className = "card-list-slide-wrap";
  const topContent = document.createElement("div");
  topContent.className =
    "card-list-cmp-card-list__content__top card-list-slide-up";
  topContent.setAttribute("data-slide-type", "slide-up");

  const headingWrapper = document.createElement("div");
  headingWrapper.className =
    "card-list-cmp-card-list__content__heading is-visible";
  const headingDiv = document.createElement("div");
  headingDiv.id = "card-list-heading";
  headingDiv.className = "card-list-cmp-card-list__content__heading__title";
  headingDiv.setAttribute("tabindex", "0");

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h2 = document.createElement("h2");
    moveInstrumentation(heading, h2);
    h2.innerHTML = heading.innerHTML;
    headingDiv.append(h2);
  } else {
    // Preserve original heading if not found by AUE prop
    const originalHeading = block.querySelector("h2");
    if (originalHeading) {
      headingDiv.append(originalHeading);
    }
  }
  headingWrapper.append(headingDiv);

  const ctaWrapper = document.createElement("div");
  ctaWrapper.className =
    "card-list-cmp-card-list__content__cta-wrapper is-visible";

  const cta = block.querySelector('[data-aue-prop="cta"]');
  if (cta) {
    const ctaLink = document.createElement("a");
    moveInstrumentation(cta, ctaLink);
    ctaLink.className = "card-list-cta card-list-cta__primary";
    ctaLink.setAttribute("target", "_self");
    ctaLink.setAttribute("data-palette", "palette-1");
    ctaLink.href = cta.href || "#";
    ctaLink.setAttribute("aria-label", cta.textContent.trim());

    const ctaIcon = document.createElement("span");
    ctaIcon.className = "card-list-cta__icon qd-icon qd-icon--cheveron-right";
    ctaIcon.setAttribute("aria-hidden", "true");
    const ctaLabel = document.createElement("span");
    ctaLabel.className = "card-list-cta__label";
    ctaLabel.textContent = cta.textContent.trim();

    ctaLink.append(ctaIcon, ctaLabel);
    ctaWrapper.append(ctaLink);
  } else {
    // Preserve original CTA if not found by AUE prop
    const originalCta = block.querySelector(
      ".button-container a, .card-list-cta"
    );
    if (originalCta) {
      ctaWrapper.append(originalCta);
    }
  }

  topContent.append(headingWrapper, ctaWrapper);
  slideWrap.append(topContent);
  contentWrapper.append(slideWrap);

  // Card items section
  const cardItemsWrapper = document.createElement("div");
  cardItemsWrapper.className = "card-list-cmp-card-list__content__items";

  const cards = block.querySelectorAll('[data-aue-model="card"]');
  cards.forEach((card, index) => {
    const cardItem = document.createElement("div");
    cardItem.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardItem.setAttribute("data-animation", "card");
    cardItem.setAttribute("data-slide-type", "slide-up");
    cardItem.setAttribute("data-slide-no-wrap", "");
    cardItem.setAttribute("data-slide-delay", `${index * 100}`);
    cardItem.style.transitionDelay = `${index * 0.2}s`;

    const cardImage = card.querySelector('[data-aue-prop="image"] img');
    if (cardImage) {
      const pic = createOptimizedPicture(cardImage.src, cardImage.alt);
      moveInstrumentation(cardImage, pic.querySelector("img"));
      pic.querySelector("img").className =
        "card-list-cmp-card-list__content__card-item__image";
      cardItem.append(pic);
    }

    const cardContent = document.createElement("div");
    cardContent.className =
      "card-list-cmp-card-list__content__card-item-content";

    const cardHeadingWrapper = document.createElement("div");
    cardHeadingWrapper.className =
      "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    cardHeadingWrapper.setAttribute("tabindex", "0");
    const cardTitleDiv = document.createElement("div");
    cardTitleDiv.className =
      "card-list-cmp-card-list__content__card-item-content__title";
    cardTitleDiv.setAttribute("aria-hidden", "false");

    const cardTitle = card.querySelector('[data-aue-prop="title"]');
    if (cardTitle) {
      moveInstrumentation(cardTitle, cardTitleDiv);
      cardTitleDiv.textContent = cardTitle.textContent.trim();
    }
    cardHeadingWrapper.append(cardTitleDiv);

    const cardDescriptionDiv = document.createElement("div");
    cardDescriptionDiv.className =
      "card-list-cmp-card-list__content__card-item-content__description";
    cardDescriptionDiv.setAttribute("tabindex", "0");
    cardDescriptionDiv.setAttribute("aria-hidden", "false");

    const cardDescription = card.querySelector('[data-aue-prop="description"]');
    if (cardDescription) {
      moveInstrumentation(cardDescription, cardDescriptionDiv);
      cardDescriptionDiv.innerHTML = cardDescription.innerHTML;
      cardDescriptionDiv.setAttribute(
        "aria-label",
        cardDescription.innerHTML
          .replace(/\n/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      );
    }

    cardContent.append(cardHeadingWrapper, cardDescriptionDiv);
    cardItem.append(cardContent);
    cardItemsWrapper.append(cardItem);
  });

  contentWrapper.append(cardItemsWrapper);
  finalRoot.append(contentWrapper);

  block.textContent = "";
  block.append(finalRoot);

  const blockName = block.dataset.blockName;
  block.className = `${blockName} block`;
  block.dataset.blockStatus = "loaded";
}
