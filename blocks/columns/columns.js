export default function decorate(block) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < block.classList.length; i++) {
    if (block.classList[i].includes('grid--placeholder-icons')) {
      block.classList.add('grid');
    }
  }
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  /* eslint-disable-next-line no-console */
  console.log(`in columns block, in classes = ${block.classList}`);

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
    });
  });
}
