export default function decorate(b) {
  b.classList.add(
    "textandmedia-c27TextAndMedia",
    "margin-block-start-medium",
    "margin-block-end-medium",
    "padding-block-start-medium",
    "padding-block-end-medium"
  );
  const wrapper = b.querySelector(".textandmedia-wrapper");
  if (wrapper) {
    const mediaSection = wrapper.querySelector(
      ".textandmedia-gradientSection.textandmedia-mediaWrapper"
    );
    if (mediaSection) {
      mediaSection.classList.add(
        "textandmedia-gradientSection",
        "textandmedia-mediaWrapper"
      );
      const gradient = mediaSection.querySelector(
        ".textandmedia-gradient.textandmedia-homeGradient"
      );
      if (gradient)
        gradient.classList.add(
          "textandmedia-gradient",
          "textandmedia-homeGradient"
        );
      const mediaInner = mediaSection.querySelector(
        ".textandmedia-mediaWrapper-inner"
      );
      if (mediaInner) {
        const media = mediaInner.querySelector(
          ".textandmedia-o14Media.textandmedia-media"
        );
        if (media) {
          const picture = media.querySelector(
            "picture.textandmedia-a3Image.textandmedia-objectFitContainer"
          );
          if (picture) {
            picture.classList.add(
              "textandmedia-a3Image",
              "textandmedia-objectFitContainer"
            );
            const img = picture.querySelector("img.textandmedia-image");
            if (img)
              img.classList.add(
                "textandmedia-image",
                "textandmedia-enableTransitionIn",
                "textandmedia-isLoaded",
                "textandmedia-objectFitCover"
              );
          }
        }
      }
    }
    const contentWrapper = wrapper.querySelector(
      ".textandmedia-contentWrapper"
    );
    if (contentWrapper) {
      contentWrapper.classList.add("textandmedia-contentWrapper");
      const titleWrapper = contentWrapper.querySelector(
        ".textandmedia-m5TitleWrapper.textandmedia-title"
      );
      if (titleWrapper) {
        titleWrapper.classList.add(
          "textandmedia-m5TitleWrapper",
          "textandmedia-title"
        );
        const h2 = titleWrapper.querySelector("h2.textandmedia-typography");
        if (h2)
          h2.classList.add("textandmedia-typography", "textandmedia-heading");
      }
      const richText = contentWrapper.querySelector(
        ".textandmedia-a4RichText.textandmedia-bottomCopy"
      );
      if (richText)
        richText.classList.add(
          "textandmedia-a4RichText",
          "textandmedia-bottomCopy"
        );
      const ctaWrapper = contentWrapper.querySelector(
        ".textandmedia-ctaWrapper"
      );
      if (ctaWrapper) {
        ctaWrapper.classList.add("textandmedia-ctaWrapper");
        const cta = ctaWrapper.querySelector("a.textandmedia-clickableElement");
        if (cta) {
          cta.classList.add(
            "textandmedia-clickableElement",
            "textandmedia-hasStartIcon"
          );
          if (cta.href && !cta.href.includes(window.location.hostname)) {
            cta.target = "_blank";
            cta.rel = "noopener noreferrer";
          }
          const icon = cta.querySelector(
            ".textandmedia-a2Icon.textandmedia-icon"
          );
          if (icon)
            icon.classList.add("textandmedia-a2Icon", "textandmedia-icon");
          const label = cta.querySelector(
            ".textandmedia-typography.textandmedia-label"
          );
          if (label)
            label.classList.add(
              "textandmedia-typography",
              "textandmedia-label"
            );
        }
      }
    }
  }
}
