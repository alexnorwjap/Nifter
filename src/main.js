import './assets/styles/font.scss';
import './assets/styles/variables.scss';
import './assets/styles/style.scss';
import './assets/styles/header.scss';
import './assets/styles/hero.scss';
import './assets/styles/top-seller.scss';
import './assets/styles/auction.scss';

import { loadWrapper } from './assets/js/loadWrapper';
import { AnimateCounter } from './assets/js/animateCounter';
import { PageSearch } from './assets/js/pageSearch';
import { syncPriceWithAPI } from './assets/js/syncPriceWithAPI';
import * as sellerLogic from './assets/js/SellerApp';

async function loadPages() {
  const wrapper = document.querySelector('#wrapper');

  const pathWrapper = ['html/header.html', 'html/main.html', 'html/footer.html'];

  const pathMain = [
    'html/mainSections/hero.html',
    'html/mainSections/top-seller.html',
    'html/mainSections/live-auction.html',
  ];

  //----------------------------------------------------------
  await loadWrapper(pathWrapper, wrapper);
  //----------------------------------------------------------

  //----------------------------------------------------------
  const page = document.querySelector('#page');
  await loadWrapper(pathMain, page);
  //----------------------------------------------------------

  const containerSlider = document.querySelector('#slider-auction-wrap');
  const auctionServer = 'https://ddbd8828c9bcda52.mokky.dev/auctions';

  class DataLoader {
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
                <button type="button" class="item-auction__place-bid">Plece Bid</button>
                <button type="button" class="item-auction__view">View</button>
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
        console.log(listItems);
        const ul = document.createElement('ul');
        ul.className = 'slider-auction__wrap';
        ul.id = 'slider-auction';
        ul.append(...listItems);
        this.container.append(ul);
      } catch (error) {
        console.error('Тут что-то не так: ', error);
        throw error;
      }
    }
  }

  const dataLoader = new DataLoader(containerSlider, auctionServer);
  await dataLoader.init;
}

async function loadLogic() {
  //----------------------------------------------------------
  const dataSearch = document.querySelectorAll('[data-search] *');
  const allowTags = ['a', 'span', 'p'];
  const input = document.querySelector('#search');

  new PageSearch(dataSearch, allowTags, input);
  //----------------------------------------------------------

  //----------------------------------------------------------
  const counterArtist = document.querySelector('#counterArtist');
  const counterUser = document.querySelector('#counterUser');
  const counterWorks = document.querySelector('#counterWorks');

  console.log(counterArtist, counterUser, counterWorks);

  new AnimateCounter(counterUser, 42042, 3000);
  new AnimateCounter(counterWorks, 8342, 3000);
  new AnimateCounter(counterArtist, 2134, 3000);

  //----------------------------------------------------------

  //----------------------------------------------------------
  const hoursElement = document.querySelector('#hours');
  const minutesElement = document.querySelector('#minutes');
  const secondsElement = document.querySelector('#seconds');

  const bitTime = new Date();
  bitTime.setDate(bitTime.getDate() + 1);

  function updateTimer() {
    const actualTime = new Date();
    let timeLeft = bitTime - actualTime;

    if (timeLeft < 0) {
      bitTime.setDate(bitTime.getDate() + 1);
      timeLeft = bitTime - actualTime;
    }

    const formatNum = (number) => {
      return number < 10 ? `0${number}` : number;
    };

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    hoursElement.textContent = formatNum(hours);
    minutesElement.textContent = formatNum(minutes);
    secondsElement.textContent = formatNum(seconds);
  }

  setInterval(updateTimer, 1000);
  //----------------------------------------------------------

  //----------------------------------------------------------
  const price = document.querySelector('#price');

  if (price) {
    syncPriceWithAPI(price);
    setInterval(() => syncPriceWithAPI(price), 15000);
  }

  //----------------------------------------------------------

  new sellerLogic.SellerApp();

  // ----------------------------------------------------------
  const containerAuction = document.querySelector('#slider-auction');
  const auctionPrev = document.querySelector('#auction-prev');
  const auctionNext = document.querySelector('#auction-next');
  const moveCount = -431;
  const startActive = 1;
  let isAnimate = false;
  let activeItem = document.querySelector('.active');
  console.log(containerAuction);
  containerAuction.prepend(containerAuction.lastElementChild);

  containerAuction.style.transform = `translateX(${moveCount}px)`;

  auctionNext.addEventListener('click', moveRight);
  auctionPrev.addEventListener('click', moveLeft);

  function moveLeft() {
    if (isAnimate) return;
    isAnimate = true;
    activeItem.classList.remove('active');
    containerAuction.style.transition = 'transform 0.5s ease';
    containerAuction.style.transform = 'translateX(0px)';
    activeItem = activeItem.previousElementSibling;
    activeItem.classList.add('active');
    setTimeout(() => {
      containerAuction.style.transition = 'none';
      containerAuction.prepend(containerAuction.lastElementChild);
      containerAuction.style.transform = `translateX(${moveCount}px)`;
      isAnimate = false;
    }, 500);
  }

  function moveRight() {
    if (isAnimate) return;
    isAnimate = true;
    activeItem.classList.remove('active');
    containerAuction.style.transition = 'transform 0.5s ease';
    containerAuction.style.transform = `translateX(${moveCount * 2}px)`;
    activeItem = activeItem.nextElementSibling;
    activeItem.classList.add('active');
    setTimeout(() => {
      containerAuction.style.transition = 'none';
      containerAuction.appendChild(containerAuction.firstElementChild);
      containerAuction.style.transform = `translateX(${moveCount}px)`;
      isAnimate = false;
    }, 500);
  }

  const like = document.querySelectorAll('[class*="__like"]');
  like.forEach((element) => {
    element.addEventListener('click', () => element.classList.toggle('active'));
  });

  //----------------------------------------------------------
}

async function app() {
  await loadPages();
  await loadLogic();
}

app();
