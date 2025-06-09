import { PageSearch } from './pageSearch.js';
import { CLickBurger } from './burgerMenu.js';
import { AnimateCounter } from './animateCounter.js';
import { ModalAnswerForm, ModalErrorLinks } from './modalWindow.js';
import { CountdownTimer } from './timerApp.js';
import { syncPriceWithAPI } from './syncPriceWithAPI.js';
import { AuctionDataLoader, AuctionSlider } from './auctionSlider.js';
import { SellerApp } from './SellerApp.js';
import { HotCollectionManager } from './HotCollectionApp.js';
import { ExploreManager } from './explore.js';
import * as workInfo from './workInfo.js';
import { EmailValidator, SubscribeFormApp } from './subscribe.js';


export function initHeaderLogic() {
// initBurgerLogic
  const burgerButton = document.querySelector('#menu-icon');
  const burgerPage = document.querySelector('#burger-page');
  const body = document.querySelector('body');
  new CLickBurger(burgerButton, burgerPage, body);
// initSearchLogic
  const input = document.querySelector('#search');
  new PageSearch(document.body, input);
}

export async function  initHeroLogic() {
// initCounterLogic
  const counterArtist = document.querySelector('#counterArtist');
  const counterUser = document.querySelector('#counterUser');
  const counterWorks = document.querySelector('#counterWorks');

  new AnimateCounter(counterUser, 42042, 3000);
  new AnimateCounter(counterWorks, 8342, 3000);
  new AnimateCounter(counterArtist, 2134, 3000);

// initTimerLogic
  new CountdownTimer('#hours', '#minutes', '#seconds', 'summer_sale_2025');
// initSyncPrice
  const price = document.querySelector('#price');
  if (price) {
    await syncPriceWithAPI(price);
    setInterval(() => syncPriceWithAPI(price), 30000);
  }
}

export  function initTopSellerLogic() {


  new SellerApp();

}

export async function initLiveAuctionLogic() {
// initSliderAuction
  const containerSlider = document.querySelector('#slider-auction-wrap');
  const auctionServer = 'https://ddbd8828c9bcda52.mokky.dev/auctions';
  const dataLoader = new AuctionDataLoader(containerSlider, auctionServer);
  await dataLoader.init;

  const containerAuction = document.querySelector('#slider-auction');
  const auctionPrev = document.querySelector('#auction-prev');
  const auctionNext = document.querySelector('#auction-next');

  new AuctionSlider(containerAuction, auctionPrev, auctionNext);


// initFavoritesToggle
  const like = document.querySelectorAll('[class*="__like"]');
  like.forEach((element) => {
    element.addEventListener('click', () => element.classList.toggle('active'));
  });
}

export function initHotCollectionLogic() {

  const collectionContainer = document.querySelector('#collection-list');
  const containerButtons = document.querySelector('#buttons-collection');
  const titleCollectionsBlock = document.querySelector('#collection-title');

  new HotCollectionManager(collectionContainer, containerButtons, titleCollectionsBlock);
}

export function exploreInitLogic() {

  const tabContainer = document.querySelector('#tabs-container');
  const containerExplore = document.querySelector('#artworks-container');

  new ExploreManager(tabContainer, containerExplore);
}

export function initWorksInfoLogic() {
  const containerWorkInfo = document.querySelector('#work-info');
  workInfo.renderList(workInfo.dataWorkInfo, containerWorkInfo, workInfo.createItemExplore);
}

export function initSubscribeLogic() {
  const urlSubscribes = 'https://ed2e39ac2756d838.mokky.dev/subscribes';
  new SubscribeFormApp('#subscribe', urlSubscribes, new EmailValidator(), new ModalAnswerForm());

}

export function initModalErrorLogic() {

  new ModalErrorLinks();

}