export default function decorate(block) {
  block.classList.add('header-container');

  const brandingDiv = block.querySelector('.header-branding');
  if (brandingDiv) {
    const img = brandingDiv.querySelector('img');
    if (img) {
      img.classList.add('header-branding-image');
    }
  }

  const socialFloatRightDiv = block.querySelector('.header-social-float-right');
  if (socialFloatRightDiv) {
    const navList = socialFloatRightDiv.querySelector('.header-navlist');
    if (navList) {
      navList.classList.add('header-social-navlist');
      const fbIcon = navList.querySelector('.header-fb-icon');
      if (fbIcon) fbIcon.classList.add('header-social-icon');
      const donationIcon = navList.querySelector('.header-donation-icon');
      if (donationIcon) donationIcon.classList.add('header-social-icon');
      const rssIcon = navList.querySelector('.header-rss-icon');
      if (rssIcon) rssIcon.classList.add('header-social-icon');
    }
  }

  const bannerWrapperDiv = block.querySelector('.header-banner-wrapper');
  if (bannerWrapperDiv) {
    const bannerLink = bannerWrapperDiv.querySelector('a');
    if (bannerLink) {
      bannerLink.classList.add('header-banner-link');
      const bannerImg = bannerLink.querySelector('img');
      if (bannerImg) {
        bannerImg.classList.add('header-banner-image');
      }
    }
    const tagline = bannerWrapperDiv.querySelector('.header-tagline');
    if (tagline) {
      tagline.classList.add('header-banner-tagline');
    }
  }

  const languageSelectorSpan = block.querySelector('.header-language-selector');
  if (languageSelectorSpan) {
    const languageLinks = languageSelectorSpan.querySelectorAll('.header-nav');
    languageLinks.forEach(link => {
      link.classList.add('header-language-link');
    });
  }

  const locationSpan = block.querySelector('.header-location');
  if (locationSpan) {
    locationSpan.classList.add('header-location-info');
  }
}