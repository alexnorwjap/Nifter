import './assets/styles/variables.scss';
import './assets/styles/font.scss';
import './assets/styles/style.scss';
import './assets/styles/header.scss';
import './assets/styles/hero.scss';

import { loadWrapper } from './assets/js/loadWrapper';
import { AnimateCounter } from './assets/js/animateCounter';
import { PageSearch } from './assets/js/pageSearch';
import { syncPriceWithAPI } from './assets/js/syncPriceWithAPI';

async function loadPages() {
  const wrapper = document.querySelector('#wrapper');

  const pathWrapper = [
    '../public/html/header.html',
    '../public/html/main.html',
    '../public/html/footer.html',
  ];

  const pathMain = ['../public/html/mainSections/hero.html'];

  //----------------------------------------------------------
  await loadWrapper(pathWrapper, wrapper);
  //----------------------------------------------------------

  //----------------------------------------------------------
  const page = document.querySelector('#page');
  await loadWrapper(pathMain, page);
  //----------------------------------------------------------
}

async function loadLogic() {
  //----------------------------------------------------------
  const dataSearch = document.querySelectorAll('[data-search] *');
  const allowTags = ['a', 'span', 'p'];
  const input = document.querySelector('#search');

  new PageSearch(dataSearch, allowTags, input);
  //----------------------------------------------------------

  //----------------------------------------------------------
  const counterUser = document.querySelector('#counterUser');
  const counterWorks = document.querySelector('#counterWorks');
  const counterArtist = document.querySelector('#counterArtist');

  new AnimateCounter(counterArtist, 2134, 3000);
  new AnimateCounter(counterUser, 42042, 3000);
  new AnimateCounter(counterWorks, 8342, 3000);
  //----------------------------------------------------------

  //----------------------------------------------------------
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

    document.querySelector('#hours').textContent = formatNum(hours);
    document.querySelector('#minutes').textContent = formatNum(minutes);
    document.querySelector('#seconds').textContent = formatNum(seconds);
  }

  const intervalId = setInterval(updateTimer, 1000);
  //----------------------------------------------------------

  //----------------------------------------------------------
  const price = document.querySelector('#price');

  if (price) {
    syncPriceWithAPI(price);
    setInterval(() => syncPriceWithAPI(price), 15000);
  }

  //----------------------------------------------------------

  //----------------------------------------------------------
  //----------------------------------------------------------
}

async function app() {
  await loadPages();
  await loadLogic();
}

app();
