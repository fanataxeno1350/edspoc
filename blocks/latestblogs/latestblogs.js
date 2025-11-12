export default function decorate(b){
  b.classList.add('latestblogs-wrapper');
  const listing = b.querySelector('.latestblogs-listing');
  if(listing) listing.classList.add('position-relative');

  const sectionFirst = b.querySelector('.latestblogs-listing-section--first');
  if(sectionFirst){
    sectionFirst.classList.add('text-white','text-center');
    const heading = sectionFirst.querySelector('.latestblogs-listing--title');
    if(heading) heading.classList.add('latestblogs-text__heading-1','text-white','pb-3');
    const desc = sectionFirst.querySelector('.latestblogs-listing--desc');
    if(desc) desc.classList.add('latestblogs-text__body-2','pb-4');
    const btnWrapper = sectionFirst.querySelector('.latestblogs-listing--btnwrapper');
    if(btnWrapper){
      const btn = btnWrapper.querySelector('a');
      if(btn){
        btn.classList.add('latestblogs-text__title-3','latestblogs-listing--btn','analytics_cta_click');
        if(btn.href && !btn.href.includes(window.location.hostname)){
          btn.target='_blank'; btn.rel='noopener noreferrer';
        }
      }
    }
  }
  const sectionSecond = b.querySelector('.latestblogs-listing-section--second');
  if(sectionSecond){
    sectionSecond.classList.add('d-flex');
    const cards = sectionSecond.querySelectorAll('.latestblogs-listing--cardwrapper');
    cards.forEach(card => {
      card.classList.add('analytics_cta_click');
      const cardInner = card.querySelector('.latestblogs-listing--cards');
      if(cardInner){
        const imgWrapper = cardInner.querySelector('.latestblogs-listing--cardimagewrapper');
        if(imgWrapper){
          const img = imgWrapper.querySelector('.latestblogs-listing--cardimage');
          if(img) img.classList.add('w-100','h-100');
        }
        const contentWrapper = cardInner.querySelector('.latestblogs-cards_content--wrapper');
        if(contentWrapper){
          const publishedDate = contentWrapper.querySelector('.latestblogs-published_date');
          if(publishedDate) publishedDate.classList.add('latestblogs-text__body-5','p-0','m-0','mb-3');
          const cardTitle = contentWrapper.querySelector('.latestblogs-text__body-2');
          if(cardTitle) cardTitle.classList.add('latestblogs-text__body');
        }
      }
    });
  }
}