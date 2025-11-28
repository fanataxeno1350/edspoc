import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const children = Array.from(block.children);

  // Create the main container for the hero
  const heroFullWidth = document.createElement("div");
  heroFullWidth.className = "hero-full-width parallax-child-2 hero-in-view";
  heroFullWidth.setAttribute("data-media-type", "videoTypeSelected");

  // Create the cover div
  const cover = document.createElement("div");
  cover.className = "hero-full-width__cover";
  heroFullWidth.append(cover);

  // Create the background div
  const background = document.createElement("div");
  background.className = "hero-full-width__background";
  heroFullWidth.append(background);

  const backgroundWrapper = document.createElement("div");
  backgroundWrapper.className = "hero-full-width__background-wrapper zoom-out";
  background.append(backgroundWrapper);

  // Extract video and poster image from the first child
  const videoContainer = children[0];
  let videoSrc = "";
  let posterSrc = "";

  const videoLink = videoContainer.querySelector('a[data-aue-prop="video"]');
  if (videoLink) {
    videoSrc = videoLink.href;
  }

  // Create the video element for the background
  if (videoSrc) {
    const backgroundVideo = document.createElement("video");
    backgroundVideo.className = "hero-full-width__background-video";
    backgroundVideo.setAttribute("playsinline", "");
    backgroundVideo.setAttribute("muted", "");
    backgroundVideo.setAttribute("loop", "");
    backgroundVideo.setAttribute("autoplay", "");
    const source = document.createElement("source");
    source.src = videoSrc;
    source.type = "video/mp4";
    backgroundVideo.append(source);
    backgroundWrapper.append(backgroundVideo);
    moveInstrumentation(videoLink, source);
  }

  // Create the poster image (currently hidden in HTML, but good to have a placeholder)
  const backgroundPoster = document.createElement("img");
  backgroundPoster.alt = "Background poster image";
  backgroundPoster.loading = "lazy";
  backgroundPoster.className = "hero-full-width__background-poster";
  backgroundPoster.style.display = "none";
  backgroundPoster.setAttribute("aria-hidden", "true");
  backgroundWrapper.append(backgroundPoster);

  // Create the content div
  const content = document.createElement("div");
  content.className = "hero-full-width__content";
  heroFullWidth.append(content);

  // Title and Description
  const titleRow = children[1];
  if (titleRow) {
    const slideWrap = document.createElement("div");
    slideWrap.className = "slide-wrap";
    const slideUp = document.createElement("div");
    slideUp.setAttribute("data-slide-type", "slide-up");
    slideUp.className = "slide-up";
    slideWrap.append(slideUp);

    const titleElement = titleRow.querySelector('div[data-aue-prop="title"]');
    if (titleElement) {
      const titleDiv = document.createElement("div");
      titleDiv.className = "hero-full-width__content__title";
      titleDiv.setAttribute("tabindex", "0");
      titleDiv.append(...titleElement.childNodes);
      moveInstrumentation(titleElement, titleDiv);
      slideUp.append(titleDiv);
    }

    const descriptionElement = titleRow.querySelector(
      'div[data-aue-prop="description"]'
    );
    if (descriptionElement) {
      const descriptionDiv = document.createElement("div");
      descriptionDiv.className = "hero-full-width__content__description";
      descriptionDiv.setAttribute("tabindex", "0");
      descriptionDiv.append(...descriptionElement.childNodes);
      moveInstrumentation(descriptionElement, descriptionDiv);
      slideUp.append(descriptionDiv);
    }
    content.append(slideWrap);
  }

  // CTAs
  const ctaRow = children[2];
  if (ctaRow) {
    const slideWrap = document.createElement("div");
    slideWrap.className = "slide-wrap";
    const slideUp = document.createElement("div");
    slideUp.setAttribute("data-slide-type", "slide-up");
    slideUp.className = "slide-up";
    slideWrap.append(slideUp);

    const ctaContainer = document.createElement("div");
    ctaContainer.className = "hero-full-width__content--ctas";

    const primaryCtaLink = ctaRow.querySelector(
      'a[data-aue-prop="primaryCtaLink"]'
    );
    const primaryCtaLabel = ctaRow.querySelector(
      'div[data-aue-prop="primaryCtaLabel"]'
    );

    if (primaryCtaLink && primaryCtaLabel) {
      const primaryCta = document.createElement("a");
      primaryCta.href = primaryCtaLink.href;
      primaryCta.className = "cta cta__secondary primaryCta ";
      primaryCta.target = "_self";
      primaryCta.setAttribute("aria-label", primaryCtaLabel.textContent.trim());
      primaryCta.setAttribute("data-palette", "palette-light");

      const primaryCtaSpan = document.createElement("span");
      primaryCtaSpan.className = "cta__label";
      primaryCtaSpan.append(...primaryCtaLabel.childNodes);
      moveInstrumentation(primaryCtaLabel, primaryCtaSpan);
      primaryCta.append(primaryCtaSpan);
      moveInstrumentation(primaryCtaLink, primaryCta);
      ctaContainer.append(primaryCta);
    }

    const secondaryCtaLink = ctaRow.querySelector(
      'a[data-aue-prop="secondaryCtaLink"]'
    );
    const secondaryCtaLabel = ctaRow.querySelector(
      'div[data-aue-prop="secondaryCtaLabel"]'
    );

    if (secondaryCtaLink && secondaryCtaLabel) {
      const chevronWrapper = document.createElement("div");
      chevronWrapper.className = "chevron-wrapper";

      const chevronButton = document.createElement("button");
      chevronButton.type = "button";
      chevronButton.className = "chevron-icon";
      chevronButton.setAttribute("aria-label", "Open video modal");
      chevronWrapper.append(chevronButton);

      const secondaryCta = document.createElement("a");
      secondaryCta.href = secondaryCtaLink.href;
      secondaryCta.className = "cta cta__link secondaryCta ";
      secondaryCta.target = "_self";
      secondaryCta.setAttribute(
        "aria-label",
        secondaryCtaLabel.textContent.trim()
      );
      secondaryCta.setAttribute("data-palette", "palette-light");

      const iconSpan = document.createElement("span");
      iconSpan.className = "cta__icon qd-icon qd-icon--cheveron-right";
      iconSpan.setAttribute("aria-hidden", "true");
      secondaryCta.append(iconSpan);

      const secondaryCtaSpan = document.createElement("span");
      secondaryCtaSpan.className = "cta__label";
      secondaryCtaSpan.append(...secondaryCtaLabel.childNodes);
      moveInstrumentation(secondaryCtaLabel, secondaryCtaSpan);
      secondaryCta.append(secondaryCtaSpan);
      moveInstrumentation(secondaryCtaLink, secondaryCta);
      chevronWrapper.append(secondaryCta);
      ctaContainer.append(chevronWrapper);
    }
    slideUp.append(ctaContainer);
    content.append(slideWrap);
  }

  // Modal Dialog
  const dialog = document.createElement("dialog");
  dialog.className = "hero-full-width__content--modal";
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");

  const form = document.createElement("form");
  form.method = "dialog";
  const closeButton = document.createElement("button");
  closeButton.className = "hero-full-width__content--modal__close-button";
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  form.append(closeButton);
  dialog.append(form);

  const videoModalDiv = document.createElement("div");
  videoModalDiv.className = "video hero-full-width__content--modal__video";
  const videoContainerModal = document.createElement("div");
  videoContainerModal.className = "video-container show-controls ";

  const controlsDiv = document.createElement("div");
  controlsDiv.className = "video-container__controls";

  const timerDiv = document.createElement("div");
  timerDiv.className = "video-container__controls__timer";
  timerDiv.innerHTML = `
    <div class="video-container__controls__timer__progress-area">
      <span class="video-container__controls__timer__progress-area__progress-bar"></span>
      <span class="video-container__controls__timer__progress-area__pointer"></span>
      <span class="video-container__controls__timer__progress-area__progress-pending"></span>
    </div>
    <p class="video-container__controls__timer__current-time">00:00</p>
    <p class="video-container__controls__timer__duration">00:00</p>
  `;
  controlsDiv.append(timerDiv);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "video-container__controls__buttons";
  buttonsDiv.innerHTML = `
    <button class="video-container__controls__buttons__play-button video-container__controls__buttons--button">
      <span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span>
    </button>
    <button class="video-container__controls__buttons__mute-button video-container__controls__buttons--button">
      <span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>
    </button>
    <button class="video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button">
      <span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>
    </button>
  `;
  controlsDiv.append(buttonsDiv);
  videoContainerModal.append(controlsDiv);

  // Modal video element
  if (videoSrc) {
    const modalVideo = document.createElement("video");
    modalVideo.className = "video-container__video";
    modalVideo.setAttribute("playsinline", "");
    modalVideo.setAttribute("webkit-playsinline", "");
    modalVideo.setAttribute("muted", "true");
    modalVideo.setAttribute("autoplay", "");
    const modalSource = document.createElement("source");
    modalSource.src = videoSrc;
    modalSource.type = "video/mp4";
    modalVideo.append(modalSource);
    videoContainerModal.append(modalVideo);
  }

  videoModalDiv.append(videoContainerModal);
  dialog.append(videoModalDiv);
  content.append(dialog);

  // Replace the block content with the new structure
  block.innerHTML = "";
  block.append(heroFullWidth);

  // Transfer instrumentation from the original block to the new heroFullWidth
  moveInstrumentation(block, heroFullWidth);
}
