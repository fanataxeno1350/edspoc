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

  const heroFullWidthBackgroundVideo = document.createElement("video");
  heroFullWidthBackgroundVideo.classList.add(
    "hero-full-width__background-video"
  );
  heroFullWidthBackgroundVideo.setAttribute("playsinline", "");
  heroFullWidthBackgroundVideo.setAttribute("muted", "");
  heroFullWidthBackgroundVideo.setAttribute("loop", "");
  heroFullWidthBackgroundVideo.setAttribute("autoplay", "");

  let backgroundVideoSource = block.querySelector('[data-aue-prop="video"]');
  if (!backgroundVideoSource) {
    const anchor = block.querySelector(
      'a[href$=".mp4"], a[href$=".mov"], a[href$=".webm"]'
    );
    if (anchor) {
      backgroundVideoSource = anchor;
    }
  }

  if (backgroundVideoSource) {
    const source = document.createElement("source");
    source.setAttribute(
      "src",
      backgroundVideoSource.href || backgroundVideoSource.textContent.trim()
    );
    source.setAttribute("type", "video/mp4");
    heroFullWidthBackgroundVideo.append(source);
    moveInstrumentation(backgroundVideoSource, source);
  }

  const heroFullWidthBackgroundPoster = document.createElement("img");
  heroFullWidthBackgroundPoster.classList.add(
    "hero-full-width__background-poster"
  );
  heroFullWidthBackgroundPoster.setAttribute("alt", "Background poster image");
  heroFullWidthBackgroundPoster.setAttribute("loading", "lazy");
  heroFullWidthBackgroundPoster.style.display = "none";
  heroFullWidthBackgroundPoster.setAttribute("aria-hidden", "true");

  heroFullWidthBackgroundWrapper.append(
    heroFullWidthBackgroundVideo,
    heroFullWidthBackgroundPoster
  );
  heroFullWidthBackground.append(heroFullWidthBackgroundWrapper);

  const heroFullWidthContent = document.createElement("div");
  heroFullWidthContent.classList.add("hero-full-width__content");

  const slideWrap1 = document.createElement("div");
  slideWrap1.classList.add("slide-wrap");
  const slideUp1 = document.createElement("div");
  slideUp1.classList.add("slide-up");
  slideUp1.setAttribute("data-slide-type", "slide-up");

  const heroFullWidthContentTitle = document.createElement("div");
  heroFullWidthContentTitle.classList.add("hero-full-width__content__title");
  heroFullWidthContentTitle.setAttribute("tabindex", "0");
  const headline = block.querySelector('[data-aue-prop="headline"]');
  if (headline) {
    heroFullWidthContentTitle.append(...headline.childNodes);
    moveInstrumentation(headline, heroFullWidthContentTitle);
  }

  const heroFullWidthContentDescription = document.createElement("div");
  heroFullWidthContentDescription.classList.add(
    "hero-full-width__content__description"
  );
  heroFullWidthContentDescription.setAttribute("tabindex", "0");
  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    heroFullWidthContentDescription.append(...description.childNodes);
    moveInstrumentation(description, heroFullWidthContentDescription);
  }

  slideUp1.append(heroFullWidthContentTitle, heroFullWidthContentDescription);
  slideWrap1.append(slideUp1);

  const slideWrap2 = document.createElement("div");
  slideWrap2.classList.add("slide-wrap");
  const slideUp2 = document.createElement("div");
  slideUp2.classList.add("slide-up");
  slideUp2.setAttribute("data-slide-type", "slide-up");

  const heroFullWidthContentCtas = document.createElement("div");
  heroFullWidthContentCtas.classList.add("hero-full-width__content--ctas");

  const primaryCtaAnchor = block.querySelector('[data-aue-prop="primaryCta"]');
  if (primaryCtaAnchor) {
    const primaryCta = document.createElement("a");
    primaryCta.classList.add("cta", "cta__secondary", "primaryCta");
    primaryCta.setAttribute("target", "_self");
    primaryCta.setAttribute("data-palette", "palette-light");
    primaryCta.href = primaryCtaAnchor.href;
    primaryCta.setAttribute("aria-label", primaryCtaAnchor.textContent.trim());
    const span = document.createElement("span");
    span.classList.add("cta__label");
    span.textContent = primaryCtaAnchor.textContent.trim();
    primaryCta.append(span);
    moveInstrumentation(primaryCtaAnchor, primaryCta);
    heroFullWidthContentCtas.append(primaryCta);
  }

  const chevronWrapper = document.createElement("div");
  chevronWrapper.classList.add("chevron-wrapper");

  const chevronButton = document.createElement("button");
  chevronButton.setAttribute("type", "button");
  chevronButton.classList.add("chevron-icon");
  chevronButton.setAttribute("aria-label", "Open video modal");
  chevronWrapper.append(chevronButton);

  const secondaryCtaAnchor = block.querySelector(
    '[data-aue-prop="secondaryCta"]'
  );
  if (secondaryCtaAnchor) {
    const secondaryCta = document.createElement("a");
    secondaryCta.classList.add("cta", "cta__link", "secondaryCta");
    secondaryCta.setAttribute("target", "_self");
    secondaryCta.setAttribute("data-palette", "palette-light");
    secondaryCta.href = secondaryCtaAnchor.href;
    secondaryCta.setAttribute(
      "aria-label",
      secondaryCtaAnchor.textContent.trim()
    );

    const iconSpan = document.createElement("span");
    iconSpan.classList.add("cta__icon", "qd-icon", "qd-icon--cheveron-right");
    iconSpan.setAttribute("aria-hidden", "true");

    const labelSpan = document.createElement("span");
    labelSpan.classList.add("cta__label");
    labelSpan.textContent = secondaryCtaAnchor.textContent.trim();

    secondaryCta.append(iconSpan, labelSpan);
    moveInstrumentation(secondaryCtaAnchor, secondaryCta);
    chevronWrapper.append(secondaryCta);
  }

  heroFullWidthContentCtas.append(chevronWrapper);
  slideUp2.append(heroFullWidthContentCtas);
  slideWrap2.append(slideUp2);

  const dialog = document.createElement("dialog");
  dialog.classList.add("hero-full-width__content--modal");
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");

  const form = document.createElement("form");
  form.setAttribute("method", "dialog");
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

  videoControls.append(timer, buttons);

  const modalVideo = document.createElement("video");
  modalVideo.classList.add("video-container__video");
  modalVideo.setAttribute("playsinline", "");
  modalVideo.setAttribute("webkit-playsinline", "");
  modalVideo.setAttribute("muted", "true");
  modalVideo.setAttribute("autoplay", "");

  if (backgroundVideoSource) {
    const modalSource = document.createElement("source");
    modalSource.setAttribute(
      "src",
      backgroundVideoSource.href || backgroundVideoSource.textContent.trim()
    );
    modalSource.setAttribute("type", "video/mp4");
    modalVideo.append(modalSource);
    moveInstrumentation(backgroundVideoSource, modalSource);
  }

  videoContainer.append(videoControls, modalVideo);
  videoModalDiv.append(videoContainer);
  dialog.append(form, videoModalDiv);

  heroFullWidthContent.append(slideWrap1, slideWrap2, dialog);

  block.innerHTML = "";
  block.append(
    heroFullWidthCover,
    heroFullWidthBackground,
    heroFullWidthContent
  );
}
