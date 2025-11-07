export default function decorate(block) {
  block.classList.add('helpdialog-dialog');
  block.classList.add('helpdialog-note');

  const h1 = block.querySelector('h1');
  if (h1) {
    h1.classList.add('helpdialog-title');
  }

  const p = block.querySelector('p');
  if (p) {
    p.classList.add('helpdialog-justify');

    const span = p.querySelector('span.helpdialog-gnucash');
    if (span) {
      span.classList.add('helpdialog-gnucash');
    }

    const a = p.querySelector('a');
    if (a) {
      a.classList.add('helpdialog-cta');
    }
  }
}