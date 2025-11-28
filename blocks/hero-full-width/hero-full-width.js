import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const heroFullWidth = document.createElement("div");
  heroFullWidth.classList.add(
    "hero-full-width",
    "parallax-child-2",
    "hero-in-view"
  );
  heroFullWidth.setAttribute("data-media-type", "videoTypeSelected");
  heroFullWidth.setAttribute("aria-hidden", "true");

  const cover = document.createElement("div");
  cover.classList.add("hero-full-width__cover");
  heroFullWidth.append(cover);

  const background = document.createElement("div");
  background.classList.add("hero-full-width__background");
  heroFullWidth.append(background);

  const backgroundWrapper = document.createElement("div");
  backgroundWrapper.classList.add(
    "hero-full-width__background-wrapper",
    "zoom-out"
  );
  background.append(backgroundWrapper);

  const backgroundVideo = document.createElement("video");
  backgroundVideo.classList.add("hero-full-width__background-video");
  backgroundVideo.setAttribute("aria-hidden", "true");
  backgroundVideo.setAttribute("playsinline", "");
  backgroundVideo.setAttribute("muted", "");
  backgroundVideo.setAttribute("loop", "");
  backgroundVideo.setAttribute("autoplay", "");
  backgroundWrapper.append(backgroundVideo);

  const backgroundPoster = document.createElement("img");
  backgroundPoster.classList.add("hero-full-width__background-poster");
  backgroundPoster.setAttribute("alt", "Background poster image");
  backgroundPoster.setAttribute("loading", "lazy");
  backgroundPoster.setAttribute("style", "display:none;");
  backgroundPoster.setAttribute("aria-hidden", "true");
  backgroundWrapper.append(backgroundPoster);

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("hero-full-width__content");
  heroFullWidth.append(contentDiv);

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

  const videoControls = document.createElement("div");
  videoControls.classList.add("video-container__controls");
  videoContainer.append(videoControls);

  const timer = document.createElement("div");
  timer.classList.add("video-container__controls__timer");
  videoControls.append(timer);

  const progressArea = document.createElement("div");
  progressArea.classList.add("video-container__controls__timer__progress-area");
  timer.append(progressArea);

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
  timer.append(currentTime);

  const duration = document.createElement("p");
  duration.classList.add("video-container__controls__timer__duration");
  duration.textContent = "00:00";
  timer.append(duration);

  const controlsButtons = document.createElement("div");
  controlsButtons.classList.add("video-container__controls__buttons");
  videoControls.append(controlsButtons);

  const playButton = document.createElement("button");
  playButton.classList.add(
    "video-container__controls__buttons__play-button",
    "video-container__controls__buttons--button"
  );
  controlsButtons.append(playButton);

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
  controlsButtons.append(muteButton);

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
  controlsButtons.append(fullscreenButton);

  const fullscreenIcon = document.createElement("span");
  fullscreenIcon.classList.add(
    "video-container__controls__buttons__icon",
    "qd-icon",
    "qd-icon--fullscreen"
  );
  fullscreenButton.append(fullscreenIcon);

  const modalVideo = document.createElement("video");
  modalVideo.classList.add("video-container__video");
  modalVideo.setAttribute("playsinline", "");
  modalVideo.setAttribute("webkit-playsinline", "");
  modalVideo.setAttribute("muted", "true");
  modalVideo.setAttribute("autoplay", "");
  videoContainer.append(modalVideo);

  const rows = [...block.children];

  // Background Video
  const backgroundVideoRow = rows[0];
  if (backgroundVideoRow) {
    const videoCell = backgroundVideoRow.children[0];
    let videoLink = videoCell.querySelector("a");
    if (!videoLink) {
      videoLink = videoCell;
    }
    if (videoLink) {
      const source = document.createElement("source");
      source.setAttribute(
        "src",
        videoLink.href || videoLink.textContent.trim()
      );
      source.setAttribute("type", "video/mp4");
      backgroundVideo.append(source);
      modalVideo.append(source.cloneNode(true)); // Clone for the modal video
      moveInstrumentation(videoLink, source);
    }
    backgroundVideoRow.remove();
  }

  // Title
  const titleRow = rows[1];
  if (titleRow) {
    const titleCell = titleRow.children[0];
    const slideWrap = document.createElement("div");
    slideWrap.classList.add("slide-wrap");
    const slideUp = document.createElement("div");
    slideUp.classList.add("slide-up");
    slideUp.setAttribute("data-slide-type", "slide-up");
    slideWrap.append(slideUp);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("hero-full-width__content__title");
    titleDiv.setAttribute("tabindex", "0");
    slideUp.append(titleDiv);
    titleDiv.append(...titleCell.childNodes);
    moveInstrumentation(titleCell, titleDiv);

    contentDiv.append(slideWrap);
    heroFullWidth.setAttribute("aria-label", titleDiv.innerHTML);
    backgroundVideo.setAttribute("aria-label", titleDiv.innerHTML);
    titleRow.remove();
  }

  // Description
  const descriptionRow = rows[2];
  if (descriptionRow) {
    const descriptionCell = descriptionRow.children[0];
    const slideWrap = document.createElement("div");
    slideWrap.classList.add("slide-wrap");
    const slideUp = document.createElement("div");
    slideUp.classList.add("slide-up");
    slideUp.setAttribute("data-slide-type", "slide-up");
    slideWrap.append(slideUp);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("hero-full-width__content__description");
    descriptionDiv.setAttribute("tabindex", "0");
    slideUp.append(descriptionDiv);
    descriptionDiv.append(...descriptionCell.childNodes);
    moveInstrumentation(descriptionCell, descriptionDiv);

    contentDiv.append(slideWrap);
    descriptionRow.remove();
  }

  // CTAs
  const ctaRow = rows[3];
  if (ctaRow) {
    const primaryCtaCell = ctaRow.children[0];
    const secondaryCtaCell = ctaRow.children[1];

    const slideWrap = document.createElement("div");
    slideWrap.classList.add("slide-wrap");
    const slideUp = document.createElement("div");
    slideUp.classList.add("slide-up");
    slideUp.setAttribute("data-slide-type", "slide-up");
    slideWrap.append(slideUp);

    const ctasDiv = document.createElement("div");
    ctasDiv.classList.add("hero-full-width__content--ctas");
    slideUp.append(ctasDiv);

    // Primary CTA
    const primaryCtaLink = primaryCtaCell.querySelector("a");
    if (primaryCtaLink) {
      const cta = document.createElement("a");
      cta.classList.add("cta", "cta__secondary", "primaryCta");
      cta.setAttribute("target", "_self");
      cta.setAttribute("data-palette", "palette-light");
      cta.href = primaryCtaLink.href;
      cta.setAttribute("aria-label", primaryCtaLink.textContent.trim());

      const ctaLabel = document.createElement("span");
      ctaLabel.classList.add("cta__label");
      ctaLabel.textContent = primaryCtaLink.textContent.trim();
      cta.append(ctaLabel);
      ctasDiv.append(cta);
      moveInstrumentation(primaryCtaLink, cta);
    }

    // Secondary CTA
    const secondaryCtaLink = secondaryCtaCell.querySelector("a");
    if (secondaryCtaLink) {
      const chevronWrapper = document.createElement("div");
      chevronWrapper.classList.add("chevron-wrapper");
      ctasDiv.append(chevronWrapper);

      const chevronButton = document.createElement("button");
      chevronButton.classList.add("chevron-icon");
      chevronButton.setAttribute("type", "button");
      chevronButton.setAttribute("aria-label", "Open video modal");
      chevronWrapper.append(chevronButton);

      const cta = document.createElement("a");
      cta.classList.add("cta", "cta__link", "secondaryCta");
      cta.setAttribute("target", "_self");
      cta.setAttribute("data-palette", "palette-light");
      cta.href = secondaryCtaLink.href;
      cta.setAttribute("aria-label", secondaryCtaLink.textContent.trim());

      const ctaIcon = document.createElement("span");
      ctaIcon.classList.add("cta__icon", "qd-icon", "qd-icon--cheveron-right");
      ctaIcon.setAttribute("aria-hidden", "true");
      cta.append(ctaIcon);

      const ctaLabel = document.createElement("span");
      ctaLabel.classList.add("cta__label");
      ctaLabel.textContent = secondaryCtaLink.textContent.trim();
      cta.append(ctaLabel);
      chevronWrapper.append(cta);
      moveInstrumentation(secondaryCtaLink, cta);
    }

    contentDiv.append(slideWrap);
    ctaRow.remove();
  }

  block.textContent = "";
  block.append(heroFullWidth);
}
