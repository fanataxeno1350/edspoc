import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  // Defensive helpers
  const by = (sel, root = block) => root.querySelector(sel);
  const all = (sel, root = block) => Array.from(root.querySelectorAll(sel));

  // Create final wrappers from expected HTML blueprint
  const cardListCmp = document.createElement("div");
  cardListCmp.className = "card-list-cmp-card-list parallax-child";

  const content = document.createElement("div");
  content.className = "card-list-cmp-card-list__content";

  const slideWrap = document.createElement("div");
  slideWrap.className = "card-list-slide-wrap";

  const contentTop = document.createElement("div");
  contentTop.className = "card-list-cmp-card-list__content__top card-list-slide-up";
  contentTop.setAttribute("data-slide-type", "slide-up");

  // --- Heading ---
  const headingWrapper = document.createElement("div");
  headingWrapper.className = "card-list-cmp-card-list__content__heading is-visible";

  const headingTitle = document.createElement("div");
  headingTitle.id = "card-list-heading";
  headingTitle.className = "card-list-cmp-card-list__content__heading__title";
  headingTitle.setAttribute("tabindex", "0");

  // Try JSON-based / authoring selectors first, then fallbacks
  const headingElement =
    by('[data-aue-prop="heading"]') ||
    by('[data-aue-prop="Heading"]') ||
    by('.button-container')?.closest('div')?.querySelector('[data-aue-prop="heading"]') ||
    by('p[data-aue-prop="heading"]') ||
    by('p'); // last resort: any p

  if (headingElement) {
    // preserve exact authored markup/text
    headingTitle.innerHTML = headingElement.innerHTML.trim();
    moveInstrumentation(headingElement, headingTitle);
  }

  headingWrapper.append(headingTitle);
  contentTop.append(headingWrapper);

  // --- CTA (robust lookup) ---
  const ctaWrapper = document.createElement("div");
  ctaWrapper.className = "card-list-cmp-card-list__content__cta-wrapper is-visible";

  // try multiple selectors to find CTA authored markup
  const ctaCandidates = [
    '[data-aue-prop="ctaLink"]',
    '[data-aue-prop="cta"]',
    '[data-aue-prop="ctaLink"] a',
    '.button-container a',
    'a.button',
    'a[href*="/qiddiya-city"]',
  ];

  let ctaElement = null;
  for (const s of ctaCandidates) {
    const found = by(s);
    if (found) {
      ctaElement = found.tagName === 'A' ? found : found.querySelector('a') || found;
      break;
    }
  }

  if (ctaElement && (ctaElement.tagName === "A" || ctaElement.querySelector('a'))) {
    const link = ctaElement.tagName === "A" ? ctaElement : ctaElement.querySelector('a');
    // build new CTA preserving authored attributes where present
    const newCta = document.createElement("a");
    if (link.href) newCta.href = link.href;
    if (link.className) newCta.className = link.className.includes('card-list-cta')
      ? link.className
      : 'card-list-cta card-list-cta__primary';
    else newCta.className = 'card-list-cta card-list-cta__primary';

    if (!newCta.getAttribute('target')) newCta.setAttribute('target', '_self');

    // keep aria-label if provided, otherwise text
    const aria = link.getAttribute('aria-label') || link.textContent.trim();
    if (aria) newCta.setAttribute('aria-label', aria);
    newCta.setAttribute('data-palette', link.getAttribute('data-palette') || 'palette-1');

    // recreate icon/label using authored content if present
    const origIcon = link.querySelector('.card-list-cta__icon') || link.querySelector('span');
    if (origIcon) {
      const icon = document.createElement('span');
      icon.className = origIcon.className || 'card-list-cta__icon qd-icon qd-icon--cheveron-right';
      if (origIcon.hasAttribute('aria-hidden')) icon.setAttribute('aria-hidden', origIcon.getAttribute('aria-hidden'));
      newCta.append(icon);
    }

    const origLabel = link.querySelector('.card-list-cta__label') || link;
    const label = document.createElement('span');
    label.className = origLabel.className && origLabel.className.includes('card-list-cta__label')
      ? origLabel.className
      : 'card-list-cta__label';
    label.textContent = origLabel.textContent.trim();
    newCta.append(label);

    moveInstrumentation(link, newCta);
    ctaWrapper.append(newCta);
  }
  contentTop.append(ctaWrapper);
  slideWrap.append(contentTop);
  content.append(slideWrap);

  // --- Cards container ---
  const cardItemsContainer = document.createElement("div");
  cardItemsContainer.className = "card-list-cmp-card-list__content__items";

  // find authored card nodes using model attribute (json->authoring mapping)
  const cards = all('[data-aue-model="card"]');
  // fallback: anything that looks like a block item (data-aue-type="component" with model="card")
  if (!cards.length) {
    const fallbackCards = all('[data-aue-type="component"][data-aue-model="card"]');
    if (fallbackCards.length) cards.push(...fallbackCards);
  }

  cards.forEach((card, index) => {
    const cardItem = document.createElement("div");
    cardItem.className =
      "card-list-cmp-card-list__content__card-item is-visible card-list-slide-up";
    cardItem.setAttribute("data-animation", "card");
    cardItem.setAttribute("data-slide-type", "slide-up");
    cardItem.setAttribute("data-slide-no-wrap", "");
    cardItem.setAttribute("data-slide-delay", `${(index * 100).toString().padStart(3, '0')}`);
    cardItem.style.transitionDelay = `${(index * 0.1).toFixed(1)}s`;

    // Image extraction: try data-aue-prop then picture/img fallback
    const imageElement =
      card.querySelector('[data-aue-prop="image"]') ||
      card.querySelector('picture') ||
      card.querySelector('img');

    if (imageElement) {
      const img = imageElement.tagName === 'IMG' ? imageElement : imageElement.querySelector('img');
      if (img && img.src) {
        // createOptimizedPicture must return an element (defensive check)
        try {
          const pic = createOptimizedPicture(img.src, img.alt || '');
          if (pic && pic.querySelector && pic.querySelector('img')) {
            const optimizedImg = pic.querySelector('img');
            optimizedImg.className = optimizedImg.className || 'card-list-cmp-card-list__content__card-item__image';
            // ensure loading attribute if not present
            if (!optimizedImg.getAttribute('loading')) optimizedImg.setAttribute('loading', 'lazy');
            moveInstrumentation(img, optimizedImg);
            cardItem.append(pic);
          } else {
            // fallback: clone original picture/img if optimization returns unexpected structure
            const clone = imageElement.cloneNode(true);
            cardItem.append(clone);
            moveInstrumentation(imageElement, clone);
          }
        } catch (e) {
          // If createOptimizedPicture throws, preserve original
          const clone = imageElement.cloneNode(true);
          cardItem.append(clone);
          moveInstrumentation(imageElement, clone);
        }
      } else {
        // No img.src found — preserve original element
        const clone = imageElement.cloneNode(true);
        cardItem.append(clone);
        moveInstrumentation(imageElement, clone);
      }
    }

    // Content wrapper
    const cardItemContent = document.createElement("div");
    cardItemContent.className = "card-list-cmp-card-list__content__card-item-content";

    // title
    const titleWrapper = document.createElement("div");
    titleWrapper.className = "card-list-cmp-card-list__content__card-item-content__heading-wrapper";
    titleWrapper.setAttribute("tabindex", "0");
    const titleDiv = document.createElement("div");
    titleDiv.className = "card-list-cmp-card-list__content__card-item-content__title";
    titleDiv.setAttribute("aria-hidden", "false");

    const titleElement =
      card.querySelector('[data-aue-prop="title"]') ||
      card.querySelector('[data-aue-prop="Title"]') ||
      card.querySelector('h3, h2, p');

    if (titleElement) {
      titleDiv.textContent = titleElement.textContent.trim();
      moveInstrumentation(titleElement, titleDiv);
    }
    titleWrapper.append(titleDiv);
    cardItemContent.append(titleWrapper);

    // description
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "card-list-cmp-card-list__content__card-item-content__description";
    descriptionDiv.setAttribute("tabindex", "0");
    descriptionDiv.setAttribute("aria-hidden", "false");

    const descriptionElement =
      card.querySelector('[data-aue-prop="description"]') ||
      card.querySelector('[data-aue-prop="Description"]') ||
      card.querySelector('p');

    if (descriptionElement) {
      descriptionDiv.innerHTML = descriptionElement.innerHTML.trim();
      // preserve original markup as aria-label if useful
      try {
        descriptionDiv.setAttribute("aria-label", descriptionElement.innerHTML.trim());
      } catch (e) {}
      moveInstrumentation(descriptionElement, descriptionDiv);
    }
    cardItemContent.append(descriptionDiv);

    cardItem.append(cardItemContent);
    moveInstrumentation(card, cardItem); // transfer row instrumentation
    cardItemsContainer.append(cardItem);
  });

  content.append(cardItemsContainer);
  cardListCmp.append(content);

  // Replace original block content
  block.textContent = "";
  block.append(cardListCmp);
}
