import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('section');
  headerContainer.classList.add('header-container');
  moveInstrumentation(block, headerContainer);

  // Home Link and Logo Desktop
  const homeLinkDesktop = block.querySelector('[data-aue-prop="homeLink"]');
  const logoDesktop = block.querySelector('[data-aue-prop="logoDesktop"] img');
  if (homeLinkDesktop && logoDesktop) {
    const homeAnchor = document.createElement('a');
    homeAnchor.rel = 'no-follow';
    homeAnchor.title = homeLinkDesktop.textContent;
    homeAnchor.href = homeLinkDesktop.href || '#';
    homeAnchor.classList.add('header-home-logo');
    moveInstrumentation(homeLinkDesktop, homeAnchor);
    const pic = createOptimizedPicture(logoDesktop.src, logoDesktop.alt);
    homeAnchor.append(pic);
    moveInstrumentation(logoDesktop, pic.querySelector('img'));
    headerContainer.append(homeAnchor);
  } else if (homeLinkDesktop) {
    const homeAnchor = document.createElement('a');
    homeAnchor.rel = 'no-follow';
    homeAnchor.title = homeLinkDesktop.textContent;
    homeAnchor.href = homeLinkDesktop.href || '#';
    homeAnchor.classList.add('header-home-logo');
    homeAnchor.textContent = homeLinkDesktop.textContent;
    moveInstrumentation(homeLinkDesktop, homeAnchor);
    headerContainer.append(homeAnchor);
  } else if (logoDesktop) {
    const homeAnchor = document.createElement('a');
    homeAnchor.rel = 'no-follow';
    homeAnchor.title = logoDesktop.alt || '';
    homeAnchor.href = '#';
    homeAnchor.classList.add('header-home-logo');
    const pic = createOptimizedPicture(logoDesktop.src, logoDesktop.alt);
    homeAnchor.append(pic);
    moveInstrumentation(logoDesktop, pic.querySelector('img'));
    headerContainer.append(homeAnchor);
  }

  const headerNav = document.createElement('div');
  headerNav.classList.add('header-nav');
  headerContainer.append(headerNav);

  // About Link Desktop
  const aboutLinkDesktop = block.querySelector('[data-aue-prop="aboutLinkDesktop"]');
  if (aboutLinkDesktop) {
    const aboutAnchor = document.createElement('a');
    aboutAnchor.href = aboutLinkDesktop.href || '#';
    aboutAnchor.textContent = aboutLinkDesktop.textContent;
    moveInstrumentation(aboutLinkDesktop, aboutAnchor);
    headerNav.append(aboutAnchor);
  }

  // Experiences Link Desktop
  const experiencesLinkDesktop = block.querySelector('[data-aue-prop="experiencesLinkDesktop"]');
  if (experiencesLinkDesktop) {
    const experiencesAnchor = document.createElement('a');
    experiencesAnchor.href = experiencesLinkDesktop.href || '#';
    experiencesAnchor.textContent = experiencesLinkDesktop.textContent;
    moveInstrumentation(experiencesLinkDesktop, experiencesAnchor);
    headerNav.append(experiencesAnchor);
  }

  // Request Invite Desktop
  const requestInviteDesktop = block.querySelector('[data-aue-prop="requestInviteDesktop"]');
  if (requestInviteDesktop) {
    const requestAnchor = document.createElement('a');
    requestAnchor.href = requestInviteDesktop.href || 'javascript:void(0)';
    requestAnchor.classList.add('header-request-invite');
    requestAnchor.textContent = requestInviteDesktop.textContent;
    if (requestAnchor.href === 'javascript:void(0)') {
      requestAnchor.setAttribute('onclick', 'beginFormShow()');
    }
    moveInstrumentation(requestInviteDesktop, requestAnchor);
    headerNav.append(requestAnchor);
  }

  // Instagram Link and Icon Desktop
  const instaLinkDesktop = block.querySelector('[data-aue-prop="instaLinkDesktop"]');
  const instaIconDesktop = block.querySelector('[data-aue-prop="instaIconDesktop"] img');
  if (instaLinkDesktop && instaIconDesktop) {
    const instaAnchor = document.createElement('a');
    instaAnchor.classList.add('header-insta-icon');
    instaAnchor.target = '_blank';
    instaAnchor.href = instaLinkDesktop.href || '#';
    moveInstrumentation(instaLinkDesktop, instaAnchor);
    const pic = createOptimizedPicture(instaIconDesktop.src, instaIconDesktop.alt);
    instaAnchor.append(pic);
    moveInstrumentation(instaIconDesktop, pic.querySelector('img'));
    headerNav.append(instaAnchor);
  } else if (instaLinkDesktop) {
    const instaAnchor = document.createElement('a');
    instaAnchor.classList.add('header-insta-icon');
    instaAnchor.target = '_blank';
    instaAnchor.href = instaLinkDesktop.href || '#';
    instaAnchor.textContent = instaLinkDesktop.textContent;
    moveInstrumentation(instaLinkDesktop, instaAnchor);
    headerNav.append(instaAnchor);
  } else if (instaIconDesktop) {
    const instaAnchor = document.createElement('a');
    instaAnchor.classList.add('header-insta-icon');
    instaAnchor.target = '_blank';
    instaAnchor.href = '#';
    const pic = createOptimizedPicture(instaIconDesktop.src, instaIconDesktop.alt);
    instaAnchor.append(pic);
    moveInstrumentation(instaIconDesktop, pic.querySelector('img'));
    headerNav.append(instaAnchor);
  }

  const headerMenu = document.createElement('div');
  headerMenu.classList.add('header-menu');
  for (let i = 1; i <= 3; i += 1) {
    const line = document.createElement('div');
    line.classList.add('header-menuline', `header-line-${i}`);
    headerMenu.append(line);
  }
  headerContainer.append(headerMenu);

  const headerPhoneMenu = document.createElement('section');
  headerPhoneMenu.classList.add('header-phone-menu');

  // Phone Menu Background
  const phoneMenuBg = block.querySelector('[data-aue-prop="phoneMenuBg"] img');
  if (phoneMenuBg) {
    const pic = createOptimizedPicture(phoneMenuBg.src, phoneMenuBg.alt);
    pic.classList.add('header-phone-menu-back');
    headerPhoneMenu.append(pic);
    moveInstrumentation(phoneMenuBg, pic.querySelector('img'));
  }

  // About Link Mobile
  const aboutLinkMobile = block.querySelector('[data-aue-prop="aboutLinkMobile"]');
  if (aboutLinkMobile) {
    const aboutAnchor = document.createElement('a');
    aboutAnchor.href = aboutLinkMobile.href || '#';
    aboutAnchor.textContent = aboutLinkMobile.textContent;
    moveInstrumentation(aboutLinkMobile, aboutAnchor);
    headerPhoneMenu.append(aboutAnchor);
  }

  // Experiences Link Mobile
  const experiencesLinkMobile = block.querySelector('[data-aue-prop="experiencesLinkMobile"]');
  if (experiencesLinkMobile) {
    const experiencesAnchor = document.createElement('a');
    experiencesAnchor.href = experiencesLinkMobile.href || '#';
    experiencesAnchor.textContent = experiencesLinkMobile.textContent;
    moveInstrumentation(experiencesLinkMobile, experiencesAnchor);
    headerPhoneMenu.append(experiencesAnchor);
  }

  // Request Invite Mobile
  const requestInviteMobile = block.querySelector('[data-aue-prop="requestInviteMobile"]');
  if (requestInviteMobile) {
    const requestAnchor = document.createElement('a');
    requestAnchor.href = requestInviteMobile.href || 'javascript:void(0)';
    requestAnchor.classList.add('header-request-invite');
    requestAnchor.textContent = requestInviteMobile.textContent;
    if (requestAnchor.href === 'javascript:void(0)') {
      requestAnchor.setAttribute('onclick', 'beginFormShow()');
    }
    moveInstrumentation(requestInviteMobile, requestAnchor);
    headerPhoneMenu.append(requestAnchor);
  }

  // Instagram Link and Icon Mobile
  const instaLinkMobile = block.querySelector('[data-aue-prop="instaLinkMobile"]');
  const instaIconMobile = block.querySelector('[data-aue-prop="instaIconMobile"] img');
  if (instaLinkMobile && instaIconMobile) {
    const instaAnchor = document.createElement('a');
    instaAnchor.classList.add('header-insta-icon');
    instaAnchor.target = '_blank';
    instaAnchor.href = instaLinkMobile.href || '#';
    moveInstrumentation(instaLinkMobile, instaAnchor);
    const pic = createOptimizedPicture(instaIconMobile.src, instaIconMobile.alt);
    instaAnchor.append(pic);
    moveInstrumentation(instaIconMobile, pic.querySelector('img'));
    headerPhoneMenu.append(instaAnchor);
  } else if (instaLinkMobile) {
    const instaAnchor = document.createElement('a');
    instaAnchor.classList.add('header-insta-icon');
    instaAnchor.target = '_blank';
    instaAnchor.href = instaLinkMobile.href || '#';
    instaAnchor.textContent = instaLinkMobile.textContent;
    moveInstrumentation(instaLinkMobile, instaAnchor);
    headerPhoneMenu.append(instaAnchor);
  } else if (instaIconMobile) {
    const instaAnchor = document.createElement('a');
    instaAnchor.classList.add('header-insta-icon');
    instaAnchor.target = '_blank';
    instaAnchor.href = '#';
    const pic = createOptimizedPicture(instaIconMobile.src, instaIconMobile.alt);
    instaAnchor.append(pic);
    moveInstrumentation(instaIconMobile, pic.querySelector('img'));
    headerPhoneMenu.append(instaAnchor);
  }

  // Logo Mobile
  const logoMobile = block.querySelector('[data-aue-prop="logoMobile"] img');
  if (logoMobile) {
    const pic = createOptimizedPicture(logoMobile.src, logoMobile.alt);
    pic.classList.add('header-phone-menu-logo');
    headerPhoneMenu.append(pic);
    moveInstrumentation(logoMobile, pic.querySelector('img'));
  }

  block.innerHTML = '';
  block.append(headerContainer, headerPhoneMenu);
}
