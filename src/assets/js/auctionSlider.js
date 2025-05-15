import { ModalErrorLinks } from './modalWindow';

class AuctionDataLoader {
  constructor(container, url) {
    this.container = container;
    this.url = url;
    this.init = this.render();
  }
  async loadData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error('Статус пришел не тот:', response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Тут что-то не так: ', error);
      throw error;
    }
  }
  async createListItems(data) {
    try {
      const listItems = [];
      data.forEach((item) => {
        const li = document.createElement('li');

        li.className = 'slider-auction__item item-auction';
        if (item.startActive) li.classList.add('active');
        li.innerHTML = `
          <div class="item-auction__image">
              <img src="${item.nftImage}" alt="avatar" />
              <div class="item-auction__like">
                <svg>
                  <use href="image/svg/sprite.svg#like"></use>
                </svg>
              </div>
            </div>
            <div class="item-auction__photo">
              <img src="${item.avatar}" alt="photo" />
            </div>
            <div class="item-auction__info">
              <h3 class="item-auction__title">${item.title}</h3>
              <p class="item-auction__price">${item.price} ETH</p>
              <p class="item-auction__subtitle">${item.subTitle}</p>
              <p class="item-auction__stock">${item.stock} in stock</p>
              <p class="item-auction__bid">Highest bid <span>${item.startBid}Ethh</span></p>
              <div class="item-auction__buttons">
                <button type="button" class="item-auction__place-bid" id="#">Plece Bid</button>
                <button type="button" class="item-auction__view" id="#">View</button>
              </div>
            </div>
          `;
        listItems.push(li);
      });
      return listItems;
    } catch (error) {
      console.error('Тут что-то не так: ', error);
      throw error;
    }
  }

  async render() {
    try {
      const data = await this.loadData();

      const listItems = await this.createListItems(data);
      const ul = document.createElement('ul');
      ul.className = 'slider-auction__wrap';
      ul.id = 'slider-auction';
      ul.append(...listItems);
      this.container.append(ul);
      const buttonsForModal = Array.from(ul.querySelectorAll('[href="#"]'));
      new ModalErrorLinks(buttonsForModal);
    } catch (error) {
      console.error('Тут что-то не так: ', error);
      throw error;
    }
  }
}

class AuctionSlider {
  /**
   * Создает экземпляр слайдера аукциона
   * @param {HTMLElement} container - Контейнер слайдера
   * @param {HTMLElement} prevButton - Кнопка для перемещения влево
   * @param {HTMLElement} nextButton - Кнопка для перемещения вправо
   */
  constructor(container, prevButton, nextButton) {
    // Элементы DOM
    this.container = container;
    this.prevButton = prevButton;
    this.nextButton = nextButton;

    // Параметры слайдера
    this.moveCount = -430;
    this.firstStep = 0;
    this.isAnimate = false;
    this.activeItem = document.querySelector('.active');

    // Инициализация слайдера
    this.init();
  }

  /**
   * Инициализирует слайдер
   */
  init() {
    // Подготовка начального положения
    this.container.prepend(this.container.lastElementChild);

    // Проверка ширины окна и установка начального положения
    this.checkWidth(window.innerWidth);

    // Добавление обработчиков событий
    this.prevButton.addEventListener('click', this.moveLeft.bind(this));
    this.nextButton.addEventListener('click', this.moveRight.bind(this));
    window.addEventListener('resize', () => {
      this.checkWidth(window.innerWidth);
    });
  }

  /**
   * Проверяет ширину окна и устанавливает соответствующие параметры слайдера
   * @param {number} width - Ширина окна
   */
  checkWidth(width) {
    if (width > 1485) this.firstStep = 0;
    if (width < 1485 && width > 1164) {
      this.firstStep = -140;
    }
    if (width <= 1164 && width > 920) {
      this.firstStep = -229;
    }
    if (width <= 920 && width > 700) {
      this.firstStep = -351;
    }
    if (width <= 700 && width > 543) {
      this.firstStep = -431;
      this.moveCount = -430;
    }
    if (width <= 543) {
      this.moveCount = -290;
      this.firstStep = -288;
    }
    this.container.style.transform = `translateX(${this.moveCount + this.firstStep}px)`;
  }

  /**
   * Перемещает слайдер влево
   */
  moveLeft() {
    if (this.isAnimate) return;
    this.isAnimate = true;

    this.activeItem.classList.remove('active');

    this.container.style.transition = 'transform 0.5s ease';
    this.container.style.transform = `translateX(${this.firstStep}px)`;
    this.activeItem = this.activeItem.previousElementSibling;

    this.activeItem.classList.add('active');

    setTimeout(() => {
      this.container.style.transition = 'none';
      this.container.prepend(this.container.lastElementChild);
      this.container.style.transform = `translateX(${this.moveCount + this.firstStep}px)`;
      this.isAnimate = false;
    }, 500);
  }

  /**
   * Перемещает слайдер вправо
   */
  moveRight() {
    if (this.isAnimate) return;
    this.isAnimate = true;

    this.activeItem.classList.remove('active');

    this.container.style.transition = 'transform 0.5s ease';
    this.container.style.transform = `translateX(${(this.moveCount + this.firstStep / 2) * 2}px)`;
    this.activeItem = this.activeItem.nextElementSibling;

    this.activeItem.classList.add('active');

    setTimeout(() => {
      this.container.style.transition = 'none';
      this.container.appendChild(this.container.firstElementChild);
      this.container.style.transform = `translateX(${this.moveCount + this.firstStep}px)`;
      this.isAnimate = false;
    }, 500);
  }
}

export { AuctionSlider, AuctionDataLoader };
