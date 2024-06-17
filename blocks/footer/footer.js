import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // const footerMeta = getMetadata('footer');
  // block.textContent = '';

  // // load footer fragment
  // const footerPath = footerMeta.footer || '/footer';
  // const fragment = await loadFragment(footerPath);

  // // decorate footer DOM
  // const footer = document.createElement('div');
  // footer.classList.add('wrapper');
  // while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  // block.append(footer);
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  console.log('footer meta = ' + footerMeta);
  console.log('footer meta footer = ' + footerMeta.footer);
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
