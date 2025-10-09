export default function decorate(b) {
  b.classList.add(
    "listinteractive-listinteractive",
    "listinteractive-scarp-wrapper",
    "padding-block-start-medium",
    "padding-block-end-medium"
  );
  const layout = b.querySelector(".basiccardlayout-basic-card-layout");
  if (layout) {
    layout.classList.add("basiccardlayout-basic-card-layout");
    const bg = layout.querySelector(".basiccardlayout-background");
    if (bg) {
      bg.classList.add("basiccardlayout-background");
      const listBg = bg.querySelector(".listinteractive-background");
      if (listBg) {
        listBg.classList.add("listinteractive-background");
        const picture = listBg.querySelector(
          "picture.a3-image.listinteractive-scarp"
        );
        if (picture) picture.classList.add("a3-image", "listinteractive-scarp");
      }
    }
    const wrapper = layout.querySelector(".basiccardlayout-wrapper");
    if (wrapper) {
      wrapper.classList.add("basiccardlayout-wrapper");
      const titleWrapper = wrapper.querySelector(
        ".m5-title-wrapper.basiccardlayout-layout-title.listinteractive-title"
      );
      if (titleWrapper) {
        titleWrapper.classList.add(
          "m5-title-wrapper",
          "basiccardlayout-layout-title",
          "listinteractive-title"
        );
        const h2 = titleWrapper.querySelector("h2");
        if (h2)
          h2.classList.add("typography-typography", "m5-title-wrapper-heading");
      }
      const copy = wrapper.querySelector(".basiccardlayout-layout-copy");
      if (copy) {
        copy.classList.add("basiccardlayout-layout-copy");
        const ctas = copy.querySelector(".listinteractive-call-to-actions");
        if (ctas) {
          ctas.classList.add("listinteractive-call-to-actions");
          const a = ctas.querySelector("a.clickable-element");
          if (a) {
            a.classList.add("clickable-element");
            const icon = a.querySelector("span.a2-icon.clickable-element-icon");
            if (icon) icon.classList.add("a2-icon", "clickable-element-icon");
            const label = a.querySelector(
              "span.typography-typography.clickable-element-label"
            );
            if (label)
              label.classList.add(
                "typography-typography",
                "clickable-element-label"
              );
          }
        }
      }
      const cards = wrapper.querySelectorAll(".o2-card.listinteractive-item");
      cards.forEach((card) => {
        card.classList.add("o2-card", "listinteractive-item");
        const pic = card.querySelector(
          "picture.a3-image.a3-image-object-fit-container.o2-card-visual"
        );
        if (pic)
          pic.classList.add(
            "a3-image",
            "a3-image-object-fit-container",
            "o2-card-visual"
          );
        const img = pic ? pic.querySelector("img") : null;
        if (img)
          img.classList.add(
            "a3-image-image",
            "a3-image-enable-transition-in",
            "a3-image-is-loaded",
            "a3-image-object-fit-cover"
          );
        const content = card.querySelector(".o2-card-content");
        if (content) {
          content.classList.add("o2-card-content");
          const cardTitleWrapper = content.querySelector(
            ".m5-title-wrapper.o2-card-title"
          );
          if (cardTitleWrapper) {
            cardTitleWrapper.classList.add("m5-title-wrapper", "o2-card-title");
            const h3 = cardTitleWrapper.querySelector("h3");
            if (h3)
              h3.classList.add(
                "typography-typography",
                "m5-title-wrapper-heading"
              );
          }
          const richText = content.querySelector(".a4-rich-text");
          if (richText) richText.classList.add("a4-rich-text");
        }
      });
    }
  }
}
