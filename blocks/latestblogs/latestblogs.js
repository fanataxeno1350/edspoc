export default function decorate(b){
  b.classList.add('latestblogs-wrapper');
  const listing = b.querySelector('.latestblogs-listing');
  if(listing) listing.classList.add('position-relative');

  const firstSection = b.querySelector('.latestblogs-listing-section--first');
  if(firstSection){
    firstSection.classList.add('text-white','text-center');
    const title = firstSection.querySelector('.latestblogs-listing--title');
    if(title) title.classList.add('latestblogs-text__heading-1','text-white','pb-3');
    const desc = firstSection.querySelector('.latestblogs-listing--desc');
    if(desc) desc.classList.add('latestblogs-text__body-2','pb-4');
    const btnWrapper = firstSection.querySelector('.latestblogs-listing--btnwrapper');
    if(btnWrapper){
      const cta = btnWrapper.querySelector('a');
      if(cta) cta.classList.add('latestblogs-text__title-3','latestblogs-listing--btn','analytics_cta_click');
    }
  }

  const secondSection = b.querySelector('.latestblogs-listing-section--second');
  if(secondSection){
    secondSection.classList.add('d-flex');
    const cards = secondSection.querySelectorAll('.latestblogs-listing--cardwrapper');
    cards.forEach(card => {
      card.classList.add('analytics_cta_click');
      const cardInner = card.querySelector('.latestblogs-listing--cards');
      if(cardInner) cardInner.classList.add('latestblogs-listing--cards');
      const imgWrapper = card.querySelector('.latestblogs-listing--cardimagewrapper');
      if(imgWrapper) imgWrapper.classList.add('latestblogs-listing--cardimagewrapper');
      const img = card.querySelector('.latestblogs-listing--cardimage');
      if(img) img.classList.add('w-100','h-100');
      const contentWrapper = card.querySelector('.latestblogs-cards_content--wrapper');
      if(contentWrapper) contentWrapper.classList.add('latestblogs-cards_content--wrapper');
      const date = card.querySelector('.latestblogs-published_date');
      if(date) date.classList.add('latestblogs-text__body-5','p-0','m-0','mb-3','latestblogs-published_date');
      const blogTitle = card.querySelector('.latestblogs-text__body-2.latestblogs-text__body');
      if(blogTitle) blogTitle.classList.add('latestblogs-text__body-2','latestblogs-text__body');
    });
  }
}
