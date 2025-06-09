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
import { initHeaderLogic,
  initHeroLogic, initTopSellerLogic,
  initLiveAuctionLogic , initHotCollectionLogic,
  exploreInitLogic,
  initWorksInfoLogic, initSubscribeLogic, initModalErrorLogic} from './assets/js/sectionInitializers.js';

async function App() {
  const wrapper = document.querySelector('#wrapper');
  const pathWrapper = ['html/header.html','html/modal.html', 'html/main.html',[
    'html/mainSections/hero.html',
    'html/mainSections/top-seller.html',
    'html/mainSections/live-auction.html',
    'html/mainSections/hot-collection.html',
    'html/mainSections/explore.html',
    'html/mainSections/worksInfo.html',
    'html/mainSections/subscribe.html',
  ], 'html/footer.html', ];

  const initCallbacks = {
    'header': initHeaderLogic,
    'modal': initModalErrorLogic,
    'hero': initHeroLogic,
    'top-seller': initTopSellerLogic,
    'live-auction': initLiveAuctionLogic,
    'hot-collection': initHotCollectionLogic,
    'explore': exploreInitLogic,
    'worksInfo': initWorksInfoLogic,
    'subscribe': initSubscribeLogic
  };



  await loadWrapper(pathWrapper, wrapper, initCallbacks);
}


App();
