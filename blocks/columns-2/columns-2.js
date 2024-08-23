import { getAemAuthorEnv } from '../../scripts/configs.js';

export default function decorate(block) {
  // this is for UE to use the same columns block no matter the layout
  // eslint-disable-next-line no-console
  console.log(`in columns2 block, class list = ${block.classList}`);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < block.classList.length; i++) {
    if (block.classList[i].includes('grid-placeholder-icons')) {
      block.classList.remove('grid-placeholder-icons');
      block.classList.add('grid');
      block.classList.add('columns'); // this is temporary until revert back to columns block
    }
    if (block.classList[i].includes('grid') || block.classList[i].includes('promo')) {
      block.classList.add('columns');
    }
  }
  if (block.firstElementChild && block.firstElementChild.children) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);
  }

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      // eslint-disable-next-line no-console
      console.log(`col = ${col}, text content = ${col.textContent}`);
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
      // this is to remove ...
      if (col.textContent.includes('grid-layout') || col.textContent.includes('icon-layout')) {
        col.remove();
      }
    });
  });

  const isAemAuthor = getAemAuthorEnv();

  // if (isAemAuthor) {
  //   const firstDiv = block.querySelector('div');
  //   /* eslint-disable-next-line no-console, max-len */
  //   console.log(`in columns block, FIRST DIV OUTSIDE IF  text content = ${block.textContent}`);
  //   console.log(`block innerHTML = ${block.innerHTML}, children = ${block.children.length}`);
  //   console.log(` firstDiv = ${firstDiv}`);
  //   if (firstDiv && /^\s*\n\s*$/.test(block.innerHTML)) {
  //     const firstDivContent = firstDiv.textContent;
  //     /* eslint-disable-next-line no-console */
  //     console.log(`in columns block, FIRST DIV  text content = ${firstDivContent}`);
  //     const authorBlock = document.createElement('div');
  //     authorBlock.textContent = 'Columns block for enrichment';
  //     block.appendChild(authorBlock);
  //   }
  // }
  if (isAemAuthor && /^\s*\n\s*$/.test(block.innerHTML)) { // block.innerHTML.trim() === '' && block.childNodes && block.childNodes.length === 0) {
    /* eslint-disable-next-line no-console */
    console.log(`in columns block, inner HTML = ${block.innerHTML}, text content = ${block.textContent}`);
    const authorBlock = document.createElement('div');
    authorBlock.textContent = 'Columns block for enrichment';
    block.appendChild(authorBlock);
  }
}
