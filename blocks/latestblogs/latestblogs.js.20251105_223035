export default function decorate(block) {
  // Add main wrapper class
  block.classList.add('latestblogs-wrapper');
  
  // Create overall structure
  const listing = document.createElement('div');
  listing.className = 'latestblogs-listing';

  // --- FIRST SECTION (Title, desc, button) ---
  const sectionFirst = document.createElement('div');
  sectionFirst.className = 'latestblogs-listing_section--first latestblogs-text--white latestblogs-text-center';
  
  // Title
  const title = document.createElement('h2');
  title.className = 'latestblogs-listing--title latestblogs--text__heading-1 latestblogs-text--white latestblogs-pb-3';
  title.textContent = 'More Boings';
  sectionFirst.appendChild(title);

  // Description
  const desc = document.createElement('p');
  desc.className = 'latestblogs-listing--desc latestblogs--text__body-2 latestblogs-pb-4';
  desc.textContent = 'Stay updated with our latest news, blogs and events';
  sectionFirst.appendChild(desc);

  // Button Wrapper
  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'latestblogs-listing--btnwrapper';
  const btn = document.createElement('a');
  btn.href = '/bolte-sitare/boingwale-blogs.html';
  btn.title = 'View All';
  btn.className = 'latestblogs--text__title-3 latestblogs-listing--btn analytics_cta_click';
  btn.textContent = 'View All';
  btnWrapper.appendChild(btn);
  sectionFirst.appendChild(btnWrapper);
  listing.appendChild(sectionFirst);

  // --- SECOND SECTION (Cards) ---
  const sectionSecond = document.createElement('div');
  sectionSecond.className = 'latestblogs-listing_section--second latestblogs-d-flex';

  // Card Data
  const cardData = [
    {
      url: '/bolte-sitare/boingwale-blogs/kaunsi-diwali-sweet-aapke-zodiac-sign-se-sabse-zyada-milti-hai-.html',
      ctaLabel: ' Kaunsi Diwali Sweet Aapke Zodiac Sign Se Sabse Zyada Milti Hai?',
      image: '/content/dam/aemigrate/uploaded-folder/image/mithai-banner?fmt=webp-alpha.webp',
      date: '2025-10-21T00:00:00.000+05:30',
      displayDate: '20 October 2025',
      title: 'Kaunsi Diwali Sweet Aapke Zodiac Sign Se Sabse Zyada Milti Hai?'
    },
    {
      url: '/bolte-sitare/boingwale-blogs/aap-kis-type-ke-rangoli--artist--ho-.html',
      ctaLabel: ' Aap Kis Type Ke Rangoli ‘Artist’ Ho?',
      image: '/content/dam/aemigrate/uploaded-folder/image/rangoli-banner?fmt=webp-alpha.webp',
      date: '2025-10-21T00:00:00.000+05:30',
      displayDate: '20 October 2025',
      title: 'Aap Kis Type Ke Rangoli ‘Artist’ Ho?'
    },
    {
      url: '/bolte-sitare/boingwale-blogs/har-zodiac-sign-kis-type-ke-diwali-whatsapp-forward-bhejta-hai-.html',
      ctaLabel: ' Har Zodiac Sign Kis Type Ke Diwali WhatsApp Forward Bhejta Hai?',
      image: '/content/dam/aemigrate/uploaded-folder/image/diwali-whatsapp-forward-banner?fmt=webp-alpha.webp',
      date: '2025-10-21T00:00:00.000+05:30',
      displayDate: '20 October 2025',
      title: 'Har Zodiac Sign Kis Type Ke Diwali WhatsApp Forward Bhejta Hai?'
    },
    {
      url: '/bolte-sitare/boingwale-blogs/aap-kis-style-mein-diwali-wish-message-karte-hain--jaaniye-zodia.html',
      ctaLabel: ' Aap Kis Style Mein Diwali Wish Message Karte Hain? Jaaniye Zodiac Ki Nazar Se',
      image: '/content/dam/aemigrate/uploaded-folder/image/diwali-wish-message-banner-v2?fmt=webp-alpha.webp',
      date: '2025-10-21T00:00:00.000+05:30',
      displayDate: '20 October 2025',
      title: 'Aap Kis Style Mein Diwali Wish Message Karte Hain? Jaaniye Zodiac Ki Nazar Se'
    },
    {
      url: '/bolte-sitare/boingwale-blogs/aapka-diwali-party-vibe-kya-hai-.html',
      ctaLabel: ' Aapka Diwali Party Vibe Kya Hai?',
      image: '/content/dam/aemigrate/uploaded-folder/image/diwali-party-banner?fmt=webp-alpha.webp',
      date: '2025-10-21T00:00:00.000+05:30',
      displayDate: '20 October 2025',
      title: 'Aapka Diwali Party Vibe Kya Hai?'
    },
    {
      url: '/bolte-sitare/boingwale-blogs/kaunsa-diwali-cracker-aapke-zodiac-ko-represent-karta-hai-.html',
      ctaLabel: ' Kaunsa Diwali Cracker Aapke Zodiac Ko Represent Karta Hai?',
      image: '/content/dam/aemigrate/uploaded-folder/image/patakha-banner?fmt=webp-alpha.webp',
      date: '2025-10-20T00:00:00.000+05:30',
      displayDate: '19 October 2025',
      title: 'Kaunsa Diwali Cracker Aapke Zodiac Ko Represent Karta Hai?'
    },
    {
      url: '/bolte-sitare/boingwale-blogs/zodiac-ki-nazar-se--har-sign-ka-perfect-diwali-hamper.html',
      ctaLabel: ' Zodiac Ki Nazar Se: Har Sign Ka Perfect Diwali Hamper',
      image: '/content/dam/aemigrate/uploaded-folder/image/diwali-hamper-banner?fmt=webp-alpha.webp',
      date: '2025-10-20T00:00:00.000+05:30',
      displayDate: '19 October 2025',
      title: 'Zodiac Ki Nazar Se: Har Sign Ka Perfect Diwali Hamper'
    },
    {
      url: '/bolte-sitare/boingwale-blogs/aapka-boss-aapko-social-media-pe-follow-kare-toh-aap-kaise-react.html',
      ctaLabel: ' Aapka Boss Aapko Social Media Pe Follow Kare Toh Aap Kaise React Karte Ho?',
      image: '/content/dam/aemigrate/uploaded-folder/image/stalked-by-boss-banner.jpeg',
      date: '2025-10-19T00:00:00.000+05:30',
      displayDate: '18 October 2025',
      title: 'Aapka Boss Aapko Social Media Pe Follow Kare Toh Aap Kaise React Karte Ho?'
    }
  ];

  cardData.forEach((card) => {
    const cardLink = document.createElement('a');
    cardLink.href = card.url;
    cardLink.className = 'latestblogs-listing--cardwrapper analytics_cta_click';
    cardLink.setAttribute('data-cta-label', card.ctaLabel);

    const cardsDiv = document.createElement('div');
    cardsDiv.className = 'latestblogs-listing--cards';

    // Image
    const imgWrap = document.createElement('div');
    imgWrap.className = 'latestblogs-listing--cardimagewrapper';
    const img = document.createElement('img');
    img.src = card.image;
    img.className = 'latestblogs-listing--cardimage latestblogs-w-100 latestblogs-h-100';
    imgWrap.appendChild(img);
    cardsDiv.appendChild(imgWrap);

    // Content Wrapper
    const contentWrap = document.createElement('div');
    contentWrap.className = 'latestblogs-cards_content--wrapper';
    // Date
    const dateP = document.createElement('p');
    dateP.className = 'latestblogs--text__body-5 latestblogs-p-0 latestblogs-m-0 latestblogs-mb-3 latestblogs-published_date';
    dateP.setAttribute('data-date', card.date);
    dateP.textContent = card.displayDate;
    contentWrap.appendChild(dateP);
    // Title
    const titleP = document.createElement('p');
    titleP.className = 'latestblogs--text__body-2 latestblogs--text__body';
    titleP.textContent = card.title;
    contentWrap.appendChild(titleP);

    cardsDiv.appendChild(contentWrap);
    cardLink.appendChild(cardsDiv);
    sectionSecond.appendChild(cardLink);
  });

  listing.appendChild(sectionSecond);
  block.textContent = '';
  block.appendChild(listing);
}