export class PageSearch {
  constructor(dataSearch, allowTags, input) {
    this.elementsToSearch = Array.from(dataSearch).filter((element) =>
      allowTags.includes(element.tagName.toLocaleLowerCase()),
    );
    this.input = input;
    this.input.addEventListener('input', (event) => this.handleInput(event));
  }

  resetHightLights() {
    this.elementsToSearch.forEach((element) => {
      element.innerHTML = element.innerHTML.replace(
        /<span class="highlight">(.*?)<\/span>/gi,
        '$1',
      );
    });
  }

  highlightMatches(searchValue) {
    let regex = new RegExp(searchValue, 'gi');
    this.elementsToSearch.forEach((element) => {
      element.innerHTML = element.innerHTML.replace(regex, (find) => {
        return `<span class="highlight">${find}</span>`;
      });
    });
  }

  handleInput(event) {
    const searchValue = event.target.value.trim();
    this.resetHightLights();
    if (searchValue) {
      this.highlightMatches(searchValue);
    }
  }
}
