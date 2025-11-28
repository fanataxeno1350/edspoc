import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const heroFullWidthCover = document.createElement("div");
  heroFullWidthCover.classList.add("hero-full-width__cover");

  const heroFullWidthBackground = document.createElement("div");
  heroFullWidthBackground.classList.add("hero-full-width__background");

  const heroFullWidthBackgroundWrapper = document.createElement("div");
  heroFullWidthBackgroundWrapper.classList.add(
    "hero-full-width__background-wrapper",
    "zoom-out"
  );

  const backgroundVideoContainer = block.querySelector(
    '[data-aue-prop="backgroundVideo"]'
  );
  if (backgroundVideoContainer) {
    const video = document.createElement("video");
    video.classList.add("hero-full-width__background-video");
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.setAttribute("autoplay", "");

    const source = document.createElement("source");
    source.setAttribute("type", "video/mp4");

    const videoLink = backgroundVideoContainer.querySelector("a");
    if (videoLink) {
      source.setAttribute("src", videoLink.href);
      moveInstrumentation(videoLink, source);
    }
    video.append(source);
    moveInstrumentation(backgroundVideoContainer, video);
    heroFullWidthBackgroundWrapper.append(video);
  }

  const backgroundImage = document.createElement("img");
  backgroundImage.alt = "Background poster image";
  backgroundImage.loading = "lazy";
  backgroundImage.classList.add("hero-full-width__background-poster");
  backgroundImage.style.display = "none";
  backgroundImage.setAttribute("aria-hidden", "true");
  heroFullWidthBackgroundWrapper.append(backgroundImage);

  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);

  const heroFullWidthContent = document.createElement("div");
  heroFullWidthContent.classList.add("hero-full-width__content");

  const slideWrap1 = document.createElement("div");
  slideWrap1.classList.add("slide-wrap");
  const slideUp1 = document.createElement("div");
  slideUp1.setAttribute("data-slide-type", "slide-up");
  slideUp1.classList.add("slide-up");

  const heroFullWidthContentTitle = document.createElement("div");
  heroFullWidthContentTitle.classList.add("hero-full-width__content__title");
  heroFullWidthContentTitle.setAttribute("tabindex", "0");
  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    heroFullWidthContentTitle.append(...titleElement.childNodes);
    moveInstrumentation(titleElement, heroFullWidthContentTitle);
  }
  slideUp1.append(heroFullWidthContentTitle);

  const heroFullWidthContentDescription = document.createElement("div");
  heroFullWidthContentDescription.classList.add(
    "hero-full-width__content__description"
  );
  heroFullWidthContentDescription.setAttribute("tabindex", "0");
  const descriptionElement = block.querySelector(
    '[data-aue-prop="description"]'
  );
  if (descriptionElement) {
    heroFullWidthContentDescription.append(...descriptionElement.childNodes);
    moveInstrumentation(descriptionElement, heroFullWidthContentDescription);
  }
  slideUp1.append(heroFullWidthContentDescription);
  slideWrap1.append(slideUp1);
  heroFullWidthContent.append(slideWrap1);

  const slideWrap2 = document.createElement("div");
  slideWrap2.classList.add("slide-wrap");
  const slideUp2 = document.createElement("div");
  slideUp2.setAttribute("data-slide-type", "slide-up");
  slideUp2.classList.add("slide-up");

  const heroFullWidthContentCtas = document.createElement("div");
  heroFullWidthContentCtas.classList.add("hero-full-width__content--ctas");

  const primaryCta = document.createElement("a");
  primaryCta.classList.add("cta", "cta__secondary", "primaryCta");
  primaryCta.setAttribute("target", "_self");
  primaryCta.setAttribute("data-palette", "palette-light");

  const primaryCtaLabelSpan = document.createElement("span");
  primaryCtaLabelSpan.classList.add("cta__label");
  const primaryCtaLabel = block.querySelector(
    '[data-aue-prop="primaryCtaLabel"]'
  );
  if (primaryCtaLabel) {
    primaryCtaLabelSpan.append(...primaryCtaLabel.childNodes);
    moveInstrumentation(primaryCtaLabel, primaryCtaLabelSpan);
  }
  primaryCta.append(primaryCtaLabelSpan);

  const primaryCtaLink = block.querySelector(
    '[data-aue-prop="primaryCtaLink"]'
  );
  if (primaryCtaLink) {
    const link = primaryCtaLink.querySelector("a");
    if (link) {
      primaryCta.href = link.href;
      primaryCta.setAttribute("aria-label", link.textContent.trim());
      moveInstrumentation(link, primaryCta);
    }
  }
  heroFullWidthContentCtas.append(primaryCta);

  const chevronWrapper = document.createElement("div");
  chevronWrapper.classList.add("chevron-wrapper");

  const chevronButton = document.createElement("button");
  chevronButton.setAttribute("type", "button");
  chevronButton.classList.add("chevron-icon");
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  const secondaryCta = document.createElement("a");
  secondaryCta.classList.add("cta", "cta__link", "secondaryCta");
  secondaryCta.setAttribute("target", "_self");
  secondaryCta.setAttribute("data-palette", "palette-light");

  const secondaryCtaIcon = document.createElement("span");
  secondaryCtaIcon.classList.add(
    "cta__icon",
    "qd-icon",
    "qd-icon--cheveron-right"
  );
  secondaryCtaIcon.setAttribute("aria-hidden", "true");
  secondaryCta.append(secondaryCtaIcon);

  const secondaryCtaLabelSpan = document.createElement("span");
  secondaryCtaLabelSpan.classList.add("cta__label");
  const secondaryCtaLabel = block.querySelector(
    '[data-aue-prop="secondaryCtaLabel"]'
  );
  if (secondaryCtaLabel) {
    secondaryCtaLabelSpan.append(...secondaryCtaLabel.childNodes);
    moveInstrumentation(secondaryCtaLabel, secondaryCtaLabelSpan);
  }
  secondaryCta.append(secondaryCtaLabelSpan);

  const secondaryCtaLink = block.querySelector(
    '[data-aue-prop="secondaryCtaLink"]'
  );
  if (secondaryCtaLink) {
    const link = secondaryCtaLink.querySelector("a");
    if (link) {
      secondaryCta.href = link.href;
      secondaryCta.setAttribute("aria-label", link.textContent.trim());
      moveInstrumentation(link, secondaryCta);
    }
  }
  chevronWrapper.append(secondaryCta);
  heroFullWidthContentCtas.append(chevronWrapper);

  slideUp2.append(heroFullWidthContentCtas);
  slideWrap2.append(slideUp2);
  heroFullWidthContent.append(slideWrap2);

  const dialog = document.createElement("dialog");
  dialog.classList.add("hero-full-width__content--modal");
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");

  const dialogForm = document.createElement("form");
  dialogForm.setAttribute("method", "dialog");
  const closeButton = document.createElement("button");
  closeButton.classList.add("hero-full-width__content--modal__close-button");
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  dialogForm.append(closeButton);
  dialog.append(dialogForm);

  const dialogVideoContainer = document.createElement("div");
  dialogVideoContainer.classList.add(
    "video",
    "hero-full-width__content--modal__video"
  );
  const videoContainerShowControls = document.createElement("div");
  videoContainerShowControls.classList.add("video-container", "show-controls");

  const videoControls = document.createElement("div");
  videoControls.classList.add("video-container__controls");

  const videoTimer = document.createElement("div");
  videoTimer.classList.add("video-container__controls__timer");
  videoTimer.innerHTML = `
    <div class="video-container__controls__timer__progress-area">
      <span class="video-container__controls__timer__progress-area__progress-bar"></span>
      <span class="video-container__controls__timer__progress-area__pointer"></span>
      <span class="video-container__controls__timer__progress-area__progress-pending"></span>
    </div>
    <p class="video-container__controls__timer__current-time">00:00</p>
    <p class="video-container__controls__timer__duration">00:00</p>
  `;
  videoControls.append(videoTimer);

  const videoButtons = document.createElement("div");
  videoButtons.classList.add("video-container__controls__buttons");
  videoButtons.innerHTML = `
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
  videoControls.append(videoButtons);
  videoContainerShowControls.append(videoControls);

  const dialogVideo = document.createElement("video");
  dialogVideo.classList.add("video-container__video");
  dialogVideo.setAttribute("playsinline", "");
  dialogVideo.setAttribute("webkit-playsinline", "");
  dialogVideo.setAttribute("muted", "true");
  dialogVideo.setAttribute("autoplay", "");

  const dialogSource = document.createElement("source");
  dialogSource.setAttribute("type", "video/mp4");

  if (backgroundVideoContainer) {
    const videoLink = backgroundVideoContainer.querySelector("a");
    if (videoLink) {
      dialogSource.setAttribute("src", videoLink.href);
      // Instrumentation already moved for background video, no need to move again
    }
  }
  dialogVideo.append(dialogSource);
  videoContainerShowControls.append(dialogVideo);
  dialogVideoContainer.append(videoContainerShowControls);
  dialog.append(dialogVideoContainer);

  heroFullWidthContent.append(dialog);

  block.innerHTML = "";
  block.append(
    heroFullWidthCover,
    heroFullWidthBackground,
    heroFullWidthContent
  );
  block.classList.add("parallax-child-2", "hero-in-view");
  block.setAttribute("data-media-type", "videoTypeSelected");
  block.setAttribute(
    "aria-label",
    block.querySelector(".hero-full-width__content__title")?.innerHTML || ""
  );
  block.setAttribute("aria-hidden", "true");
}
