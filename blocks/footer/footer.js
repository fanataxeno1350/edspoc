import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('section');
  footerContainer.classList.add('footer-container');
  footerContainer.id = 'footer';

  const footerAfterLayerTop = document.createElement('div');
  footerAfterLayerTop.classList.add('footer-afterLayerTop');
  const topImage = block.querySelector('[data-aue-prop="topImage"]');
  if (topImage) {
    const pic = createOptimizedPicture(topImage.src, topImage.alt);
    moveInstrumentation(topImage, pic.querySelector('img'));
    footerAfterLayerTop.append(pic);
  }
  footerContainer.append(footerAfterLayerTop);

  const footerContent = document.createElement('div');
  footerContent.classList.add('footer-content');

  const logo = block.querySelector('[data-aue-prop="logo"]');
  if (logo) {
    const footerLogo = createOptimizedPicture(logo.src, logo.alt);
    footerLogo.classList.add('footer-logo');
    moveInstrumentation(logo, footerLogo.querySelector('img'));
    footerContent.append(footerLogo);
  }

  const footerTags = document.createElement('div');
  footerTags.classList.add('footer-tags', 'footer-tags-home', 'footer-details-open');

  const footerFoot1 = document.createElement('div');
  footerFoot1.classList.add('footer-foot-1');
  const footerDetails1 = document.createElement('details');
  footerDetails1.classList.add('footer-details-1');

  const footerSummary = document.createElement('summary');
  footerSummary.classList.add('footer-summary');
  const contactUsTitle = block.querySelector('[data-aue-prop="contactUsTitle"]');
  if (contactUsTitle) {
    footerSummary.append(...contactUsTitle.childNodes);
    moveInstrumentation(contactUsTitle, footerSummary);
  }
  footerDetails1.append(footerSummary);

  const expeditionsLabel = block.querySelector('[data-aue-prop="expeditionsLabel"]');
  const expeditionsEmail = block.querySelector('[data-aue-prop="expeditionsEmail"]');
  if (expeditionsLabel || expeditionsEmail) {
    const pExpeditions = document.createElement('p');
    pExpeditions.classList.add('footer-paragraph');
    if (expeditionsLabel) {
      pExpeditions.append(...expeditionsLabel.childNodes);
      moveInstrumentation(expeditionsLabel, pExpeditions);
    }
    if (expeditionsEmail) {
      const br = document.createElement('br');
      const aExpeditions = document.createElement('a');
      aExpeditions.style.cursor = 'pointer';
      aExpeditions.style.color = 'blue';
      aExpeditions.style.textDecoration = 'underline';
      aExpeditions.href = expeditionsEmail.href || `mailto:${expeditionsEmail.textContent}`;
      aExpeditions.title = expeditionsEmail.title || expeditionsEmail.textContent;
      aExpeditions.append(...expeditionsEmail.childNodes);
      moveInstrumentation(expeditionsEmail, aExpeditions);
      pExpeditions.append(br, aExpeditions);
    }
    footerDetails1.append(pExpeditions, document.createElement('br'));
  }

  const mastersLabel = block.querySelector('[data-aue-prop="mastersLabel"]');
  const mastersEmail = block.querySelector('[data-aue-prop="mastersEmail"]');
  if (mastersLabel || mastersEmail) {
    const pMasters = document.createElement('p');
    pMasters.classList.add('footer-paragraph');
    if (mastersLabel) {
      pMasters.append(...mastersLabel.childNodes);
      moveInstrumentation(mastersLabel, pMasters);
    }
    if (mastersEmail) {
      const br = document.createElement('br');
      const aMasters = document.createElement('a');
      aMasters.style.cursor = 'pointer';
      aMasters.style.color = 'blue';
      aMasters.style.textDecoration = 'underline';
      aMasters.href = mastersEmail.href || `mailto:${mastersEmail.textContent}`;
      aMasters.title = mastersEmail.title || mastersEmail.textContent;
      aMasters.append(...mastersEmail.childNodes);
      moveInstrumentation(mastersEmail, aMasters);
      pMasters.append(br, aMasters);
    }
    footerDetails1.append(pMasters, document.createElement('br'));
  }

  const footerDetailsNested = document.createElement('details');
  footerDetailsNested.classList.add('footer-details-nested');
  const footerSummaryNested = document.createElement('summary');
  footerSummaryNested.classList.add('footer-summary-nested');
  const forMoreTitle = block.querySelector('[data-aue-prop="forMoreTitle"]');
  if (forMoreTitle) {
    footerSummaryNested.append(...forMoreTitle.childNodes);
    moveInstrumentation(forMoreTitle, footerSummaryNested);
  }
  footerDetailsNested.append(footerSummaryNested);

  const forMoreContact1 = block.querySelector('[data-aue-prop="forMoreContact1"]');
  if (forMoreContact1) {
    const pContact1 = document.createElement('p');
    pContact1.classList.add('footer-paragraph');
    pContact1.append(...forMoreContact1.childNodes);
    moveInstrumentation(forMoreContact1, pContact1);
    footerDetailsNested.append(pContact1, document.createElement('br'));
  }

  const forMoreContact2 = block.querySelector('[data-aue-prop="forMoreContact2"]');
  if (forMoreContact2) {
    const pContact2 = document.createElement('p');
    pContact2.classList.add('footer-paragraph');
    pContact2.append(...forMoreContact2.childNodes);
    moveInstrumentation(forMoreContact2, pContact2);
    footerDetailsNested.append(pContact2, document.createElement('br'));
  }
  footerDetails1.append(footerDetailsNested);
  footerFoot1.append(footerDetails1);
  footerTags.append(footerFoot1);

  const footerLinksContainer = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinksContainer) {
    Array.from(footerLinksContainer.children).forEach((linkRow, index) => {
      const footerFoot = document.createElement('div');
      footerFoot.classList.add(`footer-foot-${index + 2}`); // Start from footer-foot-2
      const pLink = document.createElement('p');
      pLink.classList.add('footer-paragraph');
      const aLink = document.createElement('a');
      const url = linkRow.querySelector('[data-aue-prop="url"]');
      const text = linkRow.querySelector('[data-aue-prop="text"]');

      if (url) {
        aLink.href = url.href || url.textContent;
        aLink.target = '_blank'; // Assuming target blank for external links
        moveInstrumentation(url, aLink);
      }
      if (text) {
        aLink.append(...text.childNodes);
        moveInstrumentation(text, aLink);
      }
      pLink.append(aLink);
      footerFoot.append(pLink);
      footerTags.append(footerFoot);
      moveInstrumentation(linkRow, footerFoot); // Transfer instrumentation for the whole link row
    });
  }

  footerContent.append(footerTags);

  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const footerCopyright = document.createElement('span');
    footerCopyright.classList.add('footer-copyright');
    footerCopyright.append(...copyright.childNodes);
    moveInstrumentation(copyright, footerCopyright);
    footerContent.append(footerCopyright);
  }
  footerContainer.append(footerContent);

  const backToTopDiv = document.createElement('div');
  backToTopDiv.id = 'footer-backtoTop';
  backToTopDiv.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' }); // Re-implementing goToTop functionality
  backToTopDiv.style.display = 'block';

  const backToTopIcon = block.querySelector('[data-aue-prop="backToTopIcon"]');
  if (backToTopIcon) {
    const img = document.createElement('img');
    img.alt = backToTopIcon.alt || 'svg file';
    img.src = backToTopIcon.src;
    moveInstrumentation(backToTopIcon, img);
    backToTopDiv.append(img);
  }

  block.innerHTML = '';
  block.append(footerContainer, backToTopDiv);
}
