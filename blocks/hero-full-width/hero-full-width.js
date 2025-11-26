import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default async function decorate(block) {
  const heroFullWidth = document.createElement("div");
  heroFullWidth.className = "hero-full-width parallax-child-2 hero-in-view";
  heroFullWidth.setAttribute("data-media-type", "videoTypeSelected");

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

  // Set aria-label on the main div using the title content
  if (title) {
    heroFullWidth.setAttribute("aria-label", title.innerHTML.trim());
  }
  heroFullWidth.setAttribute("aria-hidden", "true");

  const heroFullWidthCover = document.createElement("div");
  heroFullWidthCover.className = "hero-full-width__cover";
  heroFullWidth.append(heroFullWidthCover);

  const heroFullWidthBackground = document.createElement("div");
  heroFullWidthBackground.className = "hero-full-width__background";
  heroFullWidth.append(heroFullWidthBackground);

  const heroFullWidthBackgroundWrapper = document.createElement("div");
  heroFullWidthBackgroundWrapper.className =
    "hero-full-width__background-wrapper zoom-out";
  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);

  if (backgroundVideo) {
    const videoBg = document.createElement("video");
    videoBg.className = "hero-full-width__background-video";
    videoBg.setAttribute("aria-label", title ? title.innerHTML.trim() : "");
    videoBg.setAttribute("aria-hidden", "true");
    videoBg.setAttribute("playsinline", "");
    videoBg.setAttribute("muted", "");
    videoBg.setAttribute("loop", "");
    videoBg.setAttribute("autoplay", "");

    const sourceBg = document.createElement("source");
    sourceBg.src = backgroundVideo.textContent.trim();
    sourceBg.type = "video/mp4";
    videoBg.append(sourceBg);
    heroFullWidthBackgroundWrapper.append(videoBg);
    moveInstrumentation(backgroundVideo, sourceBg);
  }

  const backgroundPoster = document.createElement("img");
  backgroundPoster.alt = "Background poster image";
  backgroundPoster.loading = "lazy";
  backgroundPoster.className = "hero-full-width__background-poster";
  backgroundPoster.style.display = "none";
  backgroundPoster.setAttribute("aria-hidden", "true");
  heroFullWidthBackgroundWrapper.append(backgroundPoster);

  const heroFullWidthContent = document.createElement("div");
  heroFullWidthContent.className = "hero-full-width__content";
  heroFullWidth.append(heroFullWidthContent);

  // Title and Description
  const slideWrap1 = document.createElement("div");
  slideWrap1.className = "slide-wrap";
  heroFullWidthContent.append(slideWrap1);

  const slideUp1 = document.createElement("div");
  slideUp1.setAttribute("data-slide-type", "slide-up");
  slideUp1.className = "slide-up";
  slideWrap1.append(slideUp1);

  if (title) {
    const heroFullWidthContentTitle = document.createElement("div");
    heroFullWidthContentTitle.className = "hero-full-width__content__title";
    heroFullWidthContentTitle.setAttribute("tabindex", "0");
    heroFullWidthContentTitle.append(...title.childNodes);
    moveInstrumentation(title, heroFullWidthContentTitle);
    slideUp1.append(heroFullWidthContentTitle);
  }

  if (description) {
    const heroFullWidthContentDescription = document.createElement("div");
    heroFullWidthContentDescription.className =
      "hero-full-width__content__description";
    heroFullWidthContentDescription.setAttribute("tabindex", "0");
    heroFullWidthContentDescription.append(...description.childNodes);
    moveInstrumentation(description, heroFullWidthContentDescription);
    slideUp1.append(heroFullWidthContentDescription);
  }

  // CTAs
  const slideWrap2 = document.createElement("div");
  slideWrap2.className = "slide-wrap";
  heroFullWidthContent.append(slideWrap2);

  const slideUp2 = document.createElement("div");
  slideUp2.setAttribute("data-slide-type", "slide-up");
  slideUp2.className = "slide-up";
  slideWrap2.append(slideUp2);

  const heroFullWidthContentCtas = document.createElement("div");
  heroFullWidthContentCtas.className = "hero-full-width__content--ctas";
  slideUp2.append(heroFullWidthContentCtas);

  if (primaryCtaLink && primaryCtaLabel) {
    const primaryCta = document.createElement("a");
    primaryCta.href = primaryCtaLink.textContent.trim();
    primaryCta.className = "cta cta__secondary primaryCta ";
    primaryCta.target = "_self";
    primaryCta.setAttribute("aria-label", primaryCtaLabel.textContent.trim());
    primaryCta.setAttribute("data-palette", "palette-light");

    const primaryCtaSpan = document.createElement("span");
    primaryCtaSpan.className = "cta__label";
    primaryCtaSpan.append(...primaryCtaLabel.childNodes);
    moveInstrumentation(primaryCtaLabel, primaryCtaSpan);
    primaryCta.append(primaryCtaSpan);
    heroFullWidthContentCtas.append(primaryCta);
    moveInstrumentation(primaryCtaLink, primaryCta);
  }

  const chevronWrapper = document.createElement("div");
  chevronWrapper.className = "chevron-wrapper";
  heroFullWidthContentCtas.append(chevronWrapper);

  const chevronButton = document.createElement("button");
  chevronButton.type = "button";
  chevronButton.className = "chevron-icon";
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  if (secondaryCtaLink && secondaryCtaLabel) {
    const secondaryCta = document.createElement("a");
    secondaryCta.href = secondaryCtaLink.textContent.trim();
    secondaryCta.className = "cta cta__link secondaryCta ";
    secondaryCta.target = "_self";
    secondaryCta.setAttribute(
      "aria-label",
      secondaryCtaLabel.textContent.trim()
    );
    secondaryCta.setAttribute("data-palette", "palette-light");

    const secondaryCtaIcon = document.createElement("span");
    secondaryCtaIcon.className = "cta__icon qd-icon qd-icon--cheveron-right";
    secondaryCtaIcon.setAttribute("aria-hidden", "true");
    secondaryCta.append(secondaryCtaIcon);

    const secondaryCtaSpan = document.createElement("span");
    secondaryCtaSpan.className = "cta__label";
    secondaryCtaSpan.append(...secondaryCtaLabel.childNodes);
    moveInstrumentation(secondaryCtaLabel, secondaryCtaSpan);
    secondaryCta.append(secondaryCtaSpan);
    chevronWrapper.append(secondaryCta);
    moveInstrumentation(secondaryCtaLink, secondaryCta);
  }

  // Modal
  const dialog = document.createElement("dialog");
  dialog.className = "hero-full-width__content--modal";
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");
  heroFullWidthContent.append(dialog);

  const form = document.createElement("form");
  form.method = "dialog";
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

  const videoContainerControls = document.createElement("div");
  videoContainerControls.className = "video-container__controls";
  videoContainer.append(videoContainerControls);

  const timer = document.createElement("div");
  timer.className = "video-container__controls__timer";
  videoContainerControls.append(timer);

  const progressArea = document.createElement("div");
  progressArea.className = "video-container__controls__timer__progress-area";
  timer.append(progressArea);

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
  timer.append(currentTime);

  const duration = document.createElement("p");
  duration.className = "video-container__controls__timer__duration";
  duration.textContent = "00:00";
  timer.append(duration);

  const controlsButtons = document.createElement("div");
  controlsButtons.className = "video-container__controls__buttons";
  videoContainerControls.append(controlsButtons);

  const playButton = document.createElement("button");
  playButton.className =
    "video-container__controls__buttons__play-button video-container__controls__buttons--button";
  const playIcon = document.createElement("span");
  playIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--play";
  playButton.append(playIcon);
  controlsButtons.append(playButton);

  const muteButton = document.createElement("button");
  muteButton.className =
    "video-container__controls__buttons__mute-button video-container__controls__buttons--button";
  const muteIcon = document.createElement("span");
  muteIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--volume";
  muteButton.append(muteIcon);
  controlsButtons.append(muteButton);

  const fullscreenButton = document.createElement("button");
  fullscreenButton.className =
    "video-container__controls__buttons__fullscreen-button video-container__controls__buttons--button";
  const fullscreenIcon = document.createElement("span");
  fullscreenIcon.className =
    "video-container__controls__buttons__icon qd-icon qd-icon--fullscreen";
  fullscreenButton.append(fullscreenIcon);
  controlsButtons.append(fullscreenButton);

  if (backgroundVideo) {
    const videoModalVideo = document.createElement("video");
    videoModalVideo.className = "video-container__video";
    videoModalVideo.setAttribute("playsinline", "");
    videoModalVideo.setAttribute("webkit-playsinline", "");
    videoModalVideo.setAttribute("muted", "true");
    videoModalVideo.setAttribute("autoplay", "");

    const sourceModal = document.createElement("source");
    sourceModal.src = backgroundVideo.textContent.trim();
    sourceModal.type = "video/mp4";
    videoModalVideo.append(sourceModal);
    videoContainer.append(videoModalVideo);
    // Instrumentation for the modal video source can reuse the original backgroundVideo source
    // as it's the same content, or create a new one if the model provided separate fields.
    // Since the model only has one 'backgroundVideo', we'll assume it's used for both.
    // No need to moveInstrumentation again if it's already moved to the background video source.
  }

  block.textContent = "";
  block.append(heroFullWidth);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
