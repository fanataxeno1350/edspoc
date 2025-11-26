import { createOptimizedPicture } from "../../scripts/aem.js";
import { moveInstrumentation } from "../../scripts/scripts.js";

function createIconSpan(className) {
  const span = document.createElement("span");
  span.className = className;
  return span;
}

function createHeaderQdIcon(iconName) {
  const span = document.createElement("span");
  span.className = `header-qd-icon header-qd-icon--${iconName}`;
  return span;
}

function createHeaderCtaLink(href, label, ariaLabel) {
  const a = document.createElement("a");
  a.href = href;
  a.className = "header-cta header-cta__ navigation--content__cta";
  a.target = "_self";
  a.setAttribute("aria-label", ariaLabel);

  const iconSpan = createHeaderQdIcon("cheveron-right");
  iconSpan.setAttribute("aria-hidden", "true");
  a.append(iconSpan);

  const labelSpan = document.createElement("span");
  labelSpan.className = "header-cta__label";
  labelSpan.textContent = label;
  a.append(labelSpan);

  return a;
}

export default async function decorate(block) {
  const headerNavData = JSON.parse(
    block.querySelector('script[type="application/json"]').textContent
  );

  const container = document.createElement("div");
  container.id = `container-${Math.random().toString(36).substring(2, 11)}`; // Generate a random ID
  container.className = "header-container";

  const headerWrapper = document.createElement("div");
  headerWrapper.className =
    "header-wrapper layout-container transparent-header";
  container.append(headerWrapper);

  const headerNavigation = document.createElement("div");
  headerNavigation.className = "header-navigation";
  headerWrapper.append(headerNavigation);

  const navigationWrapper = document.createElement("div");
  navigationWrapper.className = "navigation-wrapper";
  navigationWrapper.setAttribute("role", "banner");
  navigationWrapper.setAttribute("aria-label", "navigation.header.aria.label");
  headerNavigation.append(navigationWrapper);

  const navigationWrapperLogo = document.createElement("div");
  navigationWrapperLogo.className = "navigation-wrapper__logo";
  navigationWrapper.append(navigationWrapperLogo);

  const logoLink = document.createElement("a");
  logoLink.href = headerNavData.logoLink;
  logoLink.target = "_self";
  moveInstrumentation(
    block.querySelector('[data-aue-prop="logoLink"]'),
    logoLink
  );

  const logoIcon = document.createElement("span");
  logoIcon.className = "header-qd-icon header-qd-icon--logo header-qd-logo";
  for (let i = 1; i <= 25; i += 1) {
    logoIcon.append(createIconSpan(`path${i}`));
  }
  logoLink.append(logoIcon);
  navigationWrapperLogo.append(logoLink);

  const navigationWrapperContactUsCta = document.createElement("div");
  navigationWrapperContactUsCta.className = "navigation-wrapper__contactUs-cta";
  navigationWrapperLogo.append(navigationWrapperContactUsCta);

  const contactUsLinkDesktop = createHeaderCtaLink(
    headerNavData.contactUsLink,
    headerNavData.contactUsLabel,
    "Contact Us"
  );
  moveInstrumentation(
    block.querySelector('[data-aue-prop="contactUsLink"]'),
    contactUsLinkDesktop
  );
  moveInstrumentation(
    block.querySelector('[data-aue-prop="contactUsLabel"]'),
    contactUsLinkDesktop.querySelector(".header-cta__label")
  );
  navigationWrapperContactUsCta.append(contactUsLinkDesktop);

  const navigationWrapperIcon = document.createElement("div");
  navigationWrapperIcon.className = "navigation-wrapper__icon";
  navigationWrapperIcon.id = "navigation-toggle";
  navigationWrapperContactUsCta.append(navigationWrapperIcon);

  const headerHamburgerEllipse = document.createElement("div");
  headerHamburgerEllipse.className = "header-hamburger-ellipse";
  headerHamburgerEllipse.setAttribute("tabindex", "0");
  headerHamburgerEllipse.append(createHeaderQdIcon("hamburger"));
  headerHamburgerEllipse.append(createHeaderQdIcon("cancel"));
  navigationWrapperIcon.append(headerHamburgerEllipse);

  // Desktop Navigation
  const navbarDesktop = document.createElement("nav");
  navbarDesktop.className = "navigation-wrapper__navbar";
  navbarDesktop.id = "navbar-desktop";
  navbarDesktop.setAttribute("role", "navigation");
  navbarDesktop.setAttribute("aria-label", "navigation.main.aria.label");
  navigationWrapper.append(navbarDesktop);

  const navbarDesktopList = document.createElement("ul");
  navbarDesktopList.className = "navigation-wrapper__navbar-list";
  navbarDesktop.append(navbarDesktopList);

  headerNavData.navMenus.forEach((menu, menuIndex) => {
    const navMenuLi = document.createElement("li");
    navMenuLi.className = "navigation-wrapper__navbar-menu";
    navbarDesktopList.append(navMenuLi);

    const menuLink = document.createElement("a");
    menuLink.setAttribute("aria-haspopup", "true");
    menuLink.setAttribute("aria-expanded", "false");
    menuLink.className = "navigation-wrapper__navbar-menulink";
    menuLink.target = "_self";
    menuLink.href = menu.menuLink;

    const menuLabelSpan = document.createElement("span");
    menuLabelSpan.textContent = menu.menuLabel;
    menuLink.append(menuLabelSpan);

    const iconWrapper = document.createElement("span");
    iconWrapper.className = "header-qd-icon-wrapper";
    iconWrapper.append(createHeaderQdIcon("cheveron-down"));
    menuLink.append(iconWrapper);

    navMenuLi.append(menuLink);

    moveInstrumentation(
      block.querySelector(
        `[data-aue-model="navMenu"]:nth-child(${
          menuIndex + 1
        }) [data-aue-prop="menuLink"]`
      ),
      menuLink
    );
    moveInstrumentation(
      block.querySelector(
        `[data-aue-model="navMenu"]:nth-child(${
          menuIndex + 1
        }) [data-aue-prop="menuLabel"]`
      ),
      menuLabelSpan
    );

    if (menu.subMenuItems && menu.subMenuItems.length > 0) {
      const subMenuUl = document.createElement("ul");
      subMenuUl.className = "navigation-wrapper__navbar-submenu";

      menu.subMenuItems.forEach((subMenuItem, subMenuIndex) => {
        const subMenuLi = document.createElement("li");
        const subMenuLink = document.createElement("a");
        subMenuLink.setAttribute("aria-expanded", "false");
        subMenuLink.target = "_self";
        subMenuLink.href = subMenuItem.subMenuLink;

        const subMenuLabelSpan = document.createElement("span");
        subMenuLabelSpan.textContent = subMenuItem.subMenuLabel;
        subMenuLink.append(subMenuLabelSpan);
        subMenuLi.append(subMenuLink);
        subMenuUl.append(subMenuLi);

        moveInstrumentation(
          block.querySelector(
            `[data-aue-model="navMenu"]:nth-child(${
              menuIndex + 1
            }) [data-aue-model="navSubMenuItem"]:nth-child(${
              subMenuIndex + 1
            }) [data-aue-prop="subMenuLink"]`
          ),
          subMenuLink
        );
        moveInstrumentation(
          block.querySelector(
            `[data-aue-model="navMenu"]:nth-child(${
              menuIndex + 1
            }) [data-aue-model="navSubMenuItem"]:nth-child(${
              subMenuIndex + 1
            }) [data-aue-prop="subMenuLabel"]`
          ),
          subMenuLabelSpan
        );
      });
      navMenuLi.append(subMenuUl);
    }
  });

  const contactUsLinkDesktopBottom = createHeaderCtaLink(
    headerNavData.contactUsLink,
    headerNavData.contactUsLabel,
    "${navigation.contactUsAriaLabel}"
  );
  moveInstrumentation(
    block.querySelector('[data-aue-prop="contactUsLink"]'),
    contactUsLinkDesktopBottom
  );
  moveInstrumentation(
    block.querySelector('[data-aue-prop="contactUsLabel"]'),
    contactUsLinkDesktopBottom.querySelector(".header-cta__label")
  );
  navbarDesktop.append(contactUsLinkDesktopBottom);

  const desktopLanguageSelector = document.createElement("div");
  desktopLanguageSelector.className =
    "header-language-selector header-lang-css-from-wrapper";
  desktopLanguageSelector.style.visibility = "visible";
  navbarDesktop.append(desktopLanguageSelector);

  const desktopLanguageUl = document.createElement("ul");
  desktopLanguageUl.className = "header-cmp-language-selector";
  desktopLanguageSelector.append(desktopLanguageUl);

  headerNavData.languages.forEach((lang, langIndex) => {
    const langLi = document.createElement("li");
    if (langIndex === 0) {
      langLi.className = "active";
    }
    const langA = document.createElement("a");
    langA.href = lang.languageLink;
    langA.setAttribute("aria-label", lang.languageLabel);
    langA.className = "header-cmp-language-selector__link";
    langA.setAttribute(
      "data-lang",
      lang.languageLabel === "English" ? "en" : "ar"
    );
    langA.textContent = lang.languageLabel;
    langLi.append(langA);
    desktopLanguageUl.append(langLi);

    moveInstrumentation(
      block.querySelector(
        `[data-aue-model="languageOption"]:nth-child(${
          langIndex + 1
        }) [data-aue-prop="languageLink"]`
      ),
      langA
    );
    moveInstrumentation(
      block.querySelector(
        `[data-aue-model="languageOption"]:nth-child(${
          langIndex + 1
        }) [data-aue-prop="languageLabel"]`
      ),
      langA
    );
  });

  // Mobile Navigation
  const navbarMobile = document.createElement("nav");
  navbarMobile.className = "navigation-wrapper__mobilenavbar";
  navbarMobile.id = "navbar-mobile";
  navbarMobile.setAttribute("role", "navigation");
  navbarMobile.setAttribute("aria-label", "navigation.main.aria.label");
  navigationWrapper.append(navbarMobile);

  const navbarMobileList = document.createElement("ul");
  navbarMobileList.className = "navigation-wrapper__mobilenavbar-list";
  navbarMobile.append(navbarMobileList);

  headerNavData.navMenus.forEach((menu, menuIndex) => {
    const navMenuLi = document.createElement("li");
    navMenuLi.className = "navigation-wrapper__mobilenavbar-menu border";
    navbarMobileList.append(navMenuLi);

    const menuLink = document.createElement("a");
    menuLink.className = "navigation-wrapper__mobilenavbar-menulink";

    const menuLabelSpan = document.createElement("span");
    menuLabelSpan.textContent = menu.menuLabel;
    menuLink.append(menuLabelSpan);
    menuLink.append(
      createHeaderQdIcon(
        "cheveron-right",
        "navigation-wrapper__mobilenavbar-menulink-icon"
      )
    );
    navMenuLi.append(menuLink);

    moveInstrumentation(
      block.querySelector(
        `[data-aue-model="navMenu"]:nth-child(${
          menuIndex + 1
        }) [data-aue-prop="menuLabel"]`
      ),
      menuLabelSpan
    );

    if (menu.subMenuItems && menu.subMenuItems.length > 0) {
      const subMenuUl = document.createElement("ul");
      subMenuUl.className = "navigation-wrapper__mobilenavbar-submenu";

      const subMenuHeaderLi = document.createElement("li");
      subMenuHeaderLi.className = "navigation-wrapper__mobilenavbar-menuheader";
      const subMenuHeaderA = document.createElement("a");
      const subMenuHeaderSpan = document.createElement("span");
      subMenuHeaderSpan.textContent = menu.menuLabel;
      subMenuHeaderA.append(subMenuHeaderSpan);
      subMenuHeaderLi.append(subMenuHeaderA);
      subMenuUl.append(subMenuHeaderLi);
      moveInstrumentation(
        block.querySelector(
          `[data-aue-model="navMenu"]:nth-child(${
            menuIndex + 1
          }) [data-aue-prop="menuLabel"]`
        ),
        subMenuHeaderSpan
      );

      menu.subMenuItems.forEach((subMenuItem, subMenuIndex) => {
        const subMenuLi = document.createElement("li");
        subMenuLi.className = "navigation-wrapper__mobilenavbar-menu";
        const subMenuLink = document.createElement("a");
        subMenuLink.className = "navigation-wrapper__mobilenavbar-menulink";
        subMenuLink.target = "_self";
        subMenuLink.href = subMenuItem.subMenuLink;

        const subMenuLabelSpan = document.createElement("span");
        subMenuLabelSpan.textContent = subMenuItem.subMenuLabel;
        subMenuLink.append(subMenuLabelSpan);
        subMenuLi.append(subMenuLink);
        subMenuUl.append(subMenuLi);

        moveInstrumentation(
          block.querySelector(
            `[data-aue-model="navMenu"]:nth-child(${
              menuIndex + 1
            }) [data-aue-model="navSubMenuItem"]:nth-child(${
              subMenuIndex + 1
            }) [data-aue-prop="subMenuLink"]`
          ),
          subMenuLink
        );
        moveInstrumentation(
          block.querySelector(
            `[data-aue-model="navMenu"]:nth-child(${
              menuIndex + 1
            }) [data-aue-model="navSubMenuItem"]:nth-child(${
              subMenuIndex + 1
            }) [data-aue-prop="subMenuLabel"]`
          ),
          subMenuLabelSpan
        );
      });
      navMenuLi.append(subMenuUl);
    }
  });

  const mobileNavBack = document.createElement("div");
  mobileNavBack.className = "navigation-wrapper__mobilenavbar-back nav-back";
  navbarMobile.append(mobileNavBack);

  const mobileNavBackIconWrapper = document.createElement("a");
  mobileNavBackIconWrapper.className = "navigation-wrapper__icon";
  mobileNavBackIconWrapper.append(
    createHeaderQdIcon("cheveron-left", "header-back-icon")
  );
  mobileNavBack.append(mobileNavBackIconWrapper);

  const mobileNavBackLabel = document.createElement("span");
  mobileNavBackLabel.className = "navigation-wrapper__iconlabel";
  mobileNavBackLabel.textContent = "Back";
  mobileNavBack.append(mobileNavBackLabel);

  const mobileLanguageSelector = document.createElement("div");
  mobileLanguageSelector.className =
    "header-language-selector header-lang-css-from-wrapper";
  mobileLanguageSelector.style.visibility = "visible";
  navbarMobile.append(mobileLanguageSelector);

  const mobileLanguageUl = document.createElement("ul");
  mobileLanguageUl.className = "header-cmp-language-selector";
  mobileLanguageSelector.append(mobileLanguageUl);

  headerNavData.languages.forEach((lang, langIndex) => {
    const langLi = document.createElement("li");
    if (langIndex === 0) {
      langLi.className = "active";
    }
    const langA = document.createElement("a");
    langA.href = lang.languageLink;
    langA.setAttribute("aria-label", lang.languageLabel);
    langA.className = "header-cmp-language-selector__link";
    langA.setAttribute(
      "data-lang",
      lang.languageLabel === "English" ? "en" : "ar"
    );
    langA.textContent = lang.languageLabel;
    langLi.append(langA);
    mobileLanguageUl.append(langLi);

    moveInstrumentation(
      block.querySelector(
        `[data-aue-model="languageOption"]:nth-child(${
          langIndex + 1
        }) [data-aue-prop="languageLink"]`
      ),
      langA
    );
    moveInstrumentation(
      block.querySelector(
        `[data-aue-model="languageOption"]:nth-child(${
          langIndex + 1
        }) [data-aue-prop="languageLabel"]`
      ),
      langA
    );
  });

  block.textContent = "";
  block.append(container);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = "loaded";
}
