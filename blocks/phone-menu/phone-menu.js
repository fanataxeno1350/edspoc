import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const phoneMenuContainer = document.createElement('section');
  phoneMenuContainer.classList.add('phone-menu-container');
  moveInstrumentation(block, phoneMenuContainer);

  // Background Image
  const backgroundImageWrapper = block.querySelector('[data-aue-prop="backgroundImage"]');
  if (backgroundImageWrapper) {
    const img = backgroundImageWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('phone-menu-back');
      moveInstrumentation(img, pic.querySelector('img'));
      phoneMenuContainer.append(pic);
    } else {
      // If img is null, but backgroundImageWrapper exists, append its content as a fallback
      const fallbackImg = document.createElement('img');
      fallbackImg.classList.add('phone-menu-back');
      fallbackImg.src = backgroundImageWrapper.textContent.trim(); // Assuming the text content is the image URL
      phoneMenuContainer.append(fallbackImg);
      moveInstrumentation(backgroundImageWrapper, fallbackImg);
    }
  }

  // About Link
  const aboutLinkWrapper = block.querySelector('[data-aue-prop="aboutLink"]');
  if (aboutLinkWrapper) {
    const a = aboutLinkWrapper.querySelector('a');
    if (a) {
      phoneMenuContainer.append(a);
      moveInstrumentation(aboutLinkWrapper, a);
    } else {
      // Fallback for aem-content if <a> is not directly found
      const newA = document.createElement('a');
      newA.href = aboutLinkWrapper.textContent.trim();
      newA.textContent = aboutLinkWrapper.textContent.trim();
      phoneMenuContainer.append(newA);
      moveInstrumentation(aboutLinkWrapper, newA);
    }
  }

  // Experiences Link
  const experiencesLinkWrapper = block.querySelector('[data-aue-prop="experiencesLink"]');
  if (experiencesLinkWrapper) {
    const a = experiencesLinkWrapper.querySelector('a');
    if (a) {
      phoneMenuContainer.append(a);
      moveInstrumentation(experiencesLinkWrapper, a);
    } else {
      const newA = document.createElement('a');
      newA.href = experiencesLinkWrapper.textContent.trim();
      newA.textContent = experiencesLinkWrapper.textContent.trim();
      phoneMenuContainer.append(newA);
      moveInstrumentation(experiencesLinkWrapper, newA);
    }
  }

  // Request Invite Link
  const requestInviteLinkWrapper = block.querySelector('[data-aue-prop="requestInviteLink"]');
  if (requestInviteLinkWrapper) {
    const a = requestInviteLinkWrapper.querySelector('a');
    if (a) {
      a.classList.add('phone-menu-request-invite');
      phoneMenuContainer.append(a);
      moveInstrumentation(requestInviteLinkWrapper, a);
    } else {
      const newA = document.createElement('a');
      newA.href = requestInviteLinkWrapper.textContent.trim();
      newA.textContent = requestInviteLinkWrapper.textContent.trim();
      newA.classList.add('phone-menu-request-invite');
      phoneMenuContainer.append(newA);
      moveInstrumentation(requestInviteLinkWrapper, newA);
    }
  }

  // Instagram Link and Icon
  const instagramLinkWrapper = block.querySelector('[data-aue-prop="instagramLink"]');
  const instagramIconWrapper = block.querySelector('[data-aue-prop="instagramIcon"]');

  if (instagramLinkWrapper || instagramIconWrapper) {
    const instaLink = document.createElement('a');
    instaLink.classList.add('phone-menu-insta-icon');
    instaLink.target = '_blank';

    if (instagramLinkWrapper) {
      const a = instagramLinkWrapper.querySelector('a');
      if (a) {
        instaLink.href = a.href;
        moveInstrumentation(instagramLinkWrapper, instaLink);
      } else {
        instaLink.href = instagramLinkWrapper.textContent.trim();
        moveInstrumentation(instagramLinkWrapper, instaLink);
      }
    }

    if (instagramIconWrapper) {
      const img = instagramIconWrapper.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, pic.querySelector('img'));
        instaLink.append(pic);
      } else {
        const fallbackImg = document.createElement('img');
        fallbackImg.src = instagramIconWrapper.textContent.trim();
        fallbackImg.alt = 'Instagram Icon';
        instaLink.append(fallbackImg);
        moveInstrumentation(instagramIconWrapper, fallbackImg);
      }
    }

    if (instaLink.hasChildNodes() || instaLink.href) {
      phoneMenuContainer.append(instaLink);
    }
  }

  // Logo Image
  const logoImageWrapper = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImageWrapper) {
    const img = logoImageWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('phone-menu-logo');
      moveInstrumentation(img, pic.querySelector('img'));
      phoneMenuContainer.append(pic);
    } else {
      const fallbackImg = document.createElement('img');
      fallbackImg.classList.add('phone-menu-logo');
      fallbackImg.src = logoImageWrapper.textContent.trim();
      phoneMenuContainer.append(fallbackImg);
      moveInstrumentation(logoImageWrapper, fallbackImg);
    }
  }

  block.innerHTML = '';
  block.append(phoneMenuContainer);
}
