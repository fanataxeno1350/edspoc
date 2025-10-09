export default function decorate(b){
  b.classList.add('herohomepage-block');
  const bgImg = b.querySelector('picture.herohomepage-scarp img');
  if(bgImg) bgImg.classList.add('herohomepage-background-image');
  const videoBg = b.querySelector('.herohomepage-background-media .herohomepage-video-player video.herohomepage-video');
  if(videoBg) videoBg.classList.add('herohomepage-background-video');
  const posterVideo = b.querySelector('.herohomepage-background-media .herohomepage-video-player video.herohomepage-poster');
  if(posterVideo) posterVideo.classList.add('herohomepage-poster-video');
  const title = b.querySelector('.herohomepage-title');
  if(title) title.classList.add('herohomepage-block-title');
  const desc = b.querySelector('.herohomepage-description');
  if(desc) desc.classList.add('herohomepage-block-description');
  const ctas = b.querySelectorAll('.herohomepage-call-to-actions a');
  if(ctas&&ctas.length){
    ctas[0].classList.add('herohomepage-cta-1');
    if(ctas[1]) ctas[1].classList.add('herohomepage-cta-2');
  }
  const videoCta = b.querySelector('.herohomepage-play-call-to-action');
  if(videoCta) videoCta.classList.add('herohomepage-video-cta');
}
