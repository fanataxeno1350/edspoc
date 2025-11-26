import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {
  const rootDiv = document.createElement("div");
  rootDiv.className = "hero-full-width parallax-child-2 hero-in-view";
  rootDiv.setAttribute("data-media-type", "videoTypeSelected");
  rootDiv.setAttribute("aria-hidden", "true");

  const coverDiv = document.createElement("div");
  coverDiv.className = "hero-full-width__cover";
  rootDiv.append(coverDiv);

  const backgroundDiv = document.createElement("div");
  backgroundDiv.className = "hero-full-width__background";
  rootDiv.append(backgroundDiv);

  const backgroundWrapper = document.createElement("div");
  backgroundWrapper.className = "hero-full-width__background-wrapper zoom-out";
  backgroundDiv.append(backgroundWrapper);

  const backgroundVideo = document.createElement("video");
  backgroundVideo.className = "hero-full-width__background-video";
  backgroundVideo.setAttribute("aria-hidden", "true");
  backgroundVideo.setAttribute("playsinline", "");
  backgroundVideo.setAttribute("muted", "");
  backgroundVideo.setAttribute("loop", "");
  backgroundVideo.setAttribute("autoplay", "");

  const backgroundVideoSource = document.createElement("source");
  backgroundVideoSource.setAttribute("type", "video/mp4");

  const authoredBackgroundVideo = block.querySelector(
    '[data-aue-prop="backgroundVideo"]'
  );
  if (authoredBackgroundVideo) {
    let videoSrc =
      authoredBackgroundVideo.getAttribute("href") ||
      authoredBackgroundVideo.textContent.trim();
    if (!videoSrc && authoredBackgroundVideo.querySelector("source")) {
      videoSrc = authoredBackgroundVideo.querySelector("source").src;
    }
    if (videoSrc) {
      backgroundVideoSource.src = videoSrc;
      moveInstrumentation(authoredBackgroundVideo, backgroundVideoSource);
    }
  }
  backgroundVideo.append(backgroundVideoSource);
  backgroundWrapper.append(backgroundVideo);

  const backgroundPoster = document.createElement("img");
  backgroundPoster.alt = "Background poster image";
  backgroundPoster.loading = "lazy";
  backgroundPoster.className = "hero-full-width__background-poster";
  backgroundPoster.style.display = "none";
  backgroundPoster.setAttribute("aria-hidden", "true");
  backgroundWrapper.append(backgroundPoster);

  const contentDiv = document.createElement("div");
  contentDiv.className = "hero-full-width__content";
  rootDiv.append(contentDiv);

  // Title and Description
  const slideWrap1 = document.createElement("div");
  slideWrap1.className = "slide-wrap";
  contentDiv.append(slideWrap1);

  const slideUp1 = document.createElement("div");
  slideUp1.setAttribute("data-slide-type", "slide-up");
  slideUp1.className = "slide-up";
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement("div");
  titleDiv.className = "hero-full-width__content__title";
  titleDiv.setAttribute("tabindex", "0");
  const authoredTitle = block.querySelector('[data-aue-prop="title"]');
  if (authoredTitle) {
    titleDiv.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, titleDiv);
    rootDiv.setAttribute("aria-label", authoredTitle.textContent.trim());
    backgroundVideo.setAttribute(
      "aria-label",
      authoredTitle.textContent.trim()
    );
  }
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "hero-full-width__content__description";
  descriptionDiv.setAttribute("tabindex", "0");
  const authoredDescription = block.querySelector(
    '[data-aue-prop="description"]'
  );
  if (authoredDescription) {
    descriptionDiv.append(...authoredDescription.childNodes);
    moveInstrumentation(authoredDescription, descriptionDiv);
  }
  slideUp1.append(descriptionDiv);

  // CTAs
  const slideWrap2 = document.createElement("div");
  slideWrap2.className = "slide-wrap";
  contentDiv.append(slideWrap2);

  const slideUp2 = document.createElement("div");
  slideUp2.setAttribute("data-slide-type", "slide-up");
  slideUp2.className = "slide-up";
  slideWrap2.append(slideUp2);

  const ctasDiv = document.createElement("div");
  ctasDiv.className = "hero-full-width__content--ctas";
  slideUp2.append(ctasDiv);

  const primaryCta = document.createElement("a");
  primaryCta.className = "cta cta__secondary primaryCta ";
  primaryCta.setAttribute("target", "_self");
  primaryCta.setAttribute("data-palette", "palette-light");
  const primaryCtaLabelSpan = document.createElement("span");
  primaryCtaLabelSpan.className = "cta__label";

  const authoredPrimaryCtaLabel = block.querySelector(
    '[data-aue-prop="primaryCtaLabel"]'
  );
  const authoredPrimaryCtaLink = block.querySelector(
    '[data-aue-prop="primaryCtaLink"]'
  );

  if (authoredPrimaryCtaLabel) {
    primaryCtaLabelSpan.append(...authoredPrimaryCtaLabel.childNodes);
    moveInstrumentation(authoredPrimaryCtaLabel, primaryCtaLabelSpan);
    primaryCta.setAttribute(
      "aria-label",
      authoredPrimaryCtaLabel.textContent.trim()
    );
  }
  if (authoredPrimaryCtaLink) {
    primaryCta.href =
      authoredPrimaryCtaLink.getAttribute("href") ||
      authoredPrimaryCtaLink.textContent.trim();
    moveInstrumentation(authoredPrimaryCtaLink, primaryCta);
  }
  primaryCta.append(primaryCtaLabelSpan);
  ctasDiv.append(primaryCta);

  const chevronWrapper = document.createElement("div");
  chevronWrapper.className = "chevron-wrapper";
  ctasDiv.append(chevronWrapper);

  const chevronButton = document.createElement("button");
  chevronButton.type = "button";
  chevronButton.className = "chevron-icon";
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  const secondaryCta = document.createElement("a");
  secondaryCta.href = "#";
  secondaryCta.className = "cta cta__link secondaryCta ";
  secondaryCta.setAttribute("target", "_self");
  secondaryCta.setAttribute("data-palette", "palette-light");
  const secondaryCtaIcon = document.createElement("span");
  secondaryCtaIcon.className = "cta__icon qd-icon qd-icon--cheveron-right";
  secondaryCtaIcon.setAttribute("aria-hidden", "true");
  const secondaryCtaLabelSpan = document.createElement("span");
  secondaryCtaLabelSpan.className = "cta__label";

  const authoredSecondaryCtaLabel = block.querySelector(
    '[data-aue-prop="secondaryCtaLabel"]'
  );
  const authoredSecondaryCtaLink = block.querySelector(
    '[data-aue-prop="secondaryCtaLink"]'
  );

  if (authoredSecondaryCtaLabel) {
    secondaryCtaLabelSpan.append(...authoredSecondaryCtaLabel.childNodes);
    moveInstrumentation(authoredSecondaryCtaLabel, secondaryCtaLabelSpan);
    secondaryCta.setAttribute(
      "aria-label",
      authoredSecondaryCtaLabel.textContent.trim()
    );
  }
  if (authoredSecondaryCtaLink) {
    secondaryCta.href =
      authoredSecondaryCtaLink.getAttribute("href") ||
      authoredSecondaryCtaLink.textContent.trim();
    moveInstrumentation(authoredSecondaryCtaLink, secondaryCta);
  }
  secondaryCta.append(secondaryCtaIcon, secondaryCtaLabelSpan);
  chevronWrapper.append(secondaryCta);

  // Modal Dialog
  const dialog = document.createElement("dialog");
  dialog.className = "hero-full-width__content--modal";
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");
  contentDiv.append(dialog);

  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  dialog.append(form);

  const closeButton = document.createElement("button");
  closeButton.className = "hero-full-width__content--modal__close-button";
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  form.append(closeButton);

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

  const modalVideo = document.createElement("video");
  modalVideo.className = "video-container__video";
  modalVideo.setAttribute("playsinline", "");
  modalVideo.setAttribute("webkit-playsinline", "");
  modalVideo.setAttribute("muted", "true");
  modalVideo.setAttribute("autoplay", "");
  const modalVideoSource = document.createElement("source");
  modalVideoSource.setAttribute("type", "video/mp4");

  if (authoredBackgroundVideo) {
    // Re-use the same authored video for the modal
    let videoSrc =
      authoredBackgroundVideo.getAttribute("href") ||
      authoredBackgroundVideo.textContent.trim();
    if (!videoSrc && authoredBackgroundVideo.querySelector("source")) {
      videoSrc = authoredBackgroundVideo.querySelector("source").src;
    }
    if (videoSrc) {
      modalVideoSource.src = videoSrc;
      // Instrumentation for the modal video source can be tricky if it's the same as background.
      // For now, only move instrumentation once to the background video source.
    }
  }
  modalVideo.append(modalVideoSource);
  videoContainer.append(modalVideo);

  block.textContent = "";
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
