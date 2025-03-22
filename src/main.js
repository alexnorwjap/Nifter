import './assets/styles/font.scss';
import './assets/styles/variables.scss';
import './assets/styles/style.scss';
import './assets/styles/header.scss';
import './assets/styles/hero.scss';
import './assets/styles/top-seller.scss';

import { loadWrapper } from './assets/js/loadWrapper';
import { AnimateCounter } from './assets/js/animateCounter';
import { PageSearch } from './assets/js/pageSearch';
import { syncPriceWithAPI } from './assets/js/syncPriceWithAPI';
import * as sellerLogic from './assets/js/SellerApp';

async function loadPages() {
  const wrapper = document.querySelector('#wrapper');

  const pathWrapper = ['html/header.html', 'html/main.html', 'html/footer.html'];

  const pathMain = ['html/mainSections/hero.html', 'html/mainSections/top-seller.html'];

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

  //----------------------------------------------------------

  //----------------------------------------------------------
}

async function app() {
  await loadPages();
  await loadLogic();
}

app();
