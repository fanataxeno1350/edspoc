import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {
  const heroFullWidth = document.createElement("div");
  heroFullWidth.className = "hero-full-width parallax-child-2 hero-in-view";
  heroFullWidth.setAttribute("data-media-type", "videoTypeSelected");
  heroFullWidth.setAttribute("aria-hidden", "true");

  const cover = document.createElement("div");
  cover.className = "hero-full-width__cover";
  heroFullWidth.append(cover);

  const background = document.createElement("div");
  background.className = "hero-full-width__background";
  heroFullWidth.append(background);

  const backgroundWrapper = document.createElement("div");
  backgroundWrapper.className = "hero-full-width__background-wrapper zoom-out";
  background.append(backgroundWrapper);

  const backgroundVideo = document.createElement("video");
  backgroundVideo.className = "hero-full-width__background-video";
  backgroundVideo.setAttribute("aria-hidden", "true");
  backgroundVideo.setAttribute("playsinline", "");
  backgroundVideo.setAttribute("muted", "");
  backgroundVideo.setAttribute("loop", "");
  backgroundVideo.setAttribute("autoplay", "");
  backgroundWrapper.append(backgroundVideo);

  const backgroundVideoSource = document.createElement("source");
  backgroundVideoSource.setAttribute("type", "video/mp4");

  const authoredBackgroundVideo = block.querySelector(
    '[data-aue-prop="backgroundVideo"]'
  );
  if (authoredBackgroundVideo) {
    const videoLink = authoredBackgroundVideo.querySelector("a");
    if (videoLink) {
      backgroundVideoSource.setAttribute("src", videoLink.href);
      moveInstrumentation(authoredBackgroundVideo, backgroundVideoSource);
    } else {
      backgroundVideoSource.setAttribute(
        "src",
        authoredBackgroundVideo.textContent.trim()
      );
      moveInstrumentation(authoredBackgroundVideo, backgroundVideoSource);
    }
  }
  backgroundVideo.append(backgroundVideoSource);

  const backgroundPoster = document.createElement("img");
  backgroundPoster.alt = "Background poster image";
  backgroundPoster.loading = "lazy";
  backgroundPoster.className = "hero-full-width__background-poster";
  backgroundPoster.style.display = "none";
  backgroundPoster.setAttribute("aria-hidden", "true");
  backgroundWrapper.append(backgroundPoster);

  const content = document.createElement("div");
  content.className = "hero-full-width__content";
  heroFullWidth.append(content);

  // Title and Description
  const titleSlideWrap = document.createElement("div");
  titleSlideWrap.className = "slide-wrap";
  content.append(titleSlideWrap);

  const titleSlideUp = document.createElement("div");
  titleSlideUp.setAttribute("data-slide-type", "slide-up");
  titleSlideUp.className = "slide-up";
  titleSlideWrap.append(titleSlideUp);

  const titleDiv = document.createElement("div");
  titleDiv.className = "hero-full-width__content__title";
  titleDiv.setAttribute("tabindex", "0");
  const authoredTitle = block.querySelector('[data-aue-prop="title"]');
  if (authoredTitle) {
    titleDiv.append(...authoredTitle.childNodes);
    moveInstrumentation(authoredTitle, titleDiv);
  }
  titleSlideUp.append(titleDiv);

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
  titleSlideUp.append(descriptionDiv);

  // CTAs
  const ctaSlideWrap = document.createElement("div");
  ctaSlideWrap.className = "slide-wrap";
  content.append(ctaSlideWrap);

  const ctaSlideUp = document.createElement("div");
  ctaSlideUp.setAttribute("data-slide-type", "slide-up");
  ctaSlideUp.className = "slide-up";
  ctaSlideWrap.append(ctaSlideUp);

  const ctasDiv = document.createElement("div");
  ctasDiv.className = "hero-full-width__content--ctas";
  ctaSlideUp.append(ctasDiv);

  // Primary CTA
  const primaryCtaLink = document.createElement("a");
  primaryCtaLink.className = "cta cta__secondary primaryCta ";
  primaryCtaLink.setAttribute("target", "_self");
  primaryCtaLink.setAttribute("data-palette", "palette-light");

  const authoredPrimaryCtaLink = block.querySelector(
    '[data-aue-prop="primaryCtaLink"]'
  );
  if (authoredPrimaryCtaLink) {
    primaryCtaLink.href = authoredPrimaryCtaLink.textContent.trim();
    moveInstrumentation(authoredPrimaryCtaLink, primaryCtaLink);
  }

  const primaryCtaLabelSpan = document.createElement("span");
  primaryCtaLabelSpan.className = "cta__label";
  const authoredPrimaryCtaLabel = block.querySelector(
    '[data-aue-prop="primaryCtaLabel"]'
  );
  if (authoredPrimaryCtaLabel) {
    primaryCtaLabelSpan.append(...authoredPrimaryCtaLabel.childNodes);
    primaryCtaLink.setAttribute(
      "aria-label",
      authoredPrimaryCtaLabel.textContent.trim()
    );
    moveInstrumentation(authoredPrimaryCtaLabel, primaryCtaLabelSpan);
  }
  primaryCtaLink.append(primaryCtaLabelSpan);
  ctasDiv.append(primaryCtaLink);

  // Secondary CTA (Watch Video)
  const chevronWrapper = document.createElement("div");
  chevronWrapper.className = "chevron-wrapper";
  ctasDiv.append(chevronWrapper);

  const chevronButton = document.createElement("button");
  chevronButton.type = "button";
  chevronButton.className = "chevron-icon";
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  const secondaryCtaLink = document.createElement("a");
  secondaryCtaLink.className = "cta cta__link secondaryCta ";
  secondaryCtaLink.setAttribute("target", "_self");
  secondaryCtaLink.setAttribute("data-palette", "palette-light");

  const authoredSecondaryCtaLink = block.querySelector(
    '[data-aue-prop="secondaryCtaLink"]'
  );
  if (authoredSecondaryCtaLink) {
    secondaryCtaLink.href = authoredSecondaryCtaLink.textContent.trim();
    moveInstrumentation(authoredSecondaryCtaLink, secondaryCtaLink);
  } else {
    secondaryCtaLink.href = "#"; // Default if not provided
  }

  const secondaryCtaIcon = document.createElement("span");
  secondaryCtaIcon.className = "cta__icon qd-icon qd-icon--cheveron-right";
  secondaryCtaIcon.setAttribute("aria-hidden", "true");
  secondaryCtaLink.append(secondaryCtaIcon);

  const secondaryCtaLabelSpan = document.createElement("span");
  secondaryCtaLabelSpan.className = "cta__label";
  const authoredSecondaryCtaLabel = block.querySelector(
    '[data-aue-prop="secondaryCtaLabel"]'
  );
  if (authoredSecondaryCtaLabel) {
    secondaryCtaLabelSpan.append(...authoredSecondaryCtaLabel.childNodes);
    secondaryCtaLink.setAttribute(
      "aria-label",
      authoredSecondaryCtaLabel.textContent.trim()
    );
    moveInstrumentation(authoredSecondaryCtaLabel, secondaryCtaLabelSpan);
  }
  secondaryCtaLink.append(secondaryCtaLabelSpan);
  chevronWrapper.append(secondaryCtaLink);

  // Video Modal
  const dialog = document.createElement("dialog");
  dialog.className = "hero-full-width__content--modal";
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");
  content.append(dialog);

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

  const videoControls = document.createElement("div");
  videoControls.className = "video-container__controls";
  videoContainer.append(videoControls);

  const timerDiv = document.createElement("div");
  timerDiv.className = "video-container__controls__timer";
  videoControls.append(timerDiv);

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

  const controlsButtons = document.createElement("div");
  controlsButtons.className = "video-container__controls__buttons";
  videoControls.append(controlsButtons);

  const playButton = document.createElement("button");
  playButton.className =
    "video-container__controls__buttons__play-button video-container__controls__buttons--button";
  controlsButtons.append(playButton);

  const playIcon = document.createElement("span");
  playIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--play";
  playButton.append(playIcon);

  const muteButton = document.createElement("button");
  muteButton.className =
    "video-container__controls__buttons__mute-button video-container__controls__buttons--button";
  controlsButtons.append(muteButton);

  const muteIcon = document.createElement("span");
  muteIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--volume";
  muteButton.append(muteIcon);

  const fullscreenButton = document.createElement("button");
  fullscreenButton.className =
    "video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button";
  controlsButtons.append(fullscreenButton);

  const fullscreenIcon = document.createElement("span");
  fullscreenIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--fullscreen";
  fullscreenButton.append(fullscreenIcon);

  const modalVideo = document.createElement("video");
  modalVideo.className = "video-container__video";
  modalVideo.setAttribute("playsinline", "");
  modalVideo.setAttribute("webkit-playsinline", "");
  modalVideo.setAttribute("muted", "true");
  modalVideo.setAttribute("autoplay", "");
  modalVideo.setAttribute("x-webkit-airplay", "allow");
  videoContainer.append(modalVideo);

  const modalVideoSource = document.createElement("source");
  modalVideoSource.setAttribute("type", "video/mp4");

  if (authoredBackgroundVideo) {
    const videoLink = authoredBackgroundVideo.querySelector("a");
    if (videoLink) {
      modalVideoSource.setAttribute("src", videoLink.href);
    } else {
      modalVideoSource.setAttribute(
        "src",
        authoredBackgroundVideo.textContent.trim()
      );
    }
    // No need to move instrumentation again as it's already moved to backgroundVideoSource
  }
  modalVideo.append(modalVideoSource);

  // Set aria-label for the main block based on the title
  if (titleDiv.textContent.trim()) {
    heroFullWidth.setAttribute("aria-label", titleDiv.innerHTML.trim());
    backgroundVideo.setAttribute("aria-label", titleDiv.innerHTML.trim());
  }

  block.textContent = "";
  block.append(heroFullWidth);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
