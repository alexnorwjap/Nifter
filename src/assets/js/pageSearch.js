export class PageSearch {
  // Экспорт класса PageSearch, который используется для поиска по элементам страницы
  constructor(root, input) {
    // Конструктор класса, принимает корневой элемент для поиска и элемент ввода
    this.root = root || document.body; // Сохраняем корневой элемент
    this.input = input; // Сохраняем элемент ввода
    this.input.addEventListener('input', (event) => this.handleInput(event)); // Добавляем обработчик события ввода

    // Добавляем обработчик нажатия клавиши Escape
    document.addEventListener('keydown', (event) => this.handleEscape(event));

    // Инициализируем массивы
    this.refreshTextNodes();
  }

  // Обрабатывает нажатие клавиши Escape
  handleEscape(event) {
    if (event.key === 'Escape') {
      // Очищаем поле ввода
      this.input.value = '';
      // Сбрасываем выделения
      this.resetHighlights();
      // Снимаем фокус с поля ввода
      this.input.blur();
    }
  }

  // Обновляет списки текстовых узлов
  refreshTextNodes() {
    // Получаем все текстовые узлы заново
    this.textNodes = getAllTextNodes(this.root);
    // Сохраняем оригинальное содержимое каждого узла
    this.originalContents = this.textNodes.map((node) => node.textContent);
  }

  resetHighlights() {
    // Метод для сброса всех выделений
    // Находим все элементы с классом highlight
    const highlights = this.root.querySelectorAll('.highlight');

    // Для каждого элемента с highlight заменяем его обычным текстом
    highlights.forEach((highlight) => {
      const textNode = document.createTextNode(highlight.textContent);
      highlight.parentNode.replaceChild(textNode, highlight);
    });

    // Объединяем последовательные текстовые узлы для очистки DOM
    this.normalizeTextNodes();

    // Обновляем наши массивы текстовых узлов
    this.refreshTextNodes();
  }

  // Объединяет последовательные текстовые узлы после удаления выделений
  normalizeTextNodes() {
    // Используем стандартный метод normalize для очистки DOM
    this.root.normalize();
  }

  highlightMatches(searchValue) {
    // Метод для выделения совпадений
    if (!searchValue) return; // Если пустая строка поиска, ничего не делаем

    const regex = new RegExp(searchValue, 'gi'); // Создаем регулярное выражение из строки поиска

    // Перебираем все текстовые узлы
    this.textNodes.forEach((node) => {
      const originalText = node.textContent;
      if (!originalText || !regex.test(originalText)) return; // Пропускаем узлы без совпадений

      // Сбрасываем lastIndex, чтобы начать поиск с начала строки
      regex.lastIndex = 0;

      const parent = node.parentNode;
      if (!parent) return; // Пропускаем узлы без родителя

      // Оставляем оригинальный текстовый узел и будем его разделять
      let currentNode = node;
      let match;
      let lastIndex = 0;

      // Проходим по всем совпадениям
      while ((match = regex.exec(originalText)) !== null) {
        // Если текущий узел уже не тот, с которым мы начали, сбрасываем его
        if (currentNode !== node && currentNode.textContent !== originalText.substring(lastIndex)) {
          // Ищем новое положение node, которое может измениться
          const siblings = Array.from(parent.childNodes);
          for (let i = 0; i < siblings.length; i++) {
            if (
              siblings[i].nodeType === Node.TEXT_NODE &&
              siblings[i].textContent.includes(originalText.substring(lastIndex))
            ) {
              currentNode = siblings[i];
              break;
            }
          }
        }

        // Вычисляем позицию совпадения относительно текущего узла
        const relativeMatchIndex = match.index - lastIndex;

        // Если совпадение не в начале текущего узла, разделяем узел
        if (relativeMatchIndex > 0) {
          // Разделяем узел на часть до совпадения и часть с совпадением и после
          const afterNode = currentNode.splitText(relativeMatchIndex);
          // Теперь текущий узел - это узел после разделения (содержит совпадение в начале)
          currentNode = afterNode;
        }

        // Разделяем узел на совпадение и остаток (если есть)
        const matchNode = currentNode.splitText(match[0].length);

        // Создаем элемент выделения
        const highlightElement = document.createElement('span');
        highlightElement.className = 'highlight';
        highlightElement.textContent = currentNode.textContent;

        // Заменяем текстовый узел с совпадением на элемент выделения
        parent.replaceChild(highlightElement, currentNode);

        // Следующий текстовый узел - это узел после совпадения
        currentNode = matchNode;

        // Обновляем индекс для следующего поиска
        lastIndex = match.index + match[0].length;
      }
    });
  }

  handleInput(event) {
    // Обработчик события ввода
    const searchValue = event.target.value.trim(); // Получаем значение из поля ввода и удаляем пробелы
    this.resetHighlights(); // Сбрасываем предыдущие выделения
    if (searchValue) {
      // Если строка поиска не пустая
      this.highlightMatches(searchValue); // Выделяем новые совпадения
    }
  }
}

function getAllTextNodes(root) {
  // Проверяем, передан ли корневой элемент
  const rootElement = root || document.body;

  const treeWalker = document.createTreeWalker(
    rootElement,
    NodeFilter.SHOW_TEXT, // Показывать только текстовые узлы
    {
      acceptNode: function (node) {
        // Принимаем только непустые текстовые узлы
        return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    },
  );

  // Собираем все текстовые узлы в массив
  const textNodes = [];
  let currentNode;

  while ((currentNode = treeWalker.nextNode())) {
    textNodes.push(currentNode); // Сохраняем сам узел, а не его содержимое
  }

  return textNodes;
}
