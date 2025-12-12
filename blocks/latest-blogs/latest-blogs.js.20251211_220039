export default function decorate(block) {
  const wrapper = block.closest('.latest-blogs-wrapper');

  // -------------------------------
  // Extract Title, Description, CTA
  // -------------------------------
  const title = block.querySelector('[data-aue-prop="title"] p')?.innerHTML || '';
  const description = block.querySelector('[data-aue-prop="description"] p')?.innerHTML || '';

  const ctaEl = block.querySelector('.button-container a');
  const ctaHref = ctaEl?.getAttribute('href') || '#';
  const ctaText = ctaEl?.innerText?.trim() || 'View All';

  // -------------------------------
  // Extract Blog Cards (dynamic)
  // -------------------------------
  const cards = [...block.querySelectorAll('[data-aue-model="blogCard"]')].map(card => {
    const link = card.querySelector('.button-container a')?.href || '#';
    const label = card.querySelector('[data-aue-prop="blogTitle"] p')?.innerText?.trim() || '';

    const img = card.querySelector('img')?.src || '';

    const dateRaw = card.querySelector('[data-aue-prop="publishedDate"]')?.innerText || '';
    const dateObj = new Date(dateRaw);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    return { link, label, img, dateRaw, formattedDate };
  });

  // -------------------------------
  // Build HTML Exactly Like Expected
  // -------------------------------
  const html = `
  <div class="latestBlogs aem-GridColumn aem-GridColumn--default--12">
      <section class="article_listing--wrapper">
          <div class="article_listing position-relative">

              <!-- LEFT SECTION -->
              <div class="article_listing_section--first text-white text-center">
                  <h2 class="article_listing--title boing--text__heading-1 text-white pb-3">
                      ${title}
                  </h2>

                  <p class="article_listing--desc boing--text__body-2 pb-4">
                      ${description}
                  </p>

                  <div class="article_listing--btnWrapper">
                      <a href="${ctaHref}" title="${ctaText}"
                         class="boing--text__title-3 article_listing--btn analytics_cta_click">
                          ${ctaText}
                          <svg class="arrow-icon">
                              <use xlink:href="/etc.clientlibs/itc-family-comedy/clientlibs/clientlib-boing/resources/images/sprite/sprite-boing.svg#arrow_forward"></use>
                          </svg>
                      </a>
                  </div>
              </div>

              <!-- BLOG CARDS SECTION -->
              <div class="article_listing_section--second d-flex">
                  ${cards.map(c => `
                  <a href="${c.link}" class="article_listing--cardWrapper analytics_cta_click" data-cta-label="${c.label}">
                      <div class="article_listing--cards">
                          <div class="article_listing--cardImageWrapper">
                              <img src="${c.img}" class="article_listing--cardImage w-100 h-100">
                          </div>

                          <div class="cards_content--wrapper">
                              <p data-date="${c.dateRaw}" class="boing--text__body-5 p-0 m-0 mb-3 published_date">
                                  ${c.formattedDate}
                              </p>

                              <p class="boing--text__body-2 boing--text__body">
                                  ${c.label}
                              </p>
                          </div>
                      </div>
                  </a>
                  `).join('')}
              </div>

          </div>
      </section>
  </div>
  `;

  // Replace original EDS DOM
  wrapper.innerHTML = html;
}
