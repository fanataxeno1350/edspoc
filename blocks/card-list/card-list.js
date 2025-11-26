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
  const rootDiv = document.createElement("div");
  rootDiv.className = "card-list-cmp-card-list parallax-child";

  const contentDiv = document.createElement("div");
  contentDiv.className = "card-list-cmp-card-list__content";
  rootDiv.append(contentDiv);

  const slideWrapDiv = document.createElement("div");
  slideWrapDiv.className = "card-list-slide-wrap";
  contentDiv.append(slideWrapDiv);

  const topContentDiv = document.createElement("div");
  topContentDiv.className =
    "card-list-cmp-card-list__content__top card-list-slide-up";
  topContentDiv.dataset.slideType = "slide-up";
  slideWrapDiv.append(topContentDiv);

  // Heading
  const headingWrapper = document.createElement("div");
  headingWrapper.className =
    "card-list-cmp-card-list__content__heading is-visible";
  topContentDiv.append(headingWrapper);

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

  // CTA
  const ctaWrapper = document.createElement("div");
  ctaWrapper.className =
    "card-list-cmp-card-list__content__cta-wrapper is-visible";
  topContentDiv.append(ctaWrapper);

  const ctaElement = block.querySelector('[data-aue-prop="cta"]');
  if (ctaElement) {
    const link = ctaElement.querySelector("a");
    if (link) {
      const ctaLink = document.createElement("a");
      ctaLink.href = link.href;
      ctaLink.className = "card-list-cta card-list-cta__primary";
      ctaLink.target = "_self";
      ctaLink.setAttribute("aria-label", link.textContent.trim());
      ctaLink.dataset.palette = "palette-1";

      const iconSpan = document.createElement("span");
      iconSpan.className =
        "card-list-cta__icon qd-icon qd-icon--cheveron-right";
      iconSpan.setAttribute("aria-hidden", "true");
      ctaLink.append(iconSpan);

      const labelSpan = document.createElement("span");
      labelSpan.className = "card-list-cta__label";
      labelSpan.textContent = link.textContent.trim();
      ctaLink.append(labelSpan);

      moveInstrumentation(link, ctaLink);
      ctaWrapper.append(ctaLink);
    }
  }

  // Card Items
  const cardItemsContainer = document.createElement("div");
  cardItemsContainer.className = "card-list-cmp-card-list__content__items";
  contentDiv.append(cardItemsContainer);

  const cardItems = block.querySelectorAll('[data-aue-model="card"]');
  cardItems.forEach((cardItem, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardDiv.dataset.animation = "card";
    cardDiv.dataset.slideType = "slide-up";
    cardDiv.dataset.slideNoWrap = "";
    cardDiv.dataset.slideDelay = `${index * 100}`.padStart(3, "0");
    cardDiv.style.transitionDelay = `${index * 0.2}s`;
    moveInstrumentation(cardItem, cardDiv);

    const imageElement = cardItem.querySelector('[data-aue-prop="image"] img');
    if (imageElement) {
      const picture = createOptimizedPicture(
        imageElement.src,
        imageElement.alt
      );
      picture.querySelector("img").className =
        "card-list-cmp-card-list__content__card-item__image";
      moveInstrumentation(imageElement, picture.querySelector("img"));
      cardDiv.append(picture);
    }

    const cardContentDiv = document.createElement("div");
    cardContentDiv.className =
      "card-list-cmp-card-list__content__card-item-content";
    cardDiv.append(cardContentDiv);

    // Card Title
    const titleWrapper = document.createElement("div");
    titleWrapper.className =
      "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    titleWrapper.tabIndex = 0;
    cardContentDiv.append(titleWrapper);

    const titleElement = cardItem.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const titleDiv = document.createElement("div");
      titleDiv.className =
        "card-list-cmp-card-list__content__card-item-content__title";
      titleDiv.setAttribute("aria-hidden", "false");
      titleDiv.append(...titleElement.childNodes);
      moveInstrumentation(titleElement, titleDiv);
      titleWrapper.append(titleDiv);
    }

    // Card Description
    const descriptionElement = cardItem.querySelector(
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
      cardContentDiv.append(descriptionDiv);
    }

    cardItemsContainer.append(cardDiv);
  });

  block.textContent = "";
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
