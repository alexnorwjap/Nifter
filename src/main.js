import './assets/styles/font.scss';
import './assets/styles/variables.scss';
import './assets/styles/style.scss';
import './assets/styles/header.scss';

const dataSearch = document.querySelectorAll('[data-search] *');
const allowTags = ['a', 'span', 'p'];
const elementsToSearch = Array.from(dataSearch).filter((element) =>
  allowTags.includes(element.tagName.toLocaleLowerCase()),
);
const input = document.querySelector('#search');

console.log(elementsToSearch);
input.addEventListener('input', (event) => {
  const searchValue = event.target.value.trim();

  elementsToSearch.forEach((element) => {
    console.log(elementsToSearch.forEach((element) => console.log(element.innerHTML)));
    element.innerHTML = element.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/gi, '$1');
  });
  if (!searchValue) {
    return;
  }
  let regex = new RegExp(searchValue, 'gi');
  elementsToSearch.forEach((element) => {
    element.innerHTML = element.innerHTML.replace(regex, (find) => {
      return `<span class="highlight">${find}</span>`;
    });
  });
});
