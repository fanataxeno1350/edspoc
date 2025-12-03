import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('section');
  headerContainer.classList.add('header-container');
  moveInstrumentation(block, headerContainer);

  // Home Link and Logo Image
  const homeLink = block.querySelector('[data-aue-prop="homeLink"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (homeLink) {
    const homeAnchor = document.createElement('a');
    homeAnchor.rel = 'no-follow';
    homeAnchor.title = homeLink.textContent;
    homeAnchor.href = homeLink.href;
    moveInstrumentation(homeLink, homeAnchor);

    if (logoImage) {
      const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
      pic.classList.add('header-home-logo');
      moveInstrumentation(logoImage, pic.querySelector('img'));
      homeAnchor.append(pic);
    }
    headerContainer.append(homeAnchor);
  } else if (logoImage) {
    // If no homeLink, just add the logo image directly
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    pic.classList.add('header-home-logo');
    moveInstrumentation(logoImage, pic.querySelector('img'));
    headerContainer.append(pic);
  }

  const headerNav = document.createElement('div');
  headerNav.classList.add('header-nav');

  // About Link
  const aboutLink = block.querySelector('[data-aue-prop="aboutLink"]');
  if (aboutLink) {
    const aboutAnchor = document.createElement('a');
    aboutAnchor.href = aboutLink.href;
    aboutAnchor.textContent = aboutLink.textContent;
    moveInstrumentation(aboutLink, aboutAnchor);
    headerNav.append(aboutAnchor);
  }

  // Experiences Link
  const experiencesLink = block.querySelector('[data-aue-prop="experiencesLink"]');
  if (experiencesLink) {
    const experiencesAnchor = document.createElement('a');
    experiencesAnchor.href = experiencesLink.href;
    experiencesAnchor.textContent = experiencesLink.textContent;
    moveInstrumentation(experiencesLink, experiencesAnchor);
    headerNav.append(experiencesAnchor);
  }

  // Request Invite Link
  const requestInviteLink = block.querySelector('[data-aue-prop="requestInviteLink"]');
  if (requestInviteLink) {
    const requestInviteAnchor = document.createElement('a');
    requestInviteAnchor.href = requestInviteLink.href;
    requestInviteAnchor.textContent = requestInviteLink.textContent;
    requestInviteAnchor.classList.add('header-request-invite');
    requestInviteAnchor.onclick = () => beginFormShow(); // Assuming beginFormShow is globally available or defined elsewhere
    moveInstrumentation(requestInviteLink, requestInviteAnchor);
    headerNav.append(requestInviteAnchor);
  }

  // Instagram Link and Icon Image
  const instaLink = block.querySelector('[data-aue-prop="instaLink"]');
  const instaIconImage = block.querySelector('[data-aue-prop="instaIconImage"]');
  if (instaLink) {
    const instaAnchor = document.createElement('a');
    instaAnchor.classList.add('header-insta-icon');
    instaAnchor.target = '_blank';
    instaAnchor.href = instaLink.href;
    moveInstrumentation(instaLink, instaAnchor);

    if (instaIconImage) {
      const pic = createOptimizedPicture(instaIconImage.src, instaIconImage.alt);
      moveInstrumentation(instaIconImage, pic.querySelector('img'));
      instaAnchor.append(pic);
    }
    headerNav.append(instaAnchor);
  } else if (instaIconImage) {
    // If no instaLink, just add the insta icon image directly
    const pic = createOptimizedPicture(instaIconImage.src, instaIconImage.alt);
    pic.classList.add('header-insta-icon'); // Add class if it's just the icon
    moveInstrumentation(instaIconImage, pic.querySelector('img'));
    headerNav.append(pic);
  }

  headerContainer.append(headerNav);

  const headerMenu = document.createElement('div');
  headerMenu.classList.add('header-menu');
  ['header-line-1', 'header-line-2', 'header-line-3'].forEach((lineClass) => {
    const line = document.createElement('div');
    line.classList.add('header-menuline', lineClass);
    headerMenu.append(line);
  });
  headerContainer.append(headerMenu);

  const headerPhoneMenu = document.createElement('section');
  headerPhoneMenu.classList.add('header-phone-menu');

  // Phone Menu Back Image
  const phoneMenuBackImage = block.querySelector('[data-aue-prop="phoneMenuBackImage"]');
  if (phoneMenuBackImage) {
    const pic = createOptimizedPicture(phoneMenuBackImage.src, phoneMenuBackImage.alt);
    pic.classList.add('header-phone-menu-back');
    moveInstrumentation(phoneMenuBackImage, pic.querySelector('img'));
    headerPhoneMenu.append(pic);
  }

  // Re-add About Link for phone menu
  if (aboutLink) {
    const aboutAnchor = document.createElement('a');
    aboutAnchor.href = aboutLink.href;
    aboutAnchor.textContent = aboutLink.textContent;
    // No need to moveInstrumentation again as it's already moved/wrapped
    headerPhoneMenu.append(aboutAnchor);
  }

  // Re-add Experiences Link for phone menu
  if (experiencesLink) {
    const experiencesAnchor = document.createElement('a');
    experiencesAnchor.href = experiencesLink.href;
    experiencesAnchor.textContent = experiencesLink.textContent;
    // No need to moveInstrumentation again as it's already moved/wrapped
    headerPhoneMenu.append(experiencesAnchor);
  }

  // Re-add Request Invite Link for phone menu
  if (requestInviteLink) {
    const requestInviteAnchor = document.createElement('a');
    requestInviteAnchor.href = requestInviteLink.href;
    requestInviteAnchor.textContent = requestInviteLink.textContent;
    requestInviteAnchor.classList.add('header-request-invite');
    requestInviteAnchor.onclick = () => beginFormShow();
    // No need to moveInstrumentation again as it's already moved/wrapped
    headerPhoneMenu.append(requestInviteAnchor);
  }

  // Re-add Instagram Link for phone menu
  if (instaLink) {
    const instaAnchor = document.createElement('a');
    instaAnchor.classList.add('header-insta-icon');
    instaAnchor.target = '_blank';
    instaAnchor.href = instaLink.href;
    // No need to moveInstrumentation again as it's already moved/wrapped
    if (instaIconImage) {
      const pic = createOptimizedPicture(instaIconImage.src, instaIconImage.alt);
      // No need to moveInstrumentation again as it's already moved/wrapped
      instaAnchor.append(pic);
    }
    headerPhoneMenu.append(instaAnchor);
  }

  // Phone Menu Logo Image
  const phoneMenuLogoImage = block.querySelector('[data-aue-prop="phoneMenuLogoImage"]');
  if (phoneMenuLogoImage) {
    const pic = createOptimizedPicture(phoneMenuLogoImage.src, phoneMenuLogoImage.alt);
    pic.classList.add('header-phone-menu-logo');
    moveInstrumentation(phoneMenuLogoImage, pic.querySelector('img'));
    headerPhoneMenu.append(pic);
  }

  block.innerHTML = '';
  block.append(headerContainer, headerPhoneMenu);
}
