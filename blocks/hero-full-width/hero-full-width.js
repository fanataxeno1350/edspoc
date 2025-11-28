import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  const children = Array.from(block.children);

  const heroFullWidthCover = document.createElement("div");
  heroFullWidthCover.classList.add("hero-full-width__cover");

  const heroFullWidthBackground = document.createElement("div");
  heroFullWidthBackground.classList.add("hero-full-width__background");

  const heroFullWidthBackgroundWrapper = document.createElement("div");
  heroFullWidthBackgroundWrapper.classList.add(
    "hero-full-width__background-wrapper",
    "zoom-out"
  );

  const heroFullWidthContent = document.createElement("div");
  heroFullWidthContent.classList.add("hero-full-width__content");

  let backgroundVideoSrc = "";
  let titleContent = null;
  let descriptionContent = null;
  let primaryCtaContent = null;
  let secondaryCtaContent = null;

  // Extract authored content
  children.forEach((row) => {
    const newContainer = document.createElement("div");
    moveInstrumentation(row, newContainer);

    const backgroundVideoLink = newContainer.querySelector(
      'div[data-aue-name="backgroundVideo"] a'
    );
    if (backgroundVideoLink) {
      backgroundVideoSrc = backgroundVideoLink.href;
    }

    const titleDiv = newContainer.querySelector('div[data-aue-name="title"]');
    if (titleDiv) {
      titleContent = document.createElement("div");
      titleContent.classList.add("hero-full-width__content__title");
      titleContent.setAttribute("tabindex", "0");
      titleContent.append(...titleDiv.childNodes);
      moveInstrumentation(titleDiv, titleContent);
    }

    const descriptionDiv = newContainer.querySelector(
      'div[data-aue-name="description"]'
    );
    if (descriptionDiv) {
      descriptionContent = document.createElement("div");
      descriptionContent.classList.add("hero-full-width__content__description");
      descriptionContent.setAttribute("tabindex", "0");
      descriptionContent.append(...descriptionDiv.childNodes);
      moveInstrumentation(descriptionDiv, descriptionContent);
    }

    const primaryCtaDiv = newContainer.querySelector(
      'div[data-aue-name="primaryCta"]'
    );
    if (primaryCtaDiv) {
      primaryCtaContent = document.createElement("div");
      primaryCtaContent.append(...primaryCtaDiv.childNodes);
      moveInstrumentation(primaryCtaDiv, primaryCtaContent);
    }

    const secondaryCtaDiv = newContainer.querySelector(
      'div[data-aue-name="secondaryCta"]'
    );
    if (secondaryCtaDiv) {
      secondaryCtaContent = document.createElement("div");
      secondaryCtaContent.append(...secondaryCtaDiv.childNodes);
      moveInstrumentation(secondaryCtaDiv, secondaryCtaContent);
    }
  });

  // Build background video
  if (backgroundVideoSrc) {
    const video = document.createElement("video");
    video.classList.add("hero-full-width__background-video");
    video.setAttribute("aria-hidden", "true");
    video.setAttribute("playsinline", "");
    video.setAttribute("muted", "");
    video.setAttribute("loop", "");
    video.setAttribute("autoplay", "");

    const source = document.createElement("source");
    source.setAttribute("src", backgroundVideoSrc);
    source.setAttribute("type", "video/mp4");
    video.append(source);
    heroFullWidthBackgroundWrapper.append(video);
  }

  const backgroundPoster = document.createElement("img");
  backgroundPoster.setAttribute("alt", "Background poster image");
  backgroundPoster.setAttribute("loading", "lazy");
  backgroundPoster.classList.add("hero-full-width__background-poster");
  backgroundPoster.style.display = "none";
  backgroundPoster.setAttribute("aria-hidden", "true");
  heroFullWidthBackgroundWrapper.append(backgroundPoster);

  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);

  // Build content area
  if (titleContent || descriptionContent) {
    const slideWrap1 = document.createElement("div");
    slideWrap1.classList.add("slide-wrap");
    const slideUp1 = document.createElement("div");
    slideUp1.setAttribute("data-slide-type", "slide-up");
    slideUp1.classList.add("slide-up");
    if (titleContent) {
      slideUp1.append(titleContent);
    }
    if (descriptionContent) {
      slideUp1.append(descriptionContent);
    }
    slideWrap1.append(slideUp1);
    heroFullWidthContent.append(slideWrap1);
  }

  if (primaryCtaContent || secondaryCtaContent) {
    const slideWrap2 = document.createElement("div");
    slideWrap2.classList.add("slide-wrap");
    const slideUp2 = document.createElement("div");
    slideUp2.setAttribute("data-slide-type", "slide-up");
    slideUp2.classList.add("slide-up");

    const ctaContainer = document.createElement("div");
    ctaContainer.classList.add("hero-full-width__content--ctas");

    if (primaryCtaContent) {
      const primaryCtaAnchor = primaryCtaContent.querySelector("a");
      if (primaryCtaAnchor) {
        primaryCtaAnchor.classList.add("cta", "cta__secondary", "primaryCta");
        const span = document.createElement("span");
        span.classList.add("cta__label");
        span.append(...primaryCtaAnchor.childNodes);
        moveInstrumentation(primaryCtaAnchor, span);
        primaryCtaAnchor.append(span);
        ctaContainer.append(primaryCtaAnchor);
      } else {
        ctaContainer.append(primaryCtaContent);
      }
    }

    if (secondaryCtaContent) {
      const chevronWrapper = document.createElement("div");
      chevronWrapper.classList.add("chevron-wrapper");

      const chevronButton = document.createElement("button");
      chevronButton.setAttribute("type", "button");
      chevronButton.classList.add("chevron-icon");
      chevronButton.setAttribute("aria-label", "Open video modal");
      chevronWrapper.append(chevronButton);

      const secondaryCtaAnchor = secondaryCtaContent.querySelector("a");
      if (secondaryCtaAnchor) {
        secondaryCtaAnchor.classList.add("cta", "cta__link", "secondaryCta");
        const iconSpan = document.createElement("span");
        iconSpan.classList.add(
          "cta__icon",
          "qd-icon",
          "qd-icon--cheveron-right"
        );
        iconSpan.setAttribute("aria-hidden", "true");
        const labelSpan = document.createElement("span");
        labelSpan.classList.add("cta__label");
        labelSpan.append(...secondaryCtaAnchor.childNodes);
        moveInstrumentation(secondaryCtaAnchor, labelSpan);
        secondaryCtaAnchor.prepend(iconSpan);
        secondaryCtaAnchor.append(labelSpan);
        chevronWrapper.append(secondaryCtaAnchor);
      } else {
        chevronWrapper.append(secondaryCtaContent);
      }
      ctaContainer.append(chevronWrapper);
    }

    slideUp2.append(ctaContainer);
    slideWrap2.append(slideUp2);
    heroFullWidthContent.append(slideWrap2);
  }

  // Build video modal
  const videoModal = document.createElement("dialog");
  videoModal.classList.add("hero-full-width__content--modal");
  videoModal.id = "home-page-video-dialog";
  videoModal.setAttribute("closedby", "any");
  videoModal.setAttribute("aria-modal", "true");
  videoModal.setAttribute("aria-label", "Video Modal");

  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
  const closeButton = document.createElement("button");
  closeButton.classList.add("hero-full-width__content--modal__close-button");
  closeButton.setAttribute("aria-label", "Close Video");
  closeButton.setAttribute("tabindex", "0");
  closeButton.textContent = "X";
  form.append(closeButton);
  videoModal.append(form);

  const videoModalContent = document.createElement("div");
  videoModalContent.classList.add(
    "video",
    "hero-full-width__content--modal__video"
  );

  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container", "show-controls");

  const videoControls = document.createElement("div");
  videoControls.classList.add("video-container__controls");

  const timer = document.createElement("div");
  timer.classList.add("video-container__controls__timer");
  timer.innerHTML = `
    <div class="video-container__controls__timer__progress-area">
      <span class="video-container__controls__timer__progress-area__progress-bar"></span>
      <span class="video-container__controls__timer__progress-area__pointer"></span>
      <span class="video-container__controls__timer__progress-area__progress-pending"></span>
    </div>
    <p class="video-container__controls__timer__current-time">00:00</p>
    <p class="video-container__controls__timer__duration">00:00</p>
  `;
  videoControls.append(timer);

  const buttons = document.createElement("div");
  buttons.classList.add("video-container__controls__buttons");
  buttons.innerHTML = `
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
  videoControls.append(buttons);
  videoContainer.append(videoControls);

  const modalVideo = document.createElement("video");
  modalVideo.classList.add("video-container__video");
  modalVideo.setAttribute("playsinline", "");
  modalVideo.setAttribute("webkit-playsinline", "");
  modalVideo.setAttribute("muted", "true");
  modalVideo.setAttribute("autoplay", "");
  modalVideo.setAttribute("x-webkit-airplay", "allow");

  if (backgroundVideoSrc) {
    const modalSource = document.createElement("source");
    modalSource.setAttribute("src", backgroundVideoSrc);
    modalSource.setAttribute("type", "video/mp4");
    modalVideo.append(modalSource);
  }
  videoContainer.append(modalVideo);
  videoModalContent.append(videoContainer);
  videoModal.append(videoModalContent);
  heroFullWidthContent.append(videoModal);

  block.innerHTML = "";
  block.classList.add("parallax-child-2", "hero-in-view");
  block.setAttribute("data-media-type", "videoTypeSelected");
  block.setAttribute("aria-hidden", "true");

  block.append(
    heroFullWidthCover,
    heroFullWidthBackground,
    heroFullWidthContent
  );
}
