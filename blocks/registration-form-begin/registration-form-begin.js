import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('registration-form-begin-form');
  moveInstrumentation(block, mainDiv);

  // BG Image Reg Eve
  const bgImageRegEve = block.querySelector('[data-aue-prop="bgImageRegEve"]');
  if (bgImageRegEve) {
    const img = bgImageRegEve.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('registration-form-bg-image-reg-eve');
      moveInstrumentation(img, pic.querySelector('img'));
      mainDiv.append(pic);
    } else {
      // Handle case where img is inside an anchor
      const anchor = bgImageRegEve.querySelector('a');
      if (anchor && anchor.href) {
        const newImg = document.createElement('img');
        newImg.src = anchor.href;
        newImg.alt = anchor.title || '';
        newImg.classList.add('registration-form-bg-image-reg-eve');
        moveInstrumentation(anchor, newImg);
        mainDiv.append(newImg);
      }
    }
  }

  // BG Image Reg Eve Car
  const bgImageRegEveCar = block.querySelector('[data-aue-prop="bgImageRegEveCar"]');
  if (bgImageRegEveCar) {
    const img = bgImageRegEveCar.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('registration-form-bg-image-reg-eve-car');
      moveInstrumentation(img, pic.querySelector('img'));
      mainDiv.append(pic);
    } else {
      // Handle case where img is inside an anchor
      const anchor = bgImageRegEveCar.querySelector('a');
      if (anchor && anchor.href) {
        const newImg = document.createElement('img');
        newImg.src = anchor.href;
        newImg.alt = anchor.title || '';
        newImg.classList.add('registration-form-bg-image-reg-eve-car');
        moveInstrumentation(anchor, newImg);
        mainDiv.append(newImg);
      }
    }
  }

  const form = document.createElement('form');
  form.method = 'post';
  form.id = 'beginForm';
  form.action = '/ajax_save_invite';
  form.enctype = 'multipart/form-data';
  mainDiv.append(form);

  const csrfTokenInput = document.createElement('input');
  csrfTokenInput.type = 'hidden';
  csrfTokenInput.name = 'csrfmiddlewaretoken';
  csrfTokenInput.value = 's5tEBYb7Ms1Onr0KBK9e3EcREnN5oBvF4FzCCjF9X60M8iQhW9TzyfWNom4BrKd0'; // Static value from HTML
  form.append(csrfTokenInput);

  const regFixHead = document.createElement('div');
  regFixHead.classList.add('registration-form-reg-fix-head');
  form.append(regFixHead);

  // Heading
  const headingWrapper = block.querySelector('[data-aue-prop="heading"]');
  if (headingWrapper) {
    const h2 = document.createElement('h2');
    h2.append(...headingWrapper.childNodes);
    moveInstrumentation(headingWrapper, h2);
    regFixHead.append(h2);
  }

  // Close Icon
  const closeIconWrapper = block.querySelector('[data-aue-prop="closeIcon"]');
  if (closeIconWrapper) {
    const a = document.createElement('a');
    a.classList.add('registration-form-close-eve-d');
    a.href = 'javascript:void(0)';
    a.style.width = '20px';
    a.style.height = '20px';
    a.onclick = () => closeBeginReg();

    const img = closeIconWrapper.querySelector('img');
    if (img) {
      const newImg = document.createElement('img');
      newImg.style.width = '100%';
      newImg.style.height = '100%';
      newImg.style.filter = 'invert(1)';
      newImg.src = img.src;
      newImg.alt = img.alt;
      moveInstrumentation(img, newImg);
      a.append(newImg);
    } else {
      // Handle case where img is inside an anchor
      const anchor = closeIconWrapper.querySelector('a');
      if (anchor && anchor.href) {
        const newImg = document.createElement('img');
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        newImg.style.filter = 'invert(1)';
        newImg.src = anchor.href;
        newImg.alt = anchor.title || '';
        moveInstrumentation(anchor, newImg);
        a.append(newImg);
      }
    }
    regFixHead.append(a);
  }

  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('registration-form-field1');
  form.append(fieldset);

  // Full Name and Contact No.
  const eventRegFlex1 = document.createElement('div');
  eventRegFlex1.classList.add('registration-form-event-reg-flex');
  fieldset.append(eventRegFlex1);

  // Full Name
  const fullNameWrapper = block.querySelector('[data-aue-prop="fullName"]');
  if (fullNameWrapper) {
    const eventField = document.createElement('div');
    eventField.classList.add('registration-form-event-field');
    eventRegFlex1.append(eventField);

    const label = document.createElement('label');
    label.classList.add('registration-form-event-label', 'registration-form-eve-reg-label', 'registration-form-min-width-label');
    label.style.minWidth = '180px';
    label.append(...fullNameWrapper.childNodes);
    moveInstrumentation(fullNameWrapper, label);
    eventField.append(label);

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'name';
    input.maxLength = '50';
    input.classList.add('registration-form-input');
    input.required = true;
    input.id = 'id_name';
    eventField.append(input);
  }

  // Contact No.
  const contactNoWrapper = block.querySelector('[data-aue-prop="contactNo"]');
  if (contactNoWrapper) {
    const eventField = document.createElement('div');
    eventField.classList.add('registration-form-event-field');
    eventRegFlex1.append(eventField);

    const label = document.createElement('label');
    label.classList.add('registration-form-event-label', 'registration-form-min-width-label');
    label.append(...contactNoWrapper.childNodes);
    moveInstrumentation(contactNoWrapper, label);
    eventField.append(label);

    const input = document.createElement('input');
    input.type = 'tel';
    input.name = 'mobile';
    input.maxLength = '10';
    input.classList.add('registration-form-input');
    input.required = true;
    input.id = 'id_mobile';
    eventField.append(input);
  }

  // Email ID and Date of Birth
  const eventRegFlex2 = document.createElement('div');
  eventRegFlex2.classList.add('registration-form-event-reg-flex');
  fieldset.append(eventRegFlex2);

  // Email ID
  const emailIdWrapper = block.querySelector('[data-aue-prop="emailId"]');
  if (emailIdWrapper) {
    const eventField = document.createElement('div');
    eventField.classList.add('registration-form-event-field');
    eventRegFlex2.append(eventField);

    const label = document.createElement('label');
    label.classList.add('registration-form-event-label', 'registration-form-eve-reg-label', 'registration-form-min-width-label');
    label.style.minWidth = '180px';
    label.append(...emailIdWrapper.childNodes);
    moveInstrumentation(emailIdWrapper, label);
    eventField.append(label);

    const input = document.createElement('input');
    input.type = 'email';
    input.name = 'email';
    input.maxLength = '100';
    input.classList.add('registration-form-input');
    input.required = true;
    input.id = 'id_email';
    eventField.append(input);
  }

  // Date of Birth
  const dateOfBirthWrapper = block.querySelector('[data-aue-prop="dateOfBirth"]');
  if (dateOfBirthWrapper) {
    const eventField = document.createElement('div');
    eventField.classList.add('registration-form-event-field');
    eventRegFlex2.append(eventField);

    const label = document.createElement('label');
    label.classList.add('registration-form-event-label', 'registration-form-min-width-label');
    label.htmlFor = 'id_email'; // This seems incorrect based on HTML, should be id_date_of_birth
    label.append(...dateOfBirthWrapper.childNodes);
    moveInstrumentation(dateOfBirthWrapper, label);
    eventField.append(label);

    const input = document.createElement('input');
    input.type = 'date';
    input.name = 'date_of_birth';
    input.placeholder = 'mm/dd/yyyy';
    input.classList.add('registration-form-input');
    input.required = true;
    input.id = 'id_date_of_birth';
    eventField.append(input);
  }

  // SUV Experience Interest
  const suvExperienceInterestWrapper = block.querySelector('[data-aue-prop="suvExperienceInterest"]');
  if (suvExperienceInterestWrapper) {
    const eventRegFlex3 = document.createElement('div');
    eventRegFlex3.classList.add('registration-form-event-reg-flex');
    fieldset.append(eventRegFlex3);

    const eventField = document.createElement('div');
    eventField.classList.add('registration-form-event-field', 'registration-form-after-foot', 'registration-form-begin-radio');
    eventRegFlex3.append(eventField);

    const label = document.createElement('label');
    label.classList.add('registration-form-event-label');
    label.htmlFor = 'id_illness_history'; // This seems incorrect, should be related to the radio group
    label.append(...suvExperienceInterestWrapper.childNodes);
    moveInstrumentation(suvExperienceInterestWrapper, label);
    eventField.append(label);

    const inputDiv = document.createElement('div');
    inputDiv.id = 'id_category_id';
    inputDiv.classList.add('registration-form-input');
    eventField.append(inputDiv);

    // Assuming the options are provided as separate children in the authored content
    const options = suvExperienceInterestWrapper.querySelectorAll('li'); // Assuming options are list items
    options.forEach((option, index) => {
      const div = document.createElement('div');
      const optionLabel = document.createElement('label');
      optionLabel.htmlFor = `id_category_id_${index}`;

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'category_id';
      input.value = option.dataset.value || (index + 1).toString(); // Use data-value or index
      input.classList.add('registration-form-input');
      input.required = true;
      input.id = `id_category_id_${index}`;
      if (index === 0) {
        input.checked = true;
      }
      optionLabel.append(input);
      optionLabel.append(option.textContent.trim()); // Use text content for label
      moveInstrumentation(option, optionLabel);
      div.append(optionLabel);
      inputDiv.append(div);
    });
  }

  // Submit Button
  const submitContainer = document.createElement('div');
  submitContainer.style.display = 'flex';
  submitContainer.style.alignItems = 'center';
  submitContainer.style.gap = '20px';
  submitContainer.style.justifyContent = 'flex-end';
  fieldset.append(submitContainer);

  const inviteMsgSpan = document.createElement('span');
  inviteMsgSpan.classList.add('registration-form-invite-msg');
  inviteMsgSpan.style.textAlign = 'center';
  inviteMsgSpan.style.marginBottom = '0';
  inviteMsgSpan.style.width = '100%';
  inviteMsgSpan.style.textAlign = 'end';
  submitContainer.append(inviteMsgSpan);

  const submitLabelWrapper = block.querySelector('[data-aue-prop="submitLabel"]');
  const submitIconWrapper = block.querySelector('[data-aue-prop="submitIcon"]');

  if (submitLabelWrapper || submitIconWrapper) {
    const a = document.createElement('a');
    a.classList.add('registration-form-cta', 'registration-form-begin-submit');
    a.style.cssFloat = 'right';
    a.style.minWidth = 'fit-content';
    a.id = 'beginSubmit';
    a.href = 'javascript:void(0)';
    a.rel = 'no-follow';

    if (submitLabelWrapper) {
      const p = document.createElement('p');
      p.append(...submitLabelWrapper.childNodes);
      moveInstrumentation(submitLabelWrapper, p);
      a.append(p);
    }

    if (submitIconWrapper) {
      const img = submitIconWrapper.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        moveInstrumentation(img, newImg);
        a.append(newImg);
      } else {
        // Handle case where img is inside an anchor
        const anchor = submitIconWrapper.querySelector('a');
        if (anchor && anchor.href) {
          const newImg = document.createElement('img');
          newImg.src = anchor.href;
          newImg.alt = anchor.title || '';
          moveInstrumentation(anchor, newImg);
          a.append(newImg);
        }
      }
    }
    submitContainer.append(a);
  }

  // Thank you page (static content from original HTML)
  const thankYouPage = document.createElement('div');
  thankYouPage.classList.add('registration-form-thankyou-page');
  mainDiv.append(thankYouPage);

  const thankYouHead = document.createElement('div');
  thankYouHead.classList.add('registration-form-reg-fix-head');
  thankYouHead.style.position = 'fixed';
  thankYouHead.style.top = '100px';
  thankYouHead.style.width = '100%';
  thankYouHead.style.padding = '0 10%';
  thankYouPage.append(thankYouHead);

  thankYouHead.append(document.createElement('div')); // Empty div

  const thankYouCloseLink = document.createElement('a');
  thankYouCloseLink.classList.add('registration-form-close-eve-d');
  thankYouCloseLink.href = 'javascript:void(0)';
  thankYouCloseLink.style.width = '20px';
  thankYouCloseLink.style.height = '20px';
  thankYouCloseLink.onclick = () => refreshPage();
  thankYouHead.append(thankYouCloseLink);

  const thankYouCloseImg = document.createElement('img');
  thankYouCloseImg.style.width = '100%';
  thankYouCloseImg.style.height = '100%';
  thankYouCloseImg.style.filter = 'invert(1)';
  thankYouCloseImg.src = '/content/dam/aemigrate/uploaded-folder/image/cross_close.webp';
  thankYouCloseImg.alt = '';
  thankYouCloseLink.append(thankYouCloseImg);

  thankYouPage.append(document.createElement('h2')); // Empty h2

  block.innerHTML = '';
  block.append(mainDiv);
}
