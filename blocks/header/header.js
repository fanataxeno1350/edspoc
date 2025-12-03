import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('section');
  headerContainer.classList.add('header-container');

  const phoneMenu = document.createElement('section');
  phoneMenu.classList.add('header-phone-menu');

  // Desktop Logo and Home Link
  const homeLinkWrapper = document.createElement('a');
  const desktopLogo = block.querySelector('[data-aue-prop="desktopLogo"]');
  const homeLink = block.querySelector('[data-aue-prop="homeLink"]');
  if (homeLink) {
    homeLinkWrapper.href = homeLink.href;
    homeLinkWrapper.title = homeLink.title || 'home';
    homeLinkWrapper.rel = 'no-follow';
    moveInstrumentation(homeLink, homeLinkWrapper);
  }
  if (desktopLogo) {
    const pic = createOptimizedPicture(desktopLogo.src, desktopLogo.alt || 'maruti logo');
    pic.querySelector('img').classList.add('header-home-logo');
    homeLinkWrapper.append(pic);
    moveInstrumentation(desktopLogo, pic.querySelector('img'));
  }
  if (homeLinkWrapper.hasChildNodes()) {
    headerContainer.append(homeLinkWrapper);
  }

  const headerNav = document.createElement('div');
  headerNav.classList.add('header-nav');

  // About Link
  const aboutLink = block.querySelector('[data-aue-prop="aboutLink"]');
  if (aboutLink) {
    const newAboutLink = document.createElement('a');
    newAboutLink.href = aboutLink.href;
    newAboutLink.textContent = aboutLink.textContent;
    headerNav.append(newAboutLink);
    phoneMenu.append(newAboutLink.cloneNode(true)); // Clone for phone menu
    moveInstrumentation(aboutLink, newAboutLink);
  }

  // Experiences Link
  const experiencesLink = block.querySelector('[data-aue-prop="experiencesLink"]');
  if (experiencesLink) {
    const newExperiencesLink = document.createElement('a');
    newExperiencesLink.href = experiencesLink.href;
    newExperiencesLink.textContent = experiencesLink.textContent;
    headerNav.append(newExperiencesLink);
    phoneMenu.append(newExperiencesLink.cloneNode(true)); // Clone for phone menu
    moveInstrumentation(experiencesLink, newExperiencesLink);
  }

  // Request Invite Link
  const requestInviteLink = block.querySelector('[data-aue-prop="requestInviteLink"]');
  if (requestInviteLink) {
    const newRequestInviteLink = document.createElement('a');
    newRequestInviteLink.href = requestInviteLink.href;
    newRequestInviteLink.textContent = requestInviteLink.textContent;
    newRequestInviteLink.classList.add('header-request-invite');
    newRequestInviteLink.setAttribute('onclick', 'beginFormShow()'); // Assuming this is a static function call
    headerNav.append(newRequestInviteLink);
    phoneMenu.append(newRequestInviteLink.cloneNode(true)); // Clone for phone menu
    moveInstrumentation(requestInviteLink, newRequestInviteLink);
  }

  // Instagram Link and Icon
  const instagramLink = block.querySelector('[data-aue-prop="instagramLink"]');
  const instagramIcon = block.querySelector('[data-aue-prop="instagramIcon"]');
  if (instagramLink || instagramIcon) {
    const newInstagramLink = document.createElement('a');
    newInstagramLink.classList.add('header-insta-icon');
    newInstagramLink.target = '_blank';
    if (instagramLink) {
      newInstagramLink.href = instagramLink.href;
      moveInstrumentation(instagramLink, newInstagramLink);
    }
    if (instagramIcon) {
      const pic = createOptimizedPicture(instagramIcon.src, instagramIcon.alt || 'profile icon');
      newInstagramLink.append(pic);
      moveInstrumentation(instagramIcon, pic.querySelector('img'));
    }
    if (newInstagramLink.hasChildNodes() || newInstagramLink.href) {
      headerNav.append(newInstagramLink);
      phoneMenu.append(newInstagramLink.cloneNode(true)); // Clone for phone menu
    }
  }

  if (headerNav.hasChildNodes()) {
    headerContainer.append(headerNav);
  }

  // Header Menu (Hamburger icon)
  const headerMenu = document.createElement('div');
  headerMenu.classList.add('header-menu');
  const line1 = document.createElement('div');
  line1.classList.add('header-menuline', 'header-line-1');
  const line2 = document.createElement('div');
  line2.classList.add('header-menuline', 'header-line-2');
  const line3 = document.createElement('div');
  line3.classList.add('header-menuline', 'header-line-3');
  headerMenu.append(line1, line2, line3);
  headerContainer.append(headerMenu);

  // Phone Menu Background
  const phoneMenuBackground = block.querySelector('[data-aue-prop="phoneMenuBackground"]');
  if (phoneMenuBackground) {
    const pic = createOptimizedPicture(phoneMenuBackground.src, phoneMenuBackground.alt || '');
    pic.querySelector('img').classList.add('header-phone-menu-back');
    phoneMenu.prepend(pic);
    moveInstrumentation(phoneMenuBackground, pic.querySelector('img'));
  }

  // Phone Menu Logo
  const phoneMenuLogo = block.querySelector('[data-aue-prop="phoneMenuLogo"]');
  if (phoneMenuLogo) {
    const pic = createOptimizedPicture(phoneMenuLogo.src, phoneMenuLogo.alt || 'maruti mobile logo');
    pic.querySelector('img').classList.add('header-phone-menu-logo');
    phoneMenu.append(pic);
    moveInstrumentation(phoneMenuLogo, pic.querySelector('img'));
  }

  block.innerHTML = '';
  block.append(headerContainer, phoneMenu);
}
