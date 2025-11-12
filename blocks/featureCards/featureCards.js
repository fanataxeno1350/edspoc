export default function decorate(b){
  b.classList.add('featureCards-container');
  const titleWrapper = b.querySelector('.featureCards-text-wrapper');
  if(titleWrapper){
    const title = titleWrapper.querySelector('.featureCards-title');
    if(title) title.classList.add('featureCards-title');
  }
  b.querySelectorAll('.featureCards-section').forEach(section=>{
    section.classList.add('featureCards-section');
    const link = section.querySelector('.featureCards-link');
    if(link){
      link.classList.add('featureCards-link');
      const imgWrapper = link.querySelector('.featureCards-image-wrapper');
      if(imgWrapper){
        imgWrapper.classList.add('featureCards-image-wrapper');
        const img = imgWrapper.querySelector('.featureCards-image');
        if(img) img.classList.add('featureCards-image');
      }
      const contentWrapper = link.querySelector('.featureCards-content-wrapper');
      if(contentWrapper){
        contentWrapper.classList.add('featureCards-content-wrapper');
        const itemTitle = contentWrapper.querySelector('.featureCards-item-title');
        if(itemTitle) itemTitle.classList.add('featureCards-item-title');
        const descWrapper = contentWrapper.querySelector('.featureCards-description-wrapper');
        if(descWrapper){
          descWrapper.classList.add('featureCards-description-wrapper');
          const desc = descWrapper.querySelector('.featureCards-description');
          if(desc) desc.classList.add('featureCards-description');
        }
        const btnWrapper = contentWrapper.querySelector('.featureCards-redirect-button-wrapper');
        if(btnWrapper){
          btnWrapper.classList.add('featureCards-redirect-button-wrapper');
          const btn = btnWrapper.querySelector('.featureCards-arrow-icon-button');
          if(btn) btn.classList.add('featureCards-arrow-icon-button');
        }
      }
    }
  });
  b.querySelectorAll('.featureCards-bolte-sitare-card-section').forEach(card=>{
    card.classList.add('featureCards-bolte-sitare-card-section');
    if(card.classList.contains('featureCards-hide-desktop')){
      card.classList.add('featureCards-hide-desktop');
    }
    const wrapper = card.querySelector('.featureCards-bolte-sitare-card-wrapper');
    if(wrapper){
      wrapper.classList.add('featureCards-bolte-sitare-card-wrapper');
      const imgDiv = wrapper.querySelector('.featureCards-bolte-sitare-card-image');
      if(imgDiv){
        imgDiv.classList.add('featureCards-bolte-sitare-card-image');
        const img = imgDiv.querySelector('.featureCards-card-image');
        if(img) img.classList.add('featureCards-card-image');
      }
      const content = wrapper.querySelector('.featureCards-bolte-sitare-content-wrapper');
      if(content){
        content.classList.add('featureCards-bolte-sitare-content-wrapper');
        const title = content.querySelector('.featureCards-bolte-sitare-title');
        if(title) title.classList.add('featureCards-bolte-sitare-title');
        const text = content.querySelector('.featureCards-bolte-sitare-text');
        if(text) text.classList.add('featureCards-bolte-sitare-text');
        const btn = content.querySelector('.featureCards-bolte-sitare-button');
        if(btn) btn.classList.add('featureCards-bolte-sitare-button');
      }
    }
  });
  const curve = b.querySelector('.featureCards-curve-container');
  if(curve && curve.classList.contains('featureCards-hide-desktop')){
    curve.classList.add('featureCards-curve-container');
    curve.classList.add('featureCards-hide-desktop');
  }
}