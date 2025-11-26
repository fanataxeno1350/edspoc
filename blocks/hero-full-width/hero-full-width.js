import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {
  const heroFullWidthDiv = document.createElement("div");
  heroFullWidthDiv.className = "hero-full-width parallax-child-2 hero-in-view";
  heroFullWidthDiv.setAttribute("data-media-type", "videoTypeSelected");

  const backgroundVideo = block.querySelector(
    '[data-aue-prop="backgroundVideo"]'
  );
  const title = block.querySelector('[data-aue-prop="title"]');
  const description = block.querySelector('[data-aue-prop="description"]');
  const primaryCtaLabel = block.querySelector(
    '[data-aue-prop="primaryCtaLabel"]'
  );
  const primaryCtaLink = block.querySelector(
    '[data-aue-prop="primaryCtaLink"]'
  );
  const secondaryCtaLabel = block.querySelector(
    '[data-aue-prop="secondaryCtaLabel"]'
  );
  const secondaryCtaLink = block.querySelector(
    '[data-aue-prop="secondaryCtaLink"]'
  );

  // aria-label for the main div
  if (title) {
    heroFullWidthDiv.setAttribute("aria-label", title.innerHTML.trim());
    heroFullWidthDiv.setAttribute("aria-hidden", "true");
  }

  const coverDiv = document.createElement("div");
  coverDiv.className = "hero-full-width__cover";
  heroFullWidthDiv.append(coverDiv);

  const backgroundDiv = document.createElement("div");
  backgroundDiv.className = "hero-full-width__background";
  heroFullWidthDiv.append(backgroundDiv);

  const backgroundWrapperDiv = document.createElement("div");
  backgroundWrapperDiv.className =
    "hero-full-width__background-wrapper zoom-out";
  backgroundDiv.append(backgroundWrapperDiv);

  if (backgroundVideo) {
    const videoElement = document.createElement("video");
    videoElement.className = "hero-full-width__background-video";
    videoElement.setAttribute("playsinline", "");
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("loop", "");
    videoElement.setAttribute("autoplay", "");
    if (title) {
      videoElement.setAttribute("aria-label", title.innerHTML.trim());
      videoElement.setAttribute("aria-hidden", "true");
    }

    const sourceElement = document.createElement("source");
    sourceElement.setAttribute("src", backgroundVideo.textContent.trim());
    sourceElement.setAttribute("type", "video/mp4");
    videoElement.append(sourceElement);
    moveInstrumentation(backgroundVideo, sourceElement);
    backgroundWrapperDiv.append(videoElement);
  }

  const posterImg = document.createElement("img");
  posterImg.setAttribute("alt", "Background poster image");
  posterImg.setAttribute("loading", "lazy");
  posterImg.className = "hero-full-width__background-poster";
  posterImg.style.display = "none";
  posterImg.setAttribute("aria-hidden", "true");
  backgroundWrapperDiv.append(posterImg);

  const contentDiv = document.createElement("div");
  contentDiv.className = "hero-full-width__content";
  heroFullWidthDiv.append(contentDiv);

  // Title and Description
  const slideWrap1 = document.createElement("div");
  slideWrap1.className = "slide-wrap";
  const slideUp1 = document.createElement("div");
  slideUp1.setAttribute("data-slide-type", "slide-up");
  slideUp1.className = "slide-up";
  slideWrap1.append(slideUp1);
  contentDiv.append(slideWrap1);

  if (title) {
    const titleDiv = document.createElement("div");
    titleDiv.className = "hero-full-width__content__title";
    titleDiv.setAttribute("tabindex", "0");
    titleDiv.append(...title.childNodes);
    moveInstrumentation(title, titleDiv);
    slideUp1.append(titleDiv);
  }

  if (description) {
    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "hero-full-width__content__description";
    descriptionDiv.setAttribute("tabindex", "0");
    descriptionDiv.append(...description.childNodes);
    moveInstrumentation(description, descriptionDiv);
    slideUp1.append(descriptionDiv);
  }

  // CTAs
  const slideWrap2 = document.createElement("div");
  slideWrap2.className = "slide-wrap";
  const slideUp2 = document.createElement("div");
  slideUp2.setAttribute("data-slide-type", "slide-up");
  slideUp2.className = "slide-up";
  slideWrap2.append(slideUp2);
  contentDiv.append(slideWrap2);

  const ctasDiv = document.createElement("div");
  ctasDiv.className = "hero-full-width__content--ctas";
  slideUp2.append(ctasDiv);

  if (primaryCtaLink && primaryCtaLabel) {
    const primaryCta = document.createElement("a");
    primaryCta.className = "cta cta__secondary primaryCta ";
    primaryCta.setAttribute("target", "_self");
    primaryCta.setAttribute("data-palette", "palette-light");
    primaryCta.setAttribute("href", primaryCtaLink.textContent.trim());
    primaryCta.setAttribute("aria-label", primaryCtaLabel.textContent.trim());

    const primaryCtaSpan = document.createElement("span");
    primaryCtaSpan.className = "cta__label";
    primaryCtaSpan.append(...primaryCtaLabel.childNodes);
    moveInstrumentation(primaryCtaLabel, primaryCtaSpan);
    primaryCta.append(primaryCtaSpan);
    moveInstrumentation(primaryCtaLink, primaryCta);
    ctasDiv.append(primaryCta);
  }

  const chevronWrapperDiv = document.createElement("div");
  chevronWrapperDiv.className = "chevron-wrapper";
  ctasDiv.append(chevronWrapperDiv);

  const chevronButton = document.createElement("button");
  chevronButton.setAttribute("type", "button");
  chevronButton.className = "chevron-icon";
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapperDiv.append(chevronButton);

  if (secondaryCtaLink && secondaryCtaLabel) {
    const secondaryCta = document.createElement("a");
    secondaryCta.className = "cta cta__link secondaryCta ";
    secondaryCta.setAttribute("target", "_self");
    secondaryCta.setAttribute("data-palette", "palette-light");
    secondaryCta.setAttribute("href", secondaryCtaLink.textContent.trim());
    secondaryCta.setAttribute(
      "aria-label",
      secondaryCtaLabel.textContent.trim()
    );

    const secondaryCtaIcon = document.createElement("span");
    secondaryCtaIcon.className = "cta__icon qd-icon qd-icon--cheveron-right";
    secondaryCtaIcon.setAttribute("aria-hidden", "true");
    secondaryCta.append(secondaryCtaIcon);

    const secondaryCtaSpan = document.createElement("span");
    secondaryCtaSpan.className = "cta__label";
    secondaryCtaSpan.append(...secondaryCtaLabel.childNodes);
    moveInstrumentation(secondaryCtaLabel, secondaryCtaSpan);
    secondaryCta.append(secondaryCtaSpan);
    moveInstrumentation(secondaryCtaLink, secondaryCta);
    chevronWrapperDiv.append(secondaryCta);
  }

  // Video Modal
  const dialogElement = document.createElement("dialog");
  dialogElement.className = "hero-full-width__content--modal";
  dialogElement.setAttribute("id", "home-page-video-dialog");
  dialogElement.setAttribute("closedby", "any");
  dialogElement.setAttribute("aria-modal", "true");
  dialogElement.setAttribute("aria-label", "Video Modal");
  contentDiv.append(dialogElement);

  const formElement = document.createElement("form");
  formElement.setAttribute("method", "dialog");
  dialogElement.append(formElement);

  const closeButton = document.createElement("button");
  closeButton.className = "hero-full-width__content--modal__close-button";
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  formElement.append(closeButton);

  const videoModalDiv = document.createElement("div");
  videoModalDiv.className = "video hero-full-width__content--modal__video";
  dialogElement.append(videoModalDiv);

  const videoContainerDiv = document.createElement("div");
  videoContainerDiv.className = "video-container show-controls ";
  videoModalDiv.append(videoContainerDiv);

  const controlsDiv = document.createElement("div");
  controlsDiv.className = "video-container__controls";
  videoContainerDiv.append(controlsDiv);

  const timerDiv = document.createElement("div");
  timerDiv.className = "video-container__controls__timer";
  controlsDiv.append(timerDiv);

  const progressAreaDiv = document.createElement("div");
  progressAreaDiv.className = "video-container__controls__timer__progress-area";
  timerDiv.append(progressAreaDiv);

  const progressBarSpan = document.createElement("span");
  progressBarSpan.className =
    "video-container__controls__timer__progress-area__progress-bar";
  progressAreaDiv.append(progressBarSpan);

  const pointerSpan = document.createElement("span");
  pointerSpan.className =
    "video-container__controls__timer__progress-area__pointer";
  progressAreaDiv.append(pointerSpan);

  const progressPendingSpan = document.createElement("span");
  progressPendingSpan.className =
    "video-container__controls__timer__progress-area__progress-pending";
  progressAreaDiv.append(progressPendingSpan);

  const currentTimeP = document.createElement("p");
  currentTimeP.className = "video-container__controls__timer__current-time";
  currentTimeP.textContent = "00:00";
  timerDiv.append(currentTimeP);

  const durationP = document.createElement("p");
  durationP.className = "video-container__controls__timer__duration";
  durationP.textContent = "00:00";
  timerDiv.append(durationP);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "video-container__controls__buttons";
  controlsDiv.append(buttonsDiv);

  const playButton = document.createElement("button");
  playButton.className =
    "video-container__controls__buttons__play-button video-container__controls__buttons--button";
  const playIcon = document.createElement("span");
  playIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--play";
  playButton.append(playIcon);
  buttonsDiv.append(playButton);

  const muteButton = document.createElement("button");
  muteButton.className =
    "video-container__controls__buttons__mute-button video-container__controls__buttons--button";
  const muteIcon = document.createElement("span");
  muteIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--volume";
  muteButton.append(muteIcon);
  buttonsDiv.append(muteButton);

  const fullscreenButton = document.createElement("button");
  fullscreenButton.className =
    "video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button";
  const fullscreenIcon = document.createElement("span");
  fullscreenIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--fullscreen";
  fullscreenButton.append(fullscreenIcon);
  buttonsDiv.append(fullscreenButton);

  if (backgroundVideo) {
    const modalVideoElement = document.createElement("video");
    modalVideoElement.className = "video-container__video";
    modalVideoElement.setAttribute("playsinline", "");
    modalVideoElement.setAttribute("webkit-playsinline", "");
    modalVideoElement.setAttribute("muted", "true");
    modalVideoElement.setAttribute("autoplay", "");

    const modalSourceElement = document.createElement("source");
    modalSourceElement.setAttribute("src", backgroundVideo.textContent.trim());
    modalSourceElement.setAttribute("type", "video/mp4");
    modalVideoElement.append(modalSourceElement);
    // No moveInstrumentation for modalSourceElement as it's a duplicate of the background video source
    videoContainerDiv.append(modalVideoElement);
  }

  block.textContent = "";
  block.append(heroFullWidthDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
