import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const backgroundVideo = block.querySelector(
    '[data-aue-prop="backgroundVideo"]'
  );
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const primaryCtaLink = block.querySelector(
    '[data-aue-prop="primaryCtaLink"]'
  );
  const primaryCtaLabel = block.querySelector(
    '[data-aue-prop="primaryCtaLabel"]'
  );
  const secondaryCtaLink = block.querySelector(
    '[data-aue-prop="secondaryCtaLink"]'
  );
  const secondaryCtaLabel = block.querySelector(
    '[data-aue-prop="secondaryCtaLabel"]'
  );

  block.innerHTML = "";
  block.classList.add("parallax-child-2", "hero-in-view");
  block.setAttribute("data-media-type", "videoTypeSelected");

  const coverDiv = document.createElement("div");
  coverDiv.classList.add("hero-full-width__cover");
  block.append(coverDiv);

  const backgroundDiv = document.createElement("div");
  backgroundDiv.classList.add("hero-full-width__background");
  block.append(backgroundDiv);

  const backgroundWrapperDiv = document.createElement("div");
  backgroundWrapperDiv.classList.add(
    "hero-full-width__background-wrapper",
    "zoom-out"
  );
  backgroundDiv.append(backgroundWrapperDiv);

  if (backgroundVideo) {
    const videoElem = document.createElement("video");
    videoElem.classList.add("hero-full-width__background-video");
    videoElem.setAttribute("playsinline", "");
    videoElem.setAttribute("muted", "");
    videoElem.setAttribute("loop", "");
    videoElem.setAttribute("autoplay", "");

    const sourceElem = document.createElement("source");
    sourceElem.setAttribute("type", "video/mp4");
    sourceElem.src = backgroundVideo.href || backgroundVideo.textContent.trim();
    videoElem.append(sourceElem);
    moveInstrumentation(backgroundVideo, sourceElem);
    backgroundWrapperDiv.append(videoElem);
  }

  const posterImg = document.createElement("img");
  posterImg.setAttribute("alt", "Background poster image");
  posterImg.setAttribute("loading", "lazy");
  posterImg.classList.add("hero-full-width__background-poster");
  posterImg.style.display = "none";
  posterImg.setAttribute("aria-hidden", "true");
  backgroundWrapperDiv.append(posterImg);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("hero-full-width__content");
  block.append(contentDiv);

  const slideWrap1 = document.createElement("div");
  slideWrap1.classList.add("slide-wrap");
  contentDiv.append(slideWrap1);

  const slideUp1 = document.createElement("div");
  slideUp1.classList.add("slide-up");
  slideUp1.setAttribute("data-slide-type", "slide-up");
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
  slideUp2.classList.add("slide-up");
  slideUp2.setAttribute("data-slide-type", "slide-up");
  slideWrap2.append(slideUp2);

  const ctasDiv = document.createElement("div");
  ctasDiv.classList.add("hero-full-width__content--ctas");
  slideUp2.append(ctasDiv);

  if (primaryCtaLink && primaryCtaLabel) {
    const primaryCtaAnchor = document.createElement("a");
    primaryCtaAnchor.classList.add("cta", "cta__secondary", "primaryCta");
    primaryCtaAnchor.setAttribute("target", "_self");
    primaryCtaAnchor.setAttribute("data-palette", "palette-light");
    primaryCtaAnchor.href = primaryCtaLink.href || "#";
    primaryCtaAnchor.setAttribute(
      "aria-label",
      primaryCtaLabel.textContent.trim()
    );

    const primaryCtaSpan = document.createElement("span");
    primaryCtaSpan.classList.add("cta__label");
    primaryCtaSpan.append(...primaryCtaLabel.childNodes);
    moveInstrumentation(primaryCtaLabel, primaryCtaSpan);
    primaryCtaAnchor.append(primaryCtaSpan);
    moveInstrumentation(primaryCtaLink, primaryCtaAnchor);
    ctasDiv.append(primaryCtaAnchor);
  }

  const chevronWrapper = document.createElement("div");
  chevronWrapper.classList.add("chevron-wrapper");
  ctasDiv.append(chevronWrapper);

  const chevronButton = document.createElement("button");
  chevronButton.setAttribute("type", "button");
  chevronButton.classList.add("chevron-icon");
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  if (secondaryCtaLink && secondaryCtaLabel) {
    const secondaryCtaAnchor = document.createElement("a");
    secondaryCtaAnchor.classList.add("cta", "cta__link", "secondaryCta");
    secondaryCtaAnchor.setAttribute("target", "_self");
    secondaryCtaAnchor.setAttribute("data-palette", "palette-light");
    secondaryCtaAnchor.href = secondaryCtaLink.href || "#";
    secondaryCtaAnchor.setAttribute(
      "aria-label",
      secondaryCtaLabel.textContent.trim()
    );

    const secondaryCtaIcon = document.createElement("span");
    secondaryCtaIcon.classList.add(
      "cta__icon",
      "qd-icon",
      "qd-icon--cheveron-right"
    );
    secondaryCtaIcon.setAttribute("aria-hidden", "true");
    secondaryCtaAnchor.append(secondaryCtaIcon);

    const secondaryCtaSpan = document.createElement("span");
    secondaryCtaSpan.classList.add("cta__label");
    secondaryCtaSpan.append(...secondaryCtaLabel.childNodes);
    moveInstrumentation(secondaryCtaLabel, secondaryCtaSpan);
    secondaryCtaAnchor.append(secondaryCtaSpan);
    moveInstrumentation(secondaryCtaLink, secondaryCtaAnchor);
    chevronWrapper.append(secondaryCtaAnchor);
  }

  const dialog = document.createElement("dialog");
  dialog.classList.add("hero-full-width__content--modal");
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");
  contentDiv.append(dialog);

  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  dialog.append(form);

  const closeButton = document.createElement("button");
  closeButton.classList.add("hero-full-width__content--modal__close-button");
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  form.append(closeButton);

  const videoModalDiv = document.createElement("div");
  videoModalDiv.classList.add(
    "video",
    "hero-full-width__content--modal__video"
  );
  dialog.append(videoModalDiv);

  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container", "show-controls");
  videoModalDiv.append(videoContainer);

  const controlsDiv = document.createElement("div");
  controlsDiv.classList.add("video-container__controls");
  videoContainer.append(controlsDiv);

  const timerDiv = document.createElement("div");
  timerDiv.classList.add("video-container__controls__timer");
  controlsDiv.append(timerDiv);

  const progressArea = document.createElement("div");
  progressArea.classList.add("video-container__controls__timer__progress-area");
  timerDiv.append(progressArea);

  const progressBar = document.createElement("span");
  progressBar.classList.add(
    "video-container__controls__timer__progress-area__progress-bar"
  );
  progressArea.append(progressBar);

  const pointer = document.createElement("span");
  pointer.classList.add(
    "video-container__controls__timer__progress-area__pointer"
  );
  progressArea.append(pointer);

  const progressPending = document.createElement("span");
  progressPending.classList.add(
    "video-container__controls__timer__progress-area__progress-pending"
  );
  progressArea.append(progressPending);

  const currentTime = document.createElement("p");
  currentTime.classList.add("video-container__controls__timer__current-time");
  currentTime.textContent = "00:00";
  timerDiv.append(currentTime);

  const duration = document.createElement("p");
  duration.classList.add("video-container__controls__timer__duration");
  duration.textContent = "00:00";
  timerDiv.append(duration);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("video-container__controls__buttons");
  controlsDiv.append(buttonsDiv);

  const playButton = document.createElement("button");
  playButton.classList.add(
    "video-container__controls__buttons__play-button",
    "video-container__controls__buttons--button"
  );
  buttonsDiv.append(playButton);

  const playIcon = document.createElement("span");
  playIcon.classList.add(
    "video-container__controls__buttons__icon",
    "qd-icon",
    "qd-icon--play"
  );
  playButton.append(playIcon);

  const muteButton = document.createElement("button");
  muteButton.classList.add(
    "video-container__controls__buttons__mute-button",
    "video-container__controls__buttons--button"
  );
  buttonsDiv.append(muteButton);

  const muteIcon = document.createElement("span");
  muteIcon.classList.add(
    "video-container__controls__buttons__icon",
    "qd-icon",
    "qd-icon--volume"
  );
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement("button");
  fullscreenButton.classList.add(
    "video-container__controls__buttons__fullscreen-button",
    "video-container__controls__buttons--button"
  );
  buttonsDiv.append(fullscreenButton);

  const fullscreenIcon = document.createElement("span");
  fullscreenIcon.classList.add(
    "video-container__controls__buttons__icon",
    "qd-icon",
    "qd-icon--fullscreen"
  );
  fullscreenButton.append(fullscreenIcon);

  const modalVideoElem = document.createElement("video");
  modalVideoElem.classList.add("video-container__video");
  modalVideoElem.setAttribute("playsinline", "");
  modalVideoElem.setAttribute("webkit-playsinline", "");
  modalVideoElem.setAttribute("muted", "true");
  modalVideoElem.setAttribute("autoplay", "");
  modalVideoElem.setAttribute("x-webkit-airplay", "allow");

  if (backgroundVideo) {
    const modalSourceElem = document.createElement("source");
    modalSourceElem.setAttribute("type", "video/mp4");
    modalSourceElem.src =
      backgroundVideo.href || backgroundVideo.textContent.trim();
    modalVideoElem.append(modalSourceElem);
  }
  videoContainer.append(modalVideoElem);
}
