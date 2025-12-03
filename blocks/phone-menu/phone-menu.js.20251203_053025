import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const phoneMenuContainer = document.createElement('section');
  phoneMenuContainer.classList.add('phone-menu-container');
  moveInstrumentation(block, phoneMenuContainer);

  // Back Image
  let backImage = block.querySelector('[data-aue-prop="backImage"]');
  if (backImage) {
    const pic = createOptimizedPicture(backImage.src, backImage.alt);
    const newImg = pic.querySelector('img');
    newImg.classList.add('phone-menu-back');
    phoneMenuContainer.append(pic);
    moveInstrumentation(backImage, newImg);
  }

  // About Link
  const aboutLink = block.querySelector('[data-aue-prop="aboutLink"]');
  if (aboutLink) {
    phoneMenuContainer.append(aboutLink);
  }

  // Experiences Link
  const experiencesLink = block.querySelector('[data-aue-prop="experiencesLink"]');
  if (experiencesLink) {
    phoneMenuContainer.append(experiencesLink);
  }

  // Request Invite Link
  const requestInviteLink = block.querySelector('[data-aue-prop="requestInviteLink"]');
  if (requestInviteLink) {
    requestInviteLink.classList.add('phone-menu-request-invite');
    requestInviteLink.setAttribute('onclick', 'beginFormShow()');
    phoneMenuContainer.append(requestInviteLink);
  }

  // Instagram Link and Icon
  const instagramLink = block.querySelector('[data-aue-prop="instagramLink"]');
  const instagramIcon = block.querySelector('[data-aue-prop="instagramIcon"]');

  if (instagramLink) {
    instagramLink.classList.add('phone-menu-insta-icon');
    instagramLink.setAttribute('target', '_blank');
    if (instagramIcon) {
      const pic = createOptimizedPicture(instagramIcon.src, instagramIcon.alt);
      const newImg = pic.querySelector('img');
      instagramLink.prepend(pic);
      moveInstrumentation(instagramIcon, newImg);
    }
    phoneMenuContainer.append(instagramLink);
  } else if (instagramIcon) { // If there's an icon but no link, create a dummy link to hold the icon
    const dummyLink = document.createElement('a');
    dummyLink.classList.add('phone-menu-insta-icon');
    dummyLink.setAttribute('target', '_blank');
    dummyLink.href = '#'; // Fallback href
    const pic = createOptimizedPicture(instagramIcon.src, instagramIcon.alt);
    const newImg = pic.querySelector('img');
    dummyLink.append(pic);
    phoneMenuContainer.append(dummyLink);
    moveInstrumentation(instagramIcon, newImg);
  }

  // Logo Image
  let logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    const newImg = pic.querySelector('img');
    newImg.classList.add('phone-menu-logo');
    phoneMenuContainer.append(pic);
    moveInstrumentation(logoImage, newImg);
  }

  block.innerHTML = '';
  block.append(phoneMenuContainer);
}
