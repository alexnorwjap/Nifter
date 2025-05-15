import './assets/styles/font.scss';
import './assets/styles/variables.scss';
import './assets/styles/style.scss';
import './assets/styles/modal.scss';
import './assets/styles/header.scss';
import './assets/styles/hero.scss';
import './assets/styles/top-seller.scss';
import './assets/styles/auction.scss';
import './assets/styles/hot-collection.scss';
import './assets/styles/explore.scss';
import './assets/styles/worksInfo.scss';
import './assets/styles/subscribe.scss';
import './assets/styles/footer.scss';

import { loadWrapper } from './assets/js/loadWrapper';
import { AnimateCounter } from './assets/js/animateCounter';
import { PageSearch } from './assets/js/pageSearch';
import { syncPriceWithAPI } from './assets/js/syncPriceWithAPI';
import { SellerApp } from './assets/js/SellerApp';
import { ModalErrorLinks, ModalAnswerForm } from './assets/js/modalWindow';
import { CLickBurger } from './assets/js/burgerMenu';
import { HotCollectionManager } from './assets/js/HotCollectionApp';
import { ExploreManager } from './assets/js/explore';
import * as workInfo from './assets/js/workInfo';
import { EmailValidator, SubscribeFormApp } from './assets/js/subscribe';
import { AuctionSlider, AuctionDataLoader } from './assets/js/auctionSlider';
import { CountdownTimer } from './assets/js/timerApp';

async function App() {
  const wrapper = document.querySelector('#wrapper');

  const pathWrapper = ['html/header.html', 'html/main.html', 'html/footer.html', 'html/modal.html'];
  const pathMain = [
    'html/mainSections/hero.html',
    'html/mainSections/top-seller.html',
    'html/mainSections/live-auction.html',
    'html/mainSections/hot-collection.html',
    'html/mainSections/explore.html',
    'html/mainSections/worksInfo.html',
    'html/mainSections/subscribe.html',
  ];

  //----------------------------------------------------------
  await loadWrapper(pathWrapper, wrapper);
  //----------------------------------------------------------

  //----------------------------------------------------------
  const page = document.querySelector('#page');
  await loadWrapper(pathMain, page);
  //----------------------------------------------------------
  await loadLogic();
  //----------------------------------------------------------
}

async function loadLogic() {
  const burgerButton = document.querySelector('#menu-icon');
  const burgerPage = document.querySelector('#burger-page');
  const body = document.querySelector('body');
  new CLickBurger(burgerButton, burgerPage, body);
  //----------------------------------------------------------

  const input = document.querySelector('#search');

  new PageSearch(document.body, input);
  //----------------------------------------------------------

  //----------------------------------------------------------
  const counterArtist = document.querySelector('#counterArtist');
  const counterUser = document.querySelector('#counterUser');
  const counterWorks = document.querySelector('#counterWorks');

  new AnimateCounter(counterUser, 42042, 3000);
  new AnimateCounter(counterWorks, 8342, 3000);
  new AnimateCounter(counterArtist, 2134, 3000);

  //----------------------------------------------------------

  //----------------------------------------------------------

  new CountdownTimer('#hours', '#minutes', '#seconds', 'summer_sale_2025');

  //----------------------------------------------------------

  //----------------------------------------------------------
  const price = document.querySelector('#price');

  if (price) {
    syncPriceWithAPI(price);
    setInterval(() => syncPriceWithAPI(price), 30000);
  }

  //----------------------------------------------------------
  const containerSlider = document.querySelector('#slider-auction-wrap');
  const auctionServer = 'https://ddbd8828c9bcda52.mokky.dev/auctions';
  const dataLoader = new AuctionDataLoader(containerSlider, auctionServer);
  await dataLoader.init;

  new SellerApp();

  // ----------------------------------------------------------
  // Инициализация слайдера аукциона
  const containerAuction = document.querySelector('#slider-auction');
  const auctionPrev = document.querySelector('#auction-prev');
  const auctionNext = document.querySelector('#auction-next');

  // Создание экземпляра класса AuctionSlider
  new AuctionSlider(containerAuction, auctionPrev, auctionNext);

  //----------------------------------------------------------
  const like = document.querySelectorAll('[class*="__like"]');
  like.forEach((element) => {
    element.addEventListener('click', () => element.classList.toggle('active'));
  });

  //----------------------------------------------------------

  //----------------------------------------------------------
  //Modal Error
  const linksArray = Array.from(document.querySelectorAll('[href="#"]'));
  const buttonsError = Array.from(document.querySelectorAll('[id="#"]'));
  new ModalErrorLinks(linksArray);
  new ModalErrorLinks(buttonsError);
  //----------------------------------------------------------

  //----------------------------------------------------------
  //HotCollection
  const collectionContainer = document.querySelector('#collection-list');
  const containerButtons = document.querySelector('#buttons-collection');
  const titleCollectionsBlock = document.querySelector('#collection-title');

  new HotCollectionManager(collectionContainer, containerButtons, titleCollectionsBlock);
  //----------------------------------------------------------

  //Explore
  const tabContainer = document.querySelector('#tabs-container');
  const containerExplore = document.querySelector('#artworks-container');

  new ExploreManager(tabContainer, containerExplore);

  //-------------------------------------------------------------------

  //Work info----------------------------------------------------------
  const containerWorkInfo = document.querySelector('#work-info');
  workInfo.renderList(workInfo.dataWorkInfo, containerWorkInfo, workInfo.createItemExplore);
  //Work info----------------------------------------------------------

  //Subscribe----------------------------------------------------------
  const urlSubscribes = 'https://ed2e39ac2756d838.mokky.dev/subscribes';
  new SubscribeFormApp('#subscribe', urlSubscribes, new EmailValidator(), new ModalAnswerForm());
  //Subscribe----------------------------------------------------------
  //----------------------------------------------------------
}

App();
