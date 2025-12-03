import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const beginFormContainer = document.createElement('div');
  beginFormContainer.className = 'begin-form-container';
  moveInstrumentation(block, beginFormContainer);

  // Background Image
  const bgImageWrapper = block.querySelector('[data-aue-prop="bgImage"]');
  if (bgImageWrapper) {
    const img = bgImageWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.className = 'begin-form-bg-image';
      moveInstrumentation(img, pic.querySelector('img'));
      beginFormContainer.append(pic);
    } else {
      // Handle case where img is inside an anchor or directly the anchor
      const anchor = bgImageWrapper.querySelector('a[href]');
      if (anchor) {
        const src = anchor.href;
        const alt = anchor.title || '';
        const pic = createOptimizedPicture(src, alt);
        pic.className = 'begin-form-bg-image';
        moveInstrumentation(anchor, pic.querySelector('img'));
        beginFormContainer.append(pic);
      }
    }
  }

  // Car Image
  const carImageWrapper = block.querySelector('[data-aue-prop="carImage"]');
  if (carImageWrapper) {
    const img = carImageWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.className = 'begin-form-bg-car-image';
      moveInstrumentation(img, pic.querySelector('img'));
      beginFormContainer.append(pic);
    } else {
      const anchor = carImageWrapper.querySelector('a[href]');
      if (anchor) {
        const src = anchor.href;
        const alt = anchor.title || '';
        const pic = createOptimizedPicture(src, alt);
        pic.className = 'begin-form-bg-car-image';
        moveInstrumentation(anchor, pic.querySelector('img'));
        beginFormContainer.append(pic);
      }
    }
  }

  const form = document.createElement('form');
  form.method = 'post';
  form.id = 'beginForm';
  form.action = '/ajax_save_invite';
  form.enctype = 'multipart/form-data';

  // CSRF token (hardcoded for now as it's not in AEM model)
  const csrfInput = document.createElement('input');
  csrfInput.type = 'hidden';
  csrfInput.name = 'csrfmiddlewaretoken';
  csrfInput.value = 'uHuz8U0YxVhNt2dMQJGx43XDYdXpaIsQggJHTnuNxKyg1so9lExnDKt2vtiEOBKR'; // Placeholder
  form.append(csrfInput);

  const formHeader = document.createElement('div');
  formHeader.className = 'begin-form-header';

  const formTitleWrapper = block.querySelector('[data-aue-prop="formTitle"]');
  if (formTitleWrapper) {
    const h2 = document.createElement('h2');
    h2.append(...formTitleWrapper.childNodes);
    moveInstrumentation(formTitleWrapper, h2);
    formHeader.append(h2);
  }

  const closeLink = document.createElement('a');
  closeLink.className = 'begin-form-close';
  closeLink.href = 'javascript:void(0)';
  closeLink.onclick = () => closeBeginReg(); // Assuming closeBeginReg is defined globally or imported

  const closeIconWrapper = block.querySelector('[data-aue-prop="closeIcon"]');
  if (closeIconWrapper) {
    const img = closeIconWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      closeLink.append(pic);
    } else {
      const anchor = closeIconWrapper.querySelector('a[href]');
      if (anchor) {
        const src = anchor.href;
        const alt = anchor.title || '';
        const pic = createOptimizedPicture(src, alt);
        moveInstrumentation(anchor, pic.querySelector('img'));
        closeLink.append(pic);
      }
    }
  }
  formHeader.append(closeLink);
  form.append(formHeader);

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'begin-form-fieldset';

  // Full Name and Contact No.
  const flexGroup1 = document.createElement('div');
  flexGroup1.className = 'begin-form-flex-group';

  const fullNameField = document.createElement('div');
  fullNameField.className = 'begin-form-field';
  const fullNameLabelWrapper = block.querySelector('[data-aue-prop="fullName"]');
  if (fullNameLabelWrapper) {
    const label = document.createElement('label');
    label.className = 'begin-form-label begin-form-min-width-label';
    label.append(...fullNameLabelWrapper.childNodes);
    moveInstrumentation(fullNameLabelWrapper, label);
    fullNameField.append(label);
  }
  const fullNameInput = document.createElement('input');
  fullNameInput.type = 'text';
  fullNameInput.name = 'name';
  fullNameInput.maxLength = '50';
  fullNameInput.className = 'begin-form-input';
  fullNameInput.required = true;
  fullNameInput.id = 'id_name';
  fullNameField.append(fullNameInput);
  flexGroup1.append(fullNameField);

  const contactNoField = document.createElement('div');
  contactNoField.className = 'begin-form-field';
  const contactNoLabelWrapper = block.querySelector('[data-aue-prop="contactNo"]');
  if (contactNoLabelWrapper) {
    const label = document.createElement('label');
    label.className = 'begin-form-label begin-form-min-width-label';
    label.append(...contactNoLabelWrapper.childNodes);
    moveInstrumentation(contactNoLabelWrapper, label);
    contactNoField.append(label);
  }
  const contactNoInput = document.createElement('input');
  contactNoInput.type = 'tel';
  contactNoInput.name = 'mobile';
  contactNoInput.maxLength = '10';
  contactNoInput.className = 'begin-form-input';
  contactNoInput.required = true;
  contactNoInput.id = 'id_mobile';
  contactNoField.append(contactNoInput);
  flexGroup1.append(contactNoField);
  fieldset.append(flexGroup1);

  // Email ID and Date of Birth
  const flexGroup2 = document.createElement('div');
  flexGroup2.className = 'begin-form-flex-group';

  const emailIdField = document.createElement('div');
  emailIdField.className = 'begin-form-field';
  const emailIdLabelWrapper = block.querySelector('[data-aue-prop="emailId"]');
  if (emailIdLabelWrapper) {
    const label = document.createElement('label');
    label.className = 'begin-form-label begin-form-min-width-label';
    label.append(...emailIdLabelWrapper.childNodes);
    moveInstrumentation(emailIdLabelWrapper, label);
    emailIdField.append(label);
  }
  const emailIdInput = document.createElement('input');
  emailIdInput.type = 'email';
  emailIdInput.name = 'email';
  emailIdInput.maxLength = '100';
  emailIdInput.className = 'begin-form-input';
  emailIdInput.required = true;
  emailIdInput.id = 'id_email';
  emailIdField.append(emailIdInput);
  flexGroup2.append(emailIdField);

  const dateOfBirthField = document.createElement('div');
  dateOfBirthField.className = 'begin-form-field';
  const dateOfBirthLabelWrapper = block.querySelector('[data-aue-prop="dateOfBirth"]');
  if (dateOfBirthLabelWrapper) {
    const label = document.createElement('label');
    label.className = 'begin-form-label begin-form-min-width-label';
    label.htmlFor = 'id_date_of_birth';
    label.append(...dateOfBirthLabelWrapper.childNodes);
    moveInstrumentation(dateOfBirthLabelWrapper, label);
    dateOfBirthField.append(label);
  }
  const dateOfBirthInput = document.createElement('input');
  dateOfBirthInput.type = 'date';
  dateOfBirthInput.name = 'date_of_birth';
  dateOfBirthInput.placeholder = 'mm/dd/yyyy';
  dateOfBirthInput.className = 'begin-form-input';
  dateOfBirthInput.required = true;
  dateOfBirthInput.id = 'id_date_of_birth';
  dateOfBirthField.append(dateOfBirthInput);
  flexGroup2.append(dateOfBirthField);
  fieldset.append(flexGroup2);

  // SUV Experience Radio Group
  const flexGroup3 = document.createElement('div');
  flexGroup3.className = 'begin-form-flex-group';

  const suvExperienceField = document.createElement('div');
  suvExperienceField.className = 'begin-form-field begin-form-after-foot begin-form-radio-group';
  const suvExperienceLabelWrapper = block.querySelector('[data-aue-prop="suvExperience"]');
  if (suvExperienceLabelWrapper) {
    const label = document.createElement('label');
    label.className = 'begin-form-label';
    label.append(...suvExperienceLabelWrapper.childNodes);
    moveInstrumentation(suvExperienceLabelWrapper, label);
    suvExperienceField.append(label);

    const radioWrapper = document.createElement('div');
    radioWrapper.id = 'id_category_id';
    radioWrapper.className = 'begin-form-input-radio-wrapper';

    // Iterate over options for suvExperience
    const options = suvExperienceLabelWrapper.querySelectorAll('[data-aue-label]');
    options.forEach((option, index) => {
      const optionDiv = document.createElement('div');
      const optionLabel = document.createElement('label');
      optionLabel.htmlFor = `id_category_id_${index}`;
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = 'category_id';
      optionInput.value = option.getAttribute('data-aue-value') || '';
      optionInput.className = 'begin-form-input-radio';
      optionInput.required = true;
      optionInput.id = `id_category_id_${index}`;
      if (index === 0) {
        optionInput.checked = true;
      }
      optionLabel.append(optionInput, option.textContent.trim());
      moveInstrumentation(option, optionLabel);
      optionDiv.append(optionLabel);
      radioWrapper.append(optionDiv);
    });
    suvExperienceField.append(radioWrapper);
  }
  flexGroup3.append(suvExperienceField);
  fieldset.append(flexGroup3);

  // Submit Button
  const submitWrapper = document.createElement('div');
  submitWrapper.className = 'begin-form-submit-wrapper';

  const inviteMsg = document.createElement('span');
  inviteMsg.className = 'begin-form-invite-msg';
  submitWrapper.append(inviteMsg);

  const submitCta = document.createElement('a');
  submitCta.className = 'begin-form-cta begin-form-submit-button';
  submitCta.id = 'beginSubmit';
  submitCta.href = 'javascript:void(0)';
  submitCta.rel = 'no-follow';

  const submitButtonLabelWrapper = block.querySelector('[data-aue-prop="submitButtonLabel"]');
  if (submitButtonLabelWrapper) {
    const p = document.createElement('p');
    p.append(...submitButtonLabelWrapper.childNodes);
    moveInstrumentation(submitButtonLabelWrapper, p);
    submitCta.append(p);
  }

  const submitButtonIconWrapper = block.querySelector('[data-aue-prop="submitButtonIcon"]');
  if (submitButtonIconWrapper) {
    const img = submitButtonIconWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      submitCta.append(pic);
    } else {
      const anchor = submitButtonIconWrapper.querySelector('a[href]');
      if (anchor) {
        const src = anchor.href;
        const alt = anchor.title || '';
        const pic = createOptimizedPicture(src, alt);
        moveInstrumentation(anchor, pic.querySelector('img'));
        submitCta.append(pic);
      }
    }
  }
  submitWrapper.append(submitCta);
  fieldset.append(submitWrapper);
  form.append(fieldset);
  beginFormContainer.append(form);

  // Thank you page (empty as per JSON, but structure retained)
  const thankyouPage = document.createElement('div');
  thankyouPage.className = 'begin-form-thankyou-page';

  const thankyouHeader = document.createElement('div');
  thankyouHeader.className = 'begin-form-header begin-form-header-fixed';
  thankyouHeader.append(document.createElement('div')); // Empty div

  const thankyouCloseLink = document.createElement('a');
  thankyouCloseLink.className = 'begin-form-close';
  thankyouCloseLink.href = 'javascript:void(0)';
  thankyouCloseLink.onclick = () => refreshPage(); // Assuming refreshPage is defined globally or imported

  // Re-use close icon for thank you page if needed, or leave empty
  if (closeIconWrapper) {
    const img = closeIconWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      // No moveInstrumentation here as it's a reuse, not a primary source
      thankyouCloseLink.append(pic.cloneNode(true));
    } else {
      const anchor = closeIconWrapper.querySelector('a[href]');
      if (anchor) {
        const src = anchor.href;
        const alt = anchor.title || '';
        const pic = createOptimizedPicture(src, alt);
        thankyouCloseLink.append(pic.cloneNode(true));
      }
    }
  }
  thankyouHeader.append(thankyouCloseLink);
  thankyouPage.append(thankyouHeader);
  thankyouPage.append(document.createElement('h2')); // Empty h2
  beginFormContainer.append(thankyouPage);

  block.replaceChildren(beginFormContainer);
}
