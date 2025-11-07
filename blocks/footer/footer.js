export default function decorate(block) {
  const footerContainer = block.querySelector('.footer-container');
  if (footerContainer) {
    const html5BadgeDiv = footerContainer.querySelector('.footer-html5-badge');
    if (html5BadgeDiv) {
      const link = html5BadgeDiv.querySelector('a');
      if (link) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    }

    const copyrightP = footerContainer.querySelector('.footer-copyright');
    if (copyrightP) {
      // No specific JS needed for a simple paragraph, but can be extended if dynamic content is added
    }

    const serverOutageP = footerContainer.querySelector('.footer-server-outage');
    if (serverOutageP) {
      const link = serverOutageP.querySelector('a');
      if (link) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    }

    const translationProblemsP = footerContainer.querySelector('.footer-translation-problems');
    if (translationProblemsP) {
      const link = translationProblemsP.querySelector('a');
      if (link) {
        // Mailto links typically don't need target='_blank'
      }
    }
  }
}