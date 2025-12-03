import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const beginFormContainer = document.createElement('div');
  beginFormContainer.classList.add('begin-form-container');
  moveInstrumentation(block, beginFormContainer);

  // Background Image
  const backgroundImage = block.querySelector('[data-aue-prop="backgroundImage"]');
  if (backgroundImage) {
    const img = backgroundImage.querySelector('img') || backgroundImage.querySelector('a img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('begin-form-bg-image');
      beginFormContainer.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    }
  }

  // Car Image
  const carImage = block.querySelector('[data-aue-prop="carImage"]');
  if (carImage) {
    const img = carImage.querySelector('img') || carImage.querySelector('a img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('begin-form-bg-car-image');
      beginFormContainer.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    }
  }

  const form = document.createElement('form');
  form.method = 'post';
  form.id = 'beginForm';
  form.action = '/ajax_save_invite';
  form.enctype = 'multipart/form-data';
  beginFormContainer.append(form);

  const csrfToken = document.createElement('input');
  csrfToken.type = 'hidden';
  csrfToken.name = 'csrfmiddlewaretoken';
  csrfToken.value = 'uHuz8U0YxVhNt2dMQJGx43XDYdXpaIsQggJHTnuNxKyg1so9lExnDKt2vtiEOBKR'; // Static value from HTML
  form.append(csrfToken);

  const formHeader = document.createElement('div');
  formHeader.classList.add('begin-form-header');
  form.append(formHeader);

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.append(...title.childNodes);
    formHeader.append(h2);
    moveInstrumentation(title, h2);
  }

  const closeIcon = block.querySelector('[data-aue-prop="closeIcon"]');
  if (closeIcon) {
    const anchor = document.createElement('a');
    anchor.classList.add('begin-form-close');
    anchor.href = 'javascript:void(0)';
    anchor.onclick = () => closeBeginReg();

    const img = closeIcon.querySelector('img') || closeIcon.querySelector('a img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      anchor.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    }
    formHeader.append(anchor);
    moveInstrumentation(closeIcon, anchor);
  }

  const fieldset = document.createElement('fieldset');
  fieldset.classList.add('begin-form-fieldset');
  form.append(fieldset);

  // Full Name and Contact No.
  const flexGroup1 = document.createElement('div');
  flexGroup1.classList.add('begin-form-flex-group');
  fieldset.append(flexGroup1);

  const fullNameField = document.createElement('div');
  fullNameField.classList.add('begin-form-field');
  flexGroup1.append(fullNameField);
  const fullNameLabel = document.createElement('label');
  fullNameLabel.classList.add('begin-form-label', 'begin-form-min-width-label');
  const fullName = block.querySelector('[data-aue-prop="fullName"]');
  if (fullName) {
    fullNameLabel.append(...fullName.childNodes);
    moveInstrumentation(fullName, fullNameLabel);
  } else {
    fullNameLabel.textContent = 'Full Name';
  }
  fullNameField.append(fullNameLabel);
  const fullNameInput = document.createElement('input');
  fullNameInput.type = 'text';
  fullNameInput.name = 'name';
  fullNameInput.maxLength = '50';
  fullNameInput.classList.add('begin-form-input');
  fullNameInput.required = true;
  fullNameInput.id = 'id_name';
  fullNameField.append(fullNameInput);

  const contactNoField = document.createElement('div');
  contactNoField.classList.add('begin-form-field');
  flexGroup1.append(contactNoField);
  const contactNoLabel = document.createElement('label');
  contactNoLabel.classList.add('begin-form-label', 'begin-form-min-width-label');
  const contactNo = block.querySelector('[data-aue-prop="contactNo"]');
  if (contactNo) {
    contactNoLabel.append(...contactNo.childNodes);
    moveInstrumentation(contactNo, contactNoLabel);
  } else {
    contactNoLabel.textContent = 'Contact No.';
  }
  contactNoField.append(contactNoLabel);
  const contactNoInput = document.createElement('input');
  contactNoInput.type = 'tel';
  contactNoInput.name = 'mobile';
  contactNoInput.maxLength = '10';
  contactNoInput.classList.add('begin-form-input');
  contactNoInput.required = true;
  contactNoInput.id = 'id_mobile';
  contactNoField.append(contactNoInput);

  // Email ID and Date of Birth
  const flexGroup2 = document.createElement('div');
  flexGroup2.classList.add('begin-form-flex-group');
  fieldset.append(flexGroup2);

  const emailIdField = document.createElement('div');
  emailIdField.classList.add('begin-form-field');
  flexGroup2.append(emailIdField);
  const emailIdLabel = document.createElement('label');
  emailIdLabel.classList.add('begin-form-label', 'begin-form-min-width-label');
  const emailId = block.querySelector('[data-aue-prop="emailId"]');
  if (emailId) {
    emailIdLabel.append(...emailId.childNodes);
    moveInstrumentation(emailId, emailIdLabel);
  } else {
    emailIdLabel.textContent = 'Email ID';
  }
  emailIdField.append(emailIdLabel);
  const emailIdInput = document.createElement('input');
  emailIdInput.type = 'email';
  emailIdInput.name = 'email';
  emailIdInput.maxLength = '100';
  emailIdInput.classList.add('begin-form-input');
  emailIdInput.required = true;
  emailIdInput.id = 'id_email';
  emailIdField.append(emailIdInput);

  const dateOfBirthField = document.createElement('div');
  dateOfBirthField.classList.add('begin-form-field');
  flexGroup2.append(dateOfBirthField);
  const dateOfBirthLabel = document.createElement('label');
  dateOfBirthLabel.classList.add('begin-form-label', 'begin-form-min-width-label');
  dateOfBirthLabel.htmlFor = 'id_date_of_birth';
  const dateOfBirth = block.querySelector('[data-aue-prop="dateOfBirth"]');
  if (dateOfBirth) {
    dateOfBirthLabel.append(...dateOfBirth.childNodes);
    moveInstrumentation(dateOfBirth, dateOfBirthLabel);
  } else {
    dateOfBirthLabel.textContent = 'Date of Birth';
  }
  dateOfBirthField.append(dateOfBirthLabel);
  const dateOfBirthInput = document.createElement('input');
  dateOfBirthInput.type = 'date';
  dateOfBirthInput.name = 'date_of_birth';
  dateOfBirthInput.placeholder = 'mm/dd/yyyy';
  dateOfBirthInput.classList.add('begin-form-input');
  dateOfBirthInput.required = true;
  dateOfBirthInput.id = 'id_date_of_birth';
  dateOfBirthField.append(dateOfBirthInput);

  // SUV Experience Radio Group
  const flexGroup3 = document.createElement('div');
  flexGroup3.classList.add('begin-form-flex-group');
  fieldset.append(flexGroup3);

  const suvExperienceField = document.createElement('div');
  suvExperienceField.classList.add('begin-form-field', 'begin-form-after-foot', 'begin-form-radio-group');
  flexGroup3.append(suvExperienceField);
  const suvExperienceLabel = document.createElement('label');
  suvExperienceLabel.classList.add('begin-form-label');
  const suvExperience = block.querySelector('[data-aue-prop="suvExperience"]');
  if (suvExperience) {
    suvExperienceLabel.append(...suvExperience.childNodes);
    moveInstrumentation(suvExperience, suvExperienceLabel);
  } else {
    suvExperienceLabel.textContent = 'Which SUV Experience you are interested in?';
  }
  suvExperienceField.append(suvExperienceLabel);

  const radioWrapper = document.createElement('div');
  radioWrapper.id = 'id_category_id';
  radioWrapper.classList.add('begin-form-input-radio-wrapper');
  suvExperienceField.append(radioWrapper);

  // Assuming the options are always Expeditions, Weekend Drives, Conquer 4x4 based on JSON
  const options = [
    { label: 'Expeditions', value: '1', checked: true },
    { label: 'Weekend Drives', value: '2', checked: false },
    { label: 'Conquer\u00a04x4', value: '3', checked: false },
  ];

  options.forEach((option, index) => {
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
    if (option.checked) {
      input.checked = true;
    }
    label.append(input, option.label);
    div.append(label);
    radioWrapper.append(div);
  });

  // Submit Button
  const submitWrapper = document.createElement('div');
  submitWrapper.classList.add('begin-form-submit-wrapper');
  fieldset.append(submitWrapper);

  const inviteMsg = document.createElement('span');
  inviteMsg.classList.add('begin-form-invite-msg');
  submitWrapper.append(inviteMsg);

  const submitButtonLink = block.querySelector('[data-aue-prop="submitButtonLink"]');
  const submitButtonIcon = block.querySelector('[data-aue-prop="submitButtonIcon"]');

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add('begin-form-cta', 'begin-form-submit-button');
  ctaAnchor.id = 'beginSubmit';
  ctaAnchor.href = 'javascript:void(0)';
  ctaAnchor.rel = 'no-follow';

  if (submitButtonLink) {
    const p = document.createElement('p');
    p.append(...submitButtonLink.childNodes);
    ctaAnchor.append(p);
    moveInstrumentation(submitButtonLink, p);
  } else {
    const p = document.createElement('p');
    p.textContent = 'Submit';
    ctaAnchor.append(p);
  }

  if (submitButtonIcon) {
    const img = submitButtonIcon.querySelector('img') || submitButtonIcon.querySelector('a img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      ctaAnchor.append(pic);
      moveInstrumentation(img, pic.querySelector('img'));
    }
  }
  submitWrapper.append(ctaAnchor);

  // Thank You Page (static structure)
  const thankYouPage = document.createElement('div');
  thankYouPage.classList.add('begin-form-thankyou-page');
  beginFormContainer.append(thankYouPage);

  const thankYouHeader = document.createElement('div');
  thankYouHeader.classList.add('begin-form-header', 'begin-form-header-fixed');
  thankYouPage.append(thankYouHeader);

  thankYouHeader.append(document.createElement('div')); // Empty div as per HTML

  const thankYouClose = document.createElement('a');
  thankYouClose.classList.add('begin-form-close');
  thankYouClose.href = 'javascript:void(0)';
  thankYouClose.onclick = () => refreshPage();
  const thankYouCloseImg = document.createElement('img');
  thankYouCloseImg.src = '/content/dam/aemigrate/uploaded-folder/image/cross_close.webp';
  thankYouCloseImg.alt = '';
  thankYouClose.append(thankYouCloseImg);
  thankYouHeader.append(thankYouClose);

  thankYouPage.append(document.createElement('h2')); // Empty h2 as per HTML

  block.innerHTML = '';
  block.append(beginFormContainer);
}
