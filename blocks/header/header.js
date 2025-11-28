//Header
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('section');
  headerContainer.classList.add('header-container');
  moveInstrumentation(block, headerContainer);

  const homeLink = block.querySelector('[data-aue-prop="homeLink"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"] img');
  if (homeLink && logoImage) {
    const homeAnchor = document.createElement('a');
    homeAnchor.rel = 'no-follow';
    homeAnchor.title = 'home';
    homeAnchor.href = homeLink.href;
    homeAnchor.append(createOptimizedPicture(logoImage.src, logoImage.alt));
    moveInstrumentation(homeLink, homeAnchor);
    moveInstrumentation(logoImage, homeAnchor.querySelector('img'));
    headerContainer.append(homeAnchor);
  } else if (homeLink) {
    const homeAnchor = document.createElement('a');
    homeAnchor.rel = 'no-follow';
    homeAnchor.title = 'home';
    homeAnchor.href = homeLink.href;
    homeAnchor.append(...homeLink.childNodes);
    moveInstrumentation(homeLink, homeAnchor);
    headerContainer.append(homeAnchor);
  } else if (logoImage) {
    const homeAnchor = document.createElement('a');
    homeAnchor.rel = 'no-follow';
    homeAnchor.title = 'home';
    homeAnchor.href = '/'; // Default if no link is provided
    homeAnchor.append(createOptimizedPicture(logoImage.src, logoImage.alt));
    moveInstrumentation(logoImage, homeAnchor.querySelector('img'));
    headerContainer.append(homeAnchor);
  }

  const headerNav = document.createElement('div');
  headerNav.classList.add('header-nav');
  headerContainer.append(headerNav);

  const aboutLink = block.querySelector('[data-aue-prop="aboutLink"]');
  if (aboutLink) {
    const aboutAnchor = document.createElement('a');
    aboutAnchor.href = aboutLink.href;
    aboutAnchor.append(...aboutLink.childNodes);
    moveInstrumentation(aboutLink, aboutAnchor);
    headerNav.append(aboutAnchor);
  }

  const experiencesLink = block.querySelector('[data-aue-prop="experiencesLink"]');
  if (experiencesLink) {
    const experiencesAnchor = document.createElement('a');
    experiencesAnchor.href = experiencesLink.href;
    experiencesAnchor.append(...experiencesLink.childNodes);
    moveInstrumentation(experiencesLink, experiencesAnchor);
    headerNav.append(experiencesAnchor);
  }

  const requestInviteLink = block.querySelector('[data-aue-prop="requestInviteLink"]');
  if (requestInviteLink) {
    const requestInviteAnchor = document.createElement('a');
    requestInviteAnchor.classList.add('header-request-invite');
    requestInviteAnchor.href = requestInviteLink.href;
    requestInviteAnchor.append(...requestInviteLink.childNodes);
    moveInstrumentation(requestInviteLink, requestInviteAnchor);
    headerNav.append(requestInviteAnchor);
  }

  const instagramLink = block.querySelector('[data-aue-prop="instagramLink"]');
  const instagramIcon = block.querySelector('[data-aue-prop="instagramIcon"] img');
  if (instagramLink && instagramIcon) {
    const instagramAnchor = document.createElement('a');
    instagramAnchor.classList.add('header-insta-icon');
    instagramAnchor.target = '_blank';
    instagramAnchor.href = instagramLink.href;
    instagramAnchor.append(createOptimizedPicture(instagramIcon.src, instagramIcon.alt));
    moveInstrumentation(instagramLink, instagramAnchor);
    moveInstrumentation(instagramIcon, instagramAnchor.querySelector('img'));
    headerNav.append(instagramAnchor);
  } else if (instagramLink) {
    const instagramAnchor = document.createElement('a');
    instagramAnchor.classList.add('header-insta-icon');
    instagramAnchor.target = '_blank';
    instagramAnchor.href = instagramLink.href;
    instagramAnchor.append(...instagramLink.childNodes);
    moveInstrumentation(instagramLink, instagramAnchor);
    headerNav.append(instagramAnchor);
  } else if (instagramIcon) {
    const instagramAnchor = document.createElement('a');
    instagramAnchor.classList.add('header-insta-icon');
    instagramAnchor.target = '_blank';
    instagramAnchor.href = '#'; // Default if no link is provided
    instagramAnchor.append(createOptimizedPicture(instagramIcon.src, instagramIcon.alt));
    moveInstrumentation(instagramIcon, instagramAnchor.querySelector('img'));
    headerNav.append(instagramAnchor);
  }

  const headerMenu = document.createElement('div');
  headerMenu.classList.add('header-menu');
  headerContainer.append(headerMenu);

  for (let i = 1; i <= 3; i += 1) {
    const line = document.createElement('div');
    line.classList.add('header-menuline', `header-line-${i}`);
    headerMenu.append(line);
  }

  const headerPhoneMenu = document.createElement('section');
  headerPhoneMenu.classList.add('header-phone-menu');

  const phoneMenuBackImage = block.querySelector('[data-aue-prop="phoneMenuBackImage"] img');
  if (phoneMenuBackImage) {
    const pic = createOptimizedPicture(phoneMenuBackImage.src, phoneMenuBackImage.alt);
    pic.classList.add('header-phone-menu-back');
    moveInstrumentation(phoneMenuBackImage, pic.querySelector('img'));
    headerPhoneMenu.append(pic);
  }

  if (aboutLink) { // Re-using existing aboutLink for phone menu
    const aboutAnchor = document.createElement('a');
    aboutAnchor.href = aboutLink.href;
    aboutAnchor.append(...aboutLink.childNodes);
    moveInstrumentation(aboutLink, aboutAnchor);
    headerPhoneMenu.append(aboutAnchor);
  }

  if (experiencesLink) { // Re-using existing experiencesLink for phone menu
    const experiencesAnchor = document.createElement('a');
    experiencesAnchor.href = experiencesLink.href;
    experiencesAnchor.append(...experiencesLink.childNodes);
    moveInstrumentation(experiencesLink, experiencesAnchor);
    headerPhoneMenu.append(experiencesAnchor);
  }

  if (requestInviteLink) { // Re-using existing requestInviteLink for phone menu
    const requestInviteAnchor = document.createElement('a');
    requestInviteAnchor.classList.add('header-request-invite');
    requestInviteAnchor.href = requestInviteLink.href;
    requestInviteAnchor.append(...requestInviteLink.childNodes);
    moveInstrumentation(requestInviteLink, requestInviteAnchor);
    headerPhoneMenu.append(requestInviteAnchor);
  }

  if (instagramLink && instagramIcon) { // Re-using existing instagramLink and instagramIcon for phone menu
    const instagramAnchor = document.createElement('a');
    instagramAnchor.classList.add('header-insta-icon');
    instagramAnchor.target = '_blank';
    instagramAnchor.href = instagramLink.href;
    instagramAnchor.append(createOptimizedPicture(instagramIcon.src, instagramIcon.alt));
    moveInstrumentation(instagramLink, instagramAnchor);
    moveInstrumentation(instagramIcon, instagramAnchor.querySelector('img'));
    headerPhoneMenu.append(instagramAnchor);
  } else if (instagramLink) {
    const instagramAnchor = document.createElement('a');
    instagramAnchor.classList.add('header-insta-icon');
    instagramAnchor.target = '_blank';
    instagramAnchor.href = instagramLink.href;
    instagramAnchor.append(...instagramLink.childNodes);
    moveInstrumentation(instagramLink, instagramAnchor);
    headerPhoneMenu.append(instagramAnchor);
  } else if (instagramIcon) {
    const instagramAnchor = document.createElement('a');
    instagramAnchor.classList.add('header-insta-icon');
    instagramAnchor.target = '_blank';
    instagramAnchor.href = '#'; // Default if no link is provided
    instagramAnchor.append(createOptimizedPicture(instagramIcon.src, instagramIcon.alt));
    moveInstrumentation(instagramIcon, instagramAnchor.querySelector('img'));
    headerPhoneMenu.append(instagramAnchor);
  }

  const phoneMenuLogo = block.querySelector('[data-aue-prop="phoneMenuLogo"] img');
  if (phoneMenuLogo) {
    const pic = createOptimizedPicture(phoneMenuLogo.src, phoneMenuLogo.alt);
    pic.classList.add('header-phone-menu-logo');
    moveInstrumentation(phoneMenuLogo, pic.querySelector('img'));
    headerPhoneMenu.append(pic);
  }

  block.innerHTML = '';
  block.append(headerContainer, headerPhoneMenu);
}
