export default function decorate(b){
  b.classList.add('access-denied-container');
  const title = b.querySelector('.access-denied-title');
  if(title) title.classList.add('access-denied-title');
  const msg = b.querySelector('.access-denied-message');
  if(msg) msg.classList.add('access-denied-message');
  const ref = b.querySelector('.access-denied-reference');
  if(ref) ref.classList.add('access-denied-reference');
  const link = b.querySelector('.access-denied-link');
  if(link) link.classList.add('access-denied-link');
}