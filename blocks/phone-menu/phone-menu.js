import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const phoneMenuContainer = document.createElement('section');
  phoneMenuContainer.classList.add('phone-menu-container');
  moveInstrumentation(block, phoneMenuContainer);

  const backgroundImage = block.querySelector('[data-aue-prop="backgroundImage"]');
  if (backgroundImage) {
    const img = backgroundImage.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('phone-menu-back');
      moveInstrumentation(img, pic.querySelector('img'));
      phoneMenuContainer.append(pic);
    } else {
      // If it's an anchor, create an image element
      const anchor = backgroundImage.querySelector('a');
      if (anchor && anchor.href) {
        const imgElement = document.createElement('img');
        imgElement.src = anchor.href;
        imgElement.alt = anchor.title || '';
        imgElement.classList.add('phone-menu-back');
        moveInstrumentation(anchor, imgElement);
        phoneMenuContainer.append(imgElement);
      }
    }
  }

  const aboutLink = block.querySelector('[data-aue-prop="aboutLink"]');
  if (aboutLink) {
    const anchor = aboutLink.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.textContent = anchor.textContent;
      moveInstrumentation(anchor, newAnchor);
      phoneMenuContainer.append(newAnchor);
    }
  }

  const experiencesLink = block.querySelector('[data-aue-prop="experiencesLink"]');
  if (experiencesLink) {
    const anchor = experiencesLink.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.textContent = anchor.textContent;
      moveInstrumentation(anchor, newAnchor);
      phoneMenuContainer.append(newAnchor);
    }
  }

  const requestInviteLink = block.querySelector('[data-aue-prop="requestInviteLink"]');
  if (requestInviteLink) {
    const anchor = requestInviteLink.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.textContent = anchor.textContent;
      newAnchor.classList.add('phone-menu-request-invite');
      // Preserve onclick if present
      if (anchor.onclick) {
        newAnchor.onclick = anchor.onclick;
      }
      moveInstrumentation(anchor, newAnchor);
      phoneMenuContainer.append(newAnchor);
    }
  }

  const instagramLink = block.querySelector('[data-aue-prop="instagramLink"]');
  const instagramIcon = block.querySelector('[data-aue-prop="instagramIcon"]');
  if (instagramLink || instagramIcon) {
    const newAnchor = document.createElement('a');
    newAnchor.classList.add('phone-menu-insta-icon');
    newAnchor.target = '_blank';

    let linkHref = '';
    if (instagramLink) {
      const anchor = instagramLink.querySelector('a');
      if (anchor) {
        linkHref = anchor.href;
        moveInstrumentation(anchor, newAnchor);
      }
    }
    newAnchor.href = linkHref || '#'; // Default href if not found

    if (instagramIcon) {
      const img = instagramIcon.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, pic.querySelector('img'));
        newAnchor.append(pic);
      } else {
        // If it's an anchor, create an image element
        const anchor = instagramIcon.querySelector('a');
        if (anchor && anchor.href) {
          const imgElement = document.createElement('img');
          imgElement.src = anchor.href;
          imgElement.alt = anchor.title || '';
          moveInstrumentation(anchor, imgElement);
          newAnchor.append(imgElement);
        }
      }
    }
    phoneMenuContainer.append(newAnchor);
  }

  const logo = block.querySelector('[data-aue-prop="logo"]');
  if (logo) {
    const img = logo.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('phone-menu-logo');
      moveInstrumentation(img, pic.querySelector('img'));
      phoneMenuContainer.append(pic);
    } else {
      // If it's an anchor, create an image element
      const anchor = logo.querySelector('a');
      if (anchor && anchor.href) {
        const imgElement = document.createElement('img');
        imgElement.src = anchor.href;
        imgElement.alt = anchor.title || '';
        imgElement.classList.add('phone-menu-logo');
        moveInstrumentation(anchor, imgElement);
        phoneMenuContainer.append(imgElement);
      }
    }
  }

  block.innerHTML = '';
  block.append(phoneMenuContainer);
}
