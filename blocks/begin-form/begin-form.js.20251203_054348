import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const beginFormContainer = document.createElement('div');
  beginFormContainer.classList.add('begin-form-container');
  moveInstrumentation(block, beginFormContainer);

  const bgImageRef = block.querySelector('[data-aue-prop="bgImage"]');
  if (bgImageRef) {
    let bgImage = bgImageRef.querySelector('img');
    if (!bgImage) {
      const anchor = bgImageRef.querySelector('a');
      if (anchor) {
        bgImage = document.createElement('img');
        bgImage.src = anchor.href;
        bgImage.alt = anchor.title || '';
      }
    }
    if (bgImage) {
      const pic = createOptimizedPicture(bgImage.src, bgImage.alt);
      pic.classList.add('begin-form-bg-image');
      moveInstrumentation(bgImage, pic.querySelector('img'));
      beginFormContainer.append(pic);
    }
  }

  const bgCarImageRef = block.querySelector('[data-aue-prop="bgCarImage"]');
  if (bgCarImageRef) {
    let bgCarImage = bgCarImageRef.querySelector('img');
    if (!bgCarImage) {
      const anchor = bgCarImageRef.querySelector('a');
      if (anchor) {
        bgCarImage = document.createElement('img');
        bgCarImage.src = anchor.href;
        bgCarImage.alt = anchor.title || '';
      }
    }
    if (bgCarImage) {
      const pic = createOptimizedPicture(bgCarImage.src, bgCarImage.alt);
      pic.classList.add('begin-form-bg-car-image');
      moveInstrumentation(bgCarImage, pic.querySelector('img'));
      beginFormContainer.append(pic);
    }
  }

  const form = document.createElement('form');
  form.method = 'post';
  form.id = 'beginForm';
  form.action = '/ajax_save_invite';
  form.enctype = 'multipart/form-data';

  const csrfToken = document.createElement('input');
  csrfToken.type = 'hidden';
  csrfToken.name = 'csrfmiddlewaretoken';
  csrfToken.value = 'uHuz8U0YxVhNt2dMQJGx43XDYdXpaIsQggJHTnuNxKyg1so9lExnDKt2vtiEOBKR'; // Placeholder, actual value might be dynamic
  form.append(csrfToken);

  const headerDiv = document.createElement('div');
  headerDiv.classList.add('begin-form-header');

  const headerText = document.createElement('h2');
  const headerContent = block.querySelector('[data-aue-prop="header"]');
  if (headerContent) {
    headerText.append(...headerContent.childNodes);
    moveInstrumentation(headerContent, headerText);
  } else {
    headerText.textContent = 'Let\'s Begin!';
  }
  headerDiv.append(headerText);

  const closeLink = document.createElement('a');
  closeLink.classList.add('begin-form-close');
  closeLink.href = 'javascript:void(0)';
  closeLink.onclick = () => window.closeBeginReg();

  const closeIconRef = block.querySelector('[data-aue-prop="closeIcon"]');
  if (closeIconRef) {
    let closeIcon = closeIconRef.querySelector('img');
    if (!closeIcon) {
      const anchor = closeIconRef.querySelector('a');
      if (anchor) {
        closeIcon = document.createElement('img');
        closeIcon.src = anchor.href;
        closeIcon.alt = anchor.title || '';
      }
    }
    if (closeIcon) {
      const pic = createOptimizedPicture(closeIcon.src, closeIcon.alt);
      moveInstrumentation(closeIcon, pic.querySelector('img'));
      closeLink.append(pic);
    }
  }
  headerDiv.append(closeLink);
  form.append(headerDiv);

  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('begin-form-fieldset');

  // Full Name and Contact No.
  const flexGroup1 = document.createElement('div');
  flexGroup1.classList.add('begin-form-flex-group');

  const fullNameField = document.createElement('div');
  fullNameField.classList.add('begin-form-field');
  const fullNameLabel = document.createElement('label');
  fullNameLabel.classList.add('begin-form-label', 'begin-form-min-width-label');
  const fullNameContent = block.querySelector('[data-aue-prop="fullName"]');
  if (fullNameContent) {
    fullNameLabel.append(...fullNameContent.childNodes);
    moveInstrumentation(fullNameContent, fullNameLabel);
  } else {
    fullNameLabel.textContent = 'Full Name';
  }
  const fullNameInput = document.createElement('input');
  fullNameInput.type = 'text';
  fullNameInput.name = 'name';
  fullNameInput.maxLength = '50';
  fullNameInput.classList.add('begin-form-input');
  fullNameInput.required = true;
  fullNameInput.id = 'id_name';
  fullNameField.append(fullNameLabel, fullNameInput);
  flexGroup1.append(fullNameField);

  const contactNoField = document.createElement('div');
  contactNoField.classList.add('begin-form-field');
  const contactNoLabel = document.createElement('label');
  contactNoLabel.classList.add('begin-form-label', 'begin-form-min-width-label');
  const contactNoContent = block.querySelector('[data-aue-prop="contactNo"]');
  if (contactNoContent) {
    contactNoLabel.append(...contactNoContent.childNodes);
    moveInstrumentation(contactNoContent, contactNoLabel);
  } else {
    contactNoLabel.textContent = 'Contact No.';
  }
  const contactNoInput = document.createElement('input');
  contactNoInput.type = 'tel';
  contactNoInput.name = 'mobile';
  contactNoInput.maxLength = '10';
  contactNoInput.classList.add('begin-form-input');
  contactNoInput.required = true;
  contactNoInput.id = 'id_mobile';
  contactNoField.append(contactNoLabel, contactNoInput);
  flexGroup1.append(contactNoField);
  fieldset.append(flexGroup1);

  // Email ID and Date of Birth
  const flexGroup2 = document.createElement('div');
  flexGroup2.classList.add('begin-form-flex-group');

  const emailIdField = document.createElement('div');
  emailIdField.classList.add('begin-form-field');
  const emailIdLabel = document.createElement('label');
  emailIdLabel.classList.add('begin-form-label', 'begin-form-min-width-label');
  const emailIdContent = block.querySelector('[data-aue-prop="emailId"]');
  if (emailIdContent) {
    emailIdLabel.append(...emailIdContent.childNodes);
    moveInstrumentation(emailIdContent, emailIdLabel);
  } else {
    emailIdLabel.textContent = 'Email ID';
  }
  const emailIdInput = document.createElement('input');
  emailIdInput.type = 'email';
  emailIdInput.name = 'email';
  emailIdInput.maxLength = '100';
  emailIdInput.classList.add('begin-form-input');
  emailIdInput.required = true;
  emailIdInput.id = 'id_email';
  emailIdField.append(emailIdLabel, emailIdInput);
  flexGroup2.append(emailIdField);

  const dateOfBirthField = document.createElement('div');
  dateOfBirthField.classList.add('begin-form-field');
  const dateOfBirthLabel = document.createElement('label');
  dateOfBirthLabel.classList.add('begin-form-label', 'begin-form-min-width-label');
  dateOfBirthLabel.htmlFor = 'id_date_of_birth';
  const dateOfBirthContent = block.querySelector('[data-aue-prop="dateOfBirth"]');
  if (dateOfBirthContent) {
    dateOfBirthLabel.append(...dateOfBirthContent.childNodes);
    moveInstrumentation(dateOfBirthContent, dateOfBirthLabel);
  } else {
    dateOfBirthLabel.textContent = 'Date of Birth';
  }
  const dateOfBirthInput = document.createElement('input');
  dateOfBirthInput.type = 'date';
  dateOfBirthInput.name = 'date_of_birth';
  dateOfBirthInput.placeholder = 'mm/dd/yyyy';
  dateOfBirthInput.classList.add('begin-form-input');
  dateOfBirthInput.required = true;
  dateOfBirthInput.id = 'id_date_of_birth';
  dateOfBirthField.append(dateOfBirthLabel, dateOfBirthInput);
  flexGroup2.append(dateOfBirthField);
  fieldset.append(flexGroup2);

  // SUV Experience Radio Group
  const flexGroup3 = document.createElement('div');
  flexGroup3.classList.add('begin-form-flex-group');

  const suvExperienceField = document.createElement('div');
  suvExperienceField.classList.add('begin-form-field', 'begin-form-after-foot', 'begin-form-radio-group');
  const suvExperienceLabel = document.createElement('label');
  suvExperienceLabel.classList.add('begin-form-label');
  const suvExperienceContent = block.querySelector('[data-aue-prop="suvExperience"]');
  if (suvExperienceContent) {
    suvExperienceLabel.append(...suvExperienceContent.childNodes);
    moveInstrumentation(suvExperienceContent, suvExperienceLabel);
  } else {
    suvExperienceLabel.textContent = 'Which SUV Experience you are interested in?';
  }
  suvExperienceField.append(suvExperienceLabel);

  const radioWrapper = document.createElement('div');
  radioWrapper.id = 'id_category_id';
  radioWrapper.classList.add('begin-form-input-radio-wrapper');

  const radioOptions = block.querySelectorAll('[data-aue-model="suvExperience"] > div');
  if (radioOptions.length > 0) {
    radioOptions.forEach((option, index) => {
      const div = document.createElement('div');
      const label = document.createElement('label');
      label.htmlFor = `id_category_id_${index}`;
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'category_id';
      input.value = option.dataset.aueValue || index + 1; // Assuming value is stored in data-aue-value or use index
      input.classList.add('begin-form-input-radio');
      input.required = true;
      input.id = `id_category_id_${index}`;
      if (index === 0) {
        input.checked = true;
      }
      label.append(input, ...option.childNodes);
      moveInstrumentation(option, label);
      div.append(label);
      radioWrapper.append(div);
    });
  } else {
    // Default options if not authored
    const defaultOptions = [
      { label: 'Expeditions', value: '1' },
      { label: 'Weekend Drives', value: '2' },
      { label: 'Conquer 4x4', value: '3' },
    ];

    defaultOptions.forEach((option, index) => {
      const div = document.createElement('div');
      const label = document.createElement('label');
      label.htmlFor = `id_category_id_${index}`;
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'category_id';
      input.value = option.value;
      input.classList.add('begin-form-input-radio');
      input.required = true;
      input.id = `id_category_id_${index}`;
      if (index === 0) {
        input.checked = true;
      }
      label.append(input, option.label);
      div.append(label);
      radioWrapper.append(div);
    });
  }

  suvExperienceField.append(radioWrapper);
  flexGroup3.append(suvExperienceField);
  fieldset.append(flexGroup3);

  // Submit Button
  const submitWrapper = document.createElement('div');
  submitWrapper.classList.add('begin-form-submit-wrapper');

  const inviteMsg = document.createElement('span');
  inviteMsg.classList.add('begin-form-invite-msg');
  submitWrapper.append(inviteMsg);

  const submitCta = document.createElement('a');
  submitCta.classList.add('begin-form-cta', 'begin-form-submit-button');
  submitCta.id = 'beginSubmit';
  submitCta.href = 'javascript:void(0)';
  submitCta.rel = 'no-follow';

  const submitButtonTextP = document.createElement('p');
  const submitButtonTextContent = block.querySelector('[data-aue-prop="submitButtonText"]');
  if (submitButtonTextContent) {
    submitButtonTextP.append(...submitButtonTextContent.childNodes);
    moveInstrumentation(submitButtonTextContent, submitButtonTextP);
  } else {
    submitButtonTextP.textContent = 'Submit';
  }
  submitCta.append(submitButtonTextP);

  const submitButtonIconRef = block.querySelector('[data-aue-prop="submitButtonIcon"]');
  if (submitButtonIconRef) {
    let submitButtonIcon = submitButtonIconRef.querySelector('img');
    if (!submitButtonIcon) {
      const anchor = submitButtonIconRef.querySelector('a');
      if (anchor) {
        submitButtonIcon = document.createElement('img');
        submitButtonIcon.src = anchor.href;
        submitButtonIcon.alt = anchor.title || '';
      }
    }
    if (submitButtonIcon) {
      const pic = createOptimizedPicture(submitButtonIcon.src, submitButtonIcon.alt);
      moveInstrumentation(submitButtonIcon, pic.querySelector('img'));
      submitCta.append(pic);
    }
  }
  submitWrapper.append(submitCta);
  fieldset.append(submitWrapper);

  form.append(fieldset);
  beginFormContainer.append(form);

  // Thank You Page
  const thankYouPage = document.createElement('div');
  thankYouPage.classList.add('begin-form-thankyou-page');

  const thankYouHeader = document.createElement('div');
  thankYouHeader.classList.add('begin-form-header', 'begin-form-header-fixed');
  thankYouHeader.append(document.createElement('div')); // Empty div for alignment

  const thankYouCloseLink = document.createElement('a');
  thankYouCloseLink.classList.add('begin-form-close');
  thankYouCloseLink.href = 'javascript:void(0)';
  thankYouCloseLink.onclick = () => window.refreshPage();

  const thankYouCloseIconRef = block.querySelector('[data-aue-prop="thankYouCloseIcon"]');
  if (thankYouCloseIconRef) {
    let thankYouCloseIcon = thankYouCloseIconRef.querySelector('img');
    if (!thankYouCloseIcon) {
      const anchor = thankYouCloseIconRef.querySelector('a');
      if (anchor) {
        thankYouCloseIcon = document.createElement('img');
        thankYouCloseIcon.src = anchor.href;
        thankYouCloseIcon.alt = anchor.title || '';
      }
    }
    if (thankYouCloseIcon) {
      const pic = createOptimizedPicture(thankYouCloseIcon.src, thankYouCloseIcon.alt);
      moveInstrumentation(thankYouCloseIcon, pic.querySelector('img'));
      thankYouCloseLink.append(pic);
    }
  }
  thankYouHeader.append(thankYouCloseLink);
  thankYouPage.append(thankYouHeader);

  thankYouPage.append(document.createElement('h2')); // Empty h2 for thank you message
  beginFormContainer.append(thankYouPage);

  block.replaceChildren(beginFormContainer);
}
