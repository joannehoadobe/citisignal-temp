export default async function decorate(block) {
  [...block.children].forEach((child) => {
    const iconName = child.querySelector('img').getAttribute('data-icon-name');
    child.querySelector('img').alt = iconName;
  });
}
