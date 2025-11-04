export default function decorate(block) {
  // Decorate section intro
  const wrapper = document.createElement('div');
  wrapper.className = 'latestblogs-wrapper';
  const listing = document.createElement('div');
  listing.className = 'latestblogs-listing';

  // Find and move section intro
  const sectionFirst = block.querySelector('.latestblogs-listing_section--first');
  if (sectionFirst) {
    wrapper.appendChild(sectionFirst);
  }

  // Blog cards
  const cardsSection = block.querySelector('.latestblogs-listing_section--second');
  if (cardsSection) {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'latestblogs-listing_section--second latestblogs-d-flex';
    const cardLinks = cardsSection.querySelectorAll('.latestblogs-listing--cardwrapper');
    cardLinks.forEach((a) => {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = a.href;
      cardWrapper.className = a.className;
      if (a.hasAttribute('data-cta-label')) {
        cardWrapper.setAttribute('data-cta-label', a.getAttribute('data-cta-label'));
      }

      const cards = a.querySelector('.latestblogs-listing--cards');
      if (cards) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'latestblogs-listing--cards';

        const imageWrapper = cards.querySelector('.latestblogs-listing--cardimagewrapper');
        if (imageWrapper) {
          const imgDiv = document.createElement('div');
          imgDiv.className = 'latestblogs-listing--cardimagewrapper';
          const img = imageWrapper.querySelector('img');
          if (img) {
            const image = document.createElement('img');
            image.src = img.src;
            image.alt = img.alt || '';
            image.className = img.className;
            imgDiv.appendChild(image);
          }
          cardDiv.appendChild(imgDiv);
        }

        const contentWrapper = cards.querySelector('.latestblogs-cards_content--wrapper');
        if (contentWrapper) {
          const contentDiv = document.createElement('div');
          contentDiv.className = 'latestblogs-cards_content--wrapper';

          const dateP = contentWrapper.querySelector('.latestblogs--text__body-5');
          if (dateP) {
            const dateElem = document.createElement('p');
            dateElem.className = dateP.className;
            if (dateP.hasAttribute('data-date')) {
              dateElem.setAttribute('data-date', dateP.getAttribute('data-date'));
            }
            dateElem.innerHTML = dateP.innerHTML;
            contentDiv.appendChild(dateElem);
          }

          const titleP = contentWrapper.querySelector('.latestblogs--text__body-2');
          if (titleP) {
            const titleElem = document.createElement('p');
            titleElem.className = titleP.className;
            titleElem.innerHTML = titleP.innerHTML;
            contentDiv.appendChild(titleElem);
          }

          cardDiv.appendChild(contentDiv);
        }
        cardWrapper.appendChild(cardDiv);
      }
      cardsContainer.appendChild(cardWrapper);
    });
    listing.appendChild(cardsContainer);
  }
  wrapper.appendChild(listing);
  block.textContent = '';
  block.appendChild(wrapper);
}