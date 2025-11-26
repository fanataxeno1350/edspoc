import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {
  const heroFullWidth = document.createElement("div");
  heroFullWidth.classList.add(
    "hero-full-width",
    "parallax-child-2",
    "hero-in-view"
  );
  heroFullWidth.dataset.mediaType = "videoTypeSelected";

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

  // Determine aria-label from title
  let ariaLabelText = "";
  if (title) {
    const tempDiv = document.createElement("div");
    tempDiv.append(...title.childNodes);
    ariaLabelText = tempDiv.innerHTML;
    moveInstrumentation(title, tempDiv);
  }
  heroFullWidth.setAttribute("aria-label", ariaLabelText);
  heroFullWidth.setAttribute("aria-hidden", "true");

  const heroFullWidthCover = document.createElement("div");
  heroFullWidthCover.classList.add("hero-full-width__cover");
  heroFullWidth.append(heroFullWidthCover);

  const heroFullWidthBackground = document.createElement("div");
  heroFullWidthBackground.classList.add("hero-full-width__background");
  heroFullWidth.append(heroFullWidthBackground);

  const heroFullWidthBackgroundWrapper = document.createElement("div");
  heroFullWidthBackgroundWrapper.classList.add(
    "hero-full-width__background-wrapper",
    "zoom-out"
  );
  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);

  const backgroundVideoElement = document.createElement("video");
  backgroundVideoElement.classList.add("hero-full-width__background-video");
  backgroundVideoElement.setAttribute("aria-label", ariaLabelText);
  backgroundVideoElement.setAttribute("aria-hidden", "true");
  backgroundVideoElement.setAttribute("playsinline", "");
  backgroundVideoElement.setAttribute("muted", "");
  backgroundVideoElement.setAttribute("loop", "");
  backgroundVideoElement.setAttribute("autoplay", "");

  if (backgroundVideo) {
    const source = document.createElement("source");
    source.src = backgroundVideo.textContent.trim();
    source.type = "video/mp4";
    backgroundVideoElement.append(source);
    moveInstrumentation(backgroundVideo, source);
  }
  heroFullWidthBackgroundWrapper.append(backgroundVideoElement);

  const backgroundPoster = document.createElement("img");
  backgroundPoster.alt = "Background poster image";
  backgroundPoster.loading = "lazy";
  backgroundPoster.classList.add("hero-full-width__background-poster");
  backgroundPoster.style.display = "none";
  backgroundPoster.setAttribute("aria-hidden", "true");
  heroFullWidthBackgroundWrapper.append(backgroundPoster);

  const heroFullWidthContent = document.createElement("div");
  heroFullWidthContent.classList.add("hero-full-width__content");
  heroFullWidth.append(heroFullWidthContent);

  // Title and Description slide-up
  const slideWrap1 = document.createElement("div");
  slideWrap1.classList.add("slide-wrap");
  heroFullWidthContent.append(slideWrap1);

  const slideUp1 = document.createElement("div");
  slideUp1.dataset.slideType = "slide-up";
  slideUp1.classList.add("slide-up");
  slideWrap1.append(slideUp1);

  const heroFullWidthContentTitle = document.createElement("div");
  heroFullWidthContentTitle.classList.add("hero-full-width__content__title");
  heroFullWidthContentTitle.setAttribute("tabindex", "0");
  if (title) {
    const h1 = document.createElement("h1");
    h1.append(...title.childNodes);
    heroFullWidthContentTitle.append(h1);
    moveInstrumentation(title, h1);
  }
  slideUp1.append(heroFullWidthContentTitle);

  const heroFullWidthContentDescription = document.createElement("div");
  heroFullWidthContentDescription.classList.add(
    "hero-full-width__content__description"
  );
  heroFullWidthContentDescription.setAttribute("tabindex", "0");
  if (description) {
    const p = document.createElement("p");
    p.append(...description.childNodes);
    heroFullWidthContentDescription.append(p);
    moveInstrumentation(description, p);
  }
  slideUp1.append(heroFullWidthContentDescription);

  // CTAs slide-up
  const slideWrap2 = document.createElement("div");
  slideWrap2.classList.add("slide-wrap");
  heroFullWidthContent.append(slideWrap2);

  const slideUp2 = document.createElement("div");
  slideUp2.dataset.slideType = "slide-up";
  slideUp2.classList.add("slide-up");
  slideWrap2.append(slideUp2);

  const heroFullWidthContentCtas = document.createElement("div");
  heroFullWidthContentCtas.classList.add("hero-full-width__content--ctas");
  slideUp2.append(heroFullWidthContentCtas);

  // Primary CTA
  const primaryCtaAnchor = document.createElement("a");
  primaryCtaAnchor.classList.add("cta", "cta__secondary", "primaryCta");
  if (primaryCtaLink) {
    primaryCtaAnchor.href = primaryCtaLink.textContent.trim();
    moveInstrumentation(primaryCtaLink, primaryCtaAnchor);
  }
  primaryCtaAnchor.target = "_self";
  if (primaryCtaLabel) {
    primaryCtaAnchor.setAttribute(
      "aria-label",
      primaryCtaLabel.textContent.trim()
    );
  }
  primaryCtaAnchor.dataset.palette = "palette-light";

  const primaryCtaSpan = document.createElement("span");
  primaryCtaSpan.classList.add("cta__label");
  if (primaryCtaLabel) {
    primaryCtaSpan.append(...primaryCtaLabel.childNodes);
    moveInstrumentation(primaryCtaLabel, primaryCtaSpan);
  }
  primaryCtaAnchor.append(primaryCtaSpan);
  heroFullWidthContentCtas.append(primaryCtaAnchor);

  // Secondary CTA (Watch Video)
  const chevronWrapper = document.createElement("div");
  chevronWrapper.classList.add("chevron-wrapper");
  heroFullWidthContentCtas.append(chevronWrapper);

  const chevronButton = document.createElement("button");
  chevronButton.type = "button";
  chevronButton.classList.add("chevron-icon");
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  const secondaryCtaAnchor = document.createElement("a");
  secondaryCtaAnchor.classList.add("cta", "cta__link", "secondaryCta");
  secondaryCtaAnchor.href = "#"; // Default href
  if (secondaryCtaLink) {
    secondaryCtaAnchor.href = secondaryCtaLink.textContent.trim();
    moveInstrumentation(secondaryCtaLink, secondaryCtaAnchor);
  }
  secondaryCtaAnchor.target = "_self";
  if (secondaryCtaLabel) {
    secondaryCtaAnchor.setAttribute(
      "aria-label",
      secondaryCtaLabel.textContent.trim()
    );
  }
  secondaryCtaAnchor.dataset.palette = "palette-light";

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
  if (secondaryCtaLabel) {
    secondaryCtaSpan.append(...secondaryCtaLabel.childNodes);
    moveInstrumentation(secondaryCtaLabel, secondaryCtaSpan);
  }
  secondaryCtaAnchor.append(secondaryCtaSpan);
  chevronWrapper.append(secondaryCtaAnchor);

  // Video Modal
  const videoModal = document.createElement("dialog");
  videoModal.classList.add("hero-full-width__content--modal");
  videoModal.id = "home-page-video-dialog";
  videoModal.setAttribute("closedby", "any");
  videoModal.setAttribute("aria-modal", "true");
  videoModal.setAttribute("aria-label", "Video Modal");
  heroFullWidthContent.append(videoModal);

  const form = document.createElement("form");
  form.method = "dialog";
  videoModal.append(form);

  const closeButton = document.createElement("button");
  closeButton.classList.add("hero-full-width__content--modal__close-button");
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  form.append(closeButton);

  const videoContainerModal = document.createElement("div");
  videoContainerModal.classList.add(
    "video",
    "hero-full-width__content--modal__video"
  );
  videoModal.append(videoContainerModal);

  const videoPlayerContainer = document.createElement("div");
  videoPlayerContainer.classList.add("video-container", "show-controls");
  videoContainerModal.append(videoPlayerContainer);

  const videoControls = document.createElement("div");
  videoControls.classList.add("video-container__controls");
  videoPlayerContainer.append(videoControls);

  const videoTimer = document.createElement("div");
  videoTimer.classList.add("video-container__controls__timer");
  videoControls.append(videoTimer);

  const progressBarArea = document.createElement("div");
  progressBarArea.classList.add(
    "video-container__controls__timer__progress-area"
  );
  videoTimer.append(progressBarArea);

  const progressBar = document.createElement("span");
  progressBar.classList.add(
    "video-container__controls__timer__progress-area__progress-bar"
  );
  progressBarArea.append(progressBar);

  const pointer = document.createElement("span");
  pointer.classList.add(
    "video-container__controls__timer__progress-area__pointer"
  );
  progressBarArea.append(pointer);

  const progressPending = document.createElement("span");
  progressPending.classList.add(
    "video-container__controls__timer__progress-area__progress-pending"
  );
  progressBarArea.append(progressPending);

  const currentTime = document.createElement("p");
  currentTime.classList.add("video-container__controls__timer__current-time");
  currentTime.textContent = "00:00";
  videoTimer.append(currentTime);

  const duration = document.createElement("p");
  duration.classList.add("video-container__controls__timer__duration");
  duration.textContent = "00:00";
  videoTimer.append(duration);

  const videoButtons = document.createElement("div");
  videoButtons.classList.add("video-container__controls__buttons");
  videoControls.append(videoButtons);

  const playButton = document.createElement("button");
  playButton.classList.add(
    "video-container__controls__buttons__play-button",
    "video-container__controls__buttons--button"
  );
  const playIcon = document.createElement("span");
  playIcon.classList.add(
    "video-container__controls__buttons__icon",
    "qd-icon",
    "qd-icon--play"
  );
  playButton.append(playIcon);
  videoButtons.append(playButton);

  const muteButton = document.createElement("button");
  muteButton.classList.add(
    "video-container__controls__buttons__mute-button",
    "video-container__controls__buttons--button"
  );
  const muteIcon = document.createElement("span");
  muteIcon.classList.add(
    "video-container__controls__buttons__icon",
    "qd-icon",
    "qd-icon--volume"
  );
  muteButton.append(muteIcon);
  videoButtons.append(muteButton);

  const fullscreenButton = document.createElement("button");
  fullscreenButton.classList.add(
    "video-container__controls__buttons__fullscreen-button",
    "video-container__controls__buttons--button"
  );
  const fullscreenIcon = document.createElement("span");
  fullscreenIcon.classList.add(
    "video-container__controls__buttons__icon",
    "qd-icon",
    "qd-icon--fullscreen"
  );
  fullscreenButton.append(fullscreenIcon);
  videoButtons.append(fullscreenButton);

  const modalVideoElement = document.createElement("video");
  modalVideoElement.classList.add("video-container__video");
  modalVideoElement.setAttribute("playsinline", "");
  modalVideoElement.setAttribute("webkit-playsinline", "");
  modalVideoElement.setAttribute("muted", "true");
  modalVideoElement.setAttribute("autoplay", "");

  if (backgroundVideo) {
    const modalSource = document.createElement("source");
    modalSource.src = backgroundVideo.textContent.trim();
    modalSource.type = "video/mp4";
    modalVideoElement.append(modalSource);
    // No need to moveInstrumentation again as it was moved to the backgroundVideoElement's source
  }
  modalVideoElement.append(document.createTextNode("webkit-playsinline"));
  modalVideoElement.append(document.createTextNode('x-webkit-airplay="allow"'));
  videoPlayerContainer.append(modalVideoElement);

  block.textContent = "";
  block.append(heroFullWidth);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
