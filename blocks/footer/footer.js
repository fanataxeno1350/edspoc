import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('section');
  footerContainer.classList.add('footer-container');
  footerContainer.id = 'footer';

  const footerAfterLayerTop = document.createElement('div');
  footerAfterLayerTop.classList.add('footer-afterLayerTop');
  const topImageWrapper = block.querySelector('[data-aue-prop="topImage"]');
  if (topImageWrapper) {
    const img = topImageWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      footerAfterLayerTop.append(pic);
    }
    moveInstrumentation(topImageWrapper, footerAfterLayerTop);
  }
  footerContainer.append(footerAfterLayerTop);

  const footerContent = document.createElement('div');
  footerContent.classList.add('footer-content');

  const logoWrapper = block.querySelector('[data-aue-prop="logo"]');
  if (logoWrapper) {
    const img = logoWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.classList.add('footer-logo');
      moveInstrumentation(img, pic.querySelector('img'));
      footerContent.append(pic);
    }
    moveInstrumentation(logoWrapper, footerContent);
  }

  const footerTags = document.createElement('div');
  footerTags.classList.add('footer-tags', 'footer-tags-home', 'footer-details-open');
  footerContent.append(footerTags);

  const contactsWrapper = block.querySelector('[data-aue-prop="contacts"]');
  if (contactsWrapper) {
    const footerFoot1 = document.createElement('div');
    footerFoot1.classList.add('footer-foot-1');
    const footerDetails1 = document.createElement('details');
    footerDetails1.classList.add('footer-details-1');
    footerFoot1.append(footerDetails1);

    const summary = document.createElement('summary');
    summary.classList.add('footer-summary');
    const title = contactsWrapper.querySelector('[data-aue-prop="title"]');
    if (title) {
      summary.append(...title.childNodes);
      moveInstrumentation(title, summary);
    }
    footerDetails1.append(summary);

    const text = contactsWrapper.querySelector('[data-aue-prop="text"]');
    if (text) {
      const paragraph = document.createElement('p');
      paragraph.classList.add('footer-paragraph');
      paragraph.append(...text.childNodes);
      moveInstrumentation(text, paragraph);
      footerDetails1.append(paragraph);
    }

    const email = contactsWrapper.querySelector('[data-aue-prop="email"]');
    if (email) {
      const anchor = email.querySelector('a');
      if (anchor) {
        const paragraph = document.createElement('p');
        paragraph.classList.add('footer-paragraph');
        const newAnchor = document.createElement('a');
        newAnchor.style.cursor = 'pointer';
        newAnchor.style.color = 'blue';
        newAnchor.style.textDecoration = 'underline';
        newAnchor.href = anchor.href;
        newAnchor.title = anchor.title;
        newAnchor.append(...anchor.childNodes);
        moveInstrumentation(anchor, newAnchor);
        paragraph.append(newAnchor);
        footerDetails1.append(paragraph);
      }
      moveInstrumentation(email, footerDetails1);
    }

    // Handle nested details if present in the authored content
    const nestedDetails = contactsWrapper.querySelector('details');
    if (nestedDetails) {
      const newNestedDetails = document.createElement('details');
      newNestedDetails.classList.add('footer-details-nested');
      const nestedSummary = nestedDetails.querySelector('summary');
      if (nestedSummary) {
        const newNestedSummary = document.createElement('summary');
        newNestedSummary.classList.add('footer-summary-nested');
        newNestedSummary.append(...nestedSummary.childNodes);
        moveInstrumentation(nestedSummary, newNestedSummary);
        newNestedDetails.append(newNestedSummary);
      }
      const nestedParagraphs = nestedDetails.querySelectorAll('p');
      nestedParagraphs.forEach((p) => {
        const newParagraph = document.createElement('p');
        newParagraph.classList.add('footer-paragraph');
        newParagraph.append(...p.childNodes);
        moveInstrumentation(p, newParagraph);
        newNestedDetails.append(newParagraph);
      });
      moveInstrumentation(nestedDetails, newNestedDetails);
      footerDetails1.append(newNestedDetails);
    }

    footerTags.append(footerFoot1);
    moveInstrumentation(contactsWrapper, footerFoot1);
  }

  const termsOfUseWrapper = block.querySelector('[data-aue-prop="termsOfUse"]');
  if (termsOfUseWrapper) {
    const footerFoot2 = document.createElement('div');
    footerFoot2.classList.add('footer-foot-2');
    const paragraph = document.createElement('p');
    paragraph.classList.add('footer-paragraph');
    const anchor = termsOfUseWrapper.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.target = '_blank';
      newAnchor.href = anchor.href;
      newAnchor.append(...anchor.childNodes);
      moveInstrumentation(anchor, newAnchor);
      paragraph.append(newAnchor);
    }
    footerFoot2.append(paragraph);
    footerTags.append(footerFoot2);
    moveInstrumentation(termsOfUseWrapper, footerFoot2);
  }

  const dataProviderConsentPolicyWrapper = block.querySelector('[data-aue-prop="dataProviderConsentPolicy"]');
  if (dataProviderConsentPolicyWrapper) {
    const footerFoot3 = document.createElement('div');
    footerFoot3.classList.add('footer-foot-3');
    const paragraph = document.createElement('p');
    paragraph.classList.add('footer-paragraph');
    const anchor = dataProviderConsentPolicyWrapper.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.target = '_blank';
      newAnchor.href = anchor.href;
      newAnchor.append(...anchor.childNodes);
      moveInstrumentation(anchor, newAnchor);
      paragraph.append(newAnchor);
    }
    footerFoot3.append(paragraph);
    footerTags.append(footerFoot3);
    moveInstrumentation(dataProviderConsentPolicyWrapper, footerFoot3);
  }

  const privacyPolicyWrapper = block.querySelector('[data-aue-prop="privacyPolicy"]');
  if (privacyPolicyWrapper) {
    const footerFoot4 = document.createElement('div');
    footerFoot4.classList.add('footer-foot-4');
    const paragraph = document.createElement('p');
    paragraph.classList.add('footer-paragraph');
    const anchor = privacyPolicyWrapper.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.target = '_blank';
      newAnchor.href = anchor.href;
      newAnchor.append(...anchor.childNodes);
      moveInstrumentation(anchor, newAnchor);
      paragraph.append(newAnchor);
    }
    footerFoot4.append(paragraph);
    footerTags.append(footerFoot4);
    moveInstrumentation(privacyPolicyWrapper, footerFoot4);
  }

  const copyrightWrapper = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightWrapper) {
    const span = document.createElement('span');
    span.classList.add('footer-copyright');
    span.append(...copyrightWrapper.childNodes);
    moveInstrumentation(copyrightWrapper, span);
    footerContent.append(span);
  }

  footerContainer.append(footerContent);

  const backToTopDiv = document.createElement('div');
  backToTopDiv.id = 'footer-backtoTop';
  backToTopDiv.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' }); // Re-implementing goToTop functionality
  backToTopDiv.style.display = 'block';

  const backToTopIconWrapper = block.querySelector('[data-aue-prop="backToTopIcon"]');
  if (backToTopIconWrapper) {
    const img = backToTopIconWrapper.querySelector('img');
    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, pic.querySelector('img'));
      backToTopDiv.append(pic);
    } else {
      const anchor = backToTopIconWrapper.querySelector('a');
      if (anchor) {
        const newImg = document.createElement('img');
        newImg.alt = 'svg file';
        newImg.src = anchor.href;
        backToTopDiv.append(newImg);
      }
    }
    moveInstrumentation(backToTopIconWrapper, backToTopDiv);
  }

  block.innerHTML = '';
  block.append(footerContainer, backToTopDiv);
}
