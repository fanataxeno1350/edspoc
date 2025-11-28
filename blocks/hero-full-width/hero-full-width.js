import { moveInstrumentation } from "../../scripts/scripts.js";

export default function decorate(block) {
  // Set initial classes and attributes for the main block
  block.classList.add("parallax-child-2", "hero-in-view");
  block.setAttribute("data-media-type", "videoTypeSelected");
  block.setAttribute("aria-hidden", "true");

  // Create the hero-full-width__cover div
  const coverDiv = document.createElement("div");
  coverDiv.classList.add("hero-full-width__cover");
  block.append(coverDiv);

  // Create the hero-full-width__background div
  const backgroundDiv = document.createElement("div");
  backgroundDiv.classList.add("hero-full-width__background");
  block.append(backgroundDiv);

  // Create the hero-full-width__background-wrapper div
  const backgroundWrapper = document.createElement("div");
  backgroundWrapper.classList.add(
    "hero-full-width__background-wrapper",
    "zoom-out"
  );
  backgroundDiv.append(backgroundWrapper);

  // Create the hero-full-width__content div
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("hero-full-width__content");
  block.append(contentDiv);

  let backgroundVideoSrc = "";
  let titleHtml = "";
  let descriptionHtml = "";
  let primaryCtaLabel = "";
  let primaryCtaLink = "";
  let secondaryCtaLabel = "";
  let secondaryCtaLink = "";

  // Extract content from block.children (authored content)
  [...block.children].forEach((row, index) => {
    const cells = [...row.children];
    if (index === 0) {
      // First row: Background Video, Title, Description
      const videoCell = cells[0];
      const titleCell = cells[1];
      const descriptionCell = cells[2];

      if (videoCell) {
        const videoLink = videoCell.querySelector("a");
        if (videoLink) {
          backgroundVideoSrc = videoLink.href;
        } else {
          const videoElement = videoCell.querySelector("video");
          if (videoElement) {
            const sourceElement = videoElement.querySelector("source");
            if (sourceElement) {
              backgroundVideoSrc = sourceElement.src;
            }
          }
        }
      }

      if (titleCell) {
        titleHtml = titleCell.innerHTML;
      }
      if (descriptionCell) {
        descriptionHtml = descriptionCell.innerHTML;
      }
    } else if (index === 1) {
      // Second row: Primary CTA Label, Primary CTA Link, Secondary CTA Label, Secondary CTA Link
      const primaryLabelCell = cells[0];
      const primaryLinkCell = cells[1];
      const secondaryLabelCell = cells[2];
      const secondaryLinkCell = cells[3];

      if (primaryLabelCell) {
        primaryCtaLabel = primaryLabelCell.textContent.trim();
      }
      if (primaryLinkCell) {
        const link = primaryLinkCell.querySelector("a");
        if (link) {
          primaryCtaLink = link.href;
        }
      }
      if (secondaryLabelCell) {
        secondaryCtaLabel = secondaryLabelCell.textContent.trim();
      }
      if (secondaryLinkCell) {
        const link = secondaryLinkCell.querySelector("a");
        if (link) {
          secondaryCtaLink = link.href;
        }
      }
    }
  });

  // Create background video and poster image
  const backgroundVideo = document.createElement("video");
  backgroundVideo.classList.add("hero-full-width__background-video");
  backgroundVideo.setAttribute("aria-hidden", "true");
  backgroundVideo.setAttribute("playsinline", "");
  backgroundVideo.setAttribute("muted", "");
  backgroundVideo.setAttribute("loop", "");
  backgroundVideo.setAttribute("autoplay", "");
  if (titleHtml) {
    backgroundVideo.setAttribute("aria-label", titleHtml.replace(/\n/g, ""));
  }

  const videoSource = document.createElement("source");
  videoSource.src = backgroundVideoSrc;
  videoSource.type = "video/mp4";
  backgroundVideo.append(videoSource);
  backgroundWrapper.append(backgroundVideo);

  const backgroundPoster = document.createElement("img");
  backgroundPoster.alt = "Background poster image";
  backgroundPoster.loading = "lazy";
  backgroundPoster.classList.add("hero-full-width__background-poster");
  backgroundPoster.style.display = "none";
  backgroundPoster.setAttribute("aria-hidden", "true");
  backgroundWrapper.append(backgroundPoster);

  // Create title and description content
  const slideWrap1 = document.createElement("div");
  slideWrap1.classList.add("slide-wrap");
  contentDiv.append(slideWrap1);

  const slideUp1 = document.createElement("div");
  slideUp1.setAttribute("data-slide-type", "slide-up");
  slideUp1.classList.add("slide-up");
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("hero-full-width__content__title");
  titleDiv.setAttribute("tabindex", "0");
  titleDiv.innerHTML = titleHtml;
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("hero-full-width__content__description");
  descriptionDiv.setAttribute("tabindex", "0");
  descriptionDiv.innerHTML = descriptionHtml;
  slideUp1.append(descriptionDiv);

  // Create CTAs
  const slideWrap2 = document.createElement("div");
  slideWrap2.classList.add("slide-wrap");
  contentDiv.append(slideWrap2);

  const slideUp2 = document.createElement("div");
  slideUp2.setAttribute("data-slide-type", "slide-up");
  slideUp2.classList.add("slide-up");
  slideWrap2.append(slideUp2);

  const ctasDiv = document.createElement("div");
  ctasDiv.classList.add("hero-full-width__content--ctas");
  slideUp2.append(ctasDiv);

  if (primaryCtaLink && primaryCtaLabel) {
    const primaryCta = document.createElement("a");
    primaryCta.href = primaryCtaLink;
    primaryCta.classList.add("cta", "cta__secondary", "primaryCta");
    primaryCta.target = "_self";
    primaryCta.setAttribute("aria-label", primaryCtaLabel);
    primaryCta.setAttribute("data-palette", "palette-light");

    const primaryCtaLabelSpan = document.createElement("span");
    primaryCtaLabelSpan.classList.add("cta__label");
    primaryCtaLabelSpan.textContent = primaryCtaLabel;
    primaryCta.append(primaryCtaLabelSpan);
    ctasDiv.append(primaryCta);
  }

  if (secondaryCtaLink && secondaryCtaLabel) {
    const chevronWrapper = document.createElement("div");
    chevronWrapper.classList.add("chevron-wrapper");
    ctasDiv.append(chevronWrapper);

    const chevronButton = document.createElement("button");
    chevronButton.type = "button";
    chevronButton.classList.add("chevron-icon");
    chevronButton.setAttribute("aria-label", "Open video modal");
    chevronWrapper.append(chevronButton);

    const secondaryCta = document.createElement("a");
    secondaryCta.href = secondaryCtaLink;
    secondaryCta.classList.add("cta", "cta__link", "secondaryCta");
    secondaryCta.target = "_self";
    secondaryCta.setAttribute("aria-label", secondaryCtaLabel);
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
    secondaryCtaLabelSpan.textContent = secondaryCtaLabel;
    secondaryCta.append(secondaryCtaLabelSpan);
    chevronWrapper.append(secondaryCta);
  }

  // Create the dialog modal
  const dialog = document.createElement("dialog");
  dialog.classList.add("hero-full-width__content--modal");
  dialog.id = "home-page-video-dialog";
  dialog.setAttribute("closedby", "any");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Video Modal");
  contentDiv.append(dialog);

  const form = document.createElement("form");
  form.method = "dialog";
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

  const controlsDiv = document.createElement("div");
  controlsDiv.classList.add("video-container__controls");
  videoContainer.append(controlsDiv);

  const timerDiv = document.createElement("div");
  timerDiv.classList.add("video-container__controls__timer");
  controlsDiv.append(timerDiv);

  const progressArea = document.createElement("div");
  progressArea.classList.add("video-container__controls__timer__progress-area");
  timerDiv.append(progressArea);

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
  timerDiv.append(currentTime);

  const duration = document.createElement("p");
  duration.classList.add("video-container__controls__timer__duration");
  duration.textContent = "00:00";
  timerDiv.append(duration);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("video-container__controls__buttons");
  controlsDiv.append(buttonsDiv);

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
  buttonsDiv.append(playButton);

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
  buttonsDiv.append(muteButton);

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
  buttonsDiv.append(fullscreenButton);

  const modalVideo = document.createElement("video");
  modalVideo.classList.add("video-container__video");
  modalVideo.setAttribute("playsinline", "");
  modalVideo.setAttribute("webkit-playsinline", "");
  modalVideo.setAttribute("muted", "true");
  modalVideo.setAttribute("autoplay", "");

  const modalVideoSource = document.createElement("source");
  modalVideoSource.src = backgroundVideoSrc;
  modalVideoSource.type = "video/mp4";
  modalVideo.append(modalVideoSource);
  videoContainer.append(modalVideo);

  // Transfer instrumentation for the entire block
  moveInstrumentation(block, block);

  // Clear the original block content
  block.textContent = "";
}
