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
    const img = pic.querySelector('img');
    img.classList.add('phone-menu-back');
    moveInstrumentation(backImage, img);
    phoneMenuContainer.append(pic);
  }

  // About Link
  const aboutLink = block.querySelector('[data-aue-prop="aboutLink"]');
  if (aboutLink) {
    const newAboutLink = document.createElement('a');
    newAboutLink.href = aboutLink.href;
    newAboutLink.textContent = aboutLink.textContent;
    moveInstrumentation(aboutLink, newAboutLink);
    phoneMenuContainer.append(newAboutLink);
  }

  // Experiences Link
  const experiencesLink = block.querySelector('[data-aue-prop="experiencesLink"]');
  if (experiencesLink) {
    const newExperiencesLink = document.createElement('a');
    newExperiencesLink.href = experiencesLink.href;
    newExperiencesLink.textContent = experiencesLink.textContent;
    moveInstrumentation(experiencesLink, newExperiencesLink);
    phoneMenuContainer.append(newExperiencesLink);
  }

  // Request Invite Link
  const requestInviteLink = block.querySelector('[data-aue-prop="requestInviteLink"]');
  if (requestInviteLink) {
    const newRequestInviteLink = document.createElement('a');
    newRequestInviteLink.href = requestInviteLink.href;
    newRequestInviteLink.textContent = requestInviteLink.textContent;
    newRequestInviteLink.classList.add('phone-menu-request-invite');
    newRequestInviteLink.setAttribute('onclick', 'beginFormShow()');
    moveInstrumentation(requestInviteLink, newRequestInviteLink);
    phoneMenuContainer.append(newRequestInviteLink);
  }

  // Instagram Link and Icon
  const instagramLink = block.querySelector('[data-aue-prop="instagramLink"]');
  const instagramIcon = block.querySelector('[data-aue-prop="instagramIcon"]');

  if (instagramLink || instagramIcon) {
    const newInstagramLink = document.createElement('a');
    newInstagramLink.classList.add('phone-menu-insta-icon');
    newInstagramLink.target = '_blank';

    if (instagramLink) {
      newInstagramLink.href = instagramLink.href;
      moveInstrumentation(instagramLink, newInstagramLink);
    } else {
      // If only icon is present, still create a link but with a placeholder href or no href
      newInstagramLink.href = 'javascript:void(0)';
    }

    if (instagramIcon) {
      const pic = createOptimizedPicture(instagramIcon.src, instagramIcon.alt);
      const img = pic.querySelector('img');
      moveInstrumentation(instagramIcon, img);
      newInstagramLink.append(pic);
    }
    phoneMenuContainer.append(newInstagramLink);
  }

  // Logo Image
  let logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const pic = createOptimizedPicture(logoImage.src, logoImage.alt);
    const img = pic.querySelector('img');
    img.classList.add('phone-menu-logo');
    moveInstrumentation(logoImage, img);
    phoneMenuContainer.append(pic);
  }

  block.replaceChildren(phoneMenuContainer);
}
