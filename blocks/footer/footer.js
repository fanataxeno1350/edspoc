import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('section');
  footerContainer.classList.add('footer-container');
  footerContainer.id = 'footer';

  const afterLayerTop = document.createElement('div');
  afterLayerTop.classList.add('footer-afterLayerTop');
  const topImage = block.querySelector('[data-aue-prop="topImage"]');
  if (topImage) {
    const pic = createOptimizedPicture(topImage.src, topImage.alt);
    afterLayerTop.append(pic);
    moveInstrumentation(topImage, pic.querySelector('img'));
  }
  footerContainer.append(afterLayerTop);

  const footerContent = document.createElement('div');
  footerContent.classList.add('footer-content');

  const footerLogo = document.createElement('img');
  footerLogo.classList.add('footer-logo');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  if (logo) {
    footerLogo.src = logo.src;
    footerLogo.alt = logo.alt;
    moveInstrumentation(logo, footerLogo);
  }
  footerContent.append(footerLogo);

  const footerTags = document.createElement('div');
  footerTags.classList.add('footer-tags', 'footer-tags-home', 'footer-details-open');

  const footerFoot1 = document.createElement('div');
  footerFoot1.classList.add('footer-foot-1');
  const contactUsDetails = document.createElement('details');
  contactUsDetails.classList.add('footer-details-1');
  const contactUsSummary = document.createElement('summary');
  contactUsSummary.classList.add('footer-summary');
  contactUsSummary.textContent = 'Contact us';
  contactUsDetails.append(contactUsSummary);

  const contactUsContent = block.querySelector('[data-aue-prop="contactUs"]');
  if (contactUsContent) {
    contactUsDetails.append(...contactUsContent.childNodes);
    moveInstrumentation(contactUsContent, contactUsDetails);
  }

  const additionalContactsDetails = document.createElement('details');
  additionalContactsDetails.classList.add('footer-details-nested');
  const additionalContactsSummary = document.createElement('summary');
  additionalContactsSummary.classList.add('footer-summary-nested');
  additionalContactsSummary.textContent = 'For more';
  additionalContactsDetails.append(additionalContactsSummary);

  const additionalContactsContent = block.querySelector('[data-aue-prop="additionalContacts"]');
  if (additionalContactsContent) {
    additionalContactsDetails.append(...additionalContactsContent.childNodes);
    moveInstrumentation(additionalContactsContent, additionalContactsDetails);
  }
  contactUsDetails.append(additionalContactsDetails);
  footerFoot1.append(contactUsDetails);
  footerTags.append(footerFoot1);

  const footerLinksContainer = document.createElement('div');
  footerLinksContainer.classList.add('footer-links-container');

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  footerLinks.forEach((linkItem, index) => {
    const footerFootDiv = document.createElement('div');
    footerFootDiv.classList.add(`footer-foot-${index + 2}`); // Starting from footer-foot-2
    const paragraph = document.createElement('p');
    paragraph.classList.add('footer-paragraph');
    const link = linkItem.querySelector('[data-aue-prop="link"]');
    if (link) {
      paragraph.append(link);
      moveInstrumentation(linkItem, paragraph);
    }
    footerFootDiv.append(paragraph);
    footerLinksContainer.append(footerFootDiv);
  });
  footerTags.append(footerLinksContainer);
  footerContent.append(footerTags);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-copyright');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    copyrightSpan.append(...copyright.childNodes);
    moveInstrumentation(copyright, copyrightSpan);
  }
  footerContent.append(copyrightSpan);
  footerContainer.append(footerContent);

  const backToTopDiv = document.createElement('div');
  backToTopDiv.id = 'footer-backtoTop';
  backToTopDiv.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const backToTopImage = block.querySelector('[data-aue-prop="backToTopImage"]');
  if (backToTopImage) {
    const pic = createOptimizedPicture(backToTopImage.src, backToTopImage.alt);
    backToTopDiv.append(pic);
    moveInstrumentation(backToTopImage, pic.querySelector('img'));
  }

  block.innerHTML = '';
  block.append(footerContainer, backToTopDiv);
}
