export default function decorate(block) {
  const primary = document.createElement('div');
  primary.className = 'footer-brand-primary';
  const secondary = document.createElement('div');
  secondary.className = 'footer-brand-secondary';

  // Primary section
  const brandLeft = block.querySelector('.footer-brand-primary--content .footer-brand-left');
  const brandRight = block.querySelector('.footer-brand-primary--content .footer-brand-right');
  if (brandLeft) primary.append(brandLeft.cloneNode(true));
  if (brandRight) primary.append(brandRight.cloneNode(true));

  // Secondary section
  const secContent = block.querySelector('.footer-brand-secondary--content');
  if (secContent) secondary.append(secContent.cloneNode(true));

  block.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-brand-wrapper w-100 bg-boing-neutral-gray-600';
  wrapper.append(primary, secondary);
  block.append(wrapper);
}