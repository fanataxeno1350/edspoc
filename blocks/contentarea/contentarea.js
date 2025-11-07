export default function decorate(block) {
  block.classList.add('contentarea-container');

  const title = block.querySelector('h1.contentarea-title');
  if (title) {
    title.classList.add('contentarea-title');
  }

  const mainContent = block.querySelector('.contentarea-main-content');
  if (mainContent) {
    mainContent.classList.add('contentarea-main-content');
  }

  const downloadSection = block.querySelector('.contentarea-download');
  if (downloadSection) {
    downloadSection.classList.add('contentarea-download');

    const downloadDetails = downloadSection.querySelector('.contentarea-download-details');
    if (downloadDetails) {
      downloadDetails.classList.add('contentarea-download-details');
      const downloadHeading = downloadDetails.querySelector('h2.contentarea-download-heading');
      if (downloadHeading) {
        downloadHeading.classList.add('contentarea-download-heading');
      }
      const downloadList = downloadDetails.querySelector('ul.contentarea-download-list');
      if (downloadList) {
        downloadList.classList.add('contentarea-download-list');
        downloadList.querySelectorAll('li.contentarea-download-item').forEach(item => {
          item.classList.add('contentarea-download-item');
          const img = item.querySelector('img');
          if (img) img.classList.add('contentarea-download-icon');
          item.querySelectorAll('a').forEach(link => link.classList.add('contentarea-download-link'));
          const sublist = item.querySelector('ul.contentarea-download-sublist');
          if (sublist) {
            sublist.classList.add('contentarea-download-sublist');
            sublist.querySelectorAll('li.contentarea-download-subitem').forEach(subitem => {
              subitem.classList.add('contentarea-download-subitem');
              const subitemImg = subitem.querySelector('img');
              if (subitemImg) subitemImg.classList.add('contentarea-download-icon');
              subitem.querySelectorAll('a').forEach(link => link.classList.add('contentarea-download-link'));
            });
          }
        });
        const moreDownloadsLink = downloadList.querySelector('a.contentarea-download-more');
        if (moreDownloadsLink) {
          moreDownloadsLink.classList.add('contentarea-download-link', 'contentarea-download-more');
        }
      }
    }

    const downloadImage = downloadSection.querySelector('.contentarea-download-image');
    if (downloadImage) {
      downloadImage.classList.add('contentarea-download-image');
    }

    const oldVersions = downloadSection.querySelector('.contentarea-download-old-versions');
    if (oldVersions) {
      oldVersions.classList.add('contentarea-download-old-versions');
      oldVersions.querySelectorAll('p.contentarea-text-paragraph').forEach(p => {
        p.classList.add('contentarea-text-paragraph');
        p.querySelectorAll('a').forEach(link => link.classList.add('contentarea-download-link'));
      });
    }
  }

  block.querySelectorAll('p.contentarea-text-paragraph').forEach(p => {
    p.classList.add('contentarea-text-paragraph');
    if (p.classList.contains('contentarea-text-justify')) p.classList.add('contentarea-text-justify');
    p.querySelectorAll('span.contentarea-gnucash').forEach(span => span.classList.add('contentarea-gnucash'));
    p.querySelectorAll('a').forEach(link => link.classList.add('contentarea-link'));
  });

  const helpSection = block.querySelector('.contentarea-help-section');
  if (helpSection) {
    helpSection.classList.add('contentarea-help-section');
    const dialog = helpSection.querySelector('.contentarea-dialog');
    if (dialog) {
      dialog.classList.add('contentarea-dialog', 'contentarea-note');
      const dialogTitle = dialog.querySelector('h1.contentarea-dialog-title');
      if (dialogTitle) dialogTitle.classList.add('contentarea-dialog-title');
      const dialogParagraph = dialog.querySelector('p.contentarea-text-paragraph');
      if (dialogParagraph) {
        dialogParagraph.classList.add('contentarea-text-paragraph', 'contentarea-text-justify');
        dialogParagraph.querySelectorAll('span.contentarea-gnucash').forEach(span => span.classList.add('contentarea-gnucash'));
        dialogParagraph.querySelectorAll('a').forEach(link => link.classList.add('contentarea-link'));
      }
    }
  }

  const featuresSection = block.querySelector('.contentarea-features-section');
  if (featuresSection) {
    featuresSection.classList.add('contentarea-features-section');
    const featuresHeading = featuresSection.querySelector('h2.contentarea-features-heading');
    if (featuresHeading) featuresHeading.classList.add('contentarea-features-heading');
  }

  const mainFeature = block.querySelector('.contentarea-main-feature');
  if (mainFeature) {
    mainFeature.classList.add('contentarea-main-feature');
    const featureList = mainFeature.querySelector('ul.contentarea-feature-list');
    if (featureList) {
      featureList.classList.add('contentarea-feature-list');
      featureList.querySelectorAll('li.contentarea-feature-item').forEach(item => item.classList.add('contentarea-feature-item'));
    }
    const discoverMoreLink = mainFeature.querySelector('a.contentarea-discover-more-link');
    if (discoverMoreLink) {
      discoverMoreLink.classList.add('contentarea-discover-more-link');
    }
  }
}