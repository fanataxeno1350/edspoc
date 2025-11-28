import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const backgroundVideoSource = block.querySelector(
    '[data-aue-prop="backgroundVideo"]'
  );
  const backgroundPosterAlt = block.querySelector(
    '[data-aue-prop="backgroundPosterAlt"]'
  );
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const ctasContainer = block.querySelector('[data-aue-model="ctas"]');

  const primaryCtaLabel = ctasContainer?.querySelector(
    '[data-aue-prop="primaryCtaLabel"]'
  );
  const primaryCtaHref = ctasContainer?.querySelector(
    '[data-aue-prop="primaryCtaHref"]'
  );
  const secondaryCtaLabel = ctasContainer?.querySelector(
    '[data-aue-prop="secondaryCtaLabel"]'
  );
  const secondaryCtaHref = ctasContainer?.querySelector(
    '[data-aue-prop="secondaryCtaHref"]'
  );

  block.innerHTML = "";
  block.classList.add("parallax-child-2", "hero-in-view");
  block.setAttribute("data-media-type", "videoTypeSelected");
  block.setAttribute("aria-hidden", "true");

  const coverDiv = document.createElement("div");
  coverDiv.classList.add("hero-full-width__cover");
  block.append(coverDiv);

  const backgroundDiv = document.createElement("div");
  backgroundDiv.classList.add("hero-full-width__background");
  block.append(backgroundDiv);

  const backgroundWrapper = document.createElement("div");
  backgroundWrapper.classList.add(
    "hero-full-width__background-wrapper",
    "zoom-out"
  );
  backgroundDiv.append(backgroundWrapper);

  if (backgroundVideoSource) {
    const video = document.createElement("video");
    video.classList.add("hero-full-width__background-video");
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.setAttribute("autoplay", "");

    const source = document.createElement("source");
    source.setAttribute("src", backgroundVideoSource.textContent.trim());
    source.setAttribute("type", "video/mp4");
    moveInstrumentation(backgroundVideoSource, source);
    video.append(source);
    backgroundWrapper.append(video);
  }

  const img = document.createElement("img");
  img.setAttribute("loading", "lazy");
  img.classList.add("hero-full-width__background-poster");
  img.style.display = "none";
  img.setAttribute("aria-hidden", "true");
  if (backgroundPosterAlt) {
    img.setAttribute("alt", backgroundPosterAlt.textContent.trim());
    moveInstrumentation(backgroundPosterAlt, img);
  } else {
    img.setAttribute("alt", "Background poster image");
  }
  backgroundWrapper.append(img);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("hero-full-width__content");
  block.append(contentDiv);

  const slideWrap1 = document.createElement("div");
  slideWrap1.classList.add("slide-wrap");
  contentDiv.append(slideWrap1);

  const slideUp1 = document.createElement("div");
  slideUp1.setAttribute("data-slide-type", "slide-up");
  slideUp1.classList.add("slide-up");
  slideWrap1.append(slideUp1);

  if (title) {
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("hero-full-width__content__title");
    titleDiv.setAttribute("tabindex", "0");
    titleDiv.append(...title.childNodes);
    moveInstrumentation(title, titleDiv);
    slideUp1.append(titleDiv);
  }

  if (description) {
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("hero-full-width__content__description");
    descriptionDiv.setAttribute("tabindex", "0");
    descriptionDiv.append(...description.childNodes);
    moveInstrumentation(description, descriptionDiv);
    slideUp1.append(descriptionDiv);
  }

  const slideWrap2 = document.createElement("div");
  slideWrap2.classList.add("slide-wrap");
  contentDiv.append(slideWrap2);

  const slideUp2 = document.createElement("div");
  slideUp2.setAttribute("data-slide-type", "slide-up");
  slideUp2.classList.add("slide-up");
  slideWrap2.append(slideUp2);

  const ctasDiv = document.createElement("div");
  ctasDiv.classList.add("hero-full-width__content--ctas");
  if (ctasContainer) {
    moveInstrumentation(ctasContainer, ctasDiv);
  }
  slideUp2.append(ctasDiv);

  if (primaryCtaLabel && primaryCtaHref) {
    const primaryLink = document.createElement("a");
    primaryLink.classList.add("cta", "cta__secondary", "primaryCta");
    primaryLink.setAttribute("target", "_self");
    primaryLink.setAttribute("data-palette", "palette-light");
    primaryLink.setAttribute("aria-label", primaryCtaLabel.textContent.trim());
    primaryLink.setAttribute("href", primaryCtaHref.textContent.trim());

    const span = document.createElement("span");
    span.classList.add("cta__label");
    span.textContent = primaryCtaLabel.textContent.trim();
    moveInstrumentation(primaryCtaLabel, span);
    moveInstrumentation(primaryCtaHref, primaryLink);

    primaryLink.append(span);
    ctasDiv.append(primaryLink);
  }

  const chevronWrapper = document.createElement("div");
  chevronWrapper.classList.add("chevron-wrapper");
  ctasDiv.append(chevronWrapper);

  const chevronButton = document.createElement("button");
  chevronButton.setAttribute("type", "button");
  chevronButton.classList.add("chevron-icon");
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  if (secondaryCtaLabel && secondaryCtaHref) {
    const secondaryLink = document.createElement("a");
    secondaryLink.classList.add("cta", "cta__link", "secondaryCta");
    secondaryLink.setAttribute("target", "_self");
    secondaryLink.setAttribute("data-palette", "palette-light");
    secondaryLink.setAttribute(
      "aria-label",
      secondaryCtaLabel.textContent.trim()
    );
    secondaryLink.setAttribute("href", secondaryCtaHref.textContent.trim());

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("cta__icon", "qd-icon", "qd-icon--cheveron-right");
    iconSpan.setAttribute("aria-hidden", "true");

    const labelSpan = document.createElement("span");
    labelSpan.classList.add("cta__label");
    labelSpan.textContent = secondaryCtaLabel.textContent.trim();
    moveInstrumentation(secondaryCtaLabel, labelSpan);
    moveInstrumentation(secondaryCtaHref, secondaryLink);

    secondaryLink.append(iconSpan, labelSpan);
    chevronWrapper.append(secondaryLink);
  }

  // Modal Dialog (hardcoded structure as it's not authored)
  const dialog = document.createElement("dialog");
  dialog.classList.add("hero-full-width__content--modal");
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");

  const form = document.createElement("form");
  form.setAttribute("method", "dialog");

  const closeButton = document.createElement("button");
  closeButton.classList.add("hero-full-width__content--modal__close-button");
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  form.append(closeButton);
  dialog.append(form);

  const videoModalDiv = document.createElement("div");
  videoModalDiv.classList.add(
    "video",
    "hero-full-width__content--modal__video"
  );

  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container", "show-controls");

  const controlsDiv = document.createElement("div");
  controlsDiv.classList.add("video-container__controls");

  const timerDiv = document.createElement("div");
  timerDiv.classList.add("video-container__controls__timer");

  const progressArea = document.createElement("div");
  progressArea.classList.add("video-container__controls__timer__progress-area");
  progressArea.innerHTML = `
      <span class="video-container__controls__timer__progress-area__progress-bar"></span>
      <span class="video-container__controls__timer__progress-area__pointer"></span>
      <span class="video-container__controls__timer__progress-area__progress-pending"></span>
    `;
  timerDiv.append(progressArea);

  const currentTime = document.createElement("p");
  currentTime.classList.add("video-container__controls__timer__current-time");
  currentTime.textContent = "00:00";
  timerDiv.append(currentTime);

  const duration = document.createElement("p");
  duration.classList.add("video-container__controls__timer__duration");
  duration.textContent = "00:00";
  timerDiv.append(duration);
  controlsDiv.append(timerDiv);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("video-container__controls__buttons");
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
  videoContainer.append(controlsDiv);

  const modalVideo = document.createElement("video");
  modalVideo.classList.add("video-container__video");
  modalVideo.setAttribute("playsinline", "");
  modalVideo.setAttribute("webkit-playsinline", "");
  modalVideo.setAttribute("muted", "true");
  modalVideo.setAttribute("autoplay", "");

  if (backgroundVideoSource) {
    const modalSource = document.createElement("source");
    modalSource.setAttribute("src", backgroundVideoSource.textContent.trim());
    modalSource.setAttribute("type", "video/mp4");
    // No moveInstrumentation here as it's a duplicate source for the modal
    modalVideo.append(modalSource);
  }
  modalVideo.append("webkit-playsinline", 'x-webkit-airplay="allow"'); // These are text nodes in the original HTML
  videoContainer.append(modalVideo);
  videoModalDiv.append(videoContainer);
  dialog.append(videoModalDiv);

  contentDiv.append(dialog);

  // Set aria-label for the block based on the title content
  if (title) {
    block.setAttribute("aria-label", title.outerHTML);
  }
}
