import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('section');
  footerContainer.classList.add('footer-container');
  footerContainer.id = 'footer';

  const footerAfterLayerTop = document.createElement('div');
  footerAfterLayerTop.classList.add('footer-after-layer-top');
  const footerTopImage = block.querySelector('[data-aue-prop="footerTopImage"]');
  if (footerTopImage) {
    const pic = createOptimizedPicture(footerTopImage.src, footerTopImage.alt);
    footerAfterLayerTop.append(pic);
    moveInstrumentation(footerTopImage, pic.querySelector('img'));
  }
  footerContainer.append(footerAfterLayerTop);

  const footerContent = document.createElement('div');
  footerContent.classList.add('footer-content');

  const footerLogo = block.querySelector('[data-aue-prop="footerLogo"]');
  if (footerLogo) {
    const pic = createOptimizedPicture(footerLogo.src, footerLogo.alt);
    pic.classList.add('footer-logo');
    footerContent.append(pic);
    moveInstrumentation(footerLogo, pic.querySelector('img'));
  }

  const footerTags = document.createElement('div');
  footerTags.classList.add('footer-tags', 'footer-tags-home', 'footer-details-open');

  const footerFoot1 = document.createElement('div');
  footerFoot1.classList.add('footer-foot-1');
  const contactUsDetails = document.createElement('details');
  contactUsDetails.classList.add('footer-details-1');
  const contactUsSummary = document.createElement('summary');
  contactUsSummary.textContent = 'Contact us'; // Static text, not authored
  contactUsDetails.append(contactUsSummary);

  const contactUsText = block.querySelector('[data-aue-prop="contactUsText"]');
  if (contactUsText) {
    const p = document.createElement('p');
    p.append(...contactUsText.childNodes);
    moveInstrumentation(contactUsText, p);
    contactUsDetails.append(p);
  }

  const expeditionsEmail = block.querySelector('[data-aue-prop="expeditionsEmail"]');
  if (expeditionsEmail) {
    const p = document.createElement('p');
    p.innerHTML = `Expeditions and Weekenders:<br>`;
    const anchor = expeditionsEmail.querySelector('a') || expeditionsEmail;
    const emailLink = document.createElement('a');
    emailLink.style.cursor = 'pointer';
    emailLink.style.color = 'blue';
    emailLink.style.textDecoration = 'underline';
    emailLink.href = anchor.href || `mailto:${anchor.textContent.trim()}`;
    emailLink.textContent = anchor.textContent.trim();
    moveInstrumentation(anchor, emailLink);
    p.append(emailLink);
    contactUsDetails.append(p);
  }

  const mastersEmail = block.querySelector('[data-aue-prop="mastersEmail"]');
  if (mastersEmail) {
    const p = document.createElement('p');
    p.innerHTML = `4x4 Masters:<br>`;
    const anchor = mastersEmail.querySelector('a') || mastersEmail;
    const emailLink = document.createElement('a');
    emailLink.style.cursor = 'pointer';
    emailLink.style.color = 'blue';
    emailLink.style.textDecoration = 'underline';
    emailLink.href = anchor.href || `mailto:${anchor.textContent.trim()}`;
    emailLink.textContent = anchor.textContent.trim();
    moveInstrumentation(anchor, emailLink);
    p.append(emailLink);
    contactUsDetails.append(p);
  }

  const moreDetails = document.createElement('details');
  const moreSummary = document.createElement('summary');
  moreSummary.textContent = 'For more'; // Static text, not authored
  moreDetails.append(moreSummary);

  const moreContactText = block.querySelector('[data-aue-prop="moreContactText"]');
  if (moreContactText) {
    // Assuming moreContactText contains multiple <p> or <br> elements
    // We need to move all its children into the moreDetails.
    moreContactText.childNodes.forEach((node) => {
      moreDetails.append(node);
    });
    moveInstrumentation(moreContactText, moreDetails);
  }
  contactUsDetails.append(moreDetails);
  footerFoot1.append(contactUsDetails);
  footerTags.append(footerFoot1);

  const footerFoot2 = document.createElement('div');
  footerFoot2.classList.add('footer-foot-2');
  const termsOfUse = block.querySelector('[data-aue-prop="termsOfUse"]');
  if (termsOfUse) {
    const p = document.createElement('p');
    const anchor = termsOfUse.querySelector('a') || termsOfUse;
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = anchor.href;
    link.textContent = anchor.textContent;
    moveInstrumentation(anchor, link);
    p.append(link);
    footerFoot2.append(p);
  }
  footerTags.append(footerFoot2);

  const footerFoot3 = document.createElement('div');
  footerFoot3.classList.add('footer-foot-3');
  const dataProviderConsentPolicy = block.querySelector('[data-aue-prop="dataProviderConsentPolicy"]');
  if (dataProviderConsentPolicy) {
    const p = document.createElement('p');
    const anchor = dataProviderConsentPolicy.querySelector('a') || dataProviderConsentPolicy;
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = anchor.href;
    link.textContent = anchor.textContent;
    moveInstrumentation(anchor, link);
    p.append(link);
    footerFoot3.append(p);
  }
  footerTags.append(footerFoot3);

  const footerFoot4 = document.createElement('div');
  footerFoot4.classList.add('footer-foot-4');
  const privacyPolicy = block.querySelector('[data-aue-prop="privacyPolicy"]');
  if (privacyPolicy) {
    const p = document.createElement('p');
    const anchor = privacyPolicy.querySelector('a') || privacyPolicy;
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = anchor.href;
    link.textContent = anchor.textContent;
    moveInstrumentation(anchor, link);
    p.append(link);
    footerFoot4.append(p);
  }
  footerTags.append(footerFoot4);

  footerContent.append(footerTags);

  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const span = document.createElement('span');
    span.classList.add('footer-copyright');
    span.append(...copyright.childNodes);
    moveInstrumentation(copyright, span);
    footerContent.append(span);
  }

  footerContainer.append(footerContent);

  block.innerHTML = '';
  block.append(footerContainer);
}
