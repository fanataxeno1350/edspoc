import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {
  const heroFullWidthDiv = document.createElement("div");
  heroFullWidthDiv.className = "hero-full-width parallax-child-2 hero-in-view";
  heroFullWidthDiv.dataset.mediaType = "videoTypeSelected";
  heroFullWidthDiv.setAttribute("aria-hidden", "true");

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

  // Create hero-full-width__cover
  const coverDiv = document.createElement("div");
  coverDiv.className = "hero-full-width__cover";
  heroFullWidthDiv.append(coverDiv);

  // Create hero-full-width__background
  const backgroundDiv = document.createElement("div");
  backgroundDiv.className = "hero-full-width__background";
  heroFullWidthDiv.append(backgroundDiv);

  const backgroundWrapper = document.createElement("div");
  backgroundWrapper.className = "hero-full-width__background-wrapper zoom-out";
  backgroundDiv.append(backgroundWrapper);

  // Create video element for background
  const backgroundVideoElement = document.createElement("video");
  backgroundVideoElement.className = "hero-full-width__background-video";
  backgroundVideoElement.setAttribute("aria-hidden", "true");
  backgroundVideoElement.setAttribute("playsinline", "");
  backgroundVideoElement.setAttribute("muted", "");
  backgroundVideoElement.setAttribute("loop", "");
  backgroundVideoElement.setAttribute("autoplay", "");

  if (backgroundVideo) {
    console.log("adding source")
    const source = document.createElement("source");
    source.src = backgroundVideo.textContent.trim();
    source.type = "video/mp4";
    backgroundVideoElement.append(source);
    moveInstrumentation(backgroundVideo, source);
  } else {
    console.log("not adding source")
    console.log(backgroundVideo)
  }
  backgroundWrapper.append(backgroundVideoElement);

  // Create background poster image (hidden)
  const posterImg = document.createElement("img");
  posterImg.alt = "Background poster image";
  posterImg.loading = "lazy";
  posterImg.className = "hero-full-width__background-poster";
  posterImg.style.display = "none";
  posterImg.setAttribute("aria-hidden", "true");
  backgroundWrapper.append(posterImg);

  // Create hero-full-width__content
  const contentDiv = document.createElement("div");
  contentDiv.className = "hero-full-width__content";
  heroFullWidthDiv.append(contentDiv);

  // Slide-wrap for title and description
  const slideWrap1 = document.createElement("div");
  slideWrap1.className = "slide-wrap";
  contentDiv.append(slideWrap1);

  const slideUp1 = document.createElement("div");
  slideUp1.dataset.slideType = "slide-up";
  slideUp1.className = "slide-up";
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement("div");
  titleDiv.className = "hero-full-width__content__title";
  titleDiv.setAttribute("tabindex", "0");
  if (title) {
    titleDiv.append(...title.childNodes);
    moveInstrumentation(title, titleDiv);
  }
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "hero-full-width__content__description";
  descriptionDiv.setAttribute("tabindex", "0");
  if (description) {
    descriptionDiv.append(...description.childNodes);
    moveInstrumentation(description, descriptionDiv);
  }
  slideUp1.append(descriptionDiv);

  // Slide-wrap for CTAs
  const slideWrap2 = document.createElement("div");
  slideWrap2.className = "slide-wrap";
  contentDiv.append(slideWrap2);

  const slideUp2 = document.createElement("div");
  slideUp2.dataset.slideType = "slide-up";
  slideUp2.className = "slide-up";
  slideWrap2.append(slideUp2);

  const ctasDiv = document.createElement("div");
  ctasDiv.className = "hero-full-width__content--ctas";
  slideUp2.append(ctasDiv);

  // Primary CTA
  const primaryCta = document.createElement("a");
  primaryCta.className = "cta cta__secondary primaryCta ";
  primaryCta.target = "_self";
  primaryCta.dataset.palette = "palette-light";
  if (primaryCtaLink) {
    primaryCta.href = primaryCtaLink.textContent.trim();
    moveInstrumentation(primaryCtaLink, primaryCta);
  }
  if (primaryCtaLabel) {
    const primaryCtaSpan = document.createElement("span");
    primaryCtaSpan.className = "cta__label";
    primaryCtaSpan.append(...primaryCtaLabel.childNodes);
    primaryCta.append(primaryCtaSpan);
    primaryCta.setAttribute("aria-label", primaryCtaSpan.textContent.trim());
    moveInstrumentation(primaryCtaLabel, primaryCtaSpan);
  }
  ctasDiv.append(primaryCta);

  // Chevron wrapper for secondary CTA
  const chevronWrapper = document.createElement("div");
  chevronWrapper.className = "chevron-wrapper";
  ctasDiv.append(chevronWrapper);

  const chevronButton = document.createElement("button");
  chevronButton.type = "button";
  chevronButton.className = "chevron-icon";
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  const secondaryCta = document.createElement("a");
  secondaryCta.href = "#"; // Default href
  secondaryCta.className = "cta cta__link secondaryCta ";
  secondaryCta.target = "_self";
  secondaryCta.dataset.palette = "palette-light";
  if (secondaryCtaLink) {
    secondaryCta.href = secondaryCtaLink.textContent.trim();
    moveInstrumentation(secondaryCtaLink, secondaryCta);
  }
  const secondaryCtaIcon = document.createElement("span");
  secondaryCtaIcon.className = "cta__icon qd-icon qd-icon--cheveron-right";
  secondaryCtaIcon.setAttribute("aria-hidden", "true");
  secondaryCta.append(secondaryCtaIcon);

  if (secondaryCtaLabel) {
    const secondaryCtaSpan = document.createElement("span");
    secondaryCtaSpan.className = "cta__label";
    secondaryCtaSpan.append(...secondaryCtaLabel.childNodes);
    secondaryCta.append(secondaryCtaSpan);
    secondaryCta.setAttribute(
      "aria-label",
      secondaryCtaSpan.textContent.trim()
    );
    moveInstrumentation(secondaryCtaLabel, secondaryCtaSpan);
  }
  chevronWrapper.append(secondaryCta);

  // Video modal dialog
  const dialog = document.createElement("dialog");
  dialog.className = "hero-full-width__content--modal";
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");
  contentDiv.append(dialog);

  const dialogForm = document.createElement("form");
  dialogForm.method = "dialog";
  dialog.append(dialogForm);

  const closeButton = document.createElement("button");
  closeButton.className = "hero-full-width__content--modal__close-button";
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  dialogForm.append(closeButton);

  const videoModalDiv = document.createElement("div");
  videoModalDiv.className = "video hero-full-width__content--modal__video";
  dialog.append(videoModalDiv);

  const videoContainer = document.createElement("div");
  videoContainer.className = "video-container show-controls ";
  videoModalDiv.append(videoContainer);

  const controlsDiv = document.createElement("div");
  controlsDiv.className = "video-container__controls";
  videoContainer.append(controlsDiv);

  const timerDiv = document.createElement("div");
  timerDiv.className = "video-container__controls__timer";
  controlsDiv.append(timerDiv);

  const progressArea = document.createElement("div");
  progressArea.className = "video-container__controls__timer__progress-area";
  timerDiv.append(progressArea);

  const progressBar = document.createElement("span");
  progressBar.className =
    "video-container__controls__timer__progress-area__progress-bar";
  progressArea.append(progressBar);

  const pointer = document.createElement("span");
  pointer.className =
    "video-container__controls__timer__progress-area__pointer";
  progressArea.append(pointer);

  const progressPending = document.createElement("span");
  progressPending.className =
    "video-container__controls__timer__progress-area__progress-pending";
  progressArea.append(progressPending);

  const currentTime = document.createElement("p");
  currentTime.className = "video-container__controls__timer__current-time";
  currentTime.textContent = "00:00";
  timerDiv.append(currentTime);

  const duration = document.createElement("p");
  duration.className = "video-container__controls__timer__duration";
  duration.textContent = "00:00";
  timerDiv.append(duration);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "video-container__controls__buttons";
  controlsDiv.append(buttonsDiv);

  const playButton = document.createElement("button");
  playButton.className =
    "video-container__controls__buttons__play-button video-container__controls__buttons--button";
  playButton.innerHTML =
    '<span class="video-container__controls__buttons__icon qd-icon qd-icon--play"></span>';
  buttonsDiv.append(playButton);

  const muteButton = document.createElement("button");
  muteButton.className =
    "video-container__controls__buttons__mute-button video-container__controls__buttons--button";
  muteButton.innerHTML =
    '<span class="video-container__controls__buttons__icon qd-icon qd-icon--volume"></span>';
  buttonsDiv.append(muteButton);

  const fullscreenButton = document.createElement("button");
  fullscreenButton.className =
    "video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button";
  fullscreenButton.innerHTML =
    '<span class="video-container__controls__buttons__icon qd-icon qd-icon--fullscreen"></span>';
  buttonsDiv.append(fullscreenButton);

  const modalVideoElement = document.createElement("video");
  modalVideoElement.className = "video-container__video";
  modalVideoElement.setAttribute("playsinline", "");
  modalVideoElement.setAttribute("webkit-playsinline", "");
  modalVideoElement.setAttribute("muted", "true");
  modalVideoElement.setAttribute("autoplay", "");
  if (backgroundVideo) {
    const modalSource = document.createElement("source");
    modalSource.src = backgroundVideo.textContent.trim();
    modalSource.type = "video/mp4";
    modalVideoElement.append(modalSource);
    // No new instrumentation needed for modalSource as it's a duplicate of backgroundVideo
  }
  modalVideoElement.innerHTML +=
    '\n                        webkit-playsinline\n                        x-webkit-airplay="allow"\n                    ';
  videoContainer.append(modalVideoElement);

  // Set aria-label for the main block and background video based on the title
  if (title) {
    const titleContent = title.innerHTML.trim();
    heroFullWidthDiv.setAttribute("aria-label", titleContent);
    backgroundVideoElement.setAttribute("aria-label", titleContent);
  }

  block.textContent = "";
  block.append(heroFullWidthDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
