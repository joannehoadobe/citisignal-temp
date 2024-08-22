import { getAemAuthorEnv } from '../../scripts/configs.js';

export default function decorate(block) {
  // this is for UE to use the same columns block no matter the layout
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < block.classList.length; i++) {
    if (block.classList[i].includes('grid-placeholder-icons')) {
      block.classList.remove('grid-placeholder-icons');
      block.classList.add('grid');
    }
  }
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
      // this is to remove empty <div></div> because of UE
      // using the same columns block
      if (!col.textContent.trim()) {
        row.remove();
      }
    });
  });

  const isAemAuthor = getAemAuthorEnv();
  if (isAemAuthor && /^\s*\n\s*$/.test(block.innerHTML)) { // block.innerHTML.trim() === '' && block.childNodes && block.childNodes.length === 0) {
    /* eslint-disable-next-line no-console */
    console.log(`in columns block, inner HTML = ${block.innerHTML}, text content = ${block.textContent}`);
    const authorBlock = document.createElement('div');
    authorBlock.textContent = 'Columns block for enrichment';
    block.appendChild(authorBlock);
  }
}
