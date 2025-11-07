export default function decorate(block) {
  const floatLeftDivs = block.querySelectorAll('.downloadsection-float-left');
  floatLeftDivs.forEach((div) => {
    const h2 = div.querySelector('h2');
    if (h2) {
      h2.classList.add('downloadsection-dwnld-box');
    }
    const images = div.querySelectorAll('img');
    images.forEach((img) => {
      img.classList.add('downloadsection-img-vertical-align');
    });
    const moreDownloadsLink = div.querySelector('.downloadsection-more-downloads');
    if (moreDownloadsLink) {
      moreDownloadsLink.classList.add('downloadsection-more-downloads');
    }
  });

  const downloadImageDiv = block.querySelector('.downloadsection-downloadimage');
  if (downloadImageDiv) {
    const img = downloadImageDiv.querySelector('img');
    if (img) {
      img.alt = 'download';
    }
  }
}