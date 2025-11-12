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
    const btnWrap = firstSection.querySelector('.latestblogs-listing--btnwrapper');
    if(btnWrap){
      const cta = btnWrap.querySelector('a');
      if(cta){
        cta.classList.add('latestblogs-text__title-3','latestblogs-listing--btn','analytics_cta_click');
        if(cta.href&&!cta.href.includes(window.location.hostname)){
          cta.target='_blank';
          cta.rel='noopener noreferrer';
        }
      }
    }
  }
  const cardsSection = b.querySelector('.latestblogs-listing-section--second');
  if(cardsSection){
    cardsSection.classList.add('d-flex');
    const cards = cardsSection.querySelectorAll('.latestblogs-listing--cardwrapper');
    cards.forEach(card=>{
      card.classList.add('analytics_cta_click');
      const img = card.querySelector('.latestblogs-listing--cardimage');
      if(img){
        img.classList.add('w-100','h-100');
      }
      const date = card.querySelector('.latestblogs-published_date');
      if(date){
        date.classList.add('latestblogs-text__body-5','p-0','m-0','mb-3');
      }
      const heading = card.querySelector('.latestblogs-text__body');
      if(heading){
        heading.classList.add('latestblogs-text__body-2');
      }
    });
  }
}